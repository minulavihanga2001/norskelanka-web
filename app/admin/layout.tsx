import Link from "next/link";
import { adminLogout } from "@/app/actions/admin";
import { isAdminAuthenticated } from "@/lib/auth";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/blogs", label: "Blog & notices" },
  { href: "/admin/destinations", label: "Destinations" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/hotels", label: "Hotels" },
  { href: "/admin/transport", label: "Transport" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/faqs", label: "FAQ" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdminAuthenticated();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef8f2,#f7fbf8)]">
      {authed && (
        <header className="border-b border-black/5 bg-white/50 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
            <Link href="/admin" className="font-display text-lg text-ink">
              Norske Lanka Admin
            </Link>
            <nav className="flex flex-wrap gap-3 text-sm">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="text-ink-muted hover:text-leaf">
                  {link.label}
                </Link>
              ))}
            </nav>
            <form action={adminLogout}>
              <button
                type="submit"
                className="rounded-full border border-black/10 px-3 py-1.5 text-sm text-ink-muted hover:bg-white"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>
      )}
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
