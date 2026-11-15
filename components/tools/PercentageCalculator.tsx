"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeftRight, Bookmark, Check, Copy, Link2, RotateCcw, TrendingDown, TrendingUp, X } from "lucide-react";
import { useLang, useTr } from "@/lib/lang";
import { MODE_ORDER, QUICK_TABLE, SUB_ORDER, compute, makeFmt, normalizeDigits, type Fields, type Mode, type Sub } from "@/lib/percent";
import PercentageVisual from "./PercentageVisual";

type Field = "a" | "b" | "c";
type Seg = { t: string } | { f: Field; ph: string; label: string; suffix?: string };
type Saved = { id: number; mode: Mode; sub: Sub; fields: Fields; sentence: string };

const HISTORY_KEY = "bdtf-pct-history";
const DIGITS_KEY = "bdtf-pct-digits";
const EMPTY: Fields = { a: "", b: "", c: "" };

const MODE_LABEL: Record<Mode, [string, string]> = {
  of: ["X এর Y%", "Y% of X"],
  pct: ["কত শতাংশ", "What %"],
  whole: ["মোট কত", "Find the total"],
  change: ["বৃদ্ধি / হ্রাস", "% change"],
  addsub: ["যোগ-বিয়োগ ও VAT", "Add, subtract, VAT"],
  discount: ["ছাড়", "Discount"],
  points: ["% পয়েন্ট", "% points"],
};
const SUB_LABEL: Record<Sub, [string, string]> = {
  add: ["যোগ করুন (+)", "Add (+)"],
  sub: ["বিয়োগ করুন (−)", "Subtract (−)"],
  unadd: ["যোগের আগের মান", "Before adding"],
  unsub: ["বিয়োগের আগের মান", "Before taking off"],
};
// Which field holds the percentage in each mode (used by the quick percent chips)
const PERCENT_FIELD: Partial<Record<Mode, Field>> = { of: "a", whole: "b", addsub: "b", discount: "b" };
const CHIPS: Partial<Record<Mode, number[]>> = { of: [5, 10, 15, 20, 25, 50], whole: [5, 10, 15, 20, 25, 50], addsub: [5, 7.5, 10, 15, 20], discount: [5, 10, 15, 20, 25, 50] };
const SWAPPABLE: Mode[] = ["pct", "change", "points"];

const EXAMPLES: Record<Mode, { fields: Fields; sub?: Sub; bn: string; en: string }[]> = {
  of: [{ fields: { a: "15", b: "200", c: "" }, bn: "২০০ এর ১৫%", en: "15% of 200" }, { fields: { a: "7.5", b: "12500", c: "" }, bn: "১২,৫০০ এর ৭.৫%", en: "7.5% of 12,500" }],
  pct: [{ fields: { a: "432", b: "500", c: "" }, bn: "৫০০ তে ৪৩২ নম্বর", en: "432 out of 500" }, { fields: { a: "45", b: "180", c: "" }, bn: "১৮০ এর মধ্যে ৪৫", en: "45 of 180" }],
  whole: [{ fields: { a: "50", b: "25", c: "" }, bn: "৫০ হলো ২৫%", en: "50 is 25%" }, { fields: { a: "12", b: "30", c: "" }, bn: "১২ হলো ৩০%", en: "12 is 30%" }],
  change: [{ fields: { a: "500", b: "600", c: "" }, bn: "৫০০ থেকে ৬০০", en: "500 to 600" }, { fields: { a: "600", b: "500", c: "" }, bn: "৬০০ থেকে ৫০০", en: "600 to 500" }],
  addsub: [{ fields: { a: "1000", b: "15", c: "" }, sub: "add", bn: "১,০০০ + ১৫% VAT", en: "1,000 + 15% VAT" }, { fields: { a: "1150", b: "15", c: "" }, sub: "unadd", bn: "১৫% VAT-সহ ১,১৫০ এর মূল দাম", en: "Price before 15% VAT" }],
  discount: [{ fields: { a: "1200", b: "15", c: "" }, bn: "১,২০০ টাকায় ১৫% ছাড়", en: "15% off 1,200" }, { fields: { a: "1200", b: "20", c: "10" }, bn: "২০% এরপর আরও ১০% ছাড়", en: "20% then 10% off" }],
  points: [{ fields: { a: "10", b: "15", c: "" }, bn: "১০% থেকে ১৫%", en: "10% to 15%" }, { fields: { a: "8", b: "9", c: "" }, bn: "ব্যাংকের হার ৮% থেকে ৯%", en: "Bank rate 8% to 9%" }],
};

function segments(mode: Mode, sub: Sub, lang: "bn" | "en"): Seg[] {
  const A = (ph: string, label: string, suffix?: string): Seg => ({ f: "a", ph, label, suffix });
  const B = (ph: string, label: string, suffix?: string): Seg => ({ f: "b", ph, label, suffix });
  const bn = lang === "bn";
  switch (mode) {
    case "of":
      return bn ? [B("200", "সংখ্যা"), { t: "এর" }, A("15", "শতকরা", "%"), { t: "কত?" }] : [A("15", "Percentage", "%"), { t: "of" }, B("200", "Number"), { t: "is?" }];
    case "pct":
      return bn ? [A("45", "অংশ"), { t: "হলো" }, B("180", "মোট"), { t: "এর কত শতাংশ?" }] : [A("45", "Part"), { t: "is what % of" }, B("180", "Total")];
    case "whole":
      return bn ? [A("50", "অংশ"), { t: "হলো মোটের" }, B("25", "শতকরা", "%"), { t: "। মোট কত?" }] : [A("50", "Part"), { t: "is" }, B("25", "Percentage", "%"), { t: "of what?" }];
    case "change":
      return bn ? [{ t: "আগের মান" }, A("500", "আগের মান"), { t: "থেকে পরের মান" }, B("600", "পরের মান")] : [{ t: "From" }, A("500", "Old value"), { t: "to" }, B("600", "New value")];
    case "addsub":
      if (bn) {
        if (sub === "add") return [A("1000", "সংখ্যা"), { t: "এর সাথে" }, B("15", "শতকরা", "%"), { t: "যোগ" }];
        if (sub === "sub") return [A("1000", "সংখ্যা"), { t: "থেকে" }, B("15", "শতকরা", "%"), { t: "বিয়োগ" }];
        return [{ t: sub === "unadd" ? "যোগের পর মান" : "বিয়োগের পর মান" }, A("1150", "পরের মান"), { t: sub === "unadd" ? "; যোগ হয়েছে" : "; বিয়োগ হয়েছে" }, B("15", "শতকরা", "%"), { t: "। আগে কত ছিল?" }];
      }
      if (sub === "add") return [A("1000", "Number"), { t: "plus" }, B("15", "Percentage", "%")];
      if (sub === "sub") return [A("1000", "Number"), { t: "minus" }, B("15", "Percentage", "%")];
      return [A("1150", "Final value"), { t: sub === "unadd" ? "is the result after adding" : "is the result after taking off" }, B("15", "Percentage", "%"), { t: ". What was it before?" }];
    case "discount":
      return bn
        ? [{ t: "দাম" }, A("1200", "মূল দাম"), { t: "এ" }, B("20", "ছাড়ের শতকরা", "%"), { t: "ছাড়, তারপর আরও" }, { f: "c", ph: "০", label: "দ্বিতীয় ছাড় (ঐচ্ছিক)", suffix: "%" }, { t: "ছাড়" }]
        : [{ t: "Price" }, A("1200", "Original price"), { t: "with" }, B("20", "Discount percentage", "%"), { t: "off, then another" }, { f: "c", ph: "0", label: "Second discount (optional)", suffix: "%" }, { t: "off" }];
    default:
      return bn ? [{ t: "হার" }, A("10", "আগের হার", "%"), { t: "থেকে" }, B("15", "পরের হার", "%"), { t: "এ" }] : [{ t: "From" }, A("10", "Old rate", "%"), { t: "to" }, B("15", "New rate", "%")];
  }
}

const TONE_TEXT = {
  neutral: "text-indigo-700 dark:text-indigo-300",
  up: "text-emerald-700 dark:text-emerald-400",
  down: "text-rose-600 dark:text-rose-400",
};

const btn = "inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:hover:bg-transparent";

export default function PercentageCalculator() {
  const { lang } = useLang();
  const tr = useTr();
  const [mode, setMode] = useState<Mode>("of");
  const [sub, setSub] = useState<Sub>("add");
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [bnDigits, setBnDigits] = useState(false);
  const [saved, setSaved] = useState<Saved[]>([]);
  const [flash, setFlash] = useState("");
  const flashTimer = useRef<ReturnType<typeof setTimeout>>();

  // Read a shared link (?m=of&a=15&b=200) and the saved preferences once, after the first paint
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const m = q.get("m") as Mode | null;
      if (m && MODE_ORDER.includes(m)) {
        setMode(m);
        const s = q.get("s") as Sub | null;
        if (s && SUB_ORDER.includes(s)) setSub(s);
        setFields({ a: (q.get("a") ?? "").slice(0, 24), b: (q.get("b") ?? "").slice(0, 24), c: (q.get("c") ?? "").slice(0, 24) });
      }
    } catch { /* ignore */ }
    try {
      setBnDigits(localStorage.getItem(DIGITS_KEY) === "1");
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) setSaved(arr.slice(0, 8));
      }
    } catch { /* ignore */ }
  }, []);

  const f = useMemo(() => makeFmt(lang, bnDigits), [lang, bnDigits]);
  const out = useMemo(() => compute(mode, sub, fields, tr, f), [mode, sub, fields, tr, f]);
  const segs = useMemo(() => segments(mode, sub, lang), [mode, sub, lang]);

  const say = useCallback((msg: string) => {
    setFlash(msg);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(""), 2000);
  }, []);

  const setField = (k: Field, v: string) => setFields((p) => ({ ...p, [k]: normalizeDigits(v).replace(/[^0-9.\-+]/g, "") }));
  const reset = () => setFields(EMPTY);
  const swap = () => setFields((p) => ({ ...p, a: p.b, b: p.a }));

  const plain = (s: string) => s.replace(/−/g, "-");
  const resultText = out.kind === "ok" ? plain(out.result.sentence) : "";

  const shareUrl = () => {
    const q = new URLSearchParams({ m: mode });
    if (mode === "addsub") q.set("s", sub);
    (["a", "b", "c"] as Field[]).forEach((k) => fields[k] && q.set(k, fields[k]));
    return `${window.location.origin}${window.location.pathname}?${q.toString()}`;
  };
  const copy = async (text: string, msg: string) => {
    try { await navigator.clipboard.writeText(text); say(msg); } catch { say(tr("কপি করা যায়নি", "Could not copy")); }
  };
  const share = async () => {
    const url = shareUrl();
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try { await navigator.share({ text: resultText, url }); return; } catch { /* cancelled: fall back to copying the link */ }
    }
    copy(url, tr("লিংক কপি হয়েছে", "Link copied"));
  };
  const persist = (list: Saved[]) => { setSaved(list); try { localStorage.setItem(HISTORY_KEY, JSON.stringify(list)); } catch { /* ignore */ } };
  const save = () => {
    if (out.kind !== "ok") return;
    const sentence = plain(out.result.sentence);
    persist([{ id: Date.now(), mode, sub, fields, sentence }, ...saved.filter((s) => s.sentence !== sentence)].slice(0, 8));
    say(tr("সংরক্ষিত হয়েছে (শুধু এই ডিভাইসে)", "Saved (on this device only)"));
  };
  const toggleDigits = () => {
    const next = !bnDigits;
    setBnDigits(next);
    try { localStorage.setItem(DIGITS_KEY, next ? "1" : "0"); } catch { /* ignore */ }
  };

  const chips = CHIPS[mode];
  const pf = PERCENT_FIELD[mode];
  const hasInput = fields.a !== "" || fields.b !== "" || fields.c !== "";
  const xForTable = mode === "of" && out.kind === "ok" ? Number(normalizeDigits(fields.b)) : null;

  return (
    <div className="space-y-6">
      {/* 1. Choose the question */}
      <div role="tablist" aria-label={tr("হিসাবের ধরন", "Type of calculation")} className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap">
        {MODE_ORDER.map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`shrink-0 snap-start min-h-[44px] px-4 rounded-full text-sm font-medium border transition-colors ${mode === m ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-700"}`}
          >
            {tr(...MODE_LABEL[m])}
          </button>
        ))}
      </div>

      {mode === "addsub" && (
        <div role="radiogroup" aria-label={tr("যোগ বা বিয়োগ", "Add or subtract")} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SUB_ORDER.map((s) => (
            <button key={s} role="radio" aria-checked={sub === s} onClick={() => setSub(s)} className={`min-h-[44px] px-3 rounded-xl border text-sm transition-colors ${sub === s ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-500" : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"}`}>
              {tr(...SUB_LABEL[s])}
            </button>
          ))}
        </div>
      )}

      {/* 2. Fill in the blanks of the sentence */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-3 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
        {segs.map((s, i) =>
          "t" in s ? (
            <span key={i}>{s.t}</span>
          ) : (
            <span key={i} className="inline-flex items-center gap-1">
              <input
                type="text"
                inputMode="decimal"
                autoComplete="off"
                aria-label={s.label}
                aria-invalid={out.kind === "error"}
                value={fields[s.f]}
                placeholder={s.ph}
                onChange={(e) => setField(s.f, e.target.value)}
                className="w-[7.25rem] sm:w-36 min-h-[52px] px-3 text-center text-2xl font-semibold tabular-nums rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:font-normal border-2 border-transparent focus:border-indigo-500 outline-none"
              />
              {s.suffix && <span className="text-2xl font-semibold text-slate-500">{s.suffix}</span>}
            </span>
          )
        )}
      </div>

      {chips && pf && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] text-slate-500 dark:text-slate-400">{tr("দ্রুত শতাংশ:", "Quick %:")}</span>
          {chips.map((c) => (
            <button key={c} onClick={() => setField(pf, String(c))} className={`min-h-[36px] px-3 rounded-full text-[13px] border transition-colors ${normalizeDigits(fields[pf]) === String(c) ? "border-indigo-600 text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-300"}`}>
              {f(c)}%{mode === "addsub" && c === 15 ? " VAT" : ""}
            </button>
          ))}
        </div>
      )}

      {/* 3. Result */}
      <div aria-live="polite" className="rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 p-5 md:p-6">
        {out.kind === "error" && <p role="alert" className="text-sm text-rose-600 dark:text-rose-400">{out.message}</p>}

        {out.kind === "empty" && (
          <div>
            <p className="text-[15px] text-slate-700 dark:text-slate-300">{tr("উপরের ঘরগুলোতে সংখ্যা লিখলেই উত্তর ও হিসাবের ধাপ এখানে আসবে।", "Type numbers in the blanks above and the answer and working appear here.")}</p>
            <p className="mt-4 text-[13px] text-slate-500 dark:text-slate-400">{tr("উদাহরণ দিয়ে দেখুন:", "Try an example:")}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {EXAMPLES[mode].map((ex) => (
                <button key={ex.en} onClick={() => { setFields(ex.fields); if (ex.sub) setSub(ex.sub); }} className="min-h-[44px] px-4 rounded-xl border border-indigo-200 dark:border-indigo-900 text-sm text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40">
                  {tr(ex.bn, ex.en)}
                </button>
              ))}
            </div>
          </div>
        )}

        {out.kind === "ok" && (
          <div className="grid md:grid-cols-[minmax(0,1fr)_260px] gap-x-8 gap-y-6 items-start">
            <div className="min-w-0 md:col-start-1 md:row-start-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] text-slate-500 dark:text-slate-400">{tr("ফলাফল", "Result")}</p>
                <button onClick={toggleDigits} aria-pressed={bnDigits} className="text-[13px] px-2.5 min-h-[32px] rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                  {bnDigits ? tr("English অঙ্ক: 123", "English digits: 123") : tr("বাংলা অঙ্ক: ১২৩", "Bangla digits: ১২৩")}
                </button>
              </div>
              <p className={`mt-1 flex items-center gap-2 text-[40px] sm:text-5xl font-bold tabular-nums tracking-tight break-all ${TONE_TEXT[out.result.tone]}`}>
                {out.result.tone === "up" && <TrendingUp aria-hidden className="w-8 h-8 shrink-0" />}
                {out.result.tone === "down" && <TrendingDown aria-hidden className="w-8 h-8 shrink-0" />}
                <span>{out.result.display}</span>
              </p>
              <p className="mt-2 text-[15px] text-slate-700 dark:text-slate-300">{out.result.sentence}</p>
            </div>

            <div className="md:col-start-2 md:row-start-1 md:row-span-2"><PercentageVisual visual={out.result.visual} /></div>

            <div className="min-w-0 md:col-start-1 md:row-start-2">
              {out.result.extras.length > 0 && (
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {out.result.extras.map((e) => (
                    <div key={e.label} className="flex justify-between sm:block gap-3 border-t border-slate-200 dark:border-slate-800 pt-2">
                      <dt className="text-[13px] text-slate-500 dark:text-slate-400">{e.label}</dt>
                      <dd className="font-semibold tabular-nums text-slate-900 dark:text-white">{e.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-5">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{tr("হিসাবের ধাপ", "Working, step by step")}</h3>
                <ol className="mt-2 space-y-2">
                  {out.result.steps.map((st, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <span aria-hidden className="w-5 h-5 mt-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="min-w-0 break-words">{st}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={() => copy(resultText, tr("ফলাফল কপি হয়েছে", "Result copied"))} disabled={out.kind !== "ok"} className={btn}><Copy className="w-4 h-4" />{tr("কপি", "Copy")}</button>
        <button onClick={share} disabled={out.kind !== "ok"} className={btn}><Link2 className="w-4 h-4" />{tr("শেয়ার", "Share")}</button>
        <button onClick={save} disabled={out.kind !== "ok"} className={btn}><Bookmark className="w-4 h-4" />{tr("সংরক্ষণ", "Save")}</button>
        {SWAPPABLE.includes(mode) && <button onClick={swap} className={btn}><ArrowLeftRight className="w-4 h-4" />{tr("অদলবদল", "Swap")}</button>}
        <button onClick={reset} disabled={!hasInput} className={btn}><RotateCcw className="w-4 h-4" />{tr("মুছুন", "Clear")}</button>
        <span role="status" className="inline-flex items-center gap-1 text-[13px] text-emerald-700 dark:text-emerald-400">{flash && <><Check className="w-4 h-4" />{flash}</>}</span>
      </div>

      {/* Quick table for "Y% of X" */}
      {xForTable !== null && Number.isFinite(xForTable) && (
        <details className="rounded-xl border border-slate-200 dark:border-slate-800">
          <summary className="cursor-pointer list-none px-4 min-h-[48px] flex items-center justify-between text-sm font-medium text-slate-900 dark:text-white">
            {tr(`${f(xForTable)} এর সাধারণ শতাংশগুলো`, `Common percentages of ${f(xForTable)}`)}
            <span aria-hidden className="text-slate-400">+</span>
          </summary>
          <div className="px-4 pb-4 overflow-x-auto">
            <table className="w-full text-sm tabular-nums">
              <tbody>
                {QUICK_TABLE.map((p) => (
                  <tr key={p} className="border-t border-slate-100 dark:border-slate-800">
                    <th scope="row" className="py-2 text-left font-normal text-slate-500 dark:text-slate-400">{f(p)}%</th>
                    <td className="py-2 text-right font-semibold text-slate-900 dark:text-white">{f(Number(((xForTable * p) / 100).toPrecision(12)))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}

      {/* Saved calculations (stored only in this browser) */}
      {saved.length > 0 && (
        <section aria-label={tr("সংরক্ষিত হিসাব", "Saved calculations")} className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{tr("সংরক্ষিত হিসাব", "Saved calculations")}</h3>
            <button onClick={() => persist([])} className="text-[13px] text-slate-500 hover:text-rose-600 min-h-[32px] px-2">{tr("সব মুছুন", "Clear all")}</button>
          </div>
          <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">{tr("শুধু আপনার ফোন বা ব্রাউজারে থাকে, সার্ভারে যায় না।", "Kept only in your browser. Nothing is sent to a server.")}</p>
          <ul className="mt-3 space-y-1">
            {saved.map((s) => (
              <li key={s.id} className="flex items-center gap-2">
                <button onClick={() => { setMode(s.mode); setSub(s.sub); setFields(s.fields); }} className="flex-1 min-w-0 text-left text-sm text-slate-700 dark:text-slate-200 min-h-[40px] px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 truncate">{s.sentence}</button>
                <button onClick={() => persist(saved.filter((x) => x.id !== s.id))} aria-label={tr("মুছুন", "Remove")} className="w-9 h-9 shrink-0 inline-flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600"><X className="w-4 h-4" /></button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
