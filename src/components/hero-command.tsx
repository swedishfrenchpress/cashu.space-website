"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// A demo Cashu bearer token. Bearer strings are the protocol's whole
// point — the hero lets you copy one, echoing "copy ecash, paste ecash."
const DEMO_TOKEN =
  "cashuBo2F0gaJhaUgArSaMTR9YJmFwgaJhYRhkYXAfaZpZGGAuQ8m1ndA3PnxKlXQv4Yj2VbRwT8eUkLh";

// Middle-truncate so both the recognisable `cashuB` prefix and the tail
// stay visible; CSS ellipsis alone would only show the head.
const TOKEN_PREVIEW = `${DEMO_TOKEN.slice(0, 14)}…${DEMO_TOKEN.slice(-4)}`;

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="9"
        y="9"
        width="11"
        height="11"
        rx="0"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5V4.5A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5 10 17.5 19 6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function HeroCommand() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(DEMO_TOKEN);
    } catch {
      // Clipboard blocked (permissions / insecure context). Fail quietly —
      // the token is still visible for manual selection.
      return;
    }
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1600);
  }, []);

  return (
    <div className="hero-cmd">
      <span className="hero-cmd__prefix" aria-hidden>
        $
      </span>
      <span className="hero-cmd__text">{TOKEN_PREVIEW}</span>
      <button
        type="button"
        className="hero-cmd__copy focus-ring"
        onClick={onCopy}
        aria-label={copied ? "Token copied" : "Copy demo token"}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
