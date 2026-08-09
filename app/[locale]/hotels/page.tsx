import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { listHotels, listPackages } from "@/lib/data/store";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/locale";

export default async function HotelsPage({ params }: PageProps<"/[locale]/hotels">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);
  const hotels = listHotels();
  const packages = listPackages();

  return (
    <Section title={dict.nav.hotels} subtitle={dict.sections.relatedHotels}>
      <div className="grid gap-5 md:grid-cols-2">
        {hotels.map((hotel) => {
          const linked = packages.filter((p) => hotel.packageIds.includes(p.id));
          return (
            <article key={hotel.id} className="glass-strong overflow-hidden rounded-[var(--radius-lg)] glass-card-hover">
              <div
                className="h-52 bg-cover bg-center"
                style={{ backgroundImage: `url(${hotel.image})` }}
              />
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-2xl text-ink">{t(hotel.name, raw)}</h2>
                  <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {hotel.discountPercent}% {dict.sections.discount}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-ink-muted">
                  {t(hotel.location, raw)} · {hotel.stars} {dict.sections.stars}
                </p>
                <p className="mt-3 leading-relaxed text-ink-muted">{t(hotel.summary, raw)}</p>
                {linked.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {linked.map((pkg) => (
                      <Link
                        key={pkg.id}
                        href={`/${raw}/packages/${pkg.slug}`}
                        className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/15"
                      >
                        {t(pkg.title, raw)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
