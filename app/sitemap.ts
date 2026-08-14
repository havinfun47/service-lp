import type { MetadataRoute } from "next";
import { meta } from "@/content/copy";

/** Required by `output: "export"` — generated once at build time. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: meta.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
