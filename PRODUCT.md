# Product

## Register

brand

## Users

Bitcoiners curious about ecash — people already inside the Bitcoin world who've heard about Chaumian ecash (Cashu, Fedimint, eCash in general) and want to understand what Cashu is, try a wallet, or point a friend at a clear explanation. Mid-technical: they know what a Lightning invoice is, they've installed at least one self-custodial wallet, they're sovereign-minded about money.

They visit cashu.space to (1) understand the protocol in under a minute, (2) find a trusted wallet to download, (3) decide whether to trust a mint, and (4) link the spec to other developers.

## Product Purpose

cashu.space is the canonical landing page for Cashu, an open Chaumian-ecash protocol for Bitcoin. It exists to introduce Cashu to bitcoiners, route them to wallets and mints, and signal — through tone and craft — that this is a serious open protocol, not a coin, not a company, not a crypto product.

Success: a visitor leaves having (a) installed a wallet, (b) bookmarked the spec, or (c) understood Cashu well enough to explain it to one other person. No conversion funnels, no sign-ups, no email capture.

## Brand Personality

Editorial-minimal. Cinematic whitespace, huge display type, restrained palette. Confident through silence — the site says less than a SaaS landing page would, and trusts the typography to carry weight.

Three words: **sovereign, considered, plain.**

Voice: declarative, concrete, never marketing-coded. Short sentences. No hype verbs ("revolutionize", "unlock", "empower"). No "the future of money." Says what Cashu *is*, names what it *does*, credits the people building it.

## Anti-references

- **Generic crypto landing pages** — neon gradients on black, animated 3D coins, vague "the future of finance" copy, gradient text. The training-data reflex for anything bitcoin-adjacent. Cashu is not a coin.
- **Web3 / DeFi aesthetics (Uniswap, OpenSea)** — pastel gradients, blob shapes, decorative network animations that misrepresent how the protocol works. Cashu is bitcoin-native and deliberately not crypto-coded. Looking like Web3 would actively mislead the audience. (Note: motion is permitted when it depicts real protocol structure — see Design Principle 6 below.)
- **Privacy theater** — locks, shields, padlocks, ALL-CAPS warnings, fear-driven copy ("YOUR DATA, SECURED™"). Cashu is private as a property of the protocol, not as a sales pitch. Never sell privacy with fear.

## Design Principles

1. **Confidence through restraint.** The brand expresses sovereignty by what it leaves out. No neon, no shields, no gradients on text, no shadowed cards. Whitespace is the loudest element on the page.
2. **Bitcoin-native, not crypto-coded.** Visual language stays orthogonal to Web3 / DeFi tropes. The site should sit comfortably next to mempool.space and bitcoin.org, not next to Uniswap or any L2 launchpad.
3. **Privacy as fact, not pitch.** Mention privacy properties plainly when the structure calls for them. Never with fear iconography, never as the headline emotion. The protocol's properties are facts; the site states them and moves on.
4. **Editorial pacing.** Massive display type at the hero, generous whitespace between sections, long single-column reads. The hero earns its size; nothing competes with it. Sections breathe.
5. **Credit the protocol, not the product.** Link to the spec. Name the implementations. List the wallets and mints by name. Cashu is a community of builders — the site should feel like a directory and manifesto, not a SaaS product page with a single hero CTA.
6. **Honest motion.** Motion and network visuals are permitted when they depict real protocol structure — Lightning Network bridges between mints, peer-to-peer token transfer between users. They are never decorative or speculative. If a visualisation suggests connections that don't exist in the protocol (e.g. mints "talking" to each other, which Cashu doesn't do), it's the wrong visual.

## Accessibility & Inclusion

- Target WCAG 2.2 AA on color contrast, focus visibility, and keyboard navigation.
- Mostly monochrome palette means color is rarely load-bearing for meaning; when color is used (status indicators, links), pair it with weight, underline, or position so the meaning survives color-blindness.
- Respect `prefers-reduced-motion` — motion is decorative here, never required to understand a section.
- Body type minimum ~15px; line length capped at 65–75ch for readability.
- All imagery (mint screenshots, wallet shots) ships with descriptive alt text — these are the most informationally dense pieces on the page for screen-reader users.
