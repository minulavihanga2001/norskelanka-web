import type { ReactNode } from "react";

export function Section({
  title,
  subtitle,
  action,
  children,
  className = "",
  id,
}: {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`page-shell py-14 md:py-20 ${className}`}>
      {(title || action) && (
        <div className="mb-8 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {title && (
              <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2.5 text-base leading-relaxed text-ink-muted md:text-lg">{subtitle}</p>
            )}
          </div>
          {action && (
            <div className="shrink-0">{action}</div>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
