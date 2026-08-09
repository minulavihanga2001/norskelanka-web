import type { Currency } from "@/lib/data/types";

/** Fixed rates relative to 1 NOK (admin-updatable later). */
export const EXCHANGE_RATES: Record<Currency, number> = {
  NOK: 1,
  EUR: 0.086,
  USD: 0.094,
};

export const CURRENCIES: Currency[] = ["NOK", "EUR", "USD"];

export function convertFromNok(amountNok: number, currency: Currency): number {
  return amountNok * EXCHANGE_RATES[currency];
}

export function formatPrice(amountNok: number, currency: Currency, locale: string): string {
  const amount = convertFromNok(amountNok, currency);
  const localeTag = locale === "no" ? "nb-NO" : "en-NO";
  return new Intl.NumberFormat(localeTag, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "NOK" ? 0 : 0,
  }).format(amount);
}
