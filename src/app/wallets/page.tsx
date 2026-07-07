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
  scope: string;
  wallets: Wallet[];
};

// Grouped by surface so visitors land on the right list without scanning
// per-row fields. Within each group: broadest platform support first, then
// alphabetical. The per-row platform field still distinguishes iOS vs
// Android within Mobile for visitors who care.
const WALLET_GROUPS: WalletGroup[] = [
  {
    heading: "Mobile",
    scope: "Ecash in your pocket — native iOS and Android apps.",
    wallets: [
      { name: "eNuts",     platforms: ["iOS", "Android"], href: "https://www.enuts.cash" },
      { name: "Cashu Pro", platforms: ["iOS", "Android"], href: "https://github.com/cashubtc" },
      { name: "Macadamia", platforms: ["iOS"],            href: "https://macadamia.cash" },
      { name: "Minibits",  platforms: ["Android"],        href: "https://www.minibits.cash" },
    ],
  },
  {
    heading: "Web",
    scope: "Runs in any browser. Nothing to install, portable anywhere.",
    wallets: [
      { name: "Athenut",   platforms: ["Web"], href: "https://athenut.com" },
      { name: "Boardwalk",  platforms: ["Web"], href: "https://boardwalkcash.com" },
      { name: "Cashu.me",  platforms: ["Web"], href: "https://wallet.cashu.me" },
      { name: "Nutstash",  platforms: ["Web"], href: "https://nutstash.app" },
    ],
  },
];

// The destination host, shown under each wordmark as the registry's honest
// "where does Open go" field. Strip the www. so the address reads clean.
function hostOf(href: string): string {
  try {
    return new URL(href).host.replace(/^www\./, "");
  } catch {
    return href;
  }
}

// Distinct platforms across a group, in first-seen order.
function platformsOf(group: WalletGroup): string[] {
  return [...new Set(group.wallets.flatMap((w) => w.platforms))];
}

export default function WalletsPage() {
  return (
    <main className="bg-black text-white min-h-screen pb-24 lg:pb-32">
      <SiteHeader onInk />

      <div className="page-shell flex flex-col pt-16 lg:pt-24">
        <Reveal immediate as="header">
          <div id="main-content" className="flex flex-col gap-6 max-w-[60ch]">
            <h1 className="t-display">Wallets.</h1>
            <p className="t-body-lead text-zinc-100">
              Any client that implements the cashu protocol is conformant. The
              list below is non-exhaustive, a snapshot of wallets people use
              today, not an endorsement.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-[clamp(4rem,8vw,6.5rem)] mt-[clamp(3.5rem,7vw,6rem)]">
          {WALLET_GROUPS.map((group, gi) => {
            const platforms = platformsOf(group);
            // Only carry the per-row / rail platform field when it adds
            // information: a single-platform surface (Web) already states its
            // platform in the heading, so repeating "Web" on every row is
            // noise. A multi-platform surface (Mobile) keeps the detail.
            const showPlatform = platforms.length > 1;

            return (
            <section
              key={group.heading}
              aria-labelledby={`wallets-group-${group.heading.toLowerCase()}`}
              className="wallet-group"
            >
              <Reveal immediate delay={160 + gi * 60} className="wallet-group__rail">
                <h2
                  id={`wallets-group-${group.heading.toLowerCase()}`}
                  className="t-headline"
                >
                  {group.heading}
                </h2>
                <p className="wallet-group__scope t-body">{group.scope}</p>
                {showPlatform && (
                  <p className="wallet-group__coverage">{platforms.join(" · ")}</p>
                )}
              </Reveal>

              <Reveal immediate delay={220 + gi * 60}>
                <ul className="wallet-list">
                  {group.wallets.map((wallet, i) => (
                    <Reveal
                      key={wallet.name}
                      as="li"
                      immediate
                      delay={280 + gi * 60 + i * 50}
                      className="wallet-row"
                    >
                      <span className="wallet-row__id">
                        <a
                          href={wallet.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="wallet-row__name t-title focus-ring--on-ink"
                        >
                          {wallet.name}
                        </a>
                        <span className="wallet-row__host">
                          {hostOf(wallet.href)}
                        </span>
                      </span>

                      {showPlatform && (
                        <span className="wallet-row__platform">
                          {wallet.platforms.join(" · ")}
                        </span>
                      )}

                      <a
                        href={wallet.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${wallet.name}`}
                        className="btn-secondary--on-ink wallet-open"
                      >
                        Open
                      </a>
                    </Reveal>
                  ))}
                </ul>
              </Reveal>
            </section>
            );
          })}
        </div>

        <Reveal
          as="footer"
          className="mt-[clamp(4rem,8vw,6.5rem)] pt-[clamp(2rem,4vw,3rem)] border-t border-zinc-900"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-3 max-w-[52ch]">
              <p className="t-title text-white">Missing a wallet?</p>
              <p className="t-body text-zinc-400">
                cashu.space is a directory, not a gatekeeper. Any conformant
                client belongs here — the site is open source, so open a pull
                request to add one.
              </p>
            </div>
            <a
              href="https://github.com/cashubtc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary--on-ink self-start lg:self-auto"
            >
              Contribute on GitHub
            </a>
          </div>
          <p className="mt-8">
            <Link
              href="/"
              className="t-label text-zinc-300 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-700 hover:decoration-white focus-ring--on-ink"
            >
              ← Back to cashu.space
            </Link>
          </p>
        </Reveal>
      </div>
    </main>
  );
}
