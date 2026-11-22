// Intro text and FAQs shown under the tool cards on each /category/<slug> page.
// Every text is a [Bangla, English] pair. Keep claims general and true to the tools that exist.
export type CategoryContent = {
  intro: [string, string][];
  when: { h: [string, string]; p: [string, string] }[];
  faqs: { q: [string, string]; a: [string, string] }[];
};

export const CATEGORY_CONTENT: Record<string, CategoryContent> = {
  "bangladesh-special": {
    intro: [
      [
        "এই ক্যাটাগরির টুলগুলো বাংলাদেশের দৈনন্দিন হিসাব মাথায় রেখে বানানো। মোবাইল ব্যাংকিংয়ে টাকা তোলার চার্জ, জমির মাপ, বিদ্যুৎ বিল, পাসপোর্ট ফি, সোনার ওজন ও যাকাতের মতো হিসাব আমরা প্রায় সবাই কখনো না কখনো করি। অনেক সময় এসব হিসাবে নিয়ম বা এককের গোলমালে ভুল হয়, তাই এখানে সেগুলো এক জায়গায় সহজ ভাষায় রাখা হয়েছে।",
        "The tools in this category are built around everyday calculations in Bangladesh. Almost everyone has to work out a mobile banking cash out charge, a land measurement, an electricity bill, a passport fee, a gold weight or zakat at some point. Mistakes often come from mixed-up rules or units, so these tools put the calculations in one place in plain language.",
      ],
      [
        "প্রতিটি টুলের নিচে ব্যাখ্যা, উদাহরণ ও সাধারণ প্রশ্নের উত্তর দেওয়া আছে। ফি, রেট ও কর সময়ের সঙ্গে বদলায়, তাই ফলাফলকে আনুমানিক ধরুন এবং জরুরি সিদ্ধান্তের আগে অফিসিয়াল সূত্র বা সংশ্লিষ্ট প্রতিষ্ঠানের সর্বশেষ তথ্য মিলিয়ে নিন।",
        "Under each tool you will find an explanation, examples and answers to common questions. Fees, rates and taxes change over time, so treat the result as an estimate and check the latest figures from the official source or the organisation concerned before an important decision.",
      ],
    ],
    when: [
      {
        h: ["মোবাইল ব্যাংকিং চার্জ", "Mobile banking charges"],
        p: [
          "বিকাশ, নগদ, রকেট ও উপায়ের ক্যাশ আউটে কত টাকা কাটবে, তা আগে থেকে জানতে চার্জ ক্যালকুলেটরগুলো কাজে লাগে। গাইড পেজে চার্জ কীভাবে হিসাব হয় তার নিয়মও আছে।",
          "The charge calculators for bKash, Nagad, Rocket and Upay show how much will be deducted on a cash out before you go to the agent. The guides explain how the charge is worked out.",
        ],
      },
      {
        h: ["জমি, সোনা ও কর", "Land, gold and tax"],
        p: [
          "জমির শতাংশ, কাঠা ও বিঘা, সোনার ভরি ও গ্রাম, যাকাতের নিসাব আর আয়করের মোটামুটি হিসাব এখানে পাবেন। এসব ক্ষেত্রে এককের রূপান্তরেই বেশি ভুল হয়।",
          "You can work with land units such as shotangsho, katha and bigha, gold weights in vori and grams, the zakat nisab and a rough income tax estimate. Most errors in these areas come from converting units.",
        ],
      },
      {
        h: ["সরকারি সেবা ও প্রবাসী হিসাব", "Government services and remittance"],
        p: [
          "পাসপোর্ট ফি, সরকারি চাকরির বয়স, বিদ্যুৎ বিল ও বিদেশি মুদ্রার রেট এই ক্যাটাগরিতে আছে। প্রবাসীরা দেশে টাকা পাঠানোর আগে মুদ্রার হিসাবটি দেখে নিতে পারেন।",
          "Passport fees, the age limit for government jobs, electricity bills and foreign currency rates are covered here. People working abroad can check the currency conversion before sending money home.",
        ],
      },
    ],
    faqs: [
      {
        q: ["এই ক্যাটাগরির টুলের ফলাফল কি অফিসিয়াল?", "Are the results from these tools official?"],
        a: ["না। ফলাফল আনুমানিক হিসাব। ফি, রেট ও কর বদলাতে পারে, তাই চূড়ান্ত তথ্যের জন্য সংশ্লিষ্ট প্রতিষ্ঠানের অফিসিয়াল সূত্র দেখুন।", "No. The results are estimates. Fees, rates and taxes can change, so check the official source of the organisation concerned for the final figure."],
      },
      {
        q: ["আমার দেওয়া তথ্য কি কোথাও জমা হয়?", "Is the information I enter stored anywhere?"],
        a: ["বেশিরভাগ টুল আপনার ব্রাউজারেই হিসাব করে, ইনপুট আমাদের সার্ভারে পাঠানো হয় না। বিস্তারিত প্রাইভেসি পলিসিতে আছে।", "Most tools calculate in your browser and the input is not sent to our servers. The details are in the privacy policy."],
      },
      {
        q: ["কোনো রেট বা ফি ভুল মনে হলে কী করব?", "What if a rate or fee looks wrong?"],
        a: ["সূত্রসহ আমাদের ইমেইল করুন। আমরা যাচাই করে ঠিক করব। যোগাযোগ পেজে ইমেইল ঠিকানা আছে।", "Email us with the source. We will check and correct it. The email address is on the contact page."],
      },
    ],
  },

  "education-calculation": {
    intro: [
      [
        "শিক্ষার্থী ও সাধারণ মানুষের নিত্যদিনের হিসাবের জন্য এই ক্যাটাগরি। এসএসসি ও এইচএসসির জিপিএ, বিশ্ববিদ্যালয়ের সিজিপিএ, বয়স, শতকরা, ঋণের কিস্তি, বিএমআই, এফডিআর ও ডিপিএসের সুদের মতো হিসাব এখানে পাবেন। সঙ্গে আছে সায়েন্টিফিক ক্যালকুলেটর, ইউনিট কনভার্টার ও তারিখের পার্থক্য বের করার টুল।",
        "This category is for the everyday calculations of students and ordinary people. You can work out SSC and HSC GPA, university CGPA, age, percentages, loan instalments, BMI and FDR or DPS interest. There is also a scientific calculator, a unit converter and a date difference tool.",
      ],
      [
        "শুধু উত্তর দেওয়াই নয়, প্রতিটি টুলের নিচে হিসাবের নিয়ম ও উদাহরণ দেওয়া আছে, যাতে আপনি পদ্ধতিটাও বুঝতে পারেন। পরীক্ষা বা ফর্ম পূরণের মতো গুরুত্বপূর্ণ কাজে ফলাফল প্রতিষ্ঠানের নিজস্ব নিয়মের সঙ্গে মিলিয়ে নিন।",
        "Besides giving the answer, each tool explains the method with examples, so you also understand how it works. For important tasks such as exams or filling in a form, compare the result with the rules of the institution concerned.",
      ],
    ],
    when: [
      {
        h: ["পড়াশোনা", "Studies"],
        p: [
          "জিপিএ ও সিজিপিএ ক্যালকুলেটর ফলাফল বা ভর্তির আবেদনের আগে নিজের গড় বের করতে সাহায্য করে। সায়েন্টিফিক ক্যালকুলেটর গণিত ও পদার্থবিজ্ঞানের হিসাবে কাজে লাগে।",
          "The GPA and CGPA calculators help you find your average before results or an admission application. The scientific calculator helps with maths and physics problems.",
        ],
      },
      {
        h: ["টাকা ও ঋণ", "Money and loans"],
        p: [
          "ঋণ নেওয়ার আগে কিস্তির অঙ্ক জানতে ইএমআই ক্যালকুলেটর, আর সঞ্চয়ের সুদ দেখতে এফডিআর ও ডিপিএস ক্যালকুলেটর ব্যবহার করুন। শতকরা ক্যালকুলেটর ছাড়, ভ্যাট ও লাভ-ক্ষতির হিসাবে কাজে আসে।",
          "Use the EMI calculator to know the instalment before taking a loan, and the FDR and DPS calculator to see savings interest. The percentage calculator helps with discounts, VAT and profit or loss.",
        ],
      },
      {
        h: ["দৈনন্দিন কাজ", "Daily tasks"],
        p: [
          "বয়স, দুই তারিখের ব্যবধান, বিল ভাগাভাগি, ইউনিট রূপান্তর ও টাকার অঙ্ক কথায় লেখার মতো ছোট কাজও এখানে হয়ে যায়।",
          "Small jobs like finding age, the gap between two dates, splitting a bill, converting units and writing a taka amount in words can also be done here.",
        ],
      },
    ],
    faqs: [
      {
        q: ["জিপিএ হিসাবে কোন নিয়ম ধরা হয়?", "Which rule does the GPA calculation follow?"],
        a: ["টুলের নিচে ব্যবহৃত গ্রেড পয়েন্ট ও নিয়ম লেখা আছে। বিশ্ববিদ্যালয় বা বোর্ডের নিজস্ব নিয়ম আলাদা হলে তাদের নিয়মই চূড়ান্ত।", "The grade points and rules used are written under the tool. If a university or board has its own rule, that rule is final."],
      },
      {
        q: ["ফলাফল কি সবসময় নির্ভুল?", "Is the result always exact?"],
        a: ["গণিতের হিসাব নির্ভুলভাবে করা হয়, তবে ঋণ, সুদ বা ফি-এর ক্ষেত্রে ব্যাংক বা প্রতিষ্ঠানের নিজস্ব নিয়মে সামান্য ব্যবধান হতে পারে।", "The maths is done exactly, but for loans, interest or fees a bank or institution may apply its own rules and the figure can differ slightly."],
      },
      {
        q: ["টুল ব্যবহারে কি সাইনআপ লাগে?", "Do I need to sign up to use the tools?"],
        a: ["না। সব টুল সাইনআপ ছাড়া ফ্রি ব্যবহার করা যায়।", "No. All tools are free to use without signing up."],
      },
    ],
  },

  "image-pdf": {
    intro: [
      [
        "ছবি ও PDF নিয়ে সাধারণ কাজগুলো এই ক্যাটাগরিতে আছে: ছবির সাইজ কমানো, মাপ বদলানো, ফরম্যাট রূপান্তর, ছবি থেকে PDF, PDF জোড়া লাগানো ও ভাগ করা, PDF-এর সাইজ কমানো, PDF থেকে ছবি এবং QR কোড তৈরি। ফর্ম পূরণ, চাকরির আবেদন বা ভর্তির সময় ফাইলের সাইজ ও ফরম্যাটের সীমা মানতে এগুলো দরকার হয়।",
        "This category covers common jobs with images and PDFs: reducing image size, resizing, converting formats, turning images into a PDF, merging and splitting PDFs, reducing PDF size, turning PDF pages into images and making QR codes. They help when a form, job application or admission asks for a file within a size or format limit.",
      ],
      [
        "এই টুলগুলোর কাজ আপনার ফোন বা কম্পিউটারের ব্রাউজারেই হয়, ফাইল আমাদের সার্ভারে আপলোড হয় না। তাই NID, সনদ বা পাসপোর্টের ছবির মতো ব্যক্তিগত ফাইল নিয়ে কাজ করা তুলনামূলক নিরাপদ। তবে ফাইল বড় হলে কাজ ধীর হতে পারে, আর প্রতিটি টুলের সীমা নিচের ব্যাখ্যায় লেখা আছে।",
        "The work in these tools happens in the browser on your phone or computer, and files are not uploaded to our server. That makes it safer to work with personal files such as an NID, a certificate or a passport photo. Large files can be slow, and the limits of each tool are written in its explanation.",
      ],
    ],
    when: [
      {
        h: ["আবেদন ও ফর্ম", "Applications and forms"],
        p: [
          "অনেক পোর্টাল ছবি বা PDF-এর সর্বোচ্চ সাইজ বেঁধে দেয়। ছবি কম্প্রেস বা রিসাইজ করে এবং PDF কম্প্রেস করে সেই সীমার মধ্যে আনা যায়। সীমা কত, তা সংশ্লিষ্ট ওয়েবসাইটের নির্দেশনায় দেখে নিন।",
          "Many portals set a maximum size for an image or PDF. You can bring a file within the limit by compressing or resizing the image or compressing the PDF. Check the limit in the instructions of the website concerned.",
        ],
      },
      {
        h: ["কাগজপত্র গুছানো", "Organising documents"],
        p: [
          "স্ক্যান বা ফোনে তোলা ছবিগুলো এক PDF-এ জুড়ে পাঠানো যায়। বড় PDF থেকে দরকারি পেজ আলাদা করা বা ভুল দিকে থাকা পেজ ঘুরিয়ে ঠিক করাও সম্ভব।",
          "Scanned or phone photos can be combined into one PDF for sending. You can also pull the pages you need out of a large PDF, or rotate pages that are the wrong way up.",
        ],
      },
      {
        h: ["QR কোড", "QR codes"],
        p: [
          "লিংক বা লেখা থেকে QR কোড বানিয়ে PNG হিসেবে নামানো যায়। ক্যামেরা দিয়ে QR কোড স্ক্যান করার টুলও আছে।",
          "You can make a QR code from a link or text and download it as a PNG. There is also a tool to scan a QR code with the camera.",
        ],
      },
    ],
    faqs: [
      {
        q: ["আমার ফাইল কি আপলোড হয়?", "Are my files uploaded?"],
        a: ["না। কাজ ব্রাউজারেই হয়, ফাইল আমাদের সার্ভারে যায় না।", "No. The work happens in your browser and the file does not go to our server."],
      },
      {
        q: ["কতটুকু সাইজের ফাইল চলবে?", "How large a file will work?"],
        a: ["প্রতিটি টুলের আলাদা সীমা আছে, যা সেই টুলের পেজে লেখা। ফোনের মেমরি কম হলে বড় ফাইলে সমস্যা হতে পারে।", "Each tool has its own limit, written on its page. On a phone with little memory, large files may cause trouble."],
      },
      {
        q: ["কম্প্রেস করলে মান কমে যায় কি?", "Does compressing reduce quality?"],
        a: ["সাইজ কমানোর সময় সাধারণত কিছু মান কমে। কোয়ালিটি স্লাইডার বা মাত্রা বদলে ভারসাম্য ঠিক করা যায়, আর আগে ও পরের সাইজ দেখে নেওয়া যায়।", "Reducing size usually costs some quality. You can adjust the quality slider or level to find a balance and compare the size before and after."],
      },
    ],
  },

  "text-seo": {
    intro: [
      [
        "লেখক, ব্লগার, শিক্ষার্থী ও ওয়েবসাইটের মালিকদের জন্য এই ক্যাটাগরি। শব্দ ও অক্ষর গণনা, কেস পরিবর্তন, পাসওয়ার্ড তৈরি, রঙ বাছাই, ডামি টেক্সট, মেটা ট্যাগ তৈরি ও কিওয়ার্ড ডেনসিটি যাচাইয়ের মতো টুল এখানে আছে।",
        "This category is for writers, bloggers, students and website owners. It has tools to count words and characters, change text case, generate passwords, pick colours, make dummy text, create meta tags and check keyword density.",
      ],
      [
        "লেখা পেস্ট করলেই ফলাফল সঙ্গে সঙ্গে দেখা যায় এবং লেখা আপনার ব্রাউজারেই থাকে। প্রতিটি টুলের নিচে কীভাবে ব্যবহার করবেন ও কোন সীমা মনে রাখবেন, তা উদাহরণসহ লেখা আছে।",
        "Paste your text and the result appears at once, and the text stays in your browser. Under each tool there is an explanation with examples of how to use it and which limits to keep in mind.",
      ],
    ],
    when: [
      {
        h: ["লেখা ও জমা দেওয়া", "Writing and submitting"],
        p: [
          "রচনা, আবেদন বা প্রতিযোগিতায় শব্দ বা অক্ষরের সীমা থাকলে গণনা টুল দিয়ে মিলিয়ে নেওয়া যায়। কেস কনভার্টার বড় হাতের ও ছোট হাতের অক্ষর দ্রুত ঠিক করে।",
          "When an essay, application or contest has a word or character limit, the counters let you check it. The case converter quickly fixes capital and small letters.",
        ],
      },
      {
        h: ["ওয়েবসাইট ও ব্লগ", "Websites and blogs"],
        p: [
          "মেটা ট্যাগ জেনারেটর টাইটেল ও ডেসক্রিপশনের দৈর্ঘ্য মিলিয়ে ট্যাগ বানায়। কিওয়ার্ড ডেনসিটি চেকার দেখায় কোনো শব্দ লেখায় কতবার এসেছে, যাতে একই শব্দ অতিরিক্ত না বসে।",
          "The meta tag generator builds tags while checking title and description length. The keyword density checker shows how often a word appears so it is not overused.",
        ],
      },
      {
        h: ["ডিজাইন ও নিরাপত্তা", "Design and security"],
        p: [
          "কালার পিকার থেকে HEX ও RGB কোড নেওয়া যায়, লোরেম ইপসাম ডিজাইনের নমুনা টেক্সট দেয়, আর পাসওয়ার্ড জেনারেটর র‍্যান্ডম শক্ত পাসওয়ার্ড বানায়।",
          "The colour picker gives HEX and RGB codes, lorem ipsum supplies sample text for designs, and the password generator makes random strong passwords.",
        ],
      },
    ],
    faqs: [
      {
        q: ["বাংলা লেখা কি গণনা হয়?", "Does it count Bangla text?"],
        a: ["হ্যাঁ, বাংলা ও ইংরেজি দুটোই। তবে ফর্ম বা সাইটের নিজস্ব গণনা পদ্ধতি একটু আলাদা হতে পারে, তাই জমা দেওয়ার আগে তাদের নিয়ম দেখে নিন।", "Yes, both Bangla and English. A form or site may count slightly differently, so check its rules before you submit."],
      },
      {
        q: ["আমার লেখা কি জমা থাকে?", "Is my text stored?"],
        a: ["না। লেখা আপনার ব্রাউজারেই থাকে, কোথাও পাঠানো বা জমা করা হয় না।", "No. The text stays in your browser and is not sent or stored anywhere."],
      },
      {
        q: ["SEO টুল ব্যবহার করলে কি র‍্যাংক নিশ্চিত হয়?", "Does using the SEO tools guarantee a ranking?"],
        a: ["না। এই টুলগুলো লেখা গুছিয়ে নিতে সাহায্য করে, কিন্তু সার্চ র‍্যাংক অনেক কিছুর ওপর নির্ভর করে। কোনো র‍্যাংকের নিশ্চয়তা দেওয়া হয় না।", "No. These tools help you organise your writing, but search ranking depends on many things. No ranking is promised."],
      },
    ],
  },

  "daily-utility": {
    intro: [
      [
        "প্রতিদিনের ছোট ছোট কাজের জন্য এই ক্যাটাগরি। স্টপওয়াচ ও টাইমার, করণীয় তালিকা, ঈদ বা পরীক্ষার কাউন্টডাউন, বাংলা ক্যালেন্ডার, টাইম জোন কনভার্টার, খরচের হিসাব, ইনভয়েস তৈরি, র‍্যান্ডম সংখ্যা, টেক্সট টু স্পিচ ও QR স্ক্যানার এখানে পাবেন।",
        "This category is for small everyday jobs. It has a stopwatch and timer, a to-do list, a countdown for Eid or an exam, a Bangla calendar, a time zone converter, an expense tracker, an invoice maker, random numbers, text to speech and a QR scanner.",
      ],
      [
        "কিছু টুল, যেমন করণীয় তালিকা ও খরচের হিসাব, তথ্য আপনার ডিভাইসের ব্রাউজারে রাখে। ব্রাউজারের ডেটা মুছলে বা অন্য ডিভাইসে গেলে সেই তথ্য থাকবে না, তাই জরুরি তথ্য আলাদা করে সংরক্ষণ করুন।",
        "Some tools, such as the to-do list and the expense tracker, keep data in your device's browser. If you clear browser data or switch device, that data will not be there, so save important records separately.",
      ],
    ],
    when: [
      {
        h: ["সময় ও পরিকল্পনা", "Time and planning"],
        p: [
          "পড়ার সময় মাপতে স্টপওয়াচ বা টাইমার, পরীক্ষা বা ঈদের বাকি দিন দেখতে কাউন্টডাউন (তারিখ নিজে সেট করতে হয়), আর অন্য দেশের সঙ্গে সময়ের ব্যবধান জানতে টাইম জোন কনভার্টার কাজে লাগে।",
          "A stopwatch or timer measures study time, the countdown (you set the date yourself) shows days left to an exam or Eid, and the time zone converter shows the time gap with another country.",
        ],
      },
      {
        h: ["হিসাব ও কাগজপত্র", "Records and paperwork"],
        p: [
          "ছোট ব্যবসা বা ফ্রিল্যান্স কাজের জন্য ইনভয়েস PDF বানানো যায়। খরচের টুলে মাস বেছে ক্যাটাগরি অনুযায়ী খরচ দেখা যায়।",
          "For a small business or freelance work you can make an invoice PDF. In the expense tool you can pick a month and see spending by category.",
        ],
      },
      {
        h: ["ছোট সুবিধা", "Small conveniences"],
        p: [
          "লেখা থেকে কথা শুনতে টেক্সট টু স্পিচ, কয়েন ফ্লিপ বা লটারির মতো সিদ্ধান্তে র‍্যান্ডম নাম্বার জেনারেটর, আর আজকের বাংলা তারিখ দেখতে বাংলা ক্যালেন্ডার আছে।",
          "Text to speech lets you listen to text, the random number generator helps with coin flips or draws, and the Bangla calendar shows today's Bangla date.",
        ],
      },
    ],
    faqs: [
      {
        q: ["টুলের তথ্য কি অন্য ডিভাইসে পাওয়া যাবে?", "Will my data be available on another device?"],
        a: ["না। যেসব টুল তথ্য রাখে, সেগুলো শুধু ওই ডিভাইসের ব্রাউজারে রাখে। অন্য ডিভাইসে বা ব্রাউজার ডেটা মুছে ফেললে তা থাকবে না।", "No. Tools that keep data store it only in that device's browser. It will not be there on another device or after you clear browser data."],
      },
      {
        q: ["বাংলা ক্যালেন্ডার কোন নিয়মে চলে?", "Which rules does the Bangla calendar follow?"],
        a: ["টুলের পেজে ব্যবহৃত নিয়ম ব্যাখ্যা করা আছে। সরকারি বা ধর্মীয় তারিখের জন্য সংশ্লিষ্ট অফিসিয়াল ঘোষণা দেখুন।", "The rules used are explained on the tool page. For official or religious dates, check the relevant official announcement."],
      },
      {
        q: ["র‍্যান্ডম নাম্বার কি সরকারি লটারিতে ব্যবহার করা যায়?", "Can the random numbers be used in an official lottery?"],
        a: ["ছোট খেলা বা দল ভাগের মতো কাজে চলে। সরকারি বা বড় পুরস্কারের লটারিতে প্রযোজ্য আইন ও নিয়ম মানতে হবে।", "They suit small games or splitting teams. An official or large-prize lottery must follow the applicable law and rules."],
      },
    ],
  },
};
