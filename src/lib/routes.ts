import type { Metadata, MetadataRoute } from "next";
import {
  getArticle,
  getArticleRoutes,
  getLocalesForArticle,
} from "@/lib/articles";
import type { CommunityQuestion } from "@/lib/community";
import {
  getContent,
  getSeoLandingPage,
  seoLandingPagePaths,
  SITE,
} from "@/lib/content";
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
  "/community/new",
  "/about",
  "/contact",
  "/faq",
  "/github",
  "/errors",
  "/deepseek",
  ...seoLandingPagePaths,
  "/news",
  "/terms",
  "/privacy",
  "/privacy-protection",
] as const;

export const ROBOTS_DISALLOW_PATHS = ["/api/", "/__clerk/", "/trpc/"] as const;

export const NOINDEX_ROUTE_PATHS = [
  "/login",
  "/community/new",
] as const;

const NOINDEX_EXACT_ROUTE_PATHS = [
  "/articles",
] as const;

export const LEGACY_REDIRECTED_PATHS = [
  "/articles/reasonix-claude-codex-opencode-comparison",
  "/articles/claude-code-vs-codex-vs-opencode",
  "/articles/reasonix-alongside-claude-codex-opencode",
  "/articles/codex-vs-claude-code-for-engineering-teams",
  "/articles/opencode-open-source-agent-vs-closed-agents",
] as const;

const INDEXING_DISALLOW_PATHS = [
  ...ROBOTS_DISALLOW_PATHS,
  ...NOINDEX_ROUTE_PATHS,
  "/_next/",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
] as const;

const LEGACY_REDIRECTED_PATH_SET = new Set<string>(LEGACY_REDIRECTED_PATHS);
const NOINDEX_EXACT_ROUTE_PATH_SET = new Set<string>(
  NOINDEX_EXACT_ROUTE_PATHS,
);

const indexableRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
} satisfies Metadata["robots"];

const noindexRobots = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
} satisfies Metadata["robots"];

function pathMatchesPrefix(path: string, prefix: string): boolean {
  const normalizedPrefix = normalizePath(prefix);
  return path === normalizedPrefix || path.startsWith(`${normalizedPrefix}/`);
}

export function getAllPagePaths(locale: Locale = DEFAULT_LOCALE): string[] {
  return [...staticPagePaths, ...getArticleRoutes(locale)];
}

export function isIndexableRoutePath(path: string): boolean {
  const normalized = normalizePath(path);

  if (LEGACY_REDIRECTED_PATH_SET.has(normalized)) {
    return false;
  }

  if (NOINDEX_EXACT_ROUTE_PATH_SET.has(normalized)) {
    return false;
  }

  return !INDEXING_DISALLOW_PATHS.some((prefix) =>
    pathMatchesPrefix(normalized, prefix),
  );
}

function getRouteRobots(path: string): Metadata["robots"] {
  return isIndexableRoutePath(path) ? indexableRobots : noindexRobots;
}

export function getIndexablePagePaths(
  locale: Locale = DEFAULT_LOCALE,
): string[] {
  return getAllPagePaths(locale).filter(isIndexableRoutePath);
}

export function getAbsoluteUrl(path: string): string {
  const normalized = normalizePath(path);
  return `${SITE.url}${normalized}`;
}

export function getAbsoluteLocalizedUrl(locale: Locale, path: string): string {
  return getAbsoluteUrl(localizePath(locale, path));
}

function getAlternateLanguageKey(locale: Locale): string {
  return localeConfig[locale].htmlLang;
}

export function getRouteAlternateUrls(path: string): Record<string, string> {
  const normalized = normalizePath(path);
  const articlePrefix = "/articles/";

  if (normalized.startsWith(articlePrefix)) {
    const slug = normalized.slice(articlePrefix.length);
    const entries = getLocalesForArticle(slug).map((locale) => [
      getAlternateLanguageKey(locale),
      getAbsoluteLocalizedUrl(locale, normalized),
    ]);

    return Object.fromEntries([
      ...entries,
      ["x-default", getAbsoluteLocalizedUrl(DEFAULT_LOCALE, normalized)],
    ]);
  }

  const entries = Object.entries(getAlternatePaths(normalized)).map(
    ([lang, href]) => [lang, getAbsoluteUrl(href)],
  );

  return Object.fromEntries([
    ...entries,
    ["x-default", getAbsoluteLocalizedUrl(DEFAULT_LOCALE, normalized)],
  ]);
}

type RouteCopy = {
  title: string;
  description: string;
  keywords?: readonly string[];
};

type TrustRoutePage = "about" | "contact" | "terms";

function getStaticRouteCopy(locale: Locale, path: string): RouteCopy | null {
  const content = getContent(locale);
  const pages = content.pages;
  const normalized = normalizePath(path);

  if (normalized === "/community/new") {
    return {
      title: `${pages.community.metaTitle} | New question`,
      description: pages.community.metaDescription,
    };
  }

  if (normalized.startsWith("/community/")) {
    return {
      title: pages.community.metaTitle,
      description: pages.community.metaDescription,
    };
  }

  const seoLandingPage = getSeoLandingPage(locale, normalized);

  if (seoLandingPage) {
    return {
      title: seoLandingPage.metaTitle,
      description: seoLandingPage.metaDescription,
      keywords: [
        seoLandingPage.primaryKeyword,
        ...seoLandingPage.secondaryKeywords,
      ],
    };
  }

  switch (normalized) {
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
    case "/about":
      return getTrustRouteCopy(locale, "about");
    case "/contact":
      return getTrustRouteCopy(locale, "contact");
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
    case "/terms":
      return getTrustRouteCopy(locale, "terms");
    case "/privacy":
      return {
        title: pages.privacy.metaTitle,
        description: pages.privacy.metaDescription,
      };
    case "/privacy-protection":
      return {
        title: pages.privacyProtection.metaTitle,
        description: pages.privacyProtection.metaDescription,
      };
    default:
      return null;
  }
}

function getTrustRouteCopy(
  locale: Locale,
  page: TrustRoutePage,
): RouteCopy {
  const copy = {
    en: {
      about: {
        title: "About Reasonix",
        description:
          "About Reasonix, an editorial source guide for DeepSeek-native Reasonix setup, downloads, CLI errors, and source verification.",
      },
      contact: {
        title: "Contact Reasonix",
        description:
          "Contact Reasonix for corrections, source updates, privacy questions, and public issue reports about Reasonix setup guides.",
      },
      terms: {
        title: "Terms of Service",
        description:
          "Reasonix terms of service covering editorial use, external links, command responsibility, and community participation.",
      },
    },
    "zh-cn": {
      about: {
        title: "关于 Reasonix",
        description:
          "关于 Reasonix：面向 DeepSeek-native Reasonix 上手、下载、CLI 报错和来源核验的编辑型资料站。",
      },
      contact: {
        title: "联系 Reasonix",
        description:
          "联系 Reasonix：提交更正、来源更新、隐私问题和 Reasonix 使用指南相关公开反馈。",
      },
      terms: {
        title: "服务条款",
        description:
          "Reasonix 服务条款：说明编辑内容、外部链接、命令执行责任和社区参与边界。",
      },
    },
    "zh-tw": {
      about: {
        title: "關於 Reasonix",
        description:
          "關於 Reasonix：面向 DeepSeek-native Reasonix 上手、下載、CLI 錯誤和來源核驗的編輯型資料站。",
      },
      contact: {
        title: "聯絡 Reasonix",
        description:
          "聯絡 Reasonix：提交更正、來源更新、隱私問題和 Reasonix 使用指南相關公開回饋。",
      },
      terms: {
        title: "服務條款",
        description:
          "Reasonix 服務條款：說明編輯內容、外部連結、命令執行責任和社群參與邊界。",
      },
    },
    ru: {
      about: {
        title: "About Reasonix",
        description:
          "About Reasonix: an editorial source guide for DeepSeek-native Reasonix setup, downloads, CLI errors, and source verification.",
      },
      contact: {
        title: "Contact Reasonix",
        description:
          "Contact Reasonix for corrections, source updates, privacy questions, and public issue reports about Reasonix guides.",
      },
      terms: {
        title: "Terms of Service",
        description:
          "Reasonix terms covering editorial use, external links, command responsibility, and community participation.",
      },
    },
  } satisfies Record<Locale, Record<TrustRoutePage, RouteCopy>>;

  return copy[locale][page];
}

export function getRouteMetadata(locale: Locale, path: string): Metadata {
  const normalizedPath = normalizePath(path);
  const articlePrefix = "/articles/";
  const canonical = localizePath(locale, normalizedPath);
  const canonicalUrl = getAbsoluteUrl(canonical);
  const alternateUrls = getRouteAlternateUrls(normalizedPath);

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
        canonical: canonicalUrl,
        languages: alternateUrls,
      },
      openGraph: {
        title: article.title,
        description: article.description,
        type: "article",
        locale: localeConfig[locale].ogLocale,
        url: canonicalUrl,
        publishedTime: article.date,
        images: [
          {
            url: SITE.ogImage,
            width: 640,
            height: 160,
            alt: `${SITE.name} logo`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: SITE.xHandle,
        creator: SITE.xHandle,
        title: article.title,
        description: article.description,
        images: [SITE.ogImage],
      },
      robots: getRouteRobots(normalizedPath),
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
    keywords: [...(copy.keywords ?? getContent(locale).metadataKeywords)],
    alternates: {
      canonical: canonicalUrl,
      languages: alternateUrls,
    },
      openGraph: {
        type: "website",
        locale: localeConfig[locale].ogLocale,
        url: canonicalUrl,
        siteName: SITE.name,
        title: copy.title,
        description: copy.description,
        images: [
          {
            url: SITE.ogImage,
            width: 640,
            height: 160,
            alt: `${SITE.name} logo`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: SITE.xHandle,
        creator: SITE.xHandle,
        title: copy.title,
        description: copy.description,
        images: [SITE.ogImage],
      },
      robots: getRouteRobots(normalizedPath),
    };
}

function getCommunityDescription(body: string): string {
  const normalized = body.replace(/\s+/g, " ").trim();

  if (normalized.length <= 180) {
    return normalized;
  }

  return `${normalized.slice(0, 177).trim()}...`;
}

export function getCommunityQuestionRouteMetadata(
  locale: Locale,
  question: CommunityQuestion,
): Metadata {
  const path = `/community/${question.slug}`;
  const canonical = localizePath(locale, path);
  const canonicalUrl = getAbsoluteUrl(canonical);
  const alternateUrls = getRouteAlternateUrls(path);
  const description = getCommunityDescription(question.body);

  return {
    metadataBase: new URL(SITE.url),
    title: question.title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateUrls,
    },
    openGraph: {
      title: question.title,
      description,
      type: "article",
      locale: localeConfig[locale].ogLocale,
      url: canonicalUrl,
      publishedTime: question.createdAt,
      modifiedTime: question.updatedAt,
      images: [
        {
          url: SITE.ogImage,
          width: 640,
          height: 160,
          alt: `${SITE.name} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.xHandle,
      creator: SITE.xHandle,
      title: question.title,
      description,
      images: [SITE.ogImage],
    },
    robots: indexableRobots,
  };
}

export function getNoindexRouteMetadata(): Metadata {
  return {
    robots: noindexRobots,
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

  if (
    normalized === "/privacy" ||
    normalized === "/privacy-protection" ||
    normalized === "/terms"
  ) {
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

  if (
    normalized === "/privacy" ||
    normalized === "/privacy-protection" ||
    normalized === "/terms"
  ) {
    return 0.45;
  }

  return 0.8;
}

export function getRouteLastModified(path: string): Date {
  const normalized = normalizePath(path);

  if (normalized.startsWith("/articles/")) {
    const article = getArticle(normalized.slice("/articles/".length), DEFAULT_LOCALE);

    if (article) {
      return new Date(article.date);
    }
  }

  const dates: Record<string, string> = {
    "/": SITE.checkedAt,
    "/articles": SITE.checkedAt,
    "/about": "2026-06-05",
    "/contact": "2026-06-05",
    "/faq": SITE.checkedAt,
    "/github": SITE.checkedAt,
    "/errors": SITE.checkedAt,
    "/deepseek": SITE.checkedAt,
    "/news": SITE.checkedAt,
    "/terms": "2026-06-05",
    "/privacy": "2026-06-05",
    "/privacy-protection": "2026-06-05",
  };

  return new Date(dates[normalized] ?? SITE.checkedAt);
}

export function getDefaultRouteMetadata(path: string): Metadata {
  return getRouteMetadata(DEFAULT_LOCALE, path);
}
