// ============================================================================
// THE PROTEIN LEDGER — VERIFIED DATA LAYER
// Every figure here is sourced (see `references`). Values are representative
// figures from peer-reviewed / institutional sources; ranges are noted where
// the literature disagrees. DO NOT invent numbers — extend only from sources.
// ============================================================================

export type ProteinType = "Animal" | "Plant" | "Blend" | "Novel";
export type Speed = "Fast" | "Intermediate" | "Slow";

export interface ProteinSource {
  id: string;
  name: string;
  short: string;
  type: ProteinType;
  diaas: number;            // Digestible Indispensable Amino Acid Score (FAO)
  diaasNote?: string;
  pdcaas: number;           // Protein Digestibility Corrected AA Score (capped 1.0)
  digestibility: number;    // true ileal digestibility, %
  leucinePct: number;       // leucine as % of protein (MPS trigger)
  proteinPer100g: number;   // g protein per 100 g of powder/food as consumed
  costPerKgINR: number;     // approx retail ₹/kg (India, 2026) — for comparison only
  costTrend: "surging" | "rising" | "stable" | "cheap";
  speed: Speed;
  limitingAA: string;
  complete: boolean;        // supplies all 9 EAAs in adequate ratio
  notes: string;
  trustifiedTag: string;    // maps to trustifiedProducts.category for verified links
}

// ---- SUPPLEMENT / ISOLATED PROTEIN FORMS ----------------------------------
// DIAAS/PDCAAS: Herreman 2020; FAO 2013. Leucine: USDA / Gorissen 2018.
export const proteinSources: ProteinSource[] = [
  {
    id: "whey-isolate", name: "Whey Protein Isolate", short: "Whey Isolate", type: "Animal",
    diaas: 1.09, pdcaas: 1.0, digestibility: 97, leucinePct: 11.0, proteinPer100g: 90,
    costPerKgINR: 3800, costTrend: "surging", speed: "Fast", limitingAA: "None (reference)",
    complete: true, trustifiedTag: "Whey",
    notes: "Gold standard for muscle protein synthesis: highest leucine, fastest absorption, near-complete digestion. Lactose/fat stripped out.",
  },
  {
    id: "whey-concentrate", name: "Whey Protein Concentrate (80%)", short: "Whey Conc.", type: "Animal",
    diaas: 1.09, pdcaas: 1.0, digestibility: 96, leucinePct: 10.5, proteinPer100g: 80,
    costPerKgINR: 3000, costTrend: "surging", speed: "Fast", limitingAA: "None",
    complete: true, trustifiedTag: "Whey",
    notes: "Same amino profile as isolate at lower cost; retains some lactose & fat. Excellent value when tolerated.",
  },
  {
    id: "casein", name: "Micellar Casein", short: "Casein", type: "Animal",
    diaas: 1.09, diaasNote: "Whole milk 1.14", pdcaas: 1.0, digestibility: 95, leucinePct: 9.3, proteinPer100g: 84,
    costPerKgINR: 3200, costTrend: "surging", speed: "Slow", limitingAA: "None",
    complete: true, trustifiedTag: "Whey",
    notes: "Forms a gel in the stomach → slow, sustained amino release over 6–8 h. Ideal pre-sleep / long gaps between meals.",
  },
  {
    id: "egg-white", name: "Egg White Protein", short: "Egg White", type: "Animal",
    diaas: 1.13, diaasNote: "Whole egg, cooked", pdcaas: 1.0, digestibility: 96, leucinePct: 8.6, proteinPer100g: 80,
    costPerKgINR: 1800, costTrend: "rising", speed: "Intermediate", limitingAA: "None",
    complete: true, trustifiedTag: "Whey",
    notes: "Dairy-free complete animal protein. Cooking raises digestibility from ~50% (raw) to ~95%.",
  },
  {
    id: "soy-isolate", name: "Soy Protein Isolate", short: "Soy Isolate", type: "Plant",
    diaas: 0.90, diaasNote: "Range 0.84–0.98", pdcaas: 1.0, digestibility: 95, leucinePct: 8.0, proteinPer100g: 90,
    costPerKgINR: 900, costTrend: "cheap", speed: "Intermediate", limitingAA: "Methionine (borderline)",
    complete: true, trustifiedTag: "Soy",
    notes: "The only single plant protein that is fully complete AND scores PDCAAS 1.0. Highest quality-per-rupee. Contains isoflavones; does not lower testosterone at normal intakes (meta-analyses).",
  },
  {
    id: "pea-isolate", name: "Pea Protein Isolate", short: "Pea Isolate", type: "Plant",
    diaas: 0.82, diaasNote: "Range 0.62–0.82", pdcaas: 0.73, digestibility: 92, leucinePct: 8.0, proteinPer100g: 80,
    costPerKgINR: 1600, costTrend: "rising", speed: "Intermediate", limitingAA: "Methionine + Cysteine",
    complete: true, trustifiedTag: "Plant",
    notes: "High in lysine & BCAAs, low sulfur amino acids. Hypoallergenic. Best paired with rice protein to close the gap.",
  },
  {
    id: "rice-protein", name: "Rice Protein Concentrate", short: "Rice", type: "Plant",
    diaas: 0.42, diaasNote: "Range 0.37–0.47", pdcaas: 0.47, digestibility: 88, leucinePct: 8.2, proteinPer100g: 80,
    costPerKgINR: 1400, costTrend: "rising", speed: "Intermediate", limitingAA: "Lysine",
    complete: false, trustifiedTag: "Plant",
    notes: "Lysine-limited on its own. Complements pea protein perfectly — the pea+rice blend reaches an animal-like profile.",
  },
  {
    id: "hemp-protein", name: "Hemp Protein", short: "Hemp", type: "Plant",
    diaas: 0.48, diaasNote: "No quality claim (<0.75)", pdcaas: 0.49, digestibility: 88, leucinePct: 6.2, proteinPer100g: 50,
    costPerKgINR: 2200, costTrend: "rising", speed: "Slow", limitingAA: "Lysine",
    complete: false, trustifiedTag: "Plant",
    notes: "Whole-food protein with fibre & omega-3, but low protein density and lysine. Treat as a fibre/nutrition add-on, not a primary protein.",
  },
  {
    id: "soy-whey-blend", name: "Soy + Whey / Pea + Rice Blend", short: "Blend", type: "Blend",
    diaas: 1.0, diaasNote: "Depends on ratio", pdcaas: 1.0, digestibility: 95, leucinePct: 9.0, proteinPer100g: 82,
    costPerKgINR: 2200, costTrend: "rising", speed: "Intermediate", limitingAA: "None (complementary)",
    complete: true, trustifiedTag: "Plant",
    notes: "Blending covers each protein's weak amino acid and staggers absorption speed. A well-formulated blend rivals whey for whole-day coverage.",
  },
  {
    id: "yeast-protein", name: "Fermented Yeast Protein", short: "Yeast", type: "Novel",
    diaas: 0.9, diaasNote: "Emerging — manufacturer data, not FAO-ratified", pdcaas: 0.9, digestibility: 93, leucinePct: 8.0, proteinPer100g: 80,
    costPerKgINR: 2600, costTrend: "rising", speed: "Intermediate", limitingAA: "None (claimed complete)",
    complete: true, trustifiedTag: "Plant",
    notes: "New fermentation-derived complete vegan protein (e.g. Superyou, Nutrabay). Promising amino profile; independent DIAAS data still maturing — verify per batch.",
  },
];

// ---- WHOLE-FOOD ANCHORS (for ingredient-based meal planning) ---------------
// priceINR = approx cost of the listed serving (India, 2026) — for value sorting.
export type FoodCat = "Grain" | "Pulse/Legume" | "Soy" | "Dairy" | "Egg" | "Meat/Fish" | "Nuts/Seeds";
export interface WholeFood {
  id: string; name: string; per: string; protein: number; kcal: number;
  diaas: number; veg: boolean; leucineG: number; priceINR: number; cat: FoodCat; note: string;
}
export const wholeFoods: WholeFood[] = [
  // GRAINS & STAPLES
  { id: "rice", name: "Cooked Rice", per: "1 cup (150g)", protein: 4, kcal: 200, diaas: 0.60, veg: true, leucineG: 0.3, priceINR: 8, cat: "Grain", note: "Lysine-poor but methionine-rich — perfect complement to dal." },
  { id: "chapati", name: "Chapati / Roti", per: "1 (40g)", protein: 3, kcal: 110, diaas: 0.45, veg: true, leucineG: 0.2, priceINR: 6, cat: "Grain", note: "Whole-wheat staple; combine with dal/paneer to complete the protein." },
  { id: "bread", name: "Whole-Wheat Bread", per: "2 slices", protein: 6, kcal: 160, diaas: 0.45, veg: true, leucineG: 0.4, priceINR: 12, cat: "Grain", note: "Convenient carbs; pair with eggs/peanut butter." },
  { id: "oats", name: "Oats (dry)", per: "40 g", protein: 5, kcal: 150, diaas: 0.57, veg: true, leucineG: 0.4, priceINR: 12, cat: "Grain", note: "Fibre + slow carbs; great shake base." },
  { id: "poha", name: "Poha (flattened rice)", per: "50 g dry", protein: 3, kcal: 180, diaas: 0.50, veg: true, leucineG: 0.2, priceINR: 8, cat: "Grain", note: "Add peanuts + sprouts to lift the protein." },
  { id: "idli", name: "Idli", per: "2 pieces", protein: 4, kcal: 120, diaas: 0.62, veg: true, leucineG: 0.3, priceINR: 15, cat: "Grain", note: "Fermented rice+dal — more complete than plain rice." },
  { id: "dosa", name: "Dosa (plain)", per: "1 piece", protein: 4, kcal: 165, diaas: 0.62, veg: true, leucineG: 0.3, priceINR: 20, cat: "Grain", note: "Rice+urad batter; pair with sambar for lysine." },
  { id: "quinoa", name: "Quinoa (cooked)", per: "1 cup (185g)", protein: 8, kcal: 222, diaas: 0.78, veg: true, leucineG: 0.5, priceINR: 35, cat: "Grain", note: "One of the few near-complete grains." },
  { id: "daliya", name: "Daliya / Broken Wheat (cooked)", per: "1 cup", protein: 6, kcal: 150, diaas: 0.50, veg: true, leucineG: 0.4, priceINR: 10, cat: "Grain", note: "Cheap fibre + carbs; savoury or sweet." },
  // PULSES & LEGUMES
  { id: "lentils", name: "Lentils / Dal (cooked)", per: "1 cup (200g)", protein: 18, kcal: 230, diaas: 0.65, veg: true, leucineG: 1.3, priceINR: 15, cat: "Pulse/Legume", note: "Lysine-rich; rice/roti completes it." },
  { id: "rajma", name: "Rajma (kidney beans, cooked)", per: "1 cup (175g)", protein: 15, kcal: 225, diaas: 0.65, veg: true, leucineG: 1.1, priceINR: 18, cat: "Pulse/Legume", note: "Classic rajma-chawal is a complete-protein meal." },
  { id: "chickpea", name: "Chickpea / Chana (cooked)", per: "1 cup (160g)", protein: 15, kcal: 269, diaas: 0.70, veg: true, leucineG: 1.1, priceINR: 16, cat: "Pulse/Legume", note: "Fibre + protein; pair with grains." },
  { id: "moong", name: "Moong Dal (cooked)", per: "1 cup", protein: 14, kcal: 210, diaas: 0.68, veg: true, leucineG: 1.0, priceINR: 14, cat: "Pulse/Legume", note: "Light, easy to digest, high protein." },
  { id: "sprouts", name: "Moong Sprouts", per: "1 cup (100g)", protein: 7, kcal: 100, diaas: 0.68, veg: true, leucineG: 0.5, priceINR: 10, cat: "Pulse/Legume", note: "Raw or steamed; great protein snack." },
  { id: "besan", name: "Besan / Gram Flour", per: "30 g", protein: 6, kcal: 110, diaas: 0.66, veg: true, leucineG: 0.5, priceINR: 8, cat: "Pulse/Legume", note: "Chilla/cheela batter — cheap protein breakfast." },
  { id: "sattu", name: "Sattu (roasted gram)", per: "30 g", protein: 6, kcal: 120, diaas: 0.66, veg: true, leucineG: 0.5, priceINR: 10, cat: "Pulse/Legume", note: "Mix in water for a cheap desi protein drink." },
  // SOY
  { id: "soya-chunks", name: "Soya Chunks (dry)", per: "50 g", protein: 26, kcal: 172, diaas: 0.90, veg: true, leucineG: 2.0, priceINR: 12, cat: "Soy", note: "Highest veg protein-per-rupee whole food in India." },
  { id: "tofu", name: "Tofu", per: "100 g", protein: 12, kcal: 145, diaas: 0.90, veg: true, leucineG: 0.9, priceINR: 25, cat: "Soy", note: "Complete plant protein; absorbs any flavour." },
  // DAIRY
  { id: "paneer", name: "Paneer", per: "100 g", protein: 18, kcal: 265, diaas: 1.10, veg: true, leucineG: 1.7, priceINR: 40, cat: "Dairy", note: "Vegetarian complete protein; watch the fat/kcal." },
  { id: "greek-yogurt", name: "Greek Yogurt / Hung Curd", per: "100 g", protein: 9, kcal: 59, diaas: 1.10, veg: true, leucineG: 0.9, priceINR: 25, cat: "Dairy", note: "Casein-rich, slow-digesting, gut-friendly." },
  { id: "curd", name: "Curd / Dahi", per: "1 cup (150g)", protein: 5, kcal: 90, diaas: 1.10, veg: true, leucineG: 0.5, priceINR: 15, cat: "Dairy", note: "Everyday probiotic protein." },
  { id: "milk", name: "Toned Milk", per: "250 ml", protein: 8, kcal: 125, diaas: 1.14, veg: true, leucineG: 0.8, priceINR: 14, cat: "Dairy", note: "20% whey / 80% casein — naturally staggered release." },
  { id: "cheese", name: "Cheese Slice", per: "1 slice (20g)", protein: 4, kcal: 70, diaas: 1.00, veg: true, leucineG: 0.4, priceINR: 15, cat: "Dairy", note: "Convenient but fat/salt dense — small doses." },
  // EGG
  { id: "egg", name: "Whole Egg (boiled)", per: "1 large (50g)", protein: 6.3, kcal: 78, diaas: 1.13, veg: true, leucineG: 0.54, priceINR: 7, cat: "Egg", note: "Cheapest complete animal protein per gram." },
  { id: "egg-white", name: "Egg Whites", per: "3 whites", protein: 11, kcal: 51, diaas: 1.10, veg: true, leucineG: 0.9, priceINR: 21, cat: "Egg", note: "Lean complete protein, almost zero fat." },
  // MEAT & FISH
  { id: "chicken", name: "Chicken Breast (cooked)", per: "100 g", protein: 31, kcal: 165, diaas: 1.08, veg: false, leucineG: 2.3, priceINR: 35, cat: "Meat/Fish", note: "Lean, high-density, low fat." },
  { id: "fish", name: "Fish (Rohu/Salmon, cooked)", per: "100 g", protein: 22, kcal: 140, diaas: 1.10, veg: false, leucineG: 1.8, priceINR: 40, cat: "Meat/Fish", note: "Complete protein + omega-3." },
  { id: "mutton", name: "Mutton (cooked)", per: "100 g", protein: 26, kcal: 250, diaas: 0.99, veg: false, leucineG: 2.0, priceINR: 90, cat: "Meat/Fish", note: "High protein but fattier — occasional." },
  { id: "prawns", name: "Prawns (cooked)", per: "100 g", protein: 24, kcal: 99, diaas: 1.00, veg: false, leucineG: 1.9, priceINR: 80, cat: "Meat/Fish", note: "Very lean, high protein seafood." },
  // NUTS & SEEDS
  { id: "peanut", name: "Peanuts", per: "40 g", protein: 10, kcal: 235, diaas: 0.52, veg: true, leucineG: 0.7, priceINR: 12, cat: "Nuts/Seeds", note: "Calorie-dense; methionine-limited, snack not staple." },
  { id: "peanut-butter", name: "Peanut Butter", per: "2 tbsp (32g)", protein: 8, kcal: 190, diaas: 0.52, veg: true, leucineG: 0.6, priceINR: 18, cat: "Nuts/Seeds", note: "Great on bread/oats; watch total calories." },
  { id: "almonds", name: "Almonds", per: "30 g", protein: 6, kcal: 175, diaas: 0.40, veg: true, leucineG: 0.4, priceINR: 30, cat: "Nuts/Seeds", note: "Fats + vitamin E; protein is a bonus, not the point." },
];

// ---- SUPPLEMENT VERDICT (evidence-tiered buy / skip / avoid) ---------------
// Sourced from an evidence-review breakdown; each item links to its timestamp.
export const supplementSourceUrl = "https://www.youtube.com/watch?v=ZqVzw49e1q8";
export type SupTier = "must" | "optional" | "avoid";
export interface SupplementItem {
  name: string; tier: SupTier; ts: string; url: string; dose?: string; why: string;
}
const yt = (t: number) => `${supplementSourceUrl}&t=${t}`;
export const supplementGuide: SupplementItem[] = [
  // ---- MUST BUY / RECOMMENDED ----
  { name: "Creatine Monohydrate", tier: "must", ts: "14:14", url: yt(854), dose: "3–5 g daily",
    why: "One of the most thoroughly researched supplements. Stick to standard monohydrate — don't overpay for HCL or Nitrate forms." },
  { name: "Protein Powder / Whey", tier: "must", ts: "16:25", url: yt(985), dose: "As needed to hit target",
    why: "Very useful for hitting daily protein, especially for vegetarians or people with busy schedules." },
  { name: "Vitamin D3", tier: "must", ts: "03:35", url: yt(215), dose: "60k IU weekly (if deficient)",
    why: "Highly recommended if tested deficient — over 50% of Indians are. Take with a high-fat meal." },
  { name: "Vitamin B12", tier: "must", ts: "00:22", url: yt(22), dose: "Per blood test",
    why: "Essential if blood tests show a deficiency (common in vegetarians/vegans) to prevent fatigue and nerve issues." },
  { name: "Omega-3 / Fish Oil", tier: "must", ts: "06:30", url: yt(390), dose: "~1000 mg EPA+DHA",
    why: "Recommended if you don't eat fatty fish 3–4×/week. Judge by total combined EPA/DHA on the label, not capsule size." },
  { name: "Isabgol / Psyllium Husk", tier: "must", ts: "12:09", url: yt(729), dose: "As needed for ~30 g fibre/day",
    why: "A strong buy if your diet doesn't provide enough natural fibre from fruits, vegetables and legumes." },
  // ---- OPTIONAL / CONDITIONAL ----
  { name: "Magnesium", tier: "optional", ts: "01:17", url: yt(77), dose: "Prefer Glycinate",
    why: "Helps sleep, stress and recovery if dietary intake (nuts, seeds, dark chocolate) is low. Avoid cheap Magnesium Oxide." },
  { name: "Caffeine / Pre-Workout", tier: "optional", ts: "10:30", url: yt(630), dose: "<400 mg/day, ≤200 mg/dose",
    why: "Black coffee works just as well as commercial pre-workouts. Avoid within 5 hours of sleep." },
  { name: "Electrolytes", tier: "optional", ts: "02:37", url: yt(157), dose: "During heavy sweat only",
    why: "Only needed for prolonged intense/outdoor workouts or heavy sweating in heat. Not for sedentary people." },
  { name: "Zinc", tier: "optional", ts: "09:53", url: yt(593), dose: "Only if deficient",
    why: "Helpful only if you are deficient; excess supplementation can cause a copper deficiency." },
  // ---- AVOID / WASTE OF MONEY ----
  { name: "Fat Burners", tier: "avoid", ts: "05:05", url: yt(305),
    why: "“Money burners.” No scientific backing for sustained fat loss without a calorie deficit." },
  { name: "Mass Gainers", tier: "avoid", ts: "05:33", url: yt(333),
    why: "Packed with added sugar and maltodextrin. Make your own: whey + banana + oats + peanut butter + milk." },
  { name: "Glutamine", tier: "avoid", ts: "13:01", url: yt(781),
    why: "The body produces it naturally — extra is useless if total protein intake is adequate." },
  { name: "BCAAs", tier: "avoid", ts: "13:41", url: yt(821),
    why: "Redundant if you eat enough total protein, which already contains all 9 essential amino acids." },
  { name: "Standalone Iodine", tier: "avoid", ts: "08:29", url: yt(509),
    why: "Unnecessary if you use regular iodised salt — don't rely solely on pink Himalayan salt." },
];
export const healthCheckNote =
  "Several of these (Vitamin D3, B12, Zinc, Omega-3) are worth taking only when a blood test flags a need. Get a health checkup if you have symptoms or aren't sure — otherwise skip the test and the pills.";

// ---- COST STORY (INDIA, 2025–2026) ----------------------------------------
export const costStory = {
  headline: "Whey has quadrupled. Soy stayed cheap.",
  points: [
    { label: "Whey concentrate — bulk (pre-2024)", value: "₹700–800 / kg", tone: "was" },
    { label: "Whey concentrate — bulk (2025)", value: "₹2,000–2,300 / kg", tone: "now" },
    { label: "Input costs, 24-month rise", value: "+200–250%", tone: "now" },
    { label: "Global whey (2026 spike)", value: "≈ 4× vs 2024", tone: "now" },
    { label: "Retail whey tub (1 kg)", value: "₹3,000–6,000", tone: "now" },
    { label: "Soy protein isolate — bulk", value: "≈ ₹900 / kg", tone: "cheap" },
    { label: "India's whey that is imported", value: "80–85%", tone: "now" },
  ],
  drivers: [
    "India imports 80–85% of supplement-grade whey — the price is set abroad and by the rupee.",
    "Global dairy/whey supply shortages pushed prices to record highs through 2025–2026.",
    "Surging fitness + older-adult demand (India protein market ~17.7% CAGR).",
    "FMCG brands are reformulating toward soy, pea and yeast protein as whey climbs.",
  ],
  takeaway:
    "Judge cost by rupees per USABLE gram of protein — price ÷ protein density ÷ digestibility (DIAAS). On that metric soy protein isolate is now dramatically cheaper than whey while still scoring PDCAAS 1.0.",
};

// ---- PROTEIN REQUIREMENTS (g/kg body weight/day) --------------------------
// ISSN Position Stand (Jäger 2017) + ESPEN older-adult guidance.
export interface ProteinGoal {
  id: string; label: string; blurb: string; low: number; high: number;
}
export const proteinGoals: ProteinGoal[] = [
  { id: "rda", label: "Sedentary (RDA floor)", blurb: "Prevents deficiency only — not optimal for active people.", low: 0.8, high: 1.0 },
  { id: "maintain", label: "General / Active", blurb: "Everyday fitness, maintain muscle & recovery.", low: 1.2, high: 1.6 },
  { id: "muscle", label: "Muscle Gain (hypertrophy)", blurb: "Resistance training in a slight surplus.", low: 1.6, high: 2.2 },
  { id: "fatloss", label: "Fat Loss (preserve muscle)", blurb: "Calorie deficit — higher protein protects lean mass. Lean/aggressive cuts → top of range.", low: 1.6, high: 2.4 },
  { id: "older", label: "Older Adult (50+)", blurb: "Counters age-related muscle loss (sarcopenia).", low: 1.2, high: 1.6 },
];

// Activity multipliers for TDEE (Mifflin-St Jeor)
export const activityLevels = [
  { id: "sedentary", label: "Sedentary (desk, little exercise)", mult: 1.2 },
  { id: "light", label: "Light (1–3 workouts/wk)", mult: 1.375 },
  { id: "moderate", label: "Moderate (3–5 workouts/wk)", mult: 1.55 },
  { id: "active", label: "Active (6–7 workouts/wk)", mult: 1.725 },
  { id: "athlete", label: "Athlete (2x/day, physical job)", mult: 1.9 },
];

// ---- BMI CLASSIFICATION (WHO + Asian cutoffs) -----------------------------
export const bmiBands = [
  { max: 18.5, label: "Underweight", who: "Underweight", note: "Prioritize a surplus + strength work." },
  { max: 25, label: "Normal", who: "Normal (Asian: 23 upper)", note: "Healthy range; recomposition is realistic." },
  { max: 30, label: "Overweight", who: "Overweight (Asian: 23–27.5)", note: "Modest deficit + high protein." },
  { max: 999, label: "Obese", who: "Obese (Asian: ≥27.5)", note: "Structured deficit; consider clinical support." },
];
export const asianBmiNote =
  "India-relevant: WHO Asian-Pacific cutoffs flag risk earlier — overweight at BMI 23 and obese at 27.5, versus 25 / 30 globally (Lancet 2004).";

// ---- TRUSTIFIED VERIFIED PRODUCTS (PASS only) -----------------------------
// Source: trustified.in/passandfail — independent lab testing (Eurofins/TÜV NORD).
// Only PASS products included, per user requirement.
export interface TrustifiedProduct {
  brand: string; product: string; category: "Whey" | "Soy" | "Plant" | "Creatine" | "Omega" | "Multivitamin" | "Food";
  batch?: string; date: string; lab: string;
}
export const trustifiedUrl = "https://www.trustified.in/passandfail";
export const trustifiedProducts: TrustifiedProduct[] = [
  // WHEY (dairy)
  { brand: "MuscleBlaze", product: "Biozyme Iso Zero", category: "Whey", batch: "—", date: "15 Mar 2023", lab: "Eurofins" },
  { brand: "MuscleBlaze", product: "Biozyme Performance Whey", category: "Whey", date: "27 Mar 2023", lab: "Eurofins" },
  { brand: "MuscleBlaze", product: "Biozyme Whey PR", category: "Whey", batch: "JBWPFCFF0119", date: "31 May 2024", lab: "Eurofins" },
  { brand: "MuscleBlaze", product: "Whey Gold 100% Whey", category: "Whey", batch: "JJGWCF0001", date: "17 Jul 2024", lab: "Eurofins" },
  { brand: "MuscleBlaze", product: "Biozyme Gold 100% Whey", category: "Whey", batch: "JJBGWDRC0003", date: "24 Feb 2025", lab: "Eurofins" },
  { brand: "Avvatar", product: "Fuel Whey", category: "Whey", batch: "AAFW25J28G", date: "22 Feb 2026", lab: "Eurofins" },
  { brand: "Avvatar", product: "100% Performance Whey", category: "Whey", batch: "AAPW24L30G", date: "21 Feb 2025", lab: "Eurofins" },
  { brand: "Avvatar", product: "Nitro Iso Whey", category: "Whey", batch: "AISO23H12G", date: "28 Apr 2024", lab: "Eurofins" },
  { brand: "Nakpro", product: "Impact Whey Protein", category: "Whey", batch: "ICH0824", date: "31 Oct 2024", lab: "Eurofins" },
  { brand: "Osoaa", product: "Ultimate ISO Whey", category: "Whey", batch: "OS-25113", date: "06 May 2026", lab: "Eurofins" },
  { brand: "Only What's Needed", product: "Whey Protein Concentrate", category: "Whey", batch: "OWP25013", date: "26 Apr 2026", lab: "Eurofins" },
  { brand: "Ronnie Coleman", product: "Pro Antium", category: "Whey", batch: "JJRCPADC0015", date: "21 Mar 2026", lab: "Eurofins" },
  { brand: "Naturaltein", product: "Whey Protein Isoboost", category: "Whey", batch: "NWBPK250501", date: "08 Nov 2025", lab: "Eurofins" },
  { brand: "Tata 1mg", product: "Ultra Clean Whey Protein", category: "Whey", batch: "NHPR25513", date: "23 Sep 2025", lab: "Eurofins" },
  { brand: "TrueBasics", product: "Clean Whey Protein", category: "Whey", batch: "MMCWPV001", date: "13 Sep 2025", lab: "Eurofins" },
  { brand: "Nutrova", product: "Whey Protein Isolate Blend", category: "Whey", batch: "AWPIC-25051", date: "06 Sep 2025", lab: "Eurofins" },
  { brand: "Explosive Whey", product: "Elite Series Whey Protein", category: "Whey", batch: "ES240011", date: "22 Aug 2025", lab: "Eurofins" },
  { brand: "Fuelled", product: "Whey Protein Powder", category: "Whey", batch: "FNWBMI-025", date: "13 Aug 2025", lab: "Eurofins" },
  { brand: "Fuel One", product: "Whey Iso-Max", category: "Whey", batch: "HFWIMCF006", date: "25 Apr 2024", lab: "Eurofins" },
  { brand: "Jan Aushadhi", product: "100% Whey Protein", category: "Whey", batch: "ZJWC241K07", date: "06 Jul 2025", lab: "Eurofins" },
  { brand: "MuscleNectar", product: "Whey Protein Isolate", category: "Whey", batch: "MNWPIMM-24011", date: "27 Apr 2025", lab: "Eurofins" },
  { brand: "Nutrabay", product: "Gold 100% Whey Protein Isolate", category: "Whey", batch: "062-NWIRC", date: "17 Nov 2024", lab: "Eurofins" },
  { brand: "Blackbeast", product: "Whey Protein Puregold", category: "Whey", batch: "P178616", date: "30 Jan 2025", lab: "Eurofins" },
  { brand: "HealthFarm", product: "Isopro Zero 100% Whey Isolate", category: "Whey", batch: "DPP-23481", date: "23 Jun 2024", lab: "Eurofins" },
  { brand: "The Whole Truth", product: "Raw Whey Protein Isolate", category: "Whey", batch: "TWTWIU087F2", date: "17 Jun 2024", lab: "Eurofins" },
  { brand: "Trunativ", product: "Whey Protein Pro Blend", category: "Whey", batch: "TNWBCC-006", date: "17 Mar 2025", lab: "Eurofins" },
  { brand: "Nakpro", product: "Whey Platinum Isolate", category: "Whey", date: "19 Apr 2023", lab: "Eurofins" },
  { brand: "ASITIS", product: "Whey Protein Concentrate 80%", category: "Whey", date: "05 May 2023", lab: "Eurofins" },
  // SOY (isolate) — the article's focus
  { brand: "Asitis", product: "Soy Protein Isolate", category: "Soy", batch: "AS 6035", date: "27 May 2026", lab: "Eurofins" },
  { brand: "Nutrabox", product: "100% Soy Isolate", category: "Soy", batch: "NP50321", date: "19 Jun 2025", lab: "Eurofins" },
  { brand: "Fortune", product: "Soya Chunks", category: "Soy", batch: "(VA) CK56M12", date: "07 Feb 2025", lab: "Eurofins" },
  // PLANT (pea / vegan / yeast / peanut)
  { brand: "Nutrabay", product: "Pea Protein Isolate", category: "Plant", batch: "3SNBP1-003", date: "16 Jun 2026", lab: "Eurofins" },
  { brand: "Nutrabay", product: "Gold Hydrolyzed Pea Protein", category: "Plant", batch: "S1PC367", date: "11 Feb 2026", lab: "Eurofins" },
  { brand: "Nutrabay", product: "Yeast Protein", category: "Plant", batch: "S1YPCC383", date: "22 Apr 2026", lab: "Eurofins" },
  { brand: "Superyou", product: "Fermented Yeast Protein", category: "Plant", batch: "SYPC0250801", date: "13 Oct 2025", lab: "Eurofins" },
  { brand: "Mille", product: "Plant Protein 31g", category: "Plant", batch: "FPPU0109", date: "20 Feb 2026", lab: "Eurofins" },
  { brand: "Nutrabox", product: "Vegan Protein", category: "Plant", batch: "NP51155", date: "17 Dec 2025", lab: "Eurofins" },
  { brand: "Naturaltein", product: "Plant Protein", category: "Plant", batch: "NPPC240101", date: "02 May 2024", lab: "Eurofins" },
  { brand: "Nakpro", product: "Plant Protein", category: "Plant", batch: "PPCH0224", date: "05 May 2024", lab: "Eurofins" },
  { brand: "Bgreen", product: "Plant Protein", category: "Plant", batch: "JJPPBCF0002", date: "12 Oct 2024", lab: "Eurofins" },
  { brand: "Alpino", product: "Supernatural Peanut Protein", category: "Plant", batch: "R26177", date: "13 Jun 2026", lab: "Eurofins" },
  // CREATINE
  { brand: "MuscleNectar", product: "Creatine Monohydrate", category: "Creatine", batch: "MNCMU-009", date: "02 Jun 2026", lab: "Eurofins" },
  { brand: "Asitis", product: "Creasure® Creatine Monohydrate", category: "Creatine", batch: "ACS 5042", date: "19 Jul 2025", lab: "Eurofins" },
  { brand: "Blackbeast", product: "Creatine Monohydrate", category: "Creatine", batch: "P181964", date: "22 May 2026", lab: "Eurofins" },
  { brand: "Superyou", product: "Creatine Monohydrate", category: "Creatine", batch: "EMPP26006", date: "08 May 2026", lab: "Eurofins" },
  { brand: "Tata 1mg", product: "Micronised Creatine Monohydrate", category: "Creatine", batch: "TMG25167", date: "30 Jan 2026", lab: "Eurofins" },
  { brand: "MuscleBlaze", product: "Pure Creatine Monohydrate", category: "Creatine", date: "17 Sep 2023", lab: "Eurofins" },
  // OMEGA / MULTIVITAMIN (supporting stack)
  { brand: "Nutrabay", product: "Pro Fish Oil Omega 3", category: "Omega", batch: "TF24182D", date: "28 Sep 2024", lab: "TÜV NORD" },
  { brand: "HK Vitals", product: "Magnesium Glycinate", category: "Multivitamin", batch: "NNH26066", date: "10 Jun 2026", lab: "Eurofins" },
  { brand: "MuscleBlaze", product: "MB-Vite Daily Multivitamin", category: "Multivitamin", batch: "NNM2518", date: "14 May 2026", lab: "Eurofins" },
  { brand: "Centrum", product: "Men Multivitamin", category: "Multivitamin", batch: "MCMA24024", date: "22 May 2025", lab: "Eurofins" },
];

// ---- RESEARCH SOURCES ------------------------------------------------------
export interface Reference {
  id: string; title: string; org: string; url: string; used: string;
}
export const references: Reference[] = [
  { id: "herreman", title: "Comprehensive overview of protein quality based on DIAAS (Herreman et al., 2020)", org: "Food Science & Nutrition (Wiley)", url: "https://onlinelibrary.wiley.com/doi/10.1002/fsn3.1809", used: "DIAAS values for animal & plant proteins in the comparison table." },
  { id: "issn", title: "ISSN Position Stand: Protein and Exercise (Jäger et al., 2017)", org: "J. Int. Soc. Sports Nutrition", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5477153/", used: "Protein intake targets (g/kg) for muscle gain, fat loss, maintenance." },
  { id: "fao", title: "Dietary protein quality evaluation in human nutrition (DIAAS method)", org: "FAO Expert Consultation, 2013", url: "https://www.fao.org/4/i3124e/i3124e.pdf", used: "DIAAS/PDCAAS methodology and quality thresholds (0.75 / 1.0)." },
  { id: "trustified", title: "Pass / Fail — independent supplement lab testing", org: "Trustified (Eurofins / TÜV NORD)", url: "https://www.trustified.in/passandfail", used: "The only product recommendations shown — PASS-verified batches." },
  { id: "gorissen", title: "Protein content and amino acid composition of commercial protein sources (Gorissen 2018)", org: "Amino Acids (Springer)", url: "https://pubmed.ncbi.nlm.nih.gov/30167963/", used: "Leucine % and amino acid profiles of protein powders." },
  { id: "akshayakalpa", title: "Whey Too Much: India's protein price crisis", org: "Akshayakalpa Organic", url: "https://akshayakalpa.org/blog/whey-protein-price-crisis-india/", used: "India whey price rise (₹700→₹2000+/kg), import dependence." },
  { id: "procurement", title: "Whey Powder Price Trends & Historical Chart", org: "Procurement Resource", url: "https://www.procurementresource.com/resource-center/whey-powder-price-trends", used: "Global whey price trajectory 2024–2026." },
  { id: "dca", title: "Protein trend pushes whey powder prices to record levels (2026)", org: "DCA Market Intelligence", url: "https://www.dcamarketintelligence.com/update/3563/protein-trend-pushes-whey-powder-prices-to-record-levels", used: "2026 whey price spike (+50% YTD internationally)." },
  { id: "prnews", title: "2026 India Protein Industry Report (17.7% CAGR)", org: "PR Newswire", url: "https://www.prnewswire.com/news-releases/2026-india-protein-industry-report--skyrocketing-prices--the-next-big-disruption-in-a-inr-30-9-cr-market-growing-at-17-7-cagr-302781624.html", used: "India protein market growth & demand drivers." },
  { id: "who", title: "Appropriate BMI for Asian populations (WHO Expert Consultation)", org: "The Lancet, 2004", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(03)15268-3/fulltext", used: "Asian-Pacific BMI cutoffs (23 / 27.5) used in the BMI tool." },
  { id: "suppvid", title: "Supplements — what to buy, what to skip (evidence review, timestamped)", org: "YouTube breakdown", url: "https://www.youtube.com/watch?v=ZqVzw49e1q8", used: "The Supplement Verdict tiers (creatine, D3, B12, omega-3, isabgol; avoid fat burners, mass gainers, BCAAs, glutamine)." },
];

export const lastUpdated = "24 July 2026";
