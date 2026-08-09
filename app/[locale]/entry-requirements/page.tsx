import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { entryRequirements } from "@/lib/data/seed";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/locale";

export default async function EntryRequirementsPage({
  params,
}: PageProps<"/[locale]/entry-requirements">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <Section title={dict.sections.entryTitle} subtitle={dict.sections.entrySub}>
      <div className="grid gap-5 md:grid-cols-2">
        {entryRequirements.sections.map((section) => (
          <article key={section.title.en} className="glass-strong rounded-[var(--radius-lg)] p-6 glass-card-hover">
            <h2 className="font-display text-xl text-ink">{t(section.title, raw)}</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">{t(section.body, raw)}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 glass-subtle rounded-[var(--radius)] px-5 py-3">
        <p className="text-sm text-ink-muted">
          Always verify current rules on official Sri Lankan government sources before travel.
        </p>
      </div>
    </Section>
  );
}
