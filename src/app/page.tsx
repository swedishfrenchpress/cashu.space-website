import Link from "next/link";
import ImplementationsGrid from "@/components/implementations-grid";
import ReferenceImplementations from "@/components/reference-implementations";
import Reveal from "@/components/reveal";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import TabbedFeature from "@/components/tabbed-feature";
import TapToPay from "@/components/tap-to-pay";
import Testimonials from "@/components/testimonials";
import TokenSpecimen from "@/components/token-specimen";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white text-black">
      <SiteHeader />

      {/* Hero — warp-style opener, two columns. Left: editorial wordmark,
          Display headline, lead paragraph, paired CTAs. Right: the token
          specimen — a Cashu bearer token rendered as a primary-source RFC
          figure. The staged reveal runs headline → body → CTA → figure. */}
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
              <Reveal immediate delay={380}>
                <p className="hero-spec__body">
                  Instant, bearer, peer-to-peer. A protocol for digital cash
                  backed by Lightning, with blind-signed tokens you can hold
                  in any wallet.
                </p>
              </Reveal>
              <Reveal immediate delay={480}>
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
                    <span>View documentation</span>
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="hero-spec__art">
              <TokenSpecimen />
            </div>
          </div>
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
