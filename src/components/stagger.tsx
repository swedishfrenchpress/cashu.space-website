"use client";

import { motion, type Transition, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { defer } from "@/lib/defer";

/*
 * STAGGER — the site's one entrance (2026-08-21, user-directed).
 *
 * Adapted from Motion's `hero-stagger` example
 * (https://motion.dev/examples/react-hero-stagger). Only the ANIMATION is
 * taken: `opacity 0 → 1`, `y 40 → 0`, `blur(4px) → blur(0)`, on a
 * `stiffness: 120, damping: 20` spring, with children staggered 0.1s apart.
 * None of the example's chrome comes with it — no drifting glows, no badge,
 * no gradient text, no rounded buttons, no metrics row. The copy, the type and
 * the layout are ours.
 *
 * WHY THIS EXISTS AT ALL, because the file it replaced is worth not repeating.
 * Five entrances were built for the hero headline and all five were rejected in
 * the same register — the cipher pass ("corny and too on the nose"), the focus
 * pull ("unelegant and sloppy"), the hard `clip-path` glyph wipe ("stiff and
 * mechanic and generic and robotic"), the gradient sweep ("corny") and the line
 * rise ("too corny"). Every one of them was a bespoke treatment invented for
 * this site. This one is not: it is a known, plain, widely-used entrance, and
 * that is the point. It does not try to be clever about the type.
 *
 * TWO THINGS ARE CHANGED FROM THE EXAMPLE AND BOTH ARE MEASURED REPO RULES.
 *
 * 1. THE HIDDEN OPACITY IS 0.02, NOT 0. Chrome will not take an element as an
 *    LCP candidate if its only main-thread paint is fully transparent, and a
 *    composited opacity animation never repaints on the main thread. Measured
 *    on this site: from 0 the arrival cost LCP 2244ms; from 0.02 it was 776ms.
 *    The two are visually identical. Do not tidy it back to 0.
 *
 * 2. IT ENDS ON `filter: none`, NOT `blur(0px)`. A settled `blur(0)` is not
 *    free — it keeps the element on its own compositor layer and forces
 *    grayscale antialiasing on every glyph inside it for the life of the page,
 *    which under a 9rem headline is a permanent downgrade bought for no effect.
 *    Motion has to interpolate to `blur(0px)` because `none` is not a filter it
 *    can tween to, so the item clears the inline filter itself the moment the
 *    animation completes. `y` needs no equivalent: Motion already returns the
 *    literal string `"none"` when every transform value is at its default.
 */

/* LIVE-TRACKED, AND MOTION'S OWN HOOK IS THE BUG THIS REPLACES (2026-08-22).
 *
 * This used Motion's `useReducedMotion()`, which is `useState(initial)` and
 * reads the query exactly once — the correction `button-cipher.tsx` took on
 * 2026-08-20 and that CLAUDE.md states as a rule. `stagger.tsx` was still in
 * violation of it, and here the failure is worse than a stale preference:
 * it left content permanently invisible.
 *
 * THE FAILURE, MEASURED. Motion resolves that hook from a module-level
 * singleton that is not populated during the first hydration pass, so on a COLD
 * load it answers `false` and never revises. The component therefore renders
 * its motion branch, Motion serialises the `hidden` variant into the SSR
 * `style` attribute, and under `prefers-reduced-motion` the entrance never runs
 * to clear it. Measured on the production build at 1440x900 with reduced motion
 * emulated, after scrolling the whole route: 13 of 13 wallet rows and 2 more
 * elements on the homepage sat at `opacity: 0.02` with a 4px blur, for the life
 * of the page. On a WARM load — any client navigation after the first — the
 * singleton is populated, the hook answers `true`, and the same code is fine,
 * which is exactly why this survived: it does not reproduce on the second page
 * you look at.
 *
 * THE INITIAL VALUE MUST BE `false` HERE, and that is the opposite of the
 * choice `curtain-link.tsx` makes for its copy of this hook. There the value
 * changes no markup, so it can read the query eagerly. Here it decides whether
 * an element renders as a motion component at all, so an eager read would
 * disagree with the server's markup and hand React a hydration mismatch. Start
 * false, match the server, then flip in the effect: the re-render swaps the
 * motion element for a plain one, React drops the inline style with it, and the
 * content is visible. The cost is that a reduced-motion visitor may see the
 * first frame or two of an entrance before it is torn down, which is a great
 * deal better than never seeing the content.
 */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

/* THE LIVENESS MARKER THE 1.5s FAILSAFE IS GATED ON (2026-08-26).
 *
 * layout.tsx's failsafe exists for scripting that is SLOW or BROKEN, but it
 * used to fire on every load: at 1.5s it stripped the serialised hidden
 * styles off every still-below-fold item, Motion's values still held
 * 0.02 / 40px / blur(4px), and the first `whileInView` frame wrote them BACK
 * onto content the reader was already looking at — appear, vanish, reappear,
 * deterministically, for anything scrolled to after 1.5s.
 *
 * The marker is the failsafe's evidence that Motion is alive. Hydration
 * alone is NOT that evidence — the recorded failure case is a backgrounded
 * tab where hydration completes while rAF stays paused — but a DELIVERED
 * animation frame is: Motion's frameloop is rAF-driven, so a rAF that fired
 * in this document is a frame Motion could have served. ONE frame, not two:
 * a second buys no further evidence and widens the window in which the 1.5s
 * timer can beat the marker. No cleanup — evidence, once true, does not
 * become false on unmount, and the attribute is idempotent under
 * StrictMode's double-invoke.
 *
 * It lives on <html> because its one consumer is an inline script that runs
 * before React exists. One bit for the whole document is sound while every
 * Stagger is in one client graph and hydrates in one pass — true today: no
 * next/dynamic, no lazy, no Suspense around any consumer. A future
 * dynamically-imported Stagger section would need its own evidence. */
const LIVE_ATTR = "data-stagger-live";

function useMarkStaggerLive() {
  useEffect(() => {
    const html = document.documentElement;
    if (html.hasAttribute(LIVE_ATTR)) return;
    requestAnimationFrame(() => html.setAttribute(LIVE_ATTR, ""));
  }, []);
}

/* Exported because the hero's ground arrives on it too (`hero-field.tsx`).
   The field is not a Motion element — it is one WebGL canvas — so it cannot be
   a StaggerItem, but it can be driven by the same physics, and that is what
   keeps its entrance part of the site's ONE entrance rather than a second one
   invented for the hero. Same spring, same moment; the distance term in the
   shader supplies the stagger a StaggerItem would have got from the parent. */
export const SPRING: Transition = { type: "spring", stiffness: 120, damping: 20 };

/* A STATIC REGISTRY RATHER THAN `motion.create(as)`. Building a motion
   component inside render gives it a fresh identity every time, which remounts
   the subtree and restarts the entrance — and `react-hooks/static-components`
   fails the build for exactly that, `useMemo` included. These are the tags the
   site actually staggers; add to the map rather than reaching for a factory. */
const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
  ul: motion.ul,
  li: motion.li,
} as const;

type TagName = keyof typeof TAGS;

/* The example's defaults. `y` is exposed per surface because 40px is right
   under 9rem display type and is a lurch on a thirteen-row directory, which is
   the same reason the example makes it a prop rather than a constant. */
const DEFAULT_OFFSET_Y = 40;
const DEFAULT_STAGGER = 0.1;

const containerVariants = (stagger: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});

const itemVariants = (offsetY: number): Variants => ({
  hidden: { opacity: 0.02, y: offsetY, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: SPRING },
});

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: TagName;
  /* Above the fold, play on mount. Below it, wait for the viewport — the same
     split the site has always had, for the same reason: an entrance nobody can
     see yet is an entrance that plays to an empty room. */
  inView?: boolean;
  stagger?: number;
  /* Passthrough for the two attributes a container actually needs. The
     `/wallets` header is the skip link's target, so it carries `id` and
     `tabIndex` — losing those would break keyboard entry into the route. */
  id?: string;
  tabIndex?: number;
};

export function Stagger({
  children,
  className,
  as,
  inView = false,
  stagger = DEFAULT_STAGGER,
  id,
  tabIndex,
}: StaggerProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  /* Above the reduced-motion return, unconditionally — hooks must be, and
     the marker is per-document rather than per-branch anyway: under `reduce`
     the plain branch serialises no hidden style, so the failsafe would find
     nothing to repair; the marker just saves it the probe. */
  useMarkStaggerLive();
  const Tag = TAGS[as ?? "div"];

  /* Substitute, don't kill — except there is nothing to substitute here. The
     entrance carries no information: the content is identical before and after,
     so under the query it is simply present. No variants are attached at all,
     which also means no `initial` state is serialised into the SSR markup. */
  if (prefersReducedMotion) {
    const Plain = as ?? "div";
    return (
      <Plain className={className} id={id} tabIndex={tabIndex}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      id={id}
      tabIndex={tabIndex}
      /* A marker with no functional consumer as of 2026-08-22: both rescues in
         layout.tsx moved to `[data-stagger-item]`, which is where the hidden
         state actually lives. Kept because it is the only way to see a stagger
         container in a DOM inspector, and it is what the verification probes
         count. Delete it with the next thing that makes it redundant, not
         before — but do not start reading it again either. */
      data-stagger
      variants={containerVariants(stagger)}
      initial="hidden"
      {...(inView
        ? { whileInView: "visible", viewport: { once: true, amount: 0.2 } }
        : { animate: "visible" })}
    >
      {children}
    </Tag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: TagName;
  offsetY?: number;
};

export function StaggerItem({
  children,
  className,
  as,
  offsetY = DEFAULT_OFFSET_Y,
}: StaggerItemProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  /* A callback ref rather than a typed `useRef` on the element: `TAGS` is a
     union of nine motion components, so a single `RefObject<HTMLElement>` does
     not satisfy the intersection of their ref types. The callback accepts the
     supertype and is assignable to all of them. */
  const el = useRef<HTMLElement | null>(null);
  const Tag = TAGS[as ?? "div"];

  if (prefersReducedMotion) {
    const Plain = as ?? "div";
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        el.current = node;
      }}
      className={className}
      /* MARKS EXACTLY THE ELEMENTS MOTION HIDES, AT ANY DEPTH (2026-08-22).
         The `<noscript>` rule and the 1.5s failsafe in layout.tsx both used to
         select `[data-stagger] > *`, which silently assumed every item is a
         DIRECT child of its container. Variant propagation runs through plain
         intervening elements, so that was never true in general and stopped
         being true in practice when the wallet rows became items nested under
         a <div> and a <ul>: with scripting off they kept the serialised hidden
         style and never appeared. Marking the item itself is also strictly more
         precise than the old selector, which forced `opacity: 1` onto plain
         wrapper children that were never hidden in the first place. */
      data-stagger-item
      variants={itemVariants(offsetY)}
      /* See point 2 in the header: Motion can only tween to `blur(0px)`, so the
         zeroed filter is cleared here rather than left standing. One line, and
         it is the difference between a settled element holding a compositor
         layer for the life of the page and holding nothing. */
      onAnimationComplete={() => {
        /* Deferred by one turn, not called inline: Motion writes the
           animation's final value AFTER this callback, so clearing it here
           synchronously is immediately overwritten (measured — the attribute
           was set, the filter came back). A timeout rather than a rAF for the
           reason stated at `defer`. */
        defer(() => {
          if (el.current) el.current.style.filter = "";
        });
      }}
    >
      {children}
    </Tag>
  );
}
