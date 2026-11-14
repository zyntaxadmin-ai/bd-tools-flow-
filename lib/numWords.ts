// Number to words helpers (no React). Whole numbers must be below 1e14 (14 digits).

// Bangla words for 0-99 (irregular, so a lookup table is the only safe way).
const BN = [
  "শূন্য","এক","দুই","তিন","চার","পাঁচ","ছয়","সাত","আট","নয়",
  "দশ","এগারো","বারো","তেরো","চৌদ্দ","পনেরো","ষোলো","সতেরো","আঠারো","উনিশ",
  "বিশ","একুশ","বাইশ","তেইশ","চব্বিশ","পঁচিশ","ছাব্বিশ","সাতাশ","আটাশ","ঊনত্রিশ",
  "ত্রিশ","একত্রিশ","বত্রিশ","তেত্রিশ","চৌত্রিশ","পঁয়ত্রিশ","ছত্রিশ","সাঁইত্রিশ","আটত্রিশ","ঊনচল্লিশ",
  "চল্লিশ","একচল্লিশ","বিয়াল্লিশ","তেতাল্লিশ","চুয়াল্লিশ","পঁয়তাল্লিশ","ছেচল্লিশ","সাতচল্লিশ","আটচল্লিশ","ঊনপঞ্চাশ",
  "পঞ্চাশ","একান্ন","বাহান্ন","তিপ্পান্ন","চুয়ান্ন","পঞ্চান্ন","ছাপ্পান্ন","সাতান্ন","আটান্ন","ঊনষাট",
  "ষাট","একষট্টি","বাষট্টি","তেষট্টি","চৌষট্টি","পঁয়ষট্টি","ছেষট্টি","সাতষট্টি","আটষট্টি","ঊনসত্তর",
  "সত্তর","একাত্তর","বাহাত্তর","তিয়াত্তর","চুয়াত্তর","পঁচাত্তর","ছিয়াত্তর","সাতাত্তর","আটাত্তর","ঊনআশি",
  "আশি","একাশি","বিরাশি","তিরাশি","চুরাশি","পঁচাশি","ছিয়াশি","সাতাশি","আটাশি","ঊননব্বই",
  "নব্বই","একানব্বই","বিরানব্বই","তিরানব্বই","চুরানব্বই","পঁচানব্বই","ছিয়ানব্বই","সাতানব্বই","আটানব্বই","নিরানব্বই",
];

// Bangla words in the lakh/crore system used in Bangladesh.
export function bnWords(n: number): string {
  if (n === 0) return BN[0];
  const parts: string[] = [];
  const koti = Math.floor(n / 1e7); n %= 1e7;
  const lakh = Math.floor(n / 1e5); n %= 1e5;
  const hajar = Math.floor(n / 1e3); n %= 1e3;
  const sho = Math.floor(n / 100); const rest = n % 100;
  if (koti) parts.push(bnWords(koti) + " কোটি");
  if (lakh) parts.push(BN[lakh] + " লাখ");
  if (hajar) parts.push(BN[hajar] + " হাজার");
  if (sho) parts.push(BN[sho] + "শ");
  if (rest) parts.push(BN[rest]);
  return parts.join(" ");
}

const ONES = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
const TENS = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
const below100 = (n: number) => (n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? " " + ONES[n % 10] : ""));

// English words in the lakh/crore system.
export function enWords(n: number): string {
  if (n === 0) return "Zero";
  const parts: string[] = [];
  const crore = Math.floor(n / 1e7); n %= 1e7;
  const lakh = Math.floor(n / 1e5); n %= 1e5;
  const thousand = Math.floor(n / 1e3); n %= 1e3;
  const hundred = Math.floor(n / 100); const rest = n % 100;
  if (crore) parts.push(enWords(crore) + " Crore");
  if (lakh) parts.push(below100(lakh) + " Lakh");
  if (thousand) parts.push(below100(thousand) + " Thousand");
  if (hundred) parts.push(ONES[hundred] + " Hundred");
  if (rest) parts.push(below100(rest));
  return parts.join(" ");
}

// English words in the international system (thousand, million, billion, trillion).
export function enIntlWords(n: number): string {
  if (n === 0) return "Zero";
  const parts: string[] = [];
  const units: [number, string][] = [[1e12, "Trillion"], [1e9, "Billion"], [1e6, "Million"], [1e3, "Thousand"]];
  for (const [v, name] of units) {
    const q = Math.floor(n / v);
    if (q) { parts.push(below1000(q) + " " + name); n %= v; }
  }
  if (n) parts.push(below1000(n));
  return parts.join(" ");
}
function below1000(n: number): string {
  const h = Math.floor(n / 100), r = n % 100;
  return [h ? ONES[h] + " Hundred" : "", r ? below100(r) : ""].filter(Boolean).join(" ");
}

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
export const toAsciiDigits = (s: string) => s.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
export const toBnDigits = (s: string) => s.replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

export type Parsed = { whole: string; frac: string };
// Accepts commas, spaces and Bangla digits. maxFrac = most decimal places allowed.
export function parseNumber(raw: string, maxFrac: number): Parsed | null {
  const s = toAsciiDigits(raw).replace(/[,\s]/g, "");
  const m = new RegExp(`^(\\d{1,14})(?:\\.(\\d{1,${maxFrac}}))?$`).exec(s);
  return m ? { whole: m[1], frac: m[2] ?? "" } : null;
}

// Existing helper kept for compatibility: taka and paisa (paisa padded to 2 digits).
export function convert(raw: string): { taka: number; paisa: number } | null {
  const p = parseNumber(raw, 2);
  if (!p) return null;
  return { taka: Number(p.whole), paisa: Number((p.frac + "00").slice(0, 2)) };
}

export type System = "bn" | "enLakh" | "enIntl";
const wordsOf = (n: number, sys: System) => (sys === "bn" ? bnWords(n) : sys === "enLakh" ? enWords(n) : enIntlWords(n));
const digitWord = (d: string, sys: System) => (sys === "bn" ? BN[Number(d)] : ONES[Number(d)]);

// Taka mode: "... Taka ... Paisa Only". Plain mode: whole part in words, decimals read digit by digit.
export function toWords(p: Parsed, sys: System, taka: boolean): string {
  const whole = Number(p.whole);
  if (taka) {
    const paisa = Number((p.frac + "00").slice(0, 2));
    const T = sys === "bn" ? " টাকা" : " Taka", P = sys === "bn" ? " পয়সা" : " Paisa", END = sys === "bn" ? " মাত্র" : " Only";
    const parts: string[] = [];
    if (whole > 0 || paisa === 0) parts.push(wordsOf(whole, sys) + T);
    if (paisa > 0) parts.push(wordsOf(paisa, sys) + P);
    return parts.join(" ") + END;
  }
  let out = wordsOf(whole, sys);
  if (p.frac) out += (sys === "bn" ? " দশমিক " : " Point ") + p.frac.split("").map((d) => digitWord(d, sys)).join(" ");
  return out;
}

// Digit by digit, e.g. for phone numbers. Keeps a leading + as "Plus".
export function readDigits(raw: string, sys: "bn" | "en"): string | null {
  const s = toAsciiDigits(raw).trim();
  const plus = s.startsWith("+");
  const digits = s.replace(/\D/g, "");
  if (!digits || digits.length > 30) return null;
  if (!/^[+\d\s\-()]+$/.test(s)) return null;
  const words = digits.split("").map((d) => (sys === "bn" ? BN[Number(d)] : ONES[Number(d)]));
  return (plus ? (sys === "bn" ? "প্লাস " : "Plus ") : "") + words.join(" ");
}

// Digits with commas: lakh/crore grouping (12,34,567) or international (1,234,567).
export function groupLakh(whole: string): string {
  if (whole.length <= 3) return whole;
  const last3 = whole.slice(-3);
  let rest = whole.slice(0, -3);
  const groups: string[] = [];
  while (rest.length > 2) { groups.unshift(rest.slice(-2)); rest = rest.slice(0, -2); }
  if (rest) groups.unshift(rest);
  return groups.join(",") + "," + last3;
}
export const groupIntl = (whole: string) => whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export type CaseMode = "title" | "upper" | "lower";
export const applyCase = (s: string, c: CaseMode) => (c === "upper" ? s.toUpperCase() : c === "lower" ? s.toLowerCase() : s);
