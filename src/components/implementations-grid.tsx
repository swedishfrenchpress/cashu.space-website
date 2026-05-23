import Reveal from "./reveal";

const FIGURE_PROPS = {
  viewBox: "0 0 120 120",
  fill: "none",
  stroke: "currentColor",
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

function NetworkFigure({ className }: { className?: string }) {
  // Order: outer ring first (clockwise from upper-left), then the spokes to
  // the central node. The hub-and-spoke topology is the editorial reading.
  return (
    <svg {...FIGURE_PROPS} className={className}>
      <line x1="20" y1="30" x2="45" y2="18" className="draw-on" style={drawDelay(0)} pathLength="1" />
      <line x1="45" y1="18" x2="75" y2="32" className="draw-on" style={drawDelay(60)} pathLength="1" />
      <line x1="75" y1="32" x2="98" y2="50" className="draw-on" style={drawDelay(120)} pathLength="1" />
      <line x1="98" y1="50" x2="88" y2="82" className="draw-on" style={drawDelay(180)} pathLength="1" />
      <line x1="88" y1="82" x2="60" y2="95" className="draw-on" style={drawDelay(240)} pathLength="1" />
      <line x1="60" y1="95" x2="28" y2="78" className="draw-on" style={drawDelay(300)} pathLength="1" />
      <line x1="28" y1="78" x2="20" y2="30" className="draw-on" style={drawDelay(360)} pathLength="1" />
      <line x1="52" y1="55" x2="20" y2="30" className="draw-on" style={drawDelay(440)} pathLength="1" />
      <line x1="52" y1="55" x2="45" y2="18" className="draw-on" style={drawDelay(490)} pathLength="1" />
      <line x1="52" y1="55" x2="75" y2="32" className="draw-on" style={drawDelay(540)} pathLength="1" />
      <line x1="52" y1="55" x2="88" y2="82" className="draw-on" style={drawDelay(590)} pathLength="1" />
      <line x1="52" y1="55" x2="28" y2="78" className="draw-on" style={drawDelay(640)} pathLength="1" />
      <circle cx="20" cy="30" r="2.5" fill="#000000" className="draw-on--filled" style={drawDelay(380)} />
      <circle cx="45" cy="18" r="2.5" fill="#000000" className="draw-on--filled" style={drawDelay(420)} />
      <circle cx="75" cy="32" r="2.5" fill="#000000" className="draw-on--filled" style={drawDelay(460)} />
      <circle cx="98" cy="50" r="2.5" fill="#000000" className="draw-on--filled" style={drawDelay(500)} />
      <circle cx="88" cy="82" r="2.5" fill="#000000" className="draw-on--filled" style={drawDelay(540)} />
      <circle cx="60" cy="95" r="2.5" fill="#000000" className="draw-on--filled" style={drawDelay(580)} />
      <circle cx="28" cy="78" r="2.5" fill="#000000" className="draw-on--filled" style={drawDelay(620)} />
      <circle cx="52" cy="55" r="2.5" fill="#000000" className="draw-on--filled" style={drawDelay(740)} />
    </svg>
  );
}

function TokenFigure({ className }: { className?: string }) {
  return (
    <svg {...FIGURE_PROPS} className={className}>
      <line x1="6" y1="60" x2="114" y2="60" className="draw-on" style={drawDelay(0)} pathLength="1" />
      <circle cx="60" cy="60" r="32" className="draw-on" style={drawDelay(120)} pathLength="1" />
      <circle cx="60" cy="60" r="22" className="draw-on" style={drawDelay(220)} pathLength="1" />
      <line x1="28" y1="54" x2="28" y2="66" className="draw-on" style={drawDelay(340)} pathLength="1" />
      <line x1="92" y1="54" x2="92" y2="66" className="draw-on" style={drawDelay(380)} pathLength="1" />
    </svg>
  );
}

function PrivacyFigure({ className }: { className?: string }) {
  // The two large circles overlap; their intersection is the "blind" region.
  // We draw the inner circle first, then the mask rect (instantly), then the
  // two large rings draw simultaneously to reveal the overlap.
  return (
    <svg {...FIGURE_PROPS} className={className}>
      <circle cx="60" cy="60" r="11" className="draw-on" style={drawDelay(0)} pathLength="1" />
      <rect x="58" y="47" width="24" height="28" fill="#ffffff" stroke="none" />
      <circle cx="45" cy="60" r="26" className="draw-on" style={drawDelay(220)} pathLength="1" />
      <circle cx="75" cy="60" r="26" className="draw-on" style={drawDelay(340)} pathLength="1" />
    </svg>
  );
}

function WebFigure({ className }: { className?: string }) {
  return (
    <svg {...FIGURE_PROPS} className={className}>
      <rect x="12" y="22" width="88" height="70" className="draw-on" style={drawDelay(0)} pathLength="1" />
      <rect x="22" y="32" width="78" height="58" className="draw-on" style={drawDelay(140)} pathLength="1" />
      <rect x="34" y="44" width="58" height="38" className="draw-on" style={drawDelay(280)} pathLength="1" />
      <circle cx="52" cy="62" r="4" className="draw-on--filled" style={drawDelay(440)} />
    </svg>
  );
}

export default function ImplementationsGrid() {
  return (
    <section className="page-shell pt-16 lg:pt-24 pb-16 lg:pb-24">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <Reveal>
            <h2 className="t-headline max-w-[18ch]">
              Properties of the protocol
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <a href="/spec" className="btn-primary self-start">
              Read the spec
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:gap-6">
          {/* Open source ecash · tall left, black */}
          <Reveal slow className="lg:row-span-2">
            <div className="bg-black text-white p-8 lg:p-10 flex flex-col gap-8 min-h-[420px] lg:min-h-[560px] h-full">
              <div className="flex-1 flex items-center justify-center">
                <NetworkFigure className="w-48 h-48 lg:w-60 lg:h-60" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="t-title">Open source ecash</h3>
                <p className="t-body text-zinc-300 max-w-[34ch]">
                  Cashu is a free and open-source protocol. Anyone can run a mint.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Bearer token · wide top right, chalk */}
          <Reveal slow delay={120} className="lg:col-span-2">
            <div className="bg-zinc-100 p-8 lg:p-10 flex flex-col gap-6 min-h-[240px] h-full">
              <div className="flex-1 flex items-center justify-center">
                <TokenFigure className="w-36 h-36 lg:w-44 lg:h-44" />
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
          <Reveal slow delay={240}>
            <div className="bg-white border border-zinc-200 p-8 lg:p-10 flex flex-col gap-6 min-h-[240px] h-full">
              <div className="flex-1 flex items-center justify-center">
                <PrivacyFigure className="w-32 h-32 lg:w-40 lg:h-40" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="t-title">Privacy focused</h3>
                <p className="t-body text-zinc-900 max-w-[40ch]">
                  Blind signatures preserve user privacy. Transactions are
                  peer-to-peer.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Ecash for the Web · bottom right right, white with hair */}
          <Reveal slow delay={360}>
            <div className="bg-white border border-zinc-200 p-8 lg:p-10 flex flex-col gap-6 min-h-[240px] h-full">
              <div className="flex-1 flex items-center justify-center">
                <WebFigure className="w-32 h-32 lg:w-40 lg:h-40" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="t-title">Ecash for the Web</h3>
                <p className="t-body text-zinc-900 max-w-[40ch]">
                  Ecash payments can be included in web requests. Use Cashu for
                  your website or application.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
