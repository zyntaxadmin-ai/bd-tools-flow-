"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useLang } from "@/lib/lang";
import { CAT_I18N } from "@/lib/i18nData";

export type GuideItem = {
  slug: string;
  title: [string, string];
  desc: [string, string];
  updatedLabel: [string, string];
  category: string; // category slug
};

// Guides grouped by category, with a search box and category chips.
// The full list is in the HTML on first load, so search engines see every guide.
export default function GuidesList({ guides, order }: { guides: GuideItem[]; order: string[] }) {
  const { lang } = useLang();
  const i = lang === "en" ? 1 : 0;
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");

  const query = q.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      guides.filter((g) => {
        if (cat !== "all" && g.category !== cat) return false;
        if (!query) return true;
        return (g.title[0] + " " + g.title[1] + " " + g.desc[0] + " " + g.desc[1]).toLowerCase().includes(query);
      }),
    [guides, cat, query]
  );
  const groups = order
    .map((slug) => ({ slug, items: filtered.filter((g) => g.category === slug) }))
    .filter((x) => x.items.length > 0);

  const chip = (active: boolean) =>
    `shrink-0 min-h-[40px] px-4 rounded-full text-sm font-medium border transition-colors ${
      active
        ? "bg-indigo-600 border-indigo-600 text-white"
        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400"
    }`;

  return (
    <div>
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" aria-hidden="true" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={i ? "Search guides... bKash, GPA, tax" : "গাইড খুঁজুন... বিকাশ, GPA, কর"}
          aria-label={i ? "Search guides" : "গাইড খুঁজুন"}
          className="w-full pl-11 pr-10 py-3.5 text-[15px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {q && (
          <button type="button" onClick={() => setQ("")} aria-label={i ? "Clear" : "মুছুন"} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label={i ? "Filter by category" : "বিভাগ অনুযায়ী"}>
        <button type="button" onClick={() => setCat("all")} aria-pressed={cat === "all"} className={chip(cat === "all")}>
          {i ? "All" : "সব"} ({guides.length})
        </button>
        {order.map((slug) => {
          const n = guides.filter((g) => g.category === slug).length;
          if (!n) return null;
          return (
            <button key={slug} type="button" onClick={() => setCat(slug)} aria-pressed={cat === slug} className={chip(cat === slug)}>
              {CAT_I18N[slug]?.[lang].name ?? slug} ({n})
            </button>
          );
        })}
      </div>

      {groups.length === 0 && (
        <p className="text-center text-slate-600 dark:text-slate-400 py-10">{i ? "No guides found. Try another word." : "কোনো গাইড পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন।"}</p>
      )}

      <div className="space-y-10">
        {groups.map((gr) => (
          <section key={gr.slug} aria-labelledby={`cat-${gr.slug}`}>
            <h2 id={`cat-${gr.slug}`} className="text-xl font-bold text-slate-900 dark:text-white mb-1">{CAT_I18N[gr.slug]?.[lang].name ?? gr.slug}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{CAT_I18N[gr.slug]?.[lang].desc}</p>
            <div className="space-y-3">
              {gr.items.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="block rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 hover:border-indigo-400 transition">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">{g.title[i]}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{g.desc[i]}</p>
                  <p className="text-xs text-slate-500 mt-2">{i ? `Updated: ${g.updatedLabel[1]}` : `আপডেট: ${g.updatedLabel[0]}`}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
