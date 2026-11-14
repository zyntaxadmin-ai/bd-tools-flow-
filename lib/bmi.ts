// BMI maths and category tables. Kept free of React so it is easy to test.
// WHO international classification (adults 20+): 18.5, 25, 30, 35, 40 (thinness grades below 18.5).
// WHO 2004 expert consultation for Asian populations keeps those cut-offs but adds public health action
// points at 23 (increased risk) and 27.5 (high risk). The "asia" view below uses those two points.

export type Standard = "who" | "asia";

export interface Band {
  key: string;
  min: number; // inclusive
  max: number; // exclusive (Infinity for the last band)
  color: string;
  bn: string;
  en: string;
}

export const WHO_BANDS: Band[] = [
  { key: "sev", min: 0, max: 16, color: "#1d4ed8", bn: "মারাত্মক কম ওজন", en: "Severe thinness" },
  { key: "mod", min: 16, max: 17, color: "#2563eb", bn: "মাঝারি কম ওজন", en: "Moderate thinness" },
  { key: "mild", min: 17, max: 18.5, color: "#38bdf8", bn: "সামান্য কম ওজন", en: "Mild thinness" },
  { key: "norm", min: 18.5, max: 25, color: "#10b981", bn: "স্বাভাবিক ওজন", en: "Normal weight" },
  { key: "over", min: 25, max: 30, color: "#f59e0b", bn: "বেশি ওজন (প্রি-ওবিজ)", en: "Overweight (pre-obese)" },
  { key: "ob1", min: 30, max: 35, color: "#f97316", bn: "স্থূলতা, ক্লাস ১", en: "Obese class I" },
  { key: "ob2", min: 35, max: 40, color: "#ef4444", bn: "স্থূলতা, ক্লাস ২", en: "Obese class II" },
  { key: "ob3", min: 40, max: Infinity, color: "#b91c1c", bn: "স্থূলতা, ক্লাস ৩", en: "Obese class III" },
];

export const ASIA_BANDS: Band[] = [
  { key: "under", min: 0, max: 18.5, color: "#38bdf8", bn: "কম ওজন", en: "Underweight" },
  { key: "ok", min: 18.5, max: 23, color: "#10b981", bn: "স্বাভাবিক (গ্রহণযোগ্য ঝুঁকি)", en: "Normal (acceptable risk)" },
  { key: "inc", min: 23, max: 27.5, color: "#f59e0b", bn: "ঝুঁকি বেড়েছে", en: "Increased risk" },
  { key: "high", min: 27.5, max: Infinity, color: "#ef4444", bn: "উচ্চ ঝুঁকি", en: "High risk" },
];

export const bandsFor = (s: Standard) => (s === "asia" ? ASIA_BANDS : WHO_BANDS);

export function bandOf(bmi: number, s: Standard): Band {
  const bands = bandsFor(s);
  return bands.find((b) => bmi >= b.min && bmi < b.max) ?? bands[bands.length - 1];
}

export const LB_PER_KG = 2.2046226218;
export const CM_PER_IN = 2.54;

export function toKg(value: number, unit: "kg" | "lb"): number {
  return unit === "kg" ? value : value / LB_PER_KG;
}
export function toCm(unit: "cm" | "ft", cm: number, feet: number, inch: number): number {
  return unit === "cm" ? cm : (feet * 12 + inch) * CM_PER_IN;
}

export function computeBmi(kg: number, cm: number): number {
  const m = cm / 100;
  return kg / (m * m);
}

// Weight range (kg) for a given BMI range at this height.
export function weightRangeKg(cm: number, lo: number, hi: number): [number, number] {
  const m2 = (cm / 100) * (cm / 100);
  return [lo * m2, hi * m2];
}

// Ponderal index in kg/m3, BMI prime relative to 25 (WHO) or 23 (Asia view).
export const ponderal = (kg: number, cm: number) => kg / Math.pow(cm / 100, 3);
export const bmiPrime = (bmi: number, upper: number) => bmi / upper;

export type Validation = { ok: true } | { ok: false; kind: "weight" | "height" | "number" };

export function validate(kg: number, cm: number): Validation {
  if (isNaN(kg) || isNaN(cm)) return { ok: false, kind: "number" };
  if (kg < 20 || kg > 450) return { ok: false, kind: "weight" };
  if (cm < 100 || cm > 250) return { ok: false, kind: "height" };
  return { ok: true };
}
