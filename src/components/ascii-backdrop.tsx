const FIELD = [
  "      · · · · · · · · · · · · · · · · · · · · · · · ·",
  "  / / / / / / / / / / / / / / / / / / / / / / / / / /",
  "      · · · · · · · · · · · · · · · · · · · · · · · ·",
  "  / / / / / / / / / / / / / / / / / / / / / / / / / /",
  "      · · · · · · · · · · · · · · · · · · · · · · · ·",
  "  / / / / / / / / / / / / / / / / / / / / / / / / / /",
  "      · · · · · · · · · · · · · · · · · · · · · · · ·",
  "  / / / / / / / / / / / / / / / / / / / / / / / / / /",
];

/**
 * A quiet, static echo of the hero terrain for surfaces that need texture.
 * Kept as HTML rather than canvas or an asset: it costs no image request and
 * remains intentionally subordinate to the content layered above it.
 */
export default function AsciiBackdrop() {
  return (
    <pre className="ascii-backdrop" aria-hidden="true">
      {FIELD.join("\n")}
    </pre>
  );
}
