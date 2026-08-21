/*
 * motion-theme-css — compile motion.theme.json to CSS custom properties.
 *
 *   node scripts/motion-theme-css.mjs
 *
 * RE-RUN THIS WHEN motion.theme.json CHANGES. The output is committed, exactly
 * like the subset fonts, and for the same reason: the alternative is doing the
 * work in the browser on every visit to produce a value that is a constant.
 * Nothing in the build chain runs it for you, so an edit to the JSON that is
 * not followed by a run leaves the stylesheet on the old springs while the
 * Motion UI sections move to the new ones — the one failure mode this file
 * exists to prevent. `npm run motion:theme` is the same command.
 *
 * WHAT IT IS FOR. The site's own motion is CSS: entrances that always play are
 * keyframes that start at parse time rather than at hydration (see the arrival
 * block in globals.css and the measurements in it), and the feedback states are
 * transitions. None of that can call a JS animation library without giving back
 * the thing those measurements bought. But a spring is only a curve, and a
 * curve can be sampled ahead of time — which is what Motion's own
 * `generateLinearEasing` does here, via `transitionToLinear` in the vendored
 * ui-theme. So the stylesheet gets real spring easings as `linear()` functions
 * with no library on the wire and no runtime cost at all.
 *
 * WHY IT IMPORTS A .ts FILE. `src/components/motion-ui/ui-theme/index.ts` is
 * vendored from the Motion UI registry and is the single definition of the
 * theme's defaults, its merge semantics and its CSS emit. Re-implementing any
 * of that here would be a second source of truth that silently rots the next
 * time the registry file is updated. Node 22.6+ strips the types on import, and
 * the file's "use client" directive is an inert string literal outside a
 * bundler, so importing it directly is both safe and the honest thing to do.
 * Node prints a MODULE_TYPELESS_PACKAGE_JSON warning while doing it; that is
 * noise about reparsing cost in a build script, not a problem.
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  defineTheme,
  themeToCssVars,
} from "../src/components/motion-ui/ui-theme/index.ts";
import config from "../motion.theme.json" with { type: "json" };

const OUT = fileURLToPath(new URL("../src/app/motion-theme.css", import.meta.url));

/*
 * WHAT THE SITE ACTUALLY COMPILES — an allowlist, not a filter for tidiness.
 *
 * The theme defines five transitions, three staggers and three travels, and
 * themeToCssVars emits all of them: 22 custom properties, 5124 bytes raw. The
 * site consumes one. Shipping the other twenty measured 962 bytes gzipped —
 * about 8% of the stylesheet's compressed weight — to define values nothing
 * reads.
 *
 * That is a cost, but it is not the reason for this list. The reason is the
 * one globals.css states where it deleted --ease-out-quint and --ease-out-expo,
 * and §2 states where it deleted --signal: a token standing with no consumer is
 * an invitation to reach for it without re-arguing the choice. Emitting the
 * whole vocabulary would put four more curves in autocomplete, one of which
 * (`lively`) overshoots to 1.31 and would spend DESIGN.md §4's no-bounce rule
 * the first time somebody reached for it because it was there.
 *
 * TO ADD ONE: put its name here, alias it in the globals.css motion token block
 * with the surface that needs it and the reason it needs it, and re-run. The
 * cost of a new curve should be a paragraph, which is the point.
 */
const EMIT = [
  // Press feedback: the .btn-* slabs and .press-arrow. See --ease-press in
  // globals.css for why a press is the one surface that earns a spring.
  "--motion-ui-transition-snap-spring",
  "--motion-ui-transition-snap-spring-duration",
];

/* `$comment` documents the JSON for a human reader; defineTheme would carry it
   into the resolved theme as an unknown key, so it never reaches the emit. */
const { $comment, ...themeConfig } = config;
void $comment;

const theme = defineTheme(themeConfig);
const all = themeToCssVars(theme);

/* A name in EMIT that the theme does not define is a typo, and a typo here
   fails silently in CSS — var(--misspelled) just falls back and the surface
   keeps its old easing. Fail the build instead. */
const missing = EMIT.filter((name) => !(name in all));
if (missing.length) {
  console.error(
    `motion-theme-css: EMIT names not defined by the theme:\n  ${missing.join("\n  ")}`,
  );
  process.exit(1);
}

const withheld = Object.keys(all).filter((name) => !EMIT.includes(name));
const body = EMIT.map((name) => `  ${name}: ${all[name]};`).join("\n");

const banner = `/* GENERATED FILE — DO NOT EDIT.
 *
 * Source:    motion.theme.json
 * Generator: scripts/motion-theme-css.mjs  (npm run motion:theme)
 *
 * The --motion-ui-* vocabulary, compiled from the theme's springs by Motion's
 * own generateLinearEasing. Each transition emits four properties:
 *
 *   --motion-ui-transition-<name>                  cubic-bezier, the FADE
 *     channel (opacity and colour), paired with
 *   --motion-ui-transition-<name>-duration
 *
 *   --motion-ui-transition-<name>-spring           linear(), the TRAVEL
 *     channel (transforms), paired with its natural settle time
 *   --motion-ui-transition-<name>-spring-duration
 *
 * Pair a spring easing ONLY with its own -spring-duration. A linear() function
 * is a sampled curve, not a shape: run it over a different length and it is no
 * longer the spring it was sampled from.
 *
 * ONLY WHAT THE SITE CONSUMES IS HERE. The theme defines ${String(Object.keys(all).length).padStart(2)} properties and
 * ${String(withheld.length).padStart(2)} are withheld, on the same reasoning that deleted --ease-out-quint
 * and --signal: an unconsumed token is an invitation to reach for a curve
 * without re-arguing it. The allowlist and the procedure for adding one are in
 * the generator. Withheld:
 *
${withheld.map((n) => ` *   ${n}`).join("\n")}
 */
`;

writeFileSync(OUT, `${banner}\n:root {\n${body}\n}\n`, "utf8");

console.log(`motion-theme-css: wrote ${OUT}`);
console.log(`  emitted  ${EMIT.length}`);
for (const name of EMIT) console.log(`    ${name}`);
console.log(`  withheld ${withheld.length} (see the banner)`);
