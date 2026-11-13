"use client";
import { useState } from "react";
import { RotateCcw, Copy, Check } from "lucide-react";
import { useTr } from "@/lib/lang";
import { GRAM_PER_VORI, toGrams, fromGrams, computeJewellery, computeSell, type MakingMode, type VatOn } from "@/lib/goldCalc";

// Re-exported so anything that imported these from this file keeps working.
export { GRAM_PER_VORI, toGrams, fromGrams };
export { ROTI_PER_ANA, ANA_PER_VORI } from "@/lib/goldCalc";

type Mode = "price" | "sell" | "convert";
type WUnit = "vari" | "gram";
const CARATS = ["22K", "21K", "18K", "sonaton"] as const;
type Carat = (typeof CARATS)[number];

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const small = "w-full mt-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm";
const num = (n: number, d = 3) => n.toLocaleString("en-US", { maximumFractionDigits: d });
const money = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
const val = (s: string) => (s === "" ? 0 : parseFloat(s));

export default function GoldWeightConverter() {
  const tr = useTr();
  const [mode, setMode] = useState<Mode>("price");

  // shared state for the price and sell tabs
  const [carat, setCarat] = useState<Carat>("22K");
  const [prices, setPrices] = useState<Record<Carat, string>>({ "22K": "", "21K": "", "18K": "", sonaton: "" });
  const [wUnit, setWUnit] = useState<WUnit>("vari");
  const [vori, setVori] = useState(""); const [ana, setAna] = useState(""); const [roti, setRoti] = useState("");
  const [gramIn, setGramIn] = useState("");
  // price tab
  const [wastage, setWastage] = useState("");
  const [makingMode, setMakingMode] = useState<MakingMode>("percent");
  const [making, setMaking] = useState("");
  const [vat, setVat] = useState("");
  const [vatOn, setVatOn] = useState<VatOn>("making");
  // sell tab
  const [cut, setCut] = useState("");
  const [copied, setCopied] = useState(false);

  // convert tab
  const [cVori, setCVori] = useState(""); const [cAna, setCAna] = useState(""); const [cRoti, setCRoti] = useState("");
  const [cGrams, setCGrams] = useState("");

  const caratLabel = (c: Carat) => (c === "sonaton" ? tr("সনাতন", "Sonaton") : tr(c.replace("K", " ক্যারেট").replace("22", "২২").replace("21", "২১").replace("18", "১৮"), c));
  const price = prices[carat];
  const p = parseFloat(price);
  const priceOk = price !== "" && !isNaN(p) && p > 0;

  // weight in grams from the shared weight boxes
  const anyVari = vori !== "" || ana !== "" || roti !== "";
  const badVari = wUnit === "vari" && anyVari && (val(vori) < 0 || val(ana) < 0 || val(roti) < 0 || val(ana) >= 100 || val(roti) >= 100 || val(vori) > 100000 || isNaN(val(vori)) || isNaN(val(ana)) || isNaN(val(roti)));
  const gIn = parseFloat(gramIn);
  const badGram = wUnit === "gram" && gramIn !== "" && (isNaN(gIn) || gIn < 0 || gIn > 1000000);
  const grams = wUnit === "vari" ? (anyVari && !badVari ? toGrams(val(vori), val(ana), val(roti)) : NaN) : gramIn !== "" && !badGram ? gIn : NaN;
  const hasWeight = !isNaN(grams) && grams > 0;

  const numOk = (s: string, max: number) => s === "" || (!isNaN(parseFloat(s)) && parseFloat(s) >= 0 && parseFloat(s) <= max);
  const extrasOk = numOk(wastage, 100) && numOk(making, makingMode === "percent" ? 100 : 10000000) && numOk(vat, 100);
  const cutOk = numOk(cut, 100);

  const jew = hasWeight && priceOk && extrasOk ? computeJewellery({ grams, pricePerVori: p, wastagePct: val(wastage), makingMode, makingValue: val(making), vatPct: val(vat), vatOn }) : null;
  const sell = hasWeight && priceOk && cutOk ? computeSell(grams, p, val(cut)) : null;

  const split = !isNaN(grams) && grams > 0 ? fromGrams(grams) : null;

  const setP = (v: string) => { setPrices({ ...prices, [carat]: v }); setCopied(false); };

  const summary = mode === "price" && jew
    ? tr(
        `সোনার দাম (${caratLabel(carat)}, ${num(jew.grams, 3)} গ্রাম): সোনার মূল্য ${money(jew.goldValue)}, ক্ষয় ${money(jew.wastage)}, মজুরি ${money(jew.making)}, ভ্যাট ${money(jew.vat)}, মোট ${money(jew.total)} টাকা (bdtoolsflow.cyou)`,
        `Gold price (${carat}, ${num(jew.grams, 3)} g): gold ${money(jew.goldValue)}, wastage ${money(jew.wastage)}, making ${money(jew.making)}, VAT ${money(jew.vat)}, total ${money(jew.total)} taka (bdtoolsflow.cyou)`
      )
    : mode === "sell" && sell
    ? tr(
        `পুরোনো সোনা বিক্রি (${caratLabel(carat)}, ${num(sell.grams, 3)} গ্রাম): সোনার মূল্য ${money(sell.goldValue)}, কর্তন ${money(sell.cut)}, আনুমানিক পাবেন ${money(sell.receive)} টাকা (bdtoolsflow.cyou)`,
        `Selling old gold (${carat}, ${num(sell.grams, 3)} g): value ${money(sell.goldValue)}, deduction ${money(sell.cut)}, you get about ${money(sell.receive)} taka (bdtoolsflow.cyou)`
      )
    : "";
  const copy = async () => { try { await navigator.clipboard.writeText(summary); setCopied(true); } catch { setCopied(false); } };

  const reset = () => {
    setPrices({ "22K": "", "21K": "", "18K": "", sonaton: "" }); setVori(""); setAna(""); setRoti(""); setGramIn("");
    setWastage(""); setMaking(""); setVat(""); setCut(""); setCopied(false);
    setCVori(""); setCAna(""); setCRoti(""); setCGrams("");
  };

  // convert tab values
  const cAny = cVori !== "" || cAna !== "" || cRoti !== "";
  const cBad = cAny && (val(cVori) < 0 || val(cAna) < 0 || val(cRoti) < 0 || val(cAna) >= 100 || val(cRoti) >= 100 || val(cVori) > 100000);
  const cg1 = cAny && !cBad ? toGrams(val(cVori), val(cAna), val(cRoti)) : NaN;
  const cg = parseFloat(cGrams);
  const cBadG = cGrams !== "" && (isNaN(cg) || cg < 0 || cg > 1000000);
  const cSplit = cGrams !== "" && !cBadG ? fromGrams(cg) : null;

  const tab = (a: boolean) => `flex-1 py-2.5 rounded-xl border text-sm ${a ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;
  const chip = (a: boolean) => `px-3.5 py-2 rounded-full border text-sm ${a ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;
  const row = (l: string, v: string, bold = false) => (
    <div className={`flex justify-between text-sm dark:text-white ${bold ? "font-bold text-lg" : ""}`}><span>{l}</span><span className={bold ? "text-indigo-600" : "font-semibold"}>{v}</span></div>
  );

  // carat + price + weight inputs, shared by the price and sell tabs
  const common = (
    <>
      <div className="space-y-2">
        <p className="text-sm font-medium dark:text-slate-200">{tr("সোনার ক্যারেট", "Gold carat")}</p>
        <div className="flex flex-wrap gap-2">{CARATS.map((c) => <button key={c} onClick={() => setCarat(c)} className={chip(carat === c)}>{caratLabel(c)}</button>)}</div>
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">{tr(`${caratLabel(carat)} সোনার আজকের দাম, প্রতি ভরি (টাকা)`, `Today's ${caratLabel(carat)} gold price per vori (taka)`)}</label>
        <input type="number" inputMode="decimal" value={price} onChange={(e) => setP(e.target.value)} placeholder={tr("বাজুসের দাম দেখে লিখুন", "Type the BAJUS price")} className={input} />
        <p className="text-xs text-slate-500 mt-1">{tr("দাম রোজ বদলায় ও ক্যারেট অনুযায়ী আলাদা। প্রতিটি ক্যারেটের দাম আলাদা করে মনে থাকে।", "Prices change daily and differ by carat. Each carat keeps its own price.")}</p>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium dark:text-slate-200">{tr("সোনার ওজন", "Gold weight")}</p>
        <div className="flex gap-2">
          <button onClick={() => setWUnit("vari")} className={tab(wUnit === "vari")}>{tr("ভরি-আনা-রতি", "Vori-ana-roti")}</button>
          <button onClick={() => setWUnit("gram")} className={tab(wUnit === "gram")}>{tr("গ্রাম", "Grams")}</button>
        </div>
        {wUnit === "vari" ? (
          <div className="grid grid-cols-3 gap-2">
            {([["ভরি", "Vori", vori, setVori], ["আনা", "Ana", ana, setAna], ["রতি", "Roti", roti, setRoti]] as const).map(([bn, en, v, set]) => (
              <div key={en}><label className="text-xs text-slate-500">{tr(bn, en)}</label><input type="number" inputMode="decimal" value={v} onChange={(e) => { set(e.target.value); setCopied(false); }} placeholder="0" className={small} /></div>
            ))}
          </div>
        ) : (
          <input type="number" inputMode="decimal" value={gramIn} onChange={(e) => { setGramIn(e.target.value); setCopied(false); }} placeholder={tr("ওজন (গ্রাম)", "Weight (grams)")} className={input} />
        )}
        {(badVari || badGram) && <p className="text-sm text-red-500">{tr("সঠিক ওজন লিখুন (আনা ও রতি ১০০ এর কম, ঋণাত্মক নয়)", "Enter a valid weight (ana and roti below 100, not negative)")}</p>}
        {hasWeight && split && <p className="text-xs text-slate-500">{wUnit === "vari" ? `= ${num(grams, 4)} ${tr("গ্রাম", "g")}` : `= ${split.vori} ${tr("ভরি", "vori")} ${split.ana} ${tr("আনা", "ana")} ${num(split.roti, 2)} ${tr("রতি", "roti")}`}</p>}
      </div>
    </>
  );

  const copyBtn = (
    <button onClick={copy} className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-900 text-sm text-indigo-700 dark:text-indigo-300">
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied ? tr("কপি হয়েছে", "Copied") : tr("হিসাব কপি করুন", "Copy result")}
    </button>
  );

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <button onClick={() => setMode("price")} className={tab(mode === "price")}>{tr("দাম হিসাব", "Price")}</button>
        <button onClick={() => setMode("sell")} className={tab(mode === "sell")}>{tr("বিক্রি", "Sell")}</button>
        <button onClick={() => setMode("convert")} className={tab(mode === "convert")}>{tr("ভরি-গ্রাম", "Convert")}</button>
      </div>

      {mode === "price" && (
        <div className="space-y-5">
          {common}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-4">
            <p className="text-sm font-medium dark:text-slate-200">{tr("গয়নার খরচ (জুয়েলার্স যা ধরে, তা লিখুন)", "Jewellery charges (enter what your jeweller charges)")}</p>
            <div>
              <label className="text-xs text-slate-500">{tr("ক্ষয় বা অপচয় (%)", "Wastage (%)")}</label>
              <input type="number" inputMode="decimal" value={wastage} onChange={(e) => { setWastage(e.target.value); setCopied(false); }} placeholder="0" className={small} />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-500">{tr("মজুরি বা মেকিং চার্জ", "Making charge")}</label>
              <div className="flex gap-2">
                <button onClick={() => setMakingMode("percent")} className={chip(makingMode === "percent")}>{tr("সোনার দামের %", "% of gold value")}</button>
                <button onClick={() => setMakingMode("perVori")} className={chip(makingMode === "perVori")}>{tr("টাকা প্রতি ভরি", "Taka per vori")}</button>
              </div>
              <input type="number" inputMode="decimal" value={making} onChange={(e) => { setMaking(e.target.value); setCopied(false); }} placeholder="0" className={small} />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-500">{tr("ভ্যাট (%)", "VAT (%)")}</label>
              <input type="number" inputMode="decimal" value={vat} onChange={(e) => { setVat(e.target.value); setCopied(false); }} placeholder="0" className={small} />
              <div className="flex gap-2">
                <button onClick={() => setVatOn("making")} className={chip(vatOn === "making")}>{tr("শুধু মজুরির ওপর", "On making charge")}</button>
                <button onClick={() => setVatOn("total")} className={chip(vatOn === "total")}>{tr("মোট দামের ওপর", "On the total")}</button>
              </div>
            </div>
            <p className="text-xs text-slate-500">{tr("মজুরি, ক্ষয় ও ভ্যাটের নিয়ম জুয়েলার্সভেদে আলাদা, তাই ঘরগুলো খালি (০) রাখা হয়েছে। নিজের জুয়েলার্সের হিসাব বসান।", "Making, wastage and VAT rules differ between jewellers, so these boxes start empty (0). Enter your jeweller's figures.")}</p>
          </div>
          {!extrasOk && <p className="text-sm text-red-500">{tr("খরচের ঘরে সঠিক সংখ্যা লিখুন (শতাংশ ১০০ এর বেশি নয়)", "Enter valid numbers in the charge boxes (percent not above 100)")}</p>}
          {jew && (
            <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 p-5 space-y-2">
              {row(tr("ওজন", "Weight"), `${num(jew.grams, 3)} ${tr("গ্রাম", "g")}`)}
              {row(tr("সোনার মূল্য", "Gold value"), `${money(jew.goldValue)}`)}
              {row(tr("ক্ষয়", "Wastage"), `+ ${money(jew.wastage)}`)}
              {row(tr("মজুরি", "Making charge"), `+ ${money(jew.making)}`)}
              {row(tr("ভ্যাট", "VAT"), `+ ${money(jew.vat)}`)}
              <div className="h-px bg-indigo-200 dark:bg-indigo-900" />
              {row(tr("মোট দাম", "Total price"), `${money(jew.total)} ${tr("টাকা", "taka")}`, true)}
              {copyBtn}
            </div>
          )}
          {!jew && <p className="text-sm text-slate-500">{tr("দাম ও ওজন লিখলে মোট দাম এখানে দেখাবে।", "Enter the price and weight to see the total here.")}</p>}
        </div>
      )}

      {mode === "sell" && (
        <div className="space-y-5">
          {common}
          <div>
            <label className="text-sm font-medium dark:text-slate-200">{tr("জুয়েলার্সের কর্তন (%)", "Jeweller's deduction (%)")}</label>
            <input type="number" inputMode="decimal" value={cut} onChange={(e) => { setCut(e.target.value); setCopied(false); }} placeholder="0" className={input} />
            <p className="text-xs text-slate-500 mt-1">{tr("পুরোনো গয়না বিক্রি বা বদলে জুয়েলার্স সাধারণত ক্ষয় ও মজুরি বাবদ কিছু কাটে। কত কাটবে তা জুয়েলার্সকে জিজ্ঞেস করে লিখুন, এটি শুধু আনুমানিক হিসাব।", "When you sell or exchange old jewellery, the jeweller usually deducts something for wastage and making. Ask what they deduct and enter it. This is only an estimate.")}</p>
          </div>
          {!cutOk && <p className="text-sm text-red-500">{tr("কর্তন ০ থেকে ১০০ এর মধ্যে লিখুন", "Enter a deduction between 0 and 100")}</p>}
          {sell && (
            <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 p-5 space-y-2">
              {row(tr("ওজন", "Weight"), `${num(sell.grams, 3)} ${tr("গ্রাম", "g")}`)}
              {row(tr("সোনার মূল্য", "Gold value"), `${money(sell.goldValue)}`)}
              {row(tr("কর্তন", "Deduction"), `- ${money(sell.cut)}`)}
              <div className="h-px bg-indigo-200 dark:bg-indigo-900" />
              {row(tr("আনুমানিক পাবেন", "You get about"), `${money(sell.receive)} ${tr("টাকা", "taka")}`, true)}
              {copyBtn}
            </div>
          )}
          {!sell && <p className="text-sm text-slate-500">{tr("দাম ও ওজন লিখলে আনুমানিক বিক্রির টাকা দেখাবে।", "Enter the price and weight to see the estimated amount.")}</p>}
        </div>
      )}

      {mode === "convert" && (
        <div className="space-y-5">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
            <p className="font-medium dark:text-white">{tr("ভরি-আনা-রতি থেকে গ্রাম", "Vori-ana-roti to grams")}</p>
            <div className="grid grid-cols-3 gap-3">
              <div><label className="text-xs text-slate-500">{tr("ভরি", "Vori")}</label><input type="number" inputMode="decimal" value={cVori} onChange={(e) => setCVori(e.target.value)} className={input} /></div>
              <div><label className="text-xs text-slate-500">{tr("আনা", "Ana")}</label><input type="number" inputMode="decimal" value={cAna} onChange={(e) => setCAna(e.target.value)} className={input} /></div>
              <div><label className="text-xs text-slate-500">{tr("রতি", "Roti")}</label><input type="number" inputMode="decimal" value={cRoti} onChange={(e) => setCRoti(e.target.value)} className={input} /></div>
            </div>
            {cBad && <p className="text-sm text-red-500">{tr("সঠিক মান লিখুন (আনা ও রতি ১০০ এর কম, ঋণাত্মক নয়)", "Enter valid values (ana and roti below 100, not negative)")}</p>}
            {!isNaN(cg1) && <p className="text-lg font-semibold text-indigo-600">{num(cg1, 4)} {tr("গ্রাম", "grams")}</p>}
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
            <p className="font-medium dark:text-white">{tr("গ্রাম থেকে ভরি-আনা-রতি", "Grams to vori-ana-roti")}</p>
            <div>
              <label className="text-xs text-slate-500">{tr("ওজন (গ্রাম)", "Weight (grams)")}</label>
              <input type="number" inputMode="decimal" value={cGrams} onChange={(e) => setCGrams(e.target.value)} className={input} />
            </div>
            {cBadG && <p className="text-sm text-red-500">{tr("সঠিক ওজন লিখুন", "Enter a valid weight")}</p>}
            {cSplit && <p className="text-lg font-semibold text-indigo-600">{cSplit.vori} {tr("ভরি", "vori")} {cSplit.ana} {tr("আনা", "ana")} {num(cSplit.roti, 2)} {tr("রতি", "roti")}</p>}
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <p className="font-medium dark:text-white mb-3">{tr("ভরি-গ্রাম টেবিল", "Vori to gram table")}</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm dark:text-slate-200">
              {[["১ রতি", "1 roti", 1 / 96], ["১ আনা", "1 ana", 1 / 16], ["১ ভরি", "1 vori", 1], ["২ ভরি", "2 vori", 2], ["৩ ভরি", "3 vori", 3], ["৪ ভরি", "4 vori", 4], ["৫ ভরি", "5 vori", 5], ["১০ ভরি", "10 vori", 10]].map(([bn, en, v]) => (
                <div key={en as string} className="flex justify-between"><span>{tr(bn as string, en as string)}</span><span className="font-semibold">{num((v as number) * GRAM_PER_VORI, 4)} {tr("গ্রাম", "g")}</span></div>
              ))}
            </div>
          </div>
        </div>
      )}

      <button onClick={reset} className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm dark:text-white flex items-center gap-2"><RotateCcw className="w-4 h-4" />{tr("মুছুন", "Clear")}</button>
      <p className="text-xs text-slate-500">{tr("হিসাব: ১ ভরি = ১৬ আনা = ৯৬ রতি = ১১.৬৬৪ গ্রাম (১ আনা = ০.৭২৯ গ্রাম, ১ রতি = ০.১২১৫ গ্রাম)। এই টুলে সোনার লাইভ দাম নেই, আপনি নিজে লিখবেন। চূড়ান্ত দাম জুয়েলার্সের বিলে দেখে নিন।", "Used: 1 vori = 16 ana = 96 roti = 11.664 grams (1 ana = 0.729 g, 1 roti = 0.1215 g). This tool has no live gold price, so you type it yourself. Check the final price on your jeweller's bill.")}</p>
    </div>
  );
}
