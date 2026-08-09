import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageCard } from "@/components/cards/PackageCard";
import { Button } from "@/components/ui/Button";
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
        className="relative min-h-[50vh] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(13,40,24,.3), rgba(13,40,24,.55)), url(${destination.image})`,
        }}
      >
        <div className="page-shell flex min-h-[50vh] flex-col justify-end pb-10 pt-24 text-white">
          {destination.trending && (
            <span className="mb-2 w-fit rounded-full bg-gradient-to-r from-primary-glow to-primary px-4 py-1 text-xs font-semibold text-white shadow-md shadow-primary/35">
              Trending
            </span>
          )}
          <h1 className="font-display text-4xl drop-shadow-lg md:text-5xl">{t(destination.name, raw)}</h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-white/85">{t(destination.summary, raw)}</p>
        </div>
      </section>

      <Section>
        <div className="glass-strong max-w-3xl rounded-[var(--radius-lg)] p-6 md:p-8">
          <p className="text-lg leading-relaxed text-ink-muted">{t(destination.description, raw)}</p>
          <div className="mt-6">
            <Button href={`/${raw}/contact`}>{dict.nav.getQuote}</Button>
          </div>
        </div>
      </Section>

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
