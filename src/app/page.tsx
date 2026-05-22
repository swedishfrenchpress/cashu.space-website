import { CashuMark } from "@/components/cashu-mark";
import ImplementationsGrid from "@/components/implementations-grid";
import MarqueeStrip from "@/components/marquee-strip";
import SiteFooter from "@/components/site-footer";
import StatementWithMedia from "@/components/statement-with-media";
import TabbedFeature from "@/components/tabbed-feature";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white text-black">
      <header className="page-shell pt-6 lg:pt-8 flex items-center">
        <a
          href="/"
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight"
        >
          <CashuMark className="h-7 w-7" />
          <span>cashu</span>
        </a>
      </header>

      <section className="pt-16 lg:pt-24 pb-16 lg:pb-24">
        <div className="page-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex flex-col gap-8 lg:gap-10">
              <h1
                className="font-semibold"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                }}
              >
                Electronic cash for payments online, in person, and around
                the world.
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/docs"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3.5 text-sm font-medium hover:bg-zinc-800 transition-colors"
                >
                  Read the spec <span aria-hidden>→</span>
                </a>
                <a
                  href="https://github.com/cashubtc"
                  className="inline-flex items-center bg-zinc-100 text-zinc-900 px-5 py-2.5 text-sm font-medium hover:bg-zinc-200 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="/blog"
                  className="inline-flex items-center bg-zinc-100 text-zinc-900 px-5 py-2.5 text-sm font-medium hover:bg-zinc-200 transition-colors"
                >
                  Blog
                </a>
              </div>
            </div>
            <div
              aria-hidden
              className="w-full aspect-[4/5] bg-zinc-100 flex items-center justify-center"
            >
              <span className="font-pixel uppercase tracking-wider text-[11px] text-zinc-400">
                Placeholder
              </span>
            </div>
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
