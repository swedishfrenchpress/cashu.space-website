export default function StatsBand() {
  return (
    <section className="page-shell pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="flex flex-col items-center gap-6 lg:gap-8">
        <h2 className="text-center t-headline max-w-[24ch]">
          Real bitcoin, in the spaces bitcoin couldn&rsquo;t reach
        </h2>
        <p className="text-center text-muted max-w-[60ch] t-body-lead">
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
    ? "bg-panel text-panel-fg border border-panel-hair"
    : "bg-card text-ink border border-hair";
  const captionColor = inverted ? "text-zinc-300" : "text-body";
  const labelColor = inverted ? "text-zinc-400" : "text-muted";

  return (
    <div
      className={`${surface} p-8 lg:p-10 flex flex-col justify-between gap-12 lg:gap-16 min-h-[280px] lg:min-h-[320px]`}
    >
      <p className={`${captionColor} t-body-lead max-w-[24ch]`}>
        {caption}
      </p>
      <div className="flex flex-col gap-2">
        <span
          className="font-semibold tracking-tight leading-none"
          style={{ fontSize: "clamp(3.75rem, 5vw, 5rem)" }}
        >
          {value}
        </span>
        <span className={`${labelColor} t-label`}>{label}</span>
      </div>
    </div>
  );
}
