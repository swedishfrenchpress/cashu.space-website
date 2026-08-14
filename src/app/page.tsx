import Link from "next/link";
import AsciiField from "@/components/ascii-field";
import ImplementationsGrid from "@/components/implementations-grid";
import InThePress from "@/components/in-the-press";
import ReferenceImplementations from "@/components/reference-implementations";
import Reveal from "@/components/reveal";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import TabbedFeature from "@/components/tabbed-feature";
import TapToPay from "@/components/tap-to-pay";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-paper text-ink">
      <SiteHeader />

      {/* Hero — single-column spec opener. A live ASCII field fills the whole
          section as its ground, morphing slowly between the terrain, the
          vault door, and the blind-signature round trip; the headline, lead,
          and paired CTAs sit left-aligned on top of it inside the page shell.
          The field's mask keeps it near-empty behind the copy and densest
          toward the bottom-right, so "title at the top, horizon at the
          bottom" survives the field going full-bleed. The staged reveal runs
          headline → body → CTA, with the field fading in last. */}
      <section id="main-content" className="hero-spec">
        <Reveal
          immediate
          variant="fade"
          slow
          delay={480}
          className="hero-spec__field"
        >
          <AsciiField />
        </Reveal>

        <div className="hero-spec__inner page-shell">
          <div className="hero-spec__content">
            <Reveal immediate delay={120}>
    <h1 className="hero-spec__headline">Open source ecash for bitcoin.</h1>
            </Reveal>
            {/* Deck then body, grouped so they share a tight gap and read as
                one unit under the headline. The deck carries the claim; the
                body carries the mechanism that makes the claim true. The old
                single paragraph put the three properties in a subordinate
                line above a sentence that restated the headline. */}
            <Reveal immediate delay={240}>
              <div className="hero-spec__lead">
                <p className="hero-spec__deck">Instant, bearer, peer-to-peer.</p>
                <p className="hero-spec__body">
                  Every Cashu token is blind-signed, so the mint cannot link
                  the one you spend to the one it signed.
                </p>
              </div>
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

      <div id="why-cashu">
        <TabbedFeature />
      </div>
      <TapToPay />
      <ImplementationsGrid />
      {/* The nav's "Implementations" label must land on the registry that
          names them, not on the properties bento two sections above it. */}
      <div id="implementations">
        <ReferenceImplementations />
      </div>
      <InThePress />
      <SiteFooter />
    </div>
  );
}
