/**
 * The field's alphabet, rasterised once into a strip texture.
 *
 * Sixteen hex digits, in Geist Mono, laid out left to right in one row so the
 * composite can index a glyph with a single multiply. This is what replaced
 * the halftone dot the field started as: a dot is a print reference and it
 * belonged to the site this was ported from, whereas a grid of monospace hex
 * is the site's own material — the same face the protocol notation is set in,
 * carrying the same alphabet the cipher pass scrambles through
 * (`src/lib/cipher.ts`).
 *
 * WHY HEX AND NOT WORDS. The ground is not a message and must not pretend to
 * be one. A Cashu secret *is* a string of entropy, so a field of hex is the
 * honest thing for the page's substrate to be made of: it says "this is
 * ciphertext" without claiming to say anything in particular. Anything
 * legible here would be copy nobody wrote, at a size nobody can read.
 */

/** The cipher pass uses the same alphabet; keep them the same on purpose. */
const ALPHABET = "0123456789abcdef";

export const GLYPH_COUNT = ALPHABET.length;

/**
 * Glyph box relative to the cell. Type wants air around it — at 1.0 the
 * characters tile into a solid slab and the field reads as a wall of code
 * rather than as scattered notation.
 */
const GLYPH_SCALE = 0.72;

export type GlyphAtlas = {
  texture: WebGLTexture;
  dispose: () => void;
};

/**
 * Rasterise the alphabet at `cellPx` and upload it.
 *
 * Must be called after the face has actually loaded — a miss here silently
 * rasterises the fallback monospace and the field ships in the wrong
 * typeface, which is the kind of defect that survives review because it still
 * looks fine. `hero-field.tsx` gates this on `document.fonts.ready`.
 */
export function createGlyphAtlas(
  gl: WebGL2RenderingContext,
  cellPx: number,
  fontFamily: string,
): GlyphAtlas | null {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(cellPx * GLYPH_COUNT));
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
  for (let i = 0; i < GLYPH_COUNT; i += 1) {
    /* 0.54 rather than 0.5 — `middle` sits on the em box's centre, which for
       a face with more descender than ascender leaves digits looking high. */
    ctx.fillText(ALPHABET[i], (i + 0.5) * cellPx, cellPx * 0.54);
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
