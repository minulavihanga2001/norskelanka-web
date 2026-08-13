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
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <ContactForm dict={dict} />

        <aside className="overflow-hidden rounded-[var(--radius-lg)] border border-black/5 bg-white shadow-sm">
          <div className="space-y-5 p-6 md:p-8">
            <div className="flex justify-center border-b border-black/5 pb-5">
              <img
                src="/images/logo-full.png"
                alt={dict.brand}
                className="h-24 w-auto max-w-full object-contain sm:h-28"
              />
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-primary">
                Email
              </div>
              <a
                href={`mailto:${socialLinks.email}`}
                className="mt-1 block text-lg font-medium text-ink transition-colors hover:text-primary"
              >
                {socialLinks.email}
              </a>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-primary">
                Phone / WhatsApp
              </div>
              <a
                href={`tel:${socialLinks.phone}`}
                className="mt-1 block text-lg font-medium text-ink transition-colors hover:text-primary"
              >
                {socialLinks.phone}
              </a>
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
              >
                WhatsApp chat →
              </a>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-primary">
                {dict.sections.social}
              </div>
              <div className="mt-2 flex gap-3 text-sm">
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/10 px-3 py-1.5 text-ink-muted transition-colors hover:border-primary/30 hover:text-primary"
                >
                  Facebook
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/10 px-3 py-1.5 text-ink-muted transition-colors hover:border-primary/30 hover:text-primary"
                >
                  Instagram
                </a>
              </div>
            </div>
            <p className="pt-2 text-sm text-ink-muted">
              Based in Sri Lanka · Serving travellers from Norway
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
