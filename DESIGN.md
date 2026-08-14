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
    fontSize: "1.25rem"
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
  nav: "12px"
  card: "16px"
  glass: "24px"
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
  nav-link:
    textColor: "{colors.slate}"
    typography: "{typography.label}"
  nav-link-hover:
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

The system commits to a few sharp moves: massive editorial display type (GT-Standard) carries the page; neutrals stay pure (ink-on-paper, no tint, no warmth); structural elements are minimal — a thin horizontal rule, a pair of sharp-cornered buttons, generous whitespace. The Geist Pixel accent exists for one purpose: to mark machine-coded artefacts (token amounts, mint addresses, version numbers) when the spec calls for a notation different from prose. Cashu is not a SaaS, so the system actively rejects SaaS-landing-page chrome: no gradient borders, no soft drop shadows, no animated tickers, no testimonial carousels, and no glassmorphism outside its one sanctioned surface (the navbar).

Motion is permitted under one condition: it must depict real protocol structure, or be plain material carrying no assertion at all. The hero's ground is a live ASCII field — a contour heightfield drawn in Geist Mono glyphs — that fills the section and cycles slowly between open terrain, a vault door, and a schematic of the blind-signature round trip that Cashu actually performs. A pointer lens bends the contour lines around the cursor. Never a decorative flow, and never a connection the protocol doesn't make. See the Honest-Network Rule in §4, and `src/lib/ascii/` for the field itself.

Color is intentionally absent from everything the site says in its own voice. The palette is paper, ink, and a graded family of greys. This is a doctrine, not a placeholder. The bitcoin-curious audience reads sovereignty in restraint; any added accent would dilute the signal. The one carve-out is the Depicted-World Exception (§2): artifacts the page *depicts* — the tap-to-pay video, third-party marks — keep their source colour, because faking them grey would be its own kind of dishonesty.

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

**The No-Colour Rule.** The system uses no chromatic accent. Greys may shift by lightness but never by hue. If a future surface "needs" colour, the design is wrong — work the hierarchy with type and space before reaching for a swatch.

**The Depicted-World Exception.** Colour is permitted only inside artifacts the page *depicts*, never in the chrome the site *is*. The sanctioned surfaces, exhaustively: (a) the tap-to-pay video, a documentary capture of real hardware; (b) third-party marks shown at their brand identity — the language logos on the implementations card and the AI-assistant icons in the footer. (The four-parts demo panels once sat here as real app screenshots; they are now spec figures drawn in the site's own voice — see §5 — and fall under the No-Colour Rule in full.) Everything in the site's own voice — type, backgrounds, borders, buttons, icons, figures, chrome — stays monochrome. Editorial photography *reports* rather than depicts, so it still desaturates via `grayscale(1) contrast(1.05)` and its wordmarks force to Paper (see the press band). A new colour surface that is neither a depicted product artifact nor a third-party mark falls under the No-Colour Rule in full.

**The Two-Black Rule.** Ink (`#000000`) and Ink Soft (`#18181b`) are the only two text colours that may sit on Paper. Slate / Mist / Fog exist for legal disclaimers, nav, and labels only — never for primary reading copy.

## 3. Typography

**Display Font:** GT-Standard (M / Standard width) — 12 weights, Light 300 → Heavy 800, with matching obliques.
**Body Font:** GT-Standard — the same family carries body. One typeface, deep weight contrast.
**Label / Mono Font:** Geist Mono — code, addresses, technical labels.
**Pixel Accent:** Geist Pixel Square — protocol artefacts only (amounts, mint ids, version strings).

**Character:** GT-Standard is a contemporary grotesque with narrow apertures and a clean editorial bearing. It feels like a magazine commissioned a custom face. Geist Mono and Geist Pixel Square introduce machine-coded specificity where the protocol's own notation appears in copy — quiet contrasts, never decorative.

### Hierarchy

- **Display** (weight 600, `clamp(3.75rem, 9vw, 9rem)`, line-height 0.95, letter-spacing −0.02em): Short page-peak copy — the closing-CTA slogan, the H1 on dedicated routes (`/wallets`, future `/docs`, `/blog`). Sized to be monumental. The line break in Display copy is part of the composition, not an accident of viewport. The homepage hero runs at this scale too — see below.
- **Homepage Display** — *retired 2026-08-14, on the user's direction.* This was a bespoke `clamp(3.75rem, 7vw, 6.5rem)` step for the homepage H1, on the reasoning that longer descriptive hero prose should sit below route Display "so it can share the full content grid without shouting." The reasoning was deliberate and it was wrong in practice: the step pinned at 6.5rem past ~1486px and fell to 5.6rem at 1280px, so the homepage hero — the page peak — rendered **29% smaller than the `/wallets` route H1 at 1440px and 38% smaller at 1920px**. A secondary route out-shouted the front door, and the hero read flat for exactly that reason. The hero now uses Display unmodified. Measured across 360–2560px: no horizontal overflow, and the section still resolves on the fold at every size. Do not reintroduce a homepage-only display step; if the hero copy grows too long for Display, shorten the copy.

  The three-line break this note originally recorded past 1600px was a second, separate fault — the page shell, not the type scale — and is fixed; see the Centred-Hero Exception in §4. The headline now breaks in two at every width from 768px up.
- **Footer Display** (weight 600, `clamp(3.75rem, 6vw, 5rem)`, line-height 0.95, letter-spacing −0.02em): The compact closing wordmark.
- **Headline** (weight 600, `clamp(2rem, 4vw, 3rem)`, line-height 1.05, letter-spacing −0.015em): Section openings ("What is ecash?", "Wallets", "Mints").
- **Title** (weight 600, `1.125rem`, line-height 1.3): Subheaders, card titles, anything ranked above body but below a section opening.
- **Body** (weight 400, `1rem`, line-height 1.5, max line length 65–75ch): All reading copy. Width is enforced; no body paragraph crosses 75ch.
- **Hero Lead** (weight 400, `clamp(1.125rem, 1.6vw, 1.5rem)`, line-height 1.5, letter-spacing −0.005em): The homepage hero’s supporting statement. Capped at `46ch` and centred on the page axis, with `text-wrap: pretty` keeping each rendered line readable. It no longer shares the headline’s width: the headline escapes the page shell and the lead stays inside it, which is the point of a centred composition rather than a misalignment.
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

**The No-Shadow Rule.** `box-shadow` is forbidden throughout the site, including buttons. If a surface needs separation, use spacing, fill contrast, or a 1px border. One sanctioned exception, added 2026-07-25 on the user's direction: the navbar's condensed box carries `--nav-shadow` (`0 4px 10px` near-transparent black) as part of the Onyx-pattern scroll behaviour — see §5 Navigation. No other surface inherits this licence.

**The Hairline Rule.** Structural separation between sections is achieved with a single 1px line in Hair (`#e4e4e7`), full content width, never bolder. No double rules, no decorative rules.

**The Fold-Line Rule.** The hero fills one viewport height (`min(100svh - var(--nav-h), var(--hero-max))`) and reads as a spec cover: title at the top, horizon at the bottom, the closing hairline resolving *on* the fold rather than floating above it with dead ground below. Two bounds keep it honest: `--nav-h` is subtracted because the bar is sticky and occupies flow space, and `--hero-max` (1200px) stops the chase on very tall displays, where an uncapped hero would open a void instead of a horizon. Past the cap the next section peeks in, which is the intended degradation.

*Amended 2026-08-14, on the user's direction.* The ASCII field was a `clamp(180px, 26vh, 320px)` band pinned to the section's base; it is now a full-bleed layer filling the hero, with the copy sitting on top of it. **The rule's substance is unchanged — only its mechanism is.** "Title at the top, horizon at the bottom" is now enforced by the field's mask rather than by the band's height: a vertical gradient holds the field fully transparent behind the sticky bar and near-transparent through the headline, and a horizontal gradient holds the field down through the middle of the section where the copy sits, so it runs at full strength out to both edges and frames the column instead of sitting behind it. That density gradient is load-bearing composition and must not be "corrected" by flattening the mask to uniform. The old prohibition on growing the band is retired with the band.

*Corrected later the same day:* the horizontal mask was a one-sided **left** dimmer while the hero copy was left-aligned. It is symmetric now — see the Centred-Hero Exception below. The two are a matched pair: if the hero ever goes back to left-aligned, the mask has to go back to one-sided or it will quiet the wrong side.

**The Centred-Hero Exception.** *Added 2026-08-14, on the user's direction.* The homepage hero is centred: `.hero-spec__content` runs `align-items: center` with `text-align: center`, and the headline, deck, lead and CTA row all centre on the page axis.

**This is a deliberate departure and the only one on the site.** Everything else — every section heading, the wallets registry, the implementations directory, the footer, both interior routes — stays left-aligned editorial, which is what PRODUCT.md's "editorial-minimal, confident through silence" describes and what the rest of the system is built for. A centred hero sits closer to the marketing register than the rest of the page does. That was weighed and chosen, not drifted into.

Do not "restore" the hero to left-aligned as a consistency fix, and do not spread centring outward to the sections beneath it. If it ever does go back, three things move together or the composition breaks:

1. **The optical-left corrections come back.** Glyph side bearing has to be cancelled against a left margin: measured for GT-Standard 600, the headline needs `-0.058em` (round cap "O") and the deck and lead `-0.095em` (flat caps "I", "E"). Without them the inked left edge staggers four ways — up to 8px at display sizes, and worse as the type grows. See the Fold-Line Rule above.
2. **The field's horizontal mask goes back to one-sided.** It is symmetric now so it quiets the middle where centred copy sits; against left-aligned copy it would dim the wrong side.
3. **The headline's width escape may no longer be needed.** It currently sizes off the viewport rather than the page shell (`min(calc(100vw - 2 * var(--page-x)), 1440px)`) because the shell capped it at 1088px while the line needs ~1283px to break in two, orphaning "bitcoin." on its own line.

**The Honest-Network Rule.** Network visualisations and motion are permitted *only when they reflect real protocol structure*. Acceptable: Lightning Network bridges shown as animated dotted lines between mint markers; peer-to-peer token transfer between users. Forbidden: decorative flow, speculative connections, "mints talking to mints" (which Cashu doesn't do), or any animation that exists for aesthetic energy rather than to convey a true property of the protocol. When in doubt, the simpler static version is more honest than the animated one.

*Amended 2026-08-14, on the user's direction, for the hero ASCII field.* The field cycles slowly (92s) between three named scenes, and each clears the rule on its own terms:

- **Terrain** is a contour heightfield. It depicts nothing and claims nothing — it is a material, like paper grain. Texture is outside the rule's scope; the rule governs things that assert a structure.
- **The vault door** is a depicted object, not a network. It carries no edges and implies no topology.
- **The blind-signature round trip** *is* protocol structure, and is the scene that earns the motion: Alice's secret stays on her side, the blinded point travels out, the mint signs without seeing it, the signature returns, and the secret plus the signature resolve into a bearer token. Two nodes, one round trip, no third party. The travelling dashes are the same device the rule already blesses for Lightning bridges.

What stays forbidden is unchanged and explicit: no mint-to-mint edge, no speculative connections, no third node standing in for "the network", and no scene added to the cycle purely because it would look good. A world map was proposed and rejected on exactly this ground — it asserts a global reach the protocol does not itself claim.

*Recorded waiver, same date.* The `$ ¥ €` glyphs on high contours and `₿` at the peaks (`terrain.ts`) depict no protocol structure; the 2026-07-26 critique flagged this. It is retained as the site's own voice and the ₿ density was deliberately increased (`PEAK_BOOST`). Noted here so it is a decision rather than an oversight.

## 5. Components

Components are restrained to a small canonical set: two buttons, a nav link, a divider, and a placeholder surface. New components must justify themselves against the No-Colour and No-Shadow rules before being added.

### Buttons — The Flat Cipher Slab

Buttons are **sharp-cornered, shadowless slabs**. Their affordance comes from decisive fill contrast, a 1px border, and one brief mono texture on hover/focus. Sharpness is doctrinal — there are no rounded buttons anywhere on cashu.space.

- **Shape:** Sharp. `border-radius: 0`. Always. No pills, rounded corners, shadows, inner highlights, or glows.
- **Size parity:** Primary and secondary share the *same* padding (`12px 24px`) and the *same* font size (`0.8125rem`, weight 500). Hierarchy is conveyed by fill (Ink vs Paper), never by box. No "large" modifier; if a CTA needs more presence, the layout around it does the work — whitespace, alignment, isolation.
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

### Navigation

The bar follows the Onyx pattern (behaviour lifted from onyx.security on the user's direction, 2026-07-25; materials stay the site's own). Two states, one sticky shell:

- **Rest (page top):** fully transparent — no ground, no blur, no rule. The bar sits 10px (`--nav-inset`) below the viewport edge; the row aligns to the page-shell gutters like every section beneath it.
- **Condensed (scrolled, or mobile panel open):** the inner frame becomes a floating box — glass ground + 20px blur, `rounded.nav` (12px) corners, `--glass-hair` rim, the site's one sanctioned `box-shadow` (`--nav-shadow`), dropped a further 4px and tightened to 1128px max-width with 24px inner padding. The transition runs 300ms ease-in-out; `prefers-reduced-motion` drops the translate and transitions. The box (glass, radius, shadow) is the navbar's exclusive licence; everything inside it stays square and flat.
- **Links** (`nav-link`): Label-weight, colour Slate (`#3f3f46`). Hover transitions colour to Ink. No underline, no active background. Current route sets full Ink and one weight step up.
- **Mobile:** Links collapse below `lg` into the hamburger panel, which opens inside the condensed box; the brand and theme toggle remain in the row.

### Divider

- **Style:** A single 1px line in Hair (`#e4e4e7`), inset to the page-x rhythm so it visually aligns with the content above and below. No vertical dividers.

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

### Signature: The Demo Panel (Figure/Code)

The four-parts section demonstrates the protocol twice over: a captioned spec figure and the code behind it, flipped by a **square segmented control** (never a rounded pill) floating bottom-center inside the media frame. Rules of the pattern:

- **One ground, two artifacts.** Both views sit on the same drafting sheet: `--fig-ground` (Chalk in light, Band in dark) under 44px hairline graph paper. The grid rides its own layer and attenuates radially toward the centre — the ground yields under the artifact. All depth in the panel comes from value steps, keylines, and masks — never blur, translucency, or shadow; the one glass surface remains the navbar. Neither ground is the Twilight Stack: no bloom-to-black, no grain. Twilight stays footer-reserved.
- **The figure is a published plate, not a file.** Card fill on the drafting sheet; a hairline keyline whose sides, lit top edge, and seated bottom edge come from `--fig-edge`/`--fig-lit`/`--fig-shade` — borders, so the No-Shadow Rule holds. **The keyline set never takes `--hair`.** The graph paper under it is drawn in `--hair`, so a Hair keyline outlined the plate in the value of the grid it is supposed to sit above; the whole set steps one tone off it. Then an RFC-style caption *below* the plate — `Fig. NN` in the micro register plus a thesis sentence in GT-Standard body-small. The caption is the site's own voice describing the figure; the plate interior speaks machine notation — Mono field names at micro tracking, Pixel amounts at `1.5rem` as the plate's one scale jump. Plates size to their content; a plate never pads itself tall.
- **The code pane** is the file-shaped counterweight: sharp corners, Card ground, Hair filename strip, Ink text, Mist comments. It flips with the theme (white file pane on light, the classic dark pane on dark). The strip register belongs to the pane alone — figures are captioned, files are stripped; the two views read as two registers of one document, never one box with two fillings.
- **The toggle** is the feature-nav register one size down: uppercase GT 500 at `0.75rem`, `letter-spacing: 0.06em`, active segment inverts to Ink/On-Ink. It carries its own Card ground and a `--fig-edge` rim — not Hair, for the same reason the plate's keyline isn't: it floats over graph paper drawn in Hair, and a control outlined in its own ground is not outlined. Flat and square like the rest of the system.
- **Honest content.** Everything protocol-shaped in a demo panel is real spec data: real NUT examples, a decodable token, request/response bodies verbatim from the NUTs, registry counts that match the registry. A figure delivers its insight — in the caption, in a legend, in the data itself; a plate that requires derivation is decoration.

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

- **Don't** introduce chromatic accent in the site's own voice. Generic crypto landing pages are the anti-reference — neon gradients on black, gradient text, animated 3D coins. Never on cashu.space. Colour appears only under the Depicted-World Exception (§2): the tap-to-pay video and third-party marks.
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
