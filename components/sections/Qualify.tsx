import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "./LeadForm";
import { qualify } from "@/content/copy";

/** PRD §7.12 — the primary conversion block: three numbered value props beside
 *  the lead form, stacked on mobile. */
export function Qualify() {
  return (
    <section id="qualify" className="scroll-mt-24 bg-ink">
      <div className="shell section-y">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center text-[length:var(--text-section)] text-white">
            {qualify.headline}
          </h2>
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <ol className="flex flex-col gap-4">
            {qualify.valueProps.map((prop, i) => (
              <Reveal
                key={prop.title}
                as="li"
                delay={i * 0.08}
                className="flex gap-4 rounded-[var(--radius-card)] border border-line bg-ink-card p-5 md:p-6"
              >
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-accent-fg"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">{prop.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{prop.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.1}>
            <LeadForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
