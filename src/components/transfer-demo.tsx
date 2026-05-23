import Reveal from "./reveal";

/* National flag glyphs. Documented scoped exception to the No-Colour Rule
   (DESIGN.md §2), same precedent as the language marks in
   reference-implementations.tsx: monochrome silhouettes cannot do the
   national recognition this section needs, and the section's claim ("two
   specific countries, no permission") rides on instant identification.
   Kept small, framed with a 1px Hair rim, set on Paper. */
function SwedenFlag() {
  return (
    <svg
      viewBox="0 0 16 10"
      width="40"
      height="25"
      aria-hidden
      className="shrink-0 border border-zinc-200"
    >
      <rect width="16" height="10" fill="#006AA7" />
      <rect y="4" width="16" height="2" fill="#FECC00" />
      <rect x="5" width="2" height="10" fill="#FECC00" />
    </svg>
  );
}

function ArgentinaFlag() {
  return (
    <svg
      viewBox="0 0 16 10"
      width="40"
      height="25"
      aria-hidden
      className="shrink-0 border border-zinc-200"
    >
      <rect width="16" height="10" fill="#74ACDF" />
      <rect y="3.33" width="16" height="3.34" fill="#FFFFFF" />
      <circle cx="8" cy="5" r="0.9" fill="#F6B40E" />
    </svg>
  );
}

/* Transit indicator — dotted hair + chevron. Horizontal on lg+, rotated
   to vertical on small screens where the cards stack. The dotted line is
   the protocol path; the chevron is the direction of value. */
function TransitArrow() {
  return (
    <svg
      viewBox="0 0 120 24"
      width="120"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
      className="text-zinc-400 rotate-90 lg:rotate-0"
    >
      <line x1="2" y1="12" x2="108" y2="12" strokeDasharray="3 5" />
      <path
        d="M 108 6 L 118 12 L 108 18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Borderless-transfer vignette. Two wallet specimens — Stockholm sends,
   Buenos Aires receives — with a transit indicator between them. The
   headline carries the claim (no KYC / ID / questions); the cards demo
   the claim. The "Send" affordance is a styled span, not a button: this
   is a vignette of an action, not the action itself. */
export default function TransferDemo() {
  return (
    <section className="page-shell section-y-default">
      <div className="flex flex-col gap-10 lg:gap-14">
        <div className="flex flex-col gap-4 max-w-[34ch]">
          <Reveal>
            <h2 className="t-headline">No KYC. No ID. No questions.</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="t-body-lead text-zinc-600">
              2,400 sats from Stockholm to Buenos Aires. Two wallets, one
              protocol, no middlemen.
            </p>
          </Reveal>
        </div>

        <Reveal slow delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-stretch gap-6 lg:gap-0">
            <div className="bg-white border border-zinc-200 flex flex-col">
              <div className="flex items-center gap-4 px-7 pt-7 pb-5">
                <SwedenFlag />
                <div className="flex flex-col">
                  <span className="t-label text-zinc-500 uppercase tracking-wider">
                    Sender
                  </span>
                  <span className="t-title">Stockholm, Sweden</span>
                </div>
              </div>
              <hr className="border-0 h-px bg-zinc-200" aria-hidden />
              <dl className="px-7 py-6 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 items-baseline">
                <dt className="t-label text-zinc-500 uppercase">Send</dt>
                <dd className="t-pixel">2 400 sat</dd>
                <dt className="t-label text-zinc-500 uppercase">To</dt>
                <dd className="t-mono text-black">cashu wallet</dd>
                <dt className="t-label text-zinc-500 uppercase">Note</dt>
                <dd className="t-body text-zinc-400">none</dd>
              </dl>
              <hr className="border-0 h-px bg-zinc-200" aria-hidden />
              <div className="px-7 py-5 flex justify-end">
                <span className="btn-primary" role="presentation">
                  Send
                </span>
              </div>
            </div>

            <div
              className="flex items-center justify-center px-2 lg:px-8 py-4 lg:py-0"
              aria-hidden
            >
              <TransitArrow />
            </div>

            <div className="bg-white border border-zinc-200 flex flex-col">
              <div className="flex items-center gap-4 px-7 pt-7 pb-5">
                <ArgentinaFlag />
                <div className="flex flex-col">
                  <span className="t-label text-zinc-500 uppercase tracking-wider">
                    Receiver
                  </span>
                  <span className="t-title">Buenos Aires, Argentina</span>
                </div>
              </div>
              <hr className="border-0 h-px bg-zinc-200" aria-hidden />
              <div className="px-7 py-7 flex flex-col gap-2">
                <span className="t-label text-zinc-500 uppercase tracking-wider">
                  Just received
                </span>
                <span className="t-pixel" style={{ fontSize: "1.5rem" }}>
                  + 2 400 sat
                </span>
                <span className="t-mono text-zinc-500">
                  from cashu wallet · just now
                </span>
              </div>
              <hr className="border-0 h-px bg-zinc-200" aria-hidden />
              <div className="px-7 py-5 flex items-baseline justify-between gap-4">
                <span className="t-label text-zinc-500 uppercase tracking-wider">
                  Required from sender
                </span>
                <span className="t-mono text-black">nothing</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
