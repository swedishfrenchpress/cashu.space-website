@AGENTS.md

## Design Context

This project has a documented design system. Before generating UI, styling components, or making visual choices, read:

- **[PRODUCT.md](PRODUCT.md)** — strategic spec: register (`brand`), users, brand personality, anti-references, design principles.
- **[DESIGN.md](DESIGN.md)** — visual spec: tokens, type scale, components, named rules, do's and don'ts. Follows the [Stitch DESIGN.md format](https://stitch.withgoogle.com/docs/design-md/format/).
- **[.impeccable/design.json](.impeccable/design.json)** — machine-readable sidecar with tonal ramps, motion, breakpoints, and component HTML/CSS snippets.

**North Star:** *"The Open Specification"* — cashu.space dresses an open protocol in the visual register of a published RFC. Monochrome by doctrine, GT-Standard carries the page, Geist Pixel Square reserved for protocol notation (amounts, mint ids, version strings).

**Hard rules (see DESIGN.md for the full set):**

- No chromatic accent in the site's own voice. Greys shift by lightness, never by hue. Colour exists only under the Depicted-World Exception (DESIGN.md §2): depicted app art in the demo panels, the tap-to-pay video, third-party marks.
- No `box-shadow` on containers. The system is flat; only the `.btn-*` slabs lift.
- No gradient text, no side-stripe borders. Glass (blur + translucency) exists on exactly one sanctioned surface — the navbar — nowhere else.
- Three typefaces only — GT-Standard (everything readable), Geist Mono (technical), Geist Pixel Square (protocol notation). No third.
- Hero headline must be Display: GT-Standard 600, ≥3.75rem, line-height 0.95.

When in doubt, run `/impeccable critique` against the surface in question before shipping.
