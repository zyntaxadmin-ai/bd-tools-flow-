import { siteConfig } from "@/lib/seo";

interface Props {
  toolName: string;
  description: string;
  url: string;
  faqs: { q: string; a: string }[];
  categoryName?: string;
  categoryUrl?: string;
}

export default function JsonLd({ toolName, description, url, faqs, categoryName, categoryUrl }: Props) {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: toolName,
    description,
    url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript",
    inLanguage: ["bn", "en"],
    isAccessibleForFree: true,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    offers: { "@type": "Offer", price: "0", priceCurrency: "BDT" },
  };
  const crumbs = [
    { name: "Home", item: `${siteConfig.url}/` },
    ...(categoryName && categoryUrl ? [{ name: categoryName, item: categoryUrl }] : []),
    { name: toolName, item: url },
  ];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
    </>
  );
}
