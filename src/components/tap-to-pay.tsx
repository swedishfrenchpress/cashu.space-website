"use client";

import { useEffect, useRef } from "react";
import Reveal from "./reveal";

/**
 * TapToPay — full-bleed video moment. A tap-to-pay clip plays muted and
 * looped behind a monochrome darken overlay; the copy sits lower-left with
 * an on-ink CTA. Playback is JS-driven (no `autoplay` attribute) so that
 * `prefers-reduced-motion` users only ever see the poster still.
 *
 * Playback — and therefore the download — is gated on the band being in
 * view. Calling play() on mount fetched the clip's full 2.3MB and started
 * it while the visitor was still at scrollY 0, two viewports above the
 * band: the heaviest asset on the site, spent before anyone could see it,
 * on the page a bitcoiner opens on a phone over a hostile network. The
 * poster carries the frame until the section actually approaches, and the
 * clip pauses again once it leaves — the same in-view/visibility discipline
 * ascii-field.tsx applies to its canvas.
 */
export default function TapToPay() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;

    // Muted + playsInline lets modern browsers honour a programmatic play.
    const sync = () => {
      const shouldPlay =
        inView && !mqReduce.matches && document.visibilityState === "visible";
      if (shouldPlay) {
        video.play().catch(() => {
          // Autoplay refused (e.g. data-saver). Poster still stands in.
        });
      } else if (!video.paused) {
        video.pause();
      }
    };

    /* Start the fetch one viewport early so the clip is running by the time
       the band is actually read, without paying for it on arrival. */
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[entries.length - 1].isIntersecting;
        sync();
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(section);

    document.addEventListener("visibilitychange", sync);
    mqReduce.addEventListener("change", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      mqReduce.removeEventListener("change", sync);
    };
  }, []);

  return (
    <section ref={sectionRef} className="video-feature" aria-label="Tap to pay">
      <video
        ref={videoRef}
        className="video-feature__media"
        muted
        loop
        playsInline
        preload="none"
        poster="/tap-to-pay-poster.jpg"
        aria-hidden
      >
        <source src="/tap-to-pay.mp4" type="video/mp4" />
      </video>
      <div className="video-feature__overlay" aria-hidden />

      <div className="video-feature__inner page-shell">
        <div className="video-feature__content">
          <Reveal>
            <h2 className="t-headline video-feature__title">
              Push bitcoin with a tap.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="t-body-lead video-feature__body">
              Cashu tokens are bearer bitcoin. No accounts, no invoices, no
              waiting. Tap, and value moves.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
