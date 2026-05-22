#!/usr/bin/env node
// Generates public/wallets/get-a-wallet.svg from Over the Rainbow letterforms.
// Run with: node scripts/generate-cursive-svg.mjs
//
// Why: the homepage CTA "get a wallet" needs to be stroke-animated (clip-path
// reveal driven by scroll). Fonts can't be path-animated, so we convert the
// glyphs to static SVG path data once. Re-run if the copy ever changes.

import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import opentype from "opentype.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const TEXT = "get a wallet";
const FONT_SIZE = 140; // px; SVG viewBox units. Visual size is set via CSS.
// WOFF served by Google Fonts when requesting via a legacy User-Agent.
// opentype.js handles WOFF natively.
const FONT_URL =
  "https://fonts.gstatic.com/s/overtherainbow/v23/11haGoXG1k_HKhMLUWz7Mc7vvW5ulvSs8w.woff";
const OUTPUT = path.join(projectRoot, "public", "wallets", "get-a-wallet.svg");

async function main() {
  console.log(`Fetching ${FONT_URL}…`);
  const res = await fetch(FONT_URL);
  if (!res.ok) throw new Error(`Font fetch failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());

  const font = opentype.parse(
    buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength),
  );

  const otPath = font.getPath(TEXT, 0, 0, FONT_SIZE);
  const bbox = otPath.getBoundingBox();
  const padX = 4;
  const padY = 4;
  const width = Math.ceil(bbox.x2 - bbox.x1 + padX * 2);
  const height = Math.ceil(bbox.y2 - bbox.y1 + padY * 2);
  // Shift path so the bbox sits inside the viewBox with padding.
  const tx = -bbox.x1 + padX;
  const ty = -bbox.y1 + padY;

  const d = otPath.toPathData(2); // 2 decimal precision

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="#4ade80" aria-hidden="true">
  <g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)})">
    <path d="${d}" />
  </g>
</svg>
`;

  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
  await fs.writeFile(OUTPUT, svg);
  console.log(`Wrote ${OUTPUT}`);
  console.log(`  viewBox: 0 0 ${width} ${height}`);
  console.log(`  path d length: ${d.length} chars`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
