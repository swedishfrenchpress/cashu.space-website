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
 * morph, no lens — for quieter supporting surfaces. `renderFullField`
 * disables the hero mask's top-row optimization when a supporting surface
 * uses its own mask.
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

/* The scene stage (retuned 2026-08-14, user-approved option A — see the
   Fold-Line entry, DESIGN.md §4). Scenes sit bottom-centre, on the horizon:
   the copy is centred, the mask quiets an ellipse around it, and the field
   runs full-strength along the base — the one place a figure can be both
   monumental and legible. The old 0.65/0.62 stage was tuned against the
   left-aligned copy and its one-sided mask; under the symmetric quiet zone
   it landed the figures at 0.09-0.22 effective strength.

   The vault crests the fold — its lower arc is meant to crop. The round
   trip's anchor is derived per-frame in draw() so its return path clears
   the closing hairline at any hero height. Below NARROW_BREAKPOINT the
   round trip stands down entirely (see draw()); the vault still plays. */
const NARROW_BREAKPOINT = 768;
const SCENE_CX = 0.5;
const VAULT_CY = 0.91;
/* Floor for the round trip's anchor on very short heroes. */
const BDHKE_CY_MIN = 0.62;
/* Grid units clawed back from EXTENT_Y when anchoring the round trip:
   EXTENT_Y pads the figure 24 units past its deepest stroke, and riding
   that full pad left the ring cores in the ellipse's ramp (~0.84) instead
   of its full zone. Sinking all but 2 pad units puts the cores at full
   strength and the return path ~10px above the closing hairline. */
const BDHKE_SINK = 22;

/* Scene sizing. The wallet pins the vault at 314 units across; a hero wants it
   monumental, so both scenes scale to the box within sane bounds. */
/* 440, up from 380: the floor only binds on phones (and very short desktop
   windows), where the ring band at the old floor thinned to a single cell
   and the door went wispy. At 440 the door over-fills a 390px viewport by
   ~25px a side — a deliberate crop; the door is bigger than the phone. */
const VAULT_MIN_D = 440;
const VAULT_MAX_D = 700;
/* 0.80, up from 0.74 with the move to the horizon stage: a cresting door
   reads smaller than a floating one, so it earns a little more diameter. */
const VAULT_VMIN_FRACTION = 0.8;
const BDHKE_W_FRACTION = 0.64;
const BDHKE_H_FRACTION = 0.68;
const SCENE_SCALE_MIN = 0.7;
const SCENE_SCALE_MAX = 2.4;

/** Seconds for one blind-signature round trip. */
const ROUND_TRIP_SECONDS = 11;

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function smoothstep(v: number): number {
  const u = clamp(v, 0, 1);
  return u * u * (3 - 2 * u);
}

export default function AsciiField({
  className,
  staticTime,
  renderFullField = false,
  staticTransitionMs = 0,
}: {
  className?: string;
  staticTime?: number;
  renderFullField?: boolean;
  staticTransitionMs?: number;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const latestStaticTimeRef = useRef(staticTime);
  const updateStaticTimeRef = useRef<(next: number | undefined) => void>(
    () => {},
  );
  const staticMode = staticTime !== undefined;

  /* Keep the setup effect stable while allowing its transition controller to
     receive a new target sample. This runs before both setup and dispatch on
     every commit, including a live↔static mode change. */
  useEffect(() => {
    latestStaticTimeRef.current = staticTime;
  }, [staticTime]);

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

    /* Supporting fields can move between two frozen terrain samples. The
       value is interpolated rather than the bitmaps crossfaded, so every
       glyph naturally promotes, demotes, or disappears as a contour passes
       through its cell. Interrupting a transition starts from its current
       sampled time instead of snapping to either endpoint. */
    const initialStaticTime = latestStaticTimeRef.current ?? 0;
    let staticFrom = initialStaticTime;
    let staticTo = initialStaticTime;
    let staticStartedAt = start;
    let staticTransitioning = false;

    const staticTimeAt = (now: number) => {
      if (!staticTransitioning) return staticTo;
      const progress =
        staticTransitionMs > 0
          ? (now - staticStartedAt) / staticTransitionMs
          : 1;
      if (progress >= 1) {
        staticTransitioning = false;
        staticFrom = staticTo;
        return staticTo;
      }
      return staticFrom + (staticTo - staticFrom) * smoothstep(progress);
    };

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
    const currentT = () =>
      staticMode ? staticTimeAt(performance.now()) : currentWall() * SPEED;

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
      const firstRow = renderFullField
        ? 0
        : Math.floor((height * MASK_DEAD_TOP) / CELL_H);

      field.resize(cols, rows);
      field.update(t);

      /* Scene composition. `staticTime` is documented as a quiet frame, so it
         short-circuits to pure terrain rather than freezing mid-morph. */
      const comp =
        !staticMode && !reduced
          ? compositionAt(wall)
          : { scene: "terrain" as const, mix: 0, sceneTime: 0 };
      const narrow = width < NARROW_BREAKPOINT;
      /* The round trip is ~800 grid units wide and its scale floor keeps its
         strokes above one cell, so below NARROW_BREAKPOINT it cannot fit the
         box: both rings crop at the edges and the two-party picture stops
         reading as two parties. Narrow holds open terrain through that slot
         instead — the vault, which does fit, still plays. Recorded in the
         Honest-Network entry, DESIGN.md §4. */
      const active =
        narrow && comp.scene === "bdhke"
          ? { scene: "terrain" as const, mix: 0, sceneTime: 0 }
          : comp;
      const cx = width * SCENE_CX;
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
      /* The vault's anchor is proportional — the crest composition scales
         with the box, and its lower arc cropping at the fold is the point.
         The round trip's is derived from its own extent so the return path
         clears the closing hairline at any hero height. */
      const cy =
        active.scene === "vault"
          ? height * VAULT_CY
          : Math.max(
              height * BDHKE_CY_MIN,
              height - (EXTENT_Y - BDHKE_SINK) * bdhkeScale,
            );
      const trip =
        active.scene === "bdhke"
          ? roundTrip(active.sceneTime / ROUND_TRIP_SECONDS)
          : null;

      /* Pointer lens. Advanced once per frame, before any sampling. */
      pointer.advance(wall);
      const k = reduced || staticMode ? 0 : pointer.currentK(wall);
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
          if (active.mix > 0) {
            const isVault = active.scene === "vault";
            const scale = isVault ? vaultScale : bdhkeScale;
            const cover = isVault
              ? vaultCoverage(sx, sy, cx, cy, scale)
              : bdhkeCoverage(sx, sy, cx, cy, scale);
            if (cover > 0) {
              const shapeB = isVault
                ? vaultBrightness(sx, sy, cx, cy, terrainB, scale, true)
                : bdhkeBrightness(sx, sy, cx, cy, terrainB, scale, trip!, t);
              b = terrainB + (shapeB - terrainB) * active.mix * cover;
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
      if (staticMode) {
        draw(staticTimeAt(now), currentWall());
        if (
          staticTransitioning &&
          inView &&
          document.visibilityState === "visible"
        ) {
          rafId = requestAnimationFrame(tick);
        } else {
          rafId = 0;
        }
        return;
      }

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
      if (reduced) {
        staticTransitioning = false;
        staticFrom = staticTo;
        paintCurrent();
        return;
      }
      if (staticMode) {
        if (
          staticTransitioning &&
          inView &&
          document.visibilityState === "visible"
        ) {
          rafId = requestAnimationFrame(tick);
        } else {
          paintCurrent();
        }
        return;
      }
      if (inView && document.visibilityState === "visible") {
        rafId = requestAnimationFrame(tick);
      }
    };

    updateStaticTimeRef.current = (next) => {
      if (!staticMode || next === undefined) return;
      const now = performance.now();
      const current = staticTimeAt(now);
      if (next === staticTo && !staticTransitioning) return;

      staticFrom = current;
      staticTo = next;
      staticStartedAt = now;
      staticTransitioning =
        !reduced &&
        staticTransitionMs > 0 &&
        Math.abs(staticTo - staticFrom) > Number.EPSILON;
      if (!staticTransitioning) staticFrom = staticTo;
      sync();
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
      if (reduced) {
        pointer.reset();
        staticTransitioning = false;
        staticFrom = staticTo;
      }
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
      if (reduced || staticMode) return;
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
      updateStaticTimeRef.current = () => {};
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
  }, [renderFullField, staticMode, staticTransitionMs]);

  useEffect(() => {
    updateStaticTimeRef.current(staticTime);
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
