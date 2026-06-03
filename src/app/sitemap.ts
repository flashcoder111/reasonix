import type { MetadataRoute } from "next";
import { getAlternatePaths, locales } from "@/lib/i18n";
import {
  getAbsoluteLocalizedUrl,
  getAbsoluteUrl,
  getAllPagePaths,
  getRouteChangeFrequency,
  getRoutePriority,
} from "@/lib/routes";
import { SITE } from "@/lib/content";

function getAlternateUrls(path: string): Record<string, string> {
  return Object.fromEntries(
    Object.entries(getAlternatePaths(path)).map(([lang, href]) => [
      lang,
      getAbsoluteUrl(href),
    ]),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    getAllPagePaths().map((path) => ({
      url: getAbsoluteLocalizedUrl(locale, path),
      lastModified: new Date(SITE.checkedAt),
      changeFrequency: getRouteChangeFrequency(path),
      priority: getRoutePriority(path),
      alternates: {
        languages: getAlternateUrls(path),
      },
    })),
  );
}
