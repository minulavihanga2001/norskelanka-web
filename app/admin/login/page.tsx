import { redirect } from "next/navigation";
import { adminLogin } from "@/app/actions/admin";
import { isAdminAuthenticated } from "@/lib/auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-md">
      <div className="glass-strong rounded-[1.4rem] p-8">
        <h1 className="font-display text-3xl text-ink">Admin login</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Dummy session for content management. Default password: <code>admin123</code>
        </p>
        <form action={adminLogin} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-ink-muted">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full rounded-xl border border-black/10 bg-white/80 px-3 py-2.5 outline-none ring-leaf/30 focus:ring-2"
            />
          </div>
          {error && <p className="text-sm text-red-700">Incorrect password.</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-leaf px-4 py-2.5 text-sm font-medium text-white hover:bg-leaf-bright"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
