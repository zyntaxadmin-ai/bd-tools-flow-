"use client";
import { useState } from "react";
import { RotateCcw, Copy, Check } from "lucide-react";
import { useTr } from "@/lib/lang";

// Nisab: 7.5 vori of gold or 52.5 vori of silver (1 vori = 11.664 g, so 87.48 g gold or 612.36 g silver). Zakat rate: 2.5%.
// Prices change every day, so the user types the current price per vori.
export const GOLD_NISAB_VORI = 7.5;
export const SILVER_NISAB_VORI = 52.5;
export const ZAKAT_RATE = 0.025;
const GRAM_PER_VORI = 11.664;
type Basis = "silver" | "gold";

export type ZakatResult = { nisab: number; assets: number; debts: number; net: number; due: boolean; zakat: number };

export function computeZakat(assets: number[], debts: number, pricePerVori: number, basis: Basis): ZakatResult {
  const nisab = (basis === "gold" ? GOLD_NISAB_VORI : SILVER_NISAB_VORI) * pricePerVori;
  const total = assets.reduce((a, b) => a + b, 0);
  const net = Math.max(0, total - debts);
  const due = net >= nisab && nisab > 0;
  return { nisab, assets: total, debts, net, due, zakat: due ? Math.round(net * ZAKAT_RATE * 100) / 100 : 0 };
}

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const small = "w-full mt-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm";
const money = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const num = (s: string) => (s === "" ? 0 : parseFloat(s));

type Weight = { vori: string; ana: string; roti: string };
const EMPTY_W: Weight = { vori: "", ana: "", roti: "" };
// 1 vori = 16 ana = 96 roti
const weightInVori = (w: Weight) => num(w.vori) + num(w.ana) / 16 + num(w.roti) / 96;

export default function ZakatCalculator() {
  const tr = useTr();
  const [basis, setBasis] = useState<Basis>("silver");
  const [price, setPrice] = useState("");
  const [f, setF] = useState({ cash: "", gold: "", silver: "", business: "", owed: "", other: "", debts: "" });
  const [hawl, setHawl] = useState(true);
  const [result, setResult] = useState<ZakatResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Optional helper: turn a weight (vori / ana / roti) into a taka value.
  const [gW, setGW] = useState<Weight>(EMPTY_W);
  const [sW, setSW] = useState<Weight>(EMPTY_W);
  const [gP, setGP] = useState("");
  const [sP, setSP] = useState("");

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => { setF({ ...f, [k]: e.target.value }); setResult(null); };

  const calculate = () => {
    setError("");
    const p = parseFloat(price);
    if (price === "" || isNaN(p) || p <= 0) return setError(tr("আগে নিসাবের জন্য আজকের ভরির দাম লিখুন", "First enter today's price per vori for the nisab"));
    const vals = [f.cash, f.gold, f.silver, f.business, f.owed, f.other, f.debts].map(num);
    if (vals.some((x) => isNaN(x) || x < 0 || x > 1e12)) return setError(tr("সব ঘরে সঠিক (ঋণাত্মক নয়) সংখ্যা লিখুন", "Enter valid, non-negative numbers in every box"));
    setCopied(false);
    setResult(computeZakat(vals.slice(0, 6), vals[6], p, basis));
  };
  const reset = () => {
    setF({ cash: "", gold: "", silver: "", business: "", owed: "", other: "", debts: "" });
    setPrice(""); setResult(null); setError(""); setHawl(true);
    setGW(EMPTY_W); setSW(EMPTY_W); setGP(""); setSP(""); setCopied(false);
  };

  const tab = (a: boolean) => `flex-1 py-2.5 rounded-xl border text-sm ${a ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;
  const field = (k: keyof typeof f, bn: string, en: string) => (
    <div key={k}>
      <label className="text-sm font-medium dark:text-slate-200">{tr(bn, en)}</label>
      <input type="number" inputMode="decimal" value={f[k]} onChange={set(k)} placeholder="0" className={input} />
    </div>
  );

  // Helper values. If the helper price is blank but it matches the nisab basis, reuse the nisab price.
  const gPriceEff = gP !== "" ? gP : basis === "gold" ? price : "";
  const sPriceEff = sP !== "" ? sP : basis === "silver" ? price : "";
  const gValue = weightInVori(gW) * (parseFloat(gPriceEff) || 0);
  const sValue = weightInVori(sW) * (parseFloat(sPriceEff) || 0);
  const gGram = weightInVori(gW) * GRAM_PER_VORI;
  const sGram = weightInVori(sW) * GRAM_PER_VORI;
  const fill = (k: "gold" | "silver", v: number) => { setF({ ...f, [k]: String(Math.round(v)) }); setResult(null); };

  const weightRow = (w: Weight, setW: (w: Weight) => void) => (
    <div className="grid grid-cols-3 gap-2">
      {([["vori", "ভরি", "Vori"], ["ana", "আনা", "Ana"], ["roti", "রতি", "Roti"]] as const).map(([k, bn, en]) => (
        <div key={k}>
          <label className="text-xs text-slate-500">{tr(bn, en)}</label>
          <input type="number" inputMode="decimal" value={w[k]} onChange={(e) => setW({ ...w, [k]: e.target.value })} placeholder="0" className={small} />
        </div>
      ))}
    </div>
  );

  const payable = !!result && result.due && hawl;
  const summary = result
    ? tr(
        `যাকাত হিসাব: মোট সম্পদ ${money(result.assets)}, ঋণ ${money(result.debts)}, নিট সম্পদ ${money(result.net)}, নিসাব ${money(result.nisab)}। ${payable ? `যাকাত (২.৫%) = ${money(result.zakat)} টাকা` : "এই হিসাবে যাকাত ফরজ হয় না।"} (bdtoolsflow.cyou)`,
        `Zakat: total wealth ${money(result.assets)}, debts ${money(result.debts)}, net ${money(result.net)}, nisab ${money(result.nisab)}. ${payable ? `Zakat (2.5%) = ${money(result.zakat)} taka` : "Zakat is not due on this calculation."} (bdtoolsflow.cyou)`
      )
    : "";
  const copy = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied(true); } catch { setCopied(false); }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-4 text-sm dark:text-slate-200 space-y-1">
        <p className="font-medium">{tr("নিসাব এক নজরে", "Nisab at a glance")}</p>
        <p>{tr("সোনা: ৭.৫ ভরি = ৮৭.৪৮ গ্রাম", "Gold: 7.5 vori = 87.48 g")}</p>
        <p>{tr("রুপা: ৫২.৫ ভরি = ৬১২.৩৬ গ্রাম", "Silver: 52.5 vori = 612.36 g")}</p>
        <p>{tr("যাকাতের হার: ২.৫%। ১ ভরি = ১১.৬৬৪ গ্রাম = ১৬ আনা = ৯৬ রতি।", "Zakat rate: 2.5%. 1 vori = 11.664 g = 16 ana = 96 roti.")}</p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium dark:text-slate-200">{tr("নিসাব কীসের ভিত্তিতে ধরবেন", "Nisab based on")}</p>
        <div className="flex gap-2">
          <button onClick={() => { setBasis("silver"); setResult(null); }} className={tab(basis === "silver")}>{tr("রুপা (৫২.৫ ভরি)", "Silver (52.5 vori)")}</button>
          <button onClick={() => { setBasis("gold"); setResult(null); }} className={tab(basis === "gold")}>{tr("সোনা (৭.৫ ভরি)", "Gold (7.5 vori)")}</button>
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{basis === "silver" ? tr("আজকের রুপার দাম, প্রতি ভরি (টাকা)", "Today's silver price per vori (taka)") : tr("আজকের সোনার দাম, প্রতি ভরি (টাকা)", "Today's gold price per vori (taka)")}</label>
          <input type="number" inputMode="decimal" value={price} onChange={(e) => { setPrice(e.target.value); setResult(null); }} className={input} />
          <p className="text-xs text-slate-500 mt-1">{tr("দাম রোজ বদলায়, তাই বাজুসের আজকের দাম দেখে নিজে লিখুন।", "Prices change daily, so type today's BAJUS price yourself.")}</p>
        </div>
      </div>

      <details className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 group">
        <summary className="cursor-pointer list-none text-sm font-medium dark:text-slate-200">{tr("সোনা-রুপার ওজন থেকে মূল্য বের করুন (ঐচ্ছিক)", "Find value from gold or silver weight (optional)")}</summary>
        <div className="mt-4 space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-medium dark:text-slate-200">{tr("সোনা", "Gold")}</p>
            {weightRow(gW, setGW)}
            <div>
              <label className="text-xs text-slate-500">{tr("সোনার দাম, প্রতি ভরি (টাকা)", "Gold price per vori (taka)")}</label>
              <input type="number" inputMode="decimal" value={gP} onChange={(e) => setGP(e.target.value)} placeholder={basis === "gold" ? price : "0"} className={small} />
            </div>
            {gValue > 0 && (
              <div className="flex items-center justify-between gap-3 text-sm dark:text-slate-200">
                <span>{money(gGram)} {tr("গ্রাম", "g")} = {money(gValue)} {tr("টাকা", "taka")}</span>
                <button onClick={() => fill("gold", gValue)} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs">{tr("সোনার মূল্যে বসান", "Use as gold value")}</button>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium dark:text-slate-200">{tr("রুপা", "Silver")}</p>
            {weightRow(sW, setSW)}
            <div>
              <label className="text-xs text-slate-500">{tr("রুপার দাম, প্রতি ভরি (টাকা)", "Silver price per vori (taka)")}</label>
              <input type="number" inputMode="decimal" value={sP} onChange={(e) => setSP(e.target.value)} placeholder={basis === "silver" ? price : "0"} className={small} />
            </div>
            {sValue > 0 && (
              <div className="flex items-center justify-between gap-3 text-sm dark:text-slate-200">
                <span>{money(sGram)} {tr("গ্রাম", "g")} = {money(sValue)} {tr("টাকা", "taka")}</span>
                <button onClick={() => fill("silver", sValue)} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs">{tr("রুপার মূল্যে বসান", "Use as silver value")}</button>
              </div>
            )}
          </div>
        </div>
      </details>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {field("cash", "নগদ টাকা ও ব্যাংকে জমা (টাকা)", "Cash and bank savings (taka)")}
        {field("gold", "সোনার বাজার মূল্য (টাকা)", "Market value of gold (taka)")}
        {field("silver", "রুপার বাজার মূল্য (টাকা)", "Market value of silver (taka)")}
        {field("business", "ব্যবসার পণ্য ও মজুত (টাকা)", "Business goods and stock (taka)")}
        {field("owed", "অন্যের কাছে পাওনা, ফেরত পাওয়ার মতো (টাকা)", "Money owed to you, likely to be repaid (taka)")}
        {field("other", "অন্যান্য সঞ্চয় ও বিনিয়োগ (টাকা)", "Other savings and investments (taka)")}
        <div className="sm:col-span-2">{field("debts", "বাদ দেওয়ার ঋণ বা দেনা (টাকা)", "Debts to subtract (taka)")}</div>
      </div>

      <label className="flex items-start gap-3 text-sm dark:text-slate-200 cursor-pointer">
        <input type="checkbox" checked={hawl} onChange={(e) => { setHawl(e.target.checked); }} className="mt-1 w-4 h-4 accent-indigo-600" />
        <span>{tr("এই সম্পদ এক চান্দ্র বছর ধরে আমার কাছে আছে", "I have held this wealth for one full lunar year")}</span>
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex gap-3">
        <button onClick={calculate} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">{tr("যাকাত হিসাব করুন", "Calculate Zakat")}</button>
        <button onClick={reset} aria-label="Reset" className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"><RotateCcw className="w-4 h-4" /></button>
      </div>

      {result && (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 p-5 space-y-2">
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("মোট সম্পদ", "Total wealth")}</span><span className="font-semibold">{money(result.assets)}</span></div>
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("ঋণ বাদ", "Debts")}</span><span className="font-semibold">- {money(result.debts)}</span></div>
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("নিট সম্পদ", "Net wealth")}</span><span className="font-semibold">{money(result.net)}</span></div>
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("নিসাব", "Nisab")}</span><span className="font-semibold">{money(result.nisab)}</span></div>
          <div className="h-px bg-indigo-200 dark:bg-indigo-900" />
          {payable ? (
            <div className="flex justify-between font-bold text-lg dark:text-white"><span>{tr("যাকাত (২.৫%)", "Zakat (2.5%)")}</span><span className="text-indigo-600">{money(result.zakat)} {tr("টাকা", "taka")}</span></div>
          ) : result.due ? (
            <p className="text-center text-sm font-medium text-amber-600">{tr("নিট সম্পদ নিসাব পর্যন্ত পৌঁছেছে, কিন্তু এক চান্দ্র বছর পূর্ণ না হলে সাধারণভাবে যাকাত ফরজ হয় না।", "Net wealth has reached the nisab, but zakat is generally not due until one lunar year has passed.")}</p>
          ) : (
            <p className="text-center text-sm font-medium text-amber-600">{tr("নিট সম্পদ নিসাবের কম, তাই এই হিসাবে যাকাত ফরজ হয় না।", "Net wealth is below the nisab, so zakat is not due on this calculation.")}</p>
          )}
          <button onClick={copy} className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-900 text-sm text-indigo-700 dark:text-indigo-300">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied ? tr("কপি হয়েছে", "Copied") : tr("হিসাব কপি করুন", "Copy result")}
          </button>
        </div>
      )}

      <div className="text-xs text-slate-500 space-y-1">
        <p>{tr("সাধারণ নিয়ম: নিট সম্পদ নিসাব পরিমাণ হলে এবং এক চান্দ্র বছর আপনার কাছে থাকলে ২.৫% যাকাত দিতে হয়। ১ ভরি = ১১.৬৬৪ গ্রাম ধরা হয়েছে।", "General rule: if your net wealth reaches the nisab and you have held it for one lunar year, 2.5% is due. 1 vori is taken as 11.664 grams.")}</p>
        <p>{tr("রুপা না সোনা দিয়ে নিসাব ধরবেন, তা নিয়ে আলিমদের মত আছে। এই টুল একটি সাধারণ হিসাব, ফতোয়া নয়। নিশ্চিত হতে আপনার স্থানীয় আলিম বা ইসলামী প্রতিষ্ঠানের সঙ্গে কথা বলুন।", "Scholars differ on whether to use silver or gold for the nisab. This tool gives a general calculation, not a religious ruling. To be sure, ask your local scholar or an Islamic institution.")}</p>
      </div>
    </div>
  );
}
