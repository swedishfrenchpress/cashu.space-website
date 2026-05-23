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

/* Spec — the centerpiece. Renders as a faux file pane: filename strip on top,
   monochrome Geist Mono body underneath. No window-chrome dots, no syntax
   highlighting beyond grey/pixel swaps. Pixel notation is reserved for the
   protocol artefacts (mint id, sat amount) per DESIGN.md §3. */
function Spec() {
  return (
    <div className="bg-[#18181b] w-full">
      <div className="bg-[#27272a] border-b border-zinc-800 px-5 py-3">
        <span className="t-mono text-zinc-400">cashubtc/nuts/nut-00.md</span>
      </div>
      <pre className="t-mono text-zinc-100 p-6 lg:p-8 lg:pl-[260px] overflow-x-auto leading-relaxed">
        <span className="text-zinc-500">{`// Token v4  ·  CBOR encoding`}</span>{"\n\n"}
        {`{\n  "t": [{\n    "i": `}
        <span className="t-pixel">{`h'00…d2'`}</span>
        {`,        `}
        <span className="text-zinc-500">{`// mint id`}</span>
        {`\n    "p": [{\n      "a": `}
        <span className="t-pixel">{`64`}</span>
        {`,              `}
        <span className="text-zinc-500">{`// sats`}</span>
        {`\n      "s": "ecash…"      `}
        <span className="text-zinc-500">{`// blinded sig`}</span>
        {`\n    }]\n  }],\n  "m": "https://mint.example.com",\n  "u": "sat"\n}`}
      </pre>
    </div>
  );
}

/* Card — the floating implementations directory. Paper on Ink. Flat, no
   shadow (the lift comes from z-index and overlap, not elevation). Three
   rows + a quiet link to the rest. Stars are GitHub counts, not protocol
   artefacts, so they stay in t-mono — not t-pixel. */
function Card() {
  const top = REPOS.slice(0, 3);
  return (
    <div className="bg-white text-black w-full divide-y divide-zinc-200">
      <div className="px-5 py-4">
        <span className="t-label text-zinc-500 uppercase tracking-wider">Implementations</span>
      </div>
      {top.map((repo) => (
        <a
          key={repo.name}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-baseline justify-between gap-4 px-5 py-3 transition-colors hover:bg-zinc-50 focus-ring"
        >
          <span className="t-title">{repo.name}</span>
          <span className="t-mono text-zinc-500 whitespace-nowrap">★ {repo.stars}</span>
        </a>
      ))}
      <div className="px-5 py-4">
        <a
          href="https://github.com/cashubtc"
          target="_blank"
          rel="noopener noreferrer"
          className="t-label text-black hover:text-zinc-600 transition-colors focus-ring"
        >
          3 more on GitHub →
        </a>
      </div>
    </div>
  );
}

export default function ReferenceImplementations() {
  return (
    <section className="bg-black text-white section-y-air">
      <div className="page-shell flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-6 max-w-[44ch]">
          <Reveal>
            <h2 className="t-headline">Built in the open.</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="t-body-lead text-zinc-400">
              Six independent implementations across Python, Rust, and TypeScript.
              Anyone can read the spec, run a mint, or fork a wallet.
            </p>
          </Reveal>
        </div>

        {/* The Spec is the centerpiece — full-width on mobile, capped and
            centered on lg+. The Card stacks above the Spec on mobile, then
            on lg+ pulls into absolute position over the Spec's upper-left
            corner so the dark code surface is visible above, below, and to
            the right of the white card. The Spec's pre carries enough left
            padding on lg+ that the code text starts to the right of the
            overlap zone instead of hiding behind the card. */}
        <Reveal slow delay={240}>
          <div className="relative">
            <div className="mb-6 lg:mb-0 lg:absolute lg:left-0 lg:top-16 lg:w-[340px] lg:z-10">
              <Card />
            </div>
            <div className="lg:mx-auto lg:max-w-3xl lg:px-0">
              <Spec />
            </div>
          </div>
        </Reveal>

        <Reveal delay={360}>
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <p className="t-label text-zinc-500">
              cashubtc · 500 followers · ~1.5K stars across implementations
            </p>
            <a
              href="https://github.com/cashubtc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary--on-ink"
            >
              Browse on GitHub →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
