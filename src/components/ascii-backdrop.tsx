import AsciiField from "./ascii-field";

export type AsciiBackdropVariant = "wallets" | "mints" | "spec" | "tokens";

/* Different frozen moments from the hero terrain keep repeated cards from
   looking stamped while preserving one exact visual language. */
const STATIC_TIME: Record<AsciiBackdropVariant, number> = {
  wallets: 0,
  mints: 2.4,
  spec: 4.8,
  tokens: 7.2,
};

/**
 * A quiet, non-animated snapshot of the hero's ASCII terrain. The shared
 * renderer keeps its glyph ramp and theme behavior identical to the hero;
 * the demo-specific restraint lives in CSS.
 */
export default function AsciiBackdrop({
  variant,
}: {
  variant: AsciiBackdropVariant;
}) {
  return (
    <AsciiField
      className="ascii-backdrop"
      staticTime={STATIC_TIME[variant]}
    />
  );
}
