"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurtainNavigate } from "./curtain-link";

type Chord = "idle" | "g";

const CHORDS: ReadonlyArray<{ keys: string; label: string }> = [
  { keys: "g h", label: "home" },
  { keys: "g w", label: "wallets" },
  { keys: "g s", label: "spec" },
  { keys: "g i", label: "implementations" },
  { keys: "?", label: "this sheet" },
  { keys: "esc", label: "close" },
];

const CHORD_TIMEOUT_MS = 1500;
const TOAST_LINGER_MS = 400;

export default function Keymap() {
  const router = useRouter();
  /* THE CHORDS TAKE THE CURTAIN TOO (2026-08-22). `g h` and `g w` called
     `router.push()` straight, so the Curtain Rule — "a route change is a wipe,
     not a cut" — was true of the mouse and false of the keyboard. It is the
     same navigation to the same route; the input device is not a reason for it
     to look different.

     `navigate` returns false when it declines (already on that pathname,
     reduced motion, hidden document), and every one of those cases still owes
     the reader the navigation, so the plain push stays as the fallback rather
     than being replaced. */
  const navigate = useCurtainNavigate();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const chordRef = useRef<Chord>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lingerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (helpOpen && !dialog.open) dialog.showModal();
    if (!helpOpen && dialog.open) dialog.close();
  }, [helpOpen]);

  useEffect(() => {
    const resetChord = () => {
      chordRef.current = "idle";
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (lingerRef.current) clearTimeout(lingerRef.current);
      lingerRef.current = setTimeout(() => setToast(null), TOAST_LINGER_MS);
    };

    const handler = (e: KeyboardEvent) => {
      if (e.repeat) return;

      const target = e.target;
      if (
        target instanceof HTMLElement &&
        target.matches(
          'input, textarea, select, [contenteditable=""], [contenteditable="true"]',
        )
      ) {
        return;
      }

      const key = e.key;

      if (key === "?") {
        if (chordRef.current !== "idle") resetChord();
        setHelpOpen((open) => !open);
        e.preventDefault();
        return;
      }

      if (key === "Escape") {
        if (chordRef.current !== "idle") resetChord();
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (helpOpen) return;

      const lower = key.toLowerCase();
      const isLetter = /^[a-z]$/.test(lower);

      if (chordRef.current === "idle") {
        if (lower === "g" && !e.shiftKey) {
          chordRef.current = "g";
          if (lingerRef.current) {
            clearTimeout(lingerRef.current);
            lingerRef.current = null;
          }
          setToast("g _");
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(resetChord, CHORD_TIMEOUT_MS);
          e.preventDefault();
        }
        return;
      }

      if (chordRef.current === "g") {
        if (!isLetter || e.shiftKey) {
          resetChord();
          return;
        }
        setToast(`g ${lower}`);
        e.preventDefault();
        if (lower === "h") {
          if (!navigate("/")) router.push("/");
        } else if (lower === "w") {
          if (!navigate("/wallets")) router.push("/wallets");
        } else if (lower === "s") {
          // Same destination as every visible "Read the spec" CTA — one
          // canonical URL per label. The NUTs repo stays reachable from the
          // footer metastrip and the GitHub links.
          window.open(
            "https://docs.cashu.space/",
            "_blank",
            "noopener,noreferrer",
          );
        } else if (lower === "i") {
          // Off the homepage the section doesn't exist yet — route to it
          // rather than swallowing the chord.
          const el = document.getElementById("implementations");
          if (el) {
            // Same check in-the-press.tsx makes before its pager scrolls, for
            // the same reason: a smooth scroll is a whole-viewport movement,
            // and it is the largest piece of motion left on the site that
            // someone can ask not to see. Read per invocation rather than
            // cached, so a mid-session change is honoured.
            const reduced = window.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches;
            el.scrollIntoView({
              behavior: reduced ? "auto" : "smooth",
              block: "start",
            });
          } else {
            /* Off the homepage this is a real route change, so it earns the
               wipe like any other. The hash is preserved through the curtain —
               the navigate helper deliberately skips its scroll reset when the
               target carries one, because Next resolves the anchor itself. */
            if (!navigate("/#implementations")) router.push("/#implementations");
          }
        }
        resetChord();
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (lingerRef.current) clearTimeout(lingerRef.current);
    };
  }, [helpOpen, navigate, router]);

  return (
    <>
      <div
        className={`keymap-toast${toast ? " keymap-toast--visible" : ""}`}
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="t-pixel">{toast ?? ""}</span>
      </div>
      <dialog
        ref={dialogRef}
        className="keymap-help"
        aria-labelledby="keymap-help-title"
        onClose={() => setHelpOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setHelpOpen(false);
        }}
      >
        <div className="keymap-help__sheet">
          <h2 id="keymap-help-title" className="keymap-help__title t-title">
            keys
          </h2>
          <table className="keymap-help__table">
            <tbody>
              {CHORDS.map((c) => (
                <tr key={c.keys}>
                  <td className="t-pixel keymap-help__chord">{c.keys}</td>
                  <td className="t-label keymap-help__label">{c.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </dialog>
    </>
  );
}
