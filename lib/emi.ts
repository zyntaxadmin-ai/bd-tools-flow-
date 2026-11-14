// EMI maths for the EMI calculator. Pure functions, no React.

export type EmiRow = { m: number; princ: number; int: number; bal: number; paid: number };
export type EmiPlan = { emi: number; rows: EmiRow[]; totalInterest: number; totalPaid: number; months: number };

/** Monthly instalment, reducing balance method. n is the number of months. */
export function reducingEmi(P: number, annualPct: number, n: number): number {
  const r = annualPct / 1200;
  if (r === 0) return P / n;
  const f = Math.pow(1 + r, n);
  return (P * r * f) / (f - 1);
}

/** Monthly instalment, flat rate method (interest always on the full original amount). */
export function flatEmi(P: number, annualPct: number, n: number): number {
  return (P + ((P * annualPct) / 100) * (n / 12)) / n;
}

/** The reducing balance rate (per year, in %) that gives the same instalment as a flat rate. */
export function flatToReducingRate(P: number, annualPct: number, n: number): number {
  if (annualPct <= 0) return 0;
  const target = flatEmi(P, annualPct, n);
  let lo = 1e-9;
  let hi = 1;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    const f = Math.pow(1 + mid, n);
    const pmt = (P * mid * f) / (f - 1);
    if (pmt < target) lo = mid;
    else hi = mid;
  }
  return ((lo + hi) / 2) * 1200;
}

/** Month-by-month plan, reducing balance. `extra` is an additional amount paid every month. */
export function reducingPlan(P: number, annualPct: number, n: number, extra = 0): EmiPlan {
  const r = annualPct / 1200;
  const emi = reducingEmi(P, annualPct, n);
  const rows: EmiRow[] = [];
  let bal = P;
  let totalInterest = 0;
  let totalPaid = 0;
  for (let m = 1; m <= n + 1 && bal > 0.01; m++) {
    const int = bal * r;
    let pay = emi + extra;
    if (pay > bal + int) pay = bal + int;
    const princ = pay - int;
    bal = Math.max(0, bal - princ);
    totalInterest += int;
    totalPaid += pay;
    rows.push({ m, princ, int, bal, paid: pay });
  }
  return { emi, rows, totalInterest, totalPaid, months: rows.length };
}

/** Month-by-month plan, flat rate: equal principal and equal interest every month. */
export function flatPlan(P: number, annualPct: number, n: number): EmiPlan {
  const emi = flatEmi(P, annualPct, n);
  const princ = P / n;
  const int = emi - princ;
  const rows: EmiRow[] = [];
  for (let m = 1; m <= n; m++) rows.push({ m, princ, int, bal: Math.max(0, P - princ * m), paid: emi });
  return { emi, rows, totalInterest: int * n, totalPaid: emi * n, months: n };
}

/** Group a monthly plan into years (12 months each). */
export function yearly(rows: EmiRow[]): { y: number; princ: number; int: number; paid: number; bal: number }[] {
  const out: { y: number; princ: number; int: number; paid: number; bal: number }[] = [];
  rows.forEach((r, i) => {
    const y = Math.floor(i / 12);
    if (!out[y]) out[y] = { y: y + 1, princ: 0, int: 0, paid: 0, bal: 0 };
    out[y].princ += r.princ;
    out[y].int += r.int;
    out[y].paid += r.paid;
    out[y].bal = r.bal;
  });
  return out;
}

/** Short Bangladeshi style amount: 12.5 lakh, 1.2 crore. */
export function shortAmount(n: number, bn: boolean): string {
  const f = (x: number) => (Math.round(x * 100) / 100).toString();
  if (n >= 1e7) return `${f(n / 1e7)} ${bn ? "কোটি" : "crore"}`;
  if (n >= 1e5) return `${f(n / 1e5)} ${bn ? "লাখ" : "lakh"}`;
  return Math.round(n).toLocaleString("en-IN");
}
