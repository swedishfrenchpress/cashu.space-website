import { Fragment } from "react";

/*
 * The hero headline, set glyph by glyph.
 *
 * A server component, and that is the whole reason it exists as one rather
 * than as a loop in page.tsx: the entrance is a CSS animation keyed on an
 * index that has to be in the markup before the stylesheet is applied. There
 * is no client component, no effect and no state here — see the arrival block
 * in globals.css for why an entrance that always plays must never be gated on
 * hydration.
 *
 * THE RAG IS AUTHORED, NOT BALANCED. `text-wrap: balance` equalises line
 * *lengths*, which stranded the preposition (OPEN SOURCE / ECASH FOR /
 * BITCOIN.). Three lines is the composition and two are arithmetically
 * impossible: measured at the top of the Display clamp (144px), OPEN SOURCE
 * ECASH sets 1513px and ECASH FOR BITCOIN. sets 1446px, so both halves of both
 * possible splits overflow the 1440px cap. DESIGN.md §3 closes the two levers
 * that would fix that (no homepage-only Display step; shorten the copy) and
 * the copy is the user's. So the rag reads long, short, medium.
 *
 * Balance stays on below 640px, where the lines go back to being inline —
 * there OPEN SOURCE alone is 418px against a 390px phone's 342px of box, so a
 * forced break would wrap anyway and cost a fourth line.
 *
 * WHY EACH GLYPH IS A PLAIN `<span>` AND NOT AN `inline-block`. Both were
 * measured against the plain string at 144px (headless Chrome, the shipped
 * GT-Standard Semibold subset, uppercase, -0.02em):
 *
 *   OPEN SOURCE   plain 1003.250   inline spans 1003.313   inline-block 1004.047
 *   FOR BITCOIN.  plain  935.859   inline spans  935.953
 *
 * Chrome's LayoutNG shapes the whole inline formatting context as one run and
 * splits the result at box boundaries, so kerning and subpixel advances
 * survive an inline span: the 0.06px difference over eleven glyphs is
 * rounding. `display: inline-block` makes each glyph its own formatting
 * context, which rounds every advance independently and drifts 0.8px on one
 * line — a permanent cost to the settled headline, paid for an entrance that
 * lasts a second. It also flattens badly in the accessibility tree, where a
 * run of inline spans is read as one heading and a run of inline-blocks can be
 * read out letter by letter.
 *
 * Spaces are text nodes rather than spans, so the line can still break at them
 * when the rag re-flows below 640px. They still take an index: the beat where
 * nothing is uncovered is the carriage, and the two line ends get one too.
 */

/* Uppercased by CSS, not retyped, so the source string stays sentence case for
   screen readers and search engines (user-directed 2026-08-15).

   `flat` marks the lines that open on a flat cap. The h1 carries the optical
   correction for the round "O" of line one; these carry the difference to the
   flat-cap value. See .hero-spec__line--flat in globals.css — the two numbers
   are measured, not a refinement of one another. */
const LINES = [
  { text: "Open source", flat: false },
  { text: "ecash", flat: true },
  { text: "for bitcoin.", flat: true },
];

/*
 * The index is assigned once, at module scope, because the headline is a
 * constant: nothing here depends on a render. It also keeps the running
 * counter out of a map callback, which the React compiler correctly refuses.
 *
 * A part is either a glyph (a span carrying its index) or a space (a bare
 * text node that still consumes an index).
 */
const SET = (() => {
  let gi = 0;
  return LINES.map((line, li) => {
    const parts = [...line.text].map((char) => ({
      char,
      gi: gi++,
    }));
    /* The line end takes an index too, so the pass rests for one beat where
       the reader's eye has to travel. Not after the last line — there is no
       break to cross. */
    if (li < LINES.length - 1) gi += 1;
    return { flat: line.flat, parts };
  });
})();

export default function HeroHeadline() {
  return (
    <h1 className="hero-spec__headline">
      {SET.map((line, li) => (
        /* A Fragment, not a wrapper element: at 640px and up
           .hero-spec__line is display:block, and a block inside an inline
           wrapper would put the separating space in an anonymous block of its
           own. The emitted markup is exactly what was authored by hand
           before — three spans and two spaces. */
        <Fragment key={li}>
          <span
            className={
              line.flat
                ? "hero-spec__line hero-spec__line--flat"
                : "hero-spec__line"
            }
          >
            {line.parts.map(({ char, gi }) =>
              char === " " ? (
                " "
              ) : (
                <span
                  key={gi}
                  className="hero-glyph"
                  style={{ "--gi": gi } as React.CSSProperties}
                >
                  {char}
                </span>
              ),
            )}
          </span>
          {li < SET.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}
