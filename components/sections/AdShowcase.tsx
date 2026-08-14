import { CTAButton } from "@/components/ui/CTAButton";
import { TrustLine } from "@/components/ui/TrustLine";
import { Reveal } from "@/components/ui/Reveal";
import { AssetPlaceholder } from "@/components/ui/AssetPlaceholder";
import { adShowcase } from "@/content/copy";

/**
 * PRD §7.9 — ad creative showcase.
 *
 * Horizontally scrollable on mobile (an intentional exception to the no-
 * horizontal-scroll rule in PRD §10), a grid from `md` up. Swap
 * AssetPlaceholder for next/image once creatives are supplied (PRD §12).
 */
export function AdShowcase() {
  return (
    <section className="bg-surface">
      <div className="shell section-y">
        <Reveal>
          <h2 className="text-center text-[length:var(--text-section)] text-ink">{adShowcase.headline}</h2>
        </Reveal>

        <Reveal className="mt-12">
          <ul
            className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0"
            aria-label="Example ad creatives"
            /* Scrollable regions need a tab stop so keyboard users can pan the
               carousel on mobile (axe: scrollable-region-focusable). */
            tabIndex={0}
          >
            {adShowcase.ads.map((ad) => (
              <li key={ad.alt} className="w-64 shrink-0 snap-start md:w-auto">
                <AssetPlaceholder label={ad.alt} ratio="aspect-[4/5]" tone="light" />
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 flex flex-col items-center gap-4">
          <CTAButton />
          <TrustLine tone="light" />
        </div>
      </div>
    </section>
  );
}
