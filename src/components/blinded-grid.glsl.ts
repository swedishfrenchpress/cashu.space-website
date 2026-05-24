// Shader pair for the hero's blinded-denomination grid. The figure
// diagrams Cashu's blind-signature mechanism: each cell holds a
// power-of-2 denomination (1, 2, 4, …, 1024) — the actual Cashu
// denomination set. A slow horizontal sweep crosses the grid; cells
// behind the sweep become halftone-occluded (the "signing" pass that
// blinds the tokens). Cursor proximity briefly unblinds nearby cells.
// Numbers carry the "money" reading; sweep + occlusion carry the
// "blind signature" reading.

export const vertexShader = /* glsl */ `
attribute vec3 position;
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
precision mediump float;

uniform vec2      uResolution;
uniform float     uTime;
uniform vec2      uMouse;     // device pixels, GL coords (origin bottom-left); (-1,-1) when outside
uniform float     uCellPx;    // cell size in CSS pixels
uniform float     uDpr;
uniform float     uInk;       // greyscale value for ink (mist #71717a ≈ 0.443)
uniform float     uMotion;    // 0.0 = static (prefers-reduced-motion), 1.0 = live
uniform sampler2D uAtlas;     // 10 digits "0123456789" laid out left-to-right

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// Halftone dot field for the blinded state. Fills the cell with a
// regular grid of small dots — reads as "data redacted to an opaque
// privacy field."
float halftone(vec2 cellUv, float cellSizeDev) {
  float n = 4.0;
  vec2 sub = fract(cellUv * n);
  float d = length(sub - 0.5) * (cellSizeDev / n);
  float r = (cellSizeDev / n) * 0.18;
  return 1.0 - smoothstep(r - 0.7, r + 0.7, d);
}

// Sample a single digit from the atlas. \`digit\` is in [0..9]; uv is
// the local coord within that digit's quad. Returns alpha.
float sampleDigit(float digit, vec2 uv) {
  // Pad each digit slot inward so neighbouring glyphs never bleed in.
  float pad = 0.04;
  vec2 padded = vec2(pad + uv.x * (1.0 - 2.0 * pad), uv.y);
  vec2 atlasUv = vec2((digit + padded.x) / 10.0, padded.y);
  // Atlas is rendered with the glyphs in black; alpha carries the
  // shape. We use red channel because the canvas-texture is RGBA
  // with ink in all channels — same value.
  return texture2D(uAtlas, atlasUv).a;
}

// Number of decimal digits in \`n\` for n ∈ {1, 2, 4, …, 1024}.
float digitCount(float n) {
  return 1.0 + step(10.0, n) + step(100.0, n) + step(1000.0, n);
}

void main() {
  vec2  fragPx   = gl_FragCoord.xy;
  float cellSize = uCellPx * uDpr;

  vec2 cellId  = floor(fragPx / cellSize);
  vec2 cellPos = mod(fragPx, cellSize);
  vec2 cellUv  = cellPos / cellSize;

  // Per-cell hashes.
  float seed       = hash21(cellId);
  float seedJitter = hash21(cellId + 53.17);

  // Pick a denomination from the Cashu power-of-2 set: 1, 2, 4, …, 512.
  // Ten values (exponents 0..9), uniform distribution. Capped at 512
  // so denominations stay at most 3 digits — fits the cell legibly.
  float denomIdx = floor(seed * 10.0);
  float denom    = pow(2.0, denomIdx);
  float nDigits  = digitCount(denom);

  // -- Signing sweep ----------------------------------------------------
  //
  // Cycle:
  //   phase 0.00–0.65: sweep band crosses L→R, leaving blinded cells
  //                    behind it (the mint signing each token in turn)
  //   phase 0.65–0.85: all cells fully blinded — the steady "private"
  //                    state where the mint can't link values to spender
  //   phase 0.85–1.00: cells fade back to unblinded (next mint round
  //                    issues a fresh batch of unblinded tokens)
  float cyclePeriod = 10.0;
  float phase       = fract(uTime / cyclePeriod);
  float sweepPos    = min(phase / 0.65, 1.0);
  float bandWidth   = 0.03;
  float pixelX      = fragPx.x / uResolution.x;
  float jitter      = (seedJitter - 0.5) * 0.025;
  // Pixels left of the sweep are blinded; right of it, unblinded.
  // smoothstep softens the band edge so the sweep front reads as a
  // wash, not a hard line.
  float baseBlind = 1.0 - smoothstep(
    sweepPos - bandWidth,
    sweepPos + bandWidth,
    pixelX + jitter
  );
  float resetMix = smoothstep(0.85, 1.0, phase);
  float blind    = baseBlind * (1.0 - resetMix);
  // Reduced-motion: freeze at a stable per-cell state.
  blind = mix(seed, blind, uMotion);

  // -- Cursor unblind ---------------------------------------------------
  vec2  mouseCell   = uMouse / cellSize;
  float cellDist    = length(cellId + 0.5 - mouseCell);
  float mouseActive = step(0.0, uMouse.x) * step(0.0, uMouse.y);
  float unblind     = mouseActive * (1.0 - smoothstep(0.7, 3.5, cellDist));
  blind            *= (1.0 - unblind);

  // -- Digit rendering --------------------------------------------------
  //
  // Centred content box wide enough for up to 3 digits. Each digit
  // slot is the same width; shorter numbers leave leading slots blank.
  // Slot aspect (digitW : digitH) ≈ 0.48 matches the atlas slot
  // aspect (32 : 64 = 0.5) so glyphs render without horizontal squash.
  float digitW = cellSize * 0.24;
  float digitH = cellSize * 0.50;
  vec2  box    = vec2(digitW * 3.0, digitH);
  vec2  origin = (vec2(cellSize) - box) * 0.5;
  vec2  bp     = cellPos - origin;
  vec2  buv    = bp / box;
  float inside =
    step(0.0, buv.x) * step(buv.x, 1.0) *
    step(0.0, buv.y) * step(buv.y, 1.0);

  // Which slot (0=leftmost, 2=rightmost) and local UV inside that slot.
  float slot   = floor(buv.x * 3.0);
  float slotX  = fract(buv.x * 3.0);
  // Is this slot populated for an \`nDigits\`-digit number? Right-aligned.
  float slotOn = step(3.0 - nDigits, slot);
  // Which decimal place this slot represents (0=ones, 1=tens, 2=hundreds).
  float place  = 2.0 - slot;
  float divisor = pow(10.0, place);
  float digit  = floor(mod(denom / divisor, 10.0));

  float digitAlpha = sampleDigit(digit, vec2(slotX, buv.y)) * inside * slotOn;

  // -- Composite --------------------------------------------------------
  //
  // Crossfade between the crisp digit (unblinded) and the halftone
  // fill (blinded). The halftone is the "you can't read this" state.
  float halftoneAlpha = halftone(cellUv, cellSize);
  float contentAlpha  = mix(digitAlpha, halftoneAlpha, blind);

  // Hairline cell border (1 device px) makes the "boxes" read.
  float bx = step(cellPos.x, uDpr) + step(cellSize - uDpr, cellPos.x);
  float by = step(cellPos.y, uDpr) + step(cellSize - uDpr, cellPos.y);
  float borderAlpha = clamp(bx + by, 0.0, 1.0) * 0.14;

  float alpha = 1.0 - (1.0 - contentAlpha) * (1.0 - borderAlpha);

  // Soft edge mask so the figure doesn't slam into its container.
  vec2  ndc  = fragPx / uResolution;
  float edge = min(min(ndc.x, ndc.y), min(1.0 - ndc.x, 1.0 - ndc.y));
  alpha *= smoothstep(0.0, 0.07, edge);

  gl_FragColor = vec4(vec3(uInk), alpha * 0.85);
}
`;
