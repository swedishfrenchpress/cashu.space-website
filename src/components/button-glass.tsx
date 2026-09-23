"use client";

import { useEffect, useState } from "react";

const BUTTON_SELECTOR = [
  ".btn-primary",
  ".btn-secondary",
  ".btn-primary--on-ink",
  ".btn-secondary--on-ink",
].join(", ");

/**
 * The specular highlight on the Liquid Glass slabs (globals.css, "LIQUID GLASS
 * SLAB"). CSS paints the material; this supplies the one thing CSS cannot,
 * which is where the light is. Without it the slab is a frosted rectangle with
 * a fixed shine — the moving specular is what says the surface is curved.
 *
 * ONE DELEGATED LISTENER, NOT ONE PER BUTTON. button-cipher.tsx attaches per
 * element because it owns a DOM node per button and needs a MutationObserver
 * to find new ones; this owns nothing but two custom properties, so a single
 * document-level pointermove that walks up from the target costs less and
 * cannot go stale when a route change swaps the buttons out.
 *
 * Writes are throttled to one animation frame. The handler reads a rect, so
 * an unthrottled version would force layout on every pointermove event — at
 * pointer sample rates that is several reads per frame for one gradient
 * position that can only be painted once.
 */
export default function ButtonGlass() {
  /* Both queries are LIVE-TRACKED, never read once at mount. That correction
     was made against button-cipher.tsx on 2026-08-20 and it applies here for
     the same reason: a visitor who turns reduced motion on mid-session should
     not have to reload to be rid of the effect. `(pointer: fine)` is the
     second query because a coarse pointer has no hover to track — on a
     touchscreen the sheen would light up under the finger already pressing
     the button, which is a highlight reporting the thing the press already
     reported. */
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !reduced.matches);
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let active: HTMLElement | null = null;
    let frame: number | undefined;
    let pending: { target: HTMLElement; x: number; y: number } | null = null;

    /* Removing the properties rather than zeroing them hands the button back
       to the stylesheet's rest position, which parks the highlight above the
       top edge. Zeroing --glass-sheen alone would leave a stale --glass-x /
       --glass-y behind, so the next hover would fade a highlight in at
       wherever the pointer left last time before tracking caught up. */
    const release = (button: HTMLElement) => {
      button.style.removeProperty("--glass-x");
      button.style.removeProperty("--glass-y");
      button.style.removeProperty("--glass-sheen");
    };

    const paint = () => {
      frame = undefined;
      if (!pending) return;
      const { target, x, y } = pending;
      pending = null;
      const box = target.getBoundingClientRect();
      if (box.width === 0 || box.height === 0) return;
      target.style.setProperty("--glass-x", `${((x - box.left) / box.width) * 100}%`);
      target.style.setProperty("--glass-y", `${((y - box.top) / box.height) * 100}%`);
      target.style.setProperty("--glass-sheen", "1");
    };

    const onMove = (event: PointerEvent) => {
      const found =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(BUTTON_SELECTOR)
          : null;

      if (found !== active) {
        if (active) release(active);
        active = found;
      }
      if (!found) {
        pending = null;
        return;
      }

      pending = { target: found, x: event.clientX, y: event.clientY };
      if (frame === undefined) frame = requestAnimationFrame(paint);
    };

    /* The move handler already clears the sheen when the pointer crosses onto
       something else, but leaving the document entirely produces no such move
       — the last event is over the button and the highlight would stay lit on
       a page nobody is pointing at. */
    const onLeave = () => {
      if (active) release(active);
      active = null;
      pending = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (frame !== undefined) cancelAnimationFrame(frame);
      if (active) release(active);
    };
  }, [enabled]);

  return null;
}
