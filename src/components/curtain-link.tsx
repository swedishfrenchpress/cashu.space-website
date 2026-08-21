"use client";

import { clipWipe } from "motion-plus/curtains";
import { useCurtains } from "motion-plus/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, type ComponentProps, type MouseEvent } from "react";

/*
 * THE PAGE TRANSITION — an Ink edge crosses the viewport and the route changes
 * behind it (2026-08-21, user-directed).
 *
 * Until now a route change was a hard cut: the only navigation moment on the
 * site and the least designed thing on it. This is Motion+'s `useCurtains`,
 * which is the right tool here for two reasons that are not about looks.
 *
 * THE MATERIAL IS ALREADY OURS. `clipWipe` is, in Motion's own words, "a wipe
 * whose edge is a clip on a static panel, so the overlay itself never moves".
 * That is the identical mechanism to the masthead's plate wipe, the hero's
 * closing hairline and the `?` sheet — a travelling edge over a stationary
 * surface — at full-viewport scale. Nothing new enters the vocabulary; the
 * site's one gesture is applied to the one moment that had none.
 *
 * IT SOLVES AN APP ROUTER PROBLEM. `router.push()` resolves before the new
 * route's content is ready, so a hand-rolled transition uncovers an unpainted
 * page. `useCurtains` runs the callback inside `startTransition` and holds the
 * reveal until React has committed AND painted, including any Suspense the
 * navigation triggered. The curtain stays up across the navigation and lifts on
 * a finished page.
 *
 * The overlay goes in the top layer via the Popover API — no z-index against
 * the masthead, no focus trap.
 *
 * WHY THIS IS A COMPONENT AND NOT A DELEGATED CLICK HANDLER. A document-level
 * listener that curtains every internal anchor is fewer lines and much more
 * magic: it would capture the footer's links, the skip link, and anything a
 * future section adds, and it would have to re-derive "is this a route change"
 * from the DOM. Stating it per link keeps the set of curtained navigations
 * something you can read off the source.
 */

/* Cover briskly, reveal unhurried, and BOTH ARE EXISTING TOKENS rather than new
   numbers — `--dur-base` (220ms) and `--dur-nav-wipe` (460ms), converted to the
   seconds Motion takes. The asymmetry is the point and it is the same reasoning
   the Sheet Rule records for 220-in/150-out: the cover answers a click the
   reader has already made, so it should acknowledge immediately; the reveal is
   presenting a new page and has nothing to race.

   460ms is also the duration the masthead wipe uses for a travelling edge
   across a word, and DESIGN.md §5 states why it is slower than feedback speed:
   at 220ms an edge crossing a surface reads as a flicker rather than a slide.
   A viewport is a much wider surface than a nav link, so if either of these is
   wrong it is the cover being too quick, not the reveal being too slow. */
const COVER = { duration: 0.22, ease: [0.25, 1, 0.5, 1] } as const;
const REVEAL = { duration: 0.46, ease: [0.25, 1, 0.5, 1] } as const;

/* Left to right, and `directionMode: "normal"` so the reveal CONTINUES in the
   cover's direction rather than retreating.

   Both halves matter. Left to right is how this site uncovers type everywhere
   else — the glyph cascade, the hairline, the masthead plate — and the one
   deliberate exception is the `?` sheet, which runs top to bottom because it is
   a panel rather than a word. A page is neither, but it is read left to right,
   and a curtain that retreats the way it came ("reverse") reads as a door that
   opened onto the same room. Continuing makes the cover and the reveal one
   edge crossing the viewport twice in the same direction: the page is wiped
   away and the next one is wiped in by the same stroke. */
const EFFECT = clipWipe({ direction: "right", directionMode: "normal" });

type CurtainLinkProps = ComponentProps<typeof Link>;

export default function CurtainLink({
  href,
  onClick,
  ...rest
}: CurtainLinkProps) {
  const [curtains] = useCurtains();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;

      const target = typeof href === "string" ? href : href.pathname;
      if (!target) return;

      /* Let the browser own every click that is not a plain left-click
         navigation in this tab: cmd/ctrl-click and middle-click open a new tab,
         shift-click a new window, alt-click downloads. Curtaining any of those
         would cover a page the reader is staying on. */
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      /* SAME-DOCUMENT ANCHORS ARE NOT NAVIGATIONS AND MUST NOT BE CURTAINED.
         The masthead's Protocol and Implementations items are `/#why-cashu` and
         `/#implementations`: from `/wallets` they are route changes and earn
         the wipe, from the homepage they are in-page scrolls to a section the
         reader can already see. Covering the viewport to scroll it would be
         absurd, and it would also fight the `g i` chord's smooth scroll.

         So the test is the PATHNAME, not the href — which is also why this
         cannot be a static list. */
      const targetPath = target.split("#")[0] || "/";
      if (targetPath === pathname) return;

      /* A HIDDEN DOCUMENT GETS A PLAIN NAVIGATION, NOT A CURTAIN — and this is
         not defensive coding, it is a failure that was reproduced.
         `useCurtains` awaits the cover animation's `finished` promise before it
         runs the callback that navigates. Chrome freezes `document.timeline`
         and `requestAnimationFrame` in a backgrounded tab, so that promise
         never settles: measured in a hidden tab, the cover animation sat at
         `playState: "running"` with `currentTime: 0` while 818ms of wall clock
         passed, the callback never ran, and the route never changed.

         Be precise about what this guard does and does not cover, because the
         two cases are not the same. It covers a click DISPATCHED while the
         document is hidden — a programmatic `.click()`, an extension, a
         restored session — which is exactly how it was found. It does NOT
         cover the commoner case of a reader clicking on a visible tab and then
         switching away mid-transition: there the cover freezes wherever it is
         and resumes when they come back, which is a stall rather than a break
         and is how every CSS animation on the site already behaves. That one is
         left alone deliberately; forcing it to completion on `visibilitychange`
         would mean the reader returns to a page that has already changed under
         them.

         The site states this same hazard beside `scheduleReveal`, which is a
         timeout rather than a rAF for the same reason. Bailing to the plain
         Link behaviour is the substitute-don't-kill answer: the navigation
         still happens, it just does not get a gesture nobody is watching. */
      if (typeof document !== "undefined" && document.hidden) return;

      event.preventDefault();
      void curtains(
        () => {
          /* RESET THE SCROLL WHILE THE VIEWPORT IS COVERED, and this is a fix
             rather than a nicety. `useCurtains` holds the reveal until React
             has committed and painted, but the App Router's own scroll-to-top
             lands a frame or two later — so without this the curtain lifts on
             the new route still sitting at the OUTGOING page's scroll offset,
             and the reader watches it jump to the top a moment afterwards.
             Observed: /wallets revealed about 210px down, then snapped.

             Doing it here costs nothing, because "here" is the one moment
             nothing is visible. Only when the target has no hash: `/#why-cashu`
             from another route is a navigation the reader expects to land at a
             section, and Next resolves that itself. */
          if (!target.includes("#")) window.scrollTo(0, 0);
          router.push(target);
        },
        {
          effect: EFFECT,
          transition: [COVER, REVEAL],
        },
      );
    },
    [curtains, href, onClick, pathname, router],
  );

  return <Link href={href} onClick={handleClick} {...rest} />;
}
