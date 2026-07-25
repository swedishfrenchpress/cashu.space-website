"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealVariant = "rise" | "fade";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  slow?: boolean;
  immediate?: boolean;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
  threshold?: number;
  rootMargin?: string;
};

/*
 * Arrival tracker (module scope — one per page, shared by every Reveal).
 *
 * The editorial settle is earned only by a *read* arrival: the element
 * scrolled into view at reading pace. A *jump* arrival — anchor navigation,
 * keyboard chord, flick-scroll, hash on load — means the visitor is already
 * looking at the destination, and anything but instant content reads as a
 * broken page. Three signals mark a jump: a recent hashchange, a single
 * scroll event that teleports more than 1.5 viewports, or sustained scroll
 * velocity beyond reading pace.
 */
const JUMP_WINDOW_MS = 900;
const TELEPORT_WINDOW_MS = 400;
const FAST_SCROLL_PX_PER_MS = 2.5;
const VELOCITY_STALE_MS = 160;

let trackerReady = false;
let jumpUntil = 0;
let lastY = 0;
let lastT = 0;
let lastVelocity = 0;

function ensureTracker() {
  if (trackerReady || typeof window === "undefined") return;
  trackerReady = true;
  lastY = window.scrollY;
  lastT = performance.now();
  if (window.location.hash) {
    jumpUntil = performance.now() + JUMP_WINDOW_MS;
  }
  window.addEventListener(
    "scroll",
    () => {
      const now = performance.now();
      const y = window.scrollY;
      const dy = Math.abs(y - lastY);
      const dt = now - lastT;
      if (dy > window.innerHeight * 1.5) {
        jumpUntil = now + TELEPORT_WINDOW_MS;
      }
      lastVelocity = dt > 0 && dt < VELOCITY_STALE_MS ? dy / dt : 0;
      lastY = y;
      lastT = now;
    },
    { passive: true },
  );
  window.addEventListener("hashchange", () => {
    jumpUntil = performance.now() + JUMP_WINDOW_MS;
  });
}

function isJumpArrival() {
  const now = performance.now();
  if (now < jumpUntil) return true;
  if (now - lastT > VELOCITY_STALE_MS) return false;
  return lastVelocity > FAST_SCROLL_PX_PER_MS;
}

/*
 * Stagger ceiling. Authored delays keep their rhythm, but the tail is
 * bounded so the last element of a group can never lag a jump arrival by
 * half a second on top of the transition itself.
 */
const MAX_DELAY_MS = 360;

/**
 * Reveal — the unified entrance wrapper. Above-the-fold elements pass
 * `immediate` so they animate on mount (post-paint); below-the-fold use the
 * default IntersectionObserver trigger.
 *
 * Always wraps children in an element (default: div, override via `as`).
 * Honour prefers-reduced-motion — the CSS already short-circuits, but we
 * also set state to `true` immediately so a flash of mid-state can't happen.
 *
 * Jump arrivals (see the tracker above) and elements already on screen when
 * observation starts reveal instantly: `reveal--instant` drops the delay and
 * the rise, leaving a fast fade. Content the visitor is looking at is never
 * made to wait.
 */
export default function Reveal({
  children,
  delay = 0,
  variant = "rise",
  slow = false,
  immediate = false,
  className = "",
  as,
  style,
  threshold = 0.12,
  rootMargin = "0px 0px -8% 0px",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    ensureTracker();

    if (immediate) {
      const id = window.requestAnimationFrame(() => setRevealed(true));
      return () => window.cancelAnimationFrame(id);
    }

    const node = ref.current;
    if (!node) return;

    /* No observer, or reduced motion: reveal at once. rAF rather than a
       bare call (lint: no setState in the effect body) — it still runs
       before the next paint, so no flash of the hidden state is possible. */
    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const id = window.requestAnimationFrame(() => setRevealed(true));
      return () => window.cancelAnimationFrame(id);
    }

    let firstPass = true;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Also reveal when the element is already above the viewport: a
          // jump scroll (nav click, anchor load) can leap clean past the
          // observation band between two observer ticks, in which case
          // isIntersecting never fires and the element stays blank.
          const above = entry.boundingClientRect.top < 0;
          if (entry.isIntersecting || above) {
            // Already on screen at first observation, above the viewport,
            // or arriving via a jump: the settle would read as a dead page.
            if (
              (firstPass && entry.isIntersecting) ||
              above ||
              isJumpArrival()
            ) {
              setInstant(true);
            }
            setRevealed(true);
            observer.disconnect();
            break;
          }
        }
        firstPass = false;
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate, threshold, rootMargin]);

  const revealClass = [
    "reveal",
    variant === "fade" ? "reveal--fade" : "",
    slow ? "reveal--slow" : "",
    instant ? "reveal--instant" : "",
    revealed ? "is-revealed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const effectiveDelay = instant ? 0 : Math.min(delay, MAX_DELAY_MS);
  const mergedStyle: CSSProperties = {
    ...style,
    ...(effectiveDelay
      ? ({ "--reveal-delay": `${effectiveDelay}ms` } as CSSProperties)
      : null),
  };

  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={revealClass}
      style={mergedStyle}
    >
      {children}
    </Tag>
  );
}
