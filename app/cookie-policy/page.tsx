import type { Metadata } from "next";
import Link from "next/link";
import T from "@/components/T";
import { CONTACT_EMAIL } from "@/lib/site";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "BD Tools Flow কুকি নীতি: কোন কুকি ব্যবহার হয়, Google Analytics ও AdSense কীভাবে কাজ করে এবং কীভাবে আপনি কুকি নিয়ন্ত্রণ করবেন।",
  alternates: { canonical: `${siteConfig.url}/cookie-policy` },
};

type Sec = { h: [string, string]; p: [string, string][] };

const sections: Sec[] = [
  {
    h: ["কুকি কী", "What are cookies"],
    p: [
      ["কুকি হলো ছোট টেক্সট ফাইল, যা আপনার ব্রাউজারে জমা হয়। এগুলো সাইটকে আপনার পছন্দ মনে রাখতে এবং ভিজিটর পরিসংখ্যান বুঝতে সাহায্য করে।", "Cookies are small text files stored in your browser. They help a site remember your choices and understand how it is used."],
    ],
  },
  {
    h: ["আমরা কোন কুকি ও স্টোরেজ ব্যবহার করি", "Cookies and storage we use"],
    p: [
      ["প্রয়োজনীয় স্টোরেজ: ভাষা, ডার্ক মোড এবং কুকি সম্মতির পছন্দ আপনার ব্রাউজারের localStorage-এ থাকে। Expense Tracker ও To-Do-এর ডেটাও শুধু আপনার ডিভাইসে থাকে, আমাদের সার্ভারে যায় না।", "Essential storage: your language, dark mode and cookie choice are kept in your browser's localStorage. Expense Tracker and To-Do data also stay only on your device and are not sent to our servers."],
      ["Google Analytics (GA4): কতজন ভিজিটর আসে ও কোন পেজ দেখে তা বুঝতে অজ্ঞাতনামা পরিসংখ্যান সংগ্রহ করে।", "Google Analytics (GA4): collects anonymous statistics about how many visitors come and which pages they view."],
      ["Google AdSense: বিজ্ঞাপন দেখাতে Google ও তার বিজ্ঞাপন অংশীদাররা কুকি ব্যবহার করতে পারে। এর মধ্যে আগের ভিজিটের ভিত্তিতে ব্যক্তিগতকৃত বিজ্ঞাপনও থাকতে পারে।", "Google AdSense: Google and its ad partners may use cookies to show ads, including personalised ads based on your earlier visits."],
    ],
  },
  {
    h: ["আপনার পছন্দ ও নিয়ন্ত্রণ", "Your choices"],
    p: [
      ["ইউরোপীয় ইউনিয়ন, যুক্তরাজ্য ও সুইজারল্যান্ডের ভিজিটরদের ক্ষেত্রে আপনি গ্রহণ না করা পর্যন্ত Analytics ও বিজ্ঞাপন-সংক্রান্ত কুকি বন্ধ থাকে। অন্য দেশে ব্যানারে প্রত্যাখ্যান করলে আমরা সেই পছন্দ মেনে চলি।", "For visitors in the EU, UK and Switzerland, analytics and advertising cookies stay off until you accept. Elsewhere, if you decline in the banner, we respect that choice."],
      ["পছন্দ বদলাতে আপনার ব্রাউজারের সাইট ডেটা মুছে দিন, তাহলে ব্যানার আবার দেখা যাবে। আপনি ব্রাউজার সেটিংস থেকেও কুকি বন্ধ বা মুছতে পারেন।", "To change your choice, clear this site's data in your browser and the banner will appear again. You can also block or delete cookies in your browser settings."],
    ],
  },
];

export default function Page() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Cookie Policy</h1>
      <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">
        {sections.map((s) => (
          <section key={s.h[1]}>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3"><T bn={s.h[0]} en={s.h[1]} /></h2>
            <div className="space-y-3">
              {s.p.map((x, i) => (
                <p key={i}><T bn={x[0]} en={x[1]} /></p>
              ))}
            </div>
          </section>
        ))}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3"><T bn="আরও জানুন" en="Learn more" /></h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><a className="text-indigo-600 dark:text-indigo-400 hover:underline" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer"><T bn="Google কীভাবে পার্টনার সাইটের ডেটা ব্যবহার করে" en="How Google uses data from partner sites" /></a></li>
            <li><a className="text-indigo-600 dark:text-indigo-400 hover:underline" href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a></li>
            <li><Link className="text-indigo-600 dark:text-indigo-400 hover:underline" href="/privacy-policy"><T bn="গোপনীয়তা নীতি" en="Privacy Policy" /></Link></li>
          </ul>
          <p className="mt-4"><T bn="প্রশ্ন থাকলে লিখুন: " en="Questions? Email: " /><a className="text-indigo-600 dark:text-indigo-400 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        </section>
      </div>
    </div>
  );
}
