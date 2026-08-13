"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Destination, Locale } from "@/lib/data/types";
import { t } from "@/lib/i18n/dictionaries";

const SriLankaLeafletMap = dynamic(
  () =>
    import("@/components/map/SriLankaLeafletMap").then(
      (mod) => mod.SriLankaLeafletMap,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[520px] w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-bg-deep to-bg-mid text-sm text-foam/80 md:min-h-[640px]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-mint/30 border-t-mint" />
        Loading map…
      </div>
    ),
  },
);

export function SriLankaMap({
  destinations,
  locale,
}: {
  destinations: Destination[];
  locale: Locale;
}) {
  const initialId = useMemo(
    () => destinations.find((d) => d.trending)?.id ?? destinations[0]?.id ?? null,
    [destinations],
  );
  const [activeId, setActiveId] = useState<string | null>(initialId);
  const current =
    destinations.find((d) => d.id === activeId) ?? destinations[0] ?? null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.75fr] lg:items-stretch">
      <div className="relative h-[min(70vh,720px)] min-h-[520px] w-full overflow-hidden rounded-[1.5rem] md:min-h-[640px]">
        <SriLankaLeafletMap
          destinations={destinations}
          locale={locale}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </div>

      {current ? (
        <div className="glass-strong flex flex-col overflow-hidden rounded-[1.5rem] shadow-lg ring-1 ring-black/5">
          <div className="relative h-52 overflow-hidden md:h-64">
            <div
              className="absolute inset-0 bg-cover bg-center transition duration-500"
              style={{ backgroundImage: `url(${current.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-2xl text-white drop-shadow">
                  {t(current.name, locale)}
                </h3>
                {current.trending && (
                  <span className="rounded-full bg-primary-glow/95 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-bg-deep">
                    Trending
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-5 md:p-6">
            <p className="text-sm font-medium leading-relaxed text-ink">
              {t(current.summary, locale)}
            </p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
              {t(current.description, locale)}
            </p>
            <Link
              href={`/${locale}/destinations/${current.slug}`}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:scale-[1.01] hover:bg-primary-dark sm:w-fit"
            >
              Explore destination →
            </Link>
          </div>
        </div>
      ) : (
        <div className="glass-strong flex items-center justify-center rounded-[1.5rem] p-8 text-ink-muted">
          Select a destination on the map
        </div>
      )}
    </div>
  );
}
