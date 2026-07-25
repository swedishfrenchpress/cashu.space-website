"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Reveal from "./reveal";
import ThemeToggle from "./theme-toggle";

type SiteHeaderProps = {
  /** Inverted scheme for on-Ink routes (e.g. /wallets). */
  onInk?: boolean;
};

type NavItem = { label: string; href: string; external?: boolean };

const NAV_ITEMS: NavItem[] = [
  { label: "Wallets", href: "/wallets" },
  { label: "Protocol", href: "/#why-cashu" },
  { label: "Spec", href: "https://docs.cashu.space/", external: true },
  { label: "Implementations", href: "/#implementations" },
];

/**
 * Warp-style top bar. A full-width transparent glass strip pinned to the top
 * of the viewport: logo left, anchor links centered, GitHub chip right at
 * lg+; brand + hamburger toggle below lg, with the panel dropping the four
 * nav items + the GitHub CTA into a glass card beneath the bar. The glass
 * background + backdrop-blur are the navbar's documented exception to the
 * flat doctrine (DESIGN.md §4); the bar and its chip stay square. The chip
 * is secondary by doctrine — GitHub is not one of the two primary jobs
 * (get a wallet, read the spec; the Two-CTA Rule, DESIGN.md §1).
 */
export default function SiteHeader({ onInk = false }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const ctaClass = onInk ? "btn-secondary--on-ink" : "btn-secondary";

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
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  /* --nav-h drives the hero's fold line, and it ships as a hand-measured
     constant that silently goes stale the moment the bar's type or padding
     changes. The CSS value still paints the first frame (no flash, and the
     layout never depends on JS); this only replaces it with what the bar
     actually measures, and keeps it true through font loading and resize.

     The bar row is measured, not the shell: the mobile panel lives inside
     the shell and would otherwise fold its open height into the token. Row
     height + the shell's hairline is the same derivation the CSS comment
     documents. */
  useEffect(() => {
    const row = navRef.current;
    if (!row || typeof ResizeObserver === "undefined") return;

    const sync = () => {
      const shell = row.closest(".site-header-shell");
      const hairline = shell
        ? parseFloat(getComputedStyle(shell).borderBottomWidth) || 0
        : 0;
      const h = Math.ceil(row.getBoundingClientRect().height + hairline);
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
      className={`site-header-shell${onInk ? " site-header-shell--on-ink" : ""}`}
    >
      <div className="page-shell">
        <Reveal immediate variant="fade" as="div">
          <nav
            ref={navRef}
            aria-label="Primary"
            className={`site-nav${onInk ? " site-nav--on-ink" : ""}${
              isOpen ? " is-open" : ""
            }`}
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
                className={`${ctaClass} site-nav__cta`}
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
          className={`site-nav-panel${onInk ? " site-nav-panel--on-ink" : ""}${
            isOpen ? " is-open" : ""
          }`}
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
              className={`${ctaClass} site-nav-panel__cta`}
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
