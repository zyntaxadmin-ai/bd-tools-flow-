"use client";
import ToolCard from "@/components/ToolCard";
import { tools, categories } from "@/data/tools";
import { CAT_I18N } from "@/lib/i18nData";
import { CATEGORY_CONTENT } from "@/lib/categoryContent";
import { GUIDES } from "@/lib/guides";
import Link from "next/link";
import { useLang } from "@/lib/lang";

export default function CategoryContent({ slug }: { slug: string }) {
  const { lang } = useLang();
  const c = categories.find((x) => x.slug === slug);
  if (!c) return null;
  const i = lang === "en" ? 1 : 0;
  const label = CAT_I18N[slug][lang];
  const list = tools.filter((t) => t.category === c.name);
  const content = CATEGORY_CONTENT[slug];
  const slugs = new Set(list.map((t) => t.slug.replace("/tool/", "")));
  const guides = GUIDES.filter((g) => slugs.has(g.tool.slug));
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{label.name}</h1>
      <p className="text-slate-500 mt-1 mb-4">{label.desc}</p>
      {content && (
        <div className="max-w-[820px] space-y-3 text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
          {content.intro.map((p, k) => <p key={k}>{p[i]}</p>)}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map((t) => <ToolCard key={t.id} name={t.name} slug={t.slug} description={t.description} iconName={t.icon} />)}
      </div>

      {content && (
        <div className="max-w-[820px] mt-12 space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{lang === "en" ? "Which tool helps when" : "কখন কোন টুল কাজে লাগে"}</h2>
            <div className="space-y-5">
              {content.when.map((w, k) => (
                <div key={k}>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{w.h[i]}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{w.p[i]}</p>
                </div>
              ))}
            </div>
          </section>

          {guides.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{lang === "en" ? "Related guides" : "সম্পর্কিত গাইড"}</h2>
              <ul className="space-y-2">
                {guides.map((g) => (
                  <li key={g.slug}><Link href={`/guides/${g.slug}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">{g.title[i]}</Link></li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{lang === "en" ? "Common questions" : "সাধারণ জিজ্ঞাসা"}</h2>
            <div className="space-y-4">
              {content.faqs.map((f, k) => (
                <div key={k}>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{f.q[i]}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{f.a[i]}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
