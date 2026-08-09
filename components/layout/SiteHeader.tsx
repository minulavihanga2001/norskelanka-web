"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { setCurrencyAction, switchLocale } from "@/app/actions/preferences";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
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
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    handleScroll();
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

  const isActive = (href: string) =>
    href === base ? pathname === base : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out px-4 sm:px-6 pointer-events-none ${
          scrolled ? "pt-3" : "pt-4 sm:pt-6"
        }`}
      >
        <div
          className={`pointer-events-auto mx-auto w-full max-w-[1400px] flex justify-between items-center transition-all duration-500 ease-out ${
            scrolled
              ? "border border-black/10 bg-white/40 backdrop-blur-md rounded-full h-14 sm:h-16 px-5 sm:px-6 shadow-2xl text-ink"
              : "border border-white/25 bg-white/15 backdrop-blur-md rounded-full h-16 sm:h-20 px-6 sm:px-8 shadow-xl text-foam"
          }`}
        >
          {/* Logo / Brand Image */}
          <Link href={base} className="group min-w-0 flex items-center shrink-0">
            <img
              src={scrolled ? "/images/header-logo.png" : "/images/header-logo-light.png"}
              alt={dict.brand}
              className={`object-contain transition-all duration-500 ${
                scrolled ? "h-7 sm:h-8" : "h-8 sm:h-10"
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            <ul className="flex items-center gap-1 text-sm font-medium">
              {links.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href} className="relative group">
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-full px-3.5 py-1.5 transition-all duration-300 ${
                        active
                          ? scrolled ? "bg-black/10 text-ink font-semibold shadow-sm backdrop-blur-md" : "bg-white/20 text-white font-semibold shadow-sm backdrop-blur-md"
                          : scrolled ? "text-ink/80 hover:text-ink hover:bg-black/5" : "text-foam/90 hover:text-white hover:bg-white/12"
                      }`}
                    >
                      {link.label}
                    </Link>
                    {active && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary shadow-sm" />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            <form action={switchLocale} className="hidden sm:block">
              <input type="hidden" name="pathname" value={pathname} />
              <CustomDropdown
                name="locale"
                currentValue={locale}
                scrolled={scrolled}
                options={[
                  { value: 'en', label: 'EN', icon: '🇬🇧' },
                  { value: 'no', label: 'NO', icon: '🇳🇴' }
                ]}
              />
            </form>

            <form action={setCurrencyAction} className="hidden sm:block">
              <CustomDropdown
                name="currency"
                currentValue={currency}
                scrolled={scrolled}
                options={[
                  { value: 'NOK', label: 'NOK', icon: 'kr' },
                  { value: 'EUR', label: 'EUR', icon: '€' },
                  { value: 'USD', label: 'USD', icon: '$' }
                ]}
              />
            </form>

            <Link
              href={`${base}/contact`}
              className={`hidden rounded-full bg-gradient-to-r from-primary to-primary-glow px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:shadow-xl hover:shadow-primary/40 md:inline-flex ${
                scrolled ? "py-2 px-4 text-xs sm:text-sm" : "py-2.5 px-5"
              }`}
            >
              {dict.nav.getQuote}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className={`flex items-center justify-center w-10 h-10 rounded-full border backdrop-blur-md transition lg:hidden ${
                scrolled
                  ? "border-black/10 bg-white/50 text-ink hover:bg-white/70"
                  : "border-white/20 bg-white/15 text-foam hover:bg-white/25"
              }`}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <span className="text-base leading-none font-bold">☰</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay + Panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
            onClick={() => setOpen(false)}
          />

          {/* Liquid Glass Slide-In Panel */}
          <div className="relative ml-auto w-[85vw] max-w-sm liquid-glass-popover h-full flex flex-col shadow-2xl border-l border-white/20 text-foam overflow-y-auto outline-none animate-in slide-in-from-right duration-300 ease-out">
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/15">
              <div>
                <img
                  src="/images/header-logo-light.png"
                  alt={dict.brand}
                  className="h-7 object-contain"
                />
              </div>
              <button
                type="button"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-foam hover:bg-white/20 transition-colors"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="flex-1 px-6 py-4 space-y-2">
              {links.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between py-3 px-4 text-base rounded-2xl transition-all ${
                      active
                        ? "bg-white/20 text-white font-semibold border border-white/25 shadow-md"
                        : "text-foam/90 bg-white/5 hover:bg-white/12 border border-transparent"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs opacity-70">→</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-6 border-t border-white/15 bg-white/5 space-y-3 shrink-0">
              <div className="flex gap-2">
                <form action={switchLocale} className="flex-1">
                  <input type="hidden" name="pathname" value={pathname} />
                  <CustomDropdown
                    name="locale"
                    currentValue={locale}
                    fullWidth={true}
                    options={[
                      { value: 'en', label: 'EN', icon: '🇬🇧' },
                      { value: 'no', label: 'NO', icon: '🇳🇴' }
                    ]}
                  />
                </form>

                <form action={setCurrencyAction} className="flex-1 w-full min-w-0">
                  <CustomDropdown
                    name="currency"
                    currentValue={currency}
                    fullWidth={true}
                    options={[
                      { value: 'NOK', label: 'NOK', icon: 'kr' },
                      { value: 'EUR', label: 'EUR', icon: '€' },
                      { value: 'USD', label: 'USD', icon: '$' }
                    ]}
                  />
                </form>
              </div>

              <Link
                href={`${base}/contact`}
                className="block text-center w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30"
                onClick={() => setOpen(false)}
              >
                {dict.nav.getQuote}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

