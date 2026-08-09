import Link from "next/link";
import { formatPrice } from "@/lib/currency";
import { t, type Dictionary } from "@/lib/i18n/dictionaries";
import type { Currency, Locale, Package } from "@/lib/data/types";

export function PackageCard({
  pkg,
  locale,
  currency,
  dict,
}: {
  pkg: Package;
  locale: Locale;
  currency: Currency;
  dict: Dictionary;
}) {
  return (
    <Link
      href={`/${locale}/packages/${pkg.slug}`}
      className="group glass-strong block overflow-hidden rounded-[var(--radius-lg)] glass-card-hover"
    >
      <div className="relative overflow-hidden">
        <div
          className="h-48 bg-cover bg-center transition duration-600 group-hover:scale-105"
          style={{ backgroundImage: `url(${pkg.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium uppercase tracking-[0.14em] text-primary">
          {pkg.durationDays} {dict.sections.days}
        </div>
        <h3 className="mt-2.5 font-display text-xl text-ink transition-colors group-hover:text-primary-dark">{t(pkg.title, locale)}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
          {t(pkg.summary, locale)}
        </p>
        <div className="mt-4 flex items-baseline gap-1 text-sm text-ink">
          <span className="text-ink-muted">{dict.sections.startingFrom} </span>
          <span className="text-base font-semibold text-primary-dark">{formatPrice(pkg.priceNok, currency, locale)}</span>
          <span className="text-ink-muted"> {dict.sections.perPerson}</span>
        </div>
      </div>
    </Link>
  );
}
