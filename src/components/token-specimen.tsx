import Reveal from "./reveal";

/**
 * Hero protagonist — a Cashu token rendered as a primary-source specimen.
 * The token string is set in Geist Pixel Square (protocol notation), broken
 * into labelled fields with hairline callouts in the manner of an RFC figure.
 *
 * Honest-Network Rule (DESIGN.md §4): the diagram describes a real protocol
 * artefact, never a decorative network. Letters are the structure being shown.
 */
const FIELDS: { label: string; value: string; emphasised?: boolean }[] = [
  { label: "version", value: "cashuB" },
  { label: "mint",    value: "mint.cashu.space" },
  { label: "amount",  value: "21 000", emphasised: true },
  { label: "unit",    value: "sat" },
  { label: "secret",  value: "Bo2F0gaJhaUgArSaMTR9YJ…" },
];

export default function TokenSpecimen() {
  return (
    <Reveal immediate variant="fade" slow delay={560} className="w-full">
      <figure className="relative w-full aspect-[4/5] bg-white border border-zinc-200">
        {/* Corner crop marks — RFC-figure tell. Hairlines only, no chrome. */}
        <CropMark className="top-3 left-3" />
        <CropMark className="top-3 right-3 rotate-90" />
        <CropMark className="bottom-3 right-3 rotate-180" />
        <CropMark className="bottom-3 left-3 -rotate-90" />

        {/* Figure caption — RFC notation. */}
        <figcaption className="absolute top-5 left-5 right-5 flex items-baseline justify-between">
          <span className="t-pixel text-zinc-500">fig.&nbsp;01</span>
          <span className="t-pixel text-zinc-500">token · v4</span>
        </figcaption>

        {/* Specimen body — vertical stack of labelled rows. */}
        <div className="absolute inset-0 flex items-center justify-center px-6 lg:px-10">
          <dl className="w-full max-w-[42ch] flex flex-col gap-3 lg:gap-4">
            {FIELDS.map((f) => (
              <div
                key={f.label}
                className="grid grid-cols-[6ch_1fr] items-baseline gap-4 border-t border-zinc-200 pt-3 lg:pt-4 first:border-t-0 first:pt-0"
              >
                <dt className="t-label text-zinc-500 uppercase tracking-[0.08em]">
                  {f.label}
                </dt>
                <dd
                  className={
                    "t-pixel " +
                    (f.emphasised
                      ? "text-black text-[1.5rem] lg:text-[2rem] leading-none"
                      : "text-zinc-900")
                  }
                >
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Footer rule — completes the specimen frame. */}
        <div className="absolute bottom-5 left-5 right-5 flex items-baseline justify-between">
          <span className="t-pixel text-zinc-500">sig&nbsp;&nbsp;✓</span>
          <span className="t-pixel text-zinc-500">bearer</span>
        </div>
      </figure>
    </Reveal>
  );
}

function CropMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className={`absolute ${className}`}
    >
      <path d="M0 0 H10 M0 0 V10" stroke="#000000" strokeWidth="1" fill="none" />
    </svg>
  );
}
