"use client";

import { useEffect, useRef } from "react";
import Reveal from "./reveal";

/**
 * TapToPay — full-bleed video moment. A tap-to-pay clip plays muted and
 * looped behind a monochrome darken overlay; the copy sits lower-left with
 * an on-ink CTA. Playback is JS-driven (no `autoplay` attribute) so that
 * `prefers-reduced-motion` users only ever see the poster still.
 */
export default function TapToPay() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    // Muted + playsInline lets modern browsers honour a programmatic play.
    video.play().catch(() => {
      // Autoplay refused (e.g. data-saver). Poster still stands in.
    });
  }, []);

  return (
    <section className="video-feature" aria-label="Tap to pay">
      <video
        ref={videoRef}
        className="video-feature__media"
        muted
        loop
        playsInline
        preload="metadata"
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
              Push bitcoin like a message.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="t-body-lead video-feature__body">
              Cashu tokens are bearer bitcoin. No accounts, no invoices, no
              waiting. Tap, and value moves. The protocol makes room for
              experiences money never allowed before.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
