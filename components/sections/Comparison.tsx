import { Check, X } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { TrustLine } from "@/components/ui/TrustLine";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND, comparison } from "@/content/copy";

/** PRD §7.10 — two-column comparison, five rows each. Left column is visually
 *  favoured (accent header, checks); right is muted. Built as a real <table>
 *  so the relationship survives screen readers and zoom. */
export function Comparison() {
  const rows = comparison.ours.map((ours, i) => ({ ours, theirs: comparison.theirs[i] }));

  return (
    <section className="bg-surface">
      <div className="shell pb-16 md:pb-24">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center text-[length:var(--text-section)] text-ink">
            {comparison.headline}
          </h2>
        </Reveal>

        <Reveal className="mt-12">
          {/* The scroll container carries its own tab stop and label so keyboard
              users can pan the table on narrow screens. */}
          <div
            className="overflow-x-auto"
            tabIndex={0}
            role="region"
            aria-label={`${BRAND} compared with typical agencies`}
          >
          <table className="w-full min-w-[36rem] border-separate border-spacing-x-4 border-spacing-y-0">
            <caption className="sr-only">
              {BRAND} compared with typical agencies
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-1/2 rounded-t-[var(--radius-card)] bg-accent px-6 py-4 text-center">
                  <span className="font-display text-lg font-extrabold text-accent-fg">{BRAND}</span>
                </th>
                <th
                  scope="col"
                  className="w-1/2 rounded-t-[var(--radius-card)] bg-surface-soft px-6 py-4 text-center"
                >
                  <span className="font-display text-lg font-extrabold text-muted-on-light">
                    {comparison.theirsLabel}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.ours}>
                  <td
                    className={`border-x border-surface-line bg-white px-6 py-4 align-top ${
                      i === rows.length - 1 ? "rounded-b-[var(--radius-card)] border-b" : "border-b"
                    }`}
                  >
                    <span className="flex items-start gap-3 text-sm leading-relaxed text-ink">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-affirm" />
                      {row.ours}
                    </span>
                  </td>
                  <td
                    className={`border-x border-surface-line bg-surface-soft px-6 py-4 align-top ${
                      i === rows.length - 1 ? "rounded-b-[var(--radius-card)] border-b" : "border-b"
                    }`}
                  >
                    <span className="flex items-start gap-3 text-sm leading-relaxed text-muted-on-light">
                      <X aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-deny" />
                      {row.theirs}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col items-center gap-4">
          <CTAButton />
          <TrustLine tone="light" />
        </div>
      </div>
    </section>
  );
}
