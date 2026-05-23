import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import ConsoleSignature from "@/components/console-signature";
import "./globals.css";

const gtStandard = localFont({
  src: [
    {
      path: "../../public/fonts/gt-standard/GT-Standard-M-Standard-Light-Trial.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/gt-standard/GT-Standard-M-Standard-Light-Oblique-Trial.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/gt-standard/GT-Standard-M-Standard-Regular-Trial.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/gt-standard/GT-Standard-M-Standard-Regular-Oblique-Trial.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/gt-standard/GT-Standard-M-Standard-Medium-Trial.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/gt-standard/GT-Standard-M-Standard-Medium-Oblique-Trial.woff2",
      weight: "500",
      style: "italic",
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
    {
      path: "../../public/fonts/gt-standard/GT-Standard-M-Standard-Bold-Trial.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/gt-standard/GT-Standard-M-Standard-Bold-Oblique-Trial.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/gt-standard/GT-Standard-M-Standard-Heavy-Trial.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/gt-standard/GT-Standard-M-Standard-Heavy-Oblique-Trial.woff2",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-gt",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cashu.space"),
  title: "Cashu",
  description:
    "Cashu is ecash for bitcoin. An open Chaumian protocol. No company, no token, no treasury.",
  openGraph: {
    title: "Cashu",
    description:
      "Cashu is ecash for bitcoin. An open Chaumian protocol. No company, no token, no treasury.",
    url: "https://cashu.space",
    siteName: "Cashu",
    type: "website",
    images: [
      {
        url: "/og.png",
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
    images: ["/og.png"],
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
    >
      <body className="min-h-full flex flex-col">
        <div
          hidden
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              "<!--\n  cashu.space — the open specification\n\n  document  landing\n  spec      https://github.com/cashubtc/nuts\n  source    https://github.com/cashubtc\n\n  no company. no token. no treasury.\n-->",
          }}
        />
        <ConsoleSignature />
        {children}
      </body>
    </html>
  );
}
