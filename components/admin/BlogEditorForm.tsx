import { saveBlogAction } from "@/app/actions/admin";
import { MarkdownEditor } from "@/components/blog/MarkdownEditor";
import { Field } from "@/components/admin/Field";
import type { BlogPost } from "@/lib/data/types";

export function BlogEditorForm({ post }: { post?: BlogPost }) {
  return (
    <form action={saveBlogAction} className="glass-strong space-y-5 rounded-[1.4rem] p-6">
      {post && <input type="hidden" name="id" value={post.id} />}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title (EN)" name="titleEn" defaultValue={post?.title.en} required />
        <Field label="Title (NO)" name="titleNo" defaultValue={post?.title.no} required />
        <Field label="Slug" name="slug" defaultValue={post?.slug} />
        <label className="block space-y-1">
          <span className="text-sm text-ink-muted">Kind</span>
          <select
            name="kind"
            defaultValue={post?.kind ?? "blog"}
            className="w-full rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm"
          >
            <option value="blog">Blog</option>
            <option value="notice">Notice</option>
            <option value="announcement">Announcement</option>
          </select>
        </label>
        <Field
          label="Published date"
          name="publishedAt"
          type="date"
          defaultValue={post?.publishedAt ?? new Date().toISOString().slice(0, 10)}
        />
        <Field label="Author" name="author" defaultValue={post?.author ?? "Norske Lanka Travels"} />
        <Field label="Image URL" name="image" defaultValue={post?.image} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Excerpt (EN)"
          name="excerptEn"
          defaultValue={post?.excerpt.en}
          textarea
        />
        <Field
          label="Excerpt (NO)"
          name="excerptNo"
          defaultValue={post?.excerpt.no}
          textarea
        />
      </div>
      <MarkdownEditor
        name="contentEn"
        label="Content (EN) — Markdown"
        defaultValue={post?.content.en}
      />
      <MarkdownEditor
        name="contentNo"
        label="Content (NO) — Markdown"
        defaultValue={post?.content.no}
      />
      <button
        type="submit"
        className="rounded-full bg-leaf px-5 py-2.5 text-sm font-medium text-white hover:bg-leaf-bright"
      >
        Save post
      </button>
    </form>
  );
}
