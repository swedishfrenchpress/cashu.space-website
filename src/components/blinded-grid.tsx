"use client";

import { useEffect, useRef } from "react";

/**
 * BlindedGrid — Three.js shader figure for the hero's reserved
 * `.hero-spec__art` slot. Each cell holds a power-of-2 denomination
 * (1, 2, 4, …, 1024 — the Cashu denomination set). A horizontal
 * signing sweep cycles across the grid; cells behind it dither into
 * halftone occlusion (blind signature). Cursor proximity unblinds
 * nearby cells, exposing their denominations.
 *
 * Three.js and the digit atlas load via dynamic import inside the
 * effect, so the page bundle stays small and SSR never touches the
 * WebGL APIs.
 */

// Build a 10-digit monospace texture atlas. The shader samples each
// glyph by its index (0..9). Atlas resolution is generous so digits
// stay crisp at any cell size we render at; the cost is paid once on
// component mount.
function buildDigitAtlas(): HTMLCanvasElement {
  const digitW = 64;
  const atlasH = 96;
  const canvas = document.createElement("canvas");
  canvas.width = digitW * 10;
  canvas.height = atlasH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.font =
    '600 78px "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace';
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  // Atlas Y is bottom-up to match WebGL's gl_FragCoord (origin
  // bottom-left). Three.js's CanvasTexture flips Y by default
  // (flipY=true), so canvas's top-left origin lines up with the
  // shader's uv (0,0)=bottom-left after the flip.
  for (let i = 0; i < 10; i++) {
    ctx.fillText(String(i), i * digitW + digitW / 2, atlasH / 2);
  }
  return canvas;
}

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

      // Wait for the page's web fonts so Geist Mono lands in the atlas
      // instead of the system monospace fallback. fonts.ready resolves
      // once all CSS-declared faces are loaded.
      if (document.fonts && document.fonts.ready) {
        try {
          await document.fonts.ready;
        } catch {
          // Non-fatal — fall through with whatever font is available.
        }
        if (disposed) return;
      }

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

      const atlasCanvas = buildDigitAtlas();
      const atlasTexture = new THREE.CanvasTexture(atlasCanvas);
      atlasTexture.minFilter = THREE.LinearFilter;
      atlasTexture.magFilter = THREE.LinearFilter;
      atlasTexture.wrapS = THREE.ClampToEdgeWrapping;
      atlasTexture.wrapT = THREE.ClampToEdgeWrapping;
      atlasTexture.needsUpdate = true;

      const uniforms = {
        uResolution: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(-1, -1) },
        uCellPx: { value: 52 },
        uDpr: { value: 1 },
        uInk: { value: 0.443 }, // #71717a (mist)
        uMotion: { value: reducedMotion ? 0 : 1 },
        uAtlas: { value: atlasTexture },
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
        atlasTexture.dispose();
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
