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
  body:
    fontFamily: "GT-Standard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  label:
    fontFamily: "GT-Standard, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0"
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
    padding: "14px 24px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
    typography: "{typography.label}"
  button-secondary-hover:
    backgroundColor: "{colors.hair}"
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

The system commits to a few sharp moves: massive editorial display type (GT-Standard) carries the page; neutrals stay pure (ink-on-paper, no tint, no warmth); structural elements are minimal — a thin horizontal rule, a pair of sharp-cornered buttons, generous whitespace. The Geist Pixel accent exists for one purpose: to mark machine-coded artefacts (token amounts, mint addresses, version numbers) when the spec calls for a notation different from prose. Cashu is not a SaaS, so the system actively rejects SaaS-landing-page chrome: no gradient borders, no soft drop shadows, no animated tickers, no testimonial carousels, and no glassmorphism outside its two sanctioned surfaces (the navbar and the demo-panel mock UI cards).

Motion is permitted under one condition: it must depict real protocol structure. The hero overlays mint markers and animated dotted lines between them to show Lightning Network bridging — a true property of the protocol — never a decorative flow. See the Honest-Network Rule in §4.

Color is intentionally absent. The palette is paper, ink, and a graded family of greys. This is a doctrine, not a placeholder. The bitcoin-curious audience reads sovereignty in restraint; any added accent would dilute the signal.

**Key Characteristics:**

- Monochrome by doctrine: paper, ink, six grades of grey, no chromatic accent.
- Display type does the heaviest lifting: GT-Standard at 6rem–9rem on the hero, set tight (line-height 0.95, letter-spacing −0.02em).
- Generous editorial whitespace; sections breathe at 80–128px vertical rhythm on large screens.
- Pill buttons, hairline divider, no shadows — depth is conveyed by position and weight, never by elevation.
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

**The Hero-Photograph Exception.** The home hero photograph (`/hero-handoff.jpg`) is the single permitted color image on the site — a documentary moment of a Cashu handoff, kept in its source palette so the human gesture carries. Every other photograph still desaturates via `grayscale(1) contrast(1.05)` (see the footer keyboard, phone parallax, and tabbed-feature landscapes). The rule otherwise holds in full: no chromatic accent in type, chrome, backgrounds, borders, icons, or motion.

**The Two-Black Rule.** Ink (`#000000`) and Ink Soft (`#18181b`) are the only two text colours that may sit on Paper. Slate / Mist / Fog exist for legal disclaimers, nav, and labels only — never for primary reading copy.

## 3. Typography

**Display Font:** GT-Standard (M / Standard width) — 12 weights, Light 300 → Heavy 800, with matching obliques.
**Body Font:** GT-Standard — the same family carries body. One typeface, deep weight contrast.
**Label / Mono Font:** Geist Mono — code, addresses, technical labels.
**Pixel Accent:** Geist Pixel Square — protocol artefacts only (amounts, mint ids, version strings).

**Character:** GT-Standard is a contemporary grotesque with narrow apertures and a clean editorial bearing. It feels like a magazine commissioned a custom face. Geist Mono and Geist Pixel Square introduce machine-coded specificity where the protocol's own notation appears in copy — quiet contrasts, never decorative.

### Hierarchy

- **Display** (weight 600, `clamp(3.75rem, 9vw, 9rem)`, line-height 0.95, letter-spacing −0.02em): Short page-peak copy — the closing-CTA slogan, the H1 on dedicated routes (`/wallets`, future `/docs`, `/blog`). Sized to be monumental, which means it only fits copy under ~25 characters. Long descriptive hero prose does not belong at Display; it gets a bespoke scale below Display and above Headline, justified inline. The line break in Display copy is part of the composition, not an accident of viewport.
- **Headline** (weight 600, `clamp(2rem, 4vw, 3rem)`, line-height 1.05, letter-spacing −0.015em): Section openings ("What is ecash?", "Wallets", "Mints").
- **Title** (weight 600, `1.125rem`, line-height 1.3): Subheaders, card titles, anything ranked above body but below a section opening.
- **Body** (weight 400, `1rem`, line-height 1.5, max line length 65–75ch): All reading copy. Width is enforced; no body paragraph crosses 75ch.
- **Label** (weight 500, `0.875rem`): Navigation, buttons, captions, the disclaimer.
- **Mono** (weight 400, `0.875rem`): Inline code, addresses, transaction ids — anywhere a literal copy-pasteable string appears in copy.
- **Body Lead** (weight 400, `1.125rem`, line-height 1.55, letter-spacing −0.005em): Section intros and lead paragraphs. One step above body. Use sparingly — usually one lead paragraph per section.
- **Pixel** (weight 500, `1rem`, letter-spacing 0.04em): Amounts, denominations, mint identifiers, protocol version. A *notation* mark, never a decoration. Never used as a heading, eyebrow, section marker, or link affordance — those are Label sans. If you reach for pixel and there is no machine-data string to set, the answer is Label.

### Named Rules

**The One Face Rule.** GT-Standard carries everything readable. Geist Mono is technical notation; Geist Pixel Square is protocol notation. Three families, three jobs, no overlap.

**The Big-Or-Quiet Rule.** Type is either Display (≥3.75rem) or quiet (≤1.125rem). The middle ground — `text-2xl` / `text-3xl` body — is avoided. Hierarchy is achieved by jumping scale, not by stair-stepping.

## 4. Elevation

The system is flat with one exception: the button. Every other container — cards, sections, callouts, nav, dividers, placeholder surfaces — sits on Paper without ambient depth. Depth in the layout is conveyed by position (whitespace, grid order), by weight (type doing the lifting), and by a single 1px hairline rule.

The button is the system's only invitation-to-press, and earns the only lift. It carries a darker rim, two layered drop shadows, and an inner top highlight — the *lifted ink chip* — codified in §5.

This scoping is intentional and doctrinal: the Open Specification north star rejects ambient depth on the page, but a CTA that asks for a click is allowed to look like it can be clicked.

### Named Rules

**The No-Shadow Rule.** `box-shadow` is forbidden on every container *except* `.btn-primary` and `.btn-secondary`. If a card "needs" elevation, it needs spacing instead. The button exception is non-transferable — no other surface inherits it.

**The Hairline Rule.** Structural separation between sections is achieved with a single 1px line in Hair (`#e4e4e7`), full content width, never bolder. No double rules, no decorative rules.

**The Honest-Network Rule.** Network visualisations and motion are permitted *only when they reflect real protocol structure*. Acceptable: Lightning Network bridges shown as animated dotted lines between mint markers; peer-to-peer token transfer between users. Forbidden: decorative flow, speculative connections, "mints talking to mints" (which Cashu doesn't do), or any animation that exists for aesthetic energy rather than to convey a true property of the protocol. When in doubt, the simpler static version is more honest than the animated one.

## 5. Components

Components are restrained to a small canonical set: two buttons, a nav link, a divider, and a placeholder surface. New components must justify themselves against the No-Colour and No-Shadow rules before being added.

### Buttons — The Lifted Ink Slab

The button is the only surface in the system that breaks the flatness doctrine. It is a **sharp-cornered slab** that sits *above* the page on a stack of shadows. The rationale: a button is the only element that asks for a press, and the only one that earns visible affordance. Sharpness is doctrinal — there are no rounded buttons anywhere on cashu.space.

- **Shape:** Sharp. `border-radius: 0`. Always. No pills, no rounded corners, no soft rectangles. The lift comes from shadow, not from silhouette.
- **Size parity:** Primary and secondary share the *same* padding (`12px 24px`) and the *same* font size (`0.8125rem`, weight 500). Hierarchy is conveyed by fill (Ink vs Paper), never by box. No "large" modifier; if a CTA needs more presence, the layout around it does the work — whitespace, alignment, isolation.
- **Copy:** Button labels are **all caps**, set with `text-transform: uppercase` and `letter-spacing: 0.06em`. Sentence-cased button copy is forbidden.
- **No icons.** Buttons never carry icons — no SVG glyphs, no `→` arrow, no chevrons, no spinners-as-decoration. The label is the entire button. (A spinner *replacing* the label during an async action is acceptable when the time comes; that's not an icon, it's the label's loading state.)
- **Primary** (`.btn-primary`): Background Ink Soft (`#18181b`), text Paper (`#ffffff`). Carries a 1px semi-transparent white inside-stroke, a true-black rim shadow (`box-shadow: 0 0 0 1px #000000`), two layered drop shadows (`0 1px 2px rgba(9,9,11,0.08)` and `0 2px 4px rgba(9,9,11,0.16)`), and a white inner top highlight (`inset 0 1px 20px rgba(255,255,255,0.16)`).
- **Secondary** (`.btn-secondary`): Background Paper (`#ffffff`), text Ink Soft (`#18181b`). Rim is Hair (`box-shadow: 0 0 0 1px #e4e4e7`) so the slab reads against Paper without the white-on-white edge disappearing. Same drop-shadow ramp at half opacity. No inner highlight (invisible on white).
- **On-ink variant** (`.btn-primary--on-ink`): For CTAs sitting on an Ink section. Paper fill, Slate rim (`box-shadow: 0 0 0 1px #3f3f46`), deeper drop shadows (`0 1px 2px rgba(0,0,0,0.20)` and `0 2px 4px rgba(0,0,0,0.32)`) so the slab reads against black, and a stronger inner top highlight (`rgba(255,255,255,0.50)`) so the lift is unmistakable.
- **States:** Hover lifts the slab by `translateY(-1px)` and deepens drop shadow 3; active settles by `translateY(1px)` and reduces the shadows by roughly half. Motion uses the existing `ease-quart-out` curve at `150ms`. Under `prefers-reduced-motion: reduce`, the translate is dropped — only the shadows change.
- **Focus:** A 2px outline at 4px offset (Ink on light sections, Paper on Ink sections). No glow, no ring colour shift.

#### What stays flat (no shadow)

The lift exception applies *only* to the three `.btn-*` classes above. Every other surface in the system is flat and sharp: cards, sections, callouts, nav, dividers, placeholder surfaces. A new component is not allowed to inherit the button exception by association.

### Navigation

- **Style:** Top bar, full-width, padding matches page-x (`24px` mobile / `48px` sm / `80px` lg).
- **Links** (`nav-link`): Label-weight, colour Slate (`#3f3f46`). Hover transitions colour to Ink. No underline, no active background.
- **Mobile:** Links collapse below the `md` breakpoint; the brand wordmark and the two buttons remain.

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

The Twilight Stack is the system's one allowed atmospheric flourish, and is permitted only because it (a) stays inside the grey ramp and (b) serves a structural purpose: signalling the end of the page.

### Signature: The Demo Panel (UI/API)

The four-parts section demonstrates the protocol twice over: a mock product-UI card and the code behind it, flipped by a **square segmented control** (never a rounded pill) floating bottom-center inside the media frame. Rules of the pattern:

- **One grid, both themes.** Both views sit on the same 44px hairline graph paper (Hair lines on Band), centered, and flip with the theme — there is no always-dark surface in the panel. The UI ground adds two soft Ghost blooms so the glass card has luminance to refract. The grid is deliberately *not* the Twilight Stack: no bloom-to-black, no grain. Twilight stays footer-reserved.
- **The depicted-product exception (liquid glass).** The mock UI card portrays a wallet or mint *app*, not the site — so it alone may speak product language the RFC chrome never does: `rounded.glass` (24px) corners, translucency over `backdrop-filter` blur, a specular top-edge glint, pill-shaped state chips, a rounded QR tile. Constraints that keep it doctrinal: the glass tints nothing (monochrome holds), it casts **no drop shadow** (depth comes from refraction, like the navbar's glass), and nothing outside these mock cards inherits the radius or the blur. Site chrome — including the toggle — stays sharp and flat.
- **The code pane** is the boxy counterweight: sharp corners, Card ground, Hair tab-strip, Ink text, Mist comments. It flips with the theme (white file pane on light, the classic dark pane on dark) — same register, two keys.
- **The toggle** is the feature-nav register one size down: uppercase GT 500 at `0.75rem`, `letter-spacing: 0.06em`, active segment inverts to Ink/On-Ink. It carries its own Card ground and Hair rim so it reads on every surface it floats over. Flat and square — neither the button lift nor the glass exception extends to it.
- **Honest content.** Everything protocol-shaped in a demo panel is real spec data: real NUT examples, a decodable token, request/response bodies verbatim from the NUTs. Mock UI, real protocol.
- **QR codes never theme-flip.** Modules stay black on a literal-white quiet-zone tile in both schemes — inverted QRs fail scanners, and a scannable code is the point.

## 6. Do's and Don'ts

### Do

- **Do** carry the No-Colour Rule. Greys may shift by lightness, never by hue.
- **Do** set the hero headline in Display (GT-Standard 600, ≥3.75rem, line-height 0.95). The headline earns the page.
- **Do** keep body copy at 65–75ch max width. Long reads are an editorial feature, not an accident.
- **Do** use Geist Pixel Square only for protocol notation (amounts, ids, version strings). It is signal, not style.
- **Do** name implementations by name. Cashu is a directory; wallets and mints appear as plain wordmarks, no logos required at first pass.
- **Do** treat 1px Hair lines as the only structural divider. Sections separate by space first, hairline second.

### Don't

- **Don't** introduce chromatic accent. Generic crypto landing pages are the anti-reference — neon gradients on black, gradient text, animated 3D coins. Never on cashu.space.
- **Don't** add Web3 / DeFi tropes: pastel gradients, blob shapes, decorative network animations that misrepresent how the protocol works (e.g. mints "talking" to mints, which Cashu doesn't do). Motion is permitted only under the Honest-Network Rule — see §4.
- **Don't** dress up privacy. No locks, no shields, no padlocks, no ALL-CAPS "YOUR DATA, SECURED™" copy. Privacy is a property of the protocol, stated plainly.
- **Don't** use `box-shadow` on any container except `.btn-primary` / `.btn-secondary` / `.btn-primary--on-ink`. Buttons are the system's only lifted surface — every other container is flat. No drop shadow, no inner shadow, no coloured glow anywhere else.
- **Don't** use `border-left` / `border-right` >1px as a coloured stripe on cards or callouts. Side-stripes are forbidden in impeccable's universal bans and doubly forbidden here.
- **Don't** use `background-clip: text` with a gradient (gradient text). One solid colour, emphasis by weight or size.
- **Don't** introduce a third typeface. Three families exist (GT-Standard, Geist Mono, Geist Pixel Square) and each has one job.
- **Don't** use Geist Pixel Square as a section eyebrow, RFC-style metadata label, or link affordance. The pixel face marks protocol artefacts inside prose; everywhere else it reads as decoration. Section eyebrows in general are out — sections separate by space and headline, not by labelled introductions.
- **Don't** centre body copy. Long-form reading sets flush left, ragged right.
- **Don't** use stock photography of smiling teams, abstract blockchain visuals, or any hero treatment that could appear unchanged on a fintech site.
- **Don't** ship Chalk placeholder surfaces in final layouts. They are scaffolding only.
