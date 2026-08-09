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
          className={`pointer-events-auto mx-auto w-full max-w-[1400px] flex justify-between items-center transition-all duration-500 ease-out overflow-hidden text-foam ${
            scrolled
              ? "border border-white/25 bg-white/15 backdrop-blur-md rounded-full h-14 sm:h-16 px-5 sm:px-6 shadow-2xl"
              : "border border-white/25 bg-white/15 backdrop-blur-md rounded-full h-16 sm:h-20 px-6 sm:px-8 shadow-xl"
          }`}
        >
          {/* Logo / Brand Name */}
          <Link href={base} className="group min-w-0 flex flex-col justify-center">
            <div
              className={`font-display tracking-tight transition-all duration-500 text-foam group-hover:text-secondary ${
                scrolled ? "text-base sm:text-lg" : "text-lg sm:text-xl font-medium"
              }`}
            >
              {dict.brand}
            </div>
            <div
              className={`truncate text-secondary/80 transition-all duration-500 group-hover:text-secondary ${
                scrolled ? "text-[10px] sm:text-[11px]" : "text-[11px] sm:text-xs"
              }`}
            >
              {dict.tagline}
            </div>
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
                          ? "bg-white/20 text-white font-semibold shadow-sm backdrop-blur-md"
                          : "text-foam/90 hover:text-white hover:bg-white/12"
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
              <select
                name="locale"
                defaultValue={locale}
                onChange={(e) => e.currentTarget.form?.requestSubmit()}
                className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs text-foam backdrop-blur-md transition hover:bg-white/25 focus:outline-none focus:ring-1 focus:ring-primary/40 cursor-pointer shadow-sm"
                aria-label={dict.sections.language}
              >
                <option value="en" className="bg-bg-deep text-foam">
                  EN
                </option>
                <option value="no" className="bg-bg-deep text-foam">
                  NO
                </option>
              </select>
            </form>

            <form action={setCurrencyAction} className="hidden sm:block">
              <select
                name="currency"
                defaultValue={currency}
                onChange={(e) => e.currentTarget.form?.requestSubmit()}
                className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs text-foam backdrop-blur-md transition hover:bg-white/25 focus:outline-none focus:ring-1 focus:ring-primary/40 cursor-pointer shadow-sm"
                aria-label={dict.sections.currency}
              >
                <option value="NOK" className="bg-bg-deep text-foam">
                  NOK
                </option>
                <option value="EUR" className="bg-bg-deep text-foam">
                  EUR
                </option>
                <option value="USD" className="bg-bg-deep text-foam">
                  USD
                </option>
              </select>
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
              className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/15 text-foam backdrop-blur-md transition hover:bg-white/25 lg:hidden"
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
                <div className="font-display text-lg text-foam font-medium">
                  {dict.brand}
                </div>
                <div className="text-xs text-secondary/80">{dict.tagline}</div>
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
                  <select
                    name="locale"
                    defaultValue={locale}
                    onChange={(e) => e.currentTarget.form?.requestSubmit()}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-foam backdrop-blur-md"
                  >
                    <option value="en" className="bg-bg-deep text-foam">
                      English
                    </option>
                    <option value="no" className="bg-bg-deep text-foam">
                      Norsk
                    </option>
                  </select>
                </form>

                <form action={setCurrencyAction} className="flex-1">
                  <select
                    name="currency"
                    defaultValue={currency}
                    onChange={(e) => e.currentTarget.form?.requestSubmit()}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-foam backdrop-blur-md"
                  >
                    <option value="NOK" className="bg-bg-deep text-foam">
                      NOK
                    </option>
                    <option value="EUR" className="bg-bg-deep text-foam">
                      EUR
                    </option>
                    <option value="USD" className="bg-bg-deep text-foam">
                      USD
                    </option>
                  </select>
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

