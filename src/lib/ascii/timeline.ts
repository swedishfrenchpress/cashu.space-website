/**
 * The field's choreography.
 *
 * A ~76-second loop. The vault begins condensing at 10s and stands complete
 * by 16s, so the door lands within a first read of the headline — the
 * original 26s opening hold meant most visits saw only terrain, and the
 * user called it (2026-08-14). After that first beat the loop breathes:
 * the door dissolves, the terrain runs open, and the blind-signature round
 * trip arrives for the visitor who stays. It is still not a slideshow:
 * every morph keeps its six eased seconds, and open terrain separates every
 * scene. Anything busier turns the background into a performance competing
 * with the headline, which is the failure mode PRODUCT.md's "the hero earns
 * its size; nothing competes with it" is guarding against.
 */

export type Scene = "terrain" | "vault" | "bdhke";

/**
 * How far a morph completes.
 *
 * This must stay at or very near 1. A partial mix does *not* make a shape
 * faint — the morph is a brightness lerp read through fixed ramp thresholds,
 * so halving it drags the door's bolts and monogram (212, 221) down below the
 * ₿ threshold and the structure disintegrates rather than dimming. Measured at
 * 0.62 the whole field held a single ₿; at 1.0 it holds ~180.
 *
 * Quietness comes from the timeline instead — long terrain stretches, slow
 * ramps, and coverage falloff at each shape's rim so the landscape survives
 * around it. The scenes are legible when they arrive; they just arrive rarely.
 */
export const MAX_MIX = 1;

type Step =
  | { hold: Scene; seconds: number }
  | { morph: Scene; seconds: number };

/* Read top to bottom as the loop. A `morph` step crossfades from whatever
   scene preceded it into the named one. */
const STEPS: Step[] = [
  { hold: "terrain", seconds: 10 },
  { morph: "vault", seconds: 6 },
  { hold: "vault", seconds: 14 },
  { morph: "terrain", seconds: 6 },
  { hold: "terrain", seconds: 6 },
  { morph: "bdhke", seconds: 6 },
  { hold: "bdhke", seconds: 16 },
  { morph: "terrain", seconds: 8 },
  { hold: "terrain", seconds: 4 },
];

export const LOOP_SECONDS = STEPS.reduce((sum, s) => sum + s.seconds, 0);

/**
 * Ease-in-out, not the site's `--ease-out-quart`.
 *
 * The quart ease-out is right for entrances — a thing arrives fast and settles
 * — and it is the system default for exactly that reason. Over a six-second
 * ambient morph it is wrong: half the transition lands in the first second, so
 * the vault snaps into being and then creeps for five seconds. Smoothstep has
 * zero derivative at *both* ends, so the morph has no perceptible start or
 * stop, which is what "you didn't notice it happen" requires.
 *
 * The nav's condense already departs from the default easing for a similar
 * reason (300ms ease-in-out), so this is a precedent, not a new licence.
 */
function easeInOut(u: number): number {
  const c = Math.min(1, Math.max(0, u));
  return c * c * (3 - 2 * c);
}

export type Composition = {
  /** The scene the terrain is being mixed toward. `terrain` means none. */
  scene: Scene;
  /** How far toward it, already capped by MAX_MIX and eased. 0 = pure terrain. */
  mix: number;
  /** Seconds since this scene's morph began, so a scene with its own internal
   *  choreography (the round trip) starts at the top rather than wherever a
   *  free-running clock happened to be. */
  sceneTime: number;
};

const TERRAIN: Composition = { scene: "terrain", mix: 0, sceneTime: 0 };

/**
 * Which scene is showing at wall-clock `seconds`, and how strongly.
 *
 * Morphs between two non-terrain scenes never occur — every shape returns
 * through the terrain first — so a single (scene, mix) pair is enough and the
 * renderer only ever evaluates one shape field per cell.
 */
export function compositionAt(seconds: number): Composition {
  let t = seconds % LOOP_SECONDS;
  if (t < 0) t += LOOP_SECONDS;

  let previous: Scene = "terrain";
  /* When the shape currently on screen first started appearing. */
  let anchor = 0;
  let elapsed = 0;

  for (const step of STEPS) {
    const target = "hold" in step ? step.hold : step.morph;
    if ("morph" in step && target !== "terrain") anchor = elapsed;

    if (t < elapsed + step.seconds) {
      const local = t - elapsed;
      if ("hold" in step) {
        if (step.hold === "terrain") return TERRAIN;
        return { scene: step.hold, mix: MAX_MIX, sceneTime: t - anchor };
      }
      const u = easeInOut(local / step.seconds);
      /* Morphing *to* terrain is the same crossfade run backwards on the scene
         we're leaving, so the shape dissolves rather than the terrain arriving
         over the top of it. */
      if (step.morph === "terrain") {
        if (previous === "terrain") return TERRAIN;
        return { scene: previous, mix: MAX_MIX * (1 - u), sceneTime: t - anchor };
      }
      return { scene: step.morph, mix: MAX_MIX * u, sceneTime: local };
    }

    elapsed += step.seconds;
    previous = target;
  }
  return TERRAIN;
}
