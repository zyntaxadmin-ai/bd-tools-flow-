"use client";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { TOOL_SOURCES } from "@/lib/toolSources";
import { useLang } from "@/lib/lang";

// Small "Source and last checked" box under a tool. Renders nothing for tools without a fee, rate or rule.
export default function SourceNote({ slug }: { slug: string }) {
  const { lang } = useLang();
  const s = TOOL_SOURCES[slug];
  if (!s) return null;
  const i = lang === "en" ? 1 : 0;
  return (
    <aside className="mt-6 flex gap-3 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30 p-4 text-sm text-slate-700 dark:text-slate-300">
      <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
      <div className="leading-relaxed">
        <p>
          <span className="font-semibold text-slate-900 dark:text-white">{i ? "Source: " : "সূত্র: "}</span>
          {s.basis[i]}{" "}
          {s.link && (
            <a href={s.link.href} target="_blank" rel="noopener noreferrer" className="text-indigo-700 dark:text-indigo-300 underline">{s.link.label}</a>
          )}
        </p>
        <p className="mt-1">
          <span className="font-semibold text-slate-900 dark:text-white">{i ? "Last checked: " : "সর্বশেষ যাচাই: "}</span>
          {s.checked[i]}.{" "}
          <Link href="/editorial-policy" className="text-indigo-700 dark:text-indigo-300 underline">{i ? "How we check" : "আমরা কীভাবে যাচাই করি"}</Link>
        </p>
      </div>
    </aside>
  );
}
