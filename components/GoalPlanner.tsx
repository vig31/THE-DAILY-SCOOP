"use client";
// ============================================================================
// THE GAME PLAN — No. 02
// Reads the shared profile; a small toggle can switch goal muscle↔fat loss.
// Builds a macro prescription + a goal/sex-tailored protocol.
// ============================================================================
import React from "react";
import { useProfile } from "@/lib/store";
import { bmr, tdee, calorieTarget, proteinNeed } from "@/lib/calc";
import { proteinGoals } from "@/lib/data";

function goalLabel(goalId: string): string {
  return proteinGoals.find((g) => g.id === goalId)?.label ?? goalId;
}

interface Protocol {
  heading: string;
  points: string[];
}

function protocol(goalId: string, sex: string, weightKg: number): Protocol {
  const female = sex === "female";
  const lo = Math.round(weightKg * 0.0025 * 10) / 10; // 0.25% BW
  const hi = Math.round(weightKg * 0.005 * 10) / 10; // 0.5% BW
  const cutLo = Math.round(weightKg * 0.005 * 10) / 10; // 0.5% BW
  const cutHi = Math.round(weightKg * 0.01 * 10) / 10; // 1.0% BW

  const shared = [
    "Sleep 7–9 h — recovery is when adaptation is banked, not the gym.",
    "8–10k steps daily keeps NEAT high and appetite honest.",
    "≈ 30–40 ml water per kg body weight; more on training days.",
  ];
  const femaleNote = female
    ? [
        "Cycle-aware: expect more strength in the follicular phase, manage fatigue & cravings in the luteal phase.",
        "Prioritise iron (menstrual losses) and calcium + vitamin D for bone density.",
        "Protein need is the SAME per kg as men — do not under-eat it.",
      ]
    : [];

  switch (goalId) {
    case "muscle":
      return {
        heading: "Hypertrophy Protocol",
        points: [
          "Train 3–5×/wk, progressive overload, 10–20 hard sets per muscle per week.",
          `Aim for ~+${lo}–${hi} kg/wk (≈ +0.25–0.5% body weight) — faster is mostly fat.`,
          "Keep the surplus modest; add slowly and reassess every 2–3 weeks.",
          ...femaleNote,
          ...shared,
        ],
      };
    case "fatloss":
      return {
        heading: "Fat-Loss Protocol",
        points: [
          "Keep lifting heavy — resistance training is the signal to hold muscle in a deficit.",
          `Target ~−${cutLo}–${cutHi} kg/wk (≈ −0.5–1% body weight); slower preserves more lean mass.`,
          "Protein high, fibre high, keep steps up — the deficit does the work, not cardio alone.",
          ...femaleNote,
          ...shared,
        ],
      };
    default:
      return {
        heading: "Maintenance Protocol",
        points: [
          "Train 3–4×/wk to hold muscle and movement quality.",
          "Hold weight steady week to week; let performance, not the scale, lead.",
          ...femaleNote,
          ...shared,
        ],
      };
  }
}

export default function GoalPlanner() {
  const { profile, set } = useProfile();

  const bmrVal = bmr(profile.sex, profile.weightKg, profile.heightCm, profile.age);
  const tdeeVal = tdee(bmrVal, profile.activityId);
  const cals = calorieTarget(tdeeVal, profile.goalId);
  const diff = cals - tdeeVal;

  const pn = proteinNeed(profile.weightKg, profile.goalId, profile.meals);
  const proteinG = pn.recommended;
  const proteinCal = proteinG * 4;
  const fatCal = Math.round(cals * 0.25);
  const fatG = Math.round(fatCal / 9);
  const carbCal = Math.max(cals - proteinCal - fatCal, 0);
  const carbG = Math.round(carbCal / 4);

  const total = proteinCal + fatCal + carbCal || 1;
  const pPct = (proteinCal / total) * 100;
  const fPct = (fatCal / total) * 100;
  const cPct = (carbCal / total) * 100;

  const plan = protocol(profile.goalId, profile.sex, profile.weightKg);

  return (
    <section className="section section--band" id="planner">
      <div className="container">
        <header className="sec-head">
          <div>
            <span className="kicker">Section 06 · Interactive</span>
            <h2 className="section-title">The Game Plan</h2>
            <p className="deck">One goal, translated into calories, macros and a weekly protocol.</p>
          </div>
          <span className="idx">No. 06 / Ledger</span>
        </header>

        {/* quick goal switch — writes back to shared profile */}
        <div className="flex wrap gap-24 items-center mb-24">
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Objective</label>
            <div className="seg" role="group" aria-label="Goal">
              <button
                type="button"
                className={profile.goalId === "muscle" ? "is-active" : ""}
                aria-pressed={profile.goalId === "muscle"}
                onClick={() => set("goalId", "muscle")}
              >
                Muscle Gain
              </button>
              <button
                type="button"
                className={profile.goalId === "fatloss" ? "is-active" : ""}
                aria-pressed={profile.goalId === "fatloss"}
                onClick={() => set("goalId", "fatloss")}
              >
                Fat Loss
              </button>
            </div>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Sex</label>
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
          <p className="small muted" style={{ marginBottom: 0, maxWidth: 280 }}>
            Reading <strong>{goalLabel(profile.goalId)}</strong> from the Vitals Desk. Change vitals
            above; everything here follows.
          </p>
        </div>

        <div className="grid grid-2">
          {/* MACRO PRESCRIPTION */}
          <div className="box box--ink">
            <div className="box-label" style={{ borderColor: "var(--paper)" }}>
              Macro Prescription
            </div>

            <div className="flex between items-end">
              <div>
                <div
                  className="num"
                  style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(2.4rem, 6vw, 3.6rem)", lineHeight: 0.9 }}
                >
                  {cals.toLocaleString()}
                  <span style={{ fontSize: "1.1rem", fontWeight: 700 }}> kcal</span>
                </div>
                <div className="stat__label" style={{ color: "var(--paper)", opacity: 0.75 }}>
                  Daily target
                </div>
              </div>
              <div className="tag tag--pass" style={{ background: "var(--paper)", color: "var(--ink)" }}>
                {diff === 0 ? "Maintenance" : diff > 0 ? `+${diff} surplus` : `${diff} deficit`}
              </div>
            </div>

            {/* stacked macro-calorie bar */}
            <div className="mt-24" aria-hidden="true">
              <div style={{ display: "flex", height: 22, border: "2px solid var(--paper)" }}>
                <div
                  title={`Protein ${Math.round(pPct)}%`}
                  style={{ width: `${pPct}%`, background: "var(--paper)" }}
                />
                <div
                  title={`Fat ${Math.round(fPct)}%`}
                  style={{
                    width: `${fPct}%`,
                    background:
                      "repeating-linear-gradient(45deg, var(--paper) 0 3px, transparent 3px 7px)",
                    borderLeft: "1px solid var(--paper)",
                  }}
                />
                <div
                  title={`Carbs ${Math.round(cPct)}%`}
                  style={{ width: `${cPct}%`, background: "transparent", borderLeft: "1px solid var(--paper)" }}
                />
              </div>
              <div className="flex between small mt-8" style={{ color: "var(--paper)", opacity: 0.85 }}>
                <span>■ Protein {Math.round(pPct)}%</span>
                <span>▨ Fat {Math.round(fPct)}%</span>
                <span>□ Carbs {Math.round(cPct)}%</span>
              </div>
            </div>

            <hr className="rule" style={{ borderColor: "var(--paper)", opacity: 0.4 }} />

            <table className="ledger" style={{ background: "transparent", color: "var(--paper)" }}>
              <tbody>
                <tr>
                  <td style={{ borderColor: "rgba(245,242,234,0.25)", color: "var(--paper)" }}>Protein</td>
                  <td className="num" style={{ borderColor: "rgba(245,242,234,0.25)", color: "var(--paper)" }}>
                    {proteinG} g
                  </td>
                  <td className="num" style={{ borderColor: "rgba(245,242,234,0.25)", color: "var(--paper)" }}>
                    {proteinCal} kcal
                  </td>
                </tr>
                <tr>
                  <td style={{ borderColor: "rgba(245,242,234,0.25)", color: "var(--paper)" }}>Fat</td>
                  <td className="num" style={{ borderColor: "rgba(245,242,234,0.25)", color: "var(--paper)" }}>
                    {fatG} g
                  </td>
                  <td className="num" style={{ borderColor: "rgba(245,242,234,0.25)", color: "var(--paper)" }}>
                    {fatCal} kcal
                  </td>
                </tr>
                <tr>
                  <td style={{ borderColor: "rgba(245,242,234,0.25)", color: "var(--paper)" }}>Carbohydrate</td>
                  <td className="num" style={{ borderColor: "rgba(245,242,234,0.25)", color: "var(--paper)" }}>
                    {carbG} g
                  </td>
                  <td className="num" style={{ borderColor: "rgba(245,242,234,0.25)", color: "var(--paper)" }}>
                    {carbCal} kcal
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="small mt-16" style={{ marginBottom: 0, color: "var(--paper)", opacity: 0.8 }}>
              Protein fixed from body weight; fat set at ~25% of calories; carbohydrate fills the
              remainder — the lever you move on training vs rest days.
            </p>
          </div>

          {/* PROTOCOL */}
          <div className="box">
            <div className="box-label">{plan.heading}</div>
            <ol style={{ margin: 0, paddingLeft: "1.1em" }}>
              {plan.points.map((pt, i) => (
                <li key={i} style={{ marginBottom: 10, lineHeight: 1.45 }}>
                  {pt}
                </li>
              ))}
            </ol>
            <hr className="rule" />
            <p className="footnote" style={{ marginBottom: 0 }}>
              Educational only — evidence-aligned targets (ISSN 2017), not medical advice. Adjust to
              your own response and consult a professional for clinical conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
