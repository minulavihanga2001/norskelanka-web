import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-primary-glow to-primary text-white hover:from-primary hover:to-primary-dark shadow-lg shadow-primary/25 border border-primary-glow/40 hover:shadow-xl hover:shadow-primary/35",
  secondary:
    "glass-strong text-ink hover:bg-white/60 border border-white/50",
  ghost: "bg-white/12 text-foam hover:bg-white/22 border border-white/20 backdrop-blur-lg",
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
