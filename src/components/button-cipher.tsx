"use client";

import { useEffect } from "react";

const BUTTON_SELECTOR = [
  ".btn-primary",
  ".btn-secondary",
  ".btn-primary--on-ink",
  ".btn-secondary--on-ink",
].join(", ");

const CIPHER_GLYPHS = "0123456789abcdef";
const ENCRYPT_END = 0.34;
const DURATION = 460;

type CipherState = {
  frame?: number;
  label: HTMLSpanElement;
};

function encryptedGlyph(index: number, frame: number) {
  return CIPHER_GLYPHS[(index * 7 + frame * 11) % CIPHER_GLYPHS.length];
}

function cipherText(source: string, progress: number, frame: number) {
  const chars = Array.from(source);
  const last = Math.max(chars.length - 1, 1);
  const encrypting = progress < ENCRYPT_END;
  const sweep = encrypting
    ? progress / ENCRYPT_END
    : (progress - ENCRYPT_END) / (1 - ENCRYPT_END);

  return chars
    .map((char, index) => {
      if (/\s/.test(char)) return char;
      const passed = index / last <= sweep;
      const encrypted = encrypting ? passed : !passed;
      return encrypted ? encryptedGlyph(index, frame) : char;
    })
    .join("");
}

/**
 * Keeps the cipher effect at one small client boundary: the server still
 * renders accessible button labels, while this enhancer supplies a visual
 * encrypt → decrypt pass only when the visitor interacts with a CTA.
 */
export default function ButtonCipher() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cleanup = new Map<HTMLElement, () => void>();

    const enhance = (button: HTMLElement) => {
      if (cleanup.has(button) || button.classList.contains("btn-with-count")) return;
      const source = button.textContent?.replace(/\s+/g, " ").trim();
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

      const start = () => {
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

      button.addEventListener("pointerenter", start);
      button.addEventListener("focusin", start);
      button.addEventListener("pointerleave", finish);
      button.addEventListener("focusout", finish);
      cleanup.set(button, () => {
        finish();
        label.remove();
        button.removeEventListener("pointerenter", start);
        button.removeEventListener("focusin", start);
        button.removeEventListener("pointerleave", finish);
        button.removeEventListener("focusout", finish);
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
