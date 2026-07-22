/**
 * drawBtcGlobe — the "searching" orb rebuilt from ₿ glyphs. A local
 * frame painter with the same signature as the thinking-orbs MODE_DRAWS
 * entries (the package declares ModeDraw but doesn't export it), so
 * OrbFigure can swap it in for the searching state without touching the
 * package. Rotation, tilt wobble, scan meridian, depth ink and z-order
 * are transcribed from thinking-orbs@0.1.1's globe painter so the
 * searching character is preserved; density and per-glyph sizing are
 * retuned because a glyph carries far more visual mass than a dot.
 *
 * Geist Mono has no U+20BF (cmap-verified), so each mark is synthesized
 * the same way as the hero band (ascii-field.tsx): the font's own B
 * plus four short vertical strokes, with a runtime probe that defers to
 * a native ₿ if the font ever gains one. Metrics are measured once at
 * REF_FONT and every glyph is drawn through a translate+scale
 * transform, so the 12px-tuned stroke constants apply unchanged at any
 * glyph size and the font string is never rebuilt per glyph.
 */

type ModeDraw = (
  ctx: CanvasRenderingContext2D,
  size: number,
  t: number,
  dark: boolean,
  opts: Record<string, number | undefined>,
) => void;

/* Verbatim from the package's searching@64 preset. */
const SCAN_MUL = 4.08;
const DIM_BASE = 0.45;

/* Retuned for glyphs — the stock preset resolves to ~220 dots. */
const LAT_RINGS = 8;
const LON_DENSITY = 18; /* → 94 glyphs */

/* Stock ink is 0.62/0.54; the far end sits fainter here to offset the
   glyphs' mass. Near ink is unchanged (0.08). */
const INK_FAR = 0.7;
const INK_SPAN = 0.62;

/* Per-glyph font size in design px: far → near → scan-boosted. */
const FONT_BASE = 2.1;
const FONT_DEPTH = 1.7;
const FONT_BOOST = 0.7;

/* ₿ synthesis, tuned at REF_FONT in ascii-field.tsx; the per-glyph
   scale transform keeps the ratios at every size. */
const REF_FONT = 12;
const STROKE_W = 1;
const STROKE_LEN = 2;
const STROKE_DX = 1.25;

function angDist(a: number, b: number): number {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

/* Yaw+tilt rotation projecting a unit-sphere point to
   [screenX, screenY, depthZ] with depth in [-1, 1], +z toward viewer. */
function projector(yaw: number, tilt: number, cx: number, cy: number, R: number) {
  const st = Math.sin(tilt);
  const ct = Math.cos(tilt);
  const sy = Math.sin(yaw);
  const cy2 = Math.cos(yaw);
  return (X: number, Y: number, Z: number): [number, number, number] => {
    const u = X * cy2 + Z * sy;
    const h = -X * sy + Z * cy2;
    const b = Y * ct - h * st;
    const z = Y * st + h * ct;
    return [cx + u * R, cy - b * R, z];
  };
}

type FontInfo = {
  font: string;
  glyph: string;
  synth: boolean;
  bTop: number;
  bBot: number;
};

let fontInfo: FontInfo | null = null;
let fontsHooked = false;

function resolveFontInfo(ctx: CanvasRenderingContext2D): FontInfo {
  /* Fallback first — a failed family parse leaves ctx.font untouched. */
  ctx.font = `${REF_FONT}px ui-monospace, monospace`;
  const family = getComputedStyle(ctx.canvas).fontFamily;
  if (family) ctx.font = `${REF_FONT}px ${family}`;
  const font = ctx.font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  /* A carried ₿ shares the mono advance of "0"; a .notdef doesn't.
     (document.fonts.check false-positives on missing glyphs.) */
  const btc = ctx.measureText("₿").width;
  const native = btc > 0 && Math.abs(btc - ctx.measureText("0").width) < 0.5;
  let bTop = REF_FONT * 0.375;
  let bBot = REF_FONT * 0.375;
  if (!native) {
    const m = ctx.measureText("B");
    bTop = m.actualBoundingBoxAscent;
    bBot = m.actualBoundingBoxDescent;
  }
  if (!fontsHooked) {
    fontsHooked = true;
    try {
      document.fonts.load(font, "B₿0");
    } catch {
      /* fallback metrics cover us */
    }
    /* Early frames may measure fallback mono; re-resolve on the next
       painted frame once the webfonts settle. */
    document.fonts.ready.then(() => {
      fontInfo = null;
    });
  }
  return { font, glyph: native ? "₿" : "B", synth: !native, bTop, bBot };
}

export const drawBtcGlobe: ModeDraw = (ctx, size, t, dark) => {
  const info = fontInfo ?? (fontInfo = resolveFontInfo(ctx));
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.82;
  const tilt = 0.4 + 0.06 * Math.sin(t * 0.35);
  const proj = projector(t * 0.5, tilt, cx, cy, R);
  const scan = t * (0.5 + (1.7 - 0.5) * SCAN_MUL);
  const fs = size / 64; /* glyph constants are tuned in the 64-space */

  const pts: {
    x: number;
    y: number;
    z: number;
    k: number;
    white: number;
    a: number;
  }[] = [];
  for (let P = 0; P <= LAT_RINGS; P++) {
    const lat = -Math.PI / 2 + (P / LAT_RINGS) * Math.PI;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);
    const count = Math.max(1, Math.round(Math.abs(cosLat) * LON_DENSITY));
    for (let v = 0; v < count; v++) {
      const lon = (v / count) * 2 * Math.PI;
      const [x, y, z] = proj(cosLat * Math.cos(lon), sinLat, cosLat * Math.sin(lon));
      const f = (z + 1) / 2;
      const S = angDist(lon + t * 0.5, scan);
      const L = Math.exp(-(S * S) / 0.18) * Math.max(0, z);
      pts.push({
        x,
        y,
        z,
        k: ((FONT_BASE + FONT_DEPTH * f + FONT_BOOST * L) * fs) / REF_FONT,
        white: INK_FAR - INK_SPAN * f,
        a: DIM_BASE + (1 - DIM_BASE) * Math.min(1, L),
      });
    }
  }
  pts.sort((p, q) => p.z - q.z);

  ctx.font = info.font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const p of pts) {
    const c = Math.min(1, Math.max(0, p.white));
    const ink = Math.round((dark ? 1 - c : c) * 255);
    ctx.fillStyle = `rgba(${ink},${ink},${ink},${p.a})`;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.scale(p.k, p.k);
    ctx.fillText(info.glyph, 0, 0);
    if (info.synth) {
      const xl = -STROKE_DX - STROKE_W / 2;
      const xr = STROKE_DX - STROKE_W / 2;
      ctx.fillRect(xl, -info.bTop - STROKE_LEN, STROKE_W, STROKE_LEN);
      ctx.fillRect(xr, -info.bTop - STROKE_LEN, STROKE_W, STROKE_LEN);
      ctx.fillRect(xl, info.bBot, STROKE_W, STROKE_LEN);
      ctx.fillRect(xr, info.bBot, STROKE_W, STROKE_LEN);
    }
    ctx.restore();
  }
};
