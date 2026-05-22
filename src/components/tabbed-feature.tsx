"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

type TabId = "wallets" | "mints" | "spec" | "tokens";

type Tab = {
  id: TabId;
  label: string;
  caption: string;
  cta: string;
  href: string;
  image: string;
};

const TABS: Tab[] = [
  {
    id: "wallets",
    label: "Wallets",
    caption:
      "Pick a wallet, hold ecash on your phone. Cashu wallets are independent, open-source, and free.",
    cta: "Explore wallets",
    href: "/wallets",
    image: "/canyon.jpg",
  },
  {
    id: "mints",
    label: "Mints",
    caption:
      "Mints redeem ecash for bitcoin over Lightning. Run your own or trust a community-operated one.",
    cta: "Explore mints",
    href: "/mints",
    image: "/forest.jpg",
  },
  {
    id: "spec",
    label: "Spec",
    caption:
      "The protocol is a public specification. Every byte is documented; every NUT is open for review.",
    cta: "Read the spec",
    href: "/spec",
    image: "/peaks.jpg",
  },
  {
    id: "tokens",
    label: "Tokens",
    caption:
      "Cashu tokens are bearer blobs of bitcoin. Send them in a chat, a QR, an email, a file.",
    cta: "Understand tokens",
    href: "/tokens",
    image: "/flatiron-ascii.jpg",
  },
];

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function useScrollTabIndex(
  wrapperRef: RefObject<HTMLElement | null>,
  count: number,
  enabled: boolean,
): [number, (i: number) => void] {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let rafId = 0;
    let lastIndex = -1;

    const tick = () => {
      rafId = 0;
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = wrapper.offsetHeight - vh;
      if (total <= 0) return;
      const progress = clamp(-rect.top / total, 0, 1);
      const next = Math.min(Math.floor(progress * count), count - 1);
      if (next !== lastIndex) {
        lastIndex = next;
        setIndex(next);
      }
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
  }, [enabled, wrapperRef, count]);

  const setIndexViaScroll = useCallback(
    (i: number) => {
      if (!enabled) {
        setIndex(i);
        return;
      }
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const vh = window.innerHeight;
      const total = wrapper.offsetHeight - vh;
      if (total <= 0) return;
      const slice = total / count;
      const targetY = wrapper.offsetTop + (i + 0.5) * slice;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    },
    [enabled, wrapperRef, count],
  );

  return [index, setIndexViaScroll];
}

export default function TabbedFeature() {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const isJacking = useMediaQuery(
    "(min-width: 768px) and (prefers-reduced-motion: no-preference) and (pointer: fine)",
  );
  const [activeIndex, setActiveIndex] = useScrollTabIndex(
    wrapperRef,
    TABS.length,
    isJacking,
  );
  const active = TABS[activeIndex];

  return (
    <section
      ref={wrapperRef}
      className="relative"
      style={isJacking ? { height: `${TABS.length * 100}vh` } : undefined}
    >
      <div
        className={
          isJacking
            ? "sticky top-0 h-screen w-full flex flex-col items-center justify-center gap-6 lg:gap-8 py-8"
            : "flex flex-col items-center gap-12 lg:gap-16 pt-16 lg:pt-24 pb-24 lg:pb-32"
        }
      >
        <h2 className="page-shell w-full text-center text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight leading-[1.05]">
          Cashu where bitcoin flows.
        </h2>

        <div
          className={
            isJacking
              ? "w-full max-w-[1280px] mx-auto aspect-[16/9] max-h-[58vh] bg-black overflow-hidden relative"
              : "w-full max-w-[1280px] mx-auto aspect-[16/9] bg-black overflow-hidden relative"
          }
        >
          <img
            key={`img-${active.id}`}
            src={active.image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-0 animate-[fadeIn_200ms_ease-out_forwards]"
          />
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-white aspect-[16/9] w-[78%] max-w-full" />
          </div>
          <div
            key={active.id}
            className="absolute inset-0 flex items-end p-6 lg:p-10 opacity-0 animate-[fadeIn_200ms_ease-out_forwards]"
          >
            <span className="font-pixel uppercase tracking-wider text-[11px] text-zinc-200">
              Fig. 02 · {active.label}
            </span>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Cashu pillars"
          className="page-shell w-full flex gap-3 overflow-x-auto justify-center scrollbar-none"
        >
          {TABS.map((tab, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(i)}
                className={
                  isActive
                    ? "inline-flex items-center bg-black text-white px-5 py-3 text-sm font-medium tracking-tight whitespace-nowrap transition-colors"
                    : "inline-flex items-center bg-transparent text-zinc-500 hover:text-black border border-zinc-200 px-5 py-3 text-sm font-medium tracking-tight whitespace-nowrap transition-colors"
                }
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <p
          key={`caption-${active.id}`}
          className="page-shell w-full max-w-[60ch] text-center text-zinc-700 text-base lg:text-lg leading-relaxed opacity-0 animate-[fadeIn_200ms_ease-out_forwards]"
        >
          {active.caption}
        </p>

        <a
          key={`cta-${active.id}`}
          href={active.href}
          className="inline-flex items-center bg-black hover:bg-zinc-800 transition-colors px-6 py-3.5 text-sm font-medium text-white"
        >
          {active.cta}
        </a>
      </div>
    </section>
  );
}
