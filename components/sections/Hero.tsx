import { PlayCircle } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { TrustLine } from "@/components/ui/TrustLine";
import { Reveal } from "@/components/ui/Reveal";
import { hero } from "@/content/copy";

/** PRD §7.2 — eyebrow, oversized h1, subtext, 16:9 video slot, CTA, trust line. */
export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Ambient accent glow behind the hero. Purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(37,99,235,0.22),transparent_70%)]"
      />

      <div className="shell relative pt-12 pb-16 md:pt-20 md:pb-24">
        <Reveal className="flex flex-col items-center text-center">
          <p className="flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.14em] text-alert md:text-xs">
            <span aria-hidden="true">🚨</span>
            {hero.eyebrow}
            <span aria-hidden="true">🚨</span>
          </p>

          <h1 className="mt-5 max-w-4xl text-[length:var(--text-hero)] text-white">
            {hero.headline.map((part, i) => (
              <span key={i} className={"accent" in part && part.accent ? "text-accent-up" : undefined}>
                {part.text}
              </span>
            ))}
          </h1>

          <p className="mt-5 max-w-2xl text-[length:var(--text-lede)] leading-relaxed text-muted">
            {hero.subtext}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <VideoSlot />
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex flex-col items-center gap-4">
          <CTAButton />
          <TrustLine />
        </Reveal>
      </div>
    </section>
  );
}

/** 16:9 embed slot. Accepts a YouTube/Vimeo/Wistia URL via `hero.video.url`;
 *  renders a labelled placeholder card until one is supplied (PRD §7.2, §12). */
function VideoSlot() {
  const { url, title, presenter, posterAlt } = hero.video;

  return (
    <figure className="mx-auto w-full max-w-3xl">
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-card shadow-2xl shadow-black/40">
        <div className="relative aspect-video w-full">
          {url ? (
            <iframe
              src={url}
              title={title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-line bg-ink-soft p-6 text-center">
              <PlayCircle aria-hidden="true" className="size-10 text-accent-up" />
              <p className="font-display text-base font-bold text-white md:text-lg">{title}</p>
              <p className="text-sm text-muted">{presenter}</p>
              <p className="mt-1 text-xs text-muted">{posterAlt}</p>
            </div>
          )}
        </div>
      </div>
      <figcaption className="sr-only">
        {title} — presented by {presenter}
      </figcaption>
    </figure>
  );
}
