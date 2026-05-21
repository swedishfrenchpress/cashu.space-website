import ShaderEffect from "@/components/shader-effect";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white text-black">
      <header className="px-6 sm:px-12 lg:px-20 pt-6 lg:pt-8 flex items-center justify-between gap-8">
        <a
          href="/"
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight"
        >
          <CashuMark className="h-7 w-7" />
          <span>cashu</span>
        </a>

        <div className="flex items-center gap-2">
          <a
            href="#docs"
            className="hidden sm:inline-flex items-center bg-zinc-100 hover:bg-zinc-200 transition-colors px-5 py-3 text-xs font-pixel uppercase tracking-wider text-zinc-900"
          >
            Read the docs
          </a>
          <a
            href="#wallet"
            className="inline-flex items-center bg-black hover:bg-zinc-800 transition-colors px-5 py-3 text-xs font-pixel uppercase tracking-wider text-white"
          >
            Get a wallet
          </a>
        </div>
      </header>

      <section className="px-6 sm:px-12 lg:px-20 pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="grid grid-cols-12 gap-y-10 gap-x-6 lg:gap-x-12 items-end">
          <h1 className="col-span-12 lg:col-span-8 text-[clamp(3rem,8vw,7rem)] font-semibold tracking-tight leading-[0.95]">
            Bearer ecash
            <br />
            for bitcoin
          </h1>

          <p className="col-span-12 lg:col-span-4 text-lg lg:text-xl font-semibold leading-snug max-w-[40ch] lg:pb-3">
            Open protocol for ecash on bitcoin. Mints, wallets, and a free
            spec.
          </p>
        </div>
      </section>

      <div className="mx-6 sm:mx-12 lg:mx-20 border-t border-zinc-200" />

      <section className="px-6 sm:px-12 lg:px-20 py-12 lg:py-16 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-y-8 gap-x-12">
        <p className="text-sm text-zinc-500 leading-snug max-w-[40ch]">
          Cashu is an open protocol — wallets and mints are operated
          independently.
        </p>

        <nav
          aria-label="Resources"
          className="flex flex-col lg:flex-row items-start lg:items-end gap-y-4 gap-x-10"
        >
          <a
            href="/docs"
            className="font-pixel uppercase tracking-wider text-sm text-black hover:text-zinc-500 transition-colors"
          >
            Documentation →
          </a>
          <a
            href="https://github.com/cashubtc"
            className="font-pixel uppercase tracking-wider text-sm text-black hover:text-zinc-500 transition-colors"
          >
            GitHub →
          </a>
          <a
            href="/blog"
            className="font-pixel uppercase tracking-wider text-sm text-black hover:text-zinc-500 transition-colors"
          >
            Blog →
          </a>
        </nav>
      </section>

      <section className="px-6 sm:px-12 lg:px-20 pt-8 lg:pt-12 pb-24 lg:pb-32 overflow-hidden">
        <div className="w-full flex justify-center">
          <ShaderEffect
            imageSrc="/world-map.png"
            darkMode={false}
            width={1400}
            height={700}
          />
        </div>
      </section>
    </div>
  );
}

function CashuMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="15" fill="black" />
      <path
        d="M22 11.5a6.5 6.5 0 1 0 0 9"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
