import { CURRENCIES, fmt } from "@/lib/currencyData";

export type Pair = { slug: string; from: string; to: string };

// Pages live at /currency/<slug>. Add a pair here and it appears in the sitemap automatically.
const X_TO_BDT = ["usd", "sar", "aed", "myr", "gbp", "eur", "inr", "qar", "kwd", "omr"];
const BDT_TO_X = ["usd", "inr", "sar", "aed"];
export const PAIRS: Pair[] = [
  ...X_TO_BDT.map((c) => ({ slug: `${c}-to-bdt`, from: c, to: "bdt" })),
  ...BDT_TO_X.map((c) => ({ slug: `bdt-to-${c}`, from: "bdt", to: c })),
];
export const findPair = (slug: string) => PAIRS.find((p) => p.slug === slug);

type Bi = { bn: string; en: string };
const CONTEXT: Record<string, Bi> = {
  usd: { bn: "ডলারের রেট দেখেন আমদানি-রপ্তানি, অনলাইন পেমেন্ট, ফ্রিল্যান্স আয় ও বিদেশে পড়াশোনার খরচের হিসাবে।", en: "People check the dollar rate for imports and exports, online payments, freelance income and the cost of studying abroad." },
  sar: { bn: "সৌদি আরবে কর্মরত অনেক বাংলাদেশি দেশে টাকা পাঠানোর আগে রিয়ালের রেট দেখে নেন।", en: "Many Bangladeshis working in Saudi Arabia check the riyal rate before sending money home." },
  aed: { bn: "সংযুক্ত আরব আমিরাতে কর্মরতরা বেতন বা সঞ্চয় দেশে পাঠানোর আগে দিরহামের রেট দেখেন।", en: "People working in the UAE check the dirham rate before sending salary or savings home." },
  myr: { bn: "মালয়েশিয়ায় কর্মরত বা পড়াশোনারত বাংলাদেশিরা রিংগিতের রেট দেখে দেশে টাকা পাঠান।", en: "Bangladeshis working or studying in Malaysia check the ringgit rate before sending money home." },
  gbp: { bn: "যুক্তরাজ্য প্রবাসী ও ইউকে-তে পড়াশোনার পরিকল্পনাকারীরা পাউন্ডের রেট দেখেন।", en: "Bangladeshis in the UK and people planning to study there check the pound rate." },
  eur: { bn: "ইউরোপে যাতায়াত, পড়াশোনা বা কাজের খরচ ধরার জন্য ইউরোর রেট দেখা হয়।", en: "The euro rate is checked to budget for travel, study or work in Europe." },
  inr: { bn: "ভারতে চিকিৎসা, ভ্রমণ বা ভিসা খরচের হিসাবে রুপির রেট দেখা হয়।", en: "The rupee rate is checked for medical trips, travel and visa costs in India." },
  qar: { bn: "কাতারে কর্মরত বাংলাদেশিরা দেশে টাকা পাঠানোর আগে কাতারি রিয়ালের রেট দেখেন।", en: "Bangladeshis working in Qatar check the Qatari riyal rate before sending money home." },
  kwd: { bn: "কুয়েতে কর্মরতরা দেশে টাকা পাঠানোর আগে দিনারের রেট দেখেন। দিনারের মান বেশি বলে ছোট পরিবর্তনেও টাকার অঙ্কে ফারাক হয়।", en: "People working in Kuwait check the dinar rate before sending money home. The dinar is a high-value currency, so even a small move changes the taka amount noticeably." },
  omr: { bn: "ওমানে কর্মরতরা দেশে টাকা পাঠানোর আগে ওমানি রিয়ালের রেট দেখেন। এর মান বেশি বলে ছোট পরিবর্তনেও টাকার অঙ্কে ফারাক হয়।", en: "People working in Oman check the Omani rial rate before sending money home. It is a high-value currency, so a small move changes the taka amount noticeably." },
  bdt: { bn: "টাকা থেকে বিদেশি মুদ্রায় বদলে ভ্রমণ, অনলাইন কেনাকাটা বা ভিসা ফি-র খরচ আগে থেকে আন্দাজ করা যায়।", en: "Converting taka to a foreign currency helps you estimate travel, online shopping or visa fee costs in advance." },
};

const cur = (c: string) => CURRENCIES.find((x) => x.code === c)!;

export function pairContent(p: Pair, rate: number | null, date: string | null) {
  const f = cur(p.from), t = cur(p.to);
  const F = p.from.toUpperCase(), T = p.to.toUpperCase();
  const ctx = CONTEXT[p.from];
  const toCtx = p.from === "bdt" ? CONTEXT[p.to] : null;
  const asOfBn = date ? `রেটের তারিখ ${date}` : "আজকের রেফারেন্স রেট";
  const asOfEn = date ? `rate date ${date}` : "today's reference rate";

  const oneBn = rate ? `${asOfBn}: ১ ${F} = ${fmt(rate)} ${T}।` : `ওপরের কনভার্টারে ${asOfBn} অনুযায়ী ১ ${F} কত ${T} তা দেখা যায়।`;
  const oneEn = rate ? `${asOfEn}: 1 ${F} = ${fmt(rate)} ${T}.` : `The converter above shows how much 1 ${F} is in ${T} at ${asOfEn}.`;
  const thousandBn = rate ? `${asOfBn} অনুযায়ী ১,০০০ ${F} ≈ ${fmt(1000 * rate)} ${T}।` : `১,০০০ ${F} কে ১ ${F} এর রেট দিয়ে গুণ করলে ${T} পাবেন। টেবিলে ১০০, ৫০০, ১,০০০ ও ১০,০০০ এর হিসাব দেওয়া আছে।`;
  const thousandEn = rate ? `At ${asOfEn}, 1,000 ${F} ≈ ${fmt(1000 * rate)} ${T}.` : `Multiply 1,000 by the rate for 1 ${F} to get ${T}. The table lists 100, 500, 1,000 and 10,000.`;

  const titleBn = `${F} to ${T} - ${f.bn} থেকে ${t.bn}`;
  const titleEn = `${F} to ${T} Converter (${f.en} to ${t.en})`;
  const descBn = `${f.bn} (${F}) থেকে ${t.bn} (${T}) আজকের রেফারেন্স রেটে কনভার্ট করুন। ১, ১০০, ১,০০০ ও ১০,০০০ ${F} কত ${T}, টেবিলসহ।`;
  const descEn = `Convert ${f.en} (${F}) to ${t.en} (${T}) at today's reference rate, with a table for 1, 100, 1,000 and 10,000 ${F}.`;

  const howTo = [`পরিমাণ লিখুন, ${F} থেকে ${T} আগে থেকেই বাছা আছে`, "দরকার হলে অন্য মুদ্রা বেছে নিন বা অদলবদল বাটন চাপুন", "ফলাফল ও রেটের তারিখ দেখুন"];
  const howToEn = [`Enter an amount, ${F} to ${T} is already selected`, "Pick another currency or tap the swap button if needed", "See the result and the date of the rate"];

  const faqs = [
    { q: `১ ${F} কত ${T}?`, a: `${oneBn} এটি মধ্যবর্তী (রেফারেন্স) রেট, দিনে একবার আপডেট হয়।` },
    { q: `১,০০০ ${F} কত ${T}?`, a: thousandBn },
    { q: `ব্যাংক বা এক্সচেঞ্জ হাউসের রেটের সঙ্গে কেন মেলে না?`, a: "ব্যাংক, এক্সচেঞ্জ হাউস ও মানি চেঞ্জার নিজেদের কেনা-বেচার রেট ও ফি ব্যবহার করে, যা মধ্যবর্তী রেট থেকে আলাদা। লেনদেনের আগে তাদের রেট দেখে নিন।" },
    { q: "বাংলাদেশ ব্যাংকের রেট কোথায় দেখব?", a: "বাংলাদেশ ব্যাংকের ওয়েবসাইটের এক্সচেঞ্জ রেট পাতায় প্রতিদিনের ডলারের বিড, আস্ক ও গড় রেট এবং কয়েকটি মুদ্রার ক্রস রেট পাওয়া যায়। লিংক টুলের নিচে দেওয়া আছে।" },
    { q: "রেমিট্যান্স পাঠানোর রেট কি এটাই?", a: "না। রেমিট্যান্সের রেট ও ফি পাঠানোর মাধ্যমভেদে আলাদা। এই টুল শুধু আন্দাজের জন্য।" },
  ];
  const faqsEn = [
    { q: `How much is 1 ${F} in ${T}?`, a: `${oneEn} It is a mid-market (reference) rate that updates once a day.` },
    { q: `How much is 1,000 ${F} in ${T}?`, a: thousandEn },
    { q: "Why does it differ from my bank or exchange house?", a: "Banks, exchange houses and money changers use their own buying and selling rates and fees, which differ from the mid-market rate. Check theirs before you transact." },
    { q: "Where can I see the Bangladesh Bank rate?", a: "The exchange rate page on the Bangladesh Bank website lists the daily dollar bid, ask and average rate and cross rates for a few currencies. The link is below the tool." },
    { q: "Is this the rate used to send remittance?", a: "No. Remittance rates and fees depend on the service you use. This tool is only for estimating." },
  ];

  const ctxBn = toCtx ? `${ctx.bn} ${toCtx.bn}` : ctx.bn;
  const ctxEn = toCtx ? `${ctx.en} ${toCtx.en}` : ctx.en;
  const articles = {
    bn: [
      { h: `${F} থেকে ${T} কীভাবে কনভার্ট করবেন`, p: [`পরিমাণকে ১ ${F} এর ${T} রেট দিয়ে গুণ করলেই ${T} পাওয়া যায়। টুলের ওপরের ঘরে পরিমাণ লিখলে এটি নিজে নিজে হয়ে যায়। ${oneBn}`, "ফলাফলের নিচের টেবিলে সাধারণ পরিমাণের হিসাব আছে। যেকোনো সারিতে চাপ দিলে সেই পরিমাণ কনভার্টারে বসে যাবে।"] },
      { h: `কারা ${F} থেকে ${T} রেট দেখেন`, p: [ctxBn] },
      { h: "এই রেট আর ব্যাংকের রেটের পার্থক্য", p: ["এখানে দেখানো রেট মধ্যবর্তী (রেফারেন্স) রেট। বাংলাদেশ ব্যাংক ও অন্য ব্যাংক বা এক্সচেঞ্জ হাউস নিজেদের রেট ধরে, তাই সংখ্যায় সামান্য ফারাক থাকতে পারে। টাকা পাঠানো বা বদলের আগে যাঁর মাধ্যমে করবেন তাঁর রেট ও ফি দেখে নিন।"] },
    ],
    en: [
      { h: `How to convert ${F} to ${T}`, p: [`Multiply the amount by the ${T} rate for 1 ${F}. Type the amount in the box above and the tool does this for you. ${oneEn}`, "The table under the result lists common amounts. Tap a row to put that amount into the converter."] },
      { h: `Who checks the ${F} to ${T} rate`, p: [ctxEn] },
      { h: "How this differs from a bank's rate", p: ["The rate shown here is a mid-market (reference) rate. Bangladesh Bank, other banks and exchange houses use their own rates, so the figures can differ slightly. Check the rate and fee of the service you will use before you send or exchange money."] },
    ],
  };

  return {
    title: titleBn, desc: descBn, howTo, faqs, articles,
    en: { title: titleEn, desc: descEn, howTo: howToEn, faqs: faqsEn },
    seoTitle: `${F} to ${T} - আজকের রেট ও কনভার্টার`,
    seoDesc: `${f.bn} (${F}) থেকে ${t.bn} (${T}) আজকের রেফারেন্স রেটে কনভার্ট করুন। ১০০, ১,০০০ ও ১০,০০০ ${F} কত ${T} তা দেখুন। ফ্রি।`,
  };
}
