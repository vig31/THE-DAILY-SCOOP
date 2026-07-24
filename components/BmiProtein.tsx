"use client";
// ============================================================================
// THE VITALS DESK — No. 01
// Reads & writes the shared profile. Live BMI / BMR / TDEE / protein need.
// ============================================================================
import React from "react";
import { useProfile } from "@/lib/store";
import { bmi, bmiBand, asianBmiBand, bmr, tdee, proteinNeed, r1 } from "@/lib/calc";
import { activityLevels, proteinGoals, asianBmiNote } from "@/lib/data";

function verdict(goalId: string, sex: string): string {
  switch (goalId) {
    case "rda":
      return "This is the anti-deficiency floor — not an optimum. Active people should aim higher.";
    case "maintain":
      return "A maintenance intake to hold muscle and recover between training days.";
    case "muscle":
      return `Eat toward the top of the range on training days — protein is the raw material, a slight surplus is the signal. Same g/kg target for ${sex === "female" ? "women" : "men"}.`;
    case "fatloss":
      return "In a deficit, high protein is muscle insurance — push the upper end to hold lean mass while the fat comes off.";
    case "older":
      return "Older muscle resists the signal — spread protein evenly and keep resistance training in the week.";
    default:
      return "Set your goal to see a tailored protein prescription.";
  }
}

export default function BmiProtein() {
  const { profile, set } = useProfile();

  const bmiVal = bmi(profile.weightKg, profile.heightCm);
  const band = bmiBand(bmiVal);
  const asian = asianBmiBand(bmiVal);
  const bmrVal = bmr(profile.sex, profile.weightKg, profile.heightCm, profile.age);
  const tdeeVal = tdee(bmrVal, profile.activityId);
  const pn = proteinNeed(profile.weightKg, profile.goalId, profile.meals);

  return (
    <section className="section" id="calculator">
      <div className="container">
        <header className="sec-head">
          <div>
            <span className="kicker">Section 05 · Interactive</span>
            <h2 className="section-title">The Vitals Desk</h2>
            <p className="deck">Your numbers, measured once — read by every tool below.</p>
          </div>
          <span className="idx">No. 05 / Ledger</span>
        </header>

        <div className="grid grid-2">
          {/* ---------------- CONTROLS ---------------- */}
          <div className="box">
            <div className="box-label">Enter Your Vitals</div>

            <div className="field">
              <label>Biological Sex</label>
              <div className="seg" role="group" aria-label="Sex">
                <button
                  type="button"
                  className={profile.sex === "male" ? "is-active" : ""}
                  aria-pressed={profile.sex === "male"}
                  onClick={() => set("sex", "male")}
                >
                  Male
                </button>
                <button
                  type="button"
                  className={profile.sex === "female" ? "is-active" : ""}
                  aria-pressed={profile.sex === "female"}
                  onClick={() => set("sex", "female")}
                >
                  Female
                </button>
              </div>
            </div>

            <div className="grid grid-3">
              <div className="field">
                <label htmlFor="v-age">Age (yrs)</label>
                <input
                  id="v-age"
                  className="input"
                  type="number"
                  min={14}
                  max={100}
                  value={profile.age}
                  onChange={(e) => set("age", Number(e.target.value))}
                />
              </div>
              <div className="field">
                <label htmlFor="v-height">Height (cm)</label>
                <input
                  id="v-height"
                  className="input"
                  type="number"
                  min={120}
                  max={230}
                  value={profile.heightCm}
                  onChange={(e) => set("heightCm", Number(e.target.value))}
                />
              </div>
              <div className="field">
                <label htmlFor="v-weight">Weight (kg)</label>
                <input
                  id="v-weight"
                  className="input"
                  type="number"
                  min={35}
                  max={200}
                  value={profile.weightKg}
                  onChange={(e) => set("weightKg", Number(e.target.value))}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="v-activity">Activity Level</label>
              <select
                id="v-activity"
                className="select"
                value={profile.activityId}
                onChange={(e) => set("activityId", e.target.value)}
              >
                {activityLevels.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="v-goal">Goal</label>
              <select
                id="v-goal"
                className="select"
                value={profile.goalId}
                onChange={(e) => set("goalId", e.target.value)}
              >
                {proteinGoals.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field" style={{ marginBottom: 0 }}>
              <label htmlFor="v-meals">Meals / Feeds per Day: {profile.meals}</label>
              <input
                id="v-meals"
                type="range"
                min={2}
                max={6}
                step={1}
                value={profile.meals}
                onChange={(e) => set("meals", Number(e.target.value))}
              />
            </div>
          </div>

          {/* ---------------- RESULTS ---------------- */}
          <div className="grid" style={{ gridTemplateColumns: "1fr", gap: "var(--gutter)" }}>
            {/* BMI */}
            <div className="stat">
              <div className="flex between items-end">
                <div>
                  <div className="stat__value num">{r1(bmiVal)}</div>
                  <div className="stat__label">Body Mass Index</div>
                </div>
                <div className="center">
                  <div className="tag">{band.label}</div>
                  <div className="small muted mt-8" style={{ letterSpacing: "0.06em" }}>
                    Asian-Pacific:
                    <br />
                    <strong>{asian}</strong>
                  </div>
                </div>
              </div>
              <p className="small muted mt-16" style={{ marginBottom: 0 }}>
                {asianBmiNote}
              </p>
            </div>

            {/* BMR / TDEE */}
            <div className="grid grid-2">
              <div className="stat">
                <div className="stat__value num">{bmrVal.toLocaleString()}</div>
                <div className="stat__label">BMR · kcal at rest</div>
              </div>
              <div className="stat">
                <div className="stat__value num">{tdeeVal.toLocaleString()}</div>
                <div className="stat__label">TDEE · kcal / day</div>
              </div>
            </div>

            {/* PROTEIN — the hero */}
            <div className="box box--ink">
              <div className="box-label" style={{ borderColor: "var(--paper)" }}>
                Daily Protein Prescription — {pn.goalLabel}
              </div>
              <div className="flex between items-end wrap gap-16">
                <div>
                  <div
                    className="num"
                    style={{
                      fontFamily: "var(--font-head)",
                      fontWeight: 900,
                      fontSize: "clamp(3rem, 8vw, 5rem)",
                      lineHeight: 0.9,
                    }}
                  >
                    {pn.recommended}
                    <span style={{ fontSize: "1.4rem", fontWeight: 700 }}> g</span>
                  </div>
                  <div className="stat__label" style={{ color: "var(--paper)", opacity: 0.75 }}>
                    Recommended target / day
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="num" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                    {pn.low}–{pn.high} g
                  </div>
                  <div className="stat__label" style={{ color: "var(--paper)", opacity: 0.75 }}>
                    Working range
                  </div>
                  <div className="num mt-16" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                    ≈ {pn.perMeal} g
                  </div>
                  <div className="stat__label" style={{ color: "var(--paper)", opacity: 0.75 }}>
                    Per meal × {profile.meals}
                  </div>
                </div>
              </div>
              <hr className="rule" style={{ borderColor: "var(--paper)", opacity: 0.4 }} />
              <p className="small" style={{ marginBottom: 0, color: "var(--paper)" }}>
                {verdict(profile.goalId, profile.sex)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
