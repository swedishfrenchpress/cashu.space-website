"use client";

import { useState } from "react";

type TabId = "wallets" | "mints" | "spec" | "tokens";

type Tab = {
  id: TabId;
  label: string;
  caption: string;
  cta: string;
  href: string;
};

const TABS: Tab[] = [
  {
    id: "wallets",
    label: "Wallets",
    caption:
      "Pick a wallet, hold ecash on your phone. Cashu wallets are independent, open-source, and free.",
    cta: "Explore wallets",
    href: "/wallets",
  },
  {
    id: "mints",
    label: "Mints",
    caption:
      "Mints redeem ecash for bitcoin over Lightning. Run your own or trust a community-operated one.",
    cta: "Explore mints",
    href: "/mints",
  },
  {
    id: "spec",
    label: "Spec",
    caption:
      "The protocol is a public specification. Every byte is documented; every NUT is open for review.",
    cta: "Read the spec",
    href: "/spec",
  },
  {
    id: "tokens",
    label: "Tokens",
    caption:
      "Cashu tokens are bearer blobs of bitcoin. Send them in a chat, a QR, an email, a file.",
    cta: "Understand tokens",
    href: "/tokens",
  },
];

export default function TabbedFeature() {
  const [activeId, setActiveId] = useState<TabId>("wallets");
  const active = TABS.find((t) => t.id === activeId)!;

  return (
    <section className="page-shell pt-16 lg:pt-24 pb-24 lg:pb-32">
      <div className="flex flex-col items-center gap-12 lg:gap-16">
        <h2 className="text-center text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight leading-[1.05]">
          Cashu where bitcoin flows.
        </h2>

        <div className="w-full aspect-[16/9] bg-black overflow-hidden relative">
          <div
            key={active.id}
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-0 animate-[fadeIn_200ms_ease-out_forwards]"
          >
            <span className="font-pixel uppercase tracking-wider text-xs text-zinc-400">
              Fig. 02 · {active.label} · placeholder
            </span>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Cashu pillars"
          className="flex gap-3 overflow-x-auto max-w-full px-2 -mx-2 scrollbar-none"
        >
          {TABS.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(tab.id)}
                className={
                  isActive
                    ? "inline-flex items-center bg-black text-white px-5 py-3 text-sm font-medium tracking-tight whitespace-nowrap transition-colors"
                    : "inline-flex items-center bg-transparent text-zinc-500 hover:text-black border border-zinc-200 px-5 py-3 text-sm font-medium tracking-tight whitespace-nowrap transition-colors"
                }
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <p
          key={`caption-${active.id}`}
          className="max-w-[60ch] mx-auto text-center text-zinc-700 text-base lg:text-lg leading-relaxed opacity-0 animate-[fadeIn_200ms_ease-out_forwards]"
        >
          {active.caption}
        </p>

        <a
          key={`cta-${active.id}`}
          href={active.href}
          className="inline-flex items-center bg-black hover:bg-zinc-800 transition-colors px-6 py-3.5 text-sm font-medium text-white"
        >
          {active.cta}
        </a>
      </div>
    </section>
  );
}
