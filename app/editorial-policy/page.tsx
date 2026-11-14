import type { Metadata } from "next";
import Link from "next/link";
import T from "@/components/T";
import { CONTACT_EMAIL } from "@/lib/site";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Editorial and Accuracy Policy",
  description:
    "BD Tools Flow কীভাবে ক্যালকুলেটরের হিসাব, ফি ও রেট যাচাই করে, কত দিন পর আপডেট করে এবং ভুল পেলে কীভাবে জানাবেন।",
  alternates: { canonical: `${siteConfig.url}/editorial-policy` },
};

const sections: { h: [string, string]; p: [string, string][] }[] = [
  {
    h: ["আমরা কীভাবে তথ্য যাচাই করি", "How we check information"],
    p: [
      ["ফি, রেট, কর বা শুল্কের মতো তথ্য যথাসম্ভব সরকারি বা অফিসিয়াল সূত্র থেকে নেওয়া হয়। প্রতিটি টুলের পেজে যেখানে প্রযোজ্য, সূত্র ও তথ্যের তারিখ উল্লেখ থাকে।", "Fees, rates, taxes and similar figures are taken from official or government sources wherever possible. Where it applies, each tool page names the source and the date of the data."],
      ["হিসাবের সূত্র (ফর্মুলা) আমরা নিজেরা পরীক্ষা করি। তবু ফলাফল সবসময় আনুমানিক বলে ধরুন।", "We test the formulas ourselves. Even so, treat results as estimates."],
    ],
  },
  {
    h: ["আপডেট", "Updates"],
    p: [
      ["বিদ্যুৎ বিল, পাসপোর্ট ফি, আয়কর ও মোবাইল ব্যাংকিং চার্জের মতো তথ্য বদলালে আমরা টুল ও গাইড আপডেট করি। প্রতিটি গাইডে সর্বশেষ আপডেটের তারিখ দেওয়া থাকে।", "When figures such as electricity tariffs, passport fees, income tax rules or mobile banking charges change, we update the tools and guides. Each guide shows its last updated date."],
    ],
  },
  {
    h: ["আর্থিক ও ধর্মীয় বিষয়", "Financial and religious topics"],
    p: [
      ["কর, যাকাত, সঞ্চয় বা লোনের টুল সাধারণ তথ্যের জন্য, পেশাদার পরামর্শ নয়। সিদ্ধান্তের আগে হিসাবরক্ষক, ব্যাংক বা যোগ্য আলেমের পরামর্শ নিন।", "Tax, zakat, savings and loan tools are for general information, not professional advice. Check with an accountant, your bank or a qualified scholar before deciding."],
    ],
  },
  {
    h: ["ভুল পেলে জানান", "Report a mistake"],
    p: [
      ["কোনো হিসাব, ফি বা লেখায় ভুল পেলে ইমেইল করুন। আমরা যাচাই করে দ্রুত ঠিক করব।", "If you find a wrong calculation, fee or text, email us. We will verify and fix it quickly."],
    ],
  },
];

export default function Page() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Editorial and Accuracy Policy</h1>
      <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">
        {sections.map((s) => (
          <section key={s.h[1]}>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3"><T bn={s.h[0]} en={s.h[1]} /></h2>
            <div className="space-y-3">{s.p.map((x, i) => <p key={i}><T bn={x[0]} en={x[1]} /></p>)}</div>
          </section>
        ))}
        <p>
          <a className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline break-all" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          {" · "}
          <Link className="text-indigo-600 dark:text-indigo-400 hover:underline" href="/disclaimer"><T bn="ডিসক্লেইমার" en="Disclaimer" /></Link>
        </p>
      </div>
    </div>
  );
}
