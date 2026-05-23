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
};

type WalletGroup = {
  heading: string;
  subheading: string;
  wallets: Wallet[];
};

// Grouped by surface so visitors land on the right list without scanning
// per-row chips. Within each group: broadest platform support first, then
// alphabetical. The per-row platform chips still distinguish iOS vs Android
// within Mobile for visitors who care.
const WALLET_GROUPS: WalletGroup[] = [
  {
    heading: "Mobile",
    subheading: "Phone wallets. Hold ecash in your pocket.",
    wallets: [
      { name: "eNuts",     platforms: ["iOS", "Android"], href: "https://www.enuts.cash" },
      { name: "Cashu Pro", platforms: ["iOS", "Android"], href: "https://github.com/cashubtc" },
      { name: "Macadamia", platforms: ["iOS"],            href: "https://macadamia.cash" },
      { name: "Minibits",  platforms: ["Android"],        href: "https://www.minibits.cash" },
    ],
  },
  {
    heading: "Web",
    subheading: "Browser wallets. No install, runs anywhere.",
    wallets: [
      { name: "Athenut",  platforms: ["Web"], href: "https://athenut.com" },
      { name: "Boardwalk",platforms: ["Web"], href: "https://boardwalkcash.com" },
      { name: "Cashu.me", platforms: ["Web"], href: "https://wallet.cashu.me" },
      { name: "Nutstash", platforms: ["Web"], href: "https://nutstash.app" },
    ],
  },
];

export default function WalletsPage() {
  return (
    <main className="bg-black text-white min-h-screen pb-24 lg:pb-32">
      <SiteHeader onInk />

      <div className="page-shell flex flex-col gap-12 lg:gap-16 pt-16 lg:pt-24">
        <Reveal immediate as="header">
          <div id="main-content" className="flex flex-col gap-6 max-w-[60ch]">
            <h1 className="t-display">Wallets.</h1>
            <p className="t-body-lead text-zinc-100 max-w-[60ch]">
              Any client that implements the cashu protocol is conformant. The
              list below is non-exhaustive, a snapshot of wallets people use
              today, not an endorsement.
            </p>
          </div>
        </Reveal>

        {WALLET_GROUPS.map((group, gi) => (
          <section
            key={group.heading}
            aria-labelledby={`wallets-group-${group.heading.toLowerCase()}`}
            className="flex flex-col gap-6 lg:gap-8"
          >
            <Reveal immediate delay={160 + gi * 60}>
              <div className="flex items-baseline justify-between gap-6 border-b border-zinc-800 pb-4 lg:pb-5">
                <h2
                  id={`wallets-group-${group.heading.toLowerCase()}`}
                  className="t-headline"
                >
                  {group.heading}
                </h2>
                <p className="t-label text-zinc-500 max-w-[36ch] text-right hidden sm:block">
                  {group.subheading}
                </p>
              </div>
            </Reveal>
            <Reveal immediate delay={220 + gi * 60}>
              <ul className="divide-y divide-zinc-800">
                {group.wallets.map((wallet, i) => (
                  <Reveal
                    key={wallet.name}
                    as="li"
                    immediate
                    delay={280 + gi * 60 + i * 50}
                  >
                    <a
                      href={wallet.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] items-center gap-4 sm:gap-6 md:gap-8 py-5 sm:py-6 lg:py-7 transition-colors hover:bg-zinc-950 focus-visible:bg-zinc-950 focus-ring--on-ink"
                    >
                      <span className="t-title">{wallet.name}</span>
                      <span className="hidden sm:flex items-center gap-2">
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
            </Reveal>
          </section>
        ))}

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
