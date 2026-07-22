"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./reveal";

/**
 * In the press — a dark closing band of press mentions, modeled on the
 * Griffin "stories" layout: a 3-up row of cards, each a grayscale story
 * photo over a headline with the publication's wordmark beneath. Sits on
 * Ink (like the reference-implementations section it follows) so the
 * grayscale imagery and white marks read as one monochrome surface.
 *
 * Three cards show at desktop width; a prev/next pager (top-right, where
 * a "view all" link would sit) scrolls the snap-track to reach the rest.
 * Photos are the site's only raster imagery and are desaturated by CSS to
 * hold the No-Colour Rule; publication wordmarks are forced to Paper via
 * the same brightness(0) invert(1) treatment the footer uses on marks.
 */

type Story = {
  href: string;
  title: string;
  image: string;
  imageAlt: string;
  logo: string;
  publication: string;
  logoClass?: string;
};

const STORIES: Story[] = [
  {
    href: "https://www.forbes.com/sites/digital-assets/2024/02/14/bypassing-financial-gatekeepers-with-bitcoin/",
    title: "Bypassing financial gatekeepers with Bitcoin",
    image: "/press/forbes.jpg",
    imageAlt: "A neon Bitcoin sign in a shop window beside a chalkboard menu",
    logo: "/press/forbes.svg",
    publication: "Forbes",
  },
  {
    href: "https://www.thestreet.com/crypto/jack-dorsey-whatsapp-rival-signal-bitcoin-payments",
    title: "Jack Dorsey wants WhatsApp rival to use Bitcoin",
    image: "/press/thestreet.jpg",
    imageAlt: "Jack Dorsey speaking into a microphone",
    logo: "/press/thestreet.svg",
    publication: "TheStreet",
  },
  {
    href: "https://www.bitget.com/news/detail/12560605065105",
    title:
      "The censorship-resistant Cashu protocol powering Cuba's financial revolution",
    image: "/press/bitget.jpg",
    imageAlt: "A stylised night street scene illustrating the Cashu protocol",
    logo: "/press/bitget.svg",
    publication: "Bitget",
  },
  {
    href: "https://bitcoinmagazine.com/technical/cashu-a-vision-for-a-bitcoin-powered-ecash-ecosystem",
    title: "Cashu: a vision for a Bitcoin-powered ecash ecosystem",
    image: "/press/bitcoinmagazine.jpg",
    imageAlt: "A bowl of cashews on a wooden table",
    logo: "/press/bitcoinmagazine.png",
    publication: "Bitcoin Magazine",
    logoClass: "press-logo--tall",
  },
];

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d={dir === "next" ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function InThePress() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // Defer the initial measure past render so it doesn't set state
    // synchronously within the effect.
    const raf = requestAnimationFrame(update);
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-press-card]");
    const gap = parseFloat(getComputedStyle(el).columnGap) || 24;
    const delta = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * delta, behavior: "smooth" });
  };

  return (
    <section
      className="bg-black text-white section-y-default press"
      aria-labelledby="press-heading"
    >
      <div className="page-shell flex flex-col gap-10 lg:gap-14">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <h2 id="press-heading" className="t-headline">
              In the press
            </h2>
            <div className="press-nav" aria-hidden={!canPrev && !canNext}>
              <button
                type="button"
                className="press-arrow focus-ring--on-ink"
                onClick={() => step(-1)}
                disabled={!canPrev}
                aria-label="Previous stories"
              >
                <Chevron dir="prev" />
              </button>
              <button
                type="button"
                className="press-arrow focus-ring--on-ink"
                onClick={() => step(1)}
                disabled={!canNext}
                aria-label="Next stories"
              >
                <Chevron dir="next" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div ref={trackRef} className="press-track scrollbar-none">
            {STORIES.map((story) => (
              <a
                key={story.href}
                data-press-card
                href={story.href}
                target="_blank"
                rel="noopener noreferrer"
                className="press-card focus-ring--on-ink"
              >
                <div className="press-media">
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 30vw"
                    className="press-media__img"
                  />
                </div>
                <h3 className="t-title press-card__title">{story.title}</h3>
                {/* Static SVG wordmark as a plain <img> so Next's optimizer
                    (which blocks SVG) stays out of the path; forced to Paper
                    by CSS. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={story.logo}
                  alt={story.publication}
                  className={`press-logo${story.logoClass ? ` ${story.logoClass}` : ""}`}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
