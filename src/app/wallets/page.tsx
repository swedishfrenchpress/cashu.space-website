import type { Metadata } from "next";
import Link from "next/link";

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

// Placeholder list — fill in canonical URLs before shipping. Order:
// most-platforms first, then alphabetical.
const WALLETS: Wallet[] = [
  {
    name: "eNuts",
    platforms: ["iOS", "Android"],
    href: "#",
    note: "Mobile",
  },
  {
    name: "Minibits",
    platforms: ["Android"],
    href: "#",
    note: "Mobile",
  },
  {
    name: "Macadamia",
    platforms: ["iOS"],
    href: "#",
    note: "Mobile",
  },
  {
    name: "Cashu Pro",
    platforms: ["iOS", "Android"],
    href: "#",
    note: "Mobile",
  },
  {
    name: "Cashu.me",
    platforms: ["Web"],
    href: "#",
    note: "Browser",
  },
  {
    name: "Nutstash",
    platforms: ["Web"],
    href: "#",
    note: "Browser",
  },
  {
    name: "Boardwalk",
    platforms: ["Web"],
    href: "#",
    note: "Browser",
  },
  {
    name: "Athenut",
    platforms: ["Web"],
    href: "#",
    note: "Browser",
  },
];

export default function WalletsPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-20 lg:pt-32 pb-24 lg:pb-32">
      <div className="page-shell flex flex-col gap-12 lg:gap-16">
        <header className="flex flex-col gap-6 max-w-[60ch]">
          <p className="font-pixel uppercase tracking-wider text-[11px] text-zinc-400">
            §4 · Conforming implementations
          </p>
          <h1 className="text-[clamp(3rem,6vw,5rem)] font-semibold tracking-tight leading-[0.95]">
            Wallets.
          </h1>
          <p className="text-base lg:text-lg text-zinc-300 leading-relaxed">
            Any client that implements the cashu protocol is conformant. The
            list below is non-exhaustive — a snapshot of wallets people use
            today, not an endorsement.
          </p>
        </header>

        <section aria-labelledby="wallets-table-heading">
          <h2 id="wallets-table-heading" className="sr-only">
            Wallet directory
          </h2>
          <div className="border-t border-zinc-800">
            <ul className="divide-y divide-zinc-800">
              {WALLETS.map((wallet) => (
                <li key={wallet.name}>
                  <a
                    href={wallet.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_auto] items-center gap-4 md:gap-8 py-6 lg:py-7 transition-colors hover:bg-zinc-950 focus-visible:bg-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                  >
                    <span className="text-xl lg:text-2xl font-medium tracking-tight">
                      {wallet.name}
                    </span>
                    <span className="hidden md:flex items-center gap-2">
                      {wallet.platforms.map((p) => (
                        <span
                          key={p}
                          className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 border border-zinc-800 px-2 py-1"
                        >
                          {p}
                        </span>
                      ))}
                    </span>
                    <span
                      aria-hidden
                      className="font-pixel uppercase tracking-wider text-[11px] text-zinc-500 group-hover:text-white"
                    >
                      Visit →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="flex flex-col gap-3 pt-8 border-t border-zinc-900">
          <p className="font-pixel uppercase tracking-wider text-[11px] text-zinc-500">
            Missing a wallet? cashu.space is open source — submit a pull
            request.
          </p>
          <p>
            <Link
              href="/"
              className="text-sm text-zinc-300 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-700 hover:decoration-white"
            >
              ← Back to cashu.space
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
