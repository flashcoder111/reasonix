"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeCheck,
  BookOpen,
  CircleHelp,
  ExternalLink,
  GitBranch,
  GitFork,
  LayoutDashboard,
  LogIn,
  Newspaper,
  Terminal,
} from "lucide-react";
import { getContent } from "@/lib/content";
import { localizePath, stripLocaleFromPathname } from "@/lib/i18n";

const icons = {
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

export function SidebarNav() {
  const pathname = usePathname();
  const { locale, path } = stripLocaleFromPathname(pathname);
  const content = getContent(locale);
  const navItems = content.navItems.filter(
    (item) => item.href !== "/login",
  );
  const commandReference = content.commandReference;

  return (
    <>
      <nav className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
        {navItems.map((item) => {
          const Icon = icons[item.icon];
          const isActive =
            item.href === "/" ? path === "/" : path.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={localizePath(locale, item.href)}
              className={[
                "group flex min-w-max items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
                isActive
                  ? "bg-emerald-950 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
              ].join(" ")}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="font-medium leading-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <section className="mt-6 hidden rounded-lg border border-slate-200 bg-slate-50/80 p-3 lg:block">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
            {commandReference.title}
          </h2>
          <a
            href={commandReference.sourceHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-white hover:text-slate-950"
            aria-label={commandReference.sourceLabel}
            title={commandReference.sourceLabel}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
        <dl className="space-y-2">
          {commandReference.items.map((item) => (
            <div
              key={item.command}
              className="rounded-md bg-white px-2.5 py-2"
            >
              <dt className="min-w-0 break-all font-mono text-[0.72rem] font-semibold leading-5 text-emerald-950">
                {item.command}
              </dt>
              <dd className="mt-1 min-w-0 text-xs leading-4 text-slate-600">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
