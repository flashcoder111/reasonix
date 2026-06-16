"use client";

import { useState } from "react";
import { Check, Copy, Download, ExternalLink } from "lucide-react";
import type {
  DesktopDownloadCopy,
  DesktopDownloadOption,
} from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type InstallMethod = "npm" | "homebrew" | "desktop";
type DesktopPlatform = DesktopDownloadOption["platform"];

type DownloadInstallTabsProps = {
  locale: Locale;
  desktopDownload: DesktopDownloadCopy;
};

const npmCommand = "npm i -g reasonix@next";
const homebrewCommand = "brew install esengine/reasonix/reasonix";

const copyByLocale = {
  en: {
    copy: "Copy",
    copied: "Copied",
    download: "Download",
    allAssets: "All release assets",
    tabs: {
      npm: "npm",
      homebrew: "Homebrew",
      desktop: "Desktop",
    },
    desktopTabs: {
      macos: "Mac",
      windows: "Windows",
      linux: "Linux",
    },
  },
  "zh-cn": {
    copy: "复制",
    copied: "已复制",
    download: "下载",
    allAssets: "全部资产",
    tabs: {
      npm: "npm",
      homebrew: "Homebrew",
      desktop: "桌面端",
    },
    desktopTabs: {
      macos: "Mac",
      windows: "Windows",
      linux: "Linux",
    },
  },
  "zh-tw": {
    copy: "複製",
    copied: "已複製",
    download: "下載",
    allAssets: "全部資產",
    tabs: {
      npm: "npm",
      homebrew: "Homebrew",
      desktop: "桌面端",
    },
    desktopTabs: {
      macos: "Mac",
      windows: "Windows",
      linux: "Linux",
    },
  },
  ru: {
    copy: "Copy",
    copied: "Copied",
    download: "Download",
    allAssets: "All release assets",
    tabs: {
      npm: "npm",
      homebrew: "Homebrew",
      desktop: "Desktop",
    },
    desktopTabs: {
      macos: "Mac",
      windows: "Windows",
      linux: "Linux",
    },
  },
} satisfies Record<
  Locale,
  {
    copy: string;
    copied: string;
    download: string;
    allAssets: string;
    tabs: Record<InstallMethod, string>;
    desktopTabs: Record<DesktopPlatform, string>;
  }
>;

function getFileName(href: string) {
  return href.split("/").pop() ?? href;
}

function CommandPill({
  command,
  copy,
  copied,
}: {
  command: string;
  copy: string;
  copied: string;
}) {
  const [hasCopied, setHasCopied] = useState(false);

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(command);
      setHasCopied(true);
      window.setTimeout(() => setHasCopied(false), 1600);
    } catch {
      setHasCopied(false);
    }
  }

  return (
    <div className="rx-glass mx-auto flex w-full items-center gap-3 rounded-2xl px-4 py-3 sm:px-5">
      <span className="shrink-0 text-lg font-semibold text-sky-700">
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-sm tracking-normal text-slate-950 sm:text-base">
        {command}
      </code>
      <button
        type="button"
        onClick={copyCommand}
        className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-sky-50 px-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:px-4"
        aria-label={hasCopied ? copied : copy}
      >
        {hasCopied ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
        {hasCopied ? copied : copy}
      </button>
    </div>
  );
}

function DesktopDownloadPill({
  labels,
  option,
}: {
  labels: (typeof copyByLocale)[Locale];
  option: DesktopDownloadOption;
}) {
  return (
    <a
      href={option.href}
      target="_blank"
      rel="noreferrer"
      className="rx-glass mx-auto flex w-full items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-white/70 sm:px-5"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-700">
        <Download className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-slate-950 sm:text-base">
          {labels.download} {labels.desktopTabs[option.platform]}
        </span>
        <span className="block truncate text-xs text-slate-500 sm:text-sm">
          {getFileName(option.href)}
        </span>
      </span>
      <ExternalLink className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
    </a>
  );
}

export function DownloadInstallTabs({
  locale,
  desktopDownload,
}: DownloadInstallTabsProps) {
  const labels = copyByLocale[locale];
  const [activeMethod, setActiveMethod] = useState<InstallMethod>("npm");
  const [activePlatform, setActivePlatform] =
    useState<DesktopPlatform>("macos");
  const selectedDesktop =
    desktopDownload.options.find(
      (option) => option.platform === activePlatform,
    ) ?? desktopDownload.options[0];

  const command =
    activeMethod === "homebrew" ? homebrewCommand : npmCommand;

  return (
    <section className="w-full px-0 py-4 sm:py-5">
      <div className="rx-glass mx-auto grid w-full grid-cols-3 gap-1 rounded-2xl p-1">
        {(["npm", "homebrew", "desktop"] as const).map((method) => {
          const isActive = activeMethod === method;

          return (
            <button
              key={method}
              type="button"
              onClick={() => setActiveMethod(method)}
              className={[
                "min-h-11 rounded-xl px-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300",
                isActive
                  ? "bg-white text-sky-700 shadow-md shadow-slate-950/12"
                  : "text-slate-600 hover:bg-white/60 hover:text-slate-950",
              ].join(" ")}
            >
              {labels.tabs[method]}
            </button>
          );
        })}
      </div>

      {activeMethod === "desktop" ? (
        <div className="mt-5 space-y-4">
          <div className="rx-glass mx-auto grid w-full max-w-sm grid-cols-3 gap-1 rounded-2xl p-1">
            {desktopDownload.options.map((option) => {
              const isActive = activePlatform === option.platform;

              return (
                <button
                  key={option.platform}
                  type="button"
                  onClick={() => setActivePlatform(option.platform)}
                  className={[
                    "min-h-10 rounded-xl px-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300",
                    isActive
                      ? "bg-white text-sky-700 shadow-md shadow-slate-950/12"
                      : "text-slate-600 hover:bg-white/60 hover:text-slate-950",
                  ].join(" ")}
                >
                  {labels.desktopTabs[option.platform]}
                </button>
              );
            })}
          </div>
          {selectedDesktop ? (
            <DesktopDownloadPill labels={labels} option={selectedDesktop} />
          ) : null}
          <div className="text-center">
            <a
              href={desktopDownload.releaseHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800"
            >
              {labels.allAssets}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : (
        <div className="mt-5">
          <CommandPill
            command={command}
            copy={labels.copy}
            copied={labels.copied}
          />
        </div>
      )}
    </section>
  );
}
