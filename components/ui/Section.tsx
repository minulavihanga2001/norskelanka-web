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
        <div className="mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {title && (
              <div>
                <span
                  className="mb-3 block h-1 w-11 rounded-full bg-primary"
                  aria-hidden
                />
                <h2 className="font-display text-[1.875rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl md:text-[2.5rem]">
                  {title}
                </h2>
              </div>
            )}
            {subtitle && (
              <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-muted md:mt-3.5 md:text-lg">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
