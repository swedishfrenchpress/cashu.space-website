import Reveal from "./reveal";

type Repo = {
  name: string;
  url: string;
  tag: string;
  lang: string;
};

/* Canonical repo list for the cashubtc org. Star/fork counts intentionally
   omitted — the site is "a directory and manifesto, not a product page"
   (PRODUCT.md). The tag carries the "what is this" signal; the language
   mark carries the "real X, real Y" signal. Both age well. */
const REPOS: Repo[] = [
  { name: "nutshell",      url: "https://github.com/cashubtc/nutshell",      tag: "Wallet & mint",   lang: "Python"     },
  { name: "nuts",          url: "https://github.com/cashubtc/nuts",          tag: "Spec",            lang: "—"          },
  { name: "cdk",           url: "https://github.com/cashubtc/cdk",           tag: "Dev kit",         lang: "Rust"       },
  { name: "eNuts",         url: "https://github.com/cashubtc/eNuts",         tag: "Mobile wallet",   lang: "TypeScript" },
  { name: "cashu.me",      url: "https://github.com/cashubtc/cashu.me",      tag: "Web wallet",      lang: "TypeScript" },
  { name: "awesome-cashu", url: "https://github.com/cashubtc/awesome-cashu", tag: "Resources",       lang: "—"          },
  { name: "coco",          url: "https://github.com/cashubtc/coco",          tag: "Wallet toolkit",  lang: "TypeScript" },
];

/* Language marks — full-color brand glyphs. This is a deliberate, scoped
   exception to the No-Colour Rule (DESIGN.md). The Implementations card is
   the one surface where brand recognition outranks monochrome doctrine —
   readers need to see "real Python, real Rust, real TypeScript" at a glance.
   Do not re-monochrome these without re-opening the design decision. */
function PythonMark() {
  return (
    <svg
      aria-hidden
      viewBox="0.21 -0.077 110 110"
      width="24"
      height="24"
      className="shrink-0"
    >
      <linearGradient
        id="python-blue"
        gradientUnits="userSpaceOnUse"
        x1="63.8159"
        y1="56.6829"
        x2="118.4934"
        y2="1.8225"
        gradientTransform="matrix(1 0 0 -1 -53.2974 66.4321)"
      >
        <stop offset="0" stopColor="#387EB8" />
        <stop offset="1" stopColor="#366994" />
      </linearGradient>
      <linearGradient
        id="python-yellow"
        gradientUnits="userSpaceOnUse"
        x1="97.0444"
        y1="21.6321"
        x2="155.6665"
        y2="-34.5308"
        gradientTransform="matrix(1 0 0 -1 -53.2974 66.4321)"
      >
        <stop offset="0" stopColor="#FFE052" />
        <stop offset="1" stopColor="#FFC331" />
      </linearGradient>
      <path
        fill="url(#python-blue)"
        d="M55.023-0.077c-25.971,0-26.25,10.081-26.25,12.156c0,3.148,0,12.594,0,12.594h26.75v3.781 c0,0-27.852,0-37.375,0c-7.949,0-17.938,4.833-17.938,26.25c0,19.673,7.792,27.281,15.656,27.281c2.335,0,9.344,0,9.344,0 s0-9.765,0-13.125c0-5.491,2.721-15.656,15.406-15.656c15.91,0,19.971,0,26.531,0c3.902,0,14.906-1.696,14.906-14.406 c0-13.452,0-17.89,0-24.219C82.054,11.426,81.515-0.077,55.023-0.077z M40.273,8.392c2.662,0,4.813,2.15,4.813,4.813 c0,2.661-2.151,4.813-4.813,4.813s-4.813-2.151-4.813-4.813C35.46,10.542,37.611,8.392,40.273,8.392z"
      />
      <path
        fill="url(#python-yellow)"
        d="M55.397,109.923c25.959,0,26.282-10.271,26.282-12.156c0-3.148,0-12.594,0-12.594H54.897v-3.781 c0,0,28.032,0,37.375,0c8.009,0,17.938-4.954,17.938-26.25c0-23.322-10.538-27.281-15.656-27.281c-2.336,0-9.344,0-9.344,0 s0,10.216,0,13.125c0,5.491-2.631,15.656-15.406,15.656c-15.91,0-19.476,0-26.532,0c-3.892,0-14.906,1.896-14.906,14.406 c0,14.475,0,18.265,0,24.219C28.366,100.497,31.562,109.923,55.397,109.923z M70.148,101.454c-2.662,0-4.813-2.151-4.813-4.813 s2.15-4.813,4.813-4.813c2.661,0,4.813,2.151,4.813,4.813S72.809,101.454,70.148,101.454z"
      />
    </svg>
  );
}

function TypeScriptMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 512 512"
      width="24"
      height="24"
      className="shrink-0 rounded"
    >
      <rect fill="#3178c6" height="512" rx="50" width="512" />
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        fill="#fff"
        d="m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z"
      />
    </svg>
  );
}

function RustMark() {
  // Source uses an inner translate(53, 53) so the logo is centered in a
  // 106×106 canvas with the origin at center. Re-expressed with viewBox so
  // it scales cleanly. Rendered in currentColor (black on the white card).
  return (
    <svg
      aria-hidden
      viewBox="0 0 106 106"
      width="24"
      height="24"
      className="shrink-0"
    >
      <g transform="translate(53, 53)">
        <mask id="rust-holes">
          <rect x="-60" y="-60" width="120" height="120" fill="white" />
          <circle cy="-40" r="3" fill="black" />
          <circle cy="-40" r="3" fill="black" transform="rotate(72)" />
          <circle cy="-40" r="3" fill="black" transform="rotate(144)" />
          <circle cy="-40" r="3" fill="black" transform="rotate(216)" />
          <circle cy="-40" r="3" fill="black" transform="rotate(288)" />
        </mask>
        <path
          transform="translate(0.5, 0.5)"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
          fill="currentColor"
          d="M -9,-15 H 4 C 12,-15 12,-7 4,-7 H -9 Z M -40,22 H 0 V 11 H -9 V 3 H 1 C 12,3 6,22 15,22 H 40 V 3 H 34 V 5 C 34,13 25,12 24,7 C 23,2 19,-2 18,-2 C 33,-10 24,-26 12,-26 H -35 V -15 H -25 V 11 H -40 Z"
        />
        <g mask="url(#rust-holes)">
          <circle r="43" fill="none" stroke="currentColor" strokeWidth="9" />
          {[
            0, 11.25, 22.5, 33.75, 45, 56.25, 67.5, 78.75, 90, 101.25, 112.5,
            123.75, 135, 146.25, 157.5, 168.75, 180, 191.25, 202.5, 213.75, 225,
            236.25, 247.5, 258.75, 270, 281.25, 292.5, 303.75, 315, 326.25,
            337.5, 348.75,
          ].map((angle) => (
            <polygon
              key={`cog-${angle}`}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinejoin="round"
              fill="currentColor"
              points="46,3 51,0 46,-3"
              transform={`rotate(${angle})`}
            />
          ))}
          {[0, 72, 144, 216, 288].map((angle) => (
            <polygon
              key={`mount-${angle}`}
              stroke="currentColor"
              strokeWidth="6"
              strokeLinejoin="round"
              fill="currentColor"
              points="-7,-42 0,-35 7,-42"
              transform={`rotate(${angle})`}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

function LangMark({ lang }: { lang: string }) {
  if (lang === "Python") return <PythonMark />;
  if (lang === "TypeScript") return <TypeScriptMark />;
  if (lang === "Rust") return <RustMark />;
  return null;
}

/* Spec — the centerpiece. Renders as a faux file pane: filename strip on top,
   monochrome Geist Mono body underneath. No window-chrome dots, no syntax
   highlighting beyond grey/pixel swaps. Pixel notation is reserved for the
   protocol artefacts (mint id, sat amount) per DESIGN.md §3. */
function Spec() {
  return (
    <div className="bg-[#18181b] w-full">
      {/* Header strip — slim, two-cell: file path left, spec metadata right.
         Earns the strip space by carrying information instead of leaving the
         right half blank like a browser tab. */}
      <div className="flex items-center justify-between gap-6 bg-[#27272a] border-b border-zinc-800 px-5 py-3 t-mono">
        <span className="text-zinc-400 truncate">cashubtc/nuts/nut-00.md</span>
        <span className="hidden sm:inline text-zinc-500 whitespace-nowrap">
          v0 · CBOR encoding
        </span>
      </div>
      {/* Left padding on lg+ clears the floating Card's right edge with a
         hair of breathing room. The offset lives on the .spec-pane class so
         the magic number doesn't sit inline — see globals.css. */}
      <pre className="spec-pane t-mono text-zinc-100 px-6 py-7 lg:py-9 lg:pr-10 overflow-x-auto leading-7">
        <span className="text-zinc-500">{`// Cashu Token v4  ·  CBOR encoding`}</span>{"\n\n"}
        {`{\n  "t": [{\n    "i": `}
        <span className="t-pixel">{`h'00…d2'`}</span>
        {`,        `}
        <span className="text-zinc-500">{`// mint id`}</span>
        {`\n    "p": [{\n      "a": `}
        <span className="t-pixel">{`64`}</span>
        {`,              `}
        <span className="text-zinc-500">{`// sats`}</span>
        {`\n      "s": h'02ab…f1',      `}
        <span className="text-zinc-500">{`// blinded signature`}</span>
        {`\n      "d": h'0248…e4'       `}
        <span className="text-zinc-500">{`// DLEQ proof`}</span>
        {`\n    }, {\n      "a": `}
        <span className="t-pixel">{`128`}</span>
        {`,             `}
        <span className="text-zinc-500">{`// sats`}</span>
        {`\n      "s": h'03c9…7e',\n      "d": h'0187…a6'\n    }]\n  }],\n  "m": "https://mint.example.com",\n  "u": "sat",\n  "v": 4\n}`}
      </pre>
    </div>
  );
}

/* Card — the floating implementations directory. Paper on Ink. Flat, no
   shadow (the lift comes from z-index and overlap, not elevation). Three
   featured rows + a quiet link to the rest. Featured repos are picked by
   language coverage (Python/Rust/TypeScript) so the card mirrors the lead's
   "Active across Python, Rust, and TypeScript" claim. Each row carries the
   language mark on the left and the project's role on the right — name in
   the middle. No stars: the visitor isn't choosing between nutshell and cdk
   by GitHub vanity counts. */
const FEATURED = ["nutshell", "cdk", "coco"] as const;
const REMAINING = REPOS.length - FEATURED.length;

/* The headline's count is derived from the directory it sits above, so the
   two can never disagree — nuts (Spec) and awesome-cashu (Resources) are
   catalogue entries, not implementations. */
const IMPLEMENTATIONS = REPOS.filter(
  (r) => r.tag !== "Spec" && r.tag !== "Resources",
).length;
const COUNT_WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
] as const;
const IMPLEMENTATIONS_WORD =
  COUNT_WORDS[IMPLEMENTATIONS] ?? String(IMPLEMENTATIONS);

function Card() {
  const featured = FEATURED.map((name) => REPOS.find((r) => r.name === name)!);
  return (
    <div className="bg-white text-black w-full divide-y divide-zinc-200">
      <div className="px-5 py-4">
        <span
          className="t-label text-zinc-500 uppercase"
          style={{ letterSpacing: "0.06em" }}
        >
          Implementations
        </span>
      </div>
      {featured.map((repo) => (
        <a
          key={repo.name}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-4 px-5 py-3 transition-colors hover:bg-zinc-50 focus-ring"
        >
          <span className="flex items-center gap-3 min-w-0">
            <LangMark lang={repo.lang} />
            <span className="t-title truncate">{repo.name}</span>
          </span>
          <span className="t-label text-zinc-500 whitespace-nowrap">{repo.tag}</span>
        </a>
      ))}
      {/* Non-interactive metadata, not a text-arrow link — the section's
          single GitHub action is the CTA below the panel. */}
      <div className="px-5 py-4">
        <span className="t-label text-zinc-500">
          + {REMAINING} more in the cashubtc org
        </span>
      </div>
    </div>
  );
}

export default function ReferenceImplementations() {
  return (
    <section className="bg-black text-white section-y-default">
      <div className="page-shell flex flex-col gap-12 lg:gap-16">
        <div className="implementations-intro flex flex-col gap-6">
          <Reveal>
            <h2 className="t-headline">
              {IMPLEMENTATIONS_WORD} implementations, one spec.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="t-body-lead text-zinc-400">
              Active across Python, Rust, and TypeScript. The cashubtc
              organization hosts the spec, the SDKs, and the reference
              wallets.
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
          <div className="flex justify-start lg:justify-end">
            <a
              href="https://github.com/cashubtc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary--on-ink"
            >
              View on GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
