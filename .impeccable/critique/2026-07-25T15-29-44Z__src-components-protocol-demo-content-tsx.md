---
target: figure UI examples (protocol demo figures)
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 2
timestamp: 2026-07-25T15-29-44Z
slug: src-components-protocol-demo-content-tsx
---
Method: dual-agent (A: Explore design-review · B: Explore detector/browser)

# Critique — Protocol demo figures (`src/components/protocol-demo-content.tsx`)

Brief: figures read as "AI slop"; user wants elegant, custom, Apple-grade — floated liquid glass / glassmorphism.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Toggle state clear; Reveal wrapper can leave a blank 16:10 frame; scroll-spy double-highlights during 220ms transition |
| 2 | Match System / Real World | 2 | "proofs", "keyset", "melt", "P2PK" unglossed; ink/ghost convention never stated; spec plate implies four NUTs exist |
| 3 | User Control and Freedom | 4 | No scroll-jacking; toggle instantly reversible; no layout shift |
| 4 | Consistency and Standards | 2 | Figure chrome ≡ code chrome; `meta` present in CODE, absent in FIGURE; three alignment systems in one plate; prose in mono + pixel on verbs (doctrine breaks) |
| 5 | Error Prevention | 3 | Truncated token looks copyable, isn't |
| 6 | Recognition Rather Than Recall | 1 | Figures encode insight instead of delivering it: ink/ghost and left=right conventions require derivation, no legend |
| 7 | Flexibility and Efficiency | n/a | Persuade surface — no repeat-use path |
| 8 | Aesthetic and Minimalist Design | 2 | Dead lower third all four plates; half-empty header strip; one line weight; one type size |
| 9 | Error Recovery | 2 | Unrevealed blank frame has no fallback |
| 10 | Help and Documentation | n/a | Persuade surface; per-block CTA is the off-ramp |
| **Total** | | **19/32** | **Acceptable (59%)** |

## Design Specificity Verdict

**LLM assessment:** The figures don't read as slop because they're badly made — they read as slop because **they are the code pane wearing different content**. `Plate` (L163–187) duplicates `CodePane` (L28–50): same box, same filled tab-strip, same 13px mono caption. And **GT-Standard — the site's voice — never appears inside any figure**; they are 100% Geist Mono + Pixel, the single most common LLM-default aesthetic. Per figure: Wallets = authored idea (binary ladder), interchangeable execution; Mints = fintech stat block; Spec = textbook generated table; Tokens = weakest, reads as a disabled form input.

**Deterministic scan:** `detect.mjs` over the three demo components: **zero findings, exit 0** (engine verified live via hits elsewhere). In-page detector: 4 findings page-wide, exactly **1 in the demo section** — `nested-cards` on the token string box (`protocol-demo-content.tsx:441`), the same element the design review independently flagged. False positives ruled out: `text-occlusion` ×5 (crossfade artifact), nav desync (instant-scroll artifact). Conclusion: the slop-feel is invisible to rule engines; it is an authorship problem, not an anti-pattern problem.

**Visual overlays:** left visible in tab "IMPECCABLE OVERLAYS — protocol demo (nested-cards)", parked on the Tokens block.

## Overall Impression

Strong section skeleton ("The protocol, in four parts", numbered sticky nav, honest data) whose payoff is inverted: the CODE pane is the best-designed artifact in the section and it's hidden behind a click, while the default FIGURE view is four plates with no object language of their own, top-weighted content, one type size, one line weight, and unexplained conventions. Biggest opportunity: give the figure its own register (published technical plate, captioned in GT-Standard) instead of borrowed code-pane chrome.

## What's Working

1. **The CODE pane is genuinely authored** — filename/meta strip with a job on both sides, 44px graph-paper ground, C/P comment-grey/pixel-swap highlight grammar, 8-line/58ch discipline. It is the model the figures should live up to.
2. **The wallets binary ladder is a real, Cashu-specific idea** — the denomination selection *is* the binary representation of 2,101. Only figure no competitor could reuse. Concept ≠ problem; presentation is.
3. **Honesty discipline** — real NUT-23 bodies, decodable TokenV4, accurate flags, no fake animation, no scroll-jack, complete theme-flipping.

## Priority Issues

1. **[P0] The figure has no visual identity — it wears the code pane's chrome.** All four Plates omit `meta`, so the header strip is permanently lopsided in the default view. Fix: a plate register distinct from the pane register — RFC-style caption *below* the plate (`Fig. 2 —` in GT-Standard micro + thesis in GT-Standard body), a line-weight hierarchy (frame > keyline > rule > tick), one gutter per plate. Command: /impeccable shape.
2. **[P0] All four plates are top-weighted with a dead lower third.** `min-height: 440px` sizes every panel to the tallest plate. Fix: size plate to content, centre in frame, earn the bottom register (wallets legend, mints equality tie, spec continuation line, token byte count). Command: /impeccable layout.
3. **[P1] Figures encode their insight instead of delivering it; contrast erases half the data.** Ghost cells 1.48:1 light / 1.70:1 dark; ladder `aria-hidden` with no text alternative. Fix: legible ghost tier (≥3:1), one-line GT-Standard legends, `<figure>/<figcaption>` + `role="img"` labels. Command: /impeccable clarify.
4. **[P1] Doctrine fork unresolved.** DESIGN.md §5/§2(a) still authorize the retired screenshot/liquid-glass world (~110 lines of dead CSS remain: `.feature-demo__shot*`, `.feature-demo__quote*`, `.mint-flow`); code ships monochrome plates on ASCII terrain. Any glass/colour decision must resolve this fork first. Command: /impeccable document.
5. **[P2] The section is emotionally inverted and ends flat.** Strongest artifact (CODE) non-default; ASCII terrain with `$ € ¥` confetti is wallpaper under a balance sheet (graph paper is the semantic ground, one CSS line away); spec plate understates the spec (four NUTs, no "…26 more"); the final beat is a grey nested-card input box leading with WhatsApp. Commands: /impeccable bolder + /impeccable polish.

## Persona Red Flags

**Jordan (first-timer):** figure 1 reads as a PIN keypad; duplicate 100,000s read as unfilled placeholder data; counts four NUTs and concludes the spec is tiny; can finish the section without acquiring one new true fact.

**Sam (accessibility):** the ladder — the figure's entire content — is `aria-hidden` with no alternative; ghost cells fail WCAG for meaning-bearing graphics; four toggles all announce "Show as" with no panel-specific name; nav buttons lack tab semantics.

**Sovereign bitcoiner (project persona):** spec plate makes the protocol look four documents deep — fatal for the "is this real infrastructure?" judgment; `$ € ¥` glyphs are fiat-fintech texture; WhatsApp as first-named transport for bearer money is a trust wobble. Recovery exists (CODE view) but is gated behind a click.

## Minor Observations

- `Plate.meta` declared, documented, never passed — dead API causing the lopsided strip.
- ~110 lines dead CSS confirmed zero-reference (`.feature-demo__shot*`, `.feature-demo__quote*`, `.mint-flow`).
- Source comment claims token QR included; none exists.
- Scroll-spy double-highlight (220ms); Reveal blank-frame edge case; melt arrowhead invisible in dark.
- `Eyebrow` letterSpacing 0.16em is an untokenised magic number; `bg-band` on `bg-card` is a 1.02:1 fill in light.
- Card/band separation measured 1.02:1 light, 1.07:1 dark — the plate is not an object, it's an implication.

## Questions to Consider

1. If you deleted the FIGURE view and shipped only CODE, would the section be worse? If not, the brief is "invent a reason for the figure to exist," not "restyle it."
2. Whose artifact is a plate? Until authorship is committed ("figures from the Cashu specification, typeset by cashu.space"), no polish will make them feel authored.
3. Is "liquid glass" the want — or is it depth of craft, with glass as the only vocabulary at hand? Glassmorphism in 2026 is the most model-generated surface treatment in existence; the iOS quality being admired is optical precision (line hierarchy, optical alignment, content filling its container), all available in monochrome.

## Directions Proposed

1. **"The Plate"** (recommended spine): published-technical-plate register — GT-Standard caption below, line-weight system, optical alignment, content-sized plates, graph-paper ground, scale-not-fill emphasis.
2. **"Liquid glass in the RFC register"** (finish): depth by value ramp not shadow, machined edge-light keylines (hair/ghost split), refraction as content (ground attenuates under the plate — mask, not blur). Explicitly no backdrop-filter, no translucency, no 24px radii.
3. **"The Wallet World"** (alternative, higher cost): commit to depicted artifacts — four screens of one fictional Cashu wallet under the Depicted-World Exception, colour and material on the table; site frame gets more austere to compensate.
