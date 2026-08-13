import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageCard } from "@/components/cards/PackageCard";
import { Section } from "@/components/ui/Section";
import { getDestination, listPackages } from "@/lib/data/store";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/locale";
import { getCurrency } from "@/lib/preferences";

export default async function DestinationDetailPage({
  params,
}: PageProps<"/[locale]/destinations/[slug]">) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const destination = getDestination(slug);
  if (!destination) notFound();

  const dict = getDictionary(raw);
  const currency = await getCurrency();
  const related = listPackages().filter((p) =>
    destination.relatedPackageIds.includes(p.id),
  );

  return (
    <>
      <section
        className="relative min-h-[52vh] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(13,40,24,.28), rgba(13,40,24,.58)), url(${destination.image})`,
        }}
      >
        <div className="page-shell flex min-h-[52vh] flex-col justify-end pb-12 pt-28 text-white">
          {destination.trending && (
            <span className="mb-3 w-fit rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
              Trending
            </span>
          )}
          <h1 className="font-display text-4xl leading-tight drop-shadow-lg md:text-5xl lg:text-6xl">
            {t(destination.name, raw)}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            {t(destination.summary, raw)}
          </p>
        </div>
      </section>

      <Section title={dict.sections.aboutPlace}>
        <p className="max-w-3xl text-base leading-[1.85] text-ink-muted md:text-lg">
          {t(destination.description, raw)}
        </p>
      </Section>

      <Section title={dict.sections.activities} subtitle={dict.sections.activitiesSub}>
        <div className="grid gap-3 sm:grid-cols-2">
          {destination.activities.map((activity, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white px-4 py-4 shadow-sm"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <p className="text-sm font-medium leading-relaxed text-ink">
                {t(activity, raw)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={dict.sections.facts}>
        <div className="grid gap-3 md:grid-cols-2">
          {destination.facts.map((fact, i) => (
            <div
              key={i}
              className="rounded-2xl border border-black/5 bg-white px-4 py-4 text-sm leading-relaxed text-ink-muted shadow-sm"
            >
              {t(fact, raw)}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="relative overflow-hidden rounded-[1.5rem] border border-primary/10 bg-[#E8F5E9] p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {dict.sections.didYouKnow}
          </div>
          <p className="mt-3 max-w-3xl font-display text-xl leading-snug text-ink md:text-2xl">
            {t(destination.didYouKnow, raw)}
          </p>
        </div>
      </Section>

      {destination.gallery.length > 0 && (
        <Section title={dict.sections.gallery}>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {destination.gallery.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className={`overflow-hidden rounded-2xl shadow-sm ${
                  i === 0
                    ? "col-span-2 row-span-2 min-h-[220px] md:min-h-[320px]"
                    : "min-h-[140px] md:min-h-[160px]"
                }`}
              >
                <div
                  className="h-full min-h-[inherit] w-full bg-cover bg-center transition duration-500 hover:scale-105"
                  style={{ backgroundImage: `url(${src})` }}
                  role="img"
                  aria-label={`${t(destination.name, raw)} photo ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {related.length > 0 && (
        <Section title={dict.sections.relatedPackages}>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                locale={raw}
                currency={currency}
                dict={dict}
              />
            ))}
          </div>
          <div className="mt-6">
            <Link
              href={`/${raw}/packages`}
              className="inline-flex items-center gap-1 rounded-full bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
            >
              {dict.sections.viewAll} →
            </Link>
          </div>
        </Section>
      )}
    </>
  );
}
