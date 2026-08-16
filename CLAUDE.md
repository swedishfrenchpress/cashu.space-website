@AGENTS.md

## Design Context

This project has a documented design system. Before generating UI, styling components, or making visual choices, read:

- **[PRODUCT.md](PRODUCT.md)** — strategic spec: register (`brand`), users, brand personality, anti-references, design principles.
- **[DESIGN.md](DESIGN.md)** — visual spec: tokens, type scale, components, named rules, do's and don'ts. Follows the [Stitch DESIGN.md format](https://stitch.withgoogle.com/docs/design-md/format/).
- **[.impeccable/design.json](.impeccable/design.json)** — machine-readable sidecar with tonal ramps, motion, breakpoints, and component HTML/CSS snippets.

**North Star:** *"The Open Specification"* — cashu.space dresses an open protocol in the visual register of a published RFC. Monochrome by doctrine, GT-Standard carries the page, Geist Pixel Square reserved for protocol notation (amounts, mint ids, version strings).

**Hard rules (see DESIGN.md for the full set):**

- Greys shift by lightness, never by hue. Colour exists in exactly two places, both named in DESIGN.md §2: third-party marks (Depicted-World Exception) and `--signal` green on the protocol-parts property squares (Signal-Green Exception, user-directed 2026-08-16). The green is a scoped licence for one 7px decorative square on the always-dark column — not type, not a state, not a hover, not a palette slot. Don't spread it, and don't open a third.
- No `box-shadow` anywhere — buttons included; they are flat cipher slabs — except the navbar's condensed (scrolled) box, which carries `--nav-shadow` as part of the Onyx-pattern bar (user-directed 2026-07-25; DESIGN.md §4–5). No other surface inherits that licence.
- No gradient text, no side-stripe borders. Glass (blur + translucency) exists on exactly one sanctioned surface — the navbar's condensed box — nowhere else.
- Three typefaces only — GT-Standard (everything readable), Geist Mono (technical), Geist Pixel Square (protocol notation). No third.
- Hero headline must be Display: GT-Standard 600, ≥3.75rem, line-height 0.95.
- The hero ASCII field (`src/lib/ascii/`) is full-bleed and morphs on a 76s loop: terrain → vault door → blind-signature round trip → terrain; the vault lands by 16s so a first read sees it. It has **no pointer response** — the contour lens was removed 2026-08-16 on the user's direction (`warp.ts` deleted); don't reintroduce a hover effect there. Two DESIGN.md §4 rules were amended for it on 2026-08-14 (Fold-Line, Honest-Network) — read those entries before changing the hero's geometry, mask, or scene list. `terrain.ts` and `vault.ts` are pinned by parity fixtures in cashubtc/wallet; retuning their constants is a keep-in-lockstep edit with that repo.
- The homepage's middle is one full-bleed 40/60 split band (`protocol-parts.tsx`, DESIGN.md §5 The Split Spec Sheet), added 2026-08-16 on the user's direction. It replaced the four-parts feature scroller, the tap-to-pay video, and the properties bento in one move; the video, `protocol-demo*.tsx`, the `--fig-*` tokens, and the Demo Panel signature are all deleted. It is deliberately outside the page shell — the entry row needs the width — so don't "align" it back to `--page-max`. Each entry's plate is a `thinking-orbs` canvas driven through the library's engine at ~280px, not its `<ThinkingOrb>` component (which ships only 64px and 20px); see `orb-figure.tsx`. The Honest-Network Rule was amended for these plates: abstract orbs are material and pass freely, but `connecting` is a topology and is pinned to the Mints entry alone, where Lightning makes a mesh true. Don't move it to another entry or add a second instance.
- **The homepage hero is centred on purpose. Everything else on the site is left-aligned.** This is the one deliberate departure from the editorial register, added 2026-08-14 on the user's direction — do not "restore" it as a consistency fix, and do not spread centring to the sections beneath it. The field's symmetric mask, the absence of optical-left corrections, and the headline's escape from the page shell all depend on it; reverting means moving all three together. See the Centred-Hero Exception in DESIGN.md §4.

When in doubt, run `/impeccable critique` against the surface in question before shipping.
