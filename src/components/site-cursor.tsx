"use client";

import { Cursor, useCursorState } from "motion-plus/react";
import { useEffect, useState, type CSSProperties } from "react";
import { useMotionUITransition } from "@/components/motion-ui/ui-theme";

/*
 * SITE CURSOR — Motion+'s `Cursor`, in replace mode (2026-08-21,
 * user-directed).
 *
 * Adapted from Motion's `cursor` example, "Adaptive caret size"
 * (https://motion.dev/examples/react-cursor). As with the Stagger Rule, only
 * the MECHANISM is taken and none of the example's material: no blue `text`
 * variant, no rounded pill, no grey. The whole point of that example is the
 * third state — over selectable text the cursor becomes a caret the height of
 * the type it is over — and on a site whose register is a published
 * specification, a cursor that measures the type it crosses is the one
 * pointer treatment that is *about* the document rather than about itself.
 *
 * It is a REPLACEMENT, not a follower. `follow` mode trails the real cursor
 * with a spring, which is the agency-portfolio version of this component and
 * is also the one that leaves two things on screen. Replace mode pins the
 * element to the pointer exactly (`spring` defaults to `false` here) and hides
 * the browser's own, so there is one cursor and it is never late.
 *
 * ---------------------------------------------------------------------------
 * ONE COLOUR, EVERY GROUND: `mix-blend-mode: difference` on white.
 *
 * This site is light-only but it is not uniformly light — the masthead, the
 * footer plate, the protocol-parts column and the Spec pane are fixed dark
 * surfaces, and the press photography is greyscale. An Ink cursor vanishes on
 * four of those; a white one vanishes on the page. The alternatives were a
 * per-plate `data-cursor-zone` table (a value to maintain on every dark
 * surface, and a wrong one the day a fifth is added) or a cursor with a
 * keyline (Motion animates the morph with `layout`, i.e. by SCALING, and a
 * scaled border visibly thickens and thins through the transition).
 *
 * `difference` against white is neither: the cursor renders |ground - 255| at
 * every pixel it covers, so it is #000000 on Paper — exactly `--edge`, the
 * token the site already reserves for pure-black accents — and near-white on
 * the plates, with no branch and no table. It introduces no colour, because on
 * a monochrome ground the difference of two greys is a grey. It is also not
 * glass: nothing here is translucent, blurred or soft. It is an inversion, the
 * registration mark of a printed page.
 * ---------------------------------------------------------------------------
 *
 * THREE GUARDS, and each one is a real device rather than a preference.
 *
 * 1. `(pointer: fine)`. A custom cursor on a touch device is a promise to
 *    nobody, the same argument that scopes the press rail's `grab` — and
 *    Motion's component injects `* { cursor: none !important }` on mount,
 *    before the pointer has moved, so mounting it on a phone is a global
 *    stylesheet and three window listeners bought for nothing. The guard lives
 *    in the OUTER component so the inner one, which is what subscribes, is
 *    never mounted there at all.
 * 2. `prefers-reduced-motion`. The documented behaviour: return null and let
 *    the platform cursor stand. Motion's own internals stop hiding the browser
 *    cursor under the query, which would otherwise leave a second cursor
 *    pinned to the first. Read through `useMediaQuery` below rather than
 *    Motion's `useReducedMotion`, which is `useState(initial)` and therefore
 *    reads the query exactly once — the correction `button-cipher.tsx` took on
 *    2026-08-20, for the same reason.
 * 3. Nothing renders until the pointer moves. That is Motion's
 *    `useHasPointerMoved`, not ours, and it is the reason a keyboard visitor
 *    never sees this component and the reason there is no cursor sitting at
 *    (0, 0) on load.
 *
 * WHAT THIS COSTS, recorded rather than hidden: the browser cursor is hidden
 * by a `!important` universal rule, so every `cursor` declaration on the site
 * stops being visible — `.press-track`'s `grab` is the only one that carried
 * information, and it is repaired below by zone. Two more are repaired in
 * globals.css, at the `?` sheet, because a modal <dialog> paints in the TOP
 * LAYER and this element does not: see the `.keymap-help` cursor block there.
 */

/* Sizes, in px. Motion ships 17 / 31; these are the same intent on the site's
   4px grid, one step tighter. The `text` state is deliberately absent — that
   branch is `matchTextSize`, the example's whole subject, and it resolves to
   the hovered type's own font-size at 4px wide. A `style` width there is
   ignored by Motion, which is correct: the caret's size is a fact about the
   type, not a taste value. */
const SIZE_DEFAULT = 12;
const SIZE_POINTER = 28;

/* The press rail's repair. `.press-track` states `cursor: grab` inside a
   `(pointer: fine)` query and the universal rule above erases it, so the one
   affordance on the site that a cursor was carrying would silently go.
   A bar on the rail's own axis says the same thing in this cursor's material:
   no glyph, no rotation, no new value.

   Scoped to `type === "default"`, which is exactly the geometry `grab` had:
   the cards inside the track are <a> elements and the UA's `pointer` always
   beat the track's inherited `grab` over them. So the rail reads as
   draggable in the gutters and as clickable on a card, before and after. */
const RAIL_ZONE = "rail";
const SIZE_RAIL_W = 28;
const SIZE_RAIL_H = 8;

const CURSOR_STYLE: CSSProperties = {
  backgroundColor: "#ffffff",
  mixBlendMode: "difference",
  /* Motion's default is `borderRadius: 20`, i.e. a pill at every size it
     takes. There is no radius in this site's voice — see DESIGN.md §5. */
  borderRadius: 0,
};

export default function SiteCursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (!finePointer || reduceMotion) return null;

  return <SharpCursor />;
}

function SharpCursor() {
  /* `snap` is the theme's instant-feedback token (motion.theme.json), and this
     is its second real consumer after the press rail. It drives the layout
     morph between the three states — critically damped, ~150ms, no bounce —
     so the cursor changes shape with the same physics as everything else that
     answers a pointer. Motion's own default here is a 150ms tween on a
     one-off curve, which would be the site's third easing. */
  const transition = useMotionUITransition("snap");
  const { type, zone } = useCursorState();

  return <Cursor transition={transition} style={{ ...CURSOR_STYLE, ...sizeFor(type, zone) }} />;
}

/** The two states this component sizes. `text` returns nothing on purpose —
    see SIZE_DEFAULT's note: Motion resolves that one from the type itself. */
function sizeFor(type: string, zone: string | null): CSSProperties {
  if (zone === RAIL_ZONE && type === "default") {
    return { width: SIZE_RAIL_W, height: SIZE_RAIL_H };
  }
  if (type === "pointer") return { width: SIZE_POINTER, height: SIZE_POINTER };
  if (type === "text") return {};
  return { width: SIZE_DEFAULT, height: SIZE_DEFAULT };
}

/* Live-tracked, not read once at mount. A trackpad plugged into a tablet, an
   OS motion preference changed in another window, a browser moved between a
   touch panel and a desktop display: all three flip a query with no reload,
   and a cursor that has to be reloaded to appear or disappear is a bug.

   Both callers start `false`, which is deliberate and reads correctly in both
   directions: the gate above is `!fine || reduce`, so before the effect runs —
   which includes the server render and the first client render — the answer is
   "render nothing". A visitor who prefers reduced motion, or has no fine
   pointer, therefore never mounts the component even for a frame, and nobody
   gets a hydration mismatch out of it. */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const sync = () => setMatches(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, [query]);

  return matches;
}
