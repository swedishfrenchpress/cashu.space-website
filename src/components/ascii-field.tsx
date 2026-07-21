"use client";

import { useEffect, useRef } from "react";

/**
 * AsciiField — the hero's terrain band. A canvas grid of Geist Mono glyphs
 * driven by layered sinusoidal noise: three fractal octaves produce a
 * heightfield, and cells near contour lines (height mod spacing) darken,
 * so drifting topographic ridgelines emerge from a quiet dotted plain.
 * The ramp runs faint→dark for the white ground: `·` and `/` fill the
 * open field, `,` marks crests, and ₿ (or `B` while Geist Mono lacks
 * U+20BF) caps the contour peaks.
 *
 * Draws every 2nd rAF (~30fps), DPR capped at 2, pauses offscreen and on
 * hidden tabs, and renders a single static frame under reduced motion.
 */

const CELL_W = 12;
const CELL_H = 14;
const FONT_SIZE = 12;
const TERRAIN_SCALE = 0.13;
const CONTOUR_SPACING = 0.08;
const SPEED = 0.9;
const FRAME_SKIP = 2;
const MAX_DPR = 2;

/* Brightness thresholds ascend toward darker ink; cells below the first
   threshold stay empty. The top two levels use the runtime-resolved peak
   glyph (₿ when the font carries it, else B). */
const RAMP = [
  { min: 40, glyph: "·", fill: "#d4d4d8" },
  { min: 90, glyph: "/", fill: "#a1a1aa" },
  { min: 140, glyph: ",", fill: "#71717a" },
  { min: 200, glyph: "", fill: "#52525b" },
  { min: 232, glyph: "", fill: "#3f3f46" },
];
const PEAK_LEVEL = 3;

function noise(x: number, y: number, t: number): number {
  return (
    Math.sin(0.8 * x + 0.3 * t) * Math.cos(0.6 * y + 0.2 * t) * 0.5 +
    0.25 * Math.sin(1.6 * x + 1.2 * y + 0.15 * t) +
    Math.sin(0.3 * x - 0.4 * t) * Math.cos(0.4 * y + 0.25 * t) * 0.6 +
    0.3 * Math.sin(0.5 * (x + y) + 0.35 * t) +
    Math.sin(2.5 * x + 0.1 * t) * Math.cos(2.8 * y - 0.12 * t) * 0.15
  );
}

function fractal(x: number, y: number, t: number): number {
  return (
    noise(x, y, t) +
    0.4 * noise(2.2 * x, 2.2 * y, 0.7 * t) +
    0.15 * noise(4.5 * x, 4.5 * y, 0.4 * t)
  );
}

function brightness(x: number, y: number, t: number): number {
  const r = Math.min(1, Math.max(0, (fractal(x, y, t) + 1.8) / 3.6));
  const s = (r % CONTOUR_SPACING) / CONTOUR_SPACING;
  const onContour = s < 0.12 || s > 0.88;
  let b = onContour ? Math.round(200 * r + 55) : Math.round(140 * r);
  if (onContour) {
    /* Steeper terrain sharpens its contour line. */
    const gx = noise(x + 0.01, y, t) - noise(x - 0.01, y, t);
    const gy = noise(x, y + 0.01, t) - noise(x, y - 0.01, t);
    const d = 12 * Math.hypot(gx, gy);
    if (d > 0.5) b = Math.min(255, b + Math.round(40 * d));
  }
  return b;
}

function pickLevel(b: number): number {
  for (let i = RAMP.length - 1; i >= 0; i--) {
    if (b >= RAMP[i].min) return i;
  }
  return -1;
}

export default function AsciiField({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;
    let rafId = 0;
    let resizeRaf = 0;
    let frameCount = 0;
    let disposed = false;
    let inView = true;
    let fontString = `${FONT_SIZE}px ui-monospace, monospace`;
    let peakGlyph = "B";
    const start = performance.now();

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = mqReduce.matches;

    const currentT = () =>
      reduced ? 0 : ((performance.now() - start) / 1000) * SPEED;

    const resolveFont = () => {
      /* ctx.font can't take CSS vars; resolve the real family from the
         wrapper. A failed parse leaves ctx.font untouched, so assigning
         the fallback first makes the failure mode safe. */
      ctx.font = `${FONT_SIZE}px ui-monospace, monospace`;
      const family = getComputedStyle(wrap).fontFamily;
      if (family) ctx.font = `${FONT_SIZE}px ${family}`;
      fontString = ctx.font;
      /* A ₿ the font actually carries shares the mono advance of "0";
         one substituted from a fallback face almost never does.
         (document.fonts.check false-positives here — next/font emits no
         unicode-range, so it only reports loadedness, not coverage.) */
      const btc = ctx.measureText("₿").width;
      peakGlyph =
        btc > 0 && Math.abs(btc - ctx.measureText("0").width) < 0.5
          ? "₿"
          : "B";
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = fontString;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const cols = Math.ceil(width / CELL_W) + 1;
      const rows = Math.ceil(height / CELL_H) + 1;
      const buckets: number[][] = RAMP.map(() => []);
      for (let row = 0; row < rows; row++) {
        const y = (row + 0.5) * TERRAIN_SCALE;
        for (let col = 0; col < cols; col++) {
          const level = pickLevel(brightness((col + 0.5) * TERRAIN_SCALE, y, t));
          if (level < 0) continue;
          buckets[level].push(col * CELL_W + CELL_W / 2, row * CELL_H + CELL_H / 2);
        }
      }
      for (let level = 0; level < RAMP.length; level++) {
        const pts = buckets[level];
        if (pts.length === 0) continue;
        ctx.fillStyle = RAMP[level].fill;
        const glyph = level >= PEAK_LEVEL ? peakGlyph : RAMP[level].glyph;
        for (let i = 0; i < pts.length; i += 2) {
          ctx.fillText(glyph, pts[i], pts[i + 1]);
        }
      }
    };

    const tick = (now: number) => {
      frameCount++;
      if (frameCount % FRAME_SKIP === 0) {
        draw(((now - start) / 1000) * SPEED);
      }
      rafId = requestAnimationFrame(tick);
    };

    /* Single gate for every play/pause input. Reduced motion paints one
       static frame; offscreen/hidden just stops the clockwork (time is
       wall-clock derived, so resuming never jumps backwards). */
    const sync = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      if (disposed) return;
      if (reduced) {
        draw(0);
        return;
      }
      if (inView && document.visibilityState === "visible") {
        rafId = requestAnimationFrame(tick);
      }
    };

    const applyCanvasSize = () => {
      /* Resizing the bitmap resets every 2D context state; draw() reapplies
         font/align/baseline, the transform is reapplied here. */
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver((entries) => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        const rect = entries[entries.length - 1].contentRect;
        width = rect.width;
        height = rect.height;
        applyCanvasSize();
        draw(currentT());
      });
    });

    const io = new IntersectionObserver((entries) => {
      inView = entries[entries.length - 1].isIntersecting;
      sync();
    });

    const onVisibility = () => sync();
    const onReduceChange = (e: MediaQueryListEvent) => {
      reduced = e.matches;
      sync();
    };

    resolveFont();
    const rect = wrap.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    applyCanvasSize();
    sync();

    ro.observe(wrap);
    io.observe(wrap);
    document.addEventListener("visibilitychange", onVisibility);
    mqReduce.addEventListener("change", onReduceChange);

    /* Re-measure once webfonts settle: the first frames may paint in the
       fallback mono, and the ₿ probe is only meaningful post-load. */
    try {
      document.fonts.load(fontString, "·/,B₿0");
    } catch {
      /* FontFaceSet.load can reject on unparsable specs; the fallback
         font path already covers us. */
    }
    document.fonts.ready.then(() => {
      if (disposed) return;
      resolveFont();
      if (!rafId) draw(currentT());
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(resizeRaf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mqReduce.removeEventListener("change", onReduceChange);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`ascii-field${className ? ` ${className}` : ""}`}
      aria-hidden
    >
      <canvas ref={canvasRef} className="ascii-field__canvas" />
    </div>
  );
}
