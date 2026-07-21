import Link from "next/link";
import AsciiField from "@/components/ascii-field";
import ImplementationsGrid from "@/components/implementations-grid";
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

      {/* Hero — single-column spec opener. Headline, lead, and paired CTAs
          sit left-aligned inside the page shell; below them a full-bleed
          ASCII terrain band (a live contour field drawn in Geist Mono
          glyphs) runs to the hero's base, cropped by the section's closing
          hairline. The staged reveal runs headline → body → CTA → band. */}
      <section id="main-content" className="hero-spec">
        <div className="hero-spec__inner page-shell">
          <div className="hero-spec__content">
            <Reveal immediate delay={120}>
              <h1 className="hero-spec__headline">Open source electronic cash.</h1>
            </Reveal>
            <Reveal immediate delay={240}>
              <p className="hero-spec__body">
                Instant, bearer, peer-to-peer. A protocol for digital cash
                backed by bitcoin, with blind-signed tokens you can hold
                in any wallet.
              </p>
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
                  <span>View documentation</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal immediate variant="fade" slow delay={480}>
          <AsciiField className="hero-spec__band" />
        </Reveal>
      </section>

      <div id="why-cashu">
        <TabbedFeature />
      </div>
      <TapToPay />
      <div id="implementations">
        <ImplementationsGrid />
      </div>
      <ReferenceImplementations />
      <SiteFooter />
    </div>
  );
}
