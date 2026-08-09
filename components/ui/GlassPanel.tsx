import type { ReactNode } from "react";

export function GlassPanel({
  children,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`${dark ? "glass-dark text-foam" : "glass-strong text-ink"} rounded-[var(--radius-lg)] ${className}`}
    >
      {children}
    </div>
  );
}
