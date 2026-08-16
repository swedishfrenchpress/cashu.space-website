/**
 * btc-glyph — the Bitcoin mark as a point set.
 *
 * WHY THIS IS NOT `fillText("₿")`.
 *
 * The twelve GT-Standard faces in `public/fonts/gt-standard/` are ~11-12 KB
 * Trial subsets. Decompressing their WOFF2 table streams and reading the
 * cmap format-4 subtables gives 271 codepoints each: space, `, - .`, digits,
 * A-Z, a-z, and Latin accents. That is the whole coverage.
 *
 *     U+20BF  ₿  MISSING          U+0024  $  MISSING
 *     U+00A5  ¥  MISSING          U+20AC  €  MISSING
 *     U+0042  B  present
 *
 * So `fillText("₿")` in this family does not render GT-Standard. It falls
 * through the stack to `ui-sans-serif, system-ui` and draws whatever the OS
 * has — a different letterform on macOS, Windows and Android, and tofu on
 * anything older than the glyph. The ASCII field this replaced rejected that
 * for the same reason and synthesised the mark instead; the synthesis is
 * carried over here, at raster scale.
 *
 * (Geist Mono has no U+20BF either. Nothing in this repo can type a ₿.)
 *
 * WHAT IT DRAWS. GT-Standard 600's own `B` — the headline's weight, so the
 * mark is cut from the page's own type — plus four short vertical rules:
 * two above the cap, two below the baseline, at the same two x positions.
 * Only outside the letter, never through it, which is both what the outgoing
 * field did and what keeps a rule from crossing the B's counters.
 *
 * WHY A RASTER. The orb engine has no text layer: it is `ctx.arc` per mark
 * and nothing else. A glyph can only enter that world as positions, so the
 * mark is drawn once offscreen and sampled into a point set in normalised
 * space. It runs once per font, never per frame and never per resize.
 */

/** Resolution of the square coverage mask handed back to the caller. */
export const COVER_N = 64;

/** Offscreen raster size, and the size the `B` is set at inside it. */
const RASTER = 320;
const FONT_PX = 220;

/* Rule geometry, as fractions of the B's own ink box.
 *
 * Derived from the outgoing field's constants (`BTC_STROKE_W/LEN/DX` = 1 / 2
 * / 1.25 against a 12px Geist Mono cell, whose `B` inks ~6.5 x 8.5px, giving
 * 0.154 / 0.235 / 0.192) and then pulled in: those numbers were exaggerated
 * to survive a 12px cell where a rule cannot be thinner than one pixel. A
 * 220px raster has no such floor, so the mark can sit closer to the drawn
 * letterform.
 *
 * These are the only values in this module that are not derived from
 * something. Tune by eye against the real page. */
const BAR_W_RATIO = 0.115;
const BAR_DX_RATIO = 0.17;
const BAR_OVER_RATIO = 0.16;

/** Alpha at or above which a sampled pixel counts as ink. */
const INK_ALPHA = 128;

/** Grid jitter, as a fraction of the sampling pitch. Breaks the lattice. */
const JITTER = 0.35;

/* 3x3 max-filter passes on the coverage mask. Two, not one: the field steps
   back inside this mask, and at one pass the clearing hugged the letterform
   so closely that the field's own marks crowded the mark's edges and it lost
   its silhouette. Two opens a hairline of paper around it. */
const DILATE_PASSES = 2;

export type GlyphPoint = {
  /** Offset from the ink-box centre, in units of ink HEIGHT. */
  gx: number;
  gy: number;
  /** The point's own hash value in [0,1). Reused as per-point depth jitter. */
  h: number;
};

export type GlyphSample = {
  points: GlyphPoint[];
  /** inkWidth / inkHeight — scale the point set by height and get width free. */
  aspect: number;
  /** COVER_N² dilated 0|1 coverage over the ink box, row-major. */
  cover: Uint8Array;
};

/** The engine's own hash idiom, so the mark and the field share one noise. */
function hash2(i: number, j: number): number {
  const s = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

function makeContext(): (OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D) | null {
  if (typeof OffscreenCanvas !== "undefined") {
    const oc = new OffscreenCanvas(RASTER, RASTER);
    const c = oc.getContext("2d", { willReadFrequently: true });
    if (c) return c as OffscreenCanvasRenderingContext2D;
  }
  if (typeof document === "undefined") return null;
  // Never appended — this element exists only to be drawn into and read back.
  const el = document.createElement("canvas");
  el.width = RASTER;
  el.height = RASTER;
  return el.getContext("2d", { willReadFrequently: true });
}

/**
 * Rasterise the mark in `family` and sample it into a point set.
 *
 * Returns `null` if the raster is unusable — no ink at all, or an ink box so
 * small or so large that something other than a `B` was drawn. The caller
 * treats `null` as "run the field with no mark", which is the correct
 * degradation: a wrong mark is worse than no mark.
 */
export function sampleBtc(family: string, target = 260): GlyphSample | null {
  const ctx = makeContext();
  if (!ctx) return null;

  /* A failed font parse leaves ctx.font at its previous value, so assigning
     a safe fallback first makes the failure mode a system B rather than a
     10px default. Same move as the outgoing field's resolveFont(). */
  ctx.font = `600 ${FONT_PX}px ui-sans-serif, system-ui, sans-serif`;
  if (family) ctx.font = `600 ${FONT_PX}px ${family}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000";

  const cx = RASTER / 2;
  const cy = RASTER / 2;

  const m = ctx.measureText("B");
  const bw = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
  const bh = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
  if (!(bw > 0) || !(bh > 0)) return null;

  const top = cy - m.actualBoundingBoxAscent;
  const bot = cy + m.actualBoundingBoxDescent;

  ctx.clearRect(0, 0, RASTER, RASTER);
  ctx.fillText("B", cx, cy);

  const barW = BAR_W_RATIO * bw;
  const over = BAR_OVER_RATIO * bh;
  const dx = BAR_DX_RATIO * bw;
  for (const x of [cx - dx, cx + dx]) {
    ctx.fillRect(x - barW / 2, top - over, barW, over);
    ctx.fillRect(x - barW / 2, bot, barW, over);
  }

  const data = ctx.getImageData(0, 0, RASTER, RASTER).data;

  /* Ink box from the pixels, not from the metrics: the rules overshoot the
     B's own bounds, so the mark is taller than measureText reported. */
  let x0 = RASTER;
  let y0 = RASTER;
  let x1 = -1;
  let y1 = -1;
  let inked = 0;
  for (let y = 0; y < RASTER; y++) {
    const row = y * RASTER;
    for (let x = 0; x < RASTER; x++) {
      if (data[(row + x) * 4 + 3] < INK_ALPHA) continue;
      inked++;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
  if (x1 < 0 || inked === 0) return null;

  const inkW = x1 - x0 + 1;
  const inkH = y1 - y0 + 1;
  /* Something other than the intended mark landed: a tofu box fills almost
     the whole raster, a missing glyph inks almost none of it. */
  const fw = inkW / RASTER;
  const fh = inkH / RASTER;
  if (fw < 0.1 || fh < 0.1 || fw > 0.98 || fh > 0.98) return null;

  /* Pitch from the INKED area, not the box area, so `target` is the number
     of points actually produced rather than the number attempted. */
  const pitch = Math.max(1, Math.sqrt(inked / target));
  const cols = Math.max(1, Math.ceil(inkW / pitch));
  const rows = Math.max(1, Math.ceil(inkH / pitch));

  const points: GlyphPoint[] = [];
  const midX = x0 + inkW / 2;
  const midY = y0 + inkH / 2;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const h = hash2(i + 1, j + 1);
      const h2 = hash2(j + 7, i + 3);
      const sx = Math.round(x0 + (i + 0.5 + (h - 0.5) * 2 * JITTER) * pitch);
      const sy = Math.round(y0 + (j + 0.5 + (h2 - 0.5) * 2 * JITTER) * pitch);
      if (sx < 0 || sx >= RASTER || sy < 0 || sy >= RASTER) continue;
      if (data[(sy * RASTER + sx) * 4 + 3] < INK_ALPHA) continue;
      points.push({ gx: (sx - midX) / inkH, gy: (sy - midY) / inkH, h });
    }
  }
  if (points.length < 24) return null;

  /* Coverage mask: box-downsample the alpha over the ink box, threshold, then
     one 3x3 max-filter pass so the field's clearing extends a hairline past
     the ink and the mark does not sit in a field that crowds its edges. */
  const raw = new Uint8Array(COVER_N * COVER_N);
  for (let j = 0; j < COVER_N; j++) {
    const ya = y0 + Math.floor((j * inkH) / COVER_N);
    const yb = y0 + Math.max(ya + 1, Math.floor(((j + 1) * inkH) / COVER_N));
    for (let i = 0; i < COVER_N; i++) {
      const xa = x0 + Math.floor((i * inkW) / COVER_N);
      const xb = x0 + Math.max(xa + 1, Math.floor(((i + 1) * inkW) / COVER_N));
      let hit = 0;
      for (let y = ya; y < yb && y <= y1 && !hit; y++) {
        for (let x = xa; x < xb && x <= x1; x++) {
          if (data[(y * RASTER + x) * 4 + 3] >= INK_ALPHA) {
            hit = 1;
            break;
          }
        }
      }
      raw[j * COVER_N + i] = hit;
    }
  }

  let cover = raw;
  for (let pass = 0; pass < DILATE_PASSES; pass++) {
    const src = cover;
    const out = new Uint8Array(COVER_N * COVER_N);
    for (let j = 0; j < COVER_N; j++) {
      for (let i = 0; i < COVER_N; i++) {
        let hit = 0;
        for (let dj = -1; dj <= 1 && !hit; dj++) {
          const jj = j + dj;
          if (jj < 0 || jj >= COVER_N) continue;
          for (let di = -1; di <= 1; di++) {
            const ii = i + di;
            if (ii < 0 || ii >= COVER_N) continue;
            if (src[jj * COVER_N + ii]) {
              hit = 1;
              break;
            }
          }
        }
        out[j * COVER_N + i] = hit;
      }
    }
    cover = out;
  }

  return { points, aspect: inkW / inkH, cover };
}
