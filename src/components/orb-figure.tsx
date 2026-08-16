"use client";

import { useEffect, useRef } from "react";
import { MODE_DRAWS, resolvePreset, type OrbState } from "thinking-orbs";

/**
 * OrbFigure — a thinking-orbs animation rendered at plate scale.
 *
 * The package's own <ThinkingOrb> ships exactly two tuned sizes, 64 and 20
 * CSS px (`OrbSize = 64 | 20`), and upscaling a 64px canvas to the ~280px
 * this section needs is mush. So we drive the published engine instead:
 * `resolvePreset(state, 64)` hands back the mode, its baked speed, and the
 * fully-scaled draw options for the fine profile, and `MODE_DRAWS` takes the
 * render size as a free number. The dot radii are tuned for a 300pt frame,
 * so ~280px is the geometry's native scale rather than a magnification of
 * the avatar-scale one — the plate is sharper than <ThinkingOrb> would be
 * here, not blurrier.
 *
 * Owning the loop means owning the discipline that came with it:
 *
 * - Device-pixel-ratio capped at 2, matching the library.
 * - The rAF loop runs only while the plate is on screen and the tab is
 *   visible. Four canvases animate in this section; none of them burn a
 *   frame budget two viewports above the fold.
 * - `prefers-reduced-motion` paints one representative frame (t = 0.6, the
 *   library's own static sample) and never starts a loop. Live-tracked, so
 *   flipping the OS setting takes effect without a reload.
 * - Size comes from a ResizeObserver rather than a prop, so the plate is
 *   responsive without the canvas ever being scaled by CSS.
 *
 * The substrate is pinned dark. These plates only ever sit on the
 * always-dark `--panel` column, in both site themes, so there is nothing
 * for the library's theme detection to detect and a `data-theme="light"`
 * document must not flip the ink to black-on-black.
 */

/* Which preset to resolve, not what to render at. 64 is the fine profile —
   count and size multipliers at or near 1 — which is what a plate wants;
   the 20 preset thins the dot count for inline scale. */
const PRESET_SIZE = 64;

/* The library's own reduced-motion sample. Held identical so a static plate
   here and a static <ThinkingOrb> elsewhere are the same instant. */
const STATIC_T = 0.6;

const MAX_DPR = 2;

type OrbFigureProps = {
  state: OrbState;
  /**
   * An authoring note describing what the chosen mode actually renders, kept
   * beside each entry in protocol-parts.tsx so the four plates can be
   * compared without running them. It is deliberately NOT an accessible
   * name — the canvas is aria-hidden; see the note at the render site.
   */
  label: string;
};

export default function OrbFigure({ state }: OrbFigureProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { mode, speed, opts } = resolvePreset(state, PRESET_SIZE);
    const draw = MODE_DRAWS[mode];

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let size = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let inView = false;

    const paint = (t: number) => {
      if (!size) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      draw(ctx, size, t, true, opts);
    };

    /* One clock for every plate: derived from performance.now(), never
       accumulated across frames. A plate that pauses offscreen and resumes
       comes back in phase with its neighbours instead of drifting behind
       them by however long it sat still. */
    const now = () => (performance.now() / 1000) * speed;

    const frame = () => {
      paint(now());
      if (running) raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const start = () => {
      if (running || mqReduce.matches) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      if (inView && !mqReduce.matches && document.visibilityState === "visible") {
        start();
      } else {
        stop();
        // Reduced motion arriving mid-run must not leave the last animated
        // frame on screen as the "static" one.
        if (mqReduce.matches) paint(STATIC_T);
      }
    };

    const ro = new ResizeObserver((entries) => {
      const box = entries[entries.length - 1].contentRect;
      const next = Math.round(Math.min(box.width, box.height));
      if (!next || next === size) return;
      size = next;
      dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      // Resizing clears the backing store; repaint at once so a paused or
      // reduced-motion plate does not blank out on a viewport change.
      paint(mqReduce.matches ? STATIC_T : now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver((entries) => {
      inView = entries[entries.length - 1].isIntersecting;
      sync();
    });
    io.observe(canvas);

    document.addEventListener("visibilitychange", sync);
    mqReduce.addEventListener("change", sync);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      mqReduce.removeEventListener("change", sync);
    };
  }, [state]);

  return (
    <div className="orb-plate">
      {/* Registration frame. The plate device that keeps a loading-indicator
          animation reading as a figure in a numbered spec rather than as a
          spinner: a dotted crop box the orb deliberately overruns, the same
          move the reference makes with its wireframe globe. */}
      <span className="orb-plate__crop" aria-hidden />
      {/* aria-hidden, not role="img" with a description. DESIGN.md §4 admits
          these plates precisely because they "depict nothing about Cashu" and
          are material rather than a claim — so narrating "a dotted band
          undulating around a sphere" four times down the column spends a
          screen-reader visitor's attention on decoration the design system
          itself says carries no information. The 7px --signal square beside
          them is already aria-hidden for the same reason; the site was
          hiding a 7px decoration and announcing a 320px one. `label` is kept
          as an authoring note on the mode chosen for each entry. */}
      <canvas ref={canvasRef} className="orb-plate__canvas" aria-hidden />
    </div>
  );
}
