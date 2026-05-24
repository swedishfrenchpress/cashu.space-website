"use client";

import { useEffect, useRef } from "react";

/**
 * BlindedGrid — Three.js dither shader for the hero's reserved
 * `.hero-spec__art` slot. Draws a grid of cells whose contents
 * (sparse "bit-pattern" data) cycle into a denser halftone fill,
 * diagramming Cashu's blind-signature mechanism. Cursor proximity
 * temporarily unblinds nearby cells.
 *
 * Three.js loads via dynamic import inside the effect, so the page
 * bundle stays small and SSR never touches the WebGL APIs.
 */
export default function BlindedGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const [THREE, shaders] = await Promise.all([
        import("three"),
        import("./blinded-grid.glsl"),
      ]);
      if (disposed) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: false,
          premultipliedAlpha: false,
        });
      } catch {
        // No WebGL — empty placeholder stays. The hero degrades gracefully.
        return;
      }
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const geometry = new THREE.PlaneGeometry(2, 2);

      const uniforms = {
        uResolution: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(-1, -1) },
        uCellPx: { value: 28 },
        uDpr: { value: 1 },
        uInk: { value: 0.443 }, // #71717a (mist)
        uMotion: { value: reducedMotion ? 0 : 1 },
      };

      const material = new THREE.RawShaderMaterial({
        vertexShader: shaders.vertexShader,
        fragmentShader: shaders.fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
        depthTest: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const canvas = renderer.domElement;
      canvas.style.position = "absolute";
      canvas.style.inset = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      container.appendChild(canvas);

      let width = 0;
      let height = 0;
      let dpr = 1;

      const render = () => renderer.render(scene, camera);

      const resize = () => {
        const rect = container.getBoundingClientRect();
        const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
        if (
          rect.width === width &&
          rect.height === height &&
          nextDpr === dpr
        ) {
          return;
        }
        width = rect.width;
        height = rect.height;
        dpr = nextDpr;
        renderer.setPixelRatio(dpr);
        renderer.setSize(width, height, false);
        uniforms.uResolution.value.set(width * dpr, height * dpr);
        uniforms.uDpr.value = dpr;
        render();
      };

      const start = performance.now();
      let rafId = 0;
      let isVisible = true;

      const tick = () => {
        rafId = 0;
        if (!isVisible || disposed) return;
        uniforms.uTime.value = (performance.now() - start) / 1000;
        render();
        rafId = requestAnimationFrame(tick);
      };

      const onPointerMove = (event: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        uniforms.uMouse.value.set(
          (event.clientX - rect.left) * dpr,
          (rect.bottom - event.clientY) * dpr,
        );
        if (reducedMotion) render();
      };

      const onPointerLeave = () => {
        uniforms.uMouse.value.set(-1, -1);
        if (reducedMotion) render();
      };

      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerleave", onPointerLeave);

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);

      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            isVisible = entry.isIntersecting;
          }
          if (isVisible && !rafId && !reducedMotion) {
            rafId = requestAnimationFrame(tick);
          }
        },
        { threshold: 0.01 },
      );
      intersectionObserver.observe(container);

      resize();
      if (reducedMotion) {
        render();
      } else {
        rafId = requestAnimationFrame(tick);
      }

      // Fade in on next frame so the canvas paints once before the
      // CSS transition kicks in — no flash of mid-state.
      requestAnimationFrame(() => {
        if (!disposed) container.classList.add("hero-spec__art--ready");
      });

      cleanup = () => {
        if (rafId) cancelAnimationFrame(rafId);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        container.removeEventListener("pointermove", onPointerMove);
        container.removeEventListener("pointerleave", onPointerLeave);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        if (canvas.parentNode === container) {
          container.removeChild(canvas);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-spec__art" aria-hidden="true" />
  );
}
