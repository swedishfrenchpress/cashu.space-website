"use client";

import { motion, useReducedMotion, type Transition, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";
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

const SPRING: Transition = { type: "spring", stiffness: 120, damping: 20 };

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
  const prefersReducedMotion = useReducedMotion();
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
  const prefersReducedMotion = useReducedMotion();
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
