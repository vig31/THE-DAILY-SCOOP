"use client";
// ============================================================================
// COST ANALYSIS — the price-crisis infographic.
// Ledger of costStory.points + drivers/takeaway + ranked ₹/usable-g bar chart.
// ============================================================================
import React, { useMemo } from "react";
import { costStory, proteinSources } from "@/lib/data";
import { costPerUsableGram } from "@/lib/calc";

export default function CostAnalysis() {
  const ranked = useMemo(() => {
    return [...proteinSources]
      .map((p) => ({ p, cost: costPerUsableGram(p) }))
      .sort((a, b) => a.cost - b.cost);
  }, []);

  const maxCost = ranked[ranked.length - 1]?.cost || 1;
  const cheapestId = ranked[0]?.p.id;

  return (
    <section className="section" id="cost">
      <div className="container">
        <div className="sec-head">
          <div>
            <span className="kicker">Section 04</span>
            <h2 className="section-title">{costStory.headline}</h2>
            <p className="deck">
              A price shock, decoded — and repriced by the rupee-per-usable-gram
              metric that changes the ranking.
            </p>
          </div>
          <span className="idx">No. 04 / Ledger</span>
        </div>

        <div className="grid grid-2">
          {/* points ledger */}
          <div>
            <div className="box-label">The Numbers</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {costStory.points.map((pt, i) => (
                <li
                  key={i}
                  className="flex between items-center gap-16"
                  style={{
                    padding: "11px 0",
                    borderBottom: "var(--hair)",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{ fontSize: 15 }}
                    className={pt.tone === "was" ? "muted" : undefined}
                  >
                    {pt.label}
                  </span>
                  <span
                    className="num nowrap"
                    style={{
                      fontWeight: pt.tone === "was" ? 400 : 700,
                      textDecoration:
                        pt.tone === "was" ? "line-through" : "none",
                      opacity: pt.tone === "was" ? 0.65 : 1,
                    }}
                  >
                    {pt.value}
                    {pt.tone === "cheap" && (
                      <span className="tag--pass tag" style={{ marginLeft: 8 }}>
                        Cheap
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* drivers + takeaway */}
          <div>
            <div className="box-label">Why It Happened</div>
            <ol style={{ margin: "0 0 24px", paddingLeft: "1.2em" }}>
              {costStory.drivers.map((d, i) => (
                <li key={i} style={{ marginBottom: 12, lineHeight: 1.4 }}>
                  {d}
                </li>
              ))}
            </ol>
            <div className="box--ink">
              <span className="kicker">The Takeaway</span>
              <p style={{ margin: "10px 0 0" }}>{costStory.takeaway}</p>
            </div>
          </div>
        </div>

        {/* ranked bar chart */}
        <hr className="rule-4 mt-32" />
        <h3 className="headline--sm mb-8">
          Rupees Per Usable Gram &mdash; Cheapest First
        </h3>
        <p className="meta mb-24">Price ÷ protein density ÷ DIAAS · lower is better</p>

        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {ranked.map(({ p, cost }) => {
            const pct = Math.min((cost / maxCost) * 100, 100);
            const isCheapest = p.id === cheapestId;
            return (
              <li
                key={p.id}
                style={{ padding: "10px 0", borderBottom: "var(--hair)" }}
              >
                <div className="flex between items-center gap-12 mb-8">
                  <span style={{ fontWeight: 600, fontSize: 15 }}>
                    {p.short}
                    {isCheapest && (
                      <span className="tag--pass tag" style={{ marginLeft: 8 }}>
                        Cheapest Quality Protein
                      </span>
                    )}
                  </span>
                  <span className="num nowrap" style={{ fontSize: 14 }}>
                    ₹{Math.round(cost)}
                  </span>
                </div>
                <div
                  className="bar"
                  style={{ height: 16 }}
                  role="img"
                  aria-label={`${p.short}: ₹${Math.round(cost)} per usable gram`}
                >
                  <span style={{ width: `${Math.max(pct, 3)}%` }} />
                </div>
              </li>
            );
          })}
        </ul>

        <p className="small muted mt-16">
          Cost figures are approximate India-2026 retail and volatile — shown for
          relative comparison only.
        </p>
      </div>
    </section>
  );
}
