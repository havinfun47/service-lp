import type { MetadataRoute } from "next";
import { meta } from "@/content/copy";

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
