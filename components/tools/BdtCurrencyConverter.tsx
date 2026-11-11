"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeftRight, ExternalLink, Landmark } from "lucide-react";
import { useTr } from "@/lib/lang";
import { BB_RATE_URL, CURRENCIES, POPULAR, PRESET_AMOUNTS, QUICK_PAIRS, fmt, loadRates, rateOf, type Data } from "@/lib/currencyData";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const known = (c: string | undefined, fallback: string) => (c && CURRENCIES.some((x) => x.code === c) ? c : fallback);

export default function BdtCurrencyConverter({ initial, initialFrom, initialTo }: { initial?: Data; initialFrom?: string; initialTo?: string }) {
  const tr = useTr();
  const [data, setData] = useState<Data | null>(initial ?? null);
  const [state, setState] = useState<"loading" | "ready" | "error">(initial ? "ready" : "loading");
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState(known(initialFrom, "usd"));
  const [to, setTo] = useState(known(initialTo, "bdt"));

  const load = () => {
    if (!data) setState("loading");
    loadRates().then((d) => { setData(d); setState("ready"); }).catch(() => { if (!data) setState("error"); });
  };
  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const list = data ? CURRENCIES.filter((c) => typeof data.usd[c.code] === "number") : CURRENCIES;
  const amt = parseFloat(amount);
  const rate = rateOf(data, from, to);
  const valid = !isNaN(amt) && amt >= 0 && isFinite(rate);
  const result = valid ? amt * rate : NaN;
  const label = (code: string) => { const c = CURRENCIES.find((x) => x.code === code); return c ? `${code.toUpperCase()} - ${tr(c.bn, c.en)}` : code.toUpperCase(); };
  const F = from.toUpperCase(), T = to.toUpperCase();
  const card = "rounded-xl border border-slate-200 dark:border-slate-700 p-5";

  return (
    <div className="space-y-6">
      {state === "loading" && <p className="text-sm text-slate-500">{tr("আজকের রেট লোড হচ্ছে...", "Loading today's rates...")}</p>}
      {state === "error" && (
        <div className="space-y-2">
          <p className="text-sm text-red-500">{tr("রেট লোড করা যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।", "Could not load the rates. Check your connection and try again.")}</p>
          <button onClick={load} className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm dark:text-white">{tr("আবার চেষ্টা করুন", "Try again")}</button>
        </div>
      )}

      <div>
        <label className="text-sm font-medium dark:text-slate-200">{tr("পরিমাণ", "Amount")}</label>
        <input type="number" inputMode="decimal" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} className={input} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-end gap-2">
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("থেকে", "From")}</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className={input}>{list.map((c) => <option key={c.code} value={c.code}>{label(c.code)}</option>)}</select>
        </div>
        <button onClick={() => { setFrom(to); setTo(from); }} aria-label={tr("অদলবদল", "Swap")} className="p-3 mb-0.5 justify-self-center rotate-90 sm:rotate-0 rounded-xl border border-slate-200 dark:border-slate-700 dark:text-white hover:border-indigo-400"><ArrowLeftRight className="w-4 h-4" /></button>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("এতে", "To")}</label>
          <select value={to} onChange={(e) => setTo(e.target.value)} className={input}>{list.map((c) => <option key={c.code} value={c.code}>{label(c.code)}</option>)}</select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {QUICK_PAIRS.map(([a, b]) => (
          <button key={a + b} onClick={() => { setFrom(a); setTo(b); }} className={`px-3 py-1.5 text-xs rounded-full border transition ${from === a && to === b ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-slate-200 hover:border-indigo-400"}`}>
            {a.toUpperCase()} → {b.toUpperCase()}
          </button>
        ))}
      </div>

      {state === "ready" && amount !== "" && !valid && <p className="text-sm text-red-500">{tr("সঠিক পরিমাণ লিখুন", "Enter a valid amount")}</p>}
      {valid && (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 p-5 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">{fmt(amt)} {F} =</p>
          <p className="text-3xl font-bold text-indigo-600 mt-1 break-all">{fmt(result)} {T}</p>
          <p className="text-xs text-slate-500 mt-3">1 {F} = {fmt(rate)} {T}</p>
          {isFinite(1 / rate) && <p className="text-xs text-slate-500 mt-1">1 {T} = {fmt(1 / rate)} {F}</p>}
        </div>
      )}
      {data?.date && <p className="text-xs text-slate-500 -mt-3">{tr(`রেটের তারিখ: ${data.date}`, `Rate date: ${data.date}`)}</p>}

      {isFinite(rate) && (
        <section>
          <h3 className="font-semibold dark:text-white mb-2">{tr(`${F} থেকে ${T}: সাধারণ পরিমাণের হিসাব`, `${F} to ${T}: common amounts`)}</h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm dark:text-white">
              <thead className="bg-slate-50 dark:bg-slate-800 text-left"><tr><th className="px-3 py-2">{F}</th><th className="px-3 py-2 text-right">{T}</th></tr></thead>
              <tbody>
                {PRESET_AMOUNTS.map((a) => (
                  <tr key={a} onClick={() => setAmount(String(a))} className="border-t border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-indigo-50/60 dark:hover:bg-indigo-950/20">
                    <td className="px-3 py-2 font-medium">{a.toLocaleString("en-US")}</td>
                    <td className="px-3 py-2 text-right">{fmt(a * rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {data && (
        <section>
          <h3 className="font-semibold dark:text-white mb-2">{tr("আজকের রেট: ১ বিদেশি মুদ্রা = কত টাকা", "Today's rates: 1 foreign unit = how many taka")}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {POPULAR.filter((c) => typeof data.usd[c] === "number").map((c) => {
              const cur = CURRENCIES.find((x) => x.code === c);
              return (
                <Link key={c} href={`/currency/${c}-to-bdt`} className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 hover:border-indigo-400 transition">
                  <div className="text-xs text-slate-500">{c.toUpperCase()} {cur ? `· ${tr(cur.bn, cur.en)}` : ""}</div>
                  <div className="font-semibold dark:text-white mt-0.5">{fmt(rateOf(data, c, "bdt"))} BDT</div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className={card}>
        <h3 className="font-semibold dark:text-white flex items-center gap-2 mb-2"><Landmark className="w-4 h-4 text-indigo-500" />{tr("বাংলাদেশ ব্যাংকের রেট কোথায় দেখবেন", "Where to see the Bangladesh Bank rate")}</h3>
        <p className="text-sm text-slate-700 dark:text-slate-300">{tr("বাংলাদেশ ব্যাংক প্রতিদিন ডলারের বিড, আস্ক ও গড় (WAR) রেট এবং অন্য কয়েকটি মুদ্রার ক্রস রেট প্রকাশ করে। এখানে দেখানো রেট আন্তর্জাতিক মধ্যবর্তী রেট, তাই দুটো একটু আলাদা হতে পারে। আপনার ব্যাংক বা এক্সচেঞ্জ হাউস আবার নিজের কেনা-বেচার রেট ধরে।", "Bangladesh Bank publishes a daily dollar bid, ask and average (WAR) rate and cross rates for a few other currencies. The rate here is the international mid-market rate, so the two can differ a little. Your bank or exchange house then applies its own buying and selling rate.")}</p>
        <a href={BB_RATE_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm text-indigo-600 font-medium">{tr("বাংলাদেশ ব্যাংকের এক্সচেঞ্জ রেট পাতা", "Bangladesh Bank exchange rate page")}<ExternalLink className="w-3.5 h-3.5" /></a>
      </section>

      <div className="text-xs text-slate-500 space-y-1">
        <p>{tr("এটি দিনে একবার আপডেট হওয়া মধ্যবর্তী (রেফারেন্স) রেট। ব্যাংক, এক্সচেঞ্জ হাউস বা মানি চেঞ্জারের রেট ও ফি আলাদা, তাই লেনদেনের আগে তাদের রেট দেখে নিন। রেমিট্যান্সের রেট ও ফি পাঠানোর মাধ্যমভেদে আলাদা।", "This is a mid-market (reference) rate updated once a day. Banks, exchange houses and money changers use their own rates and fees, so check theirs before you transact. Remittance rates and fees differ by the service you use.")}</p>
        <p>{tr("আপনার লেখা পরিমাণ কোথাও পাঠানো হয় না। এই সাইট কোনো ব্যাংক বা সরকারি সংস্থার সঙ্গে যুক্ত নয়।", "The amount you type is never sent anywhere. This site is not affiliated with any bank or government body.")}</p>
      </div>
    </div>
  );
}
