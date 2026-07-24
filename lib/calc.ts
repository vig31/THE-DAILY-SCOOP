// ============================================================================
// PURE CALCULATION HELPERS — BMI, TDEE, protein needs, cost-per-usable-gram.
// No side effects. Shared by every interactive tool.
// ============================================================================
import { activityLevels, bmiBands, proteinGoals, type ProteinSource } from "./data";

export type Sex = "male" | "female";

/** BMI = kg / m^2 */
export function bmi(weightKg: number, heightCm: number): number {
  if (!weightKg || !heightCm) return 0;
  const m = heightCm / 100;
  return weightKg / (m * m);
}

export function bmiBand(value: number) {
  return bmiBands.find((b) => value < b.max) ?? bmiBands[bmiBands.length - 1];
}

/** Asian-Pacific band label (India-relevant) */
export function asianBmiBand(value: number): string {
  if (value < 18.5) return "Underweight";
  if (value < 23) return "Normal";
  if (value < 27.5) return "Overweight (Asian)";
  return "Obese (Asian)";
}

/** Mifflin-St Jeor Basal Metabolic Rate */
export function bmr(sex: Sex, weightKg: number, heightCm: number, age: number): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.round(sex === "male" ? base + 5 : base - 161);
}

export function tdee(bmrVal: number, activityId: string): number {
  const a = activityLevels.find((x) => x.id === activityId) ?? activityLevels[0];
  return Math.round(bmrVal * a.mult);
}

/** Calorie target by goal */
export function calorieTarget(tdeeVal: number, goalId: string): number {
  switch (goalId) {
    case "muscle": return Math.round(tdeeVal * 1.12);   // ~+12% surplus
    case "fatloss": return Math.round(tdeeVal * 0.80);  // ~-20% deficit
    default: return tdeeVal;
  }
}

export interface ProteinNeed {
  low: number; high: number; recommended: number; perMeal: number; goalLabel: string;
}

/** Daily protein need (grams) for a goal, using body weight in kg. */
export function proteinNeed(weightKg: number, goalId: string, meals = 4): ProteinNeed {
  const goal = proteinGoals.find((g) => g.id === goalId) ?? proteinGoals[1];
  const low = Math.round(weightKg * goal.low);
  const high = Math.round(weightKg * goal.high);
  const recommended = Math.round((low + high) / 2);
  return { low, high, recommended, perMeal: Math.round(recommended / meals), goalLabel: goal.label };
}

/**
 * Cost per USABLE gram of protein (₹):
 *   price/kg → price per gram of powder → ÷ protein density → ÷ DIAAS (usable fraction)
 * This is the fair way to compare protein value across sources.
 */
export function costPerUsableGram(p: ProteinSource): number {
  const perGramPowder = p.costPerKgINR / 1000;
  const perGramProtein = perGramPowder / (p.proteinPer100g / 100);
  const usableFraction = Math.min(p.diaas, 1.5); // DIAAS as usable multiplier
  return perGramProtein / usableFraction;
}

/** Grams of a given source needed to hit a protein target, accounting for DIAAS. */
export function servingsForTarget(p: ProteinSource, targetProteinG: number): number {
  const usablePer100 = p.proteinPer100g * Math.min(p.diaas, 1);
  return Math.round((targetProteinG / usablePer100) * 100);
}

/** Round to 1 decimal for display */
export const r1 = (n: number) => Math.round(n * 10) / 10;
