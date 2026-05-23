export default function ImplementationsGrid() {
  return (
    <section className="page-shell pt-16 lg:pt-24 pb-16 lg:pb-24">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold tracking-tight leading-[1.05] max-w-[18ch]">
            Properties of the protocol
          </h2>
          <a href="/spec" className="btn-primary self-start">
            Read the spec
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:gap-6">
          {/* Open source ecash · tall left, black */}
          <div className="lg:row-span-2 bg-black text-white p-8 lg:p-10 flex flex-col gap-8 min-h-[420px] lg:min-h-[560px]">
            <div className="flex-1" />
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight leading-tight">
                Open source ecash
              </h3>
              <p className="text-base text-zinc-300 leading-relaxed max-w-[34ch]">
                Cashu is a free and open-source protocol. Anyone can run a mint.
              </p>
            </div>
          </div>

          {/* Bearer token · wide top right, chalk */}
          <div className="lg:col-span-2 bg-zinc-100 p-8 lg:p-10 flex flex-col gap-6 min-h-[240px]">
            <div className="flex-1" />
            <div className="flex flex-col gap-3 max-w-[52ch]">
              <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight leading-tight">
                Bearer token
              </h3>
              <p className="text-base text-zinc-600 leading-relaxed">
                Ecash transactions are instant and final, just like physical
                cash.
              </p>
            </div>
          </div>

          {/* Privacy focused · bottom right left, white with hair */}
          <div className="bg-white border border-zinc-200 p-8 lg:p-10 flex flex-col gap-6 min-h-[240px]">
            <div className="flex-1" />
            <div className="flex flex-col gap-3">
              <h3 className="text-xl lg:text-2xl font-semibold tracking-tight leading-tight">
                Privacy focused
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-[40ch]">
                Blind signatures preserve user privacy. Transactions are
                peer-to-peer.
              </p>
            </div>
          </div>

          {/* Ecash for the Web · bottom right right, white with hair */}
          <div className="bg-white border border-zinc-200 p-8 lg:p-10 flex flex-col gap-6 min-h-[240px]">
            <div className="flex-1" />
            <div className="flex flex-col gap-3">
              <h3 className="text-xl lg:text-2xl font-semibold tracking-tight leading-tight">
                Ecash for the Web
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-[40ch]">
                Ecash payments can be included in web requests. Use Cashu for
                your website or application.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
