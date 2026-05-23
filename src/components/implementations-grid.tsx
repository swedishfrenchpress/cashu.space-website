import Reveal from "./reveal";

const FIGURE_PROPS = {
  viewBox: "0 0 120 120",
  fill: "none",
  stroke: "currentColor",
  // 1.5 reads as architectural — RFC figure, not pencil sketch. 1px hair
  // disappears against the white cards at 128–176px display sizes.
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/**
 * Returns a style object that assigns a stagger delay (in ms) to a
 * `.draw-on` element. Used to sequence line-art figures so they trace
 * themselves as the card enters view — RFC-figure pacing, not motion fizz.
 */
function drawDelay(ms: number) {
  return { "--draw-delay": `${ms}ms` } as React.CSSProperties;
}

function GlobeFigure({ className }: { className?: string }) {
  // Sphere first, then the meridian, then the equator, then the angled
  // latitude — reads as the globe being constructed line by line.
  return (
    <svg {...FIGURE_PROPS} className={className}>
      <circle cx="60" cy="60" r="42" className="draw-on" style={drawDelay(0)} pathLength="1" />
      <ellipse cx="60" cy="60" rx="18" ry="42" className="draw-on" style={drawDelay(220)} pathLength="1" />
      <line x1="18" y1="60" x2="102" y2="60" className="draw-on" style={drawDelay(440)} pathLength="1" />
      <ellipse cx="60" cy="60" rx="42" ry="16" className="draw-on" style={drawDelay(560)} pathLength="1" />
    </svg>
  );
}

function MoneyFigure({ className }: { className?: string }) {
  // Bill frame first (the field), then the inner border, then the central
  // seal, then the two corner accents. The stack line below lands last as
  // a quiet finish.
  return (
    <svg {...FIGURE_PROPS} className={className}>
      <rect x="12" y="34" width="96" height="52" className="draw-on" style={drawDelay(0)} pathLength="1" />
      <rect x="20" y="42" width="80" height="36" className="draw-on" style={drawDelay(180)} pathLength="1" />
      <circle cx="60" cy="60" r="9" className="draw-on" style={drawDelay(360)} pathLength="1" />
      <circle cx="28" cy="50" r="1.8" fill="currentColor" stroke="none" className="draw-on--filled" style={drawDelay(520)} />
      <circle cx="92" cy="50" r="1.8" fill="currentColor" stroke="none" className="draw-on--filled" style={drawDelay(560)} />
      <circle cx="28" cy="70" r="1.8" fill="currentColor" stroke="none" className="draw-on--filled" style={drawDelay(600)} />
      <circle cx="92" cy="70" r="1.8" fill="currentColor" stroke="none" className="draw-on--filled" style={drawDelay(640)} />
      <line x1="14" y1="96" x2="106" y2="96" className="draw-on" style={drawDelay(720)} pathLength="1" />
    </svg>
  );
}

function LockFigure({ className }: { className?: string }) {
  // Shackle arcs in from the left first, then the body, then the keyhole.
  // The arc draws as a single stroke — that's the satisfying beat.
  return (
    <svg {...FIGURE_PROPS} className={className}>
      <path
        d="M 38 60 V 46 A 22 22 0 0 1 82 46 V 60"
        className="draw-on"
        style={drawDelay(0)}
        pathLength="1"
      />
      <rect x="24" y="60" width="72" height="48" className="draw-on" style={drawDelay(360)} pathLength="1" />
      <circle cx="60" cy="80" r="4" className="draw-on" style={drawDelay(620)} pathLength="1" />
      <line x1="60" y1="84" x2="60" y2="94" className="draw-on" style={drawDelay(760)} pathLength="1" />
    </svg>
  );
}

function WalletFigure({ className }: { className?: string }) {
  // Wallet body first, then the top fold, then the card pocket on the
  // right, then the coin dot drops into the pocket as the closing beat.
  return (
    <svg {...FIGURE_PROPS} className={className}>
      <rect x="12" y="30" width="96" height="64" className="draw-on" style={drawDelay(0)} pathLength="1" />
      <line x1="12" y1="44" x2="108" y2="44" className="draw-on" style={drawDelay(240)} pathLength="1" />
      <rect x="66" y="58" width="42" height="22" className="draw-on" style={drawDelay(420)} pathLength="1" />
      <circle cx="78" cy="69" r="2.4" fill="currentColor" stroke="none" className="draw-on--filled" style={drawDelay(620)} />
    </svg>
  );
}

export default function ImplementationsGrid() {
  return (
    <section className="page-shell section-y-air">
      <div className="flex flex-col gap-10 md:gap-12 lg:gap-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <Reveal>
            <h2 className="t-headline max-w-[18ch]">
              Properties of the protocol
            </h2>
          </Reveal>
          <Reveal delay={120}>
            {/* Section handoff CTA — Read the spec lives in canonical docs at
                docs.cashu.space. Stays secondary by Two-CTA Rule (DESIGN.md §1);
                this is the handoff, not a competing ask. */}
            <a
              href="https://docs.cashu.space/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary self-start"
            >
              Read the spec
            </a>
          </Reveal>
        </div>

        {/* Hairline — the section pivots from narrative ("what Cashu is") to
            directory ("what Cashu is made of"). Single 1px Hair line per the
            Hairline Rule (DESIGN.md §4). The doctrine fires exactly once on
            the homepage. */}
        <hr className="border-0 h-px bg-zinc-200 -mt-4 lg:-mt-6" aria-hidden />

        {/* Layout: 1 col on phone, 2 col on tablet (Card 1 spans the left
            column full-height while Cards 2–4 stack down the right), 3 col
            on desktop (Card 1 tall left, Card 2 wide top-right, Cards 3+4
            paired bottom-right). The tablet treatment keeps the bento
            shape from collapsing into a long single-column scroll. */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:gap-6">
          {/* Open source ecash · tall left, black. The network figure sits
              as a low-opacity watermark behind the type, which is flush-
              bottom-left — gives this card its own internal shape so the
              bento isn't four identical layouts at different sizes. The
              card stays inside the page-shell so the grid reads centered. */}
          <Reveal slow className="md:row-span-3 lg:row-span-2">
            <div className="relative bg-black text-white min-h-[420px] md:min-h-[520px] lg:min-h-[560px] h-full overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
              >
                <GlobeFigure className="w-[105%] h-[105%] max-w-none text-white" />
              </div>
              <div className="relative z-10 flex flex-col h-full justify-end gap-3 p-8 lg:p-10">
                <h3 className="t-title">Open source ecash</h3>
                <p className="t-body text-zinc-300 max-w-[34ch]">
                  Cashu is a free and open-source protocol. Anyone can run a mint.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Bearer token · wide top right, chalk */}
          <Reveal slow delay={120} className="md:col-start-2 md:row-start-1 lg:col-start-auto lg:row-start-auto lg:col-span-2">
            <div className="bg-zinc-100 p-6 sm:p-8 lg:p-10 flex flex-col gap-6 min-h-[240px] h-full">
              <div className="flex-1 flex items-center justify-center">
                <MoneyFigure className="w-36 h-36 lg:w-44 lg:h-44" />
              </div>
              <div className="flex flex-col gap-3 max-w-[52ch]">
                <h3 className="t-title">Bearer token</h3>
                <p className="t-body text-zinc-900">
                  Ecash transactions are instant and final, just like physical
                  cash.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Privacy focused · bottom right left, white with hair */}
          <Reveal slow delay={240} className="md:col-start-2 md:row-start-2">
            <div className="bg-white border border-zinc-200 p-6 sm:p-8 lg:p-10 flex flex-col gap-6 min-h-[240px] h-full">
              <div className="flex-1 flex items-center justify-center">
                <LockFigure className="w-32 h-32 lg:w-40 lg:h-40" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="t-title">Privacy focused</h3>
                <p className="t-body text-zinc-900 max-w-[40ch]">
                  Blind signatures unlink the mint from the holder. Payments
                  are peer-to-peer.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Ecash for the Web · bottom right right, white with hair */}
          <Reveal slow delay={360} className="md:col-start-2 md:row-start-3 lg:col-start-auto lg:row-start-auto">
            <div className="bg-white border border-zinc-200 p-6 sm:p-8 lg:p-10 flex flex-col gap-6 min-h-[240px] h-full">
              <div className="flex-1 flex items-center justify-center">
                <WalletFigure className="w-32 h-32 lg:w-40 lg:h-40" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="t-title">Ecash for the Web</h3>
                <p className="t-body text-zinc-900 max-w-[40ch]">
                  Tokens fit in HTTP headers, URLs, and JSON. Wire cashu into
                  any web flow.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
