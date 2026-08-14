import type { MetadataRoute } from "next";
import { meta } from "@/content/copy";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${meta.siteUrl}/sitemap.xml`,
  };
}
