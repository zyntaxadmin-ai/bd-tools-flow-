"use client";
import {
  Children,
  Fragment,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useDragControls, useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

/**
 * Drop-in replacement for the native <select>.
 * Same API: <Select value onChange className id aria-label> with <option> / <optgroup> children,
 * and onChange receives an event-like object, so `e.target.value` keeps working.
 * Desktop: animated popover under the field. Phone: smooth bottom sheet.
 */

type Opt = { value: string; label: ReactNode; text: string; disabled: boolean };
type Group = { label?: ReactNode; loose: boolean; options: Opt[] };

type ChangeEventLike = { target: { value: string }; currentTarget: { value: string } };

type SelectProps = {
  value: string | number;
  onChange: (e: ChangeEventLike) => void;
  children: ReactNode;
  className?: string;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  "aria-label"?: string;
};

function textOf(n: ReactNode): string {
  if (n == null || typeof n === "boolean") return "";
  if (typeof n === "string" || typeof n === "number") return String(n);
  if (Array.isArray(n)) return n.map(textOf).join("");
  if (isValidElement(n)) return textOf((n.props as { children?: ReactNode }).children);
  return "";
}

function collect(children: ReactNode, group: Group | null, groups: Group[]) {
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const el = child as ReactElement<{ children?: ReactNode; label?: ReactNode; value?: string | number; disabled?: boolean }>;
    if (el.type === Fragment) {
      collect(el.props.children, group, groups);
    } else if (el.type === "optgroup") {
      const g: Group = { label: el.props.label, loose: false, options: [] };
      groups.push(g);
      collect(el.props.children, g, groups);
    } else if (el.type === "option") {
      let target = group;
      if (!target) {
        const last = groups[groups.length - 1];
        if (last && last.loose) target = last;
        else { target = { loose: true, options: [] }; groups.push(target); }
      }
      const text = textOf(el.props.children);
      target.options.push({
        value: el.props.value !== undefined ? String(el.props.value) : text,
        label: el.props.children,
        text,
        disabled: !!el.props.disabled,
      });
    }
  });
}

export default function Select({ value, onChange, children, className = "", id, disabled, placeholder, "aria-label": ariaLabel }: SelectProps) {
  const uid = useId();
  const reduce = useReducedMotion();
  const dragControls = useDragControls();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const typeBuf = useRef({ s: "", t: 0 });

  const [open, setOpen] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0, maxH: 300, up: false });

  const groups = useMemo(() => {
    const g: Group[] = [];
    collect(children, null, g);
    return g;
  }, [children]);
  const flat = useMemo(() => groups.flatMap((g) => g.options), [groups]);
  const cur = String(value);
  const selIndex = flat.findIndex((o) => o.value === cur);
  const selected = selIndex >= 0 ? flat[selIndex] : null;

  const place = () => {
    const r = triggerRef.current?.getBoundingClientRect();
    if (!r) return;
    const below = window.innerHeight - r.bottom - 12;
    const above = r.top - 12;
    const up = below < 200 && above > below;
    const maxH = Math.max(160, Math.min(320, up ? above : below));
    const width = Math.max(r.width, 180);
    const left = Math.min(Math.max(8, r.left), window.innerWidth - width - 8);
    setPos({ top: up ? r.top - 6 : r.bottom + 6, left, width, maxH, up });
  };

  const openMenu = () => {
    if (disabled) return;
    const isSheet = window.matchMedia("(max-width: 639px)").matches;
    setSheet(isSheet);
    if (!isSheet) place();
    setActive(selIndex >= 0 ? selIndex : Math.max(0, flat.findIndex((o) => !o.disabled)));
    setOpen(true);
  };

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  const choose = (i: number) => {
    const o = flat[i];
    if (!o || o.disabled) return;
    onChange({ target: { value: o.value }, currentTarget: { value: o.value } });
    close();
  };

  // Focus the list when it opens, keep the page from scrolling behind the phone sheet, close on resize.
  useEffect(() => {
    if (!open) return;
    listRef.current?.focus({ preventScroll: true });
    const prevOverflow = document.body.style.overflow;
    if (sheet) document.body.style.overflow = "hidden";
    const onResize = () => setOpen(false);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("resize", onResize);
    };
  }, [open, sheet]);

  // Keep the highlighted row visible.
  useEffect(() => {
    if (!open) return;
    document.getElementById(`${uid}-o${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, uid]);

  const step = (from: number, dir: 1 | -1) => {
    for (let i = from + dir; i >= 0 && i < flat.length; i += dir) if (!flat[i].disabled) return i;
    return from;
  };

  const onListKey = (e: ReactKeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => step(a, 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => step(a, -1)); }
    else if (e.key === "Home") { e.preventDefault(); setActive(step(-1, 1)); }
    else if (e.key === "End") { e.preventDefault(); setActive(step(flat.length, -1)); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(active); }
    else if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(); }
    else if (e.key === "Tab") { close(false); }
    else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const now = Date.now();
      const b = typeBuf.current;
      b.s = now - b.t > 700 ? e.key.toLowerCase() : b.s + e.key.toLowerCase();
      b.t = now;
      const from = b.s.length === 1 ? active + 1 : active;
      const order = [...flat.keys()];
      const rotated = [...order.slice(from), ...order.slice(0, from)];
      const hit = rotated.find((i) => !flat[i].disabled && flat[i].text.toLowerCase().startsWith(b.s));
      if (hit !== undefined) setActive(hit);
    }
  };

  const onTriggerKey = (e: ReactKeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openMenu();
    }
  };

  const dur = reduce ? 0 : 0.18;
  let flatIndex = -1;

  const list = (
    <div
      ref={listRef}
      role="listbox"
      id={`${uid}-list`}
      tabIndex={-1}
      aria-label={ariaLabel}
      aria-activedescendant={`${uid}-o${active}`}
      onKeyDown={onListKey}
      className="outline-none overflow-y-auto overscroll-contain p-1.5"
      style={sheet ? { maxHeight: "min(60vh, 440px)" } : { maxHeight: pos.maxH }}
    >
      {groups.map((g, gi) => (
        <div key={gi} role={g.loose ? undefined : "group"} aria-label={g.loose ? undefined : textOf(g.label)}>
          {!g.loose && g.label != null && (
            <div className="px-3 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 select-none">{g.label}</div>
          )}
          {g.options.map((o) => {
            flatIndex += 1;
            const i = flatIndex;
            const isSel = i === selIndex;
            const isAct = i === active;
            return (
              <div
                key={`${gi}-${o.value}-${i}`}
                id={`${uid}-o${i}`}
                role="option"
                aria-selected={isSel}
                aria-disabled={o.disabled || undefined}
                onMouseMove={() => { if (!o.disabled && active !== i) setActive(i); }}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(i)}
                className={`flex items-center justify-between gap-3 rounded-xl px-3 ${sheet ? "py-3.5 text-base" : "py-2.5 text-sm"} cursor-pointer select-none transition-colors duration-100 ${
                  o.disabled
                    ? "opacity-40 cursor-not-allowed"
                    : isSel
                    ? "bg-indigo-50 text-indigo-700 font-semibold dark:bg-indigo-500/15 dark:text-indigo-200"
                    : isAct
                    ? "bg-slate-100 dark:bg-slate-700/70 dark:text-white"
                    : "text-slate-700 dark:text-slate-200"
                } ${isSel && isAct ? "!bg-indigo-100 dark:!bg-indigo-500/25" : ""}`}
              >
                <span className="min-w-0">{o.label}</span>
                {isSel && <Check className="w-4 h-4 shrink-0 text-indigo-600 dark:text-indigo-300" aria-hidden="true" />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  const panelCls =
    "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-900/15 dark:shadow-black/50";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${uid}-list`}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={onTriggerKey}
        className={`${className} flex items-center justify-between gap-2 text-left cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-shadow ${open ? "ring-2 ring-indigo-500" : ""}`}
      >
        <span className={`min-w-0 truncate ${selected ? "" : "text-slate-400"}`}>{selected ? selected.label : placeholder ?? " "}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && sheet && (
              <div key="sheet" className="fixed inset-0 z-[100]">
                <motion.div
                  className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: dur }}
                  onClick={() => close()}
                />
                <motion.div
                  className={`absolute inset-x-0 bottom-0 rounded-t-3xl ${panelCls} border-b-0 pb-[env(safe-area-inset-bottom)]`}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={reduce ? { duration: 0 } : { type: "spring", damping: 32, stiffness: 380, mass: 0.8 }}
                  drag="y"
                  dragControls={dragControls}
                  dragListener={false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={{ top: 0, bottom: 0.6 }}
                  onDragEnd={(_, info) => { if (info.offset.y > 90 || info.velocity.y > 500) close(); }}
                >
                  <div className="flex justify-center pt-2.5 pb-1.5 touch-none cursor-grab" aria-hidden="true" onPointerDown={(e) => dragControls.start(e)}>
                    <span className="h-1.5 w-10 rounded-full bg-slate-300 dark:bg-slate-600" />
                  </div>
                  {ariaLabel && <div className="px-5 pb-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{ariaLabel}</div>}
                  {list}
                </motion.div>
              </div>
            )}
            {open && !sheet && (
              <div key="pop" className="fixed inset-0 z-[100]" onMouseDown={() => close(false)}>
                <motion.div
                  className={`absolute rounded-2xl ${panelCls}`}
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
                  {list}
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
