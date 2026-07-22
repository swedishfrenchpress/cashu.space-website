import type { ReactNode } from "react";
import TokenQr from "./token-qr";

/**
 * Content for the four ProtocolDemo panels: a mock product-UI card and a
 * code pane per pillar. Everything protocol-shaped is real: the NUT-23
 * quote, the NUT-11 P2PK secret, and the token (QR included) are lifted
 * from the specs — the token is a valid single-keyset TokenV4 built from
 * the NUT-00 example's first proof, so the QR, the serialized string, the
 * decoded proof, and the 1-sat amount all describe the same object.
 *
 * No hooks here — the interactive frame lives in protocol-demo.tsx.
 */

export type DemoId = "wallets" | "mints" | "spec" | "tokens";

/* The 217-char single-keyset TokenV4 (mint http://localhost:3338, 1 sat,
   keyset 00ffd48b8f5ecf80) — head…tail truncation for display. */
const TOKEN_HEAD = "cashuBo2FtdWh0dHA6Ly9sb2NhbGhvc3Q6MzMzOGF0gaJhaUgA";
const TOKEN_TAIL = "dWNzYXQ";

/* ---------------------------------------------------------------- code — */

/* Faux file pane, same register as the Spec() centerpiece in
   reference-implementations.tsx: filename strip over Geist Mono body, no
   window chrome, no syntax colour beyond grey/pixel swaps. Always dark. */
function CodePane({
  file,
  meta,
  children,
}: {
  file: string;
  meta: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full max-w-[560px] border border-zinc-800 bg-[#18181b]">
      <div className="t-mono flex items-center justify-between gap-6 border-b border-zinc-800 bg-[#27272a] px-4 py-2.5">
        <span className="truncate text-zinc-400">{file}</span>
        <span className="hidden whitespace-nowrap text-zinc-500 sm:inline">
          {meta}
        </span>
      </div>
      <pre className="t-mono overflow-x-auto px-5 py-4 text-zinc-100">
        {children}
      </pre>
    </div>
  );
}

/* Grey comment / pixel artefact spans — the pane's whole highlight grammar.
   Comments sit at zinc-400: they carry real content ("// redeem a token…")
   and need AA contrast on #18181b, not decoration-grey. */
function C({ children }: { children: ReactNode }) {
  return <span className="text-zinc-400">{children}</span>;
}
function P({ children }: { children: ReactNode }) {
  return <span className="t-pixel">{children}</span>;
}

/* Every snippet holds to ≤8 lines and ≤58ch so the pane clears the 16:10
   frame at the lg column width without cropping or inner scroll — the
   frame is doctrine, so the samples are terse. */

function WalletsCode() {
  return (
    <CodePane file="wallet.ts" meta="@cashu/cashu-ts">
      {`import { Wallet, getEncodedToken } from "@cashu/cashu-ts";
const mint = "https://mint.example.com";
const wallet = new Wallet(mint);

const proofs = await wallet.receive("cashuB…"); `}
      <C>{`// redeem`}</C>
      {`
`}
      <C>{`// send `}</C>
      <P>32</P>
      <C>{` sats — a fresh token to hand over`}</C>
      {`
const { send } = await wallet.send(`}
      <P>32</P>
      {`, proofs);
const token = getEncodedToken({ mint, proofs: send });`}
    </CodePane>
  );
}

function MintsCode() {
  return (
    <CodePane file="POST /v1/mint/quote/bolt11" meta="NUT-23 · bolt11">
      <C>{`// ask for a Lightning invoice → get a quote`}</C>
      {`
{ "amount": `}
      <P>10</P>
      {`, "unit": "sat" }

{
  "quote": "`}
      <P>019e6d5a…</P>
      {`",
  "request": "lnbc100n1pj4apw9…",
  "state": "`}
      <P>UNPAID</P>
      {`"
}`}
    </CodePane>
  );
}

function SpecCode() {
  return (
    <CodePane file="cashubtc/nuts/nut-11.md" meta="P2PK · pay-to-pubkey">
      {`["P2PK", {              `}
      <C>{`// only one key can spend`}</C>
      {`
  "nonce": "859d4935c4907062a6297cf4…",
  "data": "`}
      <P>0249098aa8b9d2fbec49ff85…</P>
      {`",
  "tags": [["sigflag", "`}
      <P>SIG_INPUTS</P>
      {`"]]
}]

`}
      <C>{`// spent by presenting a witness`}</C>
      {`
{ "signatures": ["60f3c9b766770b46caac1d27…"] }`}
    </CodePane>
  );
}

function TokensCode() {
  return (
    <CodePane file="token.txt" meta="V4 · cashuB">
      <C>{`// the token — travels as plain text`}</C>
      {`
${TOKEN_HEAD}…${TOKEN_TAIL}

`}
      <C>{`// decoded: one proof, one keyset`}</C>
      {`
{ "amount": `}
      <P>1</P>
      {`,
  "id": "`}
      <P>00ffd48b8f5ecf80</P>
      {`",
  "secret": "acc12435e7b8484c3cf18501…",
  "C": "0244538319de485d55bed3b29a…" }`}
    </CodePane>
  );
}

/* ------------------------------------------------------------------ ui — */

/* Mock product card — theme-flipping (card/hair/ink), flat, sharp,
   hairline-divided per the implementations-grid card recipes. Depth comes
   from the ground contrast, never elevation (No-Shadow Rule). */
function DemoCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`w-full max-w-[340px] divide-y divide-hair border border-hair bg-card text-ink ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

/* Label / value row. Values are protocol notation → pixel or mono. */
function DemoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-5 py-3">
      <span className="t-label text-muted">{label}</span>
      {children}
    </div>
  );
}

function WalletsUi() {
  return (
    <DemoCard>
      <div className="flex items-baseline justify-between gap-4 px-5 py-3">
        <span className="t-mono text-muted">mint.example.com</span>
        <span className="t-label uppercase text-muted">Wallet</span>
      </div>
      <div className="px-5 py-6">
        <span className="t-label block text-muted">Balance</span>
        {/* Stat-scale one-off: protocol notation at display size, per the
            type-system header's justified-one-off allowance. Inline style
            because .t-pixel's own font-size beats utility classes. */}
        <span className="t-pixel mt-3 block" style={{ fontSize: "2rem" }}>
          2,048 <span style={{ fontSize: "1rem" }}>SAT</span>
        </span>
      </div>
      <DemoRow label="Received">
        <span className="t-pixel">+512 SAT</span>
      </DemoRow>
      <DemoRow label="Sent">
        <span className="t-pixel text-muted">−128 SAT</span>
      </DemoRow>
    </DemoCard>
  );
}

function MintsUi() {
  return (
    <DemoCard>
      <div className="flex items-baseline justify-between gap-4 px-5 py-3">
        <span className="t-title">Bob&apos;s Cashu mint</span>
        <span className="t-label uppercase text-muted">Mint</span>
      </div>
      <DemoRow label="Version">
        <span className="t-pixel">Nutshell/0.20.3</span>
      </DemoRow>
      <DemoRow label="Supports">
        <span className="t-mono text-body">NUT-04 · 05 · 07</span>
      </DemoRow>
      <DemoRow label="Quote">
        <span className="flex items-baseline gap-3">
          <span className="t-pixel">019e6d5a…</span>
          {/* UNPAID → PAID, a real quote lifecycle (NUT-23). CSS-driven;
              reduced motion shows the settled PAID state statically. */}
          <span className="feature-demo__quote" aria-hidden>
            <span className="t-label feature-demo__quote-unpaid text-muted">
              UNPAID
            </span>
            <span className="t-label feature-demo__quote-paid bg-ink px-2 text-on-ink">
              PAID
            </span>
          </span>
          <span className="sr-only">PAID</span>
        </span>
      </DemoRow>
    </DemoCard>
  );
}

function SpecUi() {
  return (
    <DemoCard>
      <div className="flex items-baseline justify-between gap-4 px-5 py-3">
        <span className="t-title">Locked to a key</span>
        <span className="t-label uppercase text-muted">NUT-11</span>
      </div>
      <DemoRow label="Pubkey">
        <span className="t-pixel">0249…57a7</span>
      </DemoRow>
      <DemoRow label="sigflag">
        <span className="t-pixel">SIG_INPUTS</span>
      </DemoRow>
      <DemoRow label="Unlocks with">
        <span className="t-label">1 signature</span>
      </DemoRow>
    </DemoCard>
  );
}

function TokensUi() {
  return (
    <DemoCard className="max-w-[240px]">
      {/* Sized so QR + amount + token string clear the frame's 64px toggle
          zone — the card must never run under the floating control. */}
      <div className="flex flex-col items-center gap-3 px-5 py-5">
        <TokenQr className="w-full max-w-[140px]" />
        <span className="t-pixel" style={{ fontSize: "1.25rem" }}>
          1 SAT
        </span>
        <span className="t-mono text-muted">
          {TOKEN_HEAD.slice(0, 10)}…{TOKEN_TAIL}
        </span>
      </div>
    </DemoCard>
  );
}

/* ----------------------------------------------------------------------- */

export const DEMOS: Record<DemoId, { ui: ReactNode; api: ReactNode }> = {
  wallets: { ui: <WalletsUi />, api: <WalletsCode /> },
  mints: { ui: <MintsUi />, api: <MintsCode /> },
  spec: { ui: <SpecUi />, api: <SpecCode /> },
  tokens: { ui: <TokensUi />, api: <TokensCode /> },
};
