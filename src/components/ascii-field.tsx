"use client";

import { useEffect, useRef } from "react";
import {
  bdhkeBrightness,
  bdhkeCoverage,
  EXTENT_X,
  EXTENT_Y,
  roundTrip,
} from "@/lib/ascii/bdhke";
import {
  CELL_H,
  CELL_W,
  CURRENCY_LEVEL,
  FILLS,
  LEVEL_GLYPH,
  PEAK_LEVEL,
  TERRAIN_SCALE,
  brightness,
  OPEN_FIELD_GAIN,
  createTerrainField,
  displayLevel,
  pickCurrencyGlyph,
} from "@/lib/ascii/terrain";
import { compositionAt } from "@/lib/ascii/timeline";
import {
  EXTENT_RADIUS,
  vaultBrightness,
  vaultCoverage,
} from "@/lib/ascii/vault";
import {
  WarpPointer,
  bloomedRadius,
  displacement,
  swirlAngle,
} from "@/lib/ascii/warp";

/**
 * AsciiField — the hero's ground. A canvas grid of Geist Mono glyphs filling
 * the whole section, drawn from the terrain heightfield in `@/lib/ascii` and
 * morphing slowly between three scenes (see `timeline.ts`).
 *
 * The ramp runs faint→strong against the page ground: `·` and `/` fill the
 * open field, `,` marks crests, $, ¥, and € mark high contours, and ₿ caps
 * the strongest peaks. Geist Mono has no U+20BF glyph, so the ₿ is
 * synthesized: the font's own `B` plus the official symbol's two vertical
 * strokes drawn as rects — the same letterform on every platform, no
 * system-font fallback. If the font ever gains a native ₿ (probed at
 * runtime), it takes over.
 *
 * Two clocks. `t` is field time (wall-clock × SPEED) and drives the noise;
 * `wall` is plain elapsed seconds and drives the scene timeline and the
 * pointer lens envelopes, which are specified in real seconds and must not
 * inherit the field's speed scaling.
 *
 * Theme: resolves like the site CSS — an html data-theme="dark|light"
 * attribute wins, else prefers-color-scheme — and repaints live when either
 * changes. Light ink on dark paper, dark ink on light paper; the zinc ramp
 * mirrors.
 *
 * Draws every 2nd rAF (~30fps), DPR capped at 2, pauses offscreen and on
 * hidden tabs, and renders a single static frame under reduced motion.
 * `staticTime` freezes the renderer at a chosen moment of pure terrain — no
 * morph, no lens — for quieter supporting surfaces.
 */

const FONT_SIZE = 12;
const SPEED = 0.9;
const FRAME_SKIP = 2;
const MAX_DPR = 2;

/* Synthesized-₿ strokes: two verticals piercing the B, centered ±DX from
   the glyph center, LEN px beyond its top and bottom edges. */
const BTC_STROKE_W = 1;
const BTC_STROKE_LEN = 2;
const BTC_STROKE_DX = 1.25;

/**
 * Fraction of the height the readability mask holds fully transparent.
 *
 * Must track the second stop of `.ascii-field`'s vertical mask gradient in
 * globals.css: those rows are painted into a mask that erases them, so
 * computing them is pure waste. Keep the two in sync — if the CSS stop moves
 * down and this doesn't, the field visibly clips.
 */
const MASK_DEAD_TOP = 0.09;

/* Where a scene sits in the field, as a fraction of the box. Pushed right and
   low on wide screens so the mask's left dimmer doesn't eat half the figure,
   and recentred once the copy spans the full measure. */
const NARROW_BREAKPOINT = 768;
const SCENE_CX_WIDE = 0.65;
const SCENE_CY_WIDE = 0.62;
const SCENE_CX_NARROW = 0.5;
const SCENE_CY_NARROW = 0.64;

/* Scene sizing. The wallet pins the vault at 314 units across; a hero wants it
   monumental, so both scenes scale to the box within sane bounds. */
const VAULT_MIN_D = 380;
const VAULT_MAX_D = 700;
const VAULT_VMIN_FRACTION = 0.74;
const BDHKE_W_FRACTION = 0.64;
const BDHKE_H_FRACTION = 0.68;
const SCENE_SCALE_MIN = 0.7;
const SCENE_SCALE_MAX = 2.4;

/** Seconds for one blind-signature round trip. */
const ROUND_TRIP_SECONDS = 11;

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

export default function AsciiField({
  className,
  staticTime,
}: {
  className?: string;
  staticTime?: number;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;
    let rafId = 0;
    let resizeRaf = 0;
    let rectRaf = 0;
    let frameCount = 0;
    let disposed = false;
    let inView = true;
    let fontString = `${FONT_SIZE}px ui-monospace, monospace`;
    let peakGlyph = "B";
    let synthPeak = true;
    let bTop = 4.5;
    let bBot = 4.5;
    const start = performance.now();

    const field = createTerrainField(OPEN_FIELD_GAIN);
    const pointer = new WarpPointer();
    /* Cached so a pointermove never forces layout. Refreshed on resize and on
       scroll (the hero moves under the viewport as the page scrolls); at most
       one frame stale, which a hover lens cannot perceive. */
    let rect = wrap.getBoundingClientRect();

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = mqReduce.matches;
    const mqFine = window.matchMedia("(hover: hover) and (pointer: fine)");

    /* Same resolution order as the CSS tokens: html data-theme wins, else
       the OS scheme. */
    const mqDark = window.matchMedia("(prefers-color-scheme: dark)");
    const resolveDark = () => {
      const t = document.documentElement.dataset.theme;
      if (t === "dark") return true;
      if (t === "light") return false;
      return mqDark.matches;
    };
    let dark = resolveDark();

    /** Elapsed wall-clock seconds — the timeline's and the lens's clock. */
    const currentWall = () =>
      reduced ? 0 : (performance.now() - start) / 1000;
    /** Field time — the noise's clock. */
    const currentT = () => staticTime ?? currentWall() * SPEED;

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
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const btc = ctx.measureText("₿").width;
      const native =
        btc > 0 && Math.abs(btc - ctx.measureText("0").width) < 0.5;
      peakGlyph = native ? "₿" : "B";
      synthPeak = !native;
      if (synthPeak) {
        /* Stroke anchors from the B's real pixel bounds (relative to the
           middle baseline the grid draws with). */
        const m = ctx.measureText("B");
        bTop = m.actualBoundingBoxAscent;
        bBot = m.actualBoundingBoxDescent;
      }
    };

    const draw = (t: number, wall: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = fontString;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const fills = dark ? FILLS.dark : FILLS.light;
      const cols = Math.ceil(width / CELL_W) + 1;
      const rows = Math.ceil(height / CELL_H) + 1;
      /* Rows the mask erases outright are never computed. */
      const firstRow = Math.floor((height * MASK_DEAD_TOP) / CELL_H);

      field.resize(cols, rows);
      field.update(t);

      /* Scene composition. `staticTime` is documented as a quiet frame, so it
         short-circuits to pure terrain rather than freezing mid-morph. */
      const comp =
        staticTime === undefined && !reduced
          ? compositionAt(wall)
          : { scene: "terrain" as const, mix: 0, sceneTime: 0 };
      const narrow = width < NARROW_BREAKPOINT;
      const cx = width * (narrow ? SCENE_CX_NARROW : SCENE_CX_WIDE);
      const cy = height * (narrow ? SCENE_CY_NARROW : SCENE_CY_WIDE);
      const vaultScale =
        clamp(
          Math.min(width, height) * VAULT_VMIN_FRACTION,
          VAULT_MIN_D,
          VAULT_MAX_D,
        ) /
        (2 * EXTENT_RADIUS);
      const bdhkeScale = clamp(
        Math.min(
          (width * BDHKE_W_FRACTION) / (2 * EXTENT_X),
          (height * BDHKE_H_FRACTION) / (2 * EXTENT_Y),
        ),
        SCENE_SCALE_MIN,
        SCENE_SCALE_MAX,
      );
      const trip =
        comp.scene === "bdhke"
          ? roundTrip(comp.sceneTime / ROUND_TRIP_SECONDS)
          : null;

      /* Pointer lens. Advanced once per frame, before any sampling. */
      pointer.advance(wall);
      const k = reduced || staticTime !== undefined ? 0 : pointer.currentK(wall);
      const lensR = k > 0 ? bloomedRadius(k) : 0;
      const lensX = pointer.x;
      const lensY = pointer.y;

      const buckets: number[][] = fills.map(() => []);
      for (let row = firstRow; row < rows; row++) {
        const py = row * CELL_H + CELL_H / 2;
        for (let col = 0; col < cols; col++) {
          const px = col * CELL_W + CELL_W / 2;

          /* Sample position in pixels. Unwarped it is the cell centre; inside
             the lens it is pulled toward the pointer, so the terrain visibly
             flees it and the contour lines bend around the rim. */
          let sx = px;
          let sy = py;
          let warped = false;
          if (lensR > 0) {
            const ddx = px - lensX;
            const ddy = py - lensY;
            const d = Math.hypot(ddx, ddy);
            if (d > 0 && d < lensR) {
              const f = displacement(d, k);
              if (f > 0) {
                const theta = swirlAngle(f);
                const cos = Math.cos(theta);
                const sin = Math.sin(theta);
                const inv = f / d;
                sx = px - (ddx * cos - ddy * sin) * inv;
                sy = py - (ddx * sin + ddy * cos) * inv;
                warped = true;
              }
            }
          }
          /* Warped cells leave the separable grid, so they pay the exact
             per-cell field. At a 220px lens that is a few hundred cells —
             nothing against the thousands the fast path covers. */
          const terrainB = warped
            ? brightness(
                (sx / CELL_W) * TERRAIN_SCALE,
                (sy / CELL_H) * TERRAIN_SCALE,
                t,
                OPEN_FIELD_GAIN,
              )
            : field.brightnessAt(col, row);

          /* The morph is a brightness lerp, then a threshold — never a glyph
             crossfade. Dots condense first and ₿ lands last, so the landscape
             deforms into the shape instead of dissolving into it.
             Weighted by coverage so the shape has full internal contrast
             where it exists and the terrain is untouched where it doesn't. */
          let b = terrainB;
          if (comp.mix > 0) {
            const isVault = comp.scene === "vault";
            const scale = isVault ? vaultScale : bdhkeScale;
            const cover = isVault
              ? vaultCoverage(sx, sy, cx, cy, scale)
              : bdhkeCoverage(sx, sy, cx, cy, scale);
            if (cover > 0) {
              const shapeB = isVault
                ? vaultBrightness(sx, sy, cx, cy, terrainB, scale, true)
                : bdhkeBrightness(sx, sy, cx, cy, terrainB, scale, trip!, t);
              b = terrainB + (shapeB - terrainB) * comp.mix * cover;
            }
          }

          const level = displayLevel(b);
          if (level < 0) continue;
          buckets[level].push(px, py);
        }
      }

      for (let level = 0; level < fills.length; level++) {
        const pts = buckets[level];
        if (pts.length === 0) continue;
        ctx.fillStyle = fills[level];
        const isPeak = level >= PEAK_LEVEL;
        for (let i = 0; i < pts.length; i += 2) {
          const px = pts[i];
          const py = pts[i + 1];
          const glyph = isPeak
            ? peakGlyph
            : level === CURRENCY_LEVEL
              ? pickCurrencyGlyph(px, py)
              : LEVEL_GLYPH[level];
          ctx.fillText(glyph, px, py);
          if (isPeak && synthPeak) {
            const xl = px - BTC_STROKE_DX - BTC_STROKE_W / 2;
            const xr = px + BTC_STROKE_DX - BTC_STROKE_W / 2;
            ctx.fillRect(xl, py - bTop - BTC_STROKE_LEN, BTC_STROKE_W, BTC_STROKE_LEN);
            ctx.fillRect(xr, py - bTop - BTC_STROKE_LEN, BTC_STROKE_W, BTC_STROKE_LEN);
            ctx.fillRect(xl, py + bBot, BTC_STROKE_W, BTC_STROKE_LEN);
            ctx.fillRect(xr, py + bBot, BTC_STROKE_W, BTC_STROKE_LEN);
          }
        }
      }
    };

    const paintCurrent = () => draw(currentT(), currentWall());

    const tick = (now: number) => {
      frameCount++;
      if (frameCount % FRAME_SKIP === 0) {
        const wall = (now - start) / 1000;
        draw(wall * SPEED, wall);
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
      if (staticTime !== undefined || reduced) {
        paintCurrent();
        return;
      }
      if (inView && document.visibilityState === "visible") {
        rafId = requestAnimationFrame(tick);
      }
    };

    /* Theme changed: re-resolve and, when the loop isn't running (paused
       or reduced motion), repaint the current frame in the new ink. */
    const onThemeChange = () => {
      dark = resolveDark();
      if (!rafId) paintCurrent();
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
        const contentRect = entries[entries.length - 1].contentRect;
        width = contentRect.width;
        height = contentRect.height;
        /* Re-resolved here, not captured once at setup: dragging the window
           to a different-DPI monitor fires a resize but not a reload. */
        dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
        rect = wrap.getBoundingClientRect();
        applyCanvasSize();
        paintCurrent();
      });
    });

    /* rootMargin pre-warms the field a little before it scrolls back in, so
       returning to the top of the page never catches a blank frame. */
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[entries.length - 1].isIntersecting;
        sync();
      },
      { rootMargin: "20% 0px" },
    );

    const mo = new MutationObserver(onThemeChange);

    const onVisibility = () => sync();
    const onReduceChange = (e: MediaQueryListEvent) => {
      reduced = e.matches;
      if (reduced) pointer.reset();
      sync();
    };

    /*
     * Pointer lens.
     *
     * The field is `pointer-events: none` and stays that way — it lies under
     * the headline and both CTAs, and must never intercept a click. So the
     * lens listens on the window and hit-tests the cached rect itself. That
     * also keeps the component free of any assumption about what wraps it.
     *
     * Mouse and pen only: on touch there is no hover, and a tap has to reach
     * the buttons.
     */
    /* Tracked separately from `pointer.active`, which stays true through the
       release settle. Keying re-entry off `active` would call move() instead of
       engage() on a pointer that came back mid-decay, so the lens would follow
       the cursor while still fading to nothing. */
    let pointerInside = false;

    const onPointerMove = (e: PointerEvent) => {
      if (reduced || staticTime !== undefined) return;
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      if (!mqFine.matches) return;
      const now = (performance.now() - start) / 1000;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        if (pointerInside) {
          pointerInside = false;
          pointer.release(now);
        }
        return;
      }
      if (pointerInside) {
        pointer.move(x, y);
      } else {
        pointerInside = true;
        /* engage() ramps from the current envelope, so coming back during the
           settle resumes rather than snapping shut and reopening. */
        pointer.engage(x, y, now);
      }
    };

    const onPointerLeaveWindow = () => {
      pointerInside = false;
      pointer.release((performance.now() - start) / 1000);
    };

    const onScroll = () => {
      cancelAnimationFrame(rectRaf);
      rectRaf = requestAnimationFrame(() => {
        rect = wrap.getBoundingClientRect();
      });
    };

    resolveFont();
    const initial = wrap.getBoundingClientRect();
    width = initial.width;
    height = initial.height;
    rect = initial;
    applyCanvasSize();
    sync();

    ro.observe(wrap);
    io.observe(wrap);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });
    document.addEventListener("visibilitychange", onVisibility);
    mqReduce.addEventListener("change", onReduceChange);
    mqDark.addEventListener("change", onThemeChange);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeaveWindow);
    window.addEventListener("blur", onPointerLeaveWindow);
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Re-measure once webfonts settle: the first frames may paint in the
       fallback mono, and the ₿ probe is only meaningful post-load. */
    try {
      document.fonts.load(fontString, "·/,$¥€B₿0");
    } catch {
      /* FontFaceSet.load can reject on unparsable specs; the fallback
         font path already covers us. */
    }
    document.fonts.ready.then(() => {
      if (disposed) return;
      resolveFont();
      if (!rafId) paintCurrent();
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(resizeRaf);
      cancelAnimationFrame(rectRaf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mqReduce.removeEventListener("change", onReduceChange);
      mqDark.removeEventListener("change", onThemeChange);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeaveWindow);
      window.removeEventListener("blur", onPointerLeaveWindow);
      window.removeEventListener("scroll", onScroll);
    };
  }, [staticTime]);

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
