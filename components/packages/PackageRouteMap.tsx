"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Destination, Locale } from "@/lib/data/types";
import { t } from "@/lib/i18n/dictionaries";

type Labels = {
  routeTitle: string;
  routeSub: string;
  stop: string;
  quickView: string;
  openFull: string;
  close: string;
};

export function PackageRouteMap({
  destinations,
  locale,
  labels,
}: {
  destinations: Destination[];
  locale: Locale;
  labels: Labels;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = destinations.find((d) => d.id === activeId) ?? null;

  useEffect(() => {
    if (!activeId) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveId(null);
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [activeId]);

  if (destinations.length === 0) return null;

  return (
    <>
      <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm md:p-8">
        <div className="mb-6 max-w-2xl">
          <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
            {labels.routeTitle}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-base">
            {labels.routeSub}
          </p>
        </div>

        {/* Desktop / tablet horizontal route */}
        <div className="hidden overflow-x-auto pb-2 md:block">
          <div
            className="min-w-max px-2"
            style={{ minWidth: `${Math.max(destinations.length * 160, 480)}px` }}
          >
            {/* Step numbers */}
            <div className="mb-3 flex justify-between">
              {destinations.map((dest, index) => {
                const selected = dest.id === activeId;
                return (
                  <div key={`n-${dest.id}`} className="flex w-36 justify-center">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shadow-sm transition ${
                        selected
                          ? "bg-primary text-white ring-4 ring-primary/20"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Photos + centered dashed route line */}
            <div className="relative flex justify-between">
              <div
                className="pointer-events-none absolute left-[72px] right-[72px] top-1/2 z-0 -translate-y-1/2 border-t-2 border-dashed border-primary/45"
                aria-hidden
              />
              {destinations.map((dest) => {
                const selected = dest.id === activeId;
                return (
                  <button
                    key={`p-${dest.id}`}
                    type="button"
                    onClick={() => setActiveId(dest.id)}
                    className="group relative z-10 flex w-36 justify-center outline-none"
                  >
                    <span
                      className={`h-[72px] w-[72px] overflow-hidden rounded-full border-4 bg-cover bg-center shadow-md transition duration-300 ${
                        selected
                          ? "scale-105 border-primary"
                          : "border-white group-hover:scale-105 group-hover:border-primary/60"
                      }`}
                      style={{ backgroundImage: `url(${dest.image})` }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Labels */}
            <div className="mt-3 flex justify-between">
              {destinations.map((dest, index) => (
                <button
                  key={`l-${dest.id}`}
                  type="button"
                  onClick={() => setActiveId(dest.id)}
                  className="w-36 text-center outline-none"
                >
                  <span className="block font-display text-base leading-tight text-ink">
                    {t(dest.name, locale)}
                  </span>
                  <span className="mt-1 block text-[11px] font-medium uppercase tracking-wider text-primary">
                    {labels.stop} {index + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical route */}
        <ol className="space-y-0 md:hidden">
          {destinations.map((dest, index) => {
            const selected = dest.id === activeId;
            const isLast = index === destinations.length - 1;
            return (
              <li key={dest.id} className="relative flex gap-4">
                <div className="flex w-12 shrink-0 flex-col items-center">
                  <span
                    className={`z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      selected ? "bg-primary text-white" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {index + 1}
                  </span>
                  {!isLast && (
                    <span
                      className="my-1 w-0 flex-1 border-l-2 border-dashed border-primary/45"
                      aria-hidden
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveId(dest.id)}
                  className={`mb-4 flex flex-1 items-center gap-3 rounded-2xl border p-3 text-left transition ${
                    selected
                      ? "border-primary/30 bg-primary/5"
                      : "border-black/5 bg-[#F7FAF6] hover:border-primary/20"
                  }`}
                >
                  <span
                    className="h-14 w-14 shrink-0 rounded-xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${dest.image})` }}
                  />
                  <span>
                    <span className="block font-display text-lg text-ink">
                      {t(dest.name, locale)}
                    </span>
                    <span className="mt-0.5 block text-xs text-ink-muted line-clamp-2">
                      {t(dest.summary, locale)}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Quick view modal */}
      {active && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center">
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            aria-label={labels.close}
            onClick={() => setActiveId(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="route-quick-view-title"
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-[1.5rem] border border-black/5 bg-white shadow-2xl"
          >
            <div
              className="relative h-48 bg-cover bg-center sm:h-56"
              style={{ backgroundImage: `url(${active.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50"
                aria-label={labels.close}
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-5 right-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-glow">
                  {labels.quickView}
                </p>
                <h3
                  id="route-quick-view-title"
                  className="mt-1 font-display text-2xl text-white sm:text-3xl"
                >
                  {t(active.name, locale)}
                </h3>
              </div>
            </div>
            <div className="space-y-4 p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
                {t(active.summary, locale)}
              </p>
              <p className="text-sm leading-relaxed text-ink-muted line-clamp-4">
                {t(active.description, locale)}
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href={`/${locale}/destinations/${active.slug}`}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-dark"
                >
                  {labels.openFull}
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-black/5"
                >
                  {labels.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
