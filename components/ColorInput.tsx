"use client";
import { useCallback, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import Popup, { fieldTitle } from "./Popup";
import { useLang } from "@/lib/lang";
import type { ChangeEventLike } from "./Select";

/**
 * Drop-in replacement for <input type="color"> (value is "#rrggbb", onChange gives e.target.value).
 * Opens a saturation/brightness square, a hue slider, a hex field and a few preset swatches,
 * starting with the two colours of the Bangladesh flag.
 */

type Props = {
  value: string;
  onChange: (e: ChangeEventLike) => void;
  className?: string;
  id?: string;
  disabled?: boolean;
  "aria-label"?: string;
};

const PRESETS = ["#006a4e", "#f42a41", "#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#0f172a", "#ffffff"];

type HSV = { h: number; s: number; v: number };
const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const HEX = /^#?([0-9a-f]{6})$/i;

function hexToRgb(hex: string): [number, number, number] | null {
  const m = HEX.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("");
}
function rgbToHsv(r: number, g: number, b: number): HSV {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  let h = 0;
  if (d) {
    if (mx === r) h = ((g - b) / d) % 6;
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: mx ? d / mx : 0, v: mx };
}
function hsvToRgb({ h, s, v }: HSV): [number, number, number] {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return (v - v * s * Math.max(0, Math.min(k, 4 - k, 1))) * 255;
  };
  return [f(5), f(3), f(1)];
}
const hsvToHex = (c: HSV) => rgbToHex(...hsvToRgb(c));
const isDark = (hex: string) => {
  const rgb = hexToRgb(hex);
  return !rgb || (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255 < 0.6;
};

export default function ColorInput({ value, onChange, className = "", id, disabled, "aria-label": ariaLabel }: Props) {
  const { lang } = useLang();
  const bn = lang !== "en";
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string | undefined>();
  const close = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  }, []);
  const emit = (v: string) => onChange({ target: { value: v }, currentTarget: { value: v } });

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={ariaLabel ?? (bn ? "রং বাছুন" : "Pick a colour")}
        disabled={disabled}
        onClick={() => {
          if (open) { close(); return; }
          setTitle(fieldTitle(triggerRef.current, id, ariaLabel));
          setOpen(true);
        }}
        className={`${className} flex items-stretch cursor-pointer disabled:opacity-50 transition-shadow ${open ? "ring-2 ring-indigo-500" : ""}`}
      >
        <span className="flex-1 rounded-lg grid place-items-center text-xs font-medium tabular-nums uppercase" style={{ background: value, color: isDark(value) ? "#fff" : "#0f172a" }}>
          {value}
        </span>
      </button>
      <Popup open={open} onClose={close} anchorRef={triggerRef} title={title} width={280}>
        {() => (
          <div role="dialog" aria-label={title ?? (bn ? "রং বাছুন" : "Pick a colour")} className="p-3">
            <ColorPanel value={value} emit={emit} bn={bn} />
          </div>
        )}
      </Popup>
    </>
  );
}

function ColorPanel({ value, emit, bn }: { value: string; emit: (hex: string) => void; bn: boolean }) {
  const tr = (b: string, e: string) => (bn ? b : e);
  const startRgb = hexToRgb(value) ?? [79, 70, 229];
  const [hsv, setHsv] = useState<HSV>(() => rgbToHsv(...startRgb));
  const [hexText, setHexText] = useState(value.toLowerCase());
  const square = useRef<HTMLDivElement>(null);

  const apply = (next: HSV) => {
    const hex = hsvToHex(next);
    setHsv(next);
    setHexText(hex);
    emit(hex);
  };

  const fromPointer = (e: ReactPointerEvent<HTMLDivElement>) => {
    const r = square.current?.getBoundingClientRect();
    if (!r) return;
    apply({ ...hsv, s: clamp((e.clientX - r.left) / r.width), v: 1 - clamp((e.clientY - r.top) / r.height) });
  };
  const onSquareKey = (e: ReactKeyboardEvent) => {
    const k = e.shiftKey ? 0.1 : 0.02;
    if (e.key === "ArrowLeft") apply({ ...hsv, s: clamp(hsv.s - k) });
    else if (e.key === "ArrowRight") apply({ ...hsv, s: clamp(hsv.s + k) });
    else if (e.key === "ArrowUp") apply({ ...hsv, v: clamp(hsv.v + k) });
    else if (e.key === "ArrowDown") apply({ ...hsv, v: clamp(hsv.v - k) });
    else return;
    e.preventDefault();
  };

  const current = hsvToHex(hsv);

  return (
    <div className="space-y-3">
      <div
        ref={square}
        role="slider"
        tabIndex={0}
        aria-label={tr("উজ্জ্বলতা ও রঙের গাঢ়ত্ব", "Brightness and saturation")}
        aria-valuetext={current}
        aria-valuenow={Math.round(hsv.v * 100)}
        onKeyDown={onSquareKey}
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); fromPointer(e); }}
        onPointerMove={(e) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) fromPointer(e); }}
        className="relative h-40 rounded-xl cursor-crosshair touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
        style={{ background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent), hsl(${hsv.h} 100% 50%)` }}
      >
        <span
          className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.3)] pointer-events-none"
          style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, background: current }}
        />
      </div>

      <input
        type="range"
        min={0}
        max={359}
        value={Math.round(hsv.h)}
        onChange={(e) => apply({ ...hsv, h: +e.target.value })}
        aria-label={tr("রঙের ধরন", "Hue")}
        className="range range-hue w-full"
      />

      <div className="flex items-center gap-2">
        <span className="w-10 h-10 rounded-xl shrink-0 border border-slate-200 dark:border-slate-600" style={{ background: current }} aria-hidden="true" />
        <input
          value={hexText}
          onChange={(e) => {
            const raw = e.target.value;
            setHexText(raw);
            const rgb = hexToRgb(raw);
            if (rgb) {
              const next = rgbToHsv(...rgb);
              setHsv(next.s === 0 || next.v === 0 ? { ...next, h: hsv.h } : next);
              emit(rgbToHex(...rgb));
            }
          }}
          spellCheck={false}
          maxLength={7}
          aria-label="Hex"
          className="flex-1 min-w-0 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white text-sm tabular-nums uppercase outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label={tr("তৈরি রং", "Preset colours")}>
        {PRESETS.map((c) => (
          <button
            key={c}
            type="button"
            aria-label={c}
            onClick={() => {
              const rgb = hexToRgb(c)!;
              setHsv(rgbToHsv(...rgb));
              setHexText(c);
              emit(c);
            }}
            className={`w-7 h-7 rounded-full border border-slate-300 dark:border-slate-500 transition-transform hover:scale-110 ${current === c ? "ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-800" : ""}`}
            style={{ background: c }}
          />
        ))}
      </div>
    </div>
  );
}
