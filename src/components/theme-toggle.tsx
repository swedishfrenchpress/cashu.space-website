"use client";

/**
 * ThemeToggle — flips the site between light and dark by writing
 * data-theme on <html>, which every consumer already watches: the CSS
 * tokens and the hero AsciiField.
 *
 * Choosing the scheme the OS already prefers clears the override
 * entirely, so the site returns to following the OS setting live. The
 * choice persists via localStorage, applied before first paint by the
 * inline boot script in layout.tsx.
 *
 * Which icon shows is pure CSS driven by the same token cascade
 * (media query + data-theme), so the server markup never depends on
 * client theme state — no hydration mismatch.
 */
export default function ThemeToggle() {
  const toggle = () => {
    const el = document.documentElement;
    const osDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = el.dataset.theme
      ? el.dataset.theme === "dark"
      : osDark;
    const next = isDark ? "light" : "dark";
    try {
      if ((next === "dark") === osDark) {
        delete el.dataset.theme;
        localStorage.removeItem("theme");
      } else {
        el.dataset.theme = next;
        localStorage.setItem("theme", next);
      }
    } catch {
      el.dataset.theme = next;
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle focus-ring"
      aria-label="Toggle color scheme"
      onClick={toggle}
    >
      {/* Sun shows in dark (click → light), moon shows in light. */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="theme-toggle__sun"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4.25" />
        <line x1="12" y1="2.5" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="21.5" />
        <line x1="2.5" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="21.5" y2="12" />
        <line x1="5.3" y1="5.3" x2="7" y2="7" />
        <line x1="17" y1="17" x2="18.7" y2="18.7" />
        <line x1="18.7" y1="5.3" x2="17" y2="7" />
        <line x1="7" y1="17" x2="5.3" y2="18.7" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="theme-toggle__moon"
        aria-hidden
      >
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" />
      </svg>
    </button>
  );
}
