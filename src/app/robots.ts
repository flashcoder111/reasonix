import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";
import { ROBOTS_DISALLOW_PATHS } from "@/lib/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...ROBOTS_DISALLOW_PATHS],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
