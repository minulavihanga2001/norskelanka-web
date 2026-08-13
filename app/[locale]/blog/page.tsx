import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { listBlogs } from "@/lib/data/store";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/locale";

export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);
  const posts = listBlogs();

  return (
    <Section title={dict.sections.blogTitle}>
      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/${raw}/blog/${post.slug}`}
            className="glass-strong group overflow-hidden rounded-[var(--radius-lg)] glass-card-hover"
          >
            <div className="relative overflow-hidden">
              <div
                className="h-48 bg-cover bg-center transition duration-600 group-hover:scale-105"
                style={{ backgroundImage: `url(${post.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2">
                {post.kind !== "blog" && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {post.kind === "notice"
                      ? dict.sections.notice
                      : dict.sections.announcement}
                  </span>
                )}
                <span className="text-xs text-ink-muted">{post.publishedAt}</span>
              </div>
              <h2 className="mt-2.5 font-display text-2xl text-ink transition-colors group-hover:text-primary-dark">{t(post.title, raw)}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(post.excerpt, raw)}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-primary-dark">
                {dict.sections.readMore} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
