/**
 * The blind-signature round trip — the field's third scene.
 *
 * This is the one scene that carries information rather than texture, and it
 * is why the hero's motion satisfies the Honest-Network Rule (DESIGN.md §4)
 * instead of needing an exemption from it. What it draws is what Cashu
 * actually does:
 *
 *   Alice holds a secret and blinds it       — the dense core, left, never moves
 *   She sends the blinded point to the mint  — outbound dashes, upper path
 *   The mint signs it without seeing it      — the core, right
 *   The blind signature comes back           — return dashes, lower path
 *   Alice unblinds it into a bearer token    — the ₿ mark that materialises
 *
 * Two nodes, one round trip, no third party. There is no mint-to-mint edge
 * here because there is none in the protocol, and the secret never crosses to
 * the right-hand side because it never does. The dashes travel outward on the
 * top and inward on the bottom, so the direction of flow reads even when the
 * pulse is elsewhere in its cycle.
 *
 * Built the same way as the vault: analytic distance functions plus the shared
 * ₿ stencil, so it costs a handful of ops per cell and no assets.
 */

import {
  band,
  MONOGRAM_HALF_H,
  MONOGRAM_HALF_W,
  monogramInk,
} from "./vault";

/* Grid units, before `scale`. Every stroke width is sized so that after
   scaling it still spans more than one cell — a band thinner than a cell
   samples to a dotted line at best and vanishes at worst.

   The nodes are large on purpose: Alice's ring has to be able to hold the ₿
   monogram (108 × 154 grid units) when her secret resolves into a token. */
const NODE_DX = 260;
const NODE_R = 100;
const NODE_W = 16;
const NODE_B = 196;

/** Alice's secret and the mint's key. Currency-strength, not peak: neither is
 *  the money on its own — the token they combine into is. */
const CORE_R = 30;
const CORE_B = 204;

const ARC_RISE = 150;
const PATH_W = 14;
const PATH_B = 168;

/* Travelling dashes. The period is a little over two cells, so the dashes
   read as marks rather than as a solid rule at any scale we use. */
const DASH_PERIOD = 26;
const DASH_DUTY = 0.55;
const DASH_SPEED = 0.42;

/** The value in flight: the blinded point outbound, the blind signature back.
 *
 *  248, not 224: the living-ink term swings ±35, so a nominal 224 lands at 189
 *  on a dark cell and the pulse drops out of ₿ into `,` for part of its trip.
 *  248 clears PEAK_BOOST (208) even at the bottom of that swing, so the value
 *  in flight is always a ₿. The token stencil deliberately does *not* do this —
 *  it keeps the vault's 221, where the flicker between ₿ and $¥€ is the tuned
 *  behaviour that makes the mark feel alive rather than printed. */
const PULSE_R = 40;
const PULSE_B = 248;
const PULSE_PLATEAU = 2.2;

/** The unblinded token. It is stamped *inside Alice's ring, over her core* —
 *  the secret and the returned signature are exactly what combine into the
 *  bearer token, so the mark replacing the core is the true picture. */
const TOKEN_PEAK_B = 221;
const TOKEN_CURRENCY_B = 202;

/**
 * The figure plate.
 *
 * Line art cannot read against live terrain: the schematic's rings and paths
 * land on ramp levels the open field is already full of, so at equal
 * brightness they simply disappear into the noise. The vault doesn't have this
 * problem because its face disc (FACE_B) clears the ground first and its
 * structure reads against near-empty paper.
 *
 * So the schematic borrows the same device — a faint dotted plate, elliptical
 * rather than rectangular so it reads as a figure on the page and not as a
 * clipping rectangle. Same brightness as the vault's face, same living-ink
 * term, so the two scenes are visibly the same material.
 */
const PLATE_B = 26;

/* Living ink, exactly as the vault does it: the plate's brightness is
   modulated by the live terrain at the same cell, so the ridgelines keep
   crawling through the figure and it breathes instead of freezing into a
   diagram. */
const LIVE_GAIN = 0.28;
const LIVE_PIVOT = 128;

export const EXTENT_X = NODE_DX + NODE_R + NODE_W + 24;
export const EXTENT_Y = Math.max(
  ARC_RISE + PATH_W + 24,
  NODE_R + NODE_W + 24,
);

/** Where the blend back to open terrain finishes, in plate-radius units. */
const COVER_EDGE_Q = 1.18;

/** Normalised elliptical radius: 1 exactly on the plate's rim. */
function plateQ(dx: number, dy: number): number {
  return Math.hypot(dx / EXTENT_X, dy / EXTENT_Y);
}

/* Round-trip stages, as fractions of one cycle. */
const OUT_END = 0.4;
const SIGN_END = 0.5;
const BACK_END = 0.9;

/** How much of this cell the plate claims. See `vaultCoverage`. */
export function bdhkeCoverage(
  px: number,
  py: number,
  cx: number,
  cy: number,
  scale: number,
): number {
  /* Same correction as the vault's: the node rings reach q = 0.94, so fading
     from 0.86 inward was dimming them out of their ramp level. The plate is
     full to its own rim and blends in the ring beyond it. */
  const q = plateQ((px - cx) / scale, (py - cy) / scale);
  if (q <= 1) return 1;
  if (q >= COVER_EDGE_Q) return 0;
  const u = (COVER_EDGE_Q - q) / (COVER_EDGE_Q - 1);
  return u * u * (3 - 2 * u);
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const u = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return u * u * (3 - 2 * u);
}

/**
 * Where the pulse sits, and how bright the token is, at `phase` ∈ [0, 1).
 *
 * Computed once per frame rather than per cell — every cell needs the same
 * answer, and `phase` doesn't vary across the grid.
 */
export type RoundTrip = {
  /** Path parameter 0 (Alice) → 1 (Mint). */
  s: number;
  /** −1 for the upper outbound path, +1 for the lower return path. */
  side: number;
  /** Pulse strength; dips to 0 while the mint is signing. */
  pulse: number;
  /** Token stencil strength, 0 until the signature lands. */
  token: number;
};

export function roundTrip(phase: number): RoundTrip {
  const p = phase - Math.floor(phase);
  if (p < OUT_END) {
    return { s: p / OUT_END, side: -1, pulse: 1, token: 0 };
  }
  if (p < SIGN_END) {
    /* At the mint. The pulse fades out and back in across the signing beat, so
       what arrives is visibly not the same object that left. */
    const u = (p - OUT_END) / (SIGN_END - OUT_END);
    return { s: 1, side: u < 0.5 ? -1 : 1, pulse: Math.abs(u - 0.5) * 2, token: 0 };
  }
  if (p < BACK_END) {
    return {
      s: 1 - (p - SIGN_END) / (BACK_END - SIGN_END),
      side: 1,
      pulse: 1,
      token: 0,
    };
  }
  /* Home. The token blooms and holds to the end of the cycle. */
  return {
    s: 0,
    side: 1,
    pulse: 1 - smoothstep(BACK_END, BACK_END + 0.04, p),
    token: smoothstep(BACK_END, BACK_END + 0.06, p),
  };
}

/** Height of a path at horizontal parameter `s`, relative to the axis. */
function pathOffset(s: number, side: number): number {
  const f = 1 - (2 * s - 1) * (2 * s - 1);
  return side * ARC_RISE * f;
}

/**
 * Schematic brightness at pixel (px, py) for a figure centred at (cx, cy).
 *
 * `terrainB` is this cell's terrain brightness, already in hand; `trip` is the
 * per-frame round-trip state; `scale` matches the vault's — every sampled
 * offset is divided by it.
 */
export function bdhkeBrightness(
  px: number,
  py: number,
  cx: number,
  cy: number,
  terrainB: number,
  scale: number,
  trip: RoundTrip,
  t: number,
): number {
  const dx = (px - cx) / scale;
  const dy = (py - cy) / scale;
  const live = LIVE_GAIN * (terrainB - LIVE_PIVOT);
  if (plateQ(dx, dy) > COVER_EDGE_Q) return live;

  let b = PLATE_B;

  /* Alice, left. Ring, plus the secret that never crosses the axis — which at
     the end of the round trip resolves into the token itself. */
  const dAlice = Math.hypot(dx + NODE_DX, dy);
  b = Math.max(b, NODE_B * band(dAlice, NODE_R, NODE_W));
  if (trip.token < 1 && dAlice < CORE_R) {
    b = Math.max(b, CORE_B * (1 - trip.token));
  }
  if (trip.token > 0) {
    const tx = dx + NODE_DX;
    if (Math.abs(tx) <= MONOGRAM_HALF_W && Math.abs(dy) <= MONOGRAM_HALF_H) {
      b = Math.max(
        b,
        monogramInk(tx, dy, TOKEN_PEAK_B, TOKEN_CURRENCY_B) * trip.token,
      );
    }
  }

  /* The mint, right. Ring plus its signing key. */
  const dMint = Math.hypot(dx - NODE_DX, dy);
  b = Math.max(b, NODE_B * band(dMint, NODE_R, NODE_W));
  if (dMint < CORE_R) b = Math.max(b, CORE_B);

  /* The two channels. `s` runs 0 at Alice to 1 at the mint; outside that span
     there is no path, and inside the node discs the path is occluded so the
     dashes appear to enter and leave rather than run through. */
  const s = (dx + NODE_DX) / (2 * NODE_DX);
  if (s >= 0 && s <= 1 && dAlice > NODE_R && dMint > NODE_R) {
    for (const side of [-1, 1] as const) {
      const offset = pathOffset(s, side);
      /* Vertical distance corrected to perpendicular, so the band keeps an
         even weight where the arc steepens toward the nodes. */
      const slope = (4 * ARC_RISE * (2 * s - 1) * side) / (2 * NODE_DX);
      const perp = Math.abs(dy - offset) / Math.hypot(1, slope);
      if (perp >= PATH_W) continue;
      /* Dashes travel outbound along the top, inbound along the bottom. */
      const travel = side === -1 ? -t * DASH_SPEED : t * DASH_SPEED;
      const u = (dx + NODE_DX) / DASH_PERIOD + travel;
      if (u - Math.floor(u) >= DASH_DUTY) continue;
      b = Math.max(b, PATH_B * band(perp, 0, PATH_W));
    }
  }

  /* The value in flight. */
  if (trip.pulse > 0) {
    const pulseX = -NODE_DX + trip.s * 2 * NODE_DX;
    const pulseY = pathOffset(trip.s, trip.side);
    const dPulse = Math.hypot(dx - pulseX, dy - pulseY);
    if (dPulse < PULSE_R) {
      const fall = Math.min(1, (1 - dPulse / PULSE_R) * PULSE_PLATEAU);
      b = Math.max(b, PULSE_B * fall * trip.pulse);
    }
  }

  return b + live;
}
