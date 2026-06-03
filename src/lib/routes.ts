import type { Metadata, MetadataRoute } from "next";
import { articleRoutes, getArticle } from "@/lib/articles";
import { getContent, SITE } from "@/lib/content";
import {
  DEFAULT_LOCALE,
  getAlternatePaths,
  localeConfig,
  localizePath,
  normalizePath,
  type Locale,
} from "@/lib/i18n";

export const staticPagePaths = [
  "/",
  "/articles",
  "/login",
  "/community",
  "/faq",
  "/github",
  "/errors",
  "/deepseek",
  "/news",
  "/privacy",
  "/privacy-protection",
] as const;

export function getAllPagePaths(): string[] {
  return [...staticPagePaths, ...articleRoutes];
}

export function getAbsoluteUrl(path: string): string {
  const normalized = normalizePath(path);
  return `${SITE.url}${normalized === "/" ? "" : normalized}`;
}

export function getAbsoluteLocalizedUrl(locale: Locale, path: string): string {
  return getAbsoluteUrl(localizePath(locale, path));
}

function getAlternateUrls(path: string): Record<string, string> {
  const entries = Object.entries(getAlternatePaths(path)).map(([lang, href]) => [
    lang,
    getAbsoluteUrl(href),
  ]);

  return Object.fromEntries(entries);
}

type RouteCopy = {
  title: string;
  description: string;
};

function getStaticRouteCopy(locale: Locale, path: string): RouteCopy | null {
  const content = getContent(locale);
  const pages = content.pages;

  switch (normalizePath(path)) {
    case "/":
      return {
        title: content.site.title,
        description: content.site.description,
      };
    case "/articles":
      return {
        title: pages.articles.metaTitle,
        description: pages.articles.metaDescription,
      };
    case "/login":
      return {
        title: pages.login.metaTitle,
        description: pages.login.metaDescription,
      };
    case "/community":
      return {
        title: pages.community.metaTitle,
        description: pages.community.metaDescription,
      };
    case "/faq":
      return {
        title: pages.faq.metaTitle,
        description: pages.faq.metaDescription,
      };
    case "/github":
      return {
        title: pages.github.metaTitle,
        description: pages.github.metaDescription,
      };
    case "/errors":
      return {
        title: pages.errors.metaTitle,
        description: pages.errors.metaDescription,
      };
    case "/deepseek":
      return {
        title: pages.deepseek.metaTitle,
        description: pages.deepseek.metaDescription,
      };
    case "/news":
      return {
        title: pages.news.metaTitle,
        description: pages.news.metaDescription,
      };
    case "/privacy":
      return {
        title: pages.privacy.metaTitle,
        description:
          "Reasonix Watch privacy policy: Clerk handles site login, provider API keys stay local, and article comments are carried by GitHub/giscus.",
      };
    case "/privacy-protection":
      return {
        title: pages.privacyProtection.metaTitle,
        description:
          "Reasonix Watch privacy protection checklist for official links, API keys, and GitHub/giscus comment identity boundaries.",
      };
    default:
      return null;
  }
}

export function getRouteMetadata(locale: Locale, path: string): Metadata {
  const normalizedPath = normalizePath(path);
  const articlePrefix = "/articles/";
  const canonical = localizePath(locale, normalizedPath);
  const alternateUrls = getAlternateUrls(normalizedPath);

  if (normalizedPath.startsWith(articlePrefix)) {
    const article = getArticle(normalizedPath.slice(articlePrefix.length), locale);

    if (!article) {
      return {};
    }

    return {
      metadataBase: new URL(SITE.url),
      title: article.title,
      description: article.description,
      alternates: {
        canonical,
        languages: alternateUrls,
      },
      openGraph: {
        title: article.title,
        description: article.description,
        type: "article",
        locale: localeConfig[locale].ogLocale,
        url: getAbsoluteUrl(canonical),
        publishedTime: article.date,
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.description,
      },
    };
  }

  const copy = getStaticRouteCopy(locale, normalizedPath);

  if (!copy) {
    return {};
  }

  return {
    metadataBase: new URL(SITE.url),
    title: copy.title,
    description: copy.description,
    keywords: [...getContent(locale).metadataKeywords],
    alternates: {
      canonical,
      languages: alternateUrls,
    },
    openGraph: {
      type: "website",
      locale: localeConfig[locale].ogLocale,
      url: getAbsoluteUrl(canonical),
      siteName: SITE.name,
      title: copy.title,
      description: copy.description,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function getRouteChangeFrequency(
  path: string,
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  const normalized = normalizePath(path);

  if (normalized === "/news") {
    return "daily";
  }

  if (normalized.startsWith("/articles/")) {
    return "monthly";
  }

  if (normalized === "/privacy" || normalized === "/privacy-protection") {
    return "yearly";
  }

  return "weekly";
}

export function getRoutePriority(path: string): number {
  const normalized = normalizePath(path);

  if (normalized === "/") {
    return 1;
  }

  if (normalized.startsWith("/articles/")) {
    return 0.75;
  }

  if (normalized === "/privacy" || normalized === "/privacy-protection") {
    return 0.45;
  }

  return 0.8;
}

export function getDefaultRouteMetadata(path: string): Metadata {
  return getRouteMetadata(DEFAULT_LOCALE, path);
}
