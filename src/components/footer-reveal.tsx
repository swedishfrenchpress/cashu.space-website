"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { defer } from "@/lib/defer";

/*
 * FOOTER REVEAL — the Twilight Stack is uncovered, not faded.
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
 * `.footer-reveal__cover` carries an opaque Paper background because <main>
 * has none and a transparent cover would show the plate through the document.
 *
 * Scroll progress is read off the COVER, not the plate: a `position: sticky`
 * element reports viewport-locked geometry, so `useScroll` on the footer itself
 * measures the wrong thing. `["end end", "end start"]` runs from the moment the
 * cover's bottom edge reaches the bottom of the viewport to the moment it
 * leaves the top.
 *
 * WHAT THIS VERSION CORRECTS, 2026-08-21, and why it is a deletion.
 *
 * The first version drove `opacity 0→1`, `scale 0.94→1` and `blur 6px→0` on the
 * plate, and its own commit message recorded the verdict: "reads as frosted
 * glass on a floating card". Measured live at 1665x1779 it was worse than that
 * note implies, and for a reason that is structural rather than tuning.
 *
 * `useScroll` with these offsets maps progress 0→1 onto one viewport height of
 * scroll after the cover's bottom edge reaches the viewport bottom — but the
 * scroll REMAINING at that moment is exactly the plate's height. So the highest
 * progress a reader can ever reach is `plateHeight / viewportHeight`, which is
 * precisely the value the old `revealAt` was set to. The scrub was calibrated
 * to complete at document end and nowhere earlier, so the plate was mid-scrub
 * for its entire visible life and reached its designed state at exactly one
 * scroll position. Measured: at 116px from the bottom it still held opacity
 * 0.847 and a 0.92px blur.
 *
 * On top of that, each of the three properties was wrong on its own terms.
 * Fading Ink over Paper passes through grey, so the footer was grey for most of
 * its life. Any scale below 1 on a full-bleed plate exposes the page ground
 * down both edges — ~50px per side early in the scrub — which is the definition
 * of the floating card a full-bleed surface must not be. And the blur was a
 * SURFACE blur, not an entrance blur: the Focus-Pull Rule (DESIGN.md §4) says
 * nothing may REST out of focus, and a reader parked mid-scrub is resting.
 *
 * So all three go. The plate is full-value Ink, sharp, full-bleed, the whole
 * time — the sticky `z-index: -1` geometry already does the uncovering on its
 * own, and the commit that introduced this called it "uncovered rather than
 * scrolled to" while implementing a fade. This makes that title true.
 *
 * TWO ADAPTATIONS THE SITE STILL REQUIRES, AND BOTH ARE THE REPO'S OWN RULES.
 *
 * 1. IT MUST BE LEGIBLE WITHOUT JAVASCRIPT. Motion serialises a motion value's
 *    current value into the server-rendered `style` attribute. The argument has
 *    changed with the gesture but not gone away: a footer sitting permanently
 *    24px low with a standing transform is not the broken page `opacity: 0`
 *    was, but it is still a resting state nobody authored. So the scrub stays
 *    an ENHANCEMENT — the first client render matches the server (plain, no
 *    `style` attribute at all), and the effect below swaps in the driven
 *    version. Nobody sees the swap; the footer is below the fold on every
 *    route. This is the same "ends on the absence of what it animated" term the
 *    rest of the file holds itself to.
 *
 * 2. REDUCED MOTION SUBSTITUTES, IT DOES NOT KILL. Under the query the plate is
 *    simply there and its contents are simply in place. Handled here in JS
 *    rather than in CSS on purpose: a `@media (prefers-reduced-motion)` rule
 *    would have to beat an inline style and would therefore need `!important`,
 *    which this stylesheet does not use anywhere. `useReducedMotion` resolves
 *    during render, so there is no first-frame window where `enhanced` gets set
 *    and then has to be unset — do not refactor it into useState + effect.
 */

/* How far the footer's CONTENTS lift, in px.

   This is `travel.enter` (24) from motion.theme.json, not `travel.section`
   (48), and the difference is the whole point of the change. 48 is sized to
   move a whole surface; here the surface is fixed and only what is printed on
   it lifts. 48px of type sliding inside a stationary Ink band reads as two
   planes — which is the floating card this rework exists to delete. 24 also
   sits one step above `--reveal-rise-section`'s 20px, which is the right
   relation: the footer is heavier than a section, not three times heavier. */
const LIFT_PX = 24;

/* The lift lands when 60% of the plate is uncovered, so the last 40% of the
   uncover happens over settled type. Same shape as `--reveal-focus-span`: an
   entrance finishes before the thing it is an entrance for does. */
const LIFT_SPAN = 0.6;

/* Fallback for the first paint, before the plate has been measured. Replaced
   on layout by the plate's real height, so this only governs a frame. */
const FALLBACK_PLATE_SPAN = 0.6;

export default function FooterReveal({
  children,
  footer,
  className = "",
}: {
  children: ReactNode;
  /* The server-rendered <SiteFooter />, passed as a prop rather than imported.
     Importing it here would pull the whole footer — every inline SVG, the
     disclaimer, the AI links — across the client boundary for the sake of one
     transform. As a prop it stays a server component and none of it ships. */
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
  const [plateSpan, setPlateSpan] = useState(FALLBACK_PLATE_SPAN);
  const [enhanced, setEnhanced] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const plate = plateRef.current;
    if (!plate) return;

    /* How much plate there is, expressed in viewports. This no longer says
       "when the fade completes" — it says how much there is to uncover, and the
       lift is authored as a fraction of it. Without the measurement the lift
       would run over a constant fraction of a VIEWPORT rather than of the
       PLATE, so a short footer on a tall screen would settle at 20% uncovered
       and a tall one at 90%.

       Upper clamp is 1, not 0.95: past 1 the plate is taller than the viewport
       and can never be fully uncovered, and clamping there keeps
       `plateSpan * LIFT_SPAN` at 0.6 or below, i.e. always reachable. */
    const update = () => {
      const viewportHeight = window.innerHeight || 1;
      setPlateSpan(
        Math.min(1, Math.max(0.05, plate.offsetHeight / viewportHeight)),
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
     Deferred through `defer` rather than called bare: it is the repo's answer
     to this exact lint rule (no setState in an effect body), and it is a
     timeout rather than a rAF for the reason stated there — a backgrounded tab
     pauses rAF indefinitely, so an rAF-scheduled enhancement would never run in
     a tab opened with cmd-click. */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = defer(() => setEnhanced(true));
    return () => window.clearTimeout(id);
  }, [prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ["end end", "end start"],
  });

  const liftAt = plateSpan * LIFT_SPAN;

  /* The only motion value on the plate.

     THIS ENDS ON `transform: none` WITHOUT AN EPSILON, and that is a property
     of Motion rather than luck: `buildTransform` returns the literal string
     "none" when every transform value is at its default, and `useTransform`
     with input/output ranges clamps by default, so any progress at or past
     `liftAt` produces exactly 0 rather than a trailing float. The hand-rolled
     `b <= 0.01 ? "none" : ...` guard the old `filter` needed has no analogue
     here and must not be reintroduced — `filter` needed it because it is not a
     transform key and Motion has no default-detection for it. */
  const y = useTransform(scrollYProgress, [0, liftAt], [LIFT_PX, 0]);

  /* Promote only while the scrub is actually running. A standing `will-change`
     on a full-bleed plate holds a compositor layer the size of the viewport for
     the life of the page — the same reasoning globals.css states for
     `.reveal:not(.is-revealed)`. Note this goes back to `auto` while 40% of the
     plate is still to be uncovered, which is correct: nothing is animating
     there. */
  const liftWillChange = useTransform(scrollYProgress, (p) =>
    p > 0.0001 && p < liftAt ? "transform" : "auto",
  );

  return (
    <div className={`footer-reveal ${className}`.trim()}>
      <div ref={coverRef} className="footer-reveal__cover">
        {children}
      </div>

      <div ref={plateRef} className="footer-reveal__plate">
        <motion.div
          className="footer-reveal__lift"
          style={enhanced ? { y, willChange: liftWillChange } : undefined}
        >
          {footer}
        </motion.div>
      </div>
    </div>
  );
}
