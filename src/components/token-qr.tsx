/**
 * TokenQr — a real, scannable cashu token as a committed static SVG.
 *
 * Encodes a single-keyset TokenV4 (217 chars) built from the first proof of
 * the NUT-00 spec example: keyset 00ffd48b8f5ecf80, amount 1 sat, mint
 * http://localhost:3338. Same data as the decoded proof shown in the Tokens
 * code pane. Regenerate with `qrcode` (errorCorrectionLevel L, margin 0)
 * if the token ever changes.
 *
 * The chip never theme-flips: inverted QR codes commonly fail scanners, so
 * modules stay black on a literal-white quiet zone in both themes.
 */
export default function TokenQr({ className }: { className?: string }) {
  return (
    // Radius follows the glass-card idiom (depicted-product exception);
    // the quiet zone stays literal white and the modules stay square.
    <div className={`rounded-2xl bg-white p-3 ${className ?? ""}`}>
      <svg
        viewBox="0 0 53 53"
        role="img"
        aria-label="QR code containing a 1-sat cashu token"
        shapeRendering="crispEdges"
        className="block h-auto w-full"
      >
        <path
          stroke="#000000"
          d="M0 0.5h7m2 0h1m3 0h2m1 0h1m1 0h7m1 0h1m2 0h3m1 0h3m1 0h2m2 0h2m3 0h7M0 1.5h1m5 0h1m1 0h1m1 0h1m3 0h1m1 0h5m1 0h1m2 0h1m2 0h4m1 0h2m4 0h1m2 0h2m2 0h1m5 0h1M0 2.5h1m1 0h3m1 0h1m1 0h2m1 0h1m1 0h1m2 0h4m7 0h1m1 0h1m2 0h1m3 0h2m2 0h2m1 0h1m2 0h1m1 0h3m1 0h1M0 3.5h1m1 0h3m1 0h1m3 0h3m2 0h1m1 0h1m1 0h3m1 0h1m2 0h1m10 0h1m4 0h1m1 0h1m1 0h1m1 0h3m1 0h1M0 4.5h1m1 0h3m1 0h1m1 0h1m3 0h1m2 0h1m1 0h1m2 0h12m3 0h1m2 0h3m1 0h1m3 0h1m1 0h3m1 0h1M0 5.5h1m5 0h1m1 0h1m1 0h1m1 0h1m4 0h4m3 0h1m3 0h2m1 0h1m2 0h2m2 0h1m1 0h1m1 0h1m3 0h1m5 0h1M0 6.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M8 7.5h1m5 0h1m1 0h7m1 0h1m3 0h1m2 0h8m2 0h1m1 0h2M0 8.5h2m1 0h1m2 0h2m1 0h1m2 0h3m1 0h1m1 0h2m1 0h2m1 0h5m2 0h1m1 0h2m1 0h2m1 0h3m1 0h2m1 0h3m1 0h2M3 9.5h1m1 0h1m1 0h2m2 0h3m2 0h1m1 0h1m2 0h1m1 0h1m1 0h2m4 0h2m10 0h1m3 0h1m1 0h2m1 0h1M0 10.5h1m1 0h1m2 0h2m3 0h2m2 0h1m1 0h5m3 0h4m4 0h2m1 0h2m2 0h2m1 0h2m2 0h1m1 0h4M3 11.5h3m4 0h1m1 0h1m1 0h1m1 0h2m2 0h1m2 0h1m2 0h3m1 0h3m2 0h1m2 0h2m1 0h1m1 0h6m1 0h2M0 12.5h2m2 0h1m1 0h1m1 0h1m3 0h4m1 0h2m2 0h2m3 0h1m4 0h10m1 0h1m1 0h5m1 0h1M0 13.5h2m1 0h3m2 0h2m1 0h1m2 0h4m1 0h1m2 0h3m2 0h1m6 0h1m2 0h1m1 0h2m2 0h1m2 0h1m2 0h1m2 0h1M0 14.5h1m2 0h1m2 0h2m1 0h1m1 0h2m4 0h1m1 0h3m2 0h6m1 0h1m2 0h2m1 0h2m3 0h2m2 0h1m1 0h2m1 0h2M0 15.5h6m2 0h3m1 0h1m2 0h1m1 0h2m2 0h2m6 0h1m1 0h1m2 0h1m2 0h3m2 0h3m3 0h1M3 16.5h1m1 0h3m1 0h7m1 0h3m1 0h1m1 0h2m1 0h1m2 0h2m1 0h6m1 0h1m3 0h1m4 0h3m1 0h1M1 17.5h1m2 0h1m2 0h1m6 0h2m1 0h1m2 0h4m1 0h2m1 0h2m3 0h1m1 0h1m2 0h4m2 0h1m6 0h2M1 18.5h1m1 0h4m2 0h1m2 0h1m2 0h3m2 0h3m2 0h4m1 0h4m2 0h1m1 0h3m2 0h1m2 0h1m4 0h2M0 19.5h5m3 0h1m2 0h1m1 0h6m1 0h2m3 0h1m2 0h4m5 0h1m3 0h1m5 0h1M0 20.5h3m1 0h1m1 0h3m4 0h1m1 0h9m2 0h2m1 0h1m1 0h1m1 0h2m1 0h5m1 0h1m1 0h1m3 0h3m1 0h1M0 21.5h5m2 0h5m1 0h2m3 0h2m2 0h1m1 0h3m1 0h1m2 0h2m2 0h1m5 0h1m5 0h3M0 22.5h1m1 0h5m1 0h1m2 0h2m6 0h1m1 0h2m2 0h1m3 0h2m4 0h4m1 0h2m1 0h2m4 0h1m1 0h1M0 23.5h2m2 0h2m2 0h2m2 0h2m3 0h1m1 0h2m2 0h1m2 0h1m2 0h6m1 0h1m3 0h1m1 0h1m1 0h3m1 0h1m1 0h2M0 24.5h1m1 0h8m1 0h1m1 0h1m2 0h3m2 0h2m1 0h5m2 0h7m2 0h1m1 0h7m3 0h1M0 25.5h1m3 0h1m3 0h2m1 0h1m7 0h1m1 0h2m1 0h1m3 0h1m2 0h2m1 0h2m1 0h1m2 0h1m2 0h2m3 0h2M0 26.5h1m3 0h1m1 0h1m1 0h1m1 0h1m2 0h1m3 0h2m2 0h2m1 0h1m1 0h1m1 0h2m1 0h1m1 0h3m4 0h2m1 0h2m1 0h1m1 0h1m2 0h2M0 27.5h1m1 0h3m3 0h1m1 0h3m1 0h1m1 0h1m2 0h4m1 0h1m3 0h2m1 0h1m4 0h1m1 0h1m4 0h2m3 0h1M0 28.5h1m3 0h5m3 0h1m1 0h5m2 0h1m2 0h5m3 0h3m1 0h1m1 0h2m2 0h1m1 0h5m1 0h1M2 29.5h2m1 0h1m1 0h2m1 0h2m1 0h1m1 0h1m1 0h2m1 0h1m1 0h1m1 0h1m1 0h4m1 0h2m2 0h1m2 0h4m1 0h3m1 0h1M0 30.5h1m2 0h1m1 0h2m1 0h2m2 0h1m1 0h2m3 0h3m6 0h1m4 0h6m1 0h1m1 0h6m1 0h1m1 0h2M0 31.5h3m2 0h1m1 0h1m1 0h5m2 0h2m3 0h1m2 0h3m1 0h3m1 0h6m2 0h2m1 0h4m4 0h2M2 32.5h3m1 0h1m1 0h1m3 0h1m2 0h2m1 0h1m1 0h6m1 0h1m1 0h3m1 0h1m2 0h6m3 0h2m2 0h2m1 0h1M0 33.5h4m1 0h1m2 0h2m1 0h1m3 0h1m6 0h1m1 0h1m2 0h2m2 0h1m3 0h2m3 0h1m2 0h3m3 0h1m1 0h2M0 34.5h3m1 0h1m1 0h2m1 0h1m1 0h3m1 0h1m2 0h4m2 0h1m1 0h2m1 0h4m4 0h2m3 0h2m1 0h1m1 0h2m1 0h2M2 35.5h2m1 0h1m1 0h2m6 0h1m1 0h1m2 0h2m3 0h2m3 0h2m1 0h2m3 0h1m1 0h3m1 0h2m2 0h1m1 0h1m1 0h1M1 36.5h1m2 0h1m1 0h5m2 0h2m3 0h6m1 0h2m1 0h1m1 0h7m1 0h1m1 0h1m5 0h3m1 0h1m1 0h1M5 37.5h1m3 0h1m1 0h2m3 0h1m1 0h2m1 0h5m1 0h1m4 0h6m2 0h1m5 0h1m5 0h1M0 38.5h4m1 0h3m3 0h1m1 0h7m3 0h2m4 0h2m1 0h2m1 0h1m1 0h1m3 0h4m1 0h3m1 0h3M1 39.5h1m2 0h2m1 0h1m3 0h6m3 0h3m2 0h2m2 0h2m3 0h2m4 0h1m2 0h2m1 0h1m4 0h2M1 40.5h1m4 0h3m3 0h1m5 0h4m1 0h1m2 0h1m1 0h3m1 0h1m2 0h3m3 0h1m1 0h9M0 41.5h2m2 0h2m5 0h4m1 0h1m3 0h5m1 0h1m2 0h1m5 0h1m1 0h2m1 0h2m2 0h1m2 0h1m2 0h3M0 42.5h2m1 0h6m1 0h2m2 0h1m2 0h3m1 0h1m4 0h1m2 0h4m3 0h2m2 0h1m2 0h1m2 0h1m2 0h1m1 0h2M1 43.5h2m7 0h1m8 0h2m3 0h2m2 0h1m1 0h2m1 0h4m3 0h1m2 0h2m2 0h3m2 0h1M3 44.5h1m2 0h1m1 0h4m1 0h1m1 0h4m1 0h10m1 0h1m1 0h1m2 0h2m1 0h2m3 0h5M8 45.5h6m4 0h1m3 0h1m1 0h1m3 0h1m2 0h1m5 0h1m1 0h2m2 0h2m3 0h1m2 0h2M0 46.5h7m1 0h2m1 0h1m4 0h2m2 0h1m3 0h1m1 0h1m1 0h3m1 0h1m2 0h1m4 0h1m1 0h3m1 0h1m1 0h2m1 0h1M0 47.5h1m5 0h1m5 0h2m4 0h1m3 0h3m3 0h1m4 0h2m1 0h5m1 0h1m1 0h1m3 0h1m1 0h1M0 48.5h1m1 0h3m1 0h1m2 0h1m1 0h7m2 0h3m1 0h7m1 0h1m2 0h2m1 0h3m1 0h8M0 49.5h1m1 0h3m1 0h1m1 0h1m1 0h3m2 0h3m1 0h1m3 0h1m3 0h1m3 0h1m1 0h2m1 0h2m1 0h1m3 0h1m2 0h4m2 0h1M0 50.5h1m1 0h3m1 0h1m2 0h1m1 0h1m3 0h2m1 0h1m1 0h1m3 0h7m2 0h1m2 0h1m1 0h3m2 0h1m4 0h1m1 0h2M0 51.5h1m5 0h1m1 0h1m2 0h5m3 0h2m2 0h2m9 0h2m4 0h1m1 0h1m4 0h1m3 0h1M0 52.5h7m1 0h1m2 0h1m3 0h2m1 0h2m1 0h1m1 0h5m1 0h1m2 0h2m1 0h2m1 0h2m1 0h4m2 0h3m1 0h1"
        />
      </svg>
    </div>
  );
}
