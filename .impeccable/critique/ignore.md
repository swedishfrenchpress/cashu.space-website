# Critique ignore list

Findings verified as false positives against this project's design system.
Drop these silently on future `/impeccable critique` runs.

## `heading-rhythm` on `.press-card__title` (in-the-press.tsx)

The rule reads "20px above vs ~40px below" as a heading bound to the wrong
block. The card is image → headline → publication wordmark, with no body copy:
the h3 *is* the card's content and belongs to the image it captions, and the
space below is a `margin-top: auto` spacer that aligns every wordmark on one
baseline across the row. The tight-above/loose-below rhythm is the intended
grouping, not a defect.

## `codex-grid-background` on `.feature-demo__view::before` (globals.css)

The 44px hairline graph paper is the drafting-sheet ground of the RFC figure
plates (DESIGN.md §5, "One ground, two artifacts"). The rule's own text
exempts blueprint and measurement surfaces; this is one.

## `broken-image` on in-the-press.tsx and site-footer.tsx

Static analysis cannot resolve the JSX-expression `src` on these deliberately
plain `<img>` elements (plain because Next's optimizer blocks SVG by default —
see the comments beside each). Both render at runtime; the in-page detector
confirms zero broken images on the homepage.

## `line-length` on `.footer-disclaimer`

DESIGN.md §6 makes the disclaimer the deliberate exception to the prose
measure: it spans the full footer grid so the composition closes on the same
edges as the rows above it.
