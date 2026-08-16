"use client";

import { useEffect, useRef } from "react";
import {
  MODE_FRAMES,
  radiusScale,
  resolvePreset,
  type ModeOpts,
} from "thinking-orbs/engine";
import { COVER_N, sampleBtc, type GlyphSample } from "@/lib/orb/btc-glyph";
import { createDotPainter } from "@/lib/orb/dot-painter";

/**
 * HeroOrb — the homepage hero's ground.
 *
 * Replaced the live ASCII field on 2026-08-16, on the user's direction, so
 * the hero and the four protocol-parts plates read as one system. What that
 * cost is recorded in DESIGN.md §4 (the Honest-Network Rule's "the hero is
 * untouched" clause is retracted there): the site gave up the one piece of
 * motion on the page that depicted real protocol structure.
 *
 * THE FIGURE. `thinking-orbs`' `listening` mode — `wave` — a stack of
 * latitude rings whose radii are each modulated independently
 * (`i = o * (0.88 + 0.105 * w)`). That independence is why this mode and not
 * another: the rings do not lie on a common sphere, so stretched wide they
 * read as a nested stack of contour ellipses rather than as a ball, which
 * continues the contour heightfield they replaced instead of replacing it.
 *
 * `connecting`/`web` is banned here — it is a topology, it is pinned to
 * protocol-parts 02 Mints, and "not as a second instance" means the hero
 * too. `searching`/`globe` was the first candidate and was rejected: a
 * latitude-and-longitude graticule at this width, with a meridian sweeping
 * it, is a world map with the coastlines taken out, and DESIGN.md §4 already
 * records a world map as proposed and rejected on exactly that ground.
 *
 * WIDE. The engine's `size` is a single scalar that sets the centre and the
 * radius together, so there is no width/height to pass. Instead the frame is
 * built at a fixed `GEOM_SIZE` and its dot POSITIONS are remapped into a wide
 * ellipse while every RADIUS is left alone. The marks stay round, so the
 * result reads as a wide field of dots and never as a squashed ball. `z`,
 * `white` and `a` are untouched, so the engine's depth language survives.
 *
 * OWNING THE LOOP. Same discipline as orb-figure.tsx — DPR capped at 2, a
 * clock derived from performance.now() and never accumulated, the loop
 * running only while on screen and the tab visible, reduced motion painting
 * one deliberately chosen instant — plus the theme tracking the ASCII field
 * needed and the plates did not: those sit on the always-dark `--panel`
 * column, this sits on `--paper` and has to follow the scheme.
 */

/* Which preset to resolve, not what to render at. The 64 profile carries the
   radius laws (`rBase`, `rDepth`, `rsPow`) that the four plates also use, so
   a library retune reaches the hero the same way it reaches them. Its `count`
   and `speed` are avatar-scale tunings and are both discarded below.

   resolvePreset memoises on `${state}-${size}` and orb-figure.tsx shares that
   cache, so the returned object is shared: spread it, never mutate it. */
const PRESET = resolvePreset("listening", 64);
const FRAME = MODE_FRAMES[PRESET.mode];

/* The geometry's own native tuning (`radiusScale` is `(size / 300) ** pow`,
   so 300 is exactly 1). Mark weight is set explicitly below instead of being
   smuggled in through this number — 400 was tried first and read chunky: at
   3.6px the near marks stop being a field and start being beads. */
const GEOM_SIZE = 300;

/* The mode's own outer radius at GEOM_SIZE (`n / 2 * 0.874`). The ring stack
   breathes between 0.775 and 0.985 of this, so it is the envelope the remap
   normalises against, not the figure's actual extent at any given instant. */
const UNIT = (GEOM_SIZE / 2) * 0.874;

const RS = radiusScale(GEOM_SIZE, PRESET.opts.rsPow ?? 0.6);

/* Mark weight, overriding the preset's 0.6 / 1.7.
 *
 * Those are avatar numbers: a 64px orb needs marks it can be seen through at
 * all, and scaled up they gave a 0.84-3.63px range that read as beads on a
 * string rather than as a drawn ground. At 0.30 / 0.85 the range is
 * 0.30-1.61px — a fine stipple that still keeps its depth ramp, because the
 * near-to-far ratio is preserved even though the absolute weight is not.
 *
 * rMin drops with them. A floor set above the far marks' natural radius
 * flattens the back of the figure into the front. */
const DOT_R_BASE = 0.3;
const DOT_R_DEPTH = 0.85;
const DOT_R_MIN = 0.26;

/* Density is a fixed dot budget, not a fixed pixel pitch: the figure's width
   is a constant multiple of the viewport's, so a fixed count gives a constant
   *proportional* mark pitch at every size and the cost does not grow with the
   display.

   Ring count went up with the stage change: the figure now occupies about a
   third of the hero's height rather than all of it, and the 26 rings that
   were spread over the full height left ~60px of empty paper between
   contours across the shorter band, which is what read as chunky.

   It does NOT go higher than this. 42 was tried, to bring the field's pitch
   down to the Bitcoin mark's, on the theory that matching textures would read
   as one material. It did — and the mark stopped being legible, because a
   letterform needs contrast against its ground, not camouflage. The mark is
   separated by the clearing instead (BTC_CLEAR), which is a better tool for
   the job and costs the field nothing. */
const WIDE_OPTS: ModeOpts = {
  ...PRESET.opts,
  rings: 34,
  lonDensity: 270,
  rBase: DOT_R_BASE,
  rDepth: DOT_R_DEPTH,
  rMin: DOT_R_MIN,
};
const NARROW_OPTS: ModeOpts = {
  ...PRESET.opts,
  rings: 30,
  lonDensity: 200,
  rBase: DOT_R_BASE,
  rDepth: DOT_R_DEPTH,
  rMin: DOT_R_MIN,
};

const NARROW_BREAKPOINT = 768;
const MAX_DPR = 2;

/* ~25fps, as a time gate rather than a rAF counter. The ASCII field's
   `FRAME_SKIP = 2` drew every second frame, which is 30fps on a 60Hz display
   and 60fps on a 120Hz one — double the intended budget on exactly the
   hardware that advertises smoothness. Gating on elapsed milliseconds is
   refresh-rate independent.

   25 is justified by the motion: the fastest thing on screen is a mark's
   radial excursion as the swell passes it, about 26px/s, so a frame moves a
   mark by one pixel. */
const MIN_FRAME_MS = 40;

/**
 * Fraction of the height the readability mask holds fully transparent.
 *
 * Must track the second stop of `.hero-orb`'s mask gradient in globals.css:
 * those rows are painted into a mask that erases them, so computing them is
 * pure waste. Keep the two in sync — if the CSS stop moves down and this does
 * not, the field visibly clips.
 */
const MASK_DEAD_TOP = 0.09;

/* Seconds of wall clock per unit of the mode's own `t`.
 *
 * The preset's baked speed is 4.388, which cycles the swell every 0.68s. That
 * is right for a 64px status indicator and a strobe at 1800px, so the hero
 * runs its own clock. At 0.2 the derived periods are:
 *
 *   swell, dominant term (t * 2.1) .............  15s
 *   swell, second term   (t * 1.27) ............  25s
 *   swell beat (incommensurate — never repeats)   38s
 *   yaw (t * 0.18) ............................. 175s
 *
 * Nobody watching for fifteen seconds sees it rotate, and a returning visitor
 * never sees the same composition twice. 0.136 was tried first, at a 22s
 * swell, and read as stalled rather than as calm. */
const T_PER_SEC = 0.2;

/* The stage.
 *
 * The figure is a band across the BOTTOM THIRD, not a ground filling the
 * section (revised 2026-08-16 on the user's direction — filling it put the
 * ring stack behind the headline, where it competed with display type it
 * cannot win against, and made the whole figure read as oversized).
 *
 * At 0.95 / 0.30 the ellipse spans 0.65H to 1.25H, so the visible band is the
 * bottom ~35% and the lower arc crops past the closing hairline. That crop is
 * the vault's crest composition, carried onto the thing that replaced it, and
 * the copy now sits on open paper.
 *
 * ax is the wider of "52% of the viewport" and "2.4x the vertical semi-axis".
 * The first governs from ~900px up and lands the figure at ~90% of the
 * viewport width — deliberately short of full bleed, so the band reads as a
 * placed figure rather than as something cropped by the window. The second is
 * a floor keeping it wider than it is tall on a narrow viewport, which is the
 * only place "wide" would otherwise be lost. */
const FIG_CY_FRAC = 0.95;
const FIG_AX_W_FRAC = 0.52;
const FIG_MIN_ASPECT = 1.9;

/* The vertical semi-axis is smaller on a phone, and that is what keeps the
   aspect floor honest rather than being a second, hidden width control: a
   narrow viewport is also a TALL one, so 0.30 of its height fed the floor a
   large number and blew the figure out to three times the viewport width.
   All you saw then was a sparse sliver of the middle. */
const FIG_AY_FRAC = 0.3;
const FIG_AY_FRAC_NARROW = 0.22;

/* The Bitcoin mark's cycle. One event per 72 seconds.
 *
 * Full by 14s, inside a first read — the retired vault's own lesson, which
 * opened on a 26s hold and meant most visits never saw the door. Recession is
 * longer than the surface (10s against 8s) for the reason the retired loop
 * used 6 in and 8 out: a thing that leaves more slowly than it arrives does
 * not call attention to its exit. 17% of the cycle at full strength, 42%
 * visible at all, is not a ticker. */
const CYCLE_SECONDS = 72;
const BTC_IN_START = 6;
const BTC_IN_END = 14;
const BTC_OUT_START = 26;
const BTC_OUT_END = 36;

/* Mid-depth, so the mark sits INSIDE the ellipsoid between its near and far
   walls rather than stuck on the front of it. Because the painter buckets by
   ink and draws high-`white` first, this makes the mark sort itself after the
   far marks and before the nearest ones at no cost. */
const BTC_DEPTH = 0.86;
const BTC_ALPHA = 0.92;
/* How much the field steps back inside the mark's coverage. The density does
   the work, not the opacity — this is a clearing, not a knockout. */
const BTC_CLEAR = 0.92;
/* The mark's marks run a little heavier than the field's at the same depth.
   Ink gathering, not a second weight: at parity the mark disappeared into the
   contour rows it sits between. */
const BTC_R_MUL = 1.3;

/* The mark takes essentially the whole band between the copy and the fold.
   That band is smaller than it looks — at 1440x900 the copy block runs to
   657px of an 843px hero, leaving 172 — so an earlier 0.62 fraction put the
   mark on its 110px floor, small enough to read as a watermark. */
const BTC_GAP = 14;
const BTC_MIN_CLEAR = 132;
const BTC_H_FRAC = 0.98;
const BTC_H_MIN = 116;
const BTC_H_MAX = 230;
const BTC_H_W_CAP = 0.42;
/* Fallback when `.hero-spec__content` cannot be found — see measureContent. */
const BTC_CONTENT_FALLBACK = 0.67;

/* The instant a reduced-motion visitor is shown: mid-hold, mark fully formed.
   A real frame of the animation rather than a special case, so toggling the
   OS setting mid-session does not change the picture. */
const STATIC_WALL = 20;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smoothstep = (v: number) => v * v * (3 - 2 * v);

/** The mode's own swell, quoted from engine.es.js:161 (v0.3.1). */
const swell = (t: number, p: number) =>
  0.62 * Math.sin(t * 2.1 - p * 0.52) + 0.38 * Math.sin(t * 1.27 + p * 0.83);

function revealAt(wall: number): number {
  const p = wall % CYCLE_SECONDS;
  if (p < BTC_IN_START) return 0;
  if (p < BTC_IN_END) {
    return smoothstep((p - BTC_IN_START) / (BTC_IN_END - BTC_IN_START));
  }
  if (p < BTC_OUT_START) return 1;
  if (p < BTC_OUT_END) {
    return (
      1 - smoothstep((p - BTC_OUT_START) / (BTC_OUT_END - BTC_OUT_START))
    );
  }
  return 0;
}

export default function HeroOrb() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const painter = createDotPainter();
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqDark = window.matchMedia("(prefers-color-scheme: dark)");

    let disposed = false;
    let running = false;
    let inView = false;
    let raf = 0;
    let resizeRaf = 0;
    let lastPaint = -1e9;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let dark = false;
    let glyph: GlyphSample | null = null;

    /* Stage, recomputed on resize only. */
    let opts: ModeOpts = WIDE_OPTS;
    let rings = 26;
    let figCx = 0;
    let figCy = 0;
    let figAy = 1;
    let kx = 1;
    let ky = 1;
    let deadY = 0;

    /* The mark's own stage. Null means it stands down for this geometry. */
    let btcCx = 0;
    let btcCy = 0;
    let btcH = 0;
    let btcW = 0;
    let btcOn = false;

    const resolveDark = () => {
      const attr = document.documentElement.dataset.theme;
      if (attr === "dark") return true;
      if (attr === "light") return false;
      return mqDark.matches;
    };

    /**
     * The mark stages in the band between the bottom of the copy and the
     * fold, MEASURED rather than assumed: a fixed fraction collides with the
     * CTAs on a short hero, and the copy block's height changes when
     * GT-Standard lands. When the band is too short to hold the mark it
     * stands down entirely — the same move the retired round trip made below
     * 768px, and for the same reason: a wrong picture ranks below no picture.
     *
     * This reaches across into page.tsx's markup. If `.hero-spec__content`
     * is ever renamed the fallback keeps the figure working and the mark
     * simply stages against a fraction again, so the coupling rots quietly
     * rather than crashing. It is noted in page.tsx too.
     */
    const measureContent = () => {
      const content = wrap
        .closest(".hero-spec")
        ?.querySelector(".hero-spec__content");
      if (!content) return height * BTC_CONTENT_FALLBACK;
      const cr = content.getBoundingClientRect();
      const wr = wrap.getBoundingClientRect();
      return cr.bottom - wr.top;
    };

    const layout = () => {
      const narrow = width < NARROW_BREAKPOINT;
      opts = narrow ? NARROW_OPTS : WIDE_OPTS;
      rings = (opts.rings as number) ?? 26;

      figCx = width / 2;
      figCy = height * FIG_CY_FRAC;
      figAy = height * (narrow ? FIG_AY_FRAC_NARROW : FIG_AY_FRAC);
      const figAx = Math.max(width * FIG_AX_W_FRAC, figAy * FIG_MIN_ASPECT);
      kx = figAx / UNIT;
      ky = figAy / UNIT;
      deadY = height * MASK_DEAD_TOP;

      const contentBottom = measureContent();
      const clear = height - contentBottom - BTC_GAP;
      if (!glyph || clear < BTC_MIN_CLEAR) {
        btcOn = false;
        return;
      }
      btcOn = true;
      /* Also capped against the viewport width: the band below the copy is
         proportionally DEEPER on a phone (the CTAs stack), so height alone
         let the mark reach 59% of a 390px screen, where it stopped being a
         mark in a field and became the page's logo. */
      btcH = Math.min(
        BTC_H_MAX,
        width * BTC_H_W_CAP,
        Math.max(BTC_H_MIN, clear * BTC_H_FRAC),
      );
      btcW = btcH * glyph.aspect;
      btcCx = width / 2;
      btcCy = contentBottom + BTC_GAP + clear / 2;
    };

    /** Dilated coverage of the mark at a point, 0 or 1. */
    const coverAt = (x: number, y: number) => {
      if (!glyph) return 0;
      const u = (x - (btcCx - btcW / 2)) / btcW;
      if (u < 0 || u >= 1) return 0;
      const v = (y - (btcCy - btcH / 2)) / btcH;
      if (v < 0 || v >= 1) return 0;
      return glyph.cover[((v * COVER_N) | 0) * COVER_N + ((u * COVER_N) | 0)];
    };

    const paint = (wall: number) => {
      if (!width || !height) return;
      const t = wall * T_PER_SEC;
      const frame = FRAME(GEOM_SIZE, t, opts);
      const reveal = revealAt(wall);
      const marking = btcOn && glyph !== null && reveal > 0.01;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      painter.begin(dark);

      const half = GEOM_SIZE / 2;
      const clearMul = 1 - BTC_CLEAR * reveal;
      const dots = frame.dots;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const x = figCx + (d.x - half) * kx;
        if (x < -4 || x > width + 4) continue;
        const y = figCy + (d.y - half) * ky;
        if (y < deadY || y > height + 4) continue;
        const a = marking && coverAt(x, y) ? clearMul : 1;
        painter.push(x, y, d.r, d.white, a);
      }

      if (marking && glyph) {
        const alpha = BTC_ALPHA * reveal;
        const pts = glyph.points;
        for (let i = 0; i < pts.length; i++) {
          const gp = pts[i];
          const x = btcCx + gp.gx * btcH;
          if (x < -4 || x > width + 4) continue;
          const y = btcCy + gp.gy * btcH;
          if (y < deadY || y > height + 4) continue;

          /* The field's own swell travels through the mark. p = 0 is the
             south pole (the projector flips y), so the bottom of the figure
             samples the low ring indices and the crest visibly passes down
             through the letterform on its way. This is the detail that makes
             the mark read as part of the field rather than over it. */
          const yn = Math.max(-1, Math.min(1, (y - figCy) / figAy));
          const w = swell(t, (0.5 - 0.5 * yn) * rings);
          const g = clamp01(BTC_DEPTH + 0.09 * w + 0.1 * (gp.h - 0.5));
          const d = w > 0 ? w : 0;
          /* wave's own radius and ink laws, engine.es.js:168-169. */
          const r =
            (DOT_R_BASE + DOT_R_DEPTH * g) * (1 + 0.4 * d) * RS * BTC_R_MUL;
          painter.push(
            x,
            y,
            Math.max(opts.rMin ?? 0.45, r),
            0.66 - 0.56 * g - 0.1 * d,
            alpha,
          );
        }
      }

      painter.flush(ctx);
    };

    const paintNow = () =>
      paint(mqReduce.matches ? STATIC_WALL : performance.now() / 1000);

    const loop = () => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      const now = performance.now();
      if (now - lastPaint < MIN_FRAME_MS) return;
      lastPaint = now;
      paint(now / 1000);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const start = () => {
      if (running || mqReduce.matches) return;
      running = true;
      lastPaint = -1e9;
      raf = requestAnimationFrame(loop);
    };

    const sync = () => {
      if (inView && !mqReduce.matches && document.visibilityState === "visible") {
        start();
      } else {
        stop();
        /* Reduced motion arriving mid-run must not leave the last animated
           frame on screen as the "static" one. */
        if (mqReduce.matches) paint(STATIC_WALL);
      }
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (!w || !h) return;
      /* Re-resolved here rather than captured at setup: dragging the window
         to a different-DPI display fires a resize but never a reload. */
      const nextDpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
      if (w === width && h === height && nextDpr === dpr) return;
      width = w;
      height = h;
      dpr = nextDpr;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      layout();
      // Resizing clears the backing store; repaint at once so a paused or
      // reduced-motion field does not blank out on a viewport change.
      paintNow();
    };

    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    };

    const onTheme = () => {
      const next = resolveDark();
      if (next === dark) return;
      dark = next;
      if (!running) paintNow();
    };

    dark = resolveDark();

    /* The mark's raster resolves its face from the wrapper's computed family
       (ctx.font cannot take a CSS var). Sampling is deferred until the font
       is actually loaded, then re-run once fonts.ready settles — on a cold
       connection the first cycle may pass with a system B or no mark at all,
       which is acceptable and cannot crash. */
    const sampleGlyph = () => {
      if (disposed) return;
      const family = getComputedStyle(wrap).fontFamily;
      /* Coarse on purpose. 260 points across a ~170px mark is a ~10px pitch
         against the field's ~18px, which is near enough to read as the same
         material; the first pass ran finer and the mark looked like a
         different texture pasted onto the field. */
      const next = sampleBtc(family, 240);
      if (!next) return;
      glyph = next;
      layout();
      if (!running) paintNow();
    };

    const family = getComputedStyle(wrap).fontFamily;
    try {
      const load = document.fonts.load(`600 220px ${family}`, "B");
      void load.then(sampleGlyph).catch(() => {});
    } catch {
      /* FontFaceSet.load rejects on an unparsable spec — fall through to the
         fonts.ready pass below, which needs no spec. */
    }
    void document.fonts.ready.then(sampleGlyph).catch(() => {});
    sampleGlyph();

    resize();

    const ro = new ResizeObserver(onResize);
    ro.observe(wrap);

    /* Generous margin so scrolling back to the top never catches a blank
       frame while the first paint is still queued. */
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[entries.length - 1].isIntersecting;
        sync();
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(canvas);

    const mo = new MutationObserver(onTheme);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    document.addEventListener("visibilitychange", sync);
    mqReduce.addEventListener("change", sync);
    mqDark.addEventListener("change", onTheme);

    return () => {
      disposed = true;
      stop();
      cancelAnimationFrame(resizeRaf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", sync);
      mqReduce.removeEventListener("change", sync);
      mqDark.removeEventListener("change", onTheme);
    };
  }, []);

  return (
    <div ref={wrapRef} className="hero-orb" aria-hidden>
      <canvas ref={canvasRef} className="hero-orb__canvas" />
    </div>
  );
}
