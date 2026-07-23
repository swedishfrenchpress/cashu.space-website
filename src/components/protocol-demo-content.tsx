import type { ReactNode } from "react";
import Image from "next/image";

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

/* ------------------------------------------------------------------ ui — */

/* Real product screenshot — the depicted-product exception's other half.
   Both theme variants mount; CSS (the same data-theme/media-query cascade
   as the navbar's sun/moon swap, see .feature-demo__shot-img) shows only
   the one matching the active scheme, so the pick never depends on client
   JS or causes a hydration mismatch. width/height are the crop's real
   pixel size — object-contain then scales it to fit the frame. */
function Shot({
  light,
  dark,
  width,
  height,
  alt,
}: {
  light: string;
  dark: string;
  width: number;
  height: number;
  alt: string;
}) {
  return (
    <div className="feature-demo__shot">
      <Image
        src={light}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 640px) 90vw, 45vw"
        className="feature-demo__shot-img feature-demo__shot-img--light"
      />
      <Image
        src={dark}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 640px) 90vw, 45vw"
        className="feature-demo__shot-img feature-demo__shot-img--dark"
      />
    </div>
  );
}

/* All four screenshots share one crop size: 1024×768, pre-cropped and
   arranged (light/dark) outside this repo. */
const SHOT_WIDTH = 1024;
const SHOT_HEIGHT = 768;

/* Wallets — the wallet's home screen: mint pill, balance, Receive/Send,
   recent activity. */
function WalletsUi() {
  return (
    <Shot
      light="/demo/wallets-light.jpg"
      dark="/demo/wallets-dark.jpg"
      width={SHOT_WIDTH}
      height={SHOT_HEIGHT}
      alt="A wallet home screen showing a bitcoin balance in ecash, with Receive and Send actions"
    />
  );
}

/* Mints — the actual Mints tab of a Cashu wallet app: connected mints,
   balances, Add Mint / Discover Mints. */
function MintsUi() {
  return (
    <Shot
      light="/demo/mints-light.jpg"
      dark="/demo/mints-dark.jpg"
      width={SHOT_WIDTH}
      height={SHOT_HEIGHT}
      alt="The Mints screen of a Cashu wallet, listing connected mints with their balances"
    />
  );
}

/* Spec — the wallet's NUT-11 P2PK screen: your key, Show QR, Reveal key. */
function SpecUi() {
  return (
    <Shot
      light="/demo/spec-light.jpg"
      dark="/demo/spec-dark.jpg"
      width={SHOT_WIDTH}
      height={SHOT_HEIGHT}
      alt="A wallet screen showing a key locked to the user's ecash, with Show QR and Reveal key actions"
    />
  );
}

/* Tokens — the wallet's Pending Ecash sheet: the token as a QR code plus
   its amount. */
function TokensUi() {
  return (
    <Shot
      light="/demo/tokens-light.jpg"
      dark="/demo/tokens-dark.jpg"
      width={SHOT_WIDTH}
      height={SHOT_HEIGHT}
      alt="A pending ecash token shown as a QR code with its amount beneath it"
    />
  );
}

/* ----------------------------------------------------------------------- */

export const DEMOS: Record<DemoId, { ui: ReactNode; api: ReactNode }> = {
  wallets: { ui: <WalletsUi />, api: <WalletsCode /> },
  mints: { ui: <MintsUi />, api: <MintsCode /> },
  spec: { ui: <SpecUi />, api: <SpecCode /> },
  tokens: { ui: <TokensUi />, api: <TokensCode /> },
};
