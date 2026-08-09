import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <div className="glass-strong rounded-[var(--radius-lg)] p-10">
        <div className="font-display text-6xl text-primary/30">404</div>
        <h1 className="mt-4 font-display text-3xl text-ink">Page not found</h1>
        <p className="mt-3 text-ink-muted">This page is not available in this language.</p>
        <Link
          href="/en"
          className="mt-6 inline-flex items-center gap-1 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary-glow hover:shadow-xl hover:shadow-primary/30"
        >
          Back home →
        </Link>
      </div>
    </div>
  );
}
