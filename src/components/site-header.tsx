"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Reveal from "./reveal";
import ThemeToggle from "./theme-toggle";

type NavItem = { label: string; href: string; external?: boolean };

const NAV_ITEMS: NavItem[] = [
  { label: "Wallets", href: "/wallets" },
  { label: "Protocol", href: "/#why-cashu" },
  { label: "Spec", href: "https://docs.cashu.space/", external: true },
  { label: "Implementations", href: "/#implementations" },
];

/*
 * Condense hysteresis. The box appears once the page has clearly scrolled
 * and only lets go near the very top, so the 300ms transition can't be made
 * to flicker by hovering the threshold.
 */
const CONDENSE_ON_Y = 24;
const CONDENSE_OFF_Y = 8;

/**
 * Onyx-pattern top bar (DESIGN.md §5 Navigation): at rest a transparent
 * strip inset 10px from the viewport edge — logo left, anchor links
 * centered, GitHub chip right at lg+; brand + hamburger below lg. On
 * scroll (or with the panel open) the frame condenses into a floating
 * glass box — the navbar's documented exception to the flat doctrine
 * (DESIGN.md §4); everything inside the box stays square. The chip is
 * secondary by doctrine — GitHub is not one of the two primary jobs
 * (get a wallet, read the spec; the Two-CTA Rule, DESIGN.md §1).
 *
 * There is one scheme. An `onInk` prop once branched the bar to an
 * inverted variant for dark-ground routes, carrying its own shell, nav,
 * and panel modifiers plus a parallel set of CSS rules — but no route
 * ever passed it, and both routes that exist open on Paper. The dead
 * branch had already drifted (its glass hardcoded rgba(9,9,11,…) where
 * every live token uses rgba(10,10,11,…)), which is the usual fate of
 * code nothing renders. If an Ink-ground route arrives, rebuild the
 * variant against the tokens rather than reviving this.
 */
export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  /* Route-level only: a link is current when the visitor is on its page.
     In-page anchors (Protocol, Implementations) are not marked — the page
     they point into is the one being read either way, and claiming
     "current" for a section the reader has scrolled past would be a lie. */
  const isCurrent = (item: NavItem) =>
    !item.external && !item.href.includes("#") && pathname === item.href;

  // Close the panel on Escape — standard menu accessibility.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Auto-close on route change so the menu doesn't linger after navigation.
  // State is adjusted during render (the endorsed derived-state pattern)
  // rather than in an effect, so the closed frame is what actually paints.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  /* Scroll-condense driver, rAF-throttled. Runs once on mount too: an
     anchor arrival (/#implementations) starts mid-page and must land with
     the box already formed, not watch it assemble. */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setCondensed((prev) =>
        prev ? window.scrollY > CONDENSE_OFF_Y : window.scrollY > CONDENSE_ON_Y,
      );
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    /* rAF, not a direct call: runs pre-paint, so an anchor arrival still
       lands with the box formed, without setState in the effect body. */
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* --nav-h drives the hero's fold line, and it ships as a hand-measured
     constant that silently goes stale the moment the bar's type or padding
     changes. The CSS value still paints the first frame (no flash, and the
     layout never depends on JS); this only replaces it with what the bar
     actually measures, and keeps it true through font loading and resize.

     The bar row is measured, not the shell or frame: the mobile panel lives
     inside the frame and would otherwise fold its open height into the
     token. Row height + the shell's top inset + the frame's borders is the
     same derivation the CSS token comment documents. */
  useEffect(() => {
    const row = navRef.current;
    if (!row || typeof ResizeObserver === "undefined") return;

    const sync = () => {
      const shell = row.closest(".site-header-shell");
      const frame = row.closest(".site-nav-frame");
      const inset = shell
        ? parseFloat(getComputedStyle(shell).paddingTop) || 0
        : 0;
      const frameStyle = frame ? getComputedStyle(frame) : null;
      const borders = frameStyle
        ? (parseFloat(frameStyle.borderTopWidth) || 0) +
          (parseFloat(frameStyle.borderBottomWidth) || 0)
        : 0;
      const h = Math.ceil(
        row.getBoundingClientRect().height + inset + borders,
      );
      if (h > 0) {
        document.documentElement.style.setProperty("--nav-h", `${h}px`);
      }
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(row);
    document.fonts?.ready.then(sync).catch(() => {});
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`site-header-shell${condensed || isOpen ? " is-condensed" : ""}`}
    >
      {/* The frame is the condensing box; the open panel must sit inside it
          so the glass ground wraps the dropped links too. isOpen forces the
          condensed state for the same reason: an open menu over an
          un-scrolled page still needs a ground to read against. */}
      <div className="site-nav-frame">
        <Reveal immediate variant="fade" as="div">
          <nav
            ref={navRef}
            aria-label="Primary"
            className={`site-nav${isOpen ? " is-open" : ""}`}
          >
            <Link href="/" className="site-nav__brand focus-ring">
              <Image
                src="/cashu-no-bg.png"
                alt=""
                width={32}
                height={32}
                priority
                className="site-nav__logo"
              />
              <span className="site-nav__wordmark">Cashu</span>
            </Link>

            <ul className="site-nav__list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="site-nav__link focus-ring"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={`site-nav__link focus-ring${
                        isCurrent(item) ? " is-current" : ""
                      }`}
                      aria-current={isCurrent(item) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="site-nav__actions">
              <ThemeToggle />
              <a
                href="https://github.com/cashubtc"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary site-nav__cta"
              >
                View on GitHub
              </a>

              <button
                type="button"
                className="site-nav__toggle focus-ring"
                aria-expanded={isOpen}
                aria-controls="site-nav-panel"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsOpen((o) => !o)}
              >
                <span
                  className={`site-nav__toggle-icon${
                    isOpen ? " is-open" : ""
                  }`}
                  aria-hidden
                >
                  <span />
                  <span />
                </span>
              </button>
            </div>
          </nav>
        </Reveal>

        {/* Mobile-only collapsible panel. Uses the grid-template-rows
            0fr→1fr trick to animate to auto height without javascript
            measurement. Rendered always for stable accessibility tree;
            hidden visually & from AT when closed. */}
        <div
          id="site-nav-panel"
          className={`site-nav-panel${isOpen ? " is-open" : ""}`}
          aria-hidden={!isOpen}
        >
          <div className="site-nav-panel__inner">
            <ul className="site-nav-panel__list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="site-nav-panel__link focus-ring"
                      onClick={() => setIsOpen(false)}
                      tabIndex={isOpen ? 0 : -1}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={`site-nav-panel__link focus-ring${
                        isCurrent(item) ? " is-current" : ""
                      }`}
                      aria-current={isCurrent(item) ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      tabIndex={isOpen ? 0 : -1}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <a
              href="https://github.com/cashubtc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary site-nav-panel__cta"
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
