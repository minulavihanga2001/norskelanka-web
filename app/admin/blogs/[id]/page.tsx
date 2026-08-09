import { notFound, redirect } from "next/navigation";
import { BlogEditorForm } from "@/components/admin/BlogEditorForm";
import { isAdminAuthenticated } from "@/lib/auth";
import { getStore } from "@/lib/data/store";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { id } = await params;
  const post = getStore().blogs.find((b) => b.id === id);
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Edit post</h1>
      <div className="mt-6">
        <BlogEditorForm post={post} />
      </div>
    </div>
  );
}
