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

  return (
    <footer className="mt-auto w-full">
      <div className="glass-dark w-full px-6 py-12 text-foam md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="font-display text-2xl tracking-tight">{dict.brand}</div>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-secondary/80">{dict.sections.footerBlurb}</p>
              <div className="mt-5 space-y-2 text-sm text-foam/75">
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="block transition-colors hover:text-primary"
                >
                  {socialLinks.email}
                </a>
                <a
                  href={`tel:${socialLinks.phone}`}
                  className="block transition-colors hover:text-primary"
                >
                  {socialLinks.phone}
                </a>
              </div>
            </div>
            <div>
              <div className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">{dict.nav.home}</div>
              <ul className="space-y-2.5 text-sm text-foam/75">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">{dict.sections.social}</div>
              <ul className="space-y-2.5 text-sm text-foam/75">
                <li>
                  <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-white/8 pt-5 text-xs text-foam/50">
            © {new Date().getFullYear()} Norske Lanka Travels · norskelankatravels.no
          </div>
        </div>
      </div>
    </footer>
  );
}
