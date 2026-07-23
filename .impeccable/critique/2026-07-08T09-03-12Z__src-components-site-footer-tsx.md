---
target: site footer (Twilight Stack)
total_score: 34
p0_count: 0
p1_count: 1
timestamp: 2026-07-08T09-03-12Z
slug: src-components-site-footer-tsx
---
⚠️ DEGRADED: single-context (sub-agents unavailable — one failed to launch on classifier outage, the other terminated on session limit resetting 3am Europe/Stockholm). Detector + browser evidence gathered directly in the parent context.

# Critique — Site footer ("The Twilight Stack")

Target: `src/components/site-footer.tsx` + footer CSS in `src/app/globals.css` (~L508+). Register: brand (cashu.space, published-RFC doctrine). Scored post-remediation; the P1 below was found and fixed during this pass.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Static surface; hover + focus feedback present. Largely n/a. |
| 2 | Match System / Real World | 4 | Plain language throughout ("Read the spec", real repo path). On-voice. |
| 3 | User Control and Freedom | 3 | External links `rel=noopener`, new tab; no traps. n/a-ish. |
| 4 | Consistency and Standards | 4 | Uses `btn-primary--on-ink`, `t-mono`, palette tokens, on-ink focus variant. Fully consistent. |
| 5 | Error Prevention | 3 | No forms / destructive actions. n/a. |
| 6 | Recognition Rather Than Recall | 4 | All links visible + `sr-only` labelled; nothing hidden. |
| 7 | Flexibility and Efficiency | 3 | Keyboard-reachable; a footer needs no accelerators. |
| 8 | Aesthetic and Minimalist Design | 4 | The Twilight Stack is restrained and purposeful; every element earns its place. |
| 9 | Error Recovery | 3 | No error states. n/a. |
| 10 | Help and Documentation | 3 | The footer *is* the spec pointer — "Read the spec", Ask-AI, plain trust disclaimer. |
| **Total** | | **34/40** | **Good (high band)** |

## Anti-Patterns Verdict

**Does this look AI-generated?** No. Within the committed monochrome-RFC system this reads as considered, not generic. The Twilight Stack is a genuine signature move (monochrome bloom + grain, Display wordmark, mono metadata strip) rather than the default "logo · links · copyright" strip. Crucially it avoids every slop tell the project bans: no chromatic accent, no container shadow, no gradient text, no eyebrow/kicker scaffolding, no third typeface. Mono here is legitimate protocol register, not mono-as-costume.

**Deterministic scan** (`detect.mjs`): 1 finding — `broken-image` at `site-footer.tsx:126`. **False positive**: the `<img src={ai.icon}>` uses a dynamic prop resolving to real static assets (`public/ai/{openai,claude,gemini}.svg`, all confirmed present and visually rendering). The static scanner can't follow the dynamic src. No action.

**Browser evidence**: footer background pure `#000`; the black `ReferenceImplementations` section above meets it with zero border (both `#000`) — seam is genuinely continuous. Bloom `::before` (radial 50% 110%) and grain `::after` (feTurbulence, opacity 0.04, overlay) both present. All three AI logos visible on black (OpenAI inverted to white; Claude/Gemini keep brand colour). No horizontal overflow; layout wraps cleanly at narrow width. No animation → no `prefers-reduced-motion` gap.

## What's Working

1. **It finally has a compositional peak.** The Display "Cashu" wordmark gives the footer the type-does-the-lifting close the rest of the site has and the old strip lacked. Peak-end rule: the page now ends on a confident note.
2. **The seam is healed.** The black section above flows into the twilight band as one continuous dark close — no more black→white slam.
3. **On-doctrine "bold."** Every device stays inside the grey ramp and the flat system; the drama comes from scale + the sanctioned bloom, not from anything the doctrine bans.

## Priority Issues (all remediated this pass)

- **[P1] Invisible keyboard focus on social + AI links.** Both used `.focus-ring` (a 2px `#000` outline) — invisible on the now-black footer. WCAG 2.4.7 (Focus Visible) failure for keyboard users. **Fixed:** switched to `.focus-ring--on-ink` (2px `#fff`); verified `:focus-visible` now renders a white ring.
- **[P2] Metastrip meta cell missed AA.** `.footer-metastrip__meta` at Mist `#71717a` on `#000` ≈ 4.3:1, under the 4.5:1 floor for 14px text. **Fixed:** bumped to Fog `#a1a1aa` (≈8.2:1).
- **[P2] Disclaimer measure too wide.** `max-width:none` let a real reading paragraph run ~140ch, violating the site's own 65–75ch rule (PRODUCT.md a11y). **Fixed:** capped to `72ch` + `text-wrap:pretty`.
- **[P3] Redundant licence.** Metastrip right cell "· MIT" duplicated "MIT Licensed" 20px below. **Fixed:** → "Chaumian ecash for Bitcoin".

## Persona Red Flags

- **Sam (accessibility):** the P1 focus failure would have blocked keyboard orientation entirely — now resolved (white ring visible on every footer link; CTA already had its on-ink outline). Remaining nit: social hit areas are 32×32 (below 44×44), and the AI links are ~14px marks — small for low-vision/motor users.
- **Casey (mobile):** hit-target size is the one open item — the Ask-AI logos in particular are tiny thumb targets. Layout itself wraps and stays within the viewport (no horizontal scroll).
- **Jordan (first-timer):** clear. "Read the spec" and "Ask AI about Cashu" are self-explanatory; the disclaimer states the trust model plainly without jargon.

## Minor Observations

- Social + AI tap targets are below the 44×44 guideline (pre-existing, deliberate compact footer). Enlarging the hit area with transparent padding would help mobile/low-motor users without changing the visual.
- The Ask-AI logos are the only chromatic pixels on the page (sanctioned third-party-logo exception) — acceptable, but worth keeping an eye on if the row ever grows.

## Questions to Consider

- Should the footer socials/AI adopt 44×44 hit areas, or is the compact density a deliberate choice for this surface?
- The metastrip is currently descriptive ("Chaumian ecash for Bitcoin"). Would a real protocol artefact (a NUT count or version, set in pixel notation) carry more RFC signal than prose?
