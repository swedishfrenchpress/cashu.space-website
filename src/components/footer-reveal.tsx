"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { scheduleReveal } from "./reveal";

/*
 * FOOTER REVEAL — the Twilight Stack is uncovered, not scrolled to.
 *
 * Adapted from Motion's `footer-reveal` example (MotionScore S,
 * https://examples.motion.dev/react/footer-reveal), pulled through the Motion+
 * MCP server on 2026-08-21 at the user's direction.
 *
 * THE MECHANISM. The footer is a sticky plate at `bottom: 0` and `z-index: -1`,
 * so it sits *under* the page. A negative z-index child paints after its
 * parent's background but before the parent's in-flow content, which is the
 * whole trick — `.footer-reveal` carries `isolation: isolate` so the plate
 * cannot escape the stacking context and fall behind the page ground, and
 * `.footer-reveal__cover` carries an opaque Paper background because `<main>`
 * has none and a transparent cover would show the plate through the document.
 *
 * Scroll progress is read off the COVER, not the plate: a `position: sticky`
 * element reports viewport-locked geometry, so `useScroll` on the footer itself
 * measures the wrong thing. `["end end", "end start"]` runs from the moment the
 * cover's bottom edge reaches the bottom of the viewport to the moment it
 * leaves the top.
 *
 * WHAT IS DELIBERATELY NOT COPIED FROM THE EXAMPLE. It hides the scrollbar
 * (`scrollbar-width: none`) to stop a light footer showing a gutter. That is a
 * fix for a demo page's own chrome and it takes the reader's scroll position
 * indicator away on a long document, so it is not here.
 *
 * TWO ADAPTATIONS THE SITE REQUIRES, AND BOTH ARE THE REPO'S OWN RULES.
 *
 * 1. IT MUST BE LEGIBLE WITHOUT JAVASCRIPT. Motion serialises a motion value's
 *    current value into the server-rendered `style` attribute, so a plate whose
 *    opacity starts at 0 renders as `opacity: 0` in the HTML and a visitor with
 *    no JS gets a footer that never appears. That is exactly the failure the
 *    `html.js` gate in globals.css exists to prevent. So the scrub is an
 *    ENHANCEMENT: the first client render matches the server (plain, fully
 *    visible), and the effect below swaps in the motion-driven version. Nobody
 *    sees the swap — the footer is below the fold on every route.
 *
 * 2. REDUCED MOTION SUBSTITUTES, IT DOES NOT KILL. Under the query the plate is
 *    simply there: opaque, unscaled, sharp. The example ships no reduced-motion
 *    branch at all.
 */

/* The plate's resting state before the scrub. `scale` is softened from the
   example's 0.9: this footer is full-bleed and its ground is Ink, so at 0.9 a
   1440px viewport exposes 72px of Paper down each side mid-scrub and the plate
   reads as a floating card — which is the one thing a full-bleed surface must
   not do. 0.94 keeps the growth legible at 43px.

   BLUR REUSES AN EXISTING TOKEN RATHER THAN INTRODUCING A NUMBER.  6px is
   --reveal-blur-section, already the site's radius for a blur over body copy,
   and the same value the example happens to use. Note the Focus-Pull Rule
   (DESIGN.md §4) says nothing may REST out of focus: this clears to 0 well
   before the plate is fully uncovered, and a reader parked mid-scrub is the one
   case where it holds. Flagged rather than hidden. */
const REST_SCALE = 0.94;
const REST_BLUR_PX = 6;

/* Fallback for the first paint, before the plate has been measured: the scrub
   completes over roughly a third of a viewport. Replaced on layout by the
   plate's real height, so this only governs a frame. */
const FALLBACK_REVEAL_AT = 0.35;

export default function FooterReveal({
  children,
  footer,
  className = "",
}: {
  children: ReactNode;
  /* The server-rendered <SiteFooter />, passed as a prop rather than imported.
     Importing it here would pull the whole footer — every inline SVG, the
     disclaimer, the AI links — across the client boundary for the sake of two
     transforms. As a prop it stays a server component and none of it ships. */
  footer: ReactNode;
  /* This component REPLACES each route's outer wrapper rather than nesting
     inside it, so that wrapper's classes come through here — which also keeps
     the JSX below it at its original indentation. The three routes disagree on
     the value (/wallets sizes with `min-h-screen`, / and the 404 with
     `flex-1`), so it is passed rather than assumed. */
  className?: string;
}) {
  const coverRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const [revealAt, setRevealAt] = useState(FALLBACK_REVEAL_AT);
  const [enhanced, setEnhanced] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const plate = plateRef.current;
    if (!plate) return;

    /* The scrub should finish as the plate finishes arriving, so its length is
       the plate's height expressed in viewports. A short footer on a tall
       screen would otherwise still be fading long after it had stopped
       moving. */
    const update = () => {
      const viewportHeight = window.innerHeight || 1;
      setRevealAt(
        Math.min(0.95, Math.max(0.05, plate.offsetHeight / viewportHeight)),
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(plate);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  /* Enhance after commit, never during render — see note 1 in the header.
     Deferred through Reveal's `scheduleReveal` rather than called bare: it is
     the repo's existing answer to this exact lint rule (no setState in an
     effect body), and it is a timeout rather than a rAF for the reason stated
     there — a backgrounded tab pauses rAF indefinitely, so an rAF-scheduled
     enhancement would never run in a tab opened with cmd-click. */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = scheduleReveal(() => setEnhanced(true));
    return () => window.clearTimeout(id);
  }, [prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ["end end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, revealAt], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, revealAt], [REST_SCALE, 1]);
  const blur = useTransform(scrollYProgress, [0, revealAt], [REST_BLUR_PX, 0]);

  /* ENDS ON `none`, NOT `blur(0px)` — and the example's `useMotionTemplate`
     cannot do that, which is why it is not used here.

     This is the Focus-Pull Rule's first term (DESIGN.md §4, globals.css): a
     settled `blur(0)` is not free. It keeps the element on its own compositor
     layer and forces grayscale antialiasing on every glyph inside it for the
     life of the page — and the thing inside this one is the entire footer,
     including the disclaimer paragraph. Measured after this change: the plate
     reports `filter: none` at rest, matching the 0-of-28 result the rest of the
     site's entrances hold themselves to.

     The epsilon is there because the scrub lands on a float. Snapping the last
     hundredth of a pixel of blur is invisible; leaving the filter mounted is
     not. */
  const filter = useTransform(blur, (b) =>
    b <= 0.01 ? "none" : `blur(${b}px)`,
  );

  /* Promote only while the scrub is actually running. A standing `will-change`
     on a full-bleed plate holds a compositor layer the size of the viewport for
     the life of the page — the same reasoning globals.css states for
     `.reveal:not(.is-revealed)`. */
  const inScrub = (progress: number) =>
    progress > 0.0001 && progress < revealAt;
  const fadeWillChange = useTransform(scrollYProgress, (p) =>
    inScrub(p) ? "opacity" : "auto",
  );
  const plateWillChange = useTransform(scrollYProgress, (p) =>
    inScrub(p) ? "transform, filter" : "auto",
  );

  return (
    <div className={`footer-reveal ${className}`.trim()}>
      <div ref={coverRef} className="footer-reveal__cover">
        {children}
      </div>

      <div ref={plateRef} className="footer-reveal__plate">
        <motion.div
          className="footer-reveal__fade"
          style={enhanced ? { opacity, willChange: fadeWillChange } : undefined}
        >
          <motion.div
            className="footer-reveal__scale"
            style={
              enhanced
                ? {
                    scale,
                    filter,
                    /* Grows out of the bottom edge, so the plate reads as
                       rising into the page rather than zooming at its middle. */
                    transformOrigin: "50% 100%",
                    willChange: plateWillChange,
                  }
                : undefined
            }
          >
            {footer}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
