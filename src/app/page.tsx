import Link from "next/link";
import HeroCommand from "@/components/hero-command";
import HiddenBill from "@/components/hidden-bill";
import ImplementationsGrid from "@/components/implementations-grid";
import ReferenceImplementations from "@/components/reference-implementations";
import Reveal from "@/components/reveal";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import StatementWithMedia from "@/components/statement-with-media";
import TabbedFeature from "@/components/tabbed-feature";
import TapToPay from "@/components/tap-to-pay";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white text-black">
      <SiteHeader />

      {/* Hero — warp-style opener. Row A: editorial wordmark + Display
          headline on the left, lead paragraph bottom-right. Row B: a CTA
          row (primary chip · copyable bearer-token field · quiet spec
          link). Row C: the blinded-denomination shader in a large sharp
          grey specimen panel — warp's screenshot slot, kept monochrome. */}
      <section id="main-content" className="hero-spec">
        <div className="hero-spec__inner page-shell">
          <div className="hero-spec__top">
            <div className="hero-spec__content">
              <Reveal immediate delay={120}>
                <p className="hero-spec__eyebrow">CASHU</p>
              </Reveal>
              <Reveal immediate delay={260}>
                <h1 className="hero-spec__headline">Open source electronic cash.</h1>
              </Reveal>
            </div>
            <Reveal immediate delay={380}>
              <p className="hero-spec__body">
                Instant, bearer, peer-to-peer. A protocol for digital cash
                backed by Lightning, with blind-signed tokens you can hold
                in any wallet.
              </p>
            </Reveal>
          </div>

          <Reveal immediate delay={480}>
            <div className="hero-spec__cta">
              <Link href="/wallets" className="btn-primary">
                <span>Get a wallet</span>
              </Link>
              <HeroCommand />
              <a
                href="https://docs.cashu.space/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-spec__spec-link focus-ring"
              >
                Read the spec
              </a>
            </div>
          </Reveal>

          {/* A dithered banknote, almost entirely redacted by halftone; a
              narrow vertical reveal slot drifts across it exposing fragments
              at a time. Privacy as the steady state, revelation as the rare
              event. Cursor proximity opens a soft circular reveal. */}
          <Reveal immediate delay={560} variant="fade" slow>
            <div className="hero-spec__frame">
              <HiddenBill />
            </div>
          </Reveal>
        </div>
      </section>

      <TabbedFeature />
      <TapToPay />
      <Testimonials />
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
