/**
 * DotPainter — a bucketed, allocation-free painter for thinking-orbs frames.
 *
 * The library's own `paint()` is a straight per-dot loop:
 *
 *     for (const d of dots) {
 *       const c = clamp01(d.white);
 *       const M = Math.round((dark ? 1 - c : c) * 255);
 *       ctx.fillStyle = `rgba(${M},${M},${M},${a})`;
 *       ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
 *     }
 *
 * At avatar scale that is 150 dots and nobody cares. The hero runs ~4,200,
 * and the per-dot cost that does not scale is the `fillStyle` assignment: a
 * template-literal allocation plus a CSS colour parse, roughly 0.4µs, so
 * ~1.7ms of every frame spent re-parsing a few dozen distinct greys — plus
 * 100k+ short-lived strings a second handed to the GC.
 *
 * So: quantise the ink, group the dots that share it, and issue one
 * `fillStyle` and one `fill()` per group. ~4,200 state changes become ~80.
 * The arcs still cost what arcs cost; everything around them stops costing.
 *
 * THE INK FORMULA IS THE LIBRARY'S, QUOTED VERBATIM from the shipped bundle
 * (`node_modules/thinking-orbs/dist/engine.es.js:32-37`, v0.3.1):
 *
 *     const c = Math.min(1, Math.max(0, a.white));
 *     const M = Math.round((dark ? 1 - c : c) * 255);
 *
 * That is not incidental. The hero and the four protocol-parts plates have
 * to be the same ink language *by construction*, not by two implementations
 * that happen to agree today — so this file is the single place the hero
 * departs from the library's painter, and this comment is the diff target
 * if the library ever retunes it. `white` is an ink value: 0 is darkest ink
 * on paper, and dark substrates mirror it so near marks read bright.
 */

/* Quantisation. 32 ink levels is well past what a 2-3px mark can show — the
   ASCII field this replaced carried five levels total for the same job. 32
   alpha levels exist for a different reason: the Bitcoin mark fades in over
   eight seconds, and a coarse alpha ramp would step visibly on the way. At
   32 the ramp advances ~4 times a second in 3% increments, which is nothing.

   1024 buckets is a lookup table, not a working set: a frame touches ~80 of
   them, and flush cost is proportional to the ones that have dots in them. */
const WHITE_LEVELS = 32;
const ALPHA_LEVELS = 32;
const BUCKETS = WHITE_LEVELS * ALPHA_LEVELS;

/* The library drops marks under this before sorting (`finalizeFrame`).
   Matched here so a mark the engine would have discarded does not survive
   just because it took our path instead. */
const MIN_ALPHA = 0.02;

const TAU = Math.PI * 2;

export type DotPainter = {
  /** Start a frame. `dark` selects the ink mirror; costs a pointer swap. */
  begin(dark: boolean): void;
  /** Queue one mark. Out-of-range `white`/`alpha` are clamped, not rejected. */
  push(x: number, y: number, r: number, white: number, alpha: number): void;
  /** Draw everything queued since `begin`, far to near, and reset. */
  flush(ctx: CanvasRenderingContext2D): void;
};

function styleFor(bucket: number, dark: boolean): string {
  const q = (bucket / ALPHA_LEVELS) | 0;
  const aq = bucket - q * ALPHA_LEVELS;
  const white = q / (WHITE_LEVELS - 1);
  const alpha = aq / (ALPHA_LEVELS - 1);
  // Verbatim, see the header.
  const m = Math.round((dark ? 1 - white : white) * 255);
  return `rgba(${m},${m},${m},${alpha})`;
}

export function createDotPainter(): DotPainter {
  /* One flat [x, y, r, x, y, r, ...] run per bucket. Reset by zeroing the
     length table rather than the arrays, so the backing stores are allocated
     during the first few frames and then reused forever — the steady state
     allocates nothing at all. */
  const runs: number[][] = Array.from({ length: BUCKETS }, () => []);
  const lens = new Int32Array(BUCKETS);

  /* Two caches, not one keyed by theme. The site's hero ground follows the
     scheme, so `dark` really does flip mid-session; keeping a resolved array
     per theme makes `begin()` a pointer swap with no branch in the hot loop
     and no cache to invalidate. Lazily filled — a visitor who never toggles
     never builds the second one. */
  const cache: [Array<string | undefined>, Array<string | undefined>] = [
    new Array(BUCKETS),
    new Array(BUCKETS),
  ];
  let active = cache[0];
  let activeDark = false;

  return {
    begin(dark: boolean) {
      activeDark = dark;
      active = cache[dark ? 1 : 0];
    },

    push(x: number, y: number, r: number, white: number, alpha: number) {
      if (alpha < MIN_ALPHA) return;
      const w = white < 0 ? 0 : white > 1 ? 1 : white;
      const a = alpha > 1 ? 1 : alpha;
      const q = ((w * (WHITE_LEVELS - 1) + 0.5) | 0) * ALPHA_LEVELS;
      const k = q + ((a * (ALPHA_LEVELS - 1) + 0.5) | 0);
      const run = runs[k];
      const n = lens[k];
      run[n] = x;
      run[n + 1] = y;
      run[n + 2] = r;
      lens[k] = n + 3;
    },

    flush(ctx: CanvasRenderingContext2D) {
      /* Bucketing throws away `finalizeFrame`'s z-sort, so draw order has to
         come back from somewhere. It comes back from the ink: both modes in
         play derive `white` monotonically from depth (`wave` uses
         `0.66 - 0.56 * depth - ...`), so descending `white` IS far-to-near.
         Note this holds on both substrates — the bucket key is `white`, not
         the mirrored byte, so the order does not flip with the theme. */
      for (let q = WHITE_LEVELS - 1; q >= 0; q--) {
        const base = q * ALPHA_LEVELS;
        for (let aq = 0; aq < ALPHA_LEVELS; aq++) {
          const k = base + aq;
          const n = lens[k];
          if (n === 0) continue;

          let style = active[k];
          if (style === undefined) {
            style = styleFor(k, activeDark);
            active[k] = style;
          }
          ctx.fillStyle = style;

          const run = runs[k];
          ctx.beginPath();
          for (let i = 0; i < n; i += 3) {
            const x = run[i];
            const y = run[i + 1];
            const r = run[i + 2];
            /* `arc()` on a non-empty subpath draws a line from the current
               point to the arc's start. Without this `moveTo` every mark in
               a bucket is chained to the last by a hairline, which is the
               classic way batched-arc painters go wrong — and it looks like
               a deliberate constellation effect, so it survives review. */
            ctx.moveTo(x + r, y);
            ctx.arc(x, y, r, 0, TAU);
          }
          ctx.fill();
        }
      }
      lens.fill(0);
    },
  };
}
