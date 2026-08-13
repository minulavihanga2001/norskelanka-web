import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/data/types";
import { socialLinks } from "@/lib/data/seed";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;

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
      <div className="w-full px-6 py-14 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Col 1: Brand + blurb */}
            <div className="space-y-4 text-left">
              <Link href={base} className="inline-block transition-transform duration-500 hover:scale-102">
                <img
                  src="/images/logo-full.png"
                  alt={dict.brand}
                  className="h-48 sm:h-56 md:h-64 lg:h-72 w-auto max-w-full object-contain filter drop-shadow-sm"
                />
              </Link>

              <p className="max-w-sm text-sm leading-relaxed text-ink-muted font-normal">
                {dict.sections.footerBlurb}
              </p>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">
                Reiser &amp; Opplevelser
              </div>
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
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">
                Informasjon
              </div>
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

            {/* Col 4: Contact + Social */}
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {dict.nav.contact}
                </div>
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
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {dict.sections.social}
                </div>
                <div className="flex gap-3">
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-ink hover:bg-primary hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4V9.84c0-2.37 1.41-3.68 3.56-3.68 1.03 0 2.11.18 2.11.18v2.33h-1.19c-1.17 0-1.54.73-1.54 1.48v1.78h2.62l-.42 2.9h-2.2V22c4.78-.75 8.44-4.91 8.44-9.93z" />
                    </svg>
                  </a>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-ink hover:bg-primary hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                    </svg>
                  </a>
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-ink hover:bg-primary hover:text-white transition-colors"
                    aria-label="WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                      <path d="M20.5 3.5A10.5 10.5 0 0 0 3.1 17.8L2 22l4.3-1.1A10.5 10.5 0 1 0 20.5 3.5zM12 20.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-2.5.7.7-2.4-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.2-.3.2-.5.1-.2-.1-.9-.3-1.8-1.1-.7-.6-1.1-1.3-1.2-1.5-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4 0-.1 0-.3-.1-.4-.1-.1-.5-1.3-.7-1.8-.2-.4-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.4 2.3.9 2.3.6 2.7.6.4 0 1.3-.5 1.5-1 .2-.5.2-.9.1-1 0-.1-.2-.2-.4-.3z" />
                    </svg>
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
          </div>

          <div className="mt-12 border-t border-black/5 pt-6 text-xs text-ink-muted/80 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>© {new Date().getFullYear()} Norske Lanka Travels · norskelankatravels.no</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
