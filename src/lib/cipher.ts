/**
 * The cipher pass — the site's one typographic motion primitive.
 *
 * Pure string maths, no DOM. Two consumers, deliberately sharing one
 * algorithm rather than two copies of it:
 *
 *   button-cipher.tsx  encrypt -> decrypt round trip, on pointer hover
 *   hero-cipher.tsx    decrypt only, once, on arrival
 *
 * The glyph pool is hex because the thing being obscured on this site is
 * always a value or a key, and hex is what those look like when you can see
 * them at all. It is not a random-character effect looking for a rationale.
 */

const CIPHER_GLYPHS = "0123456789abcdef";

/** Deterministic per (index, frame) so a character does not flicker between
 *  two glyphs on consecutive frames — it walks the pool instead. */
export function encryptedGlyph(index: number, frame: number) {
  return CIPHER_GLYPHS[(index * 7 + frame * 11) % CIPHER_GLYPHS.length];
}

/**
 * One frame of a decrypt sweep.
 *
 * `sweep` is 0..1 across the string: characters at or before it have
 * resolved to the source text, everything after is still scrambled.
 * Whitespace is never touched, so word shapes survive the pass.
 */
export function decryptText(source: string, sweep: number, frame: number) {
  const chars = Array.from(source);
  const last = Math.max(chars.length - 1, 1);

  return chars
    .map((char, index) => {
      if (/\s/.test(char)) return char;
      const resolved = index / last <= sweep;
      return resolved ? char : encryptedGlyph(index, frame);
    })
    .join("");
}

/**
 * One frame of the button's round trip: the sweep runs once to scramble the
 * label, then once more to bring it back. `ENCRYPT_END` splits the two
 * halves — the encrypt leg is deliberately the shorter of the two, so the
 * label spends most of the pass returning rather than leaving.
 */
export const ENCRYPT_END = 0.34;

export function cipherText(source: string, progress: number, frame: number) {
  const encrypting = progress < ENCRYPT_END;
  const sweep = encrypting
    ? progress / ENCRYPT_END
    : (progress - ENCRYPT_END) / (1 - ENCRYPT_END);

  /* Encrypting, a passed character is scrambled; decrypting, a passed
     character is resolved. Same sweep, inverted sense. */
  return encrypting
    ? Array.from(source)
        .map((char, index, all) => {
          if (/\s/.test(char)) return char;
          const passed = index / Math.max(all.length - 1, 1) <= sweep;
          return passed ? encryptedGlyph(index, frame) : char;
        })
        .join("")
    : decryptText(source, sweep, frame);
}
