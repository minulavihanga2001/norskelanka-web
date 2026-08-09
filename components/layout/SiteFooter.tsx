import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/data/types";
import { socialLinks } from "@/lib/data/seed";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const links = [
    { href: `${base}/packages`, label: dict.nav.packages },
    { href: `${base}/destinations`, label: dict.nav.destinations },
    { href: `${base}/hotels`, label: dict.nav.hotels },
    { href: `${base}/transport`, label: dict.nav.transport },
    { href: `${base}/blog`, label: dict.nav.blog },
    { href: `${base}/entry-requirements`, label: dict.nav.entry },
    { href: `${base}/faq`, label: dict.nav.faq },
    { href: `${base}/reviews`, label: dict.nav.reviews },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  const mainLinks = [
    { href: `${base}/packages`, label: dict.nav.packages },
    { href: `${base}/destinations`, label: dict.nav.destinations },
    { href: `${base}/hotels`, label: dict.nav.hotels },
    { href: `${base}/transport`, label: dict.nav.transport },
  ];

  const infoLinks = [
    { href: `${base}/blog`, label: dict.nav.blog },
    { href: `${base}/entry-requirements`, label: dict.nav.entry },
    { href: `${base}/faq`, label: dict.nav.faq },
    { href: `${base}/reviews`, label: dict.nav.reviews },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="mt-auto w-full bg-white border-t border-black/8 text-ink">
      {/* ── Massive Emblem Showcase Section ── */}
      <div className="w-full pt-16 pb-12 border-b border-black/5 bg-gradient-to-b from-slate-50/60 via-white to-white overflow-hidden relative">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6">
            Connecting Norway &amp; Sri Lanka
          </div>
          
          <div className="flex justify-center items-center my-4 group">
            <Link href={base} className="inline-block transition-transform duration-500 hover:scale-102">
              <img
                src="/images/logo-full.png"
                alt={dict.brand}
                className="h-44 sm:h-60 md:h-72 lg:h-84 w-auto max-w-full object-contain filter drop-shadow-sm"
              />
            </Link>
          </div>

          <p className="mt-6 max-w-xl mx-auto text-sm md:text-base leading-relaxed text-ink-muted font-normal">
            {dict.sections.footerBlurb}
          </p>
        </div>
      </div>

      {/* ── Detailed Links & Information Grid ── */}
      <div className="w-full px-6 py-14 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Col 1: Contact Details */}
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">Kontakt Oss</div>
              <div className="space-y-3 text-sm text-ink-muted">
                <div>
                  <div className="text-xs text-ink-muted/70 uppercase tracking-wider">E-post</div>
                  <a
                    href={`mailto:${socialLinks.email}`}
                    className="font-medium text-ink transition-colors hover:text-primary"
                  >
                    {socialLinks.email}
                  </a>
                </div>
                <div>
                  <div className="text-xs text-ink-muted/70 uppercase tracking-wider">Telefon</div>
                  <a
                    href={`tel:${socialLinks.phone}`}
                    className="font-medium text-ink transition-colors hover:text-primary"
                  >
                    {socialLinks.phone}
                  </a>
                </div>
                <div>
                  <div className="text-xs text-ink-muted/70 uppercase tracking-wider">Lokasjon</div>
                  <div className="font-medium text-ink">Norge &amp; Sri Lanka</div>
                </div>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">Reiser &amp; Opplevelser</div>
              <ul className="space-y-2.5 text-sm text-ink-muted">
                {mainLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-primary font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Information Links */}
            <div>
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">Informasjon</div>
              <ul className="space-y-2.5 text-sm text-ink-muted">
                {infoLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-primary font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Social Links & Quality Badge */}
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">{dict.sections.social}</div>
              <div className="flex gap-3">
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-ink hover:bg-primary hover:text-white transition-colors text-xs font-semibold"
                  aria-label="Facebook"
                >
                  FB
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-ink hover:bg-primary hover:text-white transition-colors text-xs font-semibold"
                  aria-label="Instagram"
                >
                  IG
                </a>
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-ink hover:bg-primary hover:text-white transition-colors text-xs font-semibold"
                  aria-label="WhatsApp"
                >
                  WA
                </a>
              </div>

              <div className="pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-black/5 text-xs text-ink-muted space-y-1">
                  <div className="font-semibold text-ink">🇳🇴 Norsk Reisekvalitet</div>
                  <div>Personlig rådgivning og skreddersydde reiser i Sri Lanka.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="mt-12 border-t border-black/5 pt-6 text-xs text-ink-muted/80 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>© {new Date().getFullYear()} Norske Lanka Travels · norskelankatravels.no</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
