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

function BlindSignatureFigure({ className }: { className?: string }) {
  // Chaum's carbon-paper envelope — the actual unlinkability mechanism,
  // not a padlock (padlocks are banned privacy-theater iconography; see
  // PRODUCT.md anti-references and DESIGN.md §6). The envelope draws
  // first, then the flap, then the note slipping in half-hidden, and the
  // mint's signature lands on the outside as the closing beat: signed
  // without being seen.
  return (
    <svg {...FIGURE_PROPS} className={className}>
      <rect x="18" y="40" width="84" height="52" className="draw-on" style={drawDelay(0)} pathLength="1" />
      <path d="M 18 40 L 60 70 L 102 40" className="draw-on" style={drawDelay(240)} pathLength="1" />
      {/* The note straddles the top edge — mid-insertion, not floating. */}
      <rect x="46" y="24" width="28" height="16" className="draw-on" style={drawDelay(480)} pathLength="1" />
      <line x1="51" y1="32" x2="69" y2="32" className="draw-on" style={drawDelay(620)} pathLength="1" />
      <path
        d="M 34 82 C 40 74, 46 90, 52 82 S 64 74, 70 82 S 82 88, 88 80"
        className="draw-on"
        style={drawDelay(760)}
        pathLength="1"
      />
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
        <Reveal>
          <h2 className="t-headline max-w-[18ch]">
            Properties of the protocol
          </h2>
        </Reveal>

        {/* Hairline — the section pivots from narrative ("what Cashu is") to
            directory ("what Cashu is made of"). Single 1px Hair line per the
            Hairline Rule (DESIGN.md §4). The doctrine fires exactly once on
            the homepage. */}
        <hr className="border-0 h-px bg-hair -mt-4 lg:-mt-6" aria-hidden />

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
            <div className="relative bg-panel text-panel-fg border border-panel-hair min-h-[420px] md:min-h-[520px] lg:min-h-[560px] h-full overflow-hidden">
              {/* md+ watermark — bleeds past the card edges as the original
                  composition intended. Hidden on mobile in favor of the inline
                  figure below, which centers properly in the column. */}
              <div
                aria-hidden
                className="hidden md:flex absolute inset-0 pointer-events-none items-center justify-center"
              >
                <GlobeFigure className="w-[105%] h-[105%] max-w-none text-panel-fg" />
              </div>
              <div className="relative z-10 flex flex-col h-full p-8 lg:p-10 md:justify-end gap-6 md:gap-3">
                {/* Mobile-only inline figure — centers in the space above the
                    headline so the card reads balanced rather than top-loaded. */}
                <div
                  aria-hidden
                  className="md:hidden flex-1 flex items-center justify-center"
                >
                  <GlobeFigure className="w-44 h-44 text-panel-fg" />
                </div>
                <h3 className="t-title">Open source ecash</h3>
                <p className="t-body text-zinc-300 max-w-[34ch]">
                  Cashu is a free and open-source protocol. Anyone can run a mint.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Bearer token · wide top right, chalk */}
          <Reveal slow delay={120} className="md:col-start-2 md:row-start-1 lg:col-start-auto lg:row-start-auto lg:col-span-2">
            <div className="bg-chalk p-6 sm:p-8 lg:p-10 flex flex-col gap-6 min-h-[240px] h-full">
              <div className="flex-1 flex items-center justify-center">
                <MoneyFigure className="w-36 h-36 lg:w-44 lg:h-44" />
              </div>
              <div className="flex flex-col gap-3 max-w-[52ch]">
                <h3 className="t-title">Bearer token</h3>
                <p className="t-body text-ink">
                  Ecash transactions are instant and final, just like physical
                  cash.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Privacy focused · bottom right left, white with hair */}
          <Reveal slow delay={240} className="md:col-start-2 md:row-start-2">
            <div className="bg-card border border-hair p-6 sm:p-8 lg:p-10 flex flex-col gap-6 min-h-[240px] h-full">
              <div className="flex-1 flex items-center justify-center">
                <BlindSignatureFigure className="w-32 h-32 lg:w-40 lg:h-40" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="t-title">Unlinkable payments</h3>
                <p className="t-body text-ink max-w-[40ch]">
                  Blind signatures unlink the mint from the holder. Payments
                  are peer-to-peer.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Ecash for the Web · bottom right right, white with hair */}
          <Reveal slow delay={360} className="md:col-start-2 md:row-start-3 lg:col-start-auto lg:row-start-auto">
            <div className="bg-card border border-hair p-6 sm:p-8 lg:p-10 flex flex-col gap-6 min-h-[240px] h-full">
              <div className="flex-1 flex items-center justify-center">
                <WalletFigure className="w-32 h-32 lg:w-40 lg:h-40" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="t-title">Ecash for the web</h3>
                <p className="t-body text-ink max-w-[40ch]">
                  Tokens fit in HTTP headers, URLs, and JSON. Wire Cashu into
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
