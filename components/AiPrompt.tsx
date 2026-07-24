"use client";
// ============================================================================
// THE BRIEF — No. 04
// Flagship copy feature. Assembles one dense, paste-ready prompt from the LIVE
// shared profile + all derived numbers, for any AI coaching agent.
// ============================================================================
import React, { useMemo, useState } from "react";
import { useProfile } from "@/lib/store";
import { bmi, bmiBand, asianBmiBand, bmr, tdee, calorieTarget, proteinNeed, r1 } from "@/lib/calc";
import { activityLevels, proteinGoals, trustifiedUrl } from "@/lib/data";

export default function AiPrompt() {
  const { profile } = useProfile();
  const [copied, setCopied] = useState(false);

  const brief = useMemo(() => {
    const bmiVal = r1(bmi(profile.weightKg, profile.heightCm));
    const band = bmiBand(bmiVal).label;
    const asian = asianBmiBand(bmiVal);
    const bmrVal = bmr(profile.sex, profile.weightKg, profile.heightCm, profile.age);
    const tdeeVal = tdee(bmrVal, profile.activityId);
    const cals = calorieTarget(tdeeVal, profile.goalId);
    const diff = cals - tdeeVal;
    const pn = proteinNeed(profile.weightKg, profile.goalId, profile.meals);

    const activity = activityLevels.find((a) => a.id === profile.activityId)?.label ?? profile.activityId;
    const goal = proteinGoals.find((g) => g.id === profile.goalId)?.label ?? profile.goalId;
    const calNote = diff === 0 ? "maintenance" : diff > 0 ? `+${diff} kcal surplus` : `${diff} kcal deficit`;

    return `You are an evidence-based nutrition & training coach. Build a complete, personalised plan for the person below. Use ISSN/FAO-aligned reasoning, be practical and non-prescriptive, and make NO medical claims — flag anything that warrants a doctor or dietitian.

== CLIENT PROFILE ==
- Sex: ${profile.sex}
- Age: ${profile.age} yrs
- Height: ${profile.heightCm} cm
- Weight: ${profile.weightKg} kg
- Activity: ${activity}
- Primary goal: ${goal}
- Diet pattern: ${profile.diet}${profile.lactoseFree ? " (lactose-free)" : ""}
- Meals per day: ${profile.meals}
- Budget-sensitive: ${profile.budgetSensitive ? "yes — optimise cost per usable gram of protein" : "no"}
- Allergies / avoid: ${profile.allergies.trim() ? profile.allergies.trim() : "none stated"}

== COMPUTED TARGETS (already calculated — use these, don't re-derive) ==
- BMI: ${bmiVal} (${band}; Asian-Pacific: ${asian})
- BMR (Mifflin-St Jeor): ${bmrVal} kcal
- TDEE: ${tdeeVal} kcal
- Calorie target: ${cals} kcal/day (${calNote} vs TDEE)
- Daily protein: ${pn.low}–${pn.high} g/day, recommend ~${pn.recommended} g
- Per-meal protein: ~${pn.perMeal} g across ${profile.meals} feeds

== SOURCING RULES ==
1. Rank protein foods by DIAAS (protein quality) AND by ₹ per USABLE gram = price ÷ protein density ÷ DIAAS. Prefer high quality-per-rupee.
2. Respect the ${profile.diet} pattern strictly${profile.lactoseFree ? " and keep it lactose-free" : ""}; honour the allergies above.
3. Recommend supplements ONLY if third-party lab-tested. Reference the Trustified PASS list (${trustifiedUrl}) — no untested products.
4. Whey has surged in price; consider soy/pea isolate where quality-per-rupee wins${profile.diet === "vegan" || profile.diet === "vegetarian" ? " (required here given the diet)" : ""}.

== OUTPUT SPEC ==
1. 7-DAY MEAL PLAN — per meal: foods with grams, protein (g), and kcal; daily totals must land on the calorie and protein targets above (±5%).
2. SUPPLEMENT STACK — only Trustified-PASS products, with dose, timing, and the gap each one fills.
3. WEEKLY TRAINING SPLIT — matched to the ${goal} goal and ${activity.toLowerCase()} level.
4. PROGRESS METRICS — what to track weekly (body weight trend, waist, lifts, energy) and when to adjust.
5. GROCERY LIST — consolidated for the week, grouped by aisle, with rough quantities.

Return it as clean, skimmable markdown with tables where it helps.`;
  }, [profile]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="section section--band" id="prompt">
      <div className="container">
        <header className="sec-head">
          <div>
            <span className="kicker">Section 10 · Interactive</span>
            <h2 className="section-title">The Brief — Hand This to Your AI</h2>
            <p className="deck">Everything you entered above, compiled into one paste-ready coaching prompt.</p>
          </div>
          <span className="idx">No. 10 / Ledger</span>
        </header>

        <div className="flex between items-center wrap gap-16 mb-16">
          <p className="small muted" style={{ marginBottom: 0, maxWidth: 560 }}>
            This brief auto-updates from the values you set in the Vitals Desk, Game Plan and Plate —
            change anything above and the text below rewrites itself.
          </p>
          <button type="button" className="btn btn--solid" onClick={copy} aria-live="polite">
            {copied ? "Copied ✓" : "Copy the Brief"}
          </button>
        </div>

        <pre className="codebox" aria-label="Generated AI coaching brief">
          {brief}
        </pre>
      </div>
    </section>
  );
}
