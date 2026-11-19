"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Mail, Zap, ShieldCheck, Users, Sparkles } from "lucide-react";
import { categories, tools } from "@/data/tools";
import { CAT_I18N } from "@/lib/i18nData";
import { useLang, useUI } from "@/lib/lang";
import { CONTACT_EMAIL, toBnDigits } from "@/lib/site";
import AdSlot from "./AdSlot";
import T from "./T";

const FEATURE_ICONS = [Zap, ShieldCheck, Users, Sparkles];

const POPULAR: { name: string; href: string; wide?: boolean }[] = [
  { name: "bKash Calculator", href: "/tool/bkash-calculator" },
  { name: "Age Calculator", href: "/tool/age-calculator" },
  { name: "GPA Calculator", href: "/tool/gpa-calculator-bd" },
  { name: "Land Calculator", href: "/tool/land-calculator-bd" },
  { name: "Income Tax Calculator", href: "/tool/income-tax-calculator-bd" },
  { name: "Word Counter", href: "/tool/word-counter", wide: true },
];

const linkCls =
  "flex min-h-[32px] items-center text-[14px] sm:min-h-[36px] sm:text-[14.5px] text-slate-600 dark:text-slate-400 underline-offset-4 hover:text-indigo-700 hover:underline dark:hover:text-indigo-300";
const titleCls = "mb-1.5 text-sm sm:mb-3 font-semibold text-slate-900 dark:text-white";

export default function Footer() {
  const { lang } = useLang();
  const ui = useUI();
  const en = lang === "en";

  const toTop = () => {
    const calm = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
  };

  return (
    <footer className="mt-8 bg-white dark:bg-slate-950 sm:mt-16 lg:mt-20">
      <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-indigo-300/70 to-transparent dark:via-indigo-500/40" />
      <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/logo.svg" alt="" width={40} height={40} unoptimized className="h-10 w-10" />
              <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">BD Tools Flow</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:mt-4 sm:text-[15px]">
              {ui.footerTag}
            </p>
            <p className="mt-2 hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
              {en ? `${tools.length} free tools, made for Bangladesh.` : `${toBnDigits(tools.length)}টি ফ্রি টুল, বাংলাদেশের জন্য।`}
            </p>
            <ul className="mt-5 hidden max-w-sm grid-cols-2 gap-x-4 gap-y-2.5 sm:grid">
              {ui.features.map((f, i) => {
                const Icon = FEATURE_ICONS[i];
                return (
                  <li key={f.title} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Icon className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" aria-hidden />
                    {f.title}
                  </li>
                );
              })}
            </ul>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-6 hidden min-h-[44px] items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 text-sm font-semibold text-indigo-800 sm:inline-flex hover:bg-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-indigo-200 dark:hover:bg-slate-800"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* Links */}
          <nav aria-label={en ? "Footer" : "ফুটার"} className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-y-9 lg:col-span-8">
            <div>
              <h2 className={titleCls}>{ui.categories}</h2>
              <ul>
                {categories.map((c) => (
                  <li key={c.slug} className={`cat-${c.slug}`}>
                    <Link href={`/category/${c.slug}`} className={`${linkCls} gap-2.5`}>
                      <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-[var(--dot)]" />
                      {CAT_I18N[c.slug][lang].name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={titleCls}>{ui.popular}</h2>
              <ul>
                {POPULAR.map((p) => (
                  <li key={p.href} className={p.wide ? "hidden sm:block" : undefined}><Link href={p.href} className={linkCls}>{p.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={titleCls}><T bn="সাইট সম্পর্কে" en="About the site" /></h2>
              <ul>
                <li><Link href="/about" className={linkCls}>{ui.about}</Link></li>
                <li><Link href="/contact" className={linkCls}>{ui.contact}</Link></li>
                <li><Link href="/guides" className={linkCls}>{ui.guides}</Link></li>
                <li><Link href="/editorial-policy" className={linkCls}><T bn="সম্পাদকীয় নীতি" en="Editorial Policy" /></Link></li>
              </ul>
            </div>
            <div>
              <h2 className={titleCls}>{ui.legal}</h2>
              <ul>
                <li><Link href="/privacy-policy" className={linkCls}>{ui.privacy}</Link></li>
                <li><Link href="/cookie-policy" className={linkCls}><T bn="কুকি নীতি" en="Cookie Policy" /></Link></li>
                <li><Link href="/terms" className={linkCls}>{ui.terms}</Link></li>
                <li><Link href="/disclaimer" className={linkCls}>{ui.disclaimer}</Link></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-6 sm:mt-10"><AdSlot label="Advertisement" /></div>

        {/* Bottom bar */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200 pt-4 text-[13px] text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:mt-12 sm:pt-6 sm:text-sm">
          <div className="flex flex-col gap-0.5 sm:flex-1 sm:flex-row sm:items-center sm:justify-between sm:pr-4">
            <p>
              © {new Date().getFullYear()} BD Tools Flow. {ui.rights}
            </p>
            <p>
              Developed by <span className="font-semibold text-slate-900 dark:text-white">Rohan</span>
            </p>
          </div>
          <button
            type="button"
            onClick={toTop}
            aria-label={en ? "Back to top" : "ওপরে যান"}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-indigo-300 sm:h-11 sm:w-11"
          >
            <ArrowUp className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
