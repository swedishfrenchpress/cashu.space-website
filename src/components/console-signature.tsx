"use client";

import { useEffect } from "react";

const SHOWN_KEY = "__cashuConsoleShown";

export default function ConsoleSignature() {
  useEffect(() => {
    const w = window as typeof window & { [k: string]: unknown };
    if (w[SHOWN_KEY]) return;
    w[SHOWN_KEY] = true;

    const headLabel =
      "font: 600 14px/1.2 ui-sans-serif, system-ui, sans-serif; color: #000;";
    const headProse =
      "font: 400 12px/1.4 ui-monospace, SFMono-Regular, monospace; color: #71717a;";
    const fieldLabel =
      "font: 500 11px/1.4 ui-monospace, SFMono-Regular, monospace; color: #18181b;";
    const fieldValue =
      "font: 400 11px/1.4 ui-monospace, SFMono-Regular, monospace; color: #71717a;";

    console.log(
      "%ccashu%c   an open protocol for bearer ecash on bitcoin",
      headLabel,
      headProse,
    );
    console.log(
      "%cspec    %chttps://github.com/cashubtc/nuts",
      fieldLabel,
      fieldValue,
    );
    console.log(
      "%csource  %chttps://github.com/cashubtc",
      fieldLabel,
      fieldValue,
    );
  }, []);

  return null;
}
