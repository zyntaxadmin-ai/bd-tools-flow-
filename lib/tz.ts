export type Wall = { y: number; mo: number; d: number; h: number; mi: number; s: number };

export function wallParts(ms: number, tz: string): Wall {
  const f = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" });
  const p = f.formatToParts(new Date(ms));
  const g = (t: string) => parseInt(p.find((x) => x.type === t)!.value, 10);
  return { y: g("year"), mo: g("month"), d: g("day"), h: g("hour") % 24, mi: g("minute"), s: g("second") };
}

// zone's UTC offset (minutes) at instant ms
export function offsetMinutes(ms: number, tz: string): number {
  const w = wallParts(ms, tz);
  const asUtc = Date.UTC(w.y, w.mo - 1, w.d, w.h, w.mi, w.s);
  return Math.round((asUtc - Math.floor(ms / 1000) * 1000) / 60000);
}

// wall-clock time in a zone -> real instant (ms)
export function zonedToInstant(y: number, mo: number, d: number, h: number, mi: number, tz: string): number {
  const guess = Date.UTC(y, mo - 1, d, h, mi, 0);
  const o1 = offsetMinutes(guess, tz);
  let t = guess - o1 * 60000;
  const o2 = offsetMinutes(t, tz);
  if (o2 !== o1) t = guess - o2 * 60000;
  return t;
}

export function fmtOffset(min: number): string {
  const sign = min < 0 ? "-" : "+";
  const a = Math.abs(min);
  const hh = Math.floor(a / 60), mm = a % 60;
  return `UTC${sign}${hh}${mm ? ":" + String(mm).padStart(2, "0") : ""}`;
}

export function formatInZone(ms: number, tz: string): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(ms));
}

export function splitDuration(ms: number): { d: number; h: number; m: number; s: number } {
  const t = Math.floor(Math.abs(ms) / 1000);
  return { d: Math.floor(t / 86400), h: Math.floor((t % 86400) / 3600), m: Math.floor((t % 3600) / 60), s: t % 60 };
}

// ---------- extra helpers for the Time Zone Converter ----------
const pad2 = (n: number) => String(n).padStart(2, "0");

// "09:30 PM" (12-hour) or "21:30" (24-hour) in a zone
export function hmInZone(ms: number, tz: string, h12: boolean): string {
  const w = wallParts(ms, tz);
  if (!h12) return `${pad2(w.h)}:${pad2(w.mi)}`;
  const ap = w.h >= 12 ? "PM" : "AM";
  const hh = w.h % 12 === 0 ? 12 : w.h % 12;
  return `${pad2(hh)}:${pad2(w.mi)} ${ap}`;
}

// how many calendar days the date in toTz is after the date in fromTz at the same instant (-1, 0, +1 ...)
export function dayShift(ms: number, fromTz: string, toTz: string): number {
  const a = wallParts(ms, fromTz), b = wallParts(ms, toTz);
  return Math.round((Date.UTC(b.y, b.mo - 1, b.d) - Date.UTC(a.y, a.mo - 1, a.d)) / 86400000);
}

export type OverlapRun = { fromStart: number; fromEnd: number; toStartMs: number; toEndMs: number };
// Hours of one day (counted in fromTz) when it is working time (startH to endH) in BOTH zones.
// Works on whole hours, so it is approximate in zones with half-hour offsets and around DST changes.
export function overlapRuns(y: number, mo: number, d: number, fromTz: string, toTz: string, startH = 9, endH = 18): OverlapRun[] {
  const ok: boolean[] = [];
  const at: number[] = [];
  for (let h = 0; h < 24; h++) {
    const ms = zonedToInstant(y, mo, d, h, 0, fromTz);
    at.push(ms);
    const t = wallParts(ms, toTz);
    const toH = t.h + t.mi / 60;
    ok.push(h >= startH && h < endH && toH >= startH && toH < endH);
  }
  const runs: OverlapRun[] = [];
  let s = -1;
  for (let h = 0; h <= 24; h++) {
    if (h < 24 && ok[h]) { if (s < 0) s = h; }
    else if (s >= 0) {
      runs.push({ fromStart: s, fromEnd: h, toStartMs: at[s], toEndMs: at[h - 1] + 3600000 });
      s = -1;
    }
  }
  return runs;
}
