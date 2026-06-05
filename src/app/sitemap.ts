import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import {
  getAbsoluteLocalizedUrl,
  getIndexablePagePaths,
  getRouteAlternateUrls,
  getRouteChangeFrequency,
  getRouteLastModified,
  getRoutePriority,
} from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    getIndexablePagePaths(locale).map((path) => ({
      url: getAbsoluteLocalizedUrl(locale, path),
      lastModified: getRouteLastModified(path),
      changeFrequency: getRouteChangeFrequency(path),
      priority: getRoutePriority(path),
      alternates: {
        languages: getRouteAlternateUrls(path),
      },
    })),
  );
}
