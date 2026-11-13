// Pure gold helpers (no React), shared by the Gold Price Calculator.
// Bangladesh jewellers' units: 1 vori = 16 ana, 1 ana = 6 roti, 1 vori = 11.664 grams.
// So 1 roti = 0.1215 g and 1 ana = 0.729 g.
export const GRAM_PER_VORI = 11.664;
export const ROTI_PER_ANA = 6;
export const ANA_PER_VORI = 16;
export const ROTI_PER_VORI = ROTI_PER_ANA * ANA_PER_VORI; // 96
export const GRAM_PER_ROTI = GRAM_PER_VORI / ROTI_PER_VORI; // 0.1215

export const toGrams = (vori: number, ana: number, roti: number) => (vori * ROTI_PER_VORI + ana * ROTI_PER_ANA + roti) * GRAM_PER_ROTI;

// Splits grams into vori, ana and roti (roti rounded to 2 decimals, using whole hundredths to avoid float errors).
export function fromGrams(grams: number) {
  const hundredths = Math.round((grams / GRAM_PER_ROTI) * 100);
  const vori = Math.floor(hundredths / (ROTI_PER_VORI * 100));
  const rem = hundredths % (ROTI_PER_VORI * 100);
  const ana = Math.floor(rem / (ROTI_PER_ANA * 100));
  const roti = (rem % (ROTI_PER_ANA * 100)) / 100;
  return { vori, ana, roti };
}

export type MakingMode = "percent" | "perVori";
export type VatOn = "making" | "total";

export type JewelleryInput = {
  grams: number;
  pricePerVori: number;
  wastagePct: number;
  makingMode: MakingMode;
  makingValue: number;
  vatPct: number;
  vatOn: VatOn;
};
export type JewelleryResult = { grams: number; vori: number; goldValue: number; wastage: number; making: number; vat: number; total: number };

// Gold value = weight x price per vori. Wastage is a % of the gold value.
// Making charge is either a % of the gold value or a flat amount per vori.
// VAT is a % of the making charge only, or of everything before VAT.
export function computeJewellery(i: JewelleryInput): JewelleryResult {
  const vori = i.grams / GRAM_PER_VORI;
  const goldValue = vori * i.pricePerVori;
  const wastage = goldValue * (i.wastagePct / 100);
  const making = i.makingMode === "percent" ? goldValue * (i.makingValue / 100) : vori * i.makingValue;
  const base = i.vatOn === "making" ? making : goldValue + wastage + making;
  const vat = base * (i.vatPct / 100);
  return { grams: i.grams, vori, goldValue, wastage, making, vat, total: goldValue + wastage + making + vat };
}

export type SellResult = { grams: number; vori: number; goldValue: number; cut: number; receive: number };
// Estimated cash when selling old gold: gold value minus the jeweller's deduction (a % of the value).
export function computeSell(grams: number, pricePerVori: number, cutPct: number): SellResult {
  const vori = grams / GRAM_PER_VORI;
  const goldValue = vori * pricePerVori;
  const cut = goldValue * (cutPct / 100);
  return { grams, vori, goldValue, cut, receive: goldValue - cut };
}
