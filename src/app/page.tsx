import { CashuMark } from "@/components/cashu-mark";
import ImplementationsGrid from "@/components/implementations-grid";
import MarqueeStrip from "@/components/marquee-strip";
import Reveal from "@/components/reveal";
import SiteFooter from "@/components/site-footer";
import StatementWithMedia from "@/components/statement-with-media";
import TabbedFeature from "@/components/tabbed-feature";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white text-black">
      <header className="page-shell pt-6 lg:pt-8 flex items-center">
        <Reveal immediate variant="fade" delay={0} as="div">
          <a href="/" className="flex items-center gap-2.5 t-title">
            <CashuMark className="h-7 w-7" />
            <span>cashu</span>
          </a>
        </Reveal>
      </header>

      <section className="pt-16 lg:pt-24 pb-16 lg:pb-24">
        <div className="page-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex flex-col gap-8 lg:gap-10">
              {/* Hero is descriptive prose, not a slogan — so it takes a
                  bespoke scale below t-display (which is reserved for short
                  page-peak copy like "Wallets." and "Cashu, in your pocket.").
                  Headline scale is too small; this is the sweet spot for
                  this copy in a half-grid. */}
              <Reveal immediate slow delay={120}>
                <h1
                  className="font-semibold"
                  style={{
                    fontFamily: "var(--font-gt), ui-sans-serif, system-ui, sans-serif",
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    lineHeight: 1.0,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Electronic cash for payments online, in person, and around
                  the world.
                </h1>
              </Reveal>
              <Reveal immediate delay={320}>
                <div className="flex flex-wrap items-center gap-3">
                  <a href="/docs" className="btn-primary">
                    Read the spec <span aria-hidden>→</span>
                  </a>
                  <a href="https://github.com/cashubtc" className="btn-secondary">
                    GitHub
                  </a>
                  <a href="/blog" className="btn-secondary">
                    Blog
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal immediate variant="fade" slow delay={200}>
              <div
                aria-hidden
                className="w-full aspect-[4/5] bg-zinc-100 flex items-center justify-center"
              >
                <span className="t-label text-zinc-400">Placeholder</span>
              </div>
            </Reveal>
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
