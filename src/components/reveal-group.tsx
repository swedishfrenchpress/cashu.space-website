"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import {
  ensureTracker,
  isJumpArrival,
  scheduleReveal,
} from "@/components/reveal";

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
  threshold?: number;
  rootMargin?: string;
};

/**
 * RevealGroup — one observer for a whole section.
 *
 * WHY THIS EXISTS. `<Reveal>` is one client component and one
 * IntersectionObserver per *element*, and below the fold that had multiplied:
 * `protocol-parts.tsx` alone ran eighteen of them, each deciding on its own
 * when its own element had arrived. The result faded, but it faded as
 * eighteen unrelated events that happened to be near each other rather than
 * as a section arriving — which was the complaint that produced this
 * (2026-08-19, user-directed).
 *
 * A group is observed once and stamps `.is-revealed` on itself. Its
 * `.reveal-item` descendants are plain server-rendered elements — no client
 * component, no effect, no observer — that settle off that class with the
 * authored `--reveal-delay` stagger they already carried. The whole of the
 * per-item behaviour is CSS; see the group block in globals.css.
 *
 * On the homepage this took twenty-four observers to eight and ten client
 * components to five, so it is a reduction as well as a composition fix.
 *
 * THIS DOES NOT REPLACE `<Reveal>`, and the two are not interchangeable:
 *
 * - Arrival entrances (`immediate`) must stay `<Reveal>`. They run from a CSS
 *   animation at parse time and never wait for React, and `.reveal--arrival`
 *   is what makes that true. A group is by definition gated on an observer,
 *   which is gated on hydration. See the Set-Once Rule's second amendment.
 * - `layout.tsx`'s 1.5s failsafe probes for `.reveal.is-revealed`. Groups
 *   deliberately carry neither class, because they are among the things that
 *   failsafe *rescues*: every route still opens with arrival reveals, those
 *   still report, and dropping `html.js` un-hides `.reveal-item` too.
 *
 * Jump arrivals are read from the tracker `<Reveal>` already owns, imported
 * rather than duplicated so there is one set of scroll listeners on the page
 * and one definition of what counts as a jump.
 */
export default function RevealGroup({
  children,
  className = "",
  as,
  style,
  threshold = 0.12,
  rootMargin = "0px 0px -8% 0px",
}: RevealGroupProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    ensureTracker();

    const node = ref.current;
    if (!node) return;

    /* No observer, or reduced motion: reveal at once. Deferred by a timeout
       rather than called bare (lint: no setState in the effect body), and by
       a timeout rather than rAF for the background-tab reason documented on
       scheduleReveal. */
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const id = scheduleReveal(() => setRevealed(true));
      return () => window.clearTimeout(id);
    }

    let firstPass = true;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // A group is taller than a single element, so `above` matters more
          // here than it did per-item: a jump scroll can leave the whole
          // section behind between two observer ticks, and without this the
          // section stays blank at the top of the page the visitor scrolls
          // back to.
          const above = entry.boundingClientRect.top < 0;
          if (entry.isIntersecting || above) {
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
  }, [threshold, rootMargin]);

  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={[
        "reveal-group",
        instant ? "reveal-group--instant" : "",
        revealed ? "is-revealed" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </Tag>
  );
}
