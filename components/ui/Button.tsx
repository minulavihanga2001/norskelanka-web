import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25 border border-primary/40 hover:shadow-xl hover:shadow-primary/35",
  secondary:
    "glass-strong text-ink hover:bg-white/60 border border-white/50",
  ghost: "border border-white/25 bg-white/15 backdrop-blur-md text-foam hover:bg-white/25 transition-all duration-300 shadow-sm",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & ComponentProps<"button">) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 ${styles[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
