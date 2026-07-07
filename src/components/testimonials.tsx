import Reveal from "./reveal";

type Testimonial = {
  quote: string;
  name: string;
  handle: string;
  initials: string;
};

// PLACEHOLDER copy — swap for real community quotes when they land.
// Kept realistic so the grid reads at the right density in the meantime.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Cashu is the first ecash system that actually feels like cash. I sent a token in a chat and it just worked — no accounts, no invoices.",
    name: "Placeholder One",
    handle: "@placeholder_one",
    initials: "P1",
  },
  {
    quote:
      "We stood up a mint in an afternoon. The spec is small enough to read in one sitting and precise enough to implement against.",
    name: "Placeholder Two",
    handle: "@placeholder_two",
    initials: "P2",
  },
  {
    quote:
      "Bearer tokens over Lightning changed how we think about micropayments. The privacy properties are the part people underestimate.",
    name: "Placeholder Three",
    handle: "@placeholder_three",
    initials: "P3",
  },
  {
    quote:
      "Six implementations, one spec — and they interoperate. That's rare in this space and it's why we built on Cashu.",
    name: "Placeholder Four",
    handle: "@placeholder_four",
    initials: "P4",
  },
  {
    quote:
      "No company, no token, no treasury. Just a protocol I can audit and a wallet I control. That's the whole pitch, and it delivers.",
    name: "Placeholder Five",
    handle: "@placeholder_five",
    initials: "P5",
  },
  {
    quote:
      "Onboarding a user takes seconds because there's nothing to onboard. You hold the token, you hold the money.",
    name: "Placeholder Six",
    handle: "@placeholder_six",
    initials: "P6",
  },
];

/**
 * Testimonials — flat, sharp, hairline-bordered cards on Paper. Each card
 * is itself the Reveal element (via `as="figure"`) so it doubles as the
 * grid item and staggers in on scroll. Content is placeholder-grade.
 */
export default function Testimonials() {
  return (
    <section
      className="testimonials page-shell section-y-default"
      aria-label="What people say about Cashu"
    >
      <header className="testimonials__head">
        <Reveal>
          <p className="section-eyebrow">From the community</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="t-headline">What people are building on Cashu.</h2>
        </Reveal>
      </header>

      <div className="testimonials__grid">
        {TESTIMONIALS.map((t, i) => (
          <Reveal
            as="figure"
            key={t.handle}
            className="testimonial-card"
            delay={(i % 3) * 80}
          >
            <blockquote className="testimonial-card__quote t-body-lead">
              “{t.quote}”
            </blockquote>
            <figcaption className="testimonial-card__author">
              <span className="testimonial-card__avatar" aria-hidden>
                {t.initials}
              </span>
              <span className="testimonial-card__meta">
                <span className="testimonial-card__name t-title">{t.name}</span>
                <span className="testimonial-card__handle t-label">
                  {t.handle}
                </span>
              </span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
