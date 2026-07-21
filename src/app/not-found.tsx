import Link from "next/link";
import { CashuMark } from "@/components/cashu-mark";
import Reveal from "@/components/reveal";

export const metadata = {
  title: "Not specified · cashu.space",
};

export default function NotFound() {
  return (
    <main className="flex flex-col flex-1 bg-paper text-ink">
      <header className="page-shell pt-6 lg:pt-8 flex items-center">
        <Reveal immediate variant="fade">
          <Link href="/" className="flex items-center gap-2.5 t-title">
            <CashuMark className="h-7 w-7" />
            <span>cashu</span>
          </Link>
        </Reveal>
      </header>

      <section
        id="main-content"
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
      </section>
    </main>
  );
}
