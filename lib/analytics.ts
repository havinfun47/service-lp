/** Meta Pixel helpers (PRD §11). No-ops safely when the pixel is not configured
 *  or when called during SSR. */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** `|| undefined` collapses the empty string that GitHub Actions substitutes
 *  for an undefined variable, so an unset pixel stays genuinely unset rather
 *  than mounting the script with an empty ID. */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || undefined;

export function trackLead() {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Lead");
}

export {};
