const TOKEN_FRAGMENT =
  "cashuBo2F0gaJhaUgArSaMTR9YJmFwgaJhYRhkYXAfaZpZGGAuQ8m1ndA3PnxKlXQv4Yj2VbRwT8eUkLh";
const SENT_COLOR = "#3F5F87";
const RECEIVED_COLOR = "#E5E5EA";
const RECEIVED_TEXT = "#18181b";

type BubbleProps = {
  side: "left" | "right";
  children: React.ReactNode;
  mono?: boolean;
};

function Bubble({ side, children, mono = false }: BubbleProps) {
  const isRight = side === "right";
  const bg = isRight ? SENT_COLOR : RECEIVED_COLOR;
  const fg = isRight ? "#ffffff" : RECEIVED_TEXT;
  return (
    <div
      className={`relative max-w-[88%] ${
        isRight ? "self-end" : "self-start"
      }`}
    >
      <div
        className="rounded-[28px] px-7 py-5"
        style={{ backgroundColor: bg }}
      >
        <span
          className={`${
            mono ? "font-mono tracking-tight" : "font-sans"
          } text-[22px] lg:text-[28px] leading-snug`}
          style={{
            color: fg,
            wordBreak: mono ? "break-all" : "normal",
          }}
        >
          {children}
        </span>
      </div>
      <svg
        aria-hidden
        width="20"
        height="24"
        viewBox="0 0 20 24"
        className="absolute"
        style={{
          bottom: -1,
          [isRight ? "right" : "left"]: -6,
          transform: isRight ? undefined : "scaleX(-1)",
        }}
      >
        <path d="M0 0 Q 0 20 20 23 Q 9 22 9 0 Z" fill={bg} />
      </svg>
    </div>
  );
}

export default function StatementWithMedia() {
  return (
    <section className="bg-black text-white pt-16 lg:pt-24 pb-16 lg:pb-24">
      <div className="page-shell flex flex-col items-center gap-10 lg:gap-14">
        <h2 className="text-center text-[clamp(2.25rem,5vw,4rem)] font-semibold tracking-tight leading-[1.05] max-w-[20ch]">
          Send a token. Cash a token. That&rsquo;s it.
        </h2>

        <a
          href="/wallets"
          className="inline-flex items-center bg-white hover:bg-zinc-200 transition-colors px-6 py-3.5 text-sm font-medium text-black"
        >
          Get a wallet
        </a>

        <div className="w-full aspect-[16/9] bg-zinc-900 overflow-hidden relative">
          <img
            src="/cheers.png"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center px-6 py-8 lg:py-12">
            <div
              className="flex flex-col gap-5 lg:gap-6 w-full"
              style={{ maxWidth: "min(88%, 920px)" }}
            >
              <Bubble side="left">
                can you please send me $10 for lunch?
              </Bubble>
              <Bubble side="right" mono>
                {TOKEN_FRAGMENT}
              </Bubble>
              <Bubble side="left">thank you!</Bubble>
            </div>
          </div>
        </div>

        <p className="font-pixel uppercase tracking-wider text-[11px] text-zinc-400 max-w-[60ch] text-center">
          Fig. 03 · A token is a bearer object — pass it in a chat, a QR, a
          file. No accounts, no balances asked.
        </p>
      </div>
    </section>
  );
}
