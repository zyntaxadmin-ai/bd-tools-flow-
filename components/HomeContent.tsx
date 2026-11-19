"use client";
import { useState, useMemo, useEffect } from "react";
import SiteJsonLd from "@/components/SiteJsonLd";
import SearchBar from "@/components/SearchBar";
import HeroCalculator from "@/components/HeroCalculator";
import { ToolTile, ToolRow } from "@/components/ToolTile";
import { tools, categories } from "@/data/tools";
import { CAT_I18N, DESC_EN } from "@/lib/i18nData";
import { useLang, useUI } from "@/lib/lang";
import { ShieldCheck, Zap, Users, Sparkles, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toBnDigits } from "@/lib/site";
export type GuideLink = { slug: string; title: [string, string] };

// How many guides the home page shows. The rest are on /guides, so the home page stays short as you add guides.
const HOME_GUIDES = 6;
const ICONS = [Zap, ShieldCheck, Users, Sparkles];

// Direct links to the tools people open most. One tap, no searching.
const POPULAR: { bn: string; en: string; href: string }[] = [
  { bn: "bKash চার্জ", en: "bKash charge", href: "/tool/bkash-calculator" },
  { bn: "জমির হিসাব", en: "Land", href: "/tool/land-calculator-bd" },
  { bn: "GPA", en: "GPA", href: "/tool/gpa-calculator-bd" },
  { bn: "আয়কর", en: "Income tax", href: "/tool/income-tax-calculator-bd" },
  { bn: "PDF মার্জ", en: "Merge PDF", href: "/tool/merge-pdf" },
];

const CAT_BY_NAME = Object.fromEntries(categories.map((c) => [c.name, c.slug]));

export default function HomeContent({ guides }: { guides: GuideLink[] }) {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("");
  // Lets /?q=bkash open the home page with the search filled in (used by the WebSite SearchAction schema).
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get("q");
      if (q) setSearch(q.slice(0, 80));
    } catch { /* ignore */ }
  }, []);
  const { lang } = useLang();
  const ui = useUI();
  const en = lang === "en";
  const searching = search.trim() !== "";

  // Press "/" anywhere on the page to jump to the search box.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
      e.preventDefault();
      document.getElementById("home-search")?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Highlights the category you are reading in the sticky bar.
  useEffect(() => {
    if (searching || typeof IntersectionObserver === "undefined") return;
    const els = categories.map((c) => document.getElementById(c.slug)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [searching]);

  // The footer fills the phone screen below the sticky header and category bar, so it needs their height.
  useEffect(() => {
    if (searching) return;
    const root = document.documentElement;
    const set = () => {
      const h = document.querySelector("header")?.getBoundingClientRect().height ?? 64;
      const r = document.getElementById("home-rail")?.getBoundingClientRect().height ?? 0;
      root.style.setProperty("--sticky-top", `${Math.round(h + r)}px`);
      root.style.setProperty("--footer-gap", "0px"); // footer sits flush under the category bar, no gap
    };
    set();
    window.addEventListener("resize", set);
    return () => { window.removeEventListener("resize", set); root.style.removeProperty("--sticky-top"); root.style.removeProperty("--footer-gap"); };
  }, [searching]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tools;
    return tools.filter((t) => {
      const enDesc = (DESC_EN[t.slug.replace("/tool/", "")] || "").toLowerCase();
      const cat = CAT_I18N[CAT_BY_NAME[t.category]];
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        enDesc.includes(q) ||
        t.category.toLowerCase().includes(q) ||
        cat.bn.name.toLowerCase().includes(q)
      );
    });
  }, [search]);

  const count = (n: number) => (en ? `${n} ${n === 1 ? "tool" : "tools"}` : `${toBnDigits(n)}টি টুল`);

  return (
    <div>
      <SiteJsonLd />

      <section className="home-hero relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-48 hidden h-[520px] w-[520px] rounded-full border-2 border-indigo-400/20 lg:block"
          style={{ boxShadow: "0 0 0 70px transparent, 0 0 0 72px rgba(124,123,246,.12), 0 0 0 142px transparent, 0 0 0 144px rgba(124,123,246,.08)" }}
        />
        <div className={`relative mx-auto grid max-w-[1280px] gap-10 px-4 sm:px-6 lg:px-8 ${searching ? "py-8" : "py-10 sm:py-14 lg:grid-cols-[7fr_5fr] lg:items-center lg:gap-14 lg:py-16"}`}>
          <div>
            <h1 className="font-display text-[34px] font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[56px]">
              {ui.heroA} {ui.heroB}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">{ui.heroSub}</p>
            <div className="mt-7">
              <SearchBar value={search} onChange={setSearch} placeholder={ui.searchPh} clearLabel={ui.clear} className="mx-0" />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span>{ui.popular}:</span>
              {POPULAR.map((p) => (
                <Link key={p.href} href={p.href} className="inline-flex min-h-[36px] items-center rounded-full border border-indigo-100 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 font-medium text-indigo-900 dark:text-indigo-200 hover:border-indigo-300 dark:hover:border-indigo-500">
                  {en ? p.en : p.bn}
                </Link>
              ))}
            </div>
            {!searching && (
              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
                {ui.features.map((f, i) => {
                  const Icon = ICONS[i];
                  return (
                    <li key={f.title} className="flex items-center gap-2" title={f.text}>
                      <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" aria-hidden />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{f.title}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          {!searching && <HeroCalculator />}
        </div>
      </section>

      {!searching && (
        <nav id="home-rail" aria-label={ui.categories} className="sticky top-[64px] z-40 border-b border-indigo-100/70 dark:border-slate-800 bg-slate-50/85 dark:bg-slate-950/85 backdrop-blur-xl">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
              {categories.map((c) => {
                const on = active === c.slug;
                return (
                  <a
                    key={c.slug}
                    href={`#${c.slug}`}
                    aria-current={on ? "true" : undefined}
                    className={`cat-${c.slug} flex min-h-[40px] shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
                      on
                        ? "border-[var(--dot)] bg-[var(--t)] text-[var(--c)]"
                        : "border-indigo-100 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-[var(--dot)]"
                    }`}
                  >
                    <span aria-hidden className="h-2 w-2 rounded-full bg-[var(--dot)]" />
                    {CAT_I18N[c.slug][lang].name}
                    <span className="font-normal opacity-70">{en ? tools.filter((t) => t.category === c.name).length : toBnDigits(tools.filter((t) => t.category === c.name).length)}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </nav>
      )}

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {searching ? (
          <section className="pt-8" aria-live="polite">
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">{ui.found(filtered.length)}</h2>
            {filtered.length === 0 ? (
              <div>
                <p className="text-slate-600 dark:text-slate-400">{ui.none}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {POPULAR.map((p) => (
                    <Link key={p.href} href={p.href} className="inline-flex min-h-[40px] items-center rounded-full border border-indigo-100 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm font-medium text-indigo-900 dark:text-indigo-200">
                      {en ? p.en : p.bn}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid gap-x-2 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 md:grid-cols-2">
                {filtered.map((t) => (
                  <ToolRow key={t.id} name={t.name} slug={t.slug} description={t.description} iconName={t.icon} catSlug={CAT_BY_NAME[t.category]} />
                ))}
              </div>
            )}
          </section>
        ) : (
          categories.map((c, ci) => {
            const list = tools.filter((t) => t.category === c.name);
            return (
              <section key={c.slug} id={c.slug} className="scroll-mt-36 pt-10 sm:pt-12">
                <div className={`cat-${c.slug} mb-5 flex items-end justify-between gap-4`}>
                  <div>
                    <h2 className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      <span aria-hidden className="h-7 w-1.5 rounded-full bg-[var(--dot)]" />
                      {CAT_I18N[c.slug][lang].name}
                    </h2>
                    <p className="mt-1 pl-[18px] text-sm text-slate-600 dark:text-slate-400">{CAT_I18N[c.slug][lang].desc}</p>
                  </div>
                  <span className="shrink-0 text-sm text-slate-500 dark:text-slate-400">{count(list.length)}</span>
                </div>
                {ci === 0 ? (
                  <div className="grid grid-flow-dense grid-cols-2 gap-3.5 md:grid-cols-3 lg:grid-cols-4">
                    {list.map((t, i) => (
                      <ToolTile key={t.id} featured={i === 0} name={t.name} slug={t.slug} description={t.description} iconName={t.icon} catSlug={c.slug} />
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-x-2 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 md:grid-cols-2">
                    {list.map((t) => (
                      <ToolRow key={t.id} name={t.name} slug={t.slug} description={t.description} iconName={t.icon} catSlug={c.slug} />
                    ))}
                  </div>
                )}
              </section>
            );
          })
        )}

        {!searching && (
          <section className="pb-4 pt-12" id="guides">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{ui.guides}</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{en ? "How calculations work, with examples" : "হিসাবের নিয়ম উদাহরণসহ"}</p>
              </div>
              <Link href="/guides" className="shrink-0 text-sm font-semibold text-indigo-700 hover:underline dark:text-indigo-300">{en ? "All guides" : "সব গাইড"}</Link>
            </div>
            <div className="grid gap-x-2 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 md:grid-cols-2">
              {guides.slice(0, HOME_GUIDES).map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="group flex min-h-[56px] items-center gap-3 rounded-2xl px-3.5 py-3 hover:bg-indigo-50 dark:hover:bg-slate-800">
                  <BookOpen aria-hidden className="h-5 w-5 shrink-0 text-indigo-500" />
                  <span className="text-[15px] font-semibold text-slate-900 dark:text-white">{en ? g.title[1] : g.title[0]}</span>
                </Link>
              ))}
            </div>
            {guides.length > HOME_GUIDES && (
              <Link href="/guides" className="mt-4 flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-indigo-200 bg-indigo-50 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-900 dark:bg-indigo-950/30 dark:text-indigo-300 dark:hover:bg-indigo-950/60">
                {en ? `View all ${guides.length} guides` : `সব ${toBnDigits(guides.length)}টি গাইড দেখুন`} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
