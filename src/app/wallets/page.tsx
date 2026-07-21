import type { Metadata } from "next";
import Reveal from "@/components/reveal";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Wallets · cashu.space",
  description:
    "A non-exhaustive directory of cashu wallets. Any client that implements the protocol is conformant.",
};

type Entry = {
  name: string;
  href: string;
};

type DirectoryGroup = {
  heading: string;
  scope: string;
  entries: Entry[];
};

// Grouped by surface. Wallets come first (Mobile, then Web), then the
// developer implementations, then operator tooling. Each non-wallet category
// gets its own labelled band so nothing is mislabelled as a wallet. Wallets
// are alphabetical within a group; implementations lead with the reference.
const DIRECTORY_GROUPS: DirectoryGroup[] = [
  {
    heading: "Mobile",
    scope: "Ecash in your pocket. Wallets for your phone.",
    entries: [
      { name: "Cashu.me",  href: "https://wallet.cashu.me" },
      { name: "eNuts",     href: "https://www.enuts.cash" },
      { name: "Macadamia", href: "https://macadamia.cash" },
      { name: "Minibits",  href: "https://www.minibits.cash" },
      { name: "Numo",      href: "https://numopay.org" },
      { name: "Sovran",    href: "https://sovran.money/en/" },
    ],
  },
  {
    heading: "Web",
    scope: "Runs in any browser. Nothing to install, portable anywhere.",
    entries: [
      { name: "AGI Cash", href: "https://agi.cash/home" },
      { name: "Athenut",  href: "https://athenut.com" },
    ],
  },
  {
    heading: "Implementations",
    scope: "Libraries and SDKs for building on the cashu protocol.",
    entries: [
      { name: "Nutshell", href: "https://github.com/cashubtc/nutshell" },
      { name: "CDK",      href: "https://github.com/cashubtc/cdk" },
      { name: "Cashu TS", href: "https://github.com/cashubtc/cashu-ts" },
      { name: "Coco",     href: "https://github.com/cashubtc/coco" },
    ],
  },
  {
    heading: "Tools",
    scope: "Not a wallet. Software for running and managing your own mint.",
    entries: [
      { name: "Orchard", href: "https://orchard.space" },
    ],
  },
];

// The destination, shown under each wordmark as the registry's honest
// "where does Open go" field. For repos we show the org/repo slug — all four
// implementations live on github.com, so the bare host would just repeat.
// Everything else shows its clean host with the www. stripped.
function targetOf(href: string): string {
  try {
    const url = new URL(href);
    if (url.host === "github.com") {
      return url.pathname.replace(/^\/|\/$/g, "");
    }
    return url.host.replace(/^www\./, "");
  } catch {
    return href;
  }
}

export default function WalletsPage() {
  return (
    <main className="bg-paper text-ink min-h-screen pb-24 lg:pb-32">
      <SiteHeader />

      <div className="page-shell flex flex-col pt-16 lg:pt-24">
        <Reveal immediate as="header">
          <div id="main-content" className="flex flex-col gap-6 max-w-[60ch]">
            <h1 className="t-display">Wallets.</h1>
            <p className="t-body-lead text-body">
              Any client that implements the cashu protocol is conformant. The
              list below is non-exhaustive, a snapshot of wallets people use
              today, not an endorsement.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-[clamp(4rem,8vw,6.5rem)] mt-[clamp(3.5rem,7vw,6rem)]">
          {DIRECTORY_GROUPS.map((group, gi) => (
            <section
              key={group.heading}
              aria-labelledby={`wallets-group-${group.heading.toLowerCase().replace(/\s+/g, "-")}`}
              className="wallet-group"
            >
              <Reveal immediate delay={160 + gi * 60} className="wallet-group__rail">
                <h2
                  id={`wallets-group-${group.heading.toLowerCase().replace(/\s+/g, "-")}`}
                  className="t-headline"
                >
                  {group.heading}
                </h2>
                <p className="wallet-group__scope t-body">{group.scope}</p>
              </Reveal>

              <Reveal immediate delay={220 + gi * 60}>
                <ul className="wallet-list">
                  {group.entries.map((entry, i) => (
                    <Reveal
                      key={entry.name}
                      as="li"
                      immediate
                      delay={280 + gi * 60 + i * 50}
                      className="wallet-row"
                    >
                      <span className="wallet-row__id">
                        <a
                          href={entry.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="wallet-row__name t-title focus-ring"
                        >
                          {entry.name}
                        </a>
                        <span className="wallet-row__host">
                          {targetOf(entry.href)}
                        </span>
                      </span>

                      <a
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${entry.name}`}
                        className="btn-secondary wallet-open"
                      >
                        Open
                      </a>
                    </Reveal>
                  ))}
                </ul>
              </Reveal>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
