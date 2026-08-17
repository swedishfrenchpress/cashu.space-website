/**
 * Wires the baked density field, the glyph atlas, the fluid solver and the
 * composite into one object with five verbs: resize, splat, step, render,
 * clearTrail.
 *
 * The split from `hero-field.tsx` is deliberate — everything that touches GL
 * lives here, everything that touches React and the DOM lives there. In
 * particular this file owns no timer and no rAF: `step()` and `render()` do
 * exactly as much work as they are asked to and then stop. The hero's
 * "nothing moves at rest" guarantee is enforceable because nothing in this
 * file can schedule itself.
 */

import { createFluid, type Fluid } from "./fluid";
import { createGlyphAtlas, REST_COUNT, WAKE_COUNT, type GlyphAtlas } from "./glyphs";
import { createGLContext, type GLContext, type Target } from "./gl";
import { COMPOSITE_FRAGMENT, FIELD_FRAGMENT } from "./shaders";

/**
 * Cell size in CSS pixels — one hex character per cell. 14 sets the glyphs at
 * roughly 10px, which is the size the site already uses for its smallest
 * technical notation. Smaller and the characters stop being readable as
 * characters and the field is just noise again; larger and they start
 * competing with the deck.
 */
const CELL = 14;

/**
 * Fraction of the noise a cell must clear to carry a glyph. Higher is
 * sparser. Calibrated so the resting field reads as scattered notation rather
 * than a wall of code — the Matrix reading is the failure mode here, and
 * density is what separates the two (that, and the fact that this field is
 * monochrome, static, and does not fall).
 *
 * MEASURE AT MORE THAN ONE VIEWPORT when changing this. The cleared zone
 * tracks the width-capped type, so a bigger window adds field rather than
 * clearing more of it; before the proportional floors below, the same build
 * ran 10.4% of cells occupied at 1440x900 and 35.4% at 1920x1200. Shipped
 * values measure 8.4% and 11.3%.
 *
 * It used to carry a companion per-scheme gain, because `--ghost` did not hold
 * its contrast step across light and dark. Dark mode was removed 2026-08-17,
 * so there is one ground, one step, and one number.
 */
const OCCUPANCY = 0.40;

/**
 * How much the wake raises a cell's density. **Must stay below OCCUPANCY** —
 * at or above it, every cell the wake touches clears the threshold and the
 * disturbance renders as a solid rectangle of characters rather than as the
 * field thickening. It shipped at 0.55 against a 0.10 threshold and did
 * exactly that; the user's word for the result was "too many characters".
 *
 * At 0.10 against 0.20 the wake roughly doubles local density and leaves the
 * field's own clustering visible through it, which is what makes it read as
 * something happening *to* the ground rather than on top of it.
 */
const WAKE_OCCUPANCY_GAIN = 0.1;

/**
 * How far the field takes to die into the section's top and bottom edges, in
 * CSS pixels — see the note in COMPOSITE_FRAGMENT. The top value is larger
 * because the masthead is a hard ink edge and any texture against it reads as
 * fringing; the bottom only has to keep the closing hairline a line.
 */
const EDGE_FADE_TOP = 150;
const EDGE_FADE_BOTTOM = 96;

/**
 * Clearance around the title block, in CSS pixels: how far past the type's own
 * box the field starts coming back (`PADDING`), how long the ground takes to
 * return (`FEATHER`), and how tightly the wake hugs the letters (`TRAIL_INSET`
 * — half its width inside the box, half outside).
 */
const SAFE_PADDING_X = 56;
const SAFE_PADDING_Y = 28;
const TRAIL_INSET = 26;

/**
 * The ground's falloff, as a FRACTION of the gap between the safe box's edge
 * and the canvas edge — not a pixel distance. See the note in
 * COMPOSITE_FRAGMENT: the safe box tracks the type, the type is width-capped,
 * so an absolute feather makes the field three and a half times denser on a
 * 1920x1200 display than on a 1440x900 one. This is what keeps it looking the
 * same on every screen.
 */
const SAFE_FEATHER = 0.62;

/**
 * Floor on the cleared zone, as a fraction of the canvas half-extent.
 *
 * The safe box tracks the type, and the type is width-capped and fixed in
 * height — so on a large display it covers a much smaller *fraction* of the
 * hero and the field gets proportionally more room. Measured: the cleared zone
 * was 52% of the hero at 1440x900 and 33% at 1920x1200, which no amount of
 * threshold tuning equalises because it is an area problem, not a density one.
 *
 * These floors hold the cleared zone near 58% on both. They also happen to be
 * the right composition: a big screen should give the title block more air, not
 * the same air with more field around it.
 */
const MIN_SAFE_FRAC_X = 0.42;
const MIN_SAFE_FRAC_Y = 0.34;

/** Hard ceiling on backing-store pixels, and on device pixel ratio. The type
    wants a real dpr — unlike the dot lattice this replaced, which was pinned
    to 1 — but 3x on a 6K display is fill rate nobody can see. */
const MAX_PIXELS = 5_000_000;
const MAX_DPR = 2;

export type SceneColors = {
  /** The resting field: `--ghost`. */
  rest: [number, number, number];
  /** A disturbed cell: `--body`. Monochrome — see the composite's note. */
  wake: [number, number, number];
};

export type DitherScene = {
  /** Re-measure, re-allocate and re-bake. Safe to call on every resize. */
  resize: () => boolean;
  setColors: (colors: SceneColors) => void;
  /** Rasterise the alphabet. Call once the real face has loaded. */
  loadGlyphs: (fontFamily: string) => boolean;
  /** Inject at uv (origin bottom-left, matching gl_FragCoord). */
  splat: (x: number, y: number, dx: number, dy: number) => void;
  step: (dt: number) => void;
  render: () => void;
  /** Zero the wake so the next render is exactly the rest frame. */
  clearTrail: () => void;
  dispose: () => void;
};

/**
 * `interactive: false` builds the ground and nothing else — no solver, no dye
 * targets, no wake. That is the mode reduced-motion visitors and every phone
 * get, and it exists because the field genuinely does not move: withholding a
 * static texture from someone who asked for less motion would be withholding
 * it for no reason, and it would hand most of this site's traffic (a link
 * shared to a phone) a different hero from everyone else's.
 */
export function createDitherScene(
  canvas: HTMLCanvasElement,
  safeBoxElement: () => Element | null,
  initialColors: SceneColors,
  interactive: boolean,
): DitherScene | null {
  const context: GLContext | null = createGLContext(canvas);
  if (!context) return null;

  const { gl, program, uniform, target, draw } = context;
  const fieldProgram = program(FIELD_FRAGMENT);
  const compositeProgram = program(COMPOSITE_FRAGMENT);
  if (!fieldProgram || !compositeProgram) {
    context.dispose();
    return null;
  }

  let field: Target | null = null;
  let fluid: Fluid | null = null;
  let glyphs: GlyphAtlas | null = null;
  let glyphFamily = "monospace";
  /** Stand-in bound to uDye when there is no solver; uTrailStrength is 0 then,
      so its contents are never read — a sampler just has to point somewhere. */
  let blankDye: Target | null = null;
  let colors = initialColors;
  let width = 0;
  let height = 0;
  let dpr = 1;
  /** Centre and half-extents of the title block, in device pixels, y-up. */
  let safeBox: [number, number, number, number] = [0, 0, 0, 0];
  /** Falloff distances in device pixels. Derived on resize, never in the draw
      loop — every value the composite needs is resolved before a frame starts. */
  let trailInset = TRAIL_INSET;
  let edgeFade: [number, number] = [EDGE_FADE_TOP, EDGE_FADE_BOTTOM];

  const measureSafeBox = () => {
    const element = safeBoxElement();
    const canvasRect = canvas.getBoundingClientRect();
    if (canvasRect.height === 0) return;
    const scale = height / canvasRect.height;
    trailInset = TRAIL_INSET * scale;
    edgeFade = [EDGE_FADE_TOP * scale, EDGE_FADE_BOTTOM * scale];

    /*
     * The union of the block's CHILDREN, not the block itself. `.hero-spec__
     * content` is a block-level flex column, so it is as wide as the page
     * shell no matter how narrow the type inside it is — fitting the mask to
     * it cleared almost the entire hero and left the field as two slivers in
     * the margins. Its children are centred flex items and shrink to their
     * own content, so their union is the ink's real extent.
     */
    const parts = element ? [...element.children] : [];
    if (parts.length === 0) {
      // No title block found: clear the whole canvas rather than risk laying
      // characters across type we failed to locate.
      safeBox = [width / 2, height / 2, width, height];
      return;
    }
    let left = Infinity;
    let right = -Infinity;
    let top = Infinity;
    let bottom = -Infinity;
    for (const part of parts) {
      const r = part.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      left = Math.min(left, r.left);
      right = Math.max(right, r.right);
      top = Math.min(top, r.top);
      bottom = Math.max(bottom, r.bottom);
    }
    if (!Number.isFinite(left)) return;

    const centreX = (left + right) / 2 - canvasRect.left;
    // gl_FragCoord.y counts up from the bottom; DOM rects count down from the
    // top. Measured against the canvas's own bottom edge, not the viewport's.
    const centreY = canvasRect.bottom - (top + bottom) / 2;

    safeBox = [
      centreX * scale,
      centreY * scale,
      Math.max(((right - left) / 2 + SAFE_PADDING_X) * scale, width * MIN_SAFE_FRAC_X),
      Math.max(((bottom - top) / 2 + SAFE_PADDING_Y) * scale, height * MIN_SAFE_FRAC_Y),
    ];
  };

  const loadGlyphs = (fontFamily: string): boolean => {
    glyphFamily = fontFamily;
    glyphs?.dispose();
    glyphs = createGlyphAtlas(gl, Math.round(CELL * dpr), fontFamily);
    return glyphs !== null;
  };

  const resize = (): boolean => {
    const rect = canvas.getBoundingClientRect();
    /*
     * Unlike the dot lattice this replaced, the field is now set in a real
     * typeface, so it takes the device's own pixel ratio: letterforms drawn at
     * 1x and upscaled by the compositor are the one thing here that genuinely
     * looks broken on a retina screen. Capped at 2 — past that it is fill rate
     * spent below the threshold of sight.
     */
    dpr = Math.min(MAX_DPR, Math.max(1, window.devicePixelRatio || 1));
    let nextWidth = Math.max(1, Math.floor(rect.width * dpr));
    let nextHeight = Math.max(1, Math.floor(rect.height * dpr));
    const pixels = nextWidth * nextHeight;
    if (pixels > MAX_PIXELS) {
      const factor = Math.sqrt(MAX_PIXELS / pixels);
      nextWidth = Math.max(1, Math.floor(nextWidth * factor));
      nextHeight = Math.max(1, Math.floor(nextHeight * factor));
    }
    if (nextWidth === width && nextHeight === height && field && glyphs) {
      // Same box, but the title block may have re-wrapped inside it.
      measureSafeBox();
      return true;
    }

    const hadGlyphs = glyphs !== null;
    width = nextWidth;
    height = nextHeight;
    canvas.width = width;
    canvas.height = height;
    const aspect = width / height;

    /*
     * The noise is baked at exactly one texel per cell. The composite only
     * ever samples it at cell centres, so anything finer is memory the effect
     * cannot use.
     */
    const cellPx = CELL * dpr;
    const fieldWidth = Math.max(1, Math.ceil(width / cellPx));
    const fieldHeight = Math.max(1, Math.ceil(height / cellPx));
    /* Every target belongs to the previous size and none of them can be
       reused. Free them here rather than at dispose, or a window drag leaks a
       full set of half-float textures per intermediate width. */
    fluid?.dispose();
    context.freeTargets();
    field = target(fieldWidth, fieldHeight, gl.NEAREST);
    if (!field) return false;
    if (interactive) {
      fluid = createFluid(context, aspect, height);
      blankDye = null;
      if (!fluid) return false;
    } else {
      // Ground only. One texel is enough to satisfy the sampler.
      fluid = null;
      blankDye = target(1, 1, gl.NEAREST);
      if (!blankDye) return false;
    }

    // Bake. Three fbm evaluations a cell, once, and then never again until
    // the viewport changes — this is the whole of the "no drift" decision.
    gl.useProgram(fieldProgram);
    gl.uniform2f(uniform(fieldProgram, "uResolution"), fieldWidth, fieldHeight);
    gl.uniform1f(uniform(fieldProgram, "uAspect"), aspect);
    draw(field);

    measureSafeBox();
    // The atlas is rasterised at the cell's device size, so a dpr change has
    // to re-cut it. Only once the real face is already in hand — before that
    // the component has not called loadGlyphs yet and render() bails anyway.
    return hadGlyphs ? loadGlyphs(glyphFamily) : true;
  };

  const render = () => {
    const dyeTexture = fluid?.dyeTexture() ?? blankDye?.texture;
    if (!field || !dyeTexture || !glyphs) return;
    gl.useProgram(compositeProgram);
    gl.uniform2f(uniform(compositeProgram, "uResolution"), width, height);
    gl.uniform1f(uniform(compositeProgram, "uCell"), CELL * dpr);
    gl.uniform1f(uniform(compositeProgram, "uRestCount"), REST_COUNT);
    gl.uniform1f(uniform(compositeProgram, "uWakeCount"), WAKE_COUNT);
    gl.uniform1f(uniform(compositeProgram, "uOccupancy"), OCCUPANCY);
    gl.uniform1f(uniform(compositeProgram, "uWakeGain"), WAKE_OCCUPANCY_GAIN);
    gl.uniform1f(uniform(compositeProgram, "uTrailStrength"), fluid ? 1 : 0);
    gl.uniform3f(uniform(compositeProgram, "uRest"), ...colors.rest);
    gl.uniform3f(uniform(compositeProgram, "uWake"), ...colors.wake);
    gl.uniform4f(uniform(compositeProgram, "uSafeBox"), ...safeBox);
    gl.uniform1f(uniform(compositeProgram, "uSafeFeather"), SAFE_FEATHER);
    gl.uniform1f(uniform(compositeProgram, "uTrailInset"), trailInset);
    gl.uniform2f(uniform(compositeProgram, "uEdgeFade"), ...edgeFade);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, field.texture);
    gl.uniform1i(uniform(compositeProgram, "uField"), 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, dyeTexture);
    gl.uniform1i(uniform(compositeProgram, "uDye"), 1);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, glyphs.texture);
    gl.uniform1i(uniform(compositeProgram, "uGlyphs"), 2);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    draw(null);
  };

  if (!resize()) {
    context.dispose();
    return null;
  }

  return {
    resize,
    loadGlyphs,
    setColors: (next) => {
      colors = next;
    },
    splat: (x, y, dx, dy) => fluid?.splat(x, y, dx, dy),
    step: (dt) => fluid?.step(dt),
    render,
    clearTrail: () => fluid?.clear(),
    dispose: () => {
      fluid?.dispose();
      glyphs?.dispose();
      context.dispose();
    },
  };
}
