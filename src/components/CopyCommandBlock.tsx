"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type CopyCommandBlockProps = {
  command: string;
  locale: Locale;
};

const labelsByLocale: Record<
  Locale,
  {
    copy: string;
    copied: string;
  }
> = {
  en: {
    copy: "Copy",
    copied: "Copied",
  },
  "zh-cn": {
    copy: "复制",
    copied: "已复制",
  },
  "zh-tw": {
    copy: "複製",
    copied: "已複製",
  },
  ru: {
    copy: "Copy",
    copied: "Copied",
  },
};

export function CopyCommandBlock({ command, locale }: CopyCommandBlockProps) {
  const [copied, setCopied] = useState(false);
  const labels = labelsByLocale[locale];

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-4 overflow-hidden rounded-lg bg-slate-950">
      <div className="flex items-center justify-end border-b border-white/10 px-3 py-2">
        <button
          type="button"
          onClick={copyCommand}
          className="inline-flex h-8 items-center gap-2 rounded-md border border-white/10 px-2.5 text-xs font-semibold text-slate-200 transition hover:border-emerald-300 hover:text-emerald-200"
          aria-label={copied ? labels.copied : labels.copy}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {copied ? labels.copied : labels.copy}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-5 text-emerald-200">
        {command}
      </pre>
    </div>
  );
}
