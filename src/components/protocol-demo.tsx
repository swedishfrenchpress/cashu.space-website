"use client";

import { useState } from "react";
import { DEMOS, type DemoId } from "./protocol-demo-content";

export type { DemoId };

/**
 * ProtocolDemo — demo panel for the four-parts section. Two stacked views
 * inside the media frame, both on the shared theme-flipping drafting sheet:
 * a captioned figure plate and a code pane, flipped by a square Figure/Code
 * segmented control floating bottom-center. Both views stay mounted so the
 * crossfade is a pure opacity swap (no layout shift; the frame's
 * aspect-ratio is fixed). The inactive view is aria-hidden + inert.
 */
export default function ProtocolDemo({
  demo,
  label,
}: {
  demo: DemoId;
  label: string;
}) {
  const [view, setView] = useState<"ui" | "api">("ui");
  const entry = DEMOS[demo];

  return (
    <div
      className="feature-media feature-demo"
      role="group"
      aria-label={`${label} demo`}
    >
      <div
        className={`feature-demo__view feature-demo__view--ui${
          view === "ui" ? " is-active" : ""
        }`}
        aria-hidden={view !== "ui"}
        inert={view !== "ui"}
      >
        {entry.ui}
      </div>
      <div
        className={`feature-demo__view feature-demo__view--api${
          view === "api" ? " is-active" : ""
        }`}
        aria-hidden={view !== "api"}
        inert={view !== "api"}
      >
        {entry.api}
      </div>
      {/* Panel-specific name — four identical "Show as" groups read as one
          control that keeps reappearing to AT users. */}
      <div
        className="feature-demo__toggle"
        role="group"
        aria-label={`Show ${label} as`}
      >
        <button
          type="button"
          className="feature-demo__toggle-btn"
          aria-pressed={view === "ui"}
          onClick={() => setView("ui")}
        >
          Figure
        </button>
        <button
          type="button"
          className="feature-demo__toggle-btn"
          aria-pressed={view === "api"}
          onClick={() => setView("api")}
        >
          Code
        </button>
      </div>
    </div>
  );
}
