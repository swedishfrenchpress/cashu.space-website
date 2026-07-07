import Image from "next/image";
import Link from "next/link";
import Reveal from "./reveal";

// Footer — light, full-width band unified with the rest of the site. A
// single hairline top border separates it from the section above; no
// photographic backdrop, no floating card. Flat and sharp per doctrine.

type FooterLink = { label: string; href: string; external?: boolean };

const COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Protocol",
    links: [
      {
        label: "Specification",
        href: "https://github.com/cashubtc/nuts",
        external: true,
      },
      {
        label: "NUTs",
        href: "https://github.com/cashubtc/nuts#nuts",
        external: true,
      },
    ],
  },
  {
    heading: "Implementations",
    links: [
      { label: "Wallets", href: "/wallets" },
      {
        label: "Source",
        href: "https://github.com/cashubtc",
        external: true,
      },
    ],
  },
  {
    heading: "Resources",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/cashubtc",
        external: true,
      },
      {
        label: "NUT-00",
        href: "https://github.com/cashubtc/nuts/blob/main/00.md",
        external: true,
      },
    ],
  },
  {
    heading: "Community",
    links: [
      {
        label: "Nostr",
        href: "https://njump.me/cashu",
        external: true,
      },
      {
        label: "Telegram",
        href: "https://t.me/CashuBTC",
        external: true,
      },
      {
        label: "OpenCash",
        href: "https://opencash.dev/",
        external: true,
      },
    ],
  },
];

const AI_PROMPT = "Explain the Cashu protocol: what it is, how it works, and why it matters.";

const AI_LINKS: { name: string; href: string; icon: string }[] = [
  {
    name: "ChatGPT",
    href: `https://chatgpt.com/?q=${encodeURIComponent(AI_PROMPT)}`,
    icon: "/ai/openai.svg",
  },
  {
    name: "Claude",
    href: `https://claude.ai/new?q=${encodeURIComponent(AI_PROMPT)}`,
    icon: "/ai/claude.svg",
  },
  {
    name: "Gemini",
    href: `https://gemini.google.com/app?q=${encodeURIComponent(AI_PROMPT)}`,
    icon: "/ai/gemini.svg",
  },
];

function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

export default function SiteFooter() {
  return (
    <footer className="footer-specimen relative isolate">
      <div className="page-shell relative" style={{ paddingBlock: "clamp(64px, 9vw, 160px)" }}>
        <div className="footer-card">
          {/* Top: cashu mark + four nav columns */}
          <div className="footer-card__top">
            <Reveal>
              <Link href="/" aria-label="Cashu home" className="footer-mark focus-ring">
                <Image
                  src="/cashu-no-bg.png"
                  alt="Cashu"
                  width={48}
                  height={48}
                />
              </Link>
            </Reveal>

            <div className="footer-card__columns">
              {COLUMNS.map((col, i) => (
                <Reveal key={col.heading} delay={80 * (i + 1)}>
                  <div className="flex flex-col gap-4">
                    <h3 className="t-title text-zinc-500">
                      {col.heading}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          {link.external ? (
                            <ExternalLink
                              href={link.href}
                              className="footer-link t-label focus-ring"
                            >
                              {link.label}
                            </ExternalLink>
                          ) : (
                            <a
                              href={link.href}
                              className="footer-link t-label focus-ring"
                            >
                              {link.label}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Bottom: socials + legal on left, Ask-AI on right */}
          <div className="footer-card__bottom">
            <div className="footer-card__bottom-left">
              <div className="footer-socials">
                <ExternalLink
                  href="https://x.com/CashuBTC"
                  className="footer-social focus-ring"
                >
                  <span className="sr-only">X (Twitter)</span>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </ExternalLink>
                <ExternalLink
                  href="https://github.com/cashubtc"
                  className="footer-social focus-ring"
                >
                  <span className="sr-only">GitHub</span>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.39-5.26 5.68.41.35.78 1.05.78 2.12v3.14c0 .31.21.68.79.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
                  </svg>
                </ExternalLink>
              </div>
              <div className="footer-legal">
                <span className="t-label">© 2026</span>
                <span className="footer-legal__sep" aria-hidden>·</span>
                <span className="t-label">MIT Licensed</span>
                <span className="footer-legal__sep" aria-hidden>·</span>
                <ExternalLink
                  href="https://github.com/cashubtc/nuts"
                  className="footer-link t-label focus-ring"
                >
                  Read the spec
                </ExternalLink>
              </div>
            </div>

            <div className="footer-card__bottom-right">
              <span className="t-label footer-ask-label">Ask AI about Cashu</span>
              <div className="footer-ai">
                {AI_LINKS.map((ai) => (
                  <ExternalLink
                    key={ai.name}
                    href={ai.href}
                    className="footer-ai__link focus-ring"
                  >
                    <span className="sr-only">{ai.name}</span>
                    {/* Static-asset SVG; rendered as a plain <img> so the
                        Next.js image optimizer (which blocks SVG by
                        default) stays out of the path. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ai.icon}
                      alt=""
                      width={14}
                      height={14}
                      className="footer-ai__logo"
                      aria-hidden
                    />
                  </ExternalLink>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer — credit the protocol, name the constraint */}
          <p className="footer-disclaimer t-body">
            Cashu is a free, open protocol for Chaumian ecash. It has no
            company, no token, no treasury. Only a specification, and the
            implementations that follow it. Mints are operated by independent
            parties; balances held with a mint are a claim on that mint, not a
            deposit. Read the spec before trusting anyone, including us.
          </p>
        </div>
      </div>
    </footer>
  );
}
