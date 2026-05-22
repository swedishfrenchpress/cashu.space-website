const SPECS: Array<[string, string, string]> = [
  ["NUT-00", "Notation, usage, terminology", "p. 03"],
  ["NUT-01", "Mint public keys", "p. 11"],
  ["NUT-02", "Keysets & keyset IDs", "p. 17"],
  ["NUT-03", "Swap tokens", "p. 24"],
  ["NUT-04", "Mint tokens", "p. 31"],
  ["NUT-05", "Melt tokens", "p. 38"],
  ["NUT-06", "Mint information", "p. 45"],
];

const LEDGER_ROWS: Array<{ idx: string; amt: string }> = [
  { idx: "01", amt: "1,000" },
  { idx: "02", amt: "2,500" },
  { idx: "03", amt: "500" },
  { idx: "04", amt: "12,000" },
  { idx: "05", amt: "750" },
  { idx: "06", amt: "200" },
  { idx: "07", amt: "8,400" },
  { idx: "08", amt: "1,200" },
];

function SpecLadder() {
  return (
    <div className="w-full max-w-[380px] mx-auto select-none">
      <div className="flex items-baseline justify-between pb-3 mb-1 border-b border-zinc-800">
        <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-500">
          Cashu · Specification
        </span>
        <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-500">
          Rev. 0.16
        </span>
      </div>
      <ul className="flex flex-col">
        {SPECS.map(([code, title, page], i) => (
          <li
            key={code}
            className={`grid grid-cols-[64px_1fr_44px] items-baseline gap-3 py-2.5 ${
              i < SPECS.length - 1 ? "border-b border-zinc-900" : ""
            }`}
          >
            <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-400">
              {code}
            </span>
            <span className="font-mono text-[12px] text-zinc-200 truncate">
              {title}
            </span>
            <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-500 text-right">
              {page}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-baseline justify-between pt-3 mt-1 border-t border-zinc-800">
        <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-500">
          07 of 22 nuts
        </span>
        <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-500">
          MIT · open
        </span>
      </div>
    </div>
  );
}

function BearerNote() {
  return (
    <div className="w-full max-w-[360px] mx-auto relative">
      <div className="border border-zinc-300 bg-white p-5 pt-4 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none flex items-center justify-center"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #000 0 1px, transparent 1px 4px)",
          }}
        />
        <div className="relative flex items-baseline justify-between mb-4">
          <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-500">
            Bearer note · Cashu
          </span>
          <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-400">
            SN · 04719
          </span>
        </div>
        <div className="relative font-mono text-[11px] text-zinc-700 leading-[1.7] break-all mb-4">
          cashuBo2F0gaJhaUgArSaMTR9YJmFwgaJhYRhkYXAfaZpZGGAuQ8m1ndA3PnxKlXQv4Yj2VbRwT8eUkLh
        </div>
        <div className="relative flex items-end justify-between pt-3 border-t border-zinc-200">
          <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-500 max-w-[14ch] leading-[1.3]">
            Holder is the owner
          </span>
          <span className="font-pixel text-[22px] text-black tracking-tight leading-none">
            1,000{" "}
            <span className="text-[11px] text-zinc-500 uppercase tracking-widest">
              sat
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

function RedactedLedger() {
  return (
    <div className="w-full max-w-[400px] mx-auto select-none">
      <div className="flex items-baseline justify-between pb-3 mb-2 border-b border-zinc-200">
        <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-500">
          Mint log · today
        </span>
        <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-500">
          Blinded
        </span>
      </div>
      <ul className="flex flex-col gap-[7px]">
        {LEDGER_ROWS.map(({ idx, amt }) => (
          <li
            key={idx}
            className="grid grid-cols-[20px_56px_1fr_60px_36px] items-center gap-2"
          >
            <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-400">
              {idx}
            </span>
            <span className="h-[9px] bg-zinc-900" />
            <span className="h-[9px] bg-zinc-900" />
            <span className="font-pixel uppercase tracking-widest text-[11px] text-zinc-900 text-right">
              {amt}
            </span>
            <span className="h-[9px] bg-zinc-900" />
          </li>
        ))}
      </ul>
      <div className="flex items-baseline justify-between pt-3 mt-3 border-t border-zinc-200">
        <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-500">
          08 of ∞
        </span>
        <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-500">
          Blind signatures
        </span>
      </div>
    </div>
  );
}

function WebRequestResponse() {
  return (
    <div className="w-full max-w-[420px] mx-auto font-mono text-[11px] leading-[1.7] select-none">
      <div className="flex items-baseline justify-between pb-2 mb-3 border-b border-zinc-200">
        <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-500">
          Exchange · /pay
        </span>
        <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-500">
          tcp 443
        </span>
      </div>

      <div className="flex flex-col gap-1 pb-3 border-b border-zinc-200">
        <div className="flex items-baseline gap-2">
          <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-400 w-3">
            →
          </span>
          <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-900">
            POST
          </span>
          <span className="text-zinc-700">/pay</span>
          <span className="text-zinc-400">HTTP/1.1</span>
        </div>
        <div className="pl-5 text-zinc-500">
          <div>
            <span className="text-zinc-400">Host:</span> shop.example.com
          </div>
          <div>
            <span className="text-zinc-400">Content-Type:</span>{" "}
            application/json
          </div>
        </div>
        <pre className="pl-5 text-zinc-700 whitespace-pre mt-1">{`{
  "amount": 1000,
  "token":  "cashuBo2F0gaJh…"
}`}</pre>
      </div>

      <div className="flex flex-col gap-1 pt-3">
        <div className="flex items-baseline gap-2">
          <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-400 w-3">
            ←
          </span>
          <span className="text-zinc-400">HTTP/1.1</span>
          <span className="font-pixel uppercase tracking-widest text-[10px] text-zinc-900">
            200 OK
          </span>
        </div>
        <pre className="pl-5 text-zinc-700 whitespace-pre mt-1">{`{
  "ok": true,
  "tx":  "ord_4e2b…"
}`}</pre>
      </div>
    </div>
  );
}

export default function ImplementationsGrid() {
  return (
    <section className="page-shell pt-16 lg:pt-24 pb-16 lg:pb-24">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold tracking-tight leading-[1.05] max-w-[18ch]">
            Properties of the protocol
          </h2>
          <a
            href="/spec"
            className="inline-flex items-center self-start bg-black hover:bg-zinc-800 transition-colors px-6 py-3.5 text-sm font-medium text-white whitespace-nowrap"
          >
            Read the spec
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Open source ecash — tall left, black */}
          <div className="lg:row-span-2 bg-black text-white p-8 lg:p-10 flex flex-col gap-8 min-h-[480px]">
            <span className="font-pixel uppercase tracking-widest text-[11px] text-zinc-500">
              Fig. 04
            </span>
            <div className="flex-1 flex items-center justify-center">
              <SpecLadder />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight leading-tight">
                Open source ecash
              </h3>
              <p className="text-base text-zinc-300 leading-relaxed max-w-[34ch]">
                Cashu is a free, MIT-licensed protocol. Twenty-two NUTs, one
                document, anyone can implement.
              </p>
            </div>
          </div>

          {/* Bearer token — small mid top, chalk */}
          <div className="bg-zinc-100 p-8 lg:p-10 flex flex-col gap-6 min-h-[240px]">
            <span className="font-pixel uppercase tracking-widest text-[11px] text-zinc-500">
              Fig. 05
            </span>
            <div className="flex-1 flex items-center justify-center">
              <BearerNote />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-xl lg:text-2xl font-semibold tracking-tight leading-tight">
                Bearer token
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-[40ch]">
                The string is the money. Transfer it, redeem it — possession is
                the proof.
              </p>
            </div>
          </div>

          {/* Privacy focused — tall right, white with hair */}
          <div className="lg:row-span-2 bg-white border border-zinc-200 p-8 lg:p-10 flex flex-col gap-8 min-h-[480px]">
            <span className="font-pixel uppercase tracking-widest text-[11px] text-zinc-500">
              Fig. 06
            </span>
            <div className="flex-1 flex items-center justify-center">
              <RedactedLedger />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight leading-tight">
                Privacy by signature
              </h3>
              <p className="text-base text-zinc-600 leading-relaxed max-w-[34ch]">
                Blind signatures sever the link between mint and spend. The mint
                signs what it cannot see.
              </p>
            </div>
          </div>

          {/* Ecash for the Web — small mid bottom, white with hair */}
          <div className="bg-white border border-zinc-200 p-8 lg:p-10 flex flex-col gap-6 min-h-[240px]">
            <span className="font-pixel uppercase tracking-widest text-[11px] text-zinc-500">
              Fig. 07
            </span>
            <div className="flex-1 flex items-center justify-center">
              <WebRequestResponse />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-xl lg:text-2xl font-semibold tracking-tight leading-tight">
                Ecash for the web
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-[40ch]">
                A token fits in a request body. Drop cashu into any HTTP API and
                charge in sats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
