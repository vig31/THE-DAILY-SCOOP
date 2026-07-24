"use client";
// ============================================================================
// NAV — thin sticky masthead bar with section anchor links.
// Collapses to a horizontally scrollable row on small screens.
// ============================================================================
import React from "react";

const LINKS: { href: string; label: string }[] = [
  { href: "#compare", label: "Compare" },
  { href: "#bioavailability", label: "Bioavailability" },
  { href: "#soy", label: "Soy" },
  { href: "#cost", label: "Cost" },
  { href: "#calculator", label: "Calculator" },
  { href: "#planner", label: "Planner" },
  { href: "#meals", label: "Meals" },
  { href: "#verified", label: "Verified" },
  { href: "#prompt", label: "Prompt" },
  { href: "#sources", label: "Sources" },
];

export default function Nav() {
  return (
    <nav
      aria-label="Section navigation"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "var(--paper)",
        borderBottom: "var(--rule-2)",
      }}
    >
      <div
        className="container flex items-center between gap-16"
        style={{ minHeight: 52 }}
      >
        <a
          href="#top"
          className="kicker nowrap"
          style={{ letterSpacing: "0.18em", textDecoration: "none" }}
        >
          The Daily Scoop
        </a>
        <div
          style={{
            display: "flex",
            gap: 18,
            overflowX: "auto",
            whiteSpace: "nowrap",
            paddingLeft: 12,
            marginLeft: "auto",
            scrollbarWidth: "thin",
          }}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="kicker"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textDecoration: "none",
                padding: "4px 0",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
