import Link from "next/link";
import HeroField from "@/components/hero-field";
import HeroHeadline from "@/components/hero-headline";
import InThePress from "@/components/in-the-press";
import NewTabHint from "@/components/new-tab-hint";
import ProtocolParts from "@/components/protocol-parts";
import ReferenceImplementations from "@/components/reference-implementations";
import Reveal from "@/components/reveal";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-paper text-ink">
      <SiteHeader />

      {/* The homepage was the one route with no <main>: /wallets and the 404
          both had one, and the skip link here landed on a <section> inside no
          region at all — so a screen-reader visitor navigating by landmark
          had no way to skip the masthead on the page they spend the most time
          on. The element carries the flex column so .hero-spec keeps sizing
          off its own min-height, and the footer stays outside it, where a
          contentinfo landmark belongs. */}
      <main id="main-content" tabIndex={-1} className="flex flex-col flex-1">

        {/* Hero — a spec title page. Single column, centred on purpose (the
            site's one departure from left-aligned editorial; see the
            Centred-Hero Exception, DESIGN.md §4), and centred *in the section*
            too, so the air distributes above and below the title block rather
            than pooling into a void beneath it.

            THE HERO HAS A GROUND AGAIN as of 2026-08-16, on the user's
            direction and after aspensearch.com: a frozen field of Geist Mono hex
            with a wake the pointer stirs through it (hero-field.tsx). Read the Set-Once Rule's amendment in DESIGN.md
            §4 before touching it — the rule was not repealed, it was narrowed
            to what it always argued, which is that motion must be *caused*.
            The field does not drift, there is no rAF at rest, and the loop
            stops on a frame identical to the one it started from. The hero is
            still exactly as still as it was with no ground at all.

            What that does NOT license is the thing that was deleted from here:
            the wide dot figure from thinking-orbs, a blob (PRODUCT.md's own
            second anti-reference) that looped forever with no cause. An
            ambient loop is still forbidden. So is a hero figure that runs a
            clock.

            The arrival is unchanged: the hairline draws across the fold
            (globals.css, `hero-rule-draw`), "ecash" resolves out of hex, and
            the headline, deck and CTAs settle on the staged Reveal. By ~1.1s
            nothing is moving, and nothing moves again until the reader moves
            it. */}
        <section className="hero-spec">
          <HeroField />
          <div className="hero-spec__inner">
            <div className="hero-spec__content">
              {/* NO WRAPPER REVEAL, AND THAT IS THE CHANGE (2026-08-20).
                  The headline used to sit in a staged `Reveal` that faded and
                  rose the whole block out of an 18px blur while one word
                  wiped inside it — two gestures on one element, and the blur
                  was the site's most-copied entrance running under its
                  largest type. The user called the result sloppy and it was:
                  the focus pull had to be timed to clear at 55% of the settle
                  precisely so the word wipe would not run behind a lens, which
                  is an admission that the two were fighting.

                  The headline now sets itself glyph by glyph instead — see
                  hero-headline.tsx for the markup and `.hero-glyph` in
                  globals.css for the timing. One gesture, and it is the
                  site's own travelling edge at the granularity of a single
                  character rather than a whole block.

                  The h1 is a direct flex child now. That is deliberate and it
                  is measured: the old wrapper was shrink-to-fit around a child
                  whose own negative optical margin pulled it left, so its box
                  ran 0 to 6.942em; the h1's own box runs -0.058em to 6.942em.
                  The right edge is identical, which is the edge the field's
                  mask measures at 1024px and up. */}
              <HeroHeadline />
              {/* The deck stands alone. The body sentence explaining the
                  blind-signature mechanism was cut 2026-08-14 on the user's
                  direction, on the grounds that the field's morph depicted the
                  round trip so the copy needn't restate it.

                  That reason is void as of 2026-08-16 — the field is gone and
                  nothing on the homepage depicts the mechanism now. The cut
                  still stands, because the user directed it and because a
                  three-line hero is not the fix. But it is now a live gap
                  rather than a settled one: if the mechanism comes back it
                  should come back as a figure (DESIGN.md §4, the Honest-Network
                  Rule), not as a paragraph bolted in here. Don't refill this
                  slot with prose. */}
              <Reveal immediate delay={240}>
                <p className="hero-spec__deck">Instant, bearer, peer-to-peer.</p>
              </Reveal>
              <Reveal immediate delay={360}>
                <div className="hero-spec__cta">
                  <Link href="/wallets" className="btn-primary">
                    <span>Get a wallet</span>
                  </Link>
                  <a
                    href="https://docs.cashu.space/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <span>Read the spec</span>
                    <NewTabHint />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* One section now carries what three used to: the four parts, the
            properties of each, and the figure work. The tabbed feature
            scroller, the tap-to-pay video band, and the properties bento were
            all removed 2026-08-16 on the user's direction — see
            protocol-parts.tsx. */}
        <div id="why-cashu">
          <ProtocolParts />
        </div>
        {/* The nav's "Implementations" label must land on the registry that
            names them. */}
        <div id="implementations">
          <ReferenceImplementations />
        </div>
        <InThePress />
      </main>

      <SiteFooter />
    </div>
  );
}
