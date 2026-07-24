"use client";
// ============================================================================
// BIOAVAILABILITY — visualizes eaten protein vs. protein the body can use.
// usable = proteinPer100g/100 * min(diaas, 1)  (per basis of 100g or 30g)
// ============================================================================
import React, { useMemo, useState } from "react";
import { proteinSources, type ProteinSource } from "@/lib/data";
import { r1 } from "@/lib/calc";

type Basis = "100" | "30";

const BASES: { id: Basis; label: string; grams: number }[] = [
  { id: "100", label: "Per 100 g powder", grams: 100 },
  { id: "30", label: "Per 30 g scoop", grams: 30 },
];

/** Usable grams of protein from `grams` of a source, weighted by DIAAS. */
function usableGrams(p: ProteinSource, grams: number): number {
  const proteinG = (p.proteinPer100g / 100) * grams;
  return proteinG * Math.min(p.diaas, 1);
}

export default function Bioavailability() {
  const [basis, setBasis] = useState<Basis>("100");
  const grams = BASES.find((b) => b.id === basis)!.grams;

  const rows = useMemo(() => {
    return [...proteinSources]
      .map((p) => ({
        p,
        proteinG: (p.proteinPer100g / 100) * grams,
        usable: usableGrams(p, grams),
      }))
      .sort((a, b) => b.usable - a.usable);
  }, [grams]);

  const maxUsable = rows[0]?.usable || 1;

  return (
    <section className="section section--band" id="bioavailability">
      <div className="container">
        <div className="sec-head">
          <div>
            <span className="kicker">Section 02</span>
            <h2 className="section-title">Eaten vs. Usable</h2>
            <p className="deck">
              Grams on the label are not grams in the muscle. Bioavailability is
              the part the body keeps.
            </p>
          </div>
          <span className="idx">No. 02 / Ledger</span>
        </div>

        <div className="grid grid-12">
          {/* bars */}
          <div className="col-span-8">
            <div className="flex between wrap items-center gap-16 mb-24">
              <div className="seg" role="group" aria-label="Serving basis">
                {BASES.map((b) => (
                  <button
                    key={b.id}
                    className={basis === b.id ? "is-active" : ""}
                    aria-pressed={basis === b.id}
                    onClick={() => setBasis(b.id)}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
              <span className="meta">
                Solid = usable · hatched = consumed but not used
              </span>
            </div>

            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {rows.map(({ p, proteinG, usable }) => {
                // width of the whole track scaled to the biggest usable value's source protein
                const usablePct = Math.min((usable / maxUsable) * 100, 100);
                const proteinPct = Math.min((proteinG / maxUsable) * 100, 100);
                return (
                  <li
                    key={p.id}
                    style={{
                      padding: "12px 0",
                      borderBottom: "var(--hair)",
                    }}
                  >
                    <div className="flex between items-center gap-12 mb-8">
                      <span style={{ fontWeight: 600, fontSize: 15 }}>
                        {p.short}
                      </span>
                      <span className="num" style={{ fontSize: 14 }}>
                        {r1(usable)} g usable{" "}
                        <span className="muted small">
                          / {r1(proteinG)} g eaten
                        </span>
                      </span>
                    </div>
                    <div
                      className="bar"
                      style={{ height: 18, width: `${Math.max(proteinPct, 6)}%` }}
                      role="img"
                      aria-label={`${p.short}: ${r1(usable)} of ${r1(
                        proteinG
                      )} grams usable`}
                    >
                      <span
                        style={{
                          width: `${
                            proteinG > 0 ? (usable / proteinG) * 100 : 0
                          }%`,
                        }}
                      />
                    </div>
                    <div className="meta" style={{ marginTop: 4 }}>
                      DIAAS {p.diaas.toFixed(2)} · limiting AA: {p.limitingAA}
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="small muted mt-16">
              Bar length is scaled to protein eaten; the solid ink portion is the
              DIAAS-adjusted share your body can build with.
            </p>
          </div>

          {/* explainer */}
          <aside className="col-span-4">
            <div className="box">
              <div className="box-label">The Vocabulary</div>
              <p className="small">
                <strong>Bioavailability</strong> — the fraction of ingested
                protein that is digested, absorbed, and available for building
                tissue. Cooking, processing and anti-nutrients all move it.
              </p>
              <hr className="rule" />
              <p className="small">
                <strong>DIAAS</strong> — scores quality by the body&rsquo;s
                least-available essential amino acid, measured at the end of the
                small intestine. It is stricter and more accurate than the older
                PDCAAS.
              </p>
              <hr className="rule" />
              <p className="small" style={{ marginBottom: 0 }}>
                <strong>Limiting amino acid</strong> — the one essential amino
                acid in shortest supply. It caps how much of the protein counts,
                which is why an incomplete source can be &ldquo;completed&rdquo;
                by pairing (pea + rice).
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
