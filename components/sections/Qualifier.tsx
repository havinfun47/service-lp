import { Check, X } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { TrustLine } from "@/components/ui/TrustLine";
import { Reveal } from "@/components/ui/Reveal";
import { qualifier } from "@/content/copy";

/** PRD §7.6 — for-you / not-for-you split, two columns on desktop, stacked on
 *  mobile. Eight rows each. */
export function Qualifier() {
  return (
    <section className="bg-surface">
      <div className="shell pb-16 md:pb-24">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center text-[length:var(--text-section)] text-ink">
            {qualifier.headline}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-[var(--radius-card)] border border-line bg-ink p-6 md:p-8">
            <h3 className="text-xl font-bold text-white">{qualifier.forYouLabel}</h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {qualifier.forYou.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/90">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-affirm" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={0.08}
            className="rounded-[var(--radius-card)] border border-surface-line bg-surface-soft p-6 md:p-8"
          >
            <h3 className="text-xl font-bold text-ink">{qualifier.notForYouLabel}</h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {qualifier.notForYou.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-on-light"
                >
                  <X aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-alert" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <CTAButton />
          <TrustLine tone="light" />
        </div>
      </div>
    </section>
  );
}
