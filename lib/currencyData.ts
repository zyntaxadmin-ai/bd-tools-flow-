// Shared by the currency converter, its server wrapper and the /currency/[pair] pages.
// Rates are daily reference (mid-market) rates per 1 US dollar from the free currency-api dataset.
export type Data = { date: string; usd: Record<string, number> };

export const RATE_URLS = [
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
  "https://latest.currency-api.pages.dev/v1/currencies/usd.json",
];

export const BB_RATE_URL = "https://www.bb.org.bd/en/index.php/econdata/exchangerate";

export const CURRENCIES: { code: string; bn: string; en: string }[] = [
  { code: "bdt", bn: "বাংলাদেশি টাকা", en: "Bangladeshi taka" },
  { code: "usd", bn: "মার্কিন ডলার", en: "US dollar" },
  { code: "sar", bn: "সৌদি রিয়াল", en: "Saudi riyal" },
  { code: "aed", bn: "UAE দিরহাম", en: "UAE dirham" },
  { code: "qar", bn: "কাতারি রিয়াল", en: "Qatari riyal" },
  { code: "kwd", bn: "কুয়েতি দিনার", en: "Kuwaiti dinar" },
  { code: "omr", bn: "ওমানি রিয়াল", en: "Omani rial" },
  { code: "bhd", bn: "বাহরাইনি দিনার", en: "Bahraini dinar" },
  { code: "myr", bn: "মালয়েশিয়ান রিংগিত", en: "Malaysian ringgit" },
  { code: "sgd", bn: "সিঙ্গাপুর ডলার", en: "Singapore dollar" },
  { code: "inr", bn: "ভারতীয় রুপি", en: "Indian rupee" },
  { code: "pkr", bn: "পাকিস্তানি রুপি", en: "Pakistani rupee" },
  { code: "npr", bn: "নেপালি রুপি", en: "Nepalese rupee" },
  { code: "lkr", bn: "শ্রীলঙ্কান রুপি", en: "Sri Lankan rupee" },
  { code: "gbp", bn: "ব্রিটিশ পাউন্ড", en: "British pound" },
  { code: "eur", bn: "ইউরো", en: "Euro" },
  { code: "cad", bn: "কানাডিয়ান ডলার", en: "Canadian dollar" },
  { code: "aud", bn: "অস্ট্রেলিয়ান ডলার", en: "Australian dollar" },
  { code: "jpy", bn: "জাপানি ইয়েন", en: "Japanese yen" },
  { code: "cny", bn: "চীনা ইউয়ান", en: "Chinese yuan" },
  { code: "chf", bn: "সুইস ফ্রাঁ", en: "Swiss franc" },
  { code: "thb", bn: "থাই বাত", en: "Thai baht" },
];

// Currencies that have their own "X to BDT" page, in the order they are shown.
export const POPULAR = ["usd", "sar", "aed", "myr", "gbp", "eur", "inr", "qar", "kwd", "omr"];
export const PRESET_AMOUNTS = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000];
export const QUICK_PAIRS: [string, string][] = [
  ["usd", "bdt"], ["sar", "bdt"], ["aed", "bdt"], ["myr", "bdt"], ["gbp", "bdt"],
  ["eur", "bdt"], ["qar", "bdt"], ["kwd", "bdt"], ["omr", "bdt"], ["bdt", "usd"],
];

// Next.js adds a `next` option to fetch; it is spelled out here so this file type-checks on its own.
export type FetchInit = RequestInit & { next?: { revalidate?: number | false } };

export async function loadRates(init?: FetchInit): Promise<Data> {
  let last: unknown;
  for (const u of RATE_URLS) {
    try {
      const res = await fetch(u, init ?? { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const j = await res.json();
      if (j && j.usd && typeof j.usd.bdt === "number") return { date: String(j.date || ""), usd: j.usd };
      throw new Error("bad data");
    } catch (e) { last = e; }
  }
  throw last;
}

export function fmt(n: number): string {
  if (!isFinite(n)) return "-";
  const abs = Math.abs(n);
  const digits = abs >= 100 ? 2 : abs >= 1 ? 3 : 6;
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export function rateOf(data: Data | null, from: string, to: string): number {
  if (!data) return NaN;
  const a = data.usd[from], b = data.usd[to];
  return typeof a === "number" && typeof b === "number" && a > 0 ? b / a : NaN;
}
