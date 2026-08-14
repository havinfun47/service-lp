import {
  BarChart3,
  CalendarCheck,
  Filter,
  LayoutTemplate,
  Mail,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { TrustLine } from "@/components/ui/TrustLine";
import { Reveal } from "@/components/ui/Reveal";
import { whatGetsBuilt } from "@/content/copy";

const icons: Record<string, LucideIcon> = {
  megaphone: Megaphone,
  layout: LayoutTemplate,
  filter: Filter,
  calendar: CalendarCheck,
  mail: Mail,
  chart: BarChart3,
};

/** PRD §7.8 — six feature cards (3×2 desktop, 1 col mobile) plus the looping
 *  proof ticker. */
export function WhatGetsBuilt() {
  return (
    <section id="what-you-get" className="scroll-mt-24 bg-ink">
      <div className="shell pb-16 md:pb-24">
        <Reveal>
          <h2 className="text-center text-[length:var(--text-section)] text-white">
            {whatGetsBuilt.headline}
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whatGetsBuilt.features.map((feature, i) => {
            const Icon = icons[feature.icon] ?? Megaphone;
            return (
              <Reveal
                key={feature.title}
                as="li"
                delay={(i % 3) * 0.06}
                className="flex flex-col rounded-[var(--radius-card)] border border-line bg-ink-card p-6 transition-colors hover:border-accent/50"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-up">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="text-base font-bold text-white">{feature.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">{feature.description}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <ProofTicker />

      <div className="shell mt-12 flex flex-col items-center gap-4 pb-16 md:pb-24">
        <CTAButton />
        <TrustLine />
      </div>
    </section>
  );
}

/** Seamless horizontal marquee, paused on hover/focus (PRD §9).
 *  The item list is duplicated so the -50% keyframe lands on an exact copy. */
function ProofTicker() {
  const items = whatGetsBuilt.ticker;

  return (
    <div className="ticker-viewport relative overflow-hidden border-y border-line py-4">
      {/* Edge fades so items enter and leave softly. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent"
      />

      <ul className="ticker-track flex w-max items-center gap-10">
        {[...items, ...items].map((item, i) => (
          <li
            key={i}
            /* The second pass is a visual duplicate — hide it from screen
               readers so the list is not announced twice. */
            aria-hidden={i >= items.length ? "true" : undefined}
            className="flex shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap text-white"
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-up" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
