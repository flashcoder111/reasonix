"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  FileText,
  GitBranch,
  GitFork,
  LayoutDashboard,
  LogIn,
  Newspaper,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { ClerkNavAccount } from "@/components/ClerkNavAccount";
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

const navIcons = {
  layout: LayoutDashboard,
  book: BookOpen,
  login: LogIn,
  community: GitFork,
  help: CircleHelp,
  github: GitBranch,
  terminal: Terminal,
  badge: BadgeCheck,
  newspaper: Newspaper,
} as const;

const mobileNavLabels = {
  layout: "Home",
  book: "Read",
  login: "Login",
  community: "Ask",
  help: "FAQ",
  github: "Git",
  terminal: "CLI",
  badge: "DS",
  newspaper: "News",
} as const;

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
  const navItems = content.navItems.filter((item) => item.href !== "/login");
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
      className="min-h-screen bg-[#f6f7f4] pb-20 text-slate-950 lg:pb-0"
    >
      <JsonLdScript data={webPageJsonLd} />
      {breadcrumbItems.length > 0 ? (
        <JsonLdScript data={breadcrumbJsonLd} />
      ) : null}
      {homeJsonLd.map((entry) => (
        <JsonLdScript key={entry["@type"]} data={entry} />
      ))}
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/72 px-4 py-3 shadow-sm shadow-slate-950/[0.03] backdrop-blur-2xl sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link
            href={localizePath(locale, "/")}
            className="flex min-w-0 shrink-0 items-center gap-3"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#0f172a,#0369a1_58%,#047857)] text-sm font-semibold text-white shadow-sm shadow-sky-900/20">
              RX
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-semibold leading-5 text-slate-950">
                {SITE.name}
              </span>
              <span className="hidden truncate text-xs text-slate-500 sm:block">
                {content.site.shellSubtitle}
              </span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 2xl:flex"
          >
            {navItems.map((item) => {
              const Icon = navIcons[item.icon] ?? LayoutDashboard;
              const href = localizePath(locale, item.href);
              const active =
                path === item.href ||
                (item.href !== "/" && path.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition",
                    active
                      ? "bg-slate-950 text-white shadow-sm"
                      : "text-slate-600 hover:bg-white/70 hover:text-slate-950",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex min-w-0 shrink-0 items-center justify-end gap-1 text-sm sm:gap-2">
                {isClerkConfigured ? (
                  <ClerkNavAccount
                    href={localizePath(locale, "/login")}
                    label={loginItem?.label ?? "Login"}
                  />
                ) : (
                  <Link
                    href={localizePath(locale, "/login")}
                    className="hidden items-center gap-2 rounded-xl bg-sky-50 px-3 py-2 font-semibold text-sky-800 ring-1 ring-sky-100 transition hover:bg-sky-100 sm:inline-flex"
                  >
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    {loginItem?.label ?? "Login"}
                  </Link>
                )}
                <div className="flex rounded-xl bg-white/70 p-1 shadow-sm ring-1 ring-slate-200/80 backdrop-blur-xl">
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
                            ? "bg-slate-950 text-white"
                            : "text-slate-600 hover:bg-white hover:text-slate-950",
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
                  className="hidden items-center gap-2 rounded-xl bg-white/72 px-3 py-2 font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200/80 transition hover:bg-white hover:text-slate-950 md:inline-flex"
                >
                  <GitBranch className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
                <a
                  href={SITE.deepseekGuide}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-950 px-2.5 py-2 font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:gap-2 sm:px-3"
                >
                  <span className="hidden sm:inline">
                    {content.site.deepseekButtonLabel}
                  </span>
                  <span className="sm:hidden">Install</span>
                  <ArrowUpRight
                    className="hidden h-4 w-4 sm:block"
                    aria-hidden="true"
                  />
                </a>
          </div>
        </div>

        <nav
          aria-label="Primary compact"
          className="mx-auto mt-3 hidden max-w-7xl gap-1 overflow-x-auto lg:flex 2xl:hidden"
        >
          {navItems.map((item) => {
            const Icon = navIcons[item.icon] ?? LayoutDashboard;
            const href = localizePath(locale, item.href);
            const active =
              path === item.href ||
              (item.href !== "/" && path.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={[
                  "inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-white/70 hover:text-slate-950",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="mx-auto w-full max-w-7xl">
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

      <nav
        aria-label="Mobile primary"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-[0_-12px_30px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden"
      >
        <div className="flex gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = navIcons[item.icon] ?? LayoutDashboard;
            const href = localizePath(locale, item.href);
            const active =
              path === item.href ||
              (item.href !== "/" && path.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={href}
                aria-current={active ? "page" : undefined}
                aria-label={item.label}
                className={[
                  "flex min-w-11 flex-1 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[10px] font-semibold leading-none transition",
                  active
                    ? "bg-emerald-950 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{mobileNavLabels[item.icon] ?? item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
