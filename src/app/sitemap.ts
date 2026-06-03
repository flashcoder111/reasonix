import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import {
  getAbsoluteLocalizedUrl,
  getAllPagePaths,
  getRouteAlternateUrls,
  getRouteChangeFrequency,
  getRoutePriority,
} from "@/lib/routes";
import { SITE } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    getAllPagePaths(locale).map((path) => ({
      url: getAbsoluteLocalizedUrl(locale, path),
      lastModified: new Date(SITE.checkedAt),
      changeFrequency: getRouteChangeFrequency(path),
      priority: getRoutePriority(path),
      alternates: {
        languages: getRouteAlternateUrls(path),
      },
    })),
  );
}
