---
target: four-parts demo panels (UI/API toggle cards)
total_score: 29
p0_count: 1
p1_count: 1
timestamp: 2026-07-22T12-32-57Z
slug: src-components-tabbed-feature-tsx
---
Method: dual-agent (A: design review · B: detector/browser evidence)

# Critique: "The protocol, in four parts." demo panels (UI/API toggle cards)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Cropped filename strips hide what you're looking at; horizontal overflow invisible where scrollbars auto-hide |
| 2 | Match System / Real World | 3 | Real spec data is a strong match; NUT-numbers appear in the "friendly" Mints UI before panel 3 explains NUTs |
| 3 | User Control and Freedom | 3 | Toggle fully reversible, no scroll-jacking; 12s quote loop can't be paused |
| 4 | Consistency and Standards | 3 | Tight internal recipe, but "API" spans four genres; 1rem pixel spans jump inside 0.875rem mono lines |
| 5 | Error Prevention | 2 | Fixed 16:10 frame + fixed content guarantees clipping at common laptop widths |
| 6 | Recognition Rather Than Recall | 4 | Numbered sticky nav, visible states, consistent head…tail token truncation |
| 7 | Flexibility and Efficiency | 3 | Nav jump-links + keyboard work; no deep-link or API-default |
| 8 | Aesthetic and Minimalist Design | 2 | Doctrine intact but injured by scrollbar chrome, clipped strips, dead air around UI cards |
| 9 | Error Recovery | 3 | Nothing misleads on failure (demo surface) |
| 10 | Help and Documentation | 4 | Each panel routes to a real destination; the section is documentation-flavored |
| **Total** | | **29/40** | **Good — solid foundation, fit defects drag it down** |

## Anti-Patterns Verdict

**LLM assessment:** The styling system is not slop — every named tell is dodged (no badge chips, no text-arrows, no shadows, square control, bespoke verifiable content: a decodable TokenV4 whose QR, string, decoded proof, and amount all agree). Two things read machine-made: (a) three of four UI views are the identical key-value card floating dead-center on a near-empty ground — the "small card on big blank rectangle" AI-mockup composition, pending the real background art; (b) misfitting content in fixed frames (clipped strips, native scrollbars across dark panes, code under the toggle) — the most recognizable tell of untested generated UI. Verdict: "designed by someone with doctrine, shipped before QA" — not slop, but one QA pass away.

**Deterministic scan:** CLI detector clean (0 findings) on all four new component files. In-page scan found 5: 4× `nested-cards` on the code-pane header strips (one per panel) and 1× `line-length` on the footer disclaimer (out of scope, pre-existing). The nested-cards hits are judged false positives — the header strip is file-pane chrome matching the site's existing `Spec()` precedent, not a card-in-card — but they point at the same element Assessment A found clipped, which is the real defect.

**Visual overlays:** Injection succeeded and the detector ran in-page, but the overlay nodes computed `display:none` (0×0 rects) — no user-visible overlay is available. Findings were read reliably from the page's structured scan API instead.

## Overall Impression

The concept lands: mock product above, real protocol below, and the flip is the best beat on the page. Content strategy is genuinely exceptional — no other protocol site ships a scannable real token whose decoded proof matches the code pane. But the code panes physically don't fit their frames at common laptop widths, and that single fit defect undercuts the "considered, plain" promise exactly when the most skeptical visitor (a developer) looks closest.

## What's Working

1. **Primary-source content, verifiably real.** NUT-23 quote body, NUT-11 P2PK secret + witness, and a TokenV4 built from the NUT-00 vector where QR, serialized string, decoded proof, and 1-sat amount are all the same object. The "Open Specification" North Star executed as content, not just styling. (Wallets import verified against published npm: `@cashu/cashu-ts@4.7.2` exports `Wallet` — the snippet is runnable.)
2. **The two-grounds flip as rhetoric.** Theme-flipping Band for the mock UI vs always-dark 44px drafting grid for code makes the toggle mean something: mock product, real machine.
3. **Doctrine held under pressure.** No shadows, square segmented control on its own Card chip, borderless metadata tags, pixel face confined to machine data, `inert`/`aria-pressed`/reduced-motion handled.

## Priority Issues

**[P0] Code panes never fit the frame at real desktop widths.** Measured: all four `pre` blocks overflow horizontally (scrollWidth 502–527 vs clientWidth 488); Wallets (351px) and Mints (330px) panes exceed the ~253px available inside the 16:10 frame at a 1064px viewport, cropping the filename strip and pushing the last line under the toggle. The math doesn't recover until ~1330px viewports. **Fix (pick two):** cut samples to ≤8 lines; `leading-7`→`leading-6` in panes; shorten the UUID to `019e6d5a…`; let the frame grow (`aspect-ratio` as minimum via min-height); step pane mono to 13px; drop pixel spans in panes to 0.875rem (also fixes the widest line).

**[P1] The floating toggle collides with content.** Tokens UI card bottom overlapped by 25px; code-pane last lines and scrollbars sit under the toggle. Flex-centering overflows both ends when content exceeds the box, defeating the 64px clearance. **Fix:** `max-height: 100%; min-height: 0` on view children or `margin: auto` instead of `align-items: center`; shrink Tokens QR 190→160px.

**[P2] UI views read as placeholders in light theme.** Band (#fafafa) on Paper (#fff) is a 2% difference; each panel is a hairline rectangle with a small card adrift in nothing until the background art lands (`tab.image` is plumbed but rendered nowhere). **Fix:** land the art, or interim: light-register drafting grid (hairline graph paper on Chalk) so both views share the "specimen on grid" language.

**[P2] Content-freshness signals.** `Nutshell/0.15.0` is spec-verbatim (NUT-06 example) but reads years-stale to a 2026 bitcoiner; the PAID loop makes the same quote id visibly un-pay every 12s, brushing against the Honest-Network Rule. **Fix:** bump the version string to a current Nutshell release (keep the rest spec-verbatim); run the quote animation once (or twice) and settle on PAID.

**[P3] Toggle ergonomics + discoverability.** ~30px-tall buttons under the 44px touch minimum; nothing invites the flip — it reads as a state indicator. **Fix:** larger touch padding on coarse pointers; consider defaulting the Spec panel to API so the mechanism self-demonstrates.

## Persona Red Flags

- **Jordan (bitcoiner-curious first-timer):** The friendly Mints view leads with `Nutshell/0.15.0`, `NUT-04 · 05 · 07`, and an unexplained Quote lifecycle — the mock UI meant to humanize mints is itself written in protocol. Wallets and Tokens land immediately; Mints and Spec UI cards assume vocabulary the page hasn't taught yet.
- **Casey (distracted mobile):** Sub-44px toggle targets; code panes need ~1.7× horizontal panning with invisible iOS scrollbars, so clipped lines just look wrong. Likely outcome: never taps UI/API, experiences the section as four grey boxes.
- **Sovereign bitcoiner who distrusts marketing:** The scannable real token and verbatim NUT data earn genuine respect — then clipped code under scrollbar chrome and an un-paying quote hand back "demo theater" evidence. One QA pass from being the most convincing thing on the site.

## Minor Observations

- Mid-crossfade (42–48% keyframes) the UNPAID text and PAID chip are simultaneously semi-opaque — a muddy smudge frame.
- "1 SIGNATURE" sets an English word in pixel face; `SIG_INPUTS` is machine data, "SIGNATURE" is prose — use Label.
- Corner tags at Fog (#a1a1aa) on white ≈ 2.5:1 — sub-AA for meaningful metadata; zinc-500 comments on #18181b ≈ 4.0:1, borderline, and they carry real content.
- If horizontal overflow survives, style the scrollbar (thin, dark-track) — the white strip is the loudest element in a silent frame.
- `TABS[].image` is dead config until the art path is wired.
- Footer disclaimer line-length (~115ch) flagged by detector — pre-existing, outside this section.

## Questions to Consider

1. If the code never fits the frame at any shipping viewport, which is the doctrine — the 16:10 frame or the code? The frame is currently sacred and the protocol gets cropped; that's backwards for a site whose North Star is "the document."
2. Why does the mock UI get the default view on a site for people who trust code more than product shots? One panel defaulting to API (Spec) would self-demonstrate the toggle and lead with the strongest material.
3. Are three identical key-value cards earning the "UI" half before the art lands — or is the section stronger today as code panes plus the QR as the single physical artifact?
