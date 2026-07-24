"use client";
// ============================================================================
// PROTEIN COMPARISON — the central interactive ledger table.
// Sortable columns, type filter, best-value highlight, in-cell DIAAS bars.
// ============================================================================
import React, { useMemo, useState } from "react";
import { proteinSources, type ProteinSource, type ProteinType } from "@/lib/data";
import { costPerUsableGram, r1 } from "@/lib/calc";

type SortKey =
  | "name"
  | "diaas"
  | "pdcaas"
  | "digestibility"
  | "leucinePct"
  | "proteinPer100g"
  | "costPerKgINR"
  | "usable"
  | "speed";

type Dir = "asc" | "desc";

const FILTERS: { id: "All" | ProteinType; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Animal", label: "Animal" },
  { id: "Plant", label: "Plant" },
  { id: "Blend", label: "Blend" },
  { id: "Novel", label: "Novel" },
];

const COLUMNS: { key: SortKey; label: string; num: boolean }[] = [
  { key: "name", label: "Source", num: false },
  { key: "diaas", label: "DIAAS", num: true },
  { key: "pdcaas", label: "PDCAAS", num: true },
  { key: "digestibility", label: "Digest. %", num: true },
  { key: "leucinePct", label: "Leucine %", num: true },
  { key: "proteinPer100g", label: "Protein/100g", num: true },
  { key: "costPerKgINR", label: "₹/kg", num: true },
  { key: "usable", label: "₹ / usable g", num: true },
  { key: "speed", label: "Speed", num: false },
];

const SPEED_RANK: Record<string, number> = { Fast: 0, Intermediate: 1, Slow: 2 };

function valueFor(p: ProteinSource, key: SortKey): number | string {
  switch (key) {
    case "name":
      return p.name;
    case "usable":
      return costPerUsableGram(p);
    case "speed":
      return SPEED_RANK[p.speed] ?? 99;
    default:
      return p[key];
  }
}

export default function ProteinComparison() {
  const [filter, setFilter] = useState<"All" | ProteinType>("All");
  const [sortKey, setSortKey] = useState<SortKey>("usable");
  const [dir, setDir] = useState<Dir>("asc");

  // lowest cost-per-usable-gram across ALL sources (best value marker)
  const bestValueId = useMemo(() => {
    let best: ProteinSource | null = null;
    for (const p of proteinSources) {
      if (!best || costPerUsableGram(p) < costPerUsableGram(best)) best = p;
    }
    return best?.id;
  }, []);

  const rows = useMemo(() => {
    const list = proteinSources.filter(
      (p) => filter === "All" || p.type === filter
    );
    const sorted = [...list].sort((a, b) => {
      const va = valueFor(a, sortKey);
      const vb = valueFor(b, sortKey);
      let cmp: number;
      if (typeof va === "string" && typeof vb === "string") {
        cmp = va.localeCompare(vb);
      } else {
        cmp = (va as number) - (vb as number);
      }
      return dir === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [filter, sortKey, dir]);

  function onSort(key: SortKey) {
    if (key === sortKey) {
      setDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      // text columns default A→Z; numeric default low→high
      setDir("asc");
    }
  }

  return (
    <section className="section" id="compare">
      <div className="container">
        <div className="sec-head">
          <div>
            <span className="kicker">Section 01</span>
            <h2 className="section-title">The Protein Comparison</h2>
            <p className="deck">
              Every source, scored side by side — and priced by the only metric
              that matters: rupees per gram your body can actually use.
            </p>
          </div>
          <span className="idx">No. 01 / Ledger</span>
        </div>

        {/* filter */}
        <div className="flex between wrap items-center gap-16 mb-16">
          <div className="seg" role="group" aria-label="Filter by protein type">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={filter === f.id ? "is-active" : ""}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="meta">
            {rows.length} source{rows.length === 1 ? "" : "s"} · click a column
            to sort
          </span>
        </div>

        <div className="table-wrap">
          <table className="ledger">
            <caption>
              Protein quality &amp; value — sorted by{" "}
              {COLUMNS.find((c) => c.key === sortKey)?.label} (
              {dir === "asc" ? "ascending" : "descending"})
            </caption>
            <thead>
              <tr>
                {COLUMNS.map((c) => (
                  <th
                    key={c.key}
                    className={c.num ? "num" : undefined}
                    aria-sort={
                      sortKey === c.key
                        ? dir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                    onClick={() => onSort(c.key)}
                  >
                    {c.label}
                    {sortKey === c.key && (
                      <span className="sort-caret">
                        {" "}
                        {dir === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => {
                const usable = Math.round(costPerUsableGram(p));
                const isBest = p.id === bestValueId;
                const barPct = Math.min((p.diaas / 1.2) * 100, 100);
                return (
                  <tr key={p.id} className={isBest ? "is-highlight" : undefined}>
                    <td>
                      <strong>{p.short}</strong>
                      <div className="meta" style={{ marginTop: 2 }}>
                        {p.type}
                        {isBest && (
                          <span className="tag--pass tag" style={{ marginLeft: 8 }}>
                            Best Value
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="num">
                      <div>{r1(p.diaas).toFixed(2)}</div>
                      <div
                        className="bar"
                        style={{ marginTop: 4, minWidth: 54 }}
                        aria-hidden="true"
                      >
                        <span style={{ width: `${barPct}%` }} />
                      </div>
                    </td>
                    <td className="num">{p.pdcaas.toFixed(2)}</td>
                    <td className="num">{p.digestibility}</td>
                    <td className="num">{r1(p.leucinePct).toFixed(1)}</td>
                    <td className="num">{p.proteinPer100g}</td>
                    <td className="num">{p.costPerKgINR.toLocaleString("en-IN")}</td>
                    <td className="num">
                      <strong>₹{usable}</strong>
                    </td>
                    <td>{p.speed}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="small muted mt-16">
          <strong>DIAAS</strong> (Digestible Indispensable Amino Acid Score) —
          the FAO&rsquo;s measure of how completely a protein&rsquo;s amino acids
          are absorbed and used; 1.0+ is excellent, below 0.75 carries no quality
          claim. A <strong>usable gram</strong> is one gram of protein weighted by
          density and DIAAS — the fair unit for comparing value across sources.
          Cost figures are approximate India-2026 retail, shown for comparison
          only.
        </p>
      </div>
    </section>
  );
}
