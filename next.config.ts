import type { NextConfig } from "next";

/* Static media in /public ships with `public, max-age=0` by default, so every
   repeat visit spends a conditional request on each file — 304s, no body, but
   still a round trip apiece, and on a phone over a hostile network those
   serialize behind the connection limit. Thirty days of freshness collapses
   that to nothing for a returning visitor.
   `immutable` is deliberately absent: these paths carry no content hash, so a
   swapped video under an immutable header would be pinned in caches for the
   full year with no way to reach the people holding it. `stale-while-
   revalidate` buys the same instant repeat load while still letting a
   replacement propagate within a day of the window closing. */
const STATIC_MEDIA = "public, max-age=2592000, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root to this project. A stray package-lock.json in a
    // parent directory (~/package-lock.json) otherwise makes Next infer the
    // wrong root, widening filesystem tracing and emitting a build warning.
    root: process.cwd(),
  },
  async headers() {
    return [
      {
        source: "/:file(tap-to-pay.mp4|tap-to-pay-poster.jpg|og-image.jpg)",
        headers: [{ key: "Cache-Control", value: STATIC_MEDIA }],
      },
      {
        source: "/press/:file*",
        headers: [{ key: "Cache-Control", value: STATIC_MEDIA }],
      },
      {
        source: "/ai/:file*",
        headers: [{ key: "Cache-Control", value: STATIC_MEDIA }],
      },
    ];
  },
};

export default nextConfig;
