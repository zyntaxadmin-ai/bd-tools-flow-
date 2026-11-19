"use client";
import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/lang";
import { DESC_EN } from "@/lib/i18nData";

// catSlug picks the category colour (see .cat-* in globals.css).
type Base = { name: string; slug: string; description: string; iconName: string; catSlug: string };

function useParts(p: Base) {
  const { lang } = useLang();
  const Icon = ((Icons as any)[p.iconName] || Icons.Calculator) as React.ComponentType<{ className?: string }>;
  const desc = lang === "en" ? DESC_EN[p.slug.replace("/tool/", "")] ?? p.description : p.description;
  return { Icon, desc, lang };
}

// Coloured tile. `featured` makes the first tool of a category large.
export function ToolTile({ featured, ...p }: Base & { featured?: boolean }) {
  const { Icon, desc, lang } = useParts(p);
  return (
    <Link
      href={p.slug}
      className={`cat-${p.catSlug} group relative flex flex-col rounded-3xl bg-[var(--t)] ring-1 ring-inset ring-black/[0.04] dark:ring-white/10 transition-shadow hover:shadow-lg ${
        featured ? "col-span-2 min-h-[190px] justify-between p-6 sm:p-7 lg:row-span-2" : "min-h-[150px] justify-start p-4 sm:p-5"
      }`}
    >
      <span className={`grid place-items-center bg-white dark:bg-white/10 text-[var(--c)] shadow-sm ${featured ? "h-14 w-14 rounded-2xl" : "h-11 w-11 rounded-2xl"}`}>
        <Icon className={featured ? "h-7 w-7" : "h-5 w-5"} />
      </span>
      {!featured && (
        <span aria-hidden className="absolute right-3.5 top-3.5 grid h-8 w-8 place-items-center rounded-full bg-white/70 dark:bg-white/10 text-[var(--c)] transition-colors group-hover:bg-[var(--c)] group-hover:text-white dark:group-hover:text-slate-900">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      )}
      <span className="mt-5 block">
        <h3 className={`font-bold text-slate-900 dark:text-white leading-snug ${featured ? "font-display text-2xl sm:text-3xl" : "text-base"}`}>{p.name}</h3>
        <span className={`mt-1 block text-slate-600 dark:text-slate-300 ${featured ? "max-w-md text-base leading-relaxed" : "line-clamp-2 text-[13.5px] leading-snug"}`}>{desc}</span>
        {featured && (
          <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-[var(--c)]">
            {lang === "en" ? "Open" : "খুলুন"} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        )}
      </span>
    </Link>
  );
}

// Quiet list row, used for the other categories and for search results.
export function ToolRow(p: Base) {
  const { Icon, desc } = useParts(p);
  return (
    <Link href={p.slug} className={`cat-${p.catSlug} group flex min-h-[64px] items-center gap-3.5 rounded-2xl px-3.5 py-3 transition-colors hover:bg-[var(--t)]`}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--t)] text-[var(--c)] transition-colors group-hover:bg-white dark:group-hover:bg-white/10">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold text-slate-900 dark:text-white">{p.name}</span>
        <span className="block line-clamp-2 text-[13px] leading-snug text-slate-600 dark:text-slate-400">{desc}</span>
      </span>
      <ArrowUpRight aria-hidden className="ml-auto h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600 transition-colors group-hover:text-[var(--c)]" />
    </Link>
  );
}
