const PROPERTIES = [
  "Bearer",
  "Offline-capable",
  "Open spec",
  "MIT-licensed",
  "Lightning-native",
  "Chaumian blind signatures",
  "No accounts",
  "No custodial APIs",
  "Self-hostable",
  "Interoperable wallets",
  "Auditable mints",
  "Free to use",
];

const FEATURES = [
  {
    title: "Bearer by design",
    body: "A Cashu token is the money. Hold it, send it, redeem it. No ledger reconciles the owner — possession is the proof.",
    icon: BearerIcon,
  },
  {
    title: "Private by default",
    body: "Blind signatures mean the mint cannot link who minted a token to who redeems it. Privacy is a property of the math, not a policy.",
    icon: PrivacyIcon,
  },
  {
    title: "No accounts, no logins",
    body: "Cashu wallets do not register users. There is nothing to sign up for, nothing to recover, nothing to leak.",
    icon: AccountsIcon,
  },
];

export default function ProtocolProperties() {
  return (
    <section className="page-shell pt-16 lg:pt-24 pb-16 lg:pb-24">
      <div className="bg-zinc-100 p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col gap-12 lg:gap-16">
        <ul className="flex flex-wrap gap-2">
          {PROPERTIES.map((p) => (
            <li
              key={p}
              className="inline-flex items-center bg-white border border-zinc-200 px-4 py-2 text-xs text-zinc-700"
            >
              {p}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {FEATURES.map(({ title, body, icon: Icon }) => (
            <div
              key={title}
              className="bg-white p-8 lg:p-10 flex flex-col gap-4"
            >
              <Icon className="h-7 w-7 text-black" />
              <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BearerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M3 10h18" />
      <circle cx="8.5" cy="14.5" r="1.5" />
    </svg>
  );
}

function PrivacyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M9.5 12l2 2 3.5-4" />
    </svg>
  );
}

function AccountsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="9" r="3.5" />
      <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
      <path d="M4 4l16 16" />
    </svg>
  );
}
