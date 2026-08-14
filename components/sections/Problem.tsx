import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { TrustLine } from "@/components/ui/TrustLine";
import { Reveal } from "@/components/ui/Reveal";
import { problem } from "@/content/copy";

/** PRD §7.5 — rhythmic short-line agitation copy on a light surface, with the
 *  three "system does three things" items as highlighted rows. */
export function Problem() {
  return (
    <section className="bg-surface">
      <div className="shell section-y">
        <div className="mx-auto flex max-w-2xl flex-col gap-8 text-center">
          {problem.stanzas.map((stanza, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <Stanza lines={stanza} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-10 flex max-w-2xl flex-col gap-3">
          {problem.systemDoes.map((item) => (
            <p
              key={item}
              className="flex items-center gap-3 rounded-xl border border-surface-line bg-surface-soft px-5 py-4 text-left text-[length:var(--text-lede)] font-semibold text-ink"
            >
              <ArrowRight aria-hidden="true" className="size-5 shrink-0 text-accent" />
              {item}
            </p>
          ))}
        </Reveal>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-8 text-center">
          {problem.closing.map((stanza, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <Stanza lines={stanza} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <CTAButton />
          <TrustLine tone="light" />
        </div>
      </div>
    </section>
  );
}

function Stanza({ lines }: { lines: readonly string[] }) {
  return (
    <p className="text-[length:var(--text-lede)] leading-[1.9] text-muted-on-light">
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </p>
  );
}
