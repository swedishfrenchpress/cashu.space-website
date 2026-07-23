"use client";

import { useState } from "react";
import { DEMOS, type DemoId } from "./protocol-demo-content";

export type { DemoId };

/**
 * ProtocolDemo — griffin.com-style demo panel for the four-parts section.
 * Two stacked views inside the chalk media frame: a mock product-UI card
 * and a code pane on an always-dark drafting grid, flipped by a square
 * UI/API segmented control floating bottom-center. Both views stay mounted
 * so the crossfade is a pure opacity swap (no layout shift; the frame's
 * aspect-ratio is fixed). The inactive view is aria-hidden + inert.
 */
export default function ProtocolDemo({
  demo,
  label,
  image,
}: {
  demo: DemoId;
  label: string;
  image?: string;
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
        {image ? (
          <div
            className="feature-demo__photo"
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden
          />
        ) : null}
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
      <div className="feature-demo__toggle" role="group" aria-label="Show as">
        <button
          type="button"
          className="feature-demo__toggle-btn"
          aria-pressed={view === "ui"}
          onClick={() => setView("ui")}
        >
          UI
        </button>
        <button
          type="button"
          className="feature-demo__toggle-btn"
          aria-pressed={view === "api"}
          onClick={() => setView("api")}
        >
          API
        </button>
      </div>
    </div>
  );
}
