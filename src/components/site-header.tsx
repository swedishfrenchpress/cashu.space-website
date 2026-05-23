import Image from "next/image";
import Link from "next/link";
import Reveal from "./reveal";

type SiteHeaderProps = {
  /** Inverted scheme for on-Ink routes (e.g. /wallets). */
  onInk?: boolean;
};

const NAV_ITEMS = [
  { label: "Wallets", href: "/wallets" },
  { label: "Why Cashu?", href: "/#why-cashu" },
  { label: "Spec", href: "/docs" },
  { label: "Implementations", href: "/#implementations" },
];

/**
 * Contained capsule navigation. Logo left, anchor links centered, primary
 * chip right — adapted from a fintech-style pill nav but sharpened to the
 * cashu register: zero radius, 1px Hair rim, no shadow on the container.
 * Buttons remain the only surface allowed to lift (DESIGN.md §5).
 */
export default function SiteHeader({ onInk = false }: SiteHeaderProps) {
  const ctaClass = onInk ? "btn-primary--on-ink" : "btn-primary";
  return (
    <header className="site-header-shell">
      <div className="page-shell">
        <Reveal immediate variant="fade" as="div">
          <nav
            aria-label="Primary"
            className={`site-nav${onInk ? " site-nav--on-ink" : ""}`}
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
              <span className="t-title">cashu</span>
            </Link>

            <ul className="site-nav__list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="site-nav__link focus-ring">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="https://github.com/cashubtc"
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClass}
            >
              View on GitHub
            </a>
          </nav>
        </Reveal>
      </div>
    </header>
  );
}
