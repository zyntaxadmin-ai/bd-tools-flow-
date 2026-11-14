# BD Tools Hub

Free online tools for Bangladesh. Fast, no signup, and everything runs in your browser (no server, no database, no uploads).

**Live:** https://bdtoolsflow.cyou/

## Tools

52 tools are live. A tool is shown on the site only after its slug is added to `lib/live.ts`.

| Category | Tools |
| --- | --- |
| Bangladesh Special (12) | bKash, Nagad, Rocket and Upay cash out calculators, Land Calculator (শতাংশ/কাঠা/বিঘা/একর/কানি, with land price), BDT Currency Converter, Electricity Bill Calculator, Govt Job Age Calculator, Passport Fee Calculator, Zakat Calculator, Gold Price Calculator (সোনার দাম, গয়নার মজুরি, ভরি/আনা/রতি ↔ গ্রাম), Income Tax Calculator |
| Education & Calculation (12) | Number to Words, FDR/DPS Calculator, Age, GPA (SSC/HSC), CGPA, BMI, EMI, Percentage, Scientific Calculator, Unit Converter, Bill Calculator, Date Difference |
| Image & PDF (10) | Image Compressor, Image Resizer, Image Converter, Image to PDF, Merge PDF, Split PDF, Compress PDF, QR Code Generator, PDF to JPG, Rotate PDF |
| Text & SEO (8) | Word Counter, Character Counter, Case Converter, Password Generator, Color Picker, Lorem Ipsum, Meta Tag Generator, Keyword Density |
| Daily Utility (10) | Stopwatch & Timer, To-Do, Random Number, Countdown, Time Zone Converter, Expense Tracker, Invoice Generator, QR Scanner, Text to Speech, Bangla Calendar |

Dropped: Background Remover, TIN Check, Plagiarism Helper, Article Rewriter. Not built yet: Bijoy to Unicode converter.

## Guides

The `/guides` section has Bangla and English how-to articles, each linked to a tool. Guides live in `lib/guides.ts` (a `GUIDES` array). Add an object there and the guide page, the `/guides` list, the sitemap, the home page section and the link on the matching tool page all pick it up. Every guide needs a dated `updated` field, a tool link, sections and FAQs. Check facts against official sources before publishing.

Live guides (39): cash out charges (and a charge table for 500 to 10,000 taka), SSC GPA, GPA to grade, GPA with the 4th subject, income tax 2026-27, electricity bill, finding units from a bill amount, prepaid recharge units, why a bill jumps, zakat, FDR/DPS, simple vs compound interest, passport fee, how many grams in a vori, CGPA, university grade points, EMI, flat vs reducing EMI, how to lower an EMI, BMI, percentage, discount and profit/loss percentages, age, number to words, square feet to shotangsho, katha to shatak, how many shatak in 1 bigha, kani/gonda/kora/kranti/til, US time to Bangladesh time, Bangladesh/India/UK time difference, 24-hour to 12-hour time, tracking monthly expenses, making a safe password, and reducing image size.

## SEO

- `lib/seoMeta.ts` holds the page title and description for every tool (Bangla and English keywords). Titles stay under about 52 characters because the layout adds " | BD Tools Flow".
- Tool and guide pages include JSON-LD structured data (guides: Article and FAQPage). `app/sitemap.ts` lists the home page, categories, tools and guides.
- `public/ads.txt` holds the AdSense publisher line.
- `app/sitemap.ts` uses a fixed `lastModified` date for the static pages, categories and tools. Update that date when you change content (last set to 2026-11-11 after the passport fee update).

## Land calculator

- `components/tools/LandCalculator.tsx` converts shatak, katha, bigha, acre, chatak, sq ft, sq yard (gaz), sq m, hectare and the traditional kani, gonda, kora, kranti, til and ojutangsho. It shows a result on first load (1 shatak) and has copy and share buttons.
- Defaults: 1 shatak = 435.6 sq ft, 1 acre = 43,560 sq ft, 1 katha = 720 sq ft, 1 bigha = 20 katha, 1 kani = 40 shatak (17,424 sq ft) = 20 gonda, 1 gonda = 4 kora, 1 kora = 3 kranti, 1 kranti = 20 til. Katha size and katha per bigha can be changed by the visitor because they differ by area. Kani and the units under it are fixed at the common Chattogram/Noakhali measure.
- It also has a length × width (rectangle or triangle) area section and a land price section (price per shatak, katha, bigha or acre gives the total, grouped in lakh/crore style).
- The page text lives in `components/toolRegistry.tsx` (Bangla title, how-to, FAQs), `lib/toolContentEn.ts` (English), `lib/seoMeta.ts` (title and description) and `lib/toolArticles.ts` (longer text under the tool). Four guides link to it: square feet to shotangsho, katha to shatak, 1 bigha in shatak, and kani/gonda.

## Electricity bill calculator

- `components/tools/ElectricityBillCalculator.tsx` has three tabs: Units to Bill (live as you type, shows the next-unit cost and the average per unit), Taka to Units (reverse) and Prepaid recharge. It also has a 50 to 1000 unit bill table (built from `computeBill`, so it always matches the calculator), a "why is my bill high" checklist, and a helpline and official site list for DESCO, DPDC, NESCO, BPDB, WZPDCL and BREB.
- When BERC changes the tariff, edit `SLABS`, `LIFELINE_RATE`, `DEFAULT_DEMAND_PER_KW` and `TARIFF_NOTE` at the top of that file. Also update the rates in the FAQ in `components/toolRegistryB9.tsx` and `lib/toolContentEn.ts`.
- Helpline numbers and site links are in the `HELPLINES` array. Check them against a real bill now and then.

## Currency converter

- `components/tools/BdtCurrencyConverter.tsx` is the converter: 22 currencies (including SAR, AED, QAR, KWD, OMR, BHD, MYR), quick pair buttons, a table of common amounts, today's taka rate for the main currencies, and a link to the Bangladesh Bank rate page.
- `components/tools/BdtCurrencyConverterServer.tsx` fetches the rates on the server (cached one hour) so the first HTML already has real numbers. If that fails, the converter loads the rates in the browser.
- `lib/currencyData.ts` holds the currency list, rate source and helpers. `lib/currencyPairs.ts` lists the pages under `/currency/<from>-to-<to>` (14 pages, for example `/currency/sar-to-bdt`) and builds each page's text. Add a pair to `PAIRS` and it gets a page and a sitemap entry.
- Rates are daily mid-market reference rates, not Bangladesh Bank or bank rates.

## Passport fee calculator

- `components/tools/PassportFeeCalculator.tsx` holds the fee table (48 or 64 pages, 5 or 10 years, regular, express or super express; 15% VAT included) and the date of the official schedule it is based on. Edit the `FEES` table and `FEES_UPDATED` there when the fees change.
- The result card shows the total, the base fee (total / 1.15), the VAT, an approximate delivery time and the cost per year. An age switch turns off the 10 year option for people under 18 or over 65. Every cell of the 12 fee table can be tapped to load it, and there is a share button.
- Delivery days (about 15–21 working days regular, 7–10 express, 2 super express) are approximate figures from published sources, not from the official portal.
- Page text: `components/toolRegistryB8.tsx` (Bangla), `lib/toolContentEn.ts` (English), `lib/seoMeta.ts` and `lib/toolArticles.ts`. Two guides link to it: the passport fee guide and passport 5 years vs 10 years.

## Zakat calculator

- `components/tools/ZakatCalculator.tsx` works out zakat from cash and bank savings, gold, silver, business stock, money owed to you, other savings, minus debts. Nisab is 7.5 vori of gold or 52.5 vori of silver, the rate is 2.5% and 1 vori is 11.664 g. The constants (`GOLD_NISAB_VORI`, `SILVER_NISAB_VORI`, `ZAKAT_RATE`) and the pure `computeZakat` function are at the top of the file.
- The visitor types today's price per vori for the chosen nisab basis (silver by default). There is no live price, because prices change daily and no free source is reliable.
- An optional helper turns a weight (vori, ana, roti) and a price into a taka value and can fill the gold or silver box. A tick box asks if one lunar year has passed (if not, the result says zakat is generally not due yet). The result has a copy button.
- Page text: `components/toolRegistryB10.tsx` (Bangla title, how-to and 13 FAQs), `lib/toolContentEn.ts`, `lib/seoMeta.ts`, `lib/toolArticles.ts`. A group in `lib/relatedTools.ts` links it with the Gold Price Calculator and Percentage.
- The wording on jewellery, debts, FDR/DPS and who can receive zakat is general and tells the reader to ask a scholar. Have a scholar check it before you change it.

## Gold price calculator

- The tool is called Gold Price Calculator, but the slug stays `gold-weight-converter-bd` so the old URL keeps working, and the component file is still `components/tools/GoldWeightConverter.tsx`.
- `lib/goldCalc.ts` holds the pure logic: `toGrams`, `fromGrams`, `computeJewellery` and `computeSell`. 1 vori = 16 ana = 96 roti = 11.664 g (so 1 ana = 6 roti = 0.729 g).
- Three tabs. **Price**: carat chips (22K, 21K, 18K, Sonaton) that each remember their own price per vori, weight in vori-ana-roti or grams, then wastage %, making charge (% of gold value or taka per vori) and VAT % (on the making charge only, or on the total). **Sell**: estimated cash for old gold after the jeweller's deduction %. **Convert**: vori-ana-roti to grams and back, plus a vori to gram table.
- Wastage, making charge, VAT and the deduction start empty (0) on purpose, because jewellers differ. There is no live gold price; the visitor types the BAJUS price for their carat.
- Page text: `components/toolRegistryB10.tsx` (10 FAQs), `lib/toolContentEn.ts`, `lib/seoMeta.ts`, `lib/toolArticles.ts`. The card name is in `data/tools.ts` and the English card text in `lib/i18nData.ts`. The "how many grams in a vori" guide links to it.

## Text to Speech

- `components/tools/TextToSpeech.tsx` uses the browser's `speechSynthesis` (voices installed on the device). It needs no server and cannot save an MP3, so the page says so.
- `lib/tts.ts` splits text into sentences, detects the script or language and picks a voice. `lib/ttsEngine.ts` queues the speech and reports real errors (missing voice, network, audio busy) or "nothing started". It is tuned for many browser quirks, so change it carefully and test on a real Android phone and in Chrome on desktop.
- Limits: 5,000 characters at a time (`MAX`), and a `.txt` upload up to 1 MB (only the first 5,000 characters are used). There are Bangla and English sample buttons and a word count with an approximate listening time (150 words a minute, adjusted by speed).
- Voices marked "online" in the list can use the servers of the browser or phone maker, so the FAQ says the tool itself sends nothing but online voices may. The in-app browsers of Instagram and Facebook have no voice support, and the tool shows how to open the page in Chrome.
- Page text: `components/toolRegistryB4.tsx` (10 FAQs), `lib/toolContentEn.ts`, `lib/seoMeta.ts`, `lib/toolArticles.ts`.

## Time zone converter

- `components/tools/TimeZoneConverter.tsx` has a From place, a To place and a Swap button, a date and time (or the current time), and a 12h/24h switch. The result shows the time in the To place, the hour difference and whether the day changes.
- It also shows a meeting helper (hours that fall between 9:00 and 18:00 in both places, counted in whole hours so it is approximate), a 24-hour table for the chosen date, and the same moment in other places (11 popular ones, or all 31 with a button).
- To add a place, add one entry to the `ZONES` array at the top of the file (IANA id, Bangla name, English name, group, and `popular: true` if it should show by default). `GROUPS` sets the headings in the dropdowns. Daylight saving comes from the browser's own time zone data, and Bangladesh is UTC+6 with no DST.
- `lib/tz.ts` holds the helpers: `wallParts`, `offsetMinutes`, `zonedToInstant`, `fmtOffset`, `formatInZone`, `hmInZone`, `dayShift` and `overlapRuns`.
- Page text: `components/toolRegistryB3.tsx` (9 FAQs), `lib/toolContentEn.ts`, `lib/seoMeta.ts`, `lib/toolArticles.ts`. Three guides about US time, UTC/India/UK time difference and 12/24-hour time link to it.

## Keyword density checker

- `components/tools/KeywordDensityChecker.tsx` analyses pasted text in the browser. It shows total words, unique words and reading time, the top 20 words or 2-3 word phrases (with filters for short and common words), and a **target keywords** box (one per line, up to 10) with each keyword's count, density and a rough badge (under 1%, 1-2%, a bit high, very high). A word above 3% triggers a keyword stuffing warning. Results can be copied (tab separated, for a spreadsheet) or downloaded as CSV (UTF-8 with BOM so Bangla opens in Excel).
- `lib/keywords.ts` holds the logic: `tokenize`, `analyze` (top phrases), `countTargets` (target keywords, whole-word and in order), `densityLevel` and `csvCell`. Density = count / total words x 100, the same for phrases. The badge limits are a rule of thumb, not a Google rule, and the page says so.
- Bangla words with an ending added (`ক্যালকুলেটর`, `ক্যালকুলেটরের`) count as different words. The page text tells the visitor to enter each form as a target keyword.
- There is no URL mode, because fetching other sites needs a server route (and brings abuse risks). The visitor pastes the page text instead.
- Page text: `components/toolRegistryB3.tsx` (11 FAQs), `lib/toolContentEn.ts`, `lib/seoMeta.ts`, `lib/toolArticles.ts`. Note: `toolArticles.ts` has a second map, `EXTRA`, whose sections are appended to the main entry for the same slug, so check both when you edit an article.

## Number to words

- `components/tools/NumberToWords.tsx` has three tabs. **One number**: Bangla words, English words in the lakh-crore system and in the international (million-billion) system, plus the number with Bangla digits, lakh-crore commas and international commas. **Many numbers**: one number per line (up to 100) with a Copy all button. **Digits**: reads a phone number or digit string digit by digit (a leading + is read as plus).
- Two modes: **Taka** (up to 2 decimal places read as paisa, ends with "মাত্র" or "Only", for cheques) and **Plain number** (up to 10 decimal places, read digit by digit). English can be Title Case, UPPERCASE or lowercase. The whole part can have up to 14 digits.
- `lib/numWords.ts` holds the logic: `bnWords`, `enWords` (lakh-crore), `enIntlWords`, `parseNumber`, `toWords`, `readDigits`, `groupLakh`, `groupIntl`, `toBnDigits` and `applyCase`. `bnWords`, `enWords` and `convert` are still exported from the component file for compatibility. The Bangla hundreds use the "একশ, দুইশ" form; some people write "একশো" or "একশত", and the page tells the visitor so.
- Page text: `components/toolRegistryB10.tsx` (12 FAQs), `lib/toolContentEn.ts`, `lib/seoMeta.ts`, `lib/toolArticles.ts`. The "number to words" guide links to it.

## Chat assistant (BD Flow Helper)

- `pages/api/chat.js` is the server route. It holds the system prompt, FAQ knowledge, a link allowlist (only bdtoolsflow.cyou pages are kept in replies), an origin check and a soft per-IP rate limit. Message text is never logged.
- `public/chatbot.js` and `public/chatbot.css` are the widget, loaded from `app/layout.tsx` with `next/script`.
- Secrets live only in Vercel Environment Variables: `LLM_BASE_URL`, `LLM_API_KEY`, `LLM_MODEL` (see `.env.example`). Never commit real keys.
- When you add a tool or page, add its slug to `TOOL_SLUGS` or `PAGES` in `pages/api/chat.js` and to the directory inside `SYSTEM_PROMPT`, otherwise the link guard replaces that link with the Contact link.

## Tech stack

- Next.js 14 (App Router) and TypeScript
- Tailwind CSS (class based dark mode), lucide-react, framer-motion, next-themes
- `qrcode` and `jsqr` (loaded only when the QR tools are opened)
- Hosting: Vercel (free tier)

## Project structure

```
app/
  page.tsx                  Server wrapper for the homepage (passes only guide slugs and titles)
  layout.tsx                Root layout (header, footer, theme, optional AdSense script)
  tool/[slug]/page.tsx      Renders any tool from the registry (+ SEO metadata, JSON-LD)
  category/[categorySlug]/  Category pages
  currency/[pair]/          Currency pair pages such as /currency/sar-to-bdt
  guides/, guides/[slug]/   Guides list and guide pages
  about, contact, privacy-policy, disclaimer
  sitemap.ts, robots.ts
components/
  tools/                    One file per tool (client components)
  toolRegistry.tsx          Base tools and merge of the batch registries
  toolRegistryB1.tsx ... B3.tsx    Registries for earlier batches
  toolRegistryB4.tsx ... B11.tsx   Registries for later batches (each entry: component, title, desc, howTo, faqs)
  ToolLayout.tsx            Shared page layout (title, how-to, FAQ, related tools). The tool page passes in only that tool's article and English text, to keep the JS small
  HomeContent.tsx           Homepage UI with search and categories (client component)
  ToolCard, Header, Footer, SearchBar, JsonLd, AdSlot, ThemeProvider
data/tools.ts               The full list of tools (name, slug, category, icon)
lib/
  live.ts                   Slugs that are actually built (sitemap and related tools use this)
  seo.ts                    Site URL and name
  dateCalc.ts, sciEval.ts, imageUtil.ts, colorUtil.ts, lorem.ts,
  keywords.ts, metaTags.ts, rand.ts, tz.ts, goldCalc.ts, pdfUtil.ts, pdfjs.ts,
  banglaDate.ts, expense.ts, invoice.ts, scan.ts, tts.ts, ttsEngine.ts   Shared, tested logic
  currencyData.ts, currencyPairs.ts   Currency list, rate helpers and pair pages
  relatedTools.ts           Groups of related tools (the tool page shows similar tools first)
  lang.tsx                  Language provider (BN default, EN) saved in localStorage
  i18nData.ts               UI strings, category names, English card descriptions
  guides.ts                 Guide articles (Bangla and English)
  seoMeta.ts                SEO titles and descriptions per tool
  toolArticles.ts           Long-form text shown under every tool (Bangla and English)
  toolContentEn.ts          English title/description/how-to/FAQ for every live tool
  site.ts                   CONTACT_EMAIL (edit this one line)
```

## Languages (Bangla default, English toggle)

The header has a BN | EN toggle. The choice is saved in the browser. The page frame (header, footer, homepage, categories, tool title, description, how-to and FAQ) is translated, and so is the text inside the tools (labels, buttons and messages, through the `useTr` helper from `lib/lang.tsx`). When you write a tool, wrap every visible string as `tr("বাংলা", "English")`.

## Add a new tool

1. Create `components/tools/MyTool.tsx` (`"use client"`, default export). Do not render a page title or outer card, because `ToolLayout` already does that.
2. Add an entry to a registry file (`component`, `title`, `desc`, `howTo`, `faqs`). The slug must match `data/tools.ts`.
3. Add the slug to `lib/live.ts`.
4. Add the English version to `lib/toolContentEn.ts` (the English card text is already in `lib/i18nData.ts`).

## Environment variables

Set these in Vercel under Settings, Environment Variables.

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public site URL, used by the sitemap, canonical links and Open Graph (no trailing slash) |
| `NEXT_PUBLIC_ADS` | Set to `1` after AdSense approval to show ad slots |
| `NEXT_PUBLIC_ADSENSE_ID` | AdSense publisher ID (`ca-pub-...`) |

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Import the repo in Vercel (Next.js is detected automatically). Every commit to `main` redeploys.

## Rates and rules that change

Public sources for these disagree or change often, and none is official, so check them and edit the numbers when needed:

- Cash out rates (taka per 1,000) are at the top of `NagadCalculator.tsx`, `RocketCalculator.tsx` and `UpayCalculator.tsx`.
- Electricity slabs and demand charge: top of `ElectricityBillCalculator.tsx` (June 2026 billing rates).
- Income tax slabs, rebate and minimum tax: top of `IncomeTaxCalculator.tsx` (Finance Act 2026, FY 2026-27).
- Zakat nisab (7.5 vori gold, 52.5 vori silver) is in `ZakatCalculator.tsx`.
- Gold: there is no live price. The unit sizes (1 vori = 11.664 g) are in `lib/goldCalc.ts`; making charge, wastage and VAT are typed by the visitor.
- Time zones: places and their names are in the `ZONES` array of `TimeZoneConverter.tsx`. If Bangladesh ever brings back daylight saving, the browser data handles it, but update the notes in the tool and the FAQs.
- Passport fees: `PassportFeeCalculator.tsx`.

## Notes

- All calculations happen in the browser. Images and text never leave the device, with three exceptions: the currency page fetches daily rates, the chat assistant sends the visitor's message to the LLM provider, and "online" voices in Text to Speech may use the browser or phone maker's servers.
- Rates and rules (bKash charges, govt job age limits, loan fees) change over time. Always check the official source. Each tool says so on its page.
- Google Search Console verification file is kept in `public/`. Do not delete it.
