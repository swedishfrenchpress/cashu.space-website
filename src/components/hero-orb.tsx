"use client";

import { useEffect, useRef } from "react";
import { MODE_FRAMES, resolvePreset, type ModeOpts } from "thinking-orbs/engine";
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
 * NO FIGURE IN THE FIELD. A Bitcoin mark used to surface out of the field and
 * recede on a 72s cycle — a point set sampled from a rasterised ₿, with the
 * field clearing to let its silhouette read. It was removed 2026-08-16 on the
 * user's direction, and with it `src/lib/orb/btc-glyph.ts`, the reveal cycle,
 * the coverage-clearing pass, and the measurement of `.hero-spec__content`
 * that staged it. The ground asserts nothing and depicts nothing now, which
 * is the plainest reading of the Honest-Network Rule's material branch.
 * Don't reintroduce a mark here without reading that rule first.
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

   42 was tried and is not the answer either — at that pitch the contour rows
   crowd into a continuous tone and the thing stops reading as a dot field. */
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
 * the copy sits on open paper.
 *
 * ax is the wider of "52% of the viewport" and "1.9x the vertical semi-axis".
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

/* The instant a reduced-motion visitor is shown. A real frame of the
   animation rather than a special case, so a visitor who toggles the OS
   setting mid-session sees the same picture either way. At T_PER_SEC it puts
   the swell mid-excursion, which is the figure at its most legible: at a
   crest the rings bunch, at a trough they spread. */
const STATIC_WALL = 20;

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

    let running = false;
    let inView = false;
    let raf = 0;
    let resizeRaf = 0;
    let lastPaint = -1e9;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let dark = false;

    /* Stage, recomputed on resize only. */
    let opts: ModeOpts = WIDE_OPTS;
    let figCx = 0;
    let figCy = 0;
    let kx = 1;
    let ky = 1;
    let deadY = 0;

    const resolveDark = () => {
      const attr = document.documentElement.dataset.theme;
      if (attr === "dark") return true;
      if (attr === "light") return false;
      return mqDark.matches;
    };

    const layout = () => {
      const narrow = width < NARROW_BREAKPOINT;
      opts = narrow ? NARROW_OPTS : WIDE_OPTS;

      figCx = width / 2;
      figCy = height * FIG_CY_FRAC;
      const figAy = height * (narrow ? FIG_AY_FRAC_NARROW : FIG_AY_FRAC);
      const figAx = Math.max(width * FIG_AX_W_FRAC, figAy * FIG_MIN_ASPECT);
      kx = figAx / UNIT;
      ky = figAy / UNIT;
      deadY = height * MASK_DEAD_TOP;
    };

    const paint = (wall: number) => {
      if (!width || !height) return;
      const frame = FRAME(GEOM_SIZE, wall * T_PER_SEC, opts);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      painter.begin(dark);

      const half = GEOM_SIZE / 2;
      const dots = frame.dots;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const x = figCx + (d.x - half) * kx;
        if (x < -4 || x > width + 4) continue;
        const y = figCy + (d.y - half) * ky;
        if (y < deadY || y > height + 4) continue;
        painter.push(x, y, d.r, d.white, 1);
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
