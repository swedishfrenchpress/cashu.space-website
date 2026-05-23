"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type RefObject,
} from "react";

type TabId = "wallets" | "mints" | "spec" | "tokens";

type Tab = {
  id: TabId;
  label: string;
  title: string;
  caption: string;
  cta: string;
  href: string;
  image: string;
};

const TABS: Tab[] = [
  {
    id: "wallets",
    label: "Wallets",
    title: "Hold ecash on your phone.",
    caption:
      "Pick a wallet, hold ecash on your phone. Cashu wallets are independent, open-source, and free.",
    cta: "Explore wallets",
    href: "/wallets",
    image: "/canyon.jpg",
  },
  {
    id: "mints",
    label: "Mints",
    title: "Redeem ecash for bitcoin.",
    caption:
      "Mints redeem ecash for bitcoin over Lightning. Run your own or trust a community-operated one.",
    cta: "Explore mints",
    href: "/mints",
    image: "/forest.jpg",
  },
  {
    id: "spec",
    label: "Spec",
    title: "Every byte, in the open.",
    caption:
      "The protocol is a public specification. Every byte is documented; every NUT is open for review.",
    cta: "Read the spec",
    href: "/spec",
    image: "/peaks.jpg",
  },
  {
    id: "tokens",
    label: "Tokens",
    title: "Send money like a message.",
    caption:
      "Cashu tokens are bearer blobs of bitcoin. Send them in a chat, a QR, an email, a file.",
    cta: "Understand tokens",
    href: "/tokens",
    image: "/flatiron-ascii.jpg",
  },
];

// Heidi-style wash crossfade. Media gets the full focus pull; text gets a
// gentler blur so type doesn't shimmer through the transition. The transition
// is *time-driven*, not scroll-driven — scroll only flips the active index at
// midpoints; the crossfade then runs in fixed duration. That's why it snaps
// instead of dragging at the speed of your scroll wheel.
const MEDIA_BLUR_PX = 14;
const TEXT_BLUR_PX = 5;
const SNAP_MS = 320;
const SNAP_EASE = "cubic-bezier(0.25, 1, 0.5, 1)"; // ease-out-quart — decisive entry, smooth tail

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

/**
 * Maps scroll position within the sticky wrapper to a continuous progress
 * value in [0, count - 1]. Integer progress (0, 1, 2, …) corresponds to a
 * tab fully settled; non-integer values are in the transition zone between
 * adjacent tabs. The setter scrolls the page so the requested integer
 * progress lands exactly.
 */
function useScrollProgress(
  wrapperRef: RefObject<HTMLElement | null>,
  count: number,
  enabled: boolean,
): [number, (i: number) => void] {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let rafId = 0;

    const tick = () => {
      rafId = 0;
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = wrapper.offsetHeight - vh;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const raw = clamp(-rect.top / total, 0, 1);
      setProgress(raw * (count - 1));
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

  const setProgressViaScroll = useCallback(
    (i: number) => {
      if (!enabled) {
        setProgress(i);
        return;
      }
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const vh = window.innerHeight;
      const total = wrapper.offsetHeight - vh;
      if (total <= 0 || count < 2) return;
      const targetRaw = i / (count - 1);
      const targetY = wrapper.offsetTop + targetRaw * total;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    },
    [enabled, wrapperRef, count],
  );

  return [progress, setProgressViaScroll];
}

function layerStyle(isActive: boolean, maxBlurPx: number): CSSProperties {
  return {
    opacity: isActive ? 1 : 0,
    filter: isActive ? "blur(0px)" : `blur(${maxBlurPx}px)`,
    transition: `opacity ${SNAP_MS}ms ${SNAP_EASE}, filter ${SNAP_MS}ms ${SNAP_EASE}`,
    willChange: "opacity, filter",
    pointerEvents: isActive ? "auto" : "none",
  };
}

const DISPLAY_TITLE_STYLE: CSSProperties = {
  fontFamily: "var(--font-gt), ui-sans-serif, system-ui, sans-serif",
  fontSize: "clamp(2.5rem, 6vw, 5rem)",
  fontWeight: 600,
  lineHeight: 0.95,
  letterSpacing: "-0.02em",
};

export default function TabbedFeature() {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const isJacking = useMediaQuery(
    "(min-width: 768px) and (prefers-reduced-motion: no-preference) and (pointer: fine)",
  );
  const [progress, setProgress] = useScrollProgress(
    wrapperRef,
    TABS.length,
    isJacking,
  );
  const activeIndex = clamp(Math.round(progress), 0, TABS.length - 1);
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
        {/* Headline — each tab's claim is the section header when active.
            Layers grid-stack so the container sizes to the tallest line. */}
        <div className="page-shell w-full grid">
          {isJacking ? (
            TABS.map((tab, i) => {
              const isActive = i === activeIndex;
              return (
                <h2
                  key={`title-${tab.id}`}
                  aria-hidden={!isActive}
                  className="col-start-1 row-start-1 text-center max-w-[22ch] justify-self-center"
                  style={{ ...DISPLAY_TITLE_STYLE, ...layerStyle(isActive, TEXT_BLUR_PX) }}
                >
                  {tab.title}
                </h2>
              );
            })
          ) : (
            <h2
              className="col-start-1 row-start-1 text-center max-w-[22ch] justify-self-center"
              style={DISPLAY_TITLE_STYLE}
            >
              {active.title}
            </h2>
          )}
        </div>

        {/* Media frame — stacked images crossfade with the deeper blur. */}
        <div
          className={
            isJacking
              ? "w-full max-w-[1280px] mx-auto aspect-[16/9] max-h-[48vh] bg-black overflow-hidden relative"
              : "w-full max-w-[1280px] mx-auto aspect-[16/9] bg-black overflow-hidden relative"
          }
        >
          {(isJacking ? TABS : [active]).map((tab, i) => {
            const isActive = isJacking ? i === activeIndex : true;
            return (
              <img
                key={`img-${tab.id}`}
                src={tab.image}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover"
                style={isJacking ? layerStyle(isActive, MEDIA_BLUR_PX) : undefined}
              />
            );
          })}
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-white aspect-square h-[78%] max-h-full" />
          </div>
        </div>

        {/* Tab pills — single row, active state flips at the round() midpoint. */}
        <div
          role="tablist"
          aria-label="Cashu pillars"
          className="page-shell w-full flex flex-wrap gap-4 lg:gap-5 justify-center py-3"
        >
          {TABS.map((tab, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setProgress(i)}
                className={isActive ? "btn-primary" : "btn-secondary"}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Caption — grid-stacked so adjacent captions wash through each other. */}
        <div className="page-shell w-full grid">
          {isJacking ? (
            TABS.map((tab, i) => {
              const isActive = i === activeIndex;
              return (
                <p
                  key={`caption-${tab.id}`}
                  aria-hidden={!isActive}
                  className="col-start-1 row-start-1 max-w-[60ch] justify-self-center text-center text-zinc-700 t-body-lead"
                  style={layerStyle(isActive, TEXT_BLUR_PX)}
                >
                  {tab.caption}
                </p>
              );
            })
          ) : (
            <p className="col-start-1 row-start-1 max-w-[60ch] justify-self-center text-center text-zinc-700 t-body-lead">
              {active.caption}
            </p>
          )}
        </div>

        {/* CTA — grid-stack mirrors the headline/caption pattern. */}
        <div className="grid">
          {isJacking ? (
            TABS.map((tab, i) => {
              const isActive = i === activeIndex;
              return (
                <a
                  key={`cta-${tab.id}`}
                  href={tab.href}
                  aria-hidden={!isActive}
                  tabIndex={isActive ? 0 : -1}
                  className="btn-primary col-start-1 row-start-1 justify-self-center"
                  style={layerStyle(isActive, TEXT_BLUR_PX)}
                >
                  {tab.cta}
                </a>
              );
            })
          ) : (
            <a href={active.href} className="btn-primary col-start-1 row-start-1 justify-self-center">
              {active.cta}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
