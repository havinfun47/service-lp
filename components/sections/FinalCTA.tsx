import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { finalCta } from "@/content/copy";

/** PRD §7.14 — full-width accent band closing the page. */
export function FinalCTA() {
  return (
    <section className="shell pb-16 md:pb-24">
      <Reveal className="relative overflow-hidden rounded-[var(--radius-card)] bg-accent px-6 py-12 md:px-14 md:py-16">
        {/* Decorative light sweep in the corner. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-white/10 blur-2xl"
        />
        <div className="relative max-w-2xl">
          <h2 className="text-[length:var(--text-section)] text-accent-fg">{finalCta.headline}</h2>
          {/* Full opacity, not /90 — the faded variant lands at 4.48:1 on the
              accent band and misses AA. */}
          <p className="mt-5 text-[length:var(--text-lede)] leading-relaxed text-accent-fg">
            {finalCta.subtext}
          </p>
          <CTAButton
            className="mt-8 bg-ink text-white shadow-none hover:bg-ink-soft"
            showIcon
          />
        </div>
      </Reveal>
    </section>
  );
}
