"use client";

import type { ReactNode } from "react";
import { MotionUIThemeProvider } from "./ui-theme";
import theme from "../../../motion.theme";

/* Client boundary for Motion UI's theme context.
 *
 * `motion.theme.ts` calls defineTheme() at module scope, and defineTheme is
 * exported from ui-theme/index.ts, which is "use client". Importing that chain
 * directly into layout.tsx (a server component) hands back a client-reference
 * proxy and calling it throws. So the call has to happen on the client side of
 * a boundary, which is this file.
 *
 * The provider renders no DOM node — it is pure context, so it does not sit in
 * the body's flex column. Without it the sections silently fall back to
 * Motion's defaultTheme and motion.theme.ts has no effect. */
export default function MotionUITheme({ children }: { children: ReactNode }) {
  return <MotionUIThemeProvider theme={theme}>{children}</MotionUIThemeProvider>;
}
