import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { founder } from "@/lib/data/seed";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/locale";

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <Section title={dict.nav.about}>
      <div className="space-y-10">
        {/* Full Emblem Brand Banner */}
        <div className="glass-strong rounded-[var(--radius-xl)] p-8 md:p-10 border border-white/40 shadow-xl flex flex-col md:flex-row items-center gap-8">
          <img
            src="/images/logo-full.png"
            alt={dict.brand}
            className="h-44 md:h-52 w-auto object-contain shrink-0 drop-shadow-lg"
          />
          <div className="space-y-3 text-center md:text-left">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Connecting Norway &amp; Sri Lanka
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-ink font-semibold">
              Our Vision &amp; Story
            </h2>
            <p className="leading-relaxed text-ink-muted text-sm max-w-2xl">
              Norsk Lanka Travels was founded to bridge the distance between Norway and Sri Lanka — providing travelers with a safe, authentic, and high-end journey through one of the world's most breathtaking islands.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-strong overflow-hidden rounded-[var(--radius-lg)]">
            <div
              className="h-72 bg-cover bg-center md:h-full md:min-h-[420px]"
              style={{ backgroundImage: `url(${founder.photo})` }}
            />
          </div>
          <div className="space-y-6">
            <div className="glass-strong rounded-[var(--radius-lg)] p-6 md:p-8">
              <p className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                {t(founder.role, raw)}
              </p>
              <h2 className="mt-3 font-display text-3xl text-ink">{founder.name}</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{t(founder.story, raw)}</p>
            </div>
            <div className="glass-dark rounded-[var(--radius-lg)] p-6 text-foam md:p-8">
              <h3 className="font-display text-2xl">{dict.sections.founderMessage}</h3>
              <p className="mt-3 leading-relaxed text-foam/80">&ldquo;{t(founder.message, raw)}&rdquo;</p>
            </div>
            <Button href={`/${raw}/contact`}>{dict.nav.getQuote}</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
