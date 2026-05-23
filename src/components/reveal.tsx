"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealVariant = "rise" | "fade";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  slow?: boolean;
  immediate?: boolean;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
  threshold?: number;
  rootMargin?: string;
};

/**
 * Reveal — the unified entrance wrapper. Above-the-fold elements pass
 * `immediate` so they animate on mount (post-paint); below-the-fold use the
 * default IntersectionObserver trigger.
 *
 * Always wraps children in an element (default: div, override via `as`).
 * Honour prefers-reduced-motion — the CSS already short-circuits, but we
 * also set state to `true` immediately so a flash of mid-state can't happen.
 */
export default function Reveal({
  children,
  delay = 0,
  variant = "rise",
  slow = false,
  immediate = false,
  className = "",
  as,
  style,
  threshold = 0.12,
  rootMargin = "0px 0px -8% 0px",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (immediate) {
      const id = window.requestAnimationFrame(() => setRevealed(true));
      return () => window.cancelAnimationFrame(id);
    }

    const node = ref.current;
    if (!node) return;

    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined"
    ) {
      setRevealed(true);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate, threshold, rootMargin]);

  const revealClass = [
    "reveal",
    variant === "fade" ? "reveal--fade" : "",
    slow ? "reveal--slow" : "",
    revealed ? "is-revealed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const mergedStyle: CSSProperties = {
    ...style,
    ...(delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : null),
  };

  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={revealClass}
      style={mergedStyle}
    >
      {children}
    </Tag>
  );
}
