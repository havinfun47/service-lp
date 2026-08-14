import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { results } from "@/content/copy";

/** PRD §7.11 — headline, proof badge, and three case-study cards with the
 *  numeric callouts emphasized. */
export function Results() {
  return (
    <section id="our-reviews" className="scroll-mt-24 bg-ink">
      <div className="shell section-y">
        {/* Split only at lg — at md the 20rem sidebar leaves too little room for
            the case-study cards and the grid blows past the viewport. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-start lg:gap-14">
          <Reveal>
            <h2 className="text-[length:var(--text-section)] text-white">{results.headline}</h2>
            <p className="mt-4 text-[length:var(--text-lede)] leading-relaxed text-muted">
              {results.subtext}
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-[var(--radius-card)] border border-line bg-ink-card px-4 py-3">
              <span className="font-display text-2xl font-extrabold text-white">
                {results.proofBadge.rating}
              </span>
              <span className="flex flex-col">
                <span className="flex items-center gap-0.5" role="img" aria-label="Rated 5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} aria-hidden="true" className="size-3 fill-amber-400 text-amber-400" />
                  ))}
                </span>
                <span className="text-xs text-muted">
                  {results.proofBadge.count} {results.proofBadge.label}
                </span>
              </span>
            </div>
          </Reveal>

          <ul className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.caseStudies.map((study, i) => (
              <Reveal
                key={study.client}
                as="li"
                delay={i * 0.08}
                className="flex flex-col rounded-[var(--radius-card)] border border-line bg-ink-card p-6"
              >
                <p className="font-display text-3xl font-extrabold text-accent-up">{study.metric}</p>
                <p className="mt-1 text-xs font-medium tracking-wide text-muted uppercase">
                  {study.metricCaption}
                </p>
                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-white/90">
                  {study.quote}
                </blockquote>
                <p className="mt-5 border-t border-line pt-4 text-sm font-semibold text-white">
                  {study.client}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
