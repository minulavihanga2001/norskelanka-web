import type { Currency, Locale } from "@/lib/data/types";

export const LOCALES: Locale[] = ["en", "no"];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function isCurrency(value: string): value is Currency {
  return value === "NOK" || value === "EUR" || value === "USD";
}
