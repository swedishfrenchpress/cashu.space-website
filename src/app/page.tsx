import ImplementationsGrid from "@/components/implementations-grid";
import MarqueeStrip from "@/components/marquee-strip";
import Reveal from "@/components/reveal";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import StatementWithMedia from "@/components/statement-with-media";
import TabbedFeature from "@/components/tabbed-feature";
import TokenSpecimen from "@/components/token-specimen";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white text-black">
      <SiteHeader />

      <section className="section-y-air">
        <div className="page-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex flex-col gap-6 lg:gap-8">
              <Reveal immediate slow delay={120}>
                <h1 className="t-display">Cashu.</h1>
              </Reveal>
              <Reveal immediate delay={220}>
                <p className="t-body-lead text-zinc-900 max-w-[44ch] lg:text-xl">
                  Electronic cash for payments online, in person, and around
                  the world.
                </p>
              </Reveal>
              <Reveal immediate delay={360}>
                {/* Two primaries, by doctrine: PRODUCT.md elevates "get a
                    wallet" and "read the spec" as the two outcomes. No third
                    CTA, no secondary affordance. GitHub lives in the footer;
                    blog isn't wired yet. */}
                <div className="flex flex-wrap items-center gap-3">
                  <a href="/wallets" className="btn-primary">
                    Get a wallet
                  </a>
                  <a href="/docs" className="btn-primary">
                    Read the spec
                  </a>
                </div>
              </Reveal>
            </div>
            <TokenSpecimen />
          </div>
        </div>
      </section>

      <MarqueeStrip />
      <TabbedFeature />
      <StatementWithMedia />
      <ImplementationsGrid />
      <SiteFooter />
    </div>
  );
}
