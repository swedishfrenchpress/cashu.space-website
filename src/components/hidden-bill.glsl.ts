// Shader pair for the hero's "Hidden Bill" figure. A single dithered
// banknote sits in the right column at oversized scale — large enough
// to bleed past the column's horizontal bounds — with its entire
// surface continuously redacted by a halftone dot field. A narrow
// vertical reveal slot drifts left → right exposing fragments of the
// bill at a time. The bill has no hard frame; soft alpha falloff at
// all four edges dissolves it into the page like a watermark.
// Privacy is the steady state; revelation is the rare event. You
// never see the whole bill.
//
// The bill's content (CASHU wordmark, denomination value, serial,
// signature line, corner sigils) is pre-rendered into a canvas
// texture and sampled per fragment. Halftone redaction is computed
// per fragment in device-pixel space so the dot field is uniform
// across the bill regardless of bill size.
//
// Cursor proximity opens a soft circular reveal, additive with the
// slot — visitors can "shine a light" on any part of the bill they
// want to read.

export const vertexShader = /* glsl */ `
attribute vec3 position;
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
precision mediump float;

uniform vec2      uResolution;  // canvas size in device pixels
uniform float     uTime;
uniform vec2      uMouse;       // device pixels, GL coords (origin bottom-left); (-1,-1) when outside
uniform float     uDpr;
uniform float     uInk;         // greyscale value for ink (mist #71717a ≈ 0.443)
uniform float     uMotion;      // 0.0 = static (prefers-reduced-motion), 1.0 = live
uniform sampler2D uBill;        // pre-rendered bill content (alpha-keyed)
uniform vec4      uBillRect;    // (x, y, w, h) of bill in device pixels, GL coords
uniform float     uSlotPx;      // reveal slot width in device pixels

// Halftone dot field, computed in device-pixel space so dots are a
// uniform texture independent of the bill's display size. Used as the
// redaction overlay covering everything outside the reveal slot.
float halftoneRedact(vec2 px, float spacing, float radius) {
  vec2 cell = mod(px, spacing) - spacing * 0.5;
  float d = length(cell);
  return 1.0 - smoothstep(radius - 0.7, radius + 0.7, d);
}

void main() {
  vec2  fragPx = gl_FragCoord.xy;
  vec2  billOrigin = uBillRect.xy;
  vec2  billSize   = uBillRect.zw;

  vec2 billUv = (fragPx - billOrigin) / billSize;

  // Outside the bill rect: transparent. The bill is sized to bleed
  // past the container horizontally, so this only fires for fragments
  // that fall outside the bill's full (possibly off-screen) extent.
  if (billUv.x < 0.0 || billUv.x > 1.0 ||
      billUv.y < 0.0 || billUv.y > 1.0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // Sample bill texture. THREE.CanvasTexture flips Y on upload
  // (flipY=true by default), so canvas top-left (0,0) lands at uv
  // (0,1) — meaning billUv (y=0 at bottom) maps to texUv directly
  // with no manual flip.
  float billContent = texture2D(uBill, billUv).a;

  // -- Redaction overlay -----------------------------------------------
  //
  // Halftone field that hides bill content. Spacing and radius are in
  // device pixels so the dot lattice stays uniform and crisp regardless
  // of how large the bill is on screen.
  float redaction = halftoneRedact(fragPx, 7.5 * uDpr, 2.5 * uDpr);

  // -- Reveal slot -----------------------------------------------------
  //
  // Narrow vertical band that drifts L → R across the bill. Soft edges
  // (wide smoothstep) keep the redaction lifting and falling back into
  // place gently — no hard wipe, no scanner beam.
  float cyclePeriod = 13.0;
  float t           = fract(uTime / cyclePeriod);
  // Slight easing — slot decelerates slightly through the middle.
  float ease = smoothstep(0.0, 1.0, t);
  float slotWUv     = uSlotPx / billSize.x;
  float slotCenter  = mix(-slotWUv * 0.7, 1.0 + slotWUv * 0.7, ease);
  float slotHalf    = slotWUv * 0.5;
  float slotDist    = abs(billUv.x - slotCenter);
  // Wide smoothstep on slot edges → soft falloff, not a hard window.
  float slotMask    = 1.0 - smoothstep(slotHalf * 0.55, slotHalf, slotDist);

  // Reduced-motion: park the slot at a stable position so the figure
  // still reads as "partial reveal of a hidden bill," just static.
  float staticDist  = abs(billUv.x - 0.42);
  float staticMask  = 1.0 - smoothstep(slotHalf * 0.55, slotHalf, staticDist);
  slotMask = mix(staticMask, slotMask, uMotion);

  // -- Cursor reveal ---------------------------------------------------
  //
  // Soft circular reveal that follows the pointer; lets visitors
  // expose any part of the bill they want to read. Additive with the
  // slot mask so the cursor doesn't fight the ambient sweep.
  vec2  mouseUv      = (uMouse - billOrigin) / billSize;
  float mouseActive  = step(0.0, uMouse.x) * step(0.0, uMouse.y);
  vec2  delta        = (billUv - mouseUv) * billSize;
  float cursorDist   = length(delta);
  float cursorMask   = mouseActive *
                       (1.0 - smoothstep(48.0 * uDpr, 160.0 * uDpr, cursorDist));

  float revealMask = clamp(slotMask + cursorMask, 0.0, 1.0);

  // -- Composite -------------------------------------------------------
  //
  // Inside the slot/cursor: bill content. Outside: redaction. No frame,
  // no hard rectangle — the dot field itself describes the shape, and
  // the edge fade below dissolves it into the page.
  float revealedContent = billContent * revealMask;
  float redactionFill   = redaction   * (1.0 - revealMask);
  float alpha = max(revealedContent, redactionFill);

  // -- Soft edge falloff ----------------------------------------------
  //
  // All four edges dissolve smoothly so the bill reads as a watermark
  // sitting behind the page rather than a stamped, contained object.
  // Horizontal fade is wider than vertical because the bill is wider
  // and the bleed past the column needs to feather gracefully off.
  float xFade = smoothstep(0.0, 0.20, billUv.x) *
                (1.0 - smoothstep(0.80, 1.0, billUv.x));
  float yFade = smoothstep(0.0, 0.10, billUv.y) *
                (1.0 - smoothstep(0.90, 1.0, billUv.y));
  alpha *= xFade * yFade;

  gl_FragColor = vec4(vec3(uInk), alpha * 0.78);
}
`;
