// "Source and last checked" notes shown under the tool. Only tools with a fee, rate or rule are listed.
// When you update a figure in a tool, update the date here too. Every text is [Bangla, English].
export type ToolSource = { basis: [string, string]; checked: [string, string]; link?: { href: string; label: string } };

const MFS: Omit<ToolSource, "basis"> & { basis: [string, string] } = {
  basis: [
    "চার্জের হার অ্যাপ/চার্জ চার্ট ও প্রকাশিত তথ্য থেকে নেওয়া। অ্যাপ, USSD ও অফারভেদে চার্জ আলাদা হতে পারে।",
    "Charge rates are taken from the app or charge chart and published information. Charges can differ by app, USSD and offers.",
  ],
  checked: ["অক্টোবর ২০২৬", "October 2026"],
};

export const TOOL_SOURCES: Record<string, ToolSource> = {
  "bkash-calculator": MFS,
  "nagad-calculator": MFS,
  "rocket-calculator": MFS,
  "upay-calculator": MFS,
  "passport-fee-calculator-bd": {
    basis: ["অফিসিয়াল পাসপোর্ট পোর্টালের ফি তালিকা (১২ জুলাই ২০২৬ আপডেট), ১৫% ভ্যাটসহ।", "Official passport portal fee schedule (updated 12 July 2026), 15% VAT included."],
    checked: ["জুলাই ২০২৬", "July 2026"],
    link: { href: "https://www.epassport.gov.bd", label: "epassport.gov.bd" },
  },
  "income-tax-calculator-bd": {
    basis: ["Finance Act 2026, ব্যক্তি করদাতা, আয়বছর ২০২৬-২৭।", "Finance Act 2026, individual taxpayers, income year 2026-27."],
    checked: ["২০২৬-২৭ আয়বছর", "income year 2026-27"],
    link: { href: "https://nbr.gov.bd", label: "nbr.gov.bd" },
  },
  "electricity-bill-calculator-bd": {
    basis: ["BERC-এর ৩ জুন ২০২৬ তারিখের আদেশ, জুন ২০২৬ বিলিং থেকে কার্যকর (আবাসিক LT-A)। ডিমান্ড চার্জ ও ভ্যাট আপনার বিলে আলাদা হতে পারে।", "BERC order of 3 June 2026, effective from the June 2026 billing month (residential LT-A). Demand charge and VAT can differ on your bill."],
    checked: ["জুন ২০২৬", "June 2026"],
  },
  "bdt-currency-converter": {
    basis: ["দৈনিক মিড-মার্কেট রেফারেন্স রেট (ফ্রি currency-api ডেটাসেট)। এটি ব্যাংক বা বাংলাদেশ ব্যাংকের রেট নয়।", "Daily mid-market reference rates (free currency-api dataset). These are not bank or Bangladesh Bank rates."],
    checked: ["প্রতিদিন আপডেট", "updated daily"],
    link: { href: "https://www.bb.org.bd/en/index.php/econdata/exchangerate", label: "bb.org.bd" },
  },
  "bmi-calculator": {
    basis: ["WHO আন্তর্জাতিক BMI শ্রেণিবিন্যাস এবং WHO ২০০৪ বিশেষজ্ঞ পরামর্শের এশীয় অ্যাকশন পয়েন্ট (২৩ ও ২৭.৫)। ঝুঁকির তথ্য CDC থেকে।", "WHO international BMI classification and the Asian action points (23 and 27.5) from the 2004 WHO expert consultation. Risk information from the CDC."],
    checked: ["নভেম্বর ২০২৬", "November 2026"],
    link: { href: "https://pubmed.ncbi.nlm.nih.gov/14726171/", label: "WHO expert consultation, The Lancet 2004" },
  },
  "zakat-calculator-bd": {
    basis: ["নিসাব ৭.৫ ভরি সোনা বা ৫২.৫ ভরি রুপা এবং ২.৫% হার। সাধারণ নির্দেশনা, সিদ্ধান্তের আগে যোগ্য আলেমের পরামর্শ নিন।", "Nisab of 7.5 vori gold or 52.5 vori silver and a 2.5% rate. General guidance only; ask a qualified scholar before deciding."],
    checked: ["স্থির নিয়ম, তারিখ-নির্ভর নয়", "fixed rule, not date-dependent"],
  },
};
