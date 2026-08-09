import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { formatPrice } from "@/lib/currency";
import { getPackage, listHotels } from "@/lib/data/store";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/locale";
import { getCurrency } from "@/lib/preferences";

export default async function PackageDetailPage({
  params,
}: PageProps<"/[locale]/packages/[slug]">) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const dict = getDictionary(raw);
  const currency = await getCurrency();
  const hotels = listHotels().filter((h) => pkg.hotelIds.includes(h.id));

  return (
    <>
      <section
        className="relative min-h-[46vh] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(13,40,24,.35), rgba(13,40,24,.55)), url(${pkg.image})` }}
      >
        <div className="page-shell flex min-h-[46vh] flex-col justify-end pb-10 pt-24 text-white">
          <p className="inline-flex items-center rounded-full bg-primary/25 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary-glow backdrop-blur-sm">
            {pkg.durationDays} {dict.sections.days}
          </p>
          <h1 className="mt-3 font-display text-4xl drop-shadow-lg md:text-5xl">{t(pkg.title, raw)}</h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-white/85">{t(pkg.summary, raw)}</p>
          <p className="mt-4 text-lg">
            {dict.sections.from}{" "}
            <strong className="text-primary-glow">{formatPrice(pkg.priceNok, currency, raw)}</strong>{" "}
            <span className="text-white/70">{dict.sections.perPerson}</span>
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="glass-strong rounded-[var(--radius-lg)] p-6">
              <p className="leading-relaxed text-ink-muted">{t(pkg.description, raw)}</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-ink">{dict.sections.inclusions}</h2>
              <ul className="mt-4 space-y-2">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="glass-strong flex items-center gap-3 rounded-xl px-4 py-3 text-ink-muted">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">✓</span>
                    {t(inc, raw)}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl text-ink">{dict.sections.itinerary}</h2>
              <div className="mt-4 space-y-3">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="glass-strong rounded-[var(--radius)] p-4 glass-card-hover">
                    <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider text-primary">
                      Day {day.day}
                    </div>
                    <h3 className="mt-2 font-medium text-ink">{t(day.title, raw)}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{t(day.description, raw)}</p>
                  </div>
                ))}
              </div>
            </div>

            {hotels.length > 0 && (
              <div>
                <h2 className="font-display text-2xl text-ink">{dict.sections.relatedHotels}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {hotels.map((hotel) => (
                    <Link
                      key={hotel.id}
                      href={`/${raw}/hotels`}
                      className="glass-strong overflow-hidden rounded-[var(--radius)] glass-card-hover"
                    >
                      <div
                        className="h-28 bg-cover bg-center"
                        style={{ backgroundImage: `url(${hotel.image})` }}
                      />
                      <div className="p-4">
                        <div className="font-medium text-ink">{t(hotel.name, raw)}</div>
                        <div className="mt-0.5 text-sm font-medium text-primary">
                          {hotel.discountPercent}% {dict.sections.discount}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <div className="glass-strong rounded-[var(--radius-lg)] p-6">
              <h2 className="font-display text-2xl text-ink">{dict.sections.requestCustom}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{dict.sections.contactSub}</p>
              <div className="mt-4">
                <Button href={`/${raw}/contact`} className="w-full">
                  {dict.nav.getQuote}
                </Button>
              </div>
            </div>
            <ContactForm dict={dict} packageSlug={pkg.slug} />
          </div>
        </div>
      </Section>
    </>
  );
}
