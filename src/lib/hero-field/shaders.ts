/**
 * Every fragment shader the hero field needs, in draw order:
 *
 *   FIELD     baked once  — 4-octave Perlin fbm, domain-warped, → a density map
 *   SPLAT     per input   — inject dye and momentum at the cursor
 *   CURL      per frame   — vorticity of the velocity field
 *   VORTICITY per frame   — feed that vorticity back as a force (the curl)
 *   ADVECT    per frame   — carry velocity, then dye, along the velocity field
 *   COMPOSITE per frame   — pixelate, Bayer-threshold, mask, draw to the canvas
 *
 * Ported from the reference implementation on aspensearch.com, read out of
 * their shipped bundle. Two deliberate departures, both from the Set-Once
 * Rule's amendment (DESIGN.md §4):
 *
 *   1. THE FIELD DOES NOT DRIFT. The reference advances its fbm by a `time`
 *      uniform every frame. Ours has no time uniform at all — the field is
 *      baked into a texture at mount and never recomputed until the viewport
 *      changes. At rest the hero is as still as it was with no ground at all,
 *      which is the whole basis on which the ground was readmitted.
 *   2. THE COMPOSITE IS TRANSPARENT. The reference mixes between two opaque
 *      greys. Ours writes one ink colour at a computed alpha, so the section's
 *      own --paper shows through and the scheme flip stays in CSS.
 *
 * All passes derive uv from gl_FragCoord rather than a varying, so they share
 * one vertex shader (`gl.ts`) and can be read on their own.
 */

/* ------------------------------------------------------------------ field */

/*
 * Classic Perlin noise (Gustavson's `cnoise`), unmodified — it is the noise
 * the reference uses and swapping in simplex would change the look for no
 * gain. `abs()` on each octave is what gives the field its ridged, cloud-like
 * structure rather than smooth billows.
 */
const PERLIN = `
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

const int OCTAVES = 4;
const float LACUNARITY = 3.0;
const float GAIN = 0.4;

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  for (int i = 0; i < OCTAVES; i++) {
    value += amp * abs(cnoise(p));
    p *= LACUNARITY;
    amp *= GAIN;
  }
  return value;
}`;

/*
 * The whole field, collapsed into one bake.
 *
 * The reference splits this across two passes — a baked domain-warp texture,
 * then a per-frame pass that offsets it by `time * waveSpeed`. With the drift
 * removed there is nothing left for the second pass to vary, so both fold into
 * a single texture that is written once per resize and read every frame after.
 * Three fbm evaluations at mount, zero thereafter.
 *
 * Output is a scalar density in R. `smoothstep` sets where the field breaks
 * into open ground versus texture; the `pow` biases it back toward open.
 */
export const FIELD_FRAGMENT = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uAspect;

out vec4 fragColor;
${PERLIN}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  uv -= 0.5;
  uv.x *= uAspect;

  float base = fbm(uv);
  float warped = fbm(uv + base * 0.5);
  float density = fbm(uv + warped * 0.1);

  density = smoothstep(0.28, 0.72, density);
  density = pow(clamp(density, 0.0, 1.0), 1.2);

  fragColor = vec4(density, 0.0, 0.0, 1.0);
}`;

/* ------------------------------------------------------------------ fluid */

/*
 * Dye and momentum injected at the cursor. uColor carries the cursor's own
 * velocity for the velocity target and a flat dye amount for the dye target —
 * one shader, two uses, which is why the injected quantity is a uniform rather
 * than a constant.
 *
 * The gaussian is in aspect-corrected space so the splat is round on a wide
 * hero instead of an ellipse.
 */
export const SPLAT_FRAGMENT = `#version 300 es
precision highp float;

uniform sampler2D uTarget;
uniform vec2 uResolution;
uniform vec3 uColor;
uniform vec2 uPoint;
uniform float uRadius;
uniform float uAspect;

out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 p = uv - uPoint;
  p.x *= uAspect;
  vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
  fragColor = vec4(texture(uTarget, uv).xyz + splat, 1.0);
}`;

/*
 * Semi-Lagrangian advection: step backwards along the velocity field and read
 * what was there. `uDissipation` is a decay rate per second, so the trail's
 * lifetime is set here and nowhere else — dye at 3.2 is visually gone in about
 * 1.5s, which is what the reference measures at.
 */
export const ADVECT_FRAGMENT = `#version 300 es
precision highp float;

uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uResolution;
uniform vec2 uTexelSize;
uniform float uDt;
uniform float uDissipation;

out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 coord = uv - uDt * texture(uVelocity, uv).xy * uTexelSize;
  fragColor = texture(uSource, coord) / (1.0 + uDissipation * uDt);
}`;

export const CURL_FRAGMENT = `#version 300 es
precision highp float;

uniform sampler2D uVelocity;
uniform vec2 uResolution;
uniform vec2 uTexelSize;

out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float l = texture(uVelocity, uv - vec2(uTexelSize.x, 0.0)).y;
  float r = texture(uVelocity, uv + vec2(uTexelSize.x, 0.0)).y;
  float t = texture(uVelocity, uv + vec2(0.0, uTexelSize.y)).x;
  float b = texture(uVelocity, uv - vec2(0.0, uTexelSize.y)).x;
  fragColor = vec4(0.5 * (r - l - t + b), 0.0, 0.0, 1.0);
}`;

/*
 * Vorticity confinement — the step that makes this read as smoke rather than
 * as a spreading blob. It finds the gradient of |curl| and pushes the velocity
 * along it, re-injecting the small rotations that semi-Lagrangian advection
 * numerically damps out.
 *
 * There is deliberately NO pressure-projection pass here, matching the
 * reference: the field is not divergence-free and the plume compresses
 * slightly. That is invisible at this scale and it removes the 20-40 Jacobi
 * iterations that dominate a full solver's frame cost.
 */
export const VORTICITY_FRAGMENT = `#version 300 es
precision highp float;

uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform vec2 uResolution;
uniform vec2 uTexelSize;
uniform float uCurlStrength;
uniform float uDt;

out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float l = texture(uCurl, uv - vec2(uTexelSize.x, 0.0)).x;
  float r = texture(uCurl, uv + vec2(uTexelSize.x, 0.0)).x;
  float t = texture(uCurl, uv + vec2(0.0, uTexelSize.y)).x;
  float b = texture(uCurl, uv - vec2(0.0, uTexelSize.y)).x;
  float c = texture(uCurl, uv).x;

  vec2 force = 0.5 * vec2(abs(t) - abs(b), abs(r) - abs(l));
  force /= length(force) + 0.0001;
  force *= uCurlStrength * c;
  force.y *= -1.0;

  vec2 velocity = texture(uVelocity, uv).xy + force * uDt;
  fragColor = vec4(clamp(velocity, -1000.0, 1000.0), 0.0, 1.0);
}`;


/* -------------------------------------------------------------- composite */

/*
 * Where the ground and the wake become one material.
 *
 * THE GROUND IS TYPE, NOT A HALFTONE. The first version of this field was an
 * ordered Bayer dither — a lattice of dots — which was the reference site's
 * material and, together with its mint plume, made this hero a straight port
 * of theirs. Both are gone (user-directed). What carries the field now is the
 * site's own: a sparse grid of Geist Mono hex, the alphabet the cipher pass
 * scrambles through, at the size the rest of the site sets its technical
 * notation. A dot field is a print reference anyone can borrow; a page whose
 * substrate is its own monospace face is not.
 *
 * THE POINTER STIRS THE CIPHERTEXT. The fluid solver is unchanged and still
 * shapes the wake — that curl and dissipation was the thing worth keeping —
 * but what it modulates is which glyph a cell shows and how hard it is set.
 * Inside the wake a cell churns through the alphabet at the cipher pass's own
 * 46ms quantum and sets in --body; behind the wake it settles back to its
 * resting glyph in --ghost. Nothing "decrypts", and the code does not claim
 * to: there is no message under the field. It is entropy being disturbed and
 * re-settling, which is what a bearer secret actually is.
 *
 * NO GREEN HERE. --signal stays on the 7px property squares and the directory
 * status tag. The hero is monochrome (user-directed), which is also what puts
 * the largest chromatic event on the page back at 7px where it started.
 */
export const COMPOSITE_FRAGMENT = `#version 300 es
precision highp float;

uniform sampler2D uField;
uniform sampler2D uDye;
uniform sampler2D uGlyphs;
uniform vec2 uResolution;
uniform float uCell;
uniform float uGlyphCount;
uniform vec3 uRest;
uniform vec3 uWake;
uniform float uOccupancy;
uniform float uGain;
uniform float uTrailStrength;
/** Quantised churn step. Advances only while the loop runs; 0 at rest. */
uniform float uChurn;
/** xy = centre of the title block, zw = its half-extents, in device pixels. */
uniform vec4 uSafeBox;
uniform float uSafeFeather;
uniform float uTrailInset;
/** Distance over which the field dies into the section's top/bottom edges. */
uniform vec2 uEdgeFade;

out vec4 fragColor;

/** Cheap per-cell hash. Deterministic, so the resting field never changes. */
float hash21(vec2 p) {
  vec2 q = fract(p * vec2(123.34, 456.21));
  q += dot(q, q + 45.32);
  return fract(q.x * q.y);
}

void main() {
  vec2 cell = floor(gl_FragCoord.xy / uCell);
  vec2 local = fract(gl_FragCoord.xy / uCell);
  vec2 cellUv = (cell + 0.5) * uCell / uResolution;

  // Box SDF: negative inside the title block, 0 on its edge, positive outside.
  vec2 q = abs(gl_FragCoord.xy - uSafeBox.xy) - uSafeBox.zw;
  float boxDist = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);

  /*
   * THE SECTION'S OWN EDGES GET THE SAME TREATMENT AS THE TYPE. A box SDF puts
   * its highest values furthest from the box — which is the top and bottom of
   * the canvas — so without this the field's densest band lands in the first
   * strip under the masthead, and its second washes across the closing
   * hairline. Measured before this was added: 23.7% coverage under the bar
   * against 0.6-2.6% mid-field. Both are surfaces the system says must stay
   * clean lines: a pixel strip under the masthead was rejected by name (the
   * retired --nav-edge), and the hairline is the Fold-Line Rule's horizon.
   */
  float edgeFade = smoothstep(0.0, uEdgeFade.y, gl_FragCoord.y)
                 * smoothstep(0.0, uEdgeFade.x, uResolution.y - gl_FragCoord.y);

  /*
   * The two layers clear the type by different amounts on purpose. The ground
   * is a resting texture and has no business anywhere near the page peak, so
   * it fades out a long way from the box. The wake is the thing the reader is
   * doing, and one that stops dead short of the headline reads as broken — so
   * it runs right up to the letters and only dies inside them.
   */
  float groundCoverage = smoothstep(0.0, uSafeFeather, boxDist) * edgeFade;
  float trailCoverage = smoothstep(-uTrailInset, uTrailInset, boxDist) * edgeFade;

  float wake = smoothstep(0.02, 0.26, texture(uDye, cellUv).r * uTrailStrength * trailCoverage);

  /*
   * Occupancy — whether a cell carries a glyph at all — is thresholded against
   * the baked noise, so the characters cluster and thin the way the field
   * does instead of tiling evenly. This is the density falloff doing the work
   * rather than opacity: fading type with alpha greys the letterforms and the
   * field turns into a smudge, exactly as a partial mix destroys a dither.
   * The wake raises occupancy as well as contrast, so disturbing the field
   * makes more of it surface rather than merely darkening what was there.
   */
  float density = texture(uField, cellUv).r * uGain * groundCoverage + wake * 0.55;
  float occupancy = step(uOccupancy, density);

  /*
   * Glyph choice. At rest it is a pure hash of the cell: the same character
   * forever, which is what lets the resting frame be bit-identical across the
   * whole visit. Inside the wake a quantised churn step is added, so the cell
   * cycles the alphabet while it is disturbed and drops back to its resting
   * character the moment the dye falls away.
   */
  float churn = floor(uChurn) * step(0.25, wake);
  float glyph = floor(mod(hash21(cell) * 977.0 + churn, uGlyphCount));

  float ink = texture(uGlyphs, vec2((glyph + local.x) / uGlyphCount, local.y)).a;

  fragColor = vec4(mix(uRest, uWake, wake), ink * occupancy);
}`;
