import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  listBlogs,
  listDestinations,
  listFaqs,
  listHotels,
  listPackages,
  listReviews,
  listVehicles,
} from "@/lib/data/store";

export default async function AdminDashboardPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const cards = [
    { href: "/admin/blogs", label: "Blog & notices", count: listBlogs().length },
    { href: "/admin/destinations", label: "Destinations", count: listDestinations().length },
    { href: "/admin/packages", label: "Packages", count: listPackages().length },
    { href: "/admin/hotels", label: "Hotels", count: listHotels().length },
    { href: "/admin/transport", label: "Vehicles", count: listVehicles().length },
    { href: "/admin/reviews", label: "Reviews", count: listReviews().length },
    { href: "/admin/faqs", label: "FAQ", count: listFaqs().length },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Dashboard</h1>
      <p className="mt-2 text-ink-muted">
        Manage site content. Changes use Server Actions against in-memory dummy data.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="glass-strong rounded-[1.3rem] p-5 transition hover:-translate-y-0.5"
          >
            <div className="text-3xl font-display text-leaf">{card.count}</div>
            <div className="mt-1 text-ink">{card.label}</div>
          </Link>
        ))}
      </div>
      <Link href="/en" className="mt-8 inline-block text-sm text-leaf">
        ← View public site
      </Link>
    </div>
  );
}
