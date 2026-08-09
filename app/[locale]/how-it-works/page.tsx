import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/locale";

export default async function HowItWorksPage({
  params,
}: PageProps<"/[locale]/how-it-works">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <>
      <Section title={dict.howItWorks.title} subtitle={dict.howItWorks.subtitle}>
        <div className="relative grid gap-5 md:grid-cols-2">
          {dict.howItWorks.steps.map((step, i) => (
            <div key={step.title} className="glass-strong rounded-[var(--radius-lg)] p-6 md:p-8 glass-card-hover relative overflow-hidden">
              <div className="absolute -right-4 -top-4 font-display text-8xl text-primary/[0.06]">0{i + 1}</div>
              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 font-display text-2xl text-primary">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="font-display text-2xl text-ink">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{step.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href={`/${raw}/contact`}>{dict.nav.getQuote}</Button>
        </div>
      </Section>
    </>
  );
}
