// Shader pair for the hero's blinded-denomination grid. The figure
// diagrams Cashu's blind-signature mechanism: cells of structured bit
// data (token denominations) are cryptographically blinded so the
// issuing mint cannot link them back to the spender. The dither layer
// IS the blinding — the motion budget is earned by depicting a real
// protocol property, per DESIGN.md's Honest-Network Rule.

export const vertexShader = /* glsl */ `
attribute vec3 position;
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
precision mediump float;

uniform vec2  uResolution;
uniform float uTime;
uniform vec2  uMouse;     // device pixels, GL coords (origin bottom-left); (-1,-1) when outside
uniform float uCellPx;    // cell size in CSS pixels
uniform float uDpr;       // device pixel ratio (capped at 2 by the host)
uniform float uInk;       // greyscale value for ink (mist #71717a ≈ 0.443)
uniform float uMotion;    // 0.0 freezes the time loop (prefers-reduced-motion), 1.0 = live

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float hash31(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}

void main() {
  vec2  fragPx   = gl_FragCoord.xy;
  float cellSize = uCellPx * uDpr;

  vec2 cellId  = floor(fragPx / cellSize);
  vec2 cellPos = mod(fragPx, cellSize);
  vec2 cellUv  = cellPos / cellSize;

  // 4×4 sub-grid of dot slots inside each cell — the cell's "data."
  float subN   = 4.0;
  vec2  subId  = floor(cellUv * subN);
  vec2  subUv  = fract(cellUv * subN);
  float subPx  = length(subUv - 0.5) * (cellSize / subN);

  // Stable per-cell seeds. cellSeed drives the cell's blind phase;
  // (cellId, subId) hash drives the bit pattern that reads as "data."
  float cellSeed  = hash21(cellId);
  float cellPhase = hash21(cellId + 17.13) * 6.2831;
  float bit       = step(0.48, hash31(vec3(cellId, hash21(subId * 13.0 + cellId * 0.31))));

  // Slow blind oscillation per cell. Jittered threshold so cells
  // transition at staggered moments — visually ~1 flip per second
  // across a typical grid, never synchronised.
  float wave       = 0.5 + 0.5 * sin(uTime * 0.55 + cellPhase);
  float threshold  = 0.42 + cellSeed * 0.18;
  float blind      = smoothstep(threshold - 0.06, threshold + 0.06, wave);
  // When motion is off, freeze each cell at a stable per-cell state
  // (cellSeed) rather than 0 — gives a static dither figure.
  blind = mix(cellSeed, blind, uMotion);

  // Cursor unblind — cells within ~3 cells of the cursor become
  // "yours to see." Off-canvas mouse (set to -1,-1) is gated out.
  vec2  mouseCell   = uMouse / cellSize;
  float cellDist    = length(cellId + 0.5 - mouseCell);
  float mouseActive = step(0.0, uMouse.x) * step(0.0, uMouse.y);
  float unblind     = mouseActive * (1.0 - smoothstep(0.7, 3.5, cellDist));
  blind *= (1.0 - unblind);

  // Dot rendering: sparse bit-pattern dots when unblinded,
  // denser-but-smaller halftone fill when blinded.
  float sparseR = (cellSize / subN) * 0.28;
  float denseR  = (cellSize / subN) * 0.16;
  float sparseA = bit * (1.0 - smoothstep(sparseR - 0.7, sparseR + 0.7, subPx));
  float denseA  =       (1.0 - smoothstep(denseR  - 0.7, denseR  + 0.7, subPx));
  float dotA    = mix(sparseA, denseA, blind);

  // Hairline cell border (1 device px) to make the "boxes" read.
  float bx = step(cellPos.x, uDpr) + step(cellSize - uDpr, cellPos.x);
  float by = step(cellPos.y, uDpr) + step(cellSize - uDpr, cellPos.y);
  float borderA = clamp(bx + by, 0.0, 1.0) * 0.14;

  // Alpha-composite dots over borders.
  float alpha = 1.0 - (1.0 - dotA) * (1.0 - borderA);

  // Soft edge mask — fades the outer ~7% so the figure doesn't slam
  // into its container edges (same trick the deleted shader used).
  vec2  ndc  = fragPx / uResolution;
  float edge = min(min(ndc.x, ndc.y), min(1.0 - ndc.x, 1.0 - ndc.y));
  alpha *= smoothstep(0.0, 0.07, edge);

  gl_FragColor = vec4(vec3(uInk), alpha * 0.7);
}
`;
