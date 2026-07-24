"use client";
// ============================================================================
// TRUSTIFIED PRODUCTS — verified PASS list (Eurofins / TÜV NORD via Trustified).
// Category filter + text search. These are the ONLY recommended products.
// ============================================================================
import React, { useMemo, useState } from "react";
import {
  trustifiedProducts,
  trustifiedUrl,
  type TrustifiedProduct,
} from "@/lib/data";

type Category = TrustifiedProduct["category"];
type FilterId = "All" | Category;

const CATEGORIES: FilterId[] = [
  "All",
  "Whey",
  "Soy",
  "Plant",
  "Creatine",
  "Omega",
  "Multivitamin",
  "Food",
];

export default function TrustifiedProducts() {
  const [cat, setCat] = useState<FilterId>("All");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return trustifiedProducts.filter((p) => {
      const catOk = cat === "All" || p.category === cat;
      const textOk =
        q === "" ||
        p.brand.toLowerCase().includes(q) ||
        p.product.toLowerCase().includes(q);
      return catOk && textOk;
    });
  }, [cat, query]);

  return (
    <section className="section section--band" id="verified">
      <div className="container">
        <div className="sec-head">
          <div>
            <span className="kicker">Section 08</span>
            <h2 className="section-title">Verified Products Only</h2>
            <p className="deck">
              The only products this ledger recommends — because each one passed
              independent lab testing (Eurofins / TÜV NORD via Trustified).
            </p>
          </div>
          <span className="idx">No. 08 / Verified</span>
        </div>

        {/* controls */}
        <div className="flex between wrap items-center gap-16 mb-24">
          <div
            className="seg"
            role="group"
            aria-label="Filter by category"
            style={{ flexWrap: "wrap" }}
          >
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={cat === c ? "is-active" : ""}
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div style={{ minWidth: 220, flex: "1 1 220px", maxWidth: 340 }}>
            <label htmlFor="verified-search" className="hidden">
              Search brand or product
            </label>
            <input
              id="verified-search"
              className="input"
              type="search"
              placeholder="Search brand or product…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <p className="meta mb-16">
          {results.length} verified product{results.length === 1 ? "" : "s"}
        </p>

        {results.length === 0 ? (
          <div className="box center">
            <p style={{ margin: 0 }} className="muted">
              No verified products match that search.
            </p>
          </div>
        ) : (
          <div className="grid grid-3">
            {results.map((p, i) => (
              <div
                key={`${p.brand}-${p.product}-${i}`}
                className="box flex"
                style={{ flexDirection: "column", gap: 10 }}
              >
                <div className="flex between items-center gap-8">
                  <span className="kicker">{p.brand}</span>
                  <span className="tag--pass tag">Pass ✓</span>
                </div>
                <h3 className="headline--sm" style={{ margin: 0 }}>
                  {p.product}
                </h3>
                <div className="flex gap-8 wrap items-center">
                  <span className="tag tag--outline">{p.category}</span>
                </div>
                <div className="meta" style={{ marginTop: "auto" }}>
                  {p.batch && p.batch !== "—" ? (
                    <>Batch {p.batch} · </>
                  ) : null}
                  {p.date} · {p.lab}
                </div>
                <a
                  className="btn btn--sm"
                  href={trustifiedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See Report →
                </a>
              </div>
            ))}
          </div>
        )}

        <p className="small muted mt-24">
          This list reflects the Trustified PASS list as published. Batches and
          formulations change — always re-check the current batch at the source
          before buying.
        </p>
      </div>
    </section>
  );
}
