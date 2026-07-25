import type { ReactNode } from "react";

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
   window chrome, no syntax colour beyond grey/pixel swaps. Theme-flipping:
   Card pane + Hair strip resolve to the classic dark pane in the dark
   ramp and a white file pane in light. */
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
    <div className="w-full max-w-[560px] border border-hair bg-card">
      <div className="t-mono flex items-center justify-between gap-6 bg-hair px-4 py-2.5">
        <span className="truncate text-body">{file}</span>
        <span className="hidden whitespace-nowrap text-muted sm:inline">
          {meta}
        </span>
      </div>
      <pre className="t-mono overflow-x-auto px-5 py-4 text-ink">
        {children}
      </pre>
    </div>
  );
}

/* Grey comment / pixel artefact spans — the pane's whole highlight grammar.
   Comments sit at Mist (muted): they carry real content ("// redeem a
   token…") and need AA contrast on the pane in both schemes. */
function C({ children }: { children: ReactNode }) {
  return <span className="text-muted">{children}</span>;
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

/* ------------------------------------------------------------- figures — */

/* Purpose-built spec plates that replace the app screenshots — the other
   half of the FIGURE/CODE toggle, drawn in the site's own monochrome voice
   rather than depicted app art. Same header-strip register as CodePane so
   the two toggle views read as siblings: one shows the concept as a plate,
   the other as bytes. Everything protocol-shaped stays real. */
function Plate({
  file,
  meta,
  children,
}: {
  file: string;
  /* Optional: a plate whose caption needs no qualifier leaves the right half
     of the strip empty rather than reaching for something to put there. */
  meta?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative z-[1] w-full max-w-[560px] border border-hair bg-card">
      <div className="t-mono flex items-center justify-between gap-6 bg-hair px-4 py-2.5">
        <span className="truncate text-body">{file}</span>
        {meta ? (
          <span className="hidden whitespace-nowrap text-muted sm:inline">
            {meta}
          </span>
        ) : null}
      </div>
      <div className="px-6 py-6 sm:px-7 sm:py-7">{children}</div>
    </div>
  );
}

/* Shared figure atoms. Eyebrow labels the plate's leading field in the same
   quiet mono as a spec field name. Head is a small flow mark drawn in
   currentColor so it inherits the surrounding text colour and flips with the
   theme — no glyph-coverage risk (see the ₿ note in the hero). */
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      className="t-mono block text-muted"
      style={{ fontSize: "0.8125rem", letterSpacing: "0.16em" }}
    >
      {children}
    </span>
  );
}

/* Head is the arrowhead alone — the shaft is a DOM hairline that flexes to
   fill the row, so a crossing can span any plate width without a viewBox
   scaling the head out of proportion. Same 4×6 geometry and 1px stroke the
   old full Arrow carried. */
function Head({ dir }: { dir: "right" | "left" }) {
  return (
    <svg
      width="5"
      height="8"
      viewBox="0 0 5 8"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d={dir === "right" ? "M1 1 4 4 1 7" : "M4 1 1 4 4 7"}
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

/* Wallets — a balance is not one number but a set of proofs, each in a
   power-of-two denomination (the mint's keyset). The inked cells are exactly
   the set bits of the amount: the denomination selection IS the binary
   representation of the balance. Real protocol behaviour, shown as a plate. */
const DENOMS = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
const BALANCE = 2101; // = 2048 + 32 + 16 + 4 + 1 — five proofs

function WalletsUi() {
  const held = DENOMS.filter((d) => (BALANCE & d) === d);
  return (
    <Plate file="a wallet holds proofs">
      {/* Amount stays quiet (Big-Or-Quiet Rule): pixel notation at its
          documented size, never a Display-scale hero. The denomination
          ladder below carries the figure. */}
      <Eyebrow>BALANCE</Eyebrow>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="t-pixel text-ink">
          {BALANCE.toLocaleString("en-US")}
        </span>
        <span className="t-mono text-muted">sat</span>
      </div>

      {/* The ladder is the graphic centerpiece: the mint's power-of-two
          keyset, inked where the balance holds a proof. The inked/ghost
          pattern is literally the binary representation of 2,101. */}
      <div
        className="mt-6 grid grid-cols-4 gap-1.5 sm:grid-cols-6"
        aria-hidden
      >
        {DENOMS.map((d) => {
          const on = held.includes(d);
          return (
            <span
              key={d}
              className={`inline-flex h-11 items-center justify-center border ${
                on
                  ? "border-ink bg-ink text-on-ink"
                  : "border-hair text-ghost"
              }`}
            >
              <span className="t-pixel" style={{ fontSize: "0.8125rem" }}>
                {d}
              </span>
            </span>
          );
        })}
      </div>
    </Plate>
  );
}

/* Mints — a mint is a reserve, and this plate is its balance sheet: the
   bitcoin it holds on the left, the ecash it has issued on the right. The two
   sides carry the same figure because that equality IS the point — ecash is a
   claim on the mint, which is the one thing the section's caption asserts and
   the old "you send → you get" table never drew.

   The earlier face kept the protocol verbs on the CODE view and spoke only
   plain language. That inverted here: mint/melt now ride the arrows, because
   an arrow that shows its own direction explains the verb for free, and
   without them the plate restated the headline instead of teaching anything.
   The header strip and the closing line stay plain English.

   Zoom levels differ across the toggle by design: this face is mint-wide
   state, the CODE view is one 10-sat mint quote against it. Not a mismatch —
   don't "fix" one to match the other. */
const RESERVE = 100_000;

/* A crossing: hairline shaft either side of the verb, arrowhead at the far
   end. Grid, not flex: 1fr_auto_1fr centres the verb on the container no
   matter what sits in the side cells. A flex row with a spacer opposite the
   head either de-centres the verb or leaves the two shafts ending 4px apart,
   since only one end carries arrowhead ink. */
function Crossing({ verb, dir }: { verb: string; dir: "right" | "left" }) {
  const shaft = <span className="h-px flex-1 bg-current" />;
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center">
      <span className="flex items-center">
        {dir === "left" && <Head dir="left" />}
        {shaft}
      </span>
      <span className="t-pixel px-2 text-body" style={{ fontSize: "0.8125rem" }}>
        {verb}
      </span>
      <span className="flex items-center">
        {shaft}
        {dir === "right" && <Head dir="right" />}
      </span>
    </div>
  );
}

function MintsUi() {
  return (
    <Plate file="a mint is a reserve">
      <div className="grid grid-cols-2 gap-x-8">
        <div>
          <Eyebrow>HOLDS</Eyebrow>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="t-pixel text-ink">
              {RESERVE.toLocaleString("en-US")}
            </span>
            <span className="t-mono text-muted">sat</span>
          </div>
          {/* Short forms below sm: at 375px each column is ~140px, and the
              full phrases wrap to two lines on both sides at once — enough to
              push the plate under the floating toggle. */}
          <p className="t-mono mt-1 text-muted" style={{ fontSize: "0.75rem" }}>
            <span className="sm:hidden">in Lightning</span>
            <span className="hidden sm:inline">bitcoin, in Lightning</span>
          </p>
        </div>

        <div className="text-right">
          <Eyebrow>ISSUED</Eyebrow>
          <div className="mt-2 flex items-baseline justify-end gap-2">
            <span className="t-pixel text-ink">
              {RESERVE.toLocaleString("en-US")}
            </span>
            <span className="t-mono text-muted">sat</span>
          </div>
          <p className="t-mono mt-1 text-muted" style={{ fontSize: "0.75rem" }}>
            <span className="sm:hidden">as ecash</span>
            <span className="hidden sm:inline">ecash, in circulation</span>
          </p>
        </div>
      </div>

      {/* Static, not animated. globals.css carries a sanctioned .mint-flow
          marching-ants utility for exactly this bridge, but the Honest-Network
          Rule's own tiebreaker prefers the static version, an infinite loop
          implies flow that isn't happening, and one moving plate out of four
          breaks the set.

          Held to a centred band rather than the full body width: at full width
          the shafts read as two rules spanning the plate rather than as flows
          between the two columns above them. */}
      <div className="mx-auto mt-6 w-[70%] space-y-4 text-muted">
        <Crossing verb="mint" dir="right" />
        <Crossing verb="melt" dir="left" />
      </div>

      {/* No rule above this line — the space carries the separation. */}
      <div className="mt-10">
        <span className="t-mono text-body" style={{ fontSize: "0.8125rem" }}>
          the mint holds the bitcoin, you hold the claim
        </span>
      </div>
    </Plate>
  );
}

/* Spec — the NUTs are the protocol's version-controlled registry: numbered
   documents, each mandatory or optional. This plate is the registry's table
   of contents; the CODE view opens one NUT (NUT-11) to its bytes. Statuses
   are accurate — 00/01/02 are mandatory, 11 (P2PK) and 23 (bolt11) optional. */
/* Four rows, not five: five made the plate tall enough to collide with the
   floating FIGURE/CODE toggle. NUT-11 stays because the CODE view opens
   exactly that NUT (nut-11.md, P2PK), tying the two faces together. */
const NUTS = [
  { id: "NUT-00", title: "Notation & models", req: true },
  { id: "NUT-01", title: "Mint public keys", req: true },
  { id: "NUT-11", title: "Pay-to-Pubkey", req: false },
  { id: "NUT-23", title: "BOLT11 payments", req: false },
];

function SpecUi() {
  return (
    <Plate file="cashubtc/nuts">
      <Eyebrow>NUTS</Eyebrow>
      <div className="mt-3 border-t border-hair">
        {NUTS.map((n) => (
          <div
            key={n.id}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-hair py-2.5 last:border-b-0"
          >
            <span className="t-pixel text-ink" style={{ fontSize: "0.8125rem" }}>
              {n.id}
            </span>
            <span
              className="t-mono truncate text-body"
              style={{ fontSize: "0.8125rem" }}
            >
              {n.title}
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className={`inline-block h-2 w-2 ${
                  n.req ? "bg-ink" : "border border-ghost"
                }`}
                aria-hidden
              />
              <span
                className="t-mono text-muted"
                style={{ fontSize: "0.75rem" }}
              >
                {n.req ? "mandatory" : "optional"}
              </span>
            </span>
          </div>
        ))}
      </div>
    </Plate>
  );
}

/* Tokens — a token is just a bearer string: the cashuB prefix is the version,
   the rest is the CBOR payload (here one 1-sat proof, the same object the
   CODE view decodes). Whoever holds the string holds the sats, so it rides
   any channel that carries text. */
function TokensUi() {
  return (
    <Plate file="a token is a string">
      <Eyebrow>TOKEN</Eyebrow>
      <div className="mt-3 border border-hair bg-band px-4 py-3">
        <span className="break-all">
          <span className="t-pixel text-ink" style={{ fontSize: "0.8125rem" }}>
            cashuB
          </span>
          <span
            className="t-mono text-muted"
            style={{ fontSize: "0.8125rem" }}
          >
            {`${TOKEN_HEAD.slice(6)}…${TOKEN_TAIL}`}
          </span>
        </span>
      </div>
      <div className="mt-6">
        <span className="t-mono text-body" style={{ fontSize: "0.8125rem" }}>
          WhatsApp · Signal · QR · Email
        </span>
      </div>
    </Plate>
  );
}

/* ----------------------------------------------------------------------- */

export const DEMOS: Record<DemoId, { ui: ReactNode; api: ReactNode }> = {
  wallets: { ui: <WalletsUi />, api: <WalletsCode /> },
  mints: { ui: <MintsUi />, api: <MintsCode /> },
  spec: { ui: <SpecUi />, api: <SpecCode /> },
  tokens: { ui: <TokensUi />, api: <TokensCode /> },
};
