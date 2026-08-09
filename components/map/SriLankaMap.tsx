"use client";

import Link from "next/link";
import { useState } from "react";
import type { Destination, Locale } from "@/lib/data/types";
import { t } from "@/lib/i18n/dictionaries";

export function SriLankaMap({
  destinations,
  locale,
}: {
  destinations: Destination[];
  locale: Locale;
}) {
  const [active, setActive] = useState<string | null>(null);
  const current = destinations.find((d) => d.id === active) ?? destinations[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="glass-strong relative overflow-hidden rounded-[var(--radius-lg)] p-4 md:p-6">
        <svg viewBox="0 0 100 120" className="mx-auto h-auto w-full max-w-md">
          <defs>
            <linearGradient id="island" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#66BB6A" />
              <stop offset="100%" stopColor="#102e1c" />
            </linearGradient>
          </defs>
          <path
            d="M48 8 C58 10, 68 18, 70 30 C73 42, 76 50, 72 62 C70 72, 74 82, 68 92 C62 104, 54 112, 44 114 C34 112, 28 100, 26 88 C22 74, 18 62, 22 48 C24 34, 30 18, 40 10 C43 8, 45 7, 48 8 Z"
            fill="url(#island)"
            opacity="0.92"
          />
          <path
            d="M48 8 C58 10, 68 18, 70 30 C73 42, 76 50, 72 62 C70 72, 74 82, 68 92 C62 104, 54 112, 44 114 C34 112, 28 100, 26 88 C22 74, 18 62, 22 48 C24 34, 30 18, 40 10 C43 8, 45 7, 48 8 Z"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.6"
          />
          {destinations.map((d) => (
            <g key={d.id}>
              <circle
                cx={d.mapX}
                cy={d.mapY}
                r={active === d.id || (!active && d.trending) ? 2.8 : 2.1}
                fill={d.trending ? "#A5D6A7" : "#E8F5E9"}
                stroke="#0a1f12"
                strokeWidth="0.4"
                className="cursor-pointer transition"
                onClick={() => setActive(d.id)}
                onMouseEnter={() => setActive(d.id)}
              />
              <text
                x={d.mapX + 3.2}
                y={d.mapY + 1}
                fontSize="3.2"
                fill="#E8F5E9"
                className="pointer-events-none"
              >
                {t(d.name, locale)}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {current && (
        <div className="glass-strong overflow-hidden rounded-[var(--radius-lg)] glass-card-hover">
          <div
            className="h-44 bg-cover bg-center md:h-52"
            style={{ backgroundImage: `url(${current.image})` }}
          />
          <div className="p-5 md:p-6">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-2xl text-ink">{t(current.name, locale)}</h3>
              {current.trending && (
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Trending
                </span>
              )}
            </div>
            <p className="mt-2 leading-relaxed text-ink-muted">{t(current.summary, locale)}</p>
            <Link
              href={`/${locale}/destinations/${current.slug}`}
              className="mt-4 inline-flex items-center gap-1 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              Explore →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
