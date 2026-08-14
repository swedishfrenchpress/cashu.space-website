"use client";

import { useState } from "react";
import AsciiField from "./ascii-field";
import { DEMOS, type DemoId } from "./protocol-demo-content";

export type { DemoId };

/* Two nearby terrain moments per demo. The field interpolates between them,
   so a toggle feels like a contour sheet being recalculated rather than a
   bitmap being replaced. Keeping the samples close prevents a fast, noisy
   sweep through unrelated terrain. */
const ASCII_FRAMES: Record<DemoId, { ui: number; api: number }> = {
  wallets: { ui: 2, api: 6 },
  mints: { ui: 13, api: 17 },
  spec: { ui: 24, api: 28 },
  tokens: { ui: 35, api: 39 },
};

/**
 * ProtocolDemo — demo panel for the four-parts section. Two stacked views
 * inside the media frame, both on the shared theme-flipping ASCII sheet:
 * a captioned figure plate and a code pane, flipped by a square Figure/Code
 * segmented control floating bottom-center. Both views stay mounted so the
 * crossfade is a pure opacity swap (no layout shift; the frame's
 * aspect-ratio is fixed). The ground interpolates between two nearby frozen
 * samples of the homepage contour field, then returns to idle, so no second
 * ambient animation loop is introduced. The inactive view is aria-hidden +
 * inert.
 */
export default function ProtocolDemo({
  demo,
  label,
  defaultView = "ui",
}: {
  demo: DemoId;
  label: string;
  defaultView?: "ui" | "api";
}) {
  const [view, setView] = useState<"ui" | "api">(defaultView);
  const entry = DEMOS[demo];

  return (
    <div
      className="feature-media feature-demo"
      role="group"
      aria-label={`${label} demo`}
    >
      <div className="feature-demo__ascii" aria-hidden>
        <AsciiField
          className="feature-demo__ascii-field"
          staticTime={ASCII_FRAMES[demo][view]}
          renderFullField
          staticTransitionMs={560}
        />
      </div>
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
