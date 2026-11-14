"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

const grades = [
  { label: "A+ (80-100)", value: 5.0 },
  { label: "A (70-79)", value: 4.0 },
  { label: "A- (60-69)", value: 3.5 },
  { label: "B (50-59)", value: 3.0 },
  { label: "C (40-49)", value: 2.0 },
  { label: "D (33-39)", value: 1.0 },
  { label: "F (0-32) - Fail", value: 0.0 },
];

// marks (out of 100) -> grade point, same bands as the table above
function marksToPoint(m: number): number {
  if (m >= 80) return 5;
  if (m >= 70) return 4;
  if (m >= 60) return 3.5;
  if (m >= 50) return 3;
  if (m >= 40) return 2;
  if (m >= 33) return 1;
  return 0;
}

type Level = "ssc" | "hsc";
const MAIN_COUNT: Record<Level, number> = { ssc: 9, hsc: 6 };

function GpaCore({ level, showLevelSwitch }: { level: Level; showLevelSwitch?: boolean }) {
  const tr = useTr();
  const [lvl, setLvl] = useState<Level>(level);
  const n = MAIN_COUNT[lvl];
  const [mode, setMode] = useState<"grade" | "marks">("grade");
  const [vals, setVals] = useState<string[]>(Array(9).fill("5"));
  const [fourth, setFourth] = useState<string>("none");
  const [res, setRes] = useState<null | {
    fail: boolean; gpa: number; mainGpa: number; total: number; mainTotal: number; bonus: number; n: number; failed: number[];
  }>(null);

  const point = (v: string) => (mode === "grade" ? parseFloat(v) : marksToPoint(parseFloat(v) || 0));

  const calculate = () => {
    const pts = vals.slice(0, n).map(point);
    const failed = pts.map((p, i) => (p === 0 ? i + 1 : 0)).filter(Boolean);
    const mainTotal = pts.reduce((a, b) => a + b, 0);
    const f = fourth === "none" ? 0 : point(fourth);
    const bonus = Math.max(0, f - 2);
    const total = mainTotal + bonus;
    const gpa = Math.min(5, total / n);
    setRes({ fail: failed.length > 0, gpa, mainGpa: mainTotal / n, total, mainTotal, bonus, n, failed });
  };
  const reset = () => { setVals(Array(9).fill(mode === "grade" ? "5" : "")); setFourth("none"); setRes(null); };
  const switchMode = (m: "grade" | "marks") => { setMode(m); setVals(Array(9).fill(m === "grade" ? "5" : "")); setFourth("none"); setRes(null); };
  const switchLevel = (l: Level) => { setLvl(l); setRes(null); };

  const inputCls = "w-full mt-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm dark:text-white";
  const tab = (active: boolean) => `flex-1 py-2 rounded-lg text-sm font-medium ${active ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 dark:text-white"}`;

  const renderInput = (value: string, onChange: (v: string) => void, withNone = false) =>
    mode === "grade" ? (
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
        {withNone && <option value="none">{tr("৪র্থ বিষয় নেই", "No 4th subject")}</option>}
        {grades.map((g) => <option key={g.label} value={g.value}>{g.label}</option>)}
      </select>
    ) : (
      <input type="number" inputMode="decimal" min={0} max={100} placeholder={withNone ? tr("৪র্থ বিষয়ের নম্বর (ঐচ্ছিক)", "4th subject marks (optional)") : tr("নম্বর (১০০ এর মধ্যে)", "Marks out of 100")}
        value={value === "none" ? "" : value} onChange={(e) => onChange(withNone && e.target.value === "" ? "none" : e.target.value)} className={inputCls} />
    );

  return (
    <div>
      {showLevelSwitch && (
        <div className="flex gap-2 mb-3">
          <button onClick={() => switchLevel("ssc")} className={tab(lvl === "ssc")}>SSC (৯ {tr("বিষয়", "subjects")})</button>
          <button onClick={() => switchLevel("hsc")} className={tab(lvl === "hsc")}>HSC (৬ {tr("বিষয়", "subjects")})</button>
        </div>
      )}
      <div className="flex gap-2 mb-4">
        <button onClick={() => switchMode("grade")} className={tab(mode === "grade")}>{tr("গ্রেড দিয়ে", "By grade")}</button>
        <button onClick={() => switchMode("marks")} className={tab(mode === "marks")}>{tr("নম্বর দিয়ে", "By marks")}</button>
      </div>
      <p className="text-sm text-slate-500 mb-3">
        {tr(`${n}টি মূল বিষয়ের ${mode === "grade" ? "গ্রেড" : "নম্বর"} দিন। দুই পত্রের বিষয়ে দুই পত্রের মিলিত ফল একটি বিষয় ধরুন।`, `Enter the ${mode === "grade" ? "grade" : "marks"} of the ${n} main subjects. A two-paper subject counts as one subject.`)}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {vals.slice(0, n).map((v, i) => (
          <div key={i}>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">{tr("বিষয়", "Subject")} {i + 1}</label>
            {renderInput(v, (nv) => { const c = [...vals]; c[i] = nv; setVals(c); })}
          </div>
        ))}
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-400">{tr("৪র্থ (ঐচ্ছিক) বিষয়", "4th (optional) subject")}</label>
          {renderInput(fourth, setFourth, true)}
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <button onClick={calculate} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">{tr("GPA হিসাব করুন", "Calculate GPA")}</button>
        <button onClick={reset} aria-label="Reset" className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-white"><RotateCcw className="w-4 h-4" /></button>
      </div>
      {res && (
        <div className={`mt-6 rounded-xl p-6 text-center border ${res.fail ? "bg-red-50 border-red-200 dark:bg-red-950/20" : "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20"}`}>
          <p className="text-sm text-slate-500">{tr("আপনার GPA", "Your GPA")}</p>
          <p className={`text-4xl font-bold ${res.fail ? "text-red-600" : "text-emerald-600"}`}>{res.fail ? "0.00" : res.gpa.toFixed(2)}</p>
          <p className="text-sm font-medium mt-1 text-slate-700 dark:text-slate-300">
            {res.fail ? tr(`Fail - বিষয় ${res.failed.join(", ")} এ F`, `Fail - F in subject ${res.failed.join(", ")}`) : res.gpa >= 5 ? "Golden A+ !" : res.gpa >= 4 ? "Excellent" : res.gpa >= 3 ? "Good" : "Pass"}
          </p>
          <p className="text-xs text-slate-500 mt-1">{tr("৫.০০ এর মধ্যে", "Out of 5.00")}</p>
          {!res.fail && (
            <div className="mt-4 text-left text-sm text-slate-700 dark:text-slate-300 border-t border-emerald-200 dark:border-emerald-900 pt-3 space-y-1">
              <p>{tr("মূল বিষয়ের পয়েন্ট যোগফল", "Main subjects total")}: {res.mainTotal.toFixed(2)}</p>
              <p>{tr("৪র্থ বিষয়ের বাড়তি পয়েন্ট (পয়েন্ট − ২.০০)", "4th subject bonus (points − 2.00)")}: +{res.bonus.toFixed(2)}</p>
              <p>{tr("মোট", "Total")}: {res.total.toFixed(2)}</p>
              <p>{tr("GPA", "GPA")} = {res.total.toFixed(2)} ÷ {res.n} = {(res.total / res.n).toFixed(2)}{res.total / res.n > 5 ? ` → 5.00` : ""}</p>
              <p>{tr("৪র্থ বিষয় ছাড়া GPA", "GPA without 4th subject")}: {res.mainGpa.toFixed(2)}</p>
            </div>
          )}
          <p className="text-xs text-slate-500 mt-3">{tr("এটি আনুমানিক হিসাব। অফিসিয়াল ফল আপনার শিক্ষা বোর্ডের রেজাল্টই।", "This is an estimate. The official result is the one your education board publishes.")}</p>
        </div>
      )}
    </div>
  );
}

export default function GpaCalculator() { return <GpaCore level="ssc" showLevelSwitch />; }
export function SscGpaCalculator() { return <GpaCore level="ssc" />; }
export function HscGpaCalculator() { return <GpaCore level="hsc" />; }
