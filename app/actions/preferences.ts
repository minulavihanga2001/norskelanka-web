"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CURRENCY_COOKIE } from "@/lib/preferences";
import { isCurrency, isLocale } from "@/lib/locale";
import type { Currency, Locale } from "@/lib/data/types";

export async function setCurrency(currency: Currency) {
  if (!isCurrency(currency)) return;
  const jar = await cookies();
  jar.set(CURRENCY_COOKIE, currency, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  revalidatePath("/", "layout");
}

export async function setCurrencyAction(formData: FormData) {
  const currency = String(formData.get("currency") ?? "");
  if (isCurrency(currency)) {
    await setCurrency(currency);
  }
}

export async function switchLocale(formData: FormData) {
  const locale = String(formData.get("locale") ?? "");
  const pathname = String(formData.get("pathname") ?? "/");
  if (!isLocale(locale)) return;

  const parts = pathname.split("/").filter(Boolean);
  if (parts.length && isLocale(parts[0])) {
    parts[0] = locale;
  } else {
    parts.unshift(locale);
  }
  redirect(`/${parts.join("/")}`);
}

export async function switchLocaleTo(locale: Locale, pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length && isLocale(parts[0])) {
    parts[0] = locale;
  } else {
    parts.unshift(locale);
  }
  redirect(`/${parts.join("/")}`);
}
