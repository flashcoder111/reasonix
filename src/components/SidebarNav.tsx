"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeCheck,
  BookOpen,
  CircleHelp,
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
  const navItems = getContent(locale).navItems.filter(
    (item) => item.href !== "/login",
  );

  return (
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
  );
}
