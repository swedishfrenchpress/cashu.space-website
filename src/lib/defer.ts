/*
 * Defer a state change by one turn of the event loop, never by
 * requestAnimationFrame.
 *
 * A tab opened in the background — cmd-click, "open in new tab", a restored
 * session — pauses rAF indefinitely, so anything scheduled on a frame never
 * runs until the tab is focused. Timeouts are clamped in background tabs but
 * they still fire, so the work completes whether or not anyone is watching.
 * One turn is all this needs; it exists to keep `setState` out of an effect
 * body, which is the lint rule and also the correct pattern.
 *
 * THIS USED TO LIVE IN `reveal.tsx` AS `scheduleReveal`, and it is the only
 * part of the reveal system that outlived it. When every arrival animation was
 * deleted on 2026-08-21 (see the Stagger Rule in DESIGN.md §4) the
 * component, the observer, the jump-arrival tracker and the delay clamp all
 * went with them. `footer-reveal.tsx` still needs the deferral for its
 * progressive-enhancement swap, so the helper moved here rather than being
 * inlined — the reasoning above is the reason it is a timeout, and that
 * reasoning is worth keeping somewhere it can be found.
 */
export function defer(run: () => void) {
  return window.setTimeout(run, 0);
}
