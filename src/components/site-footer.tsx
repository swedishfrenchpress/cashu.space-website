import { CashuMark } from "./cashu-mark";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] =
  [
    {
      heading: "Protocol",
      links: [
        { label: "Specification", href: "/spec" },
        { label: "Documentation", href: "/docs" },
        { label: "NUTs", href: "/spec/nuts" },
        { label: "Tokens", href: "/tokens" },
      ],
    },
    {
      heading: "Implementations",
      links: [
        { label: "Wallets", href: "/wallets" },
        { label: "Mints", href: "/mints" },
        { label: "Libraries", href: "/libraries" },
        { label: "Run a mint", href: "/mints/run" },
      ],
    },
    {
      heading: "Community",
      links: [
        { label: "GitHub", href: "https://github.com/cashubtc" },
        { label: "Nostr", href: "#" },
        { label: "Telegram", href: "#" },
        { label: "Contributors", href: "/contributors" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "/faq" },
        { label: "Brand", href: "/brand" },
        { label: "Press", href: "/press" },
      ],
    },
  ];

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200">
      <div className="page-shell pt-16 lg:pt-24 pb-12 lg:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <a
            href="/"
            className="flex items-center gap-2.5 text-lg font-semibold tracking-tight"
          >
            <CashuMark className="h-7 w-7" />
            <span>cashu</span>
          </a>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-[36ch]">
            An open protocol for bearer ecash on bitcoin. Operated by no one,
            implemented by many.
          </p>
          <p className="text-xs text-zinc-400 font-pixel uppercase tracking-wider">
            © 2026 · Released under MIT
          </p>
        </div>

        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h3 className="font-pixel uppercase tracking-wider text-[11px] text-zinc-500">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-black hover:text-zinc-500 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
