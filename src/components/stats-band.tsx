export default function StatsBand() {
  return (
    <section className="page-shell pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="flex flex-col items-center gap-6 lg:gap-8">
        <span className="font-pixel uppercase tracking-wider text-[11px] text-zinc-500 inline-flex items-center gap-2">
          <span aria-hidden>+</span>
          Open protocol
        </span>
        <h2 className="text-center text-[clamp(2rem,4.5vw,3.5rem)] font-semibold tracking-tight leading-[1.05] max-w-[24ch]">
          Real bitcoin, in the spaces bitcoin couldn&rsquo;t reach
        </h2>
        <p className="text-center text-zinc-500 max-w-[60ch] text-base lg:text-lg leading-relaxed">
          Pressure-tested by independent mints, wallets, and the developers
          building on the spec.
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-8 lg:mt-12">
          <StatCard
            caption="Bearer ecash flows where on-chain bitcoin can't."
            value="20+"
            label="open-source wallets"
          />
          <StatCard
            caption="Trust-minimized mints redeem ecash over Lightning."
            value="100+"
            label="active mints"
            inverted
          />
          <StatCard
            caption="An open specification, openly authored."
            value="30+"
            label="NUTs published"
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  caption,
  value,
  label,
  inverted = false,
}: {
  caption: string;
  value: string;
  label: string;
  inverted?: boolean;
}) {
  const surface = inverted
    ? "bg-black text-white"
    : "bg-white text-black border border-zinc-200";
  const captionColor = inverted ? "text-zinc-300" : "text-zinc-600";
  const labelColor = inverted ? "text-zinc-400" : "text-zinc-500";

  return (
    <div
      className={`${surface} p-8 lg:p-10 flex flex-col justify-between gap-12 lg:gap-16 min-h-[280px] lg:min-h-[320px]`}
    >
      <p
        className={`${captionColor} text-base lg:text-lg leading-snug max-w-[24ch]`}
      >
        {caption}
      </p>
      <div className="flex flex-col gap-2">
        <span className="text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-tight leading-none">
          {value}
        </span>
        <span className={`${labelColor} text-sm`}>{label}</span>
      </div>
    </div>
  );
}
