import { ImageResponse } from "next/og";
import { BRAND, meta } from "@/content/copy";

/**
 * Generated OG/Twitter card (PRD §11, §12).
 *
 * Generating it means the social preview is never a 404 while the designed
 * asset in PRD §12 is outstanding. To use a real image instead, drop it at
 * /public/images/og.png, delete this file, and set `openGraph.images` in
 * app/layout.tsx.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = meta.ogImageAlt;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0B0B0F 0%, #101529 55%, #14224A 100%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#2563EB",
              display: "flex",
            }}
          />
          <div style={{ color: "#FFFFFF", fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>
            {BRAND}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            color: "#FFFFFF",
            fontSize: 62,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 940,
          }}
        >
          Booked projects for Canadian drafting firms — on autopilot.
        </div>

        <div style={{ display: "flex", color: "#6E9BFF", fontSize: 28, fontWeight: 600 }}>
          Qualified consults, booked into your calendar.
        </div>
      </div>
    ),
    size,
  );
}
