import type { MetadataRoute } from "next";
import { meta } from "@/content/copy";

/** Required by `output: "export"` — generated once at build time. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // Static build — every route is public, so nothing to disallow.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${meta.siteUrl}/sitemap.xml`,
  };
}
