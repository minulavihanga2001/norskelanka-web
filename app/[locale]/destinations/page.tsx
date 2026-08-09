import { notFound } from "next/navigation";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { SriLankaMap } from "@/components/map/SriLankaMap";
import { Section } from "@/components/ui/Section";
import { listDestinations } from "@/lib/data/store";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/locale";

export default async function DestinationsPage({
  params,
}: PageProps<"/[locale]/destinations">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);
  const destinations = listDestinations();

  return (
    <>
      <Section title={dict.sections.mapTitle} subtitle={dict.sections.mapSub}>
        <SriLankaMap destinations={destinations} locale={raw} />
      </Section>
      <Section title={dict.nav.destinations} subtitle={dict.sections.trendingSub}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <DestinationCard key={d.id} destination={d} locale={raw} />
          ))}
        </div>
      </Section>
    </>
  );
}
