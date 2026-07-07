import Link from "next/link";
import HeroCommand from "@/components/hero-command";
import ImplementationsGrid from "@/components/implementations-grid";
import ReferenceImplementations from "@/components/reference-implementations";
import Reveal from "@/components/reveal";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
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
          link). */}
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

        </div>
      </section>

      <div id="why-cashu">
        <TabbedFeature />
      </div>
      <TapToPay />
      <Testimonials />
      <div id="implementations">
        <ImplementationsGrid />
      </div>
      <ReferenceImplementations />
      <SiteFooter />
    </div>
  );
}
