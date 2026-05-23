import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/reveal";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Wallets · cashu.space",
  description:
    "A non-exhaustive directory of cashu wallets. Any client that implements the protocol is conformant.",
};

type Wallet = {
  name: string;
  platforms: string[];
  href: string;
  note?: string;
};

// Canonical project URLs. Order: most-platforms first, then alphabetical.
const WALLETS: Wallet[] = [
  {
    name: "eNuts",
    platforms: ["iOS", "Android"],
    href: "https://www.enuts.cash",
    note: "Mobile",
  },
  {
    name: "Cashu Pro",
    platforms: ["iOS", "Android"],
    href: "https://github.com/cashubtc",
    note: "Mobile",
  },
  {
    name: "Macadamia",
    platforms: ["iOS"],
    href: "https://macadamia.cash",
    note: "Mobile",
  },
  {
    name: "Minibits",
    platforms: ["Android"],
    href: "https://www.minibits.cash",
    note: "Mobile",
  },
  {
    name: "Athenut",
    platforms: ["Web"],
    href: "https://athenut.com",
    note: "Browser",
  },
  {
    name: "Boardwalk",
    platforms: ["Web"],
    href: "https://boardwalkcash.com",
    note: "Browser",
  },
  {
    name: "Cashu.me",
    platforms: ["Web"],
    href: "https://wallet.cashu.me",
    note: "Browser",
  },
  {
    name: "Nutstash",
    platforms: ["Web"],
    href: "https://nutstash.app",
    note: "Browser",
  },
];

export default function WalletsPage() {
  return (
    <main className="bg-black text-white min-h-screen pb-24 lg:pb-32">
      <SiteHeader onInk />

      <div className="page-shell flex flex-col gap-12 lg:gap-16 pt-16 lg:pt-24">
        <Reveal immediate as="header">
          <div className="flex flex-col gap-6 max-w-[60ch]">
            <h1 className="t-display">Wallets.</h1>
            <p className="t-body-lead text-zinc-300 max-w-[60ch]">
              Any client that implements the cashu protocol is conformant. The
              list below is non-exhaustive, a snapshot of wallets people use
              today, not an endorsement.
            </p>
          </div>
        </Reveal>

        <section aria-labelledby="wallets-table-heading">
          <h2 id="wallets-table-heading" className="sr-only">
            Wallet directory
          </h2>
          <Reveal immediate delay={160}>
            <div className="border-t border-zinc-800">
              <ul className="divide-y divide-zinc-800">
                {WALLETS.map((wallet, i) => (
                  <Reveal
                    key={wallet.name}
                    as="li"
                    immediate
                    delay={260 + i * 60}
                  >
                    <a
                      href={wallet.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_auto] items-center gap-4 md:gap-8 py-6 lg:py-7 transition-colors hover:bg-zinc-950 focus-visible:bg-zinc-950 focus-ring--on-ink"
                    >
                      <span className="t-title">{wallet.name}</span>
                      <span className="hidden md:flex items-center gap-2">
                        {wallet.platforms.map((p) => (
                          <span
                            key={p}
                            className="t-mono text-zinc-400 border border-zinc-800 px-2 py-1"
                          >
                            {p}
                          </span>
                        ))}
                      </span>
                      <span
                        aria-hidden
                        className="t-label text-zinc-500 group-hover:text-white transition-colors"
                      >
                        Visit →
                      </span>
                    </a>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        <Reveal as="footer">
          <div className="flex flex-col gap-3 pt-8 border-t border-zinc-900">
            <p className="t-body text-zinc-400 max-w-[60ch]">
              Missing a wallet? cashu.space is open source, submit a pull
              request.
            </p>
            <p>
              <Link
                href="/"
                className="t-label text-zinc-300 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-700 hover:decoration-white focus-ring--on-ink"
              >
                ← Back to cashu.space
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
