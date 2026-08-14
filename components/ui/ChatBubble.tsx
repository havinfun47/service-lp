"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { chatBubble } from "@/content/copy";

/**
 * Persistent bottom-right chat bubble (PRD §7 global elements).
 *
 * Deliberately a wired placeholder — PRD §15 puts the actual chat/AI backend
 * out of scope. To swap in a real widget (Intercom, Crisp, Tawk), replace the
 * body of `handleOpen` with that widget's open call, or mount its embed script
 * here and delete this component from the layout.
 */
export function ChatBubble() {
  const [dismissed, setDismissed] = useState(false);

  function handleOpen() {
    // PLACEHOLDER: wire to your chat widget, e.g. window.Intercom?.("show")
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("chat:open"));
    }
  }

  if (dismissed) return null;

  return (
    // bottom-24 clears the sticky mobile CTA bar; drops to bottom-6 on desktop.
    <div className="fixed right-4 bottom-24 z-50 flex items-center gap-2 md:right-6 md:bottom-6">
      <button
        type="button"
        onClick={handleOpen}
        className="flex min-h-11 items-center gap-2 rounded-full border border-surface-line bg-white px-4 py-2.5 text-[0.8125rem] font-medium text-ink shadow-xl transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transform-none"
      >
        <MessageCircle aria-hidden="true" className="size-4 text-accent" />
        {chatBubble.message}
      </button>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss chat prompt"
        className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-ink-card text-muted transition-colors hover:text-white"
      >
        <X aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}
