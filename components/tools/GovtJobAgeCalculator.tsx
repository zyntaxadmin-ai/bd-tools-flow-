"use client";
import { useState } from "react";
import { RotateCcw, Copy, Check, CalendarDays } from "lucide-react";
import { parseYMD, utcMs, diffYMD, birthdayAt, fmtDate } from "@/lib/dateCalc";
import { useTr } from "@/lib/lang";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const DAY = 86400000;

// Quick-fill limits. The tool never decides the limit for you: always confirm it in the circular.
const PRESETS = [
  { id: "govt", max: 32, bn: "সরকারি চাকরি (সাধারণ) - ৩২ বছর", en: "Government job (general) - 32 years" },
  { id: "bcs", max: 32, bn: "বিসিএস - ৩২ বছর", en: "BCS - 32 years" },
  { id: "thirty", max: 30, bn: "বিজ্ঞপ্তিতে ৩০ বছর লেখা থাকলে", en: "If the circular says 30 years" },
  { id: "custom", max: 0, bn: "অন্য (নিজে লিখব)", en: "Other (I will enter it)" },
];
const COMPARE = [30, 32, 35];

function todayStr() {
  const n = new Date();
  const p = (x: number) => String(x).padStart(2, "0");
  return `${n.getFullYear()}-${p(n.getMonth() + 1)}-${p(n.getDate())}`;
}

export default function GovtJobAgeCalculator() {
  const tr = useTr();
  const [preset, setPreset] = useState("govt");
  const [dob, setDob] = useState("");
  const [asOf, setAsOf] = useState("");
  const [maxAge, setMaxAge] = useState("32");
  const [rule, setRule] = useState<"upto" | "before">("upto");
  const [copied, setCopied] = useState(false);

  const b = parseYMD(dob), t = parseYMD(asOf);
  const max = parseInt(maxAge, 10);
  let error = "";
  let res: { y: number; m: number; d: number; totalDays: number; ok: boolean; last: Date; gapDays: number } | null = null;

  // "upto": exactly N years 0 days is still fine ("N বছরের বেশি হবে না").
  // "before": the person must not have completed N years ("N বছর পূর্ণ হয়নি").
  const lastFor = (n: number) => {
    const bd = utcMs(birthdayAt(b!, n));
    return rule === "before" ? bd - DAY : bd;
  };

  if (b && t && maxAge !== "") {
    if (isNaN(max) || max < 1 || max > 100) error = tr("সর্বোচ্চ বয়স ১ থেকে ১০০ বছরের মধ্যে দিন", "Maximum age must be between 1 and 100 years");
    else if (utcMs(t) < utcMs(b)) error = tr("জন্ম তারিখ বয়স গণনার তারিখের পরে হতে পারে না", "Date of birth cannot be after the age-calculation date");
    else {
      const age = diffYMD(b, t);
      const lastMs = lastFor(max);
      res = { y: age.y, m: age.m, d: age.d, totalDays: age.totalDays, ok: utcMs(t) <= lastMs, last: new Date(lastMs), gapDays: Math.round(Math.abs(lastMs - utcMs(t)) / DAY) };
    }
  }

  const pickPreset = (id: string) => {
    setPreset(id);
    const p = PRESETS.find((x) => x.id === id);
    if (p && p.max) setMaxAge(String(p.max));
  };

  const ruleText = rule === "before" ? tr(`${max} বছর পূর্ণ হওয়ার আগে`, `before turning ${max}`) : tr(`সর্বোচ্চ ${max} বছর`, `up to ${max} years`);

  const copyResult = async () => {
    if (!res) return;
    const text = tr(
      `বয়স গণনার তারিখে আমার বয়স ${res.y} বছর ${res.m} মাস ${res.d} দিন। সীমা: ${ruleText}। ${res.ok ? "বয়সের সীমার মধ্যে আছি" : "বয়সের সীমা পেরিয়ে গেছে"}। শেষ যোগ্য তারিখ: ${fmtDate(res.last)}। (bdtoolsflow.cyou)`,
      `My age on the calculation date is ${res.y} years ${res.m} months ${res.d} days. Limit: ${ruleText}. ${res.ok ? "Within the age limit" : "Over the age limit"}. Last eligible date: ${fmtDate(res.last)}. (bdtoolsflow.cyou)`
    );
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ }
  };

  const reset = () => { setDob(""); setAsOf(""); setPreset("govt"); setMaxAge("32"); setRule("upto"); };
  const chip = (on: boolean) => `flex-1 px-3 py-2.5 rounded-xl border text-sm text-left transition ${on ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 font-semibold" : "border-slate-200 dark:border-slate-700 dark:text-slate-300"}`;

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="gja-preset" className="text-sm font-medium dark:text-slate-200">{tr("কোন চাকরির সীমা? (ঝটপট বেছে নিন)", "Which age limit? (quick pick)")}</label>
        <select id="gja-preset" value={preset} onChange={(e) => pickPreset(e.target.value)} className={input}>
          {PRESETS.map((p) => <option key={p.id} value={p.id}>{tr(p.bn, p.en)}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="gja-dob" className="text-sm font-medium dark:text-slate-200">{tr("আপনার জন্ম তারিখ", "Your date of birth")}</label>
        <input id="gja-dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} className={input} />
      </div>
      <div>
        <label htmlFor="gja-asof" className="text-sm font-medium dark:text-slate-200">{tr("বয়স গণনার তারিখ (বিজ্ঞপ্তিতে যা দেওয়া আছে)", "Age-calculation date (as given in the circular)")}</label>
        <div className="flex gap-2">
          <input id="gja-asof" type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)} className={input} />
          <button type="button" onClick={() => setAsOf(todayStr())} className="mt-1 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm whitespace-nowrap flex items-center gap-1 dark:text-white"><CalendarDays className="w-4 h-4" />{tr("আজ", "Today")}</button>
        </div>
      </div>
      <div>
        <label htmlFor="gja-max" className="text-sm font-medium dark:text-slate-200">{tr("সর্বোচ্চ বয়স (বছর)", "Maximum age (years)")}</label>
        <input id="gja-max" type="number" inputMode="numeric" value={maxAge} onChange={(e) => { setMaxAge(e.target.value); setPreset("custom"); }} placeholder={tr("বিজ্ঞপ্তি দেখে লিখুন", "Enter from the circular")} className={input} />
      </div>
      <div>
        <p className="text-sm font-medium dark:text-slate-200">{tr("বিজ্ঞপ্তিতে সীমা কীভাবে লেখা?", "How does the circular word the limit?")}</p>
        <div className="mt-1 flex flex-col sm:flex-row gap-2">
          <button type="button" onClick={() => setRule("upto")} aria-pressed={rule === "upto"} className={chip(rule === "upto")}>{tr("সর্বোচ্চ ... বছর (বছরের বেশি হবে না)", "Maximum ... years (must not exceed)")}</button>
          <button type="button" onClick={() => setRule("before")} aria-pressed={rule === "before"} className={chip(rule === "before")}>{tr("... বছর পূর্ণ হয়নি (পূর্ণ হওয়ার আগে)", "Not yet completed ... years")}</button>
        </div>
      </div>
      <button type="button" onClick={reset} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {res && b && (
        <>
          <div className={`rounded-xl p-5 border ${res.ok ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900" : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"}`} aria-live="polite">
            <p className="text-sm text-slate-500">{tr("ওই তারিখে আপনার বয়স", "Your age on that date")}</p>
            <p className="text-2xl font-bold dark:text-white">{res.y} {tr("বছর", "years")} {res.m} {tr("মাস", "months")} {res.d} {tr("দিন", "days")}</p>
            <p className={`mt-2 font-semibold ${res.ok ? "text-emerald-600" : "text-red-600"}`}>{res.ok ? tr("বয়সের সীমার মধ্যে আছেন", "You are within the age limit") : tr("বয়সের সীমা পেরিয়ে গেছে", "You are over the age limit")}</p>
            <p className="text-xs text-slate-500 mt-2">
              {res.ok ? tr(`আপনি ${fmtDate(res.last)} পর্যন্ত যোগ্য থাকতেন (আরও ${res.gapDays} দিন)।`, `You remain eligible until ${fmtDate(res.last)} (${res.gapDays} more days).`) : tr(`${fmtDate(res.last)} এর পর বয়স সীমা অতিক্রম করে (${res.gapDays} দিন আগে)।`, `The age limit passed after ${fmtDate(res.last)} (${res.gapDays} days ago).`)}
            </p>
            <p className="text-xs text-slate-500 mt-1">{tr(`মোট ${res.y * 12 + res.m} মাস বা ${res.totalDays} দিন।`, `That is ${res.y * 12 + res.m} months or ${res.totalDays} days in total.`)}</p>
            <button type="button" onClick={copyResult} className="mt-3 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-sm flex items-center gap-1.5 dark:text-white">
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}{copied ? tr("কপি হয়েছে", "Copied") : tr("ফলাফল কপি করুন", "Copy result")}
            </button>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <p className="text-sm font-semibold dark:text-white">{tr("আপনার জন্ম তারিখ অনুযায়ী শেষ যোগ্য দিন", "Last eligible day for your date of birth")}</p>
            <ul className="mt-2 space-y-1.5 text-sm dark:text-slate-300">
              {COMPARE.map((n) => (
                <li key={n} className="flex justify-between gap-3">
                  <span>{tr(`${n} বছরের সীমা`, `${n}-year limit`)}</span>
                  <span className="font-medium text-right">{fmtDate(new Date(lastFor(n)))}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <p className="text-xs text-slate-500 border border-slate-200 dark:border-slate-700 rounded-xl p-3">{tr("বয়সসীমা, গণনার তারিখ ও কোটা চাকরির বিজ্ঞপ্তি ভেদে আলাদা। এই টুল শুধু আনুমানিক হিসাব দেয়, তাই চূড়ান্ত সিদ্ধান্তের আগে অফিসিয়াল বিজ্ঞপ্তি দেখে নিশ্চিত হোন।", "Age limits, reference dates and quotas differ by job circular. This tool gives only an estimate, so confirm with the official circular before making a final decision.")}</p>
    </div>
  );
}
