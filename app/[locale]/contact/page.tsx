import { notFound } from "next/navigation";
import { ContactForm } from "@/components/forms/ContactForm";
import { Section } from "@/components/ui/Section";
import { socialLinks } from "@/lib/data/seed";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/locale";

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <Section title={dict.sections.contactTitle} subtitle={dict.sections.contactSub}>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <ContactForm dict={dict} />
        <div className="glass-dark space-y-5 rounded-[var(--radius-lg)] p-6 text-foam md:p-8">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-primary">Email</div>
            <a href={`mailto:${socialLinks.email}`} className="mt-1 block text-lg transition-colors hover:text-primary">
              {socialLinks.email}
            </a>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-primary">Phone / WhatsApp</div>
            <a href={`tel:${socialLinks.phone}`} className="mt-1 block text-lg transition-colors hover:text-primary">
              {socialLinks.phone}
            </a>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-sm text-primary transition-colors hover:bg-primary/25"
            >
              WhatsApp chat →
            </a>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-primary">{dict.sections.social}</div>
            <div className="mt-2 flex gap-3 text-sm">
              <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-3 py-1.5 transition-colors hover:bg-white/10 hover:text-primary">
                Facebook
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-3 py-1.5 transition-colors hover:bg-white/10 hover:text-primary">
                Instagram
              </a>
            </div>
          </div>
          <p className="pt-4 text-sm text-foam/60">
            Based in Sri Lanka · Serving travellers from Norway
          </p>
        </div>
      </div>
    </Section>
  );
}
