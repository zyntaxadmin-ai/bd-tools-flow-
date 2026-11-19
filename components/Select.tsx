"use client";
import {
  Children,
  Fragment,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import Popup, { fieldTitle } from "./Popup";

/**
 * Drop-in replacement for the native <select>.
 * Same API: <Select value onChange className id aria-label> with <option> / <optgroup> children,
 * and onChange receives an event-like object, so `e.target.value` keeps working.
 */

type Opt = { value: string; label: ReactNode; text: string; disabled: boolean };
type Group = { label?: ReactNode; loose: boolean; options: Opt[] };

export type ChangeEventLike = { target: { value: string }; currentTarget: { value: string } };

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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const typeBuf = useRef({ s: "", t: 0 });

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string | undefined>();
  const [active, setActive] = useState(0);

  const groups = useMemo(() => {
    const g: Group[] = [];
    collect(children, null, g);
    return g;
  }, [children]);
  const flat = useMemo(() => groups.flatMap((g) => g.options), [groups]);
  const cur = String(value);
  const selIndex = flat.findIndex((o) => o.value === cur);
  const selected = selIndex >= 0 ? flat[selIndex] : null;

  const openMenu = () => {
    if (disabled) return;
    setTitle(fieldTitle(triggerRef.current, id, ariaLabel));
    setActive(selIndex >= 0 ? selIndex : Math.max(0, flat.findIndex((o) => !o.disabled)));
    setOpen(true);
  };

  const close = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  }, []);

  const choose = (i: number) => {
    const o = flat[i];
    if (!o || o.disabled) return;
    onChange({ target: { value: o.value }, currentTarget: { value: o.value } });
    close();
  };

  // Keep the highlighted row in view while moving with the keyboard.
  useEffect(() => {
    if (!open) return;
    document.getElementById(`${uid}-o${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, uid]);

  const focusList = useCallback((el: HTMLDivElement | null) => { el?.focus({ preventScroll: true }); }, []);

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
    else if (e.key === "Tab") { close(false); }
    else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // Type-ahead: typing "ka" jumps to the first option starting with "ka".
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

      <Popup open={open} onClose={close} anchorRef={triggerRef} title={title} width="anchor">
        {({ sheet, maxH }) => {
          let flatIndex = -1;
          return (
            <div
              ref={focusList}
              role="listbox"
              id={`${uid}-list`}
              tabIndex={-1}
              aria-label={title}
              aria-activedescendant={`${uid}-o${active}`}
              onKeyDown={onListKey}
              className="outline-none overflow-y-auto overscroll-contain p-1.5"
              style={{ maxHeight: sheet ? "min(60vh, 440px)" : maxH }}
            >
              {groups.map((g, gi) => (
                <div
                  key={gi}
                  role={g.loose ? undefined : "group"}
                  aria-label={g.loose ? undefined : textOf(g.label)}
                  className={gi > 0 ? "mt-1.5 pt-1 border-t border-slate-100 dark:border-slate-700/70" : ""}
                >
                  {!g.loose && g.label != null && (
                    <div className="px-3 pt-2 pb-1 text-xs font-medium text-slate-500 dark:text-slate-400 select-none">{g.label}</div>
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
        }}
      </Popup>
    </>
  );
}
