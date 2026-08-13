import { cookies } from "next/headers";
import type { Currency } from "@/lib/data/types";
import { isCurrency } from "@/lib/locale";

const CURRENCY_COOKIE = "nl_currency";

export async function getCurrency(): Promise<Currency> {
  const jar = await cookies();
  const value = jar.get(CURRENCY_COOKIE)?.value;
  if (value && isCurrency(value)) return value;
  return "NOK";
}

export { CURRENCY_COOKIE };
