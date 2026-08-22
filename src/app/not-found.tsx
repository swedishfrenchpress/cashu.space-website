import CurtainLink from "@/components/curtain-link";
import { Stagger, StaggerItem } from "@/components/stagger";
import NewTabHint from "@/components/new-tab-hint";
import FooterReveal from "@/components/footer-reveal";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export const metadata = {
  title: "Cashu: Not specified",
};

export default function NotFound() {
  return (
    /* The 404 carries the full chrome. It used to ship a bespoke brand row
       and nothing else — no nav, no footer — which made the highest-abandon
       surface on the site the one place a lost visitor had no routes: a
       stale /mints or /docs link landed them on two links, with no wallets,
       no spec CTA and no disclaimer. It also contradicted the note in
       wallets/page.tsx that the twilight stack closes *every* page. The bar
       marks nothing as current here, which is correct — no nav item owns
       this route. */
    <FooterReveal
      className="flex flex-col flex-1 bg-paper text-ink"
      footer={<SiteFooter />}
    >
      <SiteHeader />

      <main
        id="main-content"
        tabIndex={-1}
        className="page-shell flex-1 flex items-center pt-16 lg:pt-24 pb-24 lg:pb-32"
      >
        <Stagger className="flex flex-col gap-8 lg:gap-10 max-w-[60ch]">
          <StaggerItem>
            <span className="t-mono text-muted">nut:404</span>
          </StaggerItem>
          <StaggerItem>
            <h1 className="t-display">
              Not specified.
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="t-body-lead text-ink max-w-[52ch]">
              This path does not appear in the protocol. The page may have
              moved, or it may never have existed.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <CurtainLink href="/" className="btn-primary">
                Back to cashu.space
              </CurtainLink>
              <a
                href="https://github.com/cashubtc"
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Browse the repo
                <NewTabHint />
              </a>
            </div>
          </StaggerItem>
        </Stagger>
      </main>
    </FooterReveal>
  );
}
