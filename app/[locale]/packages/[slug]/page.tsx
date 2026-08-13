import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageRouteMap } from "@/components/packages/PackageRouteMap";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { formatPrice } from "@/lib/currency";
import { getPackage, listDestinations, listHotels } from "@/lib/data/store";
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
  const byId = new Map(listDestinations().map((d) => [d.id, d]));
  const routeDestinations = pkg.destinationIds
    .map((id) => byId.get(id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[52vh] overflow-hidden bg-cover bg-center md:min-h-[58vh]"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(10,32,20,.72), rgba(10,32,20,.35)), url(${pkg.image})`,
        }}
      >
        <div className="page-shell flex min-h-[52vh] flex-col justify-end pb-12 pt-28 text-white md:min-h-[58vh]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
              {pkg.durationDays} {dict.sections.days}
            </span>
            <span className="inline-flex items-center rounded-full bg-primary/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-glow backdrop-blur-sm">
              {routeDestinations.length}{" "}
              {raw === "no" ? "destinasjoner" : "destinations"}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight drop-shadow-lg md:text-5xl lg:text-6xl">
            {t(pkg.title, raw)}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            {t(pkg.summary, raw)}
          </p>
          <div className="mt-6 flex flex-wrap items-end gap-4">
            <p className="text-lg">
              {dict.sections.from}{" "}
              <strong className="text-2xl text-primary-glow md:text-3xl">
                {formatPrice(pkg.priceNok, currency, raw)}
              </strong>{" "}
              <span className="text-white/70">{dict.sections.perPerson}</span>
            </p>
            <Button href={`/${raw}/contact`} className="shadow-xl">
              {dict.nav.getQuote}
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="space-y-10">
          {/* Days & stops overview */}
          <div className="space-y-5 rounded-[var(--radius-lg)] border border-black/5 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {raw === "no" ? "Pakkeoversikt" : "Package overview"}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-ink md:text-3xl">
                  {t(pkg.title, raw)}
                </h2>
              </div>
              <div className="sm:text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {dict.sections.startingFrom}
                </p>
                <p className="mt-1 font-display text-3xl font-semibold text-ink md:text-4xl">
                  {formatPrice(pkg.priceNok, currency, raw)}
                </p>
                <p className="mt-0.5 text-sm text-ink-muted">{dict.sections.perPerson}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-primary/10 bg-[#E8F5E9] px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {dict.sections.days}
                </p>
                <p className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">
                  {pkg.durationDays}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  {raw === "no" ? "Dager på reisen" : "Days on the journey"}
                </p>
              </div>

              <div className="rounded-2xl border border-black/5 bg-[#F7FAF6] px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {raw === "no" ? "Stopp" : "Stops"}
                </p>
                <p className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">
                  {routeDestinations.length}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  {raw === "no"
                    ? "Destinasjoner på ruten"
                    : "Destinations on the route"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-black/5 pt-5">
              {routeDestinations.map((dest, index) => (
                <span
                  key={dest.id}
                  className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-1.5 text-sm text-ink shadow-sm"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    {index + 1}
                  </span>
                  {t(dest.name, raw)}
                </span>
              ))}
              <Button href={`/${raw}/contact`} className="ml-auto">
                {dict.nav.getQuote}
              </Button>
            </div>
          </div>

          <div className="space-y-10">
              {/* About */}
              <div>
                <span className="mb-3 block h-1 w-11 rounded-full bg-primary" aria-hidden />
                <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
                  {dict.sections.aboutPackage}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-[1.85] text-ink-muted md:text-lg">
                  {t(pkg.description, raw)}
                </p>
              </div>

            {/* Inclusions */}
            <div>
              <span className="mb-3 block h-1 w-11 rounded-full bg-primary" aria-hidden />
              <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
                {dict.sections.inclusions}
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {pkg.inclusions.map((inc, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      ✓
                    </span>
                    <span className="text-sm leading-relaxed text-ink-muted md:text-[0.95rem]">
                      {t(inc, raw)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Travel route */}
            <PackageRouteMap
              destinations={routeDestinations}
              locale={raw}
              labels={{
                routeTitle: dict.sections.travelRoute,
                routeSub: dict.sections.travelRouteSub,
                stop: dict.sections.routeStop,
                quickView: dict.sections.quickView,
                openFull: dict.sections.openFullDestination,
                close: dict.sections.close,
              }}
            />

            {/* Day-by-day itinerary */}
            <div>
              <span className="mb-3 block h-1 w-11 rounded-full bg-primary" aria-hidden />
              <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
                {dict.sections.dayByDay}
              </h2>
              <p className="mt-2 text-sm text-ink-muted md:text-base">
                {dict.sections.itinerary}
              </p>
              <ol className="relative mt-6 space-y-0">
                {pkg.itinerary.map((day, index) => {
                  const isLast = index === pkg.itinerary.length - 1;
                  return (
                    <li key={day.day} className="relative flex gap-4 md:gap-5">
                      <div className="flex w-10 shrink-0 flex-col items-center md:w-12">
                        <span className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-sm md:h-11 md:w-11 md:text-sm">
                          {day.day}
                        </span>
                        {!isLast && (
                          <span
                            className="my-1 w-0 flex-1 border-l-2 border-dashed border-primary/35"
                            aria-hidden
                          />
                        )}
                      </div>
                      <div
                        className={`mb-4 flex-1 rounded-2xl border border-black/5 bg-white p-4 shadow-sm md:mb-5 md:p-5 ${
                          isLast ? "mb-0" : ""
                        }`}
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                          {raw === "no" ? "Dag" : "Day"} {day.day}
                        </p>
                        <h3 className="mt-1.5 font-display text-xl text-ink md:text-2xl">
                          {t(day.title, raw)}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-base">
                          {t(day.description, raw)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Hotels */}
            {hotels.length > 0 && (
              <div>
                <span className="mb-3 block h-1 w-11 rounded-full bg-primary" aria-hidden />
                <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
                  {dict.sections.relatedHotels}
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {hotels.map((hotel) => (
                    <Link
                      key={hotel.id}
                      href={`/${raw}/hotels`}
                      className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:border-primary/25 hover:shadow-md"
                    >
                      <div
                        className="h-36 bg-cover bg-center transition duration-500 group-hover:scale-[1.03]"
                        style={{ backgroundImage: `url(${hotel.image})` }}
                      />
                      <div className="p-4">
                        <div className="font-display text-lg text-ink">{t(hotel.name, raw)}</div>
                        <div className="mt-1 text-sm text-ink-muted">
                          {t(hotel.location, raw)}
                        </div>
                        <div className="mt-2 text-sm font-medium text-primary">
                          {hotel.discountPercent}% {dict.sections.discount}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
