import { Fragment } from "react";

/*
 * The hero headline. It has no entrance of its own.
 *
 * A server component with no effect and no state. It is wrapped by a
 * `<StaggerItem>` in page.tsx, so it arrives on the site's one entrance along
 * with the deck and the CTAs — nothing here knows about that, which is the
 * point. The hero's other motion is the closing hairline drawing across the
 * fold and the hex field answering the pointer.
 *
 * WHY THERE IS NOTHING HERE. This file emits three line spans and no entrance
 * of its own. Five entrances were built for this headline and all five were
 * rejected by the user in the same register:
 *
 *   hero-cipher.tsx    decrypt out of hex        "corny and too on the nose"
 *   .reveal--focus     blur in and resolve       "unelegant and sloppy"
 *   .hero-glyph v1     hard clip-path per glyph  "stiff and mechanic and
 *                                                 generic and robotic"
 *   .hero-glyph v2     gradient sweep            "corny"
 *   .line-rise         rise through a window     "too corny"
 *
 * The mechanisms have nothing in common — a substitution, a filter, a mask, a
 * translation. What they share is that each was INVENTED FOR THIS SITE, and the
 * headline visibly performed its own arrival. The sixth entrance is stock:
 * opacity, a 40px rise and a 4px blur on a spring, staggered with the deck and
 * the CTAs, applied by `<StaggerItem>` in page.tsx and defined once in
 * stagger.tsx. It is the same entrance every other element gets, and it does
 * not know or care that this is a headline. See the Stagger Rule in DESIGN.md
 * §4 before proposing a seventh bespoke treatment.
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
 * The line spans survive the deletion because they were never about motion:
 * they carry the authored rag and the per-line optical-left correction
 * (`.hero-spec__line--flat`), both of which are typesetting.
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

export default function HeroHeadline() {
  return (
    <h1 className="hero-spec__headline">
      {LINES.map((line, li) => (
        /* A Fragment, not a wrapper element: at 640px and up
           .hero-spec__line is display:block, and a block inside an inline
           wrapper would put the separating space in an anonymous block of its
           own. The emitted markup is three spans and two spaces. */
        <Fragment key={li}>
          <span
            className={
              line.flat
                ? "hero-spec__line hero-spec__line--flat"
                : "hero-spec__line"
            }
          >
            {line.text}
          </span>
          {li < LINES.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}
