import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/lib/locale";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/admin")
  ) {
    return;
  }

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) {
    const maybe = pathname.split("/")[1];
    if (maybe && isLocale(maybe)) return;
  }

  const accept = request.headers.get("accept-language") ?? "";
  const prefersNo = accept.toLowerCase().includes("nb") || accept.toLowerCase().includes("no");
  const locale = prefersNo ? "no" : DEFAULT_LOCALE;

  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
