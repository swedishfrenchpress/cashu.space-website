"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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
          router.push("/");
        } else if (lower === "w") {
          router.push("/wallets");
        } else if (lower === "s") {
          window.open(
            "https://github.com/cashubtc/nuts",
            "_blank",
            "noopener,noreferrer",
          );
        } else if (lower === "i") {
          const el = document.getElementById("implementations");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
  }, [helpOpen, router]);

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
                  <td className="t-mono keymap-help__label">{c.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </dialog>
    </>
  );
}
