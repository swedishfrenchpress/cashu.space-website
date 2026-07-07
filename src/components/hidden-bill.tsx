"use client";

import { useEffect, useRef } from "react";

/**
 * HiddenBill — Three.js shader figure for the hero's reserved
 * `.hero-spec__art` slot. A single dithered banknote occupies the
 * right column; almost all of its surface is continuously redacted
 * by a halftone dot field. A narrow vertical reveal slot drifts
 * left → right exposing fragments at a time — CASHU wordmark,
 * denomination, serial, mint signature, corner sigils. You never see
 * the whole bill at once. Privacy is the steady state; revelation
 * is the rare event. The bill's outer frame is always faintly
 * visible so visitors can always tell a bill is there, even when
 * its contents are fully redacted. Cursor proximity opens a soft
 * circular reveal, additive with the slot.
 *
 * Three.js, the bill texture, and the shader load via dynamic
 * import inside the effect, so the page bundle stays small and SSR
 * never touches the WebGL APIs.
 */

const BILL_TEX_W = 1800;
const BILL_TEX_H = 750;
const BILL_ASPECT = BILL_TEX_W / BILL_TEX_H; // 2.4

// Read a CSS custom property from the root element with a fallback.
// Next.js's font modules write their generated family name to these
// vars (--font-gt, --font-mono, --font-pixel); we use them to address
// the actual loaded font in canvas text rendering.
function readFontFamily(varName: string, fallback: string): string {
  const root = getComputedStyle(document.documentElement);
  const value = root.getPropertyValue(varName).trim();
  return value ? `${value}, ${fallback}` : fallback;
}

// Tracked text via Canvas2D's letterSpacing property. Modern browsers
// (Chrome 99+, Firefox 112+, Safari 16.4+) support this directly; on
// older engines text falls back to default tracking, which is fine.
function drawTracked(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  tracking: number,
) {
  const prev = ctx.letterSpacing;
  ctx.letterSpacing = `${tracking}px`;
  ctx.fillText(text, x, y);
  ctx.letterSpacing = prev;
}

// A small "C in box" sigil — Cashu's letter held in an engineered
// frame. Echoes the corner ornament convention on physical banknotes
// without copying any specific currency's iconography.
function drawCornerSigil(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  gt: string,
  ink: string,
) {
  const size = 36;
  ctx.save();
  ctx.strokeStyle = ink;
  ctx.lineWidth = 1.6;
  ctx.strokeRect(cx - size / 2, cy - size / 2, size, size);
  ctx.fillStyle = ink;
  ctx.font = `700 24px ${gt}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("C", cx, cy + 2);
  ctx.restore();
}

// Hand-drawn-feeling signature scrawl built from a compound sine.
// The envelope keeps amplitude near zero at the endpoints so the
// line reads as "starts and ends naturally."
function drawSignatureScrawl(
  ctx: CanvasRenderingContext2D,
  x1: number,
  x2: number,
  yMid: number,
  ink: string,
) {
  ctx.save();
  ctx.strokeStyle = ink;
  ctx.lineWidth = 2.4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  const steps = 96;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = x1 + t * (x2 - x1);
    const wave =
      Math.sin(t * 18.0 + 0.6) * 14 +
      Math.sin(t * 6.3 + 1.1) * 7 +
      Math.sin(t * 31.0 + 2.7) * 3;
    const envelope = Math.sin(t * Math.PI);
    const y = yMid + wave * envelope * 0.85 - 4;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  // Underline rule beneath the scrawl
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo(x1 - 8, yMid + 22);
  ctx.lineTo(x2 + 8, yMid + 22);
  ctx.stroke();
  ctx.restore();
}

function buildBillTexture(): HTMLCanvasElement {
  const W = BILL_TEX_W;
  const H = BILL_TEX_H;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, W, H);

  const gt = readFontFamily(
    "--font-gt",
    'ui-sans-serif, system-ui, sans-serif',
  );
  const mono = readFontFamily(
    "--font-mono",
    'ui-monospace, "SF Mono", Menlo, monospace',
  );
  const pixel = readFontFamily(
    "--font-pixel",
    `${mono}`,
  );

  // Ink is rendered in pure black; the shader recolors via `vec3(uInk)`
  // and uses the texture's alpha channel as the ink mask. Semi-opaque
  // fills (rgba black at 0.6) print as faded ink — used for secondary
  // text that should feel like "fine print."
  const ink = "rgba(0,0,0,1)";
  const inkSoft = "rgba(0,0,0,0.55)";

  // -- Header row ------------------------------------------------------
  // CASHU wordmark top-left; ELECTRONIC CASH eyebrow top-right.
  ctx.fillStyle = ink;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
  ctx.font = `700 104px ${gt}`;
  ctx.fillText("CASHU", 82, 138);

  ctx.fillStyle = inkSoft;
  ctx.font = `500 20px ${mono}`;
  drawTracked(ctx, "BEARER CASH SPECIMEN", 84, 174, 3);

  ctx.fillStyle = ink;
  ctx.textAlign = "right";
  ctx.font = `500 32px ${mono}`;
  drawTracked(ctx, "ELECTRONIC CASH", W - 82, 132, 4);

  ctx.fillStyle = inkSoft;
  ctx.font = `500 20px ${mono}`;
  drawTracked(ctx, "SERIES MMXXVI", W - 82, 174, 3);

  // -- Center denomination --------------------------------------------
  // Pixel-square typeface for the value — the only place protocol
  // notation gets used per DESIGN.md, and here it carries the "this
  // is a protocol amount" reading directly.
  ctx.fillStyle = ink;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.font = `400 252px ${pixel}`;
  ctx.fillText("0100", W / 2, H / 2 + 50);

  ctx.fillStyle = inkSoft;
  ctx.font = `500 24px ${mono}`;
  drawTracked(ctx, "ONE HUNDRED SATOSHI", W / 2, H / 2 + 110, 4);

  // -- Footer row -----------------------------------------------------
  // Serial bottom-left; mint signature bottom-right.
  ctx.fillStyle = ink;
  ctx.textAlign = "left";
  ctx.font = `500 22px ${mono}`;
  drawTracked(ctx, "SN  AC83 · 21F9 · 4E27 · D6B1", 84, H - 92, 1);

  drawSignatureScrawl(ctx, W - 360, W - 110, H - 140, ink);
  ctx.fillStyle = inkSoft;
  ctx.textAlign = "right";
  ctx.font = `500 18px ${mono}`;
  drawTracked(ctx, "MINT SIGNATURE", W - 110, H - 92, 3);

  // -- Corner sigils --------------------------------------------------
  // Inset enough to sit just inside the inner ornamental ruler that
  // the shader draws over the bill rect edge.
  const inset = 60;
  drawCornerSigil(ctx, inset, inset, gt, ink);
  drawCornerSigil(ctx, W - inset, inset, gt, ink);
  drawCornerSigil(ctx, inset, H - inset, gt, ink);
  drawCornerSigil(ctx, W - inset, H - inset, gt, ink);

  return canvas;
}

// Size the bill to fill the container vertically at its native 2.4:1
// aspect, then center horizontally. When the resulting bill is wider
// than the container (the common case for this layout), it bleeds
// past both horizontal edges — the shader's soft alpha falloff feathers
// the bled portion so clipped content fades cleanly off the page.
// Returns origin + size in device pixels, GL coords (y=0 at bottom).
function computeBillRect(
  canvasWdev: number,
  canvasHdev: number,
): { x: number; y: number; w: number; h: number } {
  const h = canvasHdev * 0.96;
  const w = h * BILL_ASPECT;
  const x = (canvasWdev - w) / 2;
  const yTop = (canvasHdev - h) / 2;
  const y = canvasHdev - yTop - h;
  return { x, y, w, h };
}

export default function HiddenBill() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const [THREE, shaders] = await Promise.all([
        import("three"),
        import("./hidden-bill.glsl"),
      ]);
      if (disposed) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Wait for the page's web fonts so the bill text uses GT-Standard,
      // Geist Mono, and Geist Pixel Square instead of system fallbacks.
      if (document.fonts && document.fonts.ready) {
        try {
          await document.fonts.ready;
        } catch {
          // Non-fatal — fall through with whatever fonts are available.
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

      const billCanvas = buildBillTexture();
      const billTexture = new THREE.CanvasTexture(billCanvas);
      billTexture.minFilter = THREE.LinearFilter;
      billTexture.magFilter = THREE.LinearFilter;
      billTexture.wrapS = THREE.ClampToEdgeWrapping;
      billTexture.wrapT = THREE.ClampToEdgeWrapping;
      billTexture.needsUpdate = true;

      const uniforms = {
        uResolution: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(-1, -1) },
        uDpr: { value: 1 },
        uInk: { value: 0.443 }, // #71717a (mist)
        uMotion: { value: reducedMotion ? 0 : 1 },
        uBill: { value: billTexture },
        uBillRect: { value: new THREE.Vector4(0, 0, 1, 1) },
        uSlotPx: { value: 1 },
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

        const canvasWdev = width * dpr;
        const canvasHdev = height * dpr;
        uniforms.uResolution.value.set(canvasWdev, canvasHdev);
        uniforms.uDpr.value = dpr;

        const bill = computeBillRect(canvasWdev, canvasHdev);
        uniforms.uBillRect.value.set(bill.x, bill.y, bill.w, bill.h);
        // Reveal slot ≈ 18% of bill width — narrow enough to feel like
        // a scanner beam rather than a curtain.
        uniforms.uSlotPx.value = bill.w * 0.18;

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
        billTexture.dispose();
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
