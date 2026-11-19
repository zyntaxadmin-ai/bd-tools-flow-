"use client";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import Popup, { fieldTitle } from "./Popup";
import { useLang } from "@/lib/lang";
import type { ChangeEventLike } from "./Select";

/**
 * Drop-in replacement for <input type="date" | "time" | "datetime-local">.
 * Same value formats (YYYY-MM-DD, HH:mm, YYYY-MM-DDTHH:mm) and `e.target.value` onChange.
 * Calendar shows Bangla or English names/digits to match the site language, tints Friday (the weekly
 * holiday in Bangladesh), and lets you jump straight to a month or year, which matters for birth dates.
 */

type Kind = "date" | "time" | "datetime-local";

type Props = {
  type?: Kind;
  value: string;
  onChange: (e: ChangeEventLike) => void;
  className?: string;
  id?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
  placeholder?: string;
  "aria-label"?: string;
};

const MONTHS_BN = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS_BN = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি"];
const DAYS_EN = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

const pad = (n: number) => String(n).padStart(2, "0");
const digits = (s: string, bn: boolean) => (bn ? s.replace(/\d/g, (d) => BN_DIGITS[+d]) : s);
const isoOf = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

type YMD = { y: number; m: number; d: number };
const parseDate = (s: string): YMD | null => {
  const r = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  return r ? { y: +r[1], m: +r[2] - 1, d: +r[3] } : null;
};
const parseTime = (s: string): { h: number; mi: number } | null => {
  const r = /(\d{2}):(\d{2})$/.exec(s);
  return r ? { h: +r[1], mi: +r[2] } : null;
};
const todayYMD = (): YMD => {
  const t = new Date();
  return { y: t.getFullYear(), m: t.getMonth(), d: t.getDate() };
};

function formatDate(s: string, bn: boolean) {
  const p = parseDate(s);
  if (!p) return "";
  const month = bn ? MONTHS_BN[p.m] : MONTHS_EN[p.m].slice(0, 3);
  return `${digits(String(p.d), bn)} ${month} ${digits(String(p.y), bn)}`;
}
function formatTime(s: string, bn: boolean) {
  const t = parseTime(s);
  if (!t) return "";
  const h12 = t.h % 12 === 0 ? 12 : t.h % 12;
  return `${digits(pad(h12), bn)}:${digits(pad(t.mi), bn)} ${t.h >= 12 ? "PM" : "AM"}`;
}

export default function DateInput({ type = "date", value, onChange, className = "", id, disabled, min, max, placeholder, "aria-label": ariaLabel }: Props) {
  const { lang } = useLang();
  const bn = lang !== "en";
  const tr = (b: string, e: string) => (bn ? b : e);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string | undefined>();

  const close = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  }, []);
  const emit = (v: string) => onChange({ target: { value: v }, currentTarget: { value: v } });

  const text =
    type === "date" ? formatDate(value, bn)
    : type === "time" ? formatTime(value, bn)
    : value ? `${formatDate(value, bn)}, ${formatTime(value, bn)}` : "";
  const hint =
    placeholder ?? (type === "date" ? tr("তারিখ বাছুন", "Pick a date") : type === "time" ? tr("সময় বাছুন", "Pick a time") : tr("তারিখ ও সময় বাছুন", "Pick date and time"));
  const Icon = type === "time" ? Clock : CalendarDays;

  const openIt = () => {
    if (disabled) return;
    setTitle(fieldTitle(triggerRef.current, id, ariaLabel));
    setOpen(true);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => (open ? close() : openIt())}
        className={`${className} flex items-center justify-between gap-2 text-left cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-shadow ${open ? "ring-2 ring-indigo-500" : ""}`}
      >
        <span className={`min-w-0 truncate ${text ? "" : "text-slate-400"}`}>{text || hint}</span>
        <Icon className="w-4 h-4 shrink-0 text-slate-400" aria-hidden="true" />
      </button>

      <Popup open={open} onClose={close} anchorRef={triggerRef} title={title} width={320}>
        {({ sheet }) => (
          <div role="dialog" aria-label={title ?? hint} className="p-3">
            <Panel kind={type} value={value} min={min} max={max} sheet={sheet} bn={bn} emit={emit} close={close} />
          </div>
        )}
      </Popup>
    </>
  );
}

/* ---------- Panel: picks between the date and time views ---------- */

function Panel({ kind, value, min, max, sheet, bn, emit, close }: {
  kind: Kind; value: string; min?: string; max?: string; sheet: boolean; bn: boolean;
  emit: (v: string) => void; close: (refocus?: boolean) => void;
}) {
  const tr = (b: string, e: string) => (bn ? b : e);
  const [tab, setTab] = useState<"date" | "time">(kind === "time" ? "time" : "date");
  const datePart = kind === "time" ? "" : value.slice(0, 10);
  const timePart = kind === "time" ? value : value.slice(11, 16);

  const pickDate = (iso: string) => {
    if (kind === "date") { emit(iso); close(); return; }
    emit(`${iso}T${timePart || "12:00"}`);
    setTab("time");
  };
  const pickTime = (hhmm: string) => {
    if (kind === "time") { emit(hhmm); return; }
    const d = datePart || isoOf(todayYMD().y, todayYMD().m, todayYMD().d);
    emit(`${d}T${hhmm}`);
  };

  return (
    <div>
      {kind === "datetime-local" && (
        <div className="grid grid-cols-2 gap-1 p-1 mb-3 rounded-xl bg-slate-100 dark:bg-slate-700/60" role="tablist">
          {(["date", "time"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors ${
                tab === t ? "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-200 shadow-sm" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {t === "date" ? <CalendarDays className="w-4 h-4" aria-hidden="true" /> : <Clock className="w-4 h-4" aria-hidden="true" />}
              {t === "date" ? (datePart ? formatDate(datePart, bn) : tr("তারিখ", "Date")) : timePart ? formatTime(timePart, bn) : tr("সময়", "Time")}
            </button>
          ))}
        </div>
      )}
      {tab === "date" ? (
        <DatePanel value={datePart} min={min} max={max} sheet={sheet} bn={bn} onSelect={pickDate} />
      ) : (
        <TimePanel value={timePart} sheet={sheet} bn={bn} onPick={pickTime} onDone={() => close()} />
      )}
    </div>
  );
}

/* ---------- Calendar ---------- */

function DatePanel({ value, min, max, sheet, bn, onSelect }: {
  value: string; min?: string; max?: string; sheet: boolean; bn: boolean; onSelect: (iso: string) => void;
}) {
  const tr = (b: string, e: string) => (bn ? b : e);
  const today = useMemo(todayYMD, []);
  const sel = parseDate(value);
  const [cur, setCur] = useState<YMD>(sel ?? today);
  const [view, setView] = useState<"days" | "months" | "years">("days");
  const minY = min ? +min.slice(0, 4) : 1900;
  const maxY = max ? +max.slice(0, 4) : 2100;
  const months = bn ? MONTHS_BN : MONTHS_EN;
  const weekdays = bn ? DAYS_BN : DAYS_EN;
  const gridRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLDivElement>(null);
  const kb = useRef(false);
  const firstFocus = useRef(true);

  const off = (iso: string) => (!!min && iso < min.slice(0, 10)) || (!!max && iso > max.slice(0, 10));
  const clampDay = (y: number, m: number, d: number) => Math.min(d, new Date(y, m + 1, 0).getDate());

  const shiftMonth = (delta: number) =>
    setCur((c) => {
      const dt = new Date(c.y, c.m + delta, 1);
      if (dt.getFullYear() < minY || dt.getFullYear() > maxY) return c;
      return { y: dt.getFullYear(), m: dt.getMonth(), d: clampDay(dt.getFullYear(), dt.getMonth(), c.d) };
    });

  // Keyboard users land on the current day; arrow keys then move the focus with the cursor.
  useEffect(() => {
    if (view !== "days") return;
    if (kb.current || firstFocus.current) {
      gridRef.current?.querySelector<HTMLButtonElement>('button[data-cur="1"]')?.focus({ preventScroll: true });
      kb.current = false;
      firstFocus.current = false;
    }
  }, [cur, view]);

  // Open the year list already scrolled to the chosen year.
  useEffect(() => {
    if (view !== "years") return;
    const box = yearsRef.current;
    const el = box?.querySelector<HTMLElement>('[data-sel="1"]');
    if (box && el) box.scrollTop = el.offsetTop - box.clientHeight / 2 + el.clientHeight / 2;
  }, [view]);

  const onGridKey = (e: ReactKeyboardEvent) => {
    const step: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in step) {
      e.preventDefault();
      kb.current = true;
      setCur((c) => {
        const dt = new Date(c.y, c.m, c.d + step[e.key]);
        if (dt.getFullYear() < minY || dt.getFullYear() > maxY) return c;
        return { y: dt.getFullYear(), m: dt.getMonth(), d: dt.getDate() };
      });
    } else if (e.key === "PageUp" || e.key === "PageDown") {
      e.preventDefault();
      kb.current = true;
      shiftMonth(e.key === "PageUp" ? -1 : 1);
    }
  };

  const first = new Date(cur.y, cur.m, 1).getDay();
  const dim = new Date(cur.y, cur.m + 1, 0).getDate();
  const todayIso = isoOf(today.y, today.m, today.d);
  const prevOff = view === "days" ? cur.y <= minY && cur.m === 0 : view === "months" ? cur.y <= minY : true;
  const nextOff = view === "days" ? cur.y >= maxY && cur.m === 11 : view === "months" ? cur.y >= maxY : true;
  const nav = (dir: -1 | 1) => (view === "months" ? setCur((c) => ({ ...c, y: c.y + dir, d: clampDay(c.y + dir, c.m, c.d) })) : shiftMonth(dir));

  const iconBtn = "w-10 h-10 grid place-items-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors";
  const titleBtn = (active: boolean) =>
    `px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-colors ${active ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200" : "text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <button type="button" className={iconBtn} disabled={prevOff} onClick={() => nav(-1)} aria-label={tr("আগের", "Previous")}>
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-1">
          <button type="button" className={titleBtn(view === "months")} aria-expanded={view === "months"} onClick={() => setView(view === "months" ? "days" : "months")}>
            {months[cur.m]}
          </button>
          <button type="button" className={titleBtn(view === "years")} aria-expanded={view === "years"} onClick={() => setView(view === "years" ? "days" : "years")}>
            {digits(String(cur.y), bn)}
          </button>
        </div>
        <button type="button" className={iconBtn} disabled={nextOff} onClick={() => nav(1)} aria-label={tr("পরের", "Next")}>
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {view === "days" && (
        <div ref={gridRef} onKeyDown={onGridKey}>
          <div className="grid grid-cols-7 mb-1" aria-hidden="true">
            {weekdays.map((w, i) => (
              <div key={w} className={`text-center text-xs font-medium py-1 ${i === 5 ? "text-rose-600 dark:text-rose-300" : "text-slate-500 dark:text-slate-400"}`}>{w}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-0.5" role="grid">
            {Array.from({ length: first }, (_, i) => <span key={`b${i}`} />)}
            {Array.from({ length: dim }, (_, i) => {
              const d = i + 1;
              const iso = isoOf(cur.y, cur.m, d);
              const isSel = !!sel && sel.y === cur.y && sel.m === cur.m && sel.d === d;
              const isToday = iso === todayIso;
              const isFri = (first + i) % 7 === 5;
              const disabled = off(iso);
              return (
                <button
                  key={d}
                  type="button"
                  data-cur={d === cur.d ? "1" : undefined}
                  tabIndex={d === cur.d ? 0 : -1}
                  disabled={disabled}
                  aria-pressed={isSel}
                  aria-label={`${digits(String(d), bn)} ${months[cur.m]} ${digits(String(cur.y), bn)}`}
                  aria-current={isToday ? "date" : undefined}
                  onClick={() => onSelect(iso)}
                  className={`${sheet ? "h-11 text-base" : "h-9 text-sm"} rounded-xl tabular-nums transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                    isSel
                      ? "bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-600/30"
                      : `hover:bg-slate-100 dark:hover:bg-slate-700 ${isToday ? "ring-1 ring-inset ring-indigo-400 font-semibold" : ""} ${isFri ? "text-rose-600 dark:text-rose-300" : "text-slate-800 dark:text-slate-100"}`
                  }`}
                >
                  {digits(String(d), bn)}
                </button>
              );
            })}
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/70">
            <button
              type="button"
              disabled={off(todayIso)}
              onClick={() => onSelect(todayIso)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/15 disabled:opacity-40 transition-colors"
            >
              {tr("আজকের তারিখ", "Today")}
            </button>
          </div>
        </div>
      )}

      {view === "months" && (
        <div className="grid grid-cols-3 gap-1">
          {months.map((mn, i) => (
            <button
              key={mn}
              type="button"
              onClick={() => { setCur((c) => ({ ...c, m: i, d: clampDay(c.y, i, c.d) })); setView("days"); }}
              className={`h-12 rounded-xl text-sm transition-colors ${i === cur.m ? "bg-indigo-600 text-white font-semibold" : "text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
            >
              {mn}
            </button>
          ))}
        </div>
      )}

      {view === "years" && (
        <div ref={yearsRef} className="relative grid grid-cols-4 gap-1 overflow-y-auto overscroll-contain h-[252px] pr-0.5">
          {Array.from({ length: maxY - minY + 1 }, (_, i) => minY + i).map((y) => (
            <button
              key={y}
              type="button"
              data-sel={y === cur.y ? "1" : undefined}
              onClick={() => { setCur((c) => ({ ...c, y, d: clampDay(y, c.m, c.d) })); setView("days"); }}
              className={`h-11 rounded-xl text-sm tabular-nums transition-colors ${
                y === cur.y ? "bg-indigo-600 text-white font-semibold" : y === today.y ? "ring-1 ring-inset ring-indigo-400 text-slate-800 dark:text-slate-100" : "text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {digits(String(y), bn)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Time: hour, minute and AM/PM columns ---------- */

function Column({ label, items, selected, onPick, wide }: {
  label: string; items: { k: number; text: string }[]; selected: number | null; onPick: (k: number) => void; wide?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current?.querySelector<HTMLElement>('[data-sel="1"]');
    if (box.current && el) box.current.scrollTop = el.offsetTop - box.current.clientHeight / 2 + el.clientHeight / 2;
  }, []);
  return (
    <div ref={box} role="listbox" aria-label={label} className={`relative h-[200px] overflow-y-auto overscroll-contain rounded-xl bg-slate-50 dark:bg-slate-900/40 p-1 [scrollbar-width:none] ${wide ? "flex-1" : "w-[72px]"}`}>
      {items.map((it) => (
        <button
          key={it.k}
          type="button"
          role="option"
          aria-selected={it.k === selected}
          data-sel={it.k === selected ? "1" : undefined}
          onClick={() => onPick(it.k)}
          className={`w-full h-10 rounded-lg text-sm tabular-nums transition-colors ${it.k === selected ? "bg-indigo-600 text-white font-semibold" : "text-slate-800 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-700"}`}
        >
          {it.text}
        </button>
      ))}
    </div>
  );
}

function TimePanel({ value, bn, onPick, onDone }: { value: string; sheet: boolean; bn: boolean; onPick: (hhmm: string) => void; onDone: () => void }) {
  const tr = (b: string, e: string) => (bn ? b : e);
  const parsed = parseTime(value);
  const base = parsed ?? { h: new Date().getHours(), mi: 0 };
  const h12 = base.h % 12 === 0 ? 12 : base.h % 12;
  const pm = base.h >= 12;
  const set = (hh: number, mi: number, isPm: boolean) => onPick(`${pad((hh % 12) + (isPm ? 12 : 0))}:${pad(mi)}`);

  return (
    <div>
      <div className="flex gap-2">
        <Column
          label={tr("ঘণ্টা", "Hour")}
          wide
          items={Array.from({ length: 12 }, (_, i) => ({ k: i + 1, text: digits(pad(i + 1), bn) }))}
          selected={parsed ? h12 : null}
          onPick={(k) => set(k, base.mi, pm)}
        />
        <Column
          label={tr("মিনিট", "Minute")}
          wide
          items={Array.from({ length: 60 }, (_, i) => ({ k: i, text: digits(pad(i), bn) }))}
          selected={parsed ? base.mi : null}
          onPick={(k) => set(h12, k, pm)}
        />
        <Column
          label="AM / PM"
          items={[{ k: 0, text: "AM" }, { k: 1, text: "PM" }]}
          selected={parsed ? (pm ? 1 : 0) : null}
          onPick={(k) => set(h12, base.mi, k === 1)}
        />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">{parsed ? formatTime(value, bn) : tr("ঘণ্টা ও মিনিট বাছুন", "Choose hour and minute")}</span>
        <button type="button" onClick={onDone} className="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
          {tr("ঠিক আছে", "Done")}
        </button>
      </div>
    </div>
  );
}
