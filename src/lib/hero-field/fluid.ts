/**
 * The pointer trail's solver: velocity + dye, advected, with vorticity
 * confinement and no pressure projection.
 *
 * Ported from the configuration on aspensearch.com, read out of their bundle.
 * The numbers below are theirs and are not arbitrary — they are what makes the
 * plume read as smoke thrown by the cursor rather than as a circle following
 * it. Change one and re-look at the whole thing.
 *
 * What this deliberately omits is the pressure/divergence solve. A complete
 * incompressible solver spends 20-40 Jacobi iterations a frame enforcing
 * div(v) = 0; without it the field compresses slightly, which at this scale
 * and this dissipation is invisible. It is the single largest cost in a fluid
 * sim and the reference drops it too.
 *
 * The solver holds no timers and starts nothing. It advances only when
 * `step()` is called, so the "dead still at rest" guarantee lives entirely in
 * the caller's loop (see `hero-dither.tsx`) and nothing here can violate it.
 */

import type { GLContext, Target } from "./gl";
import {
  ADVECT_FRAGMENT,
  CURL_FRAGMENT,
  SPLAT_FRAGMENT,
  VORTICITY_FRAGMENT,
} from "./shaders";

const CONFIG = {
  /** Grid along the longer axis. The velocity field is low-frequency; 128 is
      plenty and keeps the four passes cheap. */
  simResolution: 128,
  /** The dye is what you actually see, so it gets three times the grid. */
  dyeResolution: 384,
  velocityDissipation: 1.8,
  /** Sets the trail's lifetime: visually gone by ~1.5s. */
  dyeDissipation: 3.2,
  /** Vorticity confinement. Below ~15 the plume spreads instead of curling. */
  curlStrength: 22,
  /** Cursor velocity is in uv units per event, so this is a large multiplier. */
  splatForce: 2200,
  splatDye: 0.35,
} as const;

/** Splat radius in aspect-corrected uv², from a radius of ~48 device pixels. */
const SPLAT_PIXEL_RADIUS = 48;

export type Fluid = {
  /** Inject dye and momentum. Position in uv, delta in uv per event. */
  splat: (x: number, y: number, dx: number, dy: number) => void;
  /** Advance the simulation by `dt` seconds. */
  step: (dt: number) => void;
  /** Zero every field — used to render a guaranteed-clean final frame. */
  clear: () => void;
  dyeTexture: () => WebGLTexture;
  dispose: () => void;
};

/** Fit `resolution` to the longer axis and derive the shorter one. */
function gridFor(resolution: number, aspect: number): { w: number; h: number } {
  return aspect >= 1
    ? { w: resolution, h: Math.max(1, Math.round(resolution / aspect)) }
    : { w: Math.max(1, Math.round(resolution * aspect)), h: resolution };
}

export function createFluid(
  context: GLContext,
  aspect: number,
  canvasHeight: number,
): Fluid | null {
  const { gl, program, uniform, pingPong, target, draw } = context;

  const splatProgram = program(SPLAT_FRAGMENT);
  const advectProgram = program(ADVECT_FRAGMENT);
  const curlProgram = program(CURL_FRAGMENT);
  const vorticityProgram = program(VORTICITY_FRAGMENT);
  if (!splatProgram || !advectProgram || !curlProgram || !vorticityProgram) return null;

  const sim = gridFor(CONFIG.simResolution, aspect);
  const dyeGrid = gridFor(CONFIG.dyeResolution, aspect);

  /* LINEAR on both: advection samples between texels every frame, and NEAREST
     here would stair-step the plume long before the dither does. Half-float
     textures are filterable in core WebGL2, so this needs no extension. */
  const velocity = pingPong(sim.w, sim.h, gl.LINEAR);
  const dye = pingPong(dyeGrid.w, dyeGrid.h, gl.LINEAR);
  /* The curl field is only ever read at exact texel centres. */
  const curl = target(sim.w, sim.h, gl.NEAREST);
  if (!velocity || !dye || !curl) return null;

  const splatRadius = (SPLAT_PIXEL_RADIUS / canvasHeight) ** 2;
  const pending: { x: number; y: number; dx: number; dy: number }[] = [];

  const bind = (p: WebGLProgram, name: string, texture: WebGLTexture, unit: number) => {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(uniform(p, name), unit);
  };

  const setResolution = (p: WebGLProgram, t: Target) => {
    gl.uniform2f(uniform(p, "uResolution"), t.width, t.height);
  };

  const applySplat = (x: number, y: number, dx: number, dy: number) => {
    gl.useProgram(splatProgram);
    gl.uniform2f(uniform(splatProgram, "uPoint"), x, y);
    gl.uniform1f(uniform(splatProgram, "uRadius"), splatRadius);
    gl.uniform1f(uniform(splatProgram, "uAspect"), aspect);

    // Momentum first: the cursor's own delta becomes the fluid's velocity,
    // which is what throws the plume in the direction of travel.
    setResolution(splatProgram, velocity.write);
    bind(splatProgram, "uTarget", velocity.read.texture, 0);
    gl.uniform3f(
      uniform(splatProgram, "uColor"),
      dx * CONFIG.splatForce,
      dy * CONFIG.splatForce,
      0,
    );
    draw(velocity.write);
    velocity.swap();

    // Then the dye, at a flat amount — the visible quantity.
    setResolution(splatProgram, dye.write);
    bind(splatProgram, "uTarget", dye.read.texture, 0);
    gl.uniform3f(uniform(splatProgram, "uColor"), CONFIG.splatDye, 0, 0);
    draw(dye.write);
    dye.swap();
  };

  const step = (dt: number) => {
    /* Clamped hard at both ends: a long frame (tab wake, GC pause) would
       otherwise advect the plume clean off the canvas in one step, and a zero
       would divide by nothing in the dissipation term. */
    const t = Math.min(Math.max(dt, 0.001), 0.0166);

    for (const p of pending) applySplat(p.x, p.y, p.dx, p.dy);
    pending.length = 0;

    gl.useProgram(curlProgram);
    setResolution(curlProgram, curl);
    gl.uniform2f(uniform(curlProgram, "uTexelSize"), velocity.texelX, velocity.texelY);
    bind(curlProgram, "uVelocity", velocity.read.texture, 0);
    draw(curl);

    gl.useProgram(vorticityProgram);
    setResolution(vorticityProgram, velocity.write);
    gl.uniform2f(uniform(vorticityProgram, "uTexelSize"), velocity.texelX, velocity.texelY);
    gl.uniform1f(uniform(vorticityProgram, "uCurlStrength"), CONFIG.curlStrength);
    gl.uniform1f(uniform(vorticityProgram, "uDt"), t);
    bind(vorticityProgram, "uVelocity", velocity.read.texture, 0);
    bind(vorticityProgram, "uCurl", curl.texture, 1);
    draw(velocity.write);
    velocity.swap();

    gl.useProgram(advectProgram);
    gl.uniform1f(uniform(advectProgram, "uDt"), t);

    // Velocity advects itself.
    setResolution(advectProgram, velocity.write);
    gl.uniform2f(uniform(advectProgram, "uTexelSize"), velocity.texelX, velocity.texelY);
    gl.uniform1f(uniform(advectProgram, "uDissipation"), CONFIG.velocityDissipation);
    bind(advectProgram, "uVelocity", velocity.read.texture, 0);
    bind(advectProgram, "uSource", velocity.read.texture, 1);
    draw(velocity.write);
    velocity.swap();

    // Then the dye rides it. Its own texel size, because its grid is finer.
    setResolution(advectProgram, dye.write);
    gl.uniform2f(uniform(advectProgram, "uTexelSize"), dye.texelX, dye.texelY);
    gl.uniform1f(uniform(advectProgram, "uDissipation"), CONFIG.dyeDissipation);
    bind(advectProgram, "uVelocity", velocity.read.texture, 0);
    bind(advectProgram, "uSource", dye.read.texture, 1);
    draw(dye.write);
    dye.swap();
  };

  const clear = () => {
    pending.length = 0;
    gl.clearColor(0, 0, 0, 1);
    for (const t of [velocity.read, velocity.write, dye.read, dye.write, curl]) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo);
      gl.viewport(0, 0, t.width, t.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  };

  return {
    splat: (x, y, dx, dy) => pending.push({ x, y, dx, dy }),
    step,
    clear,
    dyeTexture: () => dye.read.texture,
    /* The targets and programs belong to the GLContext, which frees them all
       in its own dispose. Nothing here owns GL state independently. */
    dispose: () => pending.splice(0),
  };
}
