"use client";
// ============================================================================
// THE SUPPLEMENT VERDICT — No. 09
// Evidence-tiered buy / skip / avoid guide. Tiers carry the pastel spot
// colours (green / yellow / red). Source video lives in Sources & Method.
// ============================================================================
import React from "react";
import { supplementGuide, healthCheckNote, type SupTier } from "@/lib/data";

const TIERS: { id: SupTier; title: string; mark: string; tint: string }[] = [
  { id: "must", title: "Recommended · Must Buy", mark: "●", tint: "var(--p-pass)" },
  { id: "optional", title: "Optional · Conditional", mark: "●", tint: "var(--p-yellow)" },
  { id: "avoid", title: "Avoid · Waste of Money", mark: "●", tint: "var(--p-pink)" },
];

export default function SupplementGuide() {
  return (
    <section className="section" id="supplements">
      <div className="container">
        <header className="sec-head">
          <div>
            <span className="kicker">Section 09</span>
            <h2 className="section-title">The Supplement Verdict</h2>
            <p className="deck">What the evidence says to buy, take only if needed, and never waste money on.</p>
          </div>
          <span className="idx">No. 09 / Guide</span>
        </header>

        <div className="grid grid-3">
          {TIERS.map((tier) => {
            const items = supplementGuide.filter((s) => s.tier === tier.id);
            return (
              <div key={tier.id} className="box" style={{ borderTop: `10px solid var(--ink)`, background: "var(--paper-bright)" }}>
                <div
                  className="box-label"
                  style={{ background: tier.tint, margin: "-22px -22px 16px", padding: "12px 22px", borderBottom: "2px solid var(--ink)" }}
                >
                  {tier.mark} {tier.title} · {items.length}
                </div>
                {items.map((s) => (
                  <div key={s.name} style={{ padding: "12px 0", borderBottom: "1px solid var(--line-soft)" }}>
                    <div className="flex between items-center wrap gap-8">
                      <h3 className="headline--sm" style={{ margin: 0 }}>{s.name}</h3>
                      {s.dose ? <span className="tag tag--outline nowrap">{s.dose}</span> : null}
                    </div>
                    <p className="small" style={{ margin: "8px 0 0" }}>{s.why}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="box box--ink mt-32">
          <div className="box-label" style={{ borderColor: "var(--paper)" }}>Before You Buy · Health Check</div>
          <p style={{ margin: 0, maxWidth: "70ch" }}>{healthCheckNote}</p>
          <p className="footnote mt-16" style={{ margin: 0, color: "var(--paper)", opacity: 0.7 }}>
            Tiers adapted from an evidence review — full video linked in Sources &amp; Method.
          </p>
        </div>
      </div>
    </section>
  );
}
