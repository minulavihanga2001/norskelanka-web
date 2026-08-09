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

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const currency = await getCurrency();
  const destinations = listDestinations().filter((d) => d.trending).slice(0, 4);
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
  const heroImage = destinations[0]?.image;

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="hero-grid relative min-h-[82vh] overflow-hidden"
        style={{ ["--hero-image" as string]: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-secondary/8" />
        <div className="page-shell relative flex min-h-[82vh] flex-col justify-end pb-14 pt-32 md:pb-20">
          <p className="animate-rise mb-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-secondary-light">
            <span className="inline-block h-px w-8 bg-primary-glow/70" />
            Norway → Sri Lanka
          </p>
          <h1 className="animate-rise font-display max-w-3xl text-4xl leading-[1.05] text-white drop-shadow-lg md:text-6xl">
            {dict.brand}
          </h1>
          <p className="animate-rise-delay mt-3 font-display max-w-2xl text-2xl text-white/95 md:text-3xl">
            {dict.hero.title}
          </p>
          <p className="animate-rise-delay mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            {dict.hero.subtitle}
          </p>
          <div className="animate-rise-delay mt-8 flex flex-wrap gap-3">
            <Button href={`/${locale}/contact`} variant="primary">
              {dict.hero.cta}
            </Button>
            <Button href={`/${locale}/packages`} variant="ghost">
              {dict.hero.secondary}
            </Button>
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <DestinationCard key={d.id} destination={d} locale={locale} />
          ))}
        </div>
      </Section>

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
        <div className="grid gap-5 md:grid-cols-4">
          {dict.howItWorks.steps.map((step, i) => (
            <div key={step.title} className="glass-strong rounded-[var(--radius-lg)] p-5 glass-card-hover relative overflow-hidden">
              <div className="absolute -right-2 -top-2 font-display text-7xl text-primary/[0.06]">0{i + 1}</div>
              <div className="relative">
                <div className="font-display text-3xl text-primary">0{i + 1}</div>
                <h3 className="mt-3 font-medium text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.text}</p>
              </div>
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
      <Section title={dict.sections.reviews} subtitle={dict.sections.reviewsSub}>
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.id} className="glass-strong overflow-hidden rounded-[var(--radius-lg)] glass-card-hover">
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${review.image})` }}
              />
              <div className="p-5">
                <div className="flex gap-0.5 text-primary-vivid">
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
        <div className="glass-dark animate-float rounded-[var(--radius-xl)] px-8 py-12 text-center text-white md:px-12 animate-pulse-glow">
          <h2 className="font-display text-3xl md:text-4xl">{dict.hero.cta}</h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-white/80">{dict.hero.subtitle}</p>
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
