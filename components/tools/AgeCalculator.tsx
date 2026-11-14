"use client";
import { useEffect, useState } from "react";
import { RotateCcw, Calendar } from "lucide-react";
import { useTr } from "@/lib/lang";

type YMD = { y: number; m: number; d: number };
const pad = (n: number) => String(n).padStart(2, "0");
const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const dim = (y: number, m: number) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
const dayNum = (y: number, m: number, d: number) => Math.round(Date.UTC(y, m - 1, d) / 86400000);
const parse = (s: string): YMD => { const [y, m, d] = s.split("-").map(Number); return { y, m, d }; };
const todayStr = () => { const t = new Date(); return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`; };
// birth date + n whole months; a day that does not exist (e.g. 31 Feb) is moved to the last day of that month
const addMonths = (b: YMD, n: number): YMD => {
  const idx = b.y * 12 + (b.m - 1) + n;
  const y = Math.floor(idx / 12), m = (idx % 12) + 1;
  return { y, m, d: Math.min(b.d, dim(y, m)) };
};
const cmp = (a: YMD, b: YMD) => dayNum(a.y, a.m, a.d) - dayNum(b.y, b.m, b.d);
const WD_BN = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const WD_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const fmt = (n: number) => n.toLocaleString("en-US");

type Result = {
  y: number; m: number; d: number; totalMonths: number; totalWeeks: number; totalDays: number;
  hours: number; minutes: number; weekday: number; nextIn: number; nextDate: YMD;
};

export default function AgeCalculator() {
  const tr = useTr();
  const [dob, setDob] = useState("");
  const [asOn, setAsOn] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  useEffect(() => { setAsOn(todayStr()); }, []);

  const calculate = () => {
    setError("");
    const ref = asOn || todayStr();
    if (!dob) return setError(tr("জন্ম তারিখ সিলেক্ট করুন", "Select your date of birth"));
    const b = parse(dob), a = parse(ref);
    if (cmp(b, a) > 0) return setError(tr("জন্ম তারিখ \"বয়স হিসাবের তারিখ\" এর পরে হতে পারে না", "Date of birth cannot be after the \"Age as on\" date"));

    // completed months first, then the remaining days from the last monthly anniversary
    let tm = (a.y - b.y) * 12 + (a.m - b.m);
    if (cmp(addMonths(b, tm), a) > 0) tm--;
    const anniv = addMonths(b, tm);
    const d = dayNum(a.y, a.m, a.d) - dayNum(anniv.y, anniv.m, anniv.d);
    const totalDays = dayNum(a.y, a.m, a.d) - dayNum(b.y, b.m, b.d);

    // next birthday: 29 Feb births are counted on 28 Feb in non-leap years
    const bday = (yr: number): YMD => ({ y: yr, m: b.m, d: b.m === 2 && b.d === 29 && !isLeap(yr) ? 28 : b.d });
    let next = bday(a.y);
    if (cmp(next, a) < 0) next = bday(a.y + 1);
    const nextIn = dayNum(next.y, next.m, next.d) - dayNum(a.y, a.m, a.d);

    setResult({
      y: Math.floor(tm / 12), m: tm % 12, d, totalMonths: tm, totalWeeks: Math.floor(totalDays / 7), totalDays,
      hours: totalDays * 24, minutes: totalDays * 24 * 60,
      weekday: new Date(Date.UTC(b.y, b.m - 1, b.d)).getUTCDay(), nextIn, nextDate: next,
    });
  };
  const reset = () => { setDob(""); setAsOn(todayStr()); setResult(null); setError(""); };

  const inputCls = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
  const small = "bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center";

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tr("আপনার জন্ম তারিখ", "Your date of birth")}</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tr("বয়স হিসাবের তারিখ (Age as on)", "Age as on (date)")}</label>
          <input type="date" value={asOn} onChange={(e) => setAsOn(e.target.value)} className={inputCls} />
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-2">{tr("ডিফল্টে আজকের তারিখ থাকে। ফর্মে নির্দিষ্ট তারিখ (যেমন আবেদনের শেষ দিন) চাইলে সেটি দিন।", "Today is the default. For a form that asks for a fixed date (such as the application deadline), enter that date.")}</p>
      <div className="flex gap-3 mt-4">
        <button onClick={calculate} className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">{tr("বয়স হিসাব করুন", "Calculate")}</button>
        <button onClick={reset} className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> {tr("রিসেট", "Reset")}</button>
      </div>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      {result && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-indigo-600">{result.y}</p><p className="text-xs text-slate-500">{tr("বছর (Years)", "Years")}</p></div>
          <div className="bg-violet-50 dark:bg-violet-950/30 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-violet-600">{result.m}</p><p className="text-xs text-slate-500">{tr("মাস (Months)", "Months")}</p></div>
          <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-emerald-600">{result.d}</p><p className="text-xs text-slate-500">{tr("দিন (Days)", "Days")}</p></div>
          <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-amber-600">{fmt(result.totalDays)}</p><p className="text-xs text-slate-500">{tr("মোট দিন", "Total days")}</p></div>
          <div className={small}><p className="text-lg font-semibold dark:text-white">{fmt(result.totalMonths)}</p><p className="text-xs text-slate-500">{tr("মোট মাস", "Total months")}</p></div>
          <div className={small}><p className="text-lg font-semibold dark:text-white">{fmt(result.totalWeeks)}</p><p className="text-xs text-slate-500">{tr("মোট সপ্তাহ", "Total weeks")}</p></div>
          <div className={small}><p className="text-lg font-semibold dark:text-white">{fmt(result.hours)}</p><p className="text-xs text-slate-500">{tr("মোট ঘণ্টা", "Total hours")}</p></div>
          <div className={small}><p className="text-lg font-semibold dark:text-white">{tr(WD_BN[result.weekday], WD_EN[result.weekday])}</p><p className="text-xs text-slate-500">{tr("জন্মবার", "Born on")}</p></div>
          <div className="col-span-2 md:col-span-4 bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center text-sm text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            {result.nextIn === 0
              ? tr("শুভ জন্মদিন! আজ আপনার জন্মদিন।", "Happy birthday! It is your birthday.")
              : tr(`পরবর্তী জন্মদিন ${result.nextIn} দিন পর (${result.nextDate.d}/${result.nextDate.m}/${result.nextDate.y}, ${WD_BN[new Date(Date.UTC(result.nextDate.y, result.nextDate.m - 1, result.nextDate.d)).getUTCDay()]})`, `Next birthday in ${result.nextIn} days (${result.nextDate.d}/${result.nextDate.m}/${result.nextDate.y}, ${WD_EN[new Date(Date.UTC(result.nextDate.y, result.nextDate.m - 1, result.nextDate.d)).getUTCDay()]})`)}
          </div>
        </div>
      )}
    </div>
  );
}
