// Real implementations — mirrors the /wallets directory plus library/mint
// projects under github.com/cashubtc. Update here when projects are added.
const ITEMS = [
  "eNuts",
  "Minibits",
  "Macadamia",
  "Cashu Pro",
  "Cashu.me",
  "Nutstash",
  "Boardwalk",
  "Athenut",
  "cashu-ts",
  "nutshell",
  "cdk",
  "moksha",
];

export default function MarqueeStrip() {
  const sequence = [...ITEMS, ...ITEMS];

  return (
    // `min-w-0` is the structural escape hatch — it lets this flex item
    // shrink below its child's intrinsic width so the marquee's `w-max`
    // track doesn't propagate up the page and force horizontal scroll.
    // The same defence lives on `.marquee-pause` in globals.css.
    <section
      aria-label="Cashu implementations"
      className="page-shell py-10 lg:py-14 min-w-0"
    >
      <div
        className="marquee-pause overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max items-center gap-12 sm:gap-16 lg:gap-24">
          {sequence.map((item, i) => (
            <span key={i} className="t-title text-zinc-400 whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
