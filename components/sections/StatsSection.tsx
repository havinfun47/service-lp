import { StatBar } from "@/components/ui/StatBar";
import { Reveal } from "@/components/ui/Reveal";
import { clientLogos, clientsLabel } from "@/content/copy";

/** PRD §7.3 — three animated stats, then the client logo strip. */
export function StatsSection() {
  return (
    <section className="shell pb-16 md:pb-24" aria-label="Results at a glance">
      <StatBar />

      <Reveal className="mt-12 flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-10">
        <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-muted">{clientsLabel}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {clientLogos.map((logo) => (
            <li
              key={logo.name}
              /* PRD §12 — swap for next/image once real logos are supplied. */
              className="flex h-10 min-w-32 items-center justify-center rounded-lg border-2 border-dashed border-line px-4 text-xs font-medium text-muted"
            >
              {logo.name}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
