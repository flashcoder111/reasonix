"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { GitBranch, ShieldCheck } from "lucide-react";
import { GISCUS } from "@/lib/content";
import {
  localeConfig,
  localizePath,
  stripLocaleFromPathname,
  type Locale,
} from "@/lib/i18n";

const requiredGiscusValues = [
  GISCUS.repo,
  GISCUS.repoId,
  GISCUS.category,
  GISCUS.categoryId,
];

const commentCopy = {
  en: {
    label: "Community comments",
    pendingTitle: "Comment area is being prepared",
    pendingBody:
      "This site plans to use GitHub Discussions for comments. After a public repository, giscus app, and category are configured, article pages will show the comment box automatically.",
    communityLink: "View community notes",
    boundary:
      "Even when comments are enabled, this site does not store GitHub account data or comment bodies. Comment data is handled by GitHub/giscus OAuth and GitHub Discussions.",
    readyBody:
      "Use your GitHub account to join the discussion. Do not post API keys, tokens, private repository URLs, or complete environment variables.",
  },
  "zh-cn": {
    label: "社区评论",
    pendingTitle: "评论区准备中",
    pendingBody:
      "本站计划用 GitHub Discussions 承载评论。配置独立公开仓库、giscus app 和 category 后，文章页会自动显示评论框。",
    communityLink: "查看社区说明",
    boundary:
      "即使开启评论，本站也不保存 GitHub 账号资料或评论正文；评论数据由 GitHub/giscus OAuth 与 GitHub Discussions 承载。",
    readyBody:
      "使用 GitHub 账号参与讨论。请不要在评论中发布 API Key、token、私有仓库地址或完整环境变量。",
  },
  "zh-tw": {
    label: "社群評論",
    pendingTitle: "評論區準備中",
    pendingBody:
      "本站計畫用 GitHub Discussions 承載評論。配置獨立公開倉庫、giscus app 和 category 後，文章頁會自動顯示評論框。",
    communityLink: "查看社群說明",
    boundary:
      "即使開啟評論，本站也不保存 GitHub 帳號資料或評論正文；評論資料由 GitHub/giscus OAuth 與 GitHub Discussions 承載。",
    readyBody:
      "使用 GitHub 帳號參與討論。請不要在評論中發布 API Key、token、私有倉庫地址或完整環境變數。",
  },
  ru: {
    label: "Комментарии сообщества",
    pendingTitle: "Область комментариев готовится",
    pendingBody:
      "Сайт планирует использовать GitHub Discussions для комментариев. После настройки public repository, giscus app и category на страницах статей появится comment box.",
    communityLink: "Открыть сведения о сообществе",
    boundary:
      "Даже при включенных комментариях сайт не хранит GitHub account data или comment bodies. Данные обрабатываются GitHub/giscus OAuth и GitHub Discussions.",
    readyBody:
      "Используйте GitHub account для обсуждения. Не публикуйте API keys, tokens, private repository URLs или полные environment variables.",
  },
} satisfies Record<
  Locale,
  {
    label: string;
    pendingTitle: string;
    pendingBody: string;
    communityLink: string;
    boundary: string;
    readyBody: string;
  }
>;

export function GiscusComments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { locale } = stripLocaleFromPathname(pathname);
  const isConfigured = requiredGiscusValues.every(Boolean);
  const copy = commentCopy[locale];

  useEffect(() => {
    if (!isConfigured || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", GISCUS.repo);
    script.setAttribute("data-repo-id", GISCUS.repoId);
    script.setAttribute("data-category", GISCUS.category);
    script.setAttribute("data-category-id", GISCUS.categoryId);
    script.setAttribute("data-mapping", GISCUS.mapping);
    script.setAttribute("data-strict", GISCUS.strict);
    script.setAttribute("data-reactions-enabled", GISCUS.reactionsEnabled);
    script.setAttribute("data-emit-metadata", GISCUS.emitMetadata);
    script.setAttribute("data-input-position", GISCUS.inputPosition);
    script.setAttribute("data-theme", GISCUS.theme);
    script.setAttribute("data-lang", GISCUS.lang);

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [isConfigured, locale]);

  if (!isConfigured) {
    return (
      <section
        lang={localeConfig[locale].htmlLang}
        className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
              <GitBranch className="h-4 w-4" aria-hidden="true" />
              {copy.label}
            </div>
            <h2 className="mt-4 text-xl font-semibold text-slate-950">
              {copy.pendingTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              {copy.pendingBody}
            </p>
          </div>
          <Link
            href={localizePath(locale, "/community")}
            className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
          >
            {copy.communityLink}
          </Link>
        </div>
        <div className="mt-5 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <ShieldCheck
            className="mt-0.5 h-5 w-5 shrink-0 text-amber-800"
            aria-hidden="true"
          />
          <p className="text-sm leading-6 text-amber-900">
            {copy.boundary}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      lang={localeConfig[locale].htmlLang}
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
          <GitBranch className="h-4 w-4" aria-hidden="true" />
          {copy.label}
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {copy.readyBody}
        </p>
      </div>
      <div ref={containerRef} />
    </section>
  );
}
