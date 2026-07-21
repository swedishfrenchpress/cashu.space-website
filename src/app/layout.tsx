import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import ConsoleSignature from "@/components/console-signature";
import Keymap from "@/components/keymap";
import "./globals.css";

const gtStandard = localFont({
  src: [
    {
      path: "../../public/fonts/gt-standard/GT-Standard-M-Standard-Regular-Trial.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/gt-standard/GT-Standard-M-Standard-Medium-Trial.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/gt-standard/GT-Standard-M-Standard-Semibold-Trial.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/gt-standard/GT-Standard-M-Standard-Semibold-Oblique-Trial.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-gt",
  display: "swap",
});

/* Browser chrome follows the site scheme (see the tonal ramp in globals.css). */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://cashu-space-website.vercel.app"),
  title: "Cashu",
  description:
    "Cashu is ecash for bitcoin. An open Chaumian protocol. No company, no token, no treasury.",
  openGraph: {
    title: "Cashu",
    description:
      "Cashu is ecash for bitcoin. An open Chaumian protocol. No company, no token, no treasury.",
    url: "https://cashu-space-website.vercel.app",
    siteName: "Cashu",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Two hands exchange US dollar bills against the NYC Flatiron district, flanked by a cashu wallet showing a balance of ₿3,878 on an antifiat mint.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cashu",
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
      className={`${gtStandard.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} h-full antialiased`}
      /* The theme boot script (and browser extensions) may stamp attributes
         on <html> before hydration; the mismatch is intentional. */
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* Applies a manually chosen theme before first paint so a saved
            override can't flash the OS scheme. Parser-blocking on purpose —
            it must run before anything renders. No saved choice → no
            attribute → the CSS follows prefers-color-scheme. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}',
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
              "<!--\n  cashu.space — the open specification\n\n  document  landing\n  spec      https://github.com/cashubtc/nuts\n  source    https://github.com/cashubtc\n\n  no company. no token. no treasury.\n-->",
          }}
        />
        <ConsoleSignature />
        <Keymap />
        {children}
      </body>
    </html>
  );
}
