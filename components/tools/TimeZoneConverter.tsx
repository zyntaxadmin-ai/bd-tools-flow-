"use client";
import { useEffect, useState } from "react";
import { Clock, ArrowUpDown, Copy, Check } from "lucide-react";
import { wallParts, zonedToInstant, offsetMinutes, fmtOffset, formatInZone, hmInZone, dayShift, overlapRuns } from "@/lib/tz";
import { useTr } from "@/lib/lang";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const chip = (a: boolean) => `px-3.5 py-2 rounded-full border text-sm ${a ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;
const p2 = (n: number) => String(n).padStart(2, "0");

type Zone = { id: string; bn: string; en: string; group: string; popular?: boolean };
const ZONES: Zone[] = [
  { id: "Asia/Dhaka", bn: "বাংলাদেশ (ঢাকা)", en: "Bangladesh (Dhaka)", group: "bd", popular: true },
  { id: "Asia/Riyadh", bn: "সৌদি আরব (রিয়াদ)", en: "Saudi Arabia (Riyadh)", group: "gulf", popular: true },
  { id: "Asia/Dubai", bn: "সংযুক্ত আরব আমিরাত (দুবাই)", en: "United Arab Emirates (Dubai)", group: "gulf", popular: true },
  { id: "Asia/Qatar", bn: "কাতার (দোহা)", en: "Qatar (Doha)", group: "gulf" },
  { id: "Asia/Kuwait", bn: "কুয়েত", en: "Kuwait", group: "gulf" },
  { id: "Asia/Muscat", bn: "ওমান (মাস্কাট)", en: "Oman (Muscat)", group: "gulf" },
  { id: "Asia/Bahrain", bn: "বাহরাইন", en: "Bahrain", group: "gulf" },
  { id: "Asia/Kuala_Lumpur", bn: "মালয়েশিয়া (কুয়ালালামপুর)", en: "Malaysia (Kuala Lumpur)", group: "asia", popular: true },
  { id: "Asia/Singapore", bn: "সিঙ্গাপুর", en: "Singapore", group: "asia", popular: true },
  { id: "Asia/Kolkata", bn: "ভারত (কলকাতা)", en: "India (Kolkata)", group: "asia", popular: true },
  { id: "Asia/Kathmandu", bn: "নেপাল (কাঠমান্ডু)", en: "Nepal (Kathmandu)", group: "asia" },
  { id: "Asia/Karachi", bn: "পাকিস্তান (করাচি)", en: "Pakistan (Karachi)", group: "asia" },
  { id: "Asia/Colombo", bn: "শ্রীলঙ্কা (কলম্বো)", en: "Sri Lanka (Colombo)", group: "asia" },
  { id: "Indian/Maldives", bn: "মালদ্বীপ", en: "Maldives", group: "asia" },
  { id: "Asia/Bangkok", bn: "থাইল্যান্ড (ব্যাংকক)", en: "Thailand (Bangkok)", group: "asia" },
  { id: "Asia/Hong_Kong", bn: "হংকং", en: "Hong Kong", group: "asia" },
  { id: "Asia/Shanghai", bn: "চীন (সাংহাই)", en: "China (Shanghai)", group: "asia" },
  { id: "Asia/Seoul", bn: "দক্ষিণ কোরিয়া (সিউল)", en: "South Korea (Seoul)", group: "asia" },
  { id: "Asia/Tokyo", bn: "জাপান (টোকিও)", en: "Japan (Tokyo)", group: "asia", popular: true },
  { id: "Europe/London", bn: "যুক্তরাজ্য (লন্ডন)", en: "United Kingdom (London)", group: "eu", popular: true },
  { id: "Europe/Paris", bn: "ফ্রান্স (প্যারিস)", en: "France (Paris)", group: "eu" },
  { id: "Europe/Berlin", bn: "জার্মানি (বার্লিন)", en: "Germany (Berlin)", group: "eu" },
  { id: "Europe/Rome", bn: "ইতালি (রোম)", en: "Italy (Rome)", group: "eu" },
  { id: "America/New_York", bn: "যুক্তরাষ্ট্র - পূর্ব (নিউ ইয়র্ক)", en: "United States - East (New York)", group: "am", popular: true },
  { id: "America/Chicago", bn: "যুক্তরাষ্ট্র - মধ্য (শিকাগো)", en: "United States - Central (Chicago)", group: "am" },
  { id: "America/Denver", bn: "যুক্তরাষ্ট্র - পাহাড়ি (ডেনভার)", en: "United States - Mountain (Denver)", group: "am" },
  { id: "America/Los_Angeles", bn: "যুক্তরাষ্ট্র - পশ্চিম (লস অ্যাঞ্জেলেস)", en: "United States - West (Los Angeles)", group: "am", popular: true },
  { id: "America/Toronto", bn: "কানাডা (টরন্টো)", en: "Canada (Toronto)", group: "am" },
  { id: "Australia/Sydney", bn: "অস্ট্রেলিয়া (সিডনি)", en: "Australia (Sydney)", group: "oc", popular: true },
  { id: "Pacific/Auckland", bn: "নিউজিল্যান্ড (অকল্যান্ড)", en: "New Zealand (Auckland)", group: "oc" },
  { id: "UTC", bn: "UTC (বিশ্ব সমন্বিত সময়)", en: "UTC (Coordinated Universal Time)", group: "utc" },
];
const GROUPS: [string, string, string][] = [
  ["bd", "বাংলাদেশ", "Bangladesh"], ["gulf", "মধ্যপ্রাচ্য", "Middle East"], ["asia", "এশিয়া", "Asia"],
  ["eu", "ইউরোপ", "Europe"], ["am", "আমেরিকা", "Americas"], ["oc", "ওশেনিয়া", "Oceania"], ["utc", "UTC", "UTC"],
];
const zoneById = (id: string) => ZONES.find((z) => z.id === id) ?? ZONES[0];

export default function TimeZoneConverter() {
  const tr = useTr();
  const zn = (z: Zone) => tr(z.bn, z.en);
  const [from, setFrom] = useState("Asia/Dhaka");
  const [to, setTo] = useState("America/New_York");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [h12, setH12] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);

  const setNow = (zone: string) => {
    const w = wallParts(Date.now(), zone);
    setDate(`${w.y}-${p2(w.mo)}-${p2(w.d)}`);
    setTime(`${p2(w.h)}:${p2(w.mi)}`);
    setCopied(false);
  };
  useEffect(() => { setNow("Asia/Dhaka"); }, []);

  const swap = () => { setFrom(to); setTo(from); setCopied(false); };

  const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const tm = /^(\d{2}):(\d{2})$/.exec(time);
  let instant: number | null = null;
  if (dm && tm) {
    try { instant = zonedToInstant(+dm[1], +dm[2], +dm[3], +tm[1], +tm[2], from); } catch { instant = null; }
  }

  const fz = zoneById(from), tz = zoneById(to);
  let diffText = "", shiftText = "", summary = "";
  if (instant !== null) {
    const diff = offsetMinutes(instant, to) - offsetMinutes(instant, from);
    const a = Math.abs(diff), hh = Math.floor(a / 60), mm = a % 60;
    const amount = `${hh} ${tr("ঘণ্টা", "h")}${mm ? ` ${mm} ${tr("মিনিট", "min")}` : ""}`;
    diffText = diff === 0 ? tr("দুই জায়গার সময় একই", "Both places have the same time")
      : diff > 0 ? tr(`${zn(tz)} ${zn(fz)} এর ${amount} এগিয়ে`, `${zn(tz)} is ${amount} ahead of ${zn(fz)}`)
      : tr(`${zn(tz)} ${zn(fz)} এর ${amount} পিছিয়ে`, `${zn(tz)} is ${amount} behind ${zn(fz)}`);
    const ds = dayShift(instant, from, to);
    shiftText = ds === 0 ? tr("একই দিন", "Same day") : ds > 0 ? tr(`পরের দিন (+${ds})`, `Next day (+${ds})`) : tr(`আগের দিন (${ds})`, `Previous day (${ds})`);
    summary = `${zn(fz)}: ${formatInZone(instant, from)} = ${zn(tz)}: ${formatInZone(instant, to)} (bdtoolsflow.cyou)`;
  }
  const copy = async () => { try { await navigator.clipboard.writeText(summary); setCopied(true); } catch { setCopied(false); } };

  // working-hours overlap (9:00-18:00 in both places) for the chosen date
  const runs = dm && from !== to ? overlapRuns(+dm[1], +dm[2], +dm[3], from, to) : [];
  // 24-hour table for the chosen date
  const rows = dm
    ? Array.from({ length: 24 }, (_, h) => {
        const ms = zonedToInstant(+dm[1], +dm[2], +dm[3], h, 0, from);
        return { h, from: hmInZone(ms, from, h12), to: hmInZone(ms, to, h12), ds: dayShift(ms, from, to) };
      })
    : [];
  const list = showAll ? ZONES : ZONES.filter((z) => z.popular);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium dark:text-slate-200">{tr("কোন দেশের সময় থেকে", "From which place")}</label>
        <select value={from} onChange={(e) => { setFrom(e.target.value); setCopied(false); }} className={input}>
          {GROUPS.map(([g, bn, en]) => <optgroup key={g} label={tr(bn, en)}>{ZONES.filter((z) => z.group === g).map((z) => <option key={z.id} value={z.id}>{zn(z)}</option>)}</optgroup>)}
        </select>
      </div>
      <div className="flex justify-center">
        <button onClick={swap} className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-2 text-sm dark:text-white"><ArrowUpDown className="w-4 h-4" />{tr("অদলবদল", "Swap")}</button>
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">{tr("কোন দেশের সময়ে বদলাবেন", "To which place")}</label>
        <select value={to} onChange={(e) => { setTo(e.target.value); setCopied(false); }} className={input}>
          {GROUPS.map(([g, bn, en]) => <optgroup key={g} label={tr(bn, en)}>{ZONES.filter((z) => z.group === g).map((z) => <option key={z.id} value={z.id}>{zn(z)}</option>)}</optgroup>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-sm font-medium dark:text-slate-200">{tr("তারিখ", "Date")}</label><input type="date" value={date} onChange={(e) => { setDate(e.target.value); setCopied(false); }} className={input} /></div>
        <div><label className="text-sm font-medium dark:text-slate-200">{tr("সময়", "Time")}</label><input type="time" value={time} onChange={(e) => { setTime(e.target.value); setCopied(false); }} className={input} /></div>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <button onClick={() => setNow(from)} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-2 text-sm dark:text-white"><Clock className="w-4 h-4" /> {tr("এখনকার সময় বসান", "Use current time")}</button>
        <button onClick={() => setH12(true)} className={chip(h12)}>12h</button>
        <button onClick={() => setH12(false)} className={chip(!h12)}>24h</button>
      </div>
      {(!dm || !tm) && <p className="text-sm text-slate-500">{tr("তারিখ ও সময় দিন, ফলাফল এখানে দেখাবে।", "Enter a date and time to see the result.")}</p>}

      {instant !== null && (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 p-5 space-y-2">
          <p className="text-xs text-slate-500">{zn(fz)}: {formatInZone(instant, from)}</p>
          <p className="text-xs text-slate-500">{zn(tz)} ({fmtOffset(offsetMinutes(instant, to))})</p>
          <p className="text-xl font-bold text-indigo-600">{formatInZone(instant, to)}</p>
          <p className="text-sm dark:text-white">{shiftText} • {diffText}</p>
          <button onClick={copy} className="mt-1 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-900 text-sm text-indigo-700 dark:text-indigo-300">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied ? tr("কপি হয়েছে", "Copied") : tr("ফলাফল কপি করুন", "Copy result")}
          </button>
        </div>
      )}

      {dm && from !== to && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-1">
          <p className="text-sm font-medium dark:text-white">{tr("মিটিংয়ের সুবিধাজনক সময় (দুই জায়গাতেই সকাল ৯টা থেকে সন্ধ্যা ৬টা)", "Good meeting time (9:00 to 18:00 in both places)")}</p>
          {runs.length === 0 ? (
            <p className="text-sm text-slate-500">{tr("এই তারিখে দুই জায়গার অফিস সময় মেলে না।", "The working hours of the two places do not overlap on this date.")}</p>
          ) : runs.map((r, i) => (
            <p key={i} className="text-sm dark:text-slate-200">{zn(fz)}: {p2(r.fromStart)}:00 - {p2(r.fromEnd)}:00 → {zn(tz)}: {hmInZone(r.toStartMs, to, false)} - {hmInZone(r.toEndMs, to, false)}</p>
          ))}
        </div>
      )}

      {rows.length > 0 && (
        <details className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <summary className="cursor-pointer text-sm font-medium dark:text-white">{tr(`২৪ ঘণ্টার টেবিল: ${zn(fz)} → ${zn(tz)}`, `24-hour table: ${zn(fz)} to ${zn(tz)}`)}</summary>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm dark:text-slate-200">
            <p className="font-medium text-xs text-slate-500">{zn(fz)}</p><p className="font-medium text-xs text-slate-500">{zn(tz)}</p>
            {rows.map((r) => (
              <div key={r.h} className="contents">
                <span>{r.from}</span>
                <span className="font-semibold">{r.to}{r.ds !== 0 ? ` (${r.ds > 0 ? "+" : ""}${r.ds}${tr(" দিন", "d")})` : ""}</span>
              </div>
            ))}
          </div>
        </details>
      )}

      {instant !== null && (
        <div>
          <p className="text-sm font-medium dark:text-slate-200 mb-2">{tr("একই সময়ে অন্য দেশে", "Same moment in other places")}</p>
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {list.map((z) => (
              <div key={z.id} className={`px-4 py-3 ${z.id === from ? "bg-indigo-50 dark:bg-indigo-950/30" : "bg-white dark:bg-slate-800"}`}>
                <div className="flex justify-between gap-2 text-xs text-slate-500"><span>{zn(z)}</span><span>{fmtOffset(offsetMinutes(instant as number, z.id))}</span></div>
                <p className="font-semibold dark:text-white">{formatInZone(instant as number, z.id)}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setShowAll(!showAll)} className="mt-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm dark:text-white">{showAll ? tr("কম দেখান", "Show fewer") : tr(`সব দেশ দেখুন (${ZONES.length})`, `Show all (${ZONES.length})`)}</button>
        </div>
      )}

      <p className="text-xs text-slate-500">{tr("বাংলাদেশের সময় UTC+6 এবং এখন ডে-লাইট সেভিং (DST) নেই। অন্য দেশের DST ব্রাউজার নিজেই হিসাব করে। DST বদলের দিনের কাছাকাছি সময়ে ফলাফল এক ঘণ্টা আলাদা হতে পারে। মিটিংয়ের সময় পূর্ণ ঘণ্টা ধরে আনুমানিক হিসাব।", "Bangladesh time is UTC+6 and there is currently no daylight saving time (DST). Your browser calculates other places' DST itself. Near a DST change the result may differ by an hour. Meeting times are approximate, in whole hours.")}</p>
    </div>
  );
}
