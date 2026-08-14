import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { CTA_LABEL } from "@/content/copy";

/** The single primary CTA style used everywhere (PRD §6), plus a ghost variant
 *  for the nav. Always ≥44px tall for tap targets (PRD §10). */
type Variant = "primary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-transform transition-colors duration-200 ease-out " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] " +
  "motion-reduce:transform-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:bg-accent-hover shadow-lg shadow-accent/20",
  ghost: "border border-line bg-transparent text-white hover:border-accent-up hover:text-accent-up",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-13 px-7 text-base md:text-lg",
};

export function CTAButton({
  href = "#qualify",
  label = CTA_LABEL,
  variant = "primary",
  size = "lg",
  className,
  showIcon = true,
}: {
  href?: string;
  label?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)}>
      {label}
      {showIcon ? <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" /> : null}
    </Link>
  );
}

/** Same visual treatment for real <button> elements (e.g. the form submit). */
export function buttonClass(variant: Variant = "primary", size: Size = "lg") {
  return cn(base, variants[variant], sizes[size]);
}
