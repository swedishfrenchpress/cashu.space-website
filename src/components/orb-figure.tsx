"use client";

import { useEffect, useRef } from "react";
import { MODE_DRAWS, resolvePreset, type OrbState } from "thinking-orbs";

import { drawBtcGlobe } from "./btc-globe";

/**
 * OrbFigure — a thinking-orb rendered at panel scale. The package's
 * <ThinkingOrb> ships two tuned sizes (64/20) and CSS-scaling its bitmap
 * to ~400px would blur the dots, so this draws the hand-tuned 64px
 * design through the package's exported frame painters (MODE_DRAWS)
 * with the canvas transform magnifying the 64px coordinate space —
 * plain arcs rasterize at device resolution, so the magnified orb
 * stays crisp at any size.
 *
 * The searching state swaps in a local painter (btc-globe.ts) that
 * rebuilds the same globe from ₿ glyphs; the other states stay on the
 * package's painters.
 *
 * Fills FILL of the shorter panel edge, re-measured by ResizeObserver.
 * Theme resolves like the rest of the site (html data-theme, else the
 * OS scheme) and repaints live. Reduced motion pins the same static
 * frame the package uses (t=0.6); offscreen and hidden tabs pause.
 */

const BASE = 64;
const FILL = 0.85;

export default function OrbFigure({ state }: { state: OrbState }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { mode, speed, opts } = resolvePreset(state, BASE);
    const paint = state === "searching" ? drawBtcGlobe : MODE_DRAWS[mode];

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let size = 0;
    let rafId = 0;
    let resizeRaf = 0;
    let disposed = false;
    let inView = true;

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = mqReduce.matches;

    const mqDark = window.matchMedia("(prefers-color-scheme: dark)");
    const resolveDark = () => {
      const t = document.documentElement.dataset.theme;
      if (t === "dark") return true;
      if (t === "light") return false;
      return mqDark.matches;
    };
    let dark = resolveDark();

    const draw = (t: number) => {
      if (size <= 0) return;
      const s = (size / BASE) * dpr;
      ctx.setTransform(s, 0, 0, s, 0, 0);
      ctx.clearRect(0, 0, BASE, BASE);
      paint(ctx, BASE, t, dark, opts);
    };

    const currentT = () =>
      reduced ? 0.6 : (performance.now() / 1000) * speed;

    const tick = () => {
      draw(currentT());
      rafId = requestAnimationFrame(tick);
    };

    const sync = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      if (disposed) return;
      if (reduced) {
        draw(0.6);
        return;
      }
      if (inView && document.visibilityState === "visible") {
        rafId = requestAnimationFrame(tick);
      }
    };

    const onThemeChange = () => {
      dark = resolveDark();
      if (!rafId) draw(currentT());
    };

    const ro = new ResizeObserver((entries) => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        const rect = entries[entries.length - 1].contentRect;
        size = Math.round(Math.min(rect.width, rect.height) * FILL);
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        canvas.width = Math.max(1, Math.round(size * dpr));
        canvas.height = Math.max(1, Math.round(size * dpr));
        draw(currentT());
      });
    });

    const io = new IntersectionObserver((entries) => {
      inView = entries[entries.length - 1].isIntersecting;
      sync();
    });

    const mo = new MutationObserver(onThemeChange);

    const onVisibility = () => sync();
    const onReduceChange = (e: MediaQueryListEvent) => {
      reduced = e.matches;
      sync();
    };

    sync();
    /* The ₿ painter re-measures once webfonts settle; repaint the
       static frame if the loop isn't running (reduced motion). */
    if (state === "searching") {
      document.fonts.ready.then(() => {
        if (!disposed && !rafId) draw(currentT());
      });
    }
    ro.observe(wrap);
    io.observe(wrap);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });
    document.addEventListener("visibilitychange", onVisibility);
    mqReduce.addEventListener("change", onReduceChange);
    mqDark.addEventListener("change", onThemeChange);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(resizeRaf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mqReduce.removeEventListener("change", onReduceChange);
      mqDark.removeEventListener("change", onThemeChange);
    };
  }, [state]);

  return (
    <div ref={wrapRef} className="orb-figure" aria-hidden>
      <canvas ref={canvasRef} className="orb-figure__canvas" />
    </div>
  );
}
