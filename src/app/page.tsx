import Link from "next/link";
import HeroOrb from "@/components/hero-orb";
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

      {/* Hero — single-column spec opener, centred on purpose (the site's one
          departure from left-aligned editorial; see the Centred-Hero
          Exception, DESIGN.md §4). A wide dot figure fills the whole section
          as its ground — the thinking-orbs `listening` mode stretched into an
          ellipse roughly twice as wide as it is tall, sitting as a band across
          the bottom third and cropping past the closing hairline. The
          headline, deck, and paired CTAs sit centred above it on open paper,
          the headline escaping the page shell. The figure's mask is a vertical
          fade alone, meeting the band's top arc so it has a soft upper edge.
          The staged reveal runs headline, then body, then CTA, with the figure
          fading in alongside.

          A Bitcoin mark used to surface out of the field on a 72s cycle; it
          was removed 2026-08-16 on the user's direction. The ground depicts
          nothing at all now — see the Honest-Network Rule, DESIGN.md §4,
          before putting any figure back into it. */}
      <section id="main-content" className="hero-spec">
        <Reveal
          immediate
          variant="fade"
          slow
          delay={360}
          className="hero-spec__field"
        >
          <HeroOrb />
        </Reveal>

        <div className="hero-spec__inner page-shell">
          <div className="hero-spec__content">
            <Reveal immediate delay={120}>
              <h1 className="hero-spec__headline">
                Open source ecash for bitcoin.
              </h1>
            </Reveal>
            {/* The deck stands alone. The body sentence explaining the
                blind-signature mechanism was cut 2026-08-14 on the user's
                direction — the field's morph depicts the round trip, so the
                copy doesn't restate it. Don't refill this slot. */}
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
      <SiteFooter />
    </div>
  );
}
