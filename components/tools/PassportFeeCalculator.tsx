"use client";
import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { useTr } from "@/lib/lang";
import { siteConfig } from "@/lib/seo";

// NOTE: Fees change. Check https://www.epassport.gov.bd and edit this table.
// Source: published fee lists that quote the official portal's schedule "updated 12 July 2026". All amounts in BDT, 15% VAT included.
// Every total here is an exact multiple of 1.15, so the base fee below is total / 1.15 (for example 4,025 = 3,500 + 15% VAT).
const FEES_UPDATED = { bn: "১২ জুলাই ২০২৬", en: "12 July 2026" };
type Pages = 48 | 64;
type Validity = 5 | 10;
type Delivery = "regular" | "express" | "super";

const FEES: Record<Pages, Record<Validity, Record<Delivery, number>>> = {
  48: {
    5: { regular: 4025, express: 6325, super: 8625 },
    10: { regular: 5750, express: 8050, super: 10350 },
  },
  64: {
    5: { regular: 6325, express: 8625, super: 12075 },
    10: { regular: 8050, express: 10350, super: 13800 },
  },
};

// Working days are approximate and differ a little between published sources.
const DELIVERY: { id: Delivery; bn: string; en: string; daysBn: string; daysEn: string }[] = [
  { id: "regular", bn: "সাধারণ", en: "Regular", daysBn: "১৫–২১ কর্মদিবস", daysEn: "15–21 working days" },
  { id: "express", bn: "জরুরি", en: "Express", daysBn: "৭–১০ কর্মদিবস", daysEn: "7–10 working days" },
  { id: "super", bn: "অতি জরুরি", en: "Super Express", daysBn: "২ কর্মদিবস", daysEn: "2 working days" },
];

const ROWS: { pages: Pages; validity: Validity }[] = [
  { pages: 48, validity: 5 }, { pages: 48, validity: 10 }, { pages: 64, validity: 5 }, { pages: 64, validity: 10 },
];

const fmt = (n: number) => n.toLocaleString("en-IN");

export default function PassportFeeCalculator() {
  const tr = useTr();
  const [pages, setPages] = useState<Pages>(48);
  const [chosenValidity, setValidity] = useState<Validity>(5);
  const [delivery, setDelivery] = useState<Delivery>("regular");
  const [limitedAge, setLimitedAge] = useState(false); // under 18 or over 65: 5 years only
  const [shared, setShared] = useState(false);

  const validity: Validity = limitedAge ? 5 : chosenValidity;
  const fee = FEES[pages][validity][delivery];
  const base = Math.round(fee / 1.15);
  const vat = fee - base;
  const perYear = Math.round(fee / validity);
  const d = DELIVERY.find((x) => x.id === delivery)!;

  const chip = (active: boolean, disabled = false) =>
    `flex-1 py-2.5 px-2 rounded-xl border text-sm ${disabled ? "opacity-40 cursor-not-allowed " : ""}${active ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;
  const label = "text-sm font-medium dark:text-slate-200 mb-2";

  const share = async () => {
    const text = `${tr(`${pages} পৃষ্ঠা, ${validity} বছর, ${d.bn}`, `${pages} pages, ${validity} years, ${d.en}`)}: ${fmt(fee)} ${tr("টাকা (১৫% ভ্যাটসহ)", "taka (15% VAT included)")}\n${siteConfig.url}/tool/passport-fee-calculator-bd`;
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try { await navigator.share({ text }); return; } catch { /* cancelled: fall back to copy */ }
    }
    try { await navigator.clipboard.writeText(text); setShared(true); setTimeout(() => setShared(false), 1500); } catch { /* ignore */ }
  };

  return (
    <div className="space-y-5">
      <div>
        <p className={label}>{tr("আবেদনকারীর বয়স", "Applicant's age")}</p>
        <div className="flex gap-2">
          <button onClick={() => setLimitedAge(false)} aria-pressed={!limitedAge} className={chip(!limitedAge)}>{tr("১৮ থেকে ৬৫ বছর", "18 to 65 years")}</button>
          <button onClick={() => setLimitedAge(true)} aria-pressed={limitedAge} className={chip(limitedAge)}>{tr("১৮-র নিচে বা ৬৫-র বেশি", "Under 18 or over 65")}</button>
        </div>
        {limitedAge && <p className="text-xs text-slate-500 mt-2">{tr("এই বয়সে মেয়াদ ৫ বছরই প্রযোজ্য, তাই ১০ বছরের অপশন বন্ধ।", "Only the 5 year validity applies at this age, so the 10 year option is turned off.")}</p>}
      </div>

      <div>
        <p className={label}>{tr("পাসপোর্টের পৃষ্ঠা", "Booklet pages")}</p>
        <div className="flex gap-2">
          {([48, 64] as Pages[]).map((p) => <button key={p} onClick={() => setPages(p)} aria-pressed={pages === p} className={chip(pages === p)}>{tr(`${p} পৃষ্ঠা`, `${p} pages`)}</button>)}
        </div>
      </div>

      <div>
        <p className={label}>{tr("মেয়াদ", "Validity")}</p>
        <div className="flex gap-2">
          {([5, 10] as Validity[]).map((v) => {
            const off = limitedAge && v === 10;
            return <button key={v} disabled={off} onClick={() => setValidity(v)} aria-pressed={validity === v} className={chip(validity === v, off)}>{tr(`${v} বছর`, `${v} years`)}</button>;
          })}
        </div>
      </div>

      <div>
        <p className={label}>{tr("ডেলিভারির ধরন", "Delivery type")}</p>
        <div className="grid grid-cols-3 gap-2">
          {DELIVERY.map((x) => (
            <button key={x.id} onClick={() => setDelivery(x.id)} aria-pressed={delivery === x.id} className={`rounded-xl border p-2 text-center ${delivery === x.id ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>
              <span className="block text-sm font-medium">{tr(x.bn, x.en)}</span>
              <span className={`block text-[11px] mt-0.5 ${delivery === x.id ? "text-indigo-100" : "text-slate-500"}`}>{tr(x.daysBn, x.daysEn)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 p-5">
        <p className="text-sm text-center text-slate-600 dark:text-slate-400">{tr(`${pages} পৃষ্ঠা, ${validity} বছর, ${d.bn} ডেলিভারি`, `${pages} pages, ${validity} years, ${d.en} delivery`)}</p>
        <p className="text-3xl font-bold text-indigo-600 text-center mt-1">{fmt(fee)} {tr("টাকা", "taka")}</p>
        <p className="text-xs text-center text-slate-500">{tr("১৫% ভ্যাটসহ মোট ফি", "Total fee including 15% VAT")}</p>
        <div className="mt-4 text-sm dark:text-slate-200 divide-y divide-indigo-100 dark:divide-indigo-900">
          <div className="flex justify-between py-1.5"><span>{tr("সরকারি মূল ফি", "Government base fee")}</span><span>{fmt(base)} {tr("টাকা", "taka")}</span></div>
          <div className="flex justify-between py-1.5"><span>{tr("ভ্যাট (১৫%)", "VAT (15%)")}</span><span>{fmt(vat)} {tr("টাকা", "taka")}</span></div>
          <div className="flex justify-between py-1.5 font-semibold"><span>{tr("মোট জমা", "Total payable")}</span><span>{fmt(fee)} {tr("টাকা", "taka")}</span></div>
          <div className="flex justify-between py-1.5"><span>{tr("আনুমানিক সময়", "Estimated time")}</span><span>{tr(d.daysBn, d.daysEn)}</span></div>
          <div className="flex justify-between py-1.5"><span>{tr("বছরপ্রতি খরচ", "Cost per year")}</span><span>≈ {fmt(perYear)} {tr("টাকা", "taka")}</span></div>
        </div>
        <button onClick={share} className="mt-3 px-4 py-2.5 rounded-xl bg-indigo-600 text-white flex items-center gap-1.5 text-sm">
          {shared ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />} {shared ? tr("কপি হয়েছে", "Copied") : tr("শেয়ার", "Share")}
        </button>
      </div>

      {/* Full table */}
      <div>
        <p className={label}>{tr("সব ফি এক নজরে (১৫% ভ্যাটসহ)", "All fees at a glance (15% VAT included)")}</p>
        <p className="text-xs text-slate-500 mb-2">{tr("যেকোনো ঘরে চাপ দিলে ওপরের হিসাব সেটিতে বদলে যাবে।", "Tap any cell to load it into the calculator above.")}</p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm dark:text-white">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <th className="text-left px-3 py-2 font-medium">{tr("পাসপোর্ট", "Passport")}</th>
                {DELIVERY.map((x) => <th key={x.id} className="px-2 py-2 font-medium text-right">{tr(x.bn, x.en)}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {ROWS.map((r) => {
                const off = limitedAge && r.validity === 10;
                return (
                  <tr key={`${r.pages}-${r.validity}`} className={off ? "opacity-40" : ""}>
                    <td className="px-3 py-2 whitespace-nowrap">{tr(`${r.pages} পৃষ্ঠা, ${r.validity} বছর`, `${r.pages} pg, ${r.validity} yr`)}</td>
                    {DELIVERY.map((x) => {
                      const active = pages === r.pages && validity === r.validity && delivery === x.id;
                      return (
                        <td key={x.id} className="p-1 text-right">
                          <button disabled={off} onClick={() => { setPages(r.pages); setValidity(r.validity); setDelivery(x.id); }} aria-label={`${r.pages} ${r.validity} ${x.en}`} className={`w-full px-2 py-1.5 rounded-lg ${active ? "bg-indigo-600 text-white font-semibold" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`}>{fmt(FEES[r.pages][r.validity][x.id])}</button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Practical notes */}
      <div className="space-y-2">
        <details className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3">
          <summary className="cursor-pointer text-sm font-medium dark:text-slate-200">{tr("কোথায় ও কীভাবে ফি জমা দেবেন", "Where and how to pay the fee")}</summary>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{tr("অনলাইন আবেদনের ধাপে অফিসিয়াল ই-পাসপোর্ট পোর্টালের নির্দেশনা অনুযায়ী ফি জমা দিতে হয়, যেমন এ-চালান বা ব্যাংকের মাধ্যমে। কোনো দালাল বা অনানুষ্ঠানিক উৎসকে টাকা দেবেন না। ব্যাংকে চালান পূরণের সময় টাকার অঙ্ক কথায় লিখতে হলে আমাদের Number to Words টুল কাজে লাগবে।", "You pay the fee as the official e-passport portal instructs during the online application, for example through A-Challan or a bank. Do not pay any broker or unofficial source. If a bank challan needs the amount in words, our Number to Words tool can help.")}</p>
        </details>
        <details className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3">
          <summary className="cursor-pointer text-sm font-medium dark:text-slate-200">{tr("মেয়াদ ও বিশেষ ক্ষেত্রের নিয়ম", "Validity and special cases")}</summary>
          <ul className="text-sm text-slate-600 dark:text-slate-400 mt-2 space-y-2 list-disc pl-5">
            <li>{tr("১৮ থেকে ৬৫ বছর বয়সীরা ৫ বা ১০ বছর মেয়াদ নিতে পারেন। ১৮-র নিচে ও ৬৫-র বেশি বয়সীদের জন্য মেয়াদ ৫ বছর।", "People aged 18 to 65 can choose 5 or 10 years. For those under 18 or over 65 the validity is 5 years.")}</li>
            <li>{tr("সরকারি কর্মকর্তারা এনওসি বা অবসরের কাগজ দেখালে সাধারণ ফিতে জরুরি এবং জরুরি ফিতে অতি জরুরি ডেলিভারি পেতে পারেন বলে প্রকাশিত তথ্যে আছে। নিয়মটি পোর্টালে মিলিয়ে নিন।", "Published information says government employees with an NOC or retirement papers may get express delivery at the regular fee and super express at the express fee. Confirm the rule on the portal.")}</li>
            <li>{tr("শিশু, নবায়ন, বিদেশের দূতাবাস ও অন্যান্য বিশেষ ক্ষেত্রে ফি আলাদা হতে পারে। এই টুল সেগুলো ধরে না।", "Fees can differ for children, renewals, overseas missions and other special cases. This tool does not cover them.")}</li>
            <li>{tr("৬৪ পৃষ্ঠার অপশন এখন আছে কিনা এবং ডেলিভারির দিন আবেদনের সময় পোর্টালে দেখে নিন।", "Check on the portal whether the 64 page option is currently offered, and the delivery days, when you apply.")}</li>
          </ul>
        </details>
      </div>

      <div className="text-xs text-slate-500 space-y-1">
        <p>{tr(`এই ফি তালিকা ${FEES_UPDATED.bn} তারিখের সরকারি তালিকা অনুযায়ী প্রকাশিত তথ্য থেকে নেওয়া। ডেলিভারির দিন আনুমানিক। ফি বদলাতে পারে, তাই আবেদনের আগে অফিসিয়াল ওয়েবসাইট দেখে নিন।`, `This fee list comes from published information quoting the official schedule updated ${FEES_UPDATED.en}. Delivery days are approximate. Fees can change, so check the official website before you apply.`)}</p>
        <p>{tr("এটি একটি স্বাধীন ওয়েবসাইট, কোনো সরকারি সংস্থার সঙ্গে যুক্ত নয়।", "This is an independent website and is not connected to any government body.")}</p>
        <p><a href="https://www.epassport.gov.bd" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">{tr("অফিসিয়াল ই-পাসপোর্ট পোর্টাল (epassport.gov.bd)", "Official e-Passport portal (epassport.gov.bd)")}</a></p>
      </div>
    </div>
  );
}
