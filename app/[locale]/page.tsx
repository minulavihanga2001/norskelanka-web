import Link from "next/link";
import { notFound } from "next/navigation";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  listBlogs,
  listDestinations,
  listFaqs,
  listPackages,
  listReviews,
} from "@/lib/data/store";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/locale";
import { getCurrency } from "@/lib/preferences";

import { RightHeroSlideshow } from "@/components/ui/RightHeroSlideshow";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const currency = await getCurrency();
  const destinations = listDestinations().filter((d) => d.trending).slice(0, 6);
  const packages = listPackages().filter((p) => p.featured).slice(0, 3);
  const reviews = listReviews().slice(0, 3);
  const notices = listBlogs().filter((b) => b.kind !== "blog").slice(0, 2);
  const faqs = listFaqs()
    .slice(0, 4)
    .map((f) => ({
      id: f.id,
      question: t(f.question, locale),
      answer: t(f.answer, locale),
    }));
  const heroImage = "/images/hero-sigiriya-bg.jpg";

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="hero-grid relative min-h-[100vh] flex items-center overflow-hidden"
        style={{ ["--hero-image" as string]: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35 md:from-black/75 md:via-black/45 md:to-transparent" />
        
        <div className="page-shell relative z-10 w-full pb-14 pt-32 md:pb-20 md:pt-36">
          <div className="grid w-full gap-10 items-center lg:grid-cols-12">
            {/* Left Column: Text at Top, Logo in Blurred White Section at Bottom */}
            <div className="lg:col-span-7 space-y-5">
              <div className="animate-rise">
                <img
                  src="/images/logo-white.png"
                  alt={dict.brand}
                  className="h-36 sm:h-44 md:h-52 w-auto object-contain"
                />
              </div>

              <h1 className="animate-rise font-display max-w-2xl text-4xl leading-[1.08] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl font-bold">
                {dict.hero.title}
              </h1>

              <p className="animate-rise-delay max-w-xl text-base leading-relaxed text-white/95 drop-shadow-md sm:text-lg">
                {dict.hero.subtitle}
              </p>

              <div className="animate-rise-delay pt-2 flex flex-wrap items-center gap-3.5">
                <Button href={`/${locale}/contact`} variant="primary" className="shadow-2xl hover:scale-105">
                  {dict.hero.cta}
                </Button>
                <Button href={`/${locale}/packages`} variant="ghost" className="shadow-lg">
                  {dict.hero.secondary}
                </Button>
              </div>
            </div>

            {/* Right Column: Blended Photo Slideshow */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <RightHeroSlideshow />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trending destinations ── */}
      <Section
        title={dict.sections.trending}
        subtitle={dict.sections.trendingSub}
        action={
          <Link
            href={`/${locale}/destinations`}
            className="inline-flex items-center gap-1 rounded-full bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
          >
            {dict.sections.viewAll} →
          </Link>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <DestinationCard key={d.id} destination={d} locale={locale} />
          ))}
        </div>
      </Section>

      {/* ── Brand Narrative Emblem Showcase ── */}
      <section className="page-shell py-12">
        <div className="glass-strong rounded-[var(--radius-xl)] p-8 md:p-14 border border-white/60 shadow-xl overflow-hidden relative">
          <div className="grid gap-10 items-center lg:grid-cols-12">
            <div className="lg:col-span-6 flex justify-center">
              <img
                src="/images/logo-full.png"
                alt={dict.brand}
                className="h-96 sm:h-[460px] md:h-[500px] w-auto object-contain transition-transform duration-500 hover:scale-103 drop-shadow-2xl"
              />
            </div>
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary border border-primary/20">
                Connecting Norway &amp; Sri Lanka
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-ink font-semibold leading-tight">
                Bridging Nordic Excellence with Sri Lankan Wonder
              </h2>
              <p className="leading-relaxed text-ink-muted text-base md:text-lg">
                Our emblem represents the union of two unique worlds — Norway’s soaring fjords and Sri Lanka’s lush tropical paradise. We craft unforgettable, tailor-made journeys designed with Nordic reliability and warm Sri Lankan hospitality.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-3">
                <div className="p-4 rounded-2xl bg-white/60 border border-white/80 shadow-sm">
                  <div className="font-semibold text-ink text-sm md:text-base">🇳🇴 Norwegian Standards</div>
                  <div className="text-xs md:text-sm text-ink-muted mt-1">Trust, safety &amp; seamless planning</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/60 border border-white/80 shadow-sm">
                  <div className="font-semibold text-ink text-sm md:text-base">🇱🇰 Local Expertise</div>
                  <div className="text-xs md:text-sm text-ink-muted mt-1">Authentic island experiences</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why choose us ── */}
      <Section title={dict.why.title}>
        <div className="grid gap-5 md:grid-cols-2">
          {dict.why.items.map((item, i) => (
            <div key={item.title} className="glass-strong rounded-[var(--radius-lg)] p-6 glass-card-hover">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/15 font-display text-lg text-primary-vivid">
                {["✦", "◈", "✧", "◉"][i % 4]}
              </div>
              <h3 className="font-display text-xl text-ink">{item.title}</h3>
              <p className="mt-2.5 leading-relaxed text-ink-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── How it works ── */}
      <Section
        title={dict.howItWorks.title}
        subtitle={dict.howItWorks.subtitle}
        action={
          <Link
            href={`/${locale}/how-it-works`}
            className="inline-flex items-center gap-1 rounded-full bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
          >
            {dict.sections.viewAll} →
          </Link>
        }
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {dict.howItWorks.steps.map((step, i) => (
            <div key={step.title} className="glass-strong rounded-[var(--radius-lg)] p-6">
              <div className="font-display text-3xl text-primary">0{i + 1}</div>
              <h3 className="mt-2 font-display text-lg text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Packages ── */}
      <Section
        title={dict.sections.packages}
        subtitle={dict.sections.packagesSub}
        action={
          <Link
            href={`/${locale}/packages`}
            className="inline-flex items-center gap-1 rounded-full bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
          >
            {dict.sections.viewAll} →
          </Link>
        }
      >
        <div className="grid gap-5 md:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              locale={locale}
              currency={currency}
              dict={dict}
            />
          ))}
        </div>
      </Section>

      {/* ── Reviews ── */}
      <Section
        title={dict.sections.reviews}
        action={
          <Link
            href={`/${locale}/reviews`}
            className="inline-flex items-center gap-1 rounded-full bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
          >
            {dict.sections.viewAll} →
          </Link>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.id} className="glass-strong rounded-[var(--radius-lg)] p-6">
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">&ldquo;{t(review.text, locale)}&rdquo;</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xs font-semibold text-primary-dark">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-ink">{review.name}</div>
                    <div className="text-xs text-ink-muted">{t(review.country, locale)}</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ── Notices ── */}
      {notices.length > 0 && (
        <Section title={dict.sections.notices}>
          <div className="grid gap-5 md:grid-cols-2">
            {notices.map((post) => (
              <Link
                key={post.id}
                href={`/${locale}/blog/${post.slug}`}
                className="glass-strong rounded-[var(--radius-lg)] p-6 glass-card-hover group"
              >
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {post.kind === "notice" ? dict.sections.notice : dict.sections.announcement}
                </span>
                <h3 className="mt-3 font-display text-xl text-ink transition-colors group-hover:text-primary-dark">{t(post.title, locale)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(post.excerpt, locale)}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* ── FAQ ── */}
      <Section
        title={dict.sections.faqTitle}
        action={
          <Link
            href={`/${locale}/faq`}
            className="inline-flex items-center gap-1 rounded-full bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
          >
            {dict.sections.viewAll} →
          </Link>
        }
      >
        <div className="mx-auto max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </Section>

      {/* ── CTA Banner ── */}
      <section className="page-shell pb-16">
        <div className="glass-strong rounded-[var(--radius-xl)] px-8 py-14 text-center text-ink md:px-12 border border-white/80 shadow-xl">
          <h2 className="font-display text-3xl md:text-4xl font-semibold">{dict.hero.cta}</h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink-muted">{dict.hero.subtitle}</p>
          <div className="mt-8">
            <Button href={`/${locale}/contact`} variant="primary">
              {dict.nav.getQuote}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
