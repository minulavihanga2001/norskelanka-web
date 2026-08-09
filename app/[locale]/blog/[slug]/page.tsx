import { notFound } from "next/navigation";
import { MarkdownView } from "@/components/blog/MarkdownView";
import { Section } from "@/components/ui/Section";
import { getBlog } from "@/lib/data/store";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/locale";

export default async function BlogPostPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const post = getBlog(slug);
  if (!post) notFound();
  const dict = getDictionary(raw);

  return (
    <>
      <section
        className="relative mx-3 mt-3 min-h-[42vh] overflow-hidden rounded-[1.75rem] bg-cover bg-center md:mx-4"
        style={{
          backgroundImage: `linear-gradient(rgba(11,31,20,.55), rgba(11,31,20,.7)), url(${post.image})`,
        }}
      >
        <div className="page-shell flex min-h-[42vh] flex-col justify-end pb-10 pt-24 text-foam">
          {post.kind !== "blog" && (
            <span className="mb-2 w-fit rounded-full bg-leaf-bright px-3 py-1 text-xs font-medium text-bg-deep">
              {post.kind === "notice" ? dict.sections.notice : dict.sections.announcement}
            </span>
          )}
          <h1 className="font-display text-4xl md:text-5xl">{t(post.title, raw)}</h1>
          <p className="mt-3 text-sm text-foam/75">
            {post.author} · {post.publishedAt}
          </p>
        </div>
      </section>
      <Section>
        <article className="glass-strong mx-auto max-w-3xl rounded-[1.4rem] p-6 md:p-10">
          <MarkdownView content={t(post.content, raw)} />
        </article>
      </Section>
    </>
  );
}
