import type { ReactNode } from "react";

/**
 * Content for the four ProtocolDemo panels: a captioned figure plate and a
 * code pane per pillar. Everything protocol-shaped is real: the NUT-23
 * quote, the NUT-11 P2PK secret, and the token are lifted from the specs —
 * the token is a valid single-keyset TokenV4 built from the NUT-00
 * example's first proof, so the serialized string, the decoded proof, and
 * the 1-sat amount all describe the same object.
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
   ramp and a white file pane in light. z-1 lifts it above the view's
   masked drafting-grid layer. */
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
    <div className="relative z-[1] w-full max-w-[560px] border border-hair bg-card">
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
      <C>{` sats as a fresh token to hand over`}</C>
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
    <CodePane file="POST /v1/mint/quote/bolt11" meta="NUT-23 (bolt11)">
      <C>{`// ask for a quote, get a Lightning invoice back`}</C>
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
    <CodePane file="cashubtc/nuts/nut-11.md" meta="P2PK (pay-to-pubkey)">
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
    <CodePane file="token.txt" meta="V4 (cashuB)">
      <C>{`// the token travels as plain text`}</C>
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

/* Published technical plates — the FIGURE half of the toggle. Each is a
   real <figure>: a machined Card plate on the shared drafting sheet,
   captioned below in the site's own voice ("Fig. NN" + a thesis sentence,
   GT-Standard) the way a spec captions its diagrams. Deliberately NOT the
   CodePane's file-strip chrome: a figure is not a file, and the two views
   should read as two registers of one document, not one box with two
   fillings. Interiors speak machine notation — mono field names, pixel
   amounts; captions speak English. Everything protocol-shaped stays real.
   Plate/caption styling lives in globals.css (.fig, .fig-plate,
   .fig-caption). */
function Fig({
  num,
  caption,
  children,
}: {
  num: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="fig">
      <div className="fig-plate px-6 py-6 sm:px-7 sm:py-7">{children}</div>
      <figcaption className="fig-caption">
        <span className="fig-caption__num">Fig. {num}</span>
        <span className="fig-caption__text">{caption}</span>
      </figcaption>
    </figure>
  );
}

/* Field — a spec field name over the value it labels: quiet mono caps at
   the documented micro tracking (0.06em — the old 0.16em was an
   untokenised magic number). */
function Field({
  children,
  align = "start",
}: {
  children: ReactNode;
  align?: "start" | "end";
}) {
  return (
    <span
      className={`t-mono block text-muted${
        align === "end" ? " text-right" : ""
      }`}
      style={{ fontSize: "0.75rem", letterSpacing: "0.06em" }}
    >
      {children}
    </span>
  );
}

/* Amount — the plate's one scale jump. Pixel stays the amounts face (§3);
   1.5rem gives the figure's subject a rank its annotations don't have —
   the old plates set everything at 13px and left the eye no entry point. */
function Amount({
  value,
  justify = "start",
}: {
  value: number;
  justify?: "start" | "end";
}) {
  return (
    <span
      className={`flex items-baseline gap-2${
        justify === "end" ? " justify-end" : ""
      }`}
    >
      <span className="t-pixel text-ink" style={{ fontSize: "1.5rem" }}>
        {value.toLocaleString("en-US")}
      </span>
      <span className="t-mono text-muted" style={{ fontSize: "0.8125rem" }}>
        sat
      </span>
    </span>
  );
}

/* Head is the arrowhead alone — the shaft is a DOM hairline that flexes to
   fill the row, so a crossing can span any plate width without a viewBox
   scaling the head out of proportion. Sized up from the old 5×8/1px, which
   rendered as a sub-pixel smudge in dark mode. */
function Head({ dir }: { dir: "right" | "left" }) {
  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d={dir === "right" ? "M1 1 5 5 1 9" : "M5 1 1 5 5 9"}
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

/* Wallets — a balance is not one number but a set of proofs, each in a
   power-of-two denomination (the mint's keyset). The inked cells are
   exactly the set bits of the amount: the denomination selection IS the
   binary representation of the balance. Held cells fill solid; empty
   denominations keep a dashed keyline and a legible numeral — the off
   state is half the figure's data, and the old ghost cells vanished at
   ~1.5:1 contrast. */
const DENOMS = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
const BALANCE = 2101; // = 2048 + 32 + 16 + 4 + 1 — five proofs
const HELD = DENOMS.filter((d) => (BALANCE & d) === d);

function WalletsUi() {
  return (
    <Fig
      num="01"
      caption="A balance is a set of proofs. The inked denominations are 2,101 in binary."
    >
      <Field>BALANCE</Field>
      <div className="mt-2">
        <Amount value={BALANCE} />
      </div>

      <div
        className="mt-6 grid grid-cols-4 gap-1.5 sm:grid-cols-6"
        role="img"
        aria-label={`Twelve power-of-two denominations, 1 to 2048. Five are held as proofs: 2048, 32, 16, 4 and 1. Together they sum to the ${BALANCE.toLocaleString("en-US")}-sat balance.`}
      >
        {DENOMS.map((d) => {
          const on = HELD.includes(d);
          return (
            <span
              key={d}
              className={`inline-flex h-11 items-center justify-center border ${
                on
                  ? "border-ink bg-ink text-on-ink"
                  : "border-dashed border-ghost text-muted"
              }`}
            >
              <span className="t-pixel" style={{ fontSize: "0.8125rem" }}>
                {d}
              </span>
            </span>
          );
        })}
      </div>

      {/* Bottom register: the proofs' shared keyset, the same
          00ffd48b8f5ecf80 the Tokens plate serializes. Fields separate by
          layout, not by separator glyphs. flex-wrap: the keyset id is one
          unbreakable token; on plates narrower than the pair it drops to
          its own line instead of clipping at the plate edge. */}
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-4 border-t border-hair pt-3">
        <span className="t-mono text-muted" style={{ fontSize: "0.75rem" }}>
          {HELD.length} proofs
        </span>
        <span className="t-mono text-muted" style={{ fontSize: "0.75rem" }}>
          keyset{" "}
          <span className="t-pixel" style={{ fontSize: "0.75rem" }}>
            00ffd48b8f5ecf80
          </span>
        </span>
      </div>
    </Fig>
  );
}

/* Mints — a mint is a reserve, and this plate is its balance sheet: the
   bitcoin it holds on the left, the ecash it has issued on the right. The
   two sides carry the same figure because that equality IS the point — and
   the pixel "=" between them marks the sameness as intent, where two
   identical numbers with nothing between them read as unfilled
   placeholder data.

   The crossings keep the protocol verbs: an arrow that shows its own
   direction explains mint/melt for free. Verbs are mono, not pixel — a
   verb is not machine data (§3).

   Zoom levels differ across the toggle by design: this face is mint-wide
   state, the CODE view is one 10-sat mint quote against it. Not a
   mismatch — don't "fix" one to match the other. */
const RESERVE = 100_000;

/* A crossing: hairline shaft either side of the verb, arrowhead at the far
   end. Grid, not flex: 1fr_auto_1fr centres the verb on the container no
   matter what sits in the side cells. Full plate width, so the shafts land
   on the same gutters as the two columns above — one alignment system per
   plate (the old centred 70% band started and ended on coordinates that
   aligned with nothing). */
function Crossing({ verb, dir }: { verb: string; dir: "right" | "left" }) {
  const shaft = <span className="h-px flex-1 bg-current" />;
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center">
      <span className="flex items-center">
        {dir === "left" && <Head dir="left" />}
        {shaft}
      </span>
      <span className="t-mono px-2" style={{ fontSize: "0.8125rem" }}>
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
    <Fig
      num="02"
      caption="A mint is a reserve. It holds the bitcoin, you hold the claim."
    >
      {/* One 1fr_auto_1fr grid for the whole sheet: labels, amounts with
          the equality tie, annotations. items-baseline pulls the "=" onto
          the amounts' shared baseline. */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-x-3 sm:gap-x-5">
        <Field>HOLDS</Field>
        <span aria-hidden />
        <Field align="end">ISSUED</Field>

        <div className="mt-2">
          <Amount value={RESERVE} />
        </div>
        <span
          className="t-pixel text-muted"
          style={{ fontSize: "1.5rem" }}
        >
          =
        </span>
        <div className="mt-2">
          <Amount value={RESERVE} justify="end" />
        </div>

        {/* Annotations in the site's own voice — GT, not mono: these are
            human words, not notation. Short forms below sm: at 375px each
            column is ~140px and the full phrases wrap both sides at once. */}
        <p className="mt-1 text-muted" style={{ fontSize: "0.75rem" }}>
          <span className="sm:hidden">in Lightning</span>
          <span className="hidden sm:inline">bitcoin, in Lightning</span>
        </p>
        <span aria-hidden />
        <p className="mt-1 text-right text-muted" style={{ fontSize: "0.75rem" }}>
          <span className="sm:hidden">as ecash</span>
          <span className="hidden sm:inline">ecash, in circulation</span>
        </p>
      </div>

      {/* Static, not animated: an infinite loop implies flow that isn't
          happening (Honest-Network Rule), and one moving plate out of four
          breaks the set. text-body, not muted — the melt arrowhead was
          effectively invisible in dark mode. */}
      <div
        className="mt-7 space-y-4 text-body"
        role="img"
        aria-label="mint: bitcoin in, ecash out. melt: ecash in, bitcoin out."
      >
        <Crossing verb="mint" dir="right" />
        <Crossing verb="melt" dir="left" />
      </div>
    </Fig>
  );
}

/* Spec — the NUTs are the protocol's version-controlled registry:
   numbered documents, each mandatory or optional. This plate is an excerpt
   of the registry's table of contents — the two mandatory roots plus the
   two NUTs the CODE views open (11 and 23) — and says so: the continuation
   line keeps four rows from reading as the whole spec (31 NUTs, 00 → 30,
   as of mid-2026). Four rows, not more: taller plates collide with the
   floating FIGURE/CODE toggle at narrow frame widths. */
const NUTS = [
  { id: "NUT-00", title: "Notation & models", req: true },
  { id: "NUT-01", title: "Mint public keys", req: true },
  { id: "NUT-11", title: "Pay-to-Pubkey", req: false },
  { id: "NUT-23", title: "BOLT11 payments", req: false },
];

function SpecUi() {
  return (
    <Fig
      num="03"
      caption="The spec is a public registry. Every NUT is a numbered, versioned document."
    >
      <Field>REGISTRY</Field>
      {/* The table closes: every row keeps its bottom rule (the old
          last:border-b-0 left it leaking into the plate). Status is the
          word alone — the old dot + word said the same thing twice. */}
      <div className="mt-3 border-t border-hair">
        {NUTS.map((n) => (
          <div
            key={n.id}
            className="grid grid-cols-[auto_1fr_auto] items-baseline gap-3 border-b border-hair py-2.5"
          >
            <span
              className="t-pixel text-ink"
              style={{ fontSize: "0.8125rem" }}
            >
              {n.id}
            </span>
            <span
              className="t-mono truncate text-body"
              style={{ fontSize: "0.8125rem" }}
            >
              {n.title}
            </span>
            <span className="t-mono text-muted" style={{ fontSize: "0.75rem" }}>
              {n.req ? "mandatory" : "optional"}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom register: the registry states its depth. Total on the
          right in the Amount grammar (pixel numeral, mono unit). */}
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <span className="t-mono text-muted" style={{ fontSize: "0.75rem" }}>
          27 more in the registry
        </span>
        <span className="t-mono text-muted" style={{ fontSize: "0.75rem" }}>
          <span className="t-pixel" style={{ fontSize: "0.75rem" }}>31</span>{" "}
          NUTs
        </span>
      </div>
    </Fig>
  );
}

/* Tokens — a token is just a bearer string: the cashuB prefix is the
   version, the rest is the CBOR payload (here one 1-sat proof, the same
   object the CODE view decodes). Whoever holds the string holds the sats.
   The string runs plate-edge to plate-edge between two rules — a bearer
   string is unbounded, and the old boxed version read as a disabled form
   input (and was a card nested in a card; detector-confirmed). */
function TokensUi() {
  return (
    <Fig
      num="04"
      caption="A token is a bearer string. Whoever holds it, holds the sats."
    >
      <Field>TOKEN</Field>
      <div
        className="-mx-6 mt-3 border-y border-hair bg-band px-6 py-3 sm:-mx-7 sm:px-7"
        role="img"
        aria-label="The serialized token: 217 characters of plain text beginning cashuB."
      >
        <span className="break-all" aria-hidden>
          <span className="t-pixel text-ink" style={{ fontSize: "0.8125rem" }}>
            cashuB
          </span>
          <span className="t-mono text-muted" style={{ fontSize: "0.8125rem" }}>
            {`${TOKEN_HEAD.slice(6)}…${TOKEN_TAIL}`}
          </span>
        </span>
      </div>

      {/* Bottom register: what the string carries, set as a spread field
          row under the full-bleed band — layout separates the facts, no
          separator glyphs. Pixel for version and amount, mono around. */}
      <div className="mt-3 flex items-baseline justify-between gap-x-4">
        <span className="t-pixel text-muted" style={{ fontSize: "0.75rem" }}>
          v4
        </span>
        <span className="t-mono text-muted" style={{ fontSize: "0.75rem" }}>
          one proof
        </span>
        <span className="t-mono text-muted" style={{ fontSize: "0.75rem" }}>
          <span className="t-pixel" style={{ fontSize: "0.75rem" }}>1</span> sat
        </span>
        <span className="t-mono text-muted" style={{ fontSize: "0.75rem" }}>
          217 chars
        </span>
      </div>
    </Fig>
  );
}

/* ----------------------------------------------------------------------- */

export const DEMOS: Record<DemoId, { ui: ReactNode; api: ReactNode }> = {
  wallets: { ui: <WalletsUi />, api: <WalletsCode /> },
  mints: { ui: <MintsUi />, api: <MintsCode /> },
  spec: { ui: <SpecUi />, api: <SpecCode /> },
  tokens: { ui: <TokensUi />, api: <TokensCode /> },
};
