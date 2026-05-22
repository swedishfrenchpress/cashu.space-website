export default function StatementWithMedia() {
  return (
    <section className="page-shell pt-16 lg:pt-24 pb-16 lg:pb-24">
      <div className="flex flex-col items-center gap-10 lg:gap-14">
        <h2 className="text-center text-[clamp(2.25rem,5vw,4rem)] font-semibold tracking-tight leading-[1.05] max-w-[20ch]">
          Send a token. Cash a token. That&rsquo;s it.
        </h2>

        <a
          href="/wallets"
          className="inline-flex items-center bg-black hover:bg-zinc-800 transition-colors px-6 py-3.5 text-sm font-medium text-white"
        >
          Get a wallet        </a>

        <div className="w-full aspect-[16/9] bg-black overflow-hidden relative">
          <div className="absolute inset-0 flex items-end p-6 lg:p-10">
            <p className="font-pixel uppercase tracking-wider text-[11px] text-zinc-400 max-w-[40ch]">
              Fig. 03 · A token is a bearer object — pass it in a chat, a QR, a
              file. No accounts, no balances asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
