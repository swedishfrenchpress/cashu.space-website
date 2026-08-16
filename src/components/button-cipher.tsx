"use client";

import { useEffect } from "react";
import { cipherText } from "@/lib/cipher";

const BUTTON_SELECTOR = [
  ".btn-primary",
  ".btn-secondary",
  ".btn-primary--on-ink",
  ".btn-secondary--on-ink",
].join(", ");

const DURATION = 460;

type CipherState = {
  frame?: number;
  label: HTMLSpanElement;
};

/**
 * Keeps the cipher effect at one small client boundary: the server still
 * renders accessible button labels, while this enhancer supplies a visual
 * encrypt → decrypt pass only when the visitor interacts with a CTA.
 */
export default function ButtonCipher() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cleanup = new Map<HTMLElement, () => void>();

    /* Visible text only. `textContent` would sweep up screen-reader-only
       content — a CTA carrying <NewTabHint /> would have painted "READ THE
       SPEC (OPENS IN A NEW TAB)" in scrambled hex across a button whose
       visible label is three words. It also skips any overlay left by a
       previous pass, so a re-enter can never cipher its own output. */
    const visibleText = (node: HTMLElement): string => {
      let out = "";
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          out += child.textContent ?? "";
        } else if (
          child instanceof HTMLElement &&
          !child.classList.contains("sr-only") &&
          !child.classList.contains("button-cipher__label")
        ) {
          out += visibleText(child);
        }
      });
      return out;
    };

    const enhance = (button: HTMLElement) => {
      if (cleanup.has(button)) return;
      const source = visibleText(button).replace(/\s+/g, " ").trim();
      if (!source) return;

      const label = document.createElement("span");
      label.className = "button-cipher__label";
      label.setAttribute("aria-hidden", "true");
      button.append(label);

      const state: CipherState = { label };
      const finish = () => {
        if (state.frame !== undefined) cancelAnimationFrame(state.frame);
        state.frame = undefined;
        label.textContent = "";
        button.classList.remove("button-ciphering");
      };

      /* Opt-out, checked per pass rather than at enhance time so a button
         can move in and out of eligibility while mounted. The pass works by
         going `color: transparent` and painting scrambled hex over the
         label, which is fine for a word and destructive for anything else:
         a control whose visible content is an icon inheriting currentColor
         would simply vanish for 460ms and paint garbage where it was.

         This used to end "the nav's GitHub CTA becomes exactly that once the
         bar condenses." The bar has not condensed since 2026-08-16, when the
         Onyx two-state apparatus was retired for the masthead (DESIGN.md §5),
         and the GitHub mark is icon-only in every state now — so it is
         permanently the case this guards against rather than conditionally.
         It never reaches here anyway: it carries no .btn-* class, so the
         selector does not match it. The opt-out stays for the next control
         that is a slab with a glyph inside. */
      const start = () => {
        if (button.dataset.cipher === "off") return;
        finish();
        button.style.setProperty(
          "--button-cipher-color",
          getComputedStyle(button).color,
        );
        button.classList.add("button-ciphering");
        const startedAt = performance.now();

        const paint = (now: number) => {
          const elapsed = now - startedAt;
          const progress = Math.min(elapsed / DURATION, 1);
          label.textContent = cipherText(source, progress, Math.floor(elapsed / 46));
          if (progress < 1) state.frame = requestAnimationFrame(paint);
          else finish();
        };
        state.frame = requestAnimationFrame(paint);
      };

      /* Pointer only. The pass used to fire on focusin as well, which meant
         every CTA a keyboard visitor tabbed onto went `color: transparent`
         and painted random hex for 460ms — the label was unreadable at
         exactly the moment they were reading it to decide. A mouse user can
         move the pointer away; a tabbing user has no equivalent escape, so
         the cost was paid entirely by the people with the fewest options.
         The focus ring still marks the target, the accessible name never
         changed, and the pass survives intact where it was always aimed:
         the hover. */
      button.addEventListener("pointerenter", start);
      button.addEventListener("pointerleave", finish);
      cleanup.set(button, () => {
        finish();
        label.remove();
        button.removeEventListener("pointerenter", start);
        button.removeEventListener("pointerleave", finish);
      });
    };

    const enhanceWithin = (root: ParentNode) => {
      if (root instanceof HTMLElement && root.matches(BUTTON_SELECTOR)) enhance(root);
      root.querySelectorAll<HTMLElement>(BUTTON_SELECTOR).forEach(enhance);
    };

    enhanceWithin(document);
    const observer = new MutationObserver((records) => {
      records.forEach((record) =>
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) enhanceWithin(node);
        }),
      );
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanup.forEach((dispose) => dispose());
    };
  }, []);

  return null;
}
