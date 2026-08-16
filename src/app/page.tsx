import Link from "next/link";
import HeroCipher from "@/components/hero-cipher";
import InThePress from "@/components/in-the-press";
import ProtocolParts from "@/components/protocol-parts";
import ReferenceImplementations from "@/components/reference-implementations";
import Reveal from "@/components/reveal";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-paper text-ink">
      <SiteHeader />

      {/* The homepage was the one route with no <main>: /wallets and the 404
          both had one, and the skip link here landed on a <section> inside no
          region at all — so a screen-reader visitor navigating by landmark
          had no way to skip the masthead on the page they spend the most time
          on. The element carries the flex column so .hero-spec keeps sizing
          off its own min-height, and the footer stays outside it, where a
          contentinfo landmark belongs. */}
      <main id="main-content" tabIndex={-1} className="flex flex-col flex-1">

        {/* Hero — a spec title page. Single column, centred on purpose (the
            site's one departure from left-aligned editorial; see the
            Centred-Hero Exception, DESIGN.md §4), and centred *in the section*
            too, so the air distributes above and below the title block rather
            than pooling into a void beneath it.

            THE HERO HAS NO GROUND, and that is the design. It carried a
            full-bleed figure for months — an ASCII field, then a wide dot
            figure from thinking-orbs — and the dot figure was deleted
            2026-08-16 on the user's direction for reading as generic: a blob,
            which is PRODUCT.md's own second anti-reference, depicting nothing,
            looping forever with no cause. See the Set-Once Rule, DESIGN.md §4,
            before putting anything back here. If something does come back, the
            bar is that it depicts real protocol structure — not that it looks
            good behind the type.

            The whole of the motion is the arrival: the hairline draws across
            the fold (globals.css, `hero-rule-draw`), "ecash" resolves out of
            hex, and the headline, deck and CTAs settle on the existing staged
            Reveal. By ~1.1s nothing on the page is moving, and nothing moves
            again. */}
        <section className="hero-spec">
          <div className="hero-spec__inner page-shell">
            <div className="hero-spec__content">
              <Reveal immediate delay={120}>
                {/* The break is authored, not left to the wrapper. DESIGN.md
                    §3: the line break in Display copy is part of the
                    composition, not an accident of viewport — and it was an
                    accident of viewport, because `text-wrap: balance` picked
                    it. Balance equalises line lengths, so it stranded FOR at
                    the end of line two: OPEN SOURCE / ECASH FOR / BITCOIN.

                    THREE LINES IS THE COMPOSITION, and the two-line break
                    §3 used to claim is arithmetically impossible. Measured at
                    the top of the Display clamp (144px) against the 1440px
                    cap: OPEN SOURCE ECASH is 1513px and ECASH FOR BITCOIN. is
                    1446px, so both halves of both possible splits overflow —
                    one of them by 6px. Nothing here can fix that. Widening
                    the cap does not help at 1600, where the viewport binds
                    before the cap does; and shrinking the type would
                    reintroduce the bespoke homepage display step §3 retired
                    on 2026-08-14 for letting a secondary route out-shout the
                    front door. The only lever left is the copy, which is the
                    user's, not ours — §3 says as much ("if the hero copy
                    grows too long for Display, shorten the copy").

                    So the rag is deliberate: long, short, medium, centred,
                    reading as three phrases. `ecash` takes the short line
                    because it is the word HeroCipher resolves out of hex on
                    arrival — the one thing in the hero that moves is now the
                    line the composition centres on. */}
                <h1 className="hero-spec__headline">
                  <span className="hero-spec__line">Open source</span>{" "}
                  <span className="hero-spec__line">
                    <HeroCipher>ecash</HeroCipher>
                  </span>{" "}
                  <span className="hero-spec__line">for bitcoin.</span>
                </h1>
              </Reveal>
              {/* The deck stands alone. The body sentence explaining the
                  blind-signature mechanism was cut 2026-08-14 on the user's
                  direction, on the grounds that the field's morph depicted the
                  round trip so the copy needn't restate it.

                  That reason is void as of 2026-08-16 — the field is gone and
                  nothing on the homepage depicts the mechanism now. The cut
                  still stands, because the user directed it and because a
                  three-line hero is not the fix. But it is now a live gap
                  rather than a settled one: if the mechanism comes back it
                  should come back as a figure (DESIGN.md §4, the Honest-Network
                  Rule), not as a paragraph bolted in here. Don't refill this
                  slot with prose. */}
              <Reveal immediate delay={240}>
                <p className="hero-spec__deck">Instant, bearer, peer-to-peer.</p>
              </Reveal>
              <Reveal immediate delay={360}>
                <div className="hero-spec__cta">
                  <Link href="/wallets" className="btn-primary">
                    <span>Get a wallet</span>
                  </Link>
                  <a
                    href="https://docs.cashu.space/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <span>Read the spec</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* One section now carries what three used to: the four parts, the
            properties of each, and the figure work. The tabbed feature
            scroller, the tap-to-pay video band, and the properties bento were
            all removed 2026-08-16 on the user's direction — see
            protocol-parts.tsx. */}
        <div id="why-cashu">
          <ProtocolParts />
        </div>
        {/* The nav's "Implementations" label must land on the registry that
            names them. */}
        <div id="implementations">
          <ReferenceImplementations />
        </div>
        <InThePress />
      </main>

      <SiteFooter />
    </div>
  );
}
