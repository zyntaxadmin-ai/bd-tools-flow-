"use client";
import { useMemo, useState } from "react";
import { RotateCcw, Copy, Download, Check } from "lucide-react";
import { useLang, useTr } from "@/lib/lang";
import { flatPlan, flatToReducingRate, reducingEmi, reducingPlan, shortAmount, yearly } from "@/lib/emi";

const box = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const card = "rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-4";
const num0 = (n: number) => Math.round(n).toLocaleString("en-IN");

// Starting values only. Real rates differ by bank, product and date.
const TYPES = [
  { id: "home", bn: "হোম লোন", en: "Home loan", amount: 5000000, rate: 10, years: 20, range: [9, 13] },
  { id: "personal", bn: "পার্সোনাল লোন", en: "Personal loan", amount: 500000, rate: 14, years: 3, range: [10, 18] },
  { id: "car", bn: "কার লোন", en: "Car loan", amount: 2000000, rate: 11, years: 5, range: [9, 15] },
  { id: "sme", bn: "SME / ব্যবসা", en: "SME / business", amount: 1000000, rate: 10, years: 5, range: [7, 13] },
  { id: "education", bn: "এডুকেশন লোন", en: "Education loan", amount: 800000, rate: 11, years: 7, range: [9, 14] },
  { id: "custom", bn: "নিজের হিসাব", en: "Custom", amount: 500000, rate: 10, years: 5, range: [0, 0] },
] as const;

export default function EmiCalculator() {
  const tr = useTr();
  const { lang } = useLang();
  const bn = lang !== "en";
  const tk = (n: number) => `${num0(n)} ${tr("টাকা", "taka")}`;

  const [type, setType] = useState<string>("custom");
  const [p, setP] = useState("500000");
  const [rate, setRate] = useState("10");
  const [dur, setDur] = useState("5");
  const [unit, setUnit] = useState<"year" | "month">("year");
  const [method, setMethod] = useState<"reducing" | "flat">("reducing");
  const [fee, setFee] = useState("");
  const [extra, setExtra] = useState("");
  const [view, setView] = useState<"year" | "month">("year");
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);

  const P = parseFloat(p);
  const R = parseFloat(rate);
  const D = parseFloat(dur);
  const F = fee === "" ? 0 : parseFloat(fee);
  const X = extra === "" ? 0 : parseFloat(extra);
  const n = unit === "year" ? Math.round(D * 12) : Math.round(D);

  let error = "";
  if (p === "" || rate === "" || dur === "") error = "";
  else if (isNaN(P) || isNaN(R) || isNaN(D) || isNaN(F) || isNaN(X)) error = tr("সঠিক সংখ্যা লিখুন", "Enter valid numbers");
  else if (P <= 0) error = tr("লোনের পরিমাণ ০ এর বেশি দিন", "Loan amount must be above 0");
  else if (R < 0 || R > 50) error = tr("সুদের হার ০ থেকে ৫০% এর মধ্যে দিন", "Interest rate must be between 0 and 50%");
  else if (n < 1 || n > 600) error = tr("মেয়াদ ১ মাস থেকে ৫০ বছরের মধ্যে দিন", "Tenure must be between 1 month and 50 years");
  else if (F < 0 || F > 20) error = tr("প্রসেসিং ফি ০ থেকে ২০% এর মধ্যে দিন", "Processing fee must be between 0 and 20%");
  else if (X < 0) error = tr("অতিরিক্ত কিস্তি ঋণাত্মক হতে পারে না", "Extra payment cannot be negative");
  const ready = p !== "" && rate !== "" && dur !== "" && !error;

  const calc = useMemo(() => {
    if (!ready) return null;
    const base = method === "flat" ? flatPlan(P, R, n) : reducingPlan(P, R, n, 0);
    const withExtra = method === "reducing" && X > 0 ? reducingPlan(P, R, n, X) : null;
    const plan = withExtra ?? base;
    const effective = method === "flat" ? flatToReducingRate(P, R, n) : null;
    return { base, withExtra, plan, effective };
  }, [ready, P, R, n, X, method]);

  const feeAmt = ready ? (P * F) / 100 : 0;
  const tenures = ready
    ? [1, 2, 3, 5, 7, 10, 15, 20].filter((y) => y * 12 !== n).map((y) => ({ y, emi: method === "flat" ? flatPlan(P, R, y * 12).emi : reducingEmi(P, R, y * 12), int: (method === "flat" ? flatPlan(P, R, y * 12).totalInterest : reducingEmi(P, R, y * 12) * y * 12 - P) }))
    : [];

  const pickType = (id: string) => {
    setType(id);
    const t = TYPES.find((x) => x.id === id)!;
    if (id === "custom") return;
    setP(String(t.amount));
    setRate(String(t.rate));
    setDur(String(t.years));
    setUnit("year");
  };
  const touch = () => setType("custom");

  const reset = () => {
    setP("500000"); setRate("10"); setDur("5"); setUnit("year"); setMethod("reducing"); setFee(""); setExtra(""); setType("custom"); setShowAll(false);
  };

  const summaryText = () => {
    if (!calc) return "";
    const pl = calc.plan;
    return [
      `EMI ${tr("ক্যালকুলেটর", "calculator")} - bdtoolsflow.cyou`,
      `${tr("লোন", "Loan")}: ${tk(P)}, ${R}% ${method === "flat" ? "flat" : "reducing"}, ${n} ${tr("মাস", "months")}`,
      `${tr("মাসিক কিস্তি", "Monthly EMI")}: ${tk(pl.emi + (calc.withExtra ? X : 0))}`,
      `${tr("মোট সুদ", "Total interest")}: ${tk(pl.totalInterest)}`,
      `${tr("মোট পরিশোধ", "Total repayment")}: ${tk(pl.totalPaid)}`,
    ].join("\n");
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(summaryText()); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ }
  };
  const csv = () => {
    if (!calc) return;
    const lines = ["Month,Payment,Principal,Interest,Balance", ...calc.plan.rows.map((r) => [r.m, r.paid, r.princ, r.int, r.bal].map((v, i) => (i === 0 ? v : v.toFixed(2))).join(","))];
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url; a.download = "emi-schedule.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  // chart: outstanding balance over time
  const chart = useMemo(() => {
    if (!calc) return null;
    const rows = calc.plan.rows;
    const W = 600, H = 150, pad = 6;
    const step = Math.max(1, Math.floor(rows.length / 120));
    const pts: [number, number][] = [[0, P], ...rows.filter((_, i) => i % step === 0 || i === rows.length - 1).map((r) => [r.m, r.bal] as [number, number])];
    const maxM = rows.length || 1;
    const xy = pts.map(([m, b]) => `${(pad + (m / maxM) * (W - pad * 2)).toFixed(1)},${(pad + (1 - b / P) * (H - pad * 2)).toFixed(1)}`);
    return { W, H, line: xy.join(" "), area: `${pad},${H - pad} ${xy.join(" ")} ${W - pad},${H - pad}` };
  }, [calc, P]);

  const slider = (value: number, min: number, max: number, step: number, set: (v: string) => void, label: string) => (
    <input type="range" aria-label={label} min={min} max={max} step={step} value={Math.min(max, Math.max(min, isNaN(value) ? min : value))} onChange={(e) => { set(e.target.value); touch(); }} className="w-full mt-2 accent-indigo-600" />
  );

  const rows = calc?.plan.rows ?? [];
  const yrs = yearly(rows);
  const interestShare = calc ? (calc.plan.totalInterest / calc.plan.totalPaid) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium dark:text-slate-200 mb-2">{tr("লোনের ধরন", "Loan type")}</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label={tr("লোনের ধরন", "Loan type")}>
          {TYPES.map((t) => (
            <button key={t.id} type="button" aria-pressed={type === t.id} onClick={() => pickType(t.id)} className={`px-3.5 py-2 rounded-full border text-sm transition ${type === t.id ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white hover:border-indigo-400"}`}>{bn ? t.bn : t.en}</button>
          ))}
        </div>
        {type !== "custom" && (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {tr(`এটি শুধু শুরুর উদাহরণ। ${TYPES.find((x) => x.id === type)!.range[0]}-${TYPES.find((x) => x.id === type)!.range[1]}% আনুমানিক সীমা, ব্যাংক ও সময়ভেদে আলাদা। আপনার ব্যাংকের হার বসান।`, `Starting example only. About ${TYPES.find((x) => x.id === type)!.range[0]}-${TYPES.find((x) => x.id === type)!.range[1]}% is an approximate range that varies by bank and date. Enter your bank's rate.`)}
          </p>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <label htmlFor="emi-amt" className="text-sm font-medium dark:text-slate-200">{tr("লোনের পরিমাণ (টাকা)", "Loan amount (taka)")}</label>
            {ready && <span className="text-xs text-indigo-600 dark:text-indigo-300 font-medium">{shortAmount(P, bn)}</span>}
          </div>
          <input id="emi-amt" type="number" inputMode="decimal" value={p} onChange={(e) => { setP(e.target.value); touch(); }} placeholder={tr("যেমন: 500000", "e.g. 500000")} className={`${box} mt-1`} />
          {slider(P, 10000, 20000000, 10000, setP, tr("লোনের পরিমাণ স্লাইডার", "Loan amount slider"))}
        </div>
        <div>
          <label htmlFor="emi-rate" className="text-sm font-medium dark:text-slate-200">{tr("বার্ষিক সুদের হার (%)", "Annual interest rate (%)")}</label>
          <input id="emi-rate" type="number" inputMode="decimal" step="0.01" value={rate} onChange={(e) => { setRate(e.target.value); touch(); }} placeholder={tr("যেমন: 9.5", "e.g. 9.5")} className={`${box} mt-1`} />
          {slider(R, 1, 30, 0.25, setRate, tr("সুদের হার স্লাইডার", "Interest rate slider"))}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="emi-dur" className="text-sm font-medium dark:text-slate-200">{tr("মেয়াদ", "Tenure")}</label>
          <div className="flex gap-2 mt-1">
            <input id="emi-dur" type="number" inputMode="decimal" value={dur} onChange={(e) => { setDur(e.target.value); touch(); }} placeholder={unit === "year" ? tr("বছর", "Years") : tr("মাস", "Months")} className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
            {(["year", "month"] as const).map((u) => (
              <button key={u} type="button" aria-pressed={unit === u} onClick={() => { if (u !== unit && !isNaN(D)) setDur(String(u === "month" ? Math.round(D * 12) : Math.round((D / 12) * 100) / 100)); setUnit(u); }} className={`px-4 rounded-xl border text-sm ${unit === u ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{u === "year" ? tr("বছর", "Years") : tr("মাস", "Months")}</button>
            ))}
          </div>
          {unit === "year" ? slider(D, 1, 30, 1, setDur, tr("মেয়াদ স্লাইডার", "Tenure slider")) : slider(D, 3, 360, 1, setDur, tr("মেয়াদ স্লাইডার", "Tenure slider"))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium dark:text-slate-200 mb-2">{tr("সুদ হিসাবের পদ্ধতি", "Interest method")}</p>
          <div className="grid grid-cols-2 gap-2">
            {(["reducing", "flat"] as const).map((m) => (
              <button key={m} type="button" aria-pressed={method === m} onClick={() => setMethod(m)} className={`px-3 py-2.5 rounded-xl border text-sm text-left transition ${method === m ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-200" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>
                <span className="block font-semibold">{m === "reducing" ? "Reducing balance" : "Flat rate"}</span>
                <span className="block text-xs opacity-80">{m === "reducing" ? tr("বকেয়া আসলের ওপর সুদ", "Interest on the balance") : tr("পুরো আসলের ওপর সুদ", "Interest on the full amount")}</span>
              </button>
            ))}
          </div>
        </div>
        <details className={`${card} group`}>
          <summary className="cursor-pointer list-none text-sm font-medium dark:text-white flex justify-between items-center">
            {tr("আরও অপশন (ফি ও অতিরিক্ত কিস্তি)", "More options (fee and extra payment)")}
            <span className="text-slate-500 group-open:rotate-45 transition-transform text-lg leading-none" aria-hidden="true">+</span>
          </summary>
          <div className="mt-3 space-y-3">
            <div>
              <label htmlFor="emi-fee" className="text-xs font-medium dark:text-slate-200">{tr("প্রসেসিং ফি (লোনের %)", "Processing fee (% of loan)")}</label>
              <input id="emi-fee" type="number" inputMode="decimal" step="0.1" value={fee} onChange={(e) => setFee(e.target.value)} placeholder={tr("যেমন: 1", "e.g. 1")} className={`${box} mt-1 py-2`} />
            </div>
            <div>
              <label htmlFor="emi-extra" className="text-xs font-medium dark:text-slate-200">{tr("প্রতি মাসে অতিরিক্ত টাকা", "Extra payment every month")}</label>
              <input id="emi-extra" type="number" inputMode="decimal" value={extra} onChange={(e) => setExtra(e.target.value)} disabled={method === "flat"} placeholder={method === "flat" ? tr("শুধু reducing balance-এ", "Reducing balance only") : tr("যেমন: 5000", "e.g. 5000")} className={`${box} mt-1 py-2 disabled:opacity-50`} />
            </div>
          </div>
        </details>
      </div>

      {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      {calc && ready && (
        <div className="space-y-5">
          <div className="rounded-2xl bg-indigo-600 text-white p-5 md:p-6">
            <p className="text-sm opacity-90">{tr("মাসিক কিস্তি (EMI)", "Monthly instalment (EMI)")}{calc.withExtra ? tr(" (অতিরিক্তসহ)", " (with extra)") : ""}</p>
            <p className="text-3xl md:text-4xl font-bold mt-1 tracking-tight">{tk(calc.plan.emi + (calc.withExtra ? X : 0))}</p>
            <div className="mt-4 h-3 rounded-full overflow-hidden bg-white/25 flex" role="img" aria-label={tr(`আসল ${Math.round(100 - interestShare)}%, সুদ ${Math.round(interestShare)}%`, `Principal ${Math.round(100 - interestShare)}%, interest ${Math.round(interestShare)}%`)}>
              <div className="bg-white" style={{ width: `${100 - interestShare}%` }} />
              <div className="bg-amber-300" style={{ width: `${interestShare}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-xs">
              <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-white" />{tr("আসল", "Principal")} {(100 - interestShare).toFixed(1)}%</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-300" />{tr("সুদ", "Interest")} {interestShare.toFixed(1)}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className={card}><p className="text-xs text-slate-500 dark:text-slate-400">{tr("মোট সুদ", "Total interest")}</p><p className="text-lg font-bold mt-1 dark:text-white">{tk(calc.plan.totalInterest)}</p></div>
            <div className={card}><p className="text-xs text-slate-500 dark:text-slate-400">{tr("মোট পরিশোধ", "Total repayment")}</p><p className="text-lg font-bold mt-1 dark:text-white">{tk(calc.plan.totalPaid)}</p></div>
            <div className={card}><p className="text-xs text-slate-500 dark:text-slate-400">{tr("শোধ শেষ হবে", "Paid off in")}</p><p className="text-lg font-bold mt-1 dark:text-white">{calc.plan.months >= 12 ? `${Math.floor(calc.plan.months / 12)} ${tr("বছর", "yr")}${calc.plan.months % 12 ? ` ${calc.plan.months % 12} ${tr("মাস", "mo")}` : ""}` : `${calc.plan.months} ${tr("মাস", "months")}`}</p></div>
          </div>

          {feeAmt > 0 && (
            <p className="text-sm rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-3 dark:text-slate-200">
              {tr(`প্রসেসিং ফি ${tk(feeAmt)}। ফিসহ মোট খরচ ${tk(calc.plan.totalPaid + feeAmt)}, অর্থাৎ ঋণ নেওয়ার খরচ ${tk(calc.plan.totalInterest + feeAmt)}।`, `Processing fee is ${tk(feeAmt)}. Total cost with the fee is ${tk(calc.plan.totalPaid + feeAmt)}, so borrowing costs ${tk(calc.plan.totalInterest + feeAmt)}.`)}
            </p>
          )}

          {calc.withExtra && (
            <p className="text-sm rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30 p-3 dark:text-slate-200">
              {tr(`প্রতি মাসে ${tk(X)} বেশি দিলে ${calc.base.months - calc.withExtra.months} মাস আগে ঋণ শোধ হবে এবং ${tk(calc.base.totalInterest - calc.withExtra.totalInterest)} সুদ বাঁচবে। অতিরিক্ত ছাড়া কিস্তি ছিল ${tk(calc.base.emi)}।`, `Paying ${tk(X)} extra every month clears the loan ${calc.base.months - calc.withExtra.months} months earlier and saves ${tk(calc.base.totalInterest - calc.withExtra.totalInterest)} in interest. Without the extra, the EMI is ${tk(calc.base.emi)}.`)}
            </p>
          )}

          {calc.effective !== null && (
            <p className="text-sm rounded-xl border border-slate-200 dark:border-slate-700 p-3 dark:text-slate-200">
              {tr(`Flat ${R}% মানে reducing balance পদ্ধতিতে প্রায় ${calc.effective.toFixed(2)}% সুদ। একই লোনে reducing ${R}% হলে কিস্তি হতো ${tk(reducingEmi(P, R, n))}।`, `A flat ${R}% is roughly ${calc.effective.toFixed(2)}% on a reducing balance basis. At reducing ${R}% the same loan would cost ${tk(reducingEmi(P, R, n))} a month.`)}
            </p>
          )}

          {chart && (
            <div>
              <h3 className="font-semibold text-sm dark:text-white mb-2">{tr("বকেয়া আসল কীভাবে কমে", "How the balance falls")}</h3>
              <svg viewBox={`0 0 ${chart.W} ${chart.H}`} className="w-full h-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" role="img" aria-label={tr("বকেয়া আসলের লাইন চার্ট", "Outstanding balance line chart")}>
                <polygon points={chart.area} className="fill-indigo-100 dark:fill-indigo-950" />
                <polyline points={chart.line} fill="none" strokeWidth="2.5" strokeLinejoin="round" className="stroke-indigo-600 dark:stroke-indigo-400" />
              </svg>
              <div className="flex justify-between text-xs text-slate-500 mt-1"><span>{tr("শুরু", "Start")}: {shortAmount(P, bn)}</span><span>{tr("শেষ", "End")}: 0</span></div>
            </div>
          )}

          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h3 className="font-semibold text-sm dark:text-white">{tr("কিস্তির তালিকা", "Repayment schedule")}</h3>
              <div className="flex gap-2">
                <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden text-xs">
                  {(["year", "month"] as const).map((v) => (
                    <button key={v} type="button" aria-pressed={view === v} onClick={() => { setView(v); setShowAll(false); }} className={`px-3 py-1.5 ${view === v ? "bg-indigo-600 text-white" : "dark:text-white"}`}>{v === "year" ? tr("বছরভিত্তিক", "Yearly") : tr("মাসভিত্তিক", "Monthly")}</button>
                  ))}
                </div>
                <button type="button" onClick={csv} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs flex items-center gap-1 dark:text-white"><Download className="w-3.5 h-3.5" /> CSV</button>
              </div>
            </div>
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
              <table className="w-full text-sm min-w-[480px]">
                <thead className="bg-slate-100 dark:bg-slate-800 dark:text-white">
                  <tr><th className="p-2">{view === "year" ? tr("বছর", "Year") : tr("মাস", "Month")}</th><th className="p-2">{tr("পরিশোধ", "Paid")}</th><th className="p-2">{tr("আসল", "Principal")}</th><th className="p-2">{tr("সুদ", "Interest")}</th><th className="p-2">{tr("বাকি", "Balance")}</th></tr>
                </thead>
                <tbody className="dark:text-slate-200">
                  {(view === "year" ? yrs.map((r) => ({ k: r.y, ...r })) : rows.slice(0, showAll ? rows.length : 12).map((r) => ({ k: r.m, y: r.m, ...r }))).map((r) => (
                    <tr key={r.k} className="border-t border-slate-200 dark:border-slate-700 text-center">
                      <td className="p-2">{r.y}</td>
                      <td className="p-2">{num0(r.paid)}</td>
                      <td className="p-2">{num0(r.princ)}</td>
                      <td className="p-2">{num0(r.int)}</td>
                      <td className="p-2">{num0(r.bal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {view === "month" && rows.length > 12 && (
              <button type="button" onClick={() => setShowAll(!showAll)} className="mt-2 text-sm text-indigo-700 dark:text-indigo-300 underline">{showAll ? tr("প্রথম ১২ মাস দেখান", "Show first 12 months") : tr(`সব ${rows.length} মাস দেখান`, `Show all ${rows.length} months`)}</button>
            )}
          </div>

          {tenures.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm dark:text-white mb-2">{tr("মেয়াদ বদলালে কিস্তি কত হতো", "EMI at other tenures")}</h3>
              <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
                <table className="w-full text-sm min-w-[360px]">
                  <thead className="bg-slate-100 dark:bg-slate-800 dark:text-white"><tr><th className="p-2">{tr("মেয়াদ", "Tenure")}</th><th className="p-2">{tr("মাসিক কিস্তি", "Monthly EMI")}</th><th className="p-2">{tr("মোট সুদ", "Total interest")}</th></tr></thead>
                  <tbody className="dark:text-slate-200">
                    {tenures.map((t) => (
                      <tr key={t.y} className="border-t border-slate-200 dark:border-slate-700 text-center"><td className="p-2">{t.y} {tr("বছর", t.y === 1 ? "year" : "years")}</td><td className="p-2">{num0(t.emi)}</td><td className="p-2">{num0(t.int)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={reset} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1.5 dark:text-white"><RotateCcw className="w-4 h-4" /> {tr("রিসেট", "Reset")}</button>
        {calc && ready && (
          <button type="button" onClick={copy} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1.5 dark:text-white">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? tr("কপি হয়েছে", "Copied") : tr("ফলাফল কপি করুন", "Copy result")}</button>
        )}
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl p-3">
        {tr("এটি আনুমানিক হিসাব। ব্যাংকের প্রসেসিং ফি, ইনস্যুরেন্স, আবগারি শুল্ক, দেরিতে পরিশোধের জরিমানা ও ভিন্ন হিসাব পদ্ধতির কারণে আসল কিস্তি আলাদা হতে পারে, তাই ব্যাংক থেকে নিশ্চিত হোন। আপনার দেওয়া অঙ্ক কোথাও জমা হয় না।", "This is an estimate. Bank processing fees, insurance, excise duty, late-payment charges and a different calculation method can change your real instalment, so confirm with your bank. The numbers you enter are not stored anywhere.")}
      </p>
    </div>
  );
}
