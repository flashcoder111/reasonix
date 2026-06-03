export const DEFAULT_LOCALE = "en";

export const locales = ["en", "zh-cn", "zh-tw", "ru"] as const;

export const nonDefaultLocales = ["zh-cn", "zh-tw", "ru"] as const;

export type Locale = (typeof locales)[number];

export type NonDefaultLocale = (typeof nonDefaultLocales)[number];

export const localeConfig = {
  en: {
    label: "English",
    shortLabel: "EN",
    htmlLang: "en",
    ogLocale: "en_US",
  },
  "zh-cn": {
    label: "简体中文",
    shortLabel: "简",
    htmlLang: "zh-CN",
    ogLocale: "zh_CN",
  },
  "zh-tw": {
    label: "繁體中文",
    shortLabel: "繁",
    htmlLang: "zh-TW",
    ogLocale: "zh_TW",
  },
  ru: {
    label: "Русский",
    shortLabel: "RU",
    htmlLang: "ru",
    ogLocale: "ru_RU",
  },
} satisfies Record<
  Locale,
  {
    label: string;
    shortLabel: string;
    htmlLang: string;
    ogLocale: string;
  }
>;

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function isNonDefaultLocale(
  value: string | undefined,
): value is NonDefaultLocale {
  return nonDefaultLocales.includes(value as NonDefaultLocale);
}

export function normalizeLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }

  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.length > 1 && withSlash.endsWith("/")
    ? withSlash.slice(0, -1)
    : withSlash;
}

export function segmentsToPath(segments?: string[]): string {
  if (!segments?.length) {
    return "/";
  }

  return normalizePath(segments.join("/"));
}

export function pathToSegments(path: string): string[] {
  const normalized = normalizePath(path);
  return normalized === "/" ? [] : normalized.slice(1).split("/");
}

export function localizePath(locale: Locale, path = "/"): string {
  const normalized = normalizePath(path);
  const suffix = normalized === "/" ? "" : normalized;

  if (locale === DEFAULT_LOCALE) {
    return suffix || "/";
  }

  return `/${locale}${suffix}`;
}

export function stripLocaleFromPathname(pathname: string): {
  locale: Locale;
  path: string;
} {
  const normalized = normalizePath(pathname);
  const [firstSegment, ...rest] = normalized.slice(1).split("/");

  if (isNonDefaultLocale(firstSegment)) {
    return {
      locale: firstSegment,
      path: normalizePath(rest.join("/") || "/"),
    };
  }

  return {
    locale: DEFAULT_LOCALE,
    path: normalized,
  };
}

export function getAlternatePaths(path: string): Record<string, string> {
  const normalized = normalizePath(path);

  return {
    en: localizePath("en", normalized),
    "zh-CN": localizePath("zh-cn", normalized),
    "zh-TW": localizePath("zh-tw", normalized),
    ru: localizePath("ru", normalized),
  };
}
