import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cashu",
    short_name: "Cashu",
    description:
      "Cashu is ecash for bitcoin. An open Chaumian protocol. No company, no token, no treasury.",
    start_url: "/",
    display: "standalone",
    /* Paper, in both schemes, deliberately. The manifest is scheme-blind —
       there is no portable way to give an installed app a dark splash — so
       one value has to stand for the site, and the site's ground is Paper
       (DESIGN.md §2). A dark-mode install therefore opens on white before
       the page paints. The browser chrome, which *can* follow the scheme,
       does: see viewport.themeColor in layout.tsx. Don't "fix" this by
       flipping it to #0a0a0b; that only moves the flash onto light users. */
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
