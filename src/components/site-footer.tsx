// Footer — "The Twilight Stack" (DESIGN.md §5): an Ink band closing the
// page, with a monochrome radial bloom + faint paper grain (both in CSS).
// A Display wordmark and a "Read the spec" CTA give it a compositional
// peak; the black section above flows straight in. Flat and sharp — the
// CTA carries the only lift.

const AI_PROMPT = "Explain the Cashu protocol: what it is, how it works, and why it matters.";

const AI_LINKS: { name: string; href: string; icon: string; invert?: boolean }[] = [
  {
    name: "ChatGPT",
    href: `https://chatgpt.com/?q=${encodeURIComponent(AI_PROMPT)}`,
    icon: "/ai/openai.svg",
    // OpenAI's mark is solid black — invert it to Paper on the Ink footer.
    invert: true,
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
          {/* Sign-off — the footer's compositional peak: Display wordmark and
              one quiet line, with the closing CTA baseline-aligned right. */}
          <div className="footer-signoff">
            <div>
              <div className="footer-signoff__mark">Cashu</div>
              <p className="footer-signoff__line t-body-lead">The open specification.</p>
            </div>
            <ExternalLink
              href="https://github.com/cashubtc/nuts"
              className="btn-primary--on-ink"
            >
              Read the spec
            </ExternalLink>
          </div>

          {/* RFC metadata strip — spec repo left, descriptor right. Echoes the
              two-cell mono header device used on the spec code pane. */}
          <div className="footer-metastrip t-mono">
            <span>cashubtc/nuts</span>
            <span className="footer-metastrip__meta">Chaumian ecash for Bitcoin</span>
          </div>

          {/* Bottom: socials + legal on left, Ask-AI on right */}
          <div className="footer-card__bottom">
            <div className="footer-card__bottom-left">
              <div className="footer-socials">
                <ExternalLink
                  href="https://x.com/CashuBTC"
                  className="footer-social focus-ring--on-ink"
                >
                  <span className="sr-only">X (Twitter)</span>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </ExternalLink>
                <ExternalLink
                  href="https://primal.net/p/nprofile1qqs0y3tvskgs9gpgxxu5ahgz3fmms3rzmxt504qceqtz4a6pdgfwlkghwl6j8"
                  className="footer-social focus-ring--on-ink"
                >
                  <span className="sr-only">Nostr</span>
                  <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
                    <path d="M210.8 199.4c0 3.1-2.5 5.7-5.7 5.7h-68c-3.1 0-5.7-2.5-5.7-5.7v-15.5c.3-19 2.3-37.2 6.5-45.5 2.5-5 6.7-7.7 11.5-9.1 9.1-2.7 24.9-.9 31.7-1.2 0 0 20.4.8 20.4-10.7s-9.1-8.6-9.1-8.6c-10 .3-17.7-.4-22.6-2.4-8.3-3.3-8.6-9.2-8.6-11.2-.4-23.1-34.5-25.9-64.5-20.1-32.8 6.2.4 53.3.4 116.1v8.4c0 3.1-2.6 5.6-5.7 5.6H57.7c-3.1 0-5.7-2.5-5.7-5.7v-144c0-3.1 2.5-5.7 5.7-5.7h31.7c3.1 0 5.7 2.5 5.7 5.7 0 4.7 5.2 7.2 9 4.5 11.4-8.2 26-12.5 42.4-12.5 36.6 0 64.4 21.4 64.4 68.7v83.2ZM150 99.3c0-6.7-5.4-12.1-12.1-12.1s-12.1 5.4-12.1 12.1 5.4 12.1 12.1 12.1S150 106 150 99.3Z"/>
                  </svg>
                </ExternalLink>
                <ExternalLink
                  href="https://github.com/cashubtc"
                  className="footer-social focus-ring--on-ink"
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
              </div>
            </div>

            <div className="footer-card__bottom-right">
              <span className="t-label footer-ask-label">Ask AI about Cashu</span>
              <div className="footer-ai">
                {AI_LINKS.map((ai) => (
                  <ExternalLink
                    key={ai.name}
                    href={ai.href}
                    className="footer-ai__link focus-ring--on-ink"
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
                      className={
                        ai.invert
                          ? "footer-ai__logo footer-ai__logo--invert"
                          : "footer-ai__logo"
                      }
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
