"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTr } from "@/lib/lang";
import {
  Angle, Base, BaseOp, CalcError, Ctx, Mat, RegType, VAR_NAMES, Val, ZERO,
  baseOp, evalField, evaluate, fmtNum, fmtVal, formatBase, makeTable, matAdd, matDet, matInv, matMul, matScale, matSub, matT,
  parseBase, regress, solveCubic, solveLinear, solveQuadratic, stat1, vdiv, vecCross, vecDot, vecNorm, vmul, intVal,
} from "@/lib/sciCalc";

type ModeId = "comp" | "cmplx" | "eqn" | "matrix" | "vector" | "stat" | "base" | "table";
const MODES: { id: ModeId; label: string; bn: string; en: string }[] = [
  { id: "comp", label: "COMP", bn: "সাধারণ", en: "Calculate" },
  { id: "cmplx", label: "CMPLX", bn: "জটিল সংখ্যা", en: "Complex" },
  { id: "eqn", label: "EQN", bn: "সমীকরণ", en: "Equations" },
  { id: "matrix", label: "MATRIX", bn: "ম্যাট্রিক্স", en: "Matrix" },
  { id: "vector", label: "VECTOR", bn: "ভেক্টর", en: "Vector" },
  { id: "stat", label: "STAT", bn: "পরিসংখ্যান", en: "Statistics" },
  { id: "base", label: "BASE-N", bn: "বেস-N", en: "Base-N" },
  { id: "table", label: "TABLE", bn: "টেবিল", en: "Table" },
];

const msgOf = (e: unknown, tr: (bn: string, en: string) => string) =>
  e instanceof CalcError ? tr(e.message, e.en) : tr("হিসাব করা যায়নি", "Could not calculate");

// ---------- shared look ----------
const lcdBox = "rounded-lg bg-[#c9d3b6] text-[#18230f] border border-[#97a483] shadow-[inset_0_2px_6px_rgba(0,0,0,0.22)]";
const fieldCls = "w-full rounded-md bg-[#17191c] text-[#ecebe6] border border-[#3d4147] px-2.5 py-2 text-sm font-mono outline-none focus:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400/40";
const chipCls = "px-3 py-1.5 rounded-md text-xs font-semibold bg-[#3a3e44] text-[#ecebe6] hover:bg-[#474c53] focus-visible:ring-2 focus-visible:ring-amber-400 outline-none";
const chipOn = "!bg-amber-400 !text-[#1b1d20]";

function Lcd({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`${lcdBox} ${className.includes("p-0") ? "" : "p-3"} font-mono ${className}`}>{children}</div>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs text-[#aeb1b6]">
      <span className="block mb-1">{label}</span>
      {children}
    </label>
  );
}
function Rows({ rows }: { rows: [string, string][] }) {
  return (
    <Lcd className="space-y-1 text-[15px]">
      {rows.map(([k, v], i) => (
        <div key={i} className="flex justify-between gap-4">
          <span className="opacity-70 shrink-0">{k}</span>
          <span className="text-right break-all font-semibold">{v}</span>
        </div>
      ))}
    </Lcd>
  );
}
function ErrBox({ msg }: { msg: string }) {
  return <Lcd className="text-sm"><span className="font-semibold">Math ERROR</span><span className="block opacity-80 mt-0.5">{msg}</span></Lcd>;
}
function Seg<T extends string | number>({ value, set, items }: { value: T; set: (v: T) => void; items: { v: T; l: string }[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((it) => (
        <button key={String(it.v)} type="button" onClick={() => set(it.v)} aria-pressed={value === it.v} className={`${chipCls} ${value === it.v ? chipOn : ""}`}>{it.l}</button>
      ))}
    </div>
  );
}

// ---------- COMP / CMPLX keypad calculator ----------
type Act = "ac" | "del" | "eq" | "shift" | "angle" | "sd" | "mixed" | "sto" | "mplus" | "mminus" | "hist";
type KeyDef = { l: string; ins?: string; act?: Act };
type Key = { m: KeyDef; s?: KeyDef; tone: "fn" | "num" | "op" | "del" | "eq" | "shift"; span?: number };
const k = (l: string, ins?: string, act?: Act): KeyDef => ({ l, ins, act });
const KEYS: Key[] = [
  { m: k("SHIFT", undefined, "shift"), tone: "shift" },
  { m: k("Deg", undefined, "angle"), tone: "fn" },
  { m: k("S⇔D", undefined, "sd"), tone: "fn" },
  { m: k("a b/c", undefined, "mixed"), tone: "fn" },
  { m: k("STO", undefined, "sto"), tone: "fn" },
  { m: k("History", undefined, "hist"), tone: "fn" },

  { m: k("sin", "sin("), s: k("sin⁻¹", "asin("), tone: "fn" },
  { m: k("cos", "cos("), s: k("cos⁻¹", "acos("), tone: "fn" },
  { m: k("tan", "tan("), s: k("tan⁻¹", "atan("), tone: "fn" },
  { m: k("log", "log("), s: k("10ˣ", "10^("), tone: "fn" },
  { m: k("ln", "ln("), s: k("eˣ", "e^("), tone: "fn" },
  { m: k("x²", "²"), s: k("x³", "³"), tone: "fn" },

  { m: k("xʸ", "^"), s: k("ʸ√x", "^(1÷"), tone: "fn" },
  { m: k("√", "√("), s: k("∛", "∛("), tone: "fn" },
  { m: k("n!", "!"), s: k("|x|", "abs("), tone: "fn" },
  { m: k("nCr", "nCr("), s: k("nPr", "nPr("), tone: "fn" },
  { m: k("∫", "∫("), s: k("d/dx", "d/dx("), tone: "fn" },
  { m: k("Σ", "Σ("), s: k("GCD", "gcd("), tone: "fn" },

  { m: k("(", "("), s: k("Mod", "mod("), tone: "fn" },
  { m: k(")", ")"), s: k("LCM", "lcm("), tone: "fn" },
  { m: k(",", ","), s: k("Round", "round("), tone: "fn" },
  { m: k("π", "π"), s: k("e", "e"), tone: "fn" },
  { m: k("x⁻¹", "⁻¹"), s: k("%", "%"), tone: "fn" },
  { m: k("i", "i"), s: k("conj", "conj("), tone: "fn" },

  { m: k("7", "7"), tone: "num" }, { m: k("8", "8"), tone: "num" }, { m: k("9", "9"), tone: "num" },
  { m: k("DEL", undefined, "del"), tone: "del" }, { m: k("AC", undefined, "ac"), tone: "del" },
  { m: k("M+", undefined, "mplus"), s: k("M−", undefined, "mminus"), tone: "fn" },

  { m: k("4", "4"), tone: "num" }, { m: k("5", "5"), tone: "num" }, { m: k("6", "6"), tone: "num" },
  { m: k("×", "×"), tone: "op" }, { m: k("÷", "÷"), tone: "op" }, { m: k("Ans", "Ans"), tone: "fn" },

  { m: k("1", "1"), tone: "num" }, { m: k("2", "2"), tone: "num" }, { m: k("3", "3"), tone: "num" },
  { m: k("+", "+"), tone: "op" }, { m: k("−", "−"), tone: "op" }, { m: k("(−)", "−"), tone: "fn" },

  { m: k("0", "0"), tone: "num" }, { m: k(".", "."), tone: "num" }, { m: k("×10ˣ", "×10^("), tone: "fn" },
  { m: k("=", undefined, "eq"), tone: "eq", span: 3 },
];
const TONE: Record<Key["tone"], string> = {
  fn: "bg-[#3a3e44] text-[#ecebe6] hover:bg-[#474c53]",
  num: "bg-[#ecebe6] text-[#17191c] hover:bg-white",
  op: "bg-[#c4c3bd] text-[#17191c] hover:bg-[#d4d3cd]",
  del: "bg-[#c8573d] text-white hover:bg-[#d8664b]",
  eq: "bg-[#2f5fd0] text-white hover:bg-[#3f70e3]",
  shift: "bg-[#e8a33d] text-[#17191c] hover:bg-[#f2b455]",
};
const HIST_KEY = "bdtoolsflow-sci-history";
type Hist = { e: string; r: string };
const ANGLES: Angle[] = ["deg", "rad", "gra"];
const ANGLE_LABEL: Record<Angle, string> = { deg: "Deg", rad: "Rad", gra: "Gra" };
const MORE = ["sinh(", "cosh(", "tanh(", "exp(", "cbrt(", "floor(", "ceil(", "arg(", "log(2,"];
const OP_START = /^[+×÷^%*/−\-²³!⁻]/;

function CompPanel({ cmplx, angle, setAngle }: { cmplx: boolean; angle: Angle; setAngle: (a: Angle) => void }) {
  const tr = useTr();
  const [expr, setExpr] = useState("");
  const [fresh, setFresh] = useState(false);
  const [result, setResult] = useState<Val | null>(null);
  const [error, setError] = useState("");
  const [ans, setAns] = useState<Val>(ZERO);
  const [vars, setVars] = useState<Record<string, Val>>({});
  const [shift, setShift] = useState(false);
  const [view, setView] = useState<"auto" | "dec" | "frac">("auto");
  const [mixed, setMixed] = useState(false);
  const [polar, setPolar] = useState(false);
  const [sto, setSto] = useState(false);
  const [hist, setHist] = useState<Hist[]>([]);
  const [showHist, setShowHist] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const caret = useRef<number | null>(null);
  const histIdx = useRef(-1);

  useEffect(() => {
    try { const s = localStorage.getItem(HIST_KEY); if (s) setHist(JSON.parse(s)); } catch { /* ignore */ }
  }, []);
  const saveHist = (h: Hist[]) => { setHist(h); try { localStorage.setItem(HIST_KEY, JSON.stringify(h)); } catch { /* ignore */ } };
  useEffect(() => {
    if (caret.current !== null && inputRef.current) { inputRef.current.setSelectionRange(caret.current, caret.current); caret.current = null; }
  }, [expr]);

  const ctx: Ctx = { angle, cmplx, vars, ans };
  const opts = { view, mixed, polar, angle };

  const preview = useMemo(() => {
    if (fresh || expr.trim() === "") return null;
    try { return fmtVal(evaluate(expr, { angle, cmplx, vars, ans }), { view: "auto", mixed, polar, angle }); } catch { return null; }
  }, [expr, fresh, angle, cmplx, vars, ans, mixed, polar]);

  const insert = (text: string) => {
    setError("");
    const el = inputRef.current;
    let base = expr, s = el?.selectionStart ?? expr.length, e = el?.selectionEnd ?? expr.length;
    if (fresh) {
      if (OP_START.test(text)) { base = "Ans"; s = e = 3; } else { base = ""; s = e = 0; }
      setFresh(false); setResult(null);
    }
    setExpr(base.slice(0, s) + text + base.slice(e));
    caret.current = s + text.length;
    el?.focus();
  };
  const del = () => {
    setError("");
    if (fresh) { setFresh(false); setResult(null); }
    const el = inputRef.current;
    const s = el?.selectionStart ?? expr.length, e = el?.selectionEnd ?? expr.length;
    if (s !== e) { setExpr(expr.slice(0, s) + expr.slice(e)); caret.current = s; return; }
    if (s === 0) return;
    const before = expr.slice(0, s);
    const m = /(?:d\/dx\(|[a-zA-Z]{2,}\(|[√∛∫Σ]\()$/.exec(before);
    const cut = m ? m[0].length : 1;
    setExpr(before.slice(0, s - cut) + expr.slice(s));
    caret.current = s - cut;
  };
  const ac = () => { setExpr(""); setResult(null); setError(""); setFresh(false); setSto(false); histIdx.current = -1; inputRef.current?.focus(); };
  const equals = () => {
    if (expr.trim() === "") return;
    try {
      const v = evaluate(expr, ctx);
      setResult(v); setAns(v); setError(""); setView("auto"); setFresh(true);
      const r = fmtVal(v, { view: "auto", mixed, polar, angle });
      saveHist([{ e: expr, r }, ...hist.filter((h) => h.e !== expr)].slice(0, 30));
      histIdx.current = -1;
    } catch (e) { setResult(null); setError(msgOf(e, tr)); setFresh(false); }
  };
  const press = (d: KeyDef) => {
    const wasShift = shift;
    if (d.act !== "shift") setShift(false);
    switch (d.act) {
      case "shift": setShift(!wasShift); return;
      case "ac": ac(); return;
      case "del": del(); return;
      case "eq": equals(); return;
      case "angle": setAngle(ANGLES[(ANGLES.indexOf(angle) + 1) % 3]); return;
      case "mixed": setMixed(!mixed); return;
      case "hist": setShowHist(!showHist); return;
      case "sto": setSto(!sto); return;
      case "sd": {
        if (!result) return;
        const showingFrac = fmtVal(result, { view, mixed }).includes("/");
        setView(showingFrac ? "dec" : "frac");
        return;
      }
      case "mplus": case "mminus": {
        const v = result ?? ans;
        setVars({ ...vars, m: d.act === "mplus" ? addVal(vars.m ?? ZERO, v) : addVal(vars.m ?? ZERO, vmul(v, intVal(-1))) });
        return;
      }
    }
    if (d.ins) insert(d.ins);
  };
  const pickVar = (name: string) => {
    if (sto) { setVars({ ...vars, [name]: result ?? ans }); setSto(false); return; }
    insert(name.toUpperCase());
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); equals(); }
    else if (e.key === "Escape") { e.preventDefault(); ac(); }
    else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      if (!hist.length) return;
      e.preventDefault();
      histIdx.current = Math.max(-1, Math.min(hist.length - 1, histIdx.current + (e.key === "ArrowUp" ? 1 : -1)));
      const h = hist[histIdx.current];
      setExpr(h ? h.e : ""); setFresh(false); setResult(null);
      caret.current = (h ? h.e : "").length;
    }
  };
  const copyResult = async () => {
    const text = result ? fmtVal(result, opts) : preview;
    if (!text) return;
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch { /* ignore */ }
  };

  const shownResult = result ? fmtVal(result, opts) : preview;
  const isFinal = !!result && fresh;

  return (
    <div className="space-y-3">
      <Lcd>
        <div className="flex items-center gap-2 text-[10px] font-bold h-4 text-[#18230f]/80 select-none" aria-hidden="true">
          <span className={shift ? "" : "opacity-20"}>S</span>
          <span>{ANGLE_LABEL[angle].charAt(0)}</span>
          {cmplx && <span>CMPLX</span>}
          {(vars.m && !(vars.m.re === 0 && vars.m.im === 0)) && <span>M</span>}
          {sto && <span className="animate-pulse">STO▸</span>}
          <span className="ml-auto opacity-70">{view === "frac" ? "FRAC" : view === "dec" ? "DEC" : ""}</span>
        </div>
        <input
          ref={inputRef}
          value={expr}
          onChange={(e) => { setExpr(e.target.value); setError(""); if (fresh) { setFresh(false); setResult(null); } }}
          onKeyDown={onKeyDown}
          inputMode="none"
          autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
          placeholder="0"
          aria-label={tr("এক্সপ্রেশন", "Expression")}
          className="w-full bg-transparent text-xl sm:text-2xl outline-none placeholder:text-[#18230f]/35 caret-[#18230f]"
        />
        <div className="min-h-[2.4rem] text-right text-2xl sm:text-3xl font-bold break-all leading-tight pt-1" aria-live="polite">
          {error ? <span className="text-base font-semibold">Math ERROR</span> : shownResult !== null ? <span className={isFinal ? "" : "opacity-45"}>{isFinal ? "" : "≈ "}{shownResult}</span> : <span className="opacity-0">0</span>}
        </div>
        {error && <p className="text-xs mt-1 opacity-80">{error}</p>}
      </Lcd>

      <div className="flex flex-wrap items-center gap-1.5">
        {VAR_NAMES.map((v) => (
          <button key={v} type="button" onClick={() => pickVar(v)} className={`${chipCls} ${sto ? "!bg-amber-400 !text-[#1b1d20]" : ""}`} title={vars[v] ? `${v.toUpperCase()} = ${fmtVal(vars[v], { view: "auto" })}` : v.toUpperCase()}>
            {v.toUpperCase()}
            {vars[v] && <span className="ml-1 font-normal opacity-70">{fmtNum(vars[v].re, 4)}</span>}
          </button>
        ))}
        {cmplx && <button type="button" onClick={() => setPolar(!polar)} className={`${chipCls} ml-auto ${polar ? chipOn : ""}`}>{polar ? "r∠θ" : "a+bi"}</button>}
        <button type="button" onClick={copyResult} className={`${chipCls} ${cmplx ? "" : "ml-auto"}`}>{copied ? tr("কপি হয়েছে", "Copied") : tr("ফলাফল কপি", "Copy result")}</button>
      </div>
      {sto && <p className="text-xs text-amber-300">{tr("কোন ভেরিয়েবলে রাখবেন? A–D, X, Y বা M চাপুন।", "Store in which variable? Press A–D, X, Y or M.")}</p>}

      <div className="grid grid-cols-6 gap-1.5">
        {KEYS.map((key, i) => {
          const d = shift && key.s ? key.s : key.m;
          const label = key.m.act === "angle" ? ANGLE_LABEL[angle] : key.m.act === "mixed" ? (mixed ? "a b/c ✓" : "a b/c") : key.m.l;
          return (
            <button
              key={i}
              type="button"
              onClick={() => press(d)}
              aria-label={d.l}
              aria-pressed={key.m.act === "shift" ? shift : undefined}
              style={key.span ? { gridColumn: `span ${key.span}` } : undefined}
              className={`h-12 rounded-lg flex flex-col items-center justify-center leading-none select-none active:translate-y-px active:brightness-90 outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${TONE[key.tone]} ${key.m.act === "shift" && shift ? "ring-2 ring-white" : ""}`}
            >
              <span className={`text-[9px] h-3 font-semibold ${shift && key.s ? "text-white" : "text-amber-300"} ${key.tone === "num" || key.tone === "op" ? "hidden" : ""}`}>{key.s ? key.s.l : ""}</span>
              <span className={`${label.length > 4 ? "text-[11px]" : "text-sm"} font-semibold`}>{label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {MORE.map((f) => <button key={f} type="button" onClick={() => insert(f)} className={chipCls}>{f.replace("(", "").replace(",", "")}</button>)}
      </div>

      {showHist && (
        <div className="rounded-lg bg-[#17191c] border border-[#3d4147] p-2">
          <div className="flex items-center justify-between px-1 pb-1">
            <span className="text-xs text-[#aeb1b6]">{tr("আগের হিসাব", "History")}</span>
            {hist.length > 0 && <button type="button" onClick={() => saveHist([])} className="text-xs text-amber-300 hover:underline">{tr("সব মুছুন", "Clear all")}</button>}
          </div>
          {hist.length === 0 ? <p className="text-xs text-[#aeb1b6] px-1 py-2">{tr("কোনো হিসাব নেই। = চাপলে এখানে জমা হবে।", "Nothing yet. Press = and the calculation is saved here.")}</p> : (
            <ul className="max-h-52 overflow-y-auto divide-y divide-[#2c2f34]">
              {hist.map((h, i) => (
                <li key={i}>
                  <button type="button" onClick={() => { setExpr(h.e); setFresh(false); setResult(null); setError(""); inputRef.current?.focus(); }} className="w-full text-left px-1 py-1.5 hover:bg-[#23262a] rounded">
                    <span className="block text-xs text-[#aeb1b6] font-mono break-all">{h.e}</span>
                    <span className="block text-sm text-[#ecebe6] font-mono font-semibold break-all">= {h.r}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p className="text-[11px] text-[#8e9298] leading-relaxed">
        {tr("কিবোর্ডেও টাইপ করা যায়: Enter = হিসাব, Esc = মুছুন, ↑↓ = আগের হিসাব। SHIFT চেপে হলুদ লেখা ফাংশন পাবেন। ∫(x^2, 0, 3) এবং d/dx(x^3, 2) এর ভেতরে চলক হিসেবে X লিখুন।", "You can also type on the keyboard: Enter = calculate, Esc = clear, ↑↓ = earlier calculations. Press SHIFT for the amber functions. Use X as the variable inside ∫(x^2, 0, 3) and d/dx(x^3, 2).")}
      </p>
    </div>
  );
}
function addVal(a: Val, b: Val): Val {
  return { re: a.re + b.re, im: a.im + b.im };
}

// ---------- EQN ----------
function EqnPanel({ exact }: { exact: boolean }) {
  const tr = useTr();
  const [kind, setKind] = useState<"quad" | "cubic" | "lin2" | "lin3">("quad");
  const defaults: Record<string, string[]> = { quad: ["1", "-3", "2"], cubic: ["1", "-6", "11", "-6"], lin2: ["1", "1", "3", "1", "-1", "1"], lin3: ["2", "1", "-1", "8", "-3", "-1", "2", "-11", "-2", "1", "2", "-3"] };
  const [vals, setVals] = useState<Record<string, string[]>>(defaults);
  const cur = vals[kind];
  const setAt = (i: number, v: string) => setVals({ ...vals, [kind]: cur.map((x, j) => (j === i ? v : x)) });
  const view = exact ? "auto" : "dec";
  let out: [string, string][] = [], error = "";
  try {
    const n = cur.map((s) => evalField(s, "deg", false));
    if (kind === "quad") { const r = solveQuadratic(n[0], n[1], n[2]); out = r.map((v, i) => [`x${i + 1}`, fmtVal(v, { view })]); }
    else if (kind === "cubic") { const r = solveCubic(n[0], n[1], n[2], n[3]); out = r.map((v, i) => [`x${i + 1}`, fmtVal(v, { view })]); }
    else {
      const sz = kind === "lin2" ? 2 : 3;
      const rows = Array.from({ length: sz }, (_, r) => n.slice(r * (sz + 1), r * (sz + 1) + sz + 1));
      out = solveLinear(rows).map((v, i) => [["x", "y", "z"][i], fmtVal(v, { view })]);
    }
  } catch (e) { error = msgOf(e, tr); }
  const names = kind === "quad" ? ["a", "b", "c"] : kind === "cubic" ? ["a", "b", "c", "d"] : (kind === "lin2" ? ["a₁", "b₁", "c₁", "a₂", "b₂", "c₂"] : ["a₁", "b₁", "c₁", "d₁", "a₂", "b₂", "c₂", "d₂", "a₃", "b₃", "c₃", "d₃"]);
  const cols = kind === "cubic" ? 4 : kind === "lin3" ? 4 : 3;
  const hint = { quad: "ax² + bx + c = 0", cubic: "ax³ + bx² + cx + d = 0", lin2: "a₁x + b₁y = c₁,  a₂x + b₂y = c₂", lin3: "a₁x + b₁y + c₁z = d₁ …" }[kind];
  return (
    <div className="space-y-3">
      <Seg value={kind} set={setKind} items={[{ v: "quad", l: tr("দ্বিঘাত", "Quadratic") }, { v: "cubic", l: tr("ত্রিঘাত", "Cubic") }, { v: "lin2", l: tr("২ অজ্ঞাত", "2 unknowns") }, { v: "lin3", l: tr("৩ অজ্ঞাত", "3 unknowns") }]} />
      <p className="text-xs text-[#aeb1b6] font-mono">{hint}</p>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {names.map((nm, i) => <Field key={nm + kind} label={nm}><input className={fieldCls} value={cur[i]} onChange={(e) => setAt(i, e.target.value)} inputMode="text" aria-label={nm} /></Field>)}
      </div>
      {error ? <ErrBox msg={error} /> : <Rows rows={out} />}
      <p className="text-[11px] text-[#8e9298]">{tr("সহগে ভগ্নাংশ বা মূলও লেখা যায়, যেমন 1/2 বা √2। বর্গসমীকরণের জটিল মূল i দিয়ে দেখায়।", "Coefficients can be fractions or roots, such as 1/2 or √2. Complex roots of a quadratic show with i.")}</p>
    </div>
  );
}

// ---------- MATRIX ----------
function MatGrid({ name, m, set, n }: { name: string; m: string[][]; set: (m: string[][]) => void; n: number }) {
  return (
    <div>
      <p className="text-xs text-[#aeb1b6] mb-1">{name}</p>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {Array.from({ length: n }).flatMap((_, r) => Array.from({ length: n }).map((__, c) => (
          <input key={`${r}${c}`} className={`${fieldCls} text-center`} value={m[r]?.[c] ?? "0"} aria-label={`${name}${r + 1}${c + 1}`}
            onChange={(e) => { const next = m.map((row) => row.slice()); next[r][c] = e.target.value; set(next); }} />
        )))}
      </div>
    </div>
  );
}
function MatrixPanel({ exact }: { exact: boolean }) {
  const tr = useTr();
  const [n, setN] = useState<2 | 3>(2);
  const [A, setA] = useState<string[][]>([["1", "2", "0"], ["3", "4", "0"], ["0", "0", "1"]]);
  const [B, setB] = useState<string[][]>([["2", "0", "1"], ["1", "3", "0"], ["0", "1", "2"]]);
  const [op, setOp] = useState("AB");
  const view = exact ? "auto" : "dec";
  const parse = (m: string[][]): Mat => m.slice(0, n).map((r) => r.slice(0, n).map((s) => evalField(s)));
  let grid: string[][] | null = null, scalar: string | null = null, error = "";
  try {
    const a = parse(A), b = parse(B);
    const show = (m: Mat) => m.map((r) => r.map((v) => fmtVal(v, { view })));
    switch (op) {
      case "A+B": grid = show(matAdd(a, b)); break;
      case "A-B": grid = show(matSub(a, b)); break;
      case "AB": grid = show(matMul(a, b)); break;
      case "BA": grid = show(matMul(b, a)); break;
      case "detA": scalar = fmtVal(matDet(a), { view }); break;
      case "detB": scalar = fmtVal(matDet(b), { view }); break;
      case "invA": grid = show(matInv(a)); break;
      case "invB": grid = show(matInv(b)); break;
      case "TA": grid = show(matT(a)); break;
      case "2A": grid = show(matScale(a, intVal(2))); break;
    }
  } catch (e) { error = msgOf(e, tr); }
  const ops = [["A+B", "A + B"], ["A-B", "A − B"], ["AB", "A × B"], ["BA", "B × A"], ["detA", "det A"], ["detB", "det B"], ["invA", "A⁻¹"], ["invB", "B⁻¹"], ["TA", "Aᵀ"], ["2A", "2A"]];
  return (
    <div className="space-y-3">
      <Seg value={n} set={setN} items={[{ v: 2, l: "2 × 2" }, { v: 3, l: "3 × 3" }]} />
      <div className="grid sm:grid-cols-2 gap-3">
        <MatGrid name="A" m={A} set={setA} n={n} />
        <MatGrid name="B" m={B} set={setB} n={n} />
      </div>
      <Seg value={op} set={setOp} items={ops.map(([v, l]) => ({ v, l }))} />
      {error ? <ErrBox msg={error} /> : scalar !== null ? <Rows rows={[["det", scalar]]} /> : grid && (
        <Lcd><div className="grid gap-x-4 gap-y-1 text-right text-base font-semibold" style={{ gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))` }}>{grid.flat().map((v, i) => <span key={i} className="break-all">{v}</span>)}</div></Lcd>
      )}
    </div>
  );
}

// ---------- VECTOR ----------
function VectorPanel({ exact, angle }: { exact: boolean; angle: Angle }) {
  const tr = useTr();
  const [dim, setDim] = useState<2 | 3>(3);
  const [A, setA] = useState(["1", "2", "3"]);
  const [B, setB] = useState(["4", "5", "6"]);
  const [op, setOp] = useState("dot");
  const view = exact ? "auto" : "dec";
  const fmt = (v: Val) => fmtVal(v, { view });
  let rows: [string, string][] = [], error = "";
  try {
    const a = A.slice(0, dim).map((s) => evalField(s, angle)), b = B.slice(0, dim).map((s) => evalField(s, angle));
    const vec = (v: Val[]) => "(" + v.map(fmt).join(", ") + ")";
    if (op === "dot") rows = [["A · B", fmt(vecDot(a, b))]];
    else if (op === "cross") { if (dim !== 3) throw new CalcError("ক্রস গুণফল শুধু ৩ মাত্রার ভেক্টরে", "The cross product needs 3D vectors"); rows = [["A × B", vec(vecCross(a, b))]]; }
    else if (op === "add") rows = [["A + B", vec(a.map((v, i) => addVal(v, b[i])))]];
    else if (op === "sub") rows = [["A − B", vec(a.map((v, i) => addVal(v, vmul(b[i], intVal(-1)))))]];
    else if (op === "norm") rows = [["|A|", fmt(vecNorm(a))], ["|B|", fmt(vecNorm(b))]];
    else if (op === "unit") { const nA = vecNorm(a); rows = [["Â", vec(a.map((v) => vdiv(v, nA)))]]; }
    else {
      const na = vecNorm(a), nb = vecNorm(b);
      const cos = vecDot(a, b).re / (na.re * nb.re);
      if (!isFinite(cos)) throw new CalcError("শূন্য ভেক্টরের কোণ নেই", "A zero vector has no angle");
      const rad = Math.acos(Math.max(-1, Math.min(1, cos)));
      const k = angle === "rad" ? 1 : angle === "gra" ? 200 / Math.PI : 180 / Math.PI;
      rows = [[tr("কোণ", "Angle") + ` (${ANGLE_LABEL[angle]})`, fmtNum(rad * k)]];
    }
  } catch (e) { error = msgOf(e, tr); }
  const labels = ["x", "y", "z"];
  const edit = (arr: string[], set: (v: string[]) => void, i: number, v: string) => set(arr.map((s, j) => (j === i ? v : s)));
  return (
    <div className="space-y-3">
      <Seg value={dim} set={setDim} items={[{ v: 2, l: "2D" }, { v: 3, l: "3D" }]} />
      {[["A", A, setA], ["B", B, setB]].map(([nm, arr, set]) => (
        <div key={nm as string} className="grid gap-2" style={{ gridTemplateColumns: `auto repeat(${dim}, minmax(0, 1fr))` }}>
          <span className="self-end pb-2 text-sm text-[#ecebe6] font-mono">{nm as string}</span>
          {labels.slice(0, dim).map((l, i) => <Field key={l} label={l}><input className={fieldCls} value={(arr as string[])[i]} onChange={(e) => edit(arr as string[], set as (v: string[]) => void, i, e.target.value)} /></Field>)}
        </div>
      ))}
      <Seg value={op} set={setOp} items={[{ v: "dot", l: "A · B" }, { v: "cross", l: "A × B" }, { v: "add", l: "A + B" }, { v: "sub", l: "A − B" }, { v: "norm", l: "|A|, |B|" }, { v: "unit", l: tr("একক ভেক্টর", "Unit A") }, { v: "angle", l: tr("কোণ", "Angle") }]} />
      {error ? <ErrBox msg={error} /> : <Rows rows={rows} />}
    </div>
  );
}

// ---------- STAT ----------
const parseLines = (s: string) => s.split(/\n+/).map((l) => l.trim()).filter(Boolean).map((l) => l.split(/[\s,;]+/).map((t) => Number(t)));
function StatPanel() {
  const tr = useTr();
  const [kind, setKind] = useState<"one" | "two">("one");
  const [one, setOne] = useState("12\n15\n15\n18\n20\n22\n25");
  const [two, setTwo] = useState("1, 2\n2, 4\n3, 6.1\n4, 8.2\n5, 9.9");
  const [reg, setReg] = useState<RegType>("linear");
  const [est, setEst] = useState("6");
  let rows: [string, string][] = [], error = "";
  try {
    if (kind === "one") {
      const lines = parseLines(one);
      if (lines.some((l) => l.some((n) => !isFinite(n)))) throw new CalcError("শুধু সংখ্যা লিখুন (প্রতি লাইনে একটি, চাইলে পরে কমা দিয়ে ফ্রিকোয়েন্সি)", "Enter numbers only (one per line, optionally followed by a comma and a frequency)");
      const xs = lines.map((l) => l[0]);
      const fr = lines.map((l) => (l[1] === undefined ? 1 : l[1]));
      if (fr.some((f) => !Number.isInteger(f) || f < 1)) throw new CalcError("ফ্রিকোয়েন্সি ধনাত্মক পূর্ণসংখ্যা হতে হবে", "A frequency must be a positive whole number");
      const s = stat1(xs, fr);
      rows = [["n", String(s.n)], ["Σx", fmtNum(s.sum)], ["Σx²", fmtNum(s.sumSq)], [tr("গড় (x̄)", "Mean (x̄)"), fmtNum(s.mean)], ["σx (population)", fmtNum(s.popSd)], ["sx (sample)", fmtNum(s.sampleSd)], [tr("ভেদাঙ্ক σ²", "Variance σ²"), fmtNum(s.popVar)], [tr("ভেদাঙ্ক s²", "Variance s²"), fmtNum(s.sampleVar)], ["min", fmtNum(s.min)], ["Q1", fmtNum(s.q1)], [tr("মধ্যমা", "Median"), fmtNum(s.median)], ["Q3", fmtNum(s.q3)], ["max", fmtNum(s.max)]];
    } else {
      const lines = parseLines(two);
      if (lines.some((l) => l.length < 2 || l.some((n) => !isFinite(n)))) throw new CalcError("প্রতি লাইনে x, y জোড়া লিখুন", "Write one x, y pair per line");
      const xs = lines.map((l) => l[0]), ys = lines.map((l) => l[1]);
      const r = regress(reg, xs, ys);
      rows = [[tr("সমীকরণ", "Model"), r.eq], ["a", fmtNum(r.a)], ["b", fmtNum(r.b)]];
      if (r.c !== undefined) rows.push(["c", fmtNum(r.c)]);
      if (r.r !== undefined) rows.push(["r", fmtNum(r.r)]);
      const x = evalField(est).re;
      rows.push([`ŷ (x = ${fmtNum(x)})`, fmtNum(r.predict(x))]);
    }
  } catch (e) { error = msgOf(e, tr); }
  return (
    <div className="space-y-3">
      <Seg value={kind} set={setKind} items={[{ v: "one", l: tr("১ চলক (1-VAR)", "1-variable") }, { v: "two", l: tr("২ চলক ও রিগ্রেশন", "2-variable + regression") }]} />
      {kind === "one" ? (
        <Field label={tr("প্রতি লাইনে একটি সংখ্যা (ফ্রিকোয়েন্সি দিতে: 15, 3)", "One number per line (for a frequency: 15, 3)")}>
          <textarea className={`${fieldCls} h-32`} value={one} onChange={(e) => setOne(e.target.value)} />
        </Field>
      ) : (
        <>
          <Field label={tr("প্রতি লাইনে x, y", "One x, y pair per line")}>
            <textarea className={`${fieldCls} h-32`} value={two} onChange={(e) => setTwo(e.target.value)} />
          </Field>
          <Seg value={reg} set={setReg} items={[{ v: "linear", l: "Linear" }, { v: "quadratic", l: "Quadratic" }, { v: "log", l: "Log" }, { v: "exp", l: "Exponential" }, { v: "power", l: "Power" }, { v: "inverse", l: "Inverse" }]} />
          <Field label={tr("এই x এর জন্য ŷ আন্দাজ", "Estimate ŷ for this x")}><input className={fieldCls} value={est} onChange={(e) => setEst(e.target.value)} /></Field>
        </>
      )}
      {error ? <ErrBox msg={error} /> : <Rows rows={rows} />}
    </div>
  );
}

// ---------- BASE-N ----------
const BASES: { v: Base; l: string }[] = [{ v: 10, l: "DEC" }, { v: 16, l: "HEX" }, { v: 2, l: "BIN" }, { v: 8, l: "OCT" }];
function BasePanel() {
  const tr = useTr();
  const [base, setBase] = useState<Base>(10);
  const [a, setA] = useState("25");
  const [b, setB] = useState("6");
  const [op, setOp] = useState<BaseOp>("+");
  const unary = op === "NOT" || op === "NEG";
  const switchBase = (nb: Base) => {
    try { setA(formatBase(parseBase(a, base), nb)); if (b.trim()) setB(formatBase(parseBase(b, base), nb)); } catch { /* keep text */ }
    setBase(nb);
  };
  let rows: [string, string][] = [], error = "";
  try {
    const x = parseBase(a, base), y = unary ? 0 : parseBase(b, base);
    const r = baseOp(op, x, y);
    rows = BASES.map(({ v, l }) => [l, formatBase(r, v)]);
  } catch (e) { error = msgOf(e, tr); }
  const ops: { v: BaseOp; l: string }[] = [{ v: "+", l: "+" }, { v: "-", l: "−" }, { v: "*", l: "×" }, { v: "/", l: "÷" }, { v: "AND", l: "AND" }, { v: "OR", l: "OR" }, { v: "XOR", l: "XOR" }, { v: "XNOR", l: "XNOR" }, { v: "NOT", l: "NOT A" }, { v: "NEG", l: "NEG A" }];
  return (
    <div className="space-y-3">
      <Seg value={base} set={switchBase} items={BASES} />
      <div className="grid grid-cols-2 gap-2">
        <Field label="A"><input className={fieldCls} value={a} onChange={(e) => setA(e.target.value)} autoCapitalize="characters" /></Field>
        <Field label="B"><input className={`${fieldCls} ${unary ? "opacity-40" : ""}`} value={b} disabled={unary} onChange={(e) => setB(e.target.value)} autoCapitalize="characters" /></Field>
      </div>
      <Seg value={op} set={setOp} items={ops} />
      {error ? <ErrBox msg={error} /> : <Rows rows={rows} />}
      <p className="text-[11px] text-[#8e9298]">{tr("৩২-বিট পূর্ণসংখ্যা। ঋণাত্মক সংখ্যা BIN, OCT ও HEX এ দুইয়ের পরিপূরক (two's complement) আকারে দেখায়।", "32-bit whole numbers. Negative values show in BIN, OCT and HEX as two's complement.")}</p>
    </div>
  );
}

// ---------- TABLE ----------
function TablePanel({ angle }: { angle: Angle }) {
  const tr = useTr();
  const [fx, setFx] = useState("x^2 + 2x + 1");
  const [start, setStart] = useState("-3");
  const [end, setEnd] = useState("3");
  const [step, setStep] = useState("1");
  let rows: { x: number; y: string }[] = [], error = "";
  try {
    if (!fx.trim()) throw new CalcError("f(x) লিখুন", "Enter f(x)");
    rows = makeTable(fx, evalField(start).re, evalField(end).re, evalField(step).re, { angle, cmplx: false });
  } catch (e) { error = msgOf(e, tr); }
  return (
    <div className="space-y-3">
      <Field label="f(x) ="><input className={fieldCls} value={fx} onChange={(e) => setFx(e.target.value)} autoComplete="off" spellCheck={false} /></Field>
      <div className="grid grid-cols-3 gap-2">
        <Field label="Start"><input className={fieldCls} value={start} onChange={(e) => setStart(e.target.value)} /></Field>
        <Field label="End"><input className={fieldCls} value={end} onChange={(e) => setEnd(e.target.value)} /></Field>
        <Field label="Step"><input className={fieldCls} value={step} onChange={(e) => setStep(e.target.value)} /></Field>
      </div>
      {error ? <ErrBox msg={error} /> : (
        <Lcd className="max-h-72 overflow-y-auto p-0">
          <table className="w-full text-[15px]">
            <thead><tr className="sticky top-0 bg-[#b9c5a4] text-left text-xs"><th className="px-3 py-1.5 font-semibold">x</th><th className="px-3 py-1.5 font-semibold">f(x)</th></tr></thead>
            <tbody>{rows.map((r) => <tr key={r.x} className="border-t border-[#97a483]/60"><td className="px-3 py-1">{fmtNum(r.x)}</td><td className="px-3 py-1 font-semibold">{r.y}</td></tr>)}</tbody>
          </table>
        </Lcd>
      )}
      <p className="text-[11px] text-[#8e9298]">{tr("চলক হিসেবে x লিখুন। সর্বোচ্চ ৪৫টি সারি।", "Use x as the variable. Up to 45 rows.")}</p>
    </div>
  );
}

// ---------- shell ----------
export default function ScientificCalculator() {
  const tr = useTr();
  const [mode, setMode] = useState<ModeId>("comp");
  const [angle, setAngle] = useState<Angle>("deg");
  const [exact, setExact] = useState(true);
  const showAngle = ["eqn", "vector", "table"].includes(mode) ? mode !== "eqn" : false;
  const showExact = ["eqn", "matrix", "vector"].includes(mode);

  return (
    <div className="max-w-md mx-auto">
      <div role="tablist" aria-label={tr("মোড", "Mode")} className="flex gap-1.5 overflow-x-auto pb-2 mb-2 [scrollbar-width:thin]">
        {MODES.map((m) => (
          <button key={m.id} role="tab" aria-selected={mode === m.id} type="button" onClick={() => setMode(m.id)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors ${mode === m.id ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
            {tr(m.bn, m.en)} <span className="opacity-60 font-mono text-[10px]">{m.label}</span>
          </button>
        ))}
      </div>

      <div className="rounded-[26px] bg-[#25282c] p-3.5 sm:p-4 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] border border-[#34383d]">
        <div className="flex items-center justify-between mb-3 px-0.5">
          <span className="text-[11px] font-semibold text-[#ecebe6] tracking-wide">BD TOOLS FLOW</span>
          <span className="text-[11px] text-[#8e9298] font-mono">{mode === "cmplx" ? "CMPLX" : MODES.find((m) => m.id === mode)?.label}</span>
        </div>

        {(showAngle || showExact) && (
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {showAngle && <button type="button" className={chipCls} onClick={() => setAngle(ANGLES[(ANGLES.indexOf(angle) + 1) % 3])}>{ANGLE_LABEL[angle]}</button>}
            {showExact && <button type="button" className={`${chipCls} ${exact ? chipOn : ""}`} aria-pressed={exact} onClick={() => setExact(!exact)}>{exact ? tr("ভগ্নাংশ", "Fractions") : tr("দশমিক", "Decimals")}</button>}
          </div>
        )}

        {(mode === "comp" || mode === "cmplx") && <CompPanel key={mode} cmplx={mode === "cmplx"} angle={angle} setAngle={setAngle} />}
        {mode === "eqn" && <EqnPanel exact={exact} />}
        {mode === "matrix" && <MatrixPanel exact={exact} />}
        {mode === "vector" && <VectorPanel exact={exact} angle={angle} />}
        {mode === "stat" && <StatPanel />}
        {mode === "base" && <BasePanel />}
        {mode === "table" && <TablePanel angle={angle} />}
      </div>
      <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">{tr("সব হিসাব আপনার ব্রাউজারেই হয়। কোনো তথ্য পাঠানো বা সেভ করা হয় না।", "Everything is calculated in your browser. Nothing is sent or stored on a server.")}</p>
    </div>
  );
}
