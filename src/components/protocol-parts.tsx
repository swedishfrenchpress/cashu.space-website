import type { OrbState } from "thinking-orbs";
import OrbFigure from "./orb-figure";
import Reveal from "./reveal";

type Part = {
  id: string;
  /** Machine index for the row. Paired with `name` in the mono gutter. */
  name: string;
  title: string;
  body: string;
  orb: OrbState;
  orbLabel: string;
  points: string[];
};

/*
 * Four parts, four plates. Three of the four are user-directed (2026-08-16):
 * `connecting` on Mints and `working` on Spec, both chosen from the rendered
 * set. `connecting` is the one state the Honest-Network Rule constrains —
 * read the DESIGN.md §4 amendment before moving it, and do not copy it onto
 * another entry. The rest were chosen by rendering all nine states at plate
 * scale on this ground and reading them side by side, which is worth
 * recording because the library's own tuning does not survive the trip.
 *
 * Every state ships two presets, 64 and 20, and the 64 one is not the dense
 * one — most modes thin their dot count against the base profile (`ring`
 * and `ribbon` to 0.25, `rubik` to 0.35, `wave` to 0.34). That is invisible
 * at chat-avatar scale and decisive at 280px: `breathing` renders as a thin
 * dashed circle, which reads as a stalled progress spinner, and it was the
 * first pick until it was seen large. The base profiles are not on the
 * public engine surface, so the density a plate gets is whatever its own
 * 64 preset carries — pick states that survive it rather than trying to
 * scale the opts back up.
 *
 * The set also has to alternate. Seven of the nine are a dotted sphere with
 * something happening inside, and four spheres down one column read as the
 * same ball four times. This runs dense sash, node graph, sparse orbit,
 * bare outline.
 *
 * `working` is the faintest state at plate scale — a scattered dust cloud
 * rather than a solid figure. That was raised and the placement was chosen
 * anyway; it sits third, between the node graph and the bare outline, which
 * is the quietest slot in the run and the least punishing place for it.
 */
const PARTS: Part[] = [
  {
    id: "wallets",
    name: "Wallets",
    title: "Hold ecash on your phone.",
    body: "Independent, open source, and free. Run a Cashu wallet on iOS, Android, or in the browser, and hold bearer tokens the way you hold cash.",
    orb: "composing",
    orbLabel: "A dotted band undulating around a sphere.",
    points: [
      "IOS, ANDROID, AND BROWSER",
      "SELF-CUSTODIAL BY DEFAULT",
      "NO ACCOUNTS, NO SIGNUP",
      "OPEN SOURCE, INDEPENDENTLY BUILT",
    ],
  },
  {
    id: "mints",
    name: "Mints",
    title: "Bitcoin in, bitcoin out.",
    body: "Mints bridge Lightning and ecash. A blind signature lets a mint issue a token without learning who ends up holding it. Ecash is a claim on its mint, not a deposit.",
    orb: "connecting",
    orbLabel: "A constellation of dots wiring itself together, with marks travelling the edges.",
    points: [
      "LIGHTNING IN, ECASH OUT",
      "ANYONE CAN RUN ONE",
      "BLIND SIGNATURES, NO USER LEDGER",
      "A CLAIM ON ITS MINT",
    ],
  },
  {
    id: "spec",
    name: "Spec",
    title: "Every byte, in the open.",
    body: "Cashu is documented in version-controlled NUTs. Read them, implement them, fork them, propose your own. Nothing about the protocol is held back.",
    orb: "working",
    orbLabel: "Particles running tilted orbits around a sphere.",
    points: [
      "VERSION-CONTROLLED NUTS",
      "MANDATORY AND OPTIONAL SETS",
      "FREE AND OPEN SOURCE",
      "OPEN TO PROPOSALS",
    ],
  },
  {
    id: "tokens",
    name: "Tokens",
    title: "Send money like a message.",
    body: "Tokens are bearer strings of bitcoin. Instant, final, and small enough to fit anywhere text goes: a chat, a QR, an email, an HTTP header.",
    orb: "shaping",
    orbLabel: "A dotted outline shifting between a circle, a triangle, and a square.",
    points: [
      "BEARER STRINGS OF BITCOIN",
      "INSTANT AND FINAL, LIKE CASH",
      "FITS A QR, A CHAT, A URL",
      "UNLINKABLE FROM THE MINT",
    ],
  },
];

/**
 * ProtocolParts — the split spec sheet. A sticky Paper column on the left
 * carries the section's whole argument; an always-dark column on the right
 * scrolls four numbered entries past it, each one a title, a description, an
 * animated plate, and a list of the properties it carries.
 *
 * This replaced the sticky-tab-list feature scroller and the properties
 * bento in one move (2026-08-16, user-directed, after a reference layout).
 * The two sections were both four-item lists about the same four things
 * separated by a video band; folding the bento's properties into these
 * point lists says it once, at the point where each property is about
 * something the reader is already looking at.
 *
 * The whole thing is a server component apart from the plates: the layout
 * is static, the scroll behaviour is `position: sticky`, and no observer is
 * needed for correctness at any width. The predecessor's scroll-spy — and
 * the mute timer that kept it from fighting its own click handler — is gone
 * with the tab list that needed it.
 */
export default function ProtocolParts() {
  return (
    <section className="protocol-parts" aria-label="The protocol, in four parts">
      <div className="protocol-parts__aside">
        <div className="protocol-parts__aside-inner">
          <Reveal>
            <h2 className="protocol-parts__title">The protocol, in four parts.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="protocol-parts__lead">
              Cashu is an open protocol for Chaumian ecash on bitcoin. Mints
              issue bearer tokens against Lightning, wallets hold them, and
              blind signatures keep a mint from tying the withdrawal to the
              spend that follows it. Every part of it is specified in public.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="protocol-parts__list">
        {PARTS.map((part, i) => (
          <article key={part.id} className="protocol-part">
            <Reveal variant="fade" className="protocol-part__index">
              <span className="protocol-part__num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="protocol-part__name">{part.name}</span>
            </Reveal>

            <Reveal delay={60} className="protocol-part__head">
              <h3 className="protocol-part__title">{part.title}</h3>
            </Reveal>

            <Reveal delay={120} className="protocol-part__body">
              <p>{part.body}</p>
            </Reveal>

            <Reveal variant="fade" slow delay={180} className="protocol-part__plate">
              <OrbFigure state={part.orb} label={part.orbLabel} />
            </Reveal>

            <Reveal delay={240} className="protocol-part__points">
              <ul>
                {part.points.map((point) => (
                  <li key={point}>
                    <span className="protocol-part__mark" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
