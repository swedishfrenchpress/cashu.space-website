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
          against an antifiat-mint wallet) carries the page. Beneath the
          photo, the lead and CTAs land asymmetric: lead flush-left,
          CTAs flush-left under it on mobile / pulled to the opposite
          edge on lg+. The centered stack the brand register warns
          against ("Don't default to centering everything") is
          deliberately avoided here. The photograph is the *single
          permitted color image* on the site — every other photo
          desaturates per DESIGN.md §2. */}
      <section id="main-content" className="hero-handoff page-shell">
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
            {/* Get-a-wallet is the page's primary ask (PRODUCT.md
                outcome #1); Read-the-spec is the doctrine-equal second
                outcome but reads quieter on the hero so the page has a
                clear lead click. Both primaries return sitewide on
                deeper pages — the hero just nominates which to click
                first. No third CTA: GitHub lives in the footer. */}
            <div className="hero-handoff__cta-row">
              <a href="/wallets" className="btn-primary">
                Get a wallet
              </a>
              <a
                href="https://docs.cashu.space/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
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
