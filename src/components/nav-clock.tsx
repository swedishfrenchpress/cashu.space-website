"use client";

import { useEffect, useState } from "react";

/*
 * en-GB with an explicit UTC zone gives "16:42" — 24-hour, zero-padded, and
 * unaffected by the visitor's locale or offset. That independence is the
 * point: the bar is not reporting the reader's clock, it is reporting the
 * one timestamp every party to the protocol already agrees on.
 */
const FORMAT = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "UTC",
});

const MINUTE = 60_000;

/**
 * The masthead clock (DESIGN.md §5 Navigation). Geist Mono, not Geist Pixel
 * Square: the pixel face is reserved for protocol notation — amounts, mint
 * ids, version strings — and wall-clock time is technical metadata, not a
 * protocol artefact.
 */
export default function NavClock() {
  const [utc, setUtc] = useState<{ label: string; iso: string } | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setUtc({ label: FORMAT.format(now), iso: now.toISOString() });
    };
    tick();

    /* Minute resolution, aligned to the boundary. A per-second repaint in
       the chrome is the animated ticker the anti-references rule out; this
       moves once a minute and is otherwise completely still. The leading
       timeout lands on the next :00 so the shown minute is never stale by
       up to 59s, which is what a plain 60s interval from mount would give. */
    let interval = 0;
    const timeout = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, MINUTE);
    }, MINUTE - (Date.now() % MINUTE));

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  /* The server renders the slot empty and the client fills it — no server
     and client could ever agree on a clock. Both first paints are identical,
     so there is no hydration mismatch; the slot reserves its own width in
     CSS (tabular mono) so the fill costs no layout shift, and it fades up
     rather than snapping in. */
  return (
    <time className={`site-nav__clock${utc ? " is-live" : ""}`} dateTime={utc?.iso}>
      {utc ? `${utc.label} UTC` : ""}
    </time>
  );
}
