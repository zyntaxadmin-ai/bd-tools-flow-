// Longer explanation text shown under each tool (key = slug without /tool/).
// Add an entry here to give a tool more useful text. Tools without an entry just skip this section.
export type ArticleSection = { h: string; p: string[]; list?: string[]; table?: { head: string[]; rows: string[][] } };
export type ToolArticle = { bn: ArticleSection[]; en: ArticleSection[] };

export const TOOL_ARTICLES: Record<string, ToolArticle> = {
  "age-calculator": {
    bn: [
      {
        h: "বয়স ক্যালকুলেটর কীভাবে কাজ করে",
        p: [
          "আপনার জন্ম তারিখ দিলে এই টুল আজকের তারিখ (বা আপনার দেওয়া অন্য কোনো তারিখ) পর্যন্ত আপনার বয়স বছর, মাস ও দিনে বের করে দেয়। সঙ্গে মোট মাস, সপ্তাহ, দিন ও ঘণ্টা, কোন বারে জন্মেছেন এবং পরের জন্মদিন আসতে আর কত দিন বাকি, তাও দেখায়।",
          "হিসাবে লিপ ইয়ার ধরা হয়, তাই ২৯ ফেব্রুয়ারির মতো তারিখেও ফলাফল ঠিক থাকে। সব হিসাব আপনার ফোন বা ব্রাউজারেই হয়, জন্ম তারিখ কোথাও জমা হয় না।",
        ],
      },
      {
        h: "নির্দিষ্ট তারিখে বয়স (Age as on)",
        p: [
          "ফর্মে অনেক সময় আজকের বয়স নয়, একটি নির্দিষ্ট তারিখের বয়স চাওয়া হয়, যেমন আবেদনের শেষ দিন, শিক্ষাবর্ষের শুরু বা ভ্রমণের তারিখ। \"বয়স হিসাবের তারিখ\" ঘরে সেই তারিখ দিলে ওই দিনে আপনার বয়স কত ছিল বা হবে তা পাওয়া যায়। ভবিষ্যতের তারিখ দিয়ে দেখা যায় নির্দিষ্ট সময়ের মধ্যে বয়সের শর্ত পূরণ হবে কি না।",
          "ফর্মের তারিখের ধরন সাবধানে পড়ুন। জন্ম তারিখ জন্মনিবন্ধন সনদ, পাসপোর্ট বা সার্টিফিকেটে যেভাবে আছে সেভাবেই দিন, যাতে সংস্থার যাচাইয়ের সাথে মিলে যায়।",
        ],
      },
      {
        h: "হাতে বয়স হিসাব করার নিয়ম",
        p: [
          "প্রথমে আজকের বছর থেকে জন্মসালের বছর বিয়োগ করুন। এ বছরের জন্মদিন এখনও না এলে ফলাফল থেকে ১ কমান, এটাই পূর্ণ বছর। এরপর শেষ জন্মদিন থেকে কত পূর্ণ মাস পার হয়েছে গুনুন, আর শেষে বাকি দিন যোগ করুন।",
          "মোট দিনকে ৩৬৫ দিয়ে ভাগ করা সহজ উপায় মনে হলেও এতে ভুল হয়। লিপ ইয়ারে ৩৬৬ দিন, আর মাসে ২৮ থেকে ৩১ দিন থাকে, তাই কয়েক বছরে এক-দুই দিনের তফাত দাঁড়ায়। যেমন ১৫ জুন ২০০০ এ জন্মালে ১ সেপ্টেম্বর ২০২৬ এ বয়স ২৬ বছর ২ মাস ১৭ দিন।",
        ],
      },
      {
        h: "লিপ ইয়ার, মাসের দিন ও পূর্ণ বয়স",
        p: [
          "লিপ ইয়ারে ফেব্রুয়ারিতে ২৯ দিন থাকে। ২৯ ফেব্রুয়ারি জন্মালে লিপ ইয়ার নয় এমন বছরে জন্মদিন ২৮ ফেব্রুয়ারি ধরা হয়। ৩১ তারিখে জন্মালে ছোট মাসেও হিসাব ঠিক থাকে, কারণ মাসের শেষ দিন ধরে নেওয়া হয়।",
          "পূর্ণ বয়স মানে যে কয়টি পূর্ণ বছর শেষ হয়েছে। ১৭ বছর ১১ মাস বয়সী কেউ এখনও ১৭, জন্মদিন আসার আগে ১৮ ধরা হয় না। বেশিরভাগ দেশ ও সরকারি ফর্মে এই পূর্ণ বয়সই ব্যবহার হয়।",
        ],
      },
      {
        h: "কখন বয়স হিসাব দরকার হয়",
        p: [
          "স্কুল বা কলেজে ভর্তির ফর্ম, পাসপোর্ট ও NID সংক্রান্ত আবেদন, চাকরির আবেদন, বীমা বা অন্য ফর্ম পূরণের সময় সঠিক বয়স লিখতে হয়। নিজে হিসাব করলে মাস ও দিনে ভুল হওয়া সহজ, তাই টুল দিয়ে মিলিয়ে নেওয়া ভালো।",
          "সরকারি চাকরির আবেদনের বয়স নির্দিষ্ট একটি তারিখ ধরে গণনা হয়। সেক্ষেত্রে আমাদের Govt Job Age Calculator ব্যবহার করুন। দুই তারিখের মধ্যে পার্থক্য জানতে Date Difference Calculator কাজে লাগবে।",
        ],
      },
    ],
    en: [
      {
        h: "How the age calculator works",
        p: [
          "Enter your date of birth and this tool works out your age up to today, or up to any date you choose, in years, months and days. It also shows total months, weeks, days and hours, the weekday you were born, and how many days remain until your next birthday.",
          "Leap years are taken into account, so dates such as 29 February still give the right result. Everything is calculated on your phone or browser and your date of birth is not stored anywhere.",
        ],
      },
      {
        h: "Age on a specific date (Age as on)",
        p: [
          "Forms often ask for your age on a fixed date rather than today, such as the application deadline, the start of the school year or the day of travel. Enter that date in the \"Age as on\" field to see how old you were or will be on that day. A future date also shows whether you will meet an age requirement before a deadline.",
          "Read the form's date format carefully. Enter your date of birth exactly as it appears on your birth certificate, passport or certificate, so it matches what the organisation will check.",
        ],
      },
      {
        h: "How to calculate age by hand",
        p: [
          "Subtract the birth year from this year. If your birthday has not come yet this year, reduce the result by one; that gives your completed years. Then count the full months since your last birthday, and finally add the remaining days.",
          "Dividing total days by 365 looks easy but is not exact. A leap year has 366 days and months have 28 to 31 days, so the shortcut drifts by a day or two over the years. For example, someone born on 15 June 2000 is 26 years, 2 months and 17 days old on 1 September 2026.",
        ],
      },
      {
        h: "Leap years, month lengths and completed age",
        p: [
          "A leap year has 29 days in February. If you were born on 29 February, your birthday is counted on 28 February in years that are not leap years. A birth on the 31st is also handled correctly in shorter months because the last day of the month is used.",
          "Completed age is the number of full years finished. Someone who is 17 years and 11 months old is still 17 until the birthday arrives. Most countries and official forms use this completed age.",
        ],
      },
      {
        h: "When you need to calculate your age",
        p: [
          "You need your exact age for school or college admission forms, passport and NID applications, job applications and insurance forms. Counting by hand makes it easy to get the months and days wrong, so it is worth checking with the tool.",
          "Age for a government job is counted on a fixed reference date. For that, use our Govt Job Age Calculator. To find the gap between two dates, use the Date Difference Calculator.",
        ],
      },
    ],
  },

  "gpa-calculator-bd": {
    bn: [
      {
        h: "GPA ক্যালকুলেটর কীভাবে কাজ করে",
        p: [
          "SSC (৯টি মূল বিষয়) বা HSC (৬টি মূল বিষয়) বেছে নিয়ে প্রতিটি বিষয়ের গ্রেড বা নম্বর দিন। টুলটি মূল বিষয়ের পয়েন্ট যোগ করে, ৪র্থ বিষয়ের বাড়তি পয়েন্ট যোগ করে এবং বিষয়ের সংখ্যা দিয়ে ভাগ করে ৫.০০ এর মধ্যে GPA দেখায়। গ্রেড মান: A+ (৮০-১০০) = ৫.০০, A (৭০-৭৯) = ৪.০০, A- (৬০-৬৯) = ৩.৫০, B (৫০-৫৯) = ৩.০০, C (৪০-৪৯) = ২.০০, D (৩৩-৩৯) = ১.০০, F = ০.০০।",
          "কোনো মূল বিষয়ে F থাকলে ফলাফল Fail হয় এবং GPA ০.০০ ধরা হয়। ফলাফলের নিচে ধাপে ধাপে হিসাব এবং ৪র্থ বিষয় ছাড়া GPA-ও দেখানো হয়।",
        ],
      },
      {
        h: "৪র্থ বিষয়ের নিয়ম",
        p: [
          "৪র্থ (ঐচ্ছিক) বিষয়ের গ্রেড পয়েন্ট থেকে ২.০০ বিয়োগ করে যা থাকে, শুধু সেটুকু মোট পয়েন্টে যোগ হয়। ৪র্থ বিষয়ে ৫.০০ পেলে ৩.০০ যোগ হয়, ৪.০০ পেলে ২.০০। ২.০০ বা তার কম পেলে কিছু যোগ হয় না। এই বাড়তি পয়েন্ট মোট পয়েন্টের সঙ্গে যোগ হয়ে মূল বিষয়ের সংখ্যা দিয়েই ভাগ হয়।",
        ],
      },
      {
        h: "অফিসিয়াল ফলাফলের সঙ্গে পার্থক্য",
        p: [
          "এটি আনুমানিক হিসাব। মাদ্রাসা ও কারিগরি বোর্ডে বিষয়ের সংখ্যা আলাদা হতে পারে, এবং ভর্তির সময় কোনো প্রতিষ্ঠান ৪র্থ বিষয় ধরবে কি না তা তাদের সার্কুলারে থাকে। চূড়ান্ত ফল সবসময় আপনার শিক্ষা বোর্ডের প্রকাশিত রেজাল্ট।",
        ],
      },
    ],
    en: [
      {
        h: "How the GPA calculator works",
        p: [
          "Choose SSC (9 main subjects) or HSC (6 main subjects) and enter the grade or marks of each subject. The tool adds the main subject points, adds the 4th subject bonus, and divides by the number of main subjects to give a GPA out of 5.00. Grade points: A+ (80-100) = 5.00, A (70-79) = 4.00, A- (60-69) = 3.50, B (50-59) = 3.00, C (40-49) = 2.00, D (33-39) = 1.00, F = 0.00.",
          "If any main subject is F, the result is Fail and the GPA is 0.00. Under the result you also see the step-by-step working and the GPA without the 4th subject.",
        ],
      },
      {
        h: "The 4th subject rule",
        p: [
          "Only the part of the 4th (optional) subject's grade point above 2.00 is added to the total. 5.00 adds 3.00 and 4.00 adds 2.00. 2.00 or less adds nothing. The bonus goes into the total, which is still divided by the number of main subjects.",
        ],
      },
      {
        h: "How it differs from your official result",
        p: [
          "This is an estimate. Madrasah and technical boards can have a different number of subjects, and an admission circular states whether it counts the 4th subject. The final result is always the one your education board publishes.",
        ],
      },
    ],
  },

  "bkash-calculator": {
    bn: [
      {
        h: "bKash ক্যাশ আউট চার্জ কীভাবে হিসাব হয়",
        p: [
          "ক্যাশ আউট চার্জ সাধারণত টাকার পরিমাণের একটি শতাংশ। এই টুলে এজেন্ট ক্যাশ আউট প্রতি ১০০০ টাকায় ১৮.৫ টাকা (১.৮৫%) এবং এটিএম ক্যাশ আউট প্রতি ১০০০ টাকায় ১৪.৯ টাকা ধরা হয়েছে। অর্থাৎ এজেন্টে ৫০০০ টাকা তুললে চার্জ ৯২.৫ টাকা, আর মোট কাটবে ৫০৯২.৫ টাকা।",
          "টাকার পরিমাণ লিখলেই চার্জ ও মোট কত টাকা লাগবে, তা সঙ্গে সঙ্গে দেখা যায়। পেজের নিচের টেবিলে ৫০০ থেকে ২০,০০০ টাকা পর্যন্ত চার্জ একসঙ্গে দেওয়া আছে।",
        ],
      },
      {
        h: "ব্যালেন্সে যত টাকা আছে, তার কতটা তোলা যাবে",
        p: [
          "চার্জ আপনার ব্যালেন্স থেকেই কাটে, তাই ব্যালেন্সের পুরোটা তোলা যায় না। যেমন এজেন্ট রেটে ৫০০০ টাকা ব্যালেন্স থাকলে প্রায় ৪৯০৯ টাকা তোলা যায়, চার্জ লাগে প্রায় ৯০.৮২ টাকা।",
          "এটি জানতে ক্যালকুলেটরের দ্বিতীয় ট্যাব \"ব্যালেন্স থেকে কত তোলা যাবে\" খুলে নিজের ব্যালেন্স লিখুন।",
        ],
      },
      {
        h: "চার্জ নিশ্চিত করে নিন",
        p: [
          "bKash যেকোনো সময় চার্জ বদলাতে পারে এবং এজেন্ট, প্রিয় এজেন্ট বা এটিএমে রেট আলাদা হতে পারে। তাই বড় অঙ্কের লেনদেনের আগে bKash অ্যাপ বা অফিসিয়াল চার্জ চার্ট দেখে নিন।",
          "Nagad, Rocket ও Upay এর জন্য আলাদা ক্যালকুলেটর আমাদের সাইটে আছে।",
        ],
      },
    ],
    en: [
      {
        h: "How the bKash cash out charge is worked out",
        p: [
          "A cash out charge is usually a percentage of the amount. This tool uses 18.5 taka per 1,000 (1.85%) for agent cash out and 14.9 taka per 1,000 for ATM cash out. So cashing out 5,000 taka at an agent costs 92.5 taka and 5,092.5 taka is deducted in total.",
          "Type the amount and you immediately see the charge and the total needed. The table below the calculator lists the charge for 500 up to 20,000 taka.",
        ],
      },
      {
        h: "How much can you cash out from your balance",
        p: [
          "The charge comes out of the same balance, so you cannot cash out all of it. For example, with 5,000 taka in your account at the agent rate you can cash out about 4,909 taka, and the charge is about 90.82 taka.",
          "To find this, open the second tab, \"Cash out from my balance\", and enter your balance.",
        ],
      },
      {
        h: "Confirm the charge before you transact",
        p: [
          "bKash can change its charges at any time, and rates can differ for agents, priority agents and ATMs. For a large amount, check the bKash app or the official charge chart first.",
          "We also have separate calculators for Nagad, Rocket and Upay.",
        ],
      },
    ],
  },

  "nagad-calculator": {
    bn: [
      {
        h: "Nagad ক্যাশ আউট চার্জের হিসাব",
        p: [
          "এই ক্যালকুলেটরে Nagad এজেন্ট ও এটিএম ক্যাশ আউট প্রতি ১০০০ টাকায় ১৪.৯ টাকা ধরা হয়েছে (শেষ দেখা অক্টোবর ২০২৬)। যেমন ২০০০ টাকা তুললে চার্জ ২৯.৮ টাকা এবং ৫০০০ টাকায় ৭৪.৫ টাকা, আর মোট কাটবে ৫০৭৪.৫ টাকা।",
          "টাকার পরিমাণ লিখলেই চার্জ ও মোট কত টাকা লাগবে, তা সঙ্গে সঙ্গে দেখা যায়। পেজের নিচের টেবিলে ৫০০ থেকে ২০,০০০ টাকা পর্যন্ত চার্জ একসঙ্গে দেওয়া আছে।",
          "বিভিন্ন সূত্রে Nagad এর রেট আলাদা পাওয়া যায়, কারণ অ্যাপ, USSD ও অফার ভেদে চার্জ বদলায়। নিজের রেট জানা থাকলে \"নিজে রেট দিন\" বেছে সেটি ব্যবহার করুন।",
        ],
      },
      {
        h: "ব্যালেন্সে যত টাকা আছে, তার কতটা তোলা যাবে",
        p: [
          "চার্জ আপনার ব্যালেন্স থেকেই কাটে, তাই ব্যালেন্সের পুরোটা তোলা যায় না। যেমন ৫০০০ টাকা ব্যালেন্স থাকলে এই রেটে ৪৯২৬ টাকা তোলা যায়, চার্জ লাগে প্রায় ৭৩.৪ টাকা।",
          "এটি জানতে ক্যালকুলেটরের দ্বিতীয় ট্যাব \"ব্যালেন্স থেকে কত তোলা যাবে\" খুলে নিজের ব্যালেন্স লিখুন।",
        ],
      },
      {
        h: "কেন অ্যাপে মিলিয়ে নেবেন",
        p: [
          "মোবাইল ব্যাংকিং চার্জ নিয়মিত বদলায়। টাকা তোলার আগে Nagad অ্যাপে দেখানো চার্জ বা অফিসিয়াল চার্জ চার্টের সঙ্গে মিলিয়ে নিন। সেন্ড মানির চার্জ অ্যাপ ও অফারভেদে বদলায়, তাই এই টুলে ধরা হয়নি।",
        ],
      },
    ],
    en: [
      {
        h: "Working out the Nagad cash out charge",
        p: [
          "This calculator uses 14.9 taka per 1,000 for Nagad agent and ATM cash out (last checked October 2026). For example, cashing out 2,000 taka costs 29.8 taka and 5,000 taka costs 74.5 taka, so 5,074.5 taka is deducted in total.",
          "Type the amount and you immediately see the charge and the total needed. The table below the calculator lists the charge for 500 up to 20,000 taka.",
          "Public sources list different Nagad rates because the charge varies by app, USSD and offer. If you know your own rate, choose \"Enter my own rate\" and use that instead.",
        ],
      },
      {
        h: "How much can you cash out from your balance",
        p: [
          "The charge comes out of the same balance, so you cannot cash out all of it. For example, with 5,000 taka in your account at this rate you can cash out 4,926 taka, and the charge is about 73.4 taka.",
          "To find this, open the second tab, \"Cash out from my balance\", and enter your balance.",
        ],
      },
      {
        h: "Why check the app",
        p: [
          "Mobile banking charges change regularly. Before you cash out, compare with the charge shown in the Nagad app or the official charge chart. Send money fees vary by app and offer, so they are not included in this tool.",
        ],
      },
    ],
  },

  "word-counter": {
    bn: [
      {
        h: "শব্দ ও অক্ষর গণনার টুল",
        p: [
          "লেখা পেস্ট করলে বা টাইপ করলে সঙ্গে সঙ্গে শব্দ, অক্ষর, বাক্য ও প্যারাগ্রাফের সংখ্যা দেখা যায়। সঙ্গে আনুমানিক পড়ার সময়ও দেখানো হয়, যা প্রতি মিনিটে ২০০ শব্দ ধরে হিসাব করা।",
          "লেখা আপনার ব্রাউজারেই থাকে, কোথাও জমা হয় না।",
        ],
      },
      {
        h: "কোথায় কাজে লাগে",
        p: [
          "রচনা, অ্যাসাইনমেন্ট বা আবেদনপত্রে শব্দসীমা মানতে এটি কাজে লাগে। ব্লগার ও ওয়েবসাইটের লেখকরা মেটা ডেসক্রিপশন (সাধারণত ১৫৫-১৬০ অক্ষরের মধ্যে) ও শিরোনামের দৈর্ঘ্য মিলিয়ে নিতে পারেন। সোশ্যাল মিডিয়া পোস্টে অক্ষরসীমা আছে কিনা দেখতেও কাজে লাগে।",
        ],
      },
    ],
    en: [
      {
        h: "A tool for counting words and characters",
        p: [
          "Paste or type your text and you immediately see the number of words, characters, sentences and paragraphs. It also shows an estimated reading time, worked out at 200 words per minute.",
          "Your text stays in your browser and is not stored anywhere.",
        ],
      },
      {
        h: "Where it helps",
        p: [
          "It helps you stay within the word limit for essays, assignments and applications. Bloggers and website writers can check meta descriptions (usually around 155-160 characters) and title lengths. It is also handy for social media posts that have a character limit.",
        ],
      },
    ],
  },

  "percentage-calculator": {
    bn: [
      {
        h: "শতকরা (পার্সেন্টেজ) কী",
        p: [
          "শতকরা মানে প্রতি একশোতে কত। ২৫% মানে ১০০ এর মধ্যে ২৫, অর্থাৎ ২৫/১০০ বা দশমিকে ০.২৫। শতাংশকে দশমিকে বদলাতে ১০০ দিয়ে ভাগ করুন, আর দশমিক থেকে শতাংশ পেতে ১০০ দিয়ে গুণ করুন।",
          "শতকরা দিয়ে ছোট-বড় যেকোনো সংখ্যার তুলনা করা যায়। যেমন ১৫০ এর মধ্যে ১২০ আর ২৫০ এর মধ্যে ১৮০ সরাসরি তুলনা করা কঠিন, কিন্তু ৮০% আর ৭২% বললে এক নজরে বোঝা যায় কোনটা বেশি।",
        ],
      },
      {
        h: "তিনটি মূল সূত্র",
        p: ["বাকি সব হিসাব এই তিনটি সূত্র থেকেই তৈরি হয়। টুলের প্রথম তিনটি ট্যাব ঠিক এই তিন প্রশ্নের জন্য।"],
        table: {
          head: ["প্রশ্ন", "সূত্র", "উদাহরণ"],
          rows: [
            ["X এর Y% কত", "X × Y ÷ ১০০", "২০০ এর ১৫% = ২০০ × ১৫ ÷ ১০০ = ৩০"],
            ["X হলো Y এর কত শতাংশ", "X ÷ Y × ১০০", "৪৫ হলো ১৮০ এর ৪৫ ÷ ১৮০ × ১০০ = ২৫%"],
            ["X হলো Y% হলে মোট কত", "X × ১০০ ÷ Y", "৫০ হলো ২৫% হলে মোট ৫০ × ১০০ ÷ ২৫ = ২০০"],
          ],
        },
      },
      {
        h: "শতকরা বৃদ্ধি ও হ্রাস",
        p: [
          "সূত্র: (নতুন মান − আগের মান) ÷ আগের মান × ১০০। ভাগ সবসময় আগের মান দিয়ে হয়। ফল ধনাত্মক হলে বৃদ্ধি, ঋণাত্মক হলে হ্রাস।",
          "একটি জরুরি বিষয়: ৫০০ থেকে ৬০০ হলে বৃদ্ধি ২০%, কিন্তু ৬০০ থেকে আবার ৫০০ এ নামলে হ্রাস ২০% নয়, প্রায় ১৬.৬৭%। কারণ দ্বিতীয়বার ভাগ হচ্ছে ৬০০ দিয়ে। টুলের “উল্টো দিকে” লাইনে এটা সরাসরি দেখা যায়।",
        ],
      },
      {
        h: "যোগ-বিয়োগ ও ভ্যাট (VAT) হিসাব",
        p: [
          "কোনো দামের সাথে শতাংশ যোগ করতে দাম × (১ + শতাংশ ÷ ১০০) করুন, বিয়োগ করতে দাম × (১ − শতাংশ ÷ ১০০)। যেমন ১,০০০ টাকার সাথে ১৫% ভ্যাট যোগ করলে ১,০০০ × ১.১৫ = ১,১৫০ টাকা।",
          "উল্টো হিসাবে ভুল বেশি হয়। ভ্যাট-সহ দাম ১,১৫০ টাকা হলে মূল দাম ১,১৫০ ÷ ১.১৫ = ১,০০০ টাকা, আর ভ্যাট ১৫০ টাকা। ১,১৫০ এর ১৫% (১৭২.৫০) বিয়োগ করলে ভুল ফল (৯৭৭.৫০) আসে। টুলের “যোগের আগের মান” অপশনে এই হিসাব ঠিকভাবে হয়।",
          "বাংলাদেশে সাধারণ ভ্যাট হার ১৫%, তবে পণ্য ও সেবাভেদে হ্রাসকৃত বা ভিন্ন হার থাকতে পারে। নির্দিষ্ট পণ্যের হার জাতীয় রাজস্ব বোর্ডের (এনবিআর) হালনাগাদ তথ্য থেকে যাচাই করে নিন।",
        ],
      },
      {
        h: "ছাড়ের হিসাব ও পরপর দুই ছাড়",
        p: [
          "ছাড়ের পরের দাম = মূল দাম × (১ − ছাড় ÷ ১০০)। ১,২০০ টাকায় ১৫% ছাড় হলে ১,২০০ × ০.৮৫ = ১,০২০ টাকা, সাশ্রয় ১৮০ টাকা।",
          "দুটি ছাড় পরপর হলে শতাংশ যোগ করা যায় না। ২০% ছাড়ের পর আরও ১০% ছাড় মানে ১,২০০ × ০.৮ × ০.৯ = ৮৬৪ টাকা। মোট সাশ্রয় ৩৩৬ টাকা, যা মূল দামের ২৮%, ৩০% নয়। টুলের ছাড় ট্যাবে দ্বিতীয় ছাড়ের ঘরে সংখ্যা দিলে কার্যকর হার সরাসরি দেখায়।",
        ],
      },
      {
        h: "পরীক্ষার নম্বর ও ফলাফলের শতকরা",
        p: [
          "প্রাপ্ত নম্বরকে পূর্ণমান দিয়ে ভাগ করে ১০০ দিয়ে গুণ করলেই শতকরা পাওয়া যায়। ৫০০ নম্বরের মধ্যে ৪৩২ পেলে ৪৩২ ÷ ৫০০ × ১০০ = ৮৬.৪%। “কত শতাংশ” ট্যাবে অংশের ঘরে প্রাপ্ত নম্বর, মোটের ঘরে পূর্ণমান দিন।",
          "জিপিএ বা সিজিপিএ বের করার নিয়ম আলাদা, সেজন্য জিপিএ ও সিজিপিএ ক্যালকুলেটর ব্যবহার করুন।",
        ],
      },
      {
        h: "শতাংশ বনাম পারসেন্টেজ পয়েন্ট",
        p: [
          "দুটি হারের পার্থক্য বোঝাতে “পারসেন্টেজ পয়েন্ট” ব্যবহার হয়। হার ১০% থেকে ১৫% হলে পার্থক্য ৫ পারসেন্টেজ পয়েন্ট, কিন্তু আপেক্ষিক বৃদ্ধি ৫ ÷ ১০ × ১০০ = ৫০%।",
          "ব্যাংকের সুদের হার ৮% থেকে ৯% হলে বাড়ল ১ পয়েন্ট, কিন্তু আগের হারের তুলনায় ১২.৫%। সংবাদ ও রিপোর্টে এই দুটি প্রায়ই গুলিয়ে ফেলা হয়, তাই কোনটা বলা হচ্ছে দেখে নিন।",
        ],
      },
      {
        h: "মনে মনে দ্রুত হিসাবের কৌশল",
        p: ["এই কৌশলে মোটামুটি হিসাব দ্রুত হয়। নির্ভুল ফল দরকার হলে টুল ব্যবহার করুন।"],
        list: [
          "১০%: দশমিক বিন্দু এক ঘর বাঁয়ে সরান (৪৫০ এর ১০% = ৪৫)।",
          "১%: দশমিক বিন্দু দুই ঘর বাঁয়ে সরান (৪৫০ এর ১% = ৪.৫)।",
          "৫%: ১০% এর অর্ধেক (৪৫০ এর ৫% = ২২.৫)।",
          "১৫%: ১০% ও ৫% যোগ (৪৫০ এর ১৫% = ৬৭.৫)।",
          "২০%: ১০% এর দ্বিগুণ, অথবা ৫ দিয়ে ভাগ।",
          "২৫%: ৪ দিয়ে ভাগ। ৫০%: ২ দিয়ে ভাগ।",
        ],
      },
      {
        h: "এক্সেল ও গুগল শিটে শতকরা হিসাব",
        p: ["সেল Percentage ফরম্যাটে থাকলে ১৫% লিখলে ভেতরে মান ০.১৫ থাকে। তখন সূত্র হবে =A1*B1, ১০০ দিয়ে ভাগ লাগে না। নিচের সূত্রগুলো সাধারণ সংখ্যার জন্য (B1 তে ১৫ লেখা)।"],
        table: {
          head: ["কাজ", "সূত্র"],
          rows: [
            ["X এর Y%", "=A1*B1/100"],
            ["অংশ মোটের কত শতাংশ", "=A1/B1*100"],
            ["শতকরা বৃদ্ধি বা হ্রাস", "=(B1-A1)/A1*100"],
            ["শতাংশ যোগ", "=A1*(1+B1/100)"],
            ["ছাড়ের পর দাম", "=A1*(1-B1/100)"],
          ],
        },
      },
      {
        h: "সাধারণ ভুল এড়াবেন যেভাবে",
        p: [],
        list: [
          "ভুল ভিত্তি: বৃদ্ধি-হ্রাসে সবসময় আগের মান দিয়ে ভাগ করুন, নতুন মান দিয়ে নয়।",
          "দুই ছাড় যোগ করা: ২০% ও ১০% ছাড় মানে ৩০% নয়, ২৮%।",
          "ভ্যাট-সহ দাম থেকে ১৫% বিয়োগ করা: এর বদলে ১.১৫ দিয়ে ভাগ করুন।",
          "পারসেন্টেজ পয়েন্ট ও শতাংশ গুলিয়ে ফেলা।",
          "শূন্য থেকে বৃদ্ধি: আগের মান ০ হলে শতকরা বৃদ্ধি বের করা যায় না। টুল তখন কারণ জানিয়ে দেয়।",
          "১০০% এর বেশি: দাম দ্বিগুণ হলে বৃদ্ধি ১০০%, তিনগুণ হলে ২০০%। কিন্তু হ্রাস কখনও ১০০% এর বেশি হয় না।",
        ],
      },
      {
        h: "এই টুল ব্যবহারে যা জানা দরকার",
        p: [
          "সব হিসাব আপনার ফোন বা ব্রাউজারেই হয়, কোনো সংখ্যা সার্ভারে যায় না। বাংলা অঙ্কে (১২৩) লিখলেও টুল বোঝে, আর ফলাফলে লাখ-কোটির কমা (১২,৫০,০০০) দেখায়। ফল সর্বোচ্চ চার দশমিক পর্যন্ত দেখানো হয়, শেষের অপ্রয়োজনীয় শূন্য বাদ দিয়ে।",
          "“সংরক্ষণ” চাপলে হিসাবটি শুধু আপনার ডিভাইসে থাকে, আর “শেয়ার” দিয়ে একই সংখ্যাসহ লিংক পাঠানো যায়।",
        ],
      },
    ],
    en: [
      {
        h: "What a percentage is",
        p: [
          "A percentage is a number out of one hundred. 25% means 25 out of 100, which is 25/100 or 0.25 as a decimal. To turn a percent into a decimal, divide by 100. To turn a decimal into a percent, multiply by 100.",
          "Percentages let you compare numbers of different sizes. Scoring 120 out of 150 and 180 out of 250 is hard to compare directly, but 80% against 72% shows at a glance which is higher.",
        ],
      },
      {
        h: "The three core formulas",
        p: ["Every other percentage calculation is built from these three. The first three tabs of the tool answer exactly these questions."],
        table: {
          head: ["Question", "Formula", "Example"],
          rows: [
            ["What is Y% of X", "X × Y ÷ 100", "15% of 200 = 200 × 15 ÷ 100 = 30"],
            ["X is what % of Y", "X ÷ Y × 100", "45 of 180 = 45 ÷ 180 × 100 = 25%"],
            ["X is Y% of what", "X × 100 ÷ Y", "50 is 25% of a number: 50 × 100 ÷ 25 = 200"],
          ],
        },
      },
      {
        h: "Percentage increase and decrease",
        p: [
          "Formula: (new value − old value) ÷ old value × 100. You always divide by the old value. A positive result is an increase and a negative one is a decrease.",
          "One thing that surprises people: going from 500 to 600 is a 20% increase, but going back from 600 to 500 is not a 20% decrease. It is about 16.67%, because this time you divide by 600. The “Reverse” line in the tool shows this directly.",
        ],
      },
      {
        h: "Adding and removing a percentage (VAT)",
        p: [
          "To add a percentage to a price, use price × (1 + percent ÷ 100). To take it off, use price × (1 − percent ÷ 100). Adding 15% VAT to 1,000 taka gives 1,000 × 1.15 = 1,150 taka.",
          "Working backwards is where mistakes happen. If the price including VAT is 1,150 taka, the price before VAT is 1,150 ÷ 1.15 = 1,000 taka and the VAT is 150 taka. Taking 15% of 1,150 (172.50) off gives the wrong answer, 977.50. The “Before adding” option in the tool does this correctly.",
          "The standard VAT rate in Bangladesh is 15%, but some goods and services have reduced or different rates. Check the current rate for your product with the National Board of Revenue (NBR).",
        ],
      },
      {
        h: "Discounts and two discounts in a row",
        p: [
          "Price after a discount = original price × (1 − discount ÷ 100). A 15% discount on 1,200 taka gives 1,200 × 0.85 = 1,020 taka, a saving of 180 taka.",
          "Two discounts in a row cannot be added together. 20% off and then another 10% off gives 1,200 × 0.8 × 0.9 = 864 taka. The total saving is 336 taka, which is 28% of the original price, not 30%. Enter the second discount in the Discount tab to see the effective rate directly.",
        ],
      },
      {
        h: "Exam marks as a percentage",
        p: [
          "Divide the marks you got by the full marks and multiply by 100. Scoring 432 out of 500 gives 432 ÷ 500 × 100 = 86.4%. In the “What %” tab, put your marks in the part box and the full marks in the total box.",
          "GPA and CGPA use different rules, so use the GPA and CGPA calculators for those.",
        ],
      },
      {
        h: "Percent versus percentage points",
        p: [
          "Percentage points describe the gap between two rates. A rate moving from 10% to 15% is a 5 percentage point change, but a relative increase of 5 ÷ 10 × 100 = 50%.",
          "A bank rate going from 8% to 9% is up 1 point, but 12.5% higher than before. News stories often mix the two up, so check which one is meant.",
        ],
      },
      {
        h: "Quick mental maths",
        p: ["These shortcuts give fast estimates. Use the tool when you need an exact figure."],
        list: [
          "10%: move the decimal point one place left (10% of 450 = 45).",
          "1%: move the decimal point two places left (1% of 450 = 4.5).",
          "5%: half of 10% (5% of 450 = 22.5).",
          "15%: add 10% and 5% (15% of 450 = 67.5).",
          "20%: double 10%, or divide by 5.",
          "25%: divide by 4. 50%: divide by 2.",
        ],
      },
      {
        h: "Percentage formulas in Excel and Google Sheets",
        p: ["If a cell is formatted as Percentage, typing 15% stores 0.15 inside. In that case the formula is simply =A1*B1 with no division by 100. The formulas below are for plain numbers (15 typed in B1)."],
        table: {
          head: ["Task", "Formula"],
          rows: [
            ["Y% of X", "=A1*B1/100"],
            ["Part as a % of total", "=A1/B1*100"],
            ["Percent increase or decrease", "=(B1-A1)/A1*100"],
            ["Add a percentage", "=A1*(1+B1/100)"],
            ["Price after a discount", "=A1*(1-B1/100)"],
          ],
        },
      },
      {
        h: "Common mistakes to avoid",
        p: [],
        list: [
          "Wrong base: for increase and decrease, always divide by the old value, not the new one.",
          "Adding two discounts: 20% and 10% off is 28%, not 30%.",
          "Taking 15% off a VAT-inclusive price: divide by 1.15 instead.",
          "Mixing up percentage points and percent.",
          "Growth from zero: if the old value is 0 the percentage change is undefined. The tool tells you why.",
          "Going over 100%: doubling is a 100% increase and tripling is 200%. A decrease can never be more than 100%.",
        ],
      },
      {
        h: "Good to know about this tool",
        p: [
          "All calculations run on your phone or in your browser. No number is sent to a server. You can type Bangla digits (১২৩) and the tool understands them, and in Bangla mode results use lakh and crore commas (12,50,000). Results show up to four decimal places, with trailing zeros removed.",
          "Press “Save” to keep a calculation on this device only, and “Share” to send a link that opens with the same numbers.",
        ],
      },
    ],
  },

  "bmi-calculator": {
    bn: [
      {
        h: "BMI কীভাবে হিসাব হয়",
        p: [
          "BMI (বডি মাস ইনডেক্স) = ওজন (কেজি) ÷ উচ্চতা (মিটার) এর বর্গ। উচ্চতা সেমিতে থাকলে ১০০ দিয়ে ভাগ করে মিটার বানিয়ে নিন। যেমন ৭০ কেজি ওজন ও ১৭০ সেমি (১.৭ মিটার) উচ্চতায় ১.৭ × ১.৭ = ২.৮৯, আর ৭০ ÷ ২.৮৯ = প্রায় ২৪.২, যা স্বাভাবিক সীমার মধ্যে।",
          "পাউন্ড ও ইঞ্চিতে হিসাব করতে চাইলে সূত্র হলো ৭০৩ × ওজন (পাউন্ড) ÷ উচ্চতা (ইঞ্চি) এর বর্গ। এই টুলে কেজি-পাউন্ড ও ফুট-ইঞ্চি-সেমি যেকোনোটি ব্যবহার করা যায়, ফল একই আসে।",
        ],
      },
      {
        h: "BMI চার্ট: কত হলে কী (WHO আন্তর্জাতিক)",
        p: [
          "প্রাপ্তবয়স্কদের (২০ বছর বা তার বেশি) জন্য WHO এর শ্রেণিবিন্যাস: ১৮.৫ এর নিচে কম ওজন (১৭ থেকে ১৮.৪ সামান্য, ১৬ থেকে ১৬.৯ মাঝারি, ১৬ এর নিচে মারাত্মক), ১৮.৫ থেকে ২৪.৯ স্বাভাবিক, ২৫ থেকে ২৯.৯ বেশি ওজন, ৩০ থেকে ৩৪.৯ স্থূলতা ক্লাস ১, ৩৫ থেকে ৩৯.৯ ক্লাস ২ এবং ৪০ বা তার বেশি ক্লাস ৩।",
        ],
      },
      {
        h: "দক্ষিণ এশীয়দের জন্য BMI কত হলে স্বাভাবিক",
        p: [
          "WHO এর ২০০৪ সালের বিশেষজ্ঞ পরামর্শে দেখা গেছে, অনেক এশীয় জনগোষ্ঠীতে টাইপ ২ ডায়াবেটিস ও হৃদরোগের ঝুঁকি ২৫ এর আগেই বাড়তে শুরু করে। তাই আন্তর্জাতিক সীমা অপরিবর্তিত রেখে তারা ২৩ (ঝুঁকি বেড়েছে) ও ২৭.৫ (উচ্চ ঝুঁকি) নামে দুটি অতিরিক্ত অ্যাকশন পয়েন্ট যোগ করেছে।",
          "এই হিসাবে ১৮.৫ এর নিচে কম ওজন, ১৮.৫ থেকে ২২.৯ গ্রহণযোগ্য ঝুঁকির সীমা, ২৩ থেকে ২৭.৪ ঝুঁকি বেড়েছে এবং ২৭.৫ বা তার বেশি উচ্চ ঝুঁকি। টুলে ‘দক্ষিণ এশীয়’ মানদণ্ড বেছে নিলে এই ভাগে ফল দেখাবে। এটি সব এশীয়ের জন্য একই সীমা নয়, বরং একটি সতর্কতার বিন্দু। আপনার ব্যক্তিগত ঝুঁকি চিকিৎসক বিচার করবেন।",
        ],
      },
      {
        h: "বেশি ওজনে কী ঝুঁকি বাড়ে",
        p: [
          "CDC-র তথ্য অনুযায়ী বেশি ওজন বা স্থূলতার সঙ্গে উচ্চ রক্তচাপ, টাইপ ২ ডায়াবেটিস, কোলেস্টেরলের সমস্যা, হৃদরোগ, স্ট্রোক, স্লিপ অ্যাপনিয়া, অস্টিওআর্থ্রাইটিস ও কিছু ধরনের ক্যানসারের ঝুঁকি যুক্ত।",
        ],
      },
      {
        h: "কম ওজনে কী ঝুঁকি বাড়ে",
        p: [
          "অতিরিক্ত কম ওজনে অপুষ্টি, রক্তস্বল্পতা, হাড় দুর্বল হওয়া, রোগ প্রতিরোধ ক্ষমতা কমা এবং সার্জারির পর জটিলতার ঝুঁকি থাকতে পারে। কারণ স্পষ্ট না হলে ডাক্তার দেখান।",
        ],
      },
      {
        h: "BMI এর সীমাবদ্ধতা",
        p: [
          "BMI একটি সাধারণ আন্দাজ, রোগ নির্ণয় নয়। এটি পেশি ও চর্বির পার্থক্য ধরে না, তাই খেলোয়াড় বা পেশিবহুল মানুষের BMI বেশি দেখাতে পারে। আবার একই BMI-তে বয়স্কদের শরীরে তরুণদের চেয়ে বেশি চর্বি থাকতে পারে, নারীদেরও সাধারণত পুরুষদের চেয়ে বেশি। চর্বি কোথায় জমেছে (পেটে কি না) তাও BMI বলে না, তাই কোমরের মাপ, রক্তচাপ ও রক্তের পরীক্ষা মিলিয়ে দেখা ভালো।",
          "শিশু ও কিশোরদের (২ থেকে ১৯ বছর) BMI বয়স ও লিঙ্গ অনুযায়ী পার্সেন্টাইল দিয়ে বিচার হয়, তাই এই ক্যালকুলেটর তাদের জন্য নয়। ৬৫ বছরের বেশি বয়সীদের ক্ষেত্রে সামান্য বেশি BMI (প্রায় ২৫ থেকে ২৭) অনেক সময় ক্ষতিকর নয় বলে ধরা হয়।",
          "স্বাস্থ্য নিয়ে সিদ্ধান্ত নিতে চিকিৎসকের পরামর্শ নিন।",
        ],
      },
    ],
    en: [
      {
        h: "How BMI is calculated",
        p: [
          "BMI (body mass index) = weight (kg) ÷ height (metres) squared. If your height is in cm, divide by 100 to get metres. For example, 70 kg at 170 cm (1.7 m) gives 1.7 × 1.7 = 2.89, and 70 ÷ 2.89 = about 24.2, which is in the normal range.",
          "In pounds and inches the formula is 703 × weight (lb) ÷ height (in) squared. This tool accepts kg or lb and feet-inches or cm, and gives the same result either way.",
        ],
      },
      {
        h: "BMI chart for adults (WHO international)",
        p: [
          "For adults aged 20 and over the WHO classification is: below 18.5 underweight (17 to 18.4 mild, 16 to 16.9 moderate, below 16 severe thinness), 18.5 to 24.9 normal, 25 to 29.9 overweight, 30 to 34.9 obese class I, 35 to 39.9 class II and 40 or more class III.",
        ],
      },
      {
        h: "What is a healthy BMI for South Asians",
        p: [
          "A 2004 WHO expert consultation found that in many Asian populations the risk of type 2 diabetes and heart disease starts to rise below a BMI of 25. It kept the international cut-offs but added two public health action points, 23 (increased risk) and 27.5 (high risk).",
          "On that view, below 18.5 is underweight, 18.5 to 22.9 is acceptable risk, 23 to 27.4 is increased risk and 27.5 or more is high risk. Choose the South Asian standard in the tool to see your result this way. These are warning points, not a rule that fits every Asian person; a doctor judges your own risk.",
        ],
      },
      {
        h: "Risks of a higher weight",
        p: [
          "According to the CDC, overweight and obesity are linked with high blood pressure, type 2 diabetes, cholesterol problems, heart disease, stroke, sleep apnea, osteoarthritis and some cancers.",
        ],
      },
      {
        h: "Risks of being underweight",
        p: [
          "Being very underweight can bring malnutrition, anemia, weaker bones, a weaker immune system and more complications after surgery. See a doctor if the reason is not clear.",
        ],
      },
      {
        h: "Limits of BMI",
        p: [
          "BMI is a rough guide, not a diagnosis. It does not separate muscle from fat, so an athlete or muscular person can show a high BMI. At the same BMI older adults tend to carry more body fat than younger ones, and women more than men. BMI also cannot show where fat is stored, so waist size, blood pressure and blood tests give a fuller picture.",
          "Children and teenagers (2 to 19) are assessed with percentiles for age and sex, so this calculator is not for them. For people over 65 a slightly higher BMI (about 25 to 27) is often not considered harmful.",
          "Talk to a doctor before making health decisions.",
        ],
      },
    ],
  },

  "emi-calculator-bd": {
    bn: [
      { h: "EMI ক্যালকুলেটর কীভাবে কাজ করে", p: [
        "লোনের পরিমাণ, বার্ষিক সুদের হার ও মেয়াদ দিলে এই টুল মাসিক কিস্তি (EMI), মোট সুদ, মোট পরিশোধ এবং শোধ শেষ হওয়ার সময় বের করে। সঙ্গে দেখায় আসল ও সুদের ভাগ, বকেয়া আসল কমার চার্ট এবং বছর বা মাসভিত্তিক পুরো কিস্তির তালিকা, যা CSV হিসেবে নামানো যায়।",
        "Reducing balance পদ্ধতিতে প্রতি মাসের সুদ হয় সেই মাসের শুরুর বাকি আসলের ওপর। তাই শুরুতে কিস্তির বড় অংশ সুদে যায়, পরে আসলের অংশ বাড়ে। যেমন ৫,০০,০০০ টাকা, ১০% সুদ, ৫ বছরের লোনে প্রথম মাসের কিস্তি ১০,৬২৪ টাকার মধ্যে সুদ ৪,১৬৭ টাকা এবং আসল ৬,৪৫৭ টাকা।",
      ] },
      { h: "Reducing balance ও flat rate", p: [
        "Reducing balance এ বাকি আসল কমার সাথে সুদও কমে। Flat rate এ সুদ গণনা হয় পুরো মেয়াদ ধরে মূল আসলের ওপর, তাই একই হারে কিস্তি বেশি হয়। কোন পদ্ধতি প্রযোজ্য, তা ঋণদাতাভেদে আলাদা, তাই লোন নেওয়ার আগে জিজ্ঞেস করে নিন।",
        "Flat rate দেখতে কম মনে হলেও প্রকৃত খরচ বেশি। এই টুলে flat rate বেছে নিলে সমান কিস্তির reducing balance হার আলাদা করে দেখায়। উদাহরণ: ৩ বছরের লোনে ১০% flat প্রায় ১৭.৯২% reducing balance এর সমান।",
      ] },
      { h: "লোনের ধরন অনুযায়ী হিসাব", p: [
        "উপরের লোনের ধরনের বোতামগুলো শুধু শুরুর উদাহরণ বসায়: হোম, পার্সোনাল, কার, SME ও এডুকেশন লোন। সুদের হার ব্যাংক, গ্রাহকের অবস্থা ও সময়ভেদে বদলায়, তাই আপনার ব্যাংকের ঘোষিত হার বসিয়ে হিসাব করুন। পাশে দেখানো সীমা আনুমানিক, নিশ্চিত হার নয়।",
        "উদাহরণ: ৩,০০,০০০ টাকার পার্সোনাল লোন ১৫% সুদে ৩ বছরে কিস্তি প্রায় ১০,৪০০ টাকা, মোট সুদ ৭৪,৩৮৬ টাকা। ২০ লাখ টাকার লোন ১১% সুদে ১০ বছরে কিস্তি প্রায় ২৭,৫৫০ টাকা, মোট সুদ প্রায় ১৩,০৬,০০০ টাকা।",
      ] },
      { h: "কিস্তির বোঝা কমানোর উপায়", p: [
        "মেয়াদ বাড়ালে মাসিক কিস্তি কমে কিন্তু মোট সুদ বাড়ে, তাই দুটোর ভারসাম্য দেখুন। ডাউন পেমেন্ট বাড়িয়ে লোনের পরিমাণ কমালে সুদও কমে। একাধিক ব্যাংকের হার ও চার্জ এই টুলে বসিয়ে পাশাপাশি তুলনা করা যায়।",
        "সম্ভব হলে প্রতি মাসে অতিরিক্ত টাকা দিন। ‘আরও অপশন’ এ সেই অঙ্ক দিলে টুল দেখায় ঋণ কত মাস আগে শোধ হবে ও কত সুদ বাঁচবে। তার আগে জেনে নিন আগাম পরিশোধে ব্যাংকের কোনো ফি আছে কি না।",
      ] },
      { h: "লোন নেওয়ার আগে যা দেখে নেবেন", p: [
        "শুধু মাসিক কিস্তি নয়, মোট খরচ দেখুন। প্রসেসিং ফি, ইনস্যুরেন্স, আবগারি শুল্ক, দেরিতে পরিশোধের জরিমানা ও আগাম পরিশোধের ফি আছে কি না জানুন। সুদের হার স্থির (fixed) না পরিবর্তনশীল (floating), তাও জিজ্ঞেস করুন।",
        "কিস্তি আপনার মাসিক আয়ের কতটা অংশ নিয়ে নেবে এবং আয় কমলেও চালানো যাবে কি না, তা ভেবে নিন। লোন চুক্তির কাগজ মন দিয়ে পড়ুন, আর চূড়ান্ত কিস্তির অঙ্ক ব্যাংকের কাছ থেকে লিখিত নিন।",
      ] },
    ],
    en: [
      { h: "How the EMI calculator works", p: [
        "Enter the loan amount, annual interest rate and tenure, and the tool gives you the monthly EMI, total interest, total repayment and when the loan ends. It also shows the principal and interest split, a chart of the balance falling, and the full yearly or monthly schedule, which you can download as a CSV.",
        "With the reducing balance method, each month's interest is charged on the balance at the start of that month. So most of an early EMI goes to interest and the principal share grows later. For example, on a 5,00,000 taka loan at 10% over 5 years, the first EMI of 10,624 taka has 4,167 taka of interest and 6,457 taka of principal.",
      ] },
      { h: "Reducing balance and flat rate", p: [
        "With reducing balance, interest falls as the balance falls. With a flat rate, interest is charged on the original amount for the whole tenure, so the EMI is higher at the same rate. Which method applies depends on the lender, so ask before you borrow.",
        "A flat rate looks lower but costs more. When you choose flat rate, the tool also shows the reducing balance rate that gives the same EMI. For example, 10% flat on a 3 year loan equals about 17.92% on a reducing balance.",
      ] },
      { h: "Calculating by loan type", p: [
        "The loan type buttons above only fill in a starting example for home, personal, car, SME and education loans. Rates change with the bank, the borrower and the date, so enter the rate your bank announces. The range shown beside them is approximate, not a guaranteed rate.",
        "Examples: a 3,00,000 taka personal loan at 15% over 3 years has an EMI of about 10,400 taka and total interest of 74,386 taka. A 20 lakh taka loan at 11% over 10 years has an EMI of about 27,550 taka and total interest of about 13,06,000 taka.",
      ] },
      { h: "Ways to lower the burden", p: [
        "A longer tenure lowers the monthly EMI but raises the total interest, so look at both. A bigger down payment means a smaller loan and less interest. You can enter different banks' rates and charges here and compare them side by side.",
        "If you can, pay something extra every month. Enter the amount under ‘More options’ and the tool shows how many months earlier the loan ends and how much interest you save. First find out whether the bank charges a fee for early repayment.",
      ] },
      { h: "What to check before you borrow", p: [
        "Look at the total cost, not only the monthly EMI. Find out whether there are processing fees, insurance, excise duty, late payment charges and early repayment fees. Also ask whether the rate is fixed or floating.",
        "Think about how much of your monthly income the EMI will take and whether you could still manage if your income drops. Read the loan agreement carefully and get the final EMI figure from the bank in writing.",
      ] },
    ],
  },

  "land-calculator-bd": {
    bn: [
      {
        h: "জমির একক ও রূপান্তর",
        p: [
          "বাংলাদেশে জমি শতাংশ, কাঠা, বিঘা, একর ও বর্গফুটে মাপা হয়। এই টুলে ১ শতাংশ = ৪৩৫.৬ বর্গফুট এবং ১ একর = ১০০ শতাংশ = ৪৩,৫৬০ বর্গফুট ধরা হয়। ১ বিঘা = ২০ কাঠা এবং ১ কাঠা = ১৬ ছটাক।",
          "কাঠার মাপ এলাকাভেদে আলাদা। টুলে সাধারণ মাপ ৭২০ বর্গফুট ধরা আছে, যা বদলানো যায়। এই মাপে ১ কাঠা প্রায় ১.৬৫ শতাংশ এবং ১ বিঘা (১৪,৪০০ বর্গফুট) প্রায় ৩৩ শতাংশ।",
        ],
      },
      {
        h: "জমি কেনাবেচার আগে যা দেখবেন",
        p: [
          "দলিল, খতিয়ান ও সার্ভেয়ারের মাপের সঙ্গে হিসাব মিলিয়ে নিন। এলাকা অনুযায়ী কাঠা ও বিঘার মাপ আলাদা হওয়ায় শুধু টুলের ফলাফলের ওপর নির্ভর করবেন না। এই টুল প্রাথমিক আন্দাজের জন্য।",
          "আয়তক্ষেত্রাকার জমির দৈর্ঘ্য ও প্রস্থ ফুটে দিলে টুল ক্ষেত্রফল বের করে সব এককে রূপান্তর করে দেখায়।",
        ],
      },
      {
        h: "সাধারণ রূপান্তর তালিকা (১ কাঠা = ৭২০ বর্গফুট ধরে)",
        p: [
          "১ শতাংশ = ৪৩৫.৬ বর্গফুট = ০.৬০৫ কাঠা। ১ কাঠা = ৭২০ বর্গফুট = প্রায় ১.৬৫ শতাংশ। ১ বিঘা = ২০ কাঠা = ১৪,৪০০ বর্গফুট = প্রায় ৩৩.০৬ শতাংশ। ১ একর = ১০০ শতাংশ = ৪৩,৫৬০ বর্গফুট = ৬০.৫ কাঠা = ৩.০২৫ বিঘা।",
          "দ্রুত হিসাব: ৫ শতাংশ = ২,১৭৮ বর্গফুট = ৩.০২৫ কাঠা। ১০ শতাংশ = ৪,৩৫৬ বর্গফুট = ৬.০৫ কাঠা। ২০ শতাংশ = ৮,৭১২ বর্গফুট = ১২.১ কাঠা। উল্টো দিকে ৩ কাঠা = ২,১৬০ বর্গফুট = প্রায় ৪.৯৬ শতাংশ, ৫ কাঠা = ৩,৬০০ বর্গফুট = প্রায় ৮.২৬ শতাংশ এবং ১০ কাঠা = ৭,২০০ বর্গফুট = প্রায় ১৬.৫৩ শতাংশ।",
          "১ হেক্টর = প্রায় ২.৪৭১ একর = প্রায় ২৪৭.১ শতাংশ। ১ বর্গমিটার = ১০.৭৬৩৯ বর্গফুট এবং ১ বর্গগজ = ৯ বর্গফুট।",
        ],
      },
      {
        h: "কানি, গণ্ডা, কড়া, ক্রান্তি ও তিল",
        p: [
          "চট্টগ্রাম ও নোয়াখালীসহ কিছু অঞ্চলে জমি কানি, গণ্ডা, কড়া, ক্রান্তি ও তিলেও মাপা হয়। প্রচলিত হিসাবে ১ কানি = ২০ গণ্ডা = ৪০ শতাংশ (১৭,৪২৪ বর্গফুট)। ১ গণ্ডা = ৪ কড়া = ২ শতাংশ, ১ কড়া = ৩ ক্রান্তি এবং ১ ক্রান্তি = ২০ তিল।",
          "১ শতাংশ = ১০০ অযুতাংশ (১ অযুতাংশ হলো ১ একরের ১০,০০০ ভাগের ১ ভাগ)। এই মাপ এলাকাভেদে আলাদা হতে পারে, তাই স্থানীয় রেকর্ড দেখে নিশ্চিত হোন।",
        ],
      },
      {
        h: "জমির দাম হিসাব",
        p: [
          "প্রতি শতাংশ, কাঠা, বিঘা বা একরের দাম দিলে টুল উপরের জমির পরিমাণ অনুযায়ী মোট দাম বের করে। যেমন প্রতি কাঠা ১২,৫০,০০০ টাকা হলে ৫ শতাংশ (৩.০২৫ কাঠা) জমির দাম হয় ৩৭,৮১,২৫০ টাকা।",
          "একই দাম থেকে প্রতি শতাংশ ও প্রতি বিঘার দামও দেখা যায়, যা দুটি জমির দাম তুলনা করতে কাজে লাগে।",
        ],
      },
    ],
    en: [
      {
        h: "Land units and conversion",
        p: [
          "In Bangladesh land is measured in shatak (decimal), katha, bigha, acre and square feet. This tool uses 1 shatak = 435.6 sq ft and 1 acre = 100 shatak = 43,560 sq ft. 1 bigha = 20 katha and 1 katha = 16 chatak.",
          "The size of a katha differs by area. The tool uses the common 720 sq ft, which you can change. At that size 1 katha is about 1.65 shatak and 1 bigha (14,400 sq ft) is about 33 shatak.",
        ],
      },
      {
        h: "What to check before buying or selling land",
        p: [
          "Match the figures against the deed, khatian and a surveyor's measurement. Because katha and bigha differ by area, do not rely only on the tool's result. It is meant for a first estimate.",
          "For a rectangular plot, enter the length and width in feet and the tool works out the area and converts it into every unit.",
        ],
      },
      {
        h: "Common conversions (taking 1 katha = 720 sq ft)",
        p: [
          "1 shatak = 435.6 sq ft = 0.605 katha. 1 katha = 720 sq ft = about 1.65 shatak. 1 bigha = 20 katha = 14,400 sq ft = about 33.06 shatak. 1 acre = 100 shatak = 43,560 sq ft = 60.5 katha = 3.025 bigha.",
          "Quick figures: 5 shatak = 2,178 sq ft = 3.025 katha. 10 shatak = 4,356 sq ft = 6.05 katha. 20 shatak = 8,712 sq ft = 12.1 katha. The other way round, 3 katha = 2,160 sq ft = about 4.96 shatak, 5 katha = 3,600 sq ft = about 8.26 shatak and 10 katha = 7,200 sq ft = about 16.53 shatak.",
          "1 hectare = about 2.471 acres = about 247.1 shatak. 1 square metre = 10.7639 sq ft and 1 square yard (gaz) = 9 sq ft.",
        ],
      },
      {
        h: "Kani, gonda, kora, kranti and til",
        p: [
          "In Chattogram, Noakhali and some other areas land is also counted in kani, gonda, kora, kranti and til. In the common reckoning 1 kani = 20 gonda = 40 shatak (17,424 sq ft). 1 gonda = 4 kora = 2 shatak, 1 kora = 3 kranti and 1 kranti = 20 til.",
          "1 shatak = 100 ojutangsho (1 ojutangsho is 1/10,000 of an acre). These values can differ by area, so check the local record.",
        ],
      },
      {
        h: "Working out land price",
        p: [
          "Enter a price per shatak, katha, bigha or acre and the tool works out the total for the land amount entered above. For example, at 12,50,000 taka per katha, 5 shatak (3.025 katha) costs 37,81,250 taka.",
          "The same price is also shown per shatak and per bigha, which helps when comparing two plots quoted in different units.",
        ],
      },
    ],
  },

  "govt-job-age-calculator": {
    bn: [
      {
        h: "সরকারি চাকরির বয়স কীভাবে গণনা হয়",
        p: [
          "সরকারি চাকরির বিজ্ঞপ্তিতে একটি নির্দিষ্ট তারিখ দেওয়া থাকে, যে তারিখে আপনার বয়স গণনা হবে। এই টুলে আপনার জন্ম তারিখ ও বিজ্ঞপ্তির সেই তারিখ দিলে ওই দিনে আপনার বয়স বছর, মাস ও দিনে দেখায়।",
          "ফলাফলে বোঝা যায় আপনি বয়সের সীমার মধ্যে আছেন কিনা, এবং কত দিন পর্যন্ত যোগ্য থাকতেন বা কত দিন আগে সীমা পেরিয়েছে।",
        ],
      },
      {
        h: "বিজ্ঞপ্তি দেখে নিশ্চিত হোন",
        p: [
          "বয়সসীমা, গণনার তারিখ ও কোটা প্রতিটি চাকরির বিজ্ঞপ্তি ভেদে আলাদা। তাই আবেদনের আগে অফিসিয়াল বিজ্ঞপ্তি ভালো করে পড়ুন। এই টুল শুধু আনুমানিক হিসাব দেয়, চূড়ান্ত সিদ্ধান্ত বিজ্ঞপ্তির নিয়ম অনুযায়ী।",
        ],
      },
    ],
    en: [
      {
        h: "How age is counted for a government job",
        p: [
          "A government job circular gives a fixed date on which your age is counted. Enter your date of birth and that date from the circular, and the tool shows your age on that day in years, months and days.",
          "The result tells you whether you are within the age limit, and how many days you remained eligible or how many days ago the limit passed.",
        ],
      },
      {
        h: "Confirm with the circular",
        p: [
          "Age limits, reference dates and quotas differ by job circular, so read the official circular carefully before applying. This tool gives only an estimate. The final decision follows the rules in the circular.",
        ],
      },
    ],
  },

  "rocket-calculator": {
    bn: [
      {
        h: "Rocket ক্যাশ আউট চার্জের হিসাব",
        p: [
          "এই ক্যালকুলেটরে Rocket এজেন্ট ক্যাশ আউট প্রতি ১০০০ টাকায় ১৮ টাকা (১.৮%) এবং ডাচ-বাংলা ব্যাংকের এটিএমে ১০ টাকা (১%) ধরা হয়েছে (শেষ দেখা অক্টোবর ২০২৬)। যেমন এজেন্টে ৫০০০ টাকা তুললে চার্জ ৯০ টাকা, আর মোট কাটবে ৫০৯০ টাকা।",
          "টাকার পরিমাণ লিখলেই চার্জ ও মোট কত টাকা লাগবে, তা সঙ্গে সঙ্গে দেখা যায়। পেজের নিচের টেবিলে ৫০০ থেকে ২০,০০০ টাকা পর্যন্ত চার্জ একসঙ্গে দেওয়া আছে।",
          "ডাচ-বাংলা ব্যাংকের নিজস্ব এটিএমে চার্জ সাধারণত কম, কারণ Rocket ওই ব্যাংকেরই সেবা। টাকা তোলার আগে কোথায় তুললে কত লাগবে, তা মিলিয়ে দেখলে কিছু টাকা বাঁচতে পারে।",
        ],
      },
      {
        h: "ব্যালেন্সে যত টাকা আছে, তার কতটা তোলা যাবে",
        p: [
          "চার্জ আপনার ব্যালেন্স থেকেই কাটে, তাই ব্যালেন্সের পুরোটা তোলা যায় না। যেমন ৫০০০ টাকা ব্যালেন্স থাকলে এজেন্ট রেটে ৪৯১১ টাকা তোলা যায়, চার্জ লাগে প্রায় ৮৮.৪ টাকা। ডাচ-বাংলা এটিএমে তোলা যায় ৪৯৫০ টাকা।",
          "এটি জানতে ক্যালকুলেটরের দ্বিতীয় ট্যাব \"ব্যালেন্স থেকে কত তোলা যাবে\" খুলে নিজের ব্যালেন্স লিখুন।",
        ],
      },
      {
        h: "রেট না মিললে কী করবেন",
        p: [
          "বিভিন্ন সূত্রে Rocket এর এজেন্ট চার্জ ১.৬৭% থেকে ১.৮% পর্যন্ত লেখা আছে। আপনার রেট আলাদা হলে \"নিজে রেট দিন\" বেছে প্রতি ১০০০ টাকায় সেটি লিখুন। অ্যাপে দেখানো চার্জকেই চূড়ান্ত ধরুন।",
        ],
      },
    ],
    en: [
      {
        h: "Working out the Rocket cash out charge",
        p: [
          "This calculator uses 18 taka per 1,000 (1.8%) for Rocket agent cash out and 10 taka (1%) at Dutch-Bangla Bank ATMs (last checked October 2026). For example, taking out 5,000 taka from an agent costs 90 taka and 5,090 taka is deducted in total.",
          "Type the amount and you immediately see the charge and the total needed. The table below the calculator lists the charge for 500 up to 20,000 taka.",
          "Charges at Dutch-Bangla Bank's own ATMs are usually lower because Rocket is that bank's service. Comparing the options before you withdraw can save you a little money.",
        ],
      },
      {
        h: "How much can you cash out from your balance",
        p: [
          "The charge comes out of the same balance, so you cannot cash out all of it. For example, with 5,000 taka in your account at the agent rate you can cash out 4,911 taka, and the charge is about 88.4 taka. At a Dutch-Bangla ATM you can cash out 4,950 taka.",
          "To find this, open the second tab, \"Cash out from my balance\", and enter your balance.",
        ],
      },
      {
        h: "What to do if the rate does not match",
        p: [
          "Public sources list the Rocket agent charge anywhere from 1.67% to 1.8%. If your rate is different, choose \"Enter my own rate\" and type it per 1,000 taka. Always treat the charge shown in the Rocket app as final.",
        ],
      },
    ],
  },

  "upay-calculator": {
    bn: [
      {
        h: "Upay ক্যাশ আউট চার্জের হিসাব",
        p: [
          "এই ক্যালকুলেটরে Upay এজেন্ট ক্যাশ আউট প্রতি ১০০০ টাকায় ১৪ টাকা (১.৪%) এবং ইউসিবি ব্যাংকের এটিএমে ৮ টাকা (০.৮%) ধরা হয়েছে (শেষ দেখা অক্টোবর ২০২৬)। যেমন এজেন্টে ৩০০০ টাকা তুললে চার্জ ৪২ টাকা এবং ৫০০০ টাকায় ৭০ টাকা, আর মোট কাটবে ৫০৭০ টাকা।",
          "টাকার পরিমাণ লিখলেই চার্জ ও মোট কত টাকা লাগবে, তা সঙ্গে সঙ্গে দেখা যায়। পেজের নিচের টেবিলে ৫০০ থেকে ২০,০০০ টাকা পর্যন্ত চার্জ একসঙ্গে দেওয়া আছে।",
          "Upay ইউসিবি ব্যাংকের সেবা, তাই ইউসিবি এটিএম থেকে টাকা তুললে সাধারণত চার্জ কম লাগে।",
        ],
      },
      {
        h: "ব্যালেন্সে যত টাকা আছে, তার কতটা তোলা যাবে",
        p: [
          "চার্জ আপনার ব্যালেন্স থেকেই কাটে, তাই ব্যালেন্সের পুরোটা তোলা যায় না। যেমন ৫০০০ টাকা ব্যালেন্স থাকলে এজেন্ট রেটে ৪৯৩০ টাকা তোলা যায়, চার্জ লাগে প্রায় ৬৯ টাকা। ইউসিবি এটিএমে তোলা যায় ৪৯৬০ টাকা।",
          "এটি জানতে ক্যালকুলেটরের দ্বিতীয় ট্যাব \"ব্যালেন্স থেকে কত তোলা যাবে\" খুলে নিজের ব্যালেন্স লিখুন।",
        ],
      },
      {
        h: "অ্যাপে মিলিয়ে নিন",
        p: [
          "Upay এর চার্জ সম্পর্কে আমরা সীমিত সূত্র পেয়েছি, তাই টাকা তোলার আগে Upay অ্যাপে দেখানো চার্জ যাচাই করুন। রেট আলাদা হলে \"নিজে রেট দিন\" বেছে প্রতি ১০০০ টাকায় আপনার রেট লিখুন।",
        ],
      },
    ],
    en: [
      {
        h: "Working out the Upay cash out charge",
        p: [
          "This calculator uses 14 taka per 1,000 (1.4%) for Upay agent cash out and 8 taka (0.8%) at UCB Bank ATMs (last checked October 2026). For example, taking out 3,000 taka from an agent costs 42 taka and 5,000 taka costs 70 taka, so 5,070 taka is deducted in total.",
          "Type the amount and you immediately see the charge and the total needed. The table below the calculator lists the charge for 500 up to 20,000 taka.",
          "Upay is a UCB Bank service, so withdrawing from a UCB ATM usually costs less.",
        ],
      },
      {
        h: "How much can you cash out from your balance",
        p: [
          "The charge comes out of the same balance, so you cannot cash out all of it. For example, with 5,000 taka in your account at the agent rate you can cash out 4,930 taka, and the charge is about 69 taka. At a UCB ATM you can cash out 4,960 taka.",
          "To find this, open the second tab, \"Cash out from my balance\", and enter your balance.",
        ],
      },
      {
        h: "Confirm in the app",
        p: [
          "We found only limited sources for Upay charges, so check the charge shown in the Upay app before you withdraw. If your rate is different, choose \"Enter my own rate\" and type your rate per 1,000 taka.",
        ],
      },
    ],
  },

  "image-to-pdf": {
    bn: [
      {
        h: "ছবি থেকে PDF কীভাবে বানাবেন",
        p: [
          "এক বা একাধিক ছবি সিলেক্ট করুন, তীর বাটন দিয়ে ক্রম ঠিক করুন, তারপর PDF বানান চাপুন। প্রতিটি ছবি একটি আলাদা পেজ হয়। একসাথে সর্বোচ্চ ৫০টি ছবি দেওয়া যায়।",
          "পেজের মাপ দুই রকম বেছে নেওয়া যায়। A4 বেছে নিলে ছবি A4 পেজের মাঝখানে বসে, ছবি আড়াআড়ি হলে পেজও আড়াআড়ি হয়। ছবির মাপে বেছে নিলে পেজ ঠিক ছবির সমান হয়।",
        ],
      },
      {
        h: "কখন কাজে লাগে",
        p: [
          "চাকরি বা ভর্তির আবেদনে সার্টিফিকেট, NID বা পাসপোর্টের ছবি এক PDF ফাইলে জমা দিতে বলা হয়। স্ক্যান করা পৃষ্ঠা বা ফোনের ছবি একসাথে করে পাঠানোর জন্যও এটি কাজে লাগে।",
          "আপনার ছবি কোথাও আপলোড হয় না, সব কাজ আপনার ফোন বা ব্রাউজারেই হয়। ফাইলের সাইজে সীমা থাকলে আগে Image Compressor দিয়ে ছবি ছোট করে নিন।",
        ],
      },
    ],
    en: [
      {
        h: "How to make a PDF from images",
        p: [
          "Select one or more images, set the order with the arrow buttons, then tap Create PDF. Each image becomes its own page, and you can add up to 50 images at once.",
          "You can choose between two page sizes. With A4, the image is centred on an A4 page, and a wide image gets a landscape page. With fit to image, the page is exactly the size of the image.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "Job and admission applications often ask for certificates, an NID or a passport photo in a single PDF file. It is also handy for sending scanned pages or phone photos together.",
          "Your images are not uploaded anywhere, everything happens on your phone or browser. If there is a file size limit, shrink the images first with the Image Compressor.",
        ],
      },
    ],
  },

  "merge-pdf": {
    bn: [
      {
        h: "একাধিক PDF কীভাবে জোড়া দেবেন",
        p: [
          "দুই বা তার বেশি PDF সিলেক্ট করুন, তীর বাটন দিয়ে ক্রম ঠিক করুন, তারপর PDF জোড়া দিন চাপুন। উপরের ফাইলের পেজ আগে বসে। একসাথে সর্বোচ্চ ২০টি ফাইল জোড়া যায়, প্রতিটি সর্বোচ্চ ৫০ MB।",
          "জোড়া লাগানো PDF এর সাইজ মোটামুটি সব ফাইলের সাইজের যোগফলের কাছাকাছি হয়। সাইজ বেশি হলে পরে কম্প্রেস করে নিতে পারেন।",
        ],
      },
      {
        h: "যা মনে রাখবেন",
        p: [
          "পাসওয়ার্ড দেওয়া বা নষ্ট PDF খোলা যায় না। এমন ফাইল থাকলে টুল কোন ফাইলে সমস্যা তা জানিয়ে দেবে, সেটি বাদ দিয়ে আবার চেষ্টা করুন।",
          "আপনার ফাইল কোথাও আপলোড হয় না, সব কাজ আপনার ফোন বা ব্রাউজারেই হয়। তাই গোপন কাগজপত্রও নিশ্চিন্তে জোড়া দিতে পারবেন।",
        ],
      },
    ],
    en: [
      {
        h: "How to combine several PDFs",
        p: [
          "Select two or more PDFs, set the order with the arrow buttons, then tap Merge PDFs. Pages of the top file come first. You can merge up to 20 files at once, each up to 50 MB.",
          "The merged PDF is roughly the sum of all the file sizes. If it is too big, you can compress it afterwards.",
        ],
      },
      {
        h: "Good to know",
        p: [
          "Password protected or damaged PDFs cannot be opened. If one is in the list, the tool tells you which file has the problem so you can remove it and try again.",
          "Your files are not uploaded anywhere, everything happens on your phone or browser, so you can merge private documents with confidence.",
        ],
      },
    ],
  },

  "password-generator": {
    bn: [
      {
        h: "কীভাবে শক্তিশালী পাসওয়ার্ড বানাবেন",
        p: [
          "পাসওয়ার্ডের দৈর্ঘ্য ঠিক করুন এবং কোন ধরনের অক্ষর থাকবে তা বেছে নিন। টুলটি আপনার ব্রাউজারেই এলোমেলো পাসওয়ার্ড তৈরি করে, কোথাও পাঠায় না বা সংরক্ষণ করে না।",
          "সাধারণভাবে অন্তত ১২ থেকে ১৬ অক্ষরের পাসওয়ার্ড ভালো, যেখানে বড় হাতের ও ছোট হাতের অক্ষর, সংখ্যা এবং চিহ্ন মেশানো থাকে।",
        ],
      },
      {
        h: "কোথায় কাজে লাগে",
        p: [
          "ইমেইল, ফেসবুক, ব্যাংক বা মোবাইল ব্যাংকিং অ্যাকাউন্টের জন্য নতুন পাসওয়ার্ড দরকার হলে এটি কাজে লাগে। প্রতিটি অ্যাকাউন্টে আলাদা পাসওয়ার্ড ব্যবহার করা নিরাপদ।",
          "তৈরি করার পর কপি করে নিরাপদ জায়গায় রাখুন। পেজ বন্ধ করলে পাসওয়ার্ড আর দেখা যাবে না।",
        ],
      },
    ],
    en: [
      {
        h: "How to make a strong password",
        p: [
          "Set the length and choose which kinds of characters to include. The tool creates a random password in your browser and does not send or store it anywhere.",
          "In general, a password of at least 12 to 16 characters that mixes upper and lower case letters, numbers and symbols is a good choice.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "Use it whenever you need a new password for email, Facebook, a bank or a mobile banking account. Using a different password for each account is safer.",
          "Copy it after generating and keep it somewhere safe. Once you close the page the password cannot be shown again.",
        ],
      },
    ],
  },

  "case-converter": {
    bn: [
      {
        h: "কেসের ধরন",
        p: [
          "লেখা পেস্ট করে পছন্দের ফরম্যাটে ক্লিক করুন। UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case ও kebab-case বেছে নেওয়া যায়।",
          "বাংলা লিপিতে বড় বা ছোট হাতের অক্ষর নেই, তাই বাংলা লেখা অপরিবর্তিত থাকে। শুধু ইংরেজি লেখা বদলায়।",
        ],
      },
      {
        h: "কোথায় কাজে লাগে",
        p: [
          "ভুলে CAPS LOCK চালু রেখে লেখা টেক্সট ঠিক করতে, শিরোনাম সাজাতে বা প্রোগ্রামিংয়ের নামকরণে (camelCase, snake_case) এটি কাজে লাগে।",
          "Sentence case-এ প্রতিটি বাক্যের প্রথম অক্ষর বড় হয় এবং বাকি অক্ষর ছোট হয়।",
        ],
      },
    ],
    en: [
      {
        h: "Available cases",
        p: [
          "Paste your text and click the format you want. You can choose UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case and kebab-case.",
          "Bangla script has no upper or lower case, so Bangla text stays unchanged. Only English text is converted.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "It helps fix text typed with Caps Lock on by mistake, tidy up headings, or name things in code (camelCase, snake_case).",
          "In Sentence case the first letter of each sentence is capital and the rest is lowercase.",
        ],
      },
    ],
  },

  "unit-converter": {
    bn: [
      {
        h: "কীভাবে ব্যবহার করবেন",
        p: [
          "দৈর্ঘ্য, ওজন, তাপমাত্রা, ক্ষেত্রফল, আয়তন, গতি ও ডেটা সাইজের মধ্যে একটি ক্যাটাগরি বেছে নিন, মান লিখুন এবং কোন একক থেকে কোন এককে বদলাবেন তা ঠিক করুন। সোয়াপ বাটনে একক উল্টে নেওয়া যায়।",
          "কিছু মূল সম্পর্ক: ১ ইঞ্চি = ২.৫৪ সেমি। তাপমাত্রায় °F = °C × ৯/৫ + ৩২। এই টুলে ১ KB = ১,০২৪ বাইট ধরা হয়।",
        ],
      },
      {
        h: "কোথায় কাজে লাগে",
        p: [
          "পড়াশোনার হিসাব, রান্নার মাপ, ঘর বা জিনিসের মাপ এবং ফাইলের সাইজ বোঝার জন্য এটি কাজে লাগে। জমির শতাংশ বা কাঠার জন্য আমাদের জমি পরিমাপ ক্যালকুলেটর ব্যবহার করুন।",
          "সব হিসাব আপনার ফোন বা ব্রাউজারেই হয়।",
        ],
      },
    ],
    en: [
      {
        h: "How to use it",
        p: [
          "Pick a category such as length, weight, temperature, area, volume, speed or data size, enter a value, and choose the units to convert from and to. The swap button reverses the units.",
          "A few key relations: 1 inch = 2.54 cm. For temperature, °F = °C × 9/5 + 32. This tool uses 1 KB = 1,024 bytes.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "It helps with study problems, cooking measures, sizes of rooms or items, and understanding file sizes. For shotangsho or katha, use our land calculator.",
          "All calculations happen on your phone or in your browser.",
        ],
      },
    ],
  },

  "bill-calculator": {
    bn: [
      {
        h: "কীভাবে বিল ভাগ করবেন",
        p: [
          "মোট বিল ও কতজন তা লিখুন। চাইলে VAT বা সার্ভিস চার্জ এবং টিপের শতকরা হার দিন। টুলটি প্রতিজনের ভাগ দেখিয়ে দেয়।",
          "VAT ও টিপ দুটোই মূল বিলের শতকরা হিসেবে ধরে মূল বিলের সঙ্গে যোগ হয়। প্রতিজনের টাকা দশমিকের পর দুই ঘর পর্যন্ত দেখানো হয়, প্রয়োজনে নিজের মতো রাউন্ড করে নিন।",
        ],
      },
      {
        h: "কোথায় কাজে লাগে",
        p: [
          "বন্ধুদের সঙ্গে রেস্টুরেন্টে খাওয়ার পর, ঘুরতে গিয়ে বা মেসের খরচ ভাগ করতে এটি কাজে লাগে।",
          "রেস্টুরেন্ট আসলে কত VAT বা চার্জ নেয় তা বিলে দেখে নিয়ে সেই হার দিন।",
        ],
      },
    ],
    en: [
      {
        h: "How to split a bill",
        p: [
          "Enter the total bill and the number of people. If you like, add the VAT or service charge percentage and the tip percentage. The tool shows each person's share.",
          "VAT and tip are both calculated as a percentage of the original bill and added to it. Per-person amounts are shown to two decimal places, so round them however you like.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "It helps after a restaurant meal with friends, on a trip, or when sharing mess or hostel costs.",
          "Check the actual VAT or charge on your bill and enter that rate.",
        ],
      },
    ],
  },

  "date-difference-calculator": {
    bn: [
      {
        h: "দুটি মোড",
        p: [
          "Difference মোডে দুটি তারিখ দিলে মাঝের সময় বছর, মাস, দিন এবং মোট দিনে দেখা যায়। Add/Subtract মোডে কোনো তারিখের সঙ্গে দিন, মাস বা বছর যোগ-বিয়োগ করা যায়।",
          "প্রথমে শুরুর তারিখ থেকে পূর্ণ মাস গোনা হয়, বাকি দিন আলাদা দেখানো হয়। শুরুর তারিখ পরে হলে টুলটি নিজেই তারিখ দুটি অদলবদল করে নেয়।",
        ],
      },
      {
        h: "কোথায় কাজে লাগে",
        p: [
          "চুক্তির মেয়াদ, ছুটির দিন গোনা, পরীক্ষা বা কোনো ঘটনা কত দিন বাকি, বা কোনো কাজ শেষ হওয়ার তারিখ বের করতে এটি কাজে লাগে।",
          "৩১ তারিখ থেকে মাস যোগ করলে ছোট মাসের শেষ দিনে গিয়ে থামে।",
        ],
      },
    ],
    en: [
      {
        h: "Two modes",
        p: [
          "In Difference mode, enter two dates to see the time between them in years, months, days and total days. In Add/Subtract mode you can add or subtract days, months or years from a date.",
          "Whole months from the start date are counted first and the remaining days are shown separately. If the start date is later, the tool swaps the two dates automatically.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "It helps with contract periods, counting holidays, how many days are left to an exam or event, and working out a deadline.",
          "When you add months starting from the 31st, the result stops at the last day of shorter months.",
        ],
      },
    ],
  },

  "scientific-calculator": {
    bn: [
      {
        h: "এই ক্যালকুলেটরে কী আছে",
        p: [
          "এটি আটটি মোডের একটি পূর্ণাঙ্গ অনলাইন সায়েন্টিফিক ক্যালকুলেটর। বাটনের বিন্যাস Casio fx-991 ধাঁচের, তাই হাতের ক্যালকুলেটরে অভ্যস্ত শিক্ষার্থীরা সহজেই চালাতে পারবেন। এটি Casio এর কোনো পণ্য নয়।",
          "পর্দায় একটি এক্সপ্রেশন লাইন ও একটি ফলাফল লাইন থাকে। লেখার সময় ফলের পূর্বরূপ দেখা যায়, কিবোর্ডে সরাসরি টাইপ করা যায়, আর শেষ ৩০টি হিসাব History তে থাকে।",
        ],
        table: { head: ["মোড", "কী করে"], rows: [
          ["COMP", "সাধারণ হিসাব, ত্রিকোণমিতি, লগ, ঘাত, ফ্যাক্টোরিয়াল, nCr, nPr, ∫, d/dx, Σ"],
          ["CMPLX", "জটিল সংখ্যার যোগ, গুণ, ভাগ, মডুলাস, আর্গুমেন্ট ও পোলার রূপ"],
          ["EQN", "দ্বিঘাত, ত্রিঘাত এবং ২ বা ৩ অজ্ঞাতের একঘাত সমীকরণ"],
          ["MATRIX", "২×২ ও ৩×৩ ম্যাট্রিক্সের যোগ, গুণ, ডিটারমিন্যান্ট, বিপরীত ও ট্রান্সপোজ"],
          ["VECTOR", "২D ও ৩D ভেক্টরের ডট ও ক্রস গুণফল, মান, একক ভেক্টর ও কোণ"],
          ["STAT", "গড়, মান বিচ্যুতি, কোয়ার্টাইল এবং ৬ ধরনের রিগ্রেশন"],
          ["BASE-N", "BIN, OCT, DEC ও HEX রূপান্তর এবং AND, OR, XOR, NOT"],
          ["TABLE", "f(x) এর মান নির্দিষ্ট ধাপে তালিকা আকারে"],
        ] },
      },
      {
        h: "ধাপে ধাপে ব্যবহার ও উদাহরণ",
        p: [
          "বাটন চেপে বা কিবোর্ডে হিসাব লিখে = বা Enter চাপুন। আগের ফলে ফিরতে Ans ব্যবহার করুন। = চাপার পর সরাসরি +, −, × বা ÷ চাপলে আগের ফলের সঙ্গে হিসাব চলতে থাকে। নিচের উদাহরণগুলো নিজে লিখে মিলিয়ে নিতে পারেন।",
        ],
        list: [
          "√144 = ১২",
          "৫! = ১২০",
          "২^১০ = ১০২৪",
          "log(১০০০) = ৩",
          "Deg মোডে sin(৩০) = ০.৫",
          "1÷2+1÷3 = ৫/৬",
          "nCr(৫, ২) = ১০ এবং nPr(৫, ২) = ২০",
          "∫(x^2, 0, 3) = ৯",
          "d/dx(x^3, 2) = ১২",
          "Σ(x, 1, 100) = ৫০৫০",
        ],
      },
      {
        h: "ভগ্নাংশ ও সঠিক উত্তর",
        p: [
          "পূর্ণসংখ্যা ও ভগ্নাংশ দিয়ে হিসাব করলে উত্তর সঠিক ভগ্নাংশে আসে, তাই 1÷3 লিখলে ০.৩৩৩৩ নয়, ১/৩ দেখায়। S⇔D বাটনে দশমিক ও ভগ্নাংশ বদলানো যায়, আর a b/c বাটনে ৭/৩ কে ২ ১/৩ আকারে দেখা যায়।",
          "ভগ্নাংশ যথেষ্ট বড় হয়ে গেলে ক্যালকুলেটর আপনাআপনি দশমিকে চলে যায়। ফলাফল ১০ অঙ্ক পর্যন্ত দেখানো হয় এবং খুব বড় বা ছোট সংখ্যা ×১০ এর ঘাত আকারে আসে।",
        ],
      },
      {
        h: "Deg, Rad ও Gra",
        p: [
          "ত্রিকোণমিতির উত্তর কোণের একক নির্ভর। ৩৬০ ডিগ্রি = ২π রেডিয়ান = ৪০০ গ্রেড। Deg মোডে sin(৯০) = ১, কিন্তু Rad মোডে sin(π/২) = ১ হয়। sin(১৮০) এর মতো মান এখানে ঠিক ০ আসে, ০.০০০০০০০১২ এর মতো ভুল অবশিষ্ট দেখায় না।",
          "tan(৯০°) এর মান নেই, তাই এমন ক্ষেত্রে ক্যালকুলেটর ত্রুটি দেখায়। sin⁻¹ ও cos⁻¹ এ মান -১ থেকে ১ এর মধ্যে হতে হবে।",
        ],
      },
      {
        h: "ক্যালকুলাস: ইন্টিগ্রাল, অন্তরক ও যোগফল",
        p: [
          "∫(f, নিম্নসীমা, উচ্চসীমা) সংখ্যাগত পদ্ধতিতে (Simpson's rule) নির্দিষ্ট সমাকলন বের করে। d/dx(f, x₀) নির্দিষ্ট বিন্দুতে অন্তরক সহগ দেয়। Σ(f, শুরু, শেষ) পূর্ণসংখ্যা সীমায় যোগফল দেয়। তিনটির ভেতরেই চলক হিসেবে x ব্যবহার হয়।",
          "এগুলো সংখ্যাগত ফল, প্রতীকী সমাধান নয়। তাই ∫ এর উত্তর ১০ অঙ্কের মধ্যে ঠিক থাকে, কিন্তু যে ফাংশন সীমার ভেতরে অসীম হয়ে যায় তার জন্য ফল নির্ভরযোগ্য নয়।",
        ],
      },
      {
        h: "সমীকরণ, ম্যাট্রিক্স ও ভেক্টর",
        p: [
          "EQN মোডে সহগে ভগ্নাংশ বা মূল লিখলে (যেমন 1/2, √2) হিসাব সঠিক ভগ্নাংশে হয়, যেমন 2x² + x − 1 = 0 এর মূল ১/২ ও −১। বাস্তব মূল না থাকলে জটিল মূল দেখায়। ত্রিঘাত সমীকরণের মূল সংখ্যাগত পদ্ধতিতে বের হয়।",
          "MATRIX মোডে ডিটারমিন্যান্ট শূন্য হলে বিপরীত ম্যাট্রিক্স নেই বলে জানায়। VECTOR মোডে ক্রস গুণফল শুধু ৩D ভেক্টরে চলে, আর কোণ আপনার বাছা একক (Deg, Rad বা Gra) এ আসে।",
        ],
      },
      {
        h: "পরিসংখ্যান ও রিগ্রেশন",
        p: [
          "১ চলকে প্রতি লাইনে একটি সংখ্যা লিখুন। সঙ্গে কমা দিয়ে ফ্রিকোয়েন্সি দেওয়া যায়, যেমন ১৫, ৩। ফলে n, Σx, Σx², গড়, জনসংখ্যার (σ) ও নমুনার (s) মান বিচ্যুতি, ভেদাঙ্ক, ন্যূনতম, Q1, মধ্যমা, Q3 ও সর্বোচ্চ আসে। Q1 ও Q3 হলো নিচের ও ওপরের অর্ধেকের মধ্যমা।",
          "২ চলকে x, y জোড়া দিয়ে Linear, Quadratic, Log, Exponential, Power বা Inverse রিগ্রেশন বেছে a, b, (c) ও সহগ r পাবেন, সঙ্গে যেকোনো x এর জন্য ŷ এর আন্দাজ।",
        ],
      },
      {
        h: "বেস-N ও বিট অপারেশন",
        p: [
          "BASE-N মোডে সংখ্যা DEC, HEX, BIN বা OCT যেকোনোটিতে লিখুন। ফল একসঙ্গে চারটি বেসেই দেখায়। হিসাব ৩২-বিট পূর্ণসংখ্যায় হয় এবং ঋণাত্মক সংখ্যা BIN, OCT ও HEX এ দুইয়ের পরিপূরক আকারে আসে, যেমন DEC এ −১ হলো HEX এ FFFFFFFF।",
          "যোগ, বিয়োগ, গুণ, ভাগের পাশাপাশি AND, OR, XOR, XNOR, NOT ও NEG চলে। ফল ৩২-বিটের সীমার বাইরে গেলে ত্রুটি দেখায়।",
        ],
      },
      {
        h: "সাধারণ ভুল ও সীমাবদ্ধতা",
        p: [
          "ভুল উত্তর এলে আগে Deg/Rad মোড, তারপর বন্ধনীর মিল দেখুন। শেষে বন্ধনী ছেড়ে দিলে ক্যালকুলেটর নিজে বন্ধ করে নেয়, তবে মাঝখানে খোলা বন্ধনী থাকলে হিসাব ভুল হতে পারে।",
        ],
        list: [
          "পরীক্ষার হলে অনলাইন ক্যালকুলেটর সাধারণত অনুমোদিত নয়। বোর্ডের নিয়ম দেখুন।",
          "পাঠ্যবইয়ের মতো ওপর-নিচ ভগ্নাংশ লেখা যায় না, ÷ ব্যবহার করুন।",
          "প্রতীকী বীজগণিত (যেমন x² এর সমাকলন ফাংশন আকারে) এখানে নেই, শুধু সংখ্যাগত ফল।",
          "সব ফলাফল ১০ অঙ্ক পর্যন্ত দেখানো হয়।",
        ],
      },
    ],
    en: [
      {
        h: "What is in this calculator",
        p: [
          "This is a full online scientific calculator with eight modes. The key layout follows the Casio fx-991 style, so students used to a handheld calculator can start straight away. It is not a Casio product.",
          "The screen has an expression line and a result line. A preview of the result shows as you type, you can type directly on the keyboard, and your last 30 calculations stay in History.",
        ],
        table: { head: ["Mode", "What it does"], rows: [
          ["COMP", "Everyday maths, trigonometry, logs, powers, factorial, nCr, nPr, ∫, d/dx, Σ"],
          ["CMPLX", "Add, multiply and divide complex numbers; modulus, argument and polar form"],
          ["EQN", "Quadratic, cubic and linear equations in 2 or 3 unknowns"],
          ["MATRIX", "Add, multiply, determinant, inverse and transpose for 2×2 and 3×3 matrices"],
          ["VECTOR", "Dot and cross product, magnitude, unit vector and angle for 2D and 3D vectors"],
          ["STAT", "Mean, standard deviation, quartiles and 6 regression types"],
          ["BASE-N", "BIN, OCT, DEC and HEX conversion plus AND, OR, XOR, NOT"],
          ["TABLE", "Values of f(x) at fixed steps as a table"],
        ] },
      },
      {
        h: "Step by step, with examples",
        p: [
          "Press the buttons or type on the keyboard, then press = or Enter. Use Ans to bring back the previous result. After pressing =, pressing +, −, × or ÷ straight away carries on from the previous result. You can type the examples below to check them yourself.",
        ],
        list: [
          "√144 = 12",
          "5! = 120",
          "2^10 = 1,024",
          "log(1000) = 3",
          "In Deg mode sin(30) = 0.5",
          "1÷2+1÷3 = 5/6",
          "nCr(5, 2) = 10 and nPr(5, 2) = 20",
          "∫(x^2, 0, 3) = 9",
          "d/dx(x^3, 2) = 12",
          "Σ(x, 1, 100) = 5050",
        ],
      },
      {
        h: "Fractions and exact answers",
        p: [
          "When you calculate with whole numbers and fractions the answer is an exact fraction, so 1÷3 shows 1/3, not 0.3333. S⇔D switches between decimal and fraction, and a b/c shows 7/3 as 2 1/3.",
          "If a fraction grows too large the calculator moves to decimals by itself. Results show up to 10 digits, and very large or very small numbers appear as a power of 10.",
        ],
      },
      {
        h: "Deg, Rad and Gra",
        p: [
          "Trigonometric answers depend on the angle unit. 360 degrees = 2π radians = 400 gradians. In Deg mode sin(90) = 1, and in Rad mode sin(π/2) = 1. Values such as sin(180) come out as exactly 0, without a tiny leftover like 0.00000000012.",
          "tan(90°) is undefined, so the calculator shows an error there. For sin⁻¹ and cos⁻¹ the value must be between -1 and 1.",
        ],
      },
      {
        h: "Calculus: integral, derivative and sum",
        p: [
          "∫(f, lower, upper) finds a definite integral numerically (Simpson's rule). d/dx(f, x₀) gives the derivative at a point. Σ(f, start, end) adds terms between whole-number limits. All three use x as the variable.",
          "These are numerical results, not symbolic answers. An integral is accurate to about 10 digits, but a function that blows up inside the limits will not give a reliable result.",
        ],
      },
      {
        h: "Equations, matrices and vectors",
        p: [
          "In EQN mode, coefficients such as 1/2 or √2 are handled exactly where possible, so 2x² + x − 1 = 0 gives 1/2 and −1. If there are no real roots, complex roots are shown. Cubic roots are found numerically.",
          "In MATRIX mode, a zero determinant means the inverse does not exist. In VECTOR mode the cross product works only for 3D vectors, and the angle comes in the unit you chose (Deg, Rad or Gra).",
        ],
      },
      {
        h: "Statistics and regression",
        p: [
          "For one variable, enter one number per line. You can add a frequency after a comma, such as 15, 3. You get n, Σx, Σx², mean, population (σ) and sample (s) standard deviation, variance, minimum, Q1, median, Q3 and maximum. Q1 and Q3 are the medians of the lower and upper halves.",
          "For two variables, enter x, y pairs, choose Linear, Quadratic, Log, Exponential, Power or Inverse regression, and read a, b, (c) and the coefficient r, plus an estimate of ŷ for any x.",
        ],
      },
      {
        h: "Base-N and bitwise operations",
        p: [
          "In BASE-N mode, enter a number in DEC, HEX, BIN or OCT. The result shows in all four bases at once. Calculations use 32-bit whole numbers, and negative values appear in two's complement in BIN, OCT and HEX, so −1 in DEC is FFFFFFFF in HEX.",
          "Add, subtract, multiply and divide work, as do AND, OR, XOR, XNOR, NOT and NEG. A result outside the 32-bit range shows an error.",
        ],
      },
      {
        h: "Common mistakes and limits",
        p: [
          "If an answer looks wrong, check the Deg/Rad mode first, then the brackets. A missing bracket at the very end is closed for you, but an open bracket in the middle can change the result.",
        ],
        list: [
          "Online calculators are usually not allowed in exam halls. Check your board's rules.",
          "You cannot enter stacked textbook fractions. Use ÷ instead.",
          "There is no symbolic algebra (such as the integral of x² as a function), only numerical results.",
          "Results are shown to 10 digits.",
        ],
      },
    ],
  },

  "character-counter": {
    bn: [
      {
        h: "কীভাবে ব্যবহার করবেন",
        p: [
          "লেখা টাইপ বা পেস্ট করলে স্পেসসহ ও স্পেস ছাড়া অক্ষর সংখ্যা সঙ্গে সঙ্গে দেখা যায়। SMS, X (টুইটার), SEO টাইটেল ও ডেসক্রিপশনের মতো সীমা বেছে নিলে আর কত অক্ষর বাকি তা দেখায়।",
          "একটি ইংরেজি (GSM) SMS-এ ১৬০ অক্ষর যায়। বাংলা বা ইউনিকোড SMS-এ প্রতি অংশে ৭০ অক্ষর। এর বেশি হলে একাধিক SMS হিসেবে যায়।",
        ],
      },
      {
        h: "কোথায় কাজে লাগে",
        p: [
          "SEO টাইটেল সাধারণত ৫০ থেকে ৬০ অক্ষরের মধ্যে রাখা ভালো। গুগল পিক্সেল প্রস্থ ধরে কাটে, তাই এটি আনুমানিক সীমা।",
          "বায়ো, আবেদনের ঘর বা বিজ্ঞাপনের লেখা কোনো সীমার মধ্যে রাখতে এটি কাজে লাগে।",
        ],
      },
    ],
    en: [
      {
        h: "How to use it",
        p: [
          "Type or paste your text and see the character count with and without spaces right away. Pick a limit such as SMS, X, SEO title or description to see how many characters remain.",
          "A single English (GSM) SMS holds 160 characters. A Bangla or Unicode SMS holds 70 per part. Longer messages are sent as several SMS.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "An SEO title is best kept around 50 to 60 characters. Google truncates by pixel width, so this limit is approximate.",
          "It also helps keep a bio, a form field or an ad text within a limit.",
        ],
      },
    ],
  },

  "color-picker": {
    bn: [
      {
        h: "কীভাবে ব্যবহার করবেন",
        p: [
          "একটি রং বেছে নিন বা HEX কোড লিখুন, তাহলে HEX, RGB ও HSL মান দেখা যাবে এবং এক ট্যাপে কপি করা যাবে। ৩ অঙ্কের HEX কোডও চলে, যেমন #FFF মানে #FFFFFF।",
          "এগুলো একই রং লেখার তিনটি উপায়। HEX ও RGB লাল, সবুজ ও নীল মিশিয়ে রং বানায়, আর HSL ব্যবহার করে হিউ, স্যাচুরেশন ও লাইটনেস।",
        ],
      },
      {
        h: "কোথায় কাজে লাগে",
        p: [
          "ওয়েবসাইট, ডিজাইন, ছবি বা প্রেজেন্টেশনের রংয়ের কোড বের করতে এটি কাজে লাগে।",
          "ডিজাইনার ও ডেভেলপারের মধ্যে রং ঠিকঠাক বোঝানোর জন্য কোড কপি করে পাঠানো সুবিধাজনক।",
        ],
      },
    ],
    en: [
      {
        h: "How to use it",
        p: [
          "Pick a colour or type a HEX code to see the HEX, RGB and HSL values and copy them in one tap. 3-digit HEX codes work too, for example #FFF means #FFFFFF.",
          "These are three ways to write the same colour. HEX and RGB mix red, green and blue, while HSL uses hue, saturation and lightness.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "It helps you find colour codes for websites, designs, images or presentations.",
          "Copying the code is handy for telling a designer or developer exactly which colour you mean.",
        ],
      },
    ],
  },

  "lorem-ipsum-generator": {
    bn: [
      {
        h: "Lorem Ipsum কী",
        p: [
          "Lorem Ipsum হলো ডিজাইনে ব্যবহৃত নমুনা লেখা, যা দিয়ে বোঝা যায় আসল লেখা বসলে লেআউট কেমন দেখাবে। এর কোনো অর্থ নেই, এটি শুধু লেখার আকার ও জায়গা দেখানোর জন্য।",
          "অনুচ্ছেদ, বাক্য বা শব্দ বেছে নিন, কতটা লাগবে লিখুন এবং কপি করে নিন।",
        ],
      },
      {
        h: "কোথায় কাজে লাগে",
        p: [
          "ওয়েবসাইট বা অ্যাপের ডিজাইন, ব্লগ টেমপ্লেট ও প্রেজেন্টেশনে আসল লেখা তৈরির আগে জায়গা ভরাতে এটি কাজে লাগে।",
          "সাইট চালু করার আগে নমুনা লেখা সরিয়ে আসল লেখা বসাতে ভুলবেন না।",
        ],
      },
    ],
    en: [
      {
        h: "What Lorem Ipsum is",
        p: [
          "Lorem Ipsum is placeholder text used in design to show how real text will fill a layout. It has no meaning and is only there to show text size and space.",
          "Choose paragraphs, sentences or words, enter how many you need, and copy it.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "It helps fill space in website or app designs, blog templates and presentations before the real text is ready.",
          "Remember to replace the placeholder text with real content before you publish.",
        ],
      },
    ],
  },

  "meta-tag-generator": {
    bn: [
      {
        h: "কী তৈরি হয়",
        p: [
          "পেজের টাইটেল ও ডেসক্রিপশন লিখুন, প্রয়োজনে URL, ছবি ও লেখকের নাম দিন। টুলটি SEO মেটা ট্যাগ, Open Graph ও Twitter ট্যাগ তৈরি করে। এটি Blogger বা যেকোনো ওয়েবসাইটের জন্য কাজে লাগে।",
          "তৈরি কোড কপি করে পেজের <head> অংশে বসান।",
        ],
      },
      {
        h: "কিছু জরুরি কথা",
        p: [
          "টাইটেল ৫০ থেকে ৬০ অক্ষর এবং ডেসক্রিপশন ১২০ থেকে ১৬০ অক্ষরের মধ্যে রাখা ভালো। গুগল পিক্সেল প্রস্থ ধরে কাটে, তাই এই সীমা আনুমানিক।",
          "গুগল র‍্যাংকিংয়ে meta keywords ব্যবহার করে না, তাই না দিলেও চলে। একই লেখা একাধিক URL-এ থাকলে canonical URL দিয়ে মূল URL জানানো হয়।",
        ],
      },
    ],
    en: [
      {
        h: "What it creates",
        p: [
          "Enter the page title and description and, if needed, the URL, image and author. The tool creates SEO meta tags plus Open Graph and Twitter tags. It works for Blogger or any website.",
          "Copy the generated code and paste it into your page's <head>.",
        ],
      },
      {
        h: "A few useful points",
        p: [
          "Keep titles around 50 to 60 characters and descriptions 120 to 160. Google truncates by pixel width, so these limits are approximate.",
          "Google does not use meta keywords for ranking, so you can leave them out. A canonical URL tells search engines which URL is the main one when the same content appears at several URLs.",
        ],
      },
    ],
  },

  "keyword-density-checker": {
    bn: [
      {
        h: "কীওয়ার্ড ডেনসিটি কী এবং কীভাবে হিসাব হয়",
        p: [
          "কীওয়ার্ড ডেনসিটি বলতে বোঝায় একটি শব্দ বা বাক্যাংশ আপনার লেখার মোট শব্দের কত শতাংশ। সূত্র: কীওয়ার্ড যতবার এসেছে ÷ মোট শব্দ × ১০০। যেমন ৫০০ শব্দের লেখায় একটি কীওয়ার্ড ১০ বার এলে ঘনত্ব ২%।",
          "এই হিসাব দিয়ে বোঝা যায় আপনার লেখার প্রধান বিষয়টি ঠিকমতো ফুটে উঠেছে কি না, আর কোনো শব্দ অস্বাভাবিক বেশি এসে লেখাকে কৃত্রিম করে ফেলেছে কি না।",
        ],
      },
      {
        h: "কত শতাংশ রাখা ভালো",
        p: [
          "অনেকে ১-২% কে সাধারণ লক্ষ্য ধরেন। কিন্তু গুগল কোনো নির্দিষ্ট শতাংশ বলেনি, তাই কোনো সংখ্যাকে নিয়ম ভাবা ঠিক নয়। ১% এর কম হলেও সমস্যা নেই, কারণ সার্চ ইঞ্জিন এখন প্রসঙ্গ ও সমার্থক শব্দ বুঝতে পারে।",
          "টুল প্রতিটি টার্গেট কীওয়ার্ডের পাশে ১% এর কম, ১-২%, একটু বেশি বা অনেক বেশি লিখে দেয়। এটি শুধু একটি আন্দাজ। আগে পাঠকের জন্য স্বাভাবিকভাবে লিখুন, তারপর যাচাই করুন।",
        ],
      },
      {
        h: "টুলটি কীভাবে ব্যবহার করবেন",
        p: [
          "লেখা পেস্ট করুন। আপনার টার্গেট কীওয়ার্ড থাকলে নিচের ঘরে প্রতি লাইনে একটি করে লিখুন (সর্বোচ্চ ১০টি), তাহলে প্রতিটির বার ও ঘনত্ব আলাদা দেখাবে। এরপর ১, ২ বা ৩ শব্দের বাটনে চেপে সবচেয়ে বেশি আসা শব্দ ও বাক্যাংশ দেখুন।",
          "ছোট ও সাধারণ শব্দ বাদ দেওয়ার অপশন ফলাফল পরিষ্কার রাখে। ফলাফল কপি করে স্প্রেডশিটে রাখতে পারেন বা CSV ফাইল নামাতে পারেন।",
        ],
      },
      {
        h: "বাংলা লেখার জন্য একটি জরুরি কথা",
        p: [
          "বাংলায় শব্দের সঙ্গে বিভক্তি যোগ হয়। 'ক্যালকুলেটর', 'ক্যালকুলেটরের' ও 'ক্যালকুলেটরে' টুল আলাদা শব্দ হিসেবে গোনে। তাই আপনার কীওয়ার্ডের একাধিক রূপ ব্যবহার করে থাকলে প্রতিটি রূপ টার্গেট কীওয়ার্ডের ঘরে দিয়ে যোগ করে দেখুন।",
          "বাক্যাংশ গোনার সময় শব্দগুলো হুবহু পরপর থাকতে হয়, মাঝে অন্য শব্দ থাকলে সেটি গোনা হয় না।",
        ],
      },
      {
        h: "কীওয়ার্ড স্টাফিং এড়ানোর উপায়",
        p: [
          "কোনো শব্দ ৩% এর বেশি হলে টুল সতর্ক করে। তখন লেখাটি জোরে পড়ে দেখুন কৃত্রিম শোনায় কি না, কিছু জায়গায় প্রতিশব্দ বা সর্বনাম ব্যবহার করুন এবং সম্পর্কিত শব্দ ও প্রশ্নের উত্তর যোগ করে লেখা সমৃদ্ধ করুন।",
          "আপনার লেখা কোথাও পাঠানো বা জমা হয় না, সব বিশ্লেষণ আপনার ব্রাউজারেই হয়।",
        ],
      },
    ],
    en: [
      {
        h: "What keyword density is and how it is calculated",
        p: [
          "Keyword density is the share of your total words that a word or phrase makes up. Formula: times the keyword appears ÷ total words × 100. For example, a keyword that appears 10 times in a 500-word text has a density of 2%.",
          "It shows whether your main topic comes through properly, and whether one word appears so often that the text feels artificial.",
        ],
      },
      {
        h: "What percentage is good",
        p: [
          "Many people treat 1-2% as a common target. But Google has not named an ideal percentage, so no number should be treated as a rule. Under 1% is fine, because search engines now understand context and synonyms.",
          "Next to each target keyword the tool shows under 1%, 1-2%, a bit high or very high. That is only a guide. Write naturally for readers first, then check.",
        ],
      },
      {
        h: "How to use the tool",
        p: [
          "Paste your text. If you have target keywords, enter them one per line in the box below (up to 10) and each shows its own count and density. Then tap the 1, 2 or 3 word button to see the most used words and phrases.",
          "The option to ignore short and common words keeps the result clear. You can copy the result into a spreadsheet or download a CSV file.",
        ],
      },
      {
        h: "An important note for Bangla text",
        p: [
          "In Bangla, endings are added to words. The tool counts 'ক্যালকুলেটর', 'ক্যালকুলেটরের' and 'ক্যালকুলেটরে' as different words. So if you use several forms of your keyword, enter each form in the target keywords box and add them up.",
          "A phrase is counted only when its words appear exactly one after another. If another word sits in between, it is not counted.",
        ],
      },
      {
        h: "How to avoid keyword stuffing",
        p: [
          "The tool warns you when a word goes above 3%. Then read the text aloud to see if it sounds forced, use synonyms or pronouns in some places, and add related words and answers to questions to enrich the text.",
          "Your text is not sent or stored anywhere. All analysis happens in your browser.",
        ],
      },
    ],
  },
  "stopwatch-timer": {
    bn: [
      {
        h: "অনলাইন স্টপওয়াচ কীভাবে ব্যবহার করবেন",
        p: [
          "স্টপওয়াচ ট্যাবে Start চাপলেই সময় চলতে শুরু করে। Pause দিলে থামে, আবার চাপলে যেখানে থেমেছিল সেখান থেকে চলে, আর Reset দিলে সব শূন্য হয়ে যায়। দৌড়, পড়াশোনা বা যেকোনো কাজে কত সময় লাগছে মাপতে এটি কাজে লাগে।",
          "চলার সময় Lap চাপলে প্রতিটি ল্যাপের আলাদা সময় এবং মোট সময় তালিকায় জমা হয়। কম্পিউটারে Space চাপলে Start/Pause, L চাপলে Lap এবং R চাপলে Reset হয়।",
        ],
      },
      {
        h: "কাউন্টডাউন টাইমার",
        p: [
          "টাইমার ট্যাবে ঘণ্টা, মিনিট ও সেকেন্ড দিন, অথবা ১, ৫, ১০, ১৫, ৩০ মিনিট বা ১ ঘণ্টার প্রিসেটে ট্যাপ করুন। সময় শেষ হলে বিপ শব্দ হয় এবং ফোন কাঁপে (ব্রাউজার সাপোর্ট করলে)।",
          "রান্না, পড়ার সেশন, ব্যায়াম বা পরীক্ষার অনুশীলনে সময় বেঁধে দিতে এটি সুবিধাজনক।",
        ],
      },
      {
        h: "স্টপওয়াচ আর টাইমারের পার্থক্য",
        p: [
          "স্টপওয়াচ ০ থেকে সামনের দিকে গোনে, কোনো কাজে কত সময় লাগল তা মাপতে। টাইমার ঠিক করা সময় থেকে পেছনের দিকে গোনে এবং শূন্যে পৌঁছে জানিয়ে দেয়। দুটোই এই পেজের দুই ট্যাবে আছে।",
        ],
      },
      {
        h: "ফুলস্ক্রিন, নির্ভুলতা ও শব্দ",
        p: [
          "বড় পর্দায় বা ক্লাসরুমে দেখাতে ট্যাবের পাশের ফুলস্ক্রিন বাটন ব্যবহার করুন। ব্রাউজার সাপোর্ট না করলে বাটনটি দেখা যায় না।",
          "সময় আপনার ডিভাইসের ঘড়ি থেকে মাপা হয়, তাই ট্যাব ব্যাকগ্রাউন্ডে গেলেও সময় ঠিক থাকে। পেশাদার খেলার সময় মাপার জন্য এটি তৈরি নয়। শব্দ না হলে ফোনের ভলিউম ও সাইলেন্ট মোড দেখুন এবং পেজ খোলা রাখুন।",
        ],
      },
    ],
    en: [
      {
        h: "How to use the online stopwatch",
        p: [
          "On the Stopwatch tab, press Start and the time begins to run. Pause stops it, pressing Start again carries on from where it stopped, and Reset clears it to zero. It helps you measure how long a run, a study session or any task takes.",
          "Press Lap while it runs to save each lap's own time and the total time in the list. On a computer, Space starts or pauses, L records a lap and R resets.",
        ],
      },
      {
        h: "The countdown timer",
        p: [
          "On the Timer tab, enter hours, minutes and seconds, or tap a 1, 5, 10, 15, 30 minute or 1 hour preset. When time is up it beeps and your phone vibrates (if the browser supports it).",
          "It is handy for cooking, study sessions, exercise and exam practice.",
        ],
      },
      {
        h: "Stopwatch vs timer",
        p: [
          "A stopwatch counts up from 0 to measure how long something takes. A timer counts down from the time you set and tells you when it reaches zero. Both are on this page, one in each tab.",
        ],
      },
      {
        h: "Full screen, accuracy and sound",
        p: [
          "Use the full screen button next to the tabs to show it on a big screen or in a classroom. If your browser does not support full screen, the button is hidden.",
          "Time is measured from your device clock, so it stays correct even if the tab goes to the background. It is not built for professional sports timing. If there is no sound, check your phone volume and silent mode and keep the page open.",
        ],
      },
    ],
  },

  "todo-list": {
    bn: [
      {
        h: "কীভাবে ব্যবহার করবেন",
        p: [
          "একটি কাজ লিখে + বা Enter চাপুন, শেষ হলে টিক দিন। All, Active ও Done ফিল্টারে কাজ আলাদা করে দেখা যায়। সাইন আপ লাগে না।",
          "তালিকা শুধু আপনার ফোন বা ব্রাউজারে (লোকাল স্টোরেজ) থাকে, কোনো সার্ভারে যায় না। তাই অন্য ডিভাইসে দেখা যাবে না।",
        ],
      },
      {
        h: "মনে রাখার বিষয়",
        p: [
          "ব্রাউজারের ডেটা মুছলে তালিকাও মুছে যায়, তাই জরুরি কাজ অন্য কোথাও লিখে রাখুন।",
          "দৈনিক পড়াশোনা, বাজারের তালিকা বা কাজের পরিকল্পনা সাজাতে এটি কাজে লাগে।",
        ],
      },
    ],
    en: [
      {
        h: "How to use it",
        p: [
          "Type a task and press + or Enter, then tick it when it is done. Filter by All, Active or Done. No signup is needed.",
          "The list is kept only on your phone or browser (local storage) and never goes to a server, so it will not appear on other devices.",
        ],
      },
      {
        h: "Worth remembering",
        p: [
          "Clearing your browser data also deletes the list, so keep important items somewhere else too.",
          "It helps with daily study plans, shopping lists and planning your work.",
        ],
      },
    ],
  },

  "random-number-generator": {
    bn: [
      {
        h: "কীভাবে ব্যবহার করবেন",
        p: [
          "সর্বনিম্ন, সর্বোচ্চ এবং কতটি সংখ্যা লাগবে তা লিখুন। চাইলে ইউনিক সংখ্যা বেছে নিন, তারপর জেনারেট চাপুন। কয়েন ফ্লিপ ও ডাইস রোলও আছে।",
          "সংখ্যাগুলো ব্রাউজারের crypto জেনারেটর থেকে আসে, যা Math.random-এর চেয়ে শক্তিশালী।",
        ],
      },
      {
        h: "সীমা ও ব্যবহার",
        p: [
          "ইউনিক সংখ্যা রেঞ্জের চেয়ে বেশি চাওয়া যায় না। যেমন ১ থেকে ১০ রেঞ্জে সর্বোচ্চ ১০টি ইউনিক সংখ্যা পাওয়া যায়।",
          "খেলা, লটারির মতো ঘরোয়া সিদ্ধান্ত বা নমুনা বাছাইয়ে এটি কাজে লাগে। সরকারি বা আইনি লটারির জন্য অনুমোদিত পদ্ধতি ব্যবহার করুন।",
        ],
      },
    ],
    en: [
      {
        h: "How to use it",
        p: [
          "Enter the minimum, maximum and how many numbers you want. Optionally choose unique numbers, then click generate. There is also a coin flip and a dice roll.",
          "The numbers come from the browser's crypto generator, which is stronger than Math.random.",
        ],
      },
      {
        h: "Limits and use",
        p: [
          "You cannot ask for more unique numbers than the range holds. For example, 1 to 10 gives at most 10 unique numbers.",
          "It helps with games, informal draws and picking samples. For official or legal lotteries, use an approved method.",
        ],
      },
    ],
  },

  "countdown-timer": {
    bn: [
      {
        h: "কীভাবে ব্যবহার করবেন",
        p: [
          "ইভেন্টের নাম লিখুন, তারিখ ও সময় বেছে নিন, তারপর কত দিন, ঘণ্টা, মিনিট ও সেকেন্ড বাকি তা লাইভ দেখুন। ইভেন্ট আপনার ব্রাউজারেই সংরক্ষিত থাকে, ফিরে এলে আবার পাবেন।",
          "ঈদ বা রমজানের তারিখ টুলে দেওয়া নেই, কারণ তা চাঁদ দেখার ওপর নির্ভর করে এবং প্রতি বছর বদলায়। তারিখ নিজে দিন।",
        ],
      },
      {
        h: "কোথায় কাজে লাগে",
        p: [
          "পরীক্ষা, ভর্তি পরীক্ষা, জন্মদিন, বিয়ে, ভ্রমণ বা কোনো আবেদনের শেষ তারিখ কত দিন বাকি তা দেখতে এটি কাজে লাগে।",
          "দ্রুত সময় মাপতে চাইলে আমাদের স্টপওয়াচ ও টাইমার টুল ব্যবহার করুন।",
        ],
      },
    ],
    en: [
      {
        h: "How to use it",
        p: [
          "Enter the event name, pick the date and time, and watch the days, hours, minutes and seconds left, live. The event is saved in your browser and will be there when you come back.",
          "Eid and Ramadan dates are not built in because they depend on moon sighting and change every year. Set the date yourself.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "It shows how long is left to an exam, an admission test, a birthday, a wedding, a trip or an application deadline.",
          "To time something short, use our stopwatch and timer tool.",
        ],
      },
    ],
  },

  "time-zone-converter": {
    bn: [
      {
        h: "বাংলাদেশের সময় থেকে অন্য দেশের সময় কীভাবে জানবেন",
        p: [
          "প্রথমে কোন জায়গার সময় থেকে বদলাবেন (যেমন ঢাকা) এবং কোন জায়গার সময়ে (যেমন নিউ ইয়র্ক) তা বাছুন। তারপর তারিখ ও সময় দিন বা এখনকার সময় বসান। টুল ফলাফল, দিন বদলেছে কি না এবং দুই জায়গার ঘণ্টার পার্থক্য দেখাবে। অদলবদল বাটনে উল্টোদিকের হিসাবও করা যায়।",
          "নিচে ২৪ ঘণ্টার টেবিলে ঢাকার প্রতি ঘণ্টা অন্য জায়গায় কয়টা, তা পাশাপাশি দেখা যায়। ১২ ঘণ্টা (AM/PM) ও ২৪ ঘণ্টা ফরম্যাট বদলানো যায়।",
        ],
      },
      {
        h: "বাংলাদেশের সঙ্গে প্রধান দেশগুলোর সময়ের পার্থক্য",
        p: [
          "বাংলাদেশ UTC+6। যুক্তরাষ্ট্রের পূর্ব উপকূলের সঙ্গে শীতে ১১ ঘণ্টা ও গ্রীষ্মে ১০ ঘণ্টা, পশ্চিম উপকূলের সঙ্গে শীতে ১৪ ও গ্রীষ্মে ১৩ ঘণ্টা পার্থক্য। যুক্তরাজ্যের সঙ্গে শীতে ৬ ও গ্রীষ্মে ৫ ঘণ্টা। এই সব জায়গা বাংলাদেশের পিছনে।",
          "সৌদি আরব, কাতার, কুয়েত ও বাহরাইন ৩ ঘণ্টা পিছনে, দুবাই ও ওমান ২ ঘণ্টা পিছনে। মালয়েশিয়া ও সিঙ্গাপুর ২ ঘণ্টা এগিয়ে। ভারত আধা ঘণ্টা পিছনে। প্রবাসীদের পরিবারের সঙ্গে কথা বলার সময় ঠিক করতে এই হিসাব কাজে লাগে।",
        ],
      },
      {
        h: "ডে-লাইট সেভিং কী এবং কেন পার্থক্য বদলায়",
        p: [
          "যুক্তরাষ্ট্র, যুক্তরাজ্য ও ইউরোপের অনেক দেশে গ্রীষ্মে ঘড়ি এক ঘণ্টা এগিয়ে দেওয়া হয়, একে ডে-লাইট সেভিং (DST) বলে। তাই এসব দেশের সঙ্গে বাংলাদেশের সময়ের পার্থক্য বছরে দুবার এক ঘণ্টা বদলায়। বাংলাদেশে এখন DST চালু নেই।",
          "এই টুল আপনার ব্রাউজারের টাইম জোন ডেটা থেকে তারিখ অনুযায়ী DST হিসাব করে, তাই আগামী মাসের বা আগামী বছরের তারিখ দিলেও সঠিক ফল পাবেন। DST বদলের দিনের কাছাকাছি সময়ে ফল এক ঘণ্টা আলাদা হতে পারে।",
        ],
      },
      {
        h: "দুই দেশের মিটিংয়ের সময় ঠিক করা",
        p: [
          "ঢাকা ও লন্ডনের মতো দুটি জায়গা ও একটি তারিখ বাছলে টুল দেখায় কোন সময়টা দুই জায়গাতেই সকাল ৯টা থেকে সন্ধ্যা ৬টার মধ্যে পড়ে। যেমন শীতে ঢাকার বিকেল ৩টা থেকে ৬টা লন্ডনের সকাল ৯টা থেকে ১২টা।",
          "কিছু জায়গার সঙ্গে (যেমন যুক্তরাষ্ট্রের পূর্ব উপকূল) অফিস সময় মেলেই না, তখন টুল তা জানিয়ে দেয়। তখন একজনকে সকালে বা রাতে বসতে হবে। হিসাবটি পূর্ণ ঘণ্টা ধরে আনুমানিক।",
        ],
      },
      {
        h: "UTC থেকে বাংলাদেশের সময়",
        p: [
          "UTC থেকে বাংলাদেশের সময় পেতে ৬ ঘণ্টা যোগ করুন। যেমন UTC ০০:০০ হলে বাংলাদেশে ০৬:০০, UTC ১২:০০ হলে ১৮:০০, আর UTC ১৮:০০ হলে পরের দিন ০০:০০। বাংলাদেশের সময়কে বাংলাদেশ স্ট্যান্ডার্ড টাইম (BST) বলা হয়, অনেক সাইট BDT-ও লেখে।",
          "ব্রিটিশ সামার টাইমও BST সংক্ষেপে লেখা হয়, তাই বিভ্রান্তি এড়াতে UTC+6 লেখা ভালো।",
        ],
      },
    ],
    en: [
      {
        h: "How to find another place's time from Bangladesh time",
        p: [
          "First pick the place to convert from (for example Dhaka) and the place to convert to (for example New York). Then enter the date and time or use the current time. The tool shows the result, whether the day changes, and the hour difference between the two places. The Swap button reverses the conversion.",
          "The 24-hour table below shows each Dhaka hour next to the time in the other place. You can switch between 12-hour (AM/PM) and 24-hour formats.",
        ],
      },
      {
        h: "Time difference between Bangladesh and the main countries",
        p: [
          "Bangladesh is UTC+6. The difference is 11 hours with the US East Coast in winter and 10 in summer, and 14 with the West Coast in winter and 13 in summer. With the UK it is 6 hours in winter and 5 in summer. All of these places are behind Bangladesh.",
          "Saudi Arabia, Qatar, Kuwait and Bahrain are 3 hours behind, and Dubai and Oman 2 hours behind. Malaysia and Singapore are 2 hours ahead. India is half an hour behind. This helps you choose a time to talk to family abroad.",
        ],
      },
      {
        h: "What daylight saving time is and why the difference changes",
        p: [
          "In the USA, the UK and many European countries clocks go one hour forward in summer, which is called daylight saving time (DST). So the difference between Bangladesh and these places changes by an hour twice a year. Bangladesh currently has no DST.",
          "This tool works out DST from your browser's time zone data for the date you choose, so a date next month or next year also gives the right result. Near a DST change the result may differ by an hour.",
        ],
      },
      {
        h: "Choosing a meeting time for two countries",
        p: [
          "Pick two places such as Dhaka and London and one date, and the tool shows which time falls between 9:00 and 18:00 in both places. In winter, 3 PM to 6 PM in Dhaka is 9 AM to 12 noon in London.",
          "With some places (such as the US East Coast) working hours do not overlap at all, and the tool says so. Then one person has to meet early in the morning or late at night. The calculation is approximate, in whole hours.",
        ],
      },
      {
        h: "From UTC to Bangladesh time",
        p: [
          "To get Bangladesh time from UTC, add 6 hours. For example UTC 00:00 is 06:00 in Bangladesh, UTC 12:00 is 18:00, and UTC 18:00 is 00:00 the next day. Bangladesh time is called Bangladesh Standard Time (BST), and many sites write BDT.",
          "British Summer Time is also abbreviated BST, so writing UTC+6 avoids confusion.",
        ],
      },
    ],
  },

  "expense-tracker": {
    bn: [
      {
        h: "কীভাবে ব্যবহার করবেন",
        p: [
          "আয় বা খরচ বেছে নিয়ে টাকার পরিমাণ ও ক্যাটাগরি দিন এবং Add চাপুন। মাস অনুযায়ী মোট আয়, খরচ ও ব্যালেন্স দেখা যায়, আর ক্যাটাগরি অনুযায়ী টাকা কোথায় যাচ্ছে তাও বোঝা যায়। চাইলে CSV ডাউনলোড করা যায়।",
          "তথ্য শুধু আপনার ফোন বা ব্রাউজারে (লোকাল স্টোরেজ) থাকে, কোনো সার্ভারে যায় না। অন্য ডিভাইসে দেখা যাবে না।",
        ],
      },
      {
        h: "ব্যাকআপ",
        p: [
          "ব্রাউজারের ডেটা মুছলে হিসাবও মুছে যায়, তাই মাঝে মাঝে CSV ডাউনলোড করে রাখুন।",
          "খরচের হিসাব রাখার সহজ নিয়ম নিয়ে আমাদের গাইডটিও পড়ে দেখতে পারেন।",
        ],
      },
    ],
    en: [
      {
        h: "How to use it",
        p: [
          "Choose income or expense, enter the amount and category, and tap Add. You see total income, expenses and balance by month, and where your money goes by category. You can also download a CSV.",
          "Entries are kept only on your phone or browser (local storage) and never go to a server. They will not appear on other devices.",
        ],
      },
      {
        h: "Backups",
        p: [
          "Clearing your browser data also deletes your entries, so download a CSV now and then as a backup.",
          "You can also read our guide on a simple way to keep track of your expenses.",
        ],
      },
    ],
  },

  "invoice-generator": {
    bn: [
      {
        h: "কীভাবে ইনভয়েস বানাবেন",
        p: [
          "নিজের ও ক্লায়েন্টের তথ্য লিখুন, আইটেম, VAT ও ডিসকাউন্ট যোগ করুন, তারপর Print চাপুন এবং প্রিন্টারের জায়গায় \"Save as PDF\" বেছে নিন। সাইন আপ লাগে না।",
          "সব কাজ ব্রাউজারেই হয়, তথ্য কোথাও পাঠানো হয় না। পরেরবারের জন্য শুধু আপনার (বিক্রেতার) তথ্য ও মুদ্রা এই ব্রাউজারে মনে রাখা হয়।",
        ],
      },
      {
        h: "সতর্কতা",
        p: [
          "এটি একটি সাধারণ ইনভয়েস, সরকারি VAT চালান (মূসক) ফরম্যাট নয়। সরকারি VAT ইনভয়েসের নিয়ম আলাদা, তাই তার জন্য এনবিআর-এর নিয়ম দেখুন।",
          "ফ্রিল্যান্সার, ছোট ব্যবসা ও দোকানদারদের দ্রুত বিল বা কোটেশন পাঠাতে এটি কাজে লাগে।",
        ],
      },
    ],
    en: [
      {
        h: "How to make an invoice",
        p: [
          "Enter your details and your client's, add the items, VAT and discount, then tap Print and choose \"Save as PDF\" in place of a printer. No signup is needed.",
          "Everything happens in your browser and nothing is sent anywhere. Only your (seller) details and currency are remembered in this browser for next time.",
        ],
      },
      {
        h: "A caution",
        p: [
          "This is a general invoice, not the official government VAT challan (Mushak) format. The official VAT invoice rules are different, so check the NBR rules for that.",
          "It helps freelancers, small businesses and shopkeepers send a quick bill or quotation.",
        ],
      },
    ],
  },

  "qr-scanner": {
    bn: [
      {
        h: "কীভাবে স্ক্যান করবেন",
        p: [
          "ক্যামেরা চালু করে অনুমতি দিন এবং QR কোড ফ্রেমের ভেতরে ধরুন। ফল দেখা যাবে, আর সেটি লিংক হলে খোলার আগে ঠিকানা দেখে নিন। চাইলে QR কোডের ছবিও আপলোড করা যায়।",
          "ক্যামেরা না চললে ব্রাউজারে এই সাইটের জন্য ক্যামেরার অনুমতি আছে কি না এবং অন্য কোনো অ্যাপ ক্যামেরা ব্যবহার করছে কি না দেখুন।",
        ],
      },
      {
        h: "নিরাপত্তা",
        p: [
          "অচেনা QR কোড ক্ষতিকর সাইটে নিয়ে যেতে পারে, তাই স্ক্যান করা লিংক খোলার আগে ঠিকানা দেখে নিন।",
          "কোনো ছবি সার্ভারে যায় না, সব প্রসেস আপনার ফোনেই হয়।",
        ],
      },
    ],
    en: [
      {
        h: "How to scan",
        p: [
          "Start the camera, allow permission, and hold the QR code inside the frame. You see the result and, if it is a link, check the address before opening it. You can also upload a photo of the QR code.",
          "If the camera does not start, check that camera permission is allowed for this site in your browser and that no other app is using the camera.",
        ],
      },
      {
        h: "Safety",
        p: [
          "An unknown QR code can lead to a harmful site, so check the address before opening a link.",
          "No image goes to a server. Everything is processed on your phone.",
        ],
      },
    ],
  },

  "text-to-speech": {
    bn: [
      {
        h: "বাংলা টেক্সট টু স্পিচ কীভাবে ব্যবহার করবেন",
        p: [
          "লেখা টাইপ বা পেস্ট করুন, অথবা .txt ফাইল দিন। ভাষা ও ভয়েস বেছে নিন (Automatic রাখলে লেখার বর্ণমালা দেখে ভাষা ধরা হয়, তাই বাংলা লিখলে বাংলা ভয়েসই বাছা হয়), গতি ও সুর ঠিক করুন এবং পড়ে শোনান চাপুন। লেখার নিচে শব্দ সংখ্যা ও আনুমানিক শোনার সময় দেখা যায়।",
          "নমুনা বাটন চাপলে একটি বাংলা বা ইংরেজি নমুনা লেখা বসে যায়, ভয়েস ঠিকমতো চলছে কি না দেখে নিতে এটি কাজে লাগে।",
        ],
      },
      {
        h: "কোন ভাষা ও কেমন কণ্ঠ পাবেন",
        p: [
          "যে ভাষার ভয়েস আপনার ফোন বা ব্রাউজারে ইনস্টল আছে সেই ভাষাই চলে। ল্যাটিন অক্ষরে লেখা অন্য ভাষার (যেমন স্প্যানিশ) জন্য ভাষা তালিকা থেকে সেই ভাষা বেছে নিন।",
          "এই টুলের নিজস্ব কোনো AI কণ্ঠ নেই। কণ্ঠ আপনার ডিভাইস ও ব্রাউজারের ভয়েসের উপর নির্ভর করে, তাই ফোনভেদে আলাদা শোনাবে। MP3 ডাউনলোডও নেই, শুধু শোনা যায়।",
        ],
      },
      {
        h: "বাংলা না পড়লে",
        p: [
          "ফোনের Settings → Language → Text-to-speech থেকে বাংলা ভয়েস ইনস্টল করুন। \"অনলাইন\" চিহ্নিত ভয়েসের জন্য ইন্টারনেট লাগে ও শুরু হতে দেরি হতে পারে, তাই সম্ভব হলে অফলাইন ভয়েস বেছে নিন।",
          "Instagram বা Facebook এর ভেতরের ব্রাউজারে ভয়েস চলে না। ⋯ মেনু থেকে Open in browser বেছে Chrome এ খুলুন।",
        ],
      },
      {
        h: "লেখার সীমা ও গোপনীয়তা",
        p: [
          "একবারে সর্বোচ্চ ৫,০০০ অক্ষর পড়ানো যায়। বড় লেখা ভাগ করে নিন। .txt ফাইল ১ MB পর্যন্ত নেওয়া হয়, তবে প্রথম ৫,০০০ অক্ষরই বক্সে আসে।",
          "টুল নিজে আপনার লেখা কোনো সার্ভারে পাঠায় না। তবে \"অনলাইন\" চিহ্নিত ভয়েস আপনার ব্রাউজার বা ফোনের নির্মাতার সার্ভার ব্যবহার করতে পারে। সব ডিভাইসের ভেতরে রাখতে অফলাইন ভয়েস বাছুন।",
        ],
      },
      {
        h: "কাদের কাজে লাগে",
        p: [
          "পড়াশোনা, বানান ও উচ্চারণ শোনা, লেখা প্রুফ শোনা বা চোখ বন্ধ করে লেখা শুনতে এটি কাজে লাগে। সাইন-আপ বা লগইন ছাড়াই ফোন ও কম্পিউটারে চলে।",
        ],
      },
    ],
    en: [
      {
        h: "How to use Bangla text to speech",
        p: [
          "Type or paste your text, or add a .txt file. Choose the language and voice (on Automatic the tool detects the language from the writing system, so Bangla text gets a Bangla voice), set speed and pitch, then tap Speak. Below the box you see the word count and approximate listening time.",
          "The sample buttons put in a Bangla or English sample, which helps you check that the voice works properly.",
        ],
      },
      {
        h: "Which languages and what kind of voice",
        p: [
          "It works for languages that have a voice installed on your phone or browser. For other languages written in Latin letters, such as Spanish, choose that language from the Language list.",
          "This tool has no AI voices of its own. The voice depends on your device and browser, so it sounds different on different phones. There is no MP3 download, you can only listen.",
        ],
      },
      {
        h: "If Bangla is not read aloud",
        p: [
          "Install a Bangla voice in Settings → Language → Text-to-speech. Voices marked \"online\" need internet and may start slowly, so pick an offline voice if you can.",
          "Voice does not work inside the built-in browser of Instagram or Facebook. Use the ⋯ menu, choose Open in browser and open it in Chrome.",
        ],
      },
      {
        h: "Text limit and privacy",
        p: [
          "You can read up to 5,000 characters at a time. Split longer text. A .txt file up to 1 MB is accepted, but only its first 5,000 characters come into the box.",
          "The tool itself does not send your text to any server. However, voices marked \"online\" may use the servers of your browser or phone maker. Pick an offline voice to keep everything on your device.",
        ],
      },
      {
        h: "Who it helps",
        p: [
          "It helps with studying, hearing spelling and pronunciation, proofreading by ear, or listening to text with your eyes closed. It works on phone and computer without sign-up or login.",
        ],
      },
    ],
  },

  "bangla-calendar": {
    bn: [
      {
        h: "কী দেখা যায়",
        p: [
          "আজকের বাংলা তারিখ ও ঋতু দেখা যায়, মাস বদলে গ্রেগরিয়ান ও বাংলা ক্যালেন্ডার ঘোরা যায়, এবং তারিখ কনভার্টারে গ্রেগরিয়ান থেকে বাংলা বা বাংলা থেকে গ্রেগরিয়ান তারিখ বের করা যায়। এটি বাংলাদেশের সংশোধিত বাংলা পঞ্জিকা অনুসরণ করে।",
          "এই পঞ্জিকায় পহেলা বৈশাখ প্রতি বছর ১৪ এপ্রিল। ফাল্গুনে সাধারণ বছরে ২৯ দিন এবং গ্রেগরিয়ান অধিবর্ষে ৩০ দিন।",
        ],
      },
      {
        h: "পশ্চিমবঙ্গের সঙ্গে পার্থক্য",
        p: [
          "এই টুল বাংলাদেশের পঞ্জিকা মানে, তাই পশ্চিমবঙ্গের তারিখের সঙ্গে মিলবে না। পশ্চিমবঙ্গে ভিন্ন পঞ্জিকা চলে, যেখানে পহেলা বৈশাখ সাধারণত ১৫ এপ্রিল।",
          "জন্মদিন, বিয়ের তারিখ বা সরকারি অনুষ্ঠানের বাংলা তারিখ জানতে এটি কাজে লাগে।",
        ],
      },
    ],
    en: [
      {
        h: "What you can see",
        p: [
          "You see today's Bangla date and season, can browse a Gregorian and Bangla calendar by changing the month, and can convert dates between Gregorian and Bangla with the converter. It follows Bangladesh's revised Bangla calendar.",
          "In this calendar Pohela Boishakh is on 14 April every year. Falgun has 29 days in a normal year and 30 in a Gregorian leap year.",
        ],
      },
      {
        h: "Difference from West Bengal",
        p: [
          "This tool follows Bangladesh's calendar, so it will not match West Bengal's dates. West Bengal uses a different calendar, where Pohela Boishakh is usually on 15 April.",
          "It helps you find the Bangla date of a birthday, a wedding or an official event.",
        ],
      },
    ],
  },

  "rotate-pdf": {
    bn: [
      {
        h: "PDF এর পেজ কীভাবে ঘোরাবেন",
        p: [
          "PDF সিলেক্ট করে ডানে ৯০°, বামে ৯০° বা ১৮০° বেছে নিন। সব পেজ একসঙ্গে ঘোরাতে পারেন, আবার 1-3, 5 এর মতো করে শুধু নির্দিষ্ট পেজও বাছতে পারেন। বাকি পেজ যেমন আছে তেমনই থাকে।",
          "ঘোরানোর পর নতুন PDF ডাউনলোড করুন। আগে থেকে ঘোরানো পেজের ওপর আবার ঘোরালে নতুন কোণ আগের কোণের সঙ্গে যোগ হয়।",
        ],
      },
      {
        h: "কখন কাজে লাগে",
        p: [
          "স্ক্যান করা বা ফোনে তোলা PDF অনেক সময় কাত বা উল্টো হয়ে যায়। জমা দেওয়ার আগে এটি সোজা করতে কাজে লাগে।",
          "আপনার ফাইল কোথাও আপলোড হয় না, সব কাজ আপনার ফোন বা ব্রাউজারেই হয়।",
        ],
      },
    ],
    en: [
      {
        h: "How to rotate the pages of a PDF",
        p: [
          "Select a PDF and choose right 90°, left 90° or 180°. You can rotate every page at once, or pick only some pages by typing something like 1-3, 5. The other pages stay as they are.",
          "After rotating, download the new PDF. If a page was already rotated, the new angle is added to the old one.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "Scanned or phone-captured PDFs often come out sideways or upside down. This straightens them before you submit them.",
          "Your file is not uploaded anywhere, everything happens on your phone or browser.",
        ],
      },
    ],
  },

  "split-pdf": {
    bn: [
      {
        h: "PDF থেকে পেজ কীভাবে আলাদা করবেন",
        p: [
          "PDF সিলেক্ট করার পর দুটি উপায় আছে। পেজ রেঞ্জ দিলে আপনার বাছা পেজগুলো নিয়ে একটি নতুন PDF হয়। যেমন 1-3, 5, 8-10 লিখলে পেজ ১, ২, ৩, ৫, ৮, ৯ ও ১০ থাকবে। বাংলা সংখ্যাও চলে।",
          "প্রতি পেজ আলাদা বেছে নিলে প্রতিটি পেজ নিজস্ব PDF হয় এবং একটি একটি করে ডাউনলোড করতে হয়। এটি সর্বোচ্চ ১০০ পেজের PDF এর জন্য।",
        ],
      },
      {
        h: "কখন কাজে লাগে",
        p: [
          "বড় PDF এর শুধু দরকারি কয়েকটি পেজ পাঠাতে চাইলে, বা ফর্মের সাথে নির্দিষ্ট পেজ জমা দিতে হলে এটি কাজে লাগে। মূল ফাইল অপরিবর্তিত থাকে, শুধু নতুন ফাইল তৈরি হয়।",
          "আপনার ফাইল কোথাও আপলোড হয় না, সব কাজ আপনার ফোন বা ব্রাউজারেই হয়।",
        ],
      },
    ],
    en: [
      {
        h: "How to pull pages out of a PDF",
        p: [
          "After you select a PDF there are two ways. With a page range, the pages you pick become one new PDF. For example, 1-3, 5, 8-10 keeps pages 1, 2, 3, 5, 8, 9 and 10. Bangla digits work too.",
          "With each page separately, every page becomes its own PDF and you download them one by one. This works for PDFs up to 100 pages.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "It is useful when you want to send only the few pages you need from a large PDF, or submit specific pages with a form. Your original file stays unchanged, only new files are created.",
          "Your file is not uploaded anywhere, everything happens on your phone or browser.",
        ],
      },
    ],
  },

  "image-compressor": {
    bn: [
      {
        h: "ছবির সাইজ কীভাবে কমাবেন",
        p: [
          "ছবি সিলেক্ট করে JPEG বা WebP বেছে নিন, তারপর কোয়ালিটি স্লাইডার ঠিক করুন। কোয়ালিটি কমালে ফাইলের সাইজ কমে। আগে ও পরের সাইজ পাশাপাশি দেখে ডাউনলোড করতে পারবেন।",
          "আরও ছোট করতে চাইলে ছবির প্রস্থ কমিয়ে দিন। মাপ ছোট হলে ফাইলও ছোট হয়। PNG ছবি দিলে এখানে JPEG বা WebP তে বদলে যাবে, কারণ PNG তে কোয়ালিটি কমিয়ে সাইজ কমানো যায় না।",
        ],
      },
      {
        h: "কোথায় কাজে লাগে",
        p: [
          "অনেক সরকারি ও চাকরির আবেদন ফর্মে ছবির সাইজ ১০০ KB বা ২০০ KB এর মধ্যে রাখতে বলা হয়। এই টুল দিয়ে কোয়ালিটি ঠিক করে সেই সীমার মধ্যে আনা যায়।",
          "আপনার ছবি কোথাও আপলোড হয় না, সব কাজ আপনার ফোন বা ব্রাউজারেই হয়।",
        ],
      },
    ],
    en: [
      {
        h: "How to reduce an image's file size",
        p: [
          "Select an image, choose JPEG or WebP, then adjust the quality slider. Lowering the quality makes the file smaller. You can compare the before and after sizes side by side before you download.",
          "To go smaller still, reduce the image width. A smaller image makes a smaller file. If you give a PNG, it is turned into JPEG or WebP here, because PNG size cannot be reduced by lowering quality.",
        ],
      },
      {
        h: "Where it helps",
        p: [
          "Many government and job application forms ask for a photo under 100 KB or 200 KB. You can tune the quality here to bring the file within that limit.",
          "Your image is not uploaded anywhere, everything happens on your phone or browser.",
        ],
      },
    ],
  },

  "image-resizer": {
    bn: [
      {
        h: "ছবির মাপ কীভাবে বদলাবেন",
        p: [
          "ছবি সিলেক্ট করে প্রিসেট বাছুন অথবা প্রস্থ ও উচ্চতা পিক্সেলে লিখুন। Lock চালু থাকলে একটি মাপ বদলালে অন্যটি নিজে ঠিক হয়, তাই ছবি বিকৃত হয় না। সর্বোচ্চ ৮০০০ পিক্সেল পর্যন্ত মাপ দেওয়া যায়।",
          "পাসপোর্ট সাইজ ছবির জন্য প্রিসেট আছে। ৩.৫ × ৪.৫ সেমি ছবি ৩০০ DPI তে প্রায় ৪১৩ × ৫৩১ পিক্সেল হয়। তবে ফর্ম বা ওয়েবসাইটের নির্দেশনা আলাদা হলে সেটাই মানুন।",
        ],
      },
      {
        h: "যা মনে রাখবেন",
        p: [
          "ছবি অনেক বড় করলে মান কমে যেতে পারে, কারণ নতুন পিক্সেল তৈরি হয় না, শুধু বিদ্যমান পিক্সেল টেনে বাড়ানো হয়। তাই সম্ভব হলে বড় ছবি ছোট করুন, ছোট ছবি বড় নয়।",
          "আপনার ছবি কোথাও আপলোড হয় না, সব কাজ আপনার ফোন বা ব্রাউজারেই হয়।",
        ],
      },
    ],
    en: [
      {
        h: "How to change an image's size",
        p: [
          "Select an image, then pick a preset or type a width and height in pixels. With the lock on, changing one side sets the other automatically, so the image is not distorted. Sizes up to 8,000 pixels are allowed.",
          "There are presets for passport size photos. A 3.5 × 4.5 cm photo at 300 DPI is about 413 × 531 pixels. If a form or website gives different instructions, follow those.",
        ],
      },
      {
        h: "Good to know",
        p: [
          "Making an image much bigger can lower its quality, because no new detail is created, existing pixels are only stretched. Where possible, shrink a big image rather than enlarging a small one.",
          "Your image is not uploaded anywhere, everything happens on your phone or browser.",
        ],
      },
    ],
  },

  "image-converter": {
    bn: [
      {
        h: "ছবির ফরম্যাট কীভাবে বদলাবেন",
        p: [
          "ছবি সিলেক্ট করে JPG, PNG বা WebP বেছে নিন। JPG ও WebP তে কোয়ালিটি স্লাইডার আছে, PNG তে নেই। ডাউনলোডের আগে নতুন ফাইলের সাইজ দেখা যায়।",
          "PNG থেকে JPG করলে স্বচ্ছ অংশ সাদা হয়ে যায়, কারণ JPG স্বচ্ছতা সাপোর্ট করে না। WebP সাধারণত JPG বা PNG এর চেয়ে ছোট সাইজে একই মানের ছবি দেয়।",
        ],
      },
      {
        h: "কখন কাজে লাগে",
        p: [
          "কোনো ফর্ম বা ওয়েবসাইট শুধু JPG নেয়, অথচ আপনার ছবি PNG বা WebP, এমন সময় এটি কাজে লাগে। ওয়েবসাইটে ছবি ছোট রাখতে WebP তে বদলানোও জনপ্রিয় উপায়।",
          "আপনার ছবি কোথাও আপলোড হয় না, সব কাজ আপনার ফোন বা ব্রাউজারেই হয়। ব্রাউজার কোনো ফরম্যাট সাপোর্ট না করলে টুল আপনাকে জানিয়ে দেবে কোন ফরম্যাটে সেভ হচ্ছে।",
        ],
      },
    ],
    en: [
      {
        h: "How to change an image format",
        p: [
          "Select an image and choose JPG, PNG or WebP. JPG and WebP have a quality slider, PNG does not. You can see the size of the new file before you download it.",
          "Converting a PNG to JPG turns transparent areas white, because JPG does not support transparency. WebP usually gives the same quality as JPG or PNG at a smaller size.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "It helps when a form or website accepts only JPG but your image is a PNG or WebP. Converting to WebP is also a popular way to keep images small on a website.",
          "Your image is not uploaded anywhere, everything happens on your phone or browser. If your browser does not support a format, the tool tells you which format it saved instead.",
        ],
      },
    ],
  },

  "qr-code-generator": {
    bn: [
      {
        h: "QR কোড কীভাবে বানাবেন",
        p: [
          "বক্সে লিংক বা লেখা লিখুন, সাইজ ও রং ঠিক করুন, তারপর PNG ডাউনলোড করুন। সাইজ ২০০ থেকে ১০০০ পিক্সেল পর্যন্ত বেছে নেওয়া যায়।",
          "লেখা বা লিংক সরাসরি QR এর ভেতরেই থাকে, তাই এই QR কোডের কোনো মেয়াদ নেই। তবে লিংকের ওয়েবসাইট বন্ধ হলে সেই লিংক আর কাজ করবে না।",
        ],
      },
      {
        h: "ভুল সংশোধনের মাত্রা",
        p: [
          "L, M, Q ও H মাত্রা ঠিক করে QR এর কিছু অংশ নষ্ট হলেও তা পড়া যাবে কিনা। L প্রায় ৭%, M ১৫%, Q ২৫% এবং H ৩০% পর্যন্ত নষ্ট হলে পড়া যায়। মাত্রা বাড়ালে QR ঘন হয়।",
          "রং বদলালে গাঢ় রঙের QR হালকা পটভূমিতে রাখুন, নাহলে স্ক্যানার পড়তে পারবে না। আপনার লেখা কোথাও পাঠানো হয় না, QR আপনার ব্রাউজারেই তৈরি হয়।",
        ],
      },
    ],
    en: [
      {
        h: "How to make a QR code",
        p: [
          "Type a link or text in the box, adjust the size and colours, then download the PNG. You can choose a size from 200 to 1,000 pixels.",
          "The text or link is stored inside the QR itself, so this QR code does not expire. If the website behind a link goes offline, though, the link will stop working.",
        ],
      },
      {
        h: "Error correction level",
        p: [
          "The levels L, M, Q and H decide whether the QR can still be read if part of it is damaged. L tolerates about 7% damage, M 15%, Q 25% and H up to 30%. A higher level makes the QR denser.",
          "If you change colours, keep a dark QR on a light background, or scanners may not read it. Your text is not sent anywhere, the QR is made in your browser.",
        ],
      },
    ],
  },

  "cgpa-calculator": {
    bn: [
      {
        h: "CGPA কীভাবে হিসাব হয়",
        p: [
          "প্রতিটি কোর্সের গ্রেড পয়েন্টকে সেই কোর্সের ক্রেডিট দিয়ে গুণ করে সব গুণফল যোগ করা হয়। তারপর মোট ক্রেডিট দিয়ে ভাগ করলে GPA বা CGPA পাওয়া যায়। সূত্র: CGPA = Σ(গ্রেড পয়েন্ট × ক্রেডিট) ÷ মোট ক্রেডিট।",
          "উদাহরণ: চারটি কোর্স, প্রতিটি ৩ ক্রেডিট, গ্রেড A+ (৪.০০), A (৩.৭৫), B+ (৩.২৫) ও B (৩.০০)। মোট পয়েন্ট (৪.০০ + ৩.৭৫ + ৩.২৫ + ৩.০০) × ৩ = ৪২, মোট ক্রেডিট ১২। তাই GPA = ৪২ ÷ ১২ = ৩.৫০।",
        ],
      },
      {
        h: "গ্রেড পয়েন্ট টেবিল (৪.০০ স্কেল)",
        p: [
          "প্রচলিত ৪.০০ স্কেলে A+ = ৪.০০, A = ৩.৭৫, A- = ৩.৫০, B+ = ৩.২৫, B = ৩.০০, B- = ২.৭৫, C+ = ২.৫০, C = ২.২৫, D = ২.০০ এবং F = ০। পেজের নিচে পুরো টেবিলটি দেওয়া আছে।",
          "নম্বরের সীমা এবং কিছু গ্রেড বিশ্ববিদ্যালয়ভেদে আলাদা হতে পারে, তাই নিজের বিশ্ববিদ্যালয়ের গ্রেডিং সিস্টেম মিলিয়ে নিন।",
        ],
      },
      {
        h: "আগের CGPA থেকে নতুন CGPA",
        p: [
          "ধরুন আগের CGPA ৩.৪০ এবং মোট ক্রেডিট ৪৫। এই সেমিস্টারে ১২ ক্রেডিটে GPA ৩.৫০ হলে নতুন CGPA = (৩.৪০ × ৪৫ + ৩.৫০ × ১২) ÷ ৫৭ = ৩.৪২।",
          "টুলে \"কোর্স অনুযায়ী\" ট্যাবে কোর্সগুলো দিন এবং নিচের ঘরে আগের CGPA ও ক্রেডিট লিখুন, হিসাব নিজে থেকে হয়ে যাবে। সেমিস্টারের GPA আগে থেকে জানা থাকলে \"সেমিস্টার GPA থেকে\" ট্যাব ব্যবহার করুন, সেখানে ৪.০০ ও ৫.০০ দুই স্কেলই আছে।",
        ],
      },
      {
        h: "সীমাবদ্ধতা",
        p: [
          "বিশ্ববিদ্যালয়ভেদে গ্রেডিং সিস্টেম এবং রিটেক বা ইমপ্রুভমেন্টের নিয়ম আলাদা। CGPA থেকে শতকরা নম্বরে রূপান্তরেরও সবার জন্য একই সূত্র নেই। তাই এই ফলাফল আনুমানিক ধরুন এবং চূড়ান্ত CGPA আপনার বিশ্ববিদ্যালয় থেকে দেখে নিন।",
        ],
      },
    ],
    en: [
      {
        h: "How CGPA is calculated",
        p: [
          "Multiply each course's grade point by that course's credits and add up the results. Divide by the total credits to get the GPA or CGPA. Formula: CGPA = Σ(grade point × credits) ÷ total credits.",
          "Example: four courses of 3 credits each, graded A+ (4.00), A (3.75), B+ (3.25) and B (3.00). Total points are (4.00 + 3.75 + 3.25 + 3.00) × 3 = 42 and total credits are 12, so GPA = 42 ÷ 12 = 3.50.",
        ],
      },
      {
        h: "Grade point table (4.00 scale)",
        p: [
          "On the common 4.00 scale, A+ = 4.00, A = 3.75, A- = 3.50, B+ = 3.25, B = 3.00, B- = 2.75, C+ = 2.50, C = 2.25, D = 2.00 and F = 0. The full table is shown at the bottom of the tool.",
          "Mark ranges and some grades can differ between universities, so check your own university's grading system.",
        ],
      },
      {
        h: "New CGPA from a previous CGPA",
        p: [
          "Say your previous CGPA is 3.40 over 45 credits. If this semester you earn a GPA of 3.50 over 12 credits, your new CGPA = (3.40 × 45 + 3.50 × 12) ÷ 57 = 3.42.",
          "In the tool, enter your courses on the \"By course\" tab and your previous CGPA and credits in the box below, and the calculation is done for you. If you already know the semester GPAs, use the \"From semester GPA\" tab, which supports both the 4.00 and 5.00 scales.",
        ],
      },
      {
        h: "Limitations",
        p: [
          "Grading systems and retake or improvement rules differ between universities, and there is no single formula for converting CGPA to percentage. Treat this result as an estimate and check your final CGPA with your university.",
        ],
      },
    ],
  },

  "pdf-to-jpg": {
    bn: [
      {
        h: "PDF থেকে JPG কীভাবে বানাবেন",
        p: [
          "PDF সিলেক্ট করুন, চাইলে পেজ রেঞ্জ লিখুন (যেমন 1-3, 5), ছবির মান বেছে নিন, তারপর JPG বানান চাপুন। প্রতিটি পেজ একটি আলাদা JPG ছবি হয় এবং পাশের বাটন থেকে ডাউনলোড করা যায়।",
          "সাধারণ মানে A4 পেজ প্রায় ৮৯২ × ১২৬২ পিক্সেলের ছবি হয়, ফাইল ছোট থাকে। উচ্চ মানে ছবি আরও বড় ও স্পষ্ট হয়, তবে ফাইলের সাইজও বাড়ে। একবারে সর্বোচ্চ ৫০টি পেজ করা যায়।",
        ],
      },
      {
        h: "কখন কাজে লাগে",
        p: [
          "PDF এর কোনো পেজ ছবি হিসেবে মেসেঞ্জারে বা ফর্মে পাঠাতে, বা পেজের ছবি এডিট করতে চাইলে এটি কাজে লাগে।",
          "আপনার PDF কোথাও আপলোড হয় না, সব কাজ আপনার ফোন বা ব্রাউজারেই হয়। শুধু PDF পড়ার টুলটি ইন্টারনেট থেকে একবার লোড হয়, তাই প্রথমবার ইন্টারনেট দরকার। পাসওয়ার্ড দেওয়া PDF খোলা যায় না।",
        ],
      },
    ],
    en: [
      {
        h: "How to turn a PDF into JPG images",
        p: [
          "Select a PDF, optionally type a page range (for example 1-3, 5), choose the image quality, then tap Convert to JPG. Each page becomes its own JPG image with a download button beside it.",
          "Normal quality makes an A4 page about 892 × 1262 pixels with a smaller file. High quality gives bigger, sharper images but larger files. You can convert up to 50 pages at a time.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "It helps when you want to send a PDF page as a picture in a chat or form, or edit a page as an image.",
          "Your PDF is not uploaded anywhere, everything happens on your phone or browser. Only the PDF reader library is loaded once from the internet, so you need a connection the first time. Password protected PDFs cannot be opened.",
        ],
      },
    ],
  },

  "compress-pdf": {
    bn: [
      {
        h: "PDF এর সাইজ কীভাবে কমাবেন",
        p: [
          "PDF সিলেক্ট করে হালকা, মাঝারি বা শক্তিশালী মাত্রা বেছে নিন, তারপর PDF কম্প্রেস করুন চাপুন। শেষে আগে ও পরের সাইজ দেখানো হয়। নতুন ফাইল ছোট হলেই ডাউনলোড বাটন আসে।",
          "এই টুল প্রতিটি পেজকে ছবিতে বদলে নতুন PDF বানায়, পেজের মাপ একই থাকে। তাই স্ক্যান করা কাগজ বা ছবির PDF অনেকটাই ছোট হয়।",
        ],
      },
      {
        h: "যা মনে রাখবেন",
        p: [
          "কম্প্রেসের পর PDF এর লেখা সিলেক্ট, কপি বা সার্চ করা যাবে না, কারণ পেজ এখন ছবি। লেখা দরকার হলে মূল ফাইল রেখে দিন। লেখা-ভিত্তিক PDF আগে থেকেই ছোট থাকে, সেখানে নতুন ফাইল বড় হতে পারে, তখন মূল ফাইলটিই ব্যবহার করুন।",
          "আবেদন ফর্মে ফাইলের সাইজের সীমা থাকলে এটি কাজে লাগে। আপনার PDF কোথাও আপলোড হয় না, সব কাজ আপনার ফোন বা ব্রাউজারেই হয়। শুধু PDF পড়ার টুলটি ইন্টারনেট থেকে একবার লোড হয়। সর্বোচ্চ ৬০ পেজ ও ৫০ MB।",
        ],
      },
    ],
    en: [
      {
        h: "How to reduce a PDF's size",
        p: [
          "Select a PDF, choose light, balanced or strong compression, then tap Compress PDF. You then see the size before and after. The download button appears only when the new file is smaller.",
          "This tool turns every page into an image and builds a new PDF at the same page size. Scanned papers and image-based PDFs often shrink a lot.",
        ],
      },
      {
        h: "Good to know",
        p: [
          "After compressing, the text in the PDF can no longer be selected, copied or searched, because the pages are now images. Keep the original if you need the text. Text-based PDFs are usually small already, so the new file can even be bigger, in which case keep the original.",
          "It helps when an application form has a file size limit. Your PDF is not uploaded anywhere, everything happens on your phone or browser. Only the PDF reader library is loaded once from the internet. Up to 60 pages and 50 MB.",
        ],
      },
    ],
  },

  "passport-fee-calculator-bd": {
    bn: [
      {
        h: "ই-পাসপোর্টের ফি কীভাবে দেখবেন",
        p: [
          "আবেদনকারীর বয়স, পাসপোর্টের পৃষ্ঠা (৪৮ বা ৬৪), মেয়াদ (৫ বা ১০ বছর) এবং ডেলিভারির ধরন (সাধারণ, জরুরি বা অতি জরুরি) বেছে নিলে মোট ফি, মূল ফি, ভ্যাট, আনুমানিক সময় ও বছরপ্রতি খরচ দেখা যায়। সব ফি ১৫% ভ্যাটসহ।",
          "নিচের তালিকার যেকোনো ঘরে চাপ দিলে ওপরের হিসাব সেই ফিতে বদলে যায়, তাই কোনটিতে কত বাড়তি লাগবে তা সহজে তুলনা করা যায়।",
        ],
      },
      {
        h: "সব ফি এক নজরে (১৫% ভ্যাটসহ)",
        p: [
          "৪৮ পৃষ্ঠা, ৫ বছর: সাধারণ ৪,০২৫ টাকা, জরুরি ৬,৩২৫ টাকা, অতি জরুরি ৮,৬২৫ টাকা। ৪৮ পৃষ্ঠা, ১০ বছর: সাধারণ ৫,৭৫০ টাকা, জরুরি ৮,০৫০ টাকা, অতি জরুরি ১০,৩৫০ টাকা।",
          "৬৪ পৃষ্ঠা, ৫ বছর: সাধারণ ৬,৩২৫ টাকা, জরুরি ৮,৬২৫ টাকা, অতি জরুরি ১২,০৭৫ টাকা। ৬৪ পৃষ্ঠা, ১০ বছর: সাধারণ ৮,০৫০ টাকা, জরুরি ১০,৩৫০ টাকা, অতি জরুরি ১৩,৮০০ টাকা।",
        ],
      },
      {
        h: "মূল ফি ও ভ্যাট আলাদা কত",
        p: [
          "প্রতিটি ফিতে ১৫% ভ্যাট আছে। যেমন ৪৮ পৃষ্ঠার ৫ বছরের সাধারণ পাসপোর্টে মূল ফি ৩,৫০০ টাকা ও ভ্যাট ৫২৫ টাকা, মোট ৪,০২৫ টাকা। আর ৬৪ পৃষ্ঠার ১০ বছরের অতি জরুরি পাসপোর্টে মূল ফি ১২,০০০ টাকা ও ভ্যাট ১,৮০০ টাকা, মোট ১৩,৮০০ টাকা।",
        ],
      },
      {
        h: "৫ বছর নাকি ১০ বছর",
        p: [
          "১০ বছরের ফি বেশি হলেও বছরপ্রতি খরচ কম। ৪৮ পৃষ্ঠার সাধারণ পাসপোর্টে ৫ বছরে বছরপ্রতি প্রায় ৮০৫ টাকা, ১০ বছরে প্রায় ৫৭৫ টাকা। ৬৪ পৃষ্ঠায় তা যথাক্রমে প্রায় ১,২৬৫ ও ৮০৫ টাকা।",
          "প্রকাশিত তথ্য অনুযায়ী ১৮ বছরের নিচে এবং ৬৫ বছরের বেশি বয়সীদের জন্য মেয়াদ ৫ বছর, তাই ওই বয়স বাছলে ১০ বছরের অপশন বন্ধ হয়ে যায়।",
        ],
      },
      {
        h: "ডেলিভারির সময় ও ফি জমা",
        p: [
          "প্রকাশিত তথ্য অনুযায়ী সাধারণ ডেলিভারিতে প্রায় ১৫–২১ কর্মদিবস, জরুরিতে ৭–১০ কর্মদিবস এবং অতি জরুরিতে ২ কর্মদিবস লাগে। এগুলো আনুমানিক, বর্তমান সময় অফিসিয়াল পোর্টালে দেখে নিন।",
          "অনলাইন আবেদনের ধাপে অফিসিয়াল ই-পাসপোর্ট পোর্টালের নির্দেশনা অনুযায়ী ফি জমা দিতে হয়, যেমন এ-চালান বা ব্যাংকের মাধ্যমে। কোনো দালাল বা অনানুষ্ঠানিক উৎসকে টাকা দেবেন না।",
        ],
      },
      {
        h: "আবেদনের আগে যা মনে রাখবেন",
        p: [
          "এই ফি তালিকা ১২ জুলাই ২০২৬ তারিখের সরকারি তালিকা অনুযায়ী প্রকাশিত তথ্য থেকে নেওয়া। ফি বদলাতে পারে, তাই আবেদনের আগে অফিসিয়াল পোর্টাল epassport.gov.bd এ মিলিয়ে নিন।",
          "শিশু, নবায়ন, জরুরি পাসপোর্ট, বিদেশের দূতাবাস এবং NOC এর মতো বিশেষ ছাড়ের ক্ষেত্রে ফি আলাদা হতে পারে, এই টুল সেগুলো ধরে না। এটি একটি স্বাধীন ওয়েবসাইট, কোনো সরকারি সংস্থার সঙ্গে যুক্ত নয়।",
        ],
      },
    ],
    en: [
      {
        h: "How to check the e-passport fee",
        p: [
          "Choose the applicant's age group, the booklet pages (48 or 64), the validity (5 or 10 years) and the delivery type (regular, express or super express) to see the total fee, the base fee, the VAT, the estimated time and the cost per year. All fees include 15% VAT.",
          "Tap any cell in the table below and the calculator above switches to that fee, so you can easily compare how much extra each option costs.",
        ],
      },
      {
        h: "All fees at a glance (15% VAT included)",
        p: [
          "48 pages, 5 years: regular 4,025 taka, express 6,325 taka, super express 8,625 taka. 48 pages, 10 years: regular 5,750 taka, express 8,050 taka, super express 10,350 taka.",
          "64 pages, 5 years: regular 6,325 taka, express 8,625 taka, super express 12,075 taka. 64 pages, 10 years: regular 8,050 taka, express 10,350 taka, super express 13,800 taka.",
        ],
      },
      {
        h: "Base fee and VAT",
        p: [
          "Every fee includes 15% VAT. For example, a 48 page, 5 year regular passport has a base fee of 3,500 taka plus 525 taka VAT, 4,025 taka in total. A 64 page, 10 year super express passport has a base fee of 12,000 taka plus 1,800 taka VAT, 13,800 taka in total.",
        ],
      },
      {
        h: "5 years or 10 years",
        p: [
          "A 10 year passport costs more up front but less per year. For a 48 page regular passport, 5 years works out to about 805 taka a year and 10 years to about 575 taka a year. For 64 pages it is about 1,265 and 805 taka.",
          "Published information says the validity is 5 years for people under 18 and over 65, so the 10 year option is turned off when you pick that age group.",
        ],
      },
      {
        h: "Delivery time and paying the fee",
        p: [
          "Published sources give roughly 15 to 21 working days for regular delivery, 7 to 10 for express and 2 for super express. These are estimates, so check the official portal for current times.",
          "You pay the fee as the official e-passport portal instructs during the online application, for example through A-Challan or a bank. Do not pay any broker or unofficial source.",
        ],
      },
      {
        h: "Before you apply",
        p: [
          "This fee list is taken from published information quoting the official schedule updated 12 July 2026. Fees can change, so confirm them on the official portal, epassport.gov.bd, before you apply.",
          "Fees can differ for children, renewals, emergency passports, overseas missions and special concessions such as NOC, and this tool does not cover them. This is an independent website and is not connected to any government body.",
        ],
      },
    ],
  },

  "bdt-currency-converter": {
    bn: [
      {
        h: "টাকার রেট কীভাবে কনভার্ট করবেন",
        p: [
          "পরিমাণ লিখে কোন মুদ্রা থেকে কোন মুদ্রায় বদলাবেন তা বেছে নিন। টাকা, মার্কিন ডলার, সৌদি রিয়াল, UAE দিরহাম, ভারতীয় রুপি, ইউরো, পাউন্ডসহ কয়েকটি মুদ্রা আছে। মাঝের তীর বাটনে চাপ দিলে দুই মুদ্রা অদলবদল হয়।",
          "ফলাফলের নিচে ১ একক মুদ্রার রেট ও রেটের তারিখ দেখানো হয়। রেট দিনে একবার আপডেট হয়।",
        ],
      },
      {
        h: "এই রেট আর ব্যাংকের রেটের পার্থক্য",
        p: [
          "এখানে দেখানো রেট মধ্যবর্তী (রেফারেন্স) রেট। ব্যাংক, এক্সচেঞ্জ হাউস বা মানি চেঞ্জার নিজেদের কেনা ও বেচার রেট ব্যবহার করে, যা এর থেকে আলাদা হয়। তাই টাকা বদলানো বা রেমিট্যান্স পাঠানোর আগে তাদের রেট দেখে নিন।",
          "রেট আনার জন্য ইন্টারনেট লাগে। আপনার লেখা পরিমাণ কোথাও পাঠানো হয় না।",
        ],
      },
      {
        h: "প্রবাসীদের জন্য মুদ্রার রেট",
        p: [
          "টুলে সৌদি রিয়াল, দিরহাম, কাতারি রিয়াল, কুয়েতি দিনার, ওমানি রিয়াল, বাহরাইনি দিনার ও মালয়েশিয়ান রিংগিত আছে। প্রতিটি মুদ্রা থেকে টাকার জন্য আলাদা পাতাও আছে, যেমন SAR to BDT, AED to BDT ও KWD to BDT।",
          "কুয়েতি ও ওমানি মুদ্রার মান বেশি, তাই রেটে সামান্য পরিবর্তনেও টাকার অঙ্কে বড় ফারাক হয়। টাকা পাঠানোর আগে রেটের তারিখ দেখে নিন।",
        ],
      },
      {
        h: "সাধারণ পরিমাণের টেবিল ও আজকের রেট",
        p: [
          "ফলাফলের নিচে ১, ৫, ১০, ৫০, ১০০, ৫০০, ১,০০০, ৫,০০০ ও ১০,০০০ এককের হিসাব দেখা যায়। যেকোনো সারিতে চাপ দিলে সেই পরিমাণ কনভার্টারে বসে যায়। এর নিচে প্রধান মুদ্রাগুলোর আজকের টাকার রেট একসঙ্গে দেওয়া আছে।",
          "বাংলাদেশ ব্যাংক প্রতিদিন ডলারের বিড, আস্ক ও গড় রেট প্রকাশ করে। টুলের নিচে তাদের রেট পাতার লিংক আছে, যাতে সরকারি রেটের সঙ্গে মিলিয়ে দেখতে পারেন।",
        ],
      },
    ],
    en: [
      {
        h: "How to convert currency",
        p: [
          "Enter an amount and choose which currency to convert from and to. Taka, US dollar, Saudi riyal, UAE dirham, Indian rupee, euro and pound are among the currencies available. Tap the arrow button in the middle to swap the two currencies.",
          "Below the result you see the rate for 1 unit and the date of the rate. The rates update once a day.",
        ],
      },
      {
        h: "How this differs from a bank's rate",
        p: [
          "The rate shown here is a mid-market (reference) rate. Banks, exchange houses and money changers use their own buying and selling rates, which differ from it. Check their rates before you exchange money or send remittance.",
          "An internet connection is needed to fetch the rates. The amount you type is never sent anywhere.",
        ],
      },
      {
        h: "Rates for Bangladeshis abroad",
        p: [
          "The tool includes the Saudi riyal, UAE dirham, Qatari riyal, Kuwaiti dinar, Omani rial, Bahraini dinar and Malaysian ringgit. Each also has its own page for converting to taka, such as SAR to BDT, AED to BDT and KWD to BDT.",
          "The Kuwaiti and Omani currencies are high in value, so a small change in the rate moves the taka amount a lot. Check the rate date before you send money.",
        ],
      },
      {
        h: "Common amounts and today's rates",
        p: [
          "Below the result you see 1, 5, 10, 50, 100, 500, 1,000, 5,000 and 10,000 units converted. Tap a row to put that amount into the converter. Under it, today's taka rate for the main currencies is listed together.",
          "Bangladesh Bank publishes a dollar bid, ask and average rate every day. A link to its rate page sits below the tool so you can compare with the official figure.",
        ],
      },
    ],
  },

  "electricity-bill-calculator-bd": {
    bn: [
      {
        h: "বিদ্যুৎ বিল কীভাবে হিসাব হয়",
        p: [
          "আবাসিক বিল তিনটি অংশ নিয়ে হয়: ইউনিট অনুযায়ী বিদ্যুতের মূল্য, অনুমোদিত লোড অনুযায়ী ডিমান্ড চার্জ, এবং এই দুটির যোগফলের ওপর ৫% ভ্যাট। ইউনিটের মূল্য স্ল্যাব ধরে হয়, প্রতিটি রেট শুধু ওই স্ল্যাবের ইউনিটে লাগে।",
          "উদাহরণ: ২০০ ইউনিট ও ১ kW লোড হলে প্রথম ৭৫ ইউনিট ৫.২৬ টাকায় (৩৯৪.৫০), পরের ১২৫ ইউনিট ৮.৫০ টাকায় (১,০৬২.৫০) ধরে বিদ্যুতের মূল্য ১,৪৫৭ টাকা। এর সঙ্গে ডিমান্ড চার্জ ৪২ টাকা যোগ করে ১,৪৯৯ টাকার ওপর ৫% ভ্যাট ৭৪.৯৫ টাকা, মোট ১,৫৭৩.৯৫ টাকা।",
        ],
      },
      {
        h: "বিলের সঙ্গে মিলিয়ে নিন",
        p: [
          "এই টুলে জুন ২০২৬ বিলিং থেকে কার্যকর আবাসিক (LT-A) রেট ধরা হয়েছে। বিইআরসি ৩ জুনের বাড়তি দাম ৫০ ও ৭৫ ইউনিটের স্ল্যাবের জন্য ৪ জুন প্রত্যাহার করেছে, তাই লাইফলাইন (৫০ ইউনিট বা কম) রেট ৪.৬৩ ও প্রথম স্ল্যাব ৫.২৬ টাকাই আছে।",
          "ডিমান্ড চার্জ প্রতি kW ৪২ টাকা ধরা হয়েছে, তবে আপনার বিলে আলাদা হতে পারে, তাই ঘরটি বদলানো যায়। মিটার ভাড়া, বকেয়া, দেরির জরিমানা ও রিবেট ধরা হয়নি, তাই প্রকৃত বিল কিছুটা আলাদা হতে পারে। প্রকৃত বিলই চূড়ান্ত।",
        ],
      },
      {
        h: "১০০, ২০০, ৩০০ ও ৫০০ ইউনিটে কত বিল",
        p: [
          "১ kW লোড, ডিমান্ড চার্জ ৪২ টাকা ও ৫% ভ্যাটসহ আবাসিক বিল ১০০ ইউনিটে প্রায় ৬৮১.৪৫ টাকা, ২০০ ইউনিটে ১,৫৭৩.৯৫ টাকা, ৩০০ ইউনিটে ২,৫২৯.৪৫ টাকা এবং ৫০০ ইউনিটে ৫,১১৫.৬০ টাকা। ৪০০ ইউনিটের পর রেট ৯.৬২ থেকে ১৫.০১ টাকা হয়, তাই ৫০০ ইউনিটে বিল হঠাৎ অনেক বেড়ে যায়।",
          "টুলের নিচের টেবিলে ৫০ থেকে ১০০০ ইউনিটের পুরো হিসাব আছে। যেকোনো সারিতে চাপ দিলে ওপরের ক্যালকুলেটরে সেই ইউনিটের বিস্তারিত ভাগ দেখাবে।",
        ],
      },
      {
        h: "টাকা থেকে ইউনিট ও প্রিপেইড রিচার্জ",
        p: [
          "বিলের টাকা জানা থাকলে “টাকা → ইউনিট” ট্যাবে ভ্যাট ও ডিমান্ড চার্জ বাদ দিয়ে ইউনিট বের হয়। প্রিপেইড মিটার হলে “প্রিপেইড রিচার্জ” ট্যাবে রিচার্জের টাকা দিলে আনুমানিক ইউনিট দেখা যায়। মাসের প্রথম রিচার্জে ডিমান্ড চার্জ কাটতে পারে বলে তখন কিছু ইউনিট কম আসে।",
          "নিয়মগুলো ধাপে ধাপে বুঝতে আমাদের “বিদ্যুৎ বিলের টাকা থেকে ইউনিট”, “প্রিপেইড মিটারে রিচার্জে কত ইউনিট” ও “বিদ্যুৎ বিল হঠাৎ বেশি এলে” গাইডগুলো দেখুন।",
        ],
      },
    ],
    en: [
      {
        h: "How an electricity bill is worked out",
        p: [
          "A residential bill has three parts: the energy charge based on units used, the demand charge based on your sanctioned load, and 5% VAT on the sum of those two. The energy charge is worked out slab by slab, and each rate applies only to the units inside its slab.",
          "Example: with 200 units and a 1 kW load, the first 75 units are charged at 5.26 taka (394.50) and the next 125 at 8.50 taka (1,062.50), so the energy charge is 1,457 taka. Adding a demand charge of 42 taka gives 1,499 taka, and 5% VAT of 74.95 makes the total 1,573.95 taka.",
        ],
      },
      {
        h: "Check it against your bill",
        p: [
          "This tool uses the residential (LT-A) rates effective from the June 2026 billing month. BERC withdrew its 3 June hike for the 0-50 and 0-75 unit slabs on 4 June, so the lifeline rate (50 units or fewer) stays at 4.63 taka and the first slab at 5.26 taka.",
          "The demand charge is set at 42 taka per kW, but your bill may differ, so the field can be changed. Meter rent, arrears, late fees and rebates are not included, so your actual bill can be a little different. The bill you receive is final.",
        ],
      },
      {
        h: "What the bill is for 100, 200, 300 and 500 units",
        p: [
          "With a 1 kW load, a 42 taka demand charge and 5% VAT, a residential bill is about 681.45 taka for 100 units, 1,573.95 for 200 units, 2,529.45 for 300 units and 5,115.60 for 500 units. After 400 units the rate goes from 9.62 to 15.01 taka, so the bill rises sharply at 500 units.",
          "The table under the tool lists every figure from 50 to 1000 units. Tap any row and the calculator above shows the detailed breakdown for that number of units.",
        ],
      },
      {
        h: "Taka to units and prepaid recharge",
        p: [
          "If you know the bill amount, the Taka to Units tab removes VAT and the demand charge and gives the units. On a prepaid meter, the Prepaid recharge tab turns a recharge amount into estimated units. The first recharge of the month may also pay the demand charge, so it buys a few units less.",
          "To follow the rules step by step, read our guides on finding units from a bill amount, how many units a prepaid recharge gets you, and why a bill suddenly jumps.",
        ],
      },
    ],
  },

  "number-to-words-bd": {
    bn: [
      {
        h: "টাকার অঙ্ক কথায় লেখার সহজ উপায়",
        p: [
          "অঙ্ক লিখলে টুল বাংলা ও ইংরেজি কথা দেখায়। 'টাকা' বেছে রাখলে ফল 'বারো লাখ চৌত্রিশ হাজার পাঁচশ সাতষট্টি টাকা পঞ্চাশ পয়সা মাত্র'-এর মতো হয়। 'সাধারণ সংখ্যা' বেছে নিলে টাকা-পয়সা ছাড়া শুধু সংখ্যার কথা পাবেন, দশমিক থাকলে অঙ্ক ধরে ধরে পড়া হয়।",
          "কমা ও বাংলা অঙ্ক দুটোই চলে, তাই ১২,৩৪,৫৬৭ লিখলেও সমস্যা নেই। পূর্ণ সংখ্যায় ১৪ অঙ্ক পর্যন্ত নেওয়া হয়।",
        ],
      },
      {
        h: "চেকে কথায় লেখার নিয়ম",
        p: [
          "চেকে অঙ্কের পাশাপাশি কথায় টাকার পরিমাণ লিখতে হয়, শেষে 'মাত্র' দিয়ে। কথায় লেখা অঙ্ক সাধারণত প্রাধান্য পায়, তবে অঙ্ক ও কথায় অমিল থাকলে ব্যাংক চেক ফেরত দিতে পারে। তাই দুটো ঠিকমতো মিলিয়ে নিন।",
          "কথার আগে-পরে ফাঁকা না রেখে লিখুন বা সরলরেখা টেনে দিন, যাতে পরে কেউ কিছু যোগ করতে না পারে। বিস্তারিত নিয়ম আপনার ব্যাংকের কাছে জেনে নিন। ইংরেজিতে লিখলে UPPERCASE বাটনে বড় হাতের অক্ষর পাবেন।",
        ],
      },
      {
        h: "লাখ-কোটি ও মিলিয়ন-বিলিয়ন",
        p: [
          "বাংলাদেশে সংখ্যা পড়া হয় হাজার, লাখ ও কোটি দিয়ে, আর কমা বসে শেষ তিন অঙ্কের পর, তারপর দুই অঙ্ক পরপর (১২,৩৪,৫৬৭)। আন্তর্জাতিক পদ্ধতিতে মিলিয়ন ও বিলিয়ন ব্যবহার হয় এবং কমা বসে তিন অঙ্ক পরপর (1,234,567)।",
          "১ মিলিয়ন = ১০ লাখ এবং ১ বিলিয়ন = ১০০ কোটি। টুল একই সংখ্যার ইংরেজি কথা দুই পদ্ধতিতেই দেখায়, আর নিচে বাংলা অঙ্ক, লাখ-কোটি কমা ও আন্তর্জাতিক কমাও দেখায়।",
        ],
      },
      {
        h: "শূন্যের হিসাব",
        p: [
          "১ লাখে ৫টি শূন্য (১,০০,০০০), ১০ লাখে ৬টি, ১ কোটিতে ৭টি (১,০০,০০,০০০) এবং ১০ কোটিতে ৮টি শূন্য। শূন্য গুনতে ভুল হলে টাকার অঙ্ক বদলে যায়, তাই বড় অঙ্কে কথায় একবার মিলিয়ে দেখা ভালো।",
        ],
      },
      {
        h: "অনেক সংখ্যা ও ফোন নম্বর",
        p: [
          "'অনেক সংখ্যা' ট্যাবে প্রতি লাইনে একটি করে সংখ্যা দিন (সর্বোচ্চ ১০০টি)। প্রতিটির বাংলা ও ইংরেজি কথা দেখা যাবে এবং একবারে সব কপি করা যাবে। বিল, ভাউচার বা তালিকার জন্য এটি কাজে লাগে।",
          "'ফোন নম্বর' ট্যাবে প্রতিটি অঙ্ক আলাদা করে পড়া হয়, যেমন ০১৭ = শূন্য এক সাত। শুরুতে + থাকলে 'প্লাস' লেখা হয়।",
        ],
      },
      {
        h: "বানান নিয়ে সতর্কতা",
        p: [
          "টুল 'একশ, দুইশ, তিনশ' রূপ ব্যবহার করে। কেউ কেউ 'একশো' বা 'একশত' লেখেন। আপনার ব্যাংক বা প্রতিষ্ঠানের নিয়ম অনুযায়ী দরকারে বদলে নিন। গুরুত্বপূর্ণ কাগজে লেখার আগে বানান একবার মিলিয়ে নিন। আপনার দেওয়া সংখ্যা কোথাও জমা হয় না, সব রূপান্তর ব্রাউজারেই হয়।",
        ],
      },
    ],
    en: [
      {
        h: "An easy way to write a taka amount in words",
        p: [
          "Enter the figures and the tool shows the words in Bangla and English. With 'Taka' selected the result reads like 'Twelve Lakh Thirty Four Thousand Five Hundred Sixty Seven Taka Fifty Paisa Only'. With 'Plain number' you get just the number in words, and any decimals are read digit by digit.",
          "Commas and Bangla digits both work, so 12,34,567 is fine. Up to 14 digits are accepted in the whole part.",
        ],
      },
      {
        h: "Rules for writing words on a cheque",
        p: [
          "On a cheque you write the amount in words as well as figures, ending with 'Only'. The amount in words usually takes priority, but if the figures and words differ the bank may return the cheque. So make sure they match.",
          "Write the words with no gap before or after, or draw a line, so nothing can be added later. Ask your bank for the exact rules. For English, the UPPERCASE button gives capital letters.",
        ],
      },
      {
        h: "Lakh-crore and million-billion",
        p: [
          "In Bangladesh numbers are read with thousand, lakh and crore, and commas go after the last three digits and then every two digits (12,34,567). The international system uses million and billion with commas every three digits (1,234,567).",
          "1 million = 10 lakh and 1 billion = 100 crore. The tool shows the English words for the same number in both systems, and below it the Bangla digits, lakh-crore commas and international commas.",
        ],
      },
      {
        h: "Counting the zeros",
        p: [
          "1 lakh has 5 zeros (1,00,000), 10 lakh has 6, 1 crore has 7 (1,00,00,000) and 10 crore has 8. A mistake in the zeros changes the amount, so for large figures it is good to check the words once.",
        ],
      },
      {
        h: "Many numbers and phone numbers",
        p: [
          "In the 'Many numbers' tab, enter one number per line (up to 100). You see the Bangla and English words for each and can copy them all at once. It helps with bills, vouchers and lists.",
          "The 'Digits' tab reads each digit separately, such as 017 = Zero One Seven. A leading + is written as 'Plus'.",
        ],
      },
      {
        h: "A note on spelling",
        p: [
          "The tool uses forms like 'একশ, দুইশ, তিনশ'. Some people write 'একশো' or 'একশত'. Change it to match your bank or organisation. Check the spelling once before writing on an important document. The numbers you enter are not stored anywhere, and all conversion happens in your browser.",
        ],
      },
    ],
  },
  "zakat-calculator-bd": {
    bn: [
      {
        h: "যাকাত ক্যালকুলেটর বাংলাদেশ: কীভাবে হিসাব হয়",
        p: [
          "এই টুলে আপনার নগদ টাকা, ব্যাংকে জমা, সোনা ও রুপার বাজার মূল্য, ব্যবসার মজুত এবং ফেরত পাওয়ার মতো পাওনা যোগ করা হয়, তারপর আপনার ঋণ বাদ দিয়ে নিট সম্পদ বের হয়। নিট সম্পদ নিসাবের সমান বা বেশি হলে তার ২.৫% যাকাত হিসেবে দেখায়।",
          "সোনা বা রুপার ওজন ভরি, আনা ও রতিতে জানা থাকলে টুলের ঐচ্ছিক অংশে সেটি দিন। আজকের প্রতি ভরির দাম দিলে টুল নিজেই মূল্য বের করে সোনা বা রুপার ঘরে বসিয়ে দেয়।",
        ],
      },
      {
        h: "নিসাব কত এবং ভরি-গ্রামের হিসাব",
        p: [
          "নিসাব হলো যাকাত ফরজ হওয়ার ন্যূনতম সম্পদ। এটি ৭.৫ ভরি সোনা অথবা ৫২.৫ ভরি রুপার দামের সমান ধরা হয়। ১ ভরি ১১.৬৬৪ গ্রাম ধরলে ৭.৫ ভরি সোনা ৮৭.৪৮ গ্রাম এবং ৫২.৫ ভরি রুপা ৬১২.৩৬ গ্রাম।",
          "১ ভরি = ১৬ আনা = ৯৬ রতি, অর্থাৎ ১ আনা = ০.৭২৯ গ্রাম এবং ১ রতি = ০.১২১৫ গ্রাম। সোনা-রুপার দাম রোজ বদলায়, তাই নিসাবের টাকার অঙ্কও বদলায়। বাজুসের আজকের দাম দেখে প্রতি ভরির দাম লিখুন।",
          "রুপার নিসাবের দাম সোনার চেয়ে অনেক কম, তাই রুপা দিয়ে ধরলে বেশি মানুষের ওপর যাকাত আসে। কোনটি ধরবেন তা নিয়ে আলিমদের মত আছে। আপনার স্থানীয় আলিমের পরামর্শ নিন।",
        ],
      },
      {
        h: "কোন সম্পদে যাকাত লাগে",
        p: [
          "সাধারণভাবে নগদ টাকা, ব্যাংকে জমা, সোনা ও রুপা (গয়নাসহ, হানাফি মতে), ব্যবসার পণ্য ও মজুত, ফেরত পাওয়ার মতো পাওনা এবং অন্যান্য সঞ্চয় ও বিনিয়োগ যাকাতের হিসাবে ধরা হয়।",
          "যে বাড়িতে থাকেন, ব্যক্তিগত কাজে ব্যবহারের গাড়ি, আসবাব ও পোশাকে যাকাত লাগে না। তবে ব্যবসার উদ্দেশ্যে কেনা জমি বা পণ্যে লাগে। FDR, DPS বা শেয়ারের মতো বিনিয়োগের ক্ষেত্রে বিস্তারিত নিয়ম আলিমের কাছ থেকে জেনে নিন।",
        ],
      },
      {
        h: "উদাহরণ: যাকাত কত হয়",
        p: [
          "ধরুন নগদ ও ব্যাংকে জমা ১,৫০,০০০ টাকা, সোনার মূল্য ২,০০,০০০ টাকা এবং ফেরত পাওয়ার মতো পাওনা ৫০,০০০ টাকা। মোট সম্পদ ৪,০০,০০০ টাকা। এখান থেকে ৬০,০০০ টাকা ঋণ বাদ দিলে নিট সম্পদ ৩,৪০,০০০ টাকা।",
          "নিট সম্পদ নিসাবের সমান বা বেশি হলে যাকাত = ৩,৪০,০০০ × ২.৫% = ৮,৫০০ টাকা। সহজ হিসাবে, নিট সম্পদ নিসাব পরিমাণ হলে ১ লাখ টাকায় ২,৫০০, ৫ লাখে ১২,৫০০ এবং ১০ লাখে ২৫,০০০ টাকা। নিট সম্পদ নিসাবের কম হলে যাকাত ফরজ হয় না।",
        ],
      },
      {
        h: "এক চান্দ্র বছর ও যাকাত কাকে দেবেন",
        p: [
          "যেদিন আপনার সম্পদ প্রথম নিসাব পরিমাণ হয়, সেদিন থেকে হিজরি পঞ্জিকায় পূর্ণ এক বছর গেলে যাকাত ফরজ হয়। চান্দ্র বছর সৌর বছরের চেয়ে প্রায় ১০-১১ দিন ছোট, তাই প্রতি বছর তারিখ একটু এগিয়ে আসে। টুলের টিক-বক্সে এক বছর পূর্ণ হয়েছে কি না জানিয়ে দিন।",
          "কুরআনে যাকাতের আটটি খাত বলা আছে: ফকির, মিসকিন, যাকাত আদায়ে নিয়োজিত কর্মী, যাদের মন জয় করা প্রয়োজন, দাসমুক্তি, ঋণগ্রস্ত, আল্লাহর পথে এবং মুসাফির। নিজের পিতা-মাতা ও সন্তানকে যাকাত দেওয়া যায় না।",
        ],
      },
      {
        h: "কিছু জরুরি কথা",
        p: [
          "এই টুল একটি সাধারণ হিসাবের সহায়ক, ফতোয়া নয়। মাজহাব ও ব্যক্তিগত অবস্থায় নিয়ম আলাদা হতে পারে। কোনো সন্দেহ থাকলে আপনার স্থানীয় আলিম বা ইসলামী প্রতিষ্ঠানের সঙ্গে কথা বলুন।",
          "আপনার দেওয়া কোনো তথ্য সার্ভারে যায় না, সব হিসাব আপনার ফোন বা ব্রাউজারেই হয়।",
        ],
      },
    ],
    en: [
      {
        h: "Zakat calculator Bangladesh: how it is worked out",
        p: [
          "This tool adds your cash, bank savings, the market value of your gold and silver, business stock and money owed to you that is likely to be repaid, then subtracts your debts to get net wealth. If net wealth is at least the nisab, it shows 2.5% of it as zakat.",
          "If you know your gold or silver weight in vori, ana and roti, enter it in the optional section. Give today's price per vori and the tool works out the value and places it in the gold or silver box for you.",
        ],
      },
      {
        h: "The nisab and the vori-to-gram figures",
        p: [
          "The nisab is the minimum wealth at which zakat becomes due. It is taken as the price of 7.5 vori of gold or 52.5 vori of silver. With 1 vori = 11.664 g, 7.5 vori of gold is 87.48 g and 52.5 vori of silver is 612.36 g.",
          "1 vori = 16 ana = 96 roti, so 1 ana = 0.729 g and 1 roti = 0.1215 g. Gold and silver prices change every day, so the nisab in taka changes too. Type today's per-vori price from BAJUS.",
          "The silver nisab is far lower in value than the gold nisab, so more people owe zakat if silver is used. Scholars differ on which to follow. Ask your local scholar.",
        ],
      },
      {
        h: "Which wealth is counted",
        p: [
          "In general, cash, bank savings, gold and silver (including jewellery under the Hanafi view), business goods and stock, money owed to you that is likely to be repaid, and other savings and investments are counted.",
          "The home you live in, a car for personal use, furniture and clothes are not counted. Land or goods bought for trade are. For investments such as FDR, DPS or shares, ask a scholar for the detailed rules.",
        ],
      },
      {
        h: "Example: how much zakat is due",
        p: [
          "Say you have 1,50,000 taka in cash and bank savings, gold worth 2,00,000 taka and 50,000 taka owed to you that is likely to be repaid. Total wealth is 4,00,000 taka. Subtract 60,000 taka of debts and net wealth is 3,40,000 taka.",
          "If net wealth is at or above the nisab, zakat = 3,40,000 × 2.5% = 8,500 taka. As a quick guide, once the nisab is reached, 1 lakh taka gives 2,500, 5 lakh gives 12,500 and 10 lakh gives 25,000 taka. If net wealth is below the nisab, zakat is not due.",
        ],
      },
      {
        h: "The lunar year and who can receive zakat",
        p: [
          "Zakat becomes due after one full Hijri year has passed since your wealth first reached the nisab. A lunar year is about 10 to 11 days shorter than a solar year, so the date moves earlier each year. Use the tick box in the tool to say whether the year is complete.",
          "The Quran names eight categories: the poor, the needy, zakat collectors, those whose hearts are to be reconciled, freeing slaves, those in debt, in the way of Allah and travellers. Zakat cannot be given to your own parents or children.",
        ],
      },
      {
        h: "A few important points",
        p: [
          "This tool is a general calculation aid, not a religious ruling. Rules can differ by school of thought and personal situation. If you have doubts, speak to your local scholar or an Islamic institution.",
          "Nothing you enter is sent to a server. All calculation happens on your phone or browser.",
        ],
      },
    ],
  },

  "gold-weight-converter-bd": {
    bn: [
      {
        h: "সোনার দাম হিসাব: গয়নার মোট দাম কীভাবে বের হয়",
        p: [
          "সোনার মূল্য = ওজন (ভরি) × প্রতি ভরির দাম। ওজন গ্রামে থাকলে ১১.৬৬৪ দিয়ে ভাগ করে ভরিতে বদলে নেওয়া হয়। এর সঙ্গে জুয়েলার্সের ক্ষয়, মজুরি এবং ভ্যাট যোগ করলে গয়নার মোট দাম পাওয়া যায়।",
          "এই টুলে ক্যারেট বেছে সেই ক্যারেটের প্রতি ভরির দাম লিখুন। প্রতিটি ক্যারেটের দাম আলাদা করে মনে থাকে, তাই ২২ ও ২১ ক্যারেটের দাম পাশাপাশি তুলনা করা সহজ।",
        ],
      },
      {
        h: "২২, ২১ ও ১৮ ক্যারেট কী",
        p: [
          "ক্যারেট সোনার বিশুদ্ধতা মাপে। ২৪ ক্যারেট প্রায় খাঁটি সোনা, কিন্তু খুব নরম বলে গয়নায় সাধারণত কম ক্যারেট ব্যবহার হয়। ২২ ক্যারেটে ২৪ ভাগের ২২ ভাগ সোনা থাকে, ২১ ক্যারেটে ২১ ভাগ আর ১৮ ক্যারেটে ১৮ ভাগ।",
          "বিশুদ্ধতা কম হলে প্রতি ভরির দামও কম হয়। তাই গয়না কেনার সময় ক্যারেট জেনে নিয়ে সেই ক্যারেটের আজকের দাম দিয়ে হিসাব করুন। বাজুসের দামের তালিকায় ক্যারেট অনুযায়ী আলাদা দাম থাকে।",
        ],
      },
      {
        h: "মজুরি, ক্ষয় ও ভ্যাট",
        p: [
          "মজুরি বা মেকিং চার্জ হলো গয়না বানানোর কারিগরি খরচ। কিছু জুয়েলার্স সোনার দামের শতাংশে ধরে, কিছু প্রতি ভরিতে নির্দিষ্ট টাকায়। ক্ষয় বা অপচয় হলো বানানোর সময় নষ্ট হওয়া সোনার বাবদ যোগ করা একটি অংশ। সব দোকান এটি আলাদা করে ধরে না।",
          "এসব নিয়ম জুয়েলার্সভেদে আলাদা, তাই টুলে ঘরগুলো খালি রাখা হয়েছে। কেনার আগে দোকানকে জিজ্ঞেস করে মজুরি, ক্ষয় ও ভ্যাট কীভাবে ধরছে জেনে নিন এবং সেই সংখ্যা বসিয়ে মোট দাম মিলিয়ে দেখুন।",
        ],
      },
      {
        h: "পুরোনো সোনা বিক্রির হিসাব",
        p: [
          "পুরোনো গয়না বিক্রি বা বদল করলে জুয়েলার্স সাধারণত ক্ষয় ও মজুরি বাবদ কিছু অংশ কেটে নেয়। আগে কেনার সময় যে মজুরি দিয়েছিলেন তা ফেরত আসে না। তাই গয়নার ওজনের সোনার মূল্যের চেয়ে কম টাকা পাওয়া স্বাভাবিক।",
          "'বিক্রি' ট্যাবে ওজন, ক্যারেটের আজকের দাম এবং জুয়েলার্সের কর্তন (%) লিখলে আনুমানিক টাকা দেখা যায়। এটি শুধু আন্দাজের জন্য, দোকানে গিয়ে দাম যাচাই করে নিন।",
        ],
      },
      {
        h: "ভরি, আনা, রতি ও গ্রাম",
        p: [
          "বাংলাদেশে সোনা-রুপা ভরি, আনা ও রতিতে মাপা হয়, কিন্তু ওজন যন্ত্রে ও দামের তালিকায় গ্রামও দেখা যায়। ১ ভরি = ১৬ আনা = ৯৬ রতি = ১১.৬৬৪ গ্রাম। তাই ১ আনা = ০.৭২৯ গ্রাম এবং ১ রতি = ০.১২১৫ গ্রাম। যেমন ২ ভরি ৮ আনা ৩ রতি হলো ২৯.৫২৪৫ গ্রাম।",
          "উল্টো দিকে, ১০ গ্রাম সোনা ০.৮৫৭ ভরি, অর্থাৎ ০ ভরি ১৩ আনা প্রায় ৪.৩ রতি। ভরি-গ্রাম ট্যাবে টেবিলসহ দুই দিকেই রূপান্তর করা যায়।",
        ],
      },
      {
        h: "কিছু জরুরি কথা",
        p: [
          "এই টুলে সোনার লাইভ দাম নেই, আপনি বাজুসের আজকের দাম দেখে নিজে লিখবেন। এটি আনুমানিক হিসাবের জন্য। কেনা বা বেচার আগে জুয়েলার্সের বিল ও দাম নিজে মিলিয়ে নিন। আপনার দেওয়া কোনো তথ্য সার্ভারে যায় না।",
        ],
      },
    ],
    en: [
      {
        h: "Gold price calculation: how the total jewellery price is worked out",
        p: [
          "Gold value = weight in vori x price per vori. If the weight is in grams, divide by 11.664 to get vori. Add the jeweller's wastage, making charge and VAT and you get the total price of the jewellery.",
          "In this tool, pick the carat and type that carat's price per vori. Each carat keeps its own price, so it is easy to compare 22K and 21K side by side.",
        ],
      },
      {
        h: "What 22K, 21K and 18K mean",
        p: [
          "Carat measures the purity of gold. 24K is almost pure gold but very soft, so jewellery usually uses a lower carat. 22K has 22 parts of gold in 24, 21K has 21 and 18K has 18.",
          "Lower purity means a lower price per vori. So find out the carat when you buy jewellery and use that carat's price for today. The BAJUS price list shows a separate price for each carat.",
        ],
      },
      {
        h: "Making charge, wastage and VAT",
        p: [
          "The making charge is the cost of crafting the jewellery. Some jewellers charge a percentage of the gold value and some a fixed amount per vori. Wastage is an amount added for gold lost while making the piece. Not every shop charges it separately.",
          "These rules differ between jewellers, so the boxes in the tool start empty. Ask the shop how it applies making charge, wastage and VAT, enter those figures and check the total against the bill.",
        ],
      },
      {
        h: "Estimating the cash for old gold",
        p: [
          "When you sell or exchange old jewellery, the jeweller usually deducts something for wastage and making. The making charge you paid when you bought it is not returned. So getting less than the gold value of your weight is normal.",
          "In the Sell tab, enter the weight, today's price for the carat and the jeweller's deduction (%) to see an estimate. It is only a guide, so confirm the price at the shop.",
        ],
      },
      {
        h: "Vori, ana, roti and grams",
        p: [
          "In Bangladesh gold and silver are weighed in vori, ana and roti, while scales and price lists often show grams. 1 vori = 16 ana = 96 roti = 11.664 grams, so 1 ana = 0.729 g and 1 roti = 0.1215 g. For example 2 vori 8 ana 3 roti is 29.5245 grams.",
          "In the other direction, 10 grams of gold is 0.857 vori, which is 0 vori 13 ana and about 4.3 roti. The Convert tab does both directions and includes a table.",
        ],
      },
      {
        h: "A few important points",
        p: [
          "This tool has no live gold price, so type today's price from BAJUS yourself. It is for estimates. Check the jeweller's bill and price yourself before you buy or sell. Nothing you enter is sent to a server.",
        ],
      },
    ],
  },

  "income-tax-calculator-bd": {
    bn: [
      {
        h: "আয়কর কীভাবে হিসাব হয়",
        p: [
          "এই টুলে আপনার করযোগ্য আয় থেকে করমুক্ত সীমা বাদ যায়। সীমার ওপরের আয় ধাপে ধাপে করের আওতায় পড়ে: প্রথম ৩ লাখে ১০%, পরের ৪ লাখে ১৫%, পরের ৫ লাখে ২০%, পরের ২০ লাখে ২৫% এবং বাকিতে ৩০%।",
          "উদাহরণ: সাধারণ করদাতার করযোগ্য আয় ১২,০০,০০০ টাকা হলে করমুক্ত সীমা ৪,০০,০০০ বাদ দিয়ে ৩,০০,০০০ টাকায় ১০% (৩০,০০০), ৪,০০,০০০ টাকায় ১৫% (৬০,০০০) এবং ১,০০,০০০ টাকায় ২০% (২০,০০০), মোট ১,১০,০০০ টাকা কর।",
        ],
      },
      {
        h: "বিনিয়োগ রেয়াত ও ন্যূনতম কর",
        p: [
          "যোগ্য বিনিয়োগ থাকলে কর কমে। এই টুলে রেয়াত ধরা হয় করযোগ্য আয়ের ৩%, বিনিয়োগের ১০% এবং ৭,৫০,০০০ টাকার মধ্যে যেটি সবচেয়ে কম। আয় করমুক্ত সীমার বেশি হলে ন্যূনতম কর (সাধারণত ৫,০০০ টাকা) দিতে হয়।",
          "আয়কর আইন প্রতি বাজেটে বদলায় এবং নারী, প্রবীণ, প্রতিবন্ধী ও মুক্তিযোদ্ধাদের করমুক্ত সীমা আলাদা, তাই এটি আনুমানিক হিসাব। রিটার্ন জমার আগে nbr.gov.bd বা কর পরামর্শকের সঙ্গে মিলিয়ে নিন।",
        ],
      },
    ],
    en: [
      {
        h: "How income tax is worked out",
        p: [
          "This tool takes the tax-free limit off your taxable income. Income above the limit is taxed slab by slab: 10% on the first 3 lakh, 15% on the next 4 lakh, 20% on the next 5 lakh, 25% on the next 20 lakh and 30% on the rest.",
          "Example: for a general taxpayer with 12,00,000 taka taxable income, after the 4,00,000 tax-free limit, 3,00,000 is taxed at 10% (30,000), 4,00,000 at 15% (60,000) and 1,00,000 at 20% (20,000), so the tax is 1,10,000 taka.",
        ],
      },
      {
        h: "Investment rebate and minimum tax",
        p: [
          "Eligible investment reduces your tax. In this tool the rebate is the lowest of 3% of taxable income, 10% of the investment and 7,50,000 taka. If your income is above the tax-free limit, a minimum tax (usually 5,000 taka) applies.",
          "Tax law changes with every budget and women, senior citizens, people with disabilities and freedom fighters have different tax-free limits, so this is only an estimate. Check nbr.gov.bd or a tax adviser before you file.",
        ],
      },
    ],
  },

  "fdr-dps-calculator-bd": {
    bn: [
      {
        h: "এফডিআর ও ডিপিএস এর সুদ",
        p: [
          "এফডিআর এ একবারে টাকা জমা রেখে মেয়াদ শেষে সুদসহ ফেরত পাওয়া যায়। চক্রবৃদ্ধি সুদে প্রতি সুদ-চক্রে যোগ হওয়া সুদের ওপরেও সুদ হয়। বেশিরভাগ ব্যাংক ত্রৈমাসিক চক্রবৃদ্ধি ধরে।",
          "উদাহরণ: ১,০০,০০০ টাকা ৮% সুদে ১২ মাসের এফডিআর এ ত্রৈমাসিক চক্রবৃদ্ধিতে সুদ হয় ৮,২৪৩.২২ টাকা। ১০% উৎসে কর ৮২৪.৩২ টাকা কেটে হাতে পাবেন ১,০৭,৪১৮.৯০ টাকা।",
        ],
      },
      {
        h: "ডিপিএস এর হিসাব ও কর",
        p: [
          "ডিপিএস এ প্রতি মাসে নির্দিষ্ট কিস্তি জমা দিতে হয়। এই টুলে প্রতি মাসের শুরুতে কিস্তি জমা ও মাসিক চক্রবৃদ্ধি ধরা হয়েছে, তবে ব্যাংকভেদে নিয়ম আলাদা হতে পারে।",
          "সুদের ওপর উৎসে কর সাধারণত TIN থাকলে ১০% এবং না থাকলে ১৫%। আবগারি শুল্ক ও ব্যাংকের অন্যান্য চার্জ এখানে ধরা হয়নি, তাই আপনার ব্যাংকের ঘোষিত অঙ্কই চূড়ান্ত।",
        ],
      },
    ],
    en: [
      {
        h: "Interest on FDR and DPS",
        p: [
          "With an FDR you deposit a lump sum and get it back with interest at maturity. With compound interest, the interest added in each period also earns interest. Most banks use quarterly compounding.",
          "Example: a 12 month FDR of 1,00,000 taka at 8% with quarterly compounding earns 8,243.22 taka. After 10% source tax of 824.32 you receive 1,07,418.90 taka.",
        ],
      },
      {
        h: "DPS calculation and tax",
        p: [
          "With a DPS you pay a fixed installment every month. This tool takes each installment at the start of the month with monthly compounding, but banks can differ.",
          "Source tax on interest is generally 10% with a TIN and 15% without. Excise duty and other bank charges are not included, so the figure your bank states is final.",
        ],
      },
    ],
  },

};

// ---------------------------------------------------------------------------
// Extra sections (added 9 Nov 2026): longer how-to and tips text for tools that
// had the shortest articles. These are appended to the entries above.
// ---------------------------------------------------------------------------
const EXTRA: Record<string, ToolArticle> = {
  "scientific-calculator": {
    bn: [
      {
        h: "কোন শিক্ষার্থীর কোন মোড কাজে লাগে",
        p: [
          "এসএসসি ও এইচএসসির গণিত ও পদার্থবিজ্ঞানে COMP মোডই যথেষ্ট: ত্রিকোণমিতি, লগ, ঘাত, বর্গমূল ও ভগ্নাংশ। এইচএসসির উচ্চতর গণিত ও বিশ্ববিদ্যালয়ের প্রথম বর্ষে EQN, MATRIX, VECTOR ও ∫, d/dx কাজে লাগে। পরিসংখ্যান ও অর্থনীতির শিক্ষার্থীদের জন্য STAT, আর কম্পিউটার সায়েন্স ও ইঞ্জিনিয়ারিংয়ের জন্য BASE-N ও CMPLX।",
          "নতুন হলে প্রথমে COMP মোডে সহজ হিসাব চেষ্টা করুন, তারপর SHIFT চেপে হলুদ ফাংশনগুলো দেখুন। কোনো ফাংশন মনে না থাকলে নিচের গাইডগুলোতে উদাহরণসহ ব্যাখ্যা পাবেন।",
        ],
      },
    ],
    en: [
      {
        h: "Which mode suits which student",
        p: [
          "For SSC and HSC maths and physics, COMP mode is enough: trigonometry, logs, powers, roots and fractions. For HSC higher maths and first-year university, EQN, MATRIX, VECTOR and ∫, d/dx help. Statistics and economics students can use STAT, and computer science and engineering students can use BASE-N and CMPLX.",
          "If you are new, try simple sums in COMP first, then press SHIFT to see the amber functions. If you forget a function, the guides below explain it with examples.",
        ],
      },
    ],
  },
  "case-converter": {
    bn: [
      { h: "কোন ধরনের কেস কোথায় লাগে", p: [
        "UPPERCASE সম্পূর্ণ বড় হাতের অক্ষর, lowercase সম্পূর্ণ ছোট হাতের। Title Case এ প্রতিটি শব্দের প্রথম অক্ষর বড় হয়, যা শিরোনামের জন্য ভালো। Sentence case এ বাক্যের প্রথম অক্ষর বড় হয়, যা সাধারণ লেখার জন্য ঠিক।",
        "প্রোগ্রামিংয়ে নামের জন্য camelCase, snake_case ও kebab-case চলে। aLtErNaTiNg কেস মজার লেখা বা মিমের জন্য। উদাহরণ: hello world থেকে Title Case এ Hello World, camelCase এ helloWorld, snake_case এ hello_world এবং kebab-case এ hello-world।",
      ] },
      { h: "ব্যবহারের টিপস", p: [
        "ক্যাপস লক চালু রেখে পুরো অনুচ্ছেদ লিখে ফেললে নতুন করে না লিখে lowercase বা Sentence case বাটন চাপুন। রূপান্তরের পর Copy বাটনে ট্যাপ করে অন্য জায়গায় পেস্ট করুন।",
        "বাংলা অক্ষরে বড় বা ছোট হাতের ধারণা নেই, তাই এই টুল মূলত ইংরেজি লেখার জন্য কাজ করে।",
      ] },
    ],
    en: [
      { h: "Which case is used where", p: [
        "UPPERCASE is all capital letters and lowercase is all small letters. Title Case capitalises the first letter of every word, which suits headings. Sentence case capitalises the first letter of a sentence, which suits normal writing.",
        "In programming, camelCase, snake_case and kebab-case are used for names. aLtErNaTiNg case is for fun text or memes. Example: hello world becomes Hello World in Title Case, helloWorld in camelCase, hello_world in snake_case and hello-world in kebab-case.",
      ] },
      { h: "Tips", p: [
        "If you typed a whole paragraph with Caps Lock on, press lowercase or Sentence case instead of retyping it. After converting, tap Copy and paste the text where you need it.",
        "Bangla letters have no upper and lower case, so this tool is mainly for English text.",
      ] },
    ],
  },
  "todo-list": {
    bn: [
      { h: "কীভাবে ব্যবহার করবেন", p: [
        "ঘরে কাজের নাম লিখে যোগ করুন চাপুন। কাজ শেষ হলে সম্পন্ন চিহ্ন দিন, আর দরকার না হলে মুছুন বাটন চাপুন। ওপরের সব, বাকি ও শেষ ট্যাব দিয়ে তালিকা ছেঁকে দেখা যায়। শেষ হওয়া কাজগুলো একসঙ্গে সরাতে শেষ হওয়াগুলো মুছুন বাটন আছে।",
        "তালিকা শুধু আপনার ফোন বা ব্রাউজারে সেভ থাকে এবং কোথাও পাঠানো হয় না। তাই ইন্টারনেট ছাড়া কাজ দেখতে পারবেন, তবে ব্রাউজারের ডেটা মুছলে তালিকাও মুছে যাবে।",
      ] },
      { h: "কাজ গুছিয়ে রাখার ছোট টিপস", p: [
        "বড় কাজকে ছোট ছোট ধাপে ভাগ করে আলাদা আইটেম হিসেবে লিখুন, যেমন \"অ্যাসাইনমেন্ট\" না লিখে \"অ্যাসাইনমেন্টের তথ্য জোগাড়\", \"খসড়া লেখা\", \"জমা দেওয়া\"। প্রতিদিন সকালে অল্প কয়েকটি জরুরি কাজ রাখুন, যাতে তালিকা বড় হয়ে হতাশা না আনে।",
        "একই তালিকা অন্য ফোনে বা কম্পিউটারে দেখা যাবে না, কারণ তা প্রতিটি ডিভাইসের নিজস্ব ব্রাউজারে থাকে।",
      ] },
    ],
    en: [
      { h: "How to use it", p: [
        "Type the task name in the box and press Add. Mark a task as done when finished and press Delete if you no longer need it. The All, Active and Done tabs at the top filter the list, and Clear completed removes all finished tasks at once.",
        "The list is saved only on your phone or browser and is not sent anywhere. So you can view it without internet, but clearing your browser data also clears the list.",
      ] },
      { h: "Small tips for staying organised", p: [
        "Break a big job into small steps and write each as a separate item, for example \"gather assignment material\", \"write the draft\" and \"submit\" instead of just \"assignment\". Keep only a few important tasks each morning so the list does not grow into a source of stress.",
        "The same list will not show on another phone or computer, because it lives in each device's own browser.",
      ] },
    ],
  },
  "lorem-ipsum-generator": {
    bn: [
      { h: "Lorem Ipsum কী এবং কেন ব্যবহার হয়", p: [
        "Lorem Ipsum হলো ল্যাটিন ধাঁচের নমুনা লেখা, যা ডিজাইন ও ওয়েবসাইটে আসল লেখা বসার আগে জায়গা ভরাতে ব্যবহার হয়। এতে পাঠক লেখার অর্থ নিয়ে ভাবেন না, ডিজাইনের বিন্যাস ও ফন্টের দিকে মন দিতে পারেন।",
        "এই টুলে প্যারাগ্রাফ, বাক্য বা শব্দ, এই তিন ধরন থেকে একটি বেছে কতগুলো চান লিখুন, তারপর নতুন বাটনে ঢুকিয়ে Copy করে নিন।",
      ] },
      { h: "কখন কাজে লাগে এবং সতর্কতা", p: [
        "ওয়েবসাইট বা অ্যাপের ডিজাইন, ব্যানার, ব্লগ টেমপ্লেট, বইয়ের লেআউট এবং প্রিন্ট করার নমুনায় এটি কাজে লাগে। ডেভেলপাররাও টেক্সট ফিল্ড পরীক্ষা করতে এটি ব্যবহার করেন।",
        "লাইভ সাইটে নমুনা লেখা রেখে দেবেন না। সাইট প্রকাশের আগে সব জায়গায় আসল লেখা বসিয়ে নিন, নইলে ভিজিটর ও সার্চ ইঞ্জিন দুটোর কাছেই পেজটি অসম্পূর্ণ মনে হবে।",
      ] },
    ],
    en: [
      { h: "What Lorem Ipsum is and why it is used", p: [
        "Lorem Ipsum is Latin-style dummy text used to fill space in designs and websites before the real text is ready. Readers do not get distracted by the meaning, so you can focus on the layout and fonts.",
        "In this tool pick paragraphs, sentences or words, enter how many you want, press New to generate, and Copy the result.",
      ] },
      { h: "When it helps, and a warning", p: [
        "It helps with website and app designs, banners, blog templates, book layouts and print samples. Developers also use it to test text fields.",
        "Do not leave dummy text on a live site. Replace it with real text everywhere before publishing, otherwise the page looks unfinished to both visitors and search engines.",
      ] },
    ],
  },
  "random-number-generator": {
    bn: [
      { h: "তিনটি মোড ও ব্যবহার", p: [
        "সংখ্যা মোডে সর্বনিম্ন ও সর্বোচ্চ সংখ্যা এবং কতগুলো চান লিখুন। প্রতিটি সংখ্যা আলাদা চাইলে সেই অপশন চালু করুন, আর ছোট থেকে বড় সাজাতে সাজানোর অপশন দিন। একসঙ্গে ১ থেকে ১,০০০টি সংখ্যা নেওয়া যায়, এবং সংখ্যাগুলো ১০০ কোটির মধ্যে হতে হবে। সব ফলাফল একবারে Copy করা যায়।",
        "কয়েন টস মোডে হেড বা টেল আসে এবং কতবার কোনটি এল তার গণনা থাকে। ডাইস মোডে কতগুলো পাশ (sides) ও কয়টি ডাইস গড়াবেন ঠিক করে ফল ও মোট পাওয়া যায়।",
      ] },
      { h: "কোথায় কাজে লাগে", p: [
        "ক্লাসে রোল নম্বর বেছে নেওয়া, কুইজ বা র‍্যাফেল ড্র, দলে ভাগ করা, বোর্ড গেমের ডাইস কিংবা সিদ্ধান্ত নিতে না পারলে কয়েন টস, এসব কাজে এটি ব্যবহার করা যায়। উদাহরণ: ১ থেকে ৫০ এর মধ্যে ৫টি আলাদা সংখ্যা চাইলে \"আলাদা\" অপশন চালু রাখুন।",
        "ফলাফল আপনার ব্রাউজারের নিরাপদ র‍্যান্ডম জেনারেটর (crypto) দিয়ে তৈরি হয়। তবে অফিসিয়াল লটারি বা বড় অঙ্কের পুরস্কারের জন্য নির্ধারিত আইনি নিয়ম মানতে হবে।",
      ] },
    ],
    en: [
      { h: "The three modes and how to use them", p: [
        "In the numbers mode enter the minimum, the maximum and how many numbers you want. Turn on the option for every number to be different if you want no repeats, and the sort option to arrange them from smallest to largest. You can take from 1 to 1,000 numbers at a time, and the numbers must be within 1 billion. You can copy all results at once.",
        "The coin flip mode gives heads or tails and keeps a count of each. In the dice mode you choose the number of sides and how many dice to roll, and you get the results and the total.",
      ] },
      { h: "Where it helps", p: [
        "You can use it to pick a roll number in class, run a quiz or raffle draw, split people into teams, roll dice for a board game, or flip a coin when you cannot decide. Example: to get 5 different numbers between 1 and 50, keep the \"different\" option on.",
        "Results come from your browser's secure random generator (crypto). For an official lottery or a large prize, however, you must follow the legal rules that apply.",
      ] },
    ],
  },
  "word-counter": {
    bn: [
      { h: "ধাপে ধাপে ব্যবহার ও উদাহরণ", p: [
        "বাক্সে লেখা পেস্ট করুন বা টাইপ করুন, গণনা সঙ্গে সঙ্গে বদলাবে। বাংলা ও ইংরেজি দুটোই কাজ করে। পড়ার সময় প্রতি মিনিটে ২০০ শব্দ ধরে হিসাব করা, তাই ৪০০ শব্দের লেখা পড়তে প্রায় ২ মিনিট লাগে।",
        "কোনো ফর্ম বা প্রতিযোগিতায় ৫০০ শব্দের সীমা থাকলে লেখা শেষে এখানে মিলিয়ে নিন। জমা দেওয়ার আগে শব্দ ও অক্ষর দুটোই দেখে নেওয়া ভালো।",
      ] },
      { h: "মনে রাখার বিষয়", p: [
        "বিভিন্ন টুল বা প্রোগ্রাম হাইফেন দেওয়া শব্দ, সংখ্যা বা চিহ্ন একটু আলাদাভাবে গোনে, তাই কয়েকটি শব্দের ব্যবধান হতে পারে। কঠোর সীমা থাকলে সীমার চেয়ে একটু কম রাখুন।",
        "অক্ষর গণনায় ফাঁকা স্থান ধরা হবে কি না তা যে ফর্ম বা সাইটে জমা দিচ্ছেন তার নিয়মে দেখে নিন। এই টুলের লেখা আপনার ব্রাউজারেই থাকে, কোথাও জমা হয় না।",
      ] },
    ],
    en: [
      { h: "Step by step, with an example", p: [
        "Paste or type your text in the box and the counts change instantly. Both Bangla and English work. Reading time is worked out at 200 words per minute, so a 400-word text takes about 2 minutes to read.",
        "If a form or competition has a 500-word limit, check your text here when you finish. It is wise to look at both the word and character counts before submitting.",
      ] },
      { h: "Things to remember", p: [
        "Different tools and programs count hyphenated words, numbers and symbols slightly differently, so there can be a gap of a few words. If the limit is strict, stay a little under it.",
        "Whether spaces count in a character total depends on the rules of the form or site you are submitting to, so check those. The text you enter here stays in your browser and is not stored anywhere.",
      ] },
    ],
  },
  "color-picker": {
    bn: [
      { h: "HEX, RGB ও HSL কী", p: [
        "HEX কোড # দিয়ে শুরু হয় এবং তিন জোড়া অঙ্কে লাল, সবুজ ও নীলের পরিমাণ বোঝায়। RGB একই রঙকে ০ থেকে ২৫৫ সংখ্যায় দেখায়। HSL দেখায় রঙের ধরন (hue), ঘনত্ব (saturation) ও উজ্জ্বলতা (lightness)।",
        "উদাহরণ: #4F46E5 মানে লাল ৭৯, সবুজ ৭০, নীল ২২৯, অর্থাৎ rgb(79, 70, 229)। #FFF হলো #FFFFFF এর ছোট রূপ, যা সাদা।",
      ] },
      { h: "কীভাবে ব্যবহার করবেন", p: [
        "রং বাছুন অংশ থেকে রং ধরে নিন, অথবা নিজের HEX কোড লিখুন (যেমন #4F46E5 বা #FFF)। কোড ভুল হলে টুল জানিয়ে দেবে। ফলাফল থেকে HEX, RGB বা HSL কপি করে CSS বা ডিজাইন সফটওয়্যারে বসান।",
        "ওয়েবসাইটের লেখা ও পটভূমির রং বাছাইয়ের সময় লেখাটি পড়তে যেন সুবিধা হয়, সেজন্য গাঢ় পটভূমিতে হালকা লেখা এবং হালকা পটভূমিতে গাঢ় লেখা বেছে নিন।",
      ] },
    ],
    en: [
      { h: "What HEX, RGB and HSL are", p: [
        "A HEX code starts with # and uses three pairs of digits for the amounts of red, green and blue. RGB shows the same colour as numbers from 0 to 255. HSL shows the type of colour (hue), its intensity (saturation) and its brightness (lightness).",
        "Example: #4F46E5 means red 79, green 70, blue 229, which is rgb(79, 70, 229). #FFF is the short form of #FFFFFF, which is white.",
      ] },
      { h: "How to use it", p: [
        "Pick a colour in the Pick a colour area, or type your own HEX code (for example #4F46E5 or #FFF). If the code is invalid, the tool tells you. Copy the HEX, RGB or HSL value from the result into your CSS or design software.",
        "When choosing text and background colours for a website, keep the text easy to read: light text on a dark background, or dark text on a light background.",
      ] },
    ],
  },
  "expense-tracker": {
    bn: [
      { h: "কীভাবে ব্যবহার করবেন", p: [
        "আয় বা খরচ বেছে টাকার পরিমাণ, তারিখ ও ক্যাটাগরি দিন, চাইলে একটি নোট লিখুন, তারপর যোগ করুন চাপুন। ওপরে মোট আয়, মোট খরচ ও ব্যালেন্স দেখা যায়। মাস অনুযায়ী বা সব সময়ের হিসাব দেখা যায়, আর কোন খাতে কত টাকা গেল তার ভাগও দেখানো হয়।",
        "হিসাব শুধু আপনার ফোন বা ব্রাউজারে সেভ থাকে এবং কোথাও পাঠানো হয় না। ব্রাউজারের ডেটা মুছলে হিসাবও মুছে যায়, তাই দরকারে CSV ডাউনলোড করে রাখুন।",
      ] },
      { h: "খরচ নিয়ন্ত্রণের কিছু অভ্যাস", p: [
        "প্রতিদিন রাতে কয়েক মিনিট বসে সেদিনের খরচ লিখে ফেলুন, না হলে ছোট খরচগুলো ভুলে যাওয়া সহজ। মাস শেষে ক্যাটাগরির ভাগ দেখে বুঝে নিন কোন খাতে বেশি যাচ্ছে।",
        "একটি জনপ্রিয় নিয়ম হলো আয়ের প্রায় ৫০% প্রয়োজনে, ৩০% শখ বা ইচ্ছায় এবং ২০% সঞ্চয়ে রাখা। এটি কেবল একটি দিকনির্দেশনা, আপনার পরিস্থিতি অনুযায়ী ভাগ বদলাতে পারেন।",
      ] },
    ],
    en: [
      { h: "How to use it", p: [
        "Choose income or expense, enter the amount, date and category, add a note if you like, and press Add. At the top you see total income, total expense and the balance. You can view the entries by month or for all time, and it also shows how the money was divided across categories.",
        "Your entries are saved only on your phone or browser and are not sent anywhere. Clearing your browser data deletes them, so download a CSV if you want a backup.",
      ] },
      { h: "Habits for controlling spending", p: [
        "Sit down for a few minutes each night and write down the day's spending, otherwise small expenses are easy to forget. At the end of the month look at the category split to see where most of the money goes.",
        "One popular rule is to keep about 50% of income for needs, 30% for wants and 20% for savings. It is only a guide, and you can change the split to suit your situation.",
      ] },
    ],
  },
  "countdown-timer": {
    bn: [
      { h: "কীভাবে ব্যবহার করবেন", p: [
        "ইভেন্টের নাম লিখুন, যেমন পরীক্ষা, বিয়ে বা ট্রিপ। এরপর তারিখ ও সময় বেছে নিন। টুল প্রতি সেকেন্ডে হিসাব করে কত দিন, ঘণ্টা, মিনিট ও সেকেন্ড বাকি তা দেখায়। রিসেট বাটনে নাম ও সময় মুছে নতুন করে শুরু করা যায়।",
        "আপনার দেওয়া নাম ও সময় ব্রাউজারে সেভ থাকে, তাই পেজ বন্ধ করে আবার খুললেও কাউন্টডাউন চলতে থাকবে। এটি কোথাও পাঠানো হয় না।",
      ] },
      { h: "কোথায় কাজে লাগে", p: [
        "পরীক্ষার আগে বাকি সময় দেখা, জন্মদিন বা অনুষ্ঠানের অপেক্ষা, চাকরির আবেদনের শেষ তারিখ, ভ্রমণের তারিখ বা কোনো প্রকল্পের ডেডলাইন মনে রাখতে এটি ভালো কাজ করে।",
        "নির্দিষ্ট সময় পার হয়ে গেলে টুল তা জানিয়ে দেয়। সময়টি আপনার ডিভাইসের ঘড়ি ও টাইম জোন অনুযায়ী ধরা হয়, তাই ঘড়ি ঠিক আছে কি না দেখে নিন।",
      ] },
    ],
    en: [
      { h: "How to use it", p: [
        "Enter the event name, such as exam, wedding or trip, then choose the date and time. The tool calculates every second how many days, hours, minutes and seconds are left. The Reset button clears the name and time so you can start again.",
        "The name and time you enter are saved in your browser, so the countdown keeps running even if you close and reopen the page. It is not sent anywhere.",
      ] },
      { h: "Where it helps", p: [
        "It works well for seeing the time left before an exam, waiting for a birthday or event, remembering a job application deadline, a travel date or a project deadline.",
        "When the set time has passed the tool tells you. The time follows your device's clock and time zone, so make sure your clock is correct.",
      ] },
    ],
  },
};

for (const [slug, extra] of Object.entries(EXTRA)) {
  const base = TOOL_ARTICLES[slug];
  if (base) {
    base.bn.push(...extra.bn);
    base.en.push(...extra.en);
  } else {
    TOOL_ARTICLES[slug] = extra;
  }
}

// ---------------------------------------------------------------------------
// Extra sections (added 22 Nov 2026): worked examples, use cases and tips for the
// tools that had the shortest pages. Appended to the entries above.
// ---------------------------------------------------------------------------
const EXTRA2: Record<string, ToolArticle> = {
  "bangla-calendar": {
    bn: [
      { h: "ধাপে ধাপে ব্যবহার ও বাস্তব উদাহরণ", p: [
        "ধরুন আপনি জানতে চান ২১ ফেব্রুয়ারি ২০২৬ বাংলায় কত তারিখ। তারিখ রূপান্তর অংশে ইংরেজি থেকে বাংলা ট্যাব বেছে ওই তারিখ দিন। টুল দেখাবে ৮ ফাল্গুন ১৪৩২, শনিবার। কারণ ২০২৬ সালে ১৪ ফেব্রুয়ারি ১ ফাল্গুন পড়ে, তাই এক সপ্তাহ পরে ৮ ফাল্গুন।",
        "উল্টোটাও করা যায়। বাংলা থেকে ইংরেজি ট্যাবে তারিখ ১, মাস পৌষ ও সাল ১৪৩২ লিখলে ফল আসবে মঙ্গলবার, ১৬ ডিসেম্বর ২০২৫। এই তারিখটি বিজয় দিবসের সঙ্গে মিলে যায়, তাই মনে রাখা সহজ।",
        "মাসের ক্যালেন্ডারে প্রতিটি ঘরে বড় সংখ্যা ইংরেজি তারিখ, নিচের ছোট সংখ্যা বাংলা তারিখ। যেদিন নতুন বাংলা মাস শুরু হয়, সেদিন সংখ্যার বদলে মাসের নাম লেখা থাকে। তাই এক নজরে বোঝা যায় ইংরেজি মাসের কোন দিনে বাংলা মাস বদলাচ্ছে।",
      ] },
      { h: "কখন ও কেন কাজে লাগে", p: [
        "জন্মদিন, বিয়ে বা কোনো স্মরণীয় ঘটনার বাংলা তারিখ জানতে অনেকে এই টুল ব্যবহার করেন। দলিল, নিমন্ত্রণপত্র বা পারিবারিক অনুষ্ঠানের কার্ডে বাংলা তারিখ লিখতে হলে হিসাব মেলানো সহজ হয়।",
        "স্কুল বা প্রতিষ্ঠানের অনুষ্ঠান পরিকল্পনায়ও কাজে লাগে। যেমন পহেলা বৈশাখ কোন বারে পড়বে, তা সামনের বছরের এপ্রিল মাসের ক্যালেন্ডার খুলে দেখে নেওয়া যায়। ২০২৬ সালে ১ বৈশাখ ১৪৩৩ পড়ছে মঙ্গলবারে।",
        "পুরোনো কাগজপত্রে বঙ্গাব্দ লেখা থাকলে সেটি ইংরেজি তারিখে বদলে নিতে পারবেন। ১৯০০ থেকে ২১০০ সালের মধ্যে যেকোনো তারিখ নিয়ে কাজ করা যায়।",
      ] },
      { h: "সাধারণ ভুল ও সমাধান", p: [
        "সবচেয়ে বড় ভুল হলো পশ্চিমবঙ্গের পঞ্জিকার সঙ্গে মেলানো। দুই পঞ্জিকার নিয়ম আলাদা, তাই একই দিনে দুই জায়গার বাংলা তারিখ আলাদা হতে পারে। এই টুল বাংলাদেশের পঞ্জিকা ধরে হিসাব করে।",
        "ফাল্গুনের ৩০ তারিখ দিলে ত্রুটির বার্তা আসতে পারে। কারণ সাধারণ বছরে ফাল্গুনে ২৯ দিন। বার্তায় ওই বছরে মাসের সর্বোচ্চ দিন লেখা থাকে, সেটি দেখে তারিখ ঠিক করুন।",
        "বাংলা সাল লেখার সময় চার অঙ্কের সাল দিন, যেমন ১৪৩২। দুই অঙ্কের সাল দিলে সীমার বাইরে বলে দেখাবে। তারিখের ঘরে ১ থেকে শুরু করে ওই মাসের শেষ দিন পর্যন্ত সংখ্যা দেওয়া যায়। মাস বাছাই করা হয় ড্রপডাউন থেকে, তাই বানান নিয়ে ভাবতে হয় না। সাল ও তারিখ দুটি ঘরই পূরণ না করলে ফলাফল আসে না, এ কথাটিও মনে রাখুন।",
      ] },
      { h: "সীমাবদ্ধতা ও ভালো অভ্যাস", p: [
        "আজকের তারিখ আপনার ডিভাইসের ঘড়ি থেকে নেওয়া হয়। ফোনের তারিখ ভুল থাকলে এখানেও ভুল দেখাবে, তাই গুরুত্বপূর্ণ কাজের আগে ফোনের তারিখ ঠিক আছে কিনা দেখে নিন।",
        "এখানে সরকারি ছুটি, উৎসব বা চাঁদের হিসাবে নির্ধারিত ধর্মীয় দিবস দেওয়া নেই। এসব তারিখ প্রতি বছর সরকারি বিজ্ঞপ্তিতে ঠিক হয়, তাই অফিসিয়াল সূত্র দেখাই নিরাপদ।",
        "আইনি বা সরকারি কাগজে বাংলা তারিখ বসানোর আগে একবার নিজে মিলিয়ে নিন এবং সংশ্লিষ্ট দপ্তরের নিয়ম জেনে নিন। হিসাব আপনার ব্রাউজারেই হয়, তাই তারিখ নিয়ে অবাধে পরীক্ষা করা যায়।",
      ] },
    ],
    en: [
      { h: "Step by step with a real example", p: [
        "Say you want to know the Bangla date of 21 February 2026. In the date converter, choose the Gregorian to Bangla tab and enter that date. The tool shows 8 Falgun 1432, Saturday. In 2026, 14 February is 1 Falgun, so one week later is 8 Falgun.",
        "You can also go the other way. On the Bangla to Gregorian tab, enter day 1, month Poush and year 1432. The result is Tuesday, 16 December 2025, which is also Victory Day, so it is easy to remember.",
        "In the month view, the big number in each cell is the Gregorian date and the small one below is the Bangla date. On the day a new Bangla month begins, the month name replaces the number, so you can see at a glance where the Bangla month changes.",
      ] },
      { h: "When and why it helps", p: [
        "People use it to find the Bangla date of a birthday, a wedding or another memorable event. It also helps when you must write a Bangla date on an invitation card, a document or a family programme.",
        "It is useful for planning too. You can open next April in the calendar and check which weekday Pohela Boishakh falls on. In 2026, 1 Boishakh 1433 is a Tuesday.",
        "If an old paper carries a Bangla year, you can turn it into a Gregorian date. Any date between 1900 and 2100 can be converted.",
      ] },
      { h: "Common mistakes and fixes", p: [
        "The biggest mistake is comparing the result with West Bengal's calendar. The two calendars follow different rules, so the Bangla date for the same day can differ. This tool follows Bangladesh's calendar.",
        "Entering day 30 of Falgun may give an error, because Falgun has 29 days in a normal year. The message tells you the maximum for that month and year, so adjust the day accordingly.",
        "When typing a Bangla year, use four digits such as 1432. A two-digit year falls outside the allowed range and will be rejected.",
      ] },
      { h: "Limits and good habits", p: [
        "Today's date comes from your device clock. If your phone's date is wrong, the result here will be wrong too, so check it before doing anything important.",
        "Public holidays, festivals and religious days that depend on moon sighting are not included. These are announced officially each year, so use the official source for them.",
        "Before putting a Bangla date on a legal or government paper, verify it yourself and check the rules of the office concerned. The calculation runs in your browser, so you can try as many dates as you like.",
      ] },
    ],
  },
  "bill-calculator": {
    bn: [
      { h: "ধাপে ধাপে ব্যবহার ও একটি উদাহরণ", p: [
        "টুলটি চালানো সহজ। প্রথমে মোট বিল লিখুন, তারপর কতজন ভাগ করবেন। এরপর দরকার হলে VAT বা সার্ভিস চার্জ এবং টিপের শতকরা হার দিন। সব ঘর পূরণ হলে ফলাফল নিজে থেকেই দেখা যায়, আলাদা বোতাম চাপতে হয় না।",
        "একটি উদাহরণ দেখা যাক। চারজন বন্ধু রেস্টুরেন্টে খেয়ে ২,৪০০ টাকার বিল পেল। বিলে VAT ও সার্ভিস চার্জ মিলিয়ে ১০% যোগ হবে, আর ওরা ৫% টিপ দিতে চায়। টুল VAT ধরবে ২৪০ টাকা এবং টিপ ধরবে ১২০ টাকা। সর্বমোট দাঁড়ায় ২,৭৬০ টাকা। চারজনে ভাগ করলে জনপ্রতি ৬৯০ টাকা।",
        "আরেকটি উদাহরণ: ১,৮৫০ টাকার বিল তিনজনে ভাগ হবে, VAT ও টিপ নেই। ১,৮৫০ কে ৩ দিয়ে ভাগ করলে ৬১৬.৬৬৬৬ হয়। টুল দেখায় ৬১৬.৬৭ টাকা। বাস্তবে সবাই ৬১৭ টাকা করে দিলে সামান্য বেশি জমবে, সেটা রেখে দিতে পারেন বা টিপ হিসেবে দিতে পারেন।",
      ] },
      { h: "কখন ও কেন কাজে লাগে", p: [
        "বন্ধুদের সঙ্গে খাওয়ার পর বিল নিয়ে হিসাব মেলানো অনেক সময় ঝামেলার হয়। কেউ বলে VAT আলাদা, কেউ বলে টিপও ধরতে হবে। টুলে একবার হার বসালে সবাই একই সংখ্যা দেখতে পায়, তাই তর্কের জায়গা কমে।",
        "ঘুরতে গিয়ে গাড়ি ভাড়া বা হোটেল খরচ ভাগ করতেও এটি কাজে আসে। এখানে VAT ও টিপ ফাঁকা রেখে শুধু মোট খরচ ও জনসংখ্যা দিলেই হয়। মেসের বাজার, অফিসের দলগত লাঞ্চ বা পরিবারের কোনো অনুষ্ঠানের খরচেও একই পদ্ধতি চলে।",
        "রেস্টুরেন্ট ঠিক কত শতাংশ VAT বা চার্জ নেয় তা প্রতিষ্ঠানভেদে আলাদা হতে পারে। তাই অনুমান না করে বিলের কাগজে ছাপা হার দেখে নিয়ে সেটাই লিখুন।",
      ] },
      { h: "সাধারণ ভুল ও সমাধান", p: [
        "সবচেয়ে বড় ভুল হলো VAT দুইবার ধরা। অনেক বিলে VAT আগেই যোগ করা থাকে এবং নিচে মোট অঙ্ক লেখা থাকে। সেই মোট অঙ্ক দিয়ে আবার VAT দিলে হিসাব বেশি আসবে। ছাপা মোট অঙ্ক ব্যবহার করলে VAT ঘর ফাঁকা রাখুন।",
        "দ্বিতীয় ভুল হলো দুটি চার্জের হার আলাদা ঘরে খোঁজা। টুলে VAT ও সার্ভিস চার্জের জন্য একটিই ঘর আছে। দুটো থাকলে হার দুটি যোগ করে লিখুন। তবে এতে টুল একটি মোট শতাংশ ধরে মূল বিলের ওপর হিসাব করে, চার্জের ওপর চার্জ ধরে না। আপনার বিলে যদি অন্যভাবে হিসাব হয়ে থাকে তবে বিলের লেখা অঙ্কটিই সঠিক ধরুন।",
        "তৃতীয় ভুল হলো মানুষের সংখ্যায় দশমিক বা শূন্য দেওয়া। সংখ্যাটি ১ বা তার বেশি পূর্ণসংখ্যা হতে হয়, নইলে টুল ভুলের বার্তা দেখায়। লাল বার্তা এলে ঘরের মান আবার দেখে নিন।",
      ] },
      { h: "সীমাবদ্ধতা ও ভালো অভ্যাস", p: [
        "টুলটি মোট অঙ্ককে সমান ভাগে ভাগ করে। কে কোন খাবার খেয়েছে তা আলাদা করে ধরার ব্যবস্থা নেই। কারও অর্ডার অনেক বেশি হলে সেই ব্যক্তির অংশ আগে বাদ দিয়ে বাকি অঙ্ক দিয়ে হিসাব করতে পারেন।",
        "টিপ ও VAT দুটোই মূল বিলের শতকরা হিসেবে আলাদাভাবে ধরা হয়। রেস্টুরেন্টের নিজস্ব হিসাবের নিয়ম আলাদা হলে ছোট ব্যবধান হতে পারে। পরিশোধের আগে বিলের চূড়ান্ত অঙ্কের সঙ্গে একবার মিলিয়ে নিন।",
        "ভালো অভ্যাস হিসেবে টাকা দেওয়ার আগেই হিসাবটি দলের সবাইকে দেখান। ফলাফল দশমিকে এলে আগেই ঠিক করুন কে কতটা রাউন্ড করবে। এতে পরে ভুল বোঝাবুঝি হয় না।",
      ] },
    ],
    en: [
      { h: "Step by step, with a worked example", p: [
        "Using the tool is simple. Enter the total bill first, then the number of people. If needed, add the VAT or service charge percentage and the tip percentage. The result appears on its own once the boxes are filled, so there is no calculate button to press.",
        "Here is an example. Four friends eat at a restaurant and the bill is 2,400 taka. The bill adds 10% for VAT and service charge, and they want to leave a 5% tip. The tool calculates VAT of 240 taka and a tip of 120 taka. The grand total is 2,760 taka, which comes to 690 taka per person for four people.",
        "One more case: a bill of 1,850 taka shared by three people, with no VAT and no tip. Dividing 1,850 by 3 gives 616.6666, and the tool shows 616.67 taka. If everyone pays 617 taka, a small amount is left over, which you can keep or give as a tip.",
      ] },
      { h: "When and why it helps", p: [
        "Settling a bill after a meal with friends can get awkward. One person says VAT is extra, another says the tip should be added. When you enter the rates once, everyone sees the same number and there is less to argue about.",
        "It also helps when you share a car rental or hotel cost on a trip. In that case leave VAT and tip empty and enter only the total cost and the number of people. The same method works for mess grocery costs, an office team lunch or a family event.",
        "The VAT or service charge a restaurant applies can differ between places. Do not guess. Read the rate printed on your bill and enter that.",
      ] },
      { h: "Common mistakes and fixes", p: [
        "The biggest mistake is counting VAT twice. Many bills already include VAT and print a final total at the bottom. If you use that total and also enter a VAT rate, the result will be too high. When you use the printed total, leave the VAT box empty.",
        "The second mistake is looking for separate boxes for two charges. The tool has a single box for VAT and service charge. If your bill has both, add the two rates and enter the sum. The tool applies that combined percentage to the original bill and does not charge one on top of the other. If your bill is calculated differently, treat the amount printed on the bill as correct.",
        "The third mistake is entering a decimal or zero for the number of people. It must be a whole number of 1 or more, otherwise the tool shows an error. If you see the red message, check that box again.",
      ] },
      { h: "Limits and good habits", p: [
        "The tool divides the total into equal parts. It has no way to assign individual items to individual people. If one person ordered far more than the others, take their share out first and split the rest.",
        "VAT and tip are both calculated separately as a percentage of the original bill. If a restaurant uses a different method, you may see a small gap. Compare with the final amount on the bill before you pay.",
        "As a good habit, show the result to the whole group before anyone pays. If the amount has decimals, agree in advance who rounds up and by how much. This avoids confusion later.",
      ] },
    ],
  },
  "character-counter": {
    bn: [
      { h: "ধাপে ধাপে ব্যবহার ও বাস্তব উদাহরণ", p: [
        "বক্সে লেখা পেস্ট করার সঙ্গে সঙ্গেই তিনটি সংখ্যা বদলে যায়: স্পেসসহ অক্ষর, স্পেস ছাড়া অক্ষর ও লাইন। এরপর নিচের বোতাম থেকে একটি লিমিট বাছলে একটি বার আসে। বারটি সবুজ থাকলে আপনি সীমার মধ্যে আছেন। ৯০% পার হলে হলুদ হয় এবং সীমা ছাড়ালে লাল হয়ে কত অক্ষর বেশি হয়েছে তা লিখে দেখায়।",
        "উদাহরণ: \"Hello World\" লিখলে স্পেসসহ ১১, স্পেস ছাড়া ১০ এবং লাইন ১ দেখায়। SMS (ইংরেজি) ১৬০ বাছলে লেখা হবে \"149 অক্ষর বাকি (11/160)\"। দুই লাইনের একটি লেখা, যেমন \"Dear Sir,\" এর পরের লাইনে \"Please find attached.\", স্পেসসহ ৩১, স্পেস ছাড়া ২৭ এবং লাইন ২ দেখাবে।",
        "আরেকটি ব্যবহার: আপনার ওয়েবসাইটের টাইটেল লিখে SEO Title ~৬০ বেছে নিন। ৬৪ অক্ষর হলে টুল দেখাবে ৪ অক্ষর বেশি। তখন একটি শব্দ কেটে বা ছোট শব্দ দিয়ে বদলে সংখ্যা কমিয়ে নিন।",
      ] },
      { h: "কখন ও কেন কাজে লাগে", p: [
        "অনেক জায়গায় লেখার সীমা বাঁধা থাকে। ফোনের SMS, X পোস্ট, ইনস্টাগ্রাম বায়ো, চাকরির আবেদনের নির্দিষ্ট ঘর বা বিজ্ঞাপনের শিরোনাম, সবখানেই অক্ষর হিসেব করে লিখতে হয়। আগে টুলে মেপে নিলে পরে কেটে যাওয়ার ভয় থাকে না।",
        "যারা ওয়েবসাইট বা ব্লগ চালান তাদের জন্য টাইটেল ও ডেসক্রিপশন মাপা নিয়মিত কাজ। দীর্ঘ টাইটেল সার্চ ফলাফলে কেটে দেখানো হতে পারে। শিক্ষার্থীরা অ্যাসাইনমেন্টে অক্ষরসীমা দেখতে বা আবেদনপত্রের ছোট রচনা মাপতেও এটি ব্যবহার করে।",
        "বাংলায় SMS পাঠালে ৭০ অক্ষরের সীমা মনে রাখা জরুরি, কারণ বাংলা ইউনিকোড হিসেবে যায়। দীর্ঘ বার্তা একাধিক অংশে ভাগ হলে খরচ বাড়তে পারে। খরচের নিয়ম আপনার অপারেটর বা SMS সেবাদাতার কাছে যাচাই করুন।",
      ] },
      { h: "সাধারণ ভুল ও সমাধান", p: [
        "প্রথম ভুল হলো স্পেসসহ ও স্পেস ছাড়া সংখ্যা গুলিয়ে ফেলা। বেশিরভাগ প্ল্যাটফর্মের সীমা স্পেসসহ গণনায় ধরা হয়। সীমা মেলাতে তাই স্পেসসহ সংখ্যাটি দেখুন। টুলের বারও স্পেসসহ সংখ্যা ধরেই চলে।",
        "দ্বিতীয় ভুল হলো বাংলা লেখাকে ইংরেজির মতো ধরে নেওয়া। বাংলা লেখায় একটি যুক্তাক্ষর বা কার-চিহ্ন আলাদা ইউনিকোড অক্ষর হিসেবে গোনা হয়, তাই চোখে দেখা অক্ষরের চেয়ে সংখ্যা বেশি আসে। SMS এর জন্য বাংলায় ৭০ সীমা মেনে চলাই নিরাপদ।",
        "তৃতীয় ভুল হলো পেস্ট করা লেখার শেষে অদৃশ্য ফাঁকা জায়গা বা বাড়তি লাইন ব্রেক থেকে যাওয়া। এতে সংখ্যা সামান্য বেশি আসে। শেষের ফাঁকা জায়গা মুছে আবার দেখুন।",
      ] },
      { h: "সীমাবদ্ধতা ও ভালো অভ্যাস", p: [
        "টুলটি অক্ষর ও লাইন গোনে, শব্দ গোনে না। প্ল্যাটফর্মভেদে গণনা সামান্য আলাদা হতে পারে, বিশেষ করে ইমোজি বা লিংকের ক্ষেত্রে। যেমন X লিংককে নিজের নিয়মে গোনে, টুল সাধারণ অক্ষরের মতোই গোনে।",
        "SEO Title ও Description এর ৬০ ও ১৬০ সংখ্যা আনুমানিক। Google পিক্সেল প্রস্থ দেখে ছাঁটে, তাই চওড়া অক্ষর বেশি থাকলে কম অক্ষরেও কেটে যেতে পারে। সীমার কাছাকাছি গেলে কিছু অক্ষর ছেড়ে রাখুন।",
        "ভালো অভ্যাস হলো সীমার ঠিক শেষ পর্যন্ত না গিয়ে সামান্য জায়গা রাখা। গুরুত্বপূর্ণ বার্তা পাঠানোর আগে সংশ্লিষ্ট প্ল্যাটফর্মেও একবার দেখে নিন।",
      ] },
    ],
    en: [
      { h: "Step by step, with real examples", p: [
        "As soon as you paste text into the box, three numbers update: characters with spaces, characters without spaces and lines. If you then pick a limit from the buttons below, a bar appears. Green means you are inside the limit, it turns amber past 90%, and it turns red when you go over, with a message telling you how many characters are over.",
        "For example, typing \"Hello World\" shows 11 with spaces, 10 without spaces and 1 line. If you pick SMS (English) 160, the message reads \"149 characters left (11/160)\". A two-line text such as \"Dear Sir,\" followed by \"Please find attached.\" on the next line shows 31 with spaces, 27 without spaces and 2 lines.",
        "Another use: type a page title and choose SEO Title ~60. If the title is 64 characters, the tool shows 4 characters over. Cut a word or swap in a shorter one until the number comes down.",
      ] },
      { h: "When and why it helps", p: [
        "Many places set a fixed writing limit. A phone SMS, an X post, an Instagram bio, a fixed box in a job application or an ad headline all need you to count characters. Measuring first means nothing gets cut off later.",
        "If you run a website or blog, measuring titles and descriptions is a regular job. A long title may be shown truncated in search results. Students also use a counter for assignment limits or short essays in application forms.",
        "If you send Bangla SMS, remember the 70 character limit, because Bangla goes as Unicode. A long message split into several parts may cost more. Check the pricing rules with your operator or SMS provider.",
      ] },
      { h: "Common mistakes and fixes", p: [
        "The first mistake is mixing up the with-spaces and without-spaces numbers. Most platforms apply their limit to the count with spaces, so use that number to compare. The bar in the tool also uses the with-spaces count.",
        "The second mistake is treating Bangla like English. In Bangla, a conjunct or a vowel sign is counted as its own Unicode character, so the number is higher than the letters you see. For SMS, staying within 70 in Bangla is the safe approach.",
        "The third mistake is invisible extra space or a stray line break at the end of pasted text. This makes the count slightly higher. Delete the trailing space and check again.",
      ] },
      { h: "Limits and good habits", p: [
        "This tool counts characters and lines, not words. Counting can differ slightly between platforms, especially for emoji and links. For instance, X handles links by its own rules, while this tool counts them like ordinary characters.",
        "The 60 and 160 figures for SEO titles and descriptions are approximate. Google truncates by pixel width, so a title with many wide letters may be cut off even under the limit. Leave a few characters of room when you are close.",
        "A good habit is to avoid filling the limit to the very last character. Before sending anything important, also preview it on the platform itself.",
      ] },
    ],
  },
  "date-difference-calculator": {
    bn: [
      { h: "ধাপে ধাপে ব্যবহার ও বাস্তব উদাহরণ", p: [
        "ধরুন আপনি জানতে চান ১৫ মার্চ ২০২০ থেকে ১০ জুন ২০২৪ পর্যন্ত কত সময় গেছে। \"দুই তারিখের পার্থক্য\" ট্যাবে শুরুর তারিখে ২০২০-০৩-১৫ এবং শেষের তারিখে ২০২৪-০৬-১০ দিন। টুল দেখাবে ৪ বছর, ২ মাস, ২৬ দিন। মোট দিন ১,৫৪৮ এবং মোট সপ্তাহ ২২১ সপ্তাহ ১ দিন।",
        "এই হিসাবে ১৫ মার্চ ২০২০ থেকে পূর্ণ ৫০ মাস যোগ করলে ১৫ মে ২০২৪ হয়। এরপর ১০ জুন পর্যন্ত বাকি থাকে ২৬ দিন। ২০২৪ সালের ২৯ ফেব্রুয়ারি মোট দিনের মধ্যে ধরা আছে।",
        "এবার দ্বিতীয় ট্যাব। ৩১ জানুয়ারি ২০২৪ বেছে যোগ (+) চাপুন, মাসের ঘরে ১ লিখুন। ফল আসবে ২৯ ফেব্রুয়ারি ২০২৪, বার বৃহস্পতিবার। কারণ ফেব্রুয়ারিতে ৩১ তারিখ নেই, তাই মাসের শেষ দিনে থামে।",
      ] },
      { h: "কখন ও কেন কাজে লাগে", p: [
        "দৈনন্দিন কাজে তারিখের হিসাব প্রায়ই লাগে। কোনো আবেদনের শেষ তারিখ আর আজকের মধ্যে কত দিন বাকি, তা দেখা যায়। ঋণ বা কিস্তির মেয়াদ কত মাস গেল, সেটাও বের করা যায়।",
        "চাকরিতে যোগদানের তারিখ থেকে এখন পর্যন্ত কত বছর কত মাস হলো, তা জানতে কাজে লাগে। বিদেশ থেকে ফেরার পর কত দিন হলো, ভিসা বা পাসপোর্ট কত দিন বাকি, এসব হিসাবও করা যায়। ডেলিভারির সময়সীমা বা জামিনের মেয়াদের মতো বিষয়ে ৩০ বা ৯০ দিন পরের তারিখ বের করতেও সুবিধা।",
        "শিক্ষার্থীরা পরীক্ষার আগে কত দিন হাতে আছে তা গুনতে পারে। গর্ভাবস্থা, প্রজেক্ট ডেডলাইন বা অনুষ্ঠানের প্রস্তুতির সময়ও এই টুলে দ্রুত মেলানো যায়। হাতে ক্যালেন্ডার গুনে ভুল করার সুযোগ তাতে কমে।",
      ] },
      { h: "সাধারণ ভুল ও সমাধান", p: [
        "সবচেয়ে বেশি হয় শুরুর দিন গোনা নিয়ে বিভ্রান্তি। টুল দুই তারিখের মাঝের ব্যবধান দেখায়, শুরুর দিন ধরে না। যদি আপনার নিয়মে দুই প্রান্তের দিনই ধরতে হয়, ফলের সাথে ১ যোগ করে নিন।",
        "আরেকটি ভুল হলো মাসকে সবসময় ৩০ দিন ধরা। এই টুল বাস্তব ক্যালেন্ডার ধরে, তাই মোট দিন আর মাস-দিনের হিসাব হাতের ৩০ দিনের হিসাবের সাথে মিলবে না। যেমন ১ জানুয়ারি থেকে ৩১ ডিসেম্বর ২০২৫ এ ১১ মাস ৩০ দিন এবং মোট ৩৬৪ দিন আসে।",
        "তারিখ ঠিকমতো না বসলেও ফল আসে না। ফল না এলে দুটি ঘরেই পূর্ণ ও বৈধ তারিখ আছে কিনা দেখুন। যোগ-বিয়োগে দশমিক বা ঋণাত্মক সংখ্যা দিলে ভুলের বার্তা আসে। বিয়োগ করতে চাইলে সংখ্যা ধনাত্মক রেখে \"বিয়োগ (−)\" বোতাম চাপুন।",
      ] },
      { h: "সীমাবদ্ধতা ও ভালো অভ্যাস", p: [
        "এই টুল শুধু খ্রিষ্টীয় ক্যালেন্ডারের তারিখ নিয়ে কাজ করে। বাংলা বা হিজরি তারিখের হিসাব এতে নেই। সেগুলোর জন্য আগে তারিখটি খ্রিষ্টীয় ক্যালেন্ডারে নিয়ে আসতে হবে। টুল শুধু তারিখ ধরে, সময় বা ঘণ্টা-মিনিট ধরে না।",
        "আইনি বা সরকারি সময়সীমা, যেমন আপিলের মেয়াদ বা আবেদনের শেষ দিন, কীভাবে গোনা হবে তা প্রতিষ্ঠানের নিয়মে ঠিক হয়। কোন দিন থেকে গোনা শুরু আর ছুটির দিন বাদ যাবে কিনা, তা এই টুল জানে না। গুরুত্বপূর্ণ ক্ষেত্রে অফিসিয়াল বিজ্ঞপ্তি বা সংশ্লিষ্ট দপ্তরের নিয়ম মিলিয়ে নিন।",
        "ভালো অভ্যাস হলো ফল পাওয়ার পর একবার দেখে নেওয়া: ফলাফল তারিখের বার ঠিক আছে কিনা। দীর্ঘ সময়ের হিসাবে ফল ক্যালেন্ডারের সাথে একবার মিলিয়ে নিলে ভুল ধরা পড়ে। তারিখ আপনার ডিভাইসেই প্রক্রিয়া হয়, তাই ব্যক্তিগত তারিখ দিতেও সমস্যা নেই।",
      ] },
    ],
    en: [
      { h: "Step by step, with real examples", p: [
        "Say you want to know how much time passed from 15 March 2020 to 10 June 2024. In the \"Difference between dates\" tab, enter 2020-03-15 as the start and 2024-06-10 as the end. The tool shows 4 years, 2 months and 26 days. Total days are 1,548, and total weeks are 221 weeks 1 day.",
        "Here is how that works. Adding 50 whole months to 15 March 2020 gives 15 May 2024. From there to 10 June is 26 days left. The extra day of 29 February 2024 is already counted in the total days.",
        "Now the second tab. Pick 31 January 2024, choose Add (+) and type 1 in the months box. The result is Thursday, 29 February 2024. February has no 31st, so the date stops at the last day of the month.",
      ] },
      { h: "When and why it is useful", p: [
        "Date arithmetic comes up in everyday tasks. You can see how many days are left between today and an application deadline, or how many months of a loan or instalment plan have passed.",
        "It helps you find how many years and months you have been in a job since your joining date. You can also work out days since you returned from abroad, or how long a visa or passport has left. Finding the date 30 or 90 days ahead is handy for delivery windows or notice periods.",
        "Students can count the days left before an exam. For project deadlines or event planning the tool gives a quick check, and it lowers the chance of miscounting on a paper calendar.",
      ] },
      { h: "Common mistakes and fixes", p: [
        "The most common confusion is whether the start day is counted. The tool shows the gap between two dates and does not include the start day. If your rule counts both end days, add 1 to the result.",
        "Another mistake is treating every month as 30 days. This tool follows the real calendar, so its total days and its months-and-days split will not match a rough 30-day calculation. For example, 1 January to 31 December 2025 gives 11 months 30 days and 364 total days.",
        "If no result appears, check that both boxes hold full, valid dates. In add/subtract, decimals or negative numbers trigger an error message. To subtract, keep the number positive and press the Subtract (−) button.",
      ] },
      { h: "Limits and good habits", p: [
        "The tool works only with Gregorian calendar dates. It does not calculate Bangla or Hijri dates, so convert those to Gregorian first. It handles dates only, not hours and minutes.",
        "Legal or official deadlines, such as an appeal period or an application closing date, are counted by the rules of the institution. This tool does not know which day counting starts from or whether holidays are skipped. For anything important, check the official notice or the office concerned.",
        "A good habit is to glance at the weekday of the resulting date. For long spans, compare the answer against a calendar once. Dates are processed on your own device, so entering personal dates is fine.",
      ] },
    ],
  },
  "image-compressor": {
    bn: [
      { h: "ধাপে ধাপে ব্যবহার ও বাস্তব উদাহরণ", p: [
        "ধরুন ফোনে তোলা একটি ছবি ৪০০০ × ৩০০০ পিক্সেলের এবং আপনার ফর্মে ছবি ছোট করে দিতে হবে। ছবিটি সিলেক্ট করে JPEG বাছুন, কোয়ালিটি ৭০% রাখুন এবং সর্বোচ্চ প্রস্থ লিখুন ১৬০০। টুল দেখাবে ১৬০০ × ১২০০ px, কারণ উচ্চতা একই অনুপাতে কমে।",
        "এরপর 'আগে', 'পরে' ও 'সাশ্রয়' তিনটি বক্স দেখুন। ধরা যাক আগে ২.৪ MB ছিল আর পরে কম এসেছে, তখন সাশ্রয়ের শতাংশও দেখাবে। সংখ্যা ছবি ভেদে আলাদা হয়, তাই নিজের ছবিতে স্লাইডার নাড়িয়ে দেখাই ভালো।",
        "সাইজ ঠিক মনে হলে ডাউনলোড চাপুন। ফাইলের নাম হবে মূল নামের পরে -compressed, যেমন photo-compressed.jpg।",
      ] },
      { h: "কখন ও কেন কাজে লাগে", p: [
        "অনেক আবেদন ফর্ম, পোর্টাল ও অ্যাপে ছবির সাইজের সীমা থাকে। ফোনের ক্যামেরার ছবি সহজেই কয়েক MB হয়, তাই জমা দেওয়ার আগে ছোট করতে হয়। সীমা কত, তা সংশ্লিষ্ট ওয়েবসাইটের নির্দেশনায় দেখে নিন।",
        "ইমেইল বা মেসেঞ্জারে অনেক ছবি পাঠালে ডেটা ও সময় দুটোই বাঁচে। ধীর ইন্টারনেটে এটি বিশেষ কাজে আসে।",
        "ওয়েবসাইট বা ব্লগে ছবি দিলে ছোট ফাইল পেজ দ্রুত খুলতে সাহায্য করে। সেক্ষেত্রে প্রস্থ কমানো সবচেয়ে কার্যকর ধাপ, কারণ পর্দায় যে মাপে দেখাবে তার চেয়ে বড় ছবি রাখার দরকার নেই।",
      ] },
      { h: "সাধারণ ভুল ও সমাধান", p: [
        "কোয়ালিটি খুব কমিয়ে ফেলা সবচেয়ে সাধারণ ভুল। ছবিতে ঝাপসা ভাব ও ছোট ছোট চতুর্ভুজ দাগ দেখা দিলে কোয়ালিটি একটু বাড়ান, বরং প্রস্থ কমিয়ে সাইজ নামান।",
        "PNG ছবি দিয়ে সাইজ না কমার অভিযোগ হয়। এখানে আউটপুট JPEG বা WebP, তাই ফরম্যাট বদলে যায়। স্ক্রিনশটের মতো ছবিতে লেখা থাকলে বেশি কম্প্রেস করলে লেখা অস্পষ্ট হতে পারে।",
        "'সাশ্রয়' ঋণাত্মক এলে বুঝবেন ছবিটি আগে থেকেই ছোট বা কম্প্রেসড। তখন কোয়ালিটি আরও কমান বা প্রস্থ ছোট করুন।",
        "আগের কম্প্রেস করা ছবি আবার কম্প্রেস করলে মান বেশি খারাপ হয়। সব সময় মূল ছবি থেকে শুরু করুন।",
      ] },
      { h: "সীমাবদ্ধতা ও ভালো অভ্যাস", p: [
        "ফাইলের সীমা ২৫ MB এবং একবারে একটি ছবি নিয়ে কাজ হয়। পিক্সেল সংখ্যা খুব বেশি হলে ফোনের মেমোরির জন্য মাপ কিছুটা ছোট করা হয়, এ কথা টুল নিজেই জানায়।",
        "এখানে সরাসরি 'এত KB চাই' লিখে দেওয়ার ব্যবস্থা নেই। স্লাইডার ও প্রস্থ বদলে নিজে সাইজ মিলিয়ে নিতে হয়।",
        "আবেদনের ছবির সাইজ ও ফরম্যাটের শর্ত প্রতিষ্ঠান ভেদে আলাদা, তাই ডাউনলোডের পর ফাইলটির সাইজ ও মাপ আবার দেখে নিন। মূল ছবি আলাদা রেখে দিন।",
      ] },
    ],
    en: [
      { h: "Step by step with a real example", p: [
        "Say a photo from your phone is 4000 × 3000 pixels and a form needs a smaller file. Select the image, choose JPEG, keep quality at 70% and enter 1600 as the maximum width. The tool will show 1600 × 1200 px, because the height shrinks in the same proportion.",
        "Now look at the Before, After and Saved boxes. If the original was 2.4 MB and the new file is smaller, the saved percentage appears too. Numbers differ from image to image, so move the slider on your own picture and see.",
        "When the size looks right, press Download. The file is named with -compressed added to the original name, such as photo-compressed.jpg.",
      ] },
      { h: "When and why it helps", p: [
        "Many application forms, portals and apps set a size limit for pictures. Phone photos easily run to several MB, so they need shrinking before upload. Check the exact limit in that website's instructions.",
        "If you send many pictures by email or messenger, a smaller file saves both data and time. This matters most on a slow connection.",
        "For websites and blogs, smaller files help pages open faster. Reducing the width is the most effective step there, since there is no need to keep an image larger than the size it will appear on screen.",
      ] },
      { h: "Common mistakes and fixes", p: [
        "The most common mistake is pushing quality too low. If you see blur or small blocky patches, raise the quality a little and bring the size down by reducing the width instead.",
        "People sometimes complain that a PNG does not shrink. The output here is JPEG or WebP, so the format changes. Screenshots with text can become fuzzy if compressed too hard.",
        "If Saved is negative, the picture was already small or compressed. Lower the quality further or reduce the width.",
        "Compressing an already compressed copy degrades quality further. Always start from the original picture.",
      ] },
      { h: "Limits and good habits", p: [
        "The file limit is 25 MB and one image is handled at a time. If the pixel count is very high, the dimensions are reduced slightly to fit phone memory, and the tool tells you so.",
        "There is no box to type a target such as 'make it 100 KB'. You adjust the slider and width and match the size yourself.",
        "Size and format rules for application photos differ between organisations, so check the file's size and dimensions again after downloading. Keep your original picture separately.",
      ] },
    ],
  },
  "image-converter": {
    bn: [
      { h: "ধাপে ধাপে ব্যবহার ও বাস্তব উদাহরণ", p: [
        "ধরুন একটি চাকরির আবেদনে শুধু JPG ছবি নেয়, কিন্তু আপনার কাছে signature.png আছে। ছবিটি সিলেক্ট করে JPG বাছুন। স্বচ্ছ ব্যাকগ্রাউন্ড থাকলে তা সাদা হয়ে যাবে, যা সই বা ছবির জন্য সাধারণত ঠিকই আছে। ডাউনলোড করলে ফাইলের নাম হবে signature.jpg।",
        "ডাউনলোডের আগেই নতুন ফাইলের সাইজ দেখা যায়। কোয়ালিটি ৯০% থেকে কমিয়ে ৮০% করলে সাইজ আবার হিসাব হয়ে নতুন মান দেখায়। কতটা কমবে তা ছবির ধরনের ওপর নির্ভর করে, তাই নির্দিষ্ট সংখ্যা আগে থেকে বলা যায় না।",
        "একই ছবি ভিন্ন ফরম্যাটে বদলে সাইজ মিলিয়ে দেখাও সহজ। JPG, PNG ও WebP বোতাম পরপর চাপলেই প্রতিবার নতুন সাইজ দেখাবে।",
      ] },
      { h: "কখন ও কেন কাজে লাগে", p: [
        "কিছু ফর্ম বা ওয়েবসাইট শুধু নির্দিষ্ট ফরম্যাট নেয়। স্ক্রিনশট সাধারণত PNG হয়, ফোনের ছবি সাধারণত JPG। দরকার মতো বদলে নিলে আপলোডের সময় ঝামেলা কমে।",
        "ওয়েবসাইট বা ব্লগের ছবি ছোট রাখতে অনেকে WebP ব্যবহার করেন। এতে পেজ দ্রুত লোড হতে সাহায্য করে। তবে পুরোনো সফটওয়্যার বা কিছু অ্যাপ WebP খুলতে না-ও পারে, তাই কোথায় ব্যবহার করবেন তা আগে ভেবে নিন।",
        "লোগো বা স্বচ্ছ ব্যাকগ্রাউন্ডের ছবি PNG তে রাখাই ভালো। ছবি আপলোড হয় না বলে ব্যক্তিগত ছবি বা আইডির ছবি বদলাতেও এটি নিরাপদ মনে হতে পারে, কারণ সব কাজ ব্রাউজারেই হয়।",
      ] },
      { h: "সাধারণ ভুল ও সমাধান", p: [
        "অনেকে JPG কে PNG করলে মান বাড়বে ভেবে বদলান। আসলে হারিয়ে যাওয়া তথ্য ফেরে না, আর ফাইল বড় হয়ে যেতে পারে। শুধু ফরম্যাটের শর্ত মেটাতে হলে বদলান।",
        "JPG করার পর ব্যাকগ্রাউন্ড সাদা দেখে অনেকে অবাক হন। এটি JPG এর সীমাবদ্ধতা। স্বচ্ছতা দরকার হলে PNG বা WebP বেছে নিন।",
        "কোয়ালিটি খুব কম রাখলে ছবিতে ঝাপসা ভাব বা ছোট ছোট দাগ আসে। প্রথমে ৮০ থেকে ৯০% দিয়ে দেখুন, পরে দরকার হলে ধীরে কমান।",
        "ছবি না খুললে সাধারণত ফরম্যাট ব্রাউজারের অচেনা। ছবিটি অন্য কোনো অ্যাপে খুলে JPG বা PNG হিসেবে সেভ করে আবার দিন।",
      ] },
      { h: "সীমাবদ্ধতা ও ভালো অভ্যাস", p: [
        "একবারে একটি ছবি বদলানো যায়। ফাইলের সীমা ২৫ MB। পিক্সেল সংখ্যা খুব বেশি হলে মাপ কিছুটা ছোট করা হয় এবং টুল তা জানিয়ে দেয়।",
        "ব্রাউজার কোনো ফরম্যাট সাপোর্ট না করলে অন্য ফরম্যাটে সেভ হতে পারে। ডাউনলোডের আগে সতর্কবার্তা পড়ে নিন এবং ফাইলের এক্সটেনশন দেখে নিন।",
        "মূল ছবিটি কখনো মুছবেন না। নতুন ফাইল আলাদা নামে আসে না, কেবল এক্সটেনশন বদলায়, তাই ফোল্ডারে দুটি ফাইল গুলিয়ে ফেলবেন না। ডাউনলোড করা ফোল্ডারে ফাইলের ধরন দেখে চিনে নিন।",
        "কোনো আবেদনের ছবির জন্য নির্দিষ্ট ফরম্যাট ও সাইজের শর্ত থাকলে তা সংশ্লিষ্ট ওয়েবসাইটের নির্দেশনা থেকে দেখে নিন।",
      ] },
    ],
    en: [
      { h: "Step by step with a real example", p: [
        "Suppose a job application accepts only JPG, but your signature is a PNG named signature.png. Select it and choose JPG. If it has a transparent background, that will turn white, which is usually fine for a signature or photo. When you download, the file will be named signature.jpg.",
        "You can see the new file size before downloading. If you lower the quality from 90% to 80%, the size is recalculated and shown again. How much it drops depends on the image, so no fixed number can be promised in advance.",
        "It is also easy to compare formats for the same picture. Press JPG, PNG and WebP one after another and each time the new size is shown.",
      ] },
      { h: "When and why it helps", p: [
        "Some forms and websites accept only certain formats. Screenshots are usually PNG and phone photos usually JPG. Converting as needed saves trouble at upload time.",
        "Many people use WebP to keep website and blog images small, which helps pages load faster. Older software and some apps may not open WebP, so think about where the file will be used.",
        "Logos and images with transparent backgrounds are best kept as PNG. Because nothing is uploaded, converting personal photos or ID pictures here also keeps them on your own device.",
      ] },
      { h: "Common mistakes and fixes", p: [
        "Many people convert a JPG to PNG expecting better quality. Lost detail does not come back, and the file may become larger. Convert only when a format requirement forces you to.",
        "Some are surprised by a white background after converting to JPG. That is a limit of JPG. Choose PNG or WebP if you need transparency.",
        "Setting the quality very low brings blur and small blotches. Start at 80 to 90% and lower it gradually only if needed.",
        "If an image does not open, the browser usually does not recognise its format. Open it in another app, save it as JPG or PNG, and try again.",
      ] },
      { h: "Limits and good habits", p: [
        "One image is converted at a time, and the file limit is 25 MB. If the pixel count is very high, the dimensions are reduced slightly and the tool says so.",
        "If the browser cannot produce a format, the file may be saved in another one. Read the warning before downloading and check the file extension.",
        "Keep your original file. The new file keeps the same name with a different extension, so do not mix the two up in your downloads folder.",
        "If an application form requires a particular format or size, check the instructions on that website.",
      ] },
    ],
  },
  "invoice-generator": {
    bn: [
      { h: "একটি বাস্তব উদাহরণে হিসাব", p: [
        "ধরুন আপনি ফ্রিল্যান্স ডিজাইনার। একজন গ্রাহকের জন্য প্রথম আইটেম \"লোগো ডিজাইন\", পরিমাণ 1, দাম 5000। দ্বিতীয় আইটেম \"ব্যানার ডিজাইন\", পরিমাণ 3, দাম 800। টুল প্রথম সারির মোট দেখাবে 5,000.00 এবং দ্বিতীয় সারির মোট 2,400.00। সাবটোটাল হবে 7,400.00।",
        "এবার ছাড়ের ঘরে 400 ও ভ্যাটের ঘরে 5 দিন। টুল আগে সাবটোটাল থেকে ছাড় বাদ দেয়, ফলে 7,000.00 থাকে। এই অঙ্কের ওপর 5% ভ্যাট হয় 350.00। সর্বমোট দেখাবে Tk 7,350.00। ইনভয়েসের নিচের ডান দিকে সাবটোটাল, ছাড়, ভ্যাট ও সর্বমোট আলাদা লাইনে আসে, তাই গ্রাহক সহজে হিসাব মিলিয়ে নিতে পারেন।",
      ] },
      { h: "কখন এই টুল কাজে লাগে", p: [
        "ফ্রিল্যান্সার, ছোট দোকান, হোম বিজনেস বা সেবাদাতা প্রায়ই দ্রুত একটি বিল পাঠাতে চান। এমন সময় আলাদা সফটওয়্যার নামানো ঝামেলার। এই টুলে সাইন-আপ ছাড়াই ফর্ম পূরণ করে মিনিটখানেকে একটি পরিষ্কার ইনভয়েস তৈরি হয়।",
        "কোটেশন বা মূল্যের প্রস্তাব পাঠাতেও একই ফর্ম ব্যবহার করা যায়। তবে পাতায় লেখা শিরোনাম \"INVOICE\" বা \"ইনভয়েস\" থাকে এবং তা বদলানো যায় না, এ কথা মাথায় রাখুন। পেমেন্টের জন্য ব্যাংক বা মোবাইল ব্যাংকিং নম্বর নোট ঘরে লিখে দিলে গ্রাহকের টাকা পাঠাতে সুবিধা হয়।",
        "ইনভয়েসে নিজের নাম, ঠিকানা ও ফোন একবার লিখে রাখলে পরের বার আর লিখতে হয় না, কারণ এগুলো এই ব্রাউজারে মনে থাকে। ফলে একই গ্রাহকের পুনরাবৃত্ত কাজে বা নতুন গ্রাহকের জন্য শুধু গ্রাহকের ঘর ও আইটেম বদলালেই চলে। এতে সময় অনেক বাঁচে এবং বানান ভুলের সুযোগ কমে।",
      ] },
      { h: "সাধারণ ভুল ও সমাধান", p: [
        "অনেকে পরিমাণের ঘর ফাঁকা রাখেন বা 0 দেন। টুল তখন \"প্রতিটি আইটেমে পরিমাণ ০ এর বেশি এবং দাম সঠিক দিন\" বার্তা দেখায় এবং ওই সারি হিসাবে ধরে না। পরিমাণ 1 বা তার বেশি দিন। দাম ঋণাত্মক হতে পারে না।",
        "ছাড়ের ঘরে শতাংশ লিখলে ভুল হিসাব হয়, কারণ ঘরটি টাকার অঙ্ক নেয়। ১০% ছাড় দিতে চাইলে সাবটোটালের ১০% আগে নিজে হিসাব করে অঙ্কটি দিন। ভ্যাট ০ থেকে ১০০ এর বাইরে দিলেও ত্রুটি আসে। আরেকটি সাধারণ ভুল হলো পাতা রিফ্রেশ করা। এতে আইটেম ও গ্রাহকের তথ্য চলে যায়, তাই আগে PDF সেভ করে নিন।",
        "ভুল ধরা সহজ করতে ইনভয়েসের প্রিভিউ আগে ভালো করে দেখুন। আইটেমের বিবরণ ছোট ও পরিষ্কার রাখুন, যেমন \"ওয়েবসাইট মেইনটেন্যান্স, মার্চ মাস\"। অস্পষ্ট বিবরণ থাকলে গ্রাহক পরে প্রশ্ন করতে পারেন।",
      ] },
      { h: "সীমাবদ্ধতা ও ভালো অভ্যাস", p: [
        "এটি একটি সাধারণ ইনভয়েস। সরকারি ভ্যাট চালান বা মূসক ফরম্যাটের জন্য এনবিআরের বর্তমান নিয়ম নিজে যাচাই করুন। কোন পণ্যে কত ভ্যাট প্রযোজ্য, তা এই টুল বলে না। আপনি যে হার জানেন সেটিই বসাতে হবে।",
        "প্রতিটি ইনভয়েসের জন্য আলাদা নম্বর দিন এবং তৈরি PDF একটি ফোল্ডারে রেখে দিন, কারণ টুল কোনো ইনভয়েস সেভ করে না। মুদ্রা বদলালে শুধু চিহ্ন বদলায়, অঙ্ক রূপান্তর হয় না। পাঠানোর আগে নাম, তারিখ ও সর্বমোট আরেকবার মিলিয়ে নিন।",
      ] },
    ],
    en: [
      { h: "A worked example with real numbers", p: [
        "Say you are a freelance designer. The first item is \"Logo design\", quantity 1, price 5000. The second is \"Banner design\", quantity 3, price 800. The tool shows 5,000.00 for the first row and 2,400.00 for the second, so the subtotal is 7,400.00.",
        "Now enter a discount of 400 and VAT of 5. The tool subtracts the discount from the subtotal first, leaving 7,000.00. VAT at 5% on that amount is 350.00, and the total reads Tk 7,350.00. The subtotal, discount, VAT and total appear on separate lines at the bottom right of the invoice, so your client can check the sums easily.",
      ] },
      { h: "When this tool helps", p: [
        "Freelancers, small shops, home businesses and service providers often need to send a bill quickly. Installing separate software is a hassle for that. Here you fill in a form without signing up and get a clean invoice in about a minute.",
        "You can use the same form for a quotation, but remember that the heading on the page says \"INVOICE\" and cannot be changed. Adding a bank or mobile banking number in the notes box makes it easier for the client to pay.",
      ] },
      { h: "Common mistakes and fixes", p: [
        "Some people leave the quantity empty or enter 0. The tool then shows \"Each item needs a quantity above 0 and a valid price\" and skips that row in the totals. Enter 1 or more. A price cannot be negative.",
        "Typing a percentage in the discount box gives a wrong result, because that box takes an amount. To give 10% off, work out 10% of the subtotal yourself and enter that figure. A VAT value outside 0 to 100 also triggers an error. Another common slip is refreshing the page, which clears the items and client details, so save the PDF first.",
      ] },
      { h: "Limits and good habits", p: [
        "This is a general invoice. For the official VAT challan (Mushak) format, check the current NBR rules yourself. The tool does not tell you which VAT rate applies to which product. You enter the rate you know to be correct.",
        "Give every invoice its own number and keep the PDFs in a folder, since the tool does not save invoices. Changing the currency only changes the symbol, and the amounts are not converted. Before sending, check the names, dates and total once more.",
      ] },
    ],
  },
  "meta-tag-generator": {
    bn: [
      { h: "একটি উদাহরণে দেখুন কী কোড পাবেন", p: [
        "ধরুন আপনি একটি বয়স হিসাবের পেজের জন্য টাইটেল দিলেন \"বয়স ক্যালকুলেটর - জন্মতারিখ থেকে বয়স\" এবং ডেসক্রিপশনে এক লাইনের বিবরণ। Canonical হিসেবে https://example.com/age দিলেন, ছবি দিলেন না, আর index ও follow টিক রাখলেন।",
        "টুল প্রথমে charset ও viewport ট্যাগ দেবে। তারপর title, description, robots (index, follow) এবং canonical link আসবে। এরপর og:type, og:title, og:description ও og:url আসবে। শেষে twitter:card আসবে, ছবি না থাকায় মান হবে summary, সঙ্গে twitter:title ও twitter:description। প্রতিটি ফাঁকা ঘরের ট্যাগ বাদ পড়ে, তাই অপ্রয়োজনীয় খালি ট্যাগ জমে না।",
      ] },
      { h: "কখন ও কেন কাজে লাগে", p: [
        "Blogger বা নিজের তৈরি ওয়েবসাইটে অনেক সময় ট্যাগ হাতে লিখতে হয়। বানান বা উদ্ধৃতি চিহ্নের ছোট ভুলেও ট্যাগ ভেঙে যেতে পারে। এই টুল সঠিক কাঠামোয় কোড তৈরি করে দেয়, তাই নতুন ব্লগার বা ছোট ব্যবসার মালিকের জন্য সুবিধা হয়।",
        "Facebook এ লিংক শেয়ার করলে কেমন দেখাবে, তা Open Graph ট্যাগে ঠিক করা যায়। আর সার্চ ফলাফলে টাইটেল ও বিবরণ কী দেখাবে, সে বিষয়ে আপনার প্রস্তাবও এই ট্যাগেই থাকে। যদিও Google শেষ পর্যন্ত নিজের মতো অন্য লেখা দেখাতেও পারে।",
        "ছোট একটি অভ্যাস কাজে দেয়। কোড কপির আগে টুলের কাউন্টার দেখুন। টাইটেলের কাউন্টার ৬০ ও ডেসক্রিপশনের কাউন্টার ১৬০ এর বেশি হলে লাল হয়। এটি আনুমানিক সীমা, কারণ গুগল অক্ষর নয়, পিক্সেলের প্রস্থ দেখে ছাঁটে। তাই লেখার শেষ দিকের গুরুত্বপূর্ণ কথা কেটে যেতে পারে, এটি মাথায় রেখে মূল কথা শুরুর দিকে লিখুন।",
      ] },
      { h: "সাধারণ ভুল ও সমাধান", p: [
        "Canonical বা ছবির লিংক https:// ছাড়া দিলে টুল লাল সতর্কবার্তা দেখায়। ডোমেইনসহ পূর্ণ ঠিকানা দিন, যেমন https://example.com/page। লিংকে ফাঁকা জায়গা বা ডোমেইনের ডট না থাকলেও এটি অবৈধ ধরা হয়।",
        "সব পেজে একই টাইটেল ও ডেসক্রিপশন বসানো আরেকটি বড় ভুল। প্রতিটি পেজের জন্য আলাদা কোড বানান। কাউন্টার লাল হলে লেখা আনুমানিক সীমার বেশি হয়েছে, তাই ছেঁটে ছোট করুন। আর পেজ অনির্দিষ্টকালের জন্য লুকাতে না চাইলে noindex টিক খুলে রাখবেন না।",
        "Blogger এর ক্ষেত্রে থিমে আগে থেকে কিছু মেটা ট্যাগ থাকতে পারে। নতুন কোড বসানোর আগে সেগুলো দেখে নিন এবং একই কাজের ট্যাগ একটির বেশি রাখবেন না। বড় পরিবর্তনের আগে থিমের একটি ব্যাকআপ নেওয়া নিরাপদ।",
      ] },
      { h: "সীমাবদ্ধতা ও ভালো অভ্যাস", p: [
        "টুলটি শুধু HTML কোড তৈরি করে, আপনার সাইটে বসায় না এবং বসানো ঠিক হয়েছে কি না যাচাইও করে না। বসানোর পর পেজের সোর্স দেখে নিন বা Google Search Console এর মতো টুলে পরীক্ষা করুন।",
        "ভালো টাইটেলে মূল বিষয়টি শুরুর দিকে রাখুন এবং ডেসক্রিপশনে পেজে কী পাওয়া যাবে তা সৎভাবে লিখুন। বাড়তি কীওয়ার্ড ঠাসবেন না। সাইটে আগে থেকে কোনো SEO প্লাগইন বা থিম এসব ট্যাগ দিলে একই ট্যাগ দুইবার বসাবেন না।",
      ] },
    ],
    en: [
      { h: "See what code you get in an example", p: [
        "Say you are working on an age calculator page. You enter the title \"Age Calculator - Age from date of birth\" and a one-line description. You set the canonical to https://example.com/age, leave the image empty, and keep index and follow ticked.",
        "The tool first outputs the charset and viewport tags. Then come the title, the description, robots (index, follow) and the canonical link. Next are og:type, og:title, og:description and og:url. Last is twitter:card, which is summary because there is no image, followed by twitter:title and twitter:description. A tag for any empty field is left out, so no blank tags pile up.",
      ] },
      { h: "When and why it helps", p: [
        "On Blogger or a hand-built site you often have to write these tags by hand. A small slip with a quote mark or a spelling can break a tag. This tool builds the code in the right structure, which helps new bloggers and small business owners.",
        "Open Graph tags control how a shared link looks on Facebook. The title and description tags also carry your suggestion for what search results should show, although Google may still choose to display different text.",
      ] },
      { h: "Common mistakes and fixes", p: [
        "If the canonical or image link does not start with https://, the tool shows a red warning. Give the full address with the domain, such as https://example.com/page. A link with spaces or without a dot in the domain part is also treated as invalid.",
        "Using the same title and description on every page is another big mistake. Generate separate code for each page. When a counter turns red, the text is over the approximate limit, so trim it. And do not leave noindex ticked unless you really want the page kept out of search.",
      ] },
      { h: "Limits and good habits", p: [
        "The tool only generates HTML. It does not place it on your site and it does not check that you pasted it correctly. After pasting, view the page source or test with a tool such as Google Search Console.",
        "A good title puts the main topic near the start, and a good description honestly says what the page offers. Do not stuff extra keywords. If your theme or an SEO plugin already outputs these tags, avoid adding the same tags twice.",
      ] },
    ],
  },
  "password-generator": {
    bn: [
      { h: "ধাপে ধাপে ব্যবহার ও বাস্তব উদাহরণ", p: [
        "ধরুন আপনি ইমেইল অ্যাকাউন্টের জন্য নতুন পাসওয়ার্ড চান। দৈর্ঘ্য ১৬ রেখে চারটি ধরনই টিক রাখুন। তখন মোট ৮৫টি অক্ষর থেকে বাছাই হয়: ২৬টি বড় হাতের, ২৬টি ছোট হাতের, ১০টি সংখ্যা এবং ২৩টি চিহ্ন। শক্তির বার তখন প্রায় ১০২ বিট ধরে \"শক্তিশালী\" দেখায়।",
        "দৈর্ঘ্য বাড়িয়ে ২০ করলে হিসাব প্রায় ১২৮ বিট হয় এবং বার \"খুব শক্তিশালী\" দেখায়। অর্থাৎ অক্ষর বাড়ালে শক্তি দ্রুত বাড়ে। উল্টোটাও সত্য: শুধু ৮ অক্ষরের সংখ্যা দিলে বার \"দুর্বল\" দেখায়, কারণ তখন বাছাইয়ের অক্ষর মাত্র ১০টি।",
        "যদি পাসওয়ার্ডটি কাগজে লিখে রাখতে হয়, \"বিভ্রান্তিকর অক্ষর বাদ\" টিক দিন। তখন 0 আর O, অথবা 1, l আর I গুলিয়ে ফেলার সুযোগ থাকে না। পছন্দ না হলে \"নতুন\" চাপলেই আরেকটি আসে, আর Copy চাপলে সরাসরি ক্লিপবোর্ডে যায়।",
      ] },
      { h: "কখন ও কেন কাজে লাগে", p: [
        "নিজের মনে মনে বানানো পাসওয়ার্ড সাধারণত নাম, জন্মসাল বা মোবাইল নম্বরের ধাঁচে হয়। এগুলো অন্যে সহজে অনুমান করতে পারে। র‍্যান্ডম পাসওয়ার্ডে এমন কোনো নিয়ম থাকে না।",
        "নতুন ইমেইল, ফেসবুক, ব্যাংকিং অ্যাপ, মোবাইল ব্যাংকিং বা অফিসের সিস্টেমে অ্যাকাউন্ট খুলতে এটি কাজে লাগে। ওয়াই-ফাই রাউটারের পাসওয়ার্ড বদলানোর সময়ও একটি দীর্ঘ র‍্যান্ডম পাসওয়ার্ড নেওয়া যায়। পুরোনো ও দুর্বল পাসওয়ার্ড বদলানোর কাজেও সুবিধা।",
        "একসাথে অনেক অ্যাকাউন্টের পাসওয়ার্ড বদলাতে হলে প্রতিবার \"নতুন\" চেপে আলাদা আলাদা পাসওয়ার্ড নেওয়া যায়। সেগুলো মনে রাখার জন্য পাসওয়ার্ড ম্যানেজার ব্যবহার করা ভালো।",
      ] },
      { h: "সাধারণ ভুল ও সমাধান", p: [
        "প্রথম ভুল হলো ছোট দৈর্ঘ্য রাখা। ৮ অক্ষরের পাসওয়ার্ড কাজ চালানোর মতো হলেও গুরুত্বপূর্ণ অ্যাকাউন্টে ১৬ বা তার বেশি নেওয়াই ভালো। শক্তির বার \"মোটামুটি\" বা \"দুর্বল\" দেখালে দৈর্ঘ্য বাড়ান।",
        "দ্বিতীয় ভুল হলো একই পাসওয়ার্ড একাধিক জায়গায় ব্যবহার। একটি সাইট থেকে তথ্য ফাঁস হলে অন্য অ্যাকাউন্টেও ঢোকা সম্ভব হয়। প্রতিটির জন্য আলাদা পাসওয়ার্ড নিন।",
        "তৃতীয় সমস্যা হলো কিছু সাইট কিছু চিহ্ন নেয় না, অথবা সর্বোচ্চ দৈর্ঘ্যের সীমা রাখে। সেক্ষেত্রে চিহ্নের টিক তুলে দিন বা দৈর্ঘ্য কমান, তবে দৈর্ঘ্য কমালে অন্য ধরন মেশানো রাখুন। কপি করার পর ফাঁকা জায়গা যেন না আসে, সেটাও দেখে নিন।",
      ] },
      { h: "সীমাবদ্ধতা ও ভালো অভ্যাস", p: [
        "টুলটি শুধু পাসওয়ার্ড বানায়। সেটি আপনার অ্যাকাউন্টে আপনি নিজে বসান। এটি কোথাও জমা রাখে না, তাই পেজ বন্ধ করার আগে ব্যবহারের জায়গায় বা পাসওয়ার্ড ম্যানেজারে রেখে দিন, নয়তো আর ফিরে পাবেন না।",
        "শক্তির বার একটি আনুমানিক হিসাব। এটি শুধু দৈর্ঘ্য ও অক্ষরের ধরনের ওপর ভিত্তি করে। আপনার ডিভাইসে ম্যালওয়্যার থাকলে বা কেউ ফিশিং সাইটে আপনার পাসওয়ার্ড নিয়ে নিলে বার যা-ই দেখাক, ঝুঁকি থেকে যায়।",
        "ভালো অভ্যাস: গুরুত্বপূর্ণ অ্যাকাউন্টে টু-ফ্যাক্টর অথেনটিকেশন চালু করুন। পাসওয়ার্ড কারও সাথে মেসেজে শেয়ার করবেন না। ক্লিপবোর্ডে কপি করা পাসওয়ার্ড ব্যবহারের পর অন্য কিছু কপি করে মুছে দিন। সন্দেহ হলে পাসওয়ার্ড বদলে ফেলুন।",
      ] },
    ],
    en: [
      { h: "Step by step, with a real example", p: [
        "Say you need a new password for an email account. Keep the length at 16 and leave all four types ticked. The pool then holds 85 characters: 26 uppercase, 26 lowercase, 10 digits and 23 symbols. The strength bar works this out to about 102 bits and shows \"Strong\".",
        "Raise the length to 20 and the estimate is about 128 bits, which shows \"Very strong\". So adding characters increases strength quickly.",
        "If you must write the password on paper, tick \"Exclude confusing characters\". Then 0 and O, or 1, l and I, cannot be mixed up. If you do not like the result, press \"New\" for another one, and Copy sends it straight to the clipboard.",
      ] },
      { h: "When and why it is useful", p: [
        "Passwords made up in your head often follow patterns such as a name, a birth year or a phone number. Others can guess these. A random password has no such pattern.",
        "It helps when you open a new email, Facebook, banking app, mobile banking or work system account. You can also use a long random password when changing a Wi-Fi router password. It is useful for replacing old, weak passwords too.",
        "When you have to change many passwords at once, press \"New\" each time to get a separate password for each account. A password manager is a sensible way to remember them.",
      ] },
      { h: "Common mistakes and fixes", p: [
        "The first mistake is a short length. Eight characters may do for a minor account, but for important ones take 16 or more. If the bar shows \"Fair\" or \"Weak\", increase the length.",
        "The second mistake is reusing the same password in several places. If one site leaks data, your other accounts can be opened too. Use a different one for each.",
        "The third issue is that some sites reject certain symbols or set a maximum length. Untick symbols or lower the length, but if you shorten it, keep the other types mixed in. After copying, also check that no stray space was added.",
      ] },
      { h: "Limits and good habits", p: [
        "The tool only generates a password. You place it in your account yourself. It keeps nothing, so before closing the page store the password where you will use it or in a password manager, or it is lost.",
        "The strength bar is an estimate based only on length and character types. If your device has malware, or someone captures your password on a phishing site, the risk remains whatever the bar shows.",
        "Good habits: turn on two-factor authentication for important accounts. Do not share passwords in messages. After pasting a copied password, copy something else to clear the clipboard. If you suspect a leak, change the password.",
      ] },
    ],
  },
  "qr-scanner": {
    bn: [
      { h: "ধাপে ধাপে ব্যবহার ও একটি উদাহরণ", p: [
        "ধরুন একটি দোকানের পোস্টারে QR কোড আছে। \"ক্যামেরা চালু করুন\" চাপলে ব্রাউজার অনুমতি চাইবে। অনুমতি দিলে ফোনের পেছনের ক্যামেরা চালু হয়। কোডটি ফ্রেমের ভেতরে ধরলে টুল প্রায় প্রতি এক-অষ্টমাংশ সেকেন্ডে ছবি পরীক্ষা করে। কোড পড়া গেলে ফোন সামান্য কাঁপে, ক্যামেরা বন্ধ হয় এবং ফলাফল আসে।",
        "ধরুন কোডে লেখা ছিল https://example.com/offer। টুল \"লিংক পাওয়া গেছে\" লিখে ঠিকানাটি পুরো দেখাবে এবং সতর্কবার্তা দেবে। ঠিকানা ঠিক মনে হলে \"লিংক খুলুন\" চাপুন, লিংক নতুন ট্যাবে খুলবে। কোডে যদি শুধু \"Table 5\" লেখা থাকত, টুল \"লেখা পাওয়া গেছে\" দেখাত এবং শুধু কপি করার সুযোগ দিত।",
      ] },
      { h: "কখন কাজে লাগে", p: [
        "অনেক সময় QR কোড কম্পিউটারের স্ক্রিনে বা অন্য ফোনে দেখা যায়, অথচ সেটি স্ক্যান করার আলাদা অ্যাপ হাতে নেই। এই টুল ব্রাউজারেই চলে, কিছু নামাতে হয় না। কোনো পিডিএফ বা হোয়াটসঅ্যাপে পাওয়া QR এর স্ক্রিনশট থাকলে তা আপলোড করেই লেখা পড়া যায়।",
        "পোস্টার, ফ্লায়ার, প্যাকেট বা ইভেন্টের টিকিটে ছাপা লিংক এভাবে দেখে নেওয়া যায়। খোলার আগে ঠিকানাটি পড়তে পারাটাই এখানে বড় সুবিধা।",
        "ক্যামেরা চালু করার আগে ফোনের ক্যামেরার লেন্স পরিষ্কার আছে কি না দেখে নিন। অনেক সময় আঙুলের দাগেই ছবি ঝাপসা হয়। দিনের আলোয় বা ভালো আলোয় স্ক্যান করলে ফল তুলনামূলক ভালো আসে।",
      ] },
      { h: "সাধারণ ভুল ও সমাধান", p: [
        "স্ক্যান না হওয়ার বড় কারণ হলো ঝাপসা ছবি, কম আলো বা ঝলকানি। কোড থেকে একটু দূরে গিয়ে ফোন স্থির ধরুন এবং ঘরের আলো বাড়ান। স্ক্রিনে দেখা কোডের ক্ষেত্রে স্ক্রিনের উজ্জ্বলতা বাড়ান।",
        "ছবি আপলোডে কোড না পেলে স্ক্রিনশটটি ছেঁটে শুধু কোড ও তার চারপাশের সাদা অংশ রেখে আবার দিন। ক্যামেরার অনুমতি একবার \"Block\" হয়ে গেলে ব্রাউজারের সাইট সেটিংস থেকে চালু করতে হয়। অন্য অ্যাপ ক্যামেরা ধরে রাখলে সেটি বন্ধ করে আবার চেষ্টা করুন।",
        "কোনো দোকান বা অনুষ্ঠানে লাগানো QR কোডের ওপর আলাদা স্টিকার সাঁটা আছে কি না, তা খেয়াল করুন। এমন স্টিকার প্রায়ই প্রতারণার কাজে লাগে। স্ক্যানের পর ডোমেইন চেনা মনে না হলে লিংক খুলবেন না।",
        "ফোনের ক্যামেরা একেবারে কাছে না নিয়ে কিছুটা দূর থেকে ধরুন, কারণ খুব কাছে গেলে ক্যামেরা ফোকাস হারাতে পারে। ফ্রেমের ভেতরে কোডটি সোজা ও পুরোটা রাখুন, কাত বা অর্ধেক কাটা অবস্থায় রাখলে পড়তে সময় লাগে।",
      ] },
      { h: "সীমাবদ্ধতা ও ভালো অভ্যাস", p: [
        "টুলটি সাধারণ QR কোড পড়ে, বারকোড নয়। এটি লিংক নিরাপদ কি না যাচাই করে না, শুধু দেখায় লিংকে কী লেখা আছে। তাই ডোমেইনের বানান মন দিয়ে দেখুন। ব্যাংক বা পেমেন্টের নাম করে আসা অচেনা কোডে ক্লিক বা টাকা পাঠানোর আগে অন্য পথে যাচাই করুন।",
        "ছবির সাইজ ২৫ MB এর বেশি হলে নেওয়া হয় না, আর খুব বড় ছবি পড়ার আগে আনুমানিক ৪০ লাখ পিক্সেলে ছোট করা হয়। ফলাফল সেভ থাকে না, তাই দরকারি লেখা আগেই কপি করে রাখুন।",
      ] },
    ],
    en: [
      { h: "Step by step with an example", p: [
        "Say a shop poster has a QR code. Tap \"Start camera\" and the browser asks for permission. Once you allow it, the rear camera of the phone starts. When you hold the code inside the frame, the tool checks the picture roughly every eighth of a second. When the code is read, the phone vibrates briefly if it supports it, the camera stops and the result appears.",
        "Say the code held https://example.com/offer. The tool shows \"Link found\", prints the full address and adds a warning. If the address looks right, tap \"Open link\" and it opens in a new tab. If the code only said \"Table 5\", the tool would show \"Text found\" and offer only the copy option.",
      ] },
      { h: "When it helps", p: [
        "Sometimes a QR code is on a computer screen or another phone, and you have no scanner app at hand. This tool runs in the browser, so nothing needs installing. If you have a screenshot of a QR code from a PDF or a chat, you can upload it and read the content.",
        "It is handy for links printed on posters, flyers, packaging or event tickets. The real advantage is that you can read the address before opening it.",
      ] },
      { h: "Common mistakes and fixes", p: [
        "The usual reasons a scan fails are a blurry picture, poor light or glare. Step back a little, hold the phone steady and add light. For a code on a screen, raise the screen brightness.",
        "If an uploaded photo finds no code, crop the screenshot so it keeps only the code and the white margin around it, then try again. If camera permission was blocked once, turn it back on in the browser's site settings. If another app is holding the camera, close it and retry.",
      ] },
      { h: "Limits and good habits", p: [
        "The tool reads standard QR codes, not barcodes. It does not check whether a link is safe. It only shows what the link says, so read the domain spelling carefully. For unknown codes claiming to be from a bank or a payment service, verify through another channel before clicking or sending money.",
        "Images over 25 MB are rejected, and very large photos are scaled down to about 4 million pixels before reading. Results are not saved, so copy any important text first.",
      ] },
    ],
  },
  "rotate-pdf": {
    bn: [
      { h: "ধাপে ধাপে ব্যবহার ও বাস্তব উদাহরণ", p: [
        "প্রথমে PDF সিলেক্ট করুন। ফাইল খুললে বক্সে পেজ সংখ্যা ও ফাইলের আকার দেখা যায়। এরপর কত ডিগ্রি ঘোরাবেন তা বাছুন: ডানে ৯০°, বামে ৯০° বা ১৮০°। তারপর \"সব পেজ\" অথবা \"নির্দিষ্ট পেজ\" ঠিক করে PDF ঘোরান চাপুন।",
        "উদাহরণ: আপনার ১০ পেজের স্ক্যান করা ফাইলে ৩ ও ৪ নম্বর পেজ কাত হয়ে আছে। \"নির্দিষ্ট পেজ\" বেছে ঘরে 3-4 লিখুন এবং ডানে ৯০° দিন। বাকি ৮টি পেজ অপরিবর্তিত থাকবে। ফাইলের নাম scan.pdf হলে নতুন ফাইলটি scan-rotated.pdf নামে ডাউনলোড হবে।",
        "আরেকটি উদাহরণ: ৬ পেজের একটি PDF এর ১, ২, ৩ ও ৫ নম্বর পেজ উল্টো। ঘরে 1-3, 5 লিখে ১৮০° বাছলে ঠিক ওই চারটি পেজ ঘুরবে। ৪ ও ৬ নম্বর পেজ যেমন ছিল তেমনই থাকবে।",
      ] },
      { h: "কখন ও কেন কাজে লাগে", p: [
        "ফোনের ক্যামেরা বা স্ক্যানার অ্যাপ দিয়ে কাগজ স্ক্যান করলে অনেক সময় পেজ কাত বা উল্টো হয়ে যায়। জমা দেওয়ার আগে সেটি সোজা না করলে পড়তে অসুবিধা হয়। সরকারি বা অফিসের আবেদন, ভর্তির কাগজ, ইনভয়েস বা বইয়ের স্ক্যান, সবখানেই এই সমস্যা দেখা যায়।",
        "কখনো একটি ফাইলের কিছু পেজ আড়াআড়ি (ল্যান্ডস্কেপ) আর বাকি পেজ খাড়া থাকে। পুরো ফাইল না ঘুরিয়ে শুধু সেই কটি পেজ বাছলে সময় বাঁচে। অনলাইনে ফাইল জমা দেওয়ার আগে এভাবে ঠিক করে নিলে গ্রহণকারী সহজে পড়তে পারেন।",
        "ফাইলটি আপনার ডিভাইসেই প্রসেস হয়, তাই ব্যক্তিগত বা গোপনীয় কাগজ ঘোরাতেও আলাদা আপলোডের চিন্তা থাকে না।",
      ] },
      { h: "সাধারণ ভুল ও সমাধান", p: [
        "প্রথম ভুল হলো ভুল দিকে ঘোরানো। পেজ ডানে কাত থাকলে বামে ৯০° দিতে হয়, আর বামে কাত থাকলে ডানে ৯০°। নিশ্চিত না হলে একটি দিক চেষ্টা করে ফল দেখুন, ভুল হলে আবার ঘোরান। নতুন কোণ আগের সঙ্গে যোগ হয়, তাই দুই চেষ্টায় ঠিক হয়ে যায়।",
        "দ্বিতীয় ভুল হলো পেজ নম্বর ভুল ফরম্যাটে লেখা। 5-3 লিখলে টুল জানায় শুরু শেষের চেয়ে বড় হতে পারে না। মোট পেজের বেশি নম্বর দিলে বার্তা আসে যে নম্বর ১ থেকে মোট পেজের মধ্যে হতে হবে। শুধু কমা আর হাইফেন ব্যবহার করুন।",
        "তৃতীয় সমস্যা হলো ফাইল খুলতে না পারা। পাসওয়ার্ড দেওয়া বা নষ্ট PDF এই টুলে খোলে না। পাসওয়ার্ড দেওয়া ফাইল হলে আগে অন্য উপায়ে পাসওয়ার্ড সরিয়ে আনুন। ৫০ MB এর বড় ফাইলও নেওয়া হয় না।",
      ] },
      { h: "সীমাবদ্ধতা ও ভালো অভ্যাস", p: [
        "এই টুল শুধু পেজ ঘোরায়। পেজের লেখা বদলানো, কাটা বা আকার ছোট করা এর কাজ নয়। এক দফায় একটি কোণই প্রয়োগ হয়, তাই আলাদা পেজের জন্য আলাদা কোণ লাগলে কয়েকবার চালাতে হবে।",
        "ঘোরানোর পর ডাউনলোড করা ফাইল খুলে একবার সব পেজ দেখে নিন। মূল ফাইল আলাদা থাকে, তাই কোনো সমস্যা হলে আবার চেষ্টা করা যায়। ফাইলের নাম বুঝে রাখলে মূল ও নতুন ফাইল গুলিয়ে যায় না।",
        "গুরুত্বপূর্ণ কাগজ জমা দেওয়ার আগে নতুন ফাইলটি আপনার ডিভাইসের PDF ভিউয়ারে খুলে দেখুন। কিছু পুরনো ভিউয়ারে ঘোরানো পেজ ভিন্নভাবে দেখাতে পারে।",
      ] },
    ],
    en: [
      { h: "Step by step, with real examples", p: [
        "First select a PDF. Once it opens, the box shows the page count and file size. Then choose how far to rotate: right 90°, left 90° or 180°. Decide between All pages and Chosen pages, then press Rotate PDF.",
        "Example: your 10-page scanned file has pages 3 and 4 lying sideways. Choose Chosen pages, type 3-4 and pick right 90°. The other eight pages remain unchanged. If the file was called scan.pdf, the new file downloads as scan-rotated.pdf.",
        "Another example: in a 6-page PDF, pages 1, 2, 3 and 5 are upside down. Type 1-3, 5 and choose 180°, and exactly those four pages turn. Pages 4 and 6 stay as they were.",
      ] },
      { h: "When and why it helps", p: [
        "When you scan paper with a phone camera or a scanner app, pages often come out sideways or upside down. Submitting the file without fixing it makes it hard to read. This happens with office or government applications, admission papers, invoices and scanned books.",
        "Sometimes a file has a few landscape pages while the rest are upright. Selecting only those pages saves time compared with rotating the whole file. Fixing the orientation before you upload the file somewhere makes it easier for the receiver to read.",
        "The file is processed on your own device, so you do not need to worry about uploading personal or private papers.",
      ] },
      { h: "Common mistakes and fixes", p: [
        "The first mistake is rotating the wrong way. If a page leans to the right, it needs left 90°, and if it leans left it needs right 90°. If you are unsure, try one direction and check. Because the new angle is added to the old one, two attempts will fix it.",
        "The second mistake is writing the page numbers in the wrong format. Typing 5-3 makes the tool say the start cannot be after the end. A number above the page count triggers a message that numbers must be between 1 and the total. Use only commas and hyphens.",
        "The third problem is a file that will not open. Password protected or damaged PDFs do not open in this tool. For a protected file, remove the password by another method first. Files larger than 50 MB are also not accepted.",
      ] },
      { h: "Limits and good habits", p: [
        "This tool only rotates pages. It does not edit text, crop pages or reduce file size. One run applies one angle, so if different pages need different angles you will need to run it more than once.",
        "After rotating, open the downloaded file and look through every page. The original stays separate, so you can try again if something is wrong. Keeping the file names clear stops you mixing up the original and the new copy.",
        "Before submitting an important document, open the new file in your device's PDF viewer. Some older viewers may display rotated pages differently.",
      ] },
    ],
  },
  "unit-converter": {
    bn: [
      { h: "ধাপে ধাপে ব্যবহার ও বাস্তব উদাহরণ", p: [
        "ধরুন একটি জমির মাপ ১ একর, আপনি জানতে চান তা কত শতাংশ। উপরে \"ক্ষেত্রফল\" বাছুন, মানে ১ লিখুন, \"থেকে\" তে একর ও \"এ\" তে শতাংশ দিন। ফলাফল আসবে ১ একর = ১০০ শতাংশ।",
        "আরেকটি উদাহরণ: ১০০ কিমি/ঘণ্টা গতি মাইল/ঘণ্টায় কত। \"গতি\" ক্যাটাগরিতে কিমি/ঘণ্টা থেকে মাইল/ঘণ্টা বাছুন। ফল প্রায় ৬২.১৩৭১১৯২ মাইল/ঘণ্টা।",
        "তাপমাত্রায় ১০০ সেলসিয়াস দিলে ফারেনহাইটে ২১২ এবং কেলভিনে ৩৭৩.১৫ আসে। ডেটা সাইজে ২.৫ GB কে MB তে বদলালে ২৫৬০ MB আসে, কারণ এখানে ১ GB = ১০২৪ MB। ক্যাটাগরি বদলালে \"থেকে\" ও \"এ\" নিজে থেকে ওই ক্যাটাগরির প্রথম দুটি একক ধরে।",
      ] },
      { h: "কখন ও কেন কাজে লাগে", p: [
        "বাংলাদেশে জমির মাপে শতাংশ, একর ও বর্গফুট একসাথে আসে। বাড়ি বা প্লট কেনার আগে বিজ্ঞাপনের বর্গফুট আর দলিলের শতাংশ মিলিয়ে দেখতে এই টুল কাজে লাগে।",
        "বিদেশে পড়াশোনা বা কাজের সময় ইঞ্চি, ফুট, পাউন্ড ও ফারেনহাইটের সাথে মোকাবিলা করতে হয়। রান্নার রেসিপিতে কাপ ও আউন্স থাকলে মিলিলিটার বা গ্রামে বদলে নেওয়া যায়। ভ্রমণে মাইল ও কিলোমিটারের হিসাবও লাগে।",
        "মোবাইল বা কম্পিউটারে ফাইলের সাইজ আর ইন্টারনেট প্যাকেজের GB, MB বোঝাতেও এটি সহায়ক। শিক্ষার্থীরা পড়ার সময় একক বদলের হিসাব দ্রুত মিলিয়ে নিতে পারে।",
      ] },
      { h: "সাধারণ ভুল ও সমাধান", p: [
        "একটি সাধারণ ভুল হলো ভুল ক্যাটাগরিতে থাকা। ক্যাটাগরি বদলালে একক তালিকাও বদলে যায়, তাই মিটার বা কেজি খুঁজে না পেলে উপরের বাটন দেখুন। আরেকটি ভুল হলো \"থেকে\" ও \"এ\" উল্টো বাছাই। ফল অদ্ভুত লাগলে অদলবদল বাটন চেপে দেখুন।",
        "ডেটা সাইজে ১ KB = ১০২৪ বাইট ধরা হয়। স্টোরেজ ডিভাইসের গায়ের মাপ কিছু ক্ষেত্রে ১০০০ ভিত্তিক হয়, তাই ৫০০ GB লেখা ডিস্কে কম্পিউটার কিছুটা কম সাইজ দেখাতে পারে। এটি ভুল নয়, মাপের নিয়মের পার্থক্য।",
        "তাপমাত্রায় −২৭৩.১৫°C এর নিচের মান দিলে ভুলের বার্তা আসে। মান ঠিক আছে কিনা ও এককটি সঠিক কিনা দেখুন, বিশেষ করে কেলভিন আর সেলসিয়াস গুলিয়ে ফেললে।",
      ] },
      { h: "সীমাবদ্ধতা ও ভালো অভ্যাস", p: [
        "টুলে সাতটি ধরনের নির্দিষ্ট কিছু একক আছে। কাঠা, বিঘা, মণ, সের, ভরি বা রতির মতো স্থানীয় একক এখানে নেই। গ্যালন, কাপ ও ফ্লুইড আউন্স US মাপের, UK মাপের নয়। এক ধরন থেকে অন্য ধরনে বদলানো যায় না।",
        "ফলাফল বেশি দশমিক সংখ্যা পর্যন্ত দেখায়। প্রয়োজনমতো নিজে গোল করে নিন। জমি কেনাবেচা, ওষুধের ডোজ বা প্রকৌশলের মতো গুরুত্বপূর্ণ কাজে শুধু একটি টুলের ফলের ওপর নির্ভর না করে দলিল, বিধি বা সংশ্লিষ্ট কর্তৃপক্ষের মাপ মিলিয়ে নিন।",
        "ভালো অভ্যাস হলো ফলাফল বক্সের পূর্ণ লাইনটি পড়ে এককগুলো আবার দেখে নেওয়া। যে মান লিখেছেন সেটিও ফলের লাইনে দেখা যায়, তাই লেখার ভুল সহজে ধরা পড়ে।",
      ] },
    ],
    en: [
      { h: "Step by step, with real examples", p: [
        "Say a plot is 1 acre and you want it in shatak. Choose \"Area\", type 1, then pick acre in \"From\" and shatak in \"To\". The result reads 1 Acre = 100 Shatak.",
        "Another example: how much is 100 km/h in miles per hour? In the \"Speed\" category pick km/hour to miles/hour. The result is about 62.1371192 miles/hour.",
        "In temperature, entering 100 Celsius gives 212 in Fahrenheit and 373.15 in Kelvin. In data size, converting 2.5 GB to MB gives 2560 MB, because 1 GB is 1024 MB here. When you switch category, the From and To lists reset to the first two units of that category.",
      ] },
      { h: "When and why it is useful", p: [
        "In Bangladesh, land measures often mix shatak, acre and square feet. Before buying a flat or plot, this tool helps you compare the square feet in an advertisement with the shatak in the deed.",
        "If you study or work abroad you meet inches, feet, pounds and Fahrenheit. When a recipe uses cups and ounces, you can convert to millilitres or grams. Trips need miles and kilometres too.",
        "It also helps with file sizes and internet package amounts in GB and MB. Students can use it to check unit-change homework quickly.",
      ] },
      { h: "Common mistakes and fixes", p: [
        "One common mistake is being in the wrong category. The unit lists change with the category, so if you cannot find metre or kilogram, look at the buttons at the top. Another is choosing From and To the wrong way round. If the result looks odd, press the swap button.",
        "In data size, 1 KB is treated as 1024 bytes. Some storage devices are labelled on a base of 1000, so a disk marked 500 GB may show a smaller size on a computer. That is not an error, only a difference in measuring convention.",
        "In temperature, a value below −273.15°C gives an error message. Check the value and the unit, especially if you have mixed up Kelvin and Celsius.",
      ] },
      { h: "Limits and good habits", p: [
        "The tool has a fixed set of units across seven types. Local units such as katha, bigha, maund, ser, bhori or roti are not included. Gallon, cup and fluid ounce are US measures, not UK ones. You cannot convert from one type to another.",
        "Results can show many decimal places, so round them yourself as needed. For land dealings, medicine doses or engineering work, do not rely on one tool alone. Check against the deed, the rules or the relevant authority's measure.",
        "A good habit is to read the full result line and re-check the units. The value you typed also appears in that line, so a typing slip is easy to catch.",
      ] },
    ],
  },
};

for (const [slug, add] of Object.entries(EXTRA2)) {
  const base = TOOL_ARTICLES[slug];
  if (base) {
    base.bn.push(...add.bn);
    base.en.push(...add.en);
  } else {
    TOOL_ARTICLES[slug] = add;
  }
}
