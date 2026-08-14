import { Reveal } from "@/components/ui/Reveal";
import { sectionHeadline } from "@/content/copy";

/** PRD §7.4 — the single centred headline as a full-width band. */
export function SectionHeadline() {
  return (
    <section className="bg-surface">
      <div className="shell py-16 md:py-24">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center text-[length:var(--text-section)] text-ink">
            {sectionHeadline}
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
