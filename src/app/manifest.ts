import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cashu",
    short_name: "Cashu",
    description:
      "Cashu is ecash for bitcoin. An open Chaumian protocol. No company, no token, no treasury.",
    start_url: "/",
    display: "standalone",
    /* Paper, matching the only ground the site has (DESIGN.md §2). This used
       to carry a note about the manifest being scheme-blind while the page
       followed the OS; dark mode was removed 2026-08-17, so the manifest, the
       browser chrome (viewport.themeColor in layout.tsx) and the page now all
       say the same thing. */
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
