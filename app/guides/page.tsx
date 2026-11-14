import type { Metadata } from "next";
import Link from "next/link";
import T from "@/components/T";
import GuidesList, { type GuideItem } from "@/components/GuidesList";
import { tools, categories } from "@/data/tools";
import { GUIDES } from "@/lib/guides";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "গাইড ও নিয়ম - Guides",
  description: "ক্যাশ আউট চার্জ, GPA, আয়কর, বিদ্যুৎ বিলসহ নানা হিসাব কীভাবে করবেন, উদাহরণসহ সহজ বাংলা গাইড। BD Tools Flow।",
  alternates: { canonical: `${siteConfig.url}/guides` },
};

export default function Page() {
  // Each guide goes under the category of the tool it is linked to.
  const items: GuideItem[] = GUIDES.map((g) => {
    const tool = tools.find((t) => t.slug === `/tool/${g.tool.slug}`);
    const cat = categories.find((c) => c.name === tool?.category);
    return { slug: g.slug, title: g.title, desc: g.desc, updatedLabel: g.updatedLabel, category: cat ? cat.slug : categories[0].slug };
  });
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3"><T bn="গাইড" en="Guides" /></h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8"><T bn="হিসাব-নিকাশের নিয়ম উদাহরণসহ সহজ ভাষায়। প্রতিটি গাইডের সঙ্গে সংশ্লিষ্ট ফ্রি টুলের লিংক আছে।" en="How calculations work, in simple language with examples. Each guide links to the matching free tool." /></p>
      <GuidesList guides={items} order={categories.map((c) => c.slug)} />
    </div>
  );
}
