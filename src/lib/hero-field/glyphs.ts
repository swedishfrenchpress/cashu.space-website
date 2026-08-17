/**
 * The field's two alphabets, rasterised into one strip texture.
 *
 * THE FIELD HAS A CIPHERTEXT LAYER AND A MONEY LAYER, and the pointer is what
 * resolves one into the other. At rest every cell shows a hex digit: entropy,
 * which is what a Cashu secret actually is. Inside the wake it shows a
 * currency mark instead. Behind the wake it re-encrypts.
 *
 * That is the whole idea, and it is worth stating plainly because it is the
 * one thing here that is *about Cashu*: a blinded token is money that looks
 * like noise until something resolves it. The ground is not decoration with a
 * story bolted on — the story is the mechanism.
 *
 * The atlas is one row: `REST_COUNT` hex cells, then `WAKE_COUNT` currency
 * cells. The composite indexes into it with a single multiply.
 */

/** The cipher pass uses the same alphabet; keep them the same on purpose. */
const REST_ALPHABET = "0123456789abcdef";

/**
 * The money layer.
 *
 * TWO OF THESE DO NOT EXIST IN THE FACE and are drawn, not typed. Geist Mono's
 * cmap was parsed with opentype.js against every currency codepoint in
 * Unicode: `$ ¢ £ ¤ ¥ ₪ € ₱ ₴ ₹ ₽` are present, and **₿ (U+20BF) and ₩ (U+20A9)
 * are `.notdef`** — as are ₣ ₤ ₦ ₨ ₫ ₭ ₮ ₲ ₵ ₸ ₺ ₾. `fillText("₿")` does not
 * fail loudly; it falls through to `ui-monospace, monospace` and draws whatever
 * the OS has, so the mark would be a different letterform on macOS, Windows and
 * Android and tofu on anything older than the glyph. Both are synthesised from
 * the face's own letterforms instead. Don't "simplify" that away, and don't
 * trust `document.fonts.check` here — next/font emits no `unicode-range`, so it
 * reports loadedness, not coverage.
 *
 * **₿ is weighted.** Six of sixteen slots, because Cashu is bitcoin-native and
 * the field should say so before it says anything else. The rest are there
 * because a mint's `unit` is an open field in the NUTs — `sat` is the common
 * case, not the only permitted one — so a spread of denominations is honest
 * rather than decorative. Keep ₿ dominant if this list is ever edited.
 */
const WAKE_SLOTS: ReadonlyArray<string | "SYNTH_BTC" | "SYNTH_WON"> = [
  "SYNTH_BTC", "SYNTH_BTC", "SYNTH_BTC", "SYNTH_BTC", "SYNTH_BTC", "SYNTH_BTC",
  "$", "€", "¥", "SYNTH_WON", "£", "₹", "₽", "¢", "₱", "₴",
];

export const REST_COUNT = REST_ALPHABET.length;
export const WAKE_COUNT = WAKE_SLOTS.length;
const TOTAL = REST_COUNT + WAKE_COUNT;

/**
 * Glyph box relative to the cell. Type wants air around it — at 1.0 the
 * characters tile into a solid slab and the field reads as a wall of code
 * rather than as scattered notation.
 */
const GLYPH_SCALE = 0.72;

/*
 * ₿ geometry, as fractions of the drawn `B`'s own ink box. Carried over from
 * this repo's previous synthesis (`src/lib/orb/btc-glyph.ts`, deleted), which
 * derived them from the ASCII field's constants against a 12px cell: a 1px
 * rule on a ~6.5 x 8.5px `B`.
 *
 * The rules sit **outside the letter only** — above the cap and below the
 * baseline, never across it. A rule drawn through the B at this size closes
 * its counters and the mark turns into a blot.
 */
const BTC_BAR_W = 0.154; // of ink width
const BTC_BAR_DX = 0.192; // of ink width, from the ink centre
const BTC_BAR_OVER = 0.235; // of ink height

/*
 * ₩ geometry. Unlike ₿ the won's bars genuinely cross the letterform, so these
 * are drawn through the `W` and extend a little past it on both sides.
 */
const WON_BAR_H = 0.11; // of ink height
const WON_BAR_Y1 = 0.42; // of ink height, from the ink top
const WON_BAR_Y2 = 0.64;
const WON_BAR_OVER = 0.08; // of ink width, past each side

export type GlyphAtlas = {
  texture: WebGLTexture;
  dispose: () => void;
};

type Metrics = {
  left: number;
  top: number;
  width: number;
  height: number;
};

/** Ink box of a single character already positioned at (cx, cy). */
function inkBox(ctx: CanvasRenderingContext2D, ch: string, cx: number, cy: number): Metrics {
  const m = ctx.measureText(ch);
  const width = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
  const height = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
  return { left: cx - m.actualBoundingBoxLeft, top: cy - m.actualBoundingBoxAscent, width, height };
}

/** The face's own `B`, plus four rules clear of the letterform. */
function drawBitcoin(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.fillText("B", cx, cy);
  const box = inkBox(ctx, "B", cx, cy);
  if (box.width <= 0 || box.height <= 0) return;

  const barW = Math.max(1, Math.round(box.width * BTC_BAR_W));
  const over = Math.max(1, Math.round(box.height * BTC_BAR_OVER));
  const dx = box.width * BTC_BAR_DX;
  const centre = box.left + box.width / 2;

  for (const x of [centre - dx, centre + dx]) {
    const bx = Math.round(x - barW / 2);
    ctx.fillRect(bx, box.top - over, barW, over);
    ctx.fillRect(bx, box.top + box.height, barW, over);
  }
}

/** The face's own `W`, crossed by two rules. */
function drawWon(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.fillText("W", cx, cy);
  const box = inkBox(ctx, "W", cx, cy);
  if (box.width <= 0 || box.height <= 0) return;

  const barH = Math.max(1, Math.round(box.height * WON_BAR_H));
  const over = box.width * WON_BAR_OVER;
  for (const t of [WON_BAR_Y1, WON_BAR_Y2]) {
    ctx.fillRect(
      Math.round(box.left - over),
      Math.round(box.top + box.height * t),
      Math.round(box.width + over * 2),
      barH,
    );
  }
}

/**
 * Rasterise both alphabets at `cellPx` and upload.
 *
 * Must be called after the face has actually loaded — a miss here silently
 * rasterises the fallback monospace and the field ships in the wrong typeface,
 * which is the kind of defect that survives review because it still looks fine.
 * `hero-field.tsx` gates this on `document.fonts.ready`.
 */
export function createGlyphAtlas(
  gl: WebGL2RenderingContext,
  cellPx: number,
  fontFamily: string,
): GlyphAtlas | null {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(cellPx * TOTAL));
  canvas.height = Math.max(1, Math.round(cellPx));
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${Math.round(cellPx * GLYPH_SCALE)}px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  /* White at full alpha: the shader reads only the alpha channel and applies
     the scheme's own colour, so the atlas carries shape and nothing else. */
  ctx.fillStyle = "#ffffff";

  for (let i = 0; i < REST_COUNT; i += 1) {
    /* 0.54 rather than 0.5 — `middle` sits on the em box's centre, which for
       a face with more descender than ascender leaves digits looking high. */
    ctx.fillText(REST_ALPHABET[i], (i + 0.5) * cellPx, cellPx * 0.54);
  }
  for (let i = 0; i < WAKE_COUNT; i += 1) {
    const slot = WAKE_SLOTS[i];
    const cx = (REST_COUNT + i + 0.5) * cellPx;
    const cy = cellPx * 0.54;
    if (slot === "SYNTH_BTC") drawBitcoin(ctx, cx, cy);
    else if (slot === "SYNTH_WON") drawWon(ctx, cx, cy);
    else ctx.fillText(slot, cx, cy);
  }

  const texture = gl.createTexture();
  if (!texture) return null;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  /* Flipped on upload so texture v runs bottom-up like gl_FragCoord.y, which
     lets the composite sample with the cell's own local coordinates and no
     correction. Unpremultiplied because only alpha is read. */
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  /* LINEAR, and this is the one place in the field where smoothing is right:
     these are letterforms, not a lattice. Clamped so the last glyph's right
     edge cannot wrap into the first. */
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  return { texture, dispose: () => gl.deleteTexture(texture) };
}
