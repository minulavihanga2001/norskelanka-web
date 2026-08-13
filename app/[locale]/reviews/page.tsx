import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { listReviews } from "@/lib/data/store";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/locale";

export default async function ReviewsPage({
  params,
}: PageProps<"/[locale]/reviews">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);
  const reviews = listReviews();

  return (
    <Section title={dict.sections.reviews} subtitle={dict.sections.reviewsSub}>
      <div className="grid gap-5 md:grid-cols-2">
        {reviews.map((review) => (
          <article key={review.id} className="glass-strong overflow-hidden rounded-[var(--radius-lg)] glass-card-hover">
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${review.image})` }}
            />
            <div className="p-5">
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="mt-3 leading-relaxed text-ink-muted">&ldquo;{t(review.text, raw)}&rdquo;</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-ink">{review.name}</div>
                    <div className="text-xs text-ink-muted">{t(review.country, raw)}</div>
                  </div>
                </div>
                <div className="text-xs text-ink-muted">{review.date}</div>
              </div>
              {review.videoUrl && (
                <a
                  href={review.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  ▶ Watch video
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
