"use client";
import type { Tone, Visual } from "@/lib/percent";
import { useTr } from "@/lib/lang";

// The signature element: 100 cells, one per percent. Cells fill in reading order, and the last one fills partly.
function HundredGrid({ v }: { v: Extract<Visual, { kind: "share" }> }) {
  const tr = useTr();
  const full = Math.floor(v.pct);
  const part = v.pct - full; // 0..1 for the cell that is only partly filled
  const restColor = v.restTone === "saved" ? "bg-emerald-200 dark:bg-emerald-900/70" : "bg-slate-200 dark:bg-slate-800";
  return (
    <figure className="m-0">
      <div role="img" aria-label={`${v.fill}. ${v.rest}`} className="grid grid-cols-10 gap-[3px] w-full max-w-[260px] mx-auto md:mx-0 aspect-square">
        {Array.from({ length: 100 }, (_, i) => {
          if (i < full) return <span key={i} className="rounded-[3px] bg-indigo-600 dark:bg-indigo-400 transition-colors duration-300" />;
          if (i === full && part > 0)
            return (
              <span
                key={i}
                className={`rounded-[3px] ${restColor}`}
                style={{ backgroundImage: `linear-gradient(to right, var(--pct-fill) ${part * 100}%, transparent ${part * 100}%)` }}
              />
            );
          return <span key={i} className={`rounded-[3px] ${restColor} transition-colors duration-300`} />;
        })}
      </div>
      <figcaption className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-slate-600 dark:text-slate-400 justify-center md:justify-start">
        <span className="inline-flex items-center gap-1.5"><span aria-hidden className="w-3 h-3 rounded-[3px] bg-indigo-600 dark:bg-indigo-400" />{v.fill}</span>
        <span className="inline-flex items-center gap-1.5"><span aria-hidden className={`w-3 h-3 rounded-[3px] ${restColor}`} />{v.rest}</span>
      </figcaption>
      {v.over && <p className="mt-1 text-[13px] text-amber-700 dark:text-amber-400 text-center md:text-left">{tr("১০০% এর বেশি, তাই সব ঘর ভরা", "Above 100%, so every cell is full")}</p>}
    </figure>
  );
}

const BAR: Record<Tone, string> = {
  neutral: "bg-indigo-500 dark:bg-indigo-400",
  up: "bg-emerald-500 dark:bg-emerald-400",
  down: "bg-rose-500 dark:bg-rose-400",
};

function Bars({ v }: { v: Extract<Visual, { kind: "bars" }> }) {
  return (
    <div className="space-y-3 w-full" role="img" aria-label={v.items.map((i) => `${i.label} ${i.text}`).join(", ")}>
      {v.items.map((it) => (
        <div key={it.label}>
          <div className="flex justify-between text-[13px] text-slate-600 dark:text-slate-400 mb-1">
            <span>{it.label}</span>
            <span className="font-semibold tabular-nums text-slate-900 dark:text-white">{it.text}</span>
          </div>
          <div className="h-3.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div className={`h-full rounded-full transition-[width] duration-500 ${BAR[it.tone]}`} style={{ width: `${Math.round(it.ratio * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PercentageVisual({ visual }: { visual: Visual }) {
  return visual.kind === "share" ? <HundredGrid v={visual} /> : <Bars v={visual} />;
}
