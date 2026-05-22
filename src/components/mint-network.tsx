import { BankVault } from "@carbon/icons-react";

type Mint = {
  id: string;
  label: string;
  // Percentage coordinates within the SVG viewBox. Computed from approximate
  // lat/lon: x_pct = 6.4 + (lon + 180)/360 * 87.2; y_pct = 9.5 + (90 - lat)/158 * 81.
  // The leading 6.4 / 9.5 offsets account for the world-map.png white padding.
  xPct: number;
  yPct: number;
};

const MINTS: Mint[] = [
  { id: "na", label: "Austin",     xPct: 25.8, yPct: 37.7 }, // 35°N, 100°W
  { id: "eu", label: "Berlin",     xPct: 52.4, yPct: 30.0 }, // 50°N, 10°E
  { id: "wa", label: "Lagos",      xPct: 50.7, yPct: 52.6 }, // 6°N, 3°E
  { id: "sa", label: "Mumbai",     xPct: 67.7, yPct: 45.9 }, // 19°N, 73°E
  { id: "ea", label: "Tokyo",      xPct: 83.9, yPct: 37.7 }, // 35°N, 140°E
  { id: "au", label: "Sydney",     xPct: 86.6, yPct: 73.1 }, // 34°S, 151°E
];

type Link = { from: string; to: string; durationSeconds: number };

const LINKS: Link[] = [
  { from: "na", to: "eu", durationSeconds: 3 },
  { from: "eu", to: "wa", durationSeconds: 4 },
  { from: "eu", to: "sa", durationSeconds: 5.5 },
  { from: "sa", to: "ea", durationSeconds: 3.5 },
  { from: "ea", to: "au", durationSeconds: 4.5 },
];

const VIEWBOX_W = 1400;
const VIEWBOX_H = 700;

function findMint(id: string): Mint {
  const m = MINTS.find((m) => m.id === id);
  if (!m) throw new Error(`Unknown mint id: ${id}`);
  return m;
}

function linkPath(link: Link): string {
  const a = findMint(link.from);
  const b = findMint(link.to);
  const x1 = (a.xPct / 100) * VIEWBOX_W;
  const y1 = (a.yPct / 100) * VIEWBOX_H;
  const x2 = (b.xPct / 100) * VIEWBOX_W;
  const y2 = (b.yPct / 100) * VIEWBOX_H;
  // Lift the Bézier control point above the chord — routes, not chords.
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.18;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

type MintNetworkProps = {
  className?: string;
};

export default function MintNetwork({ className = "" }: MintNetworkProps) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {/* Lines: white halo first (knocks out dot noise), then ink dashed path on top */}
      {LINKS.map((link) => {
        const d = linkPath(link);
        const key = `${link.from}-${link.to}`;
        return (
          <g key={key}>
            <path d={d} stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path
              d={d}
              stroke="#000000"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              strokeLinecap="round"
              fill="none"
              className="mint-flow"
              style={
                {
                  ["--mint-flow-duration"]: `${link.durationSeconds}s`,
                } as React.CSSProperties
              }
            />
          </g>
        );
      })}

      {/* Markers: square white card with ink hairline + centered icon */}
      {MINTS.map((mint) => {
        const cx = (mint.xPct / 100) * VIEWBOX_W;
        const cy = (mint.yPct / 100) * VIEWBOX_H;
        const SIZE = 30;
        const ICON = 18;
        return (
          <g key={mint.id} transform={`translate(${cx} ${cy})`}>
            <rect
              x={-SIZE / 2}
              y={-SIZE / 2}
              width={SIZE}
              height={SIZE}
              fill="#ffffff"
              stroke="#000000"
              strokeWidth="1"
            />
            <g transform={`translate(${-ICON / 2} ${-ICON / 2})`} color="#000000">
              <BankVault size={ICON} />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
