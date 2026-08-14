"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { stats } from "@/content/copy";

/** Formats the running count back into the display string, e.g. 1000000 -> "$1M+". */
function format(value: number, target: number, prefix: string, suffix: string, display: string) {
  if (value >= target) return display;
  if (target >= 1_000_000) return `${prefix}${(value / 1_000_000).toFixed(2)}M${suffix}`;
  return `${prefix}${Math.round(value).toLocaleString("en-CA")}${suffix}`;
}

function CountUp({
  target,
  prefix,
  suffix,
  display,
  play,
}: {
  target: number;
  prefix: string;
  suffix: string;
  display: string;
  play: boolean;
}) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!play || reduced) {
      if (reduced) setValue(target);
      return;
    }
    const duration = 1400;
    let raf = 0;
    let start: number | null = null;

    const tick = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min((t - start) / duration, 1);
      // easeOutExpo — fast start, gentle settle.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, reduced, target]);

  return (
    <span className="tabular-nums">{format(value, target, prefix, suffix, display)}</span>
  );
}

/** Three large animated numbers with captions (PRD §7.3, repeated at §7.7).
 *  `variant="cards"` is the boxed treatment used under the framework steps. */
export function StatBar({ variant = "plain", className }: { variant?: "plain" | "cards"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 gap-px sm:grid-cols-3",
        variant === "cards" ? "gap-4 sm:gap-4" : "",
        className,
      )}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.display}
          className={cn(
            "flex flex-col items-center gap-2 px-6 py-7 text-center",
            variant === "cards"
              ? "rounded-[var(--radius-card)] border border-line bg-ink-card"
              : i > 0 && "sm:border-l sm:border-line",
          )}
        >
          <p className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            <CountUp
              target={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              display={stat.display}
              play={inView}
            />
          </p>
          <p className="text-sm leading-relaxed whitespace-pre-line text-muted">{stat.caption}</p>
        </div>
      ))}
    </div>
  );
}
