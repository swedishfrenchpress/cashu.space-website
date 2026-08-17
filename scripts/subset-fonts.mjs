#!/usr/bin/env node
/**
 * subset-fonts — cut the licensed woff2 masters down to the glyphs this site
 * actually sets.
 *
 * WHERE THE FILES LIVE, AND WHY IT IS TWO PLACES.
 *
 *   assets/fonts/  masters. The full trial family (all 12 GT-Standard faces,
 *                  of which the site sets 3) and the complete pixel face.
 *                  Read only by this script. Never shipped, never served.
 *   src/fonts/     what this script writes, and the only fonts that reach a
 *                  browser. next/font/local copies them into
 *                  _next/static/media/ with a content hash, so they do not
 *                  need to be — and must not be — in public/.
 *
 * Both directories used to be public/fonts/, which served every master at a
 * stable unhashed URL nothing linked to, and served the subsets twice. Putting
 * a master back under public/ would undo that; put new ones in assets/fonts/.
 *
 * WHY THIS EXISTS. The fonts were 133KB of the homepage's 376KB, the single
 * largest category on the wire, and almost none of it was used. Geist Mono
 * shipped as the full variable font: 1159 glyphs across 889 codepoints, a
 * whole weight axis, and the site sets it at 400 and nothing else. Geist
 * Pixel Square cost 28KB to render about twenty characters. Measured
 * 2026-08-17, subsetting takes the four faces from 134,904 bytes to 32,380.
 *
 * It also buys time, not just bytes. `document.fonts.ready` resolved at
 * 1730ms on a throttled phone, gated by the two largest faces, and that
 * promise is what hero-field.tsx waits on before it cuts its glyph atlas.
 *
 * WHEN TO RE-RUN. Whenever `geist` is updated, whenever a trial face is
 * replaced, and whenever the rendered character set changes — which for this
 * site means editing a keymap chord label, a NUT id, the hero field's
 * alphabets, or introducing copy with a character outside Latin-1. The
 * ranges below are deliberately a little wider than what renders today for
 * exactly that reason; read the note on each.
 *
 * Requires fonttools *with brotli* — woff2 compression is not in the base
 * install, and without it the subset step fails at the last moment:
 *   pipx install "fonttools[woff]"   (or: pip install fonttools brotli)
 * Run from the repo root:  node scripts/subset-fonts.mjs
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, statSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";

const ROOT = process.cwd();
const out = (p) => join(ROOT, p);

/*
 * GEIST MONO. Printable ASCII, a non-breaking space, the ellipsis that the
 * truncated NUT ids in reference-implementations.tsx set, and the eight
 * currency marks the hero field rasterises into its atlas.
 *
 * The atlas is why this list cannot be derived from the DOM: glyphs.ts draws
 * REST_ALPHABET and WAKE_SLOTS straight onto a 2D canvas, so those characters
 * never appear in any element for a walker to find. B and W are already in
 * the ASCII range and are what the drawn ₿ and ₩ are built from — both are
 * .notdef in this face, which is the whole reason they are synthesised, so
 * neither needs a codepoint here.
 */
const MONO_UNICODES = [
  "U+0020-007E", // printable ASCII: all copy, all hex, B and W for the drawn marks
  "U+00A0", // nbsp
  "U+2026", // … — truncated NUT ids
  "U+00A2,U+00A3,U+00A5", // ¢ £ ¥
  "U+20AC,U+20B1,U+20B4,U+20B9,U+20BD", // € ₱ ₴ ₹ ₽
].join(",");

/*
 * GEIST PIXEL SQUARE. Deliberately wider than the twenty characters that
 * render today. Everything it sets is a string literal in the source (keymap
 * chord labels, three NUT notation runs), so a tight subset would turn a
 * one-word copy edit into silent tofu. Full alphanumerics plus the
 * punctuation those strings use costs about 4KB more than the tight set and
 * removes that trap. The face is not preloaded and is off the critical path,
 * so those 4KB buy real safety cheaply.
 */
const PIXEL_UNICODES = "U+0020,U+0021,U+0027,U+002D-003A,U+003F,U+0041-005A,U+0061-007A,U+00A0";

/*
 * GT-STANDARD. The site's whole readable voice, so this is the one place the
 * range is drawn generously rather than measured. Everything rendered today
 * is ASCII plus © — but the wallet directory and the press band carry names
 * written by other people, and a face that tofus on the first accented one
 * would be a bad trade for 1.1KB. Latin-1 Supplement plus the punctuation
 * block covers Western European names and curly quotes.
 *
 * The shipped trial faces are 271-codepoint subsets already, so the saving
 * here is modest by comparison: about 3KB a face rather than Mono's 66KB.
 */
const GT_UNICODES = [
  "U+0020-007E",
  "U+00A0-00FF", // Latin-1 Supplement: accented names, ©, °
  "U+2013,U+2014", // – —
  "U+2018,U+2019,U+201C,U+201D", // curly quotes
  "U+2022,U+2026,U+2039,U+203A",
].join(",");

const GT_FACES = ["Regular", "Medium", "Semibold"];

const jobs = [
  {
    label: "Geist Mono (variable → static 400)",
    /* Instanced at wght=400 before subsetting: the whole axis is dead weight
       when .t-mono is the only consumer and it sets 400. Keeping the axis
       instead costs 13,300 bytes rather than 5,192 — still a win, if a
       future design ever needs the range back. */
    instance: "wght=400",
    src: "node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.ttf",
    /* Subsetting reads the ttf (fonttools cannot instance a woff2), but the
       size this replaces is the woff2 the geist package used to serve. */
    ships: "node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
    dest: "src/fonts/geist-mono/GeistMono-400.subset.woff2",
    unicodes: MONO_UNICODES,
    features: "",
  },
  {
    label: "Geist Pixel Square",
    src: "assets/fonts/geist-pixel/GeistPixel-Square.woff2",
    dest: "src/fonts/geist-pixel/GeistPixel-Square.subset.woff2",
    unicodes: PIXEL_UNICODES,
    features: "",
  },
  ...GT_FACES.map((w) => ({
    label: `GT-Standard ${w}`,
    src: `assets/fonts/gt-standard/GT-Standard-M-Standard-${w}-Trial.woff2`,
    dest: `src/fonts/gt-standard/GT-Standard-M-Standard-${w}-Trial.subset.woff2`,
    unicodes: GT_UNICODES,
    /* Kerning and the default ligature/contextual sets are what make the
       display sizes look drawn rather than spaced. Mono and pixel drop them:
       a monospace face has nothing to kern and the pixel face is notation. */
    features: "kern,liga,calt",
  })),
];

function run(cmd, args) {
  try {
    execFileSync(cmd, args, { stdio: ["ignore", "ignore", "pipe"] });
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(
        `\n${cmd} not found. Install fonttools with brotli first — the woff2\n` +
          `flavour needs it and the base install does not carry it:\n` +
          `  pipx install "fonttools[woff]"    (or: pip install fonttools brotli)\n`,
      );
      process.exit(1);
    }
    console.error(`\n${cmd} failed:\n${error.stderr?.toString() ?? error.message}`);
    process.exit(1);
  }
}

const rows = [];
for (const job of jobs) {
  const src = out(job.src);
  const dest = out(job.dest);
  mkdirSync(dirname(dest), { recursive: true });

  let input = src;
  let temp = null;
  if (job.instance) {
    temp = `${dest}.instance.ttf`;
    run("fonttools", ["varLib.instancer", "-o", temp, src, job.instance]);
    input = temp;
  }

  run("pyftsubset", [
    input,
    `--unicodes=${job.unicodes}`,
    `--layout-features=${job.features}`,
    "--flavor=woff2",
    `--output-file=${dest}`,
  ]);

  if (temp) rmSync(temp, { force: true });
  rows.push([job.label, statSync(out(job.ships ?? job.src)).size, statSync(dest).size]);
}

const pad = (s, n) => String(s).padStart(n);
let before = 0;
let after = 0;
console.log(`\n${"face".padEnd(36)}${pad("ships", 9)}${pad("subset", 9)}${pad("saved", 9)}`);
for (const [label, b, a] of rows) {
  before += b;
  after += a;
  console.log(`${label.padEnd(36)}${pad(b, 9)}${pad(a, 9)}${pad(b - a, 9)}`);
}
console.log(`${"".padEnd(36)}${pad("—".repeat(7), 9)}${pad("—".repeat(7), 9)}${pad("—".repeat(7), 9)}`);
console.log(`${"total".padEnd(36)}${pad(before, 9)}${pad(after, 9)}${pad(before - after, 9)}\n`);
