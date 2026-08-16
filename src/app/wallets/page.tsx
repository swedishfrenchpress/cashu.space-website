import type { Metadata } from "next";
import NewTabHint from "@/components/new-tab-hint";
import Reveal from "@/components/reveal";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

/* openGraph is set explicitly, not inherited. Next merges the root layout's
   block into every route, so without this the share card for /wallets
   carried the homepage's title and pointed its url at https://cashu.space —
   a link to the directory previewing as the landing page. */
/* The page is a directory, not a wallet list, and it says so now. The nav
   label, the title, the H1 and the lead all said "wallets" over four groups,
   two of which — Libraries and Tools — are explicitly not wallets: a reader
   scanning for something to install could not tell which 8 of the 13 rows
   they could install without reading four scope lines first.

   Wallets still lead, in the reading order and in the group order, because
   routing to one is the outcome PRODUCT.md elevates. What changed is that
   the page no longer claims to be only that. The route stays /wallets and
   the nav label stays "Wallets" — that is the job people arrive for, and the
   first thing under the H1 is still a wallet group. */
const TITLE = "Cashu Directory";
const DESCRIPTION =
  "A non-exhaustive directory of Cashu wallets, libraries, and mint tooling. Any client that implements the protocol is conformant.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/wallets" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/wallets",
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

type Entry = {
  name: string;
  href: string;
  /* Decision facts, rendered in the host's mono register. Every value must
     stay verifiable against the project's own site or repo — the registry
     states facts, it does not endorse. Facts that hold for the whole
     directory ("Open source" — everything here is) say nothing and stay
     out. */
  facts?: string[];
};

type DirectoryGroup = {
  heading: string;
  scope: string;
  entries: Entry[];
};

/* Facts that describe a project's *maturity* rather than its surface. These
   render as a bordered tag instead of plain mono, because they answer a
   different question from "iOS and Android": one tells you where it runs, the
   other tells you how much to trust it yet. Keep this set small — the moment
   everything is a tag, nothing is. */
const STATUS_FACTS = new Set(["Beta"]);

// Grouped by surface. Wallets come first (Mobile, then Web), then the
// developer implementations, then operator tooling. Each non-wallet category
// gets its own labelled band so nothing is mislabelled as a wallet. Wallets
// are alphabetical within a group; implementations lead with the reference.
const DIRECTORY_GROUPS: DirectoryGroup[] = [
  {
    heading: "Mobile wallets",
    scope: "Ecash in your pocket. Hold bearer tokens on your phone.",
    entries: [
      { name: "Cashu.me",  href: "https://cashu.me",           facts: ["iOS, Android, and PWA", "Beta"] },
      { name: "eNuts",     href: "https://www.enuts.cash",     facts: ["iOS and Android"] },
      { name: "Macadamia", href: "https://macadamia.cash",     facts: ["iOS"] },
      { name: "Minibits",  href: "https://www.minibits.cash",  facts: ["iOS and Android"] },
      { name: "Numo",      href: "https://numopay.org",        facts: ["Android", "Point of sale"] },
      { name: "Sovran",    href: "https://sovran.money/en/",   facts: ["iOS", "Beta"] },
    ],
  },
  {
    heading: "Web wallets",
    scope: "Runs in any browser. Nothing to install, portable anywhere.",
    entries: [
      { name: "AGI Cash", href: "https://agi.cash/home", facts: ["Beta"] },
      { name: "Athenut",  href: "https://athenut.com" },
    ],
  },
  {
    // "Libraries", not "Implementations": the homepage counts every
    // implementation in the org (wallets included), so reusing that word for
    // this narrower set made two adjacent pages disagree on the same term.
    heading: "Libraries",
    scope: "Libraries and SDKs for building on the Cashu protocol.",
    entries: [
      { name: "Nutshell", href: "https://github.com/cashubtc/nutshell", facts: ["Python", "Reference implementation"] },
      { name: "CDK",      href: "https://github.com/cashubtc/cdk",      facts: ["Rust"] },
      { name: "Cashu TS", href: "https://github.com/cashubtc/cashu-ts", facts: ["TypeScript"] },
      { name: "Coco",     href: "https://github.com/cashubtc/coco",     facts: ["TypeScript"] },
    ],
  },
  {
    heading: "Tools",
    /* "Not a wallet" is no longer the first thing this line has to say: the
       page is a directory and the two wallet groups name themselves. */
    scope: "Software for running and managing your own mint.",
    entries: [
      { name: "Orchard", href: "https://orchard.space", facts: ["Self-hosted"] },
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
    <div className="flex flex-col bg-paper text-ink min-h-screen">
      <SiteHeader />

      <main className="flex-1 pb-24 lg:pb-32">

      <div className="page-shell flex flex-col pt-16 lg:pt-24">
        <Reveal immediate as="header">
          <div id="main-content" tabIndex={-1} className="flex flex-col gap-6 max-w-[60ch]">
            <h1 className="t-display">Directory.</h1>
            <p className="t-body-lead text-body">
              Wallets first, then the libraries and mint tooling built on the
              same spec. Any client that implements the Cashu protocol is
              conformant. This list is non-exhaustive, a snapshot of what
              people use today, not an endorsement.
            </p>
            {/* The decision fact, cited rather than restated.

                A directory of thirteen rows with one identical OPEN slab
                each gives a chooser almost nothing to choose on: platform,
                and "Beta" on four of them. The fact that would actually
                separate these wallets for this audience is which optional
                NUTs each one implements — and cashubtc/nuts already keeps
                that table, maintained by the people who write the specs.

                So it is linked, not copied. Duplicating it here would be a
                second source of truth that goes stale the first time a
                wallet ships a NUT, on the page whose lead promises a
                snapshot and whose footer says to read the spec before
                trusting anyone, including us. The wording stays hedged on
                purpose: the table covers seven implementations, not all
                thirteen rows below, so it must not read as a complete
                per-wallet matrix. */}
            <p className="t-body text-muted">
              Optional NUT support varies between wallets. The{" "}
              <a
                href="https://github.com/cashubtc/nuts#optional"
                target="_blank"
                rel="noopener noreferrer"
                className="prose-link focus-ring"
              >
                spec repo
                <NewTabHint />
              </a>{" "}
              tracks which implementations support what.
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
                      {/* Plain text, not a second link. The wordmark and the
                          OPEN slab pointed at the same href, so the registry
                          spent 26 tab stops on 13 destinations and announced
                          every entry twice to a screen reader. OPEN is the
                          row's single control; the name is its label. */}
                      <span className="wallet-row__id">
                        <span className="wallet-row__name t-title">
                          {entry.name}
                        </span>
                        <span className="wallet-row__host">
                          {targetOf(entry.href)}
                        </span>
                      </span>

                      {/* Its own grid column (see .wallet-row in globals.css)
                          so facts line up down the page regardless of name
                          or host length — they used to trail a
                          variable-width host inline and drifted per row. */}
                      <span className="wallet-row__facts">
                        {entry.facts?.map((fact) => (
                          <span
                            key={fact}
                            className={`wallet-row__fact${
                              STATUS_FACTS.has(fact)
                                ? " wallet-row__fact--tag"
                                : ""
                            }`}
                          >
                            {fact}
                          </span>
                        ))}
                      </span>

                      <a
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${entry.name} (opens in a new tab)`}
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

      {/* The twilight stack closes every page (DESIGN.md §5) — the wallet
          chooser leaves past the disclaimer and the spec CTA, not into a
          dead end after the last directory row. */}
      <SiteFooter />
    </div>
  );
}
