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
import { getVisibleCommunityQuestionsForSitemap } from "@/lib/community-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = locales.flatMap((locale) =>
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

  const communityQuestions = await getVisibleCommunityQuestionsForSitemap();
  const communityRoutes = locales.flatMap((locale) =>
    communityQuestions.map((question) => {
      const path = `/community/${question.slug}`;

      return {
        url: getAbsoluteLocalizedUrl(locale, path),
        lastModified: new Date(question.updatedAt || question.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.65,
        alternates: {
          languages: getRouteAlternateUrls(path),
        },
      };
    }),
  );

  return [...staticRoutes, ...communityRoutes];
}
