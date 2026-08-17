---
name: Cashu
description: Open Chaumian-ecash protocol for Bitcoin.
colors:
  paper: "#ffffff"
  ink: "#000000"
  ink-soft: "#18181b"
  ink-hover: "#27272a"
  slate: "#3f3f46"
  mist: "#71717a"
  fog: "#a1a1aa"
  hair: "#e4e4e7"
  chalk: "#f4f4f5"
typography:
  display:
    fontFamily: "GT-Standard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.75rem, 9vw, 9rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  heroDisplay:
    fontFamily: "GT-Standard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.75rem, 9vw, 9rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.02em"
    # Set as text-transform, never retyped markup, so the source string stays
    # sentence case for screen readers and search. User-directed 2026-08-15;
    # recorded here 2026-08-16, having lived only in a CSS comment until then.
    textTransform: "uppercase"
  footerDisplay:
    fontFamily: "GT-Standard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.75rem, 6vw, 5rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "GT-Standard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  title:
    fontFamily: "GT-Standard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  brandWordmark:
    fontFamily: "GT-Standard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "GT-Standard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  heroLead:
    fontFamily: "GT-Standard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.005em"
  heroDeck:
    fontFamily: "GT-Standard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.015em"
    # Same treatment as the headline it sits under; recorded 2026-08-16.
    textTransform: "uppercase"
  label:
    fontFamily: "GT-Standard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0"
  navLink:
    fontFamily: "GT-Standard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0"
  button:
    fontFamily: "GT-Standard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.06em"
  compactButton:
    fontFamily: "GT-Standard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.78125rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.06em"
  micro:
    fontFamily: "GT-Standard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.06em"
  mono:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  pixel:
    fontFamily: "GeistPixelSquare, Geist Mono, monospace"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.04em"
rounded:
  none: "0"
  # `nav` and `glass` are deleted, not merely unused: the navbar's condensed
  # box was the sole consumer of both and it was retired 2026-08-16 (§5
  # Navigation). The masthead is square.
  #
  # Nothing the site ships is rounded. `card` survives for the Placeholder
  # Surface only — a scaffold that is replaced before it goes out — and
  # `full` lost its one licence when the status tag joined the signal-square
  # family (§5 Status Tag, 2026-08-16). Both are here as record, not stock.
  card: "16px"
  full: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "80px"
  page-x-sm: "24px"
  page-x-md: "48px"
  page-x-lg: "80px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
    typography: "{typography.button}"
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
    typography: "{typography.button}"
  button-secondary-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-soft}"
  # The masthead's own two-value palette. The bar is always-dark, so these do
  # not reference the page ramp; --nav-plate/--nav-plate-fg are the exception
  # and resolve to {colors.paper}/{colors.ink} — the plate is the page punched
  # through the bar. Keep the indirection even though it now resolves to one
  # value (see §2, The One-Scheme Rule): a literal here loses the reason.
  masthead:
    backgroundColor: "{colors.ink-soft}"
    textColor: "#ffffff"
    height: "56px"
  masthead-plate:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    typography: "{typography.brandWordmark}"
  nav-link:
    textColor: "rgba(255, 255, 255, 0.66)"
    typography: "{typography.navLink}"
    padding: "5px 10px"
  nav-link-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  divider:
    backgroundColor: "{colors.hair}"
    height: "1px"
  placeholder-surface:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.fog}"
    rounded: "{rounded.card}"
---

# Design System: Cashu

## 1. Overview

**Creative North Star: "The Open Specification"**

cashu.space dresses an open protocol in the visual register of a published RFC. Tight grid, fixed-width-quoted accents, monumental display type, and almost nothing decorative. The site reads as primary-source material — not a marketing page for a coin, not a fintech dashboard, not a Web3 launchpad. Visitors should feel they are looking at *the* document for Cashu, the way bitcoin.org once felt like *the* document for Bitcoin.

The system commits to a few sharp moves: massive editorial display type (GT-Standard) carries the page; neutrals stay pure (ink-on-paper, no tint, no warmth); structural elements are minimal — a thin horizontal rule, a pair of sharp-cornered buttons, generous whitespace. The Geist Pixel accent exists for one purpose: to mark machine-coded artefacts (token amounts, mint addresses, version numbers) when the spec calls for a notation different from prose. Cashu is not a SaaS, so the system actively rejects SaaS-landing-page chrome: no gradient borders, no soft drop shadows, no animated tickers, no testimonial carousels, and no glassmorphism anywhere at all — the navbar was the one sanctioned surface until 2026-08-16, and the masthead that replaced it is flat opaque ink (§5 Navigation).

Motion is permitted under one condition: it must depict real protocol structure, or be plain material carrying no assertion at all. **The hero has no ground at all**, and that is the strongest statement the system makes about its own motion. It carried a full-bleed figure for three months — a live ASCII field, then a wide dot figure driven from `thinking-orbs`' `listening` mode — and the dot figure was deleted **2026-08-16, on the user's direction, for reading as generic, corny and cheap**. The verdict was correct on the system's own terms: a pulsing dotted spheroid is a **blob shape**, which is PRODUCT.md's second anti-reference verbatim; it came out of a library built to show an AI assistant thinking, on a site that draws everything else itself; and it cleared the rule above only on the *second* branch, asserting nothing because it depicted nothing. A decorative loop with a compliance note attached is still a decorative loop.

What replaced it is the **arrival, and nothing else** — see the Set-Once Rule in §4. The closing hairline draws across the fold, one word of the headline resolves out of hex, the copy settles on the existing staged reveal, and by ~1.1s the page is completely still and stays that way. That puts the hero inside the vocabulary the rest of the site already speaks: the masthead's clip-path wipe, the button cipher pass, the reveal settles — all one-shot, all typographic, all *caused*. The looping figure was the only thing on the page that moved without a cause. See `src/components/hero-cipher.tsx` and `hero-rule-draw` in `globals.css`.

Color is almost absent from everything the site says in its own voice. The palette is paper, ink, and a graded family of greys. This is a doctrine, not a placeholder. The bitcoin-curious audience reads sovereignty in restraint; any added accent would dilute the signal. Two carve-outs, both named in §2: the Depicted-World Exception, which lets artifacts the page *depicts* keep their source colour because faking them grey would be its own kind of dishonesty; and the Signal-Green Exception, added 2026-08-16 on the user's direction, which puts one green in one shape — a 7px square opening a stated property — and nowhere else.

**Key Characteristics:**

- Monochrome by doctrine: paper, ink, six grades of grey, no chromatic accent.
- Display type does the heaviest lifting: the hero runs the full `t-display` scale, `clamp(3.75rem, 9vw, 9rem)`, set tight (line-height 0.95, letter-spacing −0.02em). It reaches 9rem past 1600px and holds there. Until 2026-08-14 the hero carried a bespoke `clamp(3.75rem, 7vw, 6.5rem)` that pinned at the bottom of this range and let the `/wallets` route H1 render 29% larger than the homepage peak; the bespoke step is gone.
- Generous editorial whitespace; sections breathe at 80–128px vertical rhythm on large screens.
- Sharp flat-slab buttons, hairline dividers, and no shadows — hierarchy comes from fill, border, position, and weight.
- Cashu's protocol artefacts (amounts, ids, addresses) are set in Geist Pixel Square as a deliberate notation contrast.

**The Two-CTA Rule.** Primary buttons across the site exist to serve two jobs and two only: *get a wallet* and *read the spec*. These are the outcomes PRODUCT.md elevates above mint trust, and the visual hierarchy follows. Every other interactive surface — GitHub, blog, tab switchers, secondary navigation — is a `.btn-secondary` or a `nav-link`. If a third "primary" CTA appears on a single page the page is competing with itself; collapse one before shipping.

## 2. Colors: The Ink-On-Paper Palette

A single non-chromatic family, scaled in lightness only. Names are atmospheric and short — printer's vocabulary.

### Primary

- **Ink** (`#000000`): The body text, the primary button, the wordmark. Used confidently and at full strength — Cashu's voice is not softened.

### Neutral

- **Paper** (`#ffffff`): The page canvas. Pure white by intent — the spec aesthetic demands a bright surface, not a tinted off-white.
- **Ink Soft** (`#18181b` — zinc-900): A slightly relaxed black used on dense secondary text where pure Ink would feel heavy.
- **Ink Hover** (`#27272a` — zinc-800): Reserved for the primary-button hover state. One shade off Ink — the change is felt more than seen.
- **Slate** (`#3f3f46` — zinc-700): Navigation links and tertiary body text. The first step away from full Ink.
- **Mist** (`#71717a` — zinc-500): Muted body copy, the legal disclaimer, anything explicitly de-emphasised.
- **Fog** (`#a1a1aa` — zinc-400): Partner labels, placeholder text, the lightest still-readable tier.
- **Hair** (`#e4e4e7` — zinc-200): Hairline dividers, secondary-button hover background. Structural lines only.
- **Chalk** (`#f4f4f5` — zinc-100): Secondary-button default background, large placeholder blocks, the lightest non-paper surface.

### Named Rules

**The One-Scheme Rule.** *Added 2026-08-17, on the user's direction.* **The site is light only.** There is no dark mode, no `prefers-color-scheme` branch, no `data-theme` override, no toggle and no saved preference. `color-scheme: light` is declared on `:root` so the browser keeps its own form controls and scrollbars light too — a page that is paper-white must not be handed dark scrollbars by the OS.

This is not the same as having no dark surfaces, and deleting one did not delete the other. The site is ink-on-paper with four deliberately dark plates — the Twilight Stack, the protocol-parts column, the masthead, and the Spec pane — plus the implementations Card, which is always light. Those are **fixed-value surfaces**: dark by composition on a light page, not a scheme. See the note atop `globals.css` for the list, which is short and is not a licence to add to.

What the removal simplified, and what must not be re-complicated: every one of those plates used to carry a second, dark-scheme value, because a value picked to contrast with `#ffffff` contrasts with nothing at `#0a0a0b`. With one ground there is one value — `--panel` is `#000000`, `--nav-bg` is `#18181b`, `--signal-page` is `#1b9d55`, `--press-mark` is `brightness(0)`. **Where a token still indirects rather than stating a literal, that is deliberate**: `--nav-plate` resolves to `--paper` because the plate *is* the page punched through the bar, and writing `#ffffff` there would keep the pixel and lose the reason.

**The No-Colour Rule.** The system uses no chromatic accent beyond the one named below. Greys may shift by lightness but never by hue. If a future surface "needs" colour, the design is wrong — work the hierarchy with type and space before reaching for a swatch.

**The Depicted-World Exception.** Colour is permitted inside artifacts the page *depicts*, never in the chrome the site *is*. The sanctioned surface is now one: third-party marks shown at their brand identity — the language logos on the implementations card and the AI-assistant icons in the footer.

*Narrowed 2026-08-16, on the user's direction.* Surface (a) was the tap-to-pay video, a documentary capture of real hardware, and it was the original reason this exception exists. The video band was deleted outright — clip, poster, copy and section — so the exception loses its founding case and keeps only the marks. (The four-parts demo panels sat here before that, as real app screenshots; they became spec figures in the site's own voice and then were deleted with the section that held them.) Everything in the site's own voice — type, backgrounds, borders, buttons, icons, figures, chrome — stays monochrome. Editorial photography *reports* rather than depicts, so it still desaturates via `grayscale(1) contrast(1.05)` and its wordmarks force to Paper (see the press band). A new colour surface that is not a third-party mark falls under the No-Colour Rule, or under the Signal-Green Exception if it is literally the mark that exception names.

**The Signal-Green Exception.** *Added 2026-08-16, on the user's direction, overriding the No-Colour Rule for exactly one mark, and widened the same day to a second consumer of that mark. Briefly widened a third time, to the hero's pointer plume, and **narrowed back within hours when the hero went monochrome** — see the note at the end.* `--signal` (`#6fe3a4`) and its page-ground sibling `--signal-page` fill one shape in two places and nothing else: the 7px square that opens a **stated property** — each property in the protocol-parts column (§5, The Split Spec Sheet) and the wallet-directory status tag (§5, Status Tag).

The scope is the whole of the rule, and it is narrow on purpose:

- **One shape, two consumers.** `.protocol-part__mark` and `.wallet-row__fact--tag::before` — a 7px square opening a line of tracked uppercase Mono, the same recipe in both places. Not type, not a border, not a background, not a link, not a focus ring, not a state (there is no green "success" and no red anything), **not a hover**, not a fill, not a gradient, not a glow, not a dot or a bar or a ring.
- **The green never appears at scale.** Its largest instance on the site is 7 pixels square. That is not an accident of where it happens to be used — it is the reason a single saturated value is admissible on a monochrome page at all, and the hero episode below is what established it.
- **Two grounds, therefore two values.** `--signal` (`#6fe3a4`) is the value picked against the always-dark `--panel` column, which never flips. The directory's ground *does* flip, and `#6fe3a4` measures **1.59:1** on Paper — the square all but disappears in light. So the page-ground consumer takes `--signal-page`: `#1b9d55` in light (**3.50:1**, same 147° hue taken down), collapsing to `--signal` in both dark blocks (**12.44:1**). Anything new on a flipping ground uses `--signal-page`; anything on a fixed dark ground uses `--signal`.
- **Decorative, always.** Both consumers are `::before` content with no accessible name, so neither carries information a screen reader or a monochrome display would lose. **Never make it the sole carrier of a meaning.** On the directory the word "Beta" states the fact and the square only marks it as a different *class* of fact; strip the colour and the row still reads.
- **Sharp and flat.** `border-radius: 0`, no shadow, no glow, no gradient, no soft alpha. The Flat Cipher Slab logic applies to a 7px square as much as to a button.

If a future surface wants this green, the answer is still no: the exception is a scoped licence, not a newly opened palette slot. Widening it is a user decision, the same way opening it was.

**The hero episode, recorded because it is the rule's best evidence.** *2026-08-16.* The exception was widened a third time, to a mint plume the pointer threw through the hero's dither field, and **narrowed back the same day on the user's direction** — the hero is monochrome and the green never returned to it. Two things were learned and both are now load-bearing above:

1. **Scale is the whole exception.** At 7px the green is a mark. At hero scale it was the largest chromatic event on a monochrome page, carrying no information, and it read as exactly the pastel/Web3 register PRODUCT.md's anti-references rule out — the least ownable hue in the crypto-adjacent space for a protocol that has deliberately refused Bitcoin's own orange. The clause "the green never appears at scale" is that finding, generalised.
2. **The colour was borrowed, and colour is the most legible thing to borrow.** `--signal` came from aspensearch.com (`#a1ffcb`), the same source as the masthead clock and the split band. A borrowed 7px square is a detail; a borrowed full-bleed accent is the other site's signature on your page. **If the green is ever proposed for a fourth consumer, weigh that first, and weigh it by area.**

**The Brand-Mark Exemption.** *Recorded 2026-08-16.* The Cashu mascot (`/cashu-no-bg.png`, in the masthead plate on every route and in the 404's header) is a full-colour raster, and until this entry **no named rule covered it**: the Depicted-World Exception is scoped to *third-party* marks and the Signal-Green Exception names one 7px square, so §2 as written forbade the site's own logo. That was a gap in the document, not a defect in the page.

The mark is exempt because it *is* the identity the rest of the system is expressing — the one thing on the page that cannot be restated in the palette without ceasing to be itself. The exemption is exactly one asset at its shipped colours, and it opens nothing: it is not a licence for a coloured wordmark, a tinted favicon treatment, a second mascot pose, or a chromatic value sampled *out* of the mascot and used anywhere else. If the mark is ever restyled, that is a brand decision, not a design-system one.

**The Two-Black Rule.** Ink (`#000000`) and Ink Soft (`#18181b`) are the only two text colours that may sit on Paper. Slate / Mist / Fog exist for legal disclaimers, nav, and labels only — never for primary reading copy.

## 3. Typography

**Display Font:** GT-Standard (M / Standard width) — 12 weights, Light 300 → Heavy 800, with matching obliques.
**Body Font:** GT-Standard — the same family carries body. One typeface, deep weight contrast.
**Label / Mono Font:** Geist Mono — code, addresses, technical labels.
**Pixel Accent:** Geist Pixel Square — protocol artefacts only (amounts, mint ids, version strings).

**Character:** GT-Standard is a contemporary grotesque with narrow apertures and a clean editorial bearing. It feels like a magazine commissioned a custom face. Geist Mono and Geist Pixel Square introduce machine-coded specificity where the protocol's own notation appears in copy — quiet contrasts, never decorative.

**All four faces are subset, and that is a constraint on what can be typed.** *Added 2026-08-17.* The faces were 133KB of a 376KB homepage — the largest category on the wire — and almost none of it was reachable. Geist Mono was shipping the full variable face (1159 glyphs, 889 codepoints, an entire weight axis) for a font this site renders at 400 and nothing else; Geist Pixel Square cost 28.6KB to set about twenty characters. `scripts/subset-fonts.mjs` cuts all four to what is actually drawn: **134,904 bytes to 39,924**, with Geist Mono alone going 71,248 to 5,188 as a static `wght=400` instance.

What this means for anyone writing copy or notation:

- **Geist Mono is one weight now, 400, honestly declared.** The axis had no consumer — `.t-mono` is 400, the other two mono rules in `globals.css` are 400, and `glyphs.ts` sets `ctx.font` with no weight at all. If mono ever genuinely needs a second weight, take the variable subset the script can also emit (13,300 bytes); do not add a face.
- **The ranges are drawn wider than today's text on purpose.** Geist Pixel keeps full alphanumerics rather than the twenty characters it sets, because everything it sets is a string literal in the source and a tight subset would turn a one-word copy edit into silent tofu. GT-Standard keeps all of Latin-1 and the punctuation block, because the wallet directory and the press band carry names written by other people, and a face that tofus on the first accented one is a bad trade for 1.1KB.
- **The hero field is the reason this cannot be checked from the DOM.** `glyphs.ts` draws `REST_ALPHABET` and `WAKE_SLOTS` straight onto a 2D canvas, so those characters appear in no element a walker could find. The mono range carries them explicitly. `₿` and `₩` need no codepoints because they are synthesised from `B` and `W` — see §5, The Hero Field.
- **A missing glyph does not fail loudly.** Every face has a fallback chain, so a character outside the subset renders in the system font and still *looks* fine, which is the defect that survives review. The subsets were verified by rasterising 82 characters per face **with the fallback chain stripped**, so a gap could only come back as tofu. Re-run that check, not just the script, when a range changes.

Re-run `scripts/subset-fonts.mjs` when `geist` is updated, when a trial face is replaced, or when the rendered character set changes.

**The homepage hero is set in caps — headline and deck both.** *(User-directed 2026-08-15; recorded here 2026-08-16, having lived until then only in a comment in `globals.css`, which is how a treatment on the site's largest type went two days undocumented.)* It is applied as `text-transform`, never as retyped markup, so the source string stays sentence case for screen readers, for search, and for the cipher pass that reads the label. This is the hero and only the hero: section headlines, entry titles, body and leads elsewhere all stay sentence case. Button labels are separately and independently caps (§5), which is a component rule, not this one.

### Hierarchy

- **Display** (weight 600, `clamp(3.75rem, 9vw, 9rem)`, line-height 0.95, letter-spacing −0.02em): Short page-peak copy — the closing-CTA slogan, the H1 on dedicated routes (`/wallets`, future `/docs`, `/blog`). Sized to be monumental. The line break in Display copy is part of the composition, not an accident of viewport. The homepage hero runs at this scale too — see below.
- **Homepage Display** — *retired 2026-08-14, on the user's direction.* This was a bespoke `clamp(3.75rem, 7vw, 6.5rem)` step for the homepage H1, on the reasoning that longer descriptive hero prose should sit below route Display "so it can share the full content grid without shouting." The reasoning was deliberate and it was wrong in practice: the step pinned at 6.5rem past ~1486px and fell to 5.6rem at 1280px, so the homepage hero — the page peak — rendered **29% smaller than the `/wallets` route H1 at 1440px and 38% smaller at 1920px**. A secondary route out-shouted the front door, and the hero read flat for exactly that reason. The hero now uses Display unmodified. Measured across 360–2560px: no horizontal overflow, and the section still resolves on the fold at every size. Do not reintroduce a homepage-only display step; if the hero copy grows too long for Display, shorten the copy.

  The three-line break this note originally recorded past 1600px was a second, separate fault — the page shell, not the type scale — and the shell escape in §4 was the right half of the fix.

  *Corrected 2026-08-16.* This note used to end "The headline now breaks in two at every width from 768px up." **That was never true and it cannot be made true.** Measured at the top of the Display clamp (144px) against the escape's own 1440px cap: `OPEN SOURCE ECASH` sets 1513px and `ECASH FOR BITCOIN.` sets 1446px, so **both halves of both possible two-line splits overflow**, the shorter of them by 6px. The escape fixed the shell cap and the sentence still needs three lines. Raising the cap does not rescue it either: at 1600 the viewport binds before the cap does (1440px of box at 144px of type) and the near miss stays a miss.

  Two levers could deliver two lines and both are closed. Shrinking the type reintroduces the bespoke homepage Display step retired above on 2026-08-14, for the documented reason that it let a secondary route out-shout the front door. Shortening the copy is a user decision, and it is the one this section already recommends: *"if the hero copy grows too long for Display, shorten the copy."*

  **So three lines is the composition, and it is authored rather than wrapped.** `text-wrap: balance` was picking the break, and because balance equalises line *lengths* it stranded the preposition — `OPEN SOURCE / ECASH FOR / BITCOIN.` The rag is now set in the markup as three `.hero-spec__line` spans, long / short / medium, with **`ecash` alone on the short line**: it is the word `hero-cipher.tsx` resolves out of hex on arrival, so the only thing in the hero that moves is the line the centred composition turns on. Blocks from 640px up, where every line clears its box at every step of the clamp; inline below, where `OPEN SOURCE` alone sets 418px against a 390px phone's 342px of box and a forced break would only wrap again. Measured 320–2560: three lines from 640 up, four at 390, five at 360 and below, no horizontal overflow anywhere.
- **Footer Display** (weight 600, `clamp(3.75rem, 6vw, 5rem)`, line-height 0.95, letter-spacing −0.02em): The compact closing wordmark.
- **Headline** (weight 600, `clamp(2rem, 4vw, 3rem)`, line-height 1.05, letter-spacing −0.015em): Section openings ("What is ecash?", "Wallets", "Mints").
- **Panel Display** (weight 600, `clamp(2.25rem, 3.6vw, 4rem)`, line-height 0.98, letter-spacing −0.02em, uppercase): *Added 2026-08-16.* The protocol-parts left column, and only it. A step between Headline and Display, for a headline that has a full-height sticky panel to itself and holds the top of it while four entries scroll past. At Headline it read as a caption for the column beside it; at Display it would be the second page-peak on the homepage, which §3's own note on the retired Homepage Display step already establishes is a fight the hero has to win. At 1440 it breaks in **two** lines — `THE PROTOCOL,` / `IN FOUR PARTS.` — which is the composition. *(This entry said three until 2026-08-16; it was never three at 1440, and the claim went in unmeasured alongside the hero's identical one in §3. If a line count appears in this document, measure it before you write it down.)* Carries the optical-left correction (−0.058em) because it is left-aligned against a real margin — see the Centred-Hero Exception in §4, item 1.
- **Entry Title** (weight 600, `clamp(1.5rem, 2.2vw, 2.125rem)`, line-height 1.1, letter-spacing −0.015em): *Added 2026-08-16.* The four protocol-parts entry titles, capped at `18ch` so they break in two the way the reference sets them. One step below Headline: the panel headline is the section's only full heading and these are chapters under it. This is the same job the retired `.feature-block__title` did for the section this one replaced, at the same rank and for the same reason.
- **Title** (weight 600, `1.125rem`, line-height 1.3): Subheaders, card titles, anything ranked above body but below a section opening.
- **Body** (weight 400, `1rem`, line-height 1.5, max line length 65–75ch): All reading copy. Width is enforced; no body paragraph crosses 75ch.
- **Hero Lead** — *retired 2026-08-16.* This documented a `.hero-spec__lead` at weight 400, `clamp(1.125rem, 1.6vw, 1.5rem)`, capped at `46ch` with `text-wrap: pretty`, as "the homepage hero's supporting statement." **It has had no consumer since 2026-08-14**, when the hero's body sentence was cut on the user's direction and `.hero-spec__lead` / `.hero-spec__body` went with it (the note survives in `globals.css`). The entry outlived the element by two days and this document went on describing a rule for it. The hero is headline, deck, CTAs — nothing else. If supporting prose ever returns to the hero, read the note in `page.tsx` first: the standing direction is that the gap it would fill wants a figure, not a paragraph.
- **Label** (weight 500, `0.875rem`): Navigation, captions, the disclaimer.
- **Button** (weight 500, `0.8125rem`, uppercase, letter-spacing 0.06em, line-height 1.2): Button labels only — one step below Label so the all-caps slab reads as an object, not a line of text. Codified here so the type ramp and the component spec agree on the same number.
- **Mono** (weight 400, `0.875rem`): Inline code, addresses, transaction ids — anywhere a literal copy-pasteable string appears in copy.
- **Body Lead** (weight 400, `1.125rem`, line-height 1.55, letter-spacing −0.005em): Section intros and lead paragraphs. One step above body. Use sparingly — usually one lead paragraph per section.
- **Pixel** (weight 500, `1rem`, letter-spacing 0.04em): Amounts, denominations, mint identifiers, protocol version. A *notation* mark, never a decoration. Never used as a heading, eyebrow, section marker, or link affordance — those are Label sans. If you reach for pixel and there is no machine-data string to set, the answer is Label.

### Named Rules

**The One Face Rule.** GT-Standard carries everything readable. Geist Mono is technical notation; Geist Pixel Square is protocol notation. Three families, three jobs, no overlap.

**The Big-Or-Quiet Rule.** Type is either Display (≥3.75rem) or quiet (≤1.125rem). The middle ground — `text-2xl` / `text-3xl` body — is avoided. Hierarchy is achieved by jumping scale, not by stair-stepping.

## 4. Elevation

The system is flat without exception. Containers and controls — cards, buttons, sections, callouts, nav, dividers, placeholder surfaces — sit directly on their ground without ambient depth. Hierarchy is conveyed by whitespace, grid position, type weight, fill, border, and a single 1px hairline rule.

Buttons communicate interaction through contrasting fill, a precise border, quick active compression, and the cipher pass documented in §5. They do not lift off the page.

### Named Rules

**The No-Shadow Rule.** `box-shadow` is forbidden throughout the site, including buttons. If a surface needs separation, use spacing, fill contrast, or a 1px border. **No exceptions.** From 2026-07-25 to 2026-08-16 the navbar's condensed box carried `--nav-shadow` as part of the Onyx scroll behaviour; the masthead that replaced it has no box to lift (§5 Navigation), the token is deleted, and the rule is absolute again. Nothing inherits a licence from a surface that no longer exists.

**The Hairline Rule.** Structural separation between sections is achieved with a single 1px line in Hair (`#e4e4e7`), full content width, never bolder. No double rules, no decorative rules.

**The Fold-Line Rule.** The hero fills one viewport height (`min(100svh - var(--nav-h), var(--hero-max))`) and reads as a spec cover: title at the top, horizon at the bottom, the closing hairline resolving *on* the fold rather than floating above it with dead ground below. Two bounds keep it honest: `--nav-h` is subtracted because the bar is sticky and occupies flow space, and `--hero-max` (1200px) stops the chase on very tall displays, where an uncapped hero would open a void instead of a horizon. Past the cap the next section peeks in, which is the intended degradation.

*Amended 2026-08-14, on the user's direction.* The ASCII field was a `clamp(180px, 26vh, 320px)` band pinned to the section's base; it is now a full-bleed layer filling the hero, with the copy sitting on top of it. **The rule's substance is unchanged — only its mechanism is.** "Title at the top, horizon at the bottom" is now enforced by the field's mask rather than by the band's height: a vertical gradient holds the field fully transparent behind the sticky bar and near-transparent through the headline, and a horizontal gradient holds the field down through the middle of the section where the copy sits, so it runs at full strength out to both edges and frames the column instead of sitting behind it. That density gradient is load-bearing composition and must not be "corrected" by flattening the mask to uniform. The old prohibition on growing the band is retired with the band.

*Corrected later the same day, twice.* First: the horizontal mask was a one-sided **left** dimmer while the hero copy was left-aligned; with the Centred-Hero Exception below it became a symmetric centre stripe. Second, user-approved the same evening: the stripe quieted the middle at *every* height, which cut a hole out of the horizon under the CTAs and crushed the morph scenes wherever they stood — measured 0.09–0.22 effective strength across the vault and round trip at 1440, because the scenes had been staged against the old left dimmer and never restaged. The second pass is now an **elliptical quiet zone** around the copy block (`radial-gradient(50% 40% at 50% 40%)`, 0.30 inner hold to a 72% plateau; widened to 68% on narrow viewports), so the field releases at the bottom-centre and the horizon runs unbroken. The scenes stage there now: bottom-centre, the vault cresting the fold with its lower arc deliberately cropped, the round trip riding the base with its anchor derived from its own extent (`SCENE_*` in `ascii-field.tsx`). The mask and the stage are a matched pair — reshape one and the other moves with it. The pairing with alignment still holds too: if the hero ever goes back to left-aligned, the quiet zone has to move off-axis with the copy or it will quiet the wrong ground.

*Amended 2026-08-16, on the user's direction, with the figure it masks.* The ASCII field is gone and the hero's ground is a single wide dot figure (§1). **The rule's substance is unchanged for the third time — only its mechanism is.** The mask was two gradients intersected; it is one. The elliptical quiet zone was written for an *even* texture: a glyph grid has no density of its own, so the mask had to supply the quiet around the centred copy. The dot figure has density of its own — and, more to the point, it no longer sits behind the copy at all — so a centre-dim would only have quieted the figure's most open region. It is retired, and `mask-composite` with it. The vertical fade does the whole job: transparent to 9%, 0.10 at 46%, 0.42 at 68%, full by 86%. The 9% flat run is still load-bearing twice over and `MASK_DEAD_TOP` in `hero-orb.tsx` still has to track it.

**The matched pair held and moved together, which is the point of the pairing.** The figure stages centred, its ellipse at 95% of the hero height with a vertical semi-axis of 30%, so its top arc lands around 65% and its lower arc crops past the closing hairline — the vault's crest composition, carried onto the thing that replaced it. "Title at the top, horizon at the bottom" is now literal rather than mask-enforced, which is the first time this rule has been satisfied by the composition instead of by the mask. A Bitcoin mark briefly staged in the band between the measured bottom of the copy and the fold; it was removed the same day and the measurement of `.hero-spec__content` went with it, so the figure no longer reaches into the copy's markup at all.

*Amended 2026-08-16, later the same day, on the user's direction. **This is the fourth amendment and the first that changes the rule's substance rather than its mechanism.*** The three amendments above each open by insisting the substance is unchanged. This one cannot, and pretending otherwise would hide the decision from whoever reads it next.

The wide dot figure is deleted (§1) and **the hero has no ground**. That breaks "title at the top, horizon at the bottom" at both ends. There is no figure left to be the horizon, and holding the copy at the top with nothing beneath it would leave roughly 40% of the fold as pooled emptiness — **the exact "dead ground below" this rule was written to prevent.** A rule cannot be satisfied by the thing it forbids.

So the composition inverts: **the title block centres in the section, and the closing hairline *is* the horizon.** `.hero-spec__inner` takes `margin-block: auto`, which in the section's flex column splits the free space above and below it; the section's padding is asymmetric so the block seats a few percent **above** true centre, because a block centred mathematically reads low. Measured at 1440×900: 140px above, 176px below, the block 5.7% above centre.

*Corrected 2026-08-16.* Those paddings were `clamp(72px, 9vw, 144px)` and `clamp(104px, 12vw, 200px)` — **pure viewport-*width* clamps with no height term**, and every amendment to this rule had been measured at one viewport, 1440×900. On a wide-but-short laptop the width term bought air the height could not pay for: at 1366×665 they resolved to 123px + 164px, **287px of padding inside a 665px fold**, and the paired CTAs — the only two jobs the Two-CTA Rule sanctions — were sliced by the viewport edge on arrival (ctaBottom 685 against a 665 fold). At 1280×600 the whole CTA row sat below the fold. The rule's own composition was being delivered to a minority of desktop visitors.

They are now `clamp(48px, min(9vw, 10svh), 144px)` and `clamp(56px, min(12vw, 14svh), 200px)`: the shorter axis governs, so a short viewport stops paying width-sized air. Measured after — CTAs clear the fold at 1280×600, 1366×665, 1440×700, 1440×790, 1440×900, 1512×780, 1920×900 and 1920×1080. **The reference composition is untouched**, because on a tall viewport the auto margins absorb the difference and the floors never bind: 1440×900 moved 137/180 to 140/176. **Measure this rule at more than one viewport height before amending it again.** The lift is done with padding and not a transform — a transform on the hero would establish a containing block and can land display type on fractional pixels.

Both original bounds survive untouched: the section still fills `min(100svh - var(--nav-h), var(--hero-max))`, and past the 1200px cap the next section still peeks in. The short-viewport degradation also survives for free — once the content outgrows `min-height` the free space is zero, the auto margins collapse, and the top padding does the work exactly as before.

What the rule now means: **a spec title page.** Title block optically centred, hairline closing on the fold, and nothing between them. The reading that dies with this amendment is the one that assumed the hero needs something in its lower half; it does not, and it never needed a figure to avoid a void — it needed the air distributed instead of pooled.

**The Centred-Hero Exception.** *Added 2026-08-14, on the user's direction.* The homepage hero is centred: `.hero-spec__content` runs `align-items: center` with `text-align: center`, and the headline, deck, lead and CTA row all centre on the page axis.

**This is a deliberate departure and the only one on the site.** Everything else — every section heading, the wallets registry, the implementations directory, the footer, both interior routes — stays left-aligned editorial, which is what PRODUCT.md's "editorial-minimal, confident through silence" describes and what the rest of the system is built for. A centred hero sits closer to the marketing register than the rest of the page does. That was weighed and chosen, not drifted into.

Do not "restore" the hero to left-aligned as a consistency fix, and do not spread centring outward to the sections beneath it. If it ever does go back, three things move together or the composition breaks:

1. **The optical-left corrections come back.** Glyph side bearing has to be cancelled against a left margin: measured for GT-Standard 600, the headline needs `-0.058em` (round cap "O") and the deck and lead `-0.095em` (flat caps "I", "E"). Without them the inked left edge staggers four ways — up to 8px at display sizes, and worse as the type grows. See the Fold-Line Rule above.
2. ~~**The figure moves off-axis.** The mask is a plain vertical fade now (see the Fold-Line Rule), which is alignment-agnostic — but the *figure* is centred on the page axis because the copy is. Against left-aligned copy it has to move off-axis too, or it sits under the column instead of spanning beneath it.~~

   **Struck 2026-08-16:** there is no figure and no mask. The hero's ground was deleted (§1, and the Fold-Line Rule's fourth amendment above), so a revert to left-aligned has nothing to move off-axis and nothing to re-stage. What *does* now travel with the alignment is the vertical centring: a centred title block is a title-page composition, and against left-aligned copy it would need re-deciding rather than inheriting. Two coupled moves remain, not three.
3. ~~**The headline's width escape.**~~ **Retired 2026-08-16 — the headline is back on the page shell's own measure, and this exception now has two coupled moves, not three.** It sized off the viewport rather than the shell (`min(calc(100vw - 2 * var(--page-x)), 1440px)`) because the shell capped it at 1088px. The "~1283px to break in two" figure this item used to cite was **wrong** — the real requirement is 1513px for `OPEN SOURCE ECASH`, which no cap reachable here supplies, and §3 records why two lines are impossible at the Display scale at all.

   Once the rag was authored rather than balanced (§3), the escape stopped buying anything: the widest line is `OPEN SOURCE` at 1003px and the shell's 1088px already holds it, so the extra 352px was headroom for a break that could never happen. Measured at 768/1024/1280/1440/1600/1920/2560 before and after: **three lines at every width, identical.** At 1920, where the box actually changes (1440px → 1088px), every rendered line's inked centre and top are **pixel-identical** — the lines are centred and none of them fills either box, so this is a visual no-op.

   **The property stays; only its value changed.** `.hero-spec__content` is `align-items: center`, so with no width at all the h1 shrinks to max-content and `.hero-spec`'s `overflow: hidden` clips it on narrow viewports. An explicit width is load-bearing here — do not "simplify" it away.

**The Honest-Network Rule.** Network visualisations and motion are permitted *only when they reflect real protocol structure*. Acceptable: Lightning Network bridges shown as animated dotted lines between mint markers; peer-to-peer token transfer between users. Forbidden: decorative flow, speculative connections, "mints talking to mints" (which Cashu doesn't do), or any animation that exists for aesthetic energy rather than to convey a true property of the protocol. When in doubt, the simpler static version is more honest than the animated one.

*Amended 2026-08-14, on the user's direction, for the hero ASCII field.* The field cycles slowly (76s — the vault condenses from 10s so it lands within a first read, also user-directed) between three named scenes, and each clears the rule on its own terms:

- **Terrain** is a contour heightfield. It depicts nothing and claims nothing — it is a material, like paper grain. Texture is outside the rule's scope; the rule governs things that assert a structure.
- **The vault door** is a depicted object, not a network. It carries no edges and implies no topology.
- **The blind-signature round trip** *is* protocol structure, and is the scene that earns the motion: Alice's secret stays on her side, the blinded point travels out, the mint signs without seeing it, the signature returns, and the secret plus the signature resolve into a bearer token. Two nodes, one round trip, no third party. The travelling dashes are the same device the rule already blesses for Lightning bridges.

What stays forbidden is unchanged and explicit: no mint-to-mint edge, no speculative connections, no third node standing in for "the network", and no scene added to the cycle purely because it would look good. A world map was proposed and rejected on exactly this ground — it asserts a global reach the protocol does not itself claim.

*Amended later the same day, with the horizon stage.* Below 768px the round trip stands down: at the smallest stroke scale that still renders (one cell per band), the figure is ~560px wide, so a phone crops both rings and the two-party picture stops reading as two parties — a wrong picture, which this rule ranks below no picture. Narrow viewports hold open terrain through the round trip's slot; the vault, which fits a phone, still plays. This is a legibility stand-down, not a scene-list change — the loop is unchanged from 768px up.

*Recorded waiver, same date; settled 2026-08-16.* The `$ ¥ €` glyphs on high contours and `₿` at the peaks (`terrain.ts`) depicted no protocol structure; the 2026-07-26 critique flagged it, and it was retained as the site's own voice with the ₿ density deliberately increased. All of them went with the field they lived in. The ₿ was carried over into the replacement figure for a few hours on 2026-08-16 and then removed too, on the user's direction — so **the site now draws no currency mark of any kind**, and this waiver has nothing left to waive. A note for whoever revives one: **the shipped GT-Standard trial faces carry none of `$ ¥ € ₿`** (271 codepoints, cmap-verified), and neither does Geist Mono, so any of them has to be drawn rather than typed.

*Amended 2026-08-16, on the user's direction, for the protocol-parts orb plates.* The four entries in §5's Split Spec Sheet each carry a `thinking-orbs` canvas animation — a dotted orb, from a library built to show an AI agent's status. These depict nothing about Cashu, and the rule as written would have refused them. It now admits them, on the same ground the hero's terrain already stands on: **an abstract figure that asserts no structure is material, not a claim, and the rule governs claims.** A dotted sphere with particles orbiting it says nothing false about the protocol because it says nothing about the protocol at all. What it does is give a numbered entry a plate, which is a compositional job, and the registration marks and the entry index are what keep it reading as a figure rather than as a spinner.

**`connecting` is the one state this rule constrains, and it is admitted on exactly one entry.** *(Recorded 2026-08-16, on the user's direction; it first shipped banned by name and was reversed the same day.)* It draws a constellation of nodes wiring itself together with marks running the edges — the only state in the set that is a topology rather than material, and therefore the only one the rule reaches at all.

It sits on **02 Mints**, and nowhere else, because that is where a mesh is true. The acceptable list at the top of this rule already blesses "Lightning Network bridges shown as animated dotted lines between mint markers": Lightning genuinely is a mesh, and the mint is the one part of Cashu that touches it. The entry's own copy says so directly — "Mints bridge Lightning and ecash", first property `LIGHTNING IN, ECASH OUT` — so the figure is read against Lightning, which is the network it can honestly stand for.

The residual risk is recorded rather than argued away: **the orb does not distinguish a mint-to-Lightning edge from a mint-to-mint edge, and a reader cannot tell which mesh they are looking at.** The adjacency to the Lightning copy is what carries it. That is a judgement about this one placement, not a general result — which is exactly why the placement is pinned:

- **Not on 01 Wallets, 03 Spec, or 04 Tokens.** None of them touches a real network, so the same figure beside them asserts a topology Cashu does not have. Moving `connecting` to another entry re-creates the picture this rule was written to forbid.
- **Not as a second instance.** One mesh on the page, on the part that has one.
- **"Mints talking to mints" is still forbidden** in any figure the site draws itself, and this amendment does not soften that — it admits a figure that is *ambiguous* about it in a position where the honest reading is the one the copy supplies.

Two further things the amendment does **not** open:

- **No orb may be captioned or positioned as depicting a mechanism.** The entry title and description describe the part; the plate is a plate. The moment an orb is presented as showing how something works, it is making a claim and the rule applies to it in full — `connecting` included, and first.
- ~~**The hero is untouched.** Its field is the site's own drawing and the round trip in it is real protocol structure. Nothing here licenses swapping that for a library.~~

  **Retracted 2026-08-16, later the same day, on the user's direction — objections raised and overruled.** The hero's ASCII field was deleted and its ground is a `thinking-orbs` figure too (§1; `hero-orb.tsx`; `src/lib/ascii/` and `ascii-field.tsx` are gone). What it cost is worth stating plainly, because the clause above existed to prevent exactly this: **the site lost the one piece of motion on the page that *was* real protocol structure** — the blind-signature round trip, which this rule's own 2026-08-14 amendment called "the scene that earns the motion". Nothing on the homepage depicts the mechanism now. The hero's figure clears the rule on the *other* branch, the one the four plates stand on: an abstract figure that asserts no structure is material, not a claim. It is admitted as material, and material is all it is.

  Three things do **not** move with the retraction, which is why it is narrow rather than general:

  - **`connecting` / the web mode stays banned from the hero.** It is a topology, it is pinned to 02 Mints, and "not as a second instance" still means not as a second instance. The hero runs **`listening`**, whose geometry is a stack of latitude rings on independently modulated radii — the closest thing in the library to the contour heightfield it replaced, which is why it was chosen. **`searching` was the first candidate and was rejected here:** a latitude-and-longitude graticule at ~1800px wide with a meridian sweeping it is a world map with the coastlines taken out, and this rule already records a world map as proposed and rejected on precisely that ground.
  - **No orb may be captioned or positioned as depicting a mechanism.** The hero's ground carries no caption and never should. The bullet above stands unchanged and now covers five figures, not four.
  - **Nothing is embedded in the field.** A Bitcoin mark surfaced out of it and receded on a 72-second cycle; it was removed the same day, on the user's direction, and `btc-glyph.ts` with it. The ground now depicts nothing whatever, which is the plainest possible reading of the material branch and the easiest to defend. If a mark is ever put back, the boundary it has to clear is PRODUCT.md's first anti-reference, "animated 3D coins": never spinning, never scaling, never catching a light, never a disc.

The exclusion of `breathing` recorded in `protocol-parts.tsx` is not this rule — that one is legibility, not honesty.

*Amended 2026-08-16, later the same day, on the user's direction: **the hero no longer stands on either branch, because it draws no figure at all.*** The wide dot figure admitted as "material, and material is all it is" three paragraphs above was deleted within hours of being admitted, for reading as generic (§1, and the Set-Once Rule below). The retraction's accounting stands and is now only half true: the homepage still does not depict the mechanism, but it no longer offers a decorative substitute for it either.

This makes the rule's own closing line literal at the hero for the first time — *"When in doubt, the simpler static version is more honest than the animated one."* The hero was in doubt for three months and has now taken that sentence at its word.

**The open item is unchanged and should stay visible:** the blind-signature round trip, which this rule's 2026-08-14 amendment called "the scene that earns the motion", is still deleted and still the strongest candidate for anything that goes back into the hero. Its geometry is recoverable (`git show 5e4c0e8^:src/lib/ascii/bdhke.ts`). The bar for a replacement is the rule's **first** branch, not the second: a figure that depicts real protocol structure. "It would look good behind the type" is what put the blob there, and it is not a reason.

*Amended again 2026-08-16, on the user's direction: **the hero has a ground and it stands on the second branch.*** `hero-field.tsx` draws a field of Geist Mono hex whose occupancy is 4-octave Perlin noise, plus a fluid wake the pointer stirs through it. This is material and material is all it is — the same standing the deleted dot figure had, in the same words, and the honest thing to do is say so rather than construct a reading in which noise depicts something.

Three things separate it from the figure that was cut, and none of them is a claim to the first branch:

- **It asserts nothing false.** The blob's specific failure was not that it was decorative; it was that a pulsing dotted spheroid *looks like a diagram* of something, on a page about a protocol, while diagramming nothing. A field of hex reads as the substrate the page is printed on. There is no silhouette to misread, and deliberately no words.

  *The hex-to-currency substitution added later the same day (§5) does carry a true idea — a blinded token is money that looks like noise until something resolves it, and a mint's `unit` is an open field in the NUTs. **That is not a promotion to the first branch and should not be argued as one.** The rule's first branch wants a figure that *depicts* the mechanism; this is a ground whose two states happen to be honest about what the mechanism produces. The distinction is worth keeping sharp, because "it means something" is exactly the argument that would let a decorative figure back in.*
- **It is caused.** The blob looped with no cause; this holds still until the reader disturbs it. See the Set-Once Rule's first amendment above.
- **It is not a figure.** It has no edge, no centre, no subject, and it clears the type entirely. The distinction the rule needs here is between a *ground* and a *figure*: a figure occupies attention and therefore owes an assertion, a ground is the paper. This is stock, not illustration.

**The open item is unaffected and the bar has not moved.** If anything is ever drawn in the hero that has a shape — a mark, a diagram, a subject — the first branch still governs it, and the blind-signature round trip is still what should fill that slot. Do not read this amendment as licence for a *figure* made of noise.

**The Set-Once Rule.** *Added 2026-08-16, on the user's direction, with the deletion of the hero's ground. **Amended later the same day, also on the user's direction, when a ground came back**, and again on 2026-08-17 when the arrival was measured and found not to be arriving — see both amendments below, the second of which is the operative version.*

**The hero sets once and then holds.** Its entire motion is the arrival — the closing hairline draws across the fold (`hero-rule-draw`, 1100ms), one word of the headline resolves out of hex (`hero-cipher.tsx`, 760ms), and the headline, deck and CTAs settle on the staged reveal. By roughly 1.1 seconds nothing in the hero is moving, and nothing moves again for the length of the visit. There is no cycle, no clock, no idle loop and no hover response. *(The 1.1s claim was measured on 2026-08-17 and was false on a phone by more than a second — see the second amendment, which repairs it rather than restating it.)*

This is doctrine, not a temporary state while a better figure is found. The site's whole motion vocabulary is one-shot, typographic and *caused*: the masthead's clip-path wipe answers a pointer, the button cipher answers a hover, the reveals answer a scroll. An ambient loop answers nothing, which is why it read as a screensaver and why "confident through silence" — PRODUCT.md's own phrase for this brand — is contradicted by a hero that will not stop moving.

What this forbids, explicitly, so it is not relitigated by increments: no ambient background animation, no idle cycle, no looping canvas, no figure that re-runs on a timer, no parallax, and ~~no hero motion that fires on anything other than first arrival~~ **no hero motion the reader has not caused** (amended below). **A figure that depicts real protocol structure is still admissible** under the Honest-Network Rule's first branch — but if one returns it should advance on scroll or on arrival, so the reader causes the motion, rather than running a clock of its own.

#### The Set-Once Rule, first amendment: caused motion

*2026-08-16, hours after the rule was written, on the user's direction and against aspensearch.com. The hero has a ground again: `hero-field.tsx` — a frozen field of Geist Mono hex with a monochrome wake the pointer stirs through it. (The ground shipped that afternoon as a Bayer dither with a mint plume and was rebuilt the same evening, user-directed, for being too close a copy of the reference — see §5. The terms below are what admitted a ground in the first place and they did not change.)*

**What was struck is one clause: "and no hover response." What survives is everything that clause was written to protect.** The rule's own argument is quoted above and it is about causation, not about hovering — *"the masthead's clip-path wipe answers a pointer, the button cipher answers a hover, the reveals answer a scroll. An ambient loop answers nothing."* A trail that exists only under the cursor answers a pointer. It was on the wrong side of the rule's list and the right side of the rule's reason.

The rule's closing sentence already anticipated the shape of this: *"it should advance on scroll or on arrival, so the reader causes the motion."* The amendment adds a third cause to that pair and changes nothing else.

**The terms are exact, and they are what makes this an amendment rather than a repeal:**

- **The field does not drift.** It is baked into a texture once per viewport size. There is no `time` uniform anywhere in `src/lib/hero-field/shaders.ts` — not set to zero, not present. The reference this comes from advances its noise every frame; ours cannot.
- **There is no `requestAnimationFrame` at rest.** The loop starts on a `pointermove` and stops ~2.2s after the last one. Between times the hero costs exactly what a static image costs. *Verified, not asserted:* `window.__heroFieldFrames` exists so this is testable, and it must not increment across a quiet interval.
- **The loop lands where it started.** Before stopping it clears the trail and renders once more, so the resting frame is bit-identical to the frame before the pointer arrived (measured: 0 differing pixels of 1,215,360).
- **The type is untouched.** A box SDF fitted to the type's own extent clears both layers off the title block — the ground a long way out, the wake right at the letters (measured: 0 field pixels inside the headline box while sweeping straight through it).
- **The ground and the plume are gated separately.** *Corrected after the first critique, which asked the right question: if the field is frozen, why withhold it from someone who asked for less motion?* It is a still image, so everyone who can run WebGL2 gets it — reduced-motion visitors and every phone included. Only the **plume** needs a cause, so it is built only where a fine hover pointer exists and motion has not been declined; without both, no solver is allocated at all and no pointer listener is attached (measured: canvas present, ground painted, **0 frames** after 25 pointer events). Gating the ground on a mouse would have handed most of this site's traffic — a link opened on a phone — a different hero from everyone else's.

**Still forbidden, unchanged:** ambient background animation, idle cycles, timers, parallax, scroll-linked figure motion that runs past its trigger, and any hero figure that moves without the reader moving it. If the field is ever found drifting, cycling, or holding a rAF at rest, it is in breach of this rule and not an exception to it.

**What the ground is, honestly:** Perlin noise deciding which cells of a hex field are occupied. It clears the Honest-Network Rule's *second* branch only — see that rule's own accounting below, which this amendment does not improve.

#### The Set-Once Rule, second amendment: the arrival does not wait for hydration

*2026-08-17. Not a change of intent — a repair. **The rule's central promise was false on a phone and had been since it was written**, and nobody had measured it.*

The rule says "by roughly 1.1 seconds nothing in the hero is moving." On a throttled phone (Slow 4G, 4x CPU) the truth was that **nothing in the hero had appeared** by 1.1 seconds. `globals.css` held every entrance at `opacity: 0` behind `:where(html.js) .reveal`, and only React could add `.is-revealed`. The masthead was inside a Reveal too, so the page was not "quiet at 1.1s" — it was blank white paper, masthead included, until hydration landed near 1.9s, and the settle did not finish until **2551ms**. LCP was 2280ms against a 764ms FCP. The document had been complete and styled since 613ms.

**An entrance that always plays takes no runtime input, so it does not need a runtime.** The `immediate` reveals are now `.reveal--arrival`, a CSS keyframe animation that runs from the stylesheet, at parse time, over server-rendered markup. Measured after: **LCP 648ms, legible 1178ms, CLS still 0.00.** The precedent was already in the file — `.hero-spec::after` has always drawn the closing hairline exactly this way, which is why the hairline was the one part of the arrival that was honest.

**Nothing about the gesture moved:** same `--dur-reveal`, same `--ease-out-quart`, same 8px rise, same authored stagger. The rule's promise is now true, and true about 1.4 seconds sooner.

**Two things are load-bearing and will both look like mistakes:**

- **The animation starts at `opacity: 0.02`, not 0.** Chrome refuses an element as an LCP candidate when its only main-thread paint has opacity exactly zero, and a composited opacity animation never repaints on the main thread — so a headline animating 0 → 1 stays invisible to the metric until something *else* forces a repaint, which in practice is the hydration this was escaping. Measured both ways: from 0 the change bought nothing at all (LCP 2244ms); from 0.02, 1.5 seconds. Two hundredths of a step is imperceptible on Paper. **Do not tidy it back to 0.**
- **React still adds `.is-revealed`, on purpose.** It is the signal the 1.5s failsafe in `layout.tsx` probes for. The class now lands on an element the animation has already carried to 1, so it changes nothing it can see, and removing it would silently disarm the failsafe that protects every scroll-triggered reveal below the fold.

**The cipher pass had to be brought under the rule, and this is the part that is genuinely a motion decision rather than a delivery one.** `hero-cipher.tsx` started 120ms after hydration — safe only while the headline was invisible until then. With the hero painting at 648ms and hydration landing near 1900ms, the word would have settled, been read for a full second, and *then* scrambled itself into hex. That is not an arrival; it is the ambient motion this rule exists to forbid, made worse by impersonating an entrance. The pass now reads the reveal's own animation clock: **it joins the arrival if the reveal is still running, and is skipped entirely if the reveal has finished.** A wall-clock threshold was rejected — it would need a constant nobody could derive and would drift the moment `--dur-reveal` or the stagger changed.

**The general rule this leaves behind, for any entrance added later:** if a settle plays unconditionally, it belongs in the stylesheet. JavaScript is for entrances that answer something — a scroll position, a pointer, a route change. Gating unconditional motion on hydration does not make the page calmer; it makes it *absent*, and then moves everything at once when the reader has stopped waiting.

## 5. Components

Components are restrained to a small canonical set: two buttons, a nav link, a divider, and a placeholder surface. New components must justify themselves against the No-Colour and No-Shadow rules before being added.

### Buttons — The Flat Cipher Slab

Buttons are **sharp-cornered, shadowless slabs**. Their affordance comes from decisive fill contrast, a 1px border, and one brief mono texture on hover/focus. Sharpness is doctrinal — there are no rounded buttons anywhere on cashu.space.

- **Shape:** Sharp. `border-radius: 0`. Always. No pills, rounded corners, shadows, inner highlights, or glows.
- **Size parity:** Primary and secondary share the *same* padding (`12px 24px`) and the *same* font size (`0.8125rem`, weight 500). Hierarchy is conveyed by fill (Ink vs Paper), never by box. Site-wide there is one size; a button does not grow to claim importance over its neighbour.
- **The Hero-Scale Exception** (user-directed 2026-08-16): the homepage hero's paired CTAs run at `17px 34px` / `0.9375rem` (`26px` side padding under 480px). Under a headline reaching 9rem the base slab read as a footnote to it, and the layout could not fix that — the CTAs already had the whitespace and the isolation. **Size parity holds inside the exception:** both slabs grow together, so the box still says nothing about hierarchy and the fill still says everything. This is the page peak's scale, not a `--large` modifier: it is scoped to `.hero-spec__cta`, it does not travel to route H1s or the closing CTA, and a second surface wanting bigger buttons is a layout problem, not a licence.
- **Copy:** Button labels are **all caps**, set with `text-transform: uppercase` and `letter-spacing: 0.06em`. Sentence-cased button copy is forbidden.
- **No icons.** Buttons never carry icons — no SVG glyphs, no `→` arrow, no chevrons, no spinners-as-decoration. The label is the entire button. (A spinner *replacing* the label during an async action is acceptable when the time comes; that's not an icon, it's the label's loading state.)
- **Primary** (`.btn-primary`): Background Ink Soft (`#18181b`), text Paper (`#ffffff`), with a matching Ink border. Hover shifts the fill one neutral step.
- **Secondary** (`.btn-secondary`): Background Paper (`#ffffff`), text Ink Soft (`#18181b`), with a **Mist (`#71717a`) border**. Hover shifts to Band and strengthens the border to Ink.
- **On-ink variants** (`.btn-primary--on-ink`, `.btn-secondary--on-ink`): The primary uses Paper with a Hair border; the secondary uses Ink Soft with a **Mist (`#71717a`) border**. Both remain flat against the dark ground.

**The Legible-Rim Rule.** On a flat, shadowless system the 1px rim *is* the control — nothing else marks a secondary button as pressable. It therefore carries a real boundary, not a decorative one: Mist at rest, never Hair. Hair (`#e4e4e7`) measures 1.27:1 against Paper and Slate (`#3f3f46`) measures 2.01:1 against Ink, both under WCAG 2.2 SC 1.4.11's 3:1 for a control's identifying boundary; at those values "READ THE SPEC" read as a line of text with a ghost around it. Restraint is a tonal choice about *which* grey, never a licence to drop below the threshold that makes the control a control.

The rule is about rims, not about buttons, and binds every outlined control on the site. The press pager was the case that proved it: an `rgba(255,255,255,0.25)` rim composites to `#404040` on Ink — 2.03:1, the identical failure, on a control that isn't a `.btn-*`. It now carries Mist at rest and Fog on hover, the same two tones as `.btn-secondary--on-ink`. Any new outlined control inherits this before it inherits anything else.
- **Cipher pass:** Hover runs a 460ms left-to-right encrypt → decrypt pass over the visual label. The accessible label stays unchanged; the cipher resolves completely before the interaction settles. **Pointer only — never focus.** The pass blanks the real label (`color: transparent`) while it runs, so firing it on `focusin` made every CTA illegible for half a second at the exact moment a keyboard visitor was reading it to decide, with no way to opt out; a pointer user can simply move away. Focus is marked by the ring alone.
- **States:** Fill and border transition over `220ms` with `ease-out-quart`. Active compresses to `scale(0.985)` for immediate tactile feedback. Under `prefers-reduced-motion: reduce`, the cipher and scale are removed; only the fill and border change.
- **Focus:** A 2px outline at 4px offset (Ink on light sections, Paper on Ink sections). No glow, no ring colour shift.

#### What stays flat

Everything. The cipher pass is texture, not elevation; it does not license shadows elsewhere.

### Navigation — The Masthead

*Rebuilt 2026-08-16, on the user's direction, against a layout reference.* The bar is full-bleed, sticky, ink-ground, and **identical in every scroll state**. It is a masthead, not a floating control: it spans the viewport, it never condenses, and nothing about it animates its own size. From the plate to the right viewport edge it is **one uninterrupted ink run** — the ground is painted on the row, not on its cells, so no sub-pixel rounding between grid columns can open a hairline of page through it.

Three things across the row, left to right:

- **The plate.** A block hard against the left viewport edge — no page gutter — carrying the 24px pixel logo and the `Cashu` wordmark (GT-Standard 600 at `1.125rem`, `-0.02em`). It stretches the full row height, and it is the one place the bar breaks its ink. **It is the page punched through the bar:** `--nav-plate` is `--paper` and `--nav-plate-fg` is `--ink`. *It shipped for one afternoon as a fixed `#ffffff`/`#f4f4f5` pair and the user rejected it on sight ("it's always white now"): a slab of daylight stuck in a dark bar, rather than a hole cut in it. The fix was the indirection, and the indirection stays even though the site went light-only in 2026-08-17 and both sides now resolve to one value — the plate is white because the page is white, not because someone typed `#ffffff`. Don't collapse it back to a literal.* One token, two consumers — the plate and the hover wipe — and they stay on the same value, because a bright hover over a dark brand cell would be two different plates on one bar.
- **The lead.** Ink, and set well in from the plate (`clamp(18px, 4vw, 56px)`), the **UTC clock** — Geist Mono at `0.8125rem`, tabular figures, `HH:MM UTC`, 24-hour. Geist Mono and *not* Geist Pixel Square: the pixel face is reserved for protocol notation, and wall-clock time is technical metadata, not a protocol artefact. It updates on the minute, aligned to the boundary — **never per second.** A ticking seconds field in the chrome is the animated ticker §7 rules out. The server renders the slot empty (no server and client agree on a clock) and the client fades it up over `--dur-reveal`; the slot reserves `9ch` so the fill costs no layout shift. Hidden below `480px`, where the plate and the toggle need the width more than the masthead needs its timestamp.
- **The tail.** The same ink, running flush to the right viewport edge: the links, then the theme toggle and the GitHub mark.

**Two features of the layout reference shipped and were rejected on sight** (second pass, 2026-08-16). Both are deleted, and neither should come back:

- **The slot** (`--nav-slot`): an open grid column between the clock and the links where the page showed through. Intended as a window cut in one bar; it read as a **hole punched in it**, worst over the hero where a blank block sat in the middle of a full-bleed headline.
- **The dither edge** (`--nav-edge`): a two-row pixel checkerboard closing the bar's bottom across the full width. Intended as the bar fraying into the page; it read as **noise under it**.

The bar meets the page on a clean line instead, and the value step from `--nav-bg` to the page ground carries the separation unaided.

- **Links** (`site-nav__link`): GT-Standard 500 at `0.9375rem`, colour `--nav-fg-quiet` (white at 66%), `5px 10px` of padding, tight `clamp(2px, 0.5vw, 8px)` gaps — the hover plate is what separates one item from the next, and at wider gaps the plates read as four unrelated buttons instead of one strip being scrubbed.
- **The Wipe.** Hover (and `:focus-visible`) drives a Paper plate across the link left to right over `--dur-nav-wipe` (460ms) with `ease-out-quart`. The link renders the label **twice** — the base Paper-on-ink, and an `aria-hidden` copy ink-on-Paper clipped to zero width — so the travelling edge passes *through* the letterforms and each one flips as the edge reaches it. A single label cannot do this: its colour has to flip for the whole word at once, which leaves the uncovered half invisible for the length of the animation. `clip-path`, not `transform` — `scaleX` would squash the plate's own text. Slower than `--dur-base` on purpose: it is an edge travelling across a whole word, and at feedback speed it reads as a flicker rather than a slide. The overlay is a real element, not `content: attr(...)`, because VoiceOver announces generated content and a nav that reads every destination twice is worse than a nav with no hover effect. Removed under `prefers-reduced-motion`.
- **Focus on the plate is inset.** The brand sits in the viewport's top-left corner, so the sitewide ring's `+4px` offset would draw its top and left edges off-screen. `.site-nav__brand` overrides to `outline-offset: -3px`; the cell is wide enough to carry the ring inside itself, and `--edge` on the Paper plate reads at full strength.
- **Current route** holds the same plate down permanently. "You are here" is said in the bar's own vocabulary rather than in a second one invented for it. Route-level only — in-page anchors are never marked.
- **The right cluster is bare marks.** The theme toggle and the GitHub link are icon-only — no ground, no rim, an 18px glyph in `--nav-fg-quiet` on a 40px square target, the two sized in lockstep so they never read as two things, both washing to `--nav-wash` on hover. The 40px target sets `--nav-row` (56px) together with the row's 8px of padding, and `--nav-row` *is* `--nav-h`. The GitHub link carries no `.btn-*` class: it is not a button, and the Two-CTA Rule already says GitHub is not one of the two jobs. `aria-label` names it, and the cipher pass is out of scope for it by construction (that pass blanks `currentColor`, which erases a glyph instead of scrambling a label). **Don't restore a label, and don't put a rim on one mark and not the other.**
- **Mobile:** Links collapse below `lg` into the hamburger panel — a full-bleed sheet in the bar's own ink flush under the row, so an open menu is the bar getting taller rather than a sheet arriving over it. The plate, the clock and the theme toggle stay in the row. The panel closes on a full-width `View on GitHub` slab in `--nav-plate` — a dropped menu is a list of destinations, and a bare mark in a column of sentences would be the odd one out. It carries no `.btn-*` class either: the bar has its own two-value palette, and `.btn-primary` would drag the page's Ink/Paper pair onto an ink ground where the fill disappears.

**What this replaced, and what died with it.** From 2026-07-25 the bar followed the Onyx pattern — transparent at rest, condensing on scroll into a floating box with a glass ground, 20px blur, 12px radius, a `--glass-hair` rim and `--nav-shadow`. A full-bleed bar and a box that pulls in from the viewport edges are opposite gestures and cannot both be true, so the whole two-state apparatus is gone: the condense hysteresis, the settle-delayed `--nav-h` guard, `--nav-inset`, `--nav-condensed-max`, `--nav-shadow`, and the `--glass-*` ramp. **That box was the site's only sanctioned `box-shadow` and its only translucent surface. Both exceptions are now closed** — see §4. Any rule elsewhere in this document that still grants the navbar a licence is describing a surface that no longer exists; do not reintroduce glass, radius, or shadow on the strength of it.

### Prose Link

*Added 2026-08-16.* The site's one inline text link. Nearly every destination here is a `.btn-*` or a `nav-link`; this exists for the rare sentence that has to **cite a source rather than restate it** — the first case being the NUT compatibility table on the directory page, which `cashubtc/nuts` maintains and this site therefore does not copy.

- **Style:** Ink text, 1px underline in Mist at `0.2em` offset, strengthening to Ink on hover over `--dur-base`. No colour, no glyph, no arrow.
- **Why underlined and not coloured:** a blue link would open the palette the No-Colour Rule closes, and §6 rules out `Visit →` pseudo-links and arrow glyphs. The word carries the meaning and the line carries the affordance. Mist rather than Fog because the underline *is* the affordance: 4.8:1 on Paper against Fog's 2.3:1, which is the Legible-Rim Rule's reasoning applied to a text decoration.
- **Bounds:** body prose only. It is not a substitute for a button, and a paragraph that wants three of them is a list that has not been written yet.

### Divider

- **Style:** A single 1px line in Hair (`#e4e4e7`), inset to the page-x rhythm so it visually aligns with the content above and below. No vertical dividers.

### Status Tag — The Signal Square

Used in the wallet directory to mark a project's *maturity* ("Beta") as a
different class of fact from its *surface* ("iOS and Android").

- **Style:** A 7px `--signal-page` square, `8px`, then the word in Geist
  Mono at `0.75rem`, uppercase, tracked `0.06em`, in Ink. No fill, no
  border, no padding, no radius. It is `.protocol-part__mark`'s recipe
  applied to one word: the square is an inline-block `::before` sitting on
  the text baseline (lifted 1px, which centres it against the cap height),
  and the facts row is `align-items: baseline` so 12px tag and 13px facts
  sit on one line of type.
- **Why it looks like the column:** user-directed 2026-08-16, pointing at
  the protocol-parts property list. A maturity fact *is* a stated property,
  and the site already has one way of opening those.
- **What it replaced, and why that argument is closed.** Two earlier
  versions, both 2026-08-14. The first was a sharp hairline-outlined box in
  tracked uppercase, and it read as a generic SaaS status chip; the
  diagnosis was that the tell is **outline + caps + tracking**, not the
  corner radius. The fix at the time was a soft capsule — Chalk fill,
  `rounded.full`, GT-Standard sentence case — the *only* full radius the
  site ever licensed. That capsule is now deleted, and the original
  diagnosis is exactly why this version is safe: there is no container at
  all. Caps and tracking on a bulleted micro-label is a list item; a chip
  needs a box. With the capsule gone there is **no `border-radius` in the
  site's own voice at all** — `rounded.full` has no consumer, `rounded.card`
  survives only in the Placeholder Surface spec below, which is by
  definition never shipped — and the last grey plate goes with it.
- **Bounds:** `STATUS_FACTS` only (`src/app/wallets/page.tsx`). Descriptive
  facts stay in Geist Mono, Muted, with no mark and no container. The square
  distinguishes the maturity fact only for as long as it is the one fact
  that carries one — keep the set small, and don't give a second kind of
  fact a square instead of adding it here.

### The Hero Field

*Added 2026-08-16, on the user's direction, after aspensearch.com — then **rebuilt the same day, also user-directed, because the first version was a straight port of theirs**. `src/components/hero-field.tsx`, `src/lib/hero-field/`. Read the Set-Once Rule's first amendment (§4) first: the terms there are what make a ground admissible at all, and they are unchanged by the rebuild.*

The hero's ground: a frozen field of Geist Mono hex, and a wake the pointer stirs through it.

**What it replaced, and why that matters more than what it is.** The first build was an ordered Bayer dither with a mint-green fluid plume. That is the reference site's hero, ported down to its solver constants — and together with the masthead clock and the split band it made three borrowings from one source in a day. Both identifiable elements are gone: the halftone became type, and the wake became monochrome. **The gesture survives, the material does not.** That is the distinction to hold on to if anything else on this site is ever built from a reference.

- **The ground.** 4-octave Perlin fbm, domain-warped, baked once into a texture per viewport size — one texel per cell. It is not drawn; it decides *occupancy*: a cell whose noise clears the threshold carries a character, so the field clusters and thins organically instead of tiling. Set in `--ghost`.
- **Two alphabets, and the pointer picks which one you see.** *Added 2026-08-16, user-directed.* At rest every cell is a hex digit — entropy, which is what a Cashu secret is, set in the same face and from the same alphabet the cipher pass scrambles through (`src/lib/cipher.ts`). Inside the wake the same cell shows a **currency mark** instead: `₿` weighted at six slots in sixteen, then `$ € ¥ ₩ £ ₹ ₽ ¢ ₱ ₴`. Behind the wake it re-encrypts.
- **Why that substitution and not another.** A blinded token is money that looks like noise until something resolves it. The ciphertext *is* the money — the pointer only resolves which of the two you are looking at. `₿` dominates because Cashu is bitcoin-native and the field should say that before it says anything else; the others are there because a mint's `unit` is an open field in the NUTs, so a spread of denominations is true rather than decorative. **Never put words here** — copy nobody wrote, at a size nobody can read, is an assertion the ground has no business making. A hex digit and a currency mark are both notation, not prose.
- **Nothing cycles.** Each cell has one resting digit and one denomination, both pure hashes of its coordinates. Churning the money layer was tried and rejected: it reads as a slot machine, and it tells the wrong story, because the denomination is not being rolled, it is being *revealed*. It also keeps the resting frame bit-identical across the whole visit, since glyph choice depends on nothing but the cell.
- **Two of those marks do not exist in the face and are drawn, not typed.** Geist Mono's cmap was parsed with opentype.js against every currency codepoint in Unicode: `$ ¢ £ ¤ ¥ ₪ € ₱ ₴ ₹ ₽` are present, and **`₿` (U+20BF) and `₩` (U+20A9) are `.notdef`** — as are ₣ ₤ ₦ ₨ ₫ ₭ ₮ ₲ ₵ ₸ ₺ ₾. `fillText("₿")` does not fail loudly: it falls through to `ui-monospace, monospace` and draws whatever the OS has, so the mark would be a different letterform per platform and tofu on older ones. Both are synthesised from the face's own letterforms — `B` plus four short rules **clear of the letter** (a rule drawn through it at this size closes its counters), `W` crossed by two. This is the third time this repo has had to draw a `₿`; the geometry is carried from the deleted `src/lib/orb/btc-glyph.ts`. **Don't trust `document.fonts.check` here** — next/font emits no `unicode-range`, so it reports loadedness, not coverage.
- **The wake is shape only.** The Navier–Stokes solver is unchanged and still gives it its curl and settle — that was the thing worth keeping from the reference — but what it modulates is which alphabet a cell draws from and how hard it is set: `--body` inside, `--ghost` outside.
- **`--body`, not `--ink`.** A clear resolve, but still a step below the value the headline is set in, so the wake can never out-set the page peak.
- **Monochrome, on purpose.** The plume used to be `--signal-page`. It is not any more — see §2's hero episode for what that cost and what it taught.
- **Occupancy multiplies density, not alpha.** Every falloff — the type mask, the edge fade — scales the value *before* the occupancy threshold, so characters drop out; fading type with alpha greys the letterforms and the field turns into a smudge. Same lesson the deleted ASCII field taught about a partial mix.
- **The type is cleared, and the mask fits the ink, not the box.** A box SDF around the union of `.hero-spec__content`'s **children** — the block itself is a full-width flex column, and fitting the mask to it cleared nearly the whole hero and left the field as two slivers in the margins. The ground fades out a long way from the type (120px feather), the wake runs right up to the letters (26px), because one that stops short reads as broken. *Measured: zero field pixels inside the headline's box while sweeping straight through it.*
- **The section's edges are cleared too, and this is not optional.** A box SDF puts its highest values *furthest* from the box — the top and bottom of the canvas — so the field's densest band landed under the masthead and its second washed across the closing hairline. Measured on the dither version: **23.7%** under the bar against 0.6–2.6% mid-field, which is the retired `--nav-edge` strip reinstated by accident twelve hours after it was rejected by name. A 150px top and 96px bottom fade takes it to **1.1%**.
- **Quiet on purpose, and the density must be measured at more than one viewport.** The field was called too busy twice. The first fix was a threshold change and it barely registered, because the real fault was structural: **the same build measured 10.4% of cells occupied at 1440×900 and 35.4% at 1920×1200.** The safe box tracks the type, the type is width-capped and fixed in height, so a larger window does not enlarge the cleared zone — it just adds uncleared field around it. Tuning against one viewport was measuring the wrong thing. Three levers carry the density and all three are needed:
  - **`SAFE_FEATHER` is a fraction of the box-edge-to-canvas-edge gap, not a pixel distance.** This is what makes the falloff scale-invariant. Do not turn it back into pixels.
  - **`MIN_SAFE_FRAC_X` / `MIN_SAFE_FRAC_Y` floor the cleared zone at a fraction of the canvas.** Normalising the falloff alone does not close the gap, because it is an *area* problem: the cleared zone was 52% of the hero at 1440 and 33% at 1920. The floors hold it near 58% on both — and they are also the better composition, since a large screen should give the title block more air rather than the same air with more field around it.
  - **`OCCUPANCY`** is the threshold a cell's noise must clear to carry a character at all. Higher is sparser.
  
  Shipped values measure **8.4% of cells at 1440×900 and 11.3% at 1920×1200** — a 1.35× spread across viewports, down from 3.5×. **Re-measure both when touching any of them.**
- **`WAKE_OCCUPANCY_GAIN` must stay below `OCCUPANCY`.** It shipped at 0.55 against a 0.10 threshold, which meant *every* cell the wake touched cleared the threshold — the disturbance rendered as a solid rectangle of characters pasted over the ground rather than as the field thickening. At 0.10 against 0.40 the wake raises local density and the field's own clustering still shows through it.
- **Equally quiet in both schemes.** The gain is calibrated against the light pairing — `--ghost` `#d4d4d8` on `#ffffff`, a 1.478:1 step. `--ghost` does *not* hold that step: at night it is `#3f3f46` on `#0a0a0b`, **1.894:1**. `gainFor()` trades occupancy against the step the scheme gives. **The correction is square-rooted, and that damping is empirical**: gain scales the noise, but what matters is how many cells clear the threshold, and that is not linear — the further into the distribution's tail the threshold sits, the more coverage a given gain removes. Undamped, dark landed at 49% of light's coverage and read as empty; damped it sits near 63%. The exponent is calibrated against a threshold, not derived from one, so **if `OCCUPANCY` moves materially, look at both schemes rather than trusting it**.
- **Real device pixel ratio, capped at 2.** The dither was pinned to dpr 1 and needed `image-rendering: pixelated` to survive the compositor's upscale. Letterforms are the opposite case: they want the device's own resolution and smooth sampling, so the canvas takes it and the pixelated hack is gone.
- **Nothing renders before `fonts.ready`.** The atlas is cut through a 2D canvas, and `ctx.font` falls back silently — a miss ships the field in the system monospace, on a site with a three-typeface rule, in a way that still looks fine and so survives review.
- **Two tiers.** The ground is a still image, so it mounts for everyone with WebGL2 — reduced-motion and touch included. The wake needs a pointer that can cause it, so the solver is built only where one exists; without it, no listeners and no rAF. See §4.
- **~13KB gzipped, no dependencies.** The reference drives this through Three + `@react-three/fiber` + `@react-three/postprocessing`, ~1.1MB minified. **Don't add one.**
- **Bounds:** the hero, and only the hero. Not a section background, not a card texture, not a page-wide grain. A second instance is a new decision.

### Placeholder Surface

- **Style:** Background Chalk (`#f4f4f5`), text Fog (`#a1a1aa`), rounded `16px`, centred caption.
- **Use:** Temporary surface for an asset the design awaits (hero image, mint screenshot). Replace with the real asset — never ship Chalk surfaces as final.

### Signature: The Pixel Notation

When the protocol's own quantities or identifiers appear in body copy — sats amounts, mint pubkeys, version strings — they are set in Geist Pixel Square at body size, kerned slightly looser (`letter-spacing: 0.04em`). This is the only typographic flourish in the system, and it earns its place by carrying semantic meaning: pixel type marks *machine* data inside *human* prose.

### Signature: The Twilight Stack

The page-closing CTA and the site footer share one continuous treatment so the bottom of every page reads as a single twilight band, not two stacked sections. The pattern: an Ink (`#000000`) section, with two stacked overlays.

- **Monochrome bloom.** A radial gradient anchored at `50% 110%` (just below the lower edge), stepping outward through the grey ramp: Fog → Mist → Slate → Ink Soft → Ink (`#a1a1aa` at 0%, `#71717a` at 18%, `#3f3f46` at 34%, `#18181b` at 58%, `#000000` at 80%). All stops live within the existing palette — the No-Colour Rule holds. The bloom is monochrome dawn, not a chromatic glow.
- **Paper grain.** An SVG `feTurbulence` fractal-noise overlay at `opacity: 0.04`, `mix-blend-mode: overlay`. The grain is below the threshold of conscious perception; its only job is to push the printed-RFC register on dark surfaces, where flat black would otherwise read as digital.
- **Constraints.** This treatment is reserved for closing-CTA + footer surfaces. It is not a card pattern, not a hero treatment, and never appears on Paper. The bloom origin (`50% 110%`) is fixed so the closing-CTA and footer align as one light source — moving it breaks the stack.
- **Text over the bloom is checked against the bloom, never against the section.** The band declares `background-color: #000000` and paints the gradient in a `::before`, so every contrast tool — and every eye reading the stylesheet — sees a text colour on black and passes it. The ground under the lower third is not black. Fog (`#a1a1aa`) is the bloom's own first stop, so the disclaimer set in Fog was the same value as the light it sat in: 4.36:1 on a wide screen and **2.63:1 on a phone**, where the footer is shorter and the paragraph wraps to six lines that run into the anchor. The disclaimer is Hair (`#e4e4e7`, 5.32:1 at the same worst point). Anything else placed below the metastrip inherits this problem: sample the rendered gradient at the element's own position, at the *narrowest* viewport, before choosing a tone.

The Twilight Stack is the system's one allowed atmospheric flourish, and is permitted only because it (a) stays inside the grey ramp and (b) serves a structural purpose: signalling the end of the page.

### Signature: The Split Spec Sheet

*Added 2026-08-16, on the user's direction, after a reference layout. It replaced three sections at once — the four-parts feature scroller, the tap-to-pay video band, and the properties bento — and retired the Demo Panel signature that used to live here (see the note at the end of this entry).*

The homepage's middle is one full-bleed band split in two. Left: a sticky Paper column, viewport-tall, carrying the section's whole argument — a Panel Display headline holding the top and a single paragraph sitting on the floor, nothing between them. Right: the always-dark `--panel` column, scrolling four numbered entries past it. Rules of the pattern:

- **Full-bleed, and it has to be.** This band does not sit in the page shell, which is the one place on the site that break is licensed outside the hero. The three-column entry row needs the width: capped at `--page-max` the description column lands under 250px and roughly 28 characters a line, and the layout stops being the layout. The cost is that the left headline does not align with the shell-capped sections above and below it, which is paid by a surface that already reads as its own object. Do not "align" it back without re-deriving the row.
- **The split is 40/60, not even.** The reference is 50/50 and can afford to be at the width it was drawn at. At 1440 an even split breaks the entry row's two content columns first. The left column loses width it was not using: its headline is three short lines and its paragraph is capped at measure either way.
- **The entry row degrades in three tiers, and the tiers are the design.** Below 1024 everything stacks in document order. From 1024 the hanging index appears and the plate and property list pair up beneath, but the title and description still stack across the full entry width. From 1440 the reference arrangement: index in the gutter, title and description side by side on row one, plate and list on row two. The middle tier exists because a third column at 1280 puts prose under 250px; it is not a fallback, it is where most laptops read this section.
- **The dark column is `#343438`, not a near-black.** *(Corrected 2026-08-16.)* It shipped at `#131316`, which measures **1.06:1** against `--paper` (`#0a0a0b`): in light the band is a black column against a white one at 21:1 and reads instantly, and at night it was one dark page with a hairline down it. The band's whole identity is a 40/60 split, and the split was invisible in half the scheme space. `#343438` gives **1.60:1** against the page with the column's body text still at 9.66:1 — the highest value that still reads as an always-dark surface rather than a grey card. *A note on the arithmetic: an earlier fix lifted `--panel-hair` to Slate on the reasoning that "no value in this range beats ~1.4:1, so the 1px line IS the boundary." That was true of the range being searched and false of the range available — the ground step was recoverable, and the rim is now a keyline rather than the whole boundary.*

- **Entries separate from each other, never from the band.** A 1px `--panel-rule` line between consecutive entries, none above the first or below the last. Hair is a Paper-ground value and vanishes on ink; `--panel-hair` is `#000` in light for exactly the reason that makes it useless as an interior line. This is the Hairline Rule expressed in the only value that survives an ink ground.
- **The plate is a figure, not a spinner.** Each entry carries a `thinking-orbs` canvas at `clamp(190px, 20vw, 320px)`, bracketed by four corner registration marks it deliberately overruns. The brackets are load-bearing: without a frame the animation reads as what the library built it to be, and four loading spinners down a column say the page is still working. Corners rather than a full box — `shaping` spends a third of its cycle as a dotted square, and a rectangular frame at the same inset read as one doubled box instead of a figure inside a crop. See the Honest-Network Rule in §4 for why an agent-status animation is admissible here at all, and `orb-figure.tsx` for why the plate drives the library's engine directly instead of using its component.
- **The property list is the bento, folded in.** Four uppercase Mono items an entry, each opened by a 7px `--signal` square (§2, the Signal-Green Exception). The four properties the deleted bento stated as cards — open source, bearer token, unlinkable payments, ecash for the web — are distributed across the entries they actually belong to, so each one is read at the point where the reader is already looking at the thing it is a property of. The list bottom-aligns to the plate: it is the entry's floor.
- **Honest content.** Unchanged from the pattern this replaced, and it is the part worth carrying forward. Every property in a list is true of the part it sits under, and nothing in the column is written to fill a slot. If an entry has three real properties, it gets three.

*On the Demo Panel (Figure/Code), retired here.* The four-parts section used to demonstrate the protocol twice over — a captioned spec plate and the code behind it, on a shared frozen ASCII sheet, flipped by a square segmented control. It was a good pattern and it is gone with the section that held it, along with `protocol-demo.tsx`, `protocol-demo-content.tsx`, the `.fig`/`.fig-plate`/`.fig-caption` rules, and the `--fig-*` keyline tokens, which now have no consumer. Two things it established outlive it and still bind: **all depth comes from value steps, keylines, and masks — never blur, translucency, or shadow** (the navbar was the one glass surface this clause carved out, and it is gone as of 2026-08-16, so the clause now holds without remainder); and **the Twilight Stack stays footer-reserved** — no bloom-to-black and no grain on the `--panel` column, which is flat ink and nothing else.

### Signature: The Reference Implementations Band

The section that ends the homepage argument: a headline and lead, then a floating Card of featured repos overlapping the upper-left corner of a Spec pane showing real NUT-00 CBOR. The whole composition is **one value contrast** — a bright plate over a dark listing — and the rules follow from protecting it.

- **The ground is Paper** (user-directed 2026-08-16). It was `bg-black text-white`, and a whole section stuck dark while the page around it changed read as a bug rather than a decision. It is `--paper`/`--ink` now: a document page with a code plate set into it, closer to the published-RFC north star than the showcase band ever was. The CTA moved from `btn-secondary--on-ink` to plain `btn-secondary` with it, and the lead from a zinc literal to `--muted`.
- **The Spec pane does not follow it.** It stays `#18181b` with a `#27272a` filename strip — a fixed-value surface, not a scheme. A code listing reading dark is a convention, not a theme bug, and it is the value the Card floats against: flip the pane and the composition has nothing left to stand on. Its greys are literals and clear AA on their own — zinc-300 path, zinc-400 meta and comments, zinc-100 body, four ranks (zinc-500 measured 3.08:1 on the strip and misses AA at 14px).
- **The Card is always light** — the mirror of the site's always-dark surfaces, and the reason its greys are literals too. A card that followed the scheme would go dark-on-dark in dark mode and the overlap would vanish. It carries a `--hair` rim: since the ground started flipping, only the Card's overlapping third sits on the dark pane and the other two thirds were white on white with nothing to hold their edge. `--hair` draws that rim on Paper and disappears into the dark ground, so one declaration covers both.
- **Focus inside the Card is a literal Ink Soft** (`.impl-card .focus-ring`). This existed because the sitewide ring paints `--edge`, which was `#ffffff` in dark — a white outline on a white card, i.e. no indicator at all. With the site light-only `--edge` is Ink and the override is belt-and-braces rather than load-bearing; it is kept because it states the Card's own intent, and because a focus indicator is the wrong place to trim a redundancy.
- **Language marks keep their brand colour** — the Depicted-World Exception (§2). Readers need to see real Python, real Rust, real TypeScript at a glance. Do not re-monochrome them without reopening that decision.
- **The counts are derived, never typed.** `Six` in the headline and `+ 3 more` in the Card share one denominator (`REPOS` minus the two catalogue entries), so the section whose whole argument is that we count honestly cannot fail its own arithmetic.

## 6. Do's and Don'ts

### Do

- **Do** carry the No-Colour Rule. Greys may shift by lightness, never by hue.
- **Do** set the hero headline in Display (GT-Standard 600, ≥3.75rem, line-height 0.95). The headline earns the page.
- **Do** keep body copy at 65–75ch max width. Long reads are an editorial feature, not an accident.
- **Do** let the footer disclaimer span the complete footer grid. It is the deliberate exception to the prose measure, closing the composition on the same edges as the rows above.
- **Do** use Geist Pixel Square only for protocol notation (amounts, ids, version strings). It is signal, not style.
- **Do** name implementations by name. Cashu is a directory; wallets and mints appear as plain wordmarks, no logos required at first pass.
- **Do** treat 1px Hair lines as the only structural divider. Sections separate by space first, hairline second.

### Don't

- **Don't** introduce chromatic accent in the site's own voice. Generic crypto landing pages are the anti-reference — neon gradients on black, gradient text, animated 3D coins. Never on cashu.space. Colour appears in exactly two places, both named in §2: third-party marks, under the Depicted-World Exception; and the signal green, under the Signal-Green Exception, on two named consumers — the protocol-parts property squares and the wallet-directory status tag. That is a list of licensed consumers, not a palette slot: don't reach for it in a third place, don't reach for it as a fill, a glow, a gradient or a state, and above all don't reach for it at scale — it was briefly given the hero and taken back the same day (§2).
- **Don't** add Web3 / DeFi tropes: pastel gradients, blob shapes, decorative network animations that misrepresent how the protocol works (e.g. mints "talking" to mints, which Cashu doesn't do). Motion is permitted only under the Honest-Network Rule — see §4.
- **Don't** dress up privacy. No locks, no shields, no padlocks, no ALL-CAPS "YOUR DATA, SECURED™" copy. Privacy is a property of the protocol, stated plainly.
- **Don't** use `box-shadow` anywhere. No drop shadow, inner shadow, coloured glow, or button exception.
- **Don't** use `border-left` / `border-right` >1px as a coloured stripe on cards or callouts. Side-stripes are forbidden in impeccable's universal bans and doubly forbidden here.
- **Don't** use `background-clip: text` with a gradient (gradient text). One solid colour, emphasis by weight or size.
- **Don't** introduce a third typeface. Three families exist (GT-Standard, Geist Mono, Geist Pixel Square) and each has one job.
- **Don't** use Geist Pixel Square as a section eyebrow, RFC-style metadata label, or link affordance. The pixel face marks protocol artefacts inside prose; everywhere else it reads as decoration. Section eyebrows in general are out — sections separate by space and headline, not by labelled introductions.
- **Don't** centre body copy. Long-form reading sets flush left, ragged right.
- **Don't** use stock photography of smiling teams, abstract blockchain visuals, or any hero treatment that could appear unchanged on a fintech site.
- **Don't** ship Chalk placeholder surfaces in final layouts. They are scaffolding only.
