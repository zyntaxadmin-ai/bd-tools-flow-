import type { Metadata } from "next";
import T from "@/components/T";
import { CONTACT_EMAIL } from "@/lib/site";
import { siteConfig } from "@/lib/seo";
import { LIVE_SLUGS } from "@/lib/live";
import { GUIDES } from "@/lib/guides";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Md Rohan Islam",
  description:
    "Md Rohan Islam, founder and developer of BD Tools Flow. Discover free online calculators, educational tools and everyday utilities for Bangladesh.",
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function Page() {
  const stats: { n: string; bn: string; en: string }[] = [
    { n: String(LIVE_SLUGS.length), bn: "ফ্রি টুল", en: "free tools" },
    { n: String(GUIDES.length), bn: "গাইড", en: "guides" },
    { n: "0৳", bn: "কোনো খরচ নেই", en: "no cost" },
    { n: "0", bn: "সাইনআপ লাগে না", en: "signup needed" },
  ];
  const values: { bn: [string, string]; en: [string, string] }[] = [
    { bn: ["দ্রুত ও সহজ", "মোবাইলে ব্যবহার উপযোগী, হালকা পেজ, কোনো ঝামেলা নেই।"], en: ["Fast and simple", "Mobile-friendly, light pages, no hassle."] },
    { bn: ["গোপনীয়তা আগে", "বেশিরভাগ টুল আপনার ব্রাউজারেই চলে। ফাইল আপলোড হয় না।"], en: ["Privacy first", "Most tools run in your browser. Your files are not uploaded."] },
    { bn: ["বাংলাদেশের জন্য", "বিকাশ, নগদ, জমি, বিদ্যুৎ বিল, পাসপোর্ট ফি ও যাকাতের মতো স্থানীয় হিসাব।", ], en: ["Made for Bangladesh", "Local calculations like bKash, Nagad, land, electricity bills, passport fees and zakat."] },
  ];
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">About BD Tools Flow</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {stats.map((x) => (
          <div key={x.en} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center">
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{x.n}</p>
            <p className="text-xs mt-1 text-slate-600 dark:text-slate-400"><T bn={x.bn} en={x.en} /></p>
          </div>
        ))}
      </div>

      <div className="space-y-5 text-slate-600 dark:text-slate-400 leading-relaxed">
        <p>
          <T
            bn="BD Tools Flow বাংলাদেশের শিক্ষার্থী, চাকরিপ্রার্থী, পেশাজীবী এবং সাধারণ মানুষের দৈনন্দিন হিসাব ও অনলাইন কাজ সহজ করার জন্য তৈরি একটি বিনামূল্যের অনলাইন টুলস প্ল্যাটফর্ম।"
            en="BD Tools Flow is a free online tools platform built to make everyday calculations and online tasks easier for students, job seekers, professionals and ordinary people in Bangladesh."
          />
        </p>

        <section className="rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Md Rohan Islam</h2>
          <p className="font-medium text-indigo-600 dark:text-indigo-400 mb-3">Founder &amp; Developer</p>
          <p>
            <T
              bn="আমি BD Tools Flow-এর প্রতিষ্ঠাতা ও ডেভেলপার। আমার লক্ষ্য হলো বাংলাদেশের মানুষের জন্য বিনামূল্যে, সহজে ব্যবহারযোগ্য এবং কার্যকর ওয়েব টুল তৈরি করা।"
              en="I am the founder and developer of BD Tools Flow. My goal is to build free, easy-to-use and effective web tools for the people of Bangladesh."
            />
          </p>
          <p className="mt-3">
            <T
              bn="এখানে ক্যালকুলেটর, শিক্ষাসংক্রান্ত টুল, আর্থিক হিসাব এবং প্রয়োজনীয় অনলাইন ইউটিলিটি এক জায়গায় তুলে ধরার চেষ্টা করছি। ব্যবহারকারীদের সময় বাঁচানো, সঠিক ফলাফল পেতে সহায়তা করা এবং সহজ ডিজিটাল অভিজ্ঞতা নিশ্চিত করাই আমার প্রধান উদ্দেশ্য।"
              en="I am trying to bring calculators, educational tools, financial calculations and essential online utilities together in one place. My main aim is to save users' time, help them get accurate results and give them a simple digital experience."
            />
          </p>
        </section>

        <section className="grid sm:grid-cols-3 gap-3">
          {values.map((v) => (
            <div key={v.en[0]} className="rounded-xl bg-slate-100 dark:bg-slate-800/60 p-4">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1"><T bn={v.bn[0]} en={v.en[0]} /></h3>
              <p className="text-sm"><T bn={v.bn[1]} en={v.en[1]} /></p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Our Mission</h2>
          <p>
            <T
              bn="আমাদের লক্ষ্য প্রয়োজনীয় অনলাইন টুলগুলো সহজে ব্যবহারযোগ্য করে তোলা। প্রতিটি টুলের ফলাফল ব্যবহার করার আগে প্রাসঙ্গিক সূত্র, শর্ত ও সীমাবদ্ধতা যাচাই করার পরামর্শ দেওয়া হয়।"
              en="Our goal is to make essential online tools easy to use. Before using the result of any tool, we advise you to check the relevant sources, conditions and limitations."
            />
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Contact</h2>
          <p>
            <T bn="কোনো প্রশ্ন, পরামর্শ বা সমস্যা জানাতে ইমেইল করুন:" en="For any question, suggestion or problem, email us:" />
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-block mt-2 text-indigo-600 dark:text-indigo-400 font-medium hover:underline break-all"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="mt-3 text-sm">
            <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline"><T bn="যোগাযোগ পেজ →" en="Contact page →" /></Link>
            {" · "}
            <Link href="/editorial-policy" className="text-indigo-600 dark:text-indigo-400 hover:underline"><T bn="সম্পাদকীয় নীতি →" en="Editorial policy →" /></Link>
          </p>
        </section>
      </div>
    </div>
  );
}
