import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import ConsoleSignature from "@/components/console-signature";
import ButtonCipher from "@/components/button-cipher";
import Keymap from "@/components/keymap";
import MotionUITheme from "@/components/motion-ui/theme-provider";
import SiteCursor from "@/components/site-cursor";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

/* All four faces on this page are subsets, cut by scripts/subset-fonts.mjs
   from the masters in assets/fonts/ (which are never served — see that
   script's header for the split, and don't move a face back under public/).
   The fonts were 133KB of a 376KB homepage, the largest category on the wire,
   and were the thing `document.fonts.ready` — and therefore the hero field's
   first render — was waiting on. Subsetting took them to 40KB.

   RE-RUN THAT SCRIPT WHEN THE CHARACTER SET CHANGES. That means a keymap
   chord label, a NUT id, the hero field's alphabets, or copy carrying a
   character outside Latin-1. The script's header says which range covers
   which, and each range is drawn wider than today's text on purpose. */
const gtStandard = localFont({
  src: [
    {
      path: "../fonts/gt-standard/GT-Standard-M-Standard-Regular-Trial.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/gt-standard/GT-Standard-M-Standard-Medium-Trial.subset.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/gt-standard/GT-Standard-M-Standard-Semibold-Trial.subset.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-gt",
  display: "swap",
});

/* Declared here rather than imported from `geist/font/mono`, which serves the
   full variable face: 1159 glyphs, 889 codepoints and an entire weight axis,
   71KB, to set a face this site only ever renders at 400. `.t-mono` is 400,
   the two other mono rules in globals.css are 400, and glyphs.ts sets
   `ctx.font` with no weight at all, so the axis had exactly no consumer. A
   static instance at wght=400, subset to the characters that render, is 5KB.

   `weight: "400"` is therefore the honest declaration and not an oversight.
   The one place something asks for another weight is `.t-pixel`, which is 500
   and lists this face as its *fallback* — so a 500 only ever reaches it if the
   pixel face fails to load, and the browser resolves that to this face
   unsynthesised. If mono ever genuinely needs a second weight, take the
   variable subset from subset-fonts.mjs (13KB) rather than adding a face.

   The variable name is unchanged, so globals.css's `--font-mono` indirection
   does not move. */
const geistMono = localFont({
  src: "../fonts/geist-mono/GeistMono-400.subset.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-geist-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

/* Declared here rather than imported from `geist/font/pixel`, which is not
   a per-face module: it calls localFont() at module scope for all five
   pixel faces (Square, Circle, Grid, Line, Triangle), so importing one
   registers and preloads every one. Circle, Grid, Line, and Triangle —
   faces nothing on this site ever sets — were costing 101KB of woff2 on
   every page load. DESIGN.md's three-typeface rule was holding in the
   stylesheet and leaking on the wire.

   preload: false demotes rather than defers. The keymap overlay renders
   `.t-pixel` chords into the DOM at load, so the face still resolves on
   first paint; what changes is that it stops occupying a preload slot
   ahead of the three GT-Standard faces the hero is actually waiting on.
   Updating `geist` means re-copying the woff2 into assets/fonts/ and
   re-running scripts/subset-fonts.mjs over it. */
const geistPixelSquare = localFont({
  src: "../fonts/geist-pixel/GeistPixel-Square.subset.woff2",
  weight: "500",
  variable: "--font-geist-pixel-square",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["Geist Mono", "ui-monospace", "SFMono-Regular", "monospace"],
});

/* One value, because the site has one scheme (see the tonal ramp in
   globals.css — dark mode was removed 2026-08-17). A prefers-color-scheme
   pair here would tell the browser to tint its chrome dark around a page that
   is still paper-white. */
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Cashu: Open source electronic cash",
  description:
    "Cashu is ecash for bitcoin. An open Chaumian protocol. No company, no token, no treasury.",
  /* Routes override this with their own path. Preview deploys resolve it
     against their own host via metadataBase, so a preview never claims to
     be the canonical document. */
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cashu: Open source electronic cash",
    description:
      "Cashu is ecash for bitcoin. An open Chaumian protocol. No company, no token, no treasury.",
    url: SITE_URL,
    siteName: "Cashu",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Two hands exchange US dollar bills against the NYC Flatiron district, flanked by a Cashu wallet showing a balance of ₿3,878 on an antifiat mint.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cashu: Open source electronic cash",
    description:
      "Cashu is ecash for bitcoin. An open Chaumian protocol. No company, no token, no treasury.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${gtStandard.variable} ${geistMono.variable} ${geistPixelSquare.variable} h-full antialiased`}
      /* Browser extensions (Dark Reader and friends) stamp attributes on
         <html> before hydration; the mismatch is theirs, not ours, and it is
         not worth a console error. */
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* THE NO-SCRIPT RESCUE, and it is the one place this stylesheet uses
            `!important` — deliberately, because it is the only thing that can
            beat an inline style.

            The entrance is Motion-driven now (see stagger.tsx), and Motion
            serialises a variant's `initial` state into the SERVER-RENDERED
            `style` attribute. So a visitor with scripting off receives markup
            that is already `opacity: 0.02; filter: blur(4px); transform:
            translateY(40px)` and has nothing to animate it back. No CSS
            selector can undo that — inline wins — and the boot script below
            cannot help either, because with scripting off it never runs.

            `<noscript>` is parsed only when scripting is disabled, which makes
            it exactly the right instrument: the rule exists for those visitors
            and for nobody else, and it costs everyone else nothing.

            This is a real cost of driving the entrance from a runtime rather
            than from the stylesheet, and it is recorded rather than hidden. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "[data-stagger] > *{opacity:1 !important;transform:none !important;filter:none !important}",
            }}
          />
        </noscript>

        {/* Stamps html.js, still the gate for the hero hairline's draw.

            THE FAILSAFE NOW REPAIRS RATHER THAN RETREATS. It used to probe for
            `.reveal.is-revealed` and, finding none, drop `html.js` so the
            CSS-gated hidden states released. That system is gone; Motion's
            hidden state is an inline style, so dropping a class cannot reach
            it. Instead, after 1.5s, anything still sitting under an opacity of
            0.9 inside a stagger container gets its inline opacity, transform
            and filter cleared outright.

            The case this exists for is unchanged and is the one that actually
            bites: not scripting-off (handled above) but scripting-SLOW and
            scripting-BROKEN — a chunk that never arrives, or a backgrounded tab
            where hydration completes while rAF stays paused. Those never
            resolve on their own. It lives inline, not in a chunk, so a chunk
            that never arrives cannot take the failsafe with it. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'document.documentElement.classList.add("js");setTimeout(function(){document.querySelectorAll("[data-stagger] > *").forEach(function(e){var o=getComputedStyle(e).opacity;if(o!==""&&parseFloat(o)<0.9){e.style.opacity="";e.style.transform="";e.style.filter=""}})},1500)',
          }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div
          hidden
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              "<!--\n  cashu.space: the open specification\n\n  document  landing\n  spec      https://github.com/cashubtc/nuts\n  source    https://github.com/cashubtc\n\n  no company. no token. no treasury.\n-->",
          }}
        />
        <ConsoleSignature />
        <ButtonCipher />
        <Keymap />
        {/* Inside the provider, not beside it. SiteCursor resolves the
            `snap` transition by name, and a Motion UI consumer mounted as a
            sibling of <MotionUITheme> reads the bundled defaultTheme instead
            — silently, because the fallback is by design. */}
        <MotionUITheme>
          <SiteCursor />
          {children}
        </MotionUITheme>
      </body>
    </html>
  );
}
