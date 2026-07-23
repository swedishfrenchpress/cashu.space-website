---
target: my website (homepage)
total_score: 32
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-07-23T10-24-08Z
slug: src-app-page-tsx
---
# Critique — cashu.space homepage (src/app/page.tsx)

Method: dual-agent (A: design-review sub-agent · B: detector sub-agent). Inspected live at http://localhost:3001 (note: :3000 serves an unrelated project), desktop viewport, dark + light themes; mobile assessed from responsive CSS (window resize unavailable). Detector: CLI scan over src/app + src/components (exit 2, 25 findings) plus in-page overlay injection on / and /wallets.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Scroll-spy, aria-current/pressed, disabled pager states present — but the press pager fails silently |
| 2 | Match System / Real World | 4 | Solid — bitcoiner vocabulary, concrete claims |
| 3 | User Control and Freedom | 3 | No way to pause the autoplay video short of OS reduced-motion |
| 4 | Consistency and Standards | 2 | "Read the spec" resolves to two different URLs; GitHub styled as primary breaches the site's own Two-CTA Rule |
| 5 | Error Prevention | 3 | QR-never-inverts, poster fallback, honest disclaimer |
| 6 | Recognition Rather Than Recall | 4 | Numbered pillar nav stays visible; role tags inline |
| 7 | Flexibility and Efficiency | 3 | g h/w/s/i chords + ? sheet exist — discoverable only via ? |
| 8 | Aesthetic and Minimalist Design | 4 | Minor duplication between Tokens pillar and Bearer-token bento card |
| 9 | Error Recovery | 2 | Press pager's failure state is invisible — Next clips a card edge, nothing arrives |
| 10 | Help and Documentation | 4 | Whole page routes to primary sources; keymap sheet; Ask-AI prefills |
| **Total** | | **32/40** | **Good** |

All 10 heuristics applied (7 and 10 genuinely apply: keyboard chords exist and documentation-routing is the product's stated purpose).

## Design Specificity Verdict

**LLM assessment:** Authored, not interchangeable. Specificity is earned through honest artifacts: a real decodable TokenV4 behind the QR, verbatim NUT-23/NUT-11 bodies, real @cashu/cashu-ts code, real wallet screenshots, and a closing disclaimer ("a claim on that mint, not a deposit") no SaaS would write. Two caveats: the structural skeleton is recognizably warp.dev-derived (a chosen reference), and the four landscape demo backgrounds are category-generic outdoor stock — the specificity lives in the foregrounds, not the grounds.

**Deterministic scan:** 25 CLI findings across 3 rules. 21 design-system-font-size advisories (16 in globals.css, 4 in protocol-properties.tsx, 1 in stats-band.tsx) — but 0.8125rem (9 hits) is the button size DESIGN.md §5 itself codifies (ramp/spec drift, not a violation), and protocol-properties.tsx + stats-band.tsx are dead code imported nowhere. All 3 broken-image findings are false positives (the detector matched `<img>` inside comments). The codex-grid-background advisory points at the 44px graph paper that DESIGN.md §5 sanctions as the demo-panel signature. Browser detector: 8 anti-patterns on / — the button low-contrast (1.1:1) and thin-border-wide-shadow hits are false positives (detector fell through transparent backgrounds; buttons are the sanctioned lifted surface), but the footer-disclaimer line-length (~136ch vs the 65–75ch rule) and 3 press-card heading-rhythm findings are genuine. On /wallets: the implementations h2 overflows its box by 48px (genuine); a #d97757 body glow is the Claude-in-Chrome extension indicator, not site CSS.

**Visual overlays:** Injection succeeded on both pages via the live overlay server (since stopped). On /wallets an amber banner was visible; on / the overlays resolved to hidden. A "[Human]"-labeled tab at localhost:3001 may still be open in Chrome.

## Overall Impression

This is a genuinely strong page — 32/40 with production-grade accessibility craft and an identity a competitor can't copy without doing the work. The gap between ambition and execution is precision: a spec-dressed page that miscounts its own implementations, ships a spec-banned padlock, and lets its one interactive carousel fail silently is spending its RFC register without fully earning it. The single biggest opportunity: make the page as machine-checked as its TokenV4.

## What's Working

1. **Honest-artifact specificity.** Real spec data everywhere (valid TokenV4, real NUT bodies, real cashu-ts calls) rather than lorem-JSON — for the mid-technical audience this IS the trust signal.
2. **The UI/API flip as pedagogy.** Each pillar shows the product surface and the wire format behind it; selection survives theme flips; inactive view is aria-hidden + inert. The Open Specification thesis made interactive.
3. **Invisible craft depth.** Reduced-motion static frames, offscreen canvas pause, skip link, focus rings that work on ink, QR modules that never theme-flip, correct mobile-nav focus management. Production-grade accessibility for a marketing page.

## Priority Issues

1. **[P1] Press pager is functionally broken at desktop.** Clicking Next moves the track ~4px and clips the first card; the fourth story (Bitcoin Magazine) is unreachable by mouse. Cause: `scroll-snap-type: x mandatory` + `scroll-behavior: smooth` on `.press-track` fights the smooth `scrollBy` in `in-the-press.tsx` `step()`; the snap resolves back near the origin. The detector's 3 heading-rhythm findings sit on these same cards. Fix: drop `scroll-behavior: smooth` from the CSS and `scrollTo` an explicit snap-aligned target, or set `scroll-snap-type: none` during programmatic scrolls. Files: src/components/in-the-press.tsx, src/app/globals.css (~1958). Suggested: /impeccable polish.
2. **[P1] A literal padlock icon sits on the "Unlinkable payments" card** (LockFigure, src/components/implementations-grid.tsx:55–71). Both specs ban this by name (PRODUCT.md anti-reference "privacy theater"; DESIGN.md "No locks, no shields, no padlocks"). The card's copy is compliant; the figure contradicts it. Fix: replace with a figure of the mechanism — blind-signature envelope/mask, or two unlinked nodes. Suggested: /impeccable polish.
3. **[P2] The Two-CTA Rule is breached by GitHub.** "View on GitHub" renders as btn-primary in the header (site-header.tsx:35) and btn-primary--on-ink in reference-implementations.tsx:295 — four primary-styled CTAs on one page vs the codified two jobs (get a wallet, read the spec). Fix: demote both to secondary. Suggested: /impeccable polish.
4. **[P2] Spec-register precision failures.** (a) "Six implementations, one spec." heads a list of 7 repos of which 2 are spec/resources — five implementations; no reconciliation reaches six. (b) "Read the spec" resolves to docs.cashu.space in the hero and github.com/cashubtc/nuts in the footer. On a page whose aesthetic claims RFC-grade precision, numeric and referential slippage is disproportionately expensive. Fix: recount or reword; pick one canonical spec URL per label. Suggested: /impeccable clarify.
5. **[P3] Colour-doctrine drift.** DESIGN.md names one permitted colour image (hero-handoff.jpg — no longer on the page) and says landscapes desaturate. Shipped: four full-colour landscapes, a colour video whose green POS screen bleeds through the navbar's saturate(180%) glass, colour Python/TS marks, colour AI logos, a green "+$89,999", plus a "4 more on GitHub →" text-arrow of the kind purged from /wallets. Each exception is argued in code comments; collectively the No-Colour Rule is folklore. The detector's footer-disclaimer line-length hit (~136ch vs 65–75ch) is the same pattern: codified rule, uncodified exception. Fix: either amend DESIGN.md to a named, scoped "depicted-world exception" or re-grayscale the grounds and drop saturate() from the glass. Suggested: /impeccable document (codify) or /impeccable polish (revert).

## Persona Red Flags

**Jordan (first-timer):** Hero lead assumes cryptography vocabulary ("blind-signed tokens"); "mint" is never defined as "a server that issues ecash against bitcoin"; the page never answers "what is ecash?" in one plain sentence — closest is the Bearer-token card, four screens down. Acceptable for the mid-technical target audience, but Jordan bounces at the hero.

**Casey (distracted mobile):** Responsive CSS is sound (hamburger focus management, touch snap keeps press cards swipeable despite the pager bug). Flags: 58ch code lines rely on inner overflow-x scroll at 390px; staged Reveal delays (120–480ms cascades) risk blank-looking first paints on slow radios — blank frames observed even on localhost; the sticky aside pushes four-parts content a full screen down.

**Riley (stress tester):** Pager bug; "six implementations" arithmetic; dual "Read the spec" destinations; one unreproduced theme-persistence anomaly (localStorage empty after tab round-trip; direct re-test passed — likely environmental, worth monitoring); stats-band.tsx and protocol-properties.tsx are dead code imported nowhere (and carry 5 of the detector's 21 font-size advisories).

**Marta (sovereign bitcoiner vetting seriousness — derived from PRODUCT.md):** The padlock is the exact privacy-theater tell she's trained to distrust. "Backed by bitcoin." as the Mints headline is the phrase every fractional-reserve custodian uses — the honest caption is beneath it, and the sentence that would win her ("a claim on that mint, not a deposit") is the last thing on the page while the mint decision point exports her to bitcoinmints.com mid-page. Fiat-first framing ("+$89,999", "$5.00") in the wallet screenshot reads crypto-app, not bitcoin-native.

## Minor Observations

- Hero headline fully compliant with the Display hard rule; the deliberate line break lands at all inspected widths.
- Box-shadow audit clean (buttons only); glass only on the navbar shell. DESIGN.md §5 still describes the mock-glass demo card that real screenshots replaced — doc drift, not a violation.
- /wallets implementations h2 overflows its box by 48px (detector-caught; worth a look next time /wallets is open).
- Footer disclaimer runs ~136ch/line vs the codified 65–75ch body rule (detector-caught).
- `<title>` is just "Cashu" — a descriptor would serve bookmarks/SEO on a canonical page.
- Bearer-token bento card at lg floats its bill figure in generous emptiness — intentional air, borderline under-filled.
- The footer metadata strip echoing the spec pane's two-cell header is a lovely register rhyme; the console signature is exactly what this audience screenshots.
- Press images desaturate programmatically — the one place the No-Colour Rule is enforced in code.

## Questions to Consider

1. If the No-Colour Rule now carries five negotiated exceptions living only in code comments, is it still doctrine — and what would the four-parts section actually lose if its landscapes went grayscale?
2. Should the site's most honest sentence ("a claim on that mint, not a deposit") live where its highest-stakes decision happens — at the mint hand-off — instead of footer-only?
3. When a spec-dressed page says "six implementations" over a list of five, does the visitor discount the register as costume? Would the page be stronger if every number on it were machine-checked the way its TokenV4 is?
