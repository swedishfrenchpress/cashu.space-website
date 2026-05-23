"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./reveal";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] =
  [
    {
      heading: "Protocol",
      links: [
        { label: "Specification", href: "/spec" },
        { label: "Documentation", href: "/docs" },
        { label: "NUTs", href: "/spec/nuts" },
        { label: "Tokens", href: "/tokens" },
      ],
    },
    {
      heading: "Implementations",
      links: [
        { label: "Wallets", href: "/wallets" },
        { label: "Mints", href: "/mints" },
        { label: "Libraries", href: "/libraries" },
        { label: "Run a mint", href: "/mints/run" },
      ],
    },
    {
      heading: "Community",
      links: [
        { label: "GitHub", href: "https://github.com/cashubtc" },
        { label: "Nostr", href: "#" },
        { label: "Telegram", href: "#" },
        { label: "Contributors", href: "/contributors" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "/faq" },
        { label: "Brand", href: "/brand" },
        { label: "Press", href: "/press" },
      ],
    },
  ];

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function SiteFooter() {
  const wordmarkRef = useRef<HTMLDivElement | null>(null);
  // Scroll progress 0..1 — 0 when the wordmark is fully below the fold,
  // 1 when it has fully entered. Drives a slow parallax settle on the
  // giant cashu lockup; pairs with the static translateY(8%) bleed so the
  // mark feels like it RISES into its resting position.
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = wordmarkRef.current;
    if (!node) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setProgress(1);
      return;
    }

    let rafId = 0;
    const tick = () => {
      rafId = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      // Map: rect.top = vh → progress 0; rect.top = vh * 0.4 → progress 1.
      const enter = vh;
      const settle = vh * 0.4;
      const span = enter - settle;
      if (span <= 0) return;
      setProgress(clamp01((enter - rect.top) / span));
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // 14% → 8% parallax rise as the section enters view. The 8% endpoint
  // matches the static bleed value the wordmark was designed with.
  const settleVh = 14 - progress * 6;

  return (
    <footer className="relative isolate overflow-hidden bg-black text-white">
      {/* Monochrome bloom — radial light source behind the wordmark.
          Shifts by lightness only, per the No-Colour Rule. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[120%]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 110%, #a1a1aa 0%, #71717a 18%, #3f3f46 34%, #18181b 58%, #000000 80%)",
        }}
      />
      {/* Paper grain — sibling motif to the closing-CTA grain overlay. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative page-shell pt-20 lg:pt-28 pb-10 lg:pb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {COLUMNS.map((col, i) => (
            <Reveal key={col.heading} delay={i * 80}>
              <div className="flex flex-col gap-4">
                <h3 className="t-title text-white">{col.heading}</h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="t-label text-zinc-300 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-20 lg:mt-28 flex flex-col gap-2 max-w-[36ch]">
            <p className="t-body text-zinc-300">
              An open protocol for bearer ecash on bitcoin. Operated by no one,
              implemented by many.
            </p>
            <p className="t-label text-zinc-500">
              © 2026 · Released under MIT
            </p>
          </div>
        </Reveal>
      </div>

      {/* Wordmark — anchored to the bottom edge, bleeds past the viewport.
          Solid white (not gradient text — forbidden), the bloom sits behind.
          Scroll-driven settle: rises from ~14% to ~8% as the footer enters. */}
      <div
        ref={wordmarkRef}
        aria-hidden
        className="relative w-full leading-none select-none pointer-events-none"
      >
        <div
          className="w-full text-white font-semibold tracking-[-0.04em] text-center"
          style={{
            fontSize: "clamp(8rem, 26vw, 24rem)",
            lineHeight: 0.78,
            transform: `translateY(${settleVh}%)`,
            willChange: "transform",
          }}
        >
          cashu
        </div>
      </div>
    </footer>
  );
}
