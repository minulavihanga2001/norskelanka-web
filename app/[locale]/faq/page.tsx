import { notFound } from "next/navigation";
import { Accordion } from "@/components/ui/Accordion";
import { Section } from "@/components/ui/Section";
import { listFaqs } from "@/lib/data/store";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/locale";

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);
  const faqs = listFaqs().map((f) => ({
    id: f.id,
    question: t(f.question, raw),
    answer: t(f.answer, raw),
  }));

  return (
    <Section title={dict.sections.faqTitle}>
      <div className="mx-auto max-w-3xl">
        <Accordion items={faqs} />
      </div>
    </Section>
  );
}
