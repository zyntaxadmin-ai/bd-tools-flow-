"use client";
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";

/**
 * Shared popup surface for Select, DateInput and ColorInput.
 * Wide screens: a small panel anchored under the field (flips above when there is no room).
 * Phones: a bottom sheet with a drag handle and a title taken from the field's label.
 *
 * Performance: enter/exit use plain CSS keyframes on transform and opacity (see globals.css), which the
 * browser runs off the main thread, so they stay smooth while React renders the list. No backdrop blur,
 * no page scroll-lock toggling, and the sheet drag moves the element directly without re-rendering.
 */

export type PopupCtx = { sheet: boolean; maxH: number };

type PopupProps = {
  open: boolean;
  onClose: (refocus?: boolean) => void;
  anchorRef: RefObject<HTMLElement | null>;
  title?: string;
  /** Panel width in px (capped to the screen), or "anchor" to follow the field's width. */
  width?: number | "anchor";
  children: (ctx: PopupCtx) => ReactNode;
};

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const EXIT_MS = 180;

/** The visible name of a field, so the phone sheet can show it as a title. */
export function fieldTitle(el: HTMLElement | null, id?: string, aria?: string): string | undefined {
  if (aria) return aria;
  if (id) {
    const l = document.querySelector(`label[for="${id}"]`);
    if (l?.textContent) return l.textContent.trim();
  }
  const near = el?.parentElement?.querySelector("label");
  const t = near?.textContent?.trim();
  return t || undefined;
}

export default function Popup({ open, onClose, anchorRef, title, width = "anchor", children }: PopupProps) {
  const [mounted, setMounted] = useState(false);
  const [present, setPresent] = useState(false); // stays true during the exit animation
  const [sheet, setSheet] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0, maxH: 300, up: false });
  const sheetRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ y0: number; dy: number } | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) { setPresent(true); return; }
    if (!present) return;
    const t = setTimeout(() => setPresent(false), EXIT_MS);
    return () => clearTimeout(t);
  }, [open, present]);

  useIsoLayoutEffect(() => {
    if (!open) return;
    const isSheet = window.matchMedia("(max-width: 639px)").matches;
    setSheet(isSheet);
    const r = anchorRef.current?.getBoundingClientRect();
    if (!r || isSheet) return;
    const below = window.innerHeight - r.bottom - 12;
    const above = r.top - 12;
    const up = below < 260 && above > below;
    const maxH = Math.max(180, Math.min(380, up ? above : below));
    const w = width === "anchor" ? Math.max(r.width, 180) : Math.min(width, window.innerWidth - 16);
    const left = Math.min(Math.max(8, r.left), window.innerWidth - w - 8);
    setPos({ top: up ? r.top - 6 : r.bottom + 6, left, width: w, maxH, up });
  }, [open, anchorRef, width]);

  useEffect(() => {
    if (!open) return;
    const startW = window.innerWidth;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(true); }
    };
    // Phones fire "resize" when the address bar slides or the keyboard opens, so only a width change closes it.
    const onResize = () => { if (window.innerWidth !== startW) onClose(false); };
    document.addEventListener("keydown", onKey, true);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open, onClose]);

  if (!mounted || !(open || present)) return null;

  const state = open ? "open" : "closed";
  const surface = "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700";

  // Sheet drag: move the element directly (no React re-render per pointer move).
  const onHandleDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { y0: e.clientY, dy: 0 };
    if (sheetRef.current) sheetRef.current.style.transition = "none";
  };
  const onHandleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || !sheetRef.current) return;
    d.dy = Math.max(0, e.clientY - d.y0);
    sheetRef.current.style.transform = `translate3d(0, ${d.dy}px, 0)`;
  };
  const onHandleUp = () => {
    const d = drag.current;
    drag.current = null;
    const el = sheetRef.current;
    if (!d || !el) return;
    if (d.dy > 90) { onClose(false); return; }
    el.style.transition = "transform 0.2s ease-out";
    el.style.transform = "";
  };

  return createPortal(
    sheet ? (
      <div className="fixed inset-0 z-[100] overscroll-contain" data-state={state}>
        <div className="popup-scrim absolute inset-0 bg-slate-950/50 touch-none" data-state={state} onClick={() => onClose(false)} />
        <div
          ref={sheetRef}
          data-state={state}
          className={`popup-sheet absolute inset-x-0 bottom-0 rounded-t-3xl border-b-0 pb-[env(safe-area-inset-bottom)] overscroll-contain shadow-[0_-6px_20px_-10px_rgba(15,23,42,0.35)] ${surface}`}
        >
          <div
            className="flex justify-center pt-2.5 pb-1.5 touch-none cursor-grab"
            aria-hidden="true"
            onPointerDown={onHandleDown}
            onPointerMove={onHandleMove}
            onPointerUp={onHandleUp}
            onPointerCancel={onHandleUp}
          >
            <span className="h-1.5 w-10 rounded-full bg-slate-300 dark:bg-slate-600" />
          </div>
          {title && <div className="px-5 pb-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">{title}</div>}
          {children({ sheet: true, maxH: 440 })}
        </div>
      </div>
    ) : (
      <div className="fixed inset-0 z-[100]" onMouseDown={() => onClose(false)}>
        <div
          data-state={state}
          className={`popup-pop absolute rounded-2xl shadow-[0_12px_28px_-10px_rgba(49,46,129,0.35)] ${surface}`}
          style={{
            left: pos.left,
            width: pos.width,
            ["--pop-dy" as string]: pos.up ? "8px" : "-8px",
            ...(pos.up ? { bottom: window.innerHeight - pos.top, transformOrigin: "bottom" } : { top: pos.top, transformOrigin: "top" }),
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {children({ sheet: false, maxH: pos.maxH })}
        </div>
      </div>
    ),
    document.body
  );
}
