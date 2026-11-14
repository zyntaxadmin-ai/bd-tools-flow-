"use client";
import { useState } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";
import { parseNumber, toWords, readDigits, groupLakh, groupIntl, toBnDigits, applyCase, type CaseMode, type System } from "@/lib/numWords";

// Kept so anything that imported these from this file keeps working.
export { bnWords, enWords, convert } from "@/lib/numWords";

type Tab = "single" | "bulk" | "digits";
const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const tabCls = (a: boolean) => `flex-1 py-2.5 rounded-xl border text-sm ${a ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;
const chip = (a: boolean) => `px-3.5 py-2 rounded-full border text-sm ${a ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;
const MAX_BULK = 100;

export default function NumberToWords() {
  const tr = useTr();
  const [tab, setTab] = useState<Tab>("single");
  const [taka, setTaka] = useState(true);
  const [cs, setCs] = useState<CaseMode>("title");
  const [value, setValue] = useState("");
  const [bulk, setBulk] = useState("");
  const [digits, setDigits] = useState("");
  const [copied, setCopied] = useState("");

  const maxFrac = taka ? 2 : 10;
  const copy = async (text: string, key: string) => {
    try { await navigator.clipboard.writeText(text); setCopied(key); setTimeout(() => setCopied(""), 1500); } catch { /* clipboard not available */ }
  };
  const en = (s: string) => applyCase(s, cs);

  const parsed = value.trim() === "" ? null : parseNumber(value, maxFrac);
  const invalid = value.trim() !== "" && !parsed;

  const bulkLines = bulk.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const bulkUsed = bulkLines.slice(0, MAX_BULK);
  const bulkRows = bulkUsed.map((l) => {
    const p = parseNumber(l, maxFrac);
    return { raw: l, bn: p ? toWords(p, "bn", taka) : "", en: p ? en(toWords(p, "enLakh", taka)) : "", ok: !!p };
  });
  const bulkText = bulkRows.map((r) => (r.ok ? `${r.raw}\n${r.bn}\n${r.en}` : `${r.raw}\n${tr("সঠিক সংখ্যা নয়", "Not a valid number")}`)).join("\n\n");

  const dBn = digits.trim() ? readDigits(digits, "bn") : null;
  const dEn = digits.trim() ? readDigits(digits, "en") : null;
  const dInvalid = digits.trim() !== "" && !dBn;

  const Box = ({ label, text, k }: { label: string; text: string; k: string }) => (
    <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        <button onClick={() => copy(text, k)} className="text-xs flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
          {copied === k ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}{copied === k ? tr("কপি হয়েছে", "Copied") : tr("কপি", "Copy")}
        </button>
      </div>
      <p className="text-lg font-semibold dark:text-white break-words">{text}</p>
    </div>
  );

  const options = (
    <div className="space-y-3">
      {tab !== "digits" && (
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setTaka(true)} className={chip(taka)}>{tr("টাকা (চেক/লেনদেন)", "Taka (cheque/payment)")}</button>
          <button onClick={() => setTaka(false)} className={chip(!taka)}>{tr("সাধারণ সংখ্যা", "Plain number")}</button>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500">{tr("ইংরেজি:", "English:")}</span>
        {([["title", "Title Case"], ["upper", "UPPERCASE"], ["lower", "lowercase"]] as const).map(([k, l]) => <button key={k} onClick={() => setCs(k)} className={chip(cs === k)}>{l}</button>)}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setTab("single")} className={tabCls(tab === "single")}>{tr("একটি সংখ্যা", "One number")}</button>
        <button onClick={() => setTab("bulk")} className={tabCls(tab === "bulk")}>{tr("অনেক সংখ্যা", "Many numbers")}</button>
        <button onClick={() => setTab("digits")} className={tabCls(tab === "digits")}>{tr("ফোন নম্বর", "Digits")}</button>
      </div>
      {options}

      {tab === "single" && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium dark:text-slate-200">{taka ? tr("টাকার পরিমাণ (সংখ্যায়)", "Amount in taka (numbers)") : tr("সংখ্যা", "Number")}</label>
            <input type="text" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. 12,34,567.50" className={input} />
            <p className="text-xs text-slate-500 mt-1">{taka ? tr("কমা, বাংলা অঙ্ক ও পয়সা (দশমিকের পর ২ ঘর) চলবে। সর্বোচ্চ ১৪ অঙ্ক।", "Commas, Bangla digits and paisa (2 decimal places) are accepted. Up to 14 digits.") : tr("কমা ও বাংলা অঙ্ক চলবে। সর্বোচ্চ ১৪ অঙ্ক, দশমিকের পর ১০ ঘর পর্যন্ত (অঙ্ক ধরে ধরে পড়া হয়)।", "Commas and Bangla digits are accepted. Up to 14 digits and 10 decimal places (decimals are read digit by digit).")}</p>
          </div>
          {invalid && <p className="text-sm text-red-500">{taka ? tr("সঠিক সংখ্যা লিখুন (শুধু অঙ্ক, দশমিকের পর সর্বোচ্চ ২ ঘর)", "Enter a valid number (digits only, at most 2 decimal places)") : tr("সঠিক সংখ্যা লিখুন (শুধু অঙ্ক, সর্বোচ্চ ১৪ অঙ্ক)", "Enter a valid number (digits only, up to 14 digits)")}</p>}
          {parsed && (
            <div className="space-y-3">
              <Box label={tr("বাংলায়", "In Bangla")} text={toWords(parsed, "bn", taka)} k="bn" />
              <Box label={tr("ইংরেজিতে (লাখ-কোটি পদ্ধতি)", "In English (lakh-crore system)")} text={en(toWords(parsed, "enLakh", taka))} k="en" />
              <Box label={tr("ইংরেজিতে (মিলিয়ন-বিলিয়ন পদ্ধতি)", "In English (million-billion system)")} text={en(toWords(parsed, "enIntl", taka))} k="intl" />
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-4 text-sm dark:text-slate-200 space-y-1">
                <p>{tr("বাংলা অঙ্কে", "Bangla digits")}: <span className="font-semibold">{toBnDigits(groupLakh(parsed.whole) + (parsed.frac ? "." + parsed.frac : ""))}</span></p>
                <p>{tr("লাখ-কোটি কমা", "Lakh-crore commas")}: <span className="font-semibold">{groupLakh(parsed.whole) + (parsed.frac ? "." + parsed.frac : "")}</span></p>
                <p>{tr("আন্তর্জাতিক কমা", "International commas")}: <span className="font-semibold">{groupIntl(parsed.whole) + (parsed.frac ? "." + parsed.frac : "")}</span></p>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "bulk" && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium dark:text-slate-200">{tr(`প্রতি লাইনে একটি সংখ্যা (সর্বোচ্চ ${MAX_BULK}টি)`, `One number per line (up to ${MAX_BULK})`)}</label>
            <textarea value={bulk} onChange={(e) => setBulk(e.target.value)} rows={6} placeholder={"1500\n25,000\n12,34,567.50"} className={`${input} resize-none`} />
          </div>
          {bulkLines.length > MAX_BULK && <p className="text-sm text-amber-700 dark:text-amber-400">{tr(`শুধু প্রথম ${MAX_BULK}টি লাইন নেওয়া হয়েছে।`, `Only the first ${MAX_BULK} lines were used.`)}</p>}
          {bulkRows.length > 0 && (
            <div className="space-y-3">
              {bulkRows.map((r, i) => (
                <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-sm dark:text-slate-200">
                  <p className="font-semibold">{r.raw}</p>
                  {r.ok ? (<><p className="mt-1">{r.bn}</p><p className="text-slate-500 dark:text-slate-400">{r.en}</p></>) : <p className="mt-1 text-red-500">{tr("সঠিক সংখ্যা নয়", "Not a valid number")}</p>}
                </div>
              ))}
              <button onClick={() => copy(bulkText, "bulk")} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-900 text-sm text-indigo-700 dark:text-indigo-300">
                {copied === "bulk" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied === "bulk" ? tr("কপি হয়েছে", "Copied") : tr("সব কপি করুন", "Copy all")}
              </button>
            </div>
          )}
        </div>
      )}

      {tab === "digits" && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium dark:text-slate-200">{tr("ফোন নম্বর বা অঙ্কের সারি", "Phone number or digit string")}</label>
            <input type="text" inputMode="tel" value={digits} onChange={(e) => setDigits(e.target.value)} placeholder="+8801712345678" className={input} />
            <p className="text-xs text-slate-500 mt-1">{tr("প্রতিটি অঙ্ক আলাদা করে পড়া হয় (শূন্য এক সাত...)। শুরুর + থাকলে 'প্লাস' লেখা হয়। সর্বোচ্চ ৩০ অঙ্ক।", "Each digit is read separately (Zero One Seven...). A leading + is written as 'Plus'. Up to 30 digits.")}</p>
          </div>
          {dInvalid && <p className="text-sm text-red-500">{tr("শুধু অঙ্ক, স্পেস, হাইফেন বা শুরুতে + লিখুন", "Use only digits, spaces, hyphens or a leading +")}</p>}
          {dBn && dEn && (
            <div className="space-y-3">
              <Box label={tr("বাংলায়", "In Bangla")} text={dBn} k="dbn" />
              <Box label={tr("ইংরেজিতে", "In English")} text={en(dEn)} k="den" />
            </div>
          )}
        </div>
      )}

      {(value || bulk || digits) && <button onClick={() => { setValue(""); setBulk(""); setDigits(""); }} className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm dark:text-white flex items-center gap-2"><RotateCcw className="w-4 h-4" />{tr("মুছুন", "Clear")}</button>}
      <p className="text-xs text-slate-500">{tr("চেক বা গুরুত্বপূর্ণ কাগজে লেখার আগে বানান একবার মিলিয়ে নিন।", "Check the spelling once before you write it on a cheque or an important document.")}</p>
    </div>
  );
}
