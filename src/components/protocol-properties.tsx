type Card = {
  titleLead: string;
  titleEm: string;
  body: string;
  marquee: string;
  icon: (props: { className?: string }) => React.ReactElement;
};

const CARDS: Card[] = [
  {
    titleLead: "Bearer by",
    titleEm: "design",
    body: "A Cashu token is the money. Hold it, send it, redeem it. No ledger reconciles the owner — possession is the proof.",
    marquee: "Bearer ecash · Cashu protocol · Open spec · ",
    icon: BearerIcon,
  },
  {
    titleLead: "Private by",
    titleEm: "default",
    body: "Blind signatures mean the mint cannot link who minted a token to who redeems it. Privacy is a property of the math, not a policy.",
    marquee: "Blind signatures · Cashu protocol · Open spec · ",
    icon: PrivacyIcon,
  },
  {
    titleLead: "No accounts,",
    titleEm: "no logins",
    body: "Cashu wallets do not register users. There is nothing to sign up for, nothing to recover, nothing to leak.",
    marquee: "No accounts · Cashu protocol · Open spec · ",
    icon: AccountsIcon,
  },
];

function MarqueeCard({ card }: { card: Card }) {
  const repeated = card.marquee.repeat(16);
  const Icon = card.icon;
  return (
    <article className="relative aspect-[3/4] bg-white border border-zinc-200 overflow-hidden">
      <span
        aria-hidden
        className="pointer-events-none absolute top-3 left-10 right-10 overflow-hidden whitespace-nowrap font-mono text-[10px] tracking-[0.15em] uppercase text-zinc-400"
      >
        {repeated}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 left-10 right-10 overflow-hidden whitespace-nowrap font-mono text-[10px] tracking-[0.15em] uppercase text-zinc-400"
      >
        {repeated}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute left-3 top-10 bottom-10 overflow-hidden whitespace-nowrap font-mono text-[10px] tracking-[0.15em] uppercase text-zinc-400 [writing-mode:vertical-rl] rotate-180"
      >
        {repeated}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-10 bottom-10 overflow-hidden whitespace-nowrap font-mono text-[10px] tracking-[0.15em] uppercase text-zinc-400 [writing-mode:vertical-rl]"
      >
        {repeated}
      </span>

      <div className="absolute inset-10 lg:inset-12 flex flex-col">
        <Icon className="h-7 w-7 text-black" />
        <div className="mt-auto flex flex-col gap-5">
          <h3 className="font-semibold tracking-tight leading-[1.05] text-[clamp(1.875rem,2.6vw,2.25rem)]">
            {card.titleLead} <em className="italic font-semibold">{card.titleEm}</em>
          </h3>
          <p className="text-zinc-600 text-sm leading-relaxed">{card.body}</p>
        </div>
      </div>
    </article>
  );
}

export default function ProtocolProperties() {
  return (
    <section className="page-shell pt-16 lg:pt-24 pb-16 lg:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {CARDS.map((card) => (
          <MarqueeCard key={card.titleLead} card={card} />
        ))}
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
