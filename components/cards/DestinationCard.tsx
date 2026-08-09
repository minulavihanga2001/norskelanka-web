import Link from "next/link";
import { t } from "@/lib/i18n/dictionaries";
import type { Destination, Locale } from "@/lib/data/types";

export function DestinationCard({
  destination,
  locale,
}: {
  destination: Destination;
  locale: Locale;
}) {
  return (
    <Link
      href={`/${locale}/destinations/${destination.slug}`}
      className="group relative block overflow-hidden rounded-[var(--radius-lg)] glass-card-hover"
    >
      <div
        className="h-64 bg-cover bg-center transition duration-600 group-hover:scale-110"
        style={{ backgroundImage: `url(${destination.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/85 via-bg-deep/25 to-transparent transition-opacity duration-300 group-hover:from-bg-deep/90" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-foam">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-2xl drop-shadow-sm">{t(destination.name, locale)}</h3>
          {destination.trending && (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-md shadow-primary/30">
              Hot
            </span>
          )}
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm text-foam/80">
          {t(destination.summary, locale)}
        </p>
      </div>
    </Link>
  );
}
