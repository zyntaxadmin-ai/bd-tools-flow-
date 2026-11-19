// Scientific calculator engine (no React, no eval / Function).
// - Exact fractions: 1÷2+1÷3 = 5/6 (falls back to decimals when numbers get too big)
// - Complex numbers (CMPLX mode), Deg / Rad / Gra, variables A-D, F, X, Y, M and Ans
// - Numerical integration, derivative and summation: integ(f,a,b), deriv(f,x0), sum(f,a,b) (variable X)
// - Equation solving, matrices, vectors, statistics, regression, base-N and function tables
// Errors are CalcError objects: message is Bangla, .en is English.

export type Angle = "deg" | "rad" | "gra";
export class CalcError extends Error {
  en: string;
  constructor(bn: string, en: string) { super(bn); this.en = en; }
}
const err = (bn: string, en: string) => new CalcError(bn, en);

// ---------- fractions ----------
export type Frac = { n: number; d: number };
const SAFE = 9e15;
const gcd = (a: number, b: number) => { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; };
export function mkFrac(n: number, d: number): Frac | undefined {
  if (d === 0 || !Number.isInteger(n) || !Number.isInteger(d)) return undefined;
  if (Math.abs(n) > SAFE || Math.abs(d) > SAFE) return undefined;
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1;
  return { n: n / g, d: d / g };
}
const fmul = (a: Frac, b: Frac) => (Math.abs(a.n * b.n) > SAFE || Math.abs(a.d * b.d) > SAFE ? undefined : mkFrac(a.n * b.n, a.d * b.d));
const fadd = (a: Frac, b: Frac) => (Math.abs(a.n * b.d) > SAFE || Math.abs(b.n * a.d) > SAFE || Math.abs(a.d * b.d) > SAFE ? undefined : mkFrac(a.n * b.d + b.n * a.d, a.d * b.d));
const fdiv = (a: Frac, b: Frac) => (b.n === 0 ? undefined : fmul(a, { n: b.d, d: b.n }));

/** Nearest simple fraction (denominator up to maxDen) when it matches within 1e-11. */
export function rationalize(x: number, maxDen = 99999): Frac | undefined {
  if (!isFinite(x)) return undefined;
  if (Number.isInteger(x)) return { n: x, d: 1 };
  const neg = x < 0;
  let v = Math.abs(x);
  let h1 = 1, h0 = 0, k1 = 0, k0 = 1;
  for (let i = 0; i < 40; i++) {
    const a = Math.floor(v);
    const h2 = a * h1 + h0, k2 = a * k1 + k0;
    if (k2 > maxDen) return undefined;
    h0 = h1; h1 = h2; k0 = k1; k1 = k2;
    if (Math.abs(Math.abs(x) - h1 / k1) <= 1e-11 * Math.max(1, Math.abs(x))) return mkFrac(neg ? -h1 : h1, k1);
    const rest = v - a;
    if (rest < 1e-13) break;
    v = 1 / rest;
  }
  return undefined;
}

// ---------- values ----------
export type Val = { re: number; im: number; fr?: Frac; dec?: boolean };
function mk(re: number, im: number, fr?: Frac, dec?: boolean): Val {
  if (im !== 0) return { re, im, dec };
  const v: Val = { re: fr ? fr.n / fr.d : re, im: 0 };
  if (fr) v.fr = fr;
  if (dec) v.dec = true;
  return v;
}
export const real = (x: number): Val => mk(x, 0);
export const intVal = (n: number): Val => mk(n, 0, { n, d: 1 });
export const ZERO = intVal(0);
const isZero = (v: Val) => v.re === 0 && v.im === 0;

export function vadd(a: Val, b: Val): Val {
  const fr = a.im === 0 && b.im === 0 && a.fr && b.fr ? fadd(a.fr, b.fr) : undefined;
  return mk(a.re + b.re, a.im + b.im, fr, a.dec || b.dec);
}
export const vneg = (a: Val): Val => mk(-a.re, -a.im, a.fr ? { n: -a.fr.n, d: a.fr.d } : undefined, a.dec);
export const vsub = (a: Val, b: Val): Val => vadd(a, vneg(b));
export function vmul(a: Val, b: Val): Val {
  if (a.im === 0 && b.im === 0) {
    const fr = a.fr && b.fr ? fmul(a.fr, b.fr) : undefined;
    return mk(a.re * b.re, 0, fr, a.dec || b.dec);
  }
  return mk(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re, undefined, a.dec || b.dec);
}
export function vdiv(a: Val, b: Val): Val {
  if (isZero(b)) throw err("০ দিয়ে ভাগ করা যায় না", "Cannot divide by 0");
  if (a.im === 0 && b.im === 0) {
    const fr = a.fr && b.fr ? fdiv(a.fr, b.fr) : undefined;
    return mk(a.re / b.re, 0, fr, a.dec || b.dec);
  }
  const den = b.re * b.re + b.im * b.im;
  return mk((a.re * b.re + a.im * b.im) / den, (a.im * b.re - a.re * b.im) / den, undefined, a.dec || b.dec);
}
const vabs = (a: Val) => (a.im === 0 ? mk(Math.abs(a.re), 0, a.fr ? { n: Math.abs(a.fr.n), d: a.fr.d } : undefined, a.dec) : real(Math.hypot(a.re, a.im)));
const vexp = (a: Val): Val => { const m = Math.exp(a.re); return a.im === 0 ? real(m) : mk(m * Math.cos(a.im), m * Math.sin(a.im), undefined, true); };
function vln(a: Val): Val {
  if (isZero(a)) throw err("ln এর মান ০ এর বেশি হতে হবে", "ln needs a value above 0");
  return a.im === 0 && a.re > 0 ? real(Math.log(a.re)) : mk(Math.log(Math.hypot(a.re, a.im)), Math.atan2(a.im, a.re), undefined, true);
}
function exactSqrt(f: Frac): Frac | undefined {
  if (f.n < 0) return undefined;
  const rn = Math.round(Math.sqrt(f.n)), rd = Math.round(Math.sqrt(f.d));
  return rn * rn === f.n && rd * rd === f.d ? { n: rn, d: rd } : undefined;
}
export function vsqrt(a: Val, allowComplex: boolean): Val {
  if (a.im === 0) {
    if (a.re >= 0) { const f = a.fr && exactSqrt(a.fr); return f ? mk(0, 0, f, a.dec) : real(Math.sqrt(a.re)); }
    if (!allowComplex) throw err("ঋণাত্মক সংখ্যার বর্গমূল নেই", "A negative number has no real square root");
    const f = a.fr && exactSqrt({ n: -a.fr.n, d: a.fr.d });
    return f ? mk(0, f.n / f.d) : mk(0, Math.sqrt(-a.re));
  }
  const m = Math.hypot(a.re, a.im);
  const r = Math.sqrt((m + a.re) / 2);
  const i = Math.sign(a.im || 1) * Math.sqrt((m - a.re) / 2);
  return mk(r, i, undefined, true);
}
export function vpow(a: Val, b: Val, allowComplex: boolean): Val {
  if (b.im === 0 && Number.isInteger(b.re) && Math.abs(b.re) <= 1000) {
    const e = b.re;
    if (a.im === 0) {
      if (a.re === 0 && e < 0) throw err("০ দিয়ে ভাগ করা যায় না", "Cannot divide by 0");
      if (a.fr && Math.abs(e) <= 64) {
        let f: Frac | undefined = { n: 1, d: 1 };
        for (let i = 0; i < Math.abs(e) && f; i++) f = fmul(f, a.fr);
        if (f && e < 0) f = fdiv({ n: 1, d: 1 }, f);
        if (f) return mk(0, 0, f, a.dec);
      }
      return mk(Math.pow(a.re, e), 0, undefined, a.dec);
    }
    let result = intVal(1), base = a, n = Math.abs(e);
    while (n > 0) { if (n & 1) result = vmul(result, base); base = vmul(base, base); n = Math.floor(n / 2); }
    return e < 0 ? vdiv(intVal(1), result) : result;
  }
  if (a.im === 0 && b.im === 0) {
    if (a.re >= 0) {
      if (a.re === 0 && b.re < 0) throw err("০ দিয়ে ভাগ করা যায় না", "Cannot divide by 0");
      return real(Math.pow(a.re, b.re));
    }
    if (b.fr && b.fr.d % 2 === 1) return real((b.fr.n % 2 === 0 ? 1 : -1) * Math.pow(-a.re, b.re)); // (-8)^(1/3) = -2
    if (!allowComplex) throw err("ঋণাত্মক সংখ্যার ভগ্নাংশ ঘাত বাস্তব নয় (CMPLX মোড ব্যবহার করুন)", "A negative number to a fractional power is not real (use CMPLX mode)");
  }
  if (isZero(a)) { if (b.re > 0) return ZERO; throw err("০ এর এই ঘাত নির্ণয় করা যায় না", "0 to this power is undefined"); }
  return vexp(vmul(b, vln(a)));
}

// ---------- number formatting ----------
function trimZeros(s: string) { return s.includes(".") ? s.replace(/0+$/, "").replace(/\.$/, "") : s; }
export function fmtNum(x: number, digits = 10): string {
  if (!isFinite(x)) return "∞";
  if (x === 0) return "0";
  const ax = Math.abs(x);
  if (ax >= 1e10 || ax < 1e-9) {
    const [m, e] = x.toExponential(digits - 1).split("e");
    return `${trimZeros(m)}×10^${Number(e)}`;
  }
  const p = Number(x.toPrecision(digits));
  let s = p.toString();
  if (/e/i.test(s)) s = trimZeros(p.toFixed(Math.min(20, digits - 1 - Math.floor(Math.log10(Math.abs(p))))));
  return s;
}
export type ViewOpts = { view?: "auto" | "dec" | "frac"; mixed?: boolean; polar?: boolean; angle?: Angle };
export function fmtFrac(f: Frac, mixed: boolean): string {
  if (f.d === 1) return String(f.n);
  if (mixed && Math.abs(f.n) > f.d) {
    const whole = Math.trunc(f.n / f.d), rem = Math.abs(f.n) - Math.abs(whole) * f.d;
    return `${whole} ${rem}/${f.d}`;
  }
  return `${f.n}/${f.d}`;
}
/** The fraction to show for a real value, or undefined if it should be shown as a decimal. */
export function shownFraction(v: Val, view: "auto" | "dec" | "frac" = "auto"): Frac | undefined {
  if (v.im !== 0 || view === "dec") return undefined;
  if (view === "auto") return v.fr && !v.dec && v.fr.d !== 1 ? v.fr : undefined;
  const f = v.fr || rationalize(v.re);
  return f && f.d !== 1 ? f : undefined;
}
export const canShowFraction = (v: Val) => v.im === 0 && !Number.isInteger(v.re) && !!(v.fr || rationalize(v.re));
export function fmtVal(v: Val, o: ViewOpts = {}): string {
  if (v.im === 0) {
    const f = shownFraction(v, o.view);
    return f ? fmtFrac(f, !!o.mixed) : fmtNum(v.re);
  }
  if (o.polar) {
    const r = Math.hypot(v.re, v.im);
    const th = Math.atan2(v.im, v.re);
    const k = o.angle === "rad" ? 1 : o.angle === "gra" ? 200 / Math.PI : 180 / Math.PI;
    return `${fmtNum(r)}∠${fmtNum(th * k)}`;
  }
  const re = fmtNum(v.re), imAbs = Math.abs(v.im);
  const imS = fmtNum(imAbs) === "1" ? "i" : fmtNum(imAbs) + "i";
  const sign = v.im < 0 ? "−" : "+";
  if (Math.abs(v.re) < 1e-12 * Math.max(1, imAbs)) return (v.im < 0 ? "−" : "") + imS;
  return `${re}${sign}${imS}`;
}

// ---------- tokenizer ----------
type Tok = { t: "num"; v: Val } | { t: "op"; v: string } | { t: "id"; v: string };
const FUNCS: Record<string, number | [number, number]> = {
  sin: 1, cos: 1, tan: 1, asin: 1, acos: 1, atan: 1, sinh: 1, cosh: 1, tanh: 1, asinh: 1, acosh: 1, atanh: 1,
  log: [1, 2], ln: 1, exp: 1, sqrt: 1, cbrt: 1, abs: 1, arg: 1, conj: 1, re: 1, im: 1,
  floor: 1, ceil: 1, round: [1, 2], ncr: 2, npr: 2, gcd: 2, lcm: 2, mod: 2, fact: 1,
  integ: 3, deriv: 2, sum: 3,
};
const CONSTS = new Set(["pi", "ans"]);

function numberVal(str: string): Val {
  if (/[eE]/.test(str)) return mk(parseFloat(str), 0, undefined, true);
  if (str.includes(".")) {
    const [ip, fp] = str.split(".");
    const digits = (ip || "0") + fp;
    const fr = digits.length <= 15 ? mkFrac(parseInt(digits, 10), Math.pow(10, fp.length)) : undefined;
    return fr ? mk(0, 0, fr, true) : mk(parseFloat(str), 0, undefined, true);
  }
  return str.length <= 15 ? intVal(parseInt(str, 10)) : real(parseFloat(str));
}

function normalizeSrc(input: string): string {
  return input
    .replace(/d\/dx\(/gi, "deriv(")
    .replace(/∫\(/g, "integ(")
    .replace(/Σ\(/g, "sum(")
    .replace(/⁻¹/g, "^(-1)")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/∙/g, "*")
    .replace(/√/g, " sqrt ").replace(/∛/g, " cbrt ").replace(/π/g, " pi ")
    .replace(/[ঀ-৿]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) >= 0x09E6 && ch.charCodeAt(0) <= 0x09EF ? 48 + ch.charCodeAt(0) - 0x09E6 : 63)); // Bangla digits → ASCII
}

function tokenize(input: string): Tok[] {
  const s = normalizeSrc(input);
  const out: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      let str = s.slice(i, j);
      if ((str.match(/\./g) || []).length > 1 || str === ".") throw err("সংখ্যাটি ঠিক নেই", "Invalid number");
      const exp = /^[eE][+-]?\d+/.exec(s.slice(j));
      if (exp) { str += exp[0]; j += exp[0].length; }
      out.push({ t: "num", v: numberVal(str.startsWith(".") ? "0" + str : str) });
      i = j; continue;
    }
    if (/[a-z]/i.test(c)) {
      let j = i;
      while (j < s.length && /[a-z]/i.test(s[j])) j++;
      const w = s.slice(i, j).toLowerCase();
      if (w in FUNCS || CONSTS.has(w)) out.push({ t: "id", v: w });
      else for (const ch of w) out.push({ t: "id", v: ch }); // "ab" → a × b, "2xy" → 2 × x × y
      i = j; continue;
    }
    if ("+-*/^!%(),".includes(c)) { out.push({ t: "op", v: c }); i++; continue; }
    throw err("অচেনা চিহ্ন: " + c, "Unknown symbol: " + c);
  }
  return out;
}

// ---------- evaluator ----------
export type Ctx = { angle: Angle; cmplx: boolean; vars: Record<string, Val>; ans: Val };
export const VAR_NAMES = ["a", "b", "c", "d", "x", "y", "m"] as const;

const toRad = (x: number, a: Angle) => (a === "deg" ? (x * Math.PI) / 180 : a === "gra" ? (x * Math.PI) / 200 : x);
const fromRad = (x: number, a: Angle) => (a === "deg" ? (x * 180) / Math.PI : a === "gra" ? (x * 200) / Math.PI : x);
const tidy = (x: number) => { const r = Number(x.toPrecision(12)); return Math.abs(r) < 1e-12 ? 0 : r; };
const needReal = (v: Val): number => {
  if (v.im !== 0) throw err("এখানে বাস্তব সংখ্যা দরকার", "A real number is needed here");
  return v.re;
};
const needInt = (v: Val, bn: string, en: string): number => {
  const x = needReal(v);
  if (!Number.isInteger(x) || x < 0) throw err(bn, en);
  return x;
};

function factorial(v: Val): Val {
  const n = needReal(v);
  if (!Number.isInteger(n) || n < 0) throw err("Factorial শুধু ০ বা ধনাত্মক পূর্ণসংখ্যার জন্য", "Factorial works only for 0 or positive whole numbers");
  if (n > 170) throw err("সংখ্যাটি খুব বড়", "The number is too large");
  let r = intVal(1);
  for (let i = 2; i <= n; i++) r = vmul(r, intVal(i));
  return r.fr ? r : mk(r.re, 0);
}
function combos(n: number, r: number, perm: boolean): Val {
  if (r > n) throw err("r এর মান n এর বেশি হতে পারে না", "r cannot be larger than n");
  let c = intVal(1);
  for (let i = 1; i <= r; i++) {
    c = vmul(c, intVal(n - r + i));
    if (!perm) c = vdiv(c, intVal(i));
  }
  return c;
}
const gcd2 = (a: number, b: number) => gcd(a, b);

export function evaluate(src: string, ctx: Ctx): Val {
  const toks = tokenize(src);
  if (toks.length === 0) throw err("কিছু লিখুন", "Enter something");
  const v = run(toks, ctx);
  if (!isFinite(v.re) || !isFinite(v.im)) throw err("ফলাফল অবৈধ বা অসীম", "The result is invalid or infinite");
  return v;
}

function run(toks: Tok[], ctx: Ctx): Val {
  let p = 0;
  const isOp = (v: string) => { const t = toks[p]; return !!t && t.t === "op" && t.v === v; };
  const closeBracket = () => {
    if (p >= toks.length) return; // a missing ) at the end is fine: sin(30
    if (!isOp(")")) throw err("বন্ধনী মেলেনি", "Brackets do not match");
    p++;
  };
  const sliceEval = (slice: Tok[], x: number): number => {
    const v = run(slice, { ...ctx, vars: { ...ctx.vars, x: real(x) } });
    if (v.im !== 0) throw err("এখানে বাস্তব সংখ্যা দরকার", "A real number is needed here");
    return v.re;
  };

  function call(name: string, args: Val[]): Val {
    const a = args[0];
    const ang = ctx.angle;
    switch (name) {
      case "sin": return real(tidy(Math.sin(toRad(needReal(a), ang))));
      case "cos": return real(tidy(Math.cos(toRad(needReal(a), ang))));
      case "tan": {
        const x = needReal(a);
        const half = ang === "deg" ? 180 : ang === "gra" ? 200 : Math.PI;
        const odd = ang === "deg" ? 90 : ang === "gra" ? 100 : Math.PI / 2;
        const m = ((x % half) + half) % half;
        if (Math.abs(m - odd) < 1e-12 || (ang === "rad" && Math.abs(Math.cos(x)) < 1e-14)) throw err("tan এর মান নির্ণয় করা যায় না", "tan is undefined here");
        return real(tidy(Math.tan(toRad(x, ang))));
      }
      case "asin": case "acos": {
        const x = needReal(a);
        if (x < -1 || x > 1) throw err("মান -১ থেকে ১ এর মধ্যে হতে হবে", "The value must be between -1 and 1");
        return real(tidy(fromRad(name === "asin" ? Math.asin(x) : Math.acos(x), ang)));
      }
      case "atan": return real(tidy(fromRad(Math.atan(needReal(a)), ang)));
      case "sinh": return real(Math.sinh(needReal(a)));
      case "cosh": return real(Math.cosh(needReal(a)));
      case "tanh": return real(Math.tanh(needReal(a)));
      case "asinh": return real(Math.asinh(needReal(a)));
      case "acosh": { const x = needReal(a); if (x < 1) throw err("cosh⁻¹ এর মান ১ বা বেশি হতে হবে", "acosh needs a value of 1 or more"); return real(Math.acosh(x)); }
      case "atanh": { const x = needReal(a); if (x <= -1 || x >= 1) throw err("মান -১ থেকে ১ এর মধ্যে হতে হবে", "The value must be between -1 and 1"); return real(Math.atanh(x)); }
      case "log": {
        if (args.length === 2) { // log(base, value)
          const b = needReal(args[0]), x = needReal(args[1]);
          if (b <= 0 || b === 1 || x <= 0) throw err("log এর মান ০ এর বেশি হতে হবে", "log needs a value above 0");
          return real(tidy(Math.log(x) / Math.log(b)));
        }
        const x = needReal(a);
        if (x <= 0) throw err("log এর মান ০ এর বেশি হতে হবে", "log needs a value above 0");
        return real(tidy(Math.log10(x)));
      }
      case "ln": {
        if (a.im === 0 && a.re <= 0 && !ctx.cmplx) throw err("ln এর মান ০ এর বেশি হতে হবে", "ln needs a value above 0");
        return vln(a);
      }
      case "exp": return vexp(a);
      case "sqrt": return vsqrt(a, ctx.cmplx);
      case "cbrt": { const x = needReal(a); return real(tidy(Math.cbrt(x))); }
      case "abs": return vabs(a);
      case "arg": return real(tidy(fromRad(Math.atan2(a.im, a.re), ang)));
      case "conj": return mk(a.re, -a.im, a.fr, a.dec);
      case "re": return real(a.re);
      case "im": return real(a.im);
      case "floor": return intVal(Math.floor(needReal(a)));
      case "ceil": return intVal(Math.ceil(needReal(a)));
      case "round": {
        const x = needReal(a), k = args[1] ? needReal(args[1]) : 0;
        const f = Math.pow(10, k);
        return real(Math.round(x * f) / f);
      }
      case "fact": return factorial(a);
      case "ncr": case "npr": {
        const n = needInt(a, "n অঋণাত্মক পূর্ণসংখ্যা হতে হবে", "n must be a whole number, 0 or more");
        const r = needInt(args[1], "r অঋণাত্মক পূর্ণসংখ্যা হতে হবে", "r must be a whole number, 0 or more");
        return combos(n, r, name === "npr");
      }
      case "gcd": case "lcm": {
        const x = needInt(a, "পূর্ণসংখ্যা দিন", "Enter whole numbers"), y = needInt(args[1], "পূর্ণসংখ্যা দিন", "Enter whole numbers");
        const g = gcd2(x, y);
        return intVal(name === "gcd" ? g : g === 0 ? 0 : (x / g) * y);
      }
      case "mod": {
        const x = needReal(a), y = needReal(args[1]);
        if (y === 0) throw err("০ দিয়ে ভাগ করা যায় না", "Cannot divide by 0");
        return real(((x % y) + y) % y);
      }
      default: throw err("অচেনা ফাংশন: " + name, "Unknown function: " + name);
    }
  }

  function grabFirst(): Tok[] {
    let depth = 0;
    const s = p;
    while (p < toks.length) {
      const t = toks[p];
      if (t.t === "op") {
        if (t.v === "(") depth++;
        else if (t.v === ")") { if (depth === 0) break; depth--; }
        else if (t.v === "," && depth === 0) break;
      }
      p++;
    }
    return toks.slice(s, p);
  }

  function calculus(name: string): Val {
    if (!isOp("(")) throw err(name + " এর পরে ( দিন", `Add ( after ${name}`);
    p++;
    const f = grabFirst();
    if (f.length === 0) throw err("এক্সপ্রেশন অসম্পূর্ণ", "Incomplete expression");
    if (!isOp(",")) throw err("কমা (,) দিয়ে মান আলাদা করুন", "Separate the values with commas");
    p++;
    const rest: Val[] = [expr()];
    while (isOp(",")) { p++; rest.push(expr()); }
    closeBracket();
    if (name === "deriv") {
      const x0 = needReal(rest[0]);
      const h = 1e-4 * Math.max(1, Math.abs(x0));
      const d = (-sliceEval(f, x0 + 2 * h) + 8 * sliceEval(f, x0 + h) - 8 * sliceEval(f, x0 - h) + sliceEval(f, x0 - 2 * h)) / (12 * h);
      if (!isFinite(d)) throw err("ফলাফল অবৈধ বা অসীম", "The result is invalid or infinite");
      const r = Number(d.toPrecision(8));
      return real(Math.abs(r) < 1e-7 ? 0 : r);
    }
    if (rest.length < 2) throw err("সীমা দুটি দিন (নিম্ন, উচ্চ)", "Give both limits (lower, upper)");
    const a = needReal(rest[0]), b = needReal(rest[1]);
    if (name === "sum") {
      if (!Number.isInteger(a) || !Number.isInteger(b)) throw err("Σ এর সীমা পূর্ণসংখ্যা হতে হবে", "Σ limits must be whole numbers");
      if (b - a > 100000) throw err("Σ এর পরিসর খুব বড়", "The Σ range is too large");
      let acc = ZERO;
      for (let k = a; k <= b; k++) {
        const v = run(f, { ...ctx, vars: { ...ctx.vars, x: intVal(k) } });
        acc = vadd(acc, v);
      }
      return acc;
    }
    // integ: composite Simpson's rule
    if (a === b) return ZERO;
    const n = 2000, h = (b - a) / n;
    let s = sliceEval(f, a) + sliceEval(f, b);
    for (let k = 1; k < n; k++) s += (k % 2 ? 4 : 2) * sliceEval(f, a + k * h);
    const r = (s * h) / 3;
    if (!isFinite(r)) throw err("ফলাফল অবৈধ বা অসীম", "The result is invalid or infinite");
    const t = Number(r.toPrecision(10));
    return real(Math.abs(t) < 1e-10 ? 0 : t);
  }

  function startsFactor(): boolean {
    const t = toks[p];
    if (!t) return false;
    return t.t === "num" || t.t === "id" || (t.t === "op" && t.v === "(");
  }

  function primary(): Val {
    const t = toks[p];
    if (!t) throw err("এক্সপ্রেশন অসম্পূর্ণ", "Incomplete expression");
    if (t.t === "num") { p++; return t.v; }
    if (t.t === "op" && t.v === "(") {
      p++;
      const v = expr();
      closeBracket();
      return v;
    }
    if (t.t === "id") {
      p++;
      const name = t.v;
      if (name === "pi") return real(Math.PI);
      if (name === "e") return real(Math.E);
      if (name === "ans") return ctx.ans;
      if (name === "i") {
        if (!ctx.cmplx) throw err("i ব্যবহার করতে CMPLX মোড বেছে নিন", "Switch to CMPLX mode to use i");
        return mk(0, 1);
      }
      if (name === "integ" || name === "deriv" || name === "sum") return calculus(name);
      if (name in FUNCS) {
        const arity = FUNCS[name];
        const [lo, hi] = Array.isArray(arity) ? arity : [arity, arity];
        let args: Val[];
        if (isOp("(")) {
          p++;
          args = [];
          if (!(isOp(")"))) { args.push(expr()); while (isOp(",")) { p++; args.push(expr()); } }
          closeBracket();
        } else {
          args = [unary()];
        }
        if (args.length < lo || args.length > hi) throw err(name + " এ মানের সংখ্যা ঠিক নেই", `${name} needs ${lo === hi ? lo : lo + " or " + hi} value(s)`);
        return call(name, args);
      }
      if ((VAR_NAMES as readonly string[]).includes(name)) return ctx.vars[name] ?? ZERO;
      throw err("অচেনা নাম: " + name, "Unknown name: " + name);
    }
    throw err("এক্সপ্রেশন ঠিক নেই", "Invalid expression");
  }
  function postfix(): Val {
    let v = primary();
    for (;;) {
      if (isOp("!")) { p++; v = factorial(v); }
      else if (isOp("%")) { p++; v = vdiv(v, intVal(100)); }
      else break;
    }
    return v;
  }
  function power(): Val {
    const b = postfix();
    if (isOp("^")) { p++; return vpow(b, unary(), ctx.cmplx); }
    return b;
  }
  function unary(): Val {
    if (isOp("-")) { p++; return vneg(unary()); }
    if (isOp("+")) { p++; return unary(); }
    return power();
  }
  function term(): Val {
    let v = unary();
    for (;;) {
      if (isOp("*") || isOp("/")) {
        const op = (toks[p++] as { v: string }).v;
        const r = unary();
        v = op === "/" ? vdiv(v, r) : vmul(v, r);
      } else if (startsFactor()) {
        v = vmul(v, unary()); // implicit multiplication: 2π, 3(4+1), 2x
      } else break;
    }
    return v;
  }
  function expr(): Val {
    let v = term();
    while (isOp("+") || isOp("-")) {
      const op = (toks[p++] as { v: string }).v;
      const r = term();
      v = op === "+" ? vadd(v, r) : vsub(v, r);
    }
    return v;
  }

  const result = expr();
  if (p < toks.length) throw err("এক্সপ্রেশন ঠিক নেই", "Invalid expression");
  return result;
}

/** Evaluate a plain input field (numbers, fractions, √, π...) to a Val. */
export function evalField(src: string, angle: Angle = "deg", cmplx = false): Val {
  return evaluate(src, { angle, cmplx, vars: {}, ans: ZERO });
}

// ---------- equations ----------
export function solveLinear(rows: Val[][]): Val[] {
  const n = rows.length;
  const m = rows.map((r) => r.slice());
  for (let c = 0; c < n; c++) {
    let piv = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(m[r][c].re) > Math.abs(m[piv][c].re)) piv = r;
    if (Math.abs(m[piv][c].re) < 1e-12) throw err("একটি মাত্র সমাধান নেই (সমীকরণগুলো নির্ভরশীল বা অসঙ্গত)", "No single solution (the equations are dependent or inconsistent)");
    [m[c], m[piv]] = [m[piv], m[c]];
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = vdiv(m[r][c], m[c][c]);
      for (let k = c; k <= n; k++) m[r][k] = vsub(m[r][k], vmul(f, m[c][k]));
    }
  }
  return m.map((row, i) => vdiv(row[n], row[i]));
}

export function solveQuadratic(a: Val, b: Val, c: Val): Val[] {
  if (isZero(a)) throw err("a এর মান ০ হতে পারে না", "a cannot be 0");
  const disc = vsub(vmul(b, b), vmul(intVal(4), vmul(a, c)));
  const root = vsqrt(disc, true);
  const den = vmul(intVal(2), a);
  const nb = vneg(b);
  return [vdiv(vadd(nb, root), den), vdiv(vsub(nb, root), den)];
}

const cmul = (x: [number, number], y: [number, number]): [number, number] => [x[0] * y[0] - x[1] * y[1], x[0] * y[1] + x[1] * y[0]];
const csub = (x: [number, number], y: [number, number]): [number, number] => [x[0] - y[0], x[1] - y[1]];
const cdivide = (x: [number, number], y: [number, number]): [number, number] => { const d = y[0] * y[0] + y[1] * y[1]; return [(x[0] * y[0] + x[1] * y[1]) / d, (x[1] * y[0] - x[0] * y[1]) / d]; };

export function solveCubic(a: Val, b: Val, c: Val, d: Val): Val[] {
  const co = [a, b, c, d].map((v) => needReal(v));
  if (co[0] === 0) throw err("a এর মান ০ হতে পারে না", "a cannot be 0");
  const k = co.map((x) => x / co[0]);
  const evalP = (z: [number, number]): [number, number] => {
    let r: [number, number] = [1, 0];
    for (let i = 1; i < 4; i++) { r = cmul(r, z); r = [r[0] + k[i], r[1]]; }
    return r;
  };
  const bound = 1 + Math.max(Math.abs(k[1]), Math.abs(k[2]), Math.abs(k[3]));
  let z: [number, number][] = [0, 1, 2].map((i) => [bound * 0.5 * Math.cos(0.4 + (2 * Math.PI * i) / 3), bound * 0.5 * Math.sin(0.4 + (2 * Math.PI * i) / 3)]);
  for (let it = 0; it < 800; it++) {
    const next = z.map((zi, i) => {
      let den: [number, number] = [1, 0];
      z.forEach((zj, j) => { if (j !== i) den = cmul(den, csub(zi, zj)); });
      if (den[0] === 0 && den[1] === 0) den = [1e-12, 0];
      return csub(zi, cdivide(evalP(zi), den));
    });
    z = next;
  }
  return z.map((zi) => {
    let [re, im] = zi;
    if (Math.abs(im) < 1e-7 * Math.max(1, Math.abs(re))) {
      im = 0;
      const snap = rationalize(re, 1000);
      if (snap) {
        const s = snap.n / snap.d;
        const resid = Math.abs(((s + k[1]) * s + k[2]) * s + k[3]);
        if (resid < 1e-9 * Math.max(1, Math.abs(k[3]))) return mk(s, 0, snap);
      }
    }
    return mk(Number(re.toPrecision(11)), Number(im.toPrecision(11)), undefined, true);
  });
}

// ---------- matrices and vectors ----------
export type Mat = Val[][];
export const matAdd = (a: Mat, b: Mat): Mat => a.map((r, i) => r.map((v, j) => vadd(v, b[i][j])));
export const matSub = (a: Mat, b: Mat): Mat => a.map((r, i) => r.map((v, j) => vsub(v, b[i][j])));
export const matMul = (a: Mat, b: Mat): Mat => a.map((r) => b[0].map((_, j) => r.reduce((s, v, k) => vadd(s, vmul(v, b[k][j])), ZERO)));
export const matT = (a: Mat): Mat => a[0].map((_, j) => a.map((r) => r[j]));
export const matScale = (a: Mat, k: Val): Mat => a.map((r) => r.map((v) => vmul(v, k)));
export function matDet(a: Mat): Val {
  const n = a.length;
  if (n === 1) return a[0][0];
  if (n === 2) return vsub(vmul(a[0][0], a[1][1]), vmul(a[0][1], a[1][0]));
  let d = ZERO;
  for (let j = 0; j < n; j++) {
    const minor = a.slice(1).map((r) => r.filter((_, c) => c !== j));
    const term = vmul(a[0][j], matDet(minor));
    d = j % 2 === 0 ? vadd(d, term) : vsub(d, term);
  }
  return d;
}
export function matInv(a: Mat): Mat {
  const n = a.length;
  const det = matDet(a);
  if (isZero(det)) throw err("det = 0, তাই বিপরীত ম্যাট্রিক্স নেই", "det = 0, so the inverse does not exist");
  if (n === 1) return [[vdiv(intVal(1), a[0][0])]];
  const cof: Mat = a.map((_, i) => a.map((_, j) => {
    const minor = a.filter((_, r) => r !== i).map((r) => r.filter((_, c) => c !== j));
    const m = matDet(minor);
    return (i + j) % 2 === 0 ? m : vneg(m);
  }));
  return matScale(matT(cof), vdiv(intVal(1), det));
}
export const vecDot = (a: Val[], b: Val[]): Val => a.reduce((s, v, i) => vadd(s, vmul(v, b[i])), ZERO);
export const vecCross = (a: Val[], b: Val[]): Val[] => [
  vsub(vmul(a[1], b[2]), vmul(a[2], b[1])),
  vsub(vmul(a[2], b[0]), vmul(a[0], b[2])),
  vsub(vmul(a[0], b[1]), vmul(a[1], b[0])),
];
export const vecNorm = (a: Val[]): Val => vsqrt(vecDot(a, a), false);

// ---------- statistics ----------
export type Stat1 = { n: number; sum: number; sumSq: number; mean: number; popSd: number; sampleSd: number; popVar: number; sampleVar: number; min: number; max: number; q1: number; median: number; q3: number };
function quantile(sorted: number[], q: number) {
  // Casio-style quartiles: median of the lower / upper half
  const n = sorted.length;
  const med = (arr: number[]) => (arr.length % 2 ? arr[(arr.length - 1) / 2] : (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2);
  if (q === 0.5) return med(sorted);
  const half = Math.floor(n / 2);
  return q === 0.25 ? med(sorted.slice(0, half)) : med(sorted.slice(n - half));
}
export function stat1(xs: number[], freq?: number[]): Stat1 {
  const data: number[] = [];
  xs.forEach((x, i) => { const f = freq ? freq[i] : 1; for (let k = 0; k < f; k++) data.push(x); });
  const n = data.length;
  if (n < 1) throw err("কমপক্ষে একটি সংখ্যা দিন", "Enter at least one number");
  if (n > 20000) throw err("ডেটা খুব বেশি", "Too much data");
  const sum = data.reduce((s, v) => s + v, 0);
  const sumSq = data.reduce((s, v) => s + v * v, 0);
  const mean = sum / n;
  const ss = data.reduce((s, v) => s + (v - mean) * (v - mean), 0);
  const sorted = data.slice().sort((a, b) => a - b);
  return {
    n, sum, sumSq, mean, popVar: ss / n, popSd: Math.sqrt(ss / n),
    sampleVar: n > 1 ? ss / (n - 1) : NaN, sampleSd: n > 1 ? Math.sqrt(ss / (n - 1)) : NaN,
    min: sorted[0], max: sorted[n - 1],
    q1: n > 1 ? quantile(sorted, 0.25) : sorted[0], median: quantile(sorted, 0.5), q3: n > 1 ? quantile(sorted, 0.75) : sorted[0],
  };
}
export type RegType = "linear" | "quadratic" | "log" | "exp" | "power" | "inverse";
export type Regression = { type: RegType; a: number; b: number; c?: number; r?: number; predict: (x: number) => number; eq: string };
function linFit(xs: number[], ys: number[]) {
  const n = xs.length;
  const mx = xs.reduce((s, v) => s + v, 0) / n, my = ys.reduce((s, v) => s + v, 0) / n;
  let sxx = 0, sxy = 0, syy = 0;
  for (let i = 0; i < n; i++) { sxx += (xs[i] - mx) ** 2; sxy += (xs[i] - mx) * (ys[i] - my); syy += (ys[i] - my) ** 2; }
  if (sxx === 0) throw err("সব x এর মান একই, রিগ্রেশন করা যায় না", "All x values are the same, so a regression is not possible");
  const b = sxy / sxx;
  return { a: my - b * mx, b, r: syy === 0 ? NaN : sxy / Math.sqrt(sxx * syy) };
}
export function regress(type: RegType, xs: number[], ys: number[]): Regression {
  if (xs.length !== ys.length || xs.length < 2) throw err("কমপক্ষে দুই জোড়া (x, y) দিন", "Enter at least two (x, y) pairs");
  switch (type) {
    case "linear": { const f = linFit(xs, ys); return { type, a: f.a, b: f.b, r: f.r, predict: (x) => f.a + f.b * x, eq: "y = a + bx" }; }
    case "log": {
      if (xs.some((x) => x <= 0)) throw err("log রিগ্রেশনে x ধনাত্মক হতে হবে", "x must be positive for a log regression");
      const f = linFit(xs.map(Math.log), ys);
      return { type, a: f.a, b: f.b, r: f.r, predict: (x) => f.a + f.b * Math.log(x), eq: "y = a + b·ln x" };
    }
    case "exp": {
      if (ys.some((y) => y <= 0)) throw err("exponential রিগ্রেশনে y ধনাত্মক হতে হবে", "y must be positive for an exponential regression");
      const f = linFit(xs, ys.map(Math.log));
      const a = Math.exp(f.a);
      return { type, a, b: f.b, r: f.r, predict: (x) => a * Math.exp(f.b * x), eq: "y = a·e^(bx)" };
    }
    case "power": {
      if (xs.some((x) => x <= 0) || ys.some((y) => y <= 0)) throw err("power রিগ্রেশনে x ও y ধনাত্মক হতে হবে", "x and y must be positive for a power regression");
      const f = linFit(xs.map(Math.log), ys.map(Math.log));
      const a = Math.exp(f.a);
      return { type, a, b: f.b, r: f.r, predict: (x) => a * Math.pow(x, f.b), eq: "y = a·x^b" };
    }
    case "inverse": {
      if (xs.some((x) => x === 0)) throw err("inverse রিগ্রেশনে x শূন্য হতে পারে না", "x cannot be 0 for an inverse regression");
      const f = linFit(xs.map((x) => 1 / x), ys);
      return { type, a: f.a, b: f.b, r: f.r, predict: (x) => f.a + f.b / x, eq: "y = a + b/x" };
    }
    case "quadratic": {
      if (xs.length < 3) throw err("কোয়াড্রাটিক রিগ্রেশনে কমপক্ষে ৩ জোড়া দিন", "Enter at least 3 pairs for a quadratic regression");
      const s = (k: number) => xs.reduce((t, x) => t + Math.pow(x, k), 0);
      const t = (k: number) => xs.reduce((u, x, i) => u + Math.pow(x, k) * ys[i], 0);
      const rows = [[xs.length, s(1), s(2), t(0)], [s(1), s(2), s(3), t(1)], [s(2), s(3), s(4), t(2)]].map((r) => r.map((v) => real(v)));
      let sol: Val[];
      try { sol = solveLinear(rows); } catch { throw err("এই ডেটায় কোয়াড্রাটিক রিগ্রেশন সম্ভব নয়", "A quadratic regression is not possible with this data"); }
      const [a, b, c] = sol.map((v) => v.re);
      return { type, a, b, c, predict: (x) => a + b * x + c * x * x, eq: "y = a + bx + cx²" };
    }
  }
}

// ---------- base-N (32-bit, two's complement like a handheld) ----------
export type Base = 2 | 8 | 10 | 16;
export function parseBase(str: string, base: Base): number {
  const s = str.trim().toUpperCase();
  if (s === "") throw err("সংখ্যা দিন", "Enter a number");
  const valid = base === 2 ? /^[01]+$/ : base === 8 ? /^[0-7]+$/ : base === 10 ? /^-?[0-9]+$/ : /^[0-9A-F]+$/;
  if (!valid.test(s)) throw err(`এই সংখ্যাটি ${base === 2 ? "BIN" : base === 8 ? "OCT" : base === 10 ? "DEC" : "HEX"} এ বৈধ নয়`, `Not a valid ${base === 2 ? "BIN" : base === 8 ? "OCT" : base === 10 ? "DEC" : "HEX"} number`);
  const v = parseInt(s, base);
  if (base === 10) { if (v > 2147483647 || v < -2147483648) throw err("সীমার বাইরে (৩২-বিট)", "Out of range (32-bit)"); return v; }
  if (v > 0xffffffff) throw err("সীমার বাইরে (৩২-বিট)", "Out of range (32-bit)");
  return v | 0;
}
export function formatBase(n: number, base: Base): string {
  return base === 10 ? String(n) : (n >>> 0).toString(base).toUpperCase();
}
export type BaseOp = "+" | "-" | "*" | "/" | "AND" | "OR" | "XOR" | "XNOR" | "NOT" | "NEG";
export function baseOp(op: BaseOp, a: number, b: number): number {
  let r: number;
  switch (op) {
    case "+": r = a + b; break;
    case "-": r = a - b; break;
    case "*": r = a * b; break;
    case "/": if (b === 0) throw err("০ দিয়ে ভাগ করা যায় না", "Cannot divide by 0"); r = Math.trunc(a / b); break;
    case "AND": return a & b;
    case "OR": return a | b;
    case "XOR": return a ^ b;
    case "XNOR": return ~(a ^ b);
    case "NOT": return ~a;
    case "NEG": r = -a; break;
  }
  if (r > 2147483647 || r < -2147483648) throw err("সীমার বাইরে (৩২-বিট)", "Out of range (32-bit)");
  return r;
}

// ---------- function table ----------
export function makeTable(fx: string, start: number, end: number, step: number, ctx: Omit<Ctx, "vars" | "ans">): { x: number; y: string }[] {
  if (step === 0 || (end - start) / step < 0) throw err("ধাপ (step) ঠিক নেই", "The step is not valid");
  const count = Math.floor((end - start) / step + 1e-9) + 1;
  if (count > 45) throw err("সর্বোচ্চ ৪৫টি সারি দেখানো যায়", "A table can have at most 45 rows");
  const rows: { x: number; y: string }[] = [];
  for (let i = 0; i < count; i++) {
    const x = Number((start + i * step).toPrecision(12));
    try {
      const v = evaluate(fx, { ...ctx, vars: { x: real(x) }, ans: ZERO });
      rows.push({ x, y: fmtVal(v, { view: "dec" }) });
    } catch { rows.push({ x, y: "—" }); }
  }
  return rows;
}
