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
  const isHome = pathname === base || pathname === `${base}/`;
  /** Detail/hero routes — transparent header until scroll (same as home). List pages stay solid. */
  const hasBleedHero =
    pathname.startsWith(`${base}/destinations/`) ||
    pathname.startsWith(`${base}/packages/`) ||
    pathname.startsWith(`${base}/blog`);
  const usesScrollHeader = isHome || hasBleedHero;
  /** Solid bar by default on plain pages + destinations/packages lists; hero routes wait for scroll */
  const solid = !usesScrollHeader || scrolled;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!usesScrollHeader) return;
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };

    if (usesScrollHeader) {
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      setScrolled(false);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [usesScrollHeader]);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-4 sm:px-6 pointer-events-none ${
          solid ? "pt-3" : "pt-4 sm:pt-6"
        }`}
      >
        <div
          className={`pointer-events-auto mx-auto w-full max-w-[1400px] flex justify-between items-center transition-all duration-500 ease-out ${
            solid
              ? "border border-black/8 bg-white rounded-full h-14 sm:h-16 px-5 sm:px-6 shadow-lg text-ink"
              : "border border-white/25 bg-white/15 backdrop-blur-md rounded-full h-16 sm:h-20 px-6 sm:px-8 shadow-xl text-foam"
          }`}
        >
          <Link href={base} className="group min-w-0 flex items-center shrink-0">
            <img
              src={solid ? "/images/header-logo.png" : "/images/header-logo-light.png"}
              alt={dict.brand}
              className={`object-contain transition-all duration-500 ${
                solid ? "h-7 sm:h-8" : "h-8 sm:h-10"
              }`}
            />
          </Link>

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
                          ? solid
                            ? "bg-black/8 text-ink font-semibold shadow-sm"
                            : "bg-white/20 text-white font-semibold shadow-sm backdrop-blur-md"
                          : solid
                            ? "text-ink/80 hover:text-ink hover:bg-black/5"
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

          <div className="flex items-center gap-2.5">
            <form action={switchLocale} className="hidden sm:block">
              <input type="hidden" name="pathname" value={pathname} />
              <CustomDropdown
                name="locale"
                currentValue={locale}
                scrolled={solid}
                options={[
                  { value: "en", label: "EN", icon: "🇬🇧" },
                  { value: "no", label: "NO", icon: "🇳🇴" },
                ]}
              />
            </form>

            <form action={setCurrencyAction} className="hidden sm:block">
              <input type="hidden" name="pathname" value={pathname} />
              <CustomDropdown
                name="currency"
                currentValue={currency}
                scrolled={solid}
                options={[
                  { value: "NOK", label: "NOK", icon: "kr" },
                  { value: "EUR", label: "EUR", icon: "€" },
                  { value: "USD", label: "USD", icon: "$" },
                ]}
              />
            </form>

            <Link
              href={`${base}/contact`}
              className={`hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:scale-[1.03] active:scale-95 hover:shadow-xl hover:shadow-primary/40 md:inline-flex ${
                solid ? "py-2 px-4 text-xs sm:text-sm" : "py-2.5 px-5"
              }`}
            >
              {dict.nav.getQuote}
            </Link>

            <button
              type="button"
              className={`flex items-center justify-center w-10 h-10 rounded-full border transition lg:hidden ${
                solid
                  ? "border-black/10 bg-black/5 text-ink hover:bg-black/10"
                  : "border-white/20 bg-white/15 text-foam hover:bg-white/25 backdrop-blur-md"
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

      {/* Reserve space on plain pages only — not destinations / packages / blog heroes */}
      {!isHome && !hasBleedHero && (
        <div className="h-20 sm:h-24 shrink-0" aria-hidden />
      )}

      {open && (
        <div className="fixed inset-0 z-[60] flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 transition-opacity"
            onClick={() => setOpen(false)}
          />

          <div className="relative ml-auto flex h-full w-[85vw] max-w-sm flex-col overflow-y-auto border-l border-black/8 bg-white text-ink shadow-2xl outline-none">
            <div className="flex items-center justify-between border-b border-black/8 px-6 py-5">
              <div>
                <img
                  src="/images/header-logo.png"
                  alt={dict.brand}
                  className="h-7 object-contain"
                />
              </div>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/5 text-ink transition-colors hover:bg-black/10"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="flex-1 space-y-2 px-6 py-4">
              {links.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-2xl px-4 py-3 text-base transition-all ${
                      active
                        ? "border border-black/10 bg-black/8 font-semibold text-ink shadow-sm"
                        : "border border-transparent text-ink/80 hover:bg-black/5 hover:text-ink"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="shrink-0 space-y-3 border-t border-black/8 bg-white p-6">
              <div className="flex gap-2">
                <form action={switchLocale} className="flex-1">
                  <input type="hidden" name="pathname" value={pathname} />
                  <CustomDropdown
                    name="locale"
                    currentValue={locale}
                    scrolled={true}
                    fullWidth={true}
                    options={[
                      { value: "en", label: "EN", icon: "🇬🇧" },
                      { value: "no", label: "NO", icon: "🇳🇴" },
                    ]}
                  />
                </form>

                <form action={setCurrencyAction} className="min-w-0 w-full flex-1">
                  <input type="hidden" name="pathname" value={pathname} />
                  <CustomDropdown
                    name="currency"
                    currentValue={currency}
                    scrolled={true}
                    fullWidth={true}
                    options={[
                      { value: "NOK", label: "NOK", icon: "kr" },
                      { value: "EUR", label: "EUR", icon: "€" },
                      { value: "USD", label: "USD", icon: "$" },
                    ]}
                  />
                </form>
              </div>

              <Link
                href={`${base}/contact`}
                className="block w-full rounded-xl bg-primary py-3 text-center text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:bg-primary-dark"
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
