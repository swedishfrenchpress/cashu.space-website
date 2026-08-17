# Font masters

The licensed originals. **Nothing here is served to a browser**, and nothing
here should be moved back under `public/`.

- `gt-standard/` — the full GT-Standard M trial family, 12 faces. The site sets
  three of them (Regular 400, Medium 500, Semibold 600); the rest are kept
  because the family is licensed as a family and a future weight shouldn't mean
  re-acquiring it.
- `geist-pixel/` — the complete Geist Pixel Square face. Copied out of the
  `geist` package rather than imported from it, because `geist/font/pixel`
  calls `localFont()` at module scope for all five pixel faces and importing
  one registers every one.

Geist Mono has no master here: `scripts/subset-fonts.mjs` reads it straight out
of `node_modules/geist/`, so it updates with the package.

## What ships

`scripts/subset-fonts.mjs` cuts these down to the characters the site actually
sets and writes the results to `src/fonts/`. Those subsets are the only fonts
that reach a browser — `next/font/local` copies them into
`_next/static/media/` with a content hash at build time, which is why they do
not belong in `public/` either.

Together the four shipped faces are about 40KB, down from 135KB. The reasoning
per face, and the exact codepoint ranges, are in the script's header.

## Re-run the script when

- `geist` is updated (re-copy the pixel woff2 here first)
- a trial face is replaced or the family is relicensed
- the rendered character set changes: a keymap chord label, a NUT id, the hero
  field's alphabets, or copy carrying a character outside Latin-1

A character outside the subset does not render as tofu. It falls through the
fallback chain to a system font and still looks broadly right, which is the
kind of defect that survives review — so verify by rasterising with the
fallback chain stripped, not by looking at the page.
