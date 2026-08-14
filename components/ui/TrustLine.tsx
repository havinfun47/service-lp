import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { TRUST_LINE } from "@/content/copy";

/** Star rating + trust sentence. Repeated beneath most CTAs (PRD §7). */
export function TrustLine({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <div className={cn("flex items-center justify-center gap-2.5", className)}>
      <div className="flex items-center gap-0.5" role="img" aria-label="Rated 5 out of 5 stars">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} aria-hidden="true" className="size-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <span
        className={cn(
          "text-[0.8125rem] font-medium",
          tone === "dark" ? "text-muted" : "text-muted-on-light",
        )}
      >
        {TRUST_LINE}
      </span>
    </div>
  );
}

/** CTA + trust line, the repeated pattern between sections (PRD §7). */
export function CTABlock({
  className,
  tone = "dark",
  children,
}: {
  className?: string;
  tone?: "dark" | "light";
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {children}
      <TrustLine tone={tone} />
    </div>
  );
}
