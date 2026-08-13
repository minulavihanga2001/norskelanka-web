import { notFound } from "next/navigation";
import { PackageCard } from "@/components/cards/PackageCard";
import { Section } from "@/components/ui/Section";
import { listPackages } from "@/lib/data/store";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/locale";
import { getCurrency } from "@/lib/preferences";

export default async function PackagesPage({
  params,
}: PageProps<"/[locale]/packages">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);
  const currency = await getCurrency();
  const packages = listPackages();

  return (
    <Section title={dict.nav.packages} subtitle={dict.sections.packagesSub}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            locale={raw}
            currency={currency}
            dict={dict}
          />
        ))}
      </div>
    </Section>
  );
}
