"use client";
// ============================================================================
// BUILD THE PLATE — No. 07
// Exhaustive ingredient day-builder: search / filter by category / sort by
// protein, price, calories or protein-per-rupee. Totals live, then closes the
// gap with the CHEAPEST lab-verified scoop (by ₹ per usable gram).
// ============================================================================
import React, { useMemo, useState } from "react";
import { useProfile } from "@/lib/store";
import { proteinNeed, costPerUsableGram, r1 } from "@/lib/calc";
import { wholeFoods, proteinSources, trustifiedProducts, type WholeFood, type FoodCat } from "@/lib/data";

const CATS: FoodCat[] = ["Grain", "Pulse/Legume", "Soy", "Dairy", "Egg", "Meat/Fish", "Nuts/Seeds"];

function allowedForDiet(f: WholeFood, diet: string): boolean {
  switch (diet) {
    case "vegan": return f.cat !== "Meat/Fish" && f.cat !== "Egg" && f.cat !== "Dairy";
    case "vegetarian": return f.cat !== "Meat/Fish" && f.cat !== "Egg";
    case "eggetarian": return f.cat !== "Meat/Fish";
    default: return true;
  }
}

type SortKey = "protein" | "price" | "kcal" | "value";
const SORTS: { id: SortKey; label: string }[] = [
  { id: "value", label: "Protein per ₹ (best)" },
  { id: "protein", label: "Protein (high→low)" },
  { id: "price", label: "Price (low→high)" },
  { id: "kcal", label: "Calories (low→high)" },
];

// Cheapest PASS-verified scoop for the diet, by ₹ per usable gram.
function cheapestScoop(diet: string) {
  const powders = proteinSources.filter(
    (s) => s.proteinPer100g >= 70 && (diet === "vegan" ? s.type !== "Animal" : true)
  );
  const src = powders.reduce((a, b) => (costPerUsableGram(b) < costPerUsableGram(a) ? b : a));
  const product =
    trustifiedProducts.find((p) => p.category === src.trustifiedTag) ??
    trustifiedProducts.find((p) => p.category === "Plant");
  return { src, product };
}

const SCOOP_G = 30;

export default function MealPlanner() {
  const { profile } = useProfile();
  const [qty, setQty] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<FoodCat | "All">("All");
  const [sort, setSort] = useState<SortKey>("value");

  const dietFoods = useMemo(
    () => wholeFoods.filter((f) => allowedForDiet(f, profile.diet)),
    [profile.diet]
  );

  const visible = useMemo(() => {
    let list = dietFoods.filter((f) => cat === "All" || f.cat === cat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((f) => f.name.toLowerCase().includes(q) || f.cat.toLowerCase().includes(q));
    }
    const sorted = [...list];
    sorted.sort((a, b) => {
      switch (sort) {
        case "protein": return b.protein - a.protein;
        case "price": return a.priceINR - b.priceINR;
        case "kcal": return a.kcal - b.kcal;
        case "value": return b.protein / b.priceINR - a.protein / a.priceINR;
      }
    });
    return sorted;
  }, [dietFoods, cat, search, sort]);

  const target = proteinNeed(profile.weightKg, profile.goalId).recommended;

  // totals across ALL chosen foods (not just the filtered view)
  const totals = wholeFoods.reduce(
    (acc, f) => {
      const n = qty[f.id] ?? 0;
      acc.protein += n * f.protein;
      acc.kcal += n * f.kcal;
      acc.cost += n * f.priceINR;
      return acc;
    },
    { protein: 0, kcal: 0, cost: 0 }
  );
  const remaining = Math.max(target - totals.protein, 0);
  const pct = target > 0 ? Math.min((totals.protein / target) * 100, 100) : 0;

  const { src, product } = cheapestScoop(profile.diet);
  const proteinPerScoop = Math.round((SCOOP_G * src.proteinPer100g) / 100);
  const scoops = remaining > 0 ? Math.ceil(remaining / proteinPerScoop) : 0;
  const costPerScoop = Math.round((src.costPerKgINR / 1000) * SCOOP_G);

  const availCats = CATS.filter((c) => dietFoods.some((f) => f.cat === c));
  const step = (id: string, delta: number) =>
    setQty((q) => ({ ...q, [id]: Math.max((q[id] ?? 0) + delta, 0) }));

  return (
    <section className="section" id="meals">
      <div className="container">
        <header className="sec-head">
          <div>
            <span className="kicker">Section 07 · Interactive</span>
            <h2 className="section-title">Build the Plate</h2>
            <p className="deck">Search real food, sort by value, watch the protein ledger fill, then close the gap.</p>
          </div>
          <span className="idx">No. 07 / Ledger</span>
        </header>

        <div className="grid grid-2">
          {/* --------- PANTRY --------- */}
          <div className="box">
            <div className="box-label">
              The Pantry · {profile.diet}
              {profile.lactoseFree ? " · lactose-free" : ""} · {visible.length} foods
            </div>

            {/* controls */}
            <div className="field" style={{ marginBottom: 12 }}>
              <input
                className="input"
                type="search"
                placeholder="Search food (rice, dal, paneer…)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search foods"
              />
            </div>
            <div className="flex wrap gap-8" style={{ marginBottom: 10 }}>
              <button className={`btn btn--sm ${cat === "All" ? "is-active" : ""}`} onClick={() => setCat("All")}>All</button>
              {availCats.map((c) => (
                <button key={c} className={`btn btn--sm ${cat === c ? "is-active" : ""}`} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
            <div className="field">
              <label htmlFor="mp-sort">Sort by</label>
              <select id="mp-sort" className="select" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>

            <div className="table-wrap" style={{ border: "0", maxHeight: 520, overflowY: "auto" }}>
              <table className="ledger">
                <thead>
                  <tr>
                    <th>Food</th>
                    <th className="num">Protein</th>
                    <th className="num">₹</th>
                    <th className="num">kcal</th>
                    <th className="num nowrap">Servings</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((f) => {
                    const n = qty[f.id] ?? 0;
                    const flagged = profile.lactoseFree && f.cat === "Dairy";
                    return (
                      <tr key={f.id} className={n > 0 ? "is-highlight" : ""}>
                        <td>
                          <strong>{f.name}</strong>
                          <div className="small muted">
                            {f.per} · {f.cat}
                            {flagged ? " · ⚠ lactose" : ""}
                          </div>
                        </td>
                        <td className="num">{f.protein} g</td>
                        <td className="num">₹{f.priceINR}</td>
                        <td className="num">{f.kcal}</td>
                        <td className="num">
                          <span className="flex gap-8 items-center" style={{ justifyContent: "flex-end" }}>
                            <button type="button" className="btn btn--sm" aria-label={`Remove one ${f.name}`} onClick={() => step(f.id, -1)} disabled={n === 0}>−</button>
                            <span className="num" style={{ minWidth: 18, textAlign: "center" }}>{n}</span>
                            <button type="button" className="btn btn--sm" aria-label={`Add one ${f.name}`} onClick={() => step(f.id, 1)}>+</button>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {visible.length === 0 && (
                    <tr><td colSpan={5} className="small muted center" style={{ padding: 18 }}>No foods match — clear the search or category filter.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="footnote mt-16" style={{ marginBottom: 0 }}>
              Filtered to your <strong>{profile.diet}</strong> setting. Prices are approximate India-2026 retail per serving.
            </p>
          </div>

          {/* --------- NUTRITION LEDGER --------- */}
          <div className="grid" style={{ gridTemplateColumns: "1fr", gap: "var(--gutter)", alignContent: "start" }}>
            <div className="box box--ink">
              <div className="box-label" style={{ borderColor: "var(--paper)" }}>Nutrition Ledger</div>
              <div className="grid grid-3">
                <div>
                  <div className="num" style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(1.6rem,4vw,2.6rem)", lineHeight: 0.9 }}>
                    {Math.round(totals.protein)}<span style={{ fontSize: "0.9rem", fontWeight: 700 }}> / {target}g</span>
                  </div>
                  <div className="stat__label" style={{ color: "var(--paper)", opacity: 0.75 }}>Protein</div>
                </div>
                <div>
                  <div className="num" style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(1.6rem,4vw,2.6rem)", lineHeight: 0.9 }}>
                    {Math.round(totals.kcal).toLocaleString()}
                  </div>
                  <div className="stat__label" style={{ color: "var(--paper)", opacity: 0.75 }}>kcal</div>
                </div>
                <div>
                  <div className="num" style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(1.6rem,4vw,2.6rem)", lineHeight: 0.9 }}>
                    ₹{Math.round(totals.cost)}
                  </div>
                  <div className="stat__label" style={{ color: "var(--paper)", opacity: 0.75 }}>plate cost</div>
                </div>
              </div>
              <div className="mt-24">
                <div style={{ height: 16, border: "2px solid var(--paper)", position: "relative" }}>
                  <div style={{ position: "absolute", inset: "0 auto 0 0", width: `${pct}%`, background: "var(--paper)" }} />
                </div>
                <div className="flex between small mt-8" style={{ color: "var(--paper)", opacity: 0.85 }}>
                  <span className="num">{Math.round(pct)}% of target</span>
                  <span className="num">{Math.round(remaining)} g remaining</span>
                </div>
              </div>
            </div>

            {/* cheapest verified scoop */}
            <div className="box">
              <div className="box-label">Close the Gap · Cheapest Verified Scoop</div>
              {remaining <= 0 ? (
                <p style={{ marginBottom: 0 }}>
                  <span className="stamp stamp--verified">Target met</span>
                  <br />
                  <span className="small muted">Whole food covered today&rsquo;s {target} g. No powder required.</span>
                </p>
              ) : (
                <>
                  <p style={{ marginBottom: 12 }}>
                    You&rsquo;re short <strong className="num">{Math.round(remaining)} g</strong>. The best-value fix for your{" "}
                    <strong>{profile.diet}</strong> diet is{" "}
                    <strong>{src.name}</strong> at{" "}
                    <strong className="num">₹{r1(costPerUsableGram(src))}/usable&nbsp;g</strong> — about{" "}
                    <strong className="num">{scoops} scoop{scoops === 1 ? "" : "s"}</strong>{" "}
                    (~{SCOOP_G} g each · {proteinPerScoop} g protein · ≈₹{costPerScoop}/scoop).
                  </p>
                  {product ? (
                    <div className="box box--flat" style={{ padding: "12px 14px" }}>
                      <div className="flex between items-center wrap gap-8">
                        <div>
                          <strong>{product.brand}</strong> — {product.product}
                          <div className="small muted">{product.category} · {product.lab} · {product.date}</div>
                        </div>
                        <span className="tag tag--pass">Trustified PASS</span>
                      </div>
                    </div>
                  ) : null}
                  <p className="footnote mt-16" style={{ marginBottom: 0 }}>
                    Chosen by lowest ₹ per <em>usable</em> gram (price ÷ density ÷ DIAAS) among lab-tested PASS batches — not headline price.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
