import BlindedGrid from "@/components/blinded-grid";
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
        <div className="hero-spec__inner page-shell">
          <div className="hero-spec__content">
            <Reveal immediate delay={120}>
              <p className="hero-spec__eyebrow">CASHU</p>
            </Reveal>
            <Reveal immediate delay={260}>
              <h1 className="hero-spec__headline">Open source electronic cash.</h1>
            </Reveal>
            <Reveal immediate delay={380}>
              <p className="hero-spec__body">
                Instant, bearer, peer-to-peer. A protocol for digital cash
                backed by Lightning, with blind-signed tokens you can hold
                in any wallet.
              </p>
            </Reveal>
          </div>
          {/* Right column. The blinded-denomination grid — a Three.js
              dither figure diagramming Cashu's blind-signature mechanism.
              Cells of bit-pattern data cycle into halftone occlusion;
              cursor proximity briefly unblinds nearby cells. */}
          <BlindedGrid />
        </div>
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
