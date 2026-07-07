"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Reveal from "./reveal";

type TabId = "wallets" | "mints" | "spec" | "tokens";

type Tab = {
  id: TabId;
  label: string;
  title: string;
  caption: string;
  cta: string;
  href: string;
  external?: boolean;
  image: string;
};

const TABS: Tab[] = [
  {
    id: "wallets",
    label: "Wallets",
    title: "Hold ecash on your phone.",
    caption:
      "Independent, open-source, and free. Run a cashu wallet on iOS, Android, or in the browser.",
    cta: "Explore wallets",
    href: "/wallets",
    image: "/canyon.jpg",
  },
  {
    id: "mints",
    label: "Mints",
    title: "Backed by bitcoin.",
    caption:
      "Mints bridge Lightning and ecash. Run your own, or trust a community-operated one.",
    cta: "Explore mints",
    href: "/mints",
    image: "/forest.jpg",
  },
  {
    id: "spec",
    label: "Spec",
    title: "Every byte, in the open.",
    caption:
      "Documented in version-controlled NUTs. Read them, fork them, propose your own.",
    cta: "Read the spec",
    href: "https://docs.cashu.space/",
    external: true,
    image: "/peaks.jpg",
  },
  {
    id: "tokens",
    label: "Tokens",
    title: "Send money like a message.",
    caption:
      "Tokens are bearer strings of bitcoin. Send them in a chat, a QR, an email, a file.",
    cta: "Understand tokens",
    href: "/tokens",
    image: "/flatiron-ascii.jpg",
  },
];

/**
 * TabbedFeature — warp-style "why us" section. A sticky left tab-list
 * tracks a scrolling stack of feature blocks on the right (scroll-spy via
 * IntersectionObserver). This replaces the earlier scroll-jacked, sticky-
 * pinned crossfade: the page scrolls normally, and the observer only
 * updates which nav item is highlighted. Clicking a nav item scrolls its
 * block into view. Below lg the nav collapses to a horizontal jump row and
 * the blocks stack in document order — no observer needed for correctness.
 */
export default function TabbedFeature() {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // A zero-height band across the viewport middle: whichever block spans
    // the centerline is the active one. No throttling / scroll math needed.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.index ?? 0,
            );
            setActive(idx);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    for (const el of blockRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollToBlock = (i: number) => {
    blockRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section className="feature-scroller section-y-air" aria-label="Why Cashu">
      <div className="page-shell">
        <header className="feature-scroller__head">
          <Reveal>
            <p className="section-eyebrow">Why Cashu</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="t-headline">The protocol, in four parts.</h2>
          </Reveal>
        </header>

        <div className="feature-scroller__body">
          <nav className="feature-nav" aria-label="Cashu pillars">
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                type="button"
                className={`feature-nav__item focus-ring${
                  i === active ? " is-active" : ""
                }`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => scrollToBlock(i)}
              >
                <span className="feature-nav__num" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="feature-nav__label">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="feature-track">
            {TABS.map((tab, i) => (
              <article
                key={tab.id}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
                data-index={i}
                className="feature-block"
              >
                <Reveal variant="fade" slow>
                  <div className="feature-media">
                    <Image
                      src={tab.image}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(min-width: 1024px) 62vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
                <div className="feature-block__text">
                  <h3 className="t-headline feature-block__title">
                    {tab.title}
                  </h3>
                  <p className="t-body-lead feature-block__caption">
                    {tab.caption}
                  </p>
                  {tab.external ? (
                    <a
                      href={tab.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <span>{tab.cta}</span>
                    </a>
                  ) : (
                    <Link href={tab.href} className="btn-secondary">
                      <span>{tab.cta}</span>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
