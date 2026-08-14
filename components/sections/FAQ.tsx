"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { TrustLine } from "@/components/ui/TrustLine";
import { Reveal } from "@/components/ui/Reveal";
import { faq } from "@/content/copy";

/**
 * PRD §7.13 — accordion, one item open at a time (§9).
 *
 * Hand-built rather than pulled from shadcn/ui (optional per PRD §4) to keep
 * the dependency surface small and the a11y wiring explicit: each trigger is a
 * real button carrying aria-expanded/aria-controls, and panels stay in the DOM
 * with `hidden` so in-page search still finds the answers.
 */
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-ink">
      <div className="shell pb-16 md:pb-24">
        <Reveal>
          <h2 className="text-center text-[length:var(--text-section)] text-white">{faq.headline}</h2>
        </Reveal>

        <Reveal className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
          {faq.items.map((item, i) => {
            const open = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-trigger-${i}`;

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-card"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-white"
                  >
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-accent-up"
                    >
                      {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!open}
                  className="px-5 pb-5"
                >
                  <p className="text-sm leading-relaxed text-muted">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </Reveal>

        <div className="mt-12 flex flex-col items-center gap-4">
          <CTAButton />
          <TrustLine />
        </div>
      </div>
    </section>
  );
}
