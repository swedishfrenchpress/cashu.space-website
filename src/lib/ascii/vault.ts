/**
 * The vault door — the field's second scene.
 *
 * Ported from `docs/product/ascii-field-vault-mock.py` in cashubtc/wallet,
 * which is the source of truth both native ports mirror and the generator for
 * the parity vectors in `docs/product/ascii-field-vectors.json`. Retuning any
 * constant here is a keep-in-lockstep edit with that repo.
 *
 * Everything is analytic — rings, spokes and bolts are distance functions,
 * with one hand-authored 9×11 stencil for the ₿ monogram at the hub. There is
 * no image, no mask, no sampled art.
 *
 * Three porting traps, all of which the fixtures exist to catch:
 *
 *   1. Stencil indexing rounds half toward +∞ (`Math.floor(v + 0.5)`), which
 *      is Kotlin `Math.round` and JS `Math.round` semantics — not half-away.
 *   2. The living ink samples the terrain at the *unscaled* pixel position,
 *      through the same cell→noise mapping the renderer uses, so a warped
 *      vault sample rides the identical warped terrain sample.
 *   3. Transposing a coefficient in the terrain noise produces a field that
 *      looks plausible and is silently wrong.
 */

import { CELL_H, CELL_W } from "./terrain";

/* Grid units (pt/dp). In the wallet the vault is fixed size and only
   recenters; on the web it also scales — see `scale` on vaultBrightness. */
const OUTER_R = 146;
const OUTER_W = 11;
const OUTER_B = 196;
const INNER_R = 92;
const INNER_W = 9;
const INNER_B = 168;
const FACE_R = 152;
const FACE_B = 52;
const SPOKE_MIN_D = 24;
const SPOKE_MAX_D = 96;
const SPOKE_B = 176;
const SPOKE_ARC = 8;
const BOLT_R = 121;
const BOLT_HALF = 8;
const BOLT_B = 212;

/* 221, not a rounder number: at LIVE_GAIN 0.28 the monogram shows ₿ ~83% of
   the time with ~8 glyph trades/sec across its cells — one point lower reads
   $-heavy, one higher goes static. Measured against the terrain's own
   liveliness, not chosen. */
const STENCIL_PEAK_B = 221;
const STENCIL_CURRENCY_B = 202;

/* The living ink: the door's brightness is modulated by the *live terrain
   brightness at the same cell*, so ridgelines keep crawling through its
   structure. Terrain's motion is its contour cliffs (the mod-spacing
   discontinuity), which no amount of smooth noise shimmer reproduces;
   borrowing the terrain field wholesale is what makes the vault move exactly
   like the open field it grew out of. */
const LIVE_GAIN = 0.28;
const LIVE_PIVOT = 128;

/** Beyond this (times `scale`) the door contributes nothing: the living ink
 *  alone peaks at 0.28·(255−128) = 35.6, under the first draw threshold of
 *  40. The renderer's settled-vault fast path skips those cells outright. */
export const EXTENT_RADIUS = OUTER_R + OUTER_W; // 157

/** Where the blend back to open terrain finishes. Strictly outside the door. */
const COVER_EDGE = EXTENT_RADIUS * 1.22;

/** The central ₿ monogram: 2 = peak ink, 1 = currency-strength ink.
 *  Exported so the schematic scene can stamp the same mark for the token
 *  Alice ends up holding — one ₿ letterform across the whole field. */
export const MONOGRAM = [
  "....2....",
  ".222222..",
  ".2....22.",
  ".2.....2.",
  ".2....22.",
  ".222222..",
  ".2....22.",
  ".2.....2.",
  ".2....22.",
  ".222222..",
  "....2....",
];
const STENCIL_COLS = MONOGRAM[0].length;
const STENCIL_ROWS = MONOGRAM.length;

/** Ink at a stencil cell for an offset already divided by `scale`, or 0 when
 *  the offset falls outside the mark. Half-toward-+∞ rounding is load-bearing
 *  (see the header). */
export function monogramInk(
  dx: number,
  dy: number,
  peakB: number,
  currencyB: number,
): number {
  const col = Math.floor(dx / CELL_W + 0.5) + Math.floor(STENCIL_COLS / 2);
  const row = Math.floor(dy / CELL_H + 0.5) + Math.floor(STENCIL_ROWS / 2);
  if (row < 0 || row >= STENCIL_ROWS || col < 0 || col >= STENCIL_COLS) return 0;
  const c = MONOGRAM[row][col];
  if (c === "2") return peakB;
  if (c === "1") return currencyB;
  return 0;
}

/** Half-extent of the monogram in grid units, before scaling. */
export const MONOGRAM_HALF_W = (STENCIL_COLS / 2) * CELL_W;
export const MONOGRAM_HALF_H = (STENCIL_ROWS / 2) * CELL_H;

/** The wallet's stroke profile: a linear tent, full only at the exact radius. */
function ring(d: number, r: number, w: number): number {
  return Math.max(0, 1 - Math.abs(d - r) / w);
}

/**
 * Flat-topped stroke profile — full strength within `±w/2`, ramping to nothing
 * by `±w`.
 *
 * The tent above only holds a given ramp level over `0.57·w` of its width: for
 * the outer ring (196 against a level-2 floor of 140) that is `±3.1` grid
 * units. On a phone, where the wallet's vault fills the screen, that still
 * lands on cells often enough to read as a drawn circle. In a 1440px hero the
 * band works out thinner than one 14px row, so the rings dissolve into
 * scattered marks and only the monogram and spokes survive — which is exactly
 * what the first browser render showed.
 *
 * Widening `OUTER_W` instead would change the door's proportions and break the
 * fixtures. This keeps every radius and brightness identical and only changes
 * how the stroke falls off, so `plateau = false` is still bit-for-bit the
 * wallet's vault.
 */
export function band(d: number, r: number, w: number): number {
  const a = Math.abs(d - r);
  if (a <= w * 0.5) return 1;
  if (a >= w) return 0;
  return (w - a) / (w * 0.5);
}

/**
 * How much of this cell the door claims, 0 outside its reach to 1 well inside,
 * with a soft rim.
 *
 * The wallet doesn't need this: there the vault owns the screen, and outside
 * its reach the field is living ink alone (always sub-threshold) so the
 * surround is simply blank. A hero can't go blank — the terrain is the page's
 * ground and has to survive around the door. Weighting the morph by coverage
 * gives the door its full internal contrast where it exists and leaves the
 * landscape untouched where it doesn't.
 */
export function vaultCoverage(
  px: number,
  py: number,
  cx: number,
  cy: number,
  scale: number,
): number {
  const d = Math.hypot(px - cx, py - cy) / scale;
  /* Full coverage across the whole door, and the blend to terrain entirely
     *outside* it. Fading from 0.82·EXTENT_RADIUS inward put the falloff right
     on top of the outer ring (0.93·EXTENT_RADIUS), so the door's boldest
     feature was scaled to a third of its brightness and dropped a ramp level —
     the rings vanished from the hero while the monogram and spokes survived,
     which is precisely what the first browser render showed. Nothing the door
     draws lies beyond EXTENT_RADIUS, so the annulus past it is free to blend. */
  if (d <= EXTENT_RADIUS) return 1;
  if (d >= COVER_EDGE) return 0;
  const u = (COVER_EDGE - d) / (COVER_EDGE - EXTENT_RADIUS);
  return u * u * (3 - 2 * u);
}

/**
 * Door brightness at pixel (px, py) for a door centred at (cx, cy).
 *
 * `terrainB` is the terrain brightness already computed for this cell — the
 * renderer has it in hand, and the mock's own `terrain_brightness(px / CELL_W
 * * 0.13, …)` is the same value for an unwarped cell centre, so passing it in
 * is exact and saves recomputing the field.
 *
 * `scale` is the one deliberate divergence from the wallet, which pins the
 * door at 314 units across — modest inside a 1440px hero. Every sampled
 * offset (the stencil lookup included) is divided by it, so at `scale = 1`
 * the output is identical to the fixture and the golden vectors still pin it.
 */
export function vaultBrightness(
  px: number,
  py: number,
  cx: number,
  cy: number,
  terrainB: number,
  scale: number,
  plateau = false,
): number {
  const stroke = plateau ? band : ring;
  const dx = (px - cx) / scale;
  const dy = (py - cy) / scale;
  const d = Math.hypot(dx, dy);
  let b = 0;
  if (d < FACE_R) b = FACE_B;
  b = Math.max(b, OUTER_B * stroke(d, OUTER_R, OUTER_W));
  b = Math.max(b, INNER_B * stroke(d, INNER_R, INNER_W));

  const ang = Math.atan2(dy, dx);
  if (d > SPOKE_MIN_D && d < SPOKE_MAX_D) {
    /* Six-fold symmetry, then arc-length to the nearest spoke. */
    const a = (ang + Math.PI) % (Math.PI / 3);
    const arc = Math.min(a, Math.PI / 3 - a) * d;
    b = Math.max(b, SPOKE_B * stroke(arc, 0, SPOKE_ARC));
  }

  /* Twelve rim studs. At BOLT_B 212 they clear PEAK_BOOST, so every bolt is
     a ₿. */
  const a12 = (ang + Math.PI) % (Math.PI / 6);
  const boltD = Math.hypot(
    d - BOLT_R,
    Math.min(a12, Math.PI / 6 - a12) * BOLT_R,
  );
  if (boltD < BOLT_HALF) b = Math.max(b, BOLT_B);

  b = Math.max(b, monogramInk(dx, dy, STENCIL_PEAK_B, STENCIL_CURRENCY_B));

  return b + LIVE_GAIN * (terrainB - LIVE_PIVOT);
}
