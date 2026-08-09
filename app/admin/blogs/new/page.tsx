import { redirect } from "next/navigation";
import { BlogEditorForm } from "@/components/admin/BlogEditorForm";
import { isAdminAuthenticated } from "@/lib/auth";

export default async function NewBlogPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  return (
    <div>
      <h1 className="font-display text-3xl text-ink">New blog / notice</h1>
      <div className="mt-6">
        <BlogEditorForm />
      </div>
    </div>
  );
}
