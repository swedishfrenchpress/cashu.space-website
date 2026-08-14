/**
 * The contour lens — pointer distortion for the ASCII field.
 *
 * Ported from `AsciiFieldWarp` in cashubtc/wallet (Kotlin/Swift), retuned from
 * a fingertip to a cursor. It displaces the *sampling*, not the glyphs: the
 * grid never moves and the currency hash never re-keys, so what you see is the
 * terrain's own contour lines bending and compressing around the pointer, like
 * a loupe dragged across a map.
 *
 * The whole design rests on one inequality. The displacement bump
 * `16·(s(1−s))²` is zero in value *and* in slope at both the centre and the
 * rim, so contours never kink at the lens boundary; and its peak slope is
 * `3.079·A·k/R`, which at the envelope's overshoot peak (k = 1.0529) comes to
 * `3.242·A/R`. Keep that under 1 and the warped sampling can never fold over
 * itself — fold it and the terrain mirrors, which reads as a tear.
 *
 * So RADIUS and MAX_DISPLACEMENT are a coupled pair, not two knobs.
 * `NO_FOLD_RATIO` is the ceiling on `MAX_DISPLACEMENT / RADIUS`; the wallet
 * sits at exactly 0.30 and so does this, which is why enlarging the lens for a
 * cursor was a similarity transform of the wallet's, not a retune.
 */

/** Full-bloom lens radius. The wallet's 120dp is ~10 columns, sized for a
 *  fingertip on a phone; a cursor over a full-hero field wants roughly double. */
export const RADIUS = 220;

/** Peak sample displacement — RADIUS × 0.30, holding the no-fold margin. */
export const MAX_DISPLACEMENT = 66;

/** `MAX_DISPLACEMENT / RADIUS` must stay at or under this. See the header. */
export const NO_FOLD_RATIO = 0.3084;

/** The lens materialises at this fraction of its radius and blooms to full as
 *  the envelope rises — it grows out of the pointer rather than appearing at
 *  final size. */
export const RADIUS_BLOOM_FLOOR = 0.75;

/** Envelope durations in wall-clock seconds — not field `t`, which is
 *  speed-scaled and freezes with the clock. */
export const ENGAGE_DURATION = 0.28;
export const RELEASE_DURATION = 0.6;

/** easeOutBack shape parameter: ~5% overshoot (the envelope peaks at 1.0529),
 *  so the lens blooms slightly past full and relaxes. Positive overshoot is
 *  safe — only a *negative* envelope would flip the lens into attraction — and
 *  the no-fold margin still holds at the peak. */
export const BACK_OVERSHOOT = 1.2;

/** Swirl at full displacement, radians. The displacement direction rotates in
 *  proportion to local strength, so terrain flows *around* the pointer instead
 *  of only fleeing it, and un-twists as the release envelope decays. */
export const SWIRL_MAX = 0.35;

/** Position-glide time constant: the lens eases toward the pointer by
 *  `1 − exp(−dt/τ)` per frame, so a sweep reads as fluid pursuit rather than
 *  per-frame teleports. */
export const FOLLOW_TAU = 0.07;

/** Lens radius at envelope `k` — the bloom. */
export function bloomedRadius(k: number): number {
  return RADIUS * (RADIUS_BLOOM_FLOOR + (1 - RADIUS_BLOOM_FLOOR) * Math.min(1, k));
}

/** Sample displacement at distance `d` from the pointer, envelope `k`. */
export function displacement(d: number, k: number): number {
  if (k <= 0 || d <= 0) return 0;
  const r = bloomedRadius(k);
  if (d >= r) return 0;
  const s = d / r;
  const e = s * (1 - s);
  return MAX_DISPLACEMENT * k * 16 * e * e;
}

/** easeOutBack: fast rise, small overshoot, soft settle. Clamped at zero — the
 *  polynomial dips to −2e-16 at u = 0 in floating point, and even that
 *  microscopically negative envelope is the attraction flip the design
 *  forbids. */
function backOut(u: number): number {
  const c = Math.min(1, Math.max(0, u));
  const q = c - 1;
  return Math.max(
    0,
    1 + (BACK_OVERSHOOT + 1) * q * q * q + BACK_OVERSHOOT * q * q,
  );
}

/** Ease-in from `k0`, which is non-zero when the pointer re-enters mid-decay. */
export function pressEnvelope(elapsed: number, k0: number): number {
  return k0 + (1 - k0) * backOut(elapsed / ENGAGE_DURATION);
}

/** `k0·(1−v)³` — a settle, deliberately not a spring: overshoot *here* would
 *  swing k negative and flip the lens into attraction. */
export function releaseEnvelope(elapsed: number, k0: number): number {
  const v = 1 - Math.min(1, Math.max(0, elapsed / RELEASE_DURATION));
  return k0 * v * v * v;
}

/** Rotation of the displacement direction — proportional to local strength, so
 *  the swirl is strongest mid-lens and vanishes at both centre and rim. */
export function swirlAngle(f: number): number {
  return (SWIRL_MAX * f) / MAX_DISPLACEMENT;
}

/** Per-frame glide fraction for elapsed `dt`. Frame-rate independent. */
export function followFactor(dt: number): number {
  return 1 - Math.exp(-dt / FOLLOW_TAU);
}

type Phase = "idle" | "engaged" | "releasing";

/**
 * Mutable pointer state, read by the frame loop.
 *
 * Deliberately not React state: the field already repaints at 30fps, so
 * mutations here surface on the next frame without re-rendering the tree on
 * every pointermove.
 */
export class WarpPointer {
  private phase: Phase = "idle";
  /** Where the lens *is*, in pixels — glides toward the pointer via `advance`. */
  x = 0;
  y = 0;
  private targetX = 0;
  private targetY = 0;
  private phaseStart = 0;
  private k0 = 0;
  private lastAdvance = 0;

  engage(px: number, py: number, now: number): void {
    this.targetX = px;
    this.targetY = py;
    if (this.phase === "idle") {
      /* An arriving pointer snaps the lens under it — the bloom starts where
         the cursor is, never gliding in from a stale spot. */
      this.x = px;
      this.y = py;
    }
    this.lastAdvance = now;
    /* Ramp from the current envelope, so re-entering mid-decay doesn't snap
       the lens shut and reopen it from zero. */
    this.k0 = this.currentK(now);
    this.phaseStart = now;
    this.phase = "engaged";
  }

  move(px: number, py: number): void {
    this.targetX = px;
    this.targetY = py;
  }

  release(now: number): void {
    if (this.phase !== "engaged") return;
    this.k0 = this.currentK(now);
    this.phaseStart = now;
    this.phase = "releasing";
  }

  reset(): void {
    this.phase = "idle";
    this.k0 = 0;
  }

  get active(): boolean {
    return this.phase !== "idle";
  }

  /** Advances the position glide; call once per frame before sampling. Keeps
   *  gliding through the release settle, so a flick's lens drifts to rest at
   *  the exit point instead of freezing mid-pursuit. */
  advance(now: number): void {
    if (this.phase === "idle") return;
    /* Clamp dt so a hitch or a paused tab can't turn into a teleport. */
    const dt = Math.min(0.1, Math.max(0, now - this.lastAdvance));
    this.lastAdvance = now;
    const a = followFactor(dt);
    this.x += (this.targetX - this.x) * a;
    this.y += (this.targetY - this.y) * a;
  }

  currentK(now: number): number {
    if (this.phase === "idle") return 0;
    if (this.phase === "engaged") {
      return pressEnvelope(now - this.phaseStart, this.k0);
    }
    const k = releaseEnvelope(now - this.phaseStart, this.k0);
    if (k <= 0) this.phase = "idle";
    return k;
  }
}
