import { Bot } from "lucide-react";
import { StatBar } from "@/components/ui/StatBar";
import { Reveal } from "@/components/ui/Reveal";
import { AssetPlaceholder } from "@/components/ui/AssetPlaceholder";
import { framework } from "@/content/copy";

/** PRD §7.7 — The DraftFlow Framework: three numbered steps, the qualification
 *  chat mock, and the stats bar repeated below. */
export function Framework() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-ink">
      <div className="shell section-y">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="max-w-3xl text-[length:var(--text-section)] text-white">{framework.headline}</h2>
          <p className="mt-5 max-w-2xl text-[length:var(--text-lede)] leading-relaxed text-muted">
            {framework.subtext}
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {framework.steps.map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              delay={i * 0.08}
              className="flex flex-col rounded-[var(--radius-card)] border border-line bg-ink-card p-6"
            >
              {/* Step 3 shows the qualification chat mock; 1 and 2 await creative. */}
              <div className="mb-6">
                {i === 2 ? (
                  <ChatMock />
                ) : (
                  <AssetPlaceholder
                    label={i === 0 ? "[Ad creative preview]" : "[Landing page preview]"}
                    ratio="aspect-[4/3]"
                  />
                )}
              </div>

              <span
                aria-hidden="true"
                className="grid size-8 place-items-center self-center rounded-full bg-accent text-sm font-bold text-accent-fg"
              >
                {i + 1}
              </span>

              <h3 className="mt-4 text-center text-lg font-bold text-white">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-3 text-center text-sm leading-relaxed text-muted">{step.description}</p>
            </Reveal>
          ))}
        </ol>

        <StatBar variant="cards" className="mt-14" />
      </div>
    </section>
  );
}

/** Stylized mock of the automated qualification exchange (PRD §7.7).
 *  Presentational only — hidden from assistive tech, which reads the step copy. */
function ChatMock() {
  return (
    <div
      aria-hidden="true"
      className="flex aspect-[4/3] flex-col justify-center gap-3 rounded-[var(--radius-card)] border border-line bg-ink-soft p-4"
    >
      {framework.chatMock.map((msg, i) =>
        msg.from === "system" ? (
          <div key={i} className="flex items-start gap-2">
            <p className="flex-1 rounded-xl rounded-tl-sm bg-ink-card px-3 py-2 text-xs leading-snug text-white/90">
              {msg.text}
            </p>
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent-up">
              <Bot className="size-4" />
            </span>
          </div>
        ) : (
          <div key={i} className="flex justify-end">
            <p className="max-w-[80%] rounded-xl rounded-br-sm bg-accent px-3 py-2 text-xs font-medium text-accent-fg">
              {msg.text}
            </p>
          </div>
        ),
      )}
    </div>
  );
}
