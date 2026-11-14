"use client";
import { useState } from "react";
import { RotateCcw, Copy, Check, Info } from "lucide-react";
import { useTr } from "@/lib/lang";
import {
  bandOf, bandsFor, bmiPrime, computeBmi, ponderal, toCm, toKg, validate, weightRangeKg, LB_PER_KG,
  type Standard,
} from "@/lib/bmi";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const label = "text-sm font-medium dark:text-slate-200";
const SCALE_MIN = 12;
const SCALE_MAX = 42;

function Seg<T extends string>({ value, onChange, options, name }: { value: T; onChange: (v: T) => void; options: { v: T; t: string }[]; name: string }) {
  return (
    <div role="radiogroup" aria-label={name} className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm">
      {options.map((o) => (
        <button key={o.v} type="button" role="radio" aria-checked={value === o.v} onClick={() => onChange(o.v)}
          className={`px-3 py-1.5 rounded-lg transition ${value === o.v ? "bg-white dark:bg-slate-700 shadow-sm font-semibold text-indigo-700 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}>
          {o.t}
        </button>
      ))}
    </div>
  );
}

export default function BmiCalculator() {
  const tr = useTr();
  const [wUnit, setWUnit] = useState<"kg" | "lb">("kg");
  const [hUnit, setHUnit] = useState<"cm" | "ft">("ft");
  const [std, setStd] = useState<Standard>("who");
  const [weight, setWeight] = useState("65");
  const [cm, setCm] = useState("165");
  const [feet, setFeet] = useState("5");
  const [inch, setInch] = useState("5");
  const [age, setAge] = useState("");
  const [copied, setCopied] = useState(false);

  const w = parseFloat(weight);
  const kg = toKg(w, wUnit);
  const heightCm = toCm(hUnit, parseFloat(cm), parseFloat(feet || "0"), parseFloat(inch || "0"));
  const hasInput = weight !== "" && (hUnit === "cm" ? cm !== "" : feet !== "" || inch !== "");
  const ageN = parseFloat(age);

  const v = hasInput ? validate(kg, heightCm) : null;
  let error = "";
  if (v && !v.ok) {
    if (v.kind === "number") error = tr("সঠিক সংখ্যা লিখুন", "Enter valid numbers");
    else if (v.kind === "weight") error = wUnit === "kg" ? tr("ওজন ২০ থেকে ৪৫০ কেজির মধ্যে দিন", "Weight must be between 20 and 450 kg") : tr("ওজন ৪৪ থেকে ৯৯০ পাউন্ডের মধ্যে দিন", "Weight must be between 44 and 990 lb");
    else error = hUnit === "cm" ? tr("উচ্চতা ১০০ থেকে ২৫০ সেমির মধ্যে দিন", "Height must be between 100 and 250 cm") : tr("উচ্চতা ৩ ফুট ৪ ইঞ্চি থেকে ৮ ফুট ২ ইঞ্চির মধ্যে দিন", "Height must be between 3 ft 4 in and 8 ft 2 in");
  }
  const bmi = v && v.ok ? computeBmi(kg, heightCm) : null;

  const band = bmi !== null ? bandOf(bmi, std) : null;
  const other = bmi !== null ? bandOf(bmi, std === "who" ? "asia" : "who") : null;
  const lang = tr("bn", "en");
  const nm = (b: { bn: string; en: string }) => (lang === "en" ? b.en : b.bn);

  const upper = std === "asia" ? 23 : 25;
  const hiLimit = std === "asia" ? 22.9 : 24.9;
  const [minKg, maxKg] = bmi !== null ? weightRangeKg(heightCm, 18.5, hiLimit) : [0, 0];
  const pos = bmi !== null ? Math.min(100, Math.max(0, ((bmi - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100)) : 0;
  const bands = bandsFor(std);

  const summary = bmi !== null && band
    ? `BMI ${bmi.toFixed(1)} (${band.en}) - ${tr("স্বাভাবিক ওজন", "healthy weight")}: ${minKg.toFixed(1)}-${maxKg.toFixed(1)} kg. bdtoolsflow.cyou/tool/bmi-calculator`
    : "";
  const copy = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* ignore */ }
  };
  const changeWUnit = (u: "kg" | "lb") => {
    if (u === wUnit) return;
    const n = parseFloat(weight);
    if (!isNaN(n)) setWeight((u === "lb" ? n * LB_PER_KG : n / LB_PER_KG).toFixed(1).replace(/\.0$/, ""));
    setWUnit(u);
  };
  const changeHUnit = (u: "cm" | "ft") => {
    if (u === hUnit) return;
    if (u === "cm") {
      const c = toCm("ft", NaN, parseFloat(feet || "0"), parseFloat(inch || "0"));
      if (!isNaN(c) && (feet !== "" || inch !== "")) setCm(c.toFixed(0));
    } else {
      const c = parseFloat(cm);
      if (!isNaN(c)) { const tot = c / 2.54; const f = Math.floor(tot / 12); setFeet(String(f)); setInch((tot - f * 12).toFixed(1).replace(/\.0$/, "")); }
    }
    setHUnit(u);
  };
  const reset = () => { setWeight(""); setCm(""); setFeet(""); setInch(""); setAge(""); };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Seg name={tr("ওজনের একক", "Weight unit")} value={wUnit} onChange={changeWUnit} options={[{ v: "kg", t: tr("কেজি", "kg") }, { v: "lb", t: tr("পাউন্ড", "lb") }]} />
        <Seg name={tr("উচ্চতার একক", "Height unit")} value={hUnit} onChange={changeHUnit} options={[{ v: "ft", t: tr("ফুট + ইঞ্চি", "ft + in") }, { v: "cm", t: tr("সেমি", "cm") }]} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="bmi-w" className={label}>{tr("ওজন", "Weight")} ({wUnit === "kg" ? tr("কেজি", "kg") : tr("পাউন্ড", "lb")})</label>
          <input id="bmi-w" type="number" inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={wUnit === "kg" ? tr("যেমন: 65", "e.g. 65") : tr("যেমন: 143", "e.g. 143")} className={input} />
        </div>
        <div>
          <span className={label}>{tr("উচ্চতা", "Height")}</span>
          {hUnit === "cm" ? (
            <input aria-label={tr("উচ্চতা (সেমি)", "Height (cm)")} type="number" inputMode="decimal" value={cm} onChange={(e) => setCm(e.target.value)} placeholder={tr("যেমন: 165", "e.g. 165")} className={input} />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <input aria-label={tr("ফুট", "Feet")} type="number" inputMode="decimal" value={feet} onChange={(e) => setFeet(e.target.value)} placeholder={tr("ফুট", "Feet")} className={input} />
              <input aria-label={tr("ইঞ্চি", "Inches")} type="number" inputMode="decimal" value={inch} onChange={(e) => setInch(e.target.value)} placeholder={tr("ইঞ্চি", "Inches")} className={input} />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="bmi-age" className={label}>{tr("বয়স (ঐচ্ছিক)", "Age (optional)")}</label>
          <input id="bmi-age" type="number" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} placeholder={tr("বছর, যেমন: 30", "years, e.g. 30")} className={input} />
        </div>
        <div>
          <span className={label}>{tr("কোন মানদণ্ডে দেখবেন?", "Which standard?")}</span>
          <div className="mt-1">
            <Seg name={tr("BMI মানদণ্ড", "BMI standard")} value={std} onChange={setStd} options={[{ v: "who", t: tr("WHO আন্তর্জাতিক", "WHO international") }, { v: "asia", t: tr("দক্ষিণ এশীয় (WHO ২০০৪)", "South Asian (WHO 2004)") }]} />
          </div>
        </div>
      </div>

      <button type="button" onClick={reset} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl inline-flex items-center gap-1.5 text-sm dark:text-white">
        <RotateCcw className="w-4 h-4" /> {tr("রিসেট", "Reset")}
      </button>

      {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      {!error && bmi === null && (
        <p className="text-sm text-slate-500 dark:text-slate-400">{tr("ওজন ও উচ্চতা লিখলেই ফল দেখাবে।", "Enter your weight and height to see the result.")}</p>
      )}

      {Number.isFinite(ageN) && ageN > 0 && ageN < 20 && (
        <div className="flex gap-2 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-3 text-sm text-slate-700 dark:text-slate-200">
          <Info className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" aria-hidden="true" />
          <p>{tr("এই ক্যালকুলেটর ২০ বছর বা তার বেশি বয়সীদের জন্য। শিশু ও কিশোরদের (২–১৯ বছর) BMI বয়স ও লিঙ্গ অনুযায়ী পার্সেন্টাইল দিয়ে দেখা হয়। শিশুর ক্ষেত্রে ডাক্তার বা CDC-র শিশু BMI ক্যালকুলেটর ব্যবহার করুন।", "This calculator is for adults aged 20 and over. For children and teens (2 to 19) BMI is read as a percentile for age and sex. Use the CDC child and teen BMI calculator or ask a doctor.")}</p>
        </div>
      )}

      {bmi !== null && band && other && (
        <section aria-live="polite" className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-5 md:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{tr("আপনার BMI", "Your BMI")}</p>
              <p className="text-5xl font-bold tabular-nums text-slate-900 dark:text-white">{bmi.toFixed(1)} <span className="text-base font-normal text-slate-500">kg/m²</span></p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1.5 rounded-full text-white text-sm font-semibold" style={{ backgroundColor: band.color }}>{nm(band)}</span>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {std === "who" ? tr("দক্ষিণ এশীয় মানদণ্ডে: ", "South Asian view: ") : tr("WHO আন্তর্জাতিক মানদণ্ডে: ", "WHO international: ")}
                <span className="font-medium text-slate-700 dark:text-slate-200">{nm(other)}</span>
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="flex h-3 rounded-full overflow-hidden" role="img" aria-label={`BMI ${bmi.toFixed(1)}: ${band.en}`}>
                {bands.map((b) => {
                  const lo = Math.max(b.min, SCALE_MIN);
                  const hi = Math.min(b.max, SCALE_MAX);
                  if (hi <= lo) return null;
                  return <div key={b.key} style={{ width: `${((hi - lo) / (SCALE_MAX - SCALE_MIN)) * 100}%`, backgroundColor: b.color }} />;
                })}
              </div>
              <div style={{ left: `${pos}%` }} className="absolute -top-1.5 -translate-x-1/2 w-1.5 h-6 rounded bg-slate-900 dark:bg-white ring-2 ring-white dark:ring-slate-800" />
            </div>
            <div className="relative mt-1 h-4 text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
              {[18.5, std === "asia" ? 23 : 25, std === "asia" ? 27.5 : 30, ...(std === "who" ? [35, 40] : [])].map((t) => (
                <span key={t} style={{ left: `${((t - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100}%` }} className="absolute -translate-x-1/2">{t}</span>
              ))}
            </div>
          </div>

          <dl className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div className="flex justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-2">
              <dt className="text-slate-600 dark:text-slate-300">{tr("আপনার উচ্চতায় স্বাভাবিক ওজন", "Healthy weight for your height")}</dt>
              <dd className="font-semibold text-right dark:text-white">{minKg.toFixed(1)} – {maxKg.toFixed(1)} {tr("কেজি", "kg")}<br /><span className="font-normal text-xs text-slate-500">{(minKg * LB_PER_KG).toFixed(0)} – {(maxKg * LB_PER_KG).toFixed(0)} {tr("পাউন্ড", "lb")}</span></dd>
            </div>
            <div className="flex justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-2">
              <dt className="text-slate-600 dark:text-slate-300">{tr("আপনার ওজন", "Your weight")}</dt>
              <dd className="font-semibold dark:text-white">{kg.toFixed(1)} {tr("কেজি", "kg")}</dd>
            </div>
            <div className="flex justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-2">
              <dt className="text-slate-600 dark:text-slate-300">BMI Prime <span className="text-xs text-slate-400">(BMI ÷ {upper})</span></dt>
              <dd className="font-semibold tabular-nums dark:text-white">{bmiPrime(bmi, upper).toFixed(2)}</dd>
            </div>
            <div className="flex justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-2">
              <dt className="text-slate-600 dark:text-slate-300">Ponderal Index</dt>
              <dd className="font-semibold tabular-nums dark:text-white">{ponderal(kg, heightCm).toFixed(1)} kg/m³</dd>
            </div>
          </dl>

          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            {tr("হিসাব: ", "Working: ")}{kg.toFixed(1)} ÷ ({(heightCm / 100).toFixed(2)} × {(heightCm / 100).toFixed(2)}) = {bmi.toFixed(1)}
          </p>
          {Number.isFinite(ageN) && ageN >= 65 && (
            <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">{tr("৬৫ বছরের বেশি বয়সে পেশি ও হাড়ের ঘনত্ব কমে, তাই সামান্য বেশি BMI (প্রায় ২৫–২৭) অনেক সময় ক্ষতিকর নয়। আপনার ডাক্তারের সঙ্গে কথা বলুন।", "After 65 muscle and bone mass fall, so a slightly higher BMI (about 25 to 27) is often not harmful. Talk to your doctor.")}</p>
          )}

          <div className="mt-4">
            <button type="button" onClick={copy} className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl inline-flex items-center gap-1.5 text-sm dark:text-white bg-white dark:bg-slate-900">
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />} {copied ? tr("কপি হয়েছে", "Copied") : tr("ফল কপি করুন", "Copy result")}
            </button>
          </div>
        </section>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <caption className="text-left px-4 py-3 font-semibold dark:text-white">
            {std === "who" ? tr("প্রাপ্তবয়স্কদের BMI তালিকা (WHO)", "Adult BMI chart (WHO)") : tr("দক্ষিণ এশীয় BMI তালিকা (WHO ২০০৪ অ্যাকশন পয়েন্ট)", "South Asian BMI chart (WHO 2004 action points)")}
          </caption>
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <tr><th scope="col" className="text-left px-4 py-2 font-medium">{tr("ক্যাটাগরি", "Category")}</th><th scope="col" className="text-left px-4 py-2 font-medium">BMI (kg/m²)</th></tr>
          </thead>
          <tbody>
            {bands.map((b) => {
              const active = band?.key === b.key;
              const range = b.max === Infinity ? tr(`${b.min} বা বেশি`, `${b.min} or more`) : b.min === 0 ? `< ${b.max}` : `${b.min} – ${(b.max - 0.1).toFixed(1)}`;
              return (
                <tr key={b.key} className={`border-t border-slate-100 dark:border-slate-800 ${active ? "bg-indigo-50 dark:bg-indigo-950/40 font-semibold" : ""}`}>
                  <td className="px-4 py-2 dark:text-slate-100"><span className="inline-block w-2.5 h-2.5 rounded-full mr-2 align-middle" style={{ backgroundColor: b.color }} aria-hidden="true" />{nm(b)}{active && <span className="ml-2 text-xs text-indigo-700 dark:text-indigo-300">{tr("← আপনি", "← you")}</span>}</td>
                  <td className="px-4 py-2 tabular-nums dark:text-slate-100">{range}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 border border-slate-200 dark:border-slate-700 rounded-xl p-3">
        {tr("এটি আনুমানিক হিসাব, ডাক্তারের পরামর্শের বিকল্প নয়। BMI রোগ নির্ণয় করে না এবং পেশি ও চর্বির পার্থক্য ধরে না। শিশু, গর্ভবতী নারী, খেলোয়াড় ও বয়স্কদের ক্ষেত্রে সঠিক ফল নাও দিতে পারে।", "This is an estimate and not a substitute for medical advice. BMI does not diagnose disease and cannot tell muscle from fat. It may not be accurate for children, pregnant women, athletes and older adults.")}
      </p>
    </div>
  );
}
