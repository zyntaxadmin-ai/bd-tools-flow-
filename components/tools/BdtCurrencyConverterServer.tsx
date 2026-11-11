import BdtCurrencyConverter from "./BdtCurrencyConverter";
import { loadRates } from "@/lib/currencyData";

// Fetches today's rates on the server (cached for an hour) so the first HTML already holds real numbers.
// If the fetch fails the client component loads the rates itself, as before.
export default async function BdtCurrencyConverterServer({ from, to }: { from?: string; to?: string }) {
  let initial;
  try { initial = await loadRates({ next: { revalidate: 3600 } }); } catch { initial = undefined; }
  return <BdtCurrencyConverter initial={initial} initialFrom={from} initialTo={to} />;
}
