"use client";

import { useEffect, useState } from "react";
import { CTAButton } from "./CTAButton";

/** Pinned bottom bar on mobile, revealed once the user scrolls past the hero
 *  (PRD §7 global elements). Hidden on desktop, where the nav CTA is visible. */
export function StickyMobileCTA() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShown(!entry.isIntersecting),
      { rootMargin: "-40% 0px 0px 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 p-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
      // Keep it out of the a11y tree and tab order while it is off-screen.
      aria-hidden={!shown}
      inert={!shown ? true : undefined}
    >
      <CTAButton className="w-full" size="lg" />
    </div>
  );
}
