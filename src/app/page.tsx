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
                <h1 className="hero-spec__headline">
                  Open source <HeroCipher>ecash</HeroCipher> for bitcoin.
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
