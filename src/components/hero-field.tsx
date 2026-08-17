"use client";

import { useEffect, useRef, useState } from "react";
import { createDitherScene, type DitherScene, type SceneColors } from "@/lib/hero-field/scene";

/**
 * HeroField — the hero's ground: a frozen field of Geist Mono hex, and a wake
 * the pointer resolves into currency marks.
 *
 * THE FIELD HAS TWO LAYERS AND THE POINTER PICKS WHICH ONE YOU SEE. At rest
 * every cell is a hex digit — entropy, which is what a Cashu secret is. Inside
 * the wake the same cell shows a currency mark instead (₿ weighted heavily,
 * then $ € ¥ ₩ £ ₹ ₽ ¢ ₱ ₴). Behind the wake it re-encrypts. Nothing cycles:
 * each cell has one resting digit and one denomination, both pure hashes of
 * its coordinates, so the event is a *revelation* rather than a flicker. A
 * blinded token is money that looks like noise until something resolves it —
 * see `glyphs.ts`, which also documents which of those marks the face does not
 * actually contain.
 *
 * WHAT THIS IS NOT, ANY MORE. The first build of this was an ordered Bayer
 * dither with a mint-green fluid plume — which is aspensearch.com's hero, and
 * was a straight port of it down to the solver constants. Both borrowed
 * elements are gone on the user's direction: the halftone is now a grid of the
 * site's own monospace face, and the wake is monochrome. `--signal` went back
 * to the 7px property squares and the directory status tag, where it started.
 *
 * The gesture that was worth keeping is the one that survives: a ground the
 * reader disturbs, shaped by a real fluid solver so the wake curls and settles
 * instead of following the cursor like a spotlight. What it modulates is now
 * which alphabet a cell is drawn from and how hard it is set.
 *
 * THE SET-ONCE RULE STILL HOLDS, and this is the amendment that keeps it
 * (DESIGN.md §4, user-directed 2026-08-16, after aspensearch.com). The rule's
 * ban was on motion that answers nothing: "the masthead's clip-path wipe
 * answers a pointer, the button cipher answers a hover, the reveals answer a
 * scroll. An ambient loop answers nothing." Every word of that survives here.
 *
 *   - The field does not drift. It is baked into a texture once per viewport
 *     size and never recomputed. There is no time uniform anywhere in
 *     `shaders.ts`.
 *   - There is no rAF at rest. The loop starts on a pointermove and stops
 *     ~2.2s after the last one, having first cleared the trail so the frame it
 *     leaves behind is bit-identical to the frame it started from.
 *   - So the hero is exactly as still as it was with no ground at all, and the
 *     only thing that ever moves is the thing the reader is doing.
 *
 * `window.__heroFieldFrames` counts frames drawn. It exists so the stillness
 * above is testable rather than asserted: sample it twice across a quiet
 * interval and the delta must be zero.
 *
 * THE GROUND AND THE PLUME ARE GATED SEPARATELY. The ground is a still image
 * and everyone gets it; the plume needs a pointer to cause it, so it is built
 * only where one exists and where motion has not been declined. See the two
 * pieces of state below.
 *
 * WHAT THIS IS NOT. The field is Perlin noise — plain material, carrying no
 * assertion. It clears the Honest-Network Rule's *second* branch only, which
 * is the same branch the deleted dot figure cleared, and it is admitted here
 * by user decision rather than because it depicts anything. If the hero is
 * ever asked to mean something, the standing candidate is the blind-signature
 * round trip at `git show 5e4c0e8^:src/lib/ascii/bdhke.ts`.
 */

/**
 * How long after the last pointer event the loop keeps running. The dye
 * dissipates at 3.2/s, so it is below the lowest Bayer threshold well before
 * this; the margin is there so the stop is never visible as a cut.
 *
 * A dye-energy readback would be exact, but `readPixels` stalls the pipeline
 * every frame to save a fraction of a second of idle rAF. Not worth it.
 */
const TRAIL_LIFETIME_MS = 2200;

/** Falls back to the shipped token values if a custom property is missing. */
const REST_FALLBACK: [number, number, number] = [0.83, 0.83, 0.85];
const PAPER_FALLBACK: [number, number, number] = [1, 1, 1];
const WAKE_FALLBACK: [number, number, number] = [0.25, 0.25, 0.27];

function parseHex(
  value: string,
  fallback: [number, number, number],
): [number, number, number] {
  const hex = value.trim().replace(/^#/, "");
  const full =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;
  if (full.length !== 6 || !/^[0-9a-f]{6}$/i.test(full)) return fallback;
  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255,
  ];
}

/**
 * Every value comes from CSS rather than being written here, so the field
 * follows the scheme the same way every other surface does — and so the
 * component introduces no colour of its own at all.
 *
 * `--ghost` is the resting field, one quiet step off the page ground.
 * `--body` is a disturbed cell: a clear resolve, but still a step below the
 * `--ink` the headline is set in, so the wake can never out-set the page peak.
 * Both are existing ramp values and both are monochrome. The green that used
 * to be here is back where §2 scoped it.
 */
function readColors(): SceneColors {
  const style = getComputedStyle(document.documentElement);
  return {
    rest: parseHex(style.getPropertyValue("--ghost"), REST_FALLBACK),
    wake: parseHex(style.getPropertyValue("--body"), WAKE_FALLBACK),
    paper: parseHex(style.getPropertyValue("--paper"), PAPER_FALLBACK),
  };
}

/**
 * The face the atlas is cut in. Read from the same custom property the rest of
 * the site's technical notation uses, so the field cannot drift onto a
 * different typeface than the copy beside it.
 */
function readMonoFamily(): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-mono")
    .trim();
  return value ? `${value}, ui-monospace, monospace` : "ui-monospace, monospace";
}

declare global {
  interface Window {
    __heroFieldFrames?: number;
  }
}

export default function HeroField() {
  const [mounted, setMounted] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /*
   * TWO TIERS, NOT ONE SWITCH.
   *
   * The ground is a *static texture* — it genuinely does not move — so there
   * is no reason to withhold it from anyone. Everybody who can run WebGL2 gets
   * it, including reduced-motion visitors and every phone. Withholding a still
   * image from someone who asked for less motion would be withholding it for
   * no reason, and gating it on a mouse would hand most of this site's traffic
   * (a link opened on a phone) a different hero from everyone else's.
   *
   * The *plume* is the part that needs a cause, so it needs a pointer that can
   * cause it and a visitor who has not asked motion to stop. Without both, no
   * solver is allocated at all — see `createDitherScene`'s `interactive`.
   *
   * The canvas is still created only on the client, and only once these have
   * been evaluated: an invisible full-bleed element in the hero is exactly the
   * surface a contrast extension repaints as a solid plate (CLAUDE.md's
   * overlay hazard), so there must never be one waiting in the SSR output.
   */
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const evaluate = () => {
      setMounted(true);
      setInteractive(!motion.matches && pointer.matches);
    };
    evaluate();

    motion.addEventListener("change", evaluate);
    pointer.addEventListener("change", evaluate);
    return () => {
      motion.removeEventListener("change", evaluate);
      pointer.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!mounted || !canvas) return;

    const scene: DitherScene | null = createDitherScene(
      canvas,
      () => canvas.closest(".hero-spec")?.querySelector(".hero-spec__content") ?? null,
      readColors(),
      interactive,
    );
    /* No WebGL2, no renderable half-float targets, or a shader that would not
       compile: unmount and leave the hero exactly as it ships without JS. */
    if (!scene) {
      setMounted(false);
      return;
    }

    /*
     * NOTHING RENDERS UNTIL THE REAL FACE IS IN HAND. The atlas is rasterised
     * through a 2D canvas, and `ctx.font` silently falls back to the system
     * monospace if Geist Mono has not loaded — which would ship the field in
     * the wrong typeface, on a site with a three-typeface rule, in a way that
     * still looks fine and so survives review. `fonts.ready` is the gate.
     *
     * It doubles as the mask's correction: the headline's box is measured at
     * mount, and a face that swaps in afterwards re-wraps it without changing
     * the hero's height, so the ResizeObserver never fires and the mask would
     * stay fitted to the fallback's metrics.
     */
    const cutGlyphs = () => {
      if (!scene.loadGlyphs(readMonoFamily())) return;
      scene.resize();
      scene.render();
    };
    if (document.fonts?.status === "loaded") cutGlyphs();
    else void document.fonts?.ready.then(cutGlyphs);

    let frame = 0;
    let lastFrameAt = 0;
    let lastInputAt = 0;
    let onScreen = true;
    let pageVisible = !document.hidden;
    const last = { x: 0, y: 0, valid: false };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const loop = (now: number) => {
      window.__heroFieldFrames = (window.__heroFieldFrames ?? 0) + 1;
      scene.step((now - lastFrameAt) / 1000);
      scene.render();
      lastFrameAt = now;

      if (now - lastInputAt > TRAIL_LIFETIME_MS) {
        /* Land on a frame that is bit-identical to the resting one, so the
           loop stopping is not itself a visible event. */
        scene.clearTrail();
        scene.render();
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(loop);
    };

    const wake = () => {
      if (frame || !onScreen || !pageVisible) return;
      lastFrameAt = performance.now();
      frame = requestAnimationFrame(loop);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (event.clientX - rect.left) / rect.width;
      // Flipped: the solver and the shaders work in gl_FragCoord's y-up space.
      const y = 1 - (event.clientY - rect.top) / rect.height;

      /* Listening on window rather than the canvas, because the canvas is
         pointer-events: none and must stay that way — it sits over the hero
         and the CTAs are underneath it. The bounds check is what scopes the
         effect back to the hero. */
      if (x < -0.05 || x > 1.05 || y < -0.05 || y > 1.05) {
        last.valid = false;
        return;
      }
      if (last.valid) {
        // The delta is the momentum: the plume is thrown the way you moved,
        // not merely painted where you are.
        scene.splat(x, y, x - last.x, y - last.y);
        lastInputAt = performance.now();
        wake();
      }
      last.x = x;
      last.y = y;
      last.valid = true;
    };

    const onPointerOut = () => {
      last.valid = false;
    };

    const idle = () => {
      stop();
      scene.clearTrail();
      last.valid = false;
    };

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) scene.render();
      else idle();
    };

    /* A quarter of the hero, not a single pixel of it. At threshold 0 a
       sliver of hero left at the top of the viewport still answered the
       pointer — motion in a strip the reader has already scrolled past and is
       not looking at, which is motion they did not intend to cause. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (!onScreen) idle();
      },
      { threshold: 0.25 },
    );
    observer.observe(canvas);

    /* ResizeObserver, not a window resize listener: the hero's height is
       driven by svh and the sticky bar, so it can change without the window
       firing anything. Re-bakes the field and re-measures the title block. */
    const resizeObserver = new ResizeObserver(() => {
      idle();
      if (scene.resize()) scene.render();
    });
    resizeObserver.observe(canvas);

    /* The scheme can flip two ways — the toggle writes data-theme, the OS
       drives the media query — and the field's two colours live in CSS, so
       both have to reach the shader. */
    const schemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      scene.setColors(readColors());
      scene.render();
    };
    schemeQuery.addEventListener("change", onScheme);
    const themeObserver = new MutationObserver(onScheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    /* A GPU reset or a driver eviction blanks the field silently. Without
       this the canvas would sit there empty for the rest of the visit; with
       it, the element is removed and the hero degrades to exactly the version
       that ships without JS. Deliberately not retried — a context lost once is
       usually a context that will be lost again, and a remount loop on a
       failing GPU is worse than a missing texture nobody was told about. */
    const onContextLost = (event: Event) => {
      event.preventDefault();
      setMounted(false);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    /* Only the plume needs input. Without a solver these would splat into
       nothing and wake a loop with no work to do. */
    if (interactive) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerOut);
      document.addEventListener("mouseleave", onPointerOut);
      document.addEventListener("visibilitychange", onVisibility);
    }

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      schemeQuery.removeEventListener("change", onScheme);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerOut);
      document.removeEventListener("mouseleave", onPointerOut);
      document.removeEventListener("visibilitychange", onVisibility);
      scene.dispose();
    };
  }, [mounted, interactive]);

  if (!mounted) return null;
  return <canvas ref={canvasRef} className="hero-field" aria-hidden="true" />;
}
