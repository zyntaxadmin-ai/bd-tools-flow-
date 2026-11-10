// Guide articles (the /guides section). Add a new guide by adding an object here, then add it to the sitemap list automatically.
// Every text is a [Bangla, English] pair. Keep facts dated and link to the matching tool.
export type GuideSection = { h: [string, string]; p: [string, string][] };
export type Guide = {
  slug: string;
  title: [string, string];
  desc: [string, string];
  updated: string; // ISO date
  updatedLabel: [string, string];
  tool: { slug: string; name: [string, string] };
  sections: GuideSection[];
  faqs: { q: [string, string]; a: [string, string] }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "cash-out-charge-hisab",
    title: ["বিকাশ, নগদ, রকেট ও উপায় ক্যাশ আউট চার্জ কীভাবে হিসাব করবেন", "How to calculate bKash, Nagad, Rocket and Upay cash out charges"],
    desc: ["প্রতি ১০০০ টাকায় চার্জ ধরে ক্যাশ আউটে কত টাকা কাটবে তা কীভাবে বের করবেন, উদাহরণসহ সহজ নিয়ম।", "A simple rule with examples to find out how much is deducted on a cash out, using the charge per 1,000 taka."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "bkash-calculator", name: ["bKash চার্জ ক্যালকুলেটর", "bKash charge calculator"] },
    sections: [
      {
        h: ["ক্যাশ আউট চার্জের সহজ নিয়ম", "The simple rule for cash out charges"],
        p: [
          ["মোবাইল ব্যাংকিং-এ ক্যাশ আউট চার্জ সাধারণত প্রতি ১০০০ টাকায় একটি নির্দিষ্ট অঙ্ক হিসেবে বলা হয়। যেমন প্রতি ১০০০ টাকায় ১৮.৫০ টাকা। এটি আসলে ১.৮৫%।", "Mobile banking cash out charges are usually quoted as a fixed amount per 1,000 taka. For example 18.50 taka per 1,000, which is 1.85%."],
          ["সূত্র: চার্জ = টাকার পরিমাণ × (প্রতি ১০০০ টাকার চার্জ ÷ ১০০০)। তাই ৫,০০০ টাকা তুললে প্রতি ১০০০ এ ১৮.৫০ ধরে চার্জ হয় ৫ × ১৮.৫০ = ৯২.৫০ টাকা। মোট কাটবে ৫,০০০ + ৯২.৫০ = ৫,০৯২.৫০ টাকা।", "Formula: charge = amount × (charge per 1,000 ÷ 1,000). So for 5,000 taka at 18.50 per 1,000 the charge is 5 × 18.50 = 92.50 taka. In total 5,000 + 92.50 = 5,092.50 taka is deducted."],
        ],
      },
      {
        h: ["চার্জ কেন বদলায়", "Why the charge changes"],
        p: [
          ["এজেন্ট, এটিএম বা ব্যাংকের বুথভেদে চার্জ আলাদা হয়। একই কোম্পানিরও অফার, অ্যাপের ধরন এবং সময়ভেদে রেট বদলাতে পারে। তাই ইন্টারনেটের পুরোনো তালিকা না দেখে নিজের অ্যাপে বা অফিসিয়াল ওয়েবসাইটে রেট দেখে নেওয়া ভালো।", "The charge differs between an agent, an ATM and a bank booth. Even the same company can change its rate by offer, app type and date. So instead of an old list online, check the rate in your own app or on the official website."],
          ["আমাদের ক্যালকুলেটরগুলোতে এখন (অক্টোবর ২০২৬ এ দেখা) এজেন্ট ক্যাশ আউটে প্রতি ১০০০ টাকায় এই রেট ধরা আছে: bKash ১৮.৫০, Nagad ১৪.৯০, Rocket ১৮, Upay ১৪। এই রেট নিয়ে প্রকাশিত উৎসগুলোর মধ্যে মিল নেই, তাই আপনার নিজের রেট জানা থাকলে ক্যালকুলেটরে \"নিজে রেট দিন\" ব্যবহার করুন।", "Our calculators currently use these agent cash out rates per 1,000 taka (checked October 2026): bKash 18.50, Nagad 14.90, Rocket 18, Upay 14. Published sources do not fully agree on these rates, so if you know your own rate, use \"Enter my own rate\" in the calculator."],
        ],
      },
      {
        h: ["কম চার্জে টাকা তোলার উপায়", "Ways to pay less when you cash out"],
        p: [
          ["কিছু কোম্পানির নির্দিষ্ট ব্যাংকের এটিএম বুথে ক্যাশ আউটের রেট এজেন্টের চেয়ে কম। যেমন আমাদের ক্যালকুলেটরে Rocket এর ডাচ-বাংলা ব্যাংক এটিএম ১০ এবং Upay এর ইউসিবি ব্যাংক এটিএম ৮ ধরা আছে। কাছে এমন বুথ থাকলে রেট মিলিয়ে দেখুন।", "Some companies charge less at certain bank ATM booths than at an agent. For example our calculators use 10 for Rocket at Dutch-Bangla Bank ATMs and 8 for Upay at UCB Bank ATMs. If there is such a booth near you, compare the rate."],
          ["একসঙ্গে বেশি টাকা তুললে চার্জের অঙ্কও বেশি হয়, কারণ চার্জ টাকার সমানুপাতিক। তাই প্রয়োজনের বেশি টাকা না তুলে, রেট জেনে হিসাব করে তোলাই ভালো।", "Taking out a larger amount makes the charge bigger because it is proportional to the amount. So work out the charge first and take only what you need."],
        ],
      },
    ],
    faqs: [
      { q: ["১০,০০০ টাকা ক্যাশ আউটে কত চার্জ কাটে?", "How much is the charge for cashing out 10,000 taka?"], a: ["প্রতি ১০০০ টাকায় ১৮.৫০ হলে ১০ × ১৮.৫০ = ১৮৫ টাকা। রেট ১৪ হলে ১৪০ টাকা। আপনার রেট অনুযায়ী ক্যালকুলেটরে দেখে নিন।", "At 18.50 per 1,000 it is 10 × 18.50 = 185 taka. At a rate of 14 it is 140 taka. Check your own rate in the calculator."] },
      { q: ["প্রতি ১০০০ টাকায় ১৮.৫০ মানে কত শতাংশ?", "What percentage is 18.50 per 1,000 taka?"], a: ["১.৮৫%। প্রতি ১০০০ এর চার্জকে ১০ দিয়ে ভাগ করলে শতাংশ পাওয়া যায়।", "It is 1.85%. Divide the charge per 1,000 by 10 to get the percentage."] },
      { q: ["২০০০ টাকা ক্যাশ আউট চার্জ বিকাশে কত?", "What is the bKash cash out charge on 2,000 taka?"], a: ["প্রতি ১০০০ টাকায় ১৮.৫০ ধরলে ২ × ১৮.৫০ = ৩৭ টাকা। ৩০০০ টাকায় ৫৫.৫০, ১০০ টাকায় ১.৮৫ এবং ৫০০০ টাকায় ৯২.৫০ টাকা। রেট বদলালে অঙ্কও বদলাবে।", "At 18.50 per 1,000 taka, 2 × 18.50 = 37 taka. It is 55.50 on 3,000 taka, 1.85 on 100 taka and 92.50 on 5,000 taka. If the rate changes, these figures change too."] },
      { q: ["প্রিয় নম্বর বা অফারে চার্জ আলাদা হয়?", "Can a Priyo number or an offer change the charge?"], a: ["বিশেষ অফার বা সুবিধা থাকলে রেট আলাদা হতে পারে। আপনার ক্ষেত্রে প্রযোজ্য রেট বিকাশ অ্যাপ বা অফিসিয়াল সাইটে দেখে নিন।", "A special offer or benefit can change the rate. Check the rate that applies to you in the bKash app or on the official site."] },
      { q: ["সেন্ড মানির চার্জও কি এভাবে হিসাব হয়?", "Is send money calculated the same way?"], a: ["সেন্ড মানি অ্যাপ ও অফারভেদে বদলায়, বেশিরভাগ ক্ষেত্রে একই কোম্পানির নম্বরে পাঠানো সাধারণত ফ্রি। অ্যাপে দেখে নিন।", "Send money varies by app and offer, and sending to a number of the same company is often free. Check in the app."] },
    ],
  },
  {
    slug: "ssc-gpa-hisab-niyom",
    title: ["এসএসসি ও এইচএসসি জিপিএ কীভাবে হিসাব করবেন (গ্রেড পয়েন্ট ও ৪র্থ বিষয়)", "How to calculate SSC and HSC GPA (grade points and the 4th subject)"],
    desc: ["নম্বর থেকে গ্রেড পয়েন্ট, জিপিএ বের করার নিয়ম, ৪র্থ বিষয়ের হিসাব এবং ফেল করার শর্ত উদাহরণসহ বুঝে নিন।", "Learn how marks turn into grade points, how GPA is worked out, how the 4th subject counts and when a student fails, with examples."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "gpa-calculator-bd", name: ["GPA ক্যালকুলেটর", "GPA calculator"] },
    sections: [
      {
        h: ["নম্বর থেকে গ্রেড পয়েন্ট", "From marks to grade points"],
        p: [
          ["বাংলাদেশের সব শিক্ষা বোর্ডে প্রতিটি বিষয়ের নম্বরকে গ্রেডে ও গ্রেড পয়েন্টে বদলানো হয়: ৮০-১০০ নম্বরে A+ (৫.০০), ৭০-৭৯ এ A (৪.০০), ৬০-৬৯ এ A- (৩.৫০), ৫০-৫৯ এ B (৩.০০), ৪০-৪৯ এ C (২.০০), ৩৩-৩৯ এ D (১.০০) এবং ৩৩ এর নিচে F (০.০০)।", "In all education boards of Bangladesh, the marks in each subject are converted to a grade and a grade point: 80-100 is A+ (5.00), 70-79 is A (4.00), 60-69 is A- (3.50), 50-59 is B (3.00), 40-49 is C (2.00), 33-39 is D (1.00) and below 33 is F (0.00)."],
        ],
      },
      {
        h: ["জিপিএ বের করার নিয়ম", "How GPA is worked out"],
        p: [
          ["জিপিএ = সব বাধ্যতামূলক বিষয়ের গ্রেড পয়েন্টের যোগফল ÷ ওই বিষয়ের সংখ্যা। কত বিষয় ধরা হয় তা শাখা ও বোর্ডের নিয়মের ওপর নির্ভর করে, তাই আপনার ফলাফলে ধরা বিষয়ের সংখ্যা দিয়েই ভাগ করুন।", "GPA = the total grade points of the compulsory subjects ÷ the number of those subjects. How many subjects count depends on your group and board, so divide by the number of subjects counted in your result."],
          ["উদাহরণ (৬টি বিষয়): ৫.০০, ৪.০০, ৪.০০, ৩.৫০, ৩.৫০ ও ৫.০০ এর যোগফল ২৫.০০। ৬ দিয়ে ভাগ করলে জিপিএ ৪.১৭।", "Example (6 subjects): 5.00, 4.00, 4.00, 3.50, 3.50 and 5.00 add up to 25.00. Divided by 6, the GPA is 4.17."],
        ],
      },
      {
        h: ["৪র্থ বিষয়ের হিসাব", "How the 4th subject counts"],
        p: [
          ["৪র্থ (ঐচ্ছিক) বিষয়ে ২.০০ এর বেশি যে গ্রেড পয়েন্ট পাওয়া যায়, শুধু ওই বাড়তি অংশ মোট পয়েন্টে যোগ হয়। যেমন ৪র্থ বিষয়ে ৫.০০ পেলে ৫.০০ − ২.০০ = ৩.০০ যোগ হবে। ২.০০ বা তার কম পেলে জিপিএ-তে কোনো প্রভাব পড়ে না।", "In the 4th (optional) subject, only the part of the grade point above 2.00 is added to the total. For example, 5.00 in the 4th subject adds 5.00 − 2.00 = 3.00. A grade point of 2.00 or less has no effect on the GPA."],
          ["উপরের উদাহরণে ৪র্থ বিষয়ে ৫.০০ পেলে মোট ২৫.০০ + ৩.০০ = ২৮.০০, ভাগ করলে ২৮ ÷ ৬ = ৪.৬৭। সর্বোচ্চ জিপিএ ৫.০০।", "In the example above, with 5.00 in the 4th subject the total is 25.00 + 3.00 = 28.00, and 28 ÷ 6 = 4.67. The maximum GPA is 5.00."],
        ],
      },
      {
        h: ["কখন ফেল ধরা হয়", "When a student fails"],
        p: [
          ["পাস করতে প্রতিটি বিষয়ে অন্তত D (১.০০), মানে ৩৩ নম্বর পেতে হয়। কোনো একটি বিষয়ে F পেলে অন্য বিষয়ে যত ভালোই করুন, সামগ্রিক ফলাফল ফেল দেখায়।", "To pass, you need at least D (1.00) in every subject, which is 33 marks. If you get F in any one subject, the overall result is a fail however well you did in the others."],
          ["আমাদের GPA ক্যালকুলেটর ৫টি বিষয়ের গড় বের করে এবং কোনো বিষয়ে F থাকলে Fail দেখায়। নিজের ফলাফলের সঠিক বিষয়সংখ্যা ও ৪র্থ বিষয়ের নিয়ম মিলিয়ে নিতে বোর্ডের নিয়ম দেখুন।", "Our GPA calculator averages 5 subjects and shows Fail if any subject is F. To match the exact number of subjects and the 4th subject rule for your result, check your board's rules."],
        ],
      },
    ],
    faqs: [
      { q: ["জিপিএ ৫ পেতে কত নম্বর লাগে?", "How many marks do I need for GPA 5?"], a: ["জিপিএ ৫.০০ পেতে প্রতিটি বিষয়ে ৮০ বা তার বেশি নম্বর (A+) লাগে। এক বিষয়ে ৭৯ হলেও জিপিএ ৫-এর নিচে নামে, তবে ৪র্থ বিষয়ের বাড়তি পয়েন্ট জিপিএ বাড়াতে পারে।", "For GPA 5.00 you need 80 or more (A+) in every subject. One subject at 79 brings the GPA below 5, though extra points from the 4th subject can raise the GPA."] },
      { q: ["৪র্থ বিষয়ে ফেল করলে কি সামগ্রিক ফেল?", "Do I fail overall if I fail the 4th subject?"], a: ["এ নিয়ম বোর্ড ও সালভেদে আলাদা হতে পারে। তাই নিশ্চিত হতে আপনার বোর্ডের সর্বশেষ নিয়ম বা স্কুলের শিক্ষকের কাছ থেকে জেনে নিন।", "This rule can differ by board and by year. To be sure, check your board's latest rules or ask your teacher."] },
      { q: ["A- এর গ্রেড পয়েন্ট কত?", "What is the grade point of A-?"], a: ["৩.৫০, যা ৬০ থেকে ৬৯ নম্বরের জন্য।", "It is 3.50, for marks from 60 to 69."] },
    ],
  },
  {
    slug: "income-tax-hisab-2026-27",
    title: ["আয়কর কীভাবে হিসাব করবেন (২০২৬-২৭, ব্যক্তি করদাতা)", "How to calculate income tax (2026-27, individual taxpayers)"],
    desc: ["করমুক্ত সীমা, কর-ধাপ, বিনিয়োগ রেয়াত ও ন্যূনতম কর ধরে ব্যক্তি করদাতার আয়কর হিসাবের ধাপগুলো উদাহরণসহ।", "The steps to work out an individual taxpayer's income tax with the tax-free limit, slabs, investment rebate and minimum tax, with an example."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "income-tax-calculator-bd", name: ["আয়কর ক্যালকুলেটর", "Income tax calculator"] },
    sections: [
      {
        h: ["ধাপ ১: করযোগ্য আয় বের করুন", "Step 1: Find your taxable income"],
        p: [
          ["বছরের মোট আয় থেকে করমুক্ত অংশ বাদ দিলে করযোগ্য আয় পাওয়া যায়। মাসিক বেতনকে ১২ দিয়ে গুণ করে বোনাস যোগ করুন, তারপর আপনার পে-স্লিপ বা কর পরামর্শকের কাছে জেনে করমুক্ত অংশ বাদ দিন।", "Subtract the tax-exempt part from your total yearly income to get taxable income. Multiply your monthly salary by 12, add bonuses, then subtract the exempt part you get from your payslip or a tax adviser."],
        ],
      },
      {
        h: ["ধাপ ২: করমুক্ত সীমা ও কর-ধাপ", "Step 2: The tax-free limit and slabs"],
        p: [
          ["ফাইনান্স অ্যাক্ট ২০২৬ অনুযায়ী ২০২৬-২৭ অর্থবছরে সাধারণ করদাতার করমুক্ত আয়সীমা ৪,০০,০০০ টাকা। নারী, ৬৫+ বয়সী, প্রতিবন্ধী ও মুক্তিযোদ্ধাদের সীমা বেশি, তা এনবিআর-এর ঘোষণা থেকে দেখে নিন।", "Under the Finance Act 2026 the tax-free limit for a general taxpayer is 4,00,000 taka for 2026-27. Women, people aged 65+, people with disabilities and freedom fighters have higher limits, so check the NBR announcement."],
          ["সীমার পরের আয়ে ধাপে ধাপে কর: প্রথম ৩,০০,০০০ টাকায় ১০%, পরের ৪,০০,০০০ টাকায় ১৫%, পরের ৫,০০,০০০ টাকায় ২০%, পরের ২০,০০,০০০ টাকায় ২৫% এবং বাকি আয়ে ৩০%। আগের ৫% ধাপটি আর নেই।", "Income above the limit is taxed slab by slab: 10% on the first 3,00,000, 15% on the next 4,00,000, 20% on the next 5,00,000, 25% on the next 20,00,000 and 30% on the rest. The old 5% slab is gone."],
        ],
      },
      {
        h: ["উদাহরণ", "Example"],
        p: [
          ["করযোগ্য আয় ১২,০০,০০০ টাকা হলে করমুক্ত ৪,০০,০০০ বাদ দিয়ে থাকে ৮,০০,০০০। এর ৩,০০,০০০ এ ১০% = ৩০,০০০; ৪,০০,০০০ এ ১৫% = ৬০,০০০; বাকি ১,০০,০০০ এ ২০% = ২০,০০০। মোট কর ১,১০,০০০ টাকা।", "With a taxable income of 12,00,000, after the 4,00,000 limit 8,00,000 remains. 10% of 3,00,000 = 30,000; 15% of 4,00,000 = 60,000; 20% of the last 1,00,000 = 20,000. The total tax is 1,10,000 taka."],
        ],
      },
      {
        h: ["ধাপ ৩: রেয়াত ও ন্যূনতম কর", "Step 3: Rebate and minimum tax"],
        p: [
          ["যোগ্য বিনিয়োগ (যেমন ডিপিএস, সঞ্চয়পত্র, জীবনবিমার প্রিমিয়াম) থাকলে কর কমানো যায়। প্রকাশিত তথ্য অনুযায়ী রেয়াত হলো করযোগ্য আয়ের ৩%, বিনিয়োগের ১০% এবং ৭,৫০,০০০ টাকার মধ্যে সবচেয়ে কম অঙ্ক। উপরের উদাহরণে ৫,০০,০০০ টাকা বিনিয়োগ থাকলে রেয়াত ৩৬,০০০, তাই কর দাঁড়ায় ৭৪,০০০ টাকা।", "Eligible investment (such as DPS, savings certificates and life insurance premium) can reduce your tax. According to published information the rebate is the lowest of 3% of taxable income, 10% of investment and 7,50,000 taka. In the example above, with 5,00,000 invested the rebate is 36,000, so the tax comes to 74,000 taka."],
          ["আয় করমুক্ত সীমার বেশি হলে সাধারণত ন্যূনতম ৫,০০০ টাকা কর দিতে হয়। নতুন করদাতার ক্ষেত্রে ১,০০০ টাকা বলে জানা যায়।", "If your income is above the tax-free limit, a minimum tax of 5,000 taka usually applies. New taxpayers are reported to pay 1,000 taka."],
        ],
      },
      {
        h: ["মনে রাখুন", "Keep in mind"],
        p: [
          ["কর আইন প্রতি বাজেটে বদলায় এবং এখানে সারচার্জ ও উৎসে কর কর্তন ধরা হয়নি। এটি আনুমানিক হিসাব, রিটার্ন জমার আগে nbr.gov.bd বা একজন কর পরামর্শকের সঙ্গে মিলিয়ে নিন।", "Tax law changes with every budget and surcharge and tax deducted at source are not included here. This is an estimate, so check nbr.gov.bd or a tax adviser before you file your return."],
        ],
      },
    ],
    faqs: [
      { q: ["২০২৬-২৭ এ করমুক্ত আয়সীমা কত?", "What is the tax-free income limit for 2026-27?"], a: ["সাধারণ করদাতার জন্য ৪,০০,০০০ টাকা (ফাইনান্স অ্যাক্ট ২০২৬)। বাজেটে প্রস্তাব ছিল ৩,৭৫,০০০, কিন্তু সংসদে পাস হওয়া বিলে ৪,০০,০০০ করা হয়েছে।", "4,00,000 taka for a general taxpayer (Finance Act 2026). The budget proposed 3,75,000 but the bill passed by parliament raised it to 4,00,000."] },
      { q: ["মাসে ৫০,০০০ টাকা বেতনে কত কর?", "How much tax on a 50,000 taka monthly salary?"], a: ["বছরে ৬,০০,০০০ টাকা। করমুক্ত অংশ বাদ না দিলে ৪,০০,০০০ এর পর ২,০০,০০০ এ ১০% = ২০,০০০ টাকা কর। বেতনের করমুক্ত অংশ থাকলে কর কমবে, কখনো ন্যূনতম করে নামতে পারে। ক্যালকুলেটরে নিজের হিসাব দেখুন।", "That is 6,00,000 per year. With no exempt part, 10% of the 2,00,000 above 4,00,000 = 20,000 taka tax. If part of the salary is exempt the tax goes down and may fall to the minimum tax. See your own case in the calculator."] },
      { q: ["রিটার্ন জমা না দিলে কী হয়?", "What if I do not file a return?"], a: ["TIN থাকলে করমুক্ত আয়ের মধ্যে থাকলেও রিটার্ন জমা দেওয়ার বাধ্যবাধকতা থাকে। বিস্তারিত নিয়ম এনবিআর বা কর পরামর্শকের কাছে জেনে নিন।", "If you have a TIN you are generally required to file a return even when your income is within the tax-free limit. Ask the NBR or a tax adviser for the details."] },
    ],
  },
  {
    slug: "bidyut-bill-hisab-niyom",
    title: ["বিদ্যুৎ বিল কীভাবে হিসাব করবেন (ইউনিট, স্ল্যাব, ডিমান্ড চার্জ ও ভ্যাট)", "How to calculate your electricity bill (units, slabs, demand charge and VAT)"],
    desc: ["আবাসিক বিদ্যুৎ বিল ইউনিট অনুযায়ী ধাপে ধাপে কীভাবে হিসাব হয়, ডিমান্ড চার্জ ও ৫% ভ্যাটসহ উদাহরণ দেখে নিন।", "See step by step how a residential electricity bill is worked out from units, with the demand charge and 5% VAT, and examples."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "electricity-bill-calculator-bd", name: ["বিদ্যুৎ বিল ক্যালকুলেটর", "Electricity bill calculator"] },
    sections: [
      {
        h: ["বিলের তিনটি অংশ", "The three parts of a bill"],
        p: [
          ["আবাসিক (LT-A) বিদ্যুৎ বিলে তিনটি অংশ থাকে: ইউনিট অনুযায়ী বিদ্যুতের মূল্য, অনুমোদিত লোড (kW) অনুযায়ী ডিমান্ড চার্জ, আর এই দুটির যোগফলের ওপর ৫% ভ্যাট। মিটার ভাড়া, বকেয়া ও দেরির জরিমানা থাকলে তা আলাদাভাবে যোগ হয়।", "A residential (LT-A) electricity bill has three parts: the energy charge based on units used, the demand charge based on your sanctioned load (kW), and 5% VAT on the sum of those two. Meter rent, arrears and late fees are added separately if they apply."],
        ],
      },
      {
        h: ["স্ল্যাব অনুযায়ী রেট", "Rates by slab"],
        p: [
          ["জুন ২০২৬ বিলিং থেকে কার্যকর রেট: মোট ইউনিট ৫০ বা কম হলে সব ইউনিট ৪.৬৩ টাকা। এর বেশি হলে ধাপে ধাপে: প্রথম ৭৫ ইউনিট ৫.২৬, ৭৬-২০০ ইউনিট ৮.৫০, ২০১-৩০০ ইউনিট ৯.১০, ৩০১-৪০০ ইউনিট ৯.৬২, ৪০১-৬০০ ইউনিট ১৫.০১ এবং ৬০০ এর বেশি ইউনিট ১৭.৩৫ টাকা।", "Rates effective from the June 2026 billing month: if total units are 50 or fewer, all units are 4.63 taka. Above that, slab by slab: the first 75 units at 5.26, 76-200 at 8.50, 201-300 at 9.10, 301-400 at 9.62, 401-600 at 15.01 and above 600 at 17.35 taka."],
          ["বিইআরসি ৩ জুন দাম বাড়ালেও ৫০ ও ৭৫ ইউনিটের স্ল্যাবের বাড়তি দাম ৪ জুন প্রত্যাহার করেছে, তাই ওই দুই রেট আগের মতোই আছে। প্রতিটি রেট শুধু ওই স্ল্যাবের ইউনিটে লাগে, সব ইউনিটে নয়।", "Although BERC raised prices on 3 June, it withdrew the hike for the 50 and 75 unit slabs on 4 June, so those two rates stay as before. Each rate applies only to the units inside its slab, not to all your units."],
        ],
      },
      {
        h: ["উদাহরণ: ২০০ ইউনিট, ১ kW লোড", "Example: 200 units, 1 kW load"],
        p: [
          ["প্রথম ৭৫ ইউনিট × ৫.২৬ = ৩৯৪.৫০; পরের ১২৫ ইউনিট × ৮.৫০ = ১,০৬২.৫০। বিদ্যুতের মূল্য ১,৪৫৭ টাকা।", "First 75 units × 5.26 = 394.50; next 125 units × 8.50 = 1,062.50. The energy charge is 1,457 taka."],
          ["ডিমান্ড চার্জ ধরা হয়েছে প্রতি kW ৪২ টাকা, তাই ১ kW এ ৪২ টাকা। যোগফল ১,৪৯৯ টাকার ওপর ৫% ভ্যাট ৭৪.৯৫। মোট বিল ১,৫৭৩.৯৫ টাকা।", "The demand charge is taken as 42 taka per kW, so 42 taka for 1 kW. The sum of 1,499 taka plus 5% VAT of 74.95 gives a total bill of 1,573.95 taka."],
        ],
      },
      {
        h: ["আরও কয়েকটি উদাহরণ", "A few more examples"],
        p: [
          ["একই হিসাবে (১ kW, ডিমান্ড ৪২): ৩০ ইউনিটে মোট প্রায় ১৮৯.৯৪ টাকা, ১০০ ইউনিটে প্রায় ৬৮১.৪৫ টাকা, ৩০০ ইউনিটে প্রায় ২,৫২৯.৪৫ টাকা এবং ৫০০ ইউনিটে প্রায় ৫,১১৫.৬০ টাকা।", "With the same assumptions (1 kW, demand charge 42): about 189.94 taka for 30 units, 681.45 for 100 units, 2,529.45 for 300 units and 5,115.60 for 500 units."],
          ["লক্ষ করুন ৪০০ ইউনিটের পর রেট হঠাৎ বেড়ে ১৫.০১ হয়, তাই ৪০০ এর কাছাকাছি গেলে বিল দ্রুত বাড়ে। মাসে ইউনিট কমিয়ে ৪০০ এর নিচে রাখলে সাশ্রয় বেশি হয়।", "Note that after 400 units the rate jumps to 15.01, so the bill rises fast once you pass 400. Keeping your monthly use below 400 units saves more."],
        ],
      },
      {
        h: ["আপনার বিলের সঙ্গে না মিললে", "If it does not match your bill"],
        p: [
          ["আপনার বিলে মিটার ভাড়া, বকেয়া, দেরির জরিমানা, রিবেট বা ভিন্ন ডিমান্ড চার্জ থাকতে পারে। বিতরণ প্রতিষ্ঠান (ডেসকো, ডিপিডিসি, পল্লী বিদ্যুৎ) নিজস্ব নিয়মও ব্যবহার করতে পারে। তাই এটি আনুমানিক হিসাব, আপনার হাতে পাওয়া বিলই চূড়ান্ত।", "Your bill may include meter rent, arrears, late fees, rebates or a different demand charge. Distribution companies (DESCO, DPDC, Palli Bidyut) may also apply their own rules. So this is an estimate, and the bill in your hand is final."],
        ],
      },
    ],
    faqs: [
      { q: ["১০০ ইউনিটে বিল কত আসে?", "What is the bill for 100 units?"], a: ["১ kW লোড ও ডিমান্ড চার্জ ৪২ ধরে মোট প্রায় ৬৮১.৪৫ টাকা। প্রথম ৭৫ ইউনিট ৫.২৬ ও পরের ২৫ ইউনিট ৮.৫০ হিসেবে বিদ্যুতের মূল্য ৬০৭ টাকা, এর সঙ্গে ডিমান্ড ও ৫% ভ্যাট যোগ হয়।", "With a 1 kW load and a demand charge of 42, about 681.45 taka. The first 75 units at 5.26 and the next 25 at 8.50 make an energy charge of 607 taka, then demand and 5% VAT are added."] },
      { q: ["লাইফলাইন রেট কখন প্রযোজ্য?", "When does the lifeline rate apply?"], a: ["মাসে মোট ৫০ ইউনিট বা কম ব্যবহার করলে সব ইউনিট ৪.৬৩ টাকা। ৫১ ইউনিট হলে আর লাইফলাইন রেট পাওয়া যায় না, তখন স্ল্যাব অনুযায়ী হিসাব হয়।", "If you use 50 units or fewer in the month, all units are 4.63 taka. At 51 units you no longer get the lifeline rate and the slab calculation applies."] },
      { q: ["ডিমান্ড চার্জ কত?", "How much is the demand charge?"], a: ["আমাদের টুলে প্রতি kW ৪২ টাকা ধরা আছে, তবে আপনার বিলে আলাদা থাকতে পারে, তাই ক্যালকুলেটরে সেই ঘর বদলানো যায়।", "Our tool uses 42 taka per kW, but your bill may differ, so that box can be changed in the calculator."] },
    ],
  },
  {
    slug: "zakat-hisab-niyom",
    title: ["যাকাত কীভাবে হিসাব করবেন (নিসাব, ২.৫% হার ও উদাহরণ)", "How to calculate zakat (nisab, the 2.5% rate and an example)"],
    desc: ["নিসাব কত, কোন সম্পদে যাকাত হিসাব হয়, ঋণ কীভাবে বাদ যায় এবং ২.৫% যাকাত বের করার ধাপগুলো উদাহরণসহ।", "What the nisab is, which wealth is counted, how debts are subtracted and the steps to find 2.5% zakat, with an example."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "zakat-calculator-bd", name: ["যাকাত ক্যালকুলেটর", "Zakat calculator"] },
    sections: [
      {
        h: ["নিসাব কী", "What is the nisab"],
        p: [
          ["নিসাব হলো যাকাত ফরজ হওয়ার ন্যূনতম সম্পদের পরিমাণ। এটি ৭.৫ ভরি সোনা অথবা ৫২.৫ ভরি রুপার দামের সমান ধরা হয়। ১ ভরি ১১.৬৬৪ গ্রাম ধরলে এটি প্রায় ৮৭.৪৮ গ্রাম সোনা বা ৬১২.৩৬ গ্রাম রুপা।", "The nisab is the minimum amount of wealth at which zakat becomes due. It is taken as the price of 7.5 vori of gold or 52.5 vori of silver. With 1 vori = 11.664 g, that is about 87.48 g of gold or 612.36 g of silver."],
          ["রুপা না সোনা দিয়ে নিসাব ধরবেন, তা নিয়ে আলিমদের মত আছে। রুপার নিসাবের দাম কম, তাই বেশি মানুষের ওপর যাকাত আসে। আপনার স্থানীয় আলিমের পরামর্শ নিন।", "Scholars differ on whether to use silver or gold for the nisab. The silver nisab is lower in value, so more people owe zakat. Take the advice of your local scholar."],
        ],
      },
      {
        h: ["কোন সম্পদ ধরা হয়", "Which wealth is counted"],
        p: [
          ["সাধারণত নগদ টাকা, ব্যাংকে জমা, সোনা ও রুপার বাজার মূল্য, ব্যবসার পণ্য ও মজুত, এবং ফেরত পাওয়ার মতো পাওনা এই হিসাবে ধরা হয়। এরপর আপনার দেনা বাদ দিয়ে নিট সম্পদ পাওয়া যায়।", "Generally cash, bank savings, the market value of gold and silver, business goods and stock, and money owed to you that is likely to be repaid are counted. Then your debts are subtracted to get net wealth."],
          ["সম্পদ নিসাব পরিমাণ হয়ে এক চান্দ্র বছর আপনার কাছে থাকলে যাকাত দিতে হয়। কোন সম্পদ ও ঋণ ধরা যাবে তা নিয়ে বিস্তারিত নিয়ম আলিমের কাছ থেকে জেনে নিন।", "Zakat is due once your wealth has reached the nisab and you have held it for one lunar year. Ask a scholar for the detailed rules on which wealth and debts count."],
        ],
      },
      {
        h: ["উদাহরণ (দাম কাল্পনিক)", "Example (prices are made up)"],
        p: [
          ["ধরুন রুপার দাম প্রতি ভরি ২,০০০ টাকা। তাহলে নিসাব ৫২.৫ × ২,০০০ = ১,০৫,০০০ টাকা। কারও নগদ ও ব্যাংকে ১,০০,০০০ আর সোনার মূল্য ৫০,০০০ মিলে সম্পদ ১,৫০,০০০, ঋণ ২০,০০০। নিট সম্পদ ১,৩০,০০০ যা নিসাবের চেয়ে বেশি।", "Suppose silver is 2,000 taka per vori. Then the nisab is 52.5 × 2,000 = 1,05,000 taka. Someone has 1,00,000 in cash and bank plus 50,000 in gold, so wealth is 1,50,000, with debts of 20,000. Net wealth is 1,30,000, which is above the nisab."],
          ["যাকাত = ১,৩০,০০০ × ২.৫% = ৩,২৫০ টাকা। আসল দাম বাজুসের আজকের দাম দেখে বসাতে হবে, কারণ সোনা-রুপার দাম রোজ বদলায়।", "Zakat = 1,30,000 × 2.5% = 3,250 taka. For real use, put in today's BAJUS price, because gold and silver prices change every day."],
        ],
      },
      {
        h: ["মনে রাখুন", "Keep in mind"],
        p: [
          ["এটি একটি সাধারণ হিসাবের গাইড, ফতোয়া নয়। ব্যক্তিগত পরিস্থিতিতে যাকাতের শর্ত, ঋণ ও বিশেষ সম্পদ নিয়ে সন্দেহ থাকলে আলিম বা ইসলামী প্রতিষ্ঠানের সঙ্গে কথা বলুন।", "This is a general calculation guide, not a religious ruling. If you have doubts about zakat conditions, debts or special assets in your own situation, speak to a scholar or an Islamic institution."],
        ],
      },
    ],
    faqs: [
      { q: ["যাকাতের হার কত?", "What is the zakat rate?"], a: ["নিট সম্পদের ২.৫%, অর্থাৎ প্রতি ১০০ টাকায় আড়াই টাকা।", "2.5% of net wealth, which is 2.5 taka for every 100 taka."] },
      { q: ["নিসাবের কম সম্পদ থাকলে কি যাকাত দিতে হয়?", "Is zakat due if my wealth is below the nisab?"], a: ["সাধারণ নিয়মে না। নিট সম্পদ নিসাবের কম হলে যাকাত ফরজ হয় না। তবে দান-সদকা যেকোনো পরিমাণে করা যায়।", "Under the general rule, no. If net wealth is below the nisab, zakat is not due. Voluntary charity can still be given in any amount."] },
      { q: ["সোনার গয়নায় কি যাকাত লাগে?", "Is zakat due on gold jewellery?"], a: ["এ নিয়ে আলিমদের মত আছে এবং শর্ত আছে। আপনার গয়নার ক্ষেত্রে করণীয় আপনার স্থানীয় আলিমের কাছ থেকে জেনে নিন।", "Scholars differ on this and there are conditions. Ask your local scholar what applies to your jewellery."] },
    ],
  },
  {
    slug: "fdr-dps-ki-kivabe-hishab",
    title: ["এফডিআর ও ডিপিএস কী, কোনটি ভালো এবং সুদ কীভাবে হিসাব হয়", "What FDR and DPS are, which is better and how the interest is worked out"],
    desc: ["এফডিআর ও ডিপিএস এর পার্থক্য, চক্রবৃদ্ধি সুদের সূত্র, উৎসে কর এবং মেয়াদ শেষে কত টাকা পাবেন তার উদাহরণ।", "The difference between FDR and DPS, the compound interest formula, source tax and an example of what you get at maturity."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "fdr-dps-calculator-bd", name: ["FDR DPS ক্যালকুলেটর", "FDR DPS calculator"] },
    sections: [
      {
        h: ["এফডিআর ও ডিপিএস এর পার্থক্য", "The difference between FDR and DPS"],
        p: [
          ["এফডিআর (ফিক্সড ডিপোজিট) এ একবারে একটি অঙ্ক নির্দিষ্ট মেয়াদের জন্য ব্যাংকে রাখা হয় এবং মেয়াদ শেষে সুদসহ ফেরত পাওয়া যায়। যাদের হাতে এককালীন টাকা আছে, তাদের জন্য এটি উপযোগী।", "With an FDR (fixed deposit) you place one lump sum in the bank for a fixed term and get it back with interest at maturity. It suits people who have a lump sum."],
          ["ডিপিএস (ডিপোজিট পেনশন স্কিম) এ প্রতি মাসে নির্দিষ্ট কিস্তি জমা দিতে হয় এবং মেয়াদ শেষে মোট জমা ও সুদ একসঙ্গে পাওয়া যায়। যাদের মাসিক আয় থেকে অল্প অল্প করে সঞ্চয় করতে হয়, তাদের জন্য এটি উপযোগী।", "With a DPS (deposit pension scheme) you pay a fixed installment every month and get the total deposit and interest together at maturity. It suits people who save a little at a time from monthly income."],
        ],
      },
      {
        h: ["এফডিআর এর সুদ কীভাবে হিসাব হয়", "How FDR interest is worked out"],
        p: [
          ["চক্রবৃদ্ধি সুদের সূত্র: মেয়াদ শেষে প্রাপ্য = আসল × (১ + হার ÷ বছরে যতবার সুদ যোগ হয়)^(বছরে যতবার × বছর)। বেশিরভাগ ব্যাংকে ত্রৈমাসিক চক্রবৃদ্ধি ধরা হয়, মানে বছরে ৪ বার।", "The compound interest formula: maturity amount = principal × (1 + rate ÷ times per year)^(times per year × years). Most banks use quarterly compounding, which is 4 times a year."],
          ["উদাহরণ: ১,০০,০০০ টাকা ৮% সুদে ১২ মাস। ১,০০,০০০ × (১.০২)^৪ = ১,০৮,২৪৩.২২। সুদ ৮,২৪৩.২২ টাকা। ১০% উৎসে কর ৮২৪.৩২ কেটে হাতে পাবেন ১,০৭,৪১৮.৯০ টাকা।", "Example: 1,00,000 taka at 8% for 12 months. 1,00,000 × (1.02)^4 = 1,08,243.22. The interest is 8,243.22 taka. After 10% source tax of 824.32 you receive 1,07,418.90 taka."],
        ],
      },
      {
        h: ["ডিপিএস এর হিসাব", "How DPS is worked out"],
        p: [
          ["প্রতি মাসের শুরুতে কিস্তি জমা এবং মাসিক চক্রবৃদ্ধি ধরলে ৫,০০০ টাকার কিস্তিতে ১২ মাসে ৮% সুদে মোট জমা ৬০,০০০ টাকা, সুদ প্রায় ২,৬৬৪.৬৩ টাকা। ১০% কর ২৬৬.৪৬ বাদে হাতে পাবেন ৬২,৩৯৮.১৭ টাকা। ব্যাংকভেদে নিয়ম আলাদা, তাই এটি আনুমানিক।", "Taking each installment at the start of the month with monthly compounding, a 5,000 taka installment for 12 months at 8% gives total deposits of 60,000 taka and interest of about 2,664.63. After 10% tax of 266.46 you receive 62,398.17 taka. Banks differ, so this is an estimate."],
        ],
      },
      {
        h: ["সুদের ওপর কর", "Tax on the interest"],
        p: [
          ["ব্যাংক সুদ থেকে উৎসে কর কাটে, সাধারণত TIN থাকলে ১০% এবং TIN না থাকলে ১৫%। এফডিআর এর ব্যালেন্সভেদে আবগারি শুল্কও কাটা হয়, যা আমাদের ক্যালকুলেটরে ধরা হয়নি। তাই আপনার ব্যাংকের ঘোষিত মেয়াদ শেষের অঙ্কই চূড়ান্ত।", "Banks deduct tax at source from the interest, generally 10% with a TIN and 15% without. Excise duty is also deducted depending on the FDR balance, and it is not included in our calculator. So the maturity figure your bank states is final."],
        ],
      },
      {
        h: ["কোনটি ভালো", "Which is better"],
        p: [
          ["কোনটি ভালো তা আপনার অবস্থার ওপর নির্ভর করে। এককালীন টাকা থাকলে এফডিআর, মাসিক আয় থেকে জমাতে হলে ডিপিএস। সুদের হার, মেয়াদ, ব্যাংকের নিরাপত্তা ও মেয়াদের আগে ভাঙলে কী কাটে, এসব ব্যাংকে জেনে তুলনা করুন।", "Which is better depends on your situation. An FDR if you have a lump sum, a DPS if you save from monthly income. Compare the interest rate, the term, the bank's safety and what is deducted if you break it early by asking the bank."],
        ],
      },
    ],
    faqs: [
      { q: ["১ লাখ টাকার এফডিআর এ এক বছরে কত সুদ?", "How much interest on a 1 lakh taka FDR in a year?"], a: ["৮% সুদে ত্রৈমাসিক চক্রবৃদ্ধিতে প্রায় ৮,২৪৩ টাকা, কর কাটার আগে। সুদের হার ব্যাংকভেদে আলাদা, তাই আপনার ব্যাংকের হার ক্যালকুলেটরে দিয়ে দেখুন।", "About 8,243 taka at 8% with quarterly compounding, before tax. Rates differ by bank, so put your bank's rate in the calculator."] },
      { q: ["TIN না থাকলে কর বেশি কাটে?", "Is more tax deducted if I have no TIN?"], a: ["সাধারণত হ্যাঁ, TIN থাকলে ১০% এবং না থাকলে ১৫% উৎসে কর কাটে। আপনার ব্যাংকের হার জেনে নিন।", "Generally yes, 10% with a TIN and 15% without. Check your bank's rate."] },
      { q: ["চক্রবৃদ্ধি আর সরল সুদের পার্থক্য কী?", "What is the difference between compound and simple interest?"], a: ["সরল সুদে শুধু আসলের ওপর সুদ হয়। চক্রবৃদ্ধিতে আগের সুদও আসলের সঙ্গে যোগ হয়ে তার ওপর সুদ হয়, তাই মেয়াদ শেষে একটু বেশি পাওয়া যায়।", "Simple interest is earned only on the original amount. With compound interest the earlier interest is added to the principal and earns interest too, so you get a little more at maturity."] },
    ],
  },
  {
    slug: "passport-fee-2026",
    title: ["ই-পাসপোর্ট ফি কত (৪৮ ও ৬৪ পৃষ্ঠা, ৫ ও ১০ বছর, ডেলিভারিভেদে)", "How much is the e-passport fee (48 and 64 pages, 5 and 10 years, by delivery type)"],
    desc: ["৪৮ ও ৬৪ পৃষ্ঠার ই-পাসপোর্টের ৫ ও ১০ বছর মেয়াদের সাধারণ, জরুরি ও অতি জরুরি ডেলিভারির ফি এক জায়গায়।", "The fees for 48 and 64 page e-passports for 5 and 10 years, with regular, express and super express delivery, in one place."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "passport-fee-calculator-bd", name: ["পাসপোর্ট ফি ক্যালকুলেটর", "Passport fee calculator"] },
    sections: [
      {
        h: ["ফি তালিকা (১৫% ভ্যাটসহ)", "Fee list (15% VAT included)"],
        p: [
          ["৪৮ পৃষ্ঠা, ৫ বছর: সাধারণ ৪,০২৫ টাকা, জরুরি ৬,৩২৫ টাকা, অতি জরুরি ৮,৬২৫ টাকা। ৪৮ পৃষ্ঠা, ১০ বছর: সাধারণ ৫,৭৫০ টাকা, জরুরি ৮,০৫০ টাকা, অতি জরুরি ১০,৩৫০ টাকা।", "48 pages, 5 years: regular 4,025 taka, express 6,325 taka, super express 8,625 taka. 48 pages, 10 years: regular 5,750 taka, express 8,050 taka, super express 10,350 taka."],
          ["৬৪ পৃষ্ঠা, ৫ বছর: সাধারণ ৬,৩২৫ টাকা, জরুরি ৮,৬২৫ টাকা, অতি জরুরি ১২,০৭৫ টাকা। ৬৪ পৃষ্ঠা, ১০ বছর: সাধারণ ৮,০৫০ টাকা, জরুরি ১০,৩৫০ টাকা, অতি জরুরি ১৩,৮০০ টাকা।", "64 pages, 5 years: regular 6,325 taka, express 8,625 taka, super express 12,075 taka. 64 pages, 10 years: regular 8,050 taka, express 10,350 taka, super express 13,800 taka."],
          ["এই তালিকা ১২ জুলাই ২০২৬ তারিখে হালনাগাদ হওয়া সরকারি তালিকার উদ্ধৃতি দেওয়া প্রকাশিত তথ্য থেকে নেওয়া। ফি বদলাতে পারে।", "This list comes from published information quoting the official schedule updated on 12 July 2026. Fees can change."],
        ],
      },
      {
        h: ["কোনটি বেছে নেবেন", "Which one to choose"],
        p: [
          ["৪৮ পৃষ্ঠা সাধারণ ভ্রমণের জন্য যথেষ্ট, আর যারা ঘন ঘন বিদেশ যান তারা ৬৪ পৃষ্ঠা নিতে পারেন। ১০ বছর মেয়াদে ফি বেশি হলেও বছরপ্রতি খরচ কম পড়ে। সাধারণ ডেলিভারিতে সময় বেশি লাগে, জরুরি বা অতি জরুরি হলে ফি বেশি দিয়ে দ্রুত পাওয়া যায়।", "48 pages is enough for ordinary travel, and frequent travellers can take 64 pages. A 10 year passport costs more up front but less per year. Regular delivery takes longer, while express and super express cost more but arrive faster."],
        ],
      },
      {
        h: ["আবেদনের আগে যা দেখে নেবেন", "What to check before you apply"],
        p: [
          ["শিশু, নবায়ন, জরুরি পাসপোর্ট, বিদেশের দূতাবাস এবং বিশেষ ছাড়ের (যেমন এনওসি) ক্ষেত্রে ফি আলাদা হতে পারে, যা এই তালিকায় নেই। আবেদন ও ফি জমার আগে সবসময় অফিসিয়াল পোর্টাল epassport.gov.bd এ বর্তমান ফি মিলিয়ে নিন।", "Fees can differ for children, renewals, emergency passports, overseas missions and special concessions (such as an NOC), which are not in this list. Before you apply and pay, always check the current fee on the official portal epassport.gov.bd."],
        ],
      },
    ],
    faqs: [
      { q: ["৪৮ পৃষ্ঠার ৫ বছরের সাধারণ ই-পাসপোর্টের ফি কত?", "What is the fee for a 48 page, 5 year regular e-passport?"], a: ["এই তালিকা অনুযায়ী ৪,০২৫ টাকা, ১৫% ভ্যাটসহ। আবেদনের আগে epassport.gov.bd এ দেখে নিন।", "According to this list it is 4,025 taka including 15% VAT. Check epassport.gov.bd before you apply."] },
      { q: ["১০ বছরের ৬৪ পৃষ্ঠার পাসপোর্টের সবচেয়ে দ্রুত ডেলিভারির ফি কত?", "What is the fee for the fastest delivery of a 10 year, 64 page passport?"], a: ["অতি জরুরি ডেলিভারিতে ১৩,৮০০ টাকা, ১৫% ভ্যাটসহ।", "13,800 taka for super express delivery, including 15% VAT."] },
      { q: ["ফি কোথায় জমা দেব?", "Where do I pay the fee?"], a: ["আবেদনের ধাপে অফিসিয়াল ই-পাসপোর্ট পোর্টালের নির্দেশ অনুযায়ী ফি জমা দিতে হয়। কোনো দালাল বা অনানুষ্ঠানিক উৎসকে টাকা না দিয়ে পোর্টালের নির্দেশনা অনুসরণ করুন।", "You pay the fee according to the instructions of the official e-passport portal during the application. Follow the portal's instructions instead of paying any broker or unofficial source."] },
    ],
  },
  {
    slug: "vori-koto-gram",
    title: ["১ ভরি কত গ্রাম? ভরি, আনা, রতি ও গ্রামের হিসাব", "How many grams is 1 vori? Vori, ana, roti and gram conversion"],
    desc: ["১ ভরি = ১১.৬৬৪ গ্রাম। ভরি, আনা, রতি থেকে গ্রামে এবং গ্রাম থেকে ভরিতে রূপান্তরের নিয়ম ও তালিকা উদাহরণসহ।", "1 vori = 11.664 grams. The rules and a table for converting vori, ana and roti to grams and back, with examples."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "gold-weight-converter-bd", name: ["ভরি আনা রতি কনভার্টার", "Vori ana roti converter"] },
    sections: [
      {
        h: ["ভরি, আনা, রতি ও গ্রামের সম্পর্ক", "How vori, ana, roti and grams relate"],
        p: [
          ["বাংলাদেশে সোনা-রুপার ওজন ভরি, আনা ও রতিতে মাপা হয়। ১ ভরি = ১৬ আনা এবং ১ আনা = ৬ রতি, তাই ১ ভরিতে ৯৬ রতি। ১ ভরি = ১১.৬৬৪ গ্রাম।", "In Bangladesh gold and silver are weighed in vori, ana and roti. 1 vori = 16 ana and 1 ana = 6 roti, so 1 vori has 96 roti. 1 vori = 11.664 grams."],
          ["এ থেকে ১ আনা = ১১.৬৬৪ ÷ ১৬ = ০.৭২৯ গ্রাম এবং ১ রতি = ১১.৬৬৪ ÷ ৯৬ = ০.১২১৫ গ্রাম।", "From this, 1 ana = 11.664 ÷ 16 = 0.729 grams and 1 roti = 11.664 ÷ 96 = 0.1215 grams."],
        ],
      },
      {
        h: ["ভরি থেকে গ্রামের তালিকা", "Vori to gram table"],
        p: [
          ["আধা ভরি = ৫.৮৩২ গ্রাম; ১ ভরি = ১১.৬৬৪ গ্রাম; ২ ভরি = ২৩.৩২৮ গ্রাম; ৩ ভরি = ৩৪.৯৯২ গ্রাম; ৫ ভরি = ৫৮.৩২০ গ্রাম; ১০ ভরি = ১১৬.৬৪০ গ্রাম।", "Half a vori = 5.832 grams; 1 vori = 11.664 grams; 2 vori = 23.328 grams; 3 vori = 34.992 grams; 5 vori = 58.320 grams; 10 vori = 116.640 grams."],
        ],
      },
      {
        h: ["হিসাবের নিয়ম ও উদাহরণ", "The method and an example"],
        p: [
          ["ভরি-আনা-রতি থেকে গ্রাম: সব রতিতে বদলে ০.১২১৫ দিয়ে গুণ করুন। যেমন ২ ভরি ৮ আনা ৩ রতি = (২ × ৯৬) + (৮ × ৬) + ৩ = ২৪৩ রতি। ২৪৩ × ০.১২১৫ = ২৯.৫২৪৫ গ্রাম।", "Vori-ana-roti to grams: turn everything into roti and multiply by 0.1215. For example 2 vori 8 ana 3 roti = (2 × 96) + (8 × 6) + 3 = 243 roti. 243 × 0.1215 = 29.5245 grams."],
          ["গ্রাম থেকে ভরি: গ্রামকে ১১.৬৬৪ দিয়ে ভাগ করুন। যেমন ২৫ গ্রাম ÷ ১১.৬৬৪ = প্রায় ২.১৪৩ ভরি, যা প্রায় ২ ভরি ২ আনা ১.৭৬ রতি।", "Grams to vori: divide the grams by 11.664. For example 25 grams ÷ 11.664 is about 2.143 vori, which is about 2 vori 2 ana 1.76 roti."],
        ],
      },
      {
        h: ["দাম হিসাব করার সময় যা মনে রাখবেন", "Things to remember when working out price"],
        p: [
          ["সোনার দাম ক্যারেট অনুযায়ী আলাদা, আর গয়নার ক্ষেত্রে মজুরি ও ভ্যাট আলাদা যোগ হয়। প্রতি ভরির দাম বাজুসের আজকের দাম থেকে দেখে নিয়ে ওজনের সঙ্গে গুণ করুন। ওজনের রূপান্তরে ক্যারেট ধরা হয় না।", "The price of gold differs by carat, and for jewellery the making charge and VAT are added separately. Take the price per vori from today's BAJUS rate and multiply it by the weight. Carat is not part of the weight conversion."],
        ],
      },
    ],
    faqs: [
      { q: ["১ ভরি কত গ্রাম?", "How many grams is 1 vori?"], a: ["বাংলাদেশে ১ ভরি = ১১.৬৬৪ গ্রাম।", "In Bangladesh 1 vori = 11.664 grams."] },
      { q: ["১ ভরিতে কত আনা ও রতি?", "How many ana and roti are in 1 vori?"], a: ["১ ভরিতে ১৬ আনা এবং ৯৬ রতি। ১ আনায় ৬ রতি।", "1 vori has 16 ana and 96 roti. 1 ana has 6 roti."] },
      { q: ["১০ গ্রাম সোনা কত ভরি?", "How many vori is 10 grams of gold?"], a: ["১০ ÷ ১১.৬৬৪ = প্রায় ০.৮৫৭ ভরি, মানে প্রায় ১৩ আনা ৪.৩০ রতি।", "10 ÷ 11.664 is about 0.857 vori, which is about 13 ana 4.30 roti."] },
    ],
  },
  {
    slug: "cgpa-hisab-niyom",
    title: ["CGPA কীভাবে হিসাব করবেন? ক্রেডিট ধরে সহজ নিয়ম", "How to calculate CGPA: a simple credit-weighted method"],
    desc: ["সেমিস্টারের GPA ও ক্রেডিট থেকে CGPA বের করার নিয়ম, উদাহরণ ও ৪.০০ বা ৫.০০ স্কেলের পার্থক্য।", "How to work out CGPA from semester GPA and credits, with an example and the difference between 4.00 and 5.00 scales."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "cgpa-calculator", name: ["CGPA ক্যালকুলেটর", "CGPA calculator"] },
    sections: [
      {
        h: ["CGPA আসলে কী", "What CGPA is"],
        p: [
          ["CGPA মানে Cumulative GPA, অর্থাৎ সব সেমিস্টার মিলিয়ে গড় গ্রেড পয়েন্ট। এটি সেমিস্টারের GPA-র সাধারণ গড় নয়, বরং ক্রেডিট অনুযায়ী ভারযুক্ত গড়, তাই বেশি ক্রেডিটের সেমিস্টার ফলাফলে বেশি প্রভাব ফেলে।", "CGPA stands for Cumulative GPA, the average grade point across all semesters. It is not a plain average of semester GPAs but a credit-weighted average, so a semester with more credits counts for more."],
        ],
      },
      {
        h: ["হিসাবের নিয়ম", "The method"],
        p: [
          ["প্রতিটি সেমিস্টারের GPA-কে তার ক্রেডিট দিয়ে গুণ করুন, গুণফলগুলো যোগ করুন, তারপর মোট ক্রেডিট দিয়ে ভাগ করুন। সূত্র: CGPA = Σ(GPA × ক্রেডিট) ÷ Σ ক্রেডিট।", "Multiply each semester GPA by its credits, add the products, then divide by the total credits. Formula: CGPA = Σ(GPA × credits) ÷ Σ credits."],
        ],
      },
      {
        h: ["উদাহরণ", "Example"],
        p: [
          ["ধরুন তিন সেমিস্টারে GPA ৩.৫০ (১৫ ক্রেডিট), ৩.০০ (১২ ক্রেডিট) ও ৪.০০ (৩ ক্রেডিট)। গুণফল: ৩.৫০ × ১৫ = ৫২.৫, ৩.০০ × ১২ = ৩৬, ৪.০০ × ৩ = ১২, মোট ১০০.৫। মোট ক্রেডিট ১৫ + ১২ + ৩ = ৩০। CGPA = ১০০.৫ ÷ ৩০ = ৩.৩৫।", "Say three semesters have GPA 3.50 (15 credits), 3.00 (12 credits) and 4.00 (3 credits). Products: 3.50 × 15 = 52.5, 3.00 × 12 = 36, 4.00 × 3 = 12, total 100.5. Total credits are 15 + 12 + 3 = 30. CGPA = 100.5 ÷ 30 = 3.35."],
          ["সাধারণ গড় করলে (৩.৫ + ৩ + ৪) ÷ ৩ = ৩.৫০ আসত, যা ভুল। ক্রেডিট ধরলে ফল আলাদা হয়।", "A plain average, (3.5 + 3 + 4) ÷ 3 = 3.50, would be wrong. Weighting by credits gives a different answer."],
        ],
      },
      {
        h: ["৪.০০ নাকি ৫.০০ স্কেল", "4.00 or 5.00 scale"],
        p: [
          ["বেশিরভাগ বিশ্ববিদ্যালয় ৪.০০ স্কেল ব্যবহার করে, তবে কিছু প্রতিষ্ঠান ৫.০০ স্কেল নেয়। আপনার প্রতিষ্ঠানের গ্রেডিং নিয়ম ও ক্রেডিট নিয়ম দেখে নিন, কারণ রিটেক বা বাদ পড়া কোর্সের হিসাব প্রতিষ্ঠানভেদে আলাদা হতে পারে।", "Most universities use a 4.00 scale, though some use 5.00. Check your institution's grading and credit rules, because retakes and dropped courses may be counted differently from one institution to another."],
        ],
      },
    ],
    faqs: [
      { q: ["CGPA কি সেমিস্টার GPA-র গড়?", "Is CGPA the average of semester GPAs?"], a: ["না, এটি ক্রেডিট দিয়ে ভারযুক্ত গড়। Σ(GPA × ক্রেডিট) ÷ Σ ক্রেডিট।", "No, it is a credit-weighted average: Σ(GPA × credits) ÷ Σ credits."] },
      { q: ["৩.৫ আর ৩ GPA, দুটোই ১৫ ক্রেডিট হলে CGPA কত?", "What is the CGPA for GPA 3.5 and 3.0 with 15 credits each?"], a: ["ক্রেডিট সমান হলে সাধারণ গড়ই হয়: (৩.৫ + ৩.০) ÷ ২ = ৩.২৫।", "With equal credits it equals the plain average: (3.5 + 3.0) ÷ 2 = 3.25."] },
      { q: ["রিটেক করলে CGPA কীভাবে হিসাব হয়?", "How is CGPA counted after a retake?"], a: ["এটি প্রতিষ্ঠানের নিয়মের ওপর নির্ভর করে, তাই আপনার বিশ্ববিদ্যালয়ের নিয়ম দেখে নিন।", "It depends on your institution's rules, so check your university's policy."] },
    ],
  },
  {
    slug: "emi-kisti-hisab-niyom",
    title: ["EMI বা মাসিক কিস্তি কীভাবে হিসাব করবেন? ঋণের সূত্র ও উদাহরণ", "How to calculate EMI: loan formula with examples"],
    desc: ["ব্যাংক ঋণের মাসিক কিস্তি (EMI), মোট সুদ ও মোট পরিশোধ বের করার সূত্র, উদাহরণসহ।", "The formula for a bank loan's monthly instalment (EMI), total interest and total repayment, with examples."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "emi-calculator-bd", name: ["EMI ক্যালকুলেটর", "EMI calculator"] },
    sections: [
      {
        h: ["EMI কী", "What EMI is"],
        p: [
          ["EMI (Equated Monthly Instalment) হলো ঋণ শোধের জন্য প্রতি মাসে একই অঙ্কের কিস্তি। এতে আসল ও সুদ দুটোই থাকে। শুরুতে কিস্তির বড় অংশ সুদ, পরে আসলের অংশ বাড়ে।", "EMI (Equated Monthly Instalment) is the fixed amount you pay each month to repay a loan. It contains both principal and interest. Early on most of it is interest, and the principal share grows later."],
        ],
      },
      {
        h: ["সূত্র", "The formula"],
        p: [
          ["EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1)। এখানে P হলো ঋণের পরিমাণ, r হলো মাসিক সুদের হার (বার্ষিক হার ÷ ১২ ÷ ১০০) এবং n হলো মাসের সংখ্যা।", "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1). Here P is the loan amount, r is the monthly rate (annual rate ÷ 12 ÷ 100) and n is the number of months."],
        ],
      },
      {
        h: ["উদাহরণ ১: ৫ লাখ টাকা, ১০%, ১২ মাস", "Example 1: 5 lakh taka, 10%, 12 months"],
        p: [
          ["P = ৫,০০,০০০, বার্ষিক ১০%, n = ১২। এই সূত্রে মাসিক কিস্তি প্রায় ৪৩,৯৫৮ টাকা। মোট পরিশোধ প্রায় ৫,২৭,৪৯৫ টাকা, অর্থাৎ মোট সুদ প্রায় ২৭,৪৯৫ টাকা।", "P = 5,00,000, 10% a year, n = 12. By this formula the monthly instalment is about 43,958 taka. Total repayment is about 5,27,495 taka, so the total interest is about 27,495 taka."],
        ],
      },
      {
        h: ["উদাহরণ ২: ১০ লাখ টাকা, ৯.৫%, ৫ বছর", "Example 2: 10 lakh taka, 9.5%, 5 years"],
        p: [
          ["P = ১০,০০,০০০, বার্ষিক ৯.৫%, n = ৬০ মাস। মাসিক কিস্তি প্রায় ২১,০০২ টাকা। মোট পরিশোধ প্রায় ১২,৬০,১১২ টাকা এবং মোট সুদ প্রায় ২,৬০,১১২ টাকা।", "P = 10,00,000, 9.5% a year, n = 60 months. The monthly instalment is about 21,002 taka. Total repayment is about 12,60,112 taka and total interest about 2,60,112 taka."],
        ],
      },
      {
        h: ["ব্যাংকের হিসাবের সঙ্গে মেলানো", "Matching with the bank's figure"],
        p: [
          ["ব্যাংক প্রসেসিং ফি, বীমা, আবগারি শুল্ক বা ভিন্ন সুদের পদ্ধতি ধরলে কিস্তি এই হিসাব থেকে কিছুটা আলাদা হতে পারে। চূড়ান্ত অঙ্কের জন্য ব্যাংকের অফার লেটার দেখুন।", "If the bank adds a processing fee, insurance, excise duty or uses a different interest method, the instalment can differ slightly from this calculation. For the final figure, see the bank's offer letter."],
        ],
      },
    ],
    faqs: [
      { q: ["ঋণের মেয়াদ বাড়ালে কী হয়?", "What happens if I lengthen the loan term?"], a: ["মাসিক কিস্তি কমে, কিন্তু মোট সুদ বেড়ে যায়।", "The monthly instalment falls, but the total interest rises."] },
      { q: ["সুদের হার ০% হলে EMI কত?", "What is the EMI at 0% interest?"], a: ["তখন EMI = P ÷ n, অর্থাৎ ঋণ সমান ভাগে ভাগ হয়।", "Then EMI = P ÷ n, i.e. the loan is simply split equally."] },
      { q: ["এই হিসাব কি ব্যাংকের হিসাবের সঙ্গে হুবহু মিলবে?", "Will this match the bank exactly?"], a: ["সাধারণ হ্রাসমান স্থিতিতে প্রায় মিলবে, তবে ফি ও চার্জ ধরলে ব্যাংকের অঙ্ক আলাদা হতে পারে।", "On a standard reducing balance it should be close, but fees and charges can make the bank's figure differ."] },
    ],
  },
  {
    slug: "bmi-hisab-niyom",
    title: ["BMI কীভাবে হিসাব করবেন? ওজন ও উচ্চতা থেকে সহজ নিয়ম", "How to calculate BMI from weight and height"],
    desc: ["কেজি ও সেমি থেকে BMI বের করার সূত্র, কম ওজন, স্বাভাবিক ও বেশি ওজনের সীমা এবং উদাহরণ।", "The formula for BMI from kg and cm, the underweight, normal and overweight ranges, and an example."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "bmi-calculator", name: ["BMI ক্যালকুলেটর", "BMI calculator"] },
    sections: [
      {
        h: ["সূত্র", "The formula"],
        p: [
          ["BMI = ওজন (কেজি) ÷ উচ্চতা (মিটার)²। সেমিকে ১০০ দিয়ে ভাগ করে মিটার বানিয়ে নিন।", "BMI = weight (kg) ÷ height (metres)². Divide centimetres by 100 to get metres."],
        ],
      },
      {
        h: ["উদাহরণ", "Example"],
        p: [
          ["ওজন ৭০ কেজি, উচ্চতা ১৭০ সেমি (১.৭ মিটার)। ১.৭ × ১.৭ = ২.৮৯। BMI = ৭০ ÷ ২.৮৯ = প্রায় ২৪.২২, যা স্বাভাবিক সীমার মধ্যে।", "Weight 70 kg, height 170 cm (1.7 m). 1.7 × 1.7 = 2.89. BMI = 70 ÷ 2.89 = about 24.22, which is in the normal range."],
          ["১৭০ সেমি উচ্চতায় স্বাভাবিক ওজনের সীমা: ১৮.৫ × ২.৮৯ = প্রায় ৫৩.৫ কেজি থেকে ২৪.৯ × ২.৮৯ = প্রায় ৭২.০ কেজি।", "At 170 cm the normal weight range is 18.5 × 2.89 = about 53.5 kg to 24.9 × 2.89 = about 72.0 kg."],
        ],
      },
      {
        h: ["সাধারণ বিভাগ", "Common categories"],
        p: [
          ["সাধারণভাবে ১৮.৫ এর নিচে কম ওজন, ১৮.৫ থেকে ২৪.৯ স্বাভাবিক, ২৫ থেকে ২৯.৯ বেশি ওজন এবং ৩০ বা তার বেশি স্থূলতা ধরা হয়। এশীয়দের জন্য কিছু সংস্থা ভিন্ন সীমা ব্যবহার করে।", "Commonly, below 18.5 is underweight, 18.5 to 24.9 normal, 25 to 29.9 overweight, and 30 or above obese. Some bodies use different cut-offs for Asian populations."],
        ],
      },
      {
        h: ["BMI-র সীমাবদ্ধতা", "Limits of BMI"],
        p: [
          ["BMI পেশি ও চর্বির পার্থক্য ধরে না, তাই খেলোয়াড় বা বয়স্কদের ক্ষেত্রে বিভ্রান্তিকর হতে পারে। এটি শুধু একটি মোটামুটি সূচক, রোগ নির্ণয় নয়। স্বাস্থ্য নিয়ে চিন্তা থাকলে চিকিৎসকের পরামর্শ নিন।", "BMI does not separate muscle from fat, so it can mislead for athletes or older people. It is only a rough indicator, not a diagnosis. If you are worried about your health, see a doctor."],
        ],
      },
    ],
    faqs: [
      { q: ["৬৫ কেজি ও ১৬৫ সেমির BMI কত?", "What is the BMI for 65 kg and 165 cm?"], a: ["১৬৫ সেমি = ১.৬৫ মিটার, ১.৬৫² = ২.৭২২৫। ৬৫ ÷ ২.৭২২৫ = প্রায় ২৩.৮৮, স্বাভাবিক।", "165 cm = 1.65 m, 1.65² = 2.7225. 65 ÷ 2.7225 = about 23.88, normal."] },
      { q: ["স্বাভাবিক BMI কত?", "What is a normal BMI?"], a: ["সাধারণভাবে ১৮.৫ থেকে ২৪.৯।", "Generally 18.5 to 24.9."] },
      { q: ["BMI কি সবার জন্য নির্ভরযোগ্য?", "Is BMI reliable for everyone?"], a: ["না, পেশিবহুল ব্যক্তি, বয়স্ক বা শিশুদের ক্ষেত্রে এটি যথেষ্ট নয়।", "No, it is not sufficient for muscular people, older adults or children."] },
    ],
  },
  {
    slug: "percentage-hisab-niyom",
    title: ["শতকরা (পার্সেন্টেজ) কীভাবে হিসাব করবেন? সহজ সূত্র ও উদাহরণ", "How to calculate a percentage: simple formulas and examples"],
    desc: ["X এর Y% কত, একটি সংখ্যা আরেকটির কত শতাংশ এবং শতকরা বৃদ্ধি-হ্রাস বের করার সূত্র, পরীক্ষার নম্বর ও দামের উদাহরণসহ।", "Formulas for Y% of X, one number as a percentage of another, and percentage increase or decrease, with exam marks and price examples."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "percentage-calculator", name: ["শতকরা হিসাব ক্যালকুলেটর", "Percentage calculator"] },
    sections: [
      {
        h: ["X এর Y% কত", "Finding Y% of X"],
        p: [
          ["সূত্র: X × Y ÷ ১০০। যেমন ২০০ টাকার ১৫% = ২০০ × ১৫ ÷ ১০০ = ৩০ টাকা।", "Formula: X × Y ÷ 100. For example, 15% of 200 taka = 200 × 15 ÷ 100 = 30 taka."],
        ],
      },
      {
        h: ["একটি সংখ্যা আরেকটির কত শতাংশ", "One number as a percentage of another"],
        p: [
          ["সূত্র: অংশ ÷ মোট × ১০০। ৫০ নম্বরের মধ্যে ৪০ পেলে ৪০ ÷ ৫০ × ১০০ = ৮০%। ৫০০ নম্বরের মধ্যে ৪৩২ পেলে ৪৩২ ÷ ৫০০ × ১০০ = ৮৬.৪%।", "Formula: part ÷ total × 100. Scoring 40 out of 50 gives 40 ÷ 50 × 100 = 80%. Scoring 432 out of 500 gives 432 ÷ 500 × 100 = 86.4%."],
        ],
      },
      {
        h: ["শতকরা বৃদ্ধি ও হ্রাস", "Percentage increase and decrease"],
        p: [
          ["সূত্র: (নতুন মান − পুরোনো মান) ÷ পুরোনো মান × ১০০। দাম ৫০০ থেকে ৬০০ হলে (৬০০ − ৫০০) ÷ ৫০০ × ১০০ = ২০% বৃদ্ধি। আবার ৬০০ থেকে ৫০০ হলে (৫০০ − ৬০০) ÷ ৬০০ × ১০০ = প্রায় −১৬.৬৭%, অর্থাৎ প্রায় ১৬.৬৭% হ্রাস।", "Formula: (new value − old value) ÷ old value × 100. If a price goes from 500 to 600, that is (600 − 500) ÷ 500 × 100 = a 20% increase. From 600 back to 500 it is (500 − 600) ÷ 600 × 100 = about −16.67%, a decrease of about 16.67%."],
          ["লক্ষ করুন, বৃদ্ধি ও হ্রাসের শতাংশ এক হয় না, কারণ প্রতিবার ভাগ হয় পুরোনো মান দিয়ে।", "Notice that the increase and decrease percentages are not the same, because each time you divide by the old value."],
        ],
      },
      {
        h: ["শতকরা যোগ ও বিয়োগ", "Adding and subtracting a percentage"],
        p: [
          ["২,০০০ টাকার সঙ্গে ১৫% যোগ করতে: ২,০০০ × (১ + ০.১৫) = ২,৩০০ টাকা। ১,৫০০ টাকা থেকে ১০% ছাড় দিতে: ১,৫০০ × (১ − ০.১০) = ১,৩৫০ টাকা।", "To add 15% to 2,000 taka: 2,000 × (1 + 0.15) = 2,300 taka. To take 10% off 1,500 taka: 1,500 × (1 − 0.10) = 1,350 taka."],
        ],
      },
    ],
    faqs: [
      { q: ["শতকরা হিসাবের মূল সূত্র কী?", "What is the basic percentage formula?"], a: ["অংশ ÷ মোট × ১০০।", "Part ÷ total × 100."] },
      { q: ["৩০০ এর ২৫% কত?", "What is 25% of 300?"], a: ["৩০০ × ২৫ ÷ ১০০ = ৭৫।", "300 × 25 ÷ 100 = 75."] },
      { q: ["২০% ছাড়ের পর দাম ৮০০ টাকা হলে আসল দাম কত?", "If the price after a 20% discount is 800 taka, what was the original price?"], a: ["ছাড়ের পর দাম আসল দামের ৮০%। তাই আসল দাম = ৮০০ ÷ ০.৮ = ১,০০০ টাকা।", "After the discount the price is 80% of the original, so the original is 800 ÷ 0.8 = 1,000 taka."] },
    ],
  },
  {
    slug: "boyosh-hisab-niyom",
    title: ["বয়স কীভাবে হিসাব করবেন? জন্মতারিখ থেকে বছর, মাস ও দিন", "How to calculate age in years, months and days from a date of birth"],
    desc: ["জন্মতারিখ থেকে আজ পর্যন্ত বছর, মাস ও দিনে বয়স বের করার ধাপ, উদাহরণ এবং কোথায় কাজে লাগে।", "Steps to work out age in years, months and days from a date of birth, with an example and where it helps."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "age-calculator", name: ["বয়স ক্যালকুলেটর", "Age calculator"] },
    sections: [
      {
        h: ["হাতে হিসাবের ধাপ", "Steps to work it out by hand"],
        p: [
          ["প্রথমে পুরো বছর গুনুন, যতক্ষণ না এ বছরের জন্মদিন পার হয়। এরপর শেষ জন্মদিন থেকে পূর্ণ মাস গুনুন। সবশেষে ওই মাসের তারিখ থেকে আজকের তারিখ পর্যন্ত দিন গুনুন।", "First count whole years until this year's birthday has passed. Then count whole months since the last birthday. Finally count the days from that monthly date to today."],
        ],
      },
      {
        h: ["উদাহরণ", "Example"],
        p: [
          ["জন্ম ১৫ মার্চ ২০০৮, হিসাবের দিন ৩ নভেম্বর ২০২৬। ১৫ মার্চ ২০০৮ থেকে ১৫ মার্চ ২০২৬ পর্যন্ত ১৮ বছর। ১৫ মার্চ ২০২৬ থেকে ১৫ অক্টোবর ২০২৬ পর্যন্ত ৭ মাস। ১৫ অক্টোবর থেকে ৩ নভেম্বর পর্যন্ত ১৯ দিন (অক্টোবরে ৩১ দিন, তাই ১৫ থেকে ৩১ অক্টোবর ১৬ দিন, তারপর ৩ দিন)। বয়স ১৮ বছর ৭ মাস ১৯ দিন।", "Born 15 March 2008, calculated on 3 November 2026. From 15 March 2008 to 15 March 2026 is 18 years. From 15 March 2026 to 15 October 2026 is 7 months. From 15 October to 3 November is 19 days (October has 31 days, so 16 days from 15 to 31 October, then 3 more). The age is 18 years, 7 months and 19 days."],
        ],
      },
      {
        h: ["কোথায় কাজে লাগে", "Where it helps"],
        p: [
          ["ফর্ম পূরণ, স্কুল বা কলেজে ভর্তি এবং চাকরির আবেদনে বয়স হিসাব করতে হয়। কোনো আবেদনে বয়সের সীমা থাকলে বিজ্ঞপ্তিতে লেখা নির্দিষ্ট তারিখ অনুযায়ী বয়স গুনুন এবং বিজ্ঞপ্তির নিয়ম মিলিয়ে নিন।", "You need an age for forms, school or college admission and job applications. If an application has an age limit, count the age as of the date stated in the notice and check the notice for its rules."],
        ],
      },
    ],
    faqs: [
      { q: ["জন্মতারিখ থেকে আজ পর্যন্ত বয়স কীভাবে বের করব?", "How do I find my age from my date of birth?"], a: ["জন্মতারিখ ও আজকের তারিখ দিলে ক্যালকুলেটর বছর, মাস ও দিন দেখায়। হাতে করলে উপরের ধাপগুলো মানুন।", "Enter your date of birth and today's date and the calculator shows years, months and days. By hand, follow the steps above."] },
      { q: ["অন্য একটি তারিখ অনুযায়ী বয়স জানা যাবে?", "Can I find the age as of another date?"], a: ["হ্যাঁ, হিসাবের তারিখ বদলে দিলেই হবে।", "Yes, just change the calculation date."] },
    ],
  },
  {
    slug: "taka-kothay-likhar-niyom",
    title: ["টাকার অঙ্ক কথায় কীভাবে লিখবেন? লাখ, কোটি ও চেকে লেখার নিয়ম", "How to write a taka amount in words: lakh, crore and writing cheques"],
    desc: ["বাংলাদেশের লাখ-কোটি পদ্ধতিতে সংখ্যা ভাগ করে অঙ্ক কথায় লেখার সহজ নিয়ম, উদাহরণসহ।", "A simple method for splitting a number in the Bangladeshi lakh-crore system and writing the amount in words, with an example."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "number-to-words-bd", name: ["টাকার অঙ্ক কথায়", "Number to words"] },
    sections: [
      {
        h: ["লাখ-কোটির ভাগ", "The lakh-crore grouping"],
        p: [
          ["বাংলাদেশে সংখ্যার কমা ডান দিক থেকে প্রথমে তিন অঙ্ক, তারপর প্রতি দুই অঙ্ক পরপর বসে। যেমন ১২,৩৪,৫৬৭। ডান থেকে ভাগগুলো হলো: ৫৬৭ (শতক), ৩৪ (হাজার), ১২ (লাখ)।", "In Bangladesh, commas go after the first three digits from the right and then after every two digits, for example 12,34,567. From the right the groups are 567 (hundreds), 34 (thousands) and 12 (lakh)."],
          ["১০০ হাজারে ১ লাখ এবং ১০০ লাখে ১ কোটি।", "100 thousand makes 1 lakh, and 100 lakh makes 1 crore."],
        ],
      },
      {
        h: ["উদাহরণ", "Example"],
        p: [
          ["১২,৩৪,৫৬৭ টাকা = বারো লাখ চৌত্রিশ হাজার পাঁচশ সাতষট্টি টাকা। প্রতিটি ভাগের নাম বলে এরপর ভাগের সংখ্যাকে শব্দ করুন।", "12,34,567 taka = twelve lakh thirty-four thousand five hundred sixty-seven taka. Say each group's number in words, then add the group's name."],
        ],
      },
      {
        h: ["চেক বা ভাউচারে লেখার সময়", "When writing a cheque or voucher"],
        p: [
          ["সংখ্যা ও কথায় লেখা অঙ্ক একই হতে হবে। কথায় লেখার পর সাধারণত শেষে টাকা মাত্র লেখা হয়। ফাঁকা জায়গা রাখলে কেউ অঙ্ক বদলাতে পারে, তাই লাইন টেনে ফাঁকা অংশ ভরাট করে দিন। ব্যাংকের নিজস্ব নিয়ম থাকলে সেটি মানুন।", "The amount in figures and in words must match. After the words it is usual to add \"only\" (taka matro in Bangla). Blank space lets someone change the amount, so draw a line through any empty part. Follow your bank's own rules if it has any."],
        ],
      },
    ],
    faqs: [
      { q: ["১ কোটি মানে কত লাখ?", "How many lakh is 1 crore?"], a: ["১০০ লাখ।", "100 lakh."] },
      { q: ["১,০০,০০০ কে কী বলে?", "What is 1,00,000 called?"], a: ["এক লাখ।", "One lakh."] },
      { q: ["পয়সাসহ টাকা কথায় কীভাবে লিখব?", "How do I write an amount with paisa in words?"], a: ["আগে টাকা কথায় লিখুন, তারপর পয়সা কথায় লিখুন। যেমন ১২৩.৫০ = একশ তেইশ টাকা পঞ্চাশ পয়সা।", "Write the taka in words first and then the paisa. For example 123.50 = one hundred twenty-three taka fifty paisa."] },
    ],
  },
  {
    slug: "bargofut-theke-shotangsho",
    title: ["বর্গফুট থেকে শতাংশ কীভাবে হিসাব করবেন? জমি মাপার সহজ নিয়ম", "How to convert square feet to shotangsho: a simple land measurement guide"],
    desc: ["১,৪০০ বর্গফুট কত শতাংশ, ১ শতাংশে কত বর্গফুট এবং একরের হিসাব, উদাহরণসহ।", "How many shotangsho is 1,400 square feet, how many square feet in 1 shotangsho, and the acre conversion, with examples."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "land-calculator-bd", name: ["জমি পরিমাপ ক্যালকুলেটর", "Land calculator"] },
    sections: [
      {
        h: ["মূল মাপ", "The basic measures"],
        p: [
          ["১ শতাংশ = ৪৩৫.৬ বর্গফুট। ১ একর = ১০০ শতাংশ = ৪৩,৫৬০ বর্গফুট।", "1 shotangsho = 435.6 square feet. 1 acre = 100 shotangsho = 43,560 square feet."],
        ],
      },
      {
        h: ["বর্গফুট থেকে শতাংশ", "Square feet to shotangsho"],
        p: [
          ["সূত্র: বর্গফুট ÷ ৪৩৫.৬। যেমন ১,৪০০ বর্গফুট ÷ ৪৩৫.৬ = প্রায় ৩.২১ শতাংশ। ১,০০০ বর্গফুট = প্রায় ২.৩০ শতাংশ এবং ২,০০০ বর্গফুট = প্রায় ৪.৫৯ শতাংশ।", "Formula: square feet ÷ 435.6. For example 1,400 sq ft ÷ 435.6 = about 3.21 shotangsho. 1,000 sq ft is about 2.30 and 2,000 sq ft is about 4.59 shotangsho."],
        ],
      },
      {
        h: ["শতাংশ থেকে বর্গফুট", "Shotangsho to square feet"],
        p: [
          ["সূত্র: শতাংশ × ৪৩৫.৬। যেমন ৩ শতাংশ × ৪৩৫.৬ = ১,৩০৬.৮ বর্গফুট। ১০ শতাংশ = ৪,৩৫৬ বর্গফুট।", "Formula: shotangsho × 435.6. For example 3 shotangsho × 435.6 = 1,306.8 sq ft. 10 shotangsho = 4,356 sq ft."],
        ],
      },
      {
        h: ["কাঠা ও বিঘা নিয়ে সতর্কতা", "A caution about katha and bigha"],
        p: [
          ["কাঠা ও বিঘার মাপ এলাকাভেদে আলাদা হয়। তাই দলিলে বা এলাকায় কাঠা কত বর্গফুট ধরা হয় তা নিশ্চিত হয়ে হিসাব করুন। আমাদের ক্যালকুলেটরে কাঠার মাপ নিজে বদলে নেওয়া যায়। জমির দলিলের হিসাবের জন্য সরকারি ভূমি অফিস বা সার্ভেয়ারের মাপই চূড়ান্ত।", "The size of a katha or bigha differs by area, so confirm how many square feet a katha means in your deed or locality. Our calculator lets you change the katha size. For legal land records, the measurement from the government land office or a surveyor is final."],
        ],
      },
    ],
    faqs: [
      { q: ["১,৪০০ বর্গফুট কত শতাংশ?", "How many shotangsho is 1,400 square feet?"], a: ["১,৪০০ ÷ ৪৩৫.৬ = প্রায় ৩.২১ শতাংশ।", "1,400 ÷ 435.6 = about 3.21 shotangsho."] },
      { q: ["১ শতাংশে কত বর্গফুট?", "How many square feet in 1 shotangsho?"], a: ["৪৩৫.৬ বর্গফুট।", "435.6 square feet."] },
      { q: ["১ একরে কত শতাংশ?", "How many shotangsho in 1 acre?"], a: ["১০০ শতাংশ।", "100 shotangsho."] },
    ],
  },
  {
    slug: "usa-somoy-bangladesh-somoy",
    title: ["আমেরিকার সময় বাংলাদেশে কত? সময়ের পার্থক্য ও হিসাব", "US time in Bangladesh time: the time difference explained"],
    desc: ["নিউ ইয়র্ক, লস অ্যাঞ্জেলেস ও অন্য মার্কিন সময়কে বাংলাদেশ সময়ে বদলানোর নিয়ম, শীত ও গ্রীষ্মের পার্থক্যসহ।", "How to convert New York, Los Angeles and other US times to Bangladesh time, including the winter and summer difference."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "time-zone-converter", name: ["টাইম জোন কনভার্টার", "Time zone converter"] },
    sections: [
      {
        h: ["বাংলাদেশের সময়", "Bangladesh time"],
        p: [
          ["বাংলাদেশ UTC+৬ সময়ে চলে এবং বর্তমানে ডে-লাইট সেভিং ব্যবহার করে না, তাই সারা বছর পার্থক্য একই থাকে।", "Bangladesh follows UTC+6 and currently does not use daylight saving time, so its offset stays the same all year."],
        ],
      },
      {
        h: ["যুক্তরাষ্ট্রের সময়ের পার্থক্য", "The difference with US time"],
        p: [
          ["যুক্তরাষ্ট্রের অনেক অঞ্চলে সময় বছরে দুবার বদলায়। মার্চের দ্বিতীয় রবিবার থেকে নভেম্বরের প্রথম রবিবার পর্যন্ত গ্রীষ্মকালীন সময় চলে। এ বছর তা ১ নভেম্বর ২০২৬ এ শেষ হয়েছে।", "In much of the US the clocks change twice a year. Daylight saving time runs from the second Sunday of March to the first Sunday of November. This year it ended on 1 November 2026."],
          ["পূর্ব সময় (নিউ ইয়র্ক): শীতে (EST) বাংলাদেশ ১১ ঘণ্টা এগিয়ে, গ্রীষ্মে (EDT) ১০ ঘণ্টা। পশ্চিম সময় (লস অ্যাঞ্জেলেস): শীতে (PST) ১৪ ঘণ্টা, গ্রীষ্মে (PDT) ১৩ ঘণ্টা।", "Eastern time (New York): Bangladesh is 11 hours ahead in winter (EST) and 10 hours ahead in summer (EDT). Pacific time (Los Angeles): 14 hours ahead in winter (PST) and 13 hours in summer (PDT)."],
        ],
      },
      {
        h: ["উদাহরণ", "Examples"],
        p: [
          ["নভেম্বরে নিউ ইয়র্কে সকাল ৯টা মানে বাংলাদেশে একই দিন রাত ৮টা। জুলাইয়ে নিউ ইয়র্কে সকাল ৯টা মানে বাংলাদেশে সন্ধ্যা ৭টা। নভেম্বরে লস অ্যাঞ্জেলেসে সকাল ৯টা মানে বাংলাদেশে রাত ১১টা।", "9:00 AM in New York in November is 8:00 PM the same day in Bangladesh. 9:00 AM in New York in July is 7:00 PM in Bangladesh. 9:00 AM in Los Angeles in November is 11:00 PM in Bangladesh."],
          ["পার্থক্য যোগ করার পর সময় ২৪ ঘণ্টার বেশি হলে পরের দিনে চলে যায়, তাই তারিখও মিলিয়ে নিন।", "If adding the difference passes midnight, the date moves to the next day, so check the date too."],
        ],
      },
    ],
    faqs: [
      { q: ["এখন আমেরিকার পূর্ব সময় ও বাংলাদেশ সময়ের পার্থক্য কত?", "What is the gap between US Eastern and Bangladesh time now?"], a: ["নভেম্বর ২০২৬ থেকে (শীতকালীন সময়) ১১ ঘণ্টা। গ্রীষ্মকালীন সময় শুরু হলে ১০ ঘণ্টা হবে।", "From November 2026 (winter time) it is 11 hours. It will be 10 hours once daylight saving starts again."] },
      { q: ["মিটিংয়ের সময় ঠিক করতে কী করব?", "How do I set a meeting time?"], a: ["টাইম জোন কনভার্টারে দুই দেশের শহর বেছে সময় দিন। ব্রাউজার ডে-লাইট সেভিং নিজেই হিসাব করে।", "Pick both cities in the time zone converter and enter the time. The browser works out daylight saving itself."] },
    ],
  },
  {
    slug: "gpa-4th-subject-hisab",
    title: ["এসএসসি-এইচএসসি জিপিএ কীভাবে হিসাব করবেন? ৪র্থ বিষয়সহ ও ছাড়া", "How to calculate SSC and HSC GPA with and without the 4th subject"],
    desc: ["গ্রেড পয়েন্ট যোগ করে জিপিএ বের করার নিয়ম, ৪র্থ বিষয়ের অতিরিক্ত পয়েন্ট কীভাবে যোগ হয় এবং উদাহরণ।", "How to find GPA by adding grade points, how the 4th subject's extra points are added, and an example."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "gpa-calculator-bd", name: ["জিপিএ ক্যালকুলেটর", "GPA calculator"] },
    sections: [
      {
        h: ["গ্রেড ও পয়েন্ট", "Grades and points"],
        p: [
          ["সাধারণ বোর্ডে নম্বর অনুযায়ী পয়েন্ট: ৮০-১০০ A+ (৫.০০), ৭০-৭৯ A (৪.০০), ৬০-৬৯ A- (৩.৫০), ৫০-৫৯ B (৩.০০), ৪০-৪৯ C (২.০০), ৩৩-৩৯ D (১.০০), ০-৩২ F (০.০০)।", "In the general boards the points follow marks: 80-100 A+ (5.00), 70-79 A (4.00), 60-69 A- (3.50), 50-59 B (3.00), 40-49 C (2.00), 33-39 D (1.00), 0-32 F (0.00)."],
        ],
      },
      {
        h: ["৪র্থ বিষয় ছাড়া জিপিএ", "GPA without the 4th subject"],
        p: [
          ["সব আবশ্যিক বিষয়ের পয়েন্ট যোগ করে বিষয়ের সংখ্যা দিয়ে ভাগ করুন। জিপিএ = মোট পয়েন্ট ÷ বিষয়ের সংখ্যা।", "Add the points of all compulsory subjects and divide by the number of subjects. GPA = total points ÷ number of subjects."],
        ],
      },
      {
        h: ["৪র্থ বিষয়সহ জিপিএ", "GPA with the 4th subject"],
        p: [
          ["৪র্থ বিষয়ের পয়েন্ট ২.০০ এর বেশি হলে শুধু বাড়তি অংশ (পয়েন্ট − ২) মোট পয়েন্টের সঙ্গে যোগ হয়। ভাগ হয় আবশ্যিক বিষয়ের সংখ্যা দিয়েই। ৪র্থ বিষয়ে ২.০০ বা তার কম পেলে কিছু যোগ হয় না। জিপিএ ৫.০০ এর বেশি দেখানো হয় না।", "If the 4th subject's points are above 2.00, only the extra part (points − 2) is added to the total. The divisor stays the number of compulsory subjects. If the 4th subject is 2.00 or less, nothing is added. A GPA is not shown above 5.00."],
          ["উদাহরণ: ধরুন ১০টি আবশ্যিক বিষয়ে মোট ৪০ পয়েন্ট এবং ৪র্থ বিষয়ে ৪.০০। জিপিএ = (৪০ + (৪ − ২)) ÷ ১০ = ৪২ ÷ ১০ = ৪.২০।", "Example: say 10 compulsory subjects total 40 points and the 4th subject is 4.00. GPA = (40 + (4 − 2)) ÷ 10 = 42 ÷ 10 = 4.20."],
        ],
      },
      {
        h: ["বোর্ডভেদে পার্থক্য", "Differences between boards"],
        p: [
          ["বিষয়ের সংখ্যা শাখা ও বোর্ডভেদে (সাধারণ, মাদ্রাসা, কারিগরি) আলাদা হতে পারে। চূড়ান্ত হিসাবের জন্য নিজের বোর্ডের ফলাফল বিজ্ঞপ্তি বা মার্কশিট দেখুন।", "The number of subjects can differ by stream and board (general, madrasah, technical). For the final figure check your board's result notice or marksheet."],
        ],
      },
    ],
    faqs: [
      { q: ["৪র্থ বিষয় ছাড়া জিপিএ কীভাবে বের করব?", "How do I find GPA without the 4th subject?"], a: ["সব আবশ্যিক বিষয়ের পয়েন্ট যোগ করে বিষয়ের সংখ্যা দিয়ে ভাগ করুন।", "Add the points of all compulsory subjects and divide by their number."] },
      { q: ["৪র্থ বিষয়ে A পেলে কত যোগ হয়?", "How much is added for an A in the 4th subject?"], a: ["A এর পয়েন্ট ৪.০০, তাই ৪ − ২ = ২ পয়েন্ট যোগ হয়।", "An A is 4.00 points, so 4 − 2 = 2 points are added."] },
    ],
  },
  {
    slug: "university-cgpa-grade-point",
    title: ["বিশ্ববিদ্যালয়ে A-, B+ এর পয়েন্ট কত? CGPA ও গ্রেড পয়েন্টের নিয়ম", "University grade points in Bangladesh: A-, B+ and how CGPA works"],
    desc: ["বাংলাদেশের বিশ্ববিদ্যালয়ে গ্রেডের পয়েন্ট কেন আলাদা, দুটি প্রচলিত স্কেল এবং ক্রেডিট দিয়ে CGPA হিসাবের উদাহরণ।", "Why grade points differ between Bangladeshi universities, two common scales, and a CGPA example using credits."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "cgpa-calculator", name: ["CGPA ক্যালকুলেটর", "CGPA calculator"] },
    sections: [
      {
        h: ["প্রতি বিশ্ববিদ্যালয়ে স্কেল আলাদা", "Each university has its own scale"],
        p: [
          ["বাংলাদেশে সব বিশ্ববিদ্যালয়ে একই গ্রেড স্কেল নেই। একটি প্রচলিত ৪.০০ স্কেলে A+ = ৪.০০, A = ৩.৭৫, A- = ৩.৫০, B+ = ৩.২৫, B = ৩.০০, B- = ২.৭৫, C+ = ২.৫০, C = ২.২৫, D = ২.০০, F = ০।", "Bangladeshi universities do not all use one grade scale. One common 4.00 scale is A+ = 4.00, A = 3.75, A- = 3.50, B+ = 3.25, B = 3.00, B- = 2.75, C+ = 2.50, C = 2.25, D = 2.00, F = 0."],
          ["কিছু বিশ্ববিদ্যালয় অন্য স্কেল ব্যবহার করে, যেমন A- = ৩.৭০ এবং B+ = ৩.৩০ (IUB ও BRAC ইউনিভার্সিটিতে এমন দেখা যায়), আবার কোথাও A- = ৩.৬৭ এবং B+ = ৩.৩৩।", "Some universities use another scale, for example A- = 3.70 and B+ = 3.30 (seen at IUB and BRAC University), and elsewhere A- = 3.67 and B+ = 3.33."],
          ["এসব তথ্য প্রকাশিত তালিকা থেকে নেওয়া এবং বদলাতে পারে। তাই নিজের বিশ্ববিদ্যালয়ের গ্রেডিং পলিসি দেখে নিন।", "These figures come from published lists and may change, so check your own university's grading policy."],
        ],
      },
      {
        h: ["CGPA কীভাবে হিসাব হয়", "How CGPA is calculated"],
        p: [
          ["সূত্র: CGPA = Σ (কোর্সের গ্রেড পয়েন্ট × ক্রেডিট) ÷ মোট ক্রেডিট।", "Formula: CGPA = Σ (course grade point × credits) ÷ total credits."],
          ["উদাহরণ: তিনটি কোর্স। ৩ ক্রেডিটে ৩.৭৫, ৩ ক্রেডিটে ৩.২৫ এবং ৪ ক্রেডিটে ৩.৫০। (৩ × ৩.৭৫ + ৩ × ৩.২৫ + ৪ × ৩.৫০) ÷ ১০ = (১১.২৫ + ৯.৭৫ + ১৪) ÷ ১০ = ৩৫ ÷ ১০ = ৩.৫০।", "Example: three courses. 3.75 on 3 credits, 3.25 on 3 credits and 3.50 on 4 credits. (3 × 3.75 + 3 × 3.25 + 4 × 3.50) ÷ 10 = (11.25 + 9.75 + 14) ÷ 10 = 35 ÷ 10 = 3.50."],
        ],
      },
    ],
    faqs: [
      { q: ["A- এর পয়েন্ট কত?", "What is the grade point of A-?"], a: ["স্কেলভেদে ৩.৫০ বা ৩.৭০ ও ৩.৬৭ হতে পারে। নিজের বিশ্ববিদ্যালয়ের স্কেল দেখুন।", "Depending on the scale it can be 3.50, 3.70 or 3.67. Check your university's scale."] },
      { q: ["৩.৩৩ জিপিএ কত গ্রেড?", "What grade is a 3.33 GPA?"], a: ["যে স্কেলে B+ = ৩.৩৩ (যেমন UIU তে), সেখানে এটি B+। অন্য স্কেলে ৩.৩৩ গ্রেডের মাঝামাঝি পড়তে পারে।", "On a scale where B+ = 3.33 (for example at UIU) it is B+. On other scales 3.33 may fall between two grades."] },
      { q: ["ক্রেডিট ছাড়া CGPA হিসাব করা যায়?", "Can I work out CGPA without credits?"], a: ["সব কোর্সের ক্রেডিট সমান হলে গ্রেড পয়েন্টের সাধারণ গড়ই CGPA। না হলে ক্রেডিট ধরে হিসাব করতে হবে।", "If all courses have equal credits, the plain average of grade points is the CGPA. Otherwise weight by credits."] },
    ],
  },
  {
    slug: "emi-flat-reducing-parthokko",
    title: ["EMI-তে ফ্ল্যাট রেট ও রিডিউসিং ব্যালেন্সের পার্থক্য কী? মোবাইল ও লোনের কিস্তি", "Flat rate vs reducing balance EMI: what is the difference?"],
    desc: ["একই সুদের হারে ফ্ল্যাট ও রিডিউসিং পদ্ধতিতে কিস্তি কত আলাদা হয়, উদাহরণ ও কেনার আগে কী জিজ্ঞেস করবেন।", "How much the instalment differs between flat and reducing methods at the same rate, with an example and what to ask before you buy."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "emi-calculator-bd", name: ["EMI ক্যালকুলেটর", "EMI calculator"] },
    sections: [
      {
        h: ["দুই পদ্ধতি", "The two methods"],
        p: [
          ["রিডিউসিং ব্যালেন্সে প্রতি মাসে বাকি থাকা আসলের ওপর সুদ ধরা হয়। ফ্ল্যাট রেটে পুরো মেয়াদে শুরুর আসলের ওপরই সুদ ধরা হয়, যদিও আপনি প্রতি মাসে আসল ফেরত দিচ্ছেন। তাই একই হারে ফ্ল্যাট রেটে মোট সুদ বেশি পড়ে।", "With reducing balance, interest is charged on the principal still owed each month. With a flat rate, interest is charged on the original principal for the whole term even though you repay principal every month. So at the same stated rate, the flat method costs more in total."],
        ],
      },
      {
        h: ["উদাহরণ", "Example"],
        p: [
          ["১,০০,০০০ টাকা, ১২% বার্ষিক হার, ১২ মাস। রিডিউসিং ব্যালেন্সে কিস্তি প্রায় ৮,৮৮৫ টাকা, মোট সুদ প্রায় ৬,৬১৯ টাকা। ফ্ল্যাট রেটে সুদ ১,০০,০০০ × ১২% = ১২,০০০ টাকা, কিস্তি (১,০০,০০০ + ১২,০০০) ÷ ১২ = প্রায় ৯,৩৩৩ টাকা।", "100,000 taka at 12% a year for 12 months. With reducing balance the instalment is about 8,885 taka and total interest about 6,619 taka. With a flat rate the interest is 100,000 × 12% = 12,000 taka and the instalment is (100,000 + 12,000) ÷ 12 = about 9,333 taka."],
          ["অর্থাৎ ফ্ল্যাট ১২% আসলে রিডিউসিং ব্যালেন্সের প্রায় ২১.৫% বার্ষিক হারের সমান।", "In other words, a flat 12% works out to about 21.5% a year on a reducing balance basis."],
        ],
      },
      {
        h: ["কেনার আগে কী জিজ্ঞেস করবেন", "What to ask before you buy"],
        p: [
          ["দোকান বা ব্যাংককে জিজ্ঞেস করুন হার ফ্ল্যাট না রিডিউসিং, কিস্তির সংখ্যা কত, মোট কত টাকা ফেরত দিতে হবে এবং প্রসেসিং ফি বা অন্য চার্জ আছে কি না। মোট ফেরতের অঙ্ক নগদ দামের সঙ্গে মিলিয়ে দেখলে খরচ বোঝা যায়। আমাদের ক্যালকুলেটর রিডিউসিং ব্যালেন্স পদ্ধতিতে আনুমানিক হিসাব দেয়।", "Ask whether the rate is flat or reducing, how many instalments there are, the total you will repay, and whether there is a processing fee or other charges. Comparing the total repayment with the cash price shows the real cost. Our calculator gives an estimate using the reducing balance method."],
        ],
      },
    ],
    faqs: [
      { q: ["মোবাইল ফোন কিস্তিতে কেনা কি লাভজনক?", "Is buying a phone on instalments worth it?"], a: ["মোট ফেরতের অঙ্ক নগদ দামের চেয়ে কত বেশি তা দেখুন। ওই বাড়তি টাকাই আপনার কিস্তির খরচ।", "Check how much more the total repayment is than the cash price. That extra is the cost of the instalments."] },
      { q: ["ফ্ল্যাট রেট কি সবসময় বেশি খরচের?", "Is a flat rate always more expensive?"], a: ["একই ঘোষিত হারে হ্যাঁ। তবে দুই অফারের হার আলাদা হলে মোট ফেরতের অঙ্ক দিয়ে তুলনা করুন।", "At the same stated rate, yes. If the two offers have different rates, compare them by total repayment."] },
    ],
  },
  {
    slug: "khoroch-hisab-rakhar-niyom",
    title: ["মাসিক খরচের হিসাব কীভাবে রাখবেন? সহজ নিয়ম ও ধাপ", "How to keep track of your monthly expenses: simple steps"],
    desc: ["আয় ও খরচ লিখে রাখার সহজ পদ্ধতি, খরচের ভাগ এবং মাস শেষে হিসাব মেলানোর উপায়।", "A simple way to record income and spending, group your expenses, and review them at the end of the month."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "expense-tracker", name: ["খরচের হিসাব", "Expense tracker"] },
    sections: [
      {
        h: ["ধাপ ১: আয় লিখুন", "Step 1: write down your income"],
        p: [
          ["মাসের শুরুতে হাতে আসা মোট টাকা লিখুন। বেতন, টিউশন বা অন্য আয় থাকলে আলাদা করে লিখুন।", "At the start of the month write down the total money you have. If you have salary, tuition or other income, list each one."],
        ],
      },
      {
        h: ["ধাপ ২: খরচ ভাগ করুন", "Step 2: group your spending"],
        p: [
          ["খরচকে কয়েকটি ভাগে রাখুন, যেমন খাবার, যাতায়াত, বাসাভাড়া ও বিল, পড়াশোনা, মোবাইল রিচার্জ ও অন্যান্য। নিয়মিত খরচ (ভাড়া, বিল) আর বদলানো খরচ (খাবার, শখ) আলাদা দেখলে কোথায় কমানো যায় বোঝা সহজ হয়।", "Sort spending into a few groups such as food, transport, rent and bills, education, mobile top-up and other. Seeing fixed costs (rent, bills) apart from changing costs (food, hobbies) makes it easier to see where you can cut."],
        ],
      },
      {
        h: ["ধাপ ৩: প্রতিদিন লিখুন", "Step 3: record it every day"],
        p: [
          ["খরচ করার দিনই লিখে ফেলুন। কয়েক দিন পরে লিখতে গেলে ছোট খরচ ভুলে যাওয়া সহজ। আমাদের খরচের হিসাব টুলে খরচ ও আয় যোগ করলে মোট নিজে হিসাব হয়।", "Write it the same day you spend. If you wait a few days, small expenses are easy to forget. In our expense tracker, add each expense and income and the totals are worked out for you."],
        ],
      },
      {
        h: ["ধাপ ৪: মাস শেষে মেলান", "Step 4: review at month end"],
        p: [
          ["মাস শেষে আয় − মোট খরচ = বাকি টাকা। এটি হাতের টাকার সঙ্গে মিলিয়ে দেখুন। কোন ভাগে সবচেয়ে বেশি গেছে দেখে পরের মাসের সীমা ঠিক করুন।", "At month end, income − total spending = money left. Check it against the cash you actually have. See which group took the most and set limits for next month."],
        ],
      },
    ],
    faqs: [
      { q: ["খরচের হিসাব রাখার সবচেয়ে সহজ উপায় কী?", "What is the easiest way to track expenses?"], a: ["প্রতিদিন খরচ করার পরই লিখে ফেলা। একটি খাতা বা টুল যেকোনোটিই চলে।", "Write it down right after you spend. A notebook or a tool both work."] },
      { q: ["এই টুলের ডেটা কি কোথাও জমা হয়?", "Is my data stored anywhere?"], a: ["টুলটি আপনার ব্রাউজারেই চলে। ব্রাউজারের ডেটা মুছলে হিসাব হারিয়ে যেতে পারে, তাই গুরুত্বপূর্ণ হিসাব আলাদা করে লিখে রাখুন।", "The tool runs in your browser. Clearing browser data can erase your records, so keep a separate note of anything important."] },
    ],
  },
  {
    slug: "cash-out-charge-table-500-theke-10000",
    title: ["ক্যাশ আউট চার্জ টেবিল: ৫০০ থেকে ১০,০০০ টাকায় bKash, Nagad, Rocket ও Upay এ কত", "Cash out charge table: bKash, Nagad, Rocket and Upay from 500 to 10,000 taka"],
    desc: ["৫০০, ১০০০, ২০০০, ৩০০০, ৫০০০ ও ১০,০০০ টাকা ক্যাশ আউটে চার্জ কত পড়ে, চারটি সার্ভিসের জন্য হিসাবসহ।", "The cash out charge on 500, 1,000, 2,000, 3,000, 5,000 and 10,000 taka for four services, with the working."],
    updated: "2026-11-04",
    updatedLabel: ["৪ নভেম্বর, ২০২৬", "4 November 2026"],
    tool: { slug: "bkash-calculator", name: ["bKash চার্জ ক্যালকুলেটর", "bKash charge calculator"] },
    sections: [
      {
        h: ["যে রেটে হিসাব করা হয়েছে", "The rates used"],
        p: [
          ["এজেন্ট ক্যাশ আউটে প্রতি ১০০০ টাকায় আমাদের ক্যালকুলেটরের রেট: bKash ১৮.৫০, Nagad ১৪.৯০, Rocket ১৮, Upay ১৪। নিচের সব অঙ্ক এই রেট ধরে হিসাব করা।", "Our calculators use these agent cash out rates per 1,000 taka: bKash 18.50, Nagad 14.90, Rocket 18, Upay 14. Every figure below is worked out at these rates."],
        ],
      },
      {
        h: ["চার্জ টেবিল (টাকায়)", "Charge table (in taka)"],
        p: [
          ["৫০০ টাকায়: bKash ৯.২৫, Nagad ৭.৪৫, Rocket ৯, Upay ৭।", "On 500 taka: bKash 9.25, Nagad 7.45, Rocket 9, Upay 7."],
          ["১,০০০ টাকায়: bKash ১৮.৫০, Nagad ১৪.৯০, Rocket ১৮, Upay ১৪।", "On 1,000 taka: bKash 18.50, Nagad 14.90, Rocket 18, Upay 14."],
          ["২,০০০ টাকায়: bKash ৩৭, Nagad ২৯.৮০, Rocket ৩৬, Upay ২৮।", "On 2,000 taka: bKash 37, Nagad 29.80, Rocket 36, Upay 28."],
          ["৩,০০০ টাকায়: bKash ৫৫.৫০, Nagad ৪৪.৭০, Rocket ৫৪, Upay ৪২।", "On 3,000 taka: bKash 55.50, Nagad 44.70, Rocket 54, Upay 42."],
          ["৫,০০০ টাকায়: bKash ৯২.৫০, Nagad ৭৪.৫০, Rocket ৯০, Upay ৭০।", "On 5,000 taka: bKash 92.50, Nagad 74.50, Rocket 90, Upay 70."],
          ["১০,০০০ টাকায়: bKash ১৮৫, Nagad ১৪৯, Rocket ১৮০, Upay ১৪০।", "On 10,000 taka: bKash 185, Nagad 149, Rocket 180, Upay 140."],
        ],
      },
      {
        h: ["নিজের রেটে মিলিয়ে নিন", "Check it against your own rate"],
        p: [
          ["সূত্র: চার্জ = টাকার পরিমাণ ÷ ১০০০ × প্রতি ১০০০ টাকার রেট। যেমন আপনার রেট ১৪ হলে ৭,০০০ টাকায় ৭ × ১৪ = ৯৮ টাকা।", "Formula: charge = amount ÷ 1,000 × the rate per 1,000 taka. For example, at a rate of 14, 7,000 taka costs 7 × 14 = 98 taka."],
          ["রেট কোম্পানি বদলাতে পারে এবং এজেন্ট, এটিএম বা বিশেষ সুবিধাভেদে আলাদা হতে পারে। বিকাশের প্রিয় এজেন্টের মতো কম রেটের সুবিধার খবরও প্রকাশিত হয়েছে। তাই চূড়ান্ত অঙ্কের জন্য নিজের অ্যাপ বা অফিসিয়াল সাইট দেখুন।", "Companies can change their rates, and the rate can differ for an agent, an ATM or a special benefit. There have been published reports of lower rates such as bKash's Priyo agent. For the final figure, check your own app or the official site."],
        ],
      },
    ],
    faqs: [
      { q: ["১০০০ টাকা ক্যাশ আউটে সবচেয়ে কম চার্জ কোনটিতে?", "Which service has the lowest charge on 1,000 taka?"], a: ["উপরের রেটে Upay (১৪ টাকা), এরপর Nagad (১৪.৯০), Rocket (১৮) ও bKash (১৮.৫০)। রেট বদলালে এই ক্রমও বদলাবে।", "At the rates above it is Upay (14 taka), then Nagad (14.90), Rocket (18) and bKash (18.50). If the rates change, this order changes too."] },
      { q: ["৫০০০ টাকা তুললে মোট কত কাটবে?", "How much is deducted in total if I cash out 5,000 taka?"], a: ["আপনার ব্যালেন্স থেকে ৫,০০০ টাকার সঙ্গে চার্জও কাটে। যেমন bKash এ ৫,০০০ + ৯২.৫০ = ৫,০৯২.৫০ টাকা।", "The charge is taken on top of the 5,000 from your balance. For example on bKash it is 5,000 + 92.50 = 5,092.50 taka."] },
    ],
  },
  {
    slug: "gpa-theke-grade-niyom",
    title: ["জিপিএ থেকে গ্রেড কত? ৩.৩৩, ৪.৫০ জিপিএ কী গ্রেড ও ৪.০০ স্কেলের অর্থ", "GPA to grade: what grade is a 3.33 or 4.50 GPA, and what a 4.00 scale means"],
    desc: ["এসএসসি-এইচএসসির জিপিএ থেকে লেটার গ্রেড কীভাবে বোঝা যায়, ৩.৩৩ কত গ্রেড, এবং ৫.০০ ও ৪.০০ স্কেলের পার্থক্য।", "How to read a letter grade from an SSC or HSC GPA, what grade 3.33 is, and the difference between the 5.00 and 4.00 scales."],
    updated: "2026-11-04",
    updatedLabel: ["৪ নভেম্বর, ২০২৬", "4 November 2026"],
    tool: { slug: "gpa-calculator-bd", name: ["জিপিএ ক্যালকুলেটর", "GPA calculator"] },
    sections: [
      {
        h: ["৫.০০ স্কেলে জিপিএ থেকে গ্রেড", "Grade from a GPA on the 5.00 scale"],
        p: [
          ["এসএসসি-এইচএসসিতে সামগ্রিক জিপিএ থেকে সাধারণত এভাবে গ্রেড বোঝা যায়: ৫.০০ = A+, ৪.০০ থেকে ৪.৯৯ = A, ৩.৫০ থেকে ৩.৯৯ = A-, ৩.০০ থেকে ৩.৪৯ = B, ২.০০ থেকে ২.৯৯ = C, ১.০০ থেকে ১.৯৯ = D, ১ এর নিচে F।", "For SSC and HSC an overall GPA is usually read as: 5.00 = A+, 4.00 to 4.99 = A, 3.50 to 3.99 = A-, 3.00 to 3.49 = B, 2.00 to 2.99 = C, 1.00 to 1.99 = D, below 1 = F."],
          ["তাই ৩.৩৩ জিপিএ মানে B গ্রেড এবং ৪.৫০ জিপিএ মানে A গ্রেড।", "So a 3.33 GPA is a B grade and a 4.50 GPA is an A grade."],
        ],
      },
      {
        h: ["৪.০০ স্কেল মানে কী", "What a 4.00 scale means"],
        p: [
          ["বাংলাদেশের স্কুল-কলেজ বোর্ডে সর্বোচ্চ জিপিএ ৫.০০। বিশ্ববিদ্যালয়ে সাধারণত সর্বোচ্চ ৪.০০ ধরা হয় এবং তাকে CGPA বলে। তাই ৪.০০ এর মধ্যে ৩.৫০ পেলে সেটি সাধারণত A- বা তার কাছাকাছি, কিন্তু স্কেল বিশ্ববিদ্যালয়ভেদে আলাদা।", "In Bangladesh's school and college boards the top GPA is 5.00. Universities usually use 4.00 as the top and call it CGPA. So 3.50 out of 4.00 is typically about an A-, but the scale differs between universities."],
          ["৫.০০ স্কেলের জিপিএ সরাসরি ৪.০০ স্কেলে বদলানোর একটি সবার জন্য এক নিয়ম নেই। ভর্তি বা চাকরির আবেদনে যে প্রতিষ্ঠান চাইছে, তার নিজের নিয়ম মানুন।", "There is no single rule that converts a 5.00 GPA to the 4.00 scale for everyone. For admission or job forms, follow the rule of the institution asking."],
        ],
      },
    ],
    faqs: [
      { q: ["৩.৩৩ জিপিএ কত গ্রেড?", "What grade is a 3.33 GPA?"], a: ["৫.০০ স্কেলে (এসএসসি-এইচএসসি) এটি B গ্রেড। ৪.০০ স্কেলের বিশ্ববিদ্যালয়ে গ্রেড স্কেলভেদে আলাদা হতে পারে।", "On the 5.00 scale (SSC and HSC) it is a B grade. At a university on a 4.00 scale the grade depends on that university's scale."] },
      { q: ["জিপিএ ৪.৫০ মানে কী?", "What does a 4.50 GPA mean?"], a: ["৫.০০ স্কেলে A গ্রেড।", "An A grade on the 5.00 scale."] },
      { q: ["A- এর জিপিএ কত?", "What GPA is an A-?"], a: ["একটি বিষয়ে A- মানে ৩.৫০ পয়েন্ট। সামগ্রিক জিপিএ ৩.৫০ থেকে ৩.৯৯ হলেও সাধারণত A- ধরা হয়।", "In a single subject an A- is 3.50 points. An overall GPA from 3.50 to 3.99 is also usually read as A-."] },
    ],
  },
  {
    slug: "emi-kisti-komanor-upay",
    title: ["EMI বা কিস্তি কমানোর উপায়: মেয়াদ, ডাউন পেমেন্ট ও সুদের হিসাব", "How to lower your EMI: tenure, down payment and the interest trade-off"],
    desc: ["মেয়াদ বাড়ালে বা ডাউন পেমেন্ট বেশি দিলে মাসিক কিস্তি ও মোট সুদ কত বদলায়, ৫ লাখ টাকার ঋণের উদাহরণসহ।", "How the monthly EMI and total interest change if you lengthen the tenure or pay a larger down payment, with a 5 lakh taka loan example."],
    updated: "2026-11-04",
    updatedLabel: ["৪ নভেম্বর, ২০২৬", "4 November 2026"],
    tool: { slug: "emi-calculator-bd", name: ["EMI ক্যালকুলেটর", "EMI calculator"] },
    sections: [
      {
        h: ["মেয়াদ বাড়ালে কী হয়", "What a longer tenure does"],
        p: [
          ["৫,০০,০০০ টাকা ঋণ, ১০% বার্ষিক হার (রিডিউসিং ব্যালেন্স)। ১২ মাসে কিস্তি প্রায় ৪৩,৯৫৮ টাকা, মোট সুদ প্রায় ২৭,৪৯৫ টাকা। ২৪ মাসে কিস্তি প্রায় ২৩,০৭২, সুদ প্রায় ৫৩,৭৩৯। ৩৬ মাসে কিস্তি প্রায় ১৬,১৩৪, সুদ প্রায় ৮০,৮০৯। ৬০ মাসে কিস্তি প্রায় ১০,৬২৪, সুদ প্রায় ১,৩৭,৪১১ টাকা।", "A loan of 500,000 taka at 10% a year (reducing balance). Over 12 months the EMI is about 43,958 and total interest about 27,495. Over 24 months it is about 23,072 and about 53,739. Over 36 months about 16,134 and about 80,809. Over 60 months about 10,624 and about 137,411 taka."],
          ["অর্থাৎ মেয়াদ যত বাড়ে মাসিক কিস্তি তত কমে, কিন্তু মোট সুদ অনেক বেড়ে যায়।", "So a longer tenure lowers the monthly EMI but raises the total interest a lot."],
        ],
      },
      {
        h: ["ডাউন পেমেন্ট বেশি দিলে", "Paying a larger down payment"],
        p: [
          ["৫ লাখ টাকার জিনিস কিনতে পুরো ৫ লাখ ঋণ নিলে ২৪ মাসের কিস্তি প্রায় ২৩,০৭২ টাকা। ১ লাখ টাকা ডাউন পেমেন্ট দিয়ে ৪ লাখ ঋণ নিলে কিস্তি প্রায় ১৮,৪৫৮ টাকা এবং সুদ প্রায় ৪২,৯৯১ টাকা, যা ৫৩,৭৩৯ এর চেয়ে প্রায় ১০,৭৪৮ টাকা কম।", "To buy something worth 500,000 taka, borrowing the full amount over 24 months gives an EMI of about 23,072. Paying 100,000 down and borrowing 400,000 gives an EMI of about 18,458 and interest of about 42,991, which is about 10,748 less than 53,739."],
        ],
      },
      {
        h: ["কোনটি বেছে নেবেন", "Which to choose"],
        p: [
          ["মাসের আয়ের মধ্যে কিস্তি রাখতে হলে মেয়াদ বাড়ানো যায়, কিন্তু মোট সুদ বাড়বে তা মাথায় রাখুন। সম্ভব হলে বেশি ডাউন পেমেন্ট দিলে কিস্তি ও সুদ দুটোই কমে। ঋণ নেওয়ার আগে অগ্রিম পরিশোধে ফি আছে কি না জেনে নিন। এই হিসাব আনুমানিক, ব্যাংক বা দোকানের চার্জ আলাদা হতে পারে।", "If the EMI has to fit your monthly income you can lengthen the tenure, but remember the total interest rises. If you can, a larger down payment lowers both the EMI and the interest. Before borrowing, ask whether there is a fee for early repayment. These figures are estimates and a bank or shop's charges may differ."],
        ],
      },
    ],
    faqs: [
      { q: ["EMI কমাতে সবচেয়ে ভালো উপায় কী?", "What is the best way to lower an EMI?"], a: ["ডাউন পেমেন্ট বাড়ালে কিস্তি ও মোট সুদ দুটোই কমে। মেয়াদ বাড়ালে কিস্তি কমে, কিন্তু মোট সুদ বাড়ে।", "A larger down payment lowers both the EMI and the total interest. A longer tenure lowers the EMI but raises the total interest."] },
      { q: ["৫ লাখ টাকার ঋণের কিস্তি ২৪ মাসে কত?", "What is the EMI on a 5 lakh loan over 24 months?"], a: ["১০% বার্ষিক হারে (রিডিউসিং ব্যালেন্স) প্রায় ২৩,০৭২ টাকা।", "At 10% a year (reducing balance) it is about 23,072 taka."] },
    ],
  },
  {
    slug: "discount-labh-khoti-shotangsho-hisab",
    title: ["ছাড়, লাভ ও ক্ষতির শতকরা হিসাব কীভাবে করবেন (উদাহরণসহ)", "How to calculate discount, profit and loss percentages (with examples)"],
    desc: ["দোকানের ছাড়, দুইবার ছাড় এবং ক্রয়মূল্য থেকে লাভ-ক্ষতির শতকরা হার বের করার সহজ নিয়ম, ধাপে ধাপে উদাহরণসহ।", "Simple rules, with step by step examples, for shop discounts, two discounts in a row, and profit and loss percentages from the cost price."],
    updated: "2026-11-09",
    updatedLabel: ["৯ নভেম্বর, ২০২৬", "9 November 2026"],
    tool: { slug: "percentage-calculator", name: ["শতকরা হিসাব ক্যালকুলেটর", "Percentage calculator"] },
    sections: [
      {
        h: ["ছাড়ের হিসাব", "Working out a discount"],
        p: [
          ["সূত্র: ছাড়ের পরিমাণ = দাম × (ছাড়ের হার ÷ ১০০)। ১,২০০ টাকার জিনিসে ১৫% ছাড় হলে ছাড় ১,২০০ × ১৫ ÷ ১০০ = ১৮০ টাকা। তাই দিতে হবে ১,২০০ − ১৮০ = ১,০২০ টাকা।", "Formula: discount amount = price × (discount rate ÷ 100). On an item priced 1,200 taka with 15% off, the discount is 1,200 × 15 ÷ 100 = 180 taka. So you pay 1,200 − 180 = 1,020 taka."],
          ["ছাড়ের পরের দাম জানা থাকলে আগের দাম বের করা যায়: আগের দাম = পরের দাম ÷ (১ − ছাড়ের হার ÷ ১০০)। যেমন ১,০২০ ÷ ০.৮৫ = ১,২০০ টাকা।", "If you know the price after the discount you can find the original: original = new price ÷ (1 − discount rate ÷ 100). For example 1,020 ÷ 0.85 = 1,200 taka."],
        ],
      },
      {
        h: ["দুইবার ছাড় এবং বাড়া-কমার ফাঁদ", "Two discounts and the increase-then-decrease trap"],
        p: [
          ["১,০০০ টাকার জিনিসে প্রথমে ২০% এবং তারপর আরও ১০% ছাড় হলে মোট ৩০% ছাড় হয় না। ২০% ছাড়ে দাম হয় ৮০০। এরপর ৮০০ এর ১০% = ৮০ কমে দাম হয় ৭২০। মোট ছাড় ২৮০ টাকা, অর্থাৎ ২৮%।", "Two discounts of 20% and then 10% on a 1,000 taka item do not add up to 30%. After 20% off the price is 800. Then 10% of 800 is 80, so the price becomes 720. The total discount is 280 taka, which is 28%."],
          ["একইভাবে ১০০ টাকা ২০% বাড়লে হয় ১২০। সেই ১২০ থেকে ২০% কমালে কমে ২৪ টাকা, দাম হয় ৯৬। অর্থাৎ আগের দামে ফেরা যায় না, ৪% কম থাকে। কারণ কমার হার নতুন, বড় অঙ্কের ওপর ধরা হয়।", "In the same way 100 taka raised by 20% becomes 120. Reducing that 120 by 20% takes off 24 and leaves 96. So you do not return to the old price, you end 4% lower, because the decrease is taken on the new, larger amount."],
        ],
      },
      {
        h: ["লাভ ও ক্ষতির শতকরা হার", "Profit and loss percentages"],
        p: [
          ["লাভ = বিক্রয়মূল্য − ক্রয়মূল্য। লাভের শতকরা হার = লাভ ÷ ক্রয়মূল্য × ১০০। ৮০০ টাকায় কিনে ১,০০০ টাকায় বিক্রি করলে লাভ ২০০ টাকা, আর হার ২০০ ÷ ৮০০ × ১০০ = ২৫%। ১,০০০ টাকায় কিনে ৮৫০ টাকায় বিক্রি করলে ক্ষতি ১৫০ টাকা, অর্থাৎ ১৫%।", "Profit = selling price − cost price. Profit percentage = profit ÷ cost price × 100. Buying at 800 and selling at 1,000 gives a profit of 200 taka, and the rate is 200 ÷ 800 × 100 = 25%. Buying at 1,000 and selling at 850 is a loss of 150 taka, which is 15%."],
          ["নির্দিষ্ট লাভ চাইলে বিক্রয়মূল্য = ক্রয়মূল্য × (১ + লাভের হার ÷ ১০০)। ৫০০ টাকার পণ্যে ২০% লাভ চাইলে ৫০০ × ১.২ = ৬০০ টাকায় বিক্রি করতে হবে। লাভের শতাংশ সাধারণত ক্রয়মূল্যের ওপর ধরা হয়। কেউ বিক্রয়মূল্যের ওপর ধরলে (মার্জিন) অঙ্ক আলাদা হয়, যেমন ৮০০ থেকে ১,০০০ এ ২৫% লাভ, কিন্তু মার্জিন ২০০ ÷ ১,০০০ = ২০%।", "To get a set profit, selling price = cost price × (1 + profit rate ÷ 100). For a 500 taka item with a 20% profit you must sell at 500 × 1.2 = 600 taka. Profit percentage is normally taken on the cost price. If someone takes it on the selling price (margin) the figure differs: from 800 to 1,000 is a 25% profit but a margin of 200 ÷ 1,000 = 20%."],
        ],
      },
    ],
    faqs: [
      { q: ["১,০০০ টাকার জিনিসে ১০% ছাড় হলে কত দিতে হবে?", "How much do I pay on a 1,000 taka item with 10% off?"], a: ["ছাড় ১,০০০ × ১০ ÷ ১০০ = ১০০ টাকা। তাই দিতে হবে ৯০০ টাকা।", "The discount is 1,000 × 10 ÷ 100 = 100 taka, so you pay 900 taka."] },
      { q: ["২০% বাড়িয়ে ২০% কমালে কি আগের দাম পাওয়া যায়?", "Do I get the old price back after +20% and −20%?"], a: ["না। ১০০ টাকা ১২০ হয়ে আবার ২০% কমে ৯৬ হয়। অর্থাৎ ৪% কম থাকে।", "No. 100 becomes 120 and then falls 20% to 96, which is 4% lower."] },
      { q: ["লাভের শতাংশ কিসের ওপর ধরা হয়?", "What is the profit percentage based on?"], a: ["সাধারণত ক্রয়মূল্যের ওপর। বিক্রয়মূল্যের ওপর ধরলে সেটাকে মার্জিন বলা হয় এবং অঙ্ক আলাদা হয়।", "Normally on the cost price. Based on the selling price it is called margin and the figure is different."] },
      { q: ["ছাড়ের পরের দাম থেকে আগের দাম কীভাবে বের করব?", "How do I find the original price from the discounted price?"], a: ["পরের দামকে (১ − ছাড়ের হার ÷ ১০০) দিয়ে ভাগ করুন। ১৫% ছাড়ের পর ১,০২০ হলে ১,০২০ ÷ ০.৮৫ = ১,২০০।", "Divide the new price by (1 − discount rate ÷ 100). If the price is 1,020 after 15% off, then 1,020 ÷ 0.85 = 1,200."] },
    ],
  },
  {
    slug: "sorol-sudh-chokrobriddhi-sudh-parthokko",
    title: ["সরল সুদ ও চক্রবৃদ্ধি সুদের পার্থক্য: ১ লাখ টাকায় কত হয়", "Simple vs compound interest: what 1 lakh taka grows to"],
    desc: ["সরল সুদ ও চক্রবৃদ্ধি সুদের সূত্র, ১ লাখ টাকার উদাহরণ এবং কত বছরে টাকা দ্বিগুণ হয় তার আনুমানিক নিয়ম।", "The formulas for simple and compound interest, a 1 lakh taka example, and the rule of thumb for how long money takes to double."],
    updated: "2026-11-09",
    updatedLabel: ["৯ নভেম্বর, ২০২৬", "9 November 2026"],
    tool: { slug: "fdr-dps-calculator-bd", name: ["FDR DPS ক্যালকুলেটর", "FDR DPS calculator"] },
    sections: [
      {
        h: ["সরল সুদ", "Simple interest"],
        p: [
          ["সরল সুদে সুদ সবসময় শুধু মূল টাকার (আসল) ওপর হিসাব হয়। সূত্র: সুদ = আসল × হার × বছর ÷ ১০০। ১,০০,০০০ টাকা ৮% হারে ৩ বছরে সুদ দেয় ১,০০,০০০ × ৮ × ৩ ÷ ১০০ = ২৪,০০০ টাকা। মোট হয় ১,২৪,০০০ টাকা।", "In simple interest the interest is always worked out on the original amount (principal) only. Formula: interest = principal × rate × years ÷ 100. 100,000 taka at 8% for 3 years earns 100,000 × 8 × 3 ÷ 100 = 24,000 taka. The total is 124,000 taka."],
        ],
      },
      {
        h: ["চক্রবৃদ্ধি সুদ", "Compound interest"],
        p: [
          ["চক্রবৃদ্ধিতে প্রতি বছরের সুদ আসলের সঙ্গে যোগ হয়, পরের বছর সেই বড় অঙ্কের ওপর সুদ ধরা হয়। সূত্র (বছরে একবার যোগ হলে): মোট = আসল × (১ + হার ÷ ১০০)^বছর।", "In compound interest each year's interest is added to the principal and the next year's interest is worked out on that larger amount. Formula (when added once a year): total = principal × (1 + rate ÷ 100)^years."],
          ["১,০০,০০০ টাকা ৮% হারে ৩ বছরে হয় ১,০০,০০০ × ১.০৮^৩ ≈ ১,২৫,৯৭১.২০ টাকা। সুদ প্রায় ২৫,৯৭১, যা সরল সুদের চেয়ে প্রায় ১,৯৭১ টাকা বেশি। ৫ বছরে হয় প্রায় ১,৪৬,৯৩৩ টাকা, আর সরল সুদে ১,৪০,০০০। পার্থক্য প্রায় ৬,৯৩৩ টাকা। সময় যত বাড়ে, পার্থক্য তত বড় হয়।", "100,000 taka at 8% for 3 years becomes 100,000 × 1.08^3 ≈ 125,971.20 taka. The interest is about 25,971, roughly 1,971 more than simple interest. After 5 years it is about 146,933 taka against 140,000 with simple interest, a difference of about 6,933 taka. The longer the time, the bigger the gap."],
        ],
      },
      {
        h: ["কত বছরে টাকা দ্বিগুণ হয় এবং কী খেয়াল রাখবেন", "How long to double, and what to watch for"],
        p: [
          ["৭২ এর নিয়ম: ৭২ ÷ বার্ষিক হার = আনুমানিক কত বছরে টাকা দ্বিগুণ হবে (চক্রবৃদ্ধিতে)। ৮% হলে ৭২ ÷ ৮ = ৯ বছর। যাচাই করলে ১.০৮^৯ ≈ ১.৯৯৯, অর্থাৎ প্রায় দ্বিগুণই হয়।", "The rule of 72: 72 ÷ annual rate gives roughly how many years money takes to double (with compounding). At 8% it is 72 ÷ 8 = 9 years. Checking, 1.08^9 ≈ 1.999, so it really is about double."],
          ["ব্যাংক বা সঞ্চয় প্রকল্পে সুদ বছরে কতবার আসলের সঙ্গে যোগ হয় এবং সুদের ওপর কর বা অন্য কাটছাঁট আছে কি না, তা আলাদা হতে পারে। তাই আমানতের আগে নিজের ব্যাংকের শর্ত দেখে নিন। এখানের হিসাব আনুমানিক।", "How often a bank or savings scheme adds interest to the principal, and whether tax or other deductions apply, can differ. So check your own bank's terms before depositing. The figures here are estimates."],
        ],
      },
    ],
    faqs: [
      { q: ["সরল সুদ ও চক্রবৃদ্ধি সুদের মূল পার্থক্য কী?", "What is the main difference between simple and compound interest?"], a: ["সরল সুদ শুধু মূল টাকার ওপর হয়। চক্রবৃদ্ধিতে আগের সুদও আসলের সঙ্গে যোগ হয়ে তার ওপর সুদ হয়।", "Simple interest is on the original amount only. In compound interest earlier interest is added to the principal and earns interest too."] },
      { q: ["১ লাখ টাকা ৮% হারে ৩ বছরে সরল সুদে কত হয়?", "What does 1 lakh taka become at 8% simple interest in 3 years?"], a: ["সুদ ২৪,০০০ টাকা, মোট ১,২৪,০০০ টাকা। চক্রবৃদ্ধিতে (বছরে একবার) প্রায় ১,২৫,৯৭১ টাকা।", "The interest is 24,000 taka and the total 124,000 taka. With annual compounding it is about 125,971 taka."] },
      { q: ["টাকা দ্বিগুণ হতে কত বছর লাগে?", "How many years does it take to double money?"], a: ["৭২ কে বার্ষিক সুদের হার দিয়ে ভাগ করুন। ৯% হলে প্রায় ৮ বছর। এটি আনুমানিক নিয়ম।", "Divide 72 by the annual interest rate. At 9% that is about 8 years. It is only a rule of thumb."] },
      { q: ["ঋণের সুদও কি একইভাবে হিসাব হয়?", "Is loan interest calculated the same way?"], a: ["ঋণে সাধারণত ফ্ল্যাট বা রিডিউসিং ব্যালেন্স পদ্ধতি থাকে, যা আলাদা। কিস্তির হিসাব করতে EMI ক্যালকুলেটর ব্যবহার করুন।", "Loans usually use a flat or reducing balance method, which is different. To work out instalments, use the EMI calculator."] },
    ],
  },
  {
    slug: "nirapod-password-toiri-niyom",
    title: ["নিরাপদ পাসওয়ার্ড বানানোর নিয়ম: কত বড় ও কেমন হলে ভালো", "How to make a safe password: how long and what kind"],
    desc: ["কেন লম্বা পাসওয়ার্ড বেশি নিরাপদ, কী এড়িয়ে চলবেন এবং ইমেইল, ব্যাংক ও সোশ্যাল অ্যাকাউন্ট সুরক্ষিত রাখার সহজ অভ্যাস।", "Why a longer password is safer, what to avoid, and simple habits to keep your email, bank and social accounts protected."],
    updated: "2026-11-09",
    updatedLabel: ["৯ নভেম্বর, ২০২৬", "9 November 2026"],
    tool: { slug: "password-generator", name: ["পাসওয়ার্ড জেনারেটর", "Password generator"] },
    sections: [
      {
        h: ["দৈর্ঘ্য কেন সবচেয়ে বেশি গুরুত্বপূর্ণ", "Why length matters most"],
        p: [
          ["শুধু ছোট হাতের ইংরেজি অক্ষরে ৮ অক্ষরের পাসওয়ার্ডের সম্ভাব্য সংমিশ্রণ ২৬^৮, অর্থাৎ প্রায় ২০,৮০০ কোটি। এলোমেলোভাবে ১২ অক্ষরের পাসওয়ার্ড, যেখানে বড় হাতের, ছোট হাতের, সংখ্যা ও চিহ্ন মিলিয়ে প্রায় ৯৪টি অক্ষর থেকে বাছা হয়, তার সংখ্যা ৯৪^১২, অর্থাৎ প্রায় ৪.৮ × ১০^২৩। এটি আগেরটির প্রায় ২.৩ লক্ষ কোটি গুণ।", "An 8 character password of only lowercase English letters has 26^8 possible combinations, about 208 billion. A random 12 character password using about 94 characters (upper case, lower case, digits and symbols) has 94^12, about 4.8 × 10^23. That is roughly 2.3 trillion times more."],
          ["মনে রাখবেন, এটি শুধু সম্ভাব্য সংমিশ্রণের সংখ্যা। কেউ যদি আপনার নাম, জন্মতারিখ বা ফোন নম্বর আন্দাজ করে বসে, তাহলে লম্বা হলেও পাসওয়ার্ড দুর্বল হয়। তাই লম্বা এবং এলোমেলো, দুটোই দরকার।", "Remember this is only the count of possible combinations. If someone guesses your name, birth date or phone number, a long password is still weak. So you need it to be both long and random."],
        ],
      },
      {
        h: ["যা এড়িয়ে চলবেন", "What to avoid"],
        p: [
          ["নিজের নাম, জন্মতারিখ, মোবাইল নম্বর, ১২৩৪৫৬ বা password এর মতো সহজ শব্দ ব্যবহার করবেন না। কেউ আপনাকে চিনলে এগুলো সহজে আন্দাজ করতে পারে।", "Do not use your name, birth date, mobile number, or easy words like 123456 or password. Anyone who knows you can guess them easily."],
          ["সবচেয়ে বড় ভুল একই পাসওয়ার্ড অনেক অ্যাকাউন্টে ব্যবহার করা। একটি সাইট থেকে পাসওয়ার্ড ফাঁস হলে বাকি সব অ্যাকাউন্টও ঝুঁকিতে পড়ে।", "The biggest mistake is reusing one password on many accounts. If one site leaks it, all your other accounts are at risk too."],
        ],
      },
      {
        h: ["ভালো অভ্যাস", "Good habits"],
        p: [
          ["প্রতিটি অ্যাকাউন্টে আলাদা পাসওয়ার্ড দিন, অন্তত ১২ অক্ষরের এবং এলোমেলো। এত পাসওয়ার্ড মনে রাখা কঠিন, তাই একটি বিশ্বস্ত পাসওয়ার্ড ম্যানেজার ব্যবহার করা যায়। যেসব অ্যাকাউন্টে সুবিধা আছে সেখানে দুই ধাপের যাচাই (2FA) চালু করুন, বিশেষ করে ইমেইল ও ব্যাংক অ্যাকাউন্টে, কারণ ইমেইল দখল হলে অন্য অ্যাকাউন্টের পাসওয়ার্ডও রিসেট করে নেওয়া যায়।", "Give every account its own password, at least 12 characters and random. Remembering so many is hard, so you can use a trusted password manager. Turn on two step verification (2FA) wherever it is offered, especially on email and bank accounts, because if your email is taken over, the passwords of other accounts can be reset too."],
          ["আমাদের পাসওয়ার্ড জেনারেটর আপনার ব্রাউজারে, ব্রাউজারের নিরাপদ র‍্যান্ডম ফাংশন দিয়ে পাসওয়ার্ড বানায়। দৈর্ঘ্য ও অক্ষরের ধরন বেছে নিয়ে তৈরি করে সঙ্গে সঙ্গে কপি করে নিন।", "Our password generator makes passwords in your browser using the browser's secure random function. Choose the length and character types, generate one, and copy it right away."],
        ],
      },
    ],
    faqs: [
      { q: ["পাসওয়ার্ড কত অক্ষরের হওয়া উচিত?", "How long should a password be?"], a: ["অন্তত ১২ অক্ষর, এলোমেলো হলে আরও ভালো। গুরুত্বপূর্ণ অ্যাকাউন্টে আরও বড় রাখা যায়।", "At least 12 characters, and better if random. You can go longer for important accounts."] },
      { q: ["সব অ্যাকাউন্টে একই পাসওয়ার্ড দিলে সমস্যা কী?", "What is wrong with the same password everywhere?"], a: ["একটি সাইটে ফাঁস হলে বাকি সব অ্যাকাউন্টেও ঢোকা সম্ভব হয়ে যায়।", "If one site leaks it, the other accounts can be broken into as well."] },
      { q: ["দুই ধাপের যাচাই (2FA) কী?", "What is two step verification (2FA)?"], a: ["পাসওয়ার্ডের পরে ফোনে আসা কোড বা অ্যাপের কোডের মতো দ্বিতীয় একটি ধাপ। পাসওয়ার্ড ফাঁস হলেও অ্যাকাউন্ট সুরক্ষিত থাকার সম্ভাবনা বাড়ে।", "A second step after the password, such as a code sent to your phone or generated by an app. Even if the password leaks, your account is more likely to stay safe."] },
      { q: ["পাসওয়ার্ড কি খাতায় বা ফোনের নোটে রাখা যায়?", "Can I keep passwords in a notebook or phone notes?"], a: ["ফোনের সাধারণ নোটের চেয়ে একটি পাসওয়ার্ড ম্যানেজার নিরাপদ। খাতায় রাখলে সেটি অন্য কারও হাতে না পড়ে সেদিকে খেয়াল রাখুন।", "A password manager is safer than ordinary phone notes. If you use a notebook, make sure it does not fall into anyone else's hands."] },
    ],
  },
  {
    slug: "chhobir-size-komanor-upay",
    title: ["ছবির সাইজ (KB/MB) কমানোর সহজ উপায় ও সঠিক ফরম্যাট", "How to reduce an image's file size (KB/MB) and pick the right format"],
    desc: ["ফর্ম বা ওয়েবসাইটে ছবি আপলোডের জন্য মাপ ও কোয়ালিটি কমিয়ে ফাইল সাইজ ছোট করার ধাপ এবং JPG, PNG ও WebP এর পার্থক্য।", "Steps to shrink a file by lowering dimensions and quality before uploading to a form or website, and the difference between JPG, PNG and WebP."],
    updated: "2026-11-09",
    updatedLabel: ["৯ নভেম্বর, ২০২৬", "9 November 2026"],
    tool: { slug: "image-compressor", name: ["ইমেজ কম্প্রেসার", "Image compressor"] },
    sections: [
      {
        h: ["ছবির সাইজ কেন বড় হয়", "Why image files are large"],
        p: [
          ["ফাইল সাইজ মূলত দুটি জিনিসের ওপর নির্ভর করে: ছবির মাপ (পিক্সেল সংখ্যা) এবং কোয়ালিটি। একটি ফোনের ছবি ৪০০০ × ৩০০০ হলে পিক্সেল থাকে ১,২০,০০,০০০। সেটি ১৬০০ × ১২০০ করলে থাকে ১৯,২০,০০০, অর্থাৎ প্রায় ৮৪% কম পিক্সেল। তাই ফাইলও সাধারণত অনেক ছোট হয়, যদিও ঠিক কতটা কমবে তা ছবির ধরনের ওপর নির্ভর করে।", "File size depends mainly on two things: the image dimensions (number of pixels) and the quality. A phone photo of 4000 × 3000 has 12,000,000 pixels. Resized to 1600 × 1200 it has 1,920,000, about 84% fewer pixels. The file usually becomes much smaller, although how much exactly depends on the image."],
        ],
      },
      {
        h: ["ধাপে ধাপে সাইজ কমানো", "Shrinking a file step by step"],
        p: [
          ["প্রথমে আসল ছবির একটি কপি রাখুন, তারপর কপিটির ওপর কাজ করুন। আগে মাপ কমান (রিসাইজ), কারণ এতেই সবচেয়ে বেশি সাইজ কমে। এরপর কোয়ালিটি প্রায় ৭০-৮০% এ নামিয়ে কম্প্রেস করুন। এই সীমায় সাধারণত চোখে পার্থক্য কম বোঝা যায়।", "First keep a copy of the original and work on the copy. Reduce the dimensions (resize) first, as that saves the most. Then compress with the quality lowered to around 70-80%. In that range the difference is usually hard to see."],
          ["ফর্ম বা পোর্টালে সাইজ ও ফরম্যাটের নির্দিষ্ট শর্ত থাকলে তা আগে দেখে নিন। সাধারণ হিসাবে ১ MB = ১,০২৪ KB। কম্প্রেসের পর ফাইল সাইজ দেখে প্রয়োজনে কোয়ালিটি আরও একটু কমান।", "If a form or portal has set size and format limits, check them first. By the usual measure 1 MB = 1,024 KB. After compressing, look at the file size and lower the quality a little more if needed."],
        ],
      },
      {
        h: ["JPG, PNG নাকি WebP", "JPG, PNG or WebP"],
        p: [
          ["JPG ছবি ও ফটোর জন্য ভালো এবং সাইজ ছোট হয়। PNG স্ক্রিনশট, লেখা ও স্বচ্ছ (ট্রান্সপারেন্ট) ব্যাকগ্রাউন্ডের জন্য ভালো, কিন্তু ফটোর ক্ষেত্রে সাইজ বড় হয়। WebP সাধারণত ছোট সাইজ দেয়, তবে কিছু পুরোনো সফটওয়্যার বা ফর্ম তা নাও নিতে পারে। অনিশ্চিত হলে JPG নিরাপদ।", "JPG suits photos and gives small files. PNG suits screenshots, text and transparent backgrounds, but files are larger for photos. WebP usually gives smaller files, but some older software or forms may not accept it. When unsure, JPG is the safe choice."],
          ["আমাদের ইমেজ টুলগুলো আপনার ব্রাউজারেই কাজ করে, ছবি কোথাও আপলোড হয় না। কম্প্রেসার, রিসাইজার ও কনভার্টার একসঙ্গে ব্যবহার করে সাইজ ও ফরম্যাট দুটোই ঠিক করে নিতে পারেন।", "Our image tools work in your browser and your image is not uploaded anywhere. You can use the compressor, resizer and converter together to fix both size and format."],
        ],
      },
    ],
    faqs: [
      { q: ["ছবি কম্প্রেস করলে কি কোয়ালিটি নষ্ট হয়?", "Does compressing an image lose quality?"], a: ["কিছুটা কমে, তবে ৭০-৮০% কোয়ালিটিতে সাধারণত চোখে পার্থক্য কম বোঝা যায়। বেশি কমালে ঝাপসা বা দানা দানা দেখা যায়।", "Some quality is lost, but at 70-80% the difference is usually hard to see. Lowering it too far makes the image blurry or grainy."] },
      { q: ["ছবির মাপ ও ফাইল সাইজের পার্থক্য কী?", "What is the difference between image dimensions and file size?"], a: ["মাপ হলো পিক্সেলে দৈর্ঘ্য ও প্রস্থ, যেমন ১৬০০ × ১২০০। ফাইল সাইজ হলো KB বা MB এ ফাইলটি কত জায়গা নেয়। মাপ কমালে সাধারণত ফাইল সাইজও কমে।", "Dimensions are the width and height in pixels, like 1600 × 1200. File size is how much space the file takes in KB or MB. Reducing the dimensions usually reduces the file size too."] },
      { q: ["১ MB কত KB?", "How many KB is 1 MB?"], a: ["প্রচলিত হিসাবে ১ MB = ১,০২৪ KB। কেউ কেউ সহজ করে ১,০০০ KB ধরেন।", "By the usual measure 1 MB = 1,024 KB. Some people simplify it to 1,000 KB."] },
      { q: ["আবেদন ফর্মে কোন ফরম্যাট দেব?", "Which format should I use for an application form?"], a: ["ফর্মে যে ফরম্যাট চাওয়া হয়েছে সেটাই দিন। না থাকলে ফটোর জন্য JPG সাধারণত নিরাপদ।", "Use whatever format the form asks for. If it does not say, JPG is usually safe for photos."] },
    ],
  },
  {
    slug: "bangladesh-india-uk-somoyer-parthokko",
    title: ["বাংলাদেশ, ভারত ও যুক্তরাজ্যের সময়ের পার্থক্য কত (শীত ও গ্রীষ্মে)", "Time difference between Bangladesh, India and the UK (winter and summer)"],
    desc: ["ভারত ও যুক্তরাজ্যের সময় বাংলাদেশ সময়ে কত, শীত ও গ্রীষ্মে ইউকের পার্থক্য কেন বদলায়, এবং নিজে হিসাব করার সহজ নিয়ম উদাহরণসহ।", "What India and UK time is in Bangladesh time, why the UK gap changes between winter and summer, and a simple way to work it out yourself, with examples."],
    updated: "2026-11-09",
    updatedLabel: ["৯ নভেম্বর, ২০২৬", "9 November 2026"],
    tool: { slug: "time-zone-converter", name: ["টাইম জোন কনভার্টার", "Time zone converter"] },
    sections: [
      {
        h: ["বাংলাদেশ ও ভারতের পার্থক্য", "Bangladesh and India"],
        p: [
          ["বাংলাদেশের সময় UTC+৬ এবং ভারতের সময় UTC+৫:৩০। তাই বাংলাদেশ ভারতের চেয়ে ৩০ মিনিট এগিয়ে। বাংলাদেশে বিকেল ৪টা হলে ভারতে বিকেল ৩:৩০। ভারতে সকাল ১০টা হলে বাংলাদেশে সকাল ১০:৩০।", "Bangladesh time is UTC+6 and Indian time is UTC+5:30, so Bangladesh is 30 minutes ahead of India. When it is 4:00 PM in Bangladesh it is 3:30 PM in India. When it is 10:00 AM in India it is 10:30 AM in Bangladesh."],
        ],
      },
      {
        h: ["বাংলাদেশ ও যুক্তরাজ্য (ইউকে)", "Bangladesh and the UK"],
        p: [
          ["যুক্তরাজ্য শীতকালে GMT (UTC+০) ব্যবহার করে। তখন বাংলাদেশ ৬ ঘণ্টা এগিয়ে। যেমন বাংলাদেশে বিকেল ৪টা হলে ইউকেতে সকাল ১০টা।", "In winter the UK uses GMT (UTC+0). Then Bangladesh is 6 hours ahead. For example when it is 4:00 PM in Bangladesh it is 10:00 AM in the UK."],
          ["গ্রীষ্মে যুক্তরাজ্য ঘড়ি এক ঘণ্টা এগিয়ে দেয় (BST, UTC+১)। তখন পার্থক্য হয় ৫ ঘণ্টা। বাংলাদেশে বিকেল ৪টা হলে ইউকেতে সকাল ১১টা। সাধারণত মার্চের শেষ রবিবার ঘড়ি এগোয় এবং অক্টোবরের শেষ রবিবার পিছোয়। বাংলাদেশ ও ভারতে সাধারণত ঘড়ি বদলানো হয় না, তাই বছরের মধ্যে শুধু ইউকের দিকের পার্থক্য বদলায়।", "In summer the UK moves its clocks forward an hour (BST, UTC+1). Then the gap is 5 hours. When it is 4:00 PM in Bangladesh it is 11:00 AM in the UK. Clocks normally go forward on the last Sunday of March and back on the last Sunday of October. Bangladesh and India normally do not change their clocks, so only the UK side of the gap changes during the year."],
        ],
      },
      {
        h: ["নিজে হিসাব করার সহজ নিয়ম", "A simple way to work it out yourself"],
        p: [
          ["প্রথমে যে সময়টা জানা আছে তা থেকে তার UTC অফসেট বাদ দিয়ে UTC সময় বের করুন। তারপর যে দেশের সময় চান তার অফসেট যোগ করুন। উদাহরণ: ইউকে (শীত) সকাল ৯টা মানে UTC ৯টা। বাংলাদেশে যোগ করুন ৬ ঘণ্টা, হয় বিকেল ৩টা। গ্রীষ্মে ইউকে সকাল ৯টা মানে UTC ৮টা, তাই বাংলাদেশে দুপুর ২টা।", "Take the time you know and subtract its UTC offset to get UTC. Then add the offset of the place you want. Example: UK (winter) 9:00 AM is 9:00 UTC. Add 6 hours for Bangladesh and you get 3:00 PM. In summer UK 9:00 AM is 8:00 UTC, so it is 2:00 PM in Bangladesh."],
          ["ঘড়ি বদলানোর তারিখ কাছাকাছি হলে সঠিক পার্থক্য কাজের আগে আমাদের টাইম জোন কনভার্টারে দেখে নিন।", "When a clock change date is close, check the exact gap in our time zone converter before you plan anything."],
        ],
      },
    ],
    faqs: [
      { q: ["বাংলাদেশ ও ভারতের সময়ের পার্থক্য কত?", "What is the time difference between Bangladesh and India?"], a: ["৩০ মিনিট। বাংলাদেশ এগিয়ে আছে। ভারতে ৩:৩০ হলে বাংলাদেশে ৪:০০।", "30 minutes, with Bangladesh ahead. When it is 3:30 in India it is 4:00 in Bangladesh."] },
      { q: ["বাংলাদেশ ও যুক্তরাজ্যের সময়ের পার্থক্য কত?", "What is the time difference between Bangladesh and the UK?"], a: ["শীতকালে (GMT) ৬ ঘণ্টা, গ্রীষ্মকালে (BST) ৫ ঘণ্টা। বাংলাদেশ এগিয়ে।", "6 hours in winter (GMT) and 5 hours in summer (BST). Bangladesh is ahead."] },
      { q: ["বাংলাদেশে বিকেল ৪টা হলে ইউকেতে কয়টা?", "If it is 4 PM in Bangladesh, what time is it in the UK?"], a: ["শীতে সকাল ১০টা এবং গ্রীষ্মে সকাল ১১টা।", "10:00 AM in winter and 11:00 AM in summer."] },
      { q: ["ভারত ও যুক্তরাজ্যের সময়ের পার্থক্য কত?", "What is the gap between India and the UK?"], a: ["শীতকালে সাড়ে ৫ ঘণ্টা এবং গ্রীষ্মকালে সাড়ে ৪ ঘণ্টা। ভারত এগিয়ে।", "5 and a half hours in winter and 4 and a half hours in summer, with India ahead."] },
    ],
  },
  {
    slug: "24-ghonta-theke-12-ghonta-somoy",
    title: ["২৪ ঘণ্টার সময় থেকে ১২ ঘণ্টায় কীভাবে বদলাবেন (১৪ টা মানে কয়টা)", "How to convert 24-hour time to 12-hour time (what is 14:00?)"],
    desc: ["১৩ থেকে ২৩ টা মানে কয়টা বাজে, ০০:০০ ও ১২:০০ এর পার্থক্য এবং ২৪ ঘণ্টার সময় ১২ ঘণ্টায় বদলানোর সহজ নিয়ম, উদাহরণসহ।", "What 13 to 23 o'clock means, the difference between 00:00 and 12:00, and a simple rule for converting 24-hour time to 12-hour time, with examples."],
    updated: "2026-11-09",
    updatedLabel: ["৯ নভেম্বর, ২০২৬", "9 November 2026"],
    tool: { slug: "time-zone-converter", name: ["টাইম জোন কনভার্টার", "Time zone converter"] },
    sections: [
      {
        h: ["সহজ নিয়ম", "The simple rule"],
        p: [
          ["২৪ ঘণ্টার ঘড়িতে দিন শুরু হয় ০০:০০ এ এবং শেষ হয় ২৩:৫৯ এ। ১২ ঘণ্টায় বদলাতে: ০১ থেকে ১১ পর্যন্ত একই থাকে, শুধু AM (ভোর বা সকাল) হয়। ১২:০০ হলো দুপুর ১২টা (PM)। ১৩ থেকে ২৩ হলে ১২ বাদ দিন এবং PM লিখুন।", "On a 24-hour clock the day starts at 00:00 and ends at 23:59. To convert to 12-hour: 01 to 11 stay the same and are AM (morning). 12:00 is 12 noon (PM). For 13 to 23, subtract 12 and write PM."],
          ["০০:০০ হলো রাত ১২টা অর্থাৎ মধ্যরাত (12 AM)। ০০:১৫ হলো রাত ১২:১৫ (12:15 AM)।", "00:00 is 12 midnight (12 AM). 00:15 is 12:15 AM."],
        ],
      },
      {
        h: ["উদাহরণ", "Examples"],
        p: [
          ["১৪:০০ − ১২ = ২, তাই বিকেল ২টা (2 PM)। ১৯:০০ − ১২ = ৭, তাই সন্ধ্যা বা রাত ৭টা (7 PM)। ২৩:৩০ − ১২ = ১১:৩০, তাই রাত ১১:৩০ (11:30 PM)। ০৮:৪৫ একই থাকে, সকাল ৮:৪৫ (8:45 AM)।", "14:00 − 12 = 2, so 2 PM. 19:00 − 12 = 7, so 7 PM. 23:30 − 12 = 11:30, so 11:30 PM. 08:45 stays the same, 8:45 AM."],
        ],
      },
      {
        h: ["উল্টো দিকে: ১২ ঘণ্টা থেকে ২৪ ঘণ্টায়", "The other way: 12-hour to 24-hour"],
        p: [
          ["PM হলে ১২ যোগ করুন, তবে ১২ PM ১২ই থাকে। যেমন ৩ PM = ১৫:০০, ১১ PM = ২৩:০০, ১২ PM = ১২:০০। AM হলে একই থাকে, শুধু ১২ AM হয়ে যায় ০০। যেমন ১২:৩০ AM = ০০:৩০।", "For PM add 12, except that 12 PM stays 12. For example 3 PM = 15:00, 11 PM = 23:00, 12 PM = 12:00. For AM it stays the same, except 12 AM becomes 00. For example 12:30 AM = 00:30."],
          ["ট্রেন, ফ্লাইট, হাসপাতাল ও সেনাবাহিনীতে ২৪ ঘণ্টার সময় বেশি চলে, কারণ AM বা PM নিয়ে বিভ্রান্তি হয় না।", "Trains, flights, hospitals and the military use the 24-hour clock more because there is no confusion over AM and PM."],
        ],
      },
    ],
    faqs: [
      { q: ["১৯ টা মানে কয়টা বাজে?", "What time is 19:00?"], a: ["১৯ − ১২ = ৭, তাই রাত বা সন্ধ্যা ৭টা (7 PM)।", "19 − 12 = 7, so 7 PM."] },
      { q: ["১৪ টা মানে কয়টা?", "What time is 14:00?"], a: ["১৪ − ১২ = ২, তাই বিকেল ২টা (2 PM)।", "14 − 12 = 2, so 2 PM."] },
      { q: ["মধ্যরাত কি ১২ AM নাকি ১২ PM?", "Is midnight 12 AM or 12 PM?"], a: ["মধ্যরাত ১২ AM (০০:০০)। দুপুর ১২টা হলো ১২ PM (১২:০০)।", "Midnight is 12 AM (00:00). Noon is 12 PM (12:00)."] },
      { q: ["০০:৩০ মানে কয়টা?", "What time is 00:30?"], a: ["রাত ১২:৩০ (12:30 AM), অর্থাৎ মধ্যরাতের আধা ঘণ্টা পর।", "12:30 AM, half an hour after midnight."] },
    ],
  },
  {
    slug: "katha-theke-shotangsho",
    title: ["কাঠা থেকে শতাংশ কীভাবে হিসাব করবেন? সহজ নিয়ম ও উদাহরণ", "How to convert katha to shatak (shotangsho): a simple rule with examples"],
    desc: ["১ কাঠায় কত শতাংশ, ৫ কাঠা বা ১০ কাঠা কত শতাংশ এবং শতাংশ থেকে কাঠার হিসাব, উদাহরণসহ।", "How many shatak in 1 katha, how many in 5 or 10 katha, and how to convert shatak back to katha, with examples."],
    updated: "2026-11-10",
    updatedLabel: ["১০ নভেম্বর, ২০২৬", "10 November 2026"],
    tool: { slug: "land-calculator-bd", name: ["জমি পরিমাপ ক্যালকুলেটর", "Land calculator"] },
    sections: [
      {
        h: ["মূল সম্পর্ক", "The basic relationship"],
        p: [
          ["১ কাঠা = ৭২০ বর্গফুট ধরলে ১ কাঠা = ৭২০ ÷ ৪৩৫.৬ = প্রায় ১.৬৫ শতাংশ। উল্টো দিকে ১ শতাংশ = প্রায় ০.৬০৫ কাঠা।", "Taking 1 katha = 720 sq ft, 1 katha = 720 ÷ 435.6 = about 1.65 shatak. The other way, 1 shatak = about 0.605 katha."],
        ],
      },
      {
        h: ["কাঠা থেকে শতাংশ", "Katha to shatak"],
        p: [
          ["সূত্র: কাঠা × ৭২০ ÷ ৪৩৫.৬ (বা কাঠা × ১.৬৫২৯)। যেমন ৩ কাঠা = প্রায় ৪.৯৬ শতাংশ, ৫ কাঠা = প্রায় ৮.২৬ শতাংশ এবং ১০ কাঠা = প্রায় ১৬.৫৩ শতাংশ।", "Formula: katha × 720 ÷ 435.6 (or katha × 1.6529). For example 3 katha = about 4.96 shatak, 5 katha = about 8.26 shatak and 10 katha = about 16.53 shatak."],
        ],
      },
      {
        h: ["শতাংশ থেকে কাঠা", "Shatak to katha"],
        p: [
          ["সূত্র: শতাংশ × ৪৩৫.৬ ÷ ৭২০ (বা শতাংশ × ০.৬০৫)। যেমন ৫ শতাংশ = ৩.০২৫ কাঠা, ১০ শতাংশ = ৬.০৫ কাঠা এবং ২০ শতাংশ = ১২.১ কাঠা।", "Formula: shatak × 435.6 ÷ 720 (or shatak × 0.605). For example 5 shatak = 3.025 katha, 10 shatak = 6.05 katha and 20 shatak = 12.1 katha."],
        ],
      },
      {
        h: ["কাঠার মাপ আলাদা হলে", "If your katha is a different size"],
        p: [
          ["কাঠার মাপ এলাকাভেদে আলাদা হতে পারে। ধরুন আপনার এলাকায় ১ কাঠা = ৮০০ বর্গফুট, তাহলে ১ কাঠা = ৮০০ ÷ ৪৩৫.৬ = প্রায় ১.৮৪ শতাংশ। আমাদের ক্যালকুলেটরে ১ কাঠার বর্গফুট নিজে বদলে নেওয়া যায়, তাই আপনার এলাকার মাপেই হিসাব করতে পারবেন। দলিলের হিসাবের জন্য সার্ভেয়ারের মাপই চূড়ান্ত।", "The size of a katha can differ by area. Suppose 1 katha is 800 sq ft in your area; then 1 katha = 800 ÷ 435.6 = about 1.84 shatak. Our calculator lets you change the square feet per katha, so you can work with your local measure. For legal records the surveyor's measurement is final."],
        ],
      },
    ],
    faqs: [
      { q: ["১ কাঠায় কত শতাংশ?", "How many shatak in 1 katha?"], a: ["১ কাঠা = ৭২০ বর্গফুট ধরলে প্রায় ১.৬৫ শতাংশ।", "About 1.65 shatak, taking 1 katha = 720 sq ft."] },
      { q: ["১০ কাঠা কত শতাংশ?", "How many shatak is 10 katha?"], a: ["প্রায় ১৬.৫৩ শতাংশ (৭,২০০ বর্গফুট)।", "About 16.53 shatak (7,200 sq ft)."] },
      { q: ["১ শতাংশে কত কাঠা?", "How many katha in 1 shatak?"], a: ["প্রায় ০.৬০৫ কাঠা।", "About 0.605 katha."] },
    ],
  },
  {
    slug: "bigha-koto-shotangsho",
    title: ["১ বিঘা কত শতাংশ, কত কাঠা ও কত একর? জমির হিসাব", "How many shatak, katha and acres in 1 bigha? A land conversion guide"],
    desc: ["১ বিঘা কত শতাংশ ও কত বর্গফুট, ১ একরে কত বিঘা এবং বিঘার মাপ নিয়ে সতর্কতা, উদাহরণসহ।", "How many shatak and square feet in 1 bigha, how many bigha in 1 acre, and a caution about bigha sizes, with examples."],
    updated: "2026-11-10",
    updatedLabel: ["১০ নভেম্বর, ২০২৬", "10 November 2026"],
    tool: { slug: "land-calculator-bd", name: ["জমি পরিমাপ ক্যালকুলেটর", "Land calculator"] },
    sections: [
      {
        h: ["১ বিঘার মাপ", "The size of 1 bigha"],
        p: [
          ["১ বিঘা = ২০ কাঠা এবং ১ কাঠা = ৭২০ বর্গফুট ধরলে ১ বিঘা = ১৪,৪০০ বর্গফুট। এটি ১৪,৪০০ ÷ ৪৩৫.৬ = প্রায় ৩৩.০৬ শতাংশ, অর্থাৎ প্রায় ০.৩৩ একর।", "Taking 1 bigha = 20 katha and 1 katha = 720 sq ft, 1 bigha = 14,400 sq ft. That is 14,400 ÷ 435.6 = about 33.06 shatak, or about 0.33 acre."],
        ],
      },
      {
        h: ["বিঘা থেকে শতাংশ ও একর", "Bigha to shatak and acres"],
        p: [
          ["সূত্র: বিঘা × ৩৩.০৬ = শতাংশ। যেমন ৩ বিঘা = প্রায় ৯৯.১৭ শতাংশ এবং ৫ বিঘা = প্রায় ১৬৫.২৯ শতাংশ (প্রায় ১.৬৫ একর)। উল্টো দিকে ১ একর = ১০০ শতাংশ = প্রায় ৩.০২৫ বিঘা।", "Formula: bigha × 33.06 = shatak. For example 3 bigha = about 99.17 shatak and 5 bigha = about 165.29 shatak (about 1.65 acres). The other way, 1 acre = 100 shatak = about 3.025 bigha."],
        ],
      },
      {
        h: ["বিঘার মাপ নিয়ে সতর্কতা", "A caution about bigha sizes"],
        p: [
          ["বিঘার মাপ অঞ্চলভেদে আলাদা হতে পারে, কারণ কাঠার মাপ এবং ১ বিঘায় কাঠার সংখ্যা দুটোই বদলাতে পারে। আমাদের ক্যালকুলেটরে ১ কাঠা কত বর্গফুট এবং ১ বিঘা কত কাঠা, দুটোই নিজে বদলে নেওয়া যায়। জমি কেনাবেচার আগে দলিল ও সার্ভেয়ারের মাপের সঙ্গে মিলিয়ে নিন।", "The size of a bigha can differ by region, because both the size of a katha and the number of katha in a bigha can change. Our calculator lets you change both the square feet per katha and the katha per bigha. Before buying or selling land, check against the deed and a surveyor's measurement."],
        ],
      },
    ],
    faqs: [
      { q: ["১ বিঘা কত শতাংশ?", "How many shatak is 1 bigha?"], a: ["১ বিঘা = ২০ কাঠা, ১ কাঠা = ৭২০ বর্গফুট ধরলে প্রায় ৩৩.০৬ শতাংশ।", "About 33.06 shatak, taking 1 bigha = 20 katha and 1 katha = 720 sq ft."] },
      { q: ["১ একরে কত বিঘা?", "How many bigha in 1 acre?"], a: ["প্রায় ৩.০২৫ বিঘা।", "About 3.025 bigha."] },
      { q: ["১ বিঘা কত বর্গফুট?", "How many square feet is 1 bigha?"], a: ["১৪,৪০০ বর্গফুট (২০ কাঠা × ৭২০ বর্গফুট)।", "14,400 sq ft (20 katha × 720 sq ft)."] },
    ],
  },
  {
    slug: "kani-gonda-kora-hisab",
    title: ["কানি, গণ্ডা, কড়া, ক্রান্তি ও তিল কী? শতাংশে হিসাব", "What are kani, gonda, kora, kranti and til? Converting them to shatak"],
    desc: ["১ কানি কত শতাংশ, ১ গণ্ডা কত শতাংশ এবং কানি থেকে তিল পর্যন্ত আঞ্চলিক জমির এককের হিসাব, উদাহরণসহ।", "How many shatak in 1 kani or 1 gonda, and how the traditional land units from kani down to til relate, with examples."],
    updated: "2026-11-10",
    updatedLabel: ["১০ নভেম্বর, ২০২৬", "10 November 2026"],
    tool: { slug: "land-calculator-bd", name: ["জমি পরিমাপ ক্যালকুলেটর", "Land calculator"] },
    sections: [
      {
        h: ["এই এককগুলো কোথায় চলে", "Where these units are used"],
        p: [
          ["চট্টগ্রাম ও নোয়াখালীসহ কিছু অঞ্চলের পুরোনো দলিলে জমি কানি, গণ্ডা, কড়া, ক্রান্তি ও তিলে লেখা থাকে। এগুলোকে শতাংশে রূপান্তর করলে আজকের হিসাবের সঙ্গে মেলানো সহজ হয়।", "In some areas, including Chattogram and Noakhali, older deeds record land in kani, gonda, kora, kranti and til. Converting them to shatak makes it easy to match today's measures."],
        ],
      },
      {
        h: ["এককগুলোর ক্রম", "How the units relate"],
        p: [
          ["১ কানি = ২০ গণ্ডা, ১ গণ্ডা = ৪ কড়া, ১ কড়া = ৩ ক্রান্তি এবং ১ ক্রান্তি = ২০ তিল। তাই ১ কানি = ৮০ কড়া = ২৪০ ক্রান্তি = ৪,৮০০ তিল।", "1 kani = 20 gonda, 1 gonda = 4 kora, 1 kora = 3 kranti and 1 kranti = 20 til. So 1 kani = 80 kora = 240 kranti = 4,800 til."],
        ],
      },
      {
        h: ["শতাংশ ও বর্গফুটে হিসাব", "In shatak and square feet"],
        p: [
          ["প্রচলিত হিসাবে ১ কানি = ৪০ শতাংশ (১৭,৪২৪ বর্গফুট), ১ গণ্ডা = ২ শতাংশ (৮৭১.২ বর্গফুট), ১ কড়া = ০.৫ শতাংশ (২১৭.৮ বর্গফুট), ১ ক্রান্তি = প্রায় ০.১৬৭ শতাংশ (৭২.৬ বর্গফুট) এবং ১ তিল = ৩.৬৩ বর্গফুট।", "In the common reckoning 1 kani = 40 shatak (17,424 sq ft), 1 gonda = 2 shatak (871.2 sq ft), 1 kora = 0.5 shatak (217.8 sq ft), 1 kranti = about 0.167 shatak (72.6 sq ft) and 1 til = 3.63 sq ft."],
          ["উদাহরণ: ২ কানি ৫ গণ্ডা = (২ × ৪০) + (৫ × ২) = ৯০ শতাংশ।", "Example: 2 kani 5 gonda = (2 × 40) + (5 × 2) = 90 shatak."],
        ],
      },
      {
        h: ["মাপ এলাকাভেদে আলাদা হতে পারে", "Values can differ by area"],
        p: [
          ["এই মাপগুলো প্রচলিত ধরনের। অঞ্চলভেদে আলাদা হতে পারে, তাই স্থানীয় ভূমি অফিস বা সার্ভেয়ারের রেকর্ডের সঙ্গে মিলিয়ে নিন।", "These are the commonly used values and can differ between areas, so check them against the local land office or a surveyor's record."],
        ],
      },
    ],
    faqs: [
      { q: ["১ কানি কত শতাংশ?", "How many shatak is 1 kani?"], a: ["প্রচলিত হিসাবে ৪০ শতাংশ (১৭,৪২৪ বর্গফুট)।", "40 shatak (17,424 sq ft) in the common reckoning."] },
      { q: ["১ গণ্ডা কত শতাংশ?", "How many shatak is 1 gonda?"], a: ["২ শতাংশ (৮৭১.২ বর্গফুট)।", "2 shatak (871.2 sq ft)."] },
      { q: ["১ কানিতে কত গণ্ডা?", "How many gonda in 1 kani?"], a: ["২০ গণ্ডা।", "20 gonda."] },
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
