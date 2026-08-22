import {
  defineTheme,
  type MotionUIThemeConfig,
} from "@/components/motion-ui/ui-theme";
import config from "./motion.theme.json";

/* The numbers live in motion.theme.json, not here.
 *
 * They have two consumers and only one of them is Next: this file resolves the
 * theme for Motion UI sections at runtime, and scripts/motion-theme-css.mjs
 * resolves the SAME config in plain Node to emit src/app/motion-theme.css, so
 * the stylesheet's springs and this file's springs cannot drift apart. A TS
 * module with an `@/` alias import is not resolvable from a bare `node`
 * invocation; JSON is resolvable from both. That is the whole reason for the
 * indirection — see the script's header for the rest of the contract.
 *
 * The cast is real and not laziness: JSON widens `"calm"` to `string`, which
 * is not assignable to ReducedMotionStrategy. Every other field is structurally
 * exact, so if a key is misspelled in the JSON the cast still fails to
 * compile. */
export default defineTheme(config as MotionUIThemeConfig);
