import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { listDrivers, listVehicles } from "@/lib/data/store";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/locale";

export default async function TransportPage({
  params,
}: PageProps<"/[locale]/transport">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);
  const vehicles = listVehicles();
  const drivers = listDrivers();

  return (
    <>
      <Section title={dict.nav.transport} subtitle={dict.sections.newVehicles}>
        <div className="grid gap-5 md:grid-cols-2">
          {vehicles.map((vehicle) => (
            <article key={vehicle.id} className="glass-strong overflow-hidden rounded-[var(--radius-lg)] glass-card-hover">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${vehicle.image})` }}
              />
              <div className="p-5">
                <h2 className="font-display text-2xl text-ink">{t(vehicle.name, raw)}</h2>
                <p className="mt-1.5 inline-flex items-center gap-2 text-sm">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{vehicle.year}</span>
                  <span className="text-ink-muted">{vehicle.seats} {dict.sections.seats}</span>
                </p>
                <p className="mt-3 leading-relaxed text-ink-muted">{t(vehicle.summary, raw)}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Drivers">
        <div className="grid gap-5 md:grid-cols-2">
          {drivers.map((driver) => (
            <article key={driver.id} className="glass-strong rounded-[var(--radius-lg)] p-5 md:p-6 glass-card-hover">
              <div className="flex gap-4">
                <div
                  className="h-20 w-20 shrink-0 rounded-2xl bg-cover bg-center shadow-md"
                  style={{ backgroundImage: `url(${driver.image})` }}
                />
                <div>
                  <h3 className="font-display text-xl text-ink">{driver.name}</h3>
                  <p className="mt-0.5 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {driver.yearsExperience} {dict.sections.experience}
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">
                    {dict.sections.languages}: {driver.languages.join(", ")}
                  </p>
                </div>
              </div>
              <p className="mt-4 leading-relaxed text-ink-muted">{t(driver.bio, raw)}</p>
              <div className="mt-5">
                <h4 className="text-sm font-medium text-ink">{dict.sections.driverReviews}</h4>
                <div className="mt-2 space-y-2">
                  {driver.reviews.map((review) => (
                    <div key={review.id} className="glass-subtle rounded-xl px-4 py-3 text-sm">
                      <div className="text-primary">{"★".repeat(review.rating)}</div>
                      <p className="mt-1 text-ink-muted">&ldquo;{t(review.text, raw)}&rdquo;</p>
                      <div className="mt-1.5 text-xs font-medium text-ink">— {review.author}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
