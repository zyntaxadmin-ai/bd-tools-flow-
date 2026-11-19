"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTr } from "@/lib/lang";
import { AGENT_PER_1000 } from "@/lib/bkashRates";

const QUICK = [1000, 5000, 10000, 20000];
const BN = "০১২৩৪৫৬৭৮৯";

// en-US formatting on purpose, so the server and the browser print the same text.
const fmt = (n: number) => Number(n.toFixed(2)).toLocaleString("en-US");

// Accepts Bangla or English digits; keeps only digits and one dot.
function clean(v: string) {
  const en = v.replace(/[০-৯]/g, (d) => String(BN.indexOf(d))).replace(/[^\d.]/g, "");
  const i = en.indexOf(".");
  return (i === -1 ? en : en.slice(0, i + 1) + en.slice(i + 1).replace(/\./g, "")).slice(0, 9);
}

// A small, working bKash agent cash-out calculator for the top of the home page.
export default function HeroCalculator() {
  const tr = useTr();
  const [value, setValue] = useState("5000");
  const amt = parseFloat(value);
  const ok = value !== "" && isFinite(amt) && amt > 0;
  const charge = ok ? (amt * AGENT_PER_1000) / 1000 : 0;

  return (
    <div className="rounded-[28px] border border-indigo-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-[0_30px_60px_-30px_rgba(109,124,245,0.45)]">
      <div className="flex items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-400">
        <h2 className="font-semibold text-slate-900 dark:text-white">{tr("bKash ক্যাশ আউট চার্জ", "bKash cash out charge")}</h2>
        <span>{tr("এজেন্ট", "Agent")} {(AGENT_PER_1000 / 10).toFixed(2)}%</span>
      </div>

      <label htmlFor="hero-amount" className="mt-4 block text-sm text-slate-600 dark:text-slate-400">
        {tr("কত টাকা তুলবেন?", "How much will you cash out?")}
      </label>
      <div className="mt-1.5 flex items-baseline gap-2 rounded-2xl border-2 border-indigo-200 dark:border-slate-700 bg-indigo-50/40 dark:bg-slate-800/50 px-4 py-2.5 focus-within:border-indigo-500">
        <span aria-hidden className="text-2xl text-indigo-400">৳</span>
        <input
          id="hero-amount"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(clean(e.target.value))}
          className="w-full min-w-0 bg-transparent font-display text-3xl font-semibold text-slate-900 dark:text-white focus:outline-none"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => setValue(String(q))}
            className="min-h-[36px] rounded-full bg-indigo-50 dark:bg-slate-800 px-3.5 text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-slate-700"
          >
            {q.toLocaleString("en-US")}
          </button>
        ))}
      </div>

      <div className="mt-5 border-t border-dashed border-indigo-200 dark:border-slate-700 pt-4" aria-live="polite">
        {ok ? (
          <>
            <p className="text-sm text-slate-600 dark:text-slate-400">{tr("চার্জ কাটবে", "Charge")}</p>
            <p className="mt-1 font-display text-4xl sm:text-[44px] font-bold leading-none text-[#E2136E] dark:text-[#FF5FA2]">৳ {fmt(charge)}</p>
            <p className="mt-3 flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>{tr("মোট কাটবে", "Total deducted")}</span>
              <b className="text-slate-900 dark:text-white">৳ {fmt(amt + charge)}</b>
            </p>
          </>
        ) : (
          <p className="py-4 text-sm text-slate-600 dark:text-slate-400">{tr("টাকার অঙ্ক লিখলেই চার্জ দেখা যাবে।", "Type an amount to see the charge.")}</p>
        )}
      </div>

      <Link
        href="/tool/bkash-calculator"
        className="mt-4 flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-white text-[15px] font-semibold text-white dark:text-slate-900 hover:bg-indigo-700 dark:hover:bg-indigo-100"
      >
        {tr("পুরো ক্যালকুলেটর খুলুন", "Open the full calculator")} <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
      <p className="mt-2.5 text-center text-xs text-slate-500 dark:text-slate-400">{tr("চার্জ বদলাতে পারে, অফিসিয়াল চার্টে মিলিয়ে নিন।", "Charges can change. Check the official bKash chart.")}</p>
    </div>
  );
}
