/** Meta Pixel helpers (PRD §11). No-ops safely when the pixel is not configured
 *  or when called during SSR. */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function trackLead() {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Lead");
}

export {};
