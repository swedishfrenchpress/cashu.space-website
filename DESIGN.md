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

Motion is permitted under one condition: it must depict real protocol structure, or be plain material carrying no assertion at all. ~~**The hero has no ground at all**, and that is the strongest statement the system makes about its own motion.~~ **Corrected 2026-08-20** — this sentence went stale within hours of being written and stayed stale for four days. The hero's ground was deleted on 2026-08-16 and a new one, `hero-field.tsx`, shipped **the same day** (§5, The Hero Field); since 2026-08-20 it holds the right column of a split hero. What the sentence was reaching for survives intact and is stated properly by the Set-Once Rule in §4: the hero has no **figure**, and every ground it is allowed is frozen, caused, and asserts nothing. It carried a full-bleed figure for three months — a live ASCII field, then a wide dot figure driven from `thinking-orbs`' `listening` mode — and the dot figure was deleted **2026-08-16, on the user's direction, for reading as generic, corny and cheap**. The verdict was correct on the system's own terms: a pulsing dotted spheroid is a **blob shape**, which is PRODUCT.md's second anti-reference verbatim; it came out of a library built to show an AI assistant thinking, on a site that draws everything else itself; and it cleared the rule above only on the *second* branch, asserting nothing because it depicted nothing. A decorative loop with a compliance note attached is still a decorative loop.

What replaced it is the **arrival, and nothing else** — see the Set-Once Rule in §4. The closing hairline draws across the fold, the headline is uncovered one glyph at a time (`.hero-glyph`, since 2026-08-20; the fourth amendment in §4), the copy settles on the existing staged reveal, and by ~1.1s the page is completely still and stays that way. *(That word resolved out of hex until 2026-08-19, when the user cut the cipher pass as corny and too on the nose; see the Set-Once Rule's third amendment in §4.)* That puts the hero inside the vocabulary the rest of the site already speaks: the masthead's clip-path wipe, the button cipher pass, the reveal settles — all one-shot, all typographic, all *caused*. The looping figure was the only thing on the page that moved without a cause. See `.hero-glyph` and `hero-rule-draw` in `globals.css`.

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

**The Signal-Green Exception.** *Added 2026-08-16, on the user's direction, overriding the No-Colour Rule for exactly one mark, and widened the same day to a second consumer of it. Briefly widened a third time, to the hero's pointer plume, and **narrowed back within hours when the hero went monochrome**. Narrowed again 2026-08-18, on the user's direction, when the protocol-parts property lists were cut: **the exception is back to one consumer, one token, one value.*** `--signal-page` (`#1b9d55`) fills one shape in one place and nothing else: the 7px square that opens the **stated property** on the wallet-directory status tag (§5, Status Tag).

The scope is the whole of the rule, and it is narrow on purpose:

- **One shape, one consumer.** `.wallet-row__fact--tag::before` — a 7px square opening a line of tracked uppercase Mono. Not type, not a border, not a background, not a link, not a focus ring, not a state (there is no green "success" and no red anything), **not a hover**, not a fill, not a gradient, not a glow, not a dot or a bar or a ring.
- **The green never appears at scale.** Its largest instance on the site is 7 pixels square. That is not an accident of where it happens to be used — it is the reason a single saturated value is admissible on a monochrome page at all, and the hero episode below is what established it.
- **One ground, therefore one value.** `--signal-page` is `#1b9d55` on Paper (**3.50:1**). There was a second token — `--signal`, `#6fe3a4`, the mint picked against the always-dark `--panel` column — and it was deleted with its consumer on 2026-08-18 rather than left in `:root` unused, because an unused chromatic token in a monochrome system is how a bounded exception widens by accident. **The two values were never interchangeable and that is why the `-page` suffix stays**: `#6fe3a4` measures **1.59:1** on Paper and all but disappears. If a fixed dark ground ever needs this square again, measure a value against *that* ground; do not reach back for the mint because it used to exist.
- **Decorative, always.** The square is `::before` content with no accessible name, so it carries no information a screen reader or a monochrome display would lose. **Never make it the sole carrier of a meaning.** The word "Beta" states the fact and the square only marks it as a different *class* of fact; strip the colour and the row still reads.
- **Sharp and flat.** `border-radius: 0`, no shadow, no glow, no gradient, no soft alpha. The Flat Cipher Slab logic applies to a 7px square as much as to a button.

If a future surface wants this green, the answer is still no: the exception is a scoped licence, not a newly opened palette slot. Widening it is a user decision, the same way opening it was — and note the direction of travel. The exception has been widened three times and narrowed three times, and it now sits on a smaller surface than the day it opened: **one square, on one row, on one page.**

**The hero episode, recorded because it is the rule's best evidence.** *2026-08-16.* The exception was widened a third time, to a mint plume the pointer threw through the hero's dither field, and **narrowed back the same day on the user's direction** — the hero is monochrome and the green never returned to it. Two things were learned and both are now load-bearing above:

1. **Scale is the whole exception.** At 7px the green is a mark. At hero scale it was the largest chromatic event on a monochrome page, carrying no information, and it read as exactly the pastel/Web3 register PRODUCT.md's anti-references rule out — the least ownable hue in the crypto-adjacent space for a protocol that has deliberately refused Bitcoin's own orange. The clause "the green never appears at scale" is that finding, generalised.
2. **The colour was borrowed, and colour is the most legible thing to borrow.** The mint came from aspensearch.com (`#a1ffcb`), the same source as the masthead clock and the split band. A borrowed 7px square is a detail; a borrowed full-bleed accent is the other site's signature on your page. **If the green is ever proposed for a second consumer again, weigh that first, and weigh it by area.**

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

**Where the files live.** `assets/fonts/` holds the licensed masters — the full 12-face GT-Standard trial family and the complete pixel face — and is never served. `src/fonts/` holds the generated subsets, which are the only fonts a browser receives, since `next/font/local` copies them into `_next/static/media/` with a content hash. Both used to sit in `public/fonts/`, which served all 13 masters at stable URLs nothing linked to and served each subset a second time; a face put back under `public/` reintroduces that.

Re-run `scripts/subset-fonts.mjs` when `geist` is updated, when a trial face is replaced, or when the rendered character set changes.

**The homepage hero is set in caps — headline and deck both.** *(User-directed 2026-08-15; recorded here 2026-08-16, having lived until then only in a comment in `globals.css`, which is how a treatment on the site's largest type went two days undocumented.)* It is applied as `text-transform`, never as retyped markup, so the source string stays sentence case for screen readers, for search, and for the cipher pass that reads the label. This is the hero and only the hero: section headlines, entry titles, body and leads elsewhere all stay sentence case. Button labels are separately and independently caps (§5), which is a component rule, not this one.

### Hierarchy

- **Display** (weight 600, `clamp(3.75rem, 9vw, 9rem)`, line-height 0.95, letter-spacing −0.02em): Short page-peak copy — the closing-CTA slogan, the H1 on dedicated routes (`/wallets`, future `/docs`, `/blog`). Sized to be monumental. The line break in Display copy is part of the composition, not an accident of viewport. The homepage hero runs at this scale too — see below.
- **Homepage Display** — *retired 2026-08-14, on the user's direction.* This was a bespoke `clamp(3.75rem, 7vw, 6.5rem)` step for the homepage H1, on the reasoning that longer descriptive hero prose should sit below route Display "so it can share the full content grid without shouting." The reasoning was deliberate and it was wrong in practice: the step pinned at 6.5rem past ~1486px and fell to 5.6rem at 1280px, so the homepage hero — the page peak — rendered **29% smaller than the `/wallets` route H1 at 1440px and 38% smaller at 1920px**. A secondary route out-shouted the front door, and the hero read flat for exactly that reason. The hero now uses Display unmodified. Measured across 360–2560px: no horizontal overflow, and the section still resolves on the fold at every size. Do not reintroduce a homepage-only display step; if the hero copy grows too long for Display, shorten the copy.

  The three-line break this note originally recorded past 1600px was a second, separate fault — the page shell, not the type scale — and the shell escape in §4 was the right half of the fix.

  *Corrected 2026-08-16.* This note used to end "The headline now breaks in two at every width from 768px up." **That was never true and it cannot be made true.** Measured at the top of the Display clamp (144px) against the escape's own 1440px cap: `OPEN SOURCE ECASH` sets 1513px and `ECASH FOR BITCOIN.` sets 1446px, so **both halves of both possible two-line splits overflow**, the shorter of them by 6px. The escape fixed the shell cap and the sentence still needs three lines. Raising the cap does not rescue it either: at 1600 the viewport binds before the cap does (1440px of box at 144px of type) and the near miss stays a miss.

  Two levers could deliver two lines and both are closed. Shrinking the type reintroduces the bespoke homepage Display step retired above on 2026-08-14, for the documented reason that it let a secondary route out-shout the front door. Shortening the copy is a user decision, and it is the one this section already recommends: *"if the hero copy grows too long for Display, shorten the copy."*

  **So three lines is the composition, and it is authored rather than wrapped.** `text-wrap: balance` was picking the break, and because balance equalises line *lengths* it stranded the preposition — `OPEN SOURCE / ECASH FOR / BITCOIN.` The rag is now set in the markup as three `.hero-spec__line` spans, long / short / medium, with **`ecash` alone on the short line**. *(That line used to be the only part of the headline that moved — `hero-cipher.tsx` resolved it out of hex until 2026-08-19, then `.hero-wipe` uncovered it until 2026-08-20. The whole headline is uncovered now, glyph by glyph, so the short line is a composition decision on its own terms rather than a place to put the motion; see the Set-Once Rule's third and fourth amendments.)* Blocks from 640px up, where every line clears its box at every step of the clamp; inline below, where `OPEN SOURCE` alone sets 418px against a 390px phone's 342px of box and a forced break would only wrap again. Measured 320–2560: three lines from 640 up, four at 390, five at 360 and below, no horizontal overflow anywhere.

  *Updated 2026-08-20 with the split hero, and the rag survived it unchanged.* Three lines at 1024/1280/1440/1600/1920/2560, no overflow anywhere, and `ecash` stays alone on the short line. It reads **better** left-aligned than it did centred: a `clip-path` wipe that runs left to right now starts on the column's own edge rather than from a point inside a centred line, so the gesture and the alignment agree.

  **The authored rag is also what makes the per-line optical correction possible.** Because the line breaks are a markup fact rather than a wrapping outcome, so is the glyph that opens each line — which is what lets the two flat-cap lines carry a different side-bearing correction from the round-cap one. See the Centred-Hero Exception's retirement in §4.

  **The headline's width is now the type's own measure, and this is the third value that property has had.** It was the viewport (capped 1440px), then the page shell (1088px), and it is now `min(7em, calc(100vw - 2 * var(--page-x)))`. `OPEN SOURCE` sets 1003px at 144px, which is 6.97em, and `font-size` is `clamp(3.75rem, 9vw, 9rem)` — so a width in **em tracks the clamp exactly**: the box is as wide as the longest line needs at every step and no wider. 7em rather than 6.97em because the measured figure is the ink and rounding down would put the box inside it.

  That is also the arithmetic that makes a split hero possible at all, and it is worth stating because it forecloses the obvious alternative. The column is 6.97/9ths of a vw-sized headline, i.e. ~63% of the viewport while the clamp is in its `9vw` regime. Inside the page shell there is no second column to have: the shell caps content at 1088px from 1600px up, so the field would get **200px at 1440 and 80px at 1920**. Shrinking the type is closed by name above, and shortening the copy does not rescue it either — `FOR BITCOIN.` alone sets 936px. **The hero is therefore full-bleed** (§5), and the viewport term in that `min()` is still the half that holds below 640px, where the spans go inline and 7em overflows a phone.
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

**The Focus-Pull Rule.** *Added 2026-08-19, on the user's direction, over a recorded objection. **Narrowed 2026-08-20, also on the user's direction: the hero no longer takes a focus pull at all** — the recorded objection below turned out to be the complaint, and it arrived from the user as "unelegant and sloppy". See the Set-Once Rule's fourth amendment. The rule still stands for the surfaces that keep it: the `/wallets` route header and the section groups.* **Type may arrive fractionally out of focus and resolve. Nothing may rest out of focus.** `filter: blur()` is admissible only as a property of an entrance — it starts with the settle, it clears before the settle finishes, and it is gone, not zeroed, when the element lands. Everywhere else on the site blur remains forbidden.

This is the first blur on cashu.space since the navbar's glass was deleted on 2026-08-16, and the distinction it turns on is worth stating precisely, because it is the only thing keeping the glass out. **What the no-blur clause forbids is blur as depth** — a standing translucent surface that claims to sit above another one. That claim requires two planes coexisting, and it requires persistence: the reader has to be able to look at it. A focus pull has neither. There is no second surface, there is no frame at which the page is layered, and by the time anyone can dwell on the element the filter is not applied at all. It is a verb, not a surface.

**The objection is recorded rather than resolved, because it is not a technical one.** A blur-in on display type is the most copied entrance on the web right now — it ships as a named component in more than one library — and this site's entire motion vocabulary is otherwise hard-edged and geometric: the masthead's `clip-path` wipe, the hairline's `clip-path` draw, `stroke-dashoffset` on draw-ons, glyph substitution in the cipher pass. Blur is the one gesture in the system that does not rhyme with the others, and it belongs by family to the glass this site spent a day removing. That was put to the user on 2026-08-19 with a geometric alternative (a per-line mask rise, using the `.hero-spec__line` blocks the headline already has) and the user chose the blur. It is doctrine now. **If it is ever reconsidered, the line mask is where to start, and the reason to reconsider is register, not performance — the performance question was measured and came back clean.**

***It was reconsidered on 2026-08-20, one day later, and the objection was right.*** The user's words were that the hero's text reveal was "unelegant and sloppy". The blur is off the hero and the entrance is geometric — one granularity *finer* than the declined line mask, a `clip-path` uncover per glyph (`.hero-glyph`; the fourth amendment below). Two details are worth keeping. The first is that the stylesheet had already conceded the point in a number: `--reveal-focus-span` existed at `0.55` **specifically** so the blur would clear before `.hero-wipe` finished its pass — one entrance cut short to stop it running a lens over the other, which is what two entrances on one element always costs. The second is that the objection was recorded in the first place, which is why settling it took an afternoon rather than an argument. **The remaining consumers were left alone deliberately**, including `/wallets`, which still runs `0.55` and therefore a focus pull that is very nearly invisible; raising that number would make a blur-in on a 9rem H1 *more* visible on the day it was called unelegant, so the open question there is whether that header should keep a focus pull at all, not what number it should run at.

**Measured, on the build that shipped it** (Slow 4G, 4× CPU, 390×844 at DPR 3, two runs each): LCP 612ms and 632ms with the focus pull, 636ms and 624ms without it, the LCP element `hero-spec__headline` in all four, CLS 0.00 throughout. A blur does not disqualify an LCP candidate the way `opacity: 0` does, so the 0.02 floor is still the thing carrying that, unchanged. Cost is not the argument against this.

**Four mechanical terms, all verified rather than asserted, and all documented at the rule's implementation in `globals.css`:** it ends on `filter: none` and never on `blur(0px)`, or the element keeps a compositor layer and grayscale antialiasing for the life of the page (measured after a full-page read pass: 0 of 28 entrance elements left holding a filter, an opacity, a transform, or a `will-change`); the blur clears at 55% of the settle, so the rise lands under an already-sharp word and the word wipe finishes on a sharp surface (it ends at 580ms against the blur's 461ms) *— both halves of that clause are history as of 2026-08-20: there is no word wipe and the hero takes no focus pull, and the number surviving on `/wallets` has no argument behind it any more, which is recorded at the token*; it is a modifier and never a default, because the masthead sits in a Reveal and a live canvas must not be wrapped in a filter; and radius is stated per consumer, because a radius is only meaningful against the type it softens — 18px was a hair of softness under a 9rem headline and would be an illegible smear under a 13px button label. *(The three hero radii — 18px, 9px, 4px — were deleted with the hero's focus pull rather than left standing unused, on the reasoning §2 uses for `--signal`.)*

**Reduced motion cancels it outright** (measured: 0 of 28 elements blurred or transparent at rest), as does dropping `html.js`.

**The Section-Gesture Rule.** *Added 2026-08-19, on the user's direction, alongside the focus pull and out of the same complaint.* **A section arrives as one gesture with internal order, not as a set of elements that happen to be adjacent.** Below the fold, one `RevealGroup` is observed per section — or per row, where a section is a list — and its `.reveal-item` descendants settle off that one class with an authored stagger. An element does not decide on its own when it has arrived.

The complaint was that the page did fade and the fade was not elegant, and the diagnosis was granularity rather than easing. `protocol-parts.tsx` ran eighteen IntersectionObservers, one per `<Reveal>`, each with its own threshold and its own idea of when its own element was in view; the homepage ran twenty-four. What that produces is not a section arriving, it is sixteen unrelated 8px twitches near each other. The homepage now runs seven observers and five client components where it ran twenty and ten.

**Granularity is the whole of the rule and it is a judgement, not a default.** One group per *section* is wrong for a long list: `protocol-parts` is four full-height entries, and a section-level trigger would reveal entry four while it is a screen and a half below the fold, so nobody would ever see it arrive. One group per *element* is what this replaced. The unit is whatever the layout already reads as a unit — the aside, the entry row, the band.

Two things travel with it. **The rise is 20px below the fold, against the arrival's 8px**: under editorial type at this scale 8px reads as a twitch rather than a settle, and transform-only movement contributes nothing to CLS, so the amplitude is free. **The stagger lives in `globals.css` as one table**, keyed on the class names the layout already has, rather than as `delay={}` props spread across four components — a section's internal rhythm is a composition decision and belongs where it can be read in one place.

**Arrival entrances stay `<Reveal immediate>` and this does not touch them.** They run from a CSS animation at parse time and never wait for React (the Set-Once Rule's second amendment); a group is by definition gated on an observer, which is gated on hydration. And `layout.tsx`'s 1.5s failsafe still probes for `.reveal.is-revealed`, which groups deliberately do not carry — they are among the things it rescues. Verified: the probe still finds four on the homepage, and dropping `html.js` leaves all 28 entrance elements visible with `transition-duration: 0s`, which is the cut the recovery has always required.

#### The Section-Gesture Rule, first amendment: it governs `/wallets` too

*2026-08-20. Not a change to the rule — the rule applied to the route it had skipped.*

**The directory was still twenty-one `<Reveal immediate>` wrappers and twenty-one observers**: four rails, four list wrappers, thirteen rows. It is the exact shape the rule was written against, left standing because the 2026-08-19 pass was scoped to the homepage.

**Two things were wrong with it, and the second is the one worth remembering.** The obvious fault is that `immediate` means a CSS animation from parse time, so every row on a long page — the `Tools` group at the bottom included — finished settling inside about a second, and a reader scrolling down arrived after the gesture was over. The less obvious fault is that **the authored stagger never rendered at all.** The rows carried `delay={280 + gi * 60 + i * 50}`, and `MAX_DELAY_MS` clamped it to 360ms, so rows three through six of Mobile arrived simultaneously and the `Tools` list tied with its own single row. The ladder had been written, committed and silently thrown away — which is the argument for the stagger table in the rule above stated as a defect rather than as a preference: **a delay expressed as a prop passes through a clamp it cannot see.**

**The first group stays an arrival, and that is the interesting half of the fix.** `Mobile wallets` has its rail above the fold at every viewport, and a `RevealGroup` is gated on an observer, therefore on hydration — making it a group would put the top of the route back behind React, which is precisely the regression `.reveal--arrival` was measured to fix. So it satisfies the rule's *other* half instead: it arrives as **two beats**, the rail and then the list as one block, rather than as the eight it used to be. Groups two through four are `RevealGroup`s, their rails and rows are `.reveal-item`s, and the stagger is in `globals.css` keyed on `.reveal-group .wallet-row:nth-child()`.

**Two details that are not obvious from the diff.** The `<ul>` is a plain grid child and deliberately *not* an item — a `.reveal-item` list wrapping `.reveal-item` rows would blur and translate every row twice; its top hairline is structure and holds the register open while the entries land in it. And the rows take `--reveal-blur-section: 4px` against the section default's 6px, on the token's own reasoning: 6px was picked against homepage body copy running several lines, and on a single line of 1.125rem wordmark and 13px mono facts the same radius is a smear rather than type resolving.

**Net: twenty-one client components and twenty-one observers to six and three.** Measured after: the ladder renders at 60/100/140/180/220/260ms, all three groups reveal as read arrivals rather than jumps, the failsafe still finds `.reveal.is-revealed` on all three routes, and dropping `html.js` leaves all fourteen entrance elements visible at `transition-duration: 0s`.

**One term of the reveal system was corrected on the way past.** `.reveal.is-revealed` ended on `transform: translateY(0)` and now ends on `transform: none`. Visually identical, interpolates identically from the 8px start, and it is the Focus-Pull Rule's first term applied to a third property: an entrance ends on the *absence* of what it animated, not on a neutral value of it. `translateY(0)` left every settled reveal holding a containing block and a compositing hint. `.reveal--fade` and `.reveal--instant` both already said `none`. *(The `.reveal--arrival.reveal--focus` elements still report an identity matrix, because their animation fills `both` and Chrome resolves a filling `transform: none` as a matrix. That fill is load-bearing — without it the element would appear, vanish, and reappear in the window between the animation ending and React adding `.is-revealed` — so it stays.)*

#### The Sheet Rule: the one overlay opens and closes

*2026-08-20, from the same `/impeccable animate` pass.*

**The `?` help sheet was the only state change on the site with no transition at all.** `keymap.tsx` called `showModal()` and `close()`, and the `<dialog>` and its `::backdrop` hard-cut in both directions — on a site where the mobile panel opens over `--dur-base`, the toast over `--dur-fast`, and a nav label wipes over `--dur-nav-wipe`.

**The material is the site's own and not a new idea.** The sheet is uncovered by a `clip-path` inset, which is what the masthead does under a hovered link, what `hero-rule-draw` does to the closing hairline and what `.hero-glyph` does to every character of the hero headline. The backdrop only fades: it is ground, and ground has no edge.

**It runs top to bottom while every other wipe runs left to right, and that is a decision.** Left to right is how this site uncovers a *word* — a nav label, `ecash`, a 1px rule — because that is the direction the thing is read in. This is a *panel*, and the site already has a gesture for a panel opening: the masthead's mobile sheet growing downward out of the bar. A sideways wipe across a six-row table would uncover it column by column, which is not the order anybody reads it in.

**The timings are the pair the site already uses for a panel** — 220ms on the sheet, 150ms on the wash, both `--ease-out-quart`, the same two `.site-nav-panel` runs. The exit takes the fast one in both properties: a transition takes the duration of the state it is going *to*, so the base rule governs the close and the `[open]` rule governs the open. 220ms in, 150ms out.

**`display` and `overlay` are transitioned with `allow-discrete`**, which is the whole reason there is an exit at all — without it `close()` drops the element out of the top layer on the same frame and only the opening would animate. `@starting-style` supplies the from-values for the open direction, since an element entering the top layer has no previous style to transition from.

**One cost, recorded rather than hidden.** The settled `[open]` state holds `clip-path: inset(0 0 0 0)` — a standing clipping context, which is the thing `.hero-glyph`'s `backwards`-not-`both` rule exists to avoid. It is bounded in a way that one was not: it lives only while the sheet is open, not for the life of the page, and `inset(…)` does not interpolate to `none`, so a wipe cannot end on the absence of itself. **If that trade is ever unwanted, the alternative is opacity plus an 8px translate, and it costs the rhyme.**

Under `prefers-reduced-motion` the wipe is cancelled and the fade is kept — substitute, don't kill, which is the pattern the button block sets. The discrete legs stay, or the exit stops existing again.

#### Reduced motion, feedback parity, and what the same pass deleted

*2026-08-20, the rest of the `/impeccable animate` findings, recorded because each one is a rule already in this document that a surface had escaped.*

**Three geometric motions were still running under `prefers-reduced-motion: reduce`**, in a system otherwise meticulous about it: the skip link's `translateY` slide, the hamburger bars' rotate-and-move, and the mobile panel's `grid-template-rows: 0fr → 1fr` height animation. All three are cancelled now, and all three **substitute rather than kill**, which is the pattern the button block set: the link appears in place and still takes its ring, the bars snap to the X, and the panel opens at its height with its 150ms opacity fade intact. Each cancel sits immediately after the rules it cancels — the ties are on source order, which is the trap already documented beside `.hero-spec::after`. Two JS counterparts went with them: the `g i` chord's `scrollIntoView` now makes the same check `in-the-press.tsx` already made before its pager scrolls, and `button-cipher.tsx` **live-tracks** the query instead of reading it once at mount, as `hero-field.tsx` and `orb-figure.tsx` both do.

**Motion was pointer-only in two places where the keyboard reaches the same control.** The press cards lifted their photograph and their wordmark on `:hover` and did nothing on `:focus-visible` — the card is a link to somebody else's site and the lift is most of what says so — and `.site-nav__link` already pairs the two, so the fix is the pairing it models. Separately, `.press-arrow` was the only real `<button>` on the site with no pressed state; it takes the `scale(0.985)` at 150ms the cipher slabs already use, so **no new value enters the system**. The hamburger deliberately does not get one: its icon already morphs to an X on activation, which is the same acknowledgement by other means.

**The Spec pane was a tab stop with no focus indicator**, falling through to the UA default — the one browser surface on that page still shipping somebody else's design. Its ring is white and **inset**, on the same reasoning as `.site-nav__brand` and the help sheet: the sitewide ring paints `--edge` at `+4px`, which would draw an Ink line on the Paper *around* a dark pane, partly under the Card that overlaps its corner, on an element that is already the widest thing on a phone.

**And the vocabulary was three curves and one gesture larger than the site.** Deleted: `@keyframes fadeIn` (no consumers), the whole `.draw-on` / `.draw-on--filled` system with its `html.js` gate and its reduced-motion clause (no consumers since the ASCII field and the demo panel went in 2026-08-16 — it took the stylesheet's only untokenized duration, a raw `480ms`, with it), and `--ease-out-quint` and `--ease-out-expo`, which never acquired a consumer at all. **The site runs on one curve and the tokens now say so.** *(Two, from later the same day: `--ease-out-sine` was added for `.hero-glyph` under the exact terms this paragraph sets — with the surface that needs it, and with the reason measured rather than felt. A staggered cascade's softness is the number of glyphs visibly mid-wash at once, and that is set by the curve's shape rather than its length: quart is ~70% resolved in its first fifth, so it collapses the band to 1.2 glyphs where sine holds 3.7. It has one consumer and goes when that consumer goes.)* `--dur-draw-on` survives on its remaining consumer, the hero's closing hairline. The deletions follow §2's reasoning for `--signal` rather than §5's for `.prose-link`: a monochrome text style with no consumer is kept because the alternative to having it on hand is the blue link it exists to prevent, and a curve has no wrong version to prevent — the next surface that needs a softer landing should add it with an argument.

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

*Amended 2026-08-20, on the user's direction. **The fifth amendment, and the second that changes the rule's substance.*** The fourth amendment settled the hero's lower half by emptying it. The split hero re-opens the horizontal axis instead: the type holds a left column and the cipher field holds the right, bleeding off the right edge of the viewport.

**What survives untouched, and it is most of the rule.** The hero still fills `min(100svh - var(--nav-h), var(--hero-max))`. Past the cap the next section still peeks in. The closing hairline is still the horizon and still draws across the fold. The title block is still optically centred against the section's asymmetric, height-aware padding — re-decided rather than inherited, per the Centred-Hero Exception's own requirement, and measured identical at 1440×900 (140px above, 176px below).

**What changes is that "nothing between them" is no longer literally true.** There is now something in the hero's right half for the whole of its height. The distinction the rule needs, and it is the same one the Honest-Network Rule turns on: the field is a **ground**, not a figure. It does not compete with the title block for the fold, it does not sit under it, and it has no top or bottom of its own — it dies into the section's edges exactly as it did when it was full-bleed behind the type. The rule was written against **pooled emptiness** in the hero's lower half, and the split does not create any; it fills the surplus on the axis where the surplus actually was.

**Re-measured at eight viewport heights**, because the fourth amendment's standing instruction is to do exactly that and it was broken once by ignoring it. The paired CTAs clear the fold at 1280×600, 1366×665, 1440×700, 1440×790, 1440×900, 1512×780, 1920×900 and 1920×1080 — all eight, unchanged, because the split moves nothing vertically. **1280×600 clears by 2px** and is the binding case; anything that adds height to the title block will slice the CTA row there first.

**The Centred-Hero Exception — RETIRED 2026-08-20, on the user's direction, with the split hero.** *Added 2026-08-14, also on the user's direction.* For six days the homepage hero was centred: `.hero-spec__content` ran `align-items: center` with `text-align: center`, and the headline, deck and CTA row all centred on the page axis. It was the only deliberate departure from the site's left-aligned editorial register, and it was weighed and chosen rather than drifted into.

It is gone. `.hero-spec__content` is `align-items: flex-start` with `text-align: left`, and **the hero now sets flush left like every other surface on the site.** The site has no alignment exception left.

**Both coupled moves were made, and both were measured rather than assumed.**

1. **The optical-left corrections came back**, and applying them turned up something the original note had backwards. The prescription was `-0.058em` on the headline (round cap "O") and `-0.095em` on the deck (flat caps "I", "E"), and it warned the inked edge would otherwise stagger "up to 8px at display sizes". Applied as written at 1440 (129.6px type), the residual stagger was 4px — but *inside* the margin, not past it: `OPEN SOURCE` inked at 87px against `ECASH` and `FOR BITCOIN.` at 91px. A single block-level correction can only be right for one opening glyph, and the block's is the round "O" on line one.

   The rag is authored in markup (§3), so which glyph opens each line is a markup fact, and the two flat-cap lines carry the difference between the two documented values (`-0.037em`) on a `.hero-spec__line--flat` modifier. **This introduced no new constant**: 4px at 129.6px is 0.031em, which puts the flat-cap lines at 0.089em — the same number §3 and the deck already carry, arrived at from the other direction. Measured after: all three headline lines and the deck ink within **1px** of each other and of the intended margin. The modifier is scoped to the 640px breakpoint, because below it the spans go inline, the rag re-wraps, and which glyph opens a visual line stops being a markup fact.

2. **The vertical centring was re-decided and kept.** The note above required exactly this — "a centred title block is a title-page composition, and against left-aligned copy it would need re-deciding rather than inheriting". Re-decided: it stays. The Fold-Line Rule's fourth amendment settled the vertical composition against a measurement across eight viewport heights, the field now fills the right side full-height so there is no pooled emptiness for the title block to have to answer, and moving the block would put all of that back in play for no gain. Measured after the split at 1440×900: **140px above, 176px below — identical to the reference composition** the fourth amendment recorded.

**The third coupled move was already history and stayed history, but its subject came back.** The headline's escape from the page shell was retired 2026-08-16 as a visual no-op, on the finding that the widest authored line, `OPEN SOURCE`, sets 1003px and the shell's 1088px already held it. That finding is unchanged and is now the *reason the split works*: see §3, where the headline's width is re-based a third time — onto neither the viewport nor the shell, but onto the type's own measure.

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

*Amended 2026-08-20, on the user's direction, when the ground moved to one side of the page.* The hero is a split now — type left, field right, bleeding off the right edge (§5). **The ground's standing is unchanged: still the second branch, still material, still no claim.** But the move puts real pressure on the sentence directly above this one, and the pressure is worth spelling out, because the next person to touch this will be tempted by the thing it rules out.

**A ground that occupies one region of the page is one design decision away from being a figure.** Give it a boundary on four sides — a plate in the right column, feathered all round, sitting in the composition the way the reference this layout came from sits a stack of photographs — and it acquires an edge, a centre and a subject. That is a figure by this rule's own definition ("a figure occupies attention and therefore owes an assertion, a ground is the paper"), and a field of Perlin-gated hex has no assertion to offer. It would fail the first branch immediately, and it would fail it while looking, to a casual reader, exactly like the version that passes.

**So the terms are geometric and they are not negotiable:**

- **The canvas stays full-bleed to the section** (`.hero-field { inset: 0 }`). It is not sized to a column, it is not put in a grid cell, and it has no box of its own. What makes the right side the right side is the *mask*, not the element.
- **It has no fourth edge.** It runs off the right edge of the viewport. It dies into the section's top and bottom exactly as before, on the same absolute fades that keep it off the masthead. It dissolves into paper on the left across 62% of the field zone. Three soft boundaries and one bleed is not a frame.
- **It has no centre and no subject.** Occupancy is still noise, the alphabet is still hex, there are still no words, and nothing in it is placed.

**Do not put a box around it, do not add a right-edge fade that closes it, and do not "balance" it into a panel.** Each of those is one commit, and each of them converts a ground into a figure that owes an assertion this material cannot make. The open item is unaffected and the bar is unmoved: if anything with a *shape* goes into this hero, the first branch governs, and the blind-signature round trip is still the candidate.

**The Set-Once Rule.** *Added 2026-08-16, on the user's direction, with the deletion of the hero's ground. **Amended later the same day, also on the user's direction, when a ground came back**, and again on 2026-08-17 when the arrival was measured and found not to be arriving — see both amendments below, the second of which is the operative version.*

**The hero sets once and then holds.** Its entire motion is the arrival — the closing hairline draws across the fold (`hero-rule-draw`, 1100ms), the headline is uncovered one glyph at a time (`.hero-glyph`, finishing at 1100ms; it was one word on a 460ms `.hero-wipe` until the fourth amendment below, and that word resolved out of hex via `hero-cipher.tsx` until the third), and the deck and CTAs settle on the staged reveal. By roughly 1.1 seconds nothing in the hero is moving, and nothing moves again for the length of the visit. There is no cycle, no clock, no idle loop and no hover response. *(The 1.1s claim was measured on 2026-08-17 and was false on a phone by more than a second — see the second amendment, which repairs it rather than restating it.)*

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

**The cipher pass had to be brought under the rule, and this is the part that is genuinely a motion decision rather than a delivery one.** `hero-cipher.tsx` started 120ms after hydration — safe only while the headline was invisible until then. With the hero painting at 648ms and hydration landing near 1900ms, the word would have settled, been read for a full second, and *then* scrambled itself into hex. That is not an arrival; it is the ambient motion this rule exists to forbid, made worse by impersonating an entrance. The pass read the reveal's own animation clock for it: **it joined the arrival if the reveal was still running, and was skipped entirely if the reveal had finished.** A wall-clock threshold was rejected — it would need a constant nobody could derive and would drift the moment `--dur-reveal` or the stagger changed. *(Past tense as of 2026-08-19: the cipher pass is gone from the hero and the wipe that replaced it is a CSS animation, so there is no clock to join. The third amendment below is the operative version, and it makes this paragraph's problem disappear rather than solve it.)*

**The general rule this leaves behind, for any entrance added later:** if a settle plays unconditionally, it belongs in the stylesheet. JavaScript is for entrances that answer something — a scroll position, a pointer, a route change. Gating unconditional motion on hydration does not make the page calmer; it makes it *absent*, and then moves everything at once when the reader has stopped waiting.

#### The Set-Once Rule, third amendment: the word is uncovered, not decrypted

*2026-08-19, on the user's direction. Not a change to the rule — a change to what the arrival is made of, recorded here because the paragraph above describes a component that no longer exists.*

**`hero-cipher.tsx` is deleted and the word is uncovered by a `clip-path` wipe instead** (`.hero-wipe`, `--dur-nav-wipe`/460ms, `globals.css`; superseded the next day by the per-glyph cascade in the fourth amendment, which keeps every argument in this section and changes only its granularity). The user cut the cipher pass as corny and too on the nose, and the judgement holds up: a word about untraceable money spelling itself out of ciphertext is the site explaining its own pun at 9rem. It was the one piece of hero motion that made an argument rather than staging one, and PRODUCT.md's register is confidence through restraint, not annotation.

**What replaced it was already in the vocabulary rather than imported into it.** `clip-path` uncovering type left to right is what the masthead does under a hovered link (§5 Navigation) and what `hero-rule-draw` does to the closing hairline. The hero now rhymes with the two surfaces either side of it. The user asked for "a simple typewriter or reveal effect", and the hard advancing edge reads as both — on a proportional face a wipe is what a typing cursor looks like, without the per-character spans a literal typewriter would need, which would also have put a word boundary between every letter of the h1's accessible name.

**Everything the second amendment's last paragraph argues, this makes moot rather than satisfies, and that is the better outcome.** `joinArrival()` existed to detect whether the arrival had already finished, because the headline paints from the stylesheet at parse time while the effect ran at hydration — so on a slow connection the word would have scrambled a second after the hero went quiet. An animation declared in the same stylesheet cannot be late: it starts when the headline starts, on the `--reveal-delay` it inherits from the headline's own wrapper, and that value is written during SSR, so it is in the markup before either rule is applied. There is nothing to synchronise and nothing to bail out of. **The general rule above is unchanged, and this is a stronger reading of it:** the entrance always played, so it never needed a runtime, and the version that needed one was the version that had to guard against itself.

**It also costs nothing.** A client component, an effect, a `getAnimations()` probe, a 46ms churn timer and a `requestAnimationFrame` loop became four declarations. The hero has no client component left in it apart from the field's canvas, and `src/lib/cipher.ts` — still the site's one typographic motion primitive — is down to a single consumer, `button-cipher.tsx`. Its `decryptText` and `encryptedGlyph` are no longer exported, because the split existed to serve two callers.

**One mechanical term, and it is the Focus-Pull Rule's first term applied to another property.** The wipe fills `backwards`, not `both`. An entrance must end on the *absence* of the thing it animated rather than on a neutral value of it: `both` would leave `clip-path: inset(-25% 0 -25% 0)` on the word for the life of the page, which is visually identical and is also a permanent stacking context. `backwards` fills the delay phase, which is the half that matters, and hands back to the element's own `none`. Verified: `clip-path` computes to `none` once the arrival is over. **The vertical insets are negative on purpose** — the headline's line-height is 0.95, so the inline-block's box is shorter than the type it sets, and clipping at `0` shaves the caps.

#### The Set-Once Rule, fourth amendment: the headline is set, one glyph at a time

*2026-08-20, on the user's direction. Again not a change to the rule — the hero still sets once and then holds — but the third amendment above describes a `.hero-wipe` that no longer exists, and the Focus-Pull Rule above describes a hero that no longer consumes it.*

**The complaint was that the hero's text reveal read as unelegant and sloppy, and there were two entrances on one element to account for it.** The h1 faded and rose out of an 18px blur (`.reveal--focus`) while one word wiped inside it (`.hero-wipe`). They were not composed; they were timed around each other, which is what `--reveal-focus-span: 0.55` was for. **Both are gone. `.hero-glyph` replaces them: every character of the headline is uncovered left to right on a short stagger, and the pass runs through all three lines as one sweep.** The hero's arrival is now the hairline's draw and the glyph cascade, and they are the same gesture at two scales.

**This is the literal typewriter the third amendment declined, and the reason it declined it was tested and found wrong.** That paragraph rejected per-character spans because they "would also have put a word boundary between every letter of the h1's accessible name". That is true of `display: inline-block` and false of a plain inline span, which is what ships. Measured in headless Chrome against the shipped GT-Standard Semibold subset at 144px, uppercase, `-0.02em`:

| | plain string | inline spans | inline-block spans |
|---|---|---|---|
| `OPEN SOURCE` | 1003.250px | 1003.313px | 1004.047px |
| `FOR BITCOIN.` | 935.859px | 935.953px | — |

Chrome's LayoutNG shapes the whole inline formatting context as one run and splits the result at box boundaries, so kerning and subpixel advances survive an inline span — 0.06px over eleven glyphs is rounding. `inline-block` makes each glyph its own formatting context, rounds every advance independently, drifts 0.8px on one line, and is the version that flattens badly in the accessibility tree. **The settled headline is bit-identical to the one before**: measured at 1440×900, the three lines and the deck ink at x = 87, 86, 86, 86, which is the same within-1px alignment the per-line optical corrections were measured to produce on 2026-08-20.

**The timing is arithmetic, not taste.** Start 120ms — what the headline's reveal already carried. Step 26ms, about a frame and a half at 60Hz; under roughly 25ms adjacent glyphs start on the same frame and the cascade collapses into a single sweep, which is the individuality the whole change is for. Duration 226ms per glyph on `--ease-out-sine`. The last index is 29 — 26 glyphs and four spaces, two of them line ends, each taking a beat so the pass rests where the eye has to travel — so the headline finishes at `120 + 29×26 + 226 = 1100ms`, **exactly when the closing hairline finishes its draw.** The rule's "by roughly 1.1 seconds nothing is moving" is unchanged; the hero's two remaining motions now land together instead of one trailing the other. *(Those numbers are the second pass's, below. The first shipped at step 30 / 110ms on a hard clip, and landed on the same 1100ms.)*

**Second pass, the same day: the edge is soft and the glyphs overlap.** The user's verdict on the first version was "stiff and mechanic and generic and robotic" — the direction right, the material wrong. Both halves are diagnosable rather than matters of taste, and the fix is two changes:

*A hard edge on a glyph is a shutter.* `clip-path: inset()` is a vertical cut with no gradient, applied identically to all 26 characters; there is nothing in it for the eye to read as a hand or a light. It is replaced by a **gradient mask** whose edge is a ramp half a glyph wide, so the letter is uncovered by a wash rather than a blade. A mask keeps every visible part of the glyph at full Ink and softens only the boundary — which is why this is not an opacity cascade, since a fade per character greys the letterform while it arrives and is besides the generic entrance this surface has now twice been corrected away from. Depth on this site comes from value steps, keylines and masks (§6); this is the third of those, not a fourth idea. Verified on the settled state, masked-then-released against never-masked: ink mass 4,808,886 against 4,808,888 over one line at 96px, which is quantisation.

*Duration ≈ step is a clack, not a cascade.* Nominal glyphs-in-flight is the wrong measure and it flattered the first version. What the eye reads is how many glyphs have the ramp actually crossing them — eased value between 0.10 and 0.90 — averaged across the pass. All of these land at 1100ms:

| | step 30 / 110ms | step 26 / 226ms |
|---|---|---|
| `--ease-out-quart` | **1.2 glyphs** | 2.5 |
| `--ease-out-sine` | 1.8 | **3.7** |
| `linear` | 2.3 | 4.8 |

**1.2 is the robot, stated as a number**: one glyph mid-wash at a time is not a cascade, it is a sequence of discrete events with a gap after each. And the table is why lengthening the duration alone does not fix it — quart spends the extra time already finished, which is what added `--ease-out-sine` under the terms §4's curve paragraph sets. Linear is wider still and was rejected: a constant-velocity wash is the one shape with no arrival in it at all.

**What deliberately did not change is the stagger.** It is still uniform, and its only rhythm is the extra beat each space takes. Phrasing the cascade — tight inside a word, a longer rest between words — was worked through and dropped: at a 26ms step the whole span available for phrasing is smaller than one frame of contrast, so it buys an unfalsifiable amount of "feel" for a second timing system nobody can verify by looking. **The metronome was not what read as mechanical. The shutter was.**

**`backwards`, not `both`, on twenty-six spans rather than one** — the same term the third amendment states, and it matters more at this count: `both` would leave twenty-six permanent compositing contexts under the largest type on the site. **Every mask declaration therefore lives inside the keyframes**; declared on `.hero-glyph` itself, `mask-image` would survive the animation and the fill mode could not save it. Verified after settling: 0 of 26 glyphs hold a mask, a `clip-path`, a `filter` or a `will-change`. *(The vertical insets the third amendment argued for are gone with the clip and their absence is not an oversight: `clip-path` clips in both axes and its box was a line box, shorter at line-height 0.95 than the type it sets. A horizontal gradient mask has no vertical extent to get wrong.)*

**Measured** (Slow 4G, 4× CPU, 412×915 at DPR 2, three runs each). LCP 620 / 624 / 624ms on the shipped soft-mask version, 644 / 648 / 656ms on the first hard-clip pass, against 648 / 656 / 664ms before any of it; CLS 0.00 throughout. **The LCP element changed from `H1` to `P` and that is the finding worth recording**: a fully clipped headline is not an LCP candidate, so the deck takes over — at the same millisecond, because both are painting off the same stylesheet at parse time and the deck still carries the 0.02 opacity floor. The metric is unchanged. What genuinely costs something is legibility of the headline itself, which completes at parse + 1100ms instead of parse + 740ms; that is what a typewriter is, and it was asked for.

**Reduced motion cancels it outright** (verified: 0 of 26 glyphs animating or clipped, 0 animations anywhere in the hero), as does dropping `html.js`. The markup is a server component, `hero-headline.tsx`, because the index the cascade is keyed on has to be in the document before the stylesheet is applied — the second amendment's rule, on a third surface.

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
- **No consumer today.** *(2026-08-18.)* Its only one was the wallets page's citation of `cashubtc/nuts` for optional-NUT support, and the user cut that paragraph. The rule and the CSS are both kept: this is the recipe any future prose citation uses, and the alternative to having it on hand is the blue link or the `Visit →` it exists to rule out. That is a different judgement from the `--signal` token deleted the same day — a chromatic exception left standing with no consumer is an invitation to widen it, a monochrome text style is not.

### Divider

- **Style:** A single 1px line in Hair (`#e4e4e7`), inset to the page-x rhythm so it visually aligns with the content above and below. No vertical dividers.

### Status Tag — The Signal Square

Used in the wallet directory to mark a project's *maturity* ("Beta") as a
different class of fact from its *surface* ("iOS and Android").

- **Style:** A 7px `--signal-page` square, `8px`, then the word in Geist
  Mono at `0.75rem`, uppercase, tracked `0.06em`, in Ink. No fill, no
  border, no padding, no radius. The square is an inline-block `::before`
  sitting on the text baseline (lifted 1px, which centres it against the
  cap height), and the facts row is `align-items: baseline` so 12px tag and
  13px facts sit on one line of type.
- **Where the recipe came from:** user-directed 2026-08-16, pointing at the
  protocol-parts property list, on the reasoning that a maturity fact *is*
  a stated property and the site already had one way of opening those.
  **Those lists were cut on 2026-08-18**, so this is now the only square of
  its kind anywhere — the whole Signal-Green Exception rather than half of
  it, and the last thing on the site holding the recipe. Copying it onto a
  second surface is a user decision (§2).
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
- **The type is cleared, and the mask fits the ink, not the box.** A box SDF around the union of `.hero-spec__content`'s **children** — the block itself is a flex column, and fitting the mask to it cleared nearly the whole hero and left the field as two slivers in the margins. The children shrink to their content only because `align-items` is not `stretch`; if that ever changes, this measurement silently returns the full section width. The ground fades out a long way from the type, the wake runs right up to the letters (26px), because one that stops short reads as broken. *Measured: zero field pixels inside the headline's box while sweeping straight through it.*

- **Two mask geometries as of 2026-08-20, chosen at 1024px — and one shader path.** Below 1024 the hero is one column and the mask is the box above, the field behind the type. At and above it the hero is a split, and the mask is a **half-plane at the type column's right edge**: everything left of the boundary is cleared, everything right of it is ground, and the ground bleeds off the right edge of the viewport. Read the Honest-Network Rule's 2026-08-20 amendment before touching this — the geometry is what keeps the field a ground rather than a figure, and it is not a style choice.

  The column geometry is expressed as an enormous box running off the canvas's left, top and bottom rather than as a second SDF, so the shader keeps one path: with half-extents that large the vertical term is negative everywhere and the horizontal one reduces to the half-plane distance. **The CPU decides the geometry; the shader measures against it.**

- **The falloff's gap is computed on the CPU (2026-08-20), and this was a bug fix, not a refactor.** The shader used to derive the gap as the box's distance to the *nearer* canvas edge. That is only correct for a box near the middle of the canvas. Left-aligned type puts the box hard against one side, the near run goes to nothing, the `max()` clamps it to a single pixel, and the falloff saturates the instant it leaves the box — **a hard edge on precisely the side with the most room.** It is now `uSafeGap`: the width of the field zone in column mode, and the *longer* of the two runs per axis in box mode.
- **The section's edges are cleared too, and this is not optional.** A box SDF puts its highest values *furthest* from the box — the top and bottom of the canvas — so the field's densest band landed under the masthead and its second washed across the closing hairline. Measured on the dither version: **23.7%** under the bar against 0.6–2.6% mid-field, which is the retired `--nav-edge` strip reinstated by accident twelve hours after it was rejected by name. A 150px top and 96px bottom fade takes it to **1.1%**.
- **Quiet on purpose, and the density must be measured at more than one viewport.** The field was called too busy twice. The first fix was a threshold change and it barely registered, because the real fault was structural: **the same build measured 10.4% of cells occupied at 1440×900 and 35.4% at 1920×1200.** The safe box tracks the type, the type is width-capped and fixed in height, so a larger window does not enlarge the cleared zone — it just adds uncleared field around it. Tuning against one viewport was measuring the wrong thing. Three levers carry the density and all three are needed:
  - **`SAFE_FEATHER` is a fraction of the box-edge-to-canvas-edge gap, not a pixel distance.** This is what makes the falloff scale-invariant. Do not turn it back into pixels.
  - **`MIN_SAFE_FRAC_X` / `MIN_SAFE_FRAC_Y` floor the cleared zone at a fraction of the canvas.** Normalising the falloff alone does not close the gap, because it is an *area* problem: the cleared zone was 52% of the hero at 1440 and 33% at 1920. The floors hold it near 58% on both — and they are also the better composition, since a large screen should give the title block more air rather than the same air with more field around it.
  - **`OCCUPANCY`** is the threshold a cell's noise must clear to carry a character at all. Higher is sparser.
  
  Shipped values measure **8.4% of cells at 1440×900 and 11.3% at 1920×1200** — a 1.35× spread across viewports, down from 3.5×. **Re-measure both when touching any of them.**

  *Re-measured 2026-08-20 for the split, on a different and more comparable basis.* The old whole-canvas figure stopped meaning anything once the field moved to one side, and it always counted the headline's own ink along with the field's. The basis now is **inked cells as a fraction of the cells outside the type's own box**, sampled off a screenshot, so the same number can be taken from either composition. On that basis the centred hero it replaced measures **16.3% at 1440×900 and 16.2% at 1920×1200**, and the split measures **15.0% and 19.4%** — level on the smaller screen, a 1.29× spread across the two against the 1.35× that shipped and was accepted.

  **The residual spread is structural and it is vertical, not horizontal.** `EDGE_FADE_TOP` and `EDGE_FADE_BOTTOM` are absolute pixels on purpose — fringing against the masthead is an absolute-distance problem — so they eat 29% of an 844px hero and 21.5% of a 1144px one, and the taller canvas is correspondingly denser. Do not "fix" this by making them fractional; that reinstates the strip this rule already rejected by name.

  **`SAFE_FEATHER` is now one fraction for both modes, and the number it settled on is the one it already was.** The split shipped briefly with a shorter column feather (0.34), on the plausible-sounding reasoning that the column is narrower than the old run to the canvas edge. Measured, that was backwards: the field reached full density a third of the way across the column and the remaining two-thirds read as a wall — **20.8% and 24.1%** on the basis above. At 0.62 it measures 15.0% and 19.4%, and the long gradient is also what makes the field read as dissolving into the page rather than stopping at a line.
- **`WAKE_OCCUPANCY_GAIN` must stay below `OCCUPANCY`.** It shipped at 0.55 against a 0.10 threshold, which meant *every* cell the wake touched cleared the threshold — the disturbance rendered as a solid rectangle of characters pasted over the ground rather than as the field thickening. At 0.10 against 0.40 the wake raises local density and the field's own clustering still shows through it.
- **Equally quiet in both schemes.** The gain is calibrated against the light pairing — `--ghost` `#d4d4d8` on `#ffffff`, a 1.478:1 step. `--ghost` does *not* hold that step: at night it is `#3f3f46` on `#0a0a0b`, **1.894:1**. `gainFor()` trades occupancy against the step the scheme gives. **The correction is square-rooted, and that damping is empirical**: gain scales the noise, but what matters is how many cells clear the threshold, and that is not linear — the further into the distribution's tail the threshold sits, the more coverage a given gain removes. Undamped, dark landed at 49% of light's coverage and read as empty; damped it sits near 63%. The exponent is calibrated against a threshold, not derived from one, so **if `OCCUPANCY` moves materially, look at both schemes rather than trusting it**.
- **Real device pixel ratio, capped at 2.** The dither was pinned to dpr 1 and needed `image-rendering: pixelated` to survive the compositor's upscale. Letterforms are the opposite case: they want the device's own resolution and smooth sampling, so the canvas takes it and the pixelated hack is gone.
- **Nothing renders before `fonts.ready`.** The atlas is cut through a 2D canvas, and `ctx.font` falls back silently — a miss ships the field in the system monospace, on a site with a three-typeface rule, in a way that still looks fine and so survives review.
- **Two tiers.** The ground is a still image, so it mounts for everyone with WebGL2 — reduced-motion and touch included. The wake needs a pointer that can cause it, so the solver is built only where one exists; without it, no listeners and no rAF. See §4.
- **~13KB gzipped, no dependencies.** The reference drives this through Three + `@react-three/fiber` + `@react-three/postprocessing`, ~1.1MB minified. **Don't add one.**
- **Bounds:** the hero, and only the hero. Not a section background, not a card texture, not a page-wide grain. A second instance is a new decision. **And one canvas** — the split is a mask, not a second instance.

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

- **Full-bleed, and it has to be.** This band does not sit in the page shell, which is the one place on the site that break is licensed outside the hero — and as of 2026-08-20 the hero exercises its half of that licence too, on the same standard: a measured column-width failure, recorded in §3. Both breaks are now live, and there are still exactly two. The three-column entry row needs the width: capped at `--page-max` the description column lands under 250px and roughly 28 characters a line, and the layout stops being the layout. The cost is that the left headline does not align with the shell-capped sections above and below it, which is paid by a surface that already reads as its own object. Do not "align" it back without re-deriving the row.
- **The split is 40/60, not even.** The reference is 50/50 and can afford to be at the width it was drawn at. At 1440 an even split breaks the entry row's two content columns first. The left column loses width it was not using: its headline is three short lines and its paragraph is capped at measure either way.
- **The entry row degrades in three tiers, and the tiers are the design.** Below 1024 everything stacks in document order. From 1024 the hanging index appears and the plate sits beneath in the first content column, but the title and description still stack across the full entry width. From 1440 the reference arrangement: index in the gutter, title and description side by side on row one, plate on row two. The middle tier exists because a third column at 1280 puts prose under 250px; it is not a fallback, it is where most laptops read this section. *Row two used to be plate and property list; since 2026-08-18 the plate holds it alone and column 3 beside it is empty on purpose — the plate is sized by its own clamp, not by its column, so stretching it across the row would enlarge a figure the library's dot radii are tuned against rather than fill anything.*
- **The dark column is `#343438`, not a near-black.** *(Corrected 2026-08-16.)* It shipped at `#131316`, which measures **1.06:1** against `--paper` (`#0a0a0b`): in light the band is a black column against a white one at 21:1 and reads instantly, and at night it was one dark page with a hairline down it. The band's whole identity is a 40/60 split, and the split was invisible in half the scheme space. `#343438` gives **1.60:1** against the page with the column's body text still at 9.66:1 — the highest value that still reads as an always-dark surface rather than a grey card. *A note on the arithmetic: an earlier fix lifted `--panel-hair` to Slate on the reasoning that "no value in this range beats ~1.4:1, so the 1px line IS the boundary." That was true of the range being searched and false of the range available — the ground step was recoverable, and the rim is now a keyline rather than the whole boundary.*

- **Entries separate from each other, never from the band.** A 1px `--panel-rule` line between consecutive entries, none above the first or below the last. Hair is a Paper-ground value and vanishes on ink; `--panel-hair` is `#000` in light for exactly the reason that makes it useless as an interior line. This is the Hairline Rule expressed in the only value that survives an ink ground.
- **The plate is a figure, not a spinner.** Each entry carries a `thinking-orbs` canvas at `clamp(190px, 20vw, 320px)`, bracketed by four corner registration marks it deliberately overruns. The brackets are load-bearing: without a frame the animation reads as what the library built it to be, and four loading spinners down a column say the page is still working. Corners rather than a full box — `shaping` spends a third of its cycle as a dotted square, and a rectangular frame at the same inset read as one doubled box instead of a figure inside a crop. See the Honest-Network Rule in §4 for why an agent-status animation is admissible here at all, and `orb-figure.tsx` for why the plate drives the library's engine directly instead of using its component.
- **An entry is copy and figure. It is not a list.** *(2026-08-18, user-directed.)* Each entry carried a fourth element until this date: four uppercase Mono properties, each opened by a 7px `--signal` square, bottom-aligned to the plate as the entry's floor. That list is where the deleted bento's four cards went — open source, bearer token, unlinkable payments, ecash for the web — and cutting it took the Signal-Green Exception's first consumer with it (§2), along with the `--signal` token itself. **What the lists stated is not lost, and that is why cutting them was cheap**: the bodies already carry it (open source and every platform in 01, the Lightning bridge and the claim-not-deposit line in 02, the NUTs in 03, bearer strings and where they fit in 04) and the aside's lead carries unlinkability. Four uppercase Mono lines under four numbered entries was the same fact set stated a second time in a second voice. **Don't restate a property as a list here again** — if it is worth making, make it in the sentence.
- **Honest content.** Unchanged from the pattern this replaced, and it is the part worth carrying forward. Nothing in the column is written to fill a slot. It applied to the property lists first — an entry with three real properties got three, not four padded to match its neighbours — and it applies to the bodies that now carry them alone.

*On the Demo Panel (Figure/Code), retired here.* The four-parts section used to demonstrate the protocol twice over — a captioned spec plate and the code behind it, on a shared frozen ASCII sheet, flipped by a square segmented control. It was a good pattern and it is gone with the section that held it, along with `protocol-demo.tsx`, `protocol-demo-content.tsx`, the `.fig`/`.fig-plate`/`.fig-caption` rules, and the `--fig-*` keyline tokens, which now have no consumer. Two things it established outlive it and still bind: **all depth comes from value steps, keylines, and masks — never blur, translucency, or shadow** (the navbar was the one glass surface this clause carved out, and it is gone as of 2026-08-16, so the clause holds without remainder *as a statement about depth*, which is all it ever was — the entrance blur admitted on 2026-08-19 describes no plane and holds no state; see the Focus-Pull Rule in §4); and **the Twilight Stack stays footer-reserved** — no bloom-to-black and no grain on the `--panel` column, which is flat ink and nothing else.

### Signature: The Reference Implementations Band

The section that ends the homepage argument: a headline and lead, then a floating Card of featured repos overlapping the upper-left corner of a Spec pane showing real NUT-00 CBOR. The whole composition is **one value contrast** — a bright plate over a dark listing — and the rules follow from protecting it.

- **The ground is Paper** (user-directed 2026-08-16). It was `bg-black text-white`, and a whole section stuck dark while the page around it changed read as a bug rather than a decision. It is `--paper`/`--ink` now: a document page with a code plate set into it, closer to the published-RFC north star than the showcase band ever was. The CTA moved from `btn-secondary--on-ink` to plain `btn-secondary` with it, and the lead from a zinc literal to `--muted`.
- **The Spec pane does not follow it.** It stays `#18181b` with a `#27272a` filename strip — a fixed-value surface, not a scheme. A code listing reading dark is a convention, not a theme bug, and it is the value the Card floats against: flip the pane and the composition has nothing left to stand on. Its greys are literals and clear AA on their own — zinc-300 path, zinc-400 meta and comments, zinc-100 body, four ranks (zinc-500 measured 3.08:1 on the strip and misses AA at 14px).
- **The Card is always light** — the mirror of the site's always-dark surfaces, and the reason its greys are literals too. A card that followed the scheme would go dark-on-dark in dark mode and the overlap would vanish. It carries a `--hair` rim: since the ground started flipping, only the Card's overlapping third sits on the dark pane and the other two thirds were white on white with nothing to hold their edge. `--hair` draws that rim on Paper and disappears into the dark ground, so one declaration covers both.
- **Focus inside the Card is a literal Ink Soft** (`.impl-card .focus-ring`). This existed because the sitewide ring paints `--edge`, which was `#ffffff` in dark — a white outline on a white card, i.e. no indicator at all. With the site light-only `--edge` is Ink and the override is belt-and-braces rather than load-bearing; it is kept because it states the Card's own intent, and because a focus indicator is the wrong place to trim a redundancy.
- **Language marks keep their brand colour** — the Depicted-World Exception (§2). Readers need to see real Python, real Rust, real TypeScript at a glance. Do not re-monochrome them without reopening that decision. **The Card samples the lead, it no longer mirrors it** *(2026-08-18)*: the lead names Kotlin as well, and `LangMark` draws only three marks, so a Kotlin row would sit markless and misaligned against ones that have one. Drawing a fourth mark reopens the Depicted-World decision — take it deliberately or leave the Card at three.
- **The counts are derived, never typed.** `Eight` in the headline and `+ 5 more` in the Card share one denominator (`REPOS` minus the two catalogue entries), so the section whose whole argument is that we count honestly cannot fail its own arithmetic.
- **Derived is not the same as true, and this section proved it.** *(2026-08-18.)* The headline read `Six` for as long as `REPOS` was a hand-written array nobody revisited, and the arithmetic was internally perfect the whole time. Checked against the GitHub API that day, the org had **34 public repos** and the array was missing `cashubtc/wallet` — the official Kotlin mobile wallet, pushed the day before — and `Numo`, both already listed on `/wallets`. **The array is the claim.** The line it draws is stated above it in the component and has to be re-argued, not just re-counted, if it moves: a repo counts if it is itself a wallet, a mint, or a library for building either. Bindings, integrations, tooling, catalogues and long-stale repos are out, by name, in that comment. A wider line (everything unarchived shipping protocol code, pushed within a year) comes to roughly twenty and was not taken.

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

  *Objection recorded 2026-08-20, in the shape the Focus-Pull Rule's objection is recorded, because it is a register argument and register arguments are not settled by being ignored.* The hero is now type-left / visual-right, which is the canonical SaaS landing-page hero, and this line rules that family out by name. The defence is that **the tell is the bounded artifact, not the asymmetry** — a product screenshot in a rounded window, a floating stack of cards, a device mockup on a gradient. What sits right of the type here is an unframed ground of hex that bleeds off the page and has no box, no radius, no shadow and no subject; the geometric terms keeping it that way are written down at the Honest-Network Rule's 2026-08-20 amendment. The objection stands anyway. **If it is ever reconsidered, the thing to look at first is whether the field has quietly acquired a fourth edge**, because that is the change that would make this line's verdict correct.
- **Don't** ship Chalk placeholder surfaces in final layouts. They are scaffolding only.
