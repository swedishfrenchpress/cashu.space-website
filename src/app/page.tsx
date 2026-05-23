import Image from "next/image";

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

      {/* Hero — "Handoff". A photograph of a real Cashu moment (cash-in
          against an antifiat-mint wallet) carries the page; a giant
          GT-Standard wordmark bleeds across the photo→Paper boundary,
          borrowing the Without Studio specimen layout. The photograph
          is the *single permitted color image* on the site — every
          other photo desaturates per DESIGN.md §2. */}
      <section className="hero-handoff page-shell">
        <div className="hero-handoff__photo">
          <Image
            src="/hero-handoff.jpg"
            alt="Two hands exchange US dollar bills across a Cashu wallet showing a balance of ₿3,878 on an antifiat mint, with the NYC Flatiron district in the background."
            fill
            priority
            sizes="(min-width: 1280px) 1088px, 100vw"
            className="hero-handoff__photo-img"
          />
        </div>
        <div className="hero-handoff__statement">
          <Reveal immediate delay={260}>
            <p className="hero-handoff__lead text-zinc-900">
              Ecash for bitcoin. Instant, bearer, peer-to-peer.
            </p>
          </Reveal>
          <Reveal immediate delay={380}>
            {/* Two primaries, by doctrine: PRODUCT.md elevates "get a
                wallet" and "read the spec" as the two outcomes. No third
                CTA, no secondary affordance. GitHub lives in the footer;
                blog isn't wired yet. */}
            <div className="hero-handoff__cta-row">
              <a href="/wallets" className="btn-primary">
                Get a wallet
              </a>
              <a href="/docs" className="btn-primary">
                Read the spec
              </a>
            </div>
          </Reveal>
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
