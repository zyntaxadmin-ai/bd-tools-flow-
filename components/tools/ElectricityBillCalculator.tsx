"use client";
import { useMemo, useState } from "react";
import { RotateCcw, Zap, Phone, ExternalLink, Lightbulb } from "lucide-react";
import { useTr } from "@/lib/lang";

// NOTE: Tariffs change. Check your latest bill and the BERC order, then edit the numbers below.
// Residential (LT-A) tariff from the BERC order of 3 June 2026 (effective June 2026 billing).
// BERC withdrew the hike for the lifeline (0-50) and first (0-75) slabs on 4 June 2026, so those two keep the old rates 4.63 and 5.26.
// Demand charge and VAT come from published calculators and can differ on your bill, so the demand rate is editable in the tool.
const TARIFF_NOTE = { bn: "জুন ২০২৬ বিলিং থেকে কার্যকর", en: "effective from the June 2026 billing month" };
const LIFELINE_LIMIT = 50; // if total units are 50 or fewer, all units use the lifeline rate
const LIFELINE_RATE = 4.63;
const SLABS: { upTo: number; rate: number }[] = [
  { upTo: 75, rate: 5.26 },
  { upTo: 200, rate: 8.5 },
  { upTo: 300, rate: 9.1 },
  { upTo: 400, rate: 9.62 },
  { upTo: 600, rate: 15.01 },
  { upTo: Infinity, rate: 17.35 },
];
const DEFAULT_DEMAND_PER_KW = 42;
const VAT_RATE = 0.05;
const QUICK_UNITS = [100, 200, 300, 500];
const TABLE_UNITS = [50, 75, 100, 150, 200, 250, 300, 400, 500, 600, 800, 1000];

type Line = { label: string; units: number; rate: number; amount: number };
export type Bill = { lines: Line[]; energy: number; demand: number; vat: number; total: number };

const r2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export function computeBill(units: number, kw: number, demandPerKw: number): Bill {
  const lines: Line[] = [];
  if (units <= LIFELINE_LIMIT) {
    if (units > 0) lines.push({ label: `1-${LIFELINE_LIMIT}`, units, rate: LIFELINE_RATE, amount: r2(units * LIFELINE_RATE) });
  } else {
    let prev = 0;
    for (const s of SLABS) {
      if (units <= prev) break;
      const inSlab = Math.min(units, s.upTo) - prev;
      const label = s.upTo === Infinity ? `${prev + 1}+` : `${prev + 1}-${s.upTo}`;
      lines.push({ label, units: r2(inSlab), rate: s.rate, amount: r2(inSlab * s.rate) });
      prev = s.upTo;
    }
  }
  const energy = r2(lines.reduce((a, l) => a + l.amount, 0));
  const demand = r2(kw * demandPerKw);
  const vat = r2((energy + demand) * VAT_RATE);
  return { lines, energy, demand, vat, total: r2(energy + demand + vat) };
}

// Largest number of units whose energy charge fits inside the given taka amount.
// The energy charge never goes down as units go up, so a binary search is safe.
export function unitsForEnergy(energy: number): number {
  if (energy <= 0) return 0;
  let lo = 0, hi = 100000;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (computeBill(mid, 0, 0).energy <= energy) lo = mid; else hi = mid;
  }
  return lo;
}

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const money = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const num = (s: string) => (s.trim() === "" ? NaN : parseFloat(s));

type Mode = "bill" | "reverse" | "prepaid";

const HELPLINES: { name: string; area: [string, string]; tel: string; site: string }[] = [
  { name: "DESCO", area: ["উত্তর ঢাকা, টঙ্গী, গাজীপুর শহর", "North Dhaka, Tongi, Gazipur city"], tel: "16120", site: "https://desco.gov.bd" },
  { name: "DPDC", area: ["দক্ষিণ ঢাকা, নারায়ণগঞ্জ", "South Dhaka, Narayanganj"], tel: "16116", site: "https://dpdc.org.bd" },
  { name: "NESCO", area: ["রাজশাহী ও রংপুর বিভাগ", "Rajshahi and Rangpur divisions"], tel: "16603", site: "https://nesco.gov.bd" },
  { name: "BPDB", area: ["চট্টগ্রাম, সিলেট, খুলনা শহর", "Chattogram, Sylhet, Khulna urban"], tel: "16200", site: "https://bpdb.gov.bd" },
  { name: "WZPDCL", area: ["খুলনা বিভাগ (শহর)", "Khulna division (urban)"], tel: "16117", site: "https://wzpdcl.org.bd" },
  { name: "BREB / পল্লী বিদ্যুৎ", area: ["গ্রামীণ এলাকা", "Rural areas"], tel: "16899", site: "https://reb.gov.bd" },
];

export default function ElectricityBillCalculator() {
  const tr = useTr();
  const [mode, setMode] = useState<Mode>("bill");
  const [units, setUnits] = useState("");
  const [kw, setKw] = useState("1");
  const [demand, setDemand] = useState(String(DEFAULT_DEMAND_PER_KW));
  const [taka, setTaka] = useState("");
  const [recharge, setRecharge] = useState("");
  const [first, setFirst] = useState(true);

  const k = num(kw), d = num(demand);
  const loadOk = !isNaN(k) && k > 0 && k <= 100;
  const demandOk = !isNaN(d) && d >= 0 && d <= 1000;
  const settingsOk = loadOk && demandOk;
  const settingsError = !loadOk
    ? tr("অনুমোদিত লোড (kW) ০ এর বেশি ও ১০০ এর কম লিখুন", "Enter a sanctioned load (kW) above 0 and up to 100")
    : !demandOk ? tr("ডিমান্ড চার্জ ০ থেকে ১০০০ এর মধ্যে লিখুন", "Enter a demand charge between 0 and 1000") : "";

  // 1) bill from units, updates as you type
  const u = num(units);
  const unitsOk = !isNaN(u) && u >= 0 && u <= 100000;
  const bill = useMemo(() => (unitsOk && settingsOk ? computeBill(u, k, d) : null), [u, k, d, unitsOk, settingsOk]);
  const nextUnit = useMemo(() => (bill ? r2(computeBill(u + 1, k, d).total - bill.total) : null), [bill, u, k, d]);

  // 2) units from a taka bill
  const t = num(taka);
  const reverse = useMemo(() => {
    if (!settingsOk || isNaN(t) || t < 0 || t > 10000000) return null;
    const energy = t / (1 + VAT_RATE) - k * d;
    if (energy <= 0) return { units: 0, energy: 0, belowFixed: true };
    return { units: unitsForEnergy(energy), energy, belowFixed: false };
  }, [t, k, d, settingsOk]);

  // 3) units from a prepaid recharge
  const rc = num(recharge);
  const prepaid = useMemo(() => {
    if (!settingsOk || isNaN(rc) || rc < 0 || rc > 10000000) return null;
    const fixed = first ? k * d : 0;
    const energy = rc / (1 + VAT_RATE) - fixed;
    if (energy <= 0) return { units: 0, energy: 0, fixed, belowFixed: true };
    return { units: unitsForEnergy(energy), energy, fixed, belowFixed: false };
  }, [rc, k, d, first, settingsOk]);

  const table = useMemo(() => (settingsOk ? TABLE_UNITS.map((n) => ({ n, b: computeBill(n, k, d) })) : []), [k, d, settingsOk]);

  const reset = () => { setUnits(""); setKw("1"); setDemand(String(DEFAULT_DEMAND_PER_KW)); setTaka(""); setRecharge(""); setFirst(true); };

  const tabCls = (m: Mode) =>
    `flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition ${mode === m ? "bg-indigo-600 text-white shadow" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`;
  const row = "flex justify-between text-sm dark:text-white";
  const box = "rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 p-5 space-y-3";
  const divider = <div className="h-px bg-indigo-200 dark:bg-indigo-900" />;

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
        <Zap className="w-3.5 h-3.5" />
        {tr(`বিইআরসি রেট · ${TARIFF_NOTE.bn}`, `BERC rates · ${TARIFF_NOTE.en}`)}
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-slate-100/70 dark:bg-slate-800/60" role="tablist">
        <button role="tab" aria-selected={mode === "bill"} className={tabCls("bill")} onClick={() => setMode("bill")}>{tr("ইউনিট → বিল", "Units → Bill")}</button>
        <button role="tab" aria-selected={mode === "reverse"} className={tabCls("reverse")} onClick={() => setMode("reverse")}>{tr("টাকা → ইউনিট", "Taka → Units")}</button>
        <button role="tab" aria-selected={mode === "prepaid"} className={tabCls("prepaid")} onClick={() => setMode("prepaid")}>{tr("প্রিপেইড রিচার্জ", "Prepaid recharge")}</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mode === "bill" && (
          <div className="sm:col-span-2">
            <label className="text-sm font-medium dark:text-slate-200">{tr("মাসের ব্যবহৃত ইউনিট (kWh)", "Units used in the month (kWh)")}</label>
            <input type="number" inputMode="decimal" min={0} value={units} onChange={(e) => setUnits(e.target.value)} placeholder="e.g. 200" className={input} />
            <div className="flex flex-wrap gap-2 mt-2">
              {QUICK_UNITS.map((q) => (
                <button key={q} onClick={() => setUnits(String(q))} className="px-3 py-1 text-xs rounded-full border border-slate-200 dark:border-slate-700 dark:text-slate-200 hover:border-indigo-400">{q}</button>
              ))}
            </div>
          </div>
        )}
        {mode === "reverse" && (
          <div className="sm:col-span-2">
            <label className="text-sm font-medium dark:text-slate-200">{tr("বিলের মোট টাকা (ভ্যাটসহ)", "Total bill amount (including VAT)")}</label>
            <input type="number" inputMode="decimal" min={0} value={taka} onChange={(e) => setTaka(e.target.value)} placeholder="e.g. 1573.95" className={input} />
          </div>
        )}
        {mode === "prepaid" && (
          <>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium dark:text-slate-200">{tr("রিচার্জের পরিমাণ (টাকা)", "Recharge amount (taka)")}</label>
              <input type="number" inputMode="decimal" min={0} value={recharge} onChange={(e) => setRecharge(e.target.value)} placeholder="e.g. 1000" className={input} />
            </div>
            <label className="sm:col-span-2 flex items-center gap-2 text-sm dark:text-slate-200">
              <input type="checkbox" checked={first} onChange={(e) => setFirst(e.target.checked)} className="w-4 h-4 accent-indigo-600" />
              {tr("এটি মাসের প্রথম রিচার্জ (ডিমান্ড চার্জ কাটা হবে)", "This is the first recharge of the month (demand charge is deducted)")}
            </label>
          </>
        )}
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("অনুমোদিত লোড (kW)", "Sanctioned load (kW)")}</label>
          <input type="number" inputMode="decimal" value={kw} onChange={(e) => setKw(e.target.value)} className={input} />
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("ডিমান্ড চার্জ প্রতি kW (টাকা)", "Demand charge per kW (taka)")}</label>
          <input type="number" inputMode="decimal" value={demand} onChange={(e) => setDemand(e.target.value)} className={input} />
        </div>
        <p className="sm:col-span-2 text-xs text-slate-500 -mt-2">{tr("লোড ও ডিমান্ড চার্জ আপনার বিলে যা আছে সেটি লিখুন।", "Use the load and demand charge printed on your bill.")}</p>
      </div>

      {settingsError && <p className="text-sm text-red-500">{settingsError}</p>}
      <button onClick={reset} className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm dark:text-white"><RotateCcw className="w-4 h-4" />{tr("রিসেট", "Reset")}</button>

      {mode === "bill" && units !== "" && !unitsOk && <p className="text-sm text-red-500">{tr("ইউনিট ০ থেকে ১,০০,০০০ এর মধ্যে লিখুন", "Enter units between 0 and 100,000")}</p>}

      {mode === "bill" && bill && (
        <div className={box}>
          <div className="space-y-1.5">
            {bill.lines.map((l) => (
              <div key={l.label} className={row}>
                <span className="text-slate-600 dark:text-slate-400">{l.label} {tr("ইউনিট", "units")}: {l.units} × {l.rate}</span>
                <span className="font-medium">{money(l.amount)}</span>
              </div>
            ))}
          </div>
          {divider}
          <div className={row}><span>{tr("বিদ্যুতের মূল্য", "Energy charge")}</span><span className="font-semibold">{money(bill.energy)}</span></div>
          <div className={row}><span>{tr("ডিমান্ড চার্জ", "Demand charge")}</span><span className="font-semibold">{money(bill.demand)}</span></div>
          <div className={row}><span>{tr("ভ্যাট (৫%)", "VAT (5%)")}</span><span className="font-semibold">{money(bill.vat)}</span></div>
          {divider}
          <div className="flex justify-between font-bold text-lg dark:text-white"><span>{tr("মোট বিল", "Total bill")}</span><span className="text-indigo-600">{money(bill.total)} {tr("টাকা", "taka")}</span></div>
          {u > 0 && <p className="text-xs text-slate-600 dark:text-slate-400">{tr(`গড়ে প্রতি ইউনিট ${money(bill.total / u)} টাকা।`, `That is ${money(bill.total / u)} taka per unit on average.`)}</p>}
          {nextUnit !== null && <p className="text-xs text-slate-600 dark:text-slate-400">{tr(`আরও ১ ইউনিট ব্যবহার করলে বিল বাড়বে ${money(nextUnit)} টাকা (ভ্যাটসহ)।`, `One more unit would add ${money(nextUnit)} taka to the bill (with VAT).`)}</p>}
        </div>
      )}

      {mode === "reverse" && reverse && (
        <div className={box}>
          {reverse.belowFixed ? (
            <p className="text-sm dark:text-white">{tr("এই টাকা শুধু ডিমান্ড চার্জ ও ভ্যাটের সমান বা কম, তাই বিদ্যুতের ইউনিট ধরা যাচ্ছে না।", "This amount only covers the demand charge and VAT, so no units are left.")}</p>
          ) : (
            <>
              <div className={row}><span>{tr("বিদ্যুতের মূল্য (ভ্যাট ও ডিমান্ড চার্জ বাদে)", "Energy charge (after VAT and demand)")}</span><span className="font-semibold">{money(reverse.energy)}</span></div>
              {divider}
              <div className="flex justify-between font-bold text-lg dark:text-white"><span>{tr("আনুমানিক ইউনিট", "Estimated units")}</span><span className="text-indigo-600">{reverse.units.toFixed(1)} kWh</span></div>
              {reverse.units > 0 && <p className="text-xs text-slate-600 dark:text-slate-400">{tr(`গড়ে প্রতি ইউনিট ${money(t / reverse.units)} টাকা।`, `That is ${money(t / reverse.units)} taka per unit on average.`)}</p>}
            </>
          )}
        </div>
      )}

      {mode === "prepaid" && prepaid && (
        <div className={box}>
          <div className={row}><span>{tr("রিচার্জ", "Recharge")}</span><span className="font-semibold">{money(rc)}</span></div>
          <div className={row}><span>{tr("ভ্যাট বাদ (৫%)", "Less VAT (5%)")}</span><span className="font-semibold">− {money(rc - rc / (1 + VAT_RATE))}</span></div>
          {first && <div className={row}><span>{tr("ডিমান্ড চার্জ বাদ", "Less demand charge")}</span><span className="font-semibold">− {money(Math.min(prepaid.fixed, rc / (1 + VAT_RATE)))}</span></div>}
          {divider}
          {prepaid.belowFixed ? (
            <p className="text-sm dark:text-white">{tr("এই রিচার্জে ডিমান্ড চার্জ ও ভ্যাট মিটিয়ে কোনো ইউনিট থাকে না।", "After VAT and the demand charge, nothing is left for units.")}</p>
          ) : (
            <div className="flex justify-between font-bold text-lg dark:text-white"><span>{tr("আনুমানিক ইউনিট", "Estimated units")}</span><span className="text-indigo-600">{prepaid.units.toFixed(1)} kWh</span></div>
          )}
          <p className="text-xs text-slate-600 dark:text-slate-400">{tr("মাসের শুরু থেকে ইউনিট গোনা ধরে হিসাব। কোম্পানিভেদে স্ল্যাব রিচার্জ বা মাস ধরে গোনা হয়, তাই মিটারের সঙ্গে সামান্য ফারাক হতে পারে।", "Counted as if units start from zero. Companies differ on whether slabs reset per recharge or per month, so your meter may show a small difference.")}</p>
        </div>
      )}

      {table.length > 0 && (
        <section>
          <h3 className="font-semibold dark:text-white mb-1">{tr("৫০ থেকে ১০০০ ইউনিটের বিল", "Bill for 50 to 1000 units")}</h3>
          <p className="text-xs text-slate-500 mb-2">{tr(`আবাসিক (LT-A), ${kw || "১"} kW লোড, ডিমান্ড চার্জ ও ৫% ভ্যাটসহ। মিটার ভাড়া ধরা হয়নি। যেকোনো সারিতে চাপ দিলে ওই ইউনিটের হিসাব দেখাবে।`, `Residential LT-A, ${kw || "1"} kW load, including demand charge and 5% VAT. Meter rent not included. Tap a row to see its breakdown.`)}</p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm dark:text-white">
              <thead className="bg-slate-50 dark:bg-slate-800 text-left">
                <tr><th className="px-3 py-2">{tr("ইউনিট", "Units")}</th><th className="px-3 py-2 text-right">{tr("বিদ্যুতের মূল্য", "Energy")}</th><th className="px-3 py-2 text-right">{tr("মোট বিল", "Total")}</th><th className="px-3 py-2 text-right">{tr("প্রতি ইউনিট", "Per unit")}</th></tr>
              </thead>
              <tbody>
                {table.map(({ n, b }) => (
                  <tr key={n} onClick={() => { setMode("bill"); setUnits(String(n)); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="border-t border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-indigo-50/60 dark:hover:bg-indigo-950/20">
                    <td className="px-3 py-2 font-medium">{n}</td>
                    <td className="px-3 py-2 text-right">{money(b.energy)}</td>
                    <td className="px-3 py-2 text-right font-semibold">{money(b.total)}</td>
                    <td className="px-3 py-2 text-right">{money(b.total / n)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="rounded-xl border border-slate-200 dark:border-slate-700 p-5">
        <h3 className="font-semibold dark:text-white flex items-center gap-2 mb-3"><Lightbulb className="w-4 h-4 text-amber-500" />{tr("বিল হঠাৎ বেশি এলে কী দেখবেন", "If your bill suddenly looks high")}</h3>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
          <li>{tr("৪০১ ইউনিটের পর রেট প্রায় দেড় গুণ হয় (৯.৬২ থেকে ১৫.০১)। গরমে এসি চালালে এই স্ল্যাবে ঢুকে যেতে পারেন।", "Past 400 units the rate jumps from 9.62 to 15.01. Summer AC use can push you into that slab.")}</li>
          <li>{tr("৫০ ইউনিট বা কম হলে সব ইউনিট ৪.৬৩ টাকায়। ৫১ ইউনিট হলে পুরো মাস স্ল্যাব রেটে যায়, তাই ৫০-এর কাছাকাছি থাকলে শেষ সপ্তাহে ব্যবহার কমানো লাভজনক।", "At 50 units or fewer every unit costs 4.63. At 51 the whole month moves to slab rates, so if you hover near 50, trim usage in the last week.")}</li>
          <li>{tr("অনুমোদিত লোড বেশি হলে ডিমান্ড চার্জও বাড়ে (প্রতি kW ৪২ টাকা + ভ্যাট)। বিলে লোড ঠিক আছে কিনা মিলিয়ে নিন।", "A higher sanctioned load raises the demand charge (42 taka per kW plus VAT). Check the load printed on your bill.")}</li>
          <li>{tr("পুরোনো ফ্রিজ, ওয়াটার হিটার ও স্ট্যান্ডবাইয়ে থাকা ডিভাইস নিঃশব্দে ইউনিট খায়। সন্দেহ হলে মিটার রিডিং নিজে মিলিয়ে দেখুন।", "Old fridges, water heaters and devices left on standby quietly eat units. If in doubt, check the meter reading yourself.")}</li>
          <li>{tr("বিল ভুল মনে হলে আগে নিজের বিতরণ কোম্পানির হটলাইনে জানান।", "If the bill looks wrong, report it to your distribution company's hotline first.")}</li>
        </ul>
      </section>

      <section className="rounded-xl border border-slate-200 dark:border-slate-700 p-5">
        <h3 className="font-semibold dark:text-white flex items-center gap-2 mb-1"><Phone className="w-4 h-4 text-indigo-500" />{tr("হটলাইন ও অফিসিয়াল সাইট", "Helplines and official sites")}</h3>
        <p className="text-xs text-slate-500 mb-3">{tr("কোন কোম্পানি আপনার এলাকায় সরবরাহ করে তা বিলে লেখা থাকে। নম্বর ও সাইট বদলাতে পারে, তাই বিলের নম্বরের সঙ্গে মিলিয়ে নিন।", "Your bill shows which company supplies you. Numbers and sites can change, so check them against your bill.")}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {HELPLINES.map((h) => (
            <div key={h.name} className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-3 text-sm">
              <div className="font-medium dark:text-white">{h.name}</div>
              <div className="text-xs text-slate-500 mb-2">{tr(h.area[0], h.area[1])}</div>
              <div className="flex items-center gap-4">
                <a href={`tel:${h.tel}`} className="text-indigo-600 font-medium">{h.tel}</a>
                <a href={h.site} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-600">{tr("অফিসিয়াল সাইট", "Official site")}<ExternalLink className="w-3 h-3" /></a>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">{tr("জাতীয় কল সেন্টার: ১৬৯৯৯", "National call centre: 16999")}</p>
      </section>

      <div className="text-xs text-slate-500 space-y-1">
        <p>{tr(`এটি আবাসিক (LT-A) গ্রাহকের আনুমানিক বিল, বিইআরসির ঘোষিত রেট অনুযায়ী (${TARIFF_NOTE.bn})। ৫০ ইউনিট বা কম হলে সব ইউনিট লাইফলাইন রেটে ধরা হয়।`, `This is an estimate for a residential (LT-A) customer using the rates announced by BERC (${TARIFF_NOTE.en}). If you use 50 units or fewer, all units are charged at the lifeline rate.`)}</p>
        <p>{tr("মিটার ভাড়া, বকেয়া, দেরির জরিমানা ও রিবেট এখানে ধরা হয়নি। আপনার প্রকৃত বিল ডিস্কো, ডিপিডিসি, পল্লী বিদ্যুৎ বা সংশ্লিষ্ট অফিসের বিল অনুযায়ী হবে।", "Meter rent, arrears, late fees and rebates are not included. Your actual bill is whatever your distribution company (DESCO, DPDC, Palli Bidyut and others) issues.")}</p>
      </div>
    </div>
  );
}
