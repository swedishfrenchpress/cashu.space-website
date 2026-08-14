/**
 * The terrain field — the ASCII hero's base material, and the upstream
 * reference the wallet's native ports mirror.
 *
 * Three fractal octaves of layered sinusoidal noise produce a heightfield;
 * cells near a contour line (height mod spacing) intensify, so drifting
 * topographic ridgelines emerge from a quiet dotted plain. Motion is
 * threshold-crossing, not shimmer: the surface drifts and cells promote or
 * demote through the glyph ramp as contour rings sweep past them.
 *
 * This module is pinned by fixtures outside this repo. cashubtc/wallet ships
 * `AsciiFieldTerrain` in Swift and Kotlin, both generated from
 * `docs/product/ascii-field-vectors.json`, which was generated from *this*
 * code. Retuning any coefficient here is a keep-in-lockstep edit across four
 * files in that repo. Transposing one produces terrain that looks plausible
 * and is silently wrong.
 */

/** Grid units. The whole field — terrain, vault, schematic — is expressed in
 *  these, so a warped sample rides every layer identically. */
export const CELL_W = 12;
export const CELL_H = 14;

/** Cell index → noise-space. `(col + 0.5) * TERRAIN_SCALE`, i.e. sampled at
 *  cell centres. The half-cell offset is load-bearing: the vault's own
 *  mapping (`px / CELL_W * TERRAIN_SCALE`) only agrees with this because the
 *  offset is carried through both. Don't "simplify" either one. */
export const TERRAIN_SCALE = 0.13;

const CONTOUR_SPACING = 0.08;

/* Brightness thresholds ascend toward the stronger glyph; cells below the
   first threshold stay empty. High contours rotate through fiat symbols,
   while the strongest level uses the runtime-resolved peak glyph (₿ when the
   font carries it, else B). */
export const LEVEL_MIN = [40, 90, 140, 200, 216];
export const LEVEL_GLYPH = ["·", "/", ",", "", ""];
export const CURRENCY_GLYPHS = ["$", "¥", "€"];
export const CURRENCY_LEVEL = 3;
export const PEAK_LEVEL = 4;

/**
 * Promotes the top of the currency band straight to ₿, roughly doubling the
 * ₿ on screen without touching `pickLevel` — which stays verbatim so the
 * wallet's golden vectors still pin both ports. Adopted from the wallet
 * (`AsciiFieldTerrain.PEAK_BOOST`), where it was the one deliberate
 * divergence from web; taking it here converges the two rather than adding a
 * third behaviour.
 */
export const PEAK_BOOST = 208;

/** The zinc ramp, mirrored between schemes: light ink on dark paper, dark ink
 *  on light paper. Monochrome by doctrine (DESIGN.md §2). */
export const FILLS = {
  light: ["#d4d4d8", "#a1a1aa", "#71717a", "#52525b", "#3f3f46"],
  dark: ["#3f3f46", "#52525b", "#71717a", "#a1a1aa", "#d4d4d8"],
};

/**
 * Five sinusoidal terms. Every one of them is separable — terms 1, 3 and 5
 * are already x-factor × y-factor, and terms 2 and 4 expand through
 * `sin(A+B) = sinA·cosB + cosA·sinB`. `buildField` below exploits that; this
 * function stays as the reference the fast path is checked against.
 */
export function noise(x: number, y: number, t: number): number {
  return (
    Math.sin(0.8 * x + 0.3 * t) * Math.cos(0.6 * y + 0.2 * t) * 0.5 +
    0.25 * Math.sin(1.6 * x + 1.2 * y + 0.15 * t) +
    Math.sin(0.3 * x - 0.4 * t) * Math.cos(0.4 * y + 0.25 * t) * 0.6 +
    0.3 * Math.sin(0.5 * (x + y) + 0.35 * t) +
    Math.sin(2.5 * x + 0.1 * t) * Math.cos(2.8 * y - 0.12 * t) * 0.15
  );
}

/** Three octaves, lacunarity ~2.2 then 4.5, gain 0.4 then 0.15, with slower
 *  time on the higher octaves so fine detail crawls rather than boils. */
export function fractal(x: number, y: number, t: number): number {
  return (
    noise(x, y, t) +
    0.4 * noise(2.2 * x, 2.2 * y, 0.7 * t) +
    0.15 * noise(4.5 * x, 4.5 * y, 0.4 * t)
  );
}

/**
 * Weight of the open field between contour lines.
 *
 * At band size the field covered ~94% of its cells and read as texture. Full
 * bleed the same 94% is a wall of glyphs that fights the headline and leaves
 * the scenes nowhere to appear. This scales only the *off-contour* fill; every
 * contour line keeps full strength, so the ridgelines are untouched.
 *
 * The value is chosen for what it does to the ramp, not to coverage. Measured
 * over four frames at 1440×820:
 *
 *   gain   coverage   ·      /      ,      $¥€    ₿
 *   1.00   94.1%      57.4%  20.8%  14.6%  0.7%   0.6%
 *   0.68   ~81%       57.4%  7.4%   14.6%  0.7%   0.6%
 *   0.52   52.4%      29.2%  7.3%   14.6%  0.7%   0.6%
 *
 * Dropping to 0.52 punches real holes, and because the thinning is a threshold
 * on a smooth heightfield the holes arrive as large connected voids — the
 * field reads as blotchy rather than airy. At 0.68 coverage barely moves but
 * a seventh of the grid demotes from `/` to `·`, which is both a smaller mark
 * and a lighter tone (#a1a1aa → #d4d4d8). The field gets quieter without
 * getting patchy, which is the actual goal.
 *
 * 1 restores the wallet's exact field, which is what the fixtures pin.
 */
export const OPEN_FIELD_GAIN = 0.68;

export function brightness(
  x: number,
  y: number,
  t: number,
  openGain = 1,
): number {
  const r = Math.min(1, Math.max(0, (fractal(x, y, t) + 1.8) / 3.6));
  const s = (r % CONTOUR_SPACING) / CONTOUR_SPACING;
  const onContour = s < 0.12 || s > 0.88;
  let b = onContour
    ? Math.round(200 * r + 55)
    : Math.round(140 * r * openGain);
  if (onContour) {
    /* Steeper terrain sharpens its contour line. */
    const gx = noise(x + 0.01, y, t) - noise(x - 0.01, y, t);
    const gy = noise(x, y + 0.01, t) - noise(x, y - 0.01, t);
    const d = 12 * Math.hypot(gx, gy);
    if (d > 0.5) b = Math.min(255, b + Math.round(40 * d));
  }
  return b;
}

/** The ramp lookup the fixtures pin. Kept free of PEAK_BOOST on purpose. */
export function pickLevel(b: number): number {
  for (let i = LEVEL_MIN.length - 1; i >= 0; i--) {
    if (b >= LEVEL_MIN[i]) return i;
  }
  return -1;
}

/** What the renderer actually draws: `pickLevel` plus the ₿ promotion. */
export function displayLevel(b: number): number {
  if (b >= PEAK_BOOST) return PEAK_LEVEL;
  return pickLevel(b);
}

/* ------------------------------------------------------------------------ *
 * Separable fast path
 *
 * The field went from a 320px band (~2,900 cells) to the whole hero (~7,300
 * at 1440×820, ~19,000 at 2560×1440). At 24-56 trig calls per cell the naive
 * loop costs millions of transcendental ops a second, which is the difference
 * between "runs on your laptop" and "runs".
 *
 * Every term of `noise` is separable into an x-only factor times a y-only
 * factor — terms 1, 3 and 5 already are, and terms 2 and 4 expand through
 * sin(A+B) = sinA·cosB + cosA·sinB:
 *
 *   0.25·sin(1.6x + 1.2y + 0.15t)
 *     = 0.25·[sin(1.6x+0.15t)·cos(1.2y) + cos(1.6x+0.15t)·sin(1.2y)]
 *   0.30·sin(0.5x + 0.5y + 0.35t)
 *     = 0.30·[sin(0.5x+0.35t)·cos(0.5y) + cos(0.5x+0.35t)·sin(0.5y)]
 *
 * So one pass per frame builds seven trig values per column and seven per
 * row, and each cell collapses to seven multiply-adds. Trig calls per frame
 * drop from O(cols·rows) to O(cols+rows) — about 20× fewer at hero size.
 *
 * Angle addition is exact over the reals, so this differs from `noise` only
 * by float rounding (~1e-15). That cannot change a drawn glyph: the ramp
 * thresholds are integers reached through `Math.round`, and the one place a
 * tiny nudge could flip a classification — `r % CONTOUR_SPACING` landing on a
 * multiple — is exactly where both `s < 0.12` and `s > 0.88` agree that the
 * cell is on a contour. `assertFastPathMatches` pins it in development.
 * ------------------------------------------------------------------------ */

/** Trig values held per column and per row, per octave. */
const PARTS = 7;

/* Octave scale, time factor, and weight — `fractal`, unrolled. */
const OCT_SCALE = [1, 2.2, 4.5];
const OCT_TIME = [1, 0.7, 0.4];
const OCT_WEIGHT = [1, 0.4, 0.15];

/* Five blocks in each table: three octaves, then the base octave shifted by
   ∓0.01 for the contour-gradient finite difference (which samples `noise`,
   not `fractal`, so only the base octave needs the offsets). */
const BLOCKS = 5;
const BLOCK_OCT0 = 0;
const BLOCK_MINUS = 3;
const BLOCK_PLUS = 4;

const GRADIENT_EPS = 0.01;

function fillX(dst: Float64Array, at: number, x: number, t: number): void {
  dst[at] = Math.sin(0.8 * x + 0.3 * t);
  dst[at + 1] = Math.sin(1.6 * x + 0.15 * t);
  dst[at + 2] = Math.cos(1.6 * x + 0.15 * t);
  dst[at + 3] = Math.sin(0.3 * x - 0.4 * t);
  dst[at + 4] = Math.sin(0.5 * x + 0.35 * t);
  dst[at + 5] = Math.cos(0.5 * x + 0.35 * t);
  dst[at + 6] = Math.sin(2.5 * x + 0.1 * t);
}

function fillY(dst: Float64Array, at: number, y: number, t: number): void {
  dst[at] = Math.cos(0.6 * y + 0.2 * t);
  dst[at + 1] = Math.cos(1.2 * y);
  dst[at + 2] = Math.sin(1.2 * y);
  dst[at + 3] = Math.cos(0.4 * y + 0.25 * t);
  dst[at + 4] = Math.cos(0.5 * y);
  dst[at + 5] = Math.sin(0.5 * y);
  dst[at + 6] = Math.cos(2.8 * y - 0.12 * t);
}

/** Recombines an x-slice and a y-slice into one `noise` sample. */
function combine(
  xs: Float64Array,
  xi: number,
  ys: Float64Array,
  yi: number,
): number {
  return (
    0.5 * xs[xi] * ys[yi] +
    0.25 * (xs[xi + 1] * ys[yi + 1] + xs[xi + 2] * ys[yi + 2]) +
    0.6 * xs[xi + 3] * ys[yi + 3] +
    0.3 * (xs[xi + 4] * ys[yi + 4] + xs[xi + 5] * ys[yi + 5]) +
    0.15 * xs[xi + 6] * ys[yi + 6]
  );
}

export type TerrainField = {
  /** Sizes the tables. Cheap and idempotent when the grid hasn't changed. */
  resize(cols: number, rows: number): void;
  /** Rebuilds every trig table for time `t`. Call once per frame. */
  update(t: number): void;
  /** `brightness` at the centre of cell (col, row), from the tables. */
  brightnessAt(col: number, row: number): number;
};

/**
 * Owns the per-frame trig tables. One instance per canvas, reused across
 * frames; the buffers only reallocate when the grid grows.
 */
export function createTerrainField(openGain = 1): TerrainField {
  let xs = new Float64Array(0);
  let ys = new Float64Array(0);
  let cols = 0;
  let rows = 0;

  return {
    resize(nextCols: number, nextRows: number): void {
      if (nextCols === cols && nextRows === rows) return;
      cols = nextCols;
      rows = nextRows;
      const wantX = BLOCKS * cols * PARTS;
      const wantY = BLOCKS * rows * PARTS;
      if (xs.length < wantX) xs = new Float64Array(wantX);
      if (ys.length < wantY) ys = new Float64Array(wantY);
    },

    update(t: number): void {
      for (let o = 0; o < OCT_SCALE.length; o++) {
        const m = OCT_SCALE[o];
        const ot = OCT_TIME[o] * t;
        const xBase = o * cols * PARTS;
        for (let col = 0; col < cols; col++) {
          fillX(xs, xBase + col * PARTS, m * (col + 0.5) * TERRAIN_SCALE, ot);
        }
        const yBase = o * rows * PARTS;
        for (let row = 0; row < rows; row++) {
          fillY(ys, yBase + row * PARTS, m * (row + 0.5) * TERRAIN_SCALE, ot);
        }
      }
      /* Base-octave offsets for the contour gradient. */
      const xMinus = BLOCK_MINUS * cols * PARTS;
      const xPlus = BLOCK_PLUS * cols * PARTS;
      for (let col = 0; col < cols; col++) {
        const x = (col + 0.5) * TERRAIN_SCALE;
        fillX(xs, xMinus + col * PARTS, x - GRADIENT_EPS, t);
        fillX(xs, xPlus + col * PARTS, x + GRADIENT_EPS, t);
      }
      const yMinus = BLOCK_MINUS * rows * PARTS;
      const yPlus = BLOCK_PLUS * rows * PARTS;
      for (let row = 0; row < rows; row++) {
        const y = (row + 0.5) * TERRAIN_SCALE;
        fillY(ys, yMinus + row * PARTS, y - GRADIENT_EPS, t);
        fillY(ys, yPlus + row * PARTS, y + GRADIENT_EPS, t);
      }
    },

    brightnessAt(col: number, row: number): number {
      let f = 0;
      for (let o = 0; o < OCT_SCALE.length; o++) {
        f +=
          OCT_WEIGHT[o] *
          combine(
            xs,
            (o * cols + col) * PARTS,
            ys,
            (o * rows + row) * PARTS,
          );
      }
      const r = Math.min(1, Math.max(0, (f + 1.8) / 3.6));
      const s = (r % CONTOUR_SPACING) / CONTOUR_SPACING;
      const onContour = s < 0.12 || s > 0.88;
      let b = onContour
        ? Math.round(200 * r + 55)
        : Math.round(140 * r * openGain);
      if (onContour) {
        const x0 = (BLOCK_OCT0 * cols + col) * PARTS;
        const y0 = (BLOCK_OCT0 * rows + row) * PARTS;
        const gx =
          combine(xs, (BLOCK_PLUS * cols + col) * PARTS, ys, y0) -
          combine(xs, (BLOCK_MINUS * cols + col) * PARTS, ys, y0);
        const gy =
          combine(xs, x0, ys, (BLOCK_PLUS * rows + row) * PARTS) -
          combine(xs, x0, ys, (BLOCK_MINUS * rows + row) * PARTS);
        const d = 12 * Math.hypot(gx, gy);
        if (d > 0.5) b = Math.min(255, b + Math.round(40 * d));
      }
      return b;
    },
  };
}

/**
 * Development-only guard: proves `createTerrainField` still agrees with
 * `brightness`, so a future edit to one can't silently desync from the other
 * — or from the wallet's golden vectors, which pin `brightness`.
 */
export function assertFastPathMatches(
  cols = 41,
  rows = 29,
  t = 2.5,
  openGain = 1,
): { checked: number; mismatches: number; worst: number } {
  const field = createTerrainField(openGain);
  field.resize(cols, rows);
  field.update(t);
  let mismatches = 0;
  let worst = 0;
  for (let row = 0; row < rows; row++) {
    const y = (row + 0.5) * TERRAIN_SCALE;
    for (let col = 0; col < cols; col++) {
      const want = brightness((col + 0.5) * TERRAIN_SCALE, y, t, openGain);
      const got = field.brightnessAt(col, row);
      const delta = Math.abs(want - got);
      if (delta > worst) worst = delta;
      if (delta !== 0) mismatches++;
    }
  }
  return { checked: cols * rows, mismatches, worst };
}

/* Stable spatial hash: a cell always keeps the same currency, so motion comes
   from the terrain crossing thresholds rather than random shimmer. Keyed on
   pixel position, so the grid must never resize mid-transition or the whole
   texture re-hashes and swims. */
export function pickCurrencyGlyph(px: number, py: number): string {
  const col = Math.floor(px / CELL_W);
  const row = Math.floor(py / CELL_H);
  const hash = Math.imul(col, 31) ^ Math.imul(row, 17);
  const mixed = Math.imul(hash ^ (hash >>> 13), 1274126177);
  return CURRENCY_GLYPHS[(mixed >>> 0) % CURRENCY_GLYPHS.length];
}
