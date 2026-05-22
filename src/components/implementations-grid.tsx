export default function ImplementationsGrid() {
  return (
    <section className="page-shell pt-16 lg:pt-24 pb-16 lg:pb-24">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold tracking-tight leading-[1.05] max-w-[18ch]">
            Implemented by independent teams
          </h2>
          <a
            href="/implementations"
            className="inline-flex items-center self-start bg-black hover:bg-zinc-800 transition-colors px-6 py-3.5 text-sm font-medium text-white whitespace-nowrap"
          >
            Explore implementations          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="lg:row-span-2 bg-black text-white p-8 lg:p-10 flex flex-col justify-between gap-12 min-h-[420px]">
            <span className="font-pixel uppercase tracking-wider text-[11px] text-zinc-400">
              Fig. 04 · Wallets
            </span>
            <div className="flex flex-col gap-6">
              <p className="text-2xl lg:text-3xl font-semibold tracking-tight leading-tight">
                Pick a wallet that fits your phone, your laptop, or your
                terminal.
              </p>
              <a
                href="/wallets"
                className="text-sm font-medium text-white hover:text-zinc-300 transition-colors"
              >
                See wallets              </a>
            </div>
          </div>

          <div className="bg-zinc-100 p-8 lg:p-10 flex flex-col justify-between gap-8 min-h-[200px]">
            <p className="text-lg lg:text-xl font-medium leading-snug max-w-[40ch]">
              &ldquo;Cashu makes bitcoin spendable in places it wasn&rsquo;t
              before — chat, email, paper, in person.&rdquo;
            </p>
            <div className="flex items-end justify-between gap-4">
              <a
                href="#"
                className="text-sm font-medium text-black hover:text-zinc-600 transition-colors"
              >
                Read the post              </a>
              <span className="text-xs text-zinc-500 text-right leading-tight">
                Cashu contributor
                <br />
                community essay
              </span>
            </div>
          </div>

          <div className="lg:row-span-2 bg-white border border-zinc-200 p-8 lg:p-10 flex flex-col justify-between gap-12 min-h-[420px]">
            <span className="font-pixel uppercase tracking-wider text-[11px] text-zinc-500">
              Fig. 05 · Run a mint
            </span>
            <div className="flex flex-col gap-6">
              <p className="text-2xl lg:text-3xl font-semibold tracking-tight leading-tight">
                Spin up a Cashu mint over Lightning. Hours, not weeks.
              </p>
              <a
                href="/mints"
                className="text-sm font-medium text-black hover:text-zinc-600 transition-colors"
              >
                Run a mint              </a>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 p-8 lg:p-10 flex flex-col gap-3 min-h-[200px]">
            <span className="font-pixel uppercase tracking-wider text-[11px] text-zinc-500">
              The spec
            </span>
            <p className="text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
              30+ NUTs
            </p>
            <p className="text-sm text-zinc-600 leading-relaxed max-w-[40ch]">
              Notation, Usage and Terminology — the protocol&rsquo;s living
              spec, openly authored on GitHub.
            </p>
            <a
              href="/spec"
              className="mt-auto text-sm font-medium text-black hover:text-zinc-600 transition-colors"
            >
              Read the spec            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
