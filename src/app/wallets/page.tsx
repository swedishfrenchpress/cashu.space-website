import type { Metadata } from "next";
import Reveal from "@/components/reveal";
import RevealGroup from "@/components/reveal-group";
import FooterReveal from "@/components/footer-reveal";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

/* openGraph is set explicitly, not inherited. Next merges the root layout's
   block into every route, so without this the share card for /wallets
   carried the homepage's title and pointed its url at https://cashu.space —
   a link to the directory previewing as the landing page. */
/* The H1 is "Wallets." again (user-directed 2026-08-18). It read
   "Directory." for two days, and the problem that change was solving is
   real and is still solved — this page carries four groups, two of which
   (Libraries and Tools) are explicitly not wallets, so a reader scanning
   for something to install must be able to tell which rows they can. What
   fixed it was never the H1 word: it is the lead's first sentence, "Wallets
   first, then the libraries and mint tooling built on the same spec," which
   states the scope in the place a reader actually reads it. Don't drop that
   sentence, and don't retitle the page to solve a scope problem the copy
   under it is already solving.

   Wallets lead in the reading order and in the group order because routing
   to one is the outcome PRODUCT.md elevates. Route, nav label, H1 and share
   title now all say the same word, which is what people arrive for. */
const TITLE = "Cashu Wallets";
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
     out.

     Licence was added here on 2026-08-16 and removed the same day, on the
     user's direction: the registry states where a thing runs and how far
     along it is, and a licence column is a different question than the one
     a person choosing a wallet is asking. Don't re-add it. The reader who
     wants it is one click from the repo, and the spec link above the list
     already covers the "which implementation does what" question. */
  facts?: string[];
};

type DirectoryGroup = {
  heading: string;
  scope: string;
  entries: Entry[];
};

/* Facts that describe a project's *maturity* rather than its surface. These
   render opened by a 7px --signal-page square and set in tracked uppercase
   (user-directed 2026-08-16, replacing the grey capsule) — because they
   answer a different question from "iOS and Android": one tells you where
   it runs, the other tells you how much to trust it yet. The recipe came
   from the protocol-parts property lists, which were cut on 2026-08-18, so
   this is now the site's only chromatic mark. Keep this set small: the
   square only distinguishes the maturity fact for as long as it is the only
   fact that carries one. */
const STATUS_FACTS = new Set(["Beta"]);

// Grouped by surface. Wallets come first (Mobile, then Web), then the
// developer implementations, then operator tooling. Each non-wallet category
// gets its own labelled band so nothing is mislabelled as a wallet. Wallets
// are alphabetical within a group; Libraries lead with Nutshell, which is
// an ordering decision only — it carried a "Reference implementation" fact
// until 2026-08-18 and the user cut it. Every other fact in this registry
// is a checkable property (language, platform, maturity); that one was a
// standing about a project relative to its peers, which is a different kind
// of claim and the only one here the site was making on its own authority.
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
      { name: "Nutshell", href: "https://github.com/cashubtc/nutshell", facts: ["Python"] },
      { name: "CDK",      href: "https://github.com/cashubtc/cdk",      facts: ["Rust"] },
      { name: "Cashu TS", href: "https://github.com/cashubtc/cashu-ts", facts: ["TypeScript"] },
      { name: "Coco",     href: "https://github.com/cashubtc/coco",     facts: ["TypeScript"] },
    ],
  },
  {
    heading: "Tools",
    /* "Not a wallet" is no longer the first thing this line has to say: the
       lead states the page's scope and the two wallet groups name
       themselves. */
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

/* One registry row. Extracted so the two arrival paths below render the
   identical row and differ only in the class it carries: the first group is
   an arrival and its rows are plain, every group under the fold is a
   RevealGroup and its rows are that group's `.reveal-item`s. */
function WalletRow({
  entry,
  className = "wallet-row",
}: {
  entry: Entry;
  className?: string;
}) {
  return (
    <li className={className}>
      {/* Plain text, not a second link. The wordmark and the OPEN slab
          pointed at the same href, so the registry spent 26 tab stops on
          13 destinations and announced every entry twice to a screen
          reader. OPEN is the row's single control; the name is its label. */}
      <span className="wallet-row__id">
        <span className="wallet-row__name t-title">{entry.name}</span>
        <span className="wallet-row__host">{targetOf(entry.href)}</span>
      </span>

      {/* Its own grid column (see .wallet-row in globals.css) so facts line
          up down the page regardless of name or host length — they used to
          trail a variable-width host inline and drifted per row. */}
      <span className="wallet-row__facts">
        {entry.facts?.map((fact) => (
          <span
            key={fact}
            className={`wallet-row__fact${
              STATUS_FACTS.has(fact) ? " wallet-row__fact--tag" : ""
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
    </li>
  );
}

export default function WalletsPage() {
  return (
    /* The twilight stack closes every page (DESIGN.md §5) — the wallet chooser
       leaves past the disclaimer and the spec CTA, not into a dead end after
       the last directory row. It is passed to FooterReveal rather than rendered
       last because the footer is now a plate the page is drawn off, not the
       element after the final row. */
    <FooterReveal
      className="flex flex-col bg-paper text-ink min-h-screen"
      footer={<SiteFooter />}
    >
      <SiteHeader />

      <main className="flex-1 pb-24 lg:pb-32">

      <div className="page-shell flex flex-col pt-16 lg:pt-24">
        <Reveal immediate focus as="header">
          <div id="main-content" tabIndex={-1} className="flex flex-col gap-6 max-w-[60ch]">
            <h1 className="t-display">Wallets.</h1>
            <p className="t-body-lead text-body">
              Wallets first, then the libraries and mint tooling built on the
              same spec. Any client that implements the Cashu protocol is
              conformant. This list is non-exhaustive, a snapshot of what
              people use today, not an endorsement.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-[clamp(4rem,8vw,6.5rem)] mt-[clamp(3.5rem,7vw,6rem)]">
          {DIRECTORY_GROUPS.map((group, gi) => {
            const headingId = `wallets-group-${group.heading
              .toLowerCase()
              .replace(/\s+/g, "-")}`;

            const rail = (
              <>
                <h2 id={headingId} className="t-headline">
                  {group.heading}
                </h2>
                <p className="wallet-group__scope t-body">{group.scope}</p>
              </>
            );

            /* THE FIRST GROUP IS AN ARRIVAL AND THE REST ARE GROUPS, AND THAT
               SPLIT IS THE WHOLE DECISION HERE (2026-08-20, applying the
               Section-Gesture Rule to the route it had skipped).

               This group's rail sits above the fold at every viewport, and a
               RevealGroup is gated on an observer, therefore on hydration.
               Making this one a group would put the top of the route back
               behind React, which is exactly the regression `.reveal--arrival`
               was measured to fix — see the arrival block in globals.css.

               So it stays an arrival, and satisfies the rule's other half
               instead: it arrives as TWO beats, the rail and then the list as
               one block, rather than as the eight it used to be. The rows carry
               no wrapper of their own. */
            if (gi === 0) {
              return (
                <section
                  key={group.heading}
                  aria-labelledby={headingId}
                  className="wallet-group"
                >
                  <Reveal immediate delay={160} className="wallet-group__rail">
                    {rail}
                  </Reveal>
                  <Reveal immediate delay={220}>
                    <ul className="wallet-list">
                      {group.entries.map((entry) => (
                        <WalletRow key={entry.name} entry={entry} />
                      ))}
                    </ul>
                  </Reveal>
                </section>
              );
            }

            /* Everything under the fold is one gesture per group: one observer
               for the rail and its entries, and the entries settle off that one
               class. `aria-labelledby` stays on the <section> and the grid class
               moves onto the group, so RevealGroup's prop surface is untouched.

               The <ul> is a plain grid child and deliberately NOT an item —
               a `.reveal-item` list wrapping `.reveal-item` rows would blur and
               translate every row twice. Its top hairline is structure, not
               content: it holds the register open while the entries land in it.

               The stagger is in globals.css keyed on `.wallet-row`, not on a
               `delay=` prop here. The props this replaced were
               `280 + gi * 60 + i * 50`, which MAX_DELAY_MS clamped to a flat
               360ms from the third row on — an authored ladder that never
               rendered. */
            return (
              <section key={group.heading} aria-labelledby={headingId}>
                <RevealGroup className="wallet-group">
                  <div className="reveal-item wallet-group__rail">{rail}</div>
                  <div>
                    <ul className="wallet-list">
                      {group.entries.map((entry) => (
                        <WalletRow
                          key={entry.name}
                          entry={entry}
                          className="wallet-row reveal-item"
                        />
                      ))}
                    </ul>
                  </div>
                </RevealGroup>
              </section>
            );
          })}
        </div>
      </div>
      </main>
    </FooterReveal>
  );
}
