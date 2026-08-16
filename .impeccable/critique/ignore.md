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

## Tap-target size on `.footer-social` and `.footer-ai__link`

Reported 2026-08-16 as 32×32 and 14×14, measured from
`getBoundingClientRect()`. That reads the element box and misses the
`::before` expanders both rules carry (with comments explaining them).
Hit-tested with `elementFromPoint` at 390px the real targets are **44×44
and 28×44**, and both clear WCAG 2.5.8. Measure hit areas by probing, not
by reading rects, before reporting a target as undersized.

## `broken-image` / "stray white dot" on `/press/forbes.jpg`

Reported 2026-08-16 as a stray dot that "reads as a pagination dot on a
black ground". Cropped and inspected at full resolution: it is a physical
white fixture mounted on the window frame below the neon sign, complete
with bracket and shadow. It is a real object in a press photograph, not a
rendering artifact, and the band is no longer on a black ground anyway.
Not to be retouched — altering journalism to tidy a layout is out of scope
for design work here.
