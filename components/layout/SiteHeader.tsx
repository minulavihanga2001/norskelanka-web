"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { setCurrencyAction, switchLocale } from "@/app/actions/preferences";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Currency, Locale } from "@/lib/data/types";

export function SiteHeader({
  locale,
  currency,
  dict,
}: {
  locale: Locale;
  currency: Currency;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const base = `/${locale}`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: `${base}/packages`, label: dict.nav.packages },
    { href: `${base}/destinations`, label: dict.nav.destinations },
    { href: `${base}/how-it-works`, label: dict.nav.howItWorks },
    { href: `${base}/reviews`, label: dict.nav.reviews },
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/faq`, label: dict.nav.faq },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={`w-full px-4 py-3 text-foam transition-all duration-500 md:px-6 ${
          scrolled
            ? "glass-dark shadow-lg shadow-black/10"
            : "glass-dark"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
          <Link href={base} className="group min-w-0">
            <div className="font-display text-lg tracking-tight transition-colors group-hover:text-secondary md:text-xl">
              {dict.brand}
            </div>
            <div className="truncate text-[11px] text-secondary/75 transition-colors group-hover:text-secondary md:text-xs">
              {dict.tagline}
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-white/12 text-secondary font-medium"
                      : "text-foam/85 hover:bg-white/8 hover:text-secondary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <form action={switchLocale} className="hidden sm:block">
              <input type="hidden" name="pathname" value={pathname} />
              <select
                name="locale"
                defaultValue={locale}
                onChange={(e) => e.currentTarget.form?.requestSubmit()}
                className="rounded-full border border-white/15 bg-white/8 px-2.5 py-1.5 text-xs text-foam backdrop-blur-sm transition hover:bg-white/15 focus:outline-none focus:ring-1 focus:ring-primary/40"
                aria-label={dict.sections.language}
              >
                <option value="en">EN</option>
                <option value="no">NO</option>
              </select>
            </form>
            <form action={setCurrencyAction} className="hidden sm:block">
              <select
                name="currency"
                defaultValue={currency}
                onChange={(e) => e.currentTarget.form?.requestSubmit()}
                className="rounded-full border border-white/15 bg-white/8 px-2.5 py-1.5 text-xs text-foam backdrop-blur-sm transition hover:bg-white/15 focus:outline-none focus:ring-1 focus:ring-primary/40"
                aria-label={dict.sections.currency}
              >
                <option value="NOK">NOK</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </form>
            <Link
              href={`${base}/contact`}
              className="hidden rounded-full bg-gradient-to-b from-primary-glow to-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:from-primary hover:to-primary-dark hover:shadow-xl hover:shadow-primary/40 md:inline-flex"
            >
              {dict.nav.getQuote}
            </Link>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-2 text-sm text-foam backdrop-blur-sm transition hover:bg-white/15 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              <span className="text-xs leading-none">
                {open ? "✕" : "☰"}
              </span>
              Menu
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-400 lg:hidden ${
            open ? "mt-3 max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-[1400px] border-t border-white/10 pt-3">
            <div className="grid gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-white/12 text-secondary font-medium"
                      : "text-foam/85 hover:bg-white/8 hover:text-secondary"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-2 pt-3 pb-1">
              <form action={switchLocale} className="flex-1">
                <input type="hidden" name="pathname" value={pathname} />
                <select
                  name="locale"
                  defaultValue={locale}
                  onChange={(e) => e.currentTarget.form?.requestSubmit()}
                  className="w-full rounded-xl border border-white/15 bg-white/8 px-3 py-2.5 text-sm text-foam backdrop-blur-sm"
                >
                  <option value="en">English</option>
                  <option value="no">Norsk</option>
                </select>
              </form>
              <form action={setCurrencyAction} className="flex-1">
                <select
                  name="currency"
                  defaultValue={currency}
                  onChange={(e) => e.currentTarget.form?.requestSubmit()}
                  className="w-full rounded-xl border border-white/15 bg-white/8 px-3 py-2.5 text-sm text-foam backdrop-blur-sm"
                >
                  <option value="NOK">NOK</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
