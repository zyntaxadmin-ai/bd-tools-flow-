"use client";
import { useState } from "react";
import { Copy, Check, RotateCcw, Share2 } from "lucide-react";
import { useTr } from "@/lib/lang";
import { siteConfig } from "@/lib/seo";

const field = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const label = "text-sm font-medium dark:text-slate-200";
const card = "border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800";

// Base: 1 শতাংশ = 435.6 sq ft, 1 একর = 43,560 sq ft (100 শতাংশ), 1 বর্গমিটার = 10.7639 sq ft, 1 গজ = 9 sq ft.
// কাঠা ও বিঘার মাপ এলাকাভেদে আলাদা, তাই ১ কাঠা = কত বর্গফুট এবং ১ বিঘা = কত কাঠা ইউজার বদলাতে পারবে।
// কানি, গণ্ডা, কড়া, ক্রান্তি, তিল: ১ কানি = ৪০ শতাংশ (১৭,৪২৪ বর্গফুট), ১ কানি = ২০ গণ্ডা, ১ গণ্ডা = ৪ কড়া, ১ কড়া = ৩ ক্রান্তি, ১ ক্রান্তি = ২০ তিল।
type Unit = { id: string; bn: string; en: string; sqft: number };

function units(katha: number, bighaKatha: number): Unit[] {
  return [
    { id: "shatak", bn: "শতাংশ", en: "Shatak (decimal)", sqft: 435.6 },
    { id: "katha", bn: "কাঠা", en: "Katha", sqft: katha },
    { id: "bigha", bn: "বিঘা", en: "Bigha", sqft: katha * bighaKatha },
    { id: "acre", bn: "একর", en: "Acre", sqft: 43560 },
    { id: "chatak", bn: "ছটাক", en: "Chatak", sqft: katha / 16 },
    { id: "sqft", bn: "বর্গফুট", en: "Square feet", sqft: 1 },
    { id: "gaz", bn: "বর্গগজ", en: "Square yard (gaz)", sqft: 9 },
    { id: "sqm", bn: "বর্গমিটার", en: "Square metres", sqft: 10.7639 },
    { id: "hectare", bn: "হেক্টর", en: "Hectare", sqft: 107639.1 },
    { id: "kani", bn: "কানি", en: "Kani", sqft: 17424 },
    { id: "gonda", bn: "গণ্ডা", en: "Gonda", sqft: 871.2 },
    { id: "kora", bn: "কড়া", en: "Kora", sqft: 217.8 },
    { id: "kranti", bn: "ক্রান্তি", en: "Kranti", sqft: 72.6 },
    { id: "til", bn: "তিল", en: "Til", sqft: 3.63 },
    { id: "ojut", bn: "অযুতাংশ", en: "Ojutangsho", sqft: 4.356 },
  ];
}

const KEY = ["shatak", "katha", "bigha", "acre"];
const COMMON = ["shatak", "katha", "bigha", "acre", "chatak", "sqft", "gaz", "sqm", "hectare"];
const TRADITIONAL = ["kani", "gonda", "kora", "kranti", "til", "ojut"];
const DIM: Record<string, number> = { ft: 1, m: 10.7639, gaz: 3 }; // length unit -> feet (area uses the square of it)

const num = (s: string) => parseFloat(s);
const fmt = (n: number) => (isFinite(n) ? n.toLocaleString("en-US", { maximumFractionDigits: Math.abs(n) >= 1 ? 4 : 6 }) : "-");
const money = (n: number) => Math.round(n).toLocaleString("en-IN");

export default function LandCalculator() {
  const tr = useTr();
  const [val, setVal] = useState("1");
  const [unit, setUnit] = useState("shatak");
  const [kathaStr, setKathaStr] = useState("720");
  const [bighaStr, setBighaStr] = useState("20");
  const [copied, setCopied] = useState("");
  const [shape, setShape] = useState<"rect" | "tri">("rect");
  const [dimUnit, setDimUnit] = useState("ft");
  const [len, setLen] = useState("");
  const [wid, setWid] = useState("");
  const [priceStr, setPriceStr] = useState("");
  const [priceUnit, setPriceUnit] = useState("shatak");

  const kParsed = num(kathaStr);
  const katha = !isNaN(kParsed) && kParsed > 0 ? kParsed : 720;
  const bParsed = num(bighaStr);
  const bighaKatha = !isNaN(bParsed) && bParsed > 0 ? bParsed : 20;
  const list = units(katha, bighaKatha);
  const get = (id: string) => list.find((u) => u.id === id)!;
  const name = (u: Unit) => tr(u.bn, u.en);

  const v = num(val);
  const base = get(unit);
  const totalSqft = !isNaN(v) && v >= 0 && val !== "" ? v * base.sqft : null;

  const L = num(len), W = num(wid);
  const areaSqft = !isNaN(L) && !isNaN(W) && L > 0 && W > 0 ? L * W * DIM[dimUnit] * DIM[dimUnit] * (shape === "tri" ? 0.5 : 1) : null;

  const price = num(priceStr);
  const perSqft = !isNaN(price) && price > 0 ? price / get(priceUnit).sqft : null;

  const copy = async (id: string, text: string) => {
    try { await navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(""), 1500); } catch { /* ignore */ }
  };

  const share = async () => {
    if (totalSqft === null) return;
    const lines = KEY.filter((id) => id !== unit).map((id) => `${fmt(totalSqft / get(id).sqft)} ${name(get(id))}`);
    const text = `${fmt(v)} ${name(base)} = ${lines.join(" = ")}\n${siteConfig.url}/tool/land-calculator-bd`;
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try { await navigator.share({ text }); return; } catch { /* user cancelled, fall back to copy */ }
    }
    copy("share", text);
  };

  const reset = () => { setVal("1"); setUnit("shatak"); setKathaStr("720"); setBighaStr("20"); setLen(""); setWid(""); setPriceStr(""); };

  const row = (id: string) => {
    const u = get(id);
    const out = fmt(totalSqft! / u.sqft);
    return (
      <div key={id} className="flex items-center justify-between px-4 py-3">
        <span className="text-sm text-slate-600 dark:text-slate-400">{name(u)}</span>
        <span className="flex items-center gap-2">
          <span className="font-semibold dark:text-white">{out}</span>
          <button onClick={() => copy(id, out)} aria-label={tr("কপি", "Copy") + " " + name(u)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-white">
            {copied === id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="land-amount" className={label}>{tr("জমির পরিমাণ", "Land amount")}</label>
          <input id="land-amount" type="number" inputMode="decimal" min="0" value={val} onChange={(e) => setVal(e.target.value)} placeholder={tr("যেমন: 5", "e.g. 5")} className={field} />
        </div>
        <div>
          <label htmlFor="land-unit" className={label}>{tr("একক", "Unit")}</label>
          <select id="land-unit" value={unit} onChange={(e) => setUnit(e.target.value)} className={field}>
            <optgroup label={tr("প্রচলিত একক", "Common units")}>
              {COMMON.map((id) => <option key={id} value={id}>{name(get(id))}</option>)}
            </optgroup>
            <optgroup label={tr("আঞ্চলিক একক", "Traditional units")}>
              {TRADITIONAL.map((id) => <option key={id} value={id}>{name(get(id))}</option>)}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Assumptions you can change */}
      <details className={`${card} px-4 py-3`}>
        <summary className="cursor-pointer text-sm dark:text-slate-200">
          {tr(`১ কাঠা = ${fmt(katha)} বর্গফুট, ১ বিঘা = ${fmt(bighaKatha)} কাঠা (এলাকা অনুযায়ী বদলান)`, `1 katha = ${fmt(katha)} sq ft, 1 bigha = ${fmt(bighaKatha)} katha (change for your area)`)}
        </summary>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <div>
            <label htmlFor="land-katha" className={label}>{tr("১ কাঠা = কত বর্গফুট?", "Square feet in 1 katha")}</label>
            <input id="land-katha" type="number" inputMode="decimal" value={kathaStr} onChange={(e) => setKathaStr(e.target.value)} className={field} />
          </div>
          <div>
            <label htmlFor="land-bigha" className={label}>{tr("১ বিঘা = কত কাঠা?", "Katha in 1 bigha")}</label>
            <input id="land-bigha" type="number" inputMode="decimal" value={bighaStr} onChange={(e) => setBighaStr(e.target.value)} className={field} />
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2">{tr("সাধারণ মাপ: ১ কাঠা = ৭২০ বর্গফুট, ১ বিঘা = ২০ কাঠা। এলাকাভেদে আলাদা হতে পারে, দলিল বা সার্ভেয়ার দেখে নিশ্চিত হোন।", "Usual size: 1 katha = 720 sq ft, 1 bigha = 20 katha. It can differ by area, so confirm with your deed or surveyor.")}</p>
      </details>

      {totalSqft === null ? (
        <p className="text-sm text-slate-500">{tr("জমির পরিমাণ লিখুন, সব এককে ফলাফল এখানে দেখাবে।", "Enter a land amount to see it in every unit here.")}</p>
      ) : (
        <>
          {/* Main results */}
          <div className="grid grid-cols-2 gap-3">
            {KEY.map((id) => {
              const u = get(id);
              return (
                <div key={id} className={`rounded-xl p-3 border ${id === unit ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"}`}>
                  <div className="text-xs text-slate-500">{name(u)}</div>
                  <div className="text-lg font-bold dark:text-white break-all">{fmt(totalSqft / u.sqft)}</div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2">
            <button onClick={share} className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white flex items-center gap-1.5 text-sm">
              {copied === "share" ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />} {copied === "share" ? tr("কপি হয়েছে", "Copied") : tr("শেয়ার", "Share")}
            </button>
            <button onClick={reset} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1.5 text-sm dark:text-white"><RotateCcw className="w-4 h-4" /> {tr("রিসেট", "Reset")}</button>
          </div>

          {/* All conversions */}
          <div>
            <h3 className="font-semibold text-sm dark:text-white mb-2">{tr("প্রচলিত একক", "Common units")}</h3>
            <div className={`${card} divide-y divide-slate-100 dark:divide-slate-700 overflow-hidden`}>{COMMON.map(row)}</div>
          </div>
          <div>
            <h3 className="font-semibold text-sm dark:text-white mb-1">{tr("আঞ্চলিক একক (কানি, গণ্ডা, কড়া, ক্রান্তি, তিল)", "Traditional units (kani, gonda, kora, kranti, til)")}</h3>
            <p className="text-xs text-slate-500 mb-2">{tr("১ কানি = ৪০ শতাংশ ধরা হয়েছে (চট্টগ্রাম, নোয়াখালী অঞ্চলের প্রচলিত মাপ)। অন্য এলাকায় মাপ আলাদা হতে পারে।", "1 kani = 40 shatak is assumed (the usual measure in Chattogram and Noakhali). Other areas can differ.")}</p>
            <div className={`${card} divide-y divide-slate-100 dark:divide-slate-700 overflow-hidden`}>{TRADITIONAL.map(row)}</div>
          </div>
        </>
      )}

      {/* Length x width */}
      <div className="border-t border-slate-200 dark:border-slate-700 pt-5">
        <h3 className="font-semibold text-sm dark:text-white">{tr("দৈর্ঘ্য × প্রস্থ থেকে জমির আয়তন", "Land area from length × width")}</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {([["rect", "আয়তক্ষেত্র", "Rectangle"], ["tri", "ত্রিভুজ", "Triangle"]] as const).map(([id, bn, en]) => (
            <button key={id} onClick={() => setShape(id)} aria-pressed={shape === id} className={`px-3 py-1.5 rounded-lg text-sm border ${shape === id ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 dark:text-white" : "border-slate-200 dark:border-slate-700 dark:text-slate-300"}`}>{tr(bn, en)}</button>
          ))}
          <select aria-label={tr("মাপের একক", "Length unit")} value={dimUnit} onChange={(e) => setDimUnit(e.target.value)} className="px-3 py-1.5 rounded-lg text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white">
            <option value="ft">{tr("ফুট", "Feet")}</option>
            <option value="m">{tr("মিটার", "Metres")}</option>
            <option value="gaz">{tr("গজ", "Yards (gaz)")}</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <input type="number" inputMode="decimal" min="0" value={len} onChange={(e) => setLen(e.target.value)} aria-label={shape === "tri" ? tr("ভূমি", "Base") : tr("দৈর্ঘ্য", "Length")} placeholder={shape === "tri" ? tr("ভূমি", "Base") : tr("দৈর্ঘ্য", "Length")} className={field} />
          <input type="number" inputMode="decimal" min="0" value={wid} onChange={(e) => setWid(e.target.value)} aria-label={shape === "tri" ? tr("উচ্চতা", "Height") : tr("প্রস্থ", "Width")} placeholder={shape === "tri" ? tr("উচ্চতা", "Height") : tr("প্রস্থ", "Width")} className={field} />
        </div>
        {areaSqft !== null && (
          <div className="mt-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-4 text-sm dark:text-slate-200 space-y-1">
            <p>{tr("আয়তন:", "Area:")} <b>{fmt(areaSqft)} {tr("বর্গফুট", "sq ft")}</b></p>
            <p><b>{fmt(areaSqft / 435.6)}</b> {tr("শতাংশ", "shatak")} · <b>{fmt(areaSqft / katha)}</b> {tr("কাঠা", "katha")} · <b>{fmt(areaSqft / (katha * bighaKatha))}</b> {tr("বিঘা", "bigha")} · <b>{fmt(areaSqft / 43560)}</b> {tr("একর", "acre")}</p>
            <button onClick={() => { setVal(String(areaSqft)); setUnit("sqft"); }} className="mt-1 text-indigo-600 dark:text-indigo-400 underline">{tr("উপরের কনভার্টারে নিন", "Use it in the converter above")}</button>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="border-t border-slate-200 dark:border-slate-700 pt-5">
        <h3 className="font-semibold text-sm dark:text-white">{tr("জমির দাম হিসাব", "Land price calculator")}</h3>
        <p className="text-xs text-slate-500 mt-1">{tr("উপরের জমির পরিমাণ অনুযায়ী মোট দাম বের হবে।", "The total is worked out for the land amount entered above.")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <input type="number" inputMode="decimal" min="0" value={priceStr} onChange={(e) => setPriceStr(e.target.value)} aria-label={tr("দাম (টাকা)", "Price (BDT)")} placeholder={tr("দাম (টাকা)", "Price (BDT)")} className={field} />
          <select aria-label={tr("প্রতি কত একক", "Per unit")} value={priceUnit} onChange={(e) => setPriceUnit(e.target.value)} className={field}>
            {KEY.map((id) => <option key={id} value={id}>{tr("প্রতি ", "Per ")}{name(get(id))}</option>)}
          </select>
        </div>
        {perSqft !== null && (
          <div className="mt-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-4 text-sm dark:text-slate-200 space-y-1">
            {totalSqft !== null && <p>{tr("মোট দাম:", "Total price:")} <b className="text-base">৳ {money(perSqft * totalSqft)}</b></p>}
            <p className="text-slate-600 dark:text-slate-400">{KEY.map((id) => `${tr("প্রতি ", "Per ")}${name(get(id))} ৳ ${money(perSqft * get(id).sqft)}`).join(" · ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
