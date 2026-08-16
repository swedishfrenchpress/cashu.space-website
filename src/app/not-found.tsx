import Link from "next/link";
import Reveal from "@/components/reveal";
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
    <div className="flex flex-col flex-1 bg-paper text-ink">
      <SiteHeader />

      <main
        id="main-content"
        tabIndex={-1}
        className="page-shell flex-1 flex items-center pt-16 lg:pt-24 pb-24 lg:pb-32"
      >
        <div className="flex flex-col gap-8 lg:gap-10 max-w-[60ch]">
          <Reveal immediate delay={80}>
            <span className="t-mono text-muted">nut:404</span>
          </Reveal>
          <Reveal immediate slow delay={160}>
            <h1 className="t-display">Not specified.</h1>
          </Reveal>
          <Reveal immediate delay={300}>
            <p className="t-body-lead text-ink max-w-[52ch]">
              This path does not appear in the protocol. The page may have
              moved, or it may never have existed.
            </p>
          </Reveal>
          <Reveal immediate delay={420}>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/" className="btn-primary">
                Back to cashu.space
              </Link>
              <a
                href="https://github.com/cashubtc"
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Browse the repo
              </a>
            </div>
          </Reveal>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
