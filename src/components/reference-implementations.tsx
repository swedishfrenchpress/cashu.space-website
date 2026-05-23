import Reveal from "./reveal";

type Repo = {
  name: string;
  url: string;
  tag: string;
  lang: string;
  stars: number;
  forks: number;
};

/* Hand-maintained snapshot of the cashubtc org. Refresh by hand on releases —
   numbers drift slowly and the site is static-first by doctrine. */
const REPOS: Repo[] = [
  { name: "nutshell",      url: "https://github.com/cashubtc/nutshell",      tag: "Wallet & mint", lang: "Python",     stars: 479, forks: 168 },
  { name: "nuts",          url: "https://github.com/cashubtc/nuts",          tag: "Spec",          lang: "—",          stars: 228, forks:  77 },
  { name: "cdk",           url: "https://github.com/cashubtc/cdk",           tag: "Dev kit",       lang: "Rust",       stars: 217, forks: 127 },
  { name: "eNuts",         url: "https://github.com/cashubtc/eNuts",         tag: "Mobile wallet", lang: "TypeScript", stars: 209, forks:  34 },
  { name: "cashu.me",      url: "https://github.com/cashubtc/cashu.me",      tag: "Web wallet",    lang: "TypeScript", stars: 206, forks: 102 },
  { name: "awesome-cashu", url: "https://github.com/cashubtc/awesome-cashu", tag: "Resources",     lang: "—",          stars: 205, forks:  22 },
];

export default function ReferenceImplementations() {
  return (
    <section className="page-shell section-y-air">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-6 max-w-[44ch]">
          <Reveal>
            <h2 className="t-headline">Built in the open.</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="t-body-lead text-zinc-700">
              Six independent implementations across Python, Rust, and TypeScript.
              Anyone can read the spec, run a mint, or fork a wallet.
            </p>
          </Reveal>
        </div>

        {/* Single Reveal wraps the whole manifest — rows reveal as a block.
            Per-row stagger would compete with the "read as a lockfile" intent. */}
        <Reveal slow delay={240}>
          <ul className="bg-zinc-100 divide-y divide-zinc-200">
            {REPOS.map((repo) => (
              <li key={repo.name}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-2 px-6 py-5 lg:grid lg:grid-cols-[1.4fr_1.6fr_minmax(8rem,auto)_4rem_5rem] lg:gap-x-6 lg:items-baseline lg:px-8 lg:py-6 transition-colors hover:bg-zinc-50 focus-ring"
                >
                  <span className="t-title">{repo.name}</span>
                  <span className="t-label text-zinc-700">{repo.tag}</span>
                  {/* Meta line — flex-wrap row on mobile, dissolves into the
                      parent grid on lg+ via display:contents (lg:contents). */}
                  <div className="flex flex-wrap items-baseline gap-x-4 lg:contents">
                    <span className="t-mono text-zinc-500">{repo.lang}</span>
                    <span className="t-mono text-zinc-900 whitespace-nowrap lg:text-right">★ {repo.stars}</span>
                    <span className="t-mono text-zinc-500 whitespace-nowrap lg:text-right">{repo.forks} forks</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={360}>
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <p className="t-label text-zinc-500">
              cashubtc · 500 followers · ~1.5K stars across implementations
            </p>
            {/* Secondary, not primary: hero owns the two homepage primaries.
                The chip carries an in-chip mono count via .btn-with-count. */}
            <a
              href="https://github.com/cashubtc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-with-count"
            >
              <span>Browse on GitHub →</span>
              <span className="btn-with-count__meta">★ 1.5K</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
