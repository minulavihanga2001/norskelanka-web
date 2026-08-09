import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteBlogAction } from "@/app/actions/admin";
import { isAdminAuthenticated } from "@/lib/auth";
import { listBlogs } from "@/lib/data/store";

export default async function AdminBlogsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const posts = listBlogs();

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-ink">Blog & notices</h1>
        <Link
          href="/admin/blogs/new"
          className="rounded-full bg-leaf px-4 py-2 text-sm font-medium text-white"
        >
          New post
        </Link>
      </div>
      <div className="mt-6 space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="glass-strong flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3"
          >
            <div>
              <div className="font-medium text-ink">{post.title.en}</div>
              <div className="text-xs text-ink-muted">
                {post.kind} · {post.publishedAt} · /{post.slug}
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/blogs/${post.id}`}
                className="rounded-full border border-black/10 px-3 py-1.5 text-sm"
              >
                Edit
              </Link>
              <form action={deleteBlogAction}>
                <input type="hidden" name="id" value={post.id} />
                <button
                  type="submit"
                  className="rounded-full border border-red-200 px-3 py-1.5 text-sm text-red-700"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
