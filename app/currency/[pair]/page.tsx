import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ToolLayout from "@/components/ToolLayout";
import JsonLd from "@/components/JsonLd";
import BdtCurrencyConverter from "@/components/tools/BdtCurrencyConverter";
import { siteConfig } from "@/lib/seo";
import { loadRates, rateOf } from "@/lib/currencyData";
import { PAIRS, findPair, pairContent } from "@/lib/currencyPairs";

// Rates are fetched on the server and cached for an hour, so the page HTML already holds today's numbers.
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return PAIRS.map((p) => ({ pair: p.slug }));
}

export function generateMetadata({ params }: { params: { pair: string } }): Metadata {
  const pair = findPair(params.pair);
  if (!pair) return {};
  const c = pairContent(pair, null, null);
  const canonical = `${siteConfig.url}/currency/${pair.slug}`;
  return {
    title: c.seoTitle,
    description: c.seoDesc,
    alternates: { canonical },
    openGraph: { title: c.seoTitle, description: c.seoDesc, url: canonical, siteName: siteConfig.name, type: "website", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }] },
    twitter: { card: "summary_large_image", title: c.seoTitle, description: c.seoDesc, images: ["/og-image.png"] },
  };
}

export default async function CurrencyPairPage({ params }: { params: { pair: string } }) {
  const pair = findPair(params.pair);
  if (!pair) return notFound();
  let data = null;
  try { data = await loadRates({ next: { revalidate: 3600 } }); } catch { data = null; }
  const r = rateOf(data, pair.from, pair.to);
  const c = pairContent(pair, isFinite(r) ? r : null, data?.date || null);
  return (
    <>
      <JsonLd toolName={c.title} description={c.desc} url={`${siteConfig.url}/currency/${pair.slug}`} faqs={c.faqs} />
      <ToolLayout title={c.title} description={c.desc} category="Bangladesh Special" categorySlug="bangladesh-special" slug={`/currency/${pair.slug}`} howToSteps={c.howTo} faqs={c.faqs} enContent={c.en} articles={c.articles}>
        <BdtCurrencyConverter initial={data ?? undefined} initialFrom={pair.from} initialTo={pair.to} />
        <Link href="/tool/bdt-currency-converter" className="mt-6 block rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-sm hover:border-indigo-400 transition">
          <span className="text-slate-500">সব মুদ্রা / All currencies: </span><span className="font-semibold text-indigo-600 dark:text-indigo-400">BDT Currency Converter</span>
        </Link>
      </ToolLayout>
    </>
  );
}
