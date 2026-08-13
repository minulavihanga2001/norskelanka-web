import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/locale";
import { getCurrency } from "@/lib/preferences";

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const dict = getDictionary(raw);
  const currency = await getCurrency();

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader locale={raw} currency={currency} dict={dict} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={raw} dict={dict} />
    </div>
  );
}
