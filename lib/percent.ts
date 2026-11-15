// Pure logic for the Percentage Calculator. No React here, so it is easy to test.
// The UI (components/tools/PercentageCalculator.tsx) only collects inputs and shows what this returns.

export type Mode = "of" | "pct" | "whole" | "change" | "addsub" | "discount" | "points";
export type Sub = "add" | "sub" | "unadd" | "unsub";
export type Tone = "neutral" | "up" | "down";
export type Tr = (bn: string, en: string) => string;
export type Fmt = (n: number) => string;

export const MODE_ORDER: Mode[] = ["of", "pct", "whole", "change", "addsub", "discount", "points"];
export const SUB_ORDER: Sub[] = ["add", "sub", "unadd", "unsub"];

export interface Fields { a: string; b: string; c: string }

export type Visual =
  | { kind: "share"; pct: number; over: boolean; fill: string; rest: string; restTone: "muted" | "saved" }
  | { kind: "bars"; items: { label: string; text: string; ratio: number; tone: Tone }[] };

export interface Result {
  display: string;
  sentence: string;
  tone: Tone;
  steps: string[];
  extras: { label: string; value: string }[];
  visual: Visual;
}

export type Outcome =
  | { kind: "empty" }
  | { kind: "error"; message: string }
  | { kind: "ok"; result: Result };

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const MAX = 1e15;

/** Accepts Bangla digits, commas, spaces, a % or ৳ sign. Returns the text as plain ASCII number text. */
export function normalizeDigits(s: string): string {
  return s
    .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
    .replace(/[,\s৳%]/g, "")
    .replace(/−/g, "-")
    .replace(/৷/g, ".");
}

/** null = empty or still being typed ("-", "."), NaN = not a number, otherwise the number. */
export function parseNum(raw: string): number | null {
  const s = normalizeDigits(raw);
  if (s === "" || /^[-+.]+$/.test(s)) return null;
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(s)) return NaN;
  return Number(s);
}

const clean = (n: number) => Number(n.toPrecision(12));

export function toBnDigits(s: string): string {
  return s.replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

/** Number formatter. Bangla language uses lakh/crore grouping (12,50,000); English uses 1,250,000. */
export function makeFmt(lang: "bn" | "en", bnDigits: boolean): Fmt {
  const nf = new Intl.NumberFormat(lang === "bn" ? "en-IN" : "en-US", { maximumFractionDigits: 4 });
  return (n: number) => {
    const v = Math.abs(n) < 1e-9 ? 0 : clean(n);
    let s = nf.format(v).replace("-", "−");
    if (bnDigits) s = toBnDigits(s);
    return s;
  };
}

const sign = (n: number) => (n > 0 ? "+" : "");
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const ratioOf = (v: number, max: number) => (max === 0 ? 0 : v === 0 ? 0 : Math.max(0.03, Math.abs(v) / max));

export function compute(mode: Mode, sub: Sub, fields: Fields, tr: Tr, f: Fmt): Outcome {
  const a = parseNum(fields.a);
  const b = parseNum(fields.b);
  const c = parseNum(fields.c);

  if ([a, b, c].some((v) => v !== null && Number.isNaN(v))) {
    return { kind: "error", message: tr("সঠিক সংখ্যা লিখুন (শুধু অঙ্ক ও দশমিক বিন্দু)", "Enter valid numbers (digits and a decimal point only)") };
  }
  if (a === null || b === null) return { kind: "empty" };
  if ([a, b, c ?? 0].some((v) => Math.abs(v) > MAX)) {
    return { kind: "error", message: tr("সংখ্যাটি অনেক বড়। ছোট সংখ্যা দিন", "That number is too large. Enter a smaller one") };
  }
  const ok = (result: Result): Outcome => ({ kind: "ok", result });
  const err = (bn: string, en: string): Outcome => ({ kind: "error", message: tr(bn, en) });

  // ---------- Y% of X ----------
  if (mode === "of") {
    const p = a, x = b;
    const r = clean((x * p) / 100);
    return ok({
      display: f(r),
      sentence: tr(`${f(x)} এর ${f(p)}% = ${f(r)}`, `${f(p)}% of ${f(x)} = ${f(r)}`),
      tone: "neutral",
      steps: [
        tr(`শতাংশকে ১০০ দিয়ে ভাগ করে দশমিক বানান: ${f(p)} ÷ 100 = ${f(clean(p / 100))}`, `Turn the percent into a decimal: ${f(p)} ÷ 100 = ${f(clean(p / 100))}`),
        tr(`সংখ্যা দিয়ে গুণ করুন: ${f(clean(p / 100))} × ${f(x)} = ${f(r)}`, `Multiply by the number: ${f(clean(p / 100))} × ${f(x)} = ${f(r)}`),
      ],
      extras: [
        { label: tr("সংখ্যার সাথে যোগ করলে", "Number plus this"), value: f(clean(x + r)) },
        { label: tr("সংখ্যা থেকে বিয়োগ করলে", "Number minus this"), value: f(clean(x - r)) },
      ],
      visual: { kind: "share", pct: clamp(p, 0, 100), over: p > 100, fill: `${tr("অংশ", "Part")} ${f(p)}%`, rest: `${tr("বাকি", "Rest")} ${f(clean(100 - p))}%`, restTone: "muted" },
    });
  }

  // ---------- X is what % of Y ----------
  if (mode === "pct") {
    const part = a, total = b;
    if (total === 0) return err("মোট ০ হলে শতকরা বের করা যায় না", "The total cannot be 0");
    const r = clean((part / total) * 100);
    return ok({
      display: `${f(r)}%`,
      sentence: tr(`${f(part)} হলো ${f(total)} এর ${f(r)}%`, `${f(part)} is ${f(r)}% of ${f(total)}`),
      tone: "neutral",
      steps: [
        tr(`অংশকে মোট দিয়ে ভাগ করুন: ${f(part)} ÷ ${f(total)} = ${f(clean(part / total))}`, `Divide the part by the total: ${f(part)} ÷ ${f(total)} = ${f(clean(part / total))}`),
        tr(`১০০ দিয়ে গুণ করুন: ${f(clean(part / total))} × 100 = ${f(r)}%`, `Multiply by 100: ${f(clean(part / total))} × 100 = ${f(r)}%`),
      ],
      extras: [
        { label: tr("দশমিক রূপে", "As a decimal"), value: f(clean(part / total)) },
        { label: tr("বাকি অংশ", "Remaining share"), value: `${f(clean(100 - r))}%` },
      ],
      visual: { kind: "share", pct: clamp(r, 0, 100), over: r > 100, fill: `${tr("অংশ", "Part")} ${f(r)}%`, rest: `${tr("বাকি", "Rest")} ${f(clean(100 - r))}%`, restTone: "muted" },
    });
  }

  // ---------- X is Y% of what ----------
  if (mode === "whole") {
    const part = a, p = b;
    if (p === 0) return err("শতকরা ০ হলে মোট বের করা যায় না", "The percentage cannot be 0");
    const r = clean((part * 100) / p);
    return ok({
      display: f(r),
      sentence: tr(`${f(part)} হলো ${f(r)} এর ${f(p)}%`, `${f(part)} is ${f(p)}% of ${f(r)}`),
      tone: "neutral",
      steps: [
        tr(`অংশকে ১০০ দিয়ে গুণ করুন: ${f(part)} × 100 = ${f(clean(part * 100))}`, `Multiply the part by 100: ${f(part)} × 100 = ${f(clean(part * 100))}`),
        tr(`শতাংশ দিয়ে ভাগ করুন: ${f(clean(part * 100))} ÷ ${f(p)} = ${f(r)}`, `Divide by the percentage: ${f(clean(part * 100))} ÷ ${f(p)} = ${f(r)}`),
      ],
      extras: [{ label: tr("১% এর মান", "Value of 1%"), value: f(clean(r / 100)) }],
      visual: { kind: "share", pct: clamp(p, 0, 100), over: p > 100, fill: `${f(part)} = ${f(p)}%`, rest: `${tr("মোট", "Total")} ${f(r)} = 100%`, restTone: "muted" },
    });
  }

  // ---------- % change (old -> new) ----------
  if (mode === "change") {
    const oldV = a, newV = b;
    if (oldV === 0) return err("আগের মান ০ হলে শতকরা পরিবর্তন বের করা যায় না", "Percentage change is undefined when the old value is 0");
    const diff = clean(newV - oldV);
    const r = clean((diff / Math.abs(oldV)) * 100);
    const tone: Tone = r > 0 ? "up" : r < 0 ? "down" : "neutral";
    const word = r > 0 ? tr("বৃদ্ধি", "increase") : r < 0 ? tr("হ্রাস", "decrease") : tr("কোনো পরিবর্তন নেই", "no change");
    const back = newV === 0 ? null : clean(((oldV - newV) / Math.abs(newV)) * 100);
    const max = Math.max(Math.abs(oldV), Math.abs(newV));
    return ok({
      display: `${sign(r)}${f(r)}%`,
      sentence: r === 0 ? tr(`${f(oldV)} থেকে ${f(newV)}: কোনো পরিবর্তন নেই`, `${f(oldV)} to ${f(newV)}: no change`) : tr(`${f(oldV)} থেকে ${f(newV)}: ${f(Math.abs(r))}% ${word}`, `${f(oldV)} to ${f(newV)}: ${f(Math.abs(r))}% ${word}`),
      tone,
      steps: [
        tr(`পার্থক্য বের করুন: ${f(newV)} − ${f(oldV)} = ${f(diff)}`, `Find the difference: ${f(newV)} − ${f(oldV)} = ${f(diff)}`),
        tr(`আগের মান দিয়ে ভাগ করুন: ${f(diff)} ÷ ${f(Math.abs(oldV))} = ${f(clean(diff / Math.abs(oldV)))}`, `Divide by the old value: ${f(diff)} ÷ ${f(Math.abs(oldV))} = ${f(clean(diff / Math.abs(oldV)))}`),
        tr(`১০০ দিয়ে গুণ করুন: ${f(clean(diff / Math.abs(oldV)))} × 100 = ${f(r)}%`, `Multiply by 100: ${f(clean(diff / Math.abs(oldV)))} × 100 = ${f(r)}%`),
      ],
      extras: [
        { label: tr("পরিবর্তনের পরিমাণ", "Amount of change"), value: `${sign(diff)}${f(diff)}` },
        ...(back === null ? [] : [{ label: tr("উল্টো দিকে (পরের থেকে আগের)", "Reverse (new back to old)"), value: `${sign(back)}${f(back)}%` }]),
      ],
      visual: {
        kind: "bars",
        items: [
          { label: tr("আগের মান", "Old"), text: f(oldV), ratio: ratioOf(oldV, max), tone: "neutral" },
          { label: tr("পরের মান", "New"), text: f(newV), ratio: ratioOf(newV, max), tone },
        ],
      },
    });
  }

  // ---------- add / subtract a percentage (VAT) ----------
  if (mode === "addsub") {
    const x = a, p = b;
    const rate = p / 100;
    let r: number, base: number, afterV: number, ch: number, bn: string, en: string, stepsL: string[], extraLabel: string;
    if (sub === "add" || sub === "sub") {
      ch = clean((x * p) / 100);
      r = sub === "add" ? clean(x + ch) : clean(x - ch);
      base = x; afterV = r;
      bn = sub === "add" ? `${f(x)} এর সাথে ${f(p)}% যোগ করলে ${f(r)}` : `${f(x)} থেকে ${f(p)}% বিয়োগ করলে ${f(r)}`;
      en = sub === "add" ? `${f(x)} plus ${f(p)}% = ${f(r)}` : `${f(x)} minus ${f(p)}% = ${f(r)}`;
      extraLabel = sub === "add" ? tr("যোগ হওয়া পরিমাণ", "Amount added") : tr("বিয়োগ হওয়া পরিমাণ", "Amount removed");
      stepsL = [
        tr(`${f(p)}% এর মান বের করুন: ${f(x)} × ${f(p)} ÷ 100 = ${f(ch)}`, `Find ${f(p)}% of the number: ${f(x)} × ${f(p)} ÷ 100 = ${f(ch)}`),
        sub === "add" ? tr(`যোগ করুন: ${f(x)} + ${f(ch)} = ${f(r)}`, `Add it: ${f(x)} + ${f(ch)} = ${f(r)}`) : tr(`বিয়োগ করুন: ${f(x)} − ${f(ch)} = ${f(r)}`, `Subtract it: ${f(x)} − ${f(ch)} = ${f(r)}`),
      ];
    } else {
      const k = sub === "unadd" ? 1 + rate : 1 - rate;
      if (k === 0) return err("এই শতাংশে আগের মান বের করা যায় না (১০০% বিয়োগ)", "Cannot work back from a 100% reduction");
      base = clean(x / k);
      ch = clean(Math.abs(x - base));
      r = base; afterV = x;
      bn = sub === "unadd" ? `${f(x)} হলো ${f(base)} এর সাথে ${f(p)}% যোগের পরের মান` : `${f(x)} হলো ${f(base)} থেকে ${f(p)}% বিয়োগের পরের মান`;
      en = sub === "unadd" ? `${f(x)} is ${f(base)} after adding ${f(p)}%` : `${f(x)} is ${f(base)} after taking off ${f(p)}%`;
      extraLabel = sub === "unadd" ? tr("যোগ হয়েছিল (যেমন VAT)", "Amount that was added (e.g. VAT)") : tr("বিয়োগ হয়েছিল (যেমন ছাড়)", "Amount that was taken off (e.g. discount)");
      stepsL = [
        sub === "unadd" ? tr(`গুণক: 1 + ${f(p)} ÷ 100 = ${f(clean(k))}`, `Multiplier: 1 + ${f(p)} ÷ 100 = ${f(clean(k))}`) : tr(`গুণক: 1 − ${f(p)} ÷ 100 = ${f(clean(k))}`, `Multiplier: 1 − ${f(p)} ÷ 100 = ${f(clean(k))}`),
        tr(`শেষ মানকে গুণক দিয়ে ভাগ করুন: ${f(x)} ÷ ${f(clean(k))} = ${f(base)}`, `Divide the final value by the multiplier: ${f(x)} ÷ ${f(clean(k))} = ${f(base)}`),
      ];
    }
    const from = sub === "unadd" || sub === "unsub" ? r : base;
    const to = sub === "unadd" || sub === "unsub" ? afterV : afterV;
    const tone: Tone = to > from ? "up" : to < from ? "down" : "neutral";
    const max = Math.max(Math.abs(from), Math.abs(to));
    return ok({
      display: f(r),
      sentence: tr(bn, en),
      tone: "neutral",
      steps: stepsL,
      extras: [{ label: extraLabel, value: f(ch) }],
      visual: {
        kind: "bars",
        items: [
          { label: tr("আগের মান", "Before"), text: f(from), ratio: ratioOf(from, max), tone: "neutral" },
          { label: tr("পরের মান", "After"), text: f(to), ratio: ratioOf(to, max), tone },
        ],
      },
    });
  }

  // ---------- discount (optionally two in a row) ----------
  if (mode === "discount") {
    const price = a, d1 = b, d2 = c ?? 0;
    if (price <= 0) return err("মূল দাম ০ এর বেশি হতে হবে", "The original price must be more than 0");
    if (d1 < 0 || d2 < 0) return err("ছাড় ঋণাত্মক হতে পারে না", "A discount cannot be negative");
    if (d1 > 100 || d2 > 100) return err("ছাড় ১০০% এর বেশি হতে পারে না", "A discount cannot be more than 100%");
    const after1 = clean(price * (1 - d1 / 100));
    const final = clean(after1 * (1 - d2 / 100));
    const saved = clean(price - final);
    const eff = clean((saved / price) * 100);
    const steps = [
      tr(`প্রথম ছাড়: ${f(price)} × ${f(d1)} ÷ 100 = ${f(clean((price * d1) / 100))}, তাই দাম ${f(after1)}`, `First discount: ${f(price)} × ${f(d1)} ÷ 100 = ${f(clean((price * d1) / 100))}, so the price is ${f(after1)}`),
    ];
    if (d2 > 0) steps.push(tr(`দ্বিতীয় ছাড় ${f(after1)} এর উপর (মূল দামের উপর নয়): ${f(after1)} × ${f(d2)} ÷ 100 = ${f(clean((after1 * d2) / 100))}, তাই দাম ${f(final)}`, `Second discount applies to ${f(after1)}, not the original price: ${f(after1)} × ${f(d2)} ÷ 100 = ${f(clean((after1 * d2) / 100))}, so the price is ${f(final)}`));
    steps.push(tr(`মোট সাশ্রয়: ${f(price)} − ${f(final)} = ${f(saved)}, যা মূল দামের ${f(eff)}%`, `Total saved: ${f(price)} − ${f(final)} = ${f(saved)}, which is ${f(eff)}% of the original price`));
    return ok({
      display: f(final),
      sentence: d2 > 0 ? tr(`${f(price)} এ ${f(d1)}% ও আরও ${f(d2)}% ছাড়ের পর দাম ${f(final)}`, `${f(price)} with ${f(d1)}% then ${f(d2)}% off costs ${f(final)}`) : tr(`${f(price)} এ ${f(d1)}% ছাড়ের পর দাম ${f(final)}`, `${f(price)} with ${f(d1)}% off costs ${f(final)}`),
      tone: "neutral",
      steps,
      extras: [
        { label: tr("মোট সাশ্রয়", "You save"), value: f(saved) },
        { label: tr("কার্যকর ছাড়ের হার", "Effective discount"), value: `${f(eff)}%` },
        ...(d2 > 0 ? [{ label: tr("প্রথম ছাড়ের পরের দাম", "Price after first discount"), value: f(after1) }] : []),
      ],
      visual: { kind: "share", pct: clamp(100 - eff, 0, 100), over: false, fill: `${tr("পরিশোধ", "You pay")} ${f(clean(100 - eff))}%`, rest: `${tr("সাশ্রয়", "Saved")} ${f(eff)}%`, restTone: "saved" },
    });
  }

  // ---------- percentage points ----------
  const from = a, to = b;
  const pp = clean(to - from);
  const rel = from === 0 ? null : clean((pp / Math.abs(from)) * 100);
  const tone: Tone = pp > 0 ? "up" : pp < 0 ? "down" : "neutral";
  const word = pp > 0 ? tr("বৃদ্ধি", "increase") : pp < 0 ? tr("হ্রাস", "decrease") : tr("কোনো পরিবর্তন নেই", "no change");
  const max = Math.max(Math.abs(from), Math.abs(to));
  return ok({
    display: `${sign(pp)}${f(pp)} ${tr("পয়েন্ট", "pp")}`,
    sentence: pp === 0 ? tr(`${f(from)}% থেকে ${f(to)}%: কোনো পরিবর্তন নেই`, `${f(from)}% to ${f(to)}%: no change`) : tr(`${f(from)}% থেকে ${f(to)}%: ${f(Math.abs(pp))} পারসেন্টেজ পয়েন্ট ${word}`, `${f(from)}% to ${f(to)}%: ${f(Math.abs(pp))} percentage point ${word}`),
    tone,
    steps: [
      tr(`দুই হারের বিয়োগফল: ${f(to)} − ${f(from)} = ${f(pp)} পয়েন্ট`, `Subtract the two rates: ${f(to)} − ${f(from)} = ${f(pp)} points`),
      rel === null ? tr("আগের হার ০ হওয়ায় আপেক্ষিক পরিবর্তন বের করা যায় না", "The old rate is 0, so the relative change is undefined") : tr(`আপেক্ষিক পরিবর্তন: ${f(pp)} ÷ ${f(Math.abs(from))} × 100 = ${f(rel)}%`, `Relative change: ${f(pp)} ÷ ${f(Math.abs(from))} × 100 = ${f(rel)}%`),
    ],
    extras: [{ label: tr("আপেক্ষিক পরিবর্তন (শতকরা)", "Relative change (percent)"), value: rel === null ? "—" : `${sign(rel)}${f(rel)}%` }],
    visual: {
      kind: "bars",
      items: [
        { label: tr("আগের হার", "Old rate"), text: `${f(from)}%`, ratio: ratioOf(from, max), tone: "neutral" },
        { label: tr("পরের হার", "New rate"), text: `${f(to)}%`, ratio: ratioOf(to, max), tone },
      ],
    },
  });
}

/** Percentages shown in the quick table for "Y% of X". */
export const QUICK_TABLE = [5, 10, 15, 20, 25, 30, 40, 50, 75];
