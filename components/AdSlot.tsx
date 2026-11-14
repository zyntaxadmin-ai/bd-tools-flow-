// Renders nothing until NEXT_PUBLIC_ADS=1 (after AdSense approval).
// The fixed min-height reserves space so the page does not jump when an ad loads (no layout shift).
// When you get a real ad unit, put its <ins class="adsbygoogle"> code inside the marked div.
export default function AdSlot({ label }: { label: string }) {
  if (process.env.NEXT_PUBLIC_ADS !== "1") return null;
  return (
    <aside aria-label={label} className="w-full min-h-[120px] flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 text-center">
      <span className="text-[11px] font-medium tracking-widest text-slate-500 uppercase">{label}</span>
      {/* AD UNIT GOES HERE */}
    </aside>
  );
}
