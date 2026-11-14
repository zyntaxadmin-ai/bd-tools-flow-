"use client";
import { useState } from "react";
import { RotateCcw, Copy, Check, Download } from "lucide-react";
import { analyze, countTargets, densityLevel, csvCell, type Level } from "@/lib/keywords";
import { useTr } from "@/lib/lang";

const box = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none";
const SAMPLE_BN = "বাংলাদেশে অনলাইনে টাকা পাঠাতে অনেকে বিকাশ ব্যবহার করেন। বিকাশ ক্যাশ আউট চার্জ কত তা জানা থাকলে খরচ হিসাব করা সহজ হয়। বিকাশ ক্যাশ আউট চার্জ এজেন্ট ও এটিএম ভেদে আলাদা হতে পারে, তাই লেনদেনের আগে চার্জ দেখে নেওয়া ভালো।";
const SAMPLE_EN = "A keyword density checker shows how often a word appears in your text. If you write about a keyword density checker, check that the keyword feels natural and is not repeated again and again. Good content is written for readers first.";

export default function KeywordDensityChecker() {
  const tr = useTr();
  const [text, setText] = useState("");
  const [targets, setTargets] = useState("");
  const [n, setN] = useState<1 | 2 | 3>(1);
  const [skipShort, setSkipShort] = useState(true);
  const [skipStop, setSkipStop] = useState(true);
  const [copied, setCopied] = useState(false);

  const res = text.trim() ? analyze(text, n, skipShort, skipStop) : null;
  const rows = res ? res.rows.slice(0, 20) : [];
  const maxCount = rows.length ? rows[0].count : 1;
  const tgt = text.trim() && targets.trim() ? countTargets(text, targets, 10) : null;
  const minutes = res ? res.total / 200 : 0;
  const stuffed = rows.filter((r) => r.count >= 3 && r.pct > 3);

  const levelText = (l: Level) =>
    l === "none" ? tr("পাওয়া যায়নি", "Not found")
    : l === "low" ? tr("১% এর কম", "Under 1%")
    : l === "ok" ? tr("১-২% (সাধারণ লক্ষ্য)", "1-2% (common target)")
    : l === "high" ? tr("একটু বেশি", "A bit high")
    : tr("অনেক বেশি", "Very high");
  const levelColor = (l: Level) => (l === "ok" ? "text-green-600" : l === "none" || l === "low" ? "text-slate-500" : "text-amber-600");

  const changed = () => setCopied(false);
  const reset = () => { setText(""); setTargets(""); setCopied(false); };

  // text version of what is on screen, used by Copy and CSV
  const lines: [string, number, number][] = [
    ...(tgt ? tgt.rows.map((r) => [r.phrase, r.count, r.pct] as [string, number, number]) : []),
    ...rows.map((r) => [r.phrase, r.count, r.pct] as [string, number, number]),
  ];
  const copy = async () => {
    const out = [`${tr("কীওয়ার্ড", "Keyword")}\t${tr("বার", "Count")}\t${tr("ঘনত্ব %", "Density %")}`, ...lines.map((l) => l.join("\t"))].join("\n");
    try { await navigator.clipboard.writeText(out); setCopied(true); } catch { setCopied(false); }
  };
  const csv = () => {
    try {
      const body = ["Keyword,Count,Density %", ...lines.map((l) => l.map(csvCell).join(","))].join("\r\n");
      const url = URL.createObjectURL(new Blob(["\uFEFF" + body], { type: "text/csv;charset=utf-8" }));
      const a = document.createElement("a");
      a.href = url; a.download = "keyword-density.csv";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch { /* ignore */ }
  };

  return (
    <div className="space-y-4">
      <div>
        <textarea value={text} onChange={(e) => { setText(e.target.value); changed(); }} rows={8} placeholder={tr("আপনার আর্টিকেল বা লেখা এখানে পেস্ট করুন (বাংলা ও ইংরেজি দুটোই চলবে)...", "Paste your article or text here (Bangla and English both work)...")} className={box} />
        <div className="flex flex-wrap gap-2 mt-2">
          <button onClick={() => { setText(SAMPLE_BN); setTargets("বিকাশ ক্যাশ আউট চার্জ"); changed(); }} className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs dark:text-white">{tr("বাংলা নমুনা", "Bangla sample")}</button>
          <button onClick={() => { setText(SAMPLE_EN); setTargets("keyword density checker"); changed(); }} className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs dark:text-white">{tr("ইংরেজি নমুনা", "English sample")}</button>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium dark:text-slate-200">{tr("আপনার টার্গেট কীওয়ার্ড (ঐচ্ছিক, প্রতি লাইনে একটি, সর্বোচ্চ ১০টি)", "Your target keywords (optional, one per line, up to 10)")}</label>
        <textarea value={targets} onChange={(e) => { setTargets(e.target.value); changed(); }} rows={3} placeholder={tr("যেমন: বিকাশ ক্যাশ আউট চার্জ", "e.g. keyword density checker")} className={`${box} mt-1`} />
      </div>

      {tgt && (
        <div className="overflow-x-auto border border-indigo-200 dark:border-indigo-900 rounded-xl">
          <table className="w-full text-sm min-w-[360px]">
            <thead className="bg-indigo-50 dark:bg-indigo-950/30 dark:text-white"><tr><th className="p-2 text-left">{tr("টার্গেট কীওয়ার্ড", "Target keyword")}</th><th className="p-2">{tr("বার", "Count")}</th><th className="p-2">{tr("ঘনত্ব", "Density")}</th></tr></thead>
            <tbody className="dark:text-slate-200">
              {tgt.rows.map((r) => {
                const l = densityLevel(r.count, r.pct);
                return (
                  <tr key={r.phrase} className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-2 font-medium break-words">{r.phrase}</td>
                    <td className="p-2 text-center">{r.count}</td>
                    <td className="p-2 text-center"><span className="font-semibold">{r.pct}%</span><br /><span className={`text-xs ${levelColor(l)}`}>{levelText(l)}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex gap-2">
        {([1, 2, 3] as const).map((v) => (
          <button key={v} onClick={() => setN(v)} className={`flex-1 py-2 rounded-xl border text-sm ${n === v ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{v} {tr("শব্দ", v === 1 ? "word" : "words")}</button>
        ))}
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-3 text-sm dark:text-slate-200"><input type="checkbox" checked={skipShort} onChange={() => setSkipShort(!skipShort)} className="w-4 h-4 accent-indigo-600" /> {tr("ছোট শব্দ (২ অক্ষর বা কম) বাদ দিন", "Ignore short words (2 characters or fewer)")}</label>
        <label className="flex items-center gap-3 text-sm dark:text-slate-200"><input type="checkbox" checked={skipStop} onChange={() => setSkipStop(!skipStop)} className="w-4 h-4 accent-indigo-600" /> {tr("সাধারণ শব্দ (the, and, এবং, এই...) বাদ দিন", "Ignore common words (the, and, is... and common Bangla words)")}</label>
      </div>
      <button onClick={reset} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> {tr("মুছুন", "Clear")}</button>

      {res && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-3"><p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{res.total}</p><p className="text-xs text-slate-500">{tr("মোট শব্দ", "Total words")}</p></div>
            <div className="bg-violet-50 dark:bg-violet-950/30 rounded-xl p-3"><p className="text-xl font-bold text-violet-600">{res.unique}</p><p className="text-xs text-slate-500">{tr("ইউনিক শব্দ", "Unique words")}</p></div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3"><p className="text-xl font-bold text-slate-700 dark:text-slate-200">{minutes < 1 ? "<1" : Math.round(minutes)}</p><p className="text-xs text-slate-500">{tr("মিনিটে পড়া", "Min to read")}</p></div>
          </div>
          {stuffed.length > 0 && (
            <p className="text-sm text-amber-700 dark:text-amber-400">{tr(`সতর্কতা: "${stuffed[0].phrase}" ${stuffed[0].pct}% এসেছে, যা অনেক বেশি। লেখা স্বাভাবিক শোনাচ্ছে কি না দেখুন, প্রতিশব্দ ব্যবহার করুন।`, `Warning: "${stuffed[0].phrase}" is at ${stuffed[0].pct}%, which is very high. Check the text reads naturally and use synonyms.`)}</p>
          )}
          {rows.length === 0 ? (
            <p className="text-sm text-slate-500">{tr("কোনো কীওয়ার্ড পাওয়া যায়নি। ফিল্টার বন্ধ করে বা বড় লেখা দিয়ে দেখুন।", "No keywords found. Turn off the filters or use a longer text.")}</p>
          ) : (
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
              <table className="w-full text-sm min-w-[360px]">
                <thead className="bg-slate-100 dark:bg-slate-800 dark:text-white"><tr><th className="p-2 text-left">{tr("কীওয়ার্ড", "Keyword")}</th><th className="p-2">{tr("বার", "Count")}</th><th className="p-2">{tr("ঘনত্ব", "Density")}</th></tr></thead>
                <tbody className="dark:text-slate-200">
                  {rows.map((r) => (
                    <tr key={r.phrase} className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-2">
                        <div className="font-medium break-words">{r.phrase}</div>
                        <div className="h-1.5 mt-1 rounded bg-slate-100 dark:bg-slate-700"><div className="h-full rounded bg-indigo-500" style={{ width: `${(r.count / maxCount) * 100}%` }} /></div>
                      </td>
                      <td className="p-2 text-center">{r.count}</td>
                      <td className="p-2 text-center">{r.pct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="flex gap-2">
            <button onClick={copy} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm dark:text-white">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied ? tr("কপি হয়েছে", "Copied") : tr("ফলাফল কপি", "Copy results")}</button>
            <button onClick={csv} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm dark:text-white"><Download className="w-4 h-4" />CSV</button>
          </div>
          <p className="text-xs text-slate-500">{tr("ঘনত্ব = কীওয়ার্ড কতবার এসেছে ÷ মোট শব্দ × ১০০। সাধারণত ১-২% ধরা হয়, কিন্তু গুগল কোনো নির্দিষ্ট শতাংশ বলেনি। কীওয়ার্ড ঠেসে না দিয়ে স্বাভাবিকভাবে লিখুন। বাংলায় বিভক্তি যোগ হলে ('ক্যালকুলেটর' আর 'ক্যালকুলেটরের') শব্দটি আলাদা ধরা হয়।", "Density = times the keyword appears ÷ total words × 100. 1-2% is a common target, but Google has not named an ideal percentage. Write naturally and avoid keyword stuffing. In Bangla, a word with an ending added (like 'ক্যালকুলেটর' and 'ক্যালকুলেটরের') counts as a different word.")}</p>
        </div>
      )}
    </div>
  );
}
