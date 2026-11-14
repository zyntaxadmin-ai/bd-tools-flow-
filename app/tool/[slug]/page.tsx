import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolLayout from "@/components/ToolLayout";
import JsonLd from "@/components/JsonLd";
import { TOOL_REGISTRY } from "@/components/toolRegistry";
import { tools, categories } from "@/data/tools";
import { siteConfig } from "@/lib/seo";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { LIVE_SLUGS } from "@/lib/live";
import { SEO_META } from "@/lib/seoMeta";
import { TOOL_EN } from "@/lib/toolContentEn";
import { TOOL_ARTICLES } from "@/lib/toolArticles";

export function generateStaticParams() {
  return LIVE_SLUGS.map((slug) => ({ slug }));
}

// Tools that are not live return a real 404 (not a thin "coming soon" page), so they never get indexed.
export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = tools.find((t) => t.slug === `/tool/${params.slug}`);
  if (!tool || !LIVE_SLUGS.includes(params.slug)) return {};
  const entry = TOOL_REGISTRY[params.slug];
  const seo = SEO_META[params.slug];
  const title = seo ? seo.title : `${tool.name} - Free Online Tool`;
  const description = seo ? seo.description : (entry ? entry.desc : tool.description).slice(0, 155);
  const canonical = `${siteConfig.url}/tool/${params.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: siteConfig.name, type: "website", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = tools.find((t) => t.slug === `/tool/${params.slug}`);
  if (!tool) return notFound();
  const entry = TOOL_REGISTRY[params.slug];

  if (!entry || !LIVE_SLUGS.includes(params.slug)) return notFound();

  const cat = categories.find((c) => c.name === tool.category)!;
  const Component = entry.component;
  return (
    <>
      <JsonLd toolName={entry.title} description={entry.desc} url={`${siteConfig.url}/tool/${params.slug}`} faqs={entry.faqs} categoryName={cat.name} categoryUrl={`${siteConfig.url}/category/${cat.slug}`} />
      <ToolLayout title={entry.title} description={entry.desc} category={tool.category} categorySlug={cat.slug} slug={tool.slug} howToSteps={entry.howTo} faqs={entry.faqs} enContent={TOOL_EN[params.slug]} articles={TOOL_ARTICLES[params.slug]}>
        <Component />
        {GUIDES.filter((g) => g.tool.slug === params.slug).map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="mt-6 block rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-sm hover:border-indigo-400 transition">
            <span className="text-slate-500">গাইড / Guide: </span><span className="font-semibold text-indigo-600 dark:text-indigo-400">{g.title[0]}</span>
          </Link>
        ))}
      </ToolLayout>
    </>
  );
}
