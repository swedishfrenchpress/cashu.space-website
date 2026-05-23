import { CashuMark } from "./cashu-mark";

export default function ClosingCta() {
  return (
    <section className="page-shell pt-16 lg:pt-24 pb-16 lg:pb-24">
      <div className="bg-black text-white px-8 py-20 lg:py-28 relative overflow-hidden isolate">
        {/* Monochrome bloom — mirrors the footer light source so the
            closing-CTA and footer read as one twilight stack. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(100% 60% at 50% 110%, #a1a1aa 0%, #71717a 18%, #3f3f46 34%, #18181b 58%, #000000 80%)",
          }}
        />
        {/* Paper grain — pushes the printed-RFC register on dark surfaces. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-10 lg:gap-14">
          <CashuMark className="h-12 w-12" />
          <h2 className="t-display text-center max-w-[18ch]">
            Cashu, in your pocket.
          </h2>
          <a href="/wallets" className="btn-primary--on-ink btn-primary--lg">
            Get a wallet
          </a>
        </div>
      </div>
    </section>
  );
}
