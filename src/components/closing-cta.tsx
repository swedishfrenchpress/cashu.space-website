import { CashuMark } from "./cashu-mark";

export default function ClosingCta() {
  return (
    <section className="page-shell pt-16 lg:pt-24 pb-16 lg:pb-24">
      <div className="bg-black text-white px-8 py-20 lg:py-28 flex flex-col items-center gap-10 lg:gap-14 relative overflow-hidden">
        <CashuMark className="h-12 w-12" />
        <h2 className="text-center text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-tight leading-[0.95] max-w-[18ch]">
          Cashu, in your pocket.
        </h2>
        <a
          href="/wallets"
          className="inline-flex items-center bg-white hover:bg-zinc-200 transition-colors px-7 py-4 text-sm font-medium text-black"
        >
          Get a wallet        </a>
      </div>
    </section>
  );
}
