"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
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
import { getContent, SITE } from "@/lib/content";
import {
  localeConfig,
  locales,
  localizePath,
  stripLocaleFromPathname,
} from "@/lib/i18n";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale, path } = stripLocaleFromPathname(pathname);
  const content = getContent(locale);
  const footer = content.pages.footer;
  const loginItem = content.navItems.find((item) => item.href === "/login");

  return (
    <div
      lang={localeConfig[locale].htmlLang}
      className="min-h-screen bg-[#f6f7f4] text-slate-950"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col lg:flex-row">
        <aside className="border-b border-slate-200 bg-white/85 px-4 py-4 backdrop-blur lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:border-r lg:border-b-0 lg:px-6 lg:py-6">
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
            {children}
          </main>

          <footer className="border-t border-slate-200 bg-white/45 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-10">
            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.8fr_1.4fr]">
              <div className="min-w-0">
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
