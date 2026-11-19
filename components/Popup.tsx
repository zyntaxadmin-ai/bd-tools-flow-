"use client";
import { useEffect, useLayoutEffect, useState, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useDragControls, useReducedMotion } from "framer-motion";

/**
 * Shared popup surface for Select and DateInput.
 * Wide screens: a small panel anchored under the field (flips above when there is no room).
 * Phones: a bottom sheet with a drag handle and a title taken from the field's label.
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
  const reduce = useReducedMotion();
  const dragControls = useDragControls();
  const [mounted, setMounted] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0, maxH: 300, up: false });

  useEffect(() => setMounted(true), []);

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
    const prevOverflow = document.body.style.overflow;
    if (sheet) document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(true); }
    };
    const onResize = () => onClose(false);
    document.addEventListener("keydown", onKey, true);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open, sheet, onClose]);

  if (!mounted) return null;

  const dur = reduce ? 0 : 0.18;
  const surface =
    "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-[0_20px_50px_-14px_rgba(49,46,129,0.35)] dark:shadow-black/60";

  return createPortal(
    <AnimatePresence>
      {open && sheet && (
        <div key="sheet" className="fixed inset-0 z-[100]">
          <motion.div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur }}
            onClick={() => onClose(false)}
          />
          <motion.div
            className={`absolute inset-x-0 bottom-0 rounded-t-3xl border-b-0 pb-[env(safe-area-inset-bottom)] ${surface}`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={reduce ? { duration: 0 } : { type: "spring", damping: 32, stiffness: 380, mass: 0.8 }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => { if (info.offset.y > 90 || info.velocity.y > 500) onClose(false); }}
          >
            <div className="flex justify-center pt-2.5 pb-1.5 touch-none cursor-grab" aria-hidden="true" onPointerDown={(e) => dragControls.start(e)}>
              <span className="h-1.5 w-10 rounded-full bg-slate-300 dark:bg-slate-600" />
            </div>
            {title && <div className="px-5 pb-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">{title}</div>}
            {children({ sheet: true, maxH: 440 })}
          </motion.div>
        </div>
      )}
      {open && !sheet && (
        <div key="pop" className="fixed inset-0 z-[100]" onMouseDown={() => onClose(false)}>
          <motion.div
            className={`absolute rounded-2xl ${surface}`}
            style={{
              left: pos.left,
              width: pos.width,
              ...(pos.up ? { bottom: window.innerHeight - pos.top, transformOrigin: "bottom" } : { top: pos.top, transformOrigin: "top" }),
            }}
            initial={{ opacity: 0, y: pos.up ? 8 : -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: pos.up ? 6 : -6, scale: 0.98 }}
            transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {children({ sheet: false, maxH: pos.maxH })}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
