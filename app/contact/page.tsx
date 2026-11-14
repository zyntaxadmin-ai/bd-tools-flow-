import type { Metadata } from "next";
import T from "@/components/T";
import { Mail, Bug, Lightbulb, BadgeCheck, Handshake } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "BD Tools Flow-এর সঙ্গে ইমেইলে যোগাযোগ করুন: টুলের সমস্যা, ভুল রেট বা ফি জানান, নতুন টুলের পরামর্শ দিন। Contact BD Tools Flow by email.",
  alternates: { canonical: `${siteConfig.url}/contact` },
};

const topics = [
  { Icon: Bug, subject: "Problem report", bn: ["সমস্যা জানান", "কোনো টুল ঠিকমতো কাজ না করলে জানান।"], en: ["Report a problem", "Tell us if a tool is not working properly."] },
  { Icon: BadgeCheck, subject: "Wrong rate or fee", bn: ["ভুল হিসাব বা রেট", "ফি, রেট বা ফর্মুলায় ভুল পেলে সূত্রসহ জানান।"], en: ["Wrong rate or fee", "Found a mistake in a fee, rate or formula? Send us the source."] },
  { Icon: Lightbulb, subject: "Tool suggestion", bn: ["নতুন টুলের আইডিয়া", "কোন টুল দরকার, লিখে জানান।"], en: ["Suggest a tool", "Tell us which tool you need."] },
  { Icon: Handshake, subject: "Business or partnership", bn: ["ব্যবসা ও সহযোগিতা", "বিজ্ঞাপন বা অংশীদারিত্ব নিয়ে লিখুন।"], en: ["Business and partnerships", "Write to us about ads or partnerships."] },
];

export default function Page() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Contact Us</h1>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
        <T
          bn="BD Tools Flow সম্পর্কে প্রশ্ন, পরামর্শ বা সমস্যা থাকলে ইমেইলে লিখুন। আমরা সব মেসেজ পড়ি এবং যথাসম্ভব দ্রুত উত্তর দেওয়ার চেষ্টা করি।"
          en="If you have a question, suggestion or problem about BD Tools Flow, email us. We read every message and try to reply as soon as we can."
        />
      </p>

      <section className="rounded-2xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/30 p-6 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center mb-3">
          <Mail className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">Email</h2>
        <a href={`mailto:${CONTACT_EMAIL}`} className="break-all text-lg font-semibold text-indigo-700 dark:text-indigo-300 hover:underline">
          {CONTACT_EMAIL}
        </a>
        <div className="mt-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700"
          >
            <T bn="ইমেইল পাঠান" en="Send an email" />
          </a>
        </div>
      </section>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-10 mb-4"><T bn="কী নিয়ে লিখবেন?" en="What would you like to write about?" /></h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {topics.map(({ Icon, subject, bn, en }) => (
          <a
            key={subject}
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("BD Tools Flow - " + subject)}`}
            className="flex gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 hover:border-indigo-400 transition-colors"
          >
            <Icon className="w-5 h-5 mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
            <span>
              <span className="block font-semibold text-slate-900 dark:text-white"><T bn={bn[0]} en={en[0]} /></span>
              <span className="block text-sm text-slate-600 dark:text-slate-400 mt-0.5"><T bn={bn[1]} en={en[1]} /></span>
            </span>
          </a>
        ))}
      </div>

      <section className="mt-10 rounded-xl bg-slate-100 dark:bg-slate-800/60 p-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-2"><T bn="দ্রুত সমাধানের জন্য ইমেইলে যা লিখবেন" en="To get help faster, include" /></h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><T bn="টুলের নাম বা পেজের লিংক" en="The tool name or page link" /></li>
          <li><T bn="কী লিখেছিলেন (যেমন টাকার পরিমাণ) এবং কী ফল পেয়েছেন" en="What you entered (for example the amount) and the result you got" /></li>
          <li><T bn="আপনার ফোন বা ব্রাউজারের নাম (যেমন Chrome, Android)" en="Your phone or browser (for example Chrome, Android)" /></li>
        </ul>
        <p className="mt-3">
          <T bn="পাসওয়ার্ড, OTP বা ব্যাংক/মোবাইল ব্যাংকিং তথ্য কখনো পাঠাবেন না।" en="Never send passwords, OTPs or bank or mobile banking details." />
        </p>
      </section>
    </div>
  );
}
