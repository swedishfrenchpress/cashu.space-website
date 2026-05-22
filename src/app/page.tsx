import { CashuMark } from "@/components/cashu-mark";
import ClosingCta from "@/components/closing-cta";
import ImplementationsGrid from "@/components/implementations-grid";
import MarqueeStrip from "@/components/marquee-strip";
import ProtocolProperties from "@/components/protocol-properties";
import ShaderEffect from "@/components/shader-effect";
import SiteFooter from "@/components/site-footer";
import StatementWithMedia from "@/components/statement-with-media";
import StatsBand from "@/components/stats-band";
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

      <section className="page-shell pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="grid grid-cols-12 gap-y-10 gap-x-6 lg:gap-x-12 items-center">
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-semibold tracking-tight leading-[0.95]">
              Cashu
            </h1>
            <p className="text-lg lg:text-xl font-semibold leading-snug max-w-[40ch]">
              Electronic cash for payments online, in person, and around the
              world.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/docs"
                className="inline-flex items-center bg-zinc-100 hover:bg-zinc-200 transition-colors px-5 py-3 text-sm font-medium text-zinc-900"
              >
                Documentation              </a>
              <a
                href="https://github.com/cashubtc"
                className="inline-flex items-center bg-zinc-100 hover:bg-zinc-200 transition-colors px-5 py-3 text-sm font-medium text-zinc-900"
              >
                GitHub              </a>
              <a
                href="/blog"
                className="inline-flex items-center bg-zinc-100 hover:bg-zinc-200 transition-colors px-5 py-3 text-sm font-medium text-zinc-900"
              >
                Blog              </a>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end">
            <ShaderEffect
              imageSrc="/cashu-no-bg.png"
              darkMode={false}
              width={560}
              height={560}
              className="max-w-full"
            />
          </div>
        </div>
      </section>

      <MarqueeStrip />
      <TabbedFeature />
      <StatsBand />
      <StatementWithMedia />
      <ProtocolProperties />
      <ImplementationsGrid />
      <ClosingCta />
      <SiteFooter />
    </div>
  );
}
