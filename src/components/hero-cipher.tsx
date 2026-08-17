"use client";

import { useEffect, useRef } from "react";
import { decryptText } from "@/lib/cipher";

/* Starts with the headline's own Reveal (page.tsx passes delay={120}) so the
   word resolves as the line rises rather than after it has landed — one
   gesture, not two. Ends at 880ms, just inside the hairline's 1100ms draw, so
   the hero is completely still by ~1.1s.

   Measured from the reveal's clock, not from hydration — see `joinArrival`. */
const START_DELAY = 120;
const DURATION = 760;

/* The glyph churn is quantised rather than run per frame: at 60fps a fresh
   random glyph every 16ms is a strobe, and the pass is meant to read as a
   value resolving, not as static. 46ms is the rate button-cipher.tsx uses. */
const CHURN_MS = 46;

/** Quart-out — the sweep resolves most of the word early and then settles,
 *  which matches --ease-out-quart everywhere else on the site. */
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * How long to wait before starting the pass, measured against the headline's
 * own arrival animation rather than against hydration — or `null` to say the
 * arrival is over and the pass must not run at all.
 *
 * THIS EXISTS BECAUSE THE HERO NO LONGER WAITS FOR REACT (2026-08-17). The
 * headline's Reveal is now a CSS animation that plays at parse time
 * (`.reveal--arrival` in globals.css), so on a slow connection the line has
 * risen, settled, and been sitting there legible for a second or more before
 * this component's effect ever runs. Scrambling the word at that point would
 * be a second event answering nothing, a full second after the page went
 * quiet — precisely the ambient motion the Set-Once Rule forbids (DESIGN.md
 * §4). Worse than an ambient loop, in fact: an ambient loop at least never
 * pretends to be an arrival.
 *
 * So the pass belongs to the arrival or it does not happen. If the reveal is
 * still running, we join it, offset by the reveal's remaining delay so the
 * word still resolves *as* the line rises. If the reveal has finished, we
 * return null and the word simply stays set — which is also exactly what a
 * reduced-motion visitor and a no-JS visitor already get.
 *
 * The animation's own clock is the honest instrument here. A wall-clock
 * threshold would need a constant nobody could derive, and would drift the
 * moment --dur-reveal or the authored stagger changed.
 */
function joinArrival(host: HTMLElement): number | null {
  const wrapper = host.closest<HTMLElement>(".reveal--arrival");
  /* No wrapper, or a browser without getAnimations: fall back to the old
     behaviour rather than silently dropping the hero's only motion. */
  const arrival = wrapper?.getAnimations?.().find((a) => a.playState !== "idle");
  if (!arrival) return START_DELAY;
  if (arrival.playState === "finished") return null;
  /* currentTime counts from the start of the animation's delay phase, and
     that delay is the same 120ms START_DELAY names, so the remainder is what
     is left of the reveal's own wait. */
  const elapsed = Number(arrival.currentTime ?? 0);
  return Math.max(0, START_DELAY - elapsed);
}

/**
 * HeroCipher — one word of the hero headline resolves out of hex on arrival.
 *
 * This is the whole of the hero's motion, together with the hairline drawing
 * across the fold. The looping dot figure that used to be the hero's ground
 * was deleted 2026-08-16 on the user's direction (see the Set-Once Rule,
 * DESIGN.md §4): it read as generic, and it was the only thing on the page
 * that moved without a cause. The hero now sets once and then holds.
 *
 * WHY THIS WORD. "ecash" is the one word in the line whose meaning is a value
 * you cannot see until it resolves, which is the thing the cipher pass has
 * always depicted. Running the pass across the whole headline was considered
 * and rejected: 9rem of hex for the better part of a second makes the page
 * peak unreadable at exactly the moment it is being read, and it drifts
 * toward the scramble trope the site otherwise avoids.
 *
 * ACCESSIBILITY. The real text is a real child, server-rendered, so the h1's
 * accessible name is "Open source ecash for bitcoin." at every point in the
 * pass. The scrambled glyphs live in an aria-hidden overlay that is created
 * in an effect and never exists on the server, so there is nothing to
 * mismatch on hydration and nothing to read out. Without JS the word simply
 * renders. Under prefers-reduced-motion the overlay is never created at all.
 *
 * AND IT IS NOW ALSO SKIPPED WHEN THE ARRIVAL IS OVER — see `joinArrival`.
 * The headline paints before hydration as of 2026-08-17, so on a slow
 * connection this effect can run long after the hero has gone quiet, and a
 * word that scrambles itself a second after settling is not an entrance.
 */
export default function HeroCipher({ children }: { children: string }) {
  const hostRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wait = joinArrival(host);
    if (wait === null) return;

    const label = document.createElement("span");
    label.className = "hero-cipher__label";
    label.setAttribute("aria-hidden", "true");

    let frame = 0;
    let timer = 0;
    let startedAt = 0;

    const finish = () => {
      cancelAnimationFrame(frame);
      host.classList.remove("hero-ciphering");
      label.remove();
    };

    const paint = (now: number) => {
      const progress = Math.min((now - startedAt) / DURATION, 1);
      label.textContent = decryptText(
        children,
        easeOutQuart(progress),
        Math.floor((now - startedAt) / CHURN_MS),
      );
      if (progress < 1) frame = requestAnimationFrame(paint);
      else finish();
    };

    const start = () => {
      /* Paint the fully scrambled first frame before the class lands, so the
         word never flashes transparent between going invisible and the
         overlay having content. */
      label.textContent = decryptText(children, 0, 0);
      host.append(label);
      host.classList.add("hero-ciphering");
      startedAt = performance.now();
      frame = requestAnimationFrame(paint);
    };

    timer = window.setTimeout(start, wait);

    return () => {
      window.clearTimeout(timer);
      finish();
    };
  }, [children]);

  return (
    <span ref={hostRef} className="hero-cipher">
      {children}
    </span>
  );
}
