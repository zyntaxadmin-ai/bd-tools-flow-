"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang";

type GtagFn = (...args: unknown[]) => void;
const KEY = "bdtf-consent";

function update(state: "granted" | "denied") {
  const g = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof g === "function") {
    g("consent", "update", {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
    });
  }
}

// Small cookie banner. Saves the choice in localStorage and tells Google (Consent Mode v2).
export default function CookieConsent() {
  const { lang } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const choose = (state: "granted" | "denied") => {
    try {
      localStorage.setItem(KEY, state);
    } catch {
      /* storage blocked: the choice only lasts for this visit */
    }
    update(state);
    setShow(false);
  };

  if (!show) return null;
  const bn = lang !== "en";
  return (
    <div
      role="dialog"
      aria-label={bn ? "কুকি সম্মতি" : "Cookie consent"}
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
    >
      <div className="mx-auto max-w-[760px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl p-4 sm:p-5">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {bn
            ? "আমরা সাইট চালাতে, ভিজিটর পরিসংখ্যান বুঝতে এবং বিজ্ঞাপন দেখাতে কুকি ব্যবহার করি। আপনি গ্রহণ বা প্রত্যাখ্যান করতে পারেন।"
            : "We use cookies to run the site, understand visitor statistics and show ads. You can accept or decline."}{" "}
          <Link href="/cookie-policy" className="text-indigo-600 dark:text-indigo-400 underline">
            {bn ? "কুকি নীতি" : "Cookie Policy"}
          </Link>
        </p>
        <div className="mt-3 flex flex-wrap gap-2 justify-end">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="min-h-[44px] px-4 rounded-xl border border-slate-300 dark:border-slate-600 text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {bn ? "প্রত্যাখ্যান" : "Decline"}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="min-h-[44px] px-4 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            {bn ? "গ্রহণ করুন" : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}
