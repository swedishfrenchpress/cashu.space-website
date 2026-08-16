"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import NavClock from "./nav-clock";
import NewTabHint from "./new-tab-hint";
import Reveal from "./reveal";
import ThemeToggle from "./theme-toggle";

type NavItem = { label: string; href: string; external?: boolean };

const NAV_ITEMS: NavItem[] = [
  { label: "Wallets", href: "/wallets" },
  { label: "Protocol", href: "/#why-cashu" },
  { label: "Spec", href: "https://docs.cashu.space/", external: true },
  { label: "Implementations", href: "/#implementations" },
];

/**
 * The label and the plate that wipes over it. Two stacked copies of the same
 * word: the base sits Paper-on-ink, the plate sits ink-on-Paper and is
 * clipped to zero width until hover. Because the plate carries its own text,
 * the wipe edge passes *through* the letterforms — each one flips as the
 * plate reaches it — instead of a background sliding under a label that has
 * already changed colour and gone invisible over the part not yet covered.
 *
 * A real aria-hidden element, not `content: attr(...)`: VoiceOver announces
 * generated content, and a nav that reads every destination twice is worse
 * than a nav with no hover effect at all.
 */
function NavLabel({ label }: { label: string }) {
  return (
    <>
      {label}
      <span className="site-nav__plate" aria-hidden>
        {label}
      </span>
    </>
  );
}

/**
 * Masthead bar (DESIGN.md §5 Navigation), user-directed 2026-08-16 against a
 * layout reference. Full-bleed, always: a brand plate hard against the left
 * edge, then one uninterrupted ink run to the right edge carrying the UTC
 * clock, the links, and the controls. The plate is the page punched through
 * the bar — Paper ground and Ink text, so it follows the scheme instead of
 * sitting there as a permanent white slab at night.
 *
 * Two features of the reference shipped and were rejected on sight (second
 * pass, same day): an open slot column between the clock and the links, which
 * read as a hole punched in the bar rather than a window onto the page, and a
 * pixel-dither strip along the bottom edge, which read as noise under it.
 * Both are gone; the bar is continuous and meets the page on a clean line.
 * Don't reintroduce either.
 *
 * This replaced the Onyx two-state bar (transparent at rest → floating glass
 * box on scroll). The two are not compatible — a full-bleed segmented bar and
 * a rounded box that pulls in from the viewport edges are opposite gestures —
 * and the reference is the bar the site now wants. Retired with it: the
 * condense hysteresis, the settle-delayed --nav-h guard, `--nav-inset`,
 * `--nav-condensed-max`, and `--nav-shadow`. That last one was the site's
 * only sanctioned box-shadow and the glass was its only translucent surface,
 * so the No-Shadow Rule and the anti-glassmorphism verdict are now absolute
 * again — there is no exception left to point at.
 *
 * There is one scheme. An `onInk` prop once branched the bar to an inverted
 * variant for dark-ground routes; no route ever passed it and it is gone. The
 * bar is ink-ground in both schemes now, which is what that branch was for.
 */
export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
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

  /* --nav-h drives the hero's fold line and every anchor's scroll-margin,
     and it ships as a hand-measured constant that silently goes stale the
     moment the bar's type or padding changes. The CSS value still paints the
     first frame (no flash, and the layout never depends on JS); this only
     replaces it with what the bar actually measures, and keeps it true
     through font loading and resize.

     The row, not the shell: the mobile panel lives in the shell and would
     otherwise fold its open height into the token. With the condense gone
     the bar has exactly one height, so this no longer needs the rest-height
     guard and settle delay the two-state version carried — nothing about the
     bar animates its own size any more. */
  useEffect(() => {
    const row = navRef.current;
    if (!row || typeof ResizeObserver === "undefined") return;

    const sync = () => {
      const h = Math.ceil(row.getBoundingClientRect().height);
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
    <header className="site-header-shell">
      <Reveal immediate variant="fade" as="div">
        <nav ref={navRef} aria-label="Primary" className="site-nav">
          {/* Lead. The brand plate stretches the full row height and sits
              hard against the viewport edge — the one place the bar breaks
              its ink, and the only part of it that follows the scheme. */}
          <div className="site-nav__lead">
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
            <NavClock />
          </div>

          <div className="site-nav__tail">
            <ul className="site-nav__list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="site-nav__link focus-ring--on-ink"
                    >
                      <NavLabel label={item.label} />
                      <NewTabHint />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={`site-nav__link focus-ring--on-ink${
                        isCurrent(item) ? " is-current" : ""
                      }`}
                      aria-current={isCurrent(item) ? "page" : undefined}
                    >
                      <NavLabel label={item.label} />
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="site-nav__actions">
              <ThemeToggle />
              {/* One state: the mark. The octocat names GitHub more directly
                  than a label would, and the control is secondary by doctrine
                  — GitHub is not one of the two primary jobs (get a wallet,
                  read the spec; the Two-CTA Rule, DESIGN.md §1). It carries no
                  .btn-* class, so the base button rule ("no icons inside
                  buttons") is not in play and the hover cipher never attaches:
                  that pass blanks currentColor, which would erase a glyph
                  rather than scramble a label.

                  aria-label is what names the control now that the only child
                  is an aria-hidden glyph; without it the link would announce
                  as "link, https://github.com/cashubtc". */}
              <a
                href="https://github.com/cashubtc"
                target="_blank"
                rel="noopener noreferrer"
                className="site-nav__cta focus-ring--on-ink"
                aria-label="View on GitHub (opens in a new tab)"
              >
                <svg
                  className="site-nav__cta-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.39-5.26 5.68.41.35.78 1.05.78 2.12v3.14c0 .31.21.68.79.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                </svg>
              </a>

              <button
                type="button"
                className="site-nav__toggle focus-ring--on-ink"
                aria-expanded={isOpen}
                aria-controls="site-nav-panel"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsOpen((o) => !o)}
              >
                <span
                  className={`site-nav__toggle-icon${isOpen ? " is-open" : ""}`}
                  aria-hidden
                >
                  <span />
                  <span />
                </span>
              </button>
            </div>
          </div>
        </nav>
      </Reveal>

      {/* Mobile-only collapsible panel. Uses the grid-template-rows 0fr→1fr
          trick to animate to auto height without javascript measurement.
          Rendered always for a stable accessibility tree; hidden visually and
          from AT when closed. It carries the bar's own ink so an open menu
          reads as the bar getting taller, not as a sheet arriving over it. */}
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
                    className="site-nav-panel__link focus-ring--on-ink"
                    onClick={() => setIsOpen(false)}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    {item.label}
                    <NewTabHint />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`site-nav-panel__link focus-ring--on-ink${
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
            className="site-nav-panel__cta focus-ring--on-ink"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => setIsOpen(false)}
          >
            View on GitHub
            <NewTabHint />
          </a>
        </div>
      </div>
    </header>
  );
}
