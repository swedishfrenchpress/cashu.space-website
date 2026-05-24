import ImplementationsGrid from "@/components/implementations-grid";
import ReferenceImplementations from "@/components/reference-implementations";
import Reveal from "@/components/reveal";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import StatementWithMedia from "@/components/statement-with-media";
import TabbedFeature from "@/components/tabbed-feature";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white text-black">
      <SiteHeader />

      {/* Hero — "Spec opener". RFC-style asymmetric layout: editorial
          eyebrow / Display headline / lead paragraph / paired CTAs flush
          to a left column; right column reserves space for a pixelated
          protocol visualization (designed later). Faint vertical column
          ruler in the background and a hairline at the section base
          carry the published-spec register the North Star calls for. */}
      <section id="main-content" className="hero-spec">
        <div className="hero-spec__columns" aria-hidden="true" />
        <div className="hero-spec__inner page-shell">
          <div className="hero-spec__content">
            <Reveal immediate delay={120}>
              <p className="hero-spec__eyebrow">
                An open ecash protocol for bitcoin.
                <br />
                Spec, mints, and wallets — all open source. →
              </p>
            </Reveal>
            <Reveal immediate delay={260}>
              <h1 className="hero-spec__headline">Ecash for bitcoin.</h1>
            </Reveal>
            <Reveal immediate delay={380}>
              <p className="hero-spec__body">
                Instant, bearer, peer-to-peer. A protocol for digital cash
                backed by Lightning, with blind-signed tokens you can hold
                in any wallet.
              </p>
            </Reveal>
            <Reveal immediate delay={500}>
              <div className="hero-spec__cta-row">
                <a href="/wallets" className="btn-primary">
                  Get a wallet
                </a>
                <a
                  href="https://docs.cashu.space/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Read the spec
                </a>
              </div>
            </Reveal>
          </div>
          {/* Right column. Reserved for the pixelated protocol visual.
              Empty placeholder for now — sized so the asymmetric grid
              reads correctly even before the art lands. */}
          <div className="hero-spec__art" aria-hidden="true" />
        </div>
        <div className="hero-spec__rule" aria-hidden="true" />
      </section>

      <TabbedFeature />
      <div id="why-cashu">
        <StatementWithMedia />
      </div>
      <div id="implementations">
        <ImplementationsGrid />
      </div>
      <ReferenceImplementations />
      <SiteFooter />
    </div>
  );
}
