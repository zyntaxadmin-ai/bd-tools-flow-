"use client";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import ToolCard from "./ToolCard";
import AdSlot from "./AdSlot";
import SourceNote from "./SourceNote";
import { tools } from "@/data/tools";
import { LIVE_SLUGS } from "@/lib/live";
import { preferredRelated } from "@/lib/relatedTools";
import type { TOOL_EN } from "@/lib/toolContentEn";
import type { TOOL_ARTICLES } from "@/lib/toolArticles";
import { CAT_I18N } from "@/lib/i18nData";
import { useLang, useUI } from "@/lib/lang";

interface ToolLayoutProps {
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  slug: string;
  children: React.ReactNode;
  howToSteps: string[];
  faqs: { q: string; a: string }[];
  // Only this tool's English text and article are passed in (not every tool's), to keep the page JS small.
  enContent?: (typeof TOOL_EN)[string];
  articles?: (typeof TOOL_ARTICLES)[string];
}

export default function ToolLayout({ title, description, category, categorySlug, slug, children, howToSteps, faqs, enContent, articles }: ToolLayoutProps) {
  const { lang } = useLang();
  const ui = useUI();
  const en = lang === "en" ? enContent : undefined;
  const t = en ? en.title : title;
  const d = en ? en.desc : description;
  const steps = en ? en.howTo : howToSteps;
  const questions = en ? en.faqs : faqs;
  const article = articles?.[lang === "en" ? "en" : "bn"];
  const catLabel = CAT_I18N[categorySlug]?.[lang].name ?? category;

  const isLive = (x: (typeof tools)[number]) => LIVE_SLUGS.includes(x.slug.replace("/tool/", ""));
  const preferred = preferredRelated(slug)
    .map((s) => tools.find((x) => x.slug === `/tool/${s}`))
    .filter((x): x is (typeof tools)[number] => !!x && isLive(x));
  const sameCategory = tools.filter((x) => x.category === category && x.slug !== slug && isLive(x) && !preferred.includes(x));
  const related = [...preferred, ...sameCategory].slice(0, 4);

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-[13px] text-slate-500 dark:text-slate-400 whitespace-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <li className="shrink-0">
            <Link href="/" aria-label={ui.home} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:text-indigo-600">
              <Home className="w-4 h-4" />
            </Link>
          </li>
          <li aria-hidden="true" className="shrink-0 text-slate-400">/</li>
          <li className="shrink-0">
            <Link href={`/category/${categorySlug}`} className="inline-flex items-center h-8 px-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:text-indigo-600">{catLabel}</Link>
          </li>
          <li aria-hidden="true" className="shrink-0 text-slate-400">/</li>
          <li aria-current="page" className="min-w-0 truncate font-medium text-slate-900 dark:text-white">{t}</li>
        </ol>
      </nav>

      <div className="text-center mb-6">
        <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight text-slate-900 dark:text-white">{t}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-[15px] leading-relaxed">{d}</p>
      </div>

      <AdSlot label="Advertisement" />

      <div className="mt-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 md:p-8">{children}</div>

      <SourceNote slug={slug.replace("/tool/", "")} />

      <div className="mt-6"><AdSlot label="Advertisement" /></div>

      {article && (
        <div className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6">
          {article.map((sec) => (
            <section key={sec.h}>
              <h2 className="font-semibold text-slate-900 dark:text-white mb-3">{sec.h}</h2>
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 leading-7">
                {sec.p.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </section>
          ))}
        </div>
      )}

      <div className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">{ui.howTo(t)}</h2>
        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">{ui.faq}</h2>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {questions.map((f, i) => (
            <details key={i} className="py-3 group">
              <summary className="flex justify-between items-center cursor-pointer list-none text-sm font-medium text-slate-900 dark:text-white">
                {f.q}
                <ChevronRight className="w-4 h-4 text-slate-500 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">{ui.related}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((x) => (
              <ToolCard key={x.id} name={x.name} slug={x.slug} description={x.description} iconName={x.icon} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
