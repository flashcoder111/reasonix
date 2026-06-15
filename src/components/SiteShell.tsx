"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  FileText,
  GitBranch,
  GitFork,
  LogIn,
  ShieldCheck,
} from "lucide-react";
import { ClerkNavAccount } from "@/components/ClerkNavAccount";
import { SidebarNav } from "@/components/SidebarNav";
import { isClerkConfigured } from "@/lib/auth";
import { getContent, getSeoLandingPage, SITE } from "@/lib/content";
import {
  localeConfig,
  locales,
  localizePath,
  stripLocaleFromPathname,
  type Locale,
} from "@/lib/i18n";

function titleFromSegment(segment: string) {
  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getBreadcrumbItems(
  content: ReturnType<typeof getContent>,
  locale: Locale,
  path: string,
) {
  if (path === "/") {
    return [];
  }

  const staticLabel =
    content.navItems.find((item) => item.href === path)?.label ??
    content.legalLinks.find((item) => item.href === path)?.label ??
    getSeoLandingPage(locale, path)?.title;

  if (staticLabel) {
    return [{ href: localizePath(locale, path), label: staticLabel }];
  }

  const segments = path.slice(1).split("/");

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const label =
      href === "/articles"
        ? content.pages.articles.title
        : href === "/community"
          ? content.pages.community.title
          : titleFromSegment(segment);

    return {
      href: localizePath(locale, href),
      label,
    };
  });
}

function getAbsoluteSiteUrl(path: string) {
  return path === "/" ? `${SITE.url}/` : `${SITE.url}${path}`;
}

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale, path } = stripLocaleFromPathname(pathname);
  const content = getContent(locale);
  const footer = content.pages.footer;
  const loginItem = content.navItems.find((item) => item.href === "/login");
  const breadcrumbItems = getBreadcrumbItems(content, locale, path);
  const localizedPath = localizePath(locale, path);
  const siteRootUrl = getAbsoluteSiteUrl("/");
  const pageUrl = getAbsoluteSiteUrl(localizedPath);
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: breadcrumbItems.at(-1)?.label ?? content.site.title,
    isPartOf: { "@id": `${SITE.url}/#website` },
    inLanguage: localeConfig[locale].htmlLang,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE.name,
        item: siteRootUrl,
      },
      ...breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: getAbsoluteSiteUrl(item.href),
      })),
    ],
  };
  const homeJsonLd =
    path === "/"
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${SITE.url}/#organization`,
            name: SITE.name,
            url: siteRootUrl,
            logo: SITE.ogImage,
            sameAs: [SITE.github, SITE.x],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${SITE.url}/#website`,
            name: SITE.name,
            url: siteRootUrl,
            publisher: { "@id": `${SITE.url}/#organization` },
            inLanguage: localeConfig[locale].htmlLang,
          },
        ]
      : [];

  return (
    <div
      lang={localeConfig[locale].htmlLang}
      className="min-h-screen bg-[#f6f7f4] text-slate-950"
    >
      <JsonLdScript data={webPageJsonLd} />
      {breadcrumbItems.length > 0 ? (
        <JsonLdScript data={breadcrumbJsonLd} />
      ) : null}
      {homeJsonLd.map((entry) => (
        <JsonLdScript key={entry["@type"]} data={entry} />
      ))}
      <div className="mx-auto flex w-full max-w-7xl flex-col lg:flex-row">
        <aside className="border-b border-slate-200 bg-white/85 px-4 py-4 backdrop-blur lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:overflow-y-auto lg:border-r lg:border-b-0 lg:px-6 lg:py-6">
          <Link
            href={localizePath(locale, "/")}
            className="flex items-center gap-3"
          >
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-950 text-sm font-semibold text-white">
              RX
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-semibold tracking-tight">
                {SITE.name}
              </span>
              <span className="block truncate text-xs text-slate-500">
                {content.site.shellSubtitle}
              </span>
            </span>
          </Link>

          <div className="mt-5 lg:mt-8">
            <SidebarNav />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white/75 px-4 py-3 backdrop-blur sm:px-6 lg:px-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-500">
                {content.site.lastCheckedLabel}: {SITE.checkedAt}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                {isClerkConfigured ? (
                  <ClerkNavAccount
                    href={localizePath(locale, "/login")}
                    label={loginItem?.label ?? "Login"}
                  />
                ) : (
                  <Link
                    href={localizePath(locale, "/login")}
                    className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-medium text-emerald-950 transition hover:border-emerald-300 hover:bg-emerald-100"
                  >
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    {loginItem?.label ?? "Login"}
                  </Link>
                )}
                <div className="flex rounded-lg border border-slate-200 bg-white p-1">
                  {locales.map((targetLocale) => {
                    const isActive = targetLocale === locale;

                    return (
                      <Link
                        key={targetLocale}
                        href={localizePath(targetLocale, path)}
                        aria-current={isActive ? "page" : undefined}
                        className={[
                          "rounded-md px-2.5 py-1.5 text-xs font-semibold transition",
                          isActive
                            ? "bg-emerald-950 text-white"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                        ].join(" ")}
                      >
                        {localeConfig[targetLocale].shortLabel}
                      </Link>
                    );
                  })}
                </div>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                >
                  <GitBranch className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
                <a
                  href={SITE.deepseekGuide}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-950 px-3 py-2 font-medium text-white transition hover:bg-emerald-900"
                >
                  {content.site.deepseekButtonLabel}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </header>

          <main className="px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
            {breadcrumbItems.length > 0 ? (
              <nav
                aria-label="Breadcrumb"
                className="mb-5 flex flex-wrap items-center gap-1 text-xs font-medium text-slate-500"
              >
                <Link
                  href={localizePath(locale, "/")}
                  className="hover:text-slate-950"
                >
                  {SITE.name}
                </Link>
                {breadcrumbItems.map((item, index) => {
                  const isLast = index === breadcrumbItems.length - 1;

                  return (
                    <span key={item.href} className="inline-flex items-center gap-1">
                      <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                      {isLast ? (
                        <span className="text-slate-700">{item.label}</span>
                      ) : (
                        <Link href={item.href} className="hover:text-slate-950">
                          {item.label}
                        </Link>
                      )}
                    </span>
                  );
                })}
              </nav>
            ) : null}
            {children}
          </main>

          <footer className="border-t border-slate-200 bg-white/45 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-10">
            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.8fr_1.4fr]">
              <div className="min-w-0">
                <Image
                  src="/reasonix-logo.svg"
                  alt="Reasonix logo"
                  width={640}
                  height={160}
                  className="mb-4 h-auto w-44 max-w-full"
                />
                <div className="flex items-center gap-2 font-semibold text-slate-950">
                  <ShieldCheck
                    className="h-4 w-4 text-emerald-800"
                    aria-hidden="true"
                  />
                  {footer.privacyTitle}
                </div>
                <p className="mt-3 leading-6">{footer.privacyBody}</p>
                <p className="mt-2 leading-6 text-slate-500">
                  {content.privacyCommitments[0]}
                </p>
                <div className="mt-5 rounded-lg border border-slate-200 bg-white/70 p-3">
                  <div className="font-semibold text-slate-950">
                    {content.site.contentPrinciplesTitle}
                  </div>
                  <p className="mt-2 leading-6 text-slate-600">
                    {content.site.contentPrinciplesBody}
                  </p>
                  <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-500">
                    {content.privacyCommitments.slice(1).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 font-semibold text-slate-950">
                  <FileText
                    className="h-4 w-4 text-emerald-800"
                    aria-hidden="true"
                  />
                  {footer.legalTitle}
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  {content.legalLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={localizePath(locale, item.href)}
                      className="inline-flex w-fit items-center gap-2 font-medium text-slate-700 hover:text-slate-950"
                    >
                      {item.label}
                      <ArrowUpRight
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-500">
                  {content.sourceLinks.map((source) => (
                    <a
                      key={source.href}
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-slate-950"
                    >
                      {source.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 font-semibold text-slate-950">
                  <GitFork
                    className="h-4 w-4 text-emerald-800"
                    aria-hidden="true"
                  />
                  {footer.accountsTitle}
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {content.officialAccounts.map((account) => (
                    <div
                      key={account.name}
                      className="min-w-0 border-t border-slate-200 pt-3"
                    >
                      <div className="font-medium text-slate-950">
                        {account.name}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {account.context}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        <a
                          href={account.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex max-w-full items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-1 font-medium text-slate-700 hover:border-slate-300 hover:text-slate-950"
                        >
                          <GitFork
                            className="h-3.5 w-3.5 shrink-0"
                            aria-hidden="true"
                          />
                          <span className="truncate">
                            {account.githubLabel}
                          </span>
                          <ExternalLink
                            className="h-3 w-3 shrink-0"
                            aria-hidden="true"
                          />
                        </a>
                        {account.x ? (
                          <a
                            href={account.x}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex max-w-full items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-1 font-medium text-slate-700 hover:border-slate-300 hover:text-slate-950"
                          >
                            <span className="shrink-0 font-semibold">X</span>
                            <span className="truncate">{account.xLabel}</span>
                            <ExternalLink
                              className="h-3 w-3 shrink-0"
                              aria-hidden="true"
                            />
                          </a>
                        ) : (
                          <span className="inline-flex rounded-md border border-slate-200 px-2 py-1 text-slate-500">
                            {account.xLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
