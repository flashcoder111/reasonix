import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Bug,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  ExternalLink,
  GitBranch,
  GitFork,
  Newspaper,
  ShieldCheck,
  Terminal,
  CircleHelp,
} from "lucide-react";
import { ArticleCarousel } from "@/components/ArticleCarousel";
import { ArticleDiscussionLink } from "@/components/ArticleDiscussionLink";
import { CommunityBoard } from "@/components/CommunityBoard";
import { CommunityQuestionDetail } from "@/components/CommunityQuestionDetail";
import { CommunityQuestionForm } from "@/components/CommunityQuestionForm";
import { CopyCommandBlock } from "@/components/CopyCommandBlock";
import { DownloadInstallTabs } from "@/components/DownloadInstallTabs";
import { LoginExplainer } from "@/components/LoginExplainer";
import { ReasonixAgentVisual } from "@/components/ReasonixAgentVisual";
import { getArticle, getArticles, type Article } from "@/lib/articles";
import type {
  CommunityApiError,
  CommunityQuestionDetailResponse,
  CommunityQuestionListResponse,
} from "@/lib/community";
import { getContent, getSeoLandingPage, SITE } from "@/lib/content";
import { localizePath, normalizePath, type Locale } from "@/lib/i18n";

type LocalizedPageProps = {
  locale: Locale;
};

type ArticlePageProps = LocalizedPageProps & {
  slug: string;
};

type CommunityPageProps = LocalizedPageProps & {
  initialResponse?: CommunityQuestionListResponse | null;
  initialError?: CommunityApiError | null;
};

type CommunityQuestionPageProps = ArticlePageProps & {
  initialDetail?: CommunityQuestionDetailResponse | null;
  initialError?: CommunityApiError | null;
};

type SeoLandingPageProps = LocalizedPageProps & {
  path: string;
};

function getCommentPrivacyCopy(locale: Locale) {
  if (locale === "zh-cn") {
    return {
      commitment:
        "社区问答由 Clerk 会话和 Supabase 数据库承载；不要在问题或回复里发布 provider API Key。",
      cardTitle: "社区数据",
      cardBody:
        "站内问题和回复会保存标题、正文、语言、作者 Clerk ID、显示名、时间和运营状态；不包含 DeepSeek、OpenAI、Anthropic 等服务商密钥。",
      checklist:
        "发帖前删除 API Key、token、私有仓库地址和完整环境变量，只保留最小复现命令、版本和报错摘要。",
    };
  }

  if (locale === "zh-tw") {
    return {
      commitment:
        "社群問答由 Clerk 會話和 Supabase 資料庫承載；不要在問題或回覆裡發布 provider API Key。",
      cardTitle: "社群資料",
      cardBody:
        "站內問題和回覆會保存標題、正文、語言、作者 Clerk ID、顯示名、時間和營運狀態；不包含 DeepSeek、OpenAI、Anthropic 等服務商密鑰。",
      checklist:
        "發文前刪除 API Key、token、私有倉庫地址和完整環境變數，只保留最小復現命令、版本和錯誤摘要。",
    };
  }

  if (locale === "ru") {
    return {
      commitment:
        "Community Q&A хранится через Clerk session и Supabase database; не публикуйте provider API keys в questions или replies.",
      cardTitle: "Community data",
      cardBody:
        "Вопросы и ответы сохраняют title, body, language, author Clerk ID, display name, timestamps и moderation status. Provider keys не должны попадать в posts.",
      checklist:
        "Перед публикацией удалите API keys, tokens, private repository URLs и полные environment variables; оставляйте только minimal reproduction commands, versions и error summary.",
    };
  }

  return {
    commitment:
      "Community Q&A uses the Clerk site session and Supabase database; do not post provider API keys in questions or replies.",
    cardTitle: "Community data",
    cardBody:
      "Site questions and replies store title, body, language, author Clerk ID, display name, timestamps, and moderation status. DeepSeek, OpenAI, Anthropic, and other provider keys stay outside posts.",
    checklist:
      "Before posting, remove API keys, tokens, private repository URLs, and complete environment variables; keep only minimal commands, versions, and error summaries.",
  };
}

function getAbsoluteLocalizedUrl(locale: Locale, path: string) {
  const localizedPath = localizePath(locale, path);
  return localizedPath === "/"
    ? `${SITE.url}/`
    : `${SITE.url}${localizedPath}`;
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

function ArticleJsonLd({
  article,
  locale,
}: {
  article: Article;
  locale: Locale;
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        dateModified: SITE.checkedAt,
        image: [SITE.ogImage],
        mainEntityOfPage: getAbsoluteLocalizedUrl(
          locale,
          `/articles/${article.slug}`,
        ),
        author: {
          "@type": "Organization",
          name: SITE.authorName,
          url: SITE.authorUrl,
        },
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          logo: {
            "@type": "ImageObject",
            url: SITE.ogImage,
          },
        },
      }}
    />
  );
}

function FaqJsonLd({ locale }: LocalizedPageProps) {
  const content = getContent(locale);

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}

function getArticleEditorialCopy(locale: Locale) {
  if (locale === "zh-cn") {
    return {
      authorLabel: "作者",
      reviewedLabel: "编辑审核",
      updatedLabel: "更新",
      evidenceTitle: "编辑说明与局限性",
      evidenceBody:
        "本文以 DeepSeek 官方文档、Reasonix GitHub、npm 包信息和公开 release 为主要来源。页面不会替你执行命令或验证本机环境；安装前仍需重新检查 Node、npm tag、仓库分支和 API Key 配置。",
    };
  }

  if (locale === "zh-tw") {
    return {
      authorLabel: "作者",
      reviewedLabel: "編輯審核",
      updatedLabel: "更新",
      evidenceTitle: "編輯說明與限制",
      evidenceBody:
        "本文以 DeepSeek 官方文件、Reasonix GitHub、npm 套件資訊和公開 release 為主要來源。頁面不會替你執行命令或驗證本機環境；安裝前仍需重新檢查 Node、npm tag、倉庫分支和 API Key 設定。",
    };
  }

  if (locale === "ru") {
    return {
      authorLabel: "Author",
      reviewedLabel: "Editorial review",
      updatedLabel: "Updated",
      evidenceTitle: "Editorial notes and limits",
      evidenceBody:
        "This article is based on DeepSeek documentation, the Reasonix GitHub repository, npm package data, and public releases. It does not execute commands or validate your local machine; re-check Node, npm tags, branches, and API key setup before installing.",
    };
  }

  return {
    authorLabel: "Author",
    reviewedLabel: "Editorial review",
    updatedLabel: "Updated",
    evidenceTitle: "Editorial notes and limitations",
    evidenceBody:
      "This article is based on DeepSeek documentation, the Reasonix GitHub repository, npm package data, and public releases. It does not execute commands or validate your local machine; re-check Node, npm tags, branches, and API key setup before installing.",
  };
}

function getNewsEditorialCopy(locale: Locale) {
  if (locale === "zh-cn") {
    return {
      sourceLabel: "来源",
      impactLabel: "为什么重要",
      actionLabel: "建议动作",
      action:
        "打开原始来源，重新核验日期、版本、tag 和命令，再决定是否安装或更新。",
    };
  }

  if (locale === "zh-tw") {
    return {
      sourceLabel: "來源",
      impactLabel: "為什麼重要",
      actionLabel: "建議動作",
      action:
        "打開原始來源，重新核驗日期、版本、tag 和命令，再決定是否安裝或更新。",
    };
  }

  if (locale === "ru") {
    return {
      sourceLabel: "Source",
      impactLabel: "Why it matters",
      actionLabel: "Suggested action",
      action:
        "Open the original source, re-check dates, versions, tags, and commands, then decide whether to install or update.",
    };
  }

  return {
    sourceLabel: "Source",
    impactLabel: "Why it matters",
    actionLabel: "Suggested action",
    action:
      "Open the original source, re-check dates, versions, tags, and commands, then decide whether to install or update.",
  };
}

function getHomeCommandCards(locale: Locale) {
  if (locale === "zh-cn") {
    return [
      {
        title: "安装",
        description: "需要长期复用本地命令时再全局安装；临时体验仍可使用 npx。",
        command: "npm i -g reasonix@next",
      },
      {
        title: "指向你的仓库",
        description:
          "在目标项目目录启动，让文件上下文、命令输出和项目记忆绑定到正确仓库。",
        command: "cd your-project && reasonix code",
      },
      {
        title: "交给它任务",
        description:
          "用自然语言说明目标；Reasonix 会先规划，再让改动和 diff 可审核。",
        command: "> refactor the auth flow",
      },
      {
        title: "先进入计划模式",
        description: "需要看方案再编辑时，用只读规划控制写入边界。",
        command: "/plan on",
      },
      {
        title: "切换强推理",
        description: "复杂重构或长时间调试时，为下一轮或整段会话使用更强模型设置。",
        command: "/pro",
      },
      {
        title: "诊断配置",
        description: "启动异常时检查 API、配置、hooks 和项目状态。",
        command: "/doctor",
      },
    ] as const;
  }

  if (locale === "zh-tw") {
    return [
      {
        title: "安裝",
        description: "需要長期復用本機命令時再全域安裝；臨時體驗仍可使用 npx。",
        command: "npm i -g reasonix@next",
      },
      {
        title: "指向你的倉庫",
        description:
          "在目標專案目錄啟動，讓檔案上下文、命令輸出和專案記憶綁定到正確倉庫。",
        command: "cd your-project && reasonix code",
      },
      {
        title: "交給它任務",
        description:
          "用自然語言說明目標；Reasonix 會先規劃，再讓改動和 diff 可審核。",
        command: "> refactor the auth flow",
      },
      {
        title: "先進入計畫模式",
        description: "需要先看方案再編輯時，用唯讀規劃控制寫入邊界。",
        command: "/plan on",
      },
      {
        title: "切換強推理",
        description: "複雜重構或長時間除錯時，為下一輪或整段會話使用更強模型設定。",
        command: "/pro",
      },
      {
        title: "診斷設定",
        description: "啟動異常時檢查 API、設定、hooks 和專案狀態。",
        command: "/doctor",
      },
    ] as const;
  }

  if (locale === "ru") {
    return [
      {
        title: "Install",
        description:
          "Use a global install only when you want a reusable local command; npx still works for a trial run.",
        command: "npm i -g reasonix@next",
      },
      {
        title: "Point at your repo",
        description:
          "Start inside the target project so files, command output, and project memory attach to the right repository.",
        command: "cd your-project && reasonix code",
      },
      {
        title: "Give it a task",
        description:
          "Describe the goal in plain language; Reasonix can plan first and keep the diff reviewable.",
        command: "> refactor the auth flow",
      },
      {
        title: "Plan before edits",
        description:
          "Use read-only planning when you want to review the approach before write operations.",
        command: "/plan on",
      },
      {
        title: "Use stronger reasoning",
        description:
          "Switch for a hard refactor or a long debugging path that needs more model effort.",
        command: "/pro",
      },
      {
        title: "Diagnose setup",
        description: "Check API, config, hooks, and project state when startup fails.",
        command: "/doctor",
      },
    ] as const;
  }

  return [
    {
      title: "Install",
      description:
        "Use a global install only when you want a reusable local command; npx still works for a trial run.",
      command: "npm i -g reasonix@next",
    },
    {
      title: "Point at your repo",
      description:
        "Start inside the target project so files, command output, and project memory attach to the right repository.",
      command: "cd your-project && reasonix code",
    },
    {
      title: "Give it a task",
      description:
        "Describe the goal in plain language; Reasonix can plan first and keep the diff reviewable.",
      command: "> refactor the auth flow",
    },
    {
      title: "Plan before edits",
      description:
        "Use read-only planning when you want to review the approach before write operations.",
      command: "/plan on",
    },
    {
      title: "Use stronger reasoning",
      description:
        "Switch for a hard refactor or a long debugging path that needs more model effort.",
      command: "/pro",
    },
    {
      title: "Diagnose setup",
      description: "Check API, config, hooks, and project state when startup fails.",
      command: "/doctor",
    },
  ] as const;
}

function getHomeHeroCopy(locale: Locale) {
  if (locale === "zh-cn") {
    return {
      brand: "Reasonix",
      description: "DeepSeek 原生编码 agent",
    };
  }

  if (locale === "zh-tw") {
    return {
      brand: "Reasonix",
      description: "DeepSeek 原生編碼 agent",
    };
  }

  if (locale === "ru") {
    return {
      brand: "Reasonix",
      description: "DeepSeek-нативный агент для кодирования",
    };
  }

  return {
    brand: "Reasonix",
    description: "DeepSeek native coding agent",
  };
}

function getDownloadVerificationCopy(locale: Locale) {
  if (locale === "zh-cn") {
    return {
      title: "下载前核验",
      items: [
        "先确认当前页面链接到的是 esengine/DeepSeek-Reasonix，而不是镜像仓库、二次打包站或不明下载页。",
        "运行 npx 前用 npm view reasonix dist-tags 和 npm view reasonix engines 核验 tag 与 Node 要求。",
        "选择 desktop release 时检查 release tag、资产文件名、签名文件和发布时间，不要只根据截图判断版本。",
        "从 main-v2 源码构建前先看 README、Makefile、Go 版本和最近 commit，确认自己需要源码级验证。",
      ],
    };
  }

  if (locale === "zh-tw") {
    return {
      title: "下載前核驗",
      items: [
        "先確認目前頁面連到的是 esengine/DeepSeek-Reasonix，而不是鏡像倉庫、二次打包站或不明下載頁。",
        "執行 npx 前用 npm view reasonix dist-tags 和 npm view reasonix engines 核驗 tag 與 Node 要求。",
        "選擇 desktop release 時檢查 release tag、資產檔名、簽名檔和發布時間，不要只根據截圖判斷版本。",
        "從 main-v2 原始碼構建前先看 README、Makefile、Go 版本和最近 commit，確認自己需要 source-level verification。",
      ],
    };
  }

  return {
    title: "Before downloading",
    items: [
      "Confirm that the page links to esengine/DeepSeek-Reasonix, not a mirror repository, repackaged installer, or unknown download page.",
      "Before running npx, verify the selected npm tag and Node requirement with npm view reasonix dist-tags and npm view reasonix engines.",
      "For desktop releases, check the release tag, asset names, signature files, and publish time instead of trusting screenshots.",
      "Before building main-v2 from source, review the README, Makefile, Go version, and recent commits to confirm that source-level verification is actually needed.",
    ],
  };
}

function getSourceHost(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

function getLandingDifferentiator(locale: Locale, path: string) {
  const chinese = locale === "zh-cn" || locale === "zh-tw";
  const copy: Record<string, { title: string; body: string; checks: string[] }> = {
    "/deepseek-coding-agent": chinese
      ? {
          title: "适合用这一页核验的真实场景",
          body: "当你想判断 Reasonix 是否能作为 DeepSeek coding agent 接入本地项目时，重点不是看一句宣传，而是看它是否能在目标仓库启动、读取文件、保留命令历史，并把 DeepSeek API Key 留在本机。",
          checks: [
            "从目标项目目录运行 npx reasonix code。",
            "先用 /help 查看命令，再让它解释一个小文件。",
            "确认发帖或截图前已经移除 API Key 和私有路径。",
          ],
        }
      : {
          title: "Real verification scenario",
          body: "Use this page when deciding whether Reasonix can serve as the DeepSeek coding agent for a local project. The important test is not a slogan; it is whether the tool starts in the target repository, reads files, keeps command history, and leaves the DeepSeek API key local.",
          checks: [
            "Run npx reasonix code from the target repository.",
            "Use /help first, then ask it to explain a small file.",
            "Remove API keys and private paths before sharing output.",
          ],
        },
    "/deepseek-code": chinese
      ? {
          title: "DeepSeek code 搜索应回答的问题",
          body: "搜索 deepseek code 的用户通常想知道如何把模型接入真实代码仓库。Reasonix 页面应该解释启动目录、命令权限、npm tag、回滚方式和最小测试任务，而不是只给一个下载按钮。",
          checks: [
            "核验 node -v、npm dist-tags 和当前仓库目录。",
            "先让 Reasonix 做只读代码解释，再进入小范围修改。",
            "运行测试或 lint 后再接受改动。",
          ],
        }
      : {
          title: "What a DeepSeek code search should answer",
          body: "People searching for DeepSeek code usually want to connect the model to a real repository. A useful Reasonix page explains launch directory, command permissions, npm tags, rollback, and a minimal test task instead of only linking to a download.",
          checks: [
            "Verify node -v, npm dist-tags, and the current repository path.",
            "Start with read-only code explanation before small edits.",
            "Run tests or lint before accepting changes.",
          ],
        },
    "/deepseek-v4-agent": chinese
      ? {
          title: "V4 agent 决策点",
          body: "DeepSeek V4 agent 页面需要说明 Flash 与 Pro 的使用边界。Reasonix 默认适合低成本迭代；当任务涉及复杂重构、跨文件推理或长链路排错时，再切换 /pro 或 /preset max。",
          checks: [
            "用 Flash 跑安装检查、文件定位和轻量解释。",
            "用 /pro 处理复杂设计、迁移和失败分析。",
            "避免在同一会话里频繁改模型导致上下文难以复盘。",
          ],
        }
      : {
          title: "V4 agent decision points",
          body: "A DeepSeek V4 agent page should explain the boundary between Flash and Pro. Reasonix is better used with a low-cost default for iteration, then /pro or /preset max for complex refactors, cross-file reasoning, or long debugging paths.",
          checks: [
            "Use Flash for setup checks, file discovery, and light explanation.",
            "Use /pro for design, migration, and failure analysis.",
            "Avoid frequent model switching inside one session.",
          ],
        },
    "/deepseek-v4-code": chinese
      ? {
          title: "V4 code 工作流核验",
          body: "DeepSeek V4 code 页面应把模型选择落到开发流程：先定义任务边界，再让 Reasonix 读取相关文件，之后用测试和人工 review 检查改动。这样页面才有独立价值，而不是泛泛重复关键词。",
          checks: [
            "先写清楚目标文件、预期输出和不能改的边界。",
            "要求 Reasonix 给出计划后再执行修改。",
            "用 git diff、lint、build 或测试完成验收。",
          ],
        }
      : {
          title: "V4 code workflow check",
          body: "A DeepSeek V4 code page should connect model choice to the developer workflow: define boundaries, let Reasonix read relevant files, then verify changes through tests and human review. That gives the page independent value beyond keyword repetition.",
          checks: [
            "Name target files, expected output, and no-touch boundaries.",
            "Ask Reasonix for a plan before edits.",
            "Use git diff, lint, build, or tests for acceptance.",
          ],
        },
  };

  return copy[path] ?? copy["/deepseek-coding-agent"];
}

function SeoLandingLinks({
  locale,
  eyebrow,
  title,
  description,
  currentPath,
  compact = false,
}: LocalizedPageProps & {
  eyebrow: string;
  title: string;
  description: string;
  currentPath?: string;
  compact?: boolean;
}) {
  const content = getContent(locale);
  const pages = content.seoLandingPages.filter(
    (page) => page.path !== currentPath,
  );

  return (
    <section
      className={[
        "rx-glass-strong rounded-[2rem]",
        compact ? "p-4 sm:p-5" : "p-5 sm:p-6",
      ].join(" ")}
    >
      <div className={compact ? "mb-4" : "mb-5 max-w-3xl"}>
        <p className="text-sm font-semibold uppercase tracking-normal text-sky-700">
          {eyebrow}
        </p>
        <h2
          className={[
            "mt-2 font-semibold leading-tight text-slate-950",
            compact ? "text-2xl" : "text-2xl sm:text-3xl",
          ].join(" ")}
        >
          {title}
        </h2>
        {compact ? null : (
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {description}
          </p>
        )}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {pages.map((page) => (
          <Link
            key={page.path}
            href={localizePath(locale, page.path)}
            className={[
              "rx-glass rounded-2xl transition hover:-translate-y-0.5 hover:bg-white/72",
              compact ? "p-3" : "p-4",
            ].join(" ")}
          >
            <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-800 ring-1 ring-sky-100">
              {page.primaryKeyword}
            </span>
            <h3 className="mt-3 text-base font-semibold leading-6 text-slate-950">
              {page.title}
            </h3>
            {compact ? null : (
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {page.metaDescription}
              </p>
            )}
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-sky-800">
              {page.eyebrow}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProjectStatsGrid({
  stats,
  className = "",
}: {
  stats: ReadonlyArray<{ label: string; value: string; note: string }>;
  className?: string;
}) {
  const largeColumnClass =
    stats.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <dl
      className={[
        "grid grid-cols-2 gap-3",
        largeColumnClass,
        className,
      ].join(" ")}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rx-glass rounded-2xl px-4 py-4 text-left shadow-[0_18px_50px_-30px_rgba(15,23,42,0.28)]"
        >
          <dt className="text-xs font-semibold uppercase tracking-normal text-slate-500">
            {stat.label}
          </dt>
          <dd className="mt-2 truncate text-2xl font-semibold tracking-normal text-slate-950">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function HomePage({ locale }: LocalizedPageProps) {
  const content = getContent(locale);
  const articles = getArticles(locale);
  const page = content.pages.home;
  const heroCopy = getHomeHeroCopy(locale);
  const commandCards = getHomeCommandCards(locale);
  const primaryDownload = content.downloadOptions[0];
  const terminalCommand =
    primaryDownload?.command ??
    "cd /path/to/your-project\nnpx reasonix code\n# inside the TUI: /pro, /plan, /skill, /mcp";
  const articleCarouselItems = articles.slice(0, 4).map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    eyebrow: article.eyebrow,
    date: article.date,
    readTime: article.readTime,
  }));
  const featureIcons = [
    BadgeCheck,
    Terminal,
    ShieldCheck,
    GitBranch,
    GitFork,
    Clock3,
  ] as const;
  const featureRingLayout = [
    "lg:col-start-1 lg:col-span-6 lg:row-start-1",
    "lg:col-start-7 lg:col-span-6 lg:row-start-1",
    "lg:col-start-1 lg:col-span-4 lg:row-start-2",
    "lg:col-start-9 lg:col-span-4 lg:row-start-2",
    "lg:col-start-1 lg:col-span-6 lg:row-start-3",
    "lg:col-start-7 lg:col-span-6 lg:row-start-3",
  ] as const;
  const heroProjectStats = content.projectStats.filter(
    (stat) => stat.label !== "Default branch",
  );

  return (
    <div className="-mx-4 -my-6 overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#f4fbf7_46%,#ffffff_100%)] text-slate-950 sm:-mx-6 lg:-mx-10 lg:-my-10">
      <section className="relative overflow-hidden">
        <div className="motion-hero-grid absolute inset-0" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(219,234,254,0.78),rgba(255,255,255,0.18)_42%,rgba(209,250,229,0.48)_100%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
          <div className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
            <div className="motion-rise motion-delay-1 text-left">
              <div className="flex max-w-full flex-wrap gap-2">
                <span className="rx-glass inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-slate-800">
                  <BadgeCheck
                    className="h-4 w-4 shrink-0 text-sky-600"
                    aria-hidden="true"
                  />
                  <span className="truncate">{page.eyebrow}</span>
                </span>
                <span className="rx-glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-slate-700">
                  <Clock3
                    className="h-4 w-4 text-emerald-700"
                    aria-hidden="true"
                  />
                  {SITE.checkedAt}
                </span>
              </div>

              <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
                <span className="block">{heroCopy.brand}</span>
                <span className="block bg-[linear-gradient(90deg,#0f172a,#0369a1_48%,#047857)] bg-clip-text text-transparent">
                  {heroCopy.description}
                </span>
              </h1>

              {page.title ? (
                <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:text-lg">
                  {page.title}
                </p>
              ) : null}

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rx-button-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold text-white"
                >
                  {page.primaryCta}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href={localizePath(locale, "/errors")}
                  className="rx-glass inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold text-slate-800 transition hover:bg-white/72"
                >
                  {page.secondaryCta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <ProjectStatsGrid
                stats={heroProjectStats}
                className="mt-7 hidden w-full max-w-3xl lg:grid"
              />
            </div>

            <div className="motion-rise motion-delay-2">
              <ReasonixAgentVisual />
            </div>
          </div>

          <ProjectStatsGrid
            stats={heroProjectStats}
            className="motion-rise motion-delay-3 mt-6 w-full lg:hidden"
          />

          <div className="motion-rise motion-delay-3 mt-8 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
            <section className="rx-glass-strong rounded-[2rem] p-4 shadow-[0_24px_90px_-54px_rgba(15,23,42,0.42)] sm:p-5">
              <div className="flex flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-normal text-sky-700">
                    Install Reasonix
                  </p>
                  <h2 className="mt-1 text-xl font-semibold leading-tight text-slate-950 sm:text-2xl">
                    {content.quickFacts[2]?.label ?? "Reasonix entry"}
                  </h2>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50/80 px-3 py-1.5 text-xs font-semibold text-emerald-900 ring-1 ring-emerald-200/80">
                  <span
                    className="motion-pulse-dot h-2 w-2 rounded-full bg-emerald-500"
                    aria-hidden="true"
                  />
                  npx / npm / desktop
                </span>
              </div>
              <DownloadInstallTabs
                locale={locale}
                desktopDownload={content.desktopDownload}
              />
            </section>

            <section className="rx-glass-strong rounded-[2rem] p-4 shadow-[0_24px_90px_-54px_rgba(15,23,42,0.34)] sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3 px-1">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Terminal className="h-4 w-4 text-sky-700" aria-hidden="true" />
                  {page.terminalNote}
                </div>
                <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                  CLI
                </span>
              </div>
              <CopyCommandBlock command={terminalCommand} locale={locale} />
            </section>
          </div>

          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="motion-rise motion-delay-4 rx-glass mt-4 flex flex-col gap-3 rounded-[1.75rem] p-4 text-left transition hover:bg-white/72 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white">
                <GitBranch className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-normal text-slate-500">
                  GitHub repository
                </span>
                <span className="mt-1 block truncate text-base font-semibold text-slate-950">
                  esengine/DeepSeek-Reasonix
                </span>
              </span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800 ring-1 ring-sky-100">
              Open GitHub
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </div>
      </section>

      <section className="relative border-y border-white/70 bg-white/50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <div className="command-strip-scroll rx-glass overflow-x-auto overflow-y-hidden rounded-[2rem] py-5 text-left sm:overflow-hidden">
            <div className="motion-marquee-track flex w-max">
              {[...commandCards, ...commandCards].map((card, index) => (
                <article
                  key={`${card.command}-${index}`}
                  className="flex min-h-[172px] w-[min(82vw,22rem)] snap-start flex-col justify-between border-r border-slate-200/70 px-6 sm:w-[22rem] lg:px-8"
                >
                  <div>
                    <h3 className="text-lg font-semibold leading-7 text-slate-950">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                      {card.description}
                    </p>
                  </div>
                  <code className="mt-5 inline-flex max-w-full items-center gap-2 self-start overflow-hidden rounded-full bg-white/78 px-4 py-2 text-sm font-semibold leading-none text-slate-700 shadow-sm ring-1 ring-slate-200/80">
                    <span className="truncate">{card.command}</span>
                  </code>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-stretch">
          <div className="motion-rise flex min-h-[15rem] flex-col justify-center text-center lg:col-start-5 lg:col-span-4 lg:row-start-2">
            <p className="text-sm font-semibold uppercase tracking-normal text-emerald-500">
              {page.sectionsTitle}
            </p>
            <h2 className="mt-3 bg-[linear-gradient(90deg,#0f172a,#0369a1_50%,#047857)] bg-clip-text text-3xl font-semibold leading-tight tracking-normal text-transparent sm:text-4xl">
              {content.site.slogan}
            </h2>
          </div>

          {content.featureBlocks.map((feature, index) => {
            const FeatureIcon = featureIcons[index % featureIcons.length];
            const layoutClass = featureRingLayout[index] ?? "";

            return (
              <article
                key={feature.title}
                className={[
                  "motion-feature-row rx-glass grid h-full gap-3 rounded-[1.5rem] p-4 transition hover:bg-white/70 sm:grid-cols-[auto_1fr] sm:p-5 lg:flex lg:flex-col lg:justify-between",
                  layoutClass,
                ].join(" ")}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                  <FeatureIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-6 text-slate-950">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {feature.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
        <SeoLandingLinks
          locale={locale}
          eyebrow={page.seoClusterEyebrow}
          title={page.seoClusterTitle}
          description={page.seoClusterDescription}
          compact
        />
      </section>

      <section className="border-y border-white/70 bg-white/58">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-normal text-sky-700">
                {page.articlesTitle}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">
                {content.pages.articles.title}
              </h2>
            </div>
            <Link
              href={localizePath(locale, "/articles")}
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-sky-800 hover:text-sky-700"
            >
              {content.pages.articles.readLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ArticleCarousel
            locale={locale}
            articles={articleCarouselItems}
            readLabel={page.articleReadLabel}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-6 flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-sky-700" aria-hidden="true" />
          <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
            {page.latestNewsTitle}
          </h2>
        </div>
        <div className="rx-glass-strong divide-y divide-slate-200/70 overflow-hidden rounded-[2rem]">
          {content.newsItems.slice(0, 3).map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="block p-5 transition hover:bg-white/50"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                <span>{item.date}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-slate-950">
                {item.title}
              </h3>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ArticlesIndexPage({ locale }: LocalizedPageProps) {
  const content = getContent(locale);
  const page = content.pages.articles;
  const articles = getArticles(locale);

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          {page.eyebrow}
        </div>
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {page.description}
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={localizePath(locale, `/articles/${article.slug}`)}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300"
          >
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="rounded-md bg-emerald-50 px-2 py-1 font-medium text-emerald-900">
                {article.eyebrow}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {article.date}
              </span>
              <span>{article.readTime}</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold leading-snug text-slate-950">
              {article.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {article.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900">
              {page.readLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}

export function ArticleDetailPage({ locale, slug }: ArticlePageProps) {
  const content = getContent(locale);
  const page = content.pages.articleDetail;
  const article = getArticle(slug, locale);

  if (!article) {
    notFound();
  }

  const comparisonLabels = article.comparisonLabels ?? {
    reasonix: page.reasonixLabel,
    generic: page.genericAgentLabel,
    platform: page.platformAgentLabel,
    openSource: page.openSourceAgentLabel,
  };
  const editorialCopy = getArticleEditorialCopy(locale);

  return (
    <>
    <ArticleJsonLd article={article} locale={locale} />
    <article className="mx-auto max-w-4xl space-y-8">
      <Link
        href={localizePath(locale, "/articles")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 hover:text-emerald-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {page.backLabel}
      </Link>

      <header className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          {article.eyebrow}
        </div>
        <h1 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          {article.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-500">
          <span>
            {editorialCopy.authorLabel}: {SITE.authorName}
          </span>
          <span>·</span>
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
          <span>·</span>
          <span>
            {editorialCopy.updatedLabel}: {SITE.checkedAt}
          </span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-lg font-semibold text-amber-950">
          {page.takeawaysTitle}
        </h2>
        <ul className="mt-4 space-y-2">
          {article.takeaways.map((takeaway) => (
            <li
              key={takeaway}
              className="flex gap-2 text-sm leading-7 text-amber-900"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-700" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </section>

      {article.comparison ? (
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-semibold text-slate-950">
              {page.comparisonTitle}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[880px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="w-36 px-4 py-3 font-semibold">
                    {page.dimensionLabel}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {comparisonLabels.reasonix}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {comparisonLabels.generic}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {comparisonLabels.platform}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {comparisonLabels.openSource}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {article.comparison.map((row) => (
                  <tr key={row.dimension} className="align-top">
                    <th className="px-4 py-4 font-semibold text-slate-900">
                      {row.dimension}
                    </th>
                    <td className="px-4 py-4 leading-6 text-slate-600">
                      {row.reasonix}
                    </td>
                    <td className="px-4 py-4 leading-6 text-slate-600">
                      {row.generic}
                    </td>
                    <td className="px-4 py-4 leading-6 text-slate-600">
                      {row.platform}
                    </td>
                    <td className="px-4 py-4 leading-6 text-slate-600">
                      {row.openSource}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <div className="space-y-5">
        {article.sections.map((section) => (
          <section
            key={section.heading}
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-slate-950">
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>
            {section.bullets ? (
              <ul className="mt-5 space-y-2">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-sm leading-7 text-slate-600"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-800" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <section className="rounded-lg border border-sky-200 bg-sky-50 p-5">
        <h2 className="text-lg font-semibold text-sky-950">
          {editorialCopy.evidenceTitle}
        </h2>
        <p className="mt-3 text-sm leading-7 text-sky-900">
          {editorialCopy.evidenceBody}
        </p>
        <p className="mt-3 text-sm leading-7 text-sky-900">
          {editorialCopy.reviewedLabel}: {SITE.authorName}
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">
          {page.sourcesTitle}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {article.sources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:text-emerald-900"
            >
              {source.label}
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <ArticleDiscussionLink locale={locale} />
    </article>
    </>
  );
}

export function LoginPageContent({ locale }: LocalizedPageProps) {
  return <LoginExplainer locale={locale} />;
}

export function FaqPageContent({ locale }: LocalizedPageProps) {
  const content = getContent(locale);
  const page = content.pages.faq;

  return (
    <>
    <FaqJsonLd locale={locale} />
    <div className="space-y-8">
      <section>
        <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
          <CircleHelp className="h-4 w-4" aria-hidden="true" />
          {page.eyebrow}
        </div>
        <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {page.description}
        </p>
      </section>

      <section className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white shadow-sm">
        {content.faqs.map((faq) => (
          <article key={faq.question} className="p-5">
            <h2 className="text-lg font-semibold text-slate-950">
              {faq.question}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {faq.answer}
            </p>
          </article>
        ))}
      </section>
    </div>
    </>
  );
}

export function GithubPageContent({ locale }: LocalizedPageProps) {
  const content = getContent(locale);
  const page = content.pages.github;
  const verification = getDownloadVerificationCopy(locale);

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
          <GitBranch className="h-4 w-4" aria-hidden="true" />
          {page.eyebrow}
        </div>
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {page.descriptionBeforeLink}
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="mx-1 font-semibold text-emerald-900 underline underline-offset-4"
          >
            esengine/DeepSeek-Reasonix
          </a>
          {page.descriptionAfterLink}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {content.projectStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {stat.value}
            </p>
            <p className="mt-2 text-xs text-slate-500">{stat.note}</p>
          </div>
        ))}
      </section>

      <DownloadInstallTabs
        locale={locale}
        desktopDownload={content.desktopDownload}
      />

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">
          {verification.title}
        </h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {verification.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-7 text-slate-700">
              <CheckCircle2
                className="mt-1 h-4 w-4 shrink-0 text-emerald-800"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <div className="flex items-start gap-3">
          <Download className="mt-0.5 h-5 w-5 shrink-0 text-emerald-900" />
          <p className="text-sm leading-6 text-emerald-950">{page.note}</p>
        </div>
      </section>
    </div>
  );
}

export function ErrorsPageContent({ locale }: LocalizedPageProps) {
  const content = getContent(locale);
  const page = content.pages.errors;

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
          <Terminal className="h-4 w-4" aria-hidden="true" />
          {page.eyebrow}
        </div>
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {page.description}
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {content.errorCommands.map((item) => (
          <article
            key={item.problem}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-950">
              {item.problem}
            </h2>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-5 text-emerald-200">
              {item.command}
            </pre>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {item.hint}
            </p>
          </article>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <Bug className="h-5 w-5 text-emerald-800" />
          <h2 className="text-2xl font-semibold text-slate-950">
            {page.issueWatchTitle}
          </h2>
        </div>
        <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white shadow-sm">
          {content.issueWatch.map((issue) => (
            <a
              key={issue.id}
              href={issue.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 p-5 transition hover:bg-slate-50"
            >
              <span>
                <span className="font-mono text-sm font-semibold text-emerald-900">
                  {issue.id}
                </span>
                <span className="ml-3 text-sm font-medium text-slate-800">
                  {issue.title}
                </span>
              </span>
              <ExternalLink className="h-4 w-4 shrink-0 text-slate-400" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export function DeepSeekPageContent({ locale }: LocalizedPageProps) {
  const content = getContent(locale);
  const page = content.pages.deepseek;

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
          <BadgeCheck className="h-4 w-4" aria-hidden="true" />
          {page.eyebrow}
        </div>
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {page.description}
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">
          {page.stepsTitle}
        </h2>
        <ol className="mt-5 space-y-4">
          {content.deepseekOfficialSteps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-emerald-950 text-xs font-semibold text-white">
                {index + 1}
              </span>
              <span className="text-sm leading-7 text-slate-700">{step}</span>
            </li>
          ))}
        </ol>
        <pre className="mt-6 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-5 text-emerald-200">
          {
            "cd /path/to/my-project\nnpx reasonix code\n# inside TUI: /pro, /preset max, /help"
          }
        </pre>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <a
          href={SITE.deepseekGuide}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300"
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-800" />
          <h2 className="mt-4 text-lg font-semibold text-slate-950">
            {page.guideTitle}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {page.guideBody}
          </p>
        </a>
        <a
          href={SITE.deepseekApiKeys}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300"
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-800" />
          <h2 className="mt-4 text-lg font-semibold text-slate-950">
            {page.apiKeysTitle}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {page.apiKeysBody}
          </p>
        </a>
      </section>

      <SeoLandingLinks
        locale={locale}
        eyebrow={content.pages.home.seoClusterEyebrow}
        title={content.pages.home.seoClusterTitle}
        description={content.pages.home.seoClusterDescription}
      />
    </div>
  );
}

export function SeoLandingPageContent({ locale, path }: SeoLandingPageProps) {
  const content = getContent(locale);
  const page = getSeoLandingPage(locale, path);

  if (!page) {
    notFound();
  }

  const differentiator = getLandingDifferentiator(locale, path);

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
          <Terminal className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{page.eyebrow}</span>
        </div>
        <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {page.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-md bg-emerald-950 px-2.5 py-1.5 text-xs font-semibold text-white">
            {page.primaryKeyword}
          </span>
          {page.secondaryKeywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600"
            >
              {keyword}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            {page.definitionTitle}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {page.definition}
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            {page.modelTitle}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {page.modelBody}
          </p>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-emerald-800" />
            <h2 className="text-xl font-semibold text-slate-950">
              {page.factTitle}
            </h2>
          </div>
          <ul className="mt-5 space-y-3">
            {page.facts.map((fact) => (
              <li key={fact} className="flex gap-3 text-sm leading-7 text-slate-700">
                <CheckCircle2
                  className="mt-1 h-4 w-4 shrink-0 text-emerald-800"
                  aria-hidden="true"
                />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <a
              href={SITE.deepseekGuide}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-emerald-900 hover:text-emerald-700"
            >
              Reasonix docs
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={SITE.deepseekV4Release}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-emerald-900 hover:text-emerald-700"
            >
              DeepSeek V4 release
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-800" />
            <h2 className="text-xl font-semibold text-slate-950">
              {page.stepsTitle}
            </h2>
          </div>
          <ol className="mt-5 space-y-4">
            {page.steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-emerald-950 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span className="text-sm leading-7 text-slate-700">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-emerald-800" />
          <h2 className="text-xl font-semibold text-slate-950">
            {page.commandTitle}
          </h2>
        </div>
        <CopyCommandBlock command={page.command} locale={locale} />
      </section>

      <section className="rounded-lg border border-sky-200 bg-sky-50 p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-sky-950">
          {differentiator.title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-sky-900">
          {differentiator.body}
        </p>
        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {differentiator.checks.map((check) => (
            <li
              key={check}
              className="rounded-lg border border-sky-200 bg-white/70 p-3 text-sm leading-6 text-sky-900"
            >
              {check}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <CircleHelp className="h-5 w-5 text-emerald-800" />
          <h2 className="text-xl font-semibold text-slate-950">
            {page.faqTitle}
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {page.faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <h3 className="text-sm font-semibold leading-6 text-slate-950">
                {faq.question}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-emerald-950">
          {page.ctaTitle}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-emerald-900">
          {page.ctaBody}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={SITE.deepseekGuide}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
          >
            {page.ctaLabel}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link
            href={localizePath(locale, "/deepseek")}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-950 transition hover:border-emerald-300"
          >
            {content.pages.deepseek.eyebrow}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <SeoLandingLinks
        locale={locale}
        eyebrow={content.pages.home.seoClusterEyebrow}
        title={page.relatedTitle}
        description={content.pages.home.seoClusterDescription}
        currentPath={page.path}
      />
    </div>
  );
}

export function NewsPageContent({ locale }: LocalizedPageProps) {
  const content = getContent(locale);
  const page = content.pages.news;
  const newsCopy = getNewsEditorialCopy(locale);

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
          <Newspaper className="h-4 w-4" aria-hidden="true" />
          {page.eyebrow}
        </div>
        <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {page.description}
        </p>
      </section>

      <section className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white shadow-sm">
        {content.newsItems.map((item) => (
          <article
            key={item.title}
            className="p-5 transition hover:bg-slate-50"
          >
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <Clock3 className="h-4 w-4" aria-hidden="true" />
              <time>{item.date}</time>
            </div>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {item.body}
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">
                  {newsCopy.sourceLabel}
                </p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 hover:text-emerald-700"
                >
                  {getSourceHost(item.href)}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">
                  {newsCopy.impactLabel}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.body}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">
                  {newsCopy.actionLabel}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {newsCopy.action}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export function PrivacyPageContent({ locale }: LocalizedPageProps) {
  const content = getContent(locale);
  const page = content.pages.privacy;
  const commentCopy = getCommentPrivacyCopy(locale);
  const protectionLink = content.legalLinks.find(
    (item) => item.href === "/privacy-protection",
  );

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          {page.eyebrow}
        </div>
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {page.description}
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">
          {page.commitmentsTitle}
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {content.privacyCommitments.map((item) => (
            <div key={item} className="flex gap-3">
              <CheckCircle2
                className="mt-1 h-5 w-5 shrink-0 text-emerald-800"
                aria-hidden="true"
              />
              <p className="text-sm leading-7 text-slate-700">{item}</p>
            </div>
          ))}
          <div className="flex gap-3">
            <CheckCircle2
              className="mt-1 h-5 w-5 shrink-0 text-emerald-800"
              aria-hidden="true"
            />
            <p className="text-sm leading-7 text-slate-700">
              {commentCopy.commitment}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {page.cards.map((card) => (
          <article
            key={card.title}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-950">
              {card.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {card.body}
            </p>
          </article>
        ))}
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            {commentCopy.cardTitle}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {commentCopy.cardBody}
          </p>
        </article>
      </section>

      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <h2 className="text-lg font-semibold text-emerald-950">
          {page.protectionTitle}
        </h2>
        <p className="mt-3 text-sm leading-6 text-emerald-900">
          {page.protectionBody}
        </p>
        {protectionLink ? (
          <Link
            href={localizePath(locale, protectionLink.href)}
            className="mt-4 inline-flex items-center rounded-lg bg-emerald-950 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
          >
            {protectionLink.label}
          </Link>
        ) : null}
      </section>
    </div>
  );
}

export function PrivacyProtectionPageContent({ locale }: LocalizedPageProps) {
  const content = getContent(locale);
  const page = content.pages.privacyProtection;
  const commentCopy = getCommentPrivacyCopy(locale);

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          {page.eyebrow}
        </div>
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {page.description}
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">
          {page.checklistTitle}
        </h2>
        <ol className="mt-5 space-y-4">
          {page.checklist.map((item, index) => (
            <li key={item} className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-emerald-950 text-xs font-semibold text-white">
                {index + 1}
              </span>
              <span className="text-sm leading-7 text-slate-700">{item}</span>
            </li>
          ))}
          <li className="flex gap-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-emerald-950 text-xs font-semibold text-white">
              {page.checklist.length + 1}
            </span>
            <span className="text-sm leading-7 text-slate-700">
              {commentCopy.checklist}
            </span>
          </li>
        </ol>
      </section>

      <section>
        <div className="mb-5 flex items-center gap-2">
          <GitFork className="h-5 w-5 text-emerald-800" aria-hidden="true" />
          <h2 className="text-2xl font-semibold text-slate-950">
            {page.accountsTitle}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {content.officialAccounts.map((account) => (
            <article
              key={account.name}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">
                    {account.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {account.context}
                  </p>
                </div>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
                  {page.checkedLabel}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <a
                  href={account.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex max-w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 font-medium text-slate-700 hover:border-slate-300 hover:text-slate-950"
                >
                  <GitFork className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{account.githubLabel}</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </a>
                {account.x ? (
                  <a
                    href={account.x}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex max-w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 font-medium text-slate-700 hover:border-slate-300 hover:text-slate-950"
                  >
                    <span className="shrink-0 font-semibold">X</span>
                    <span className="truncate">{account.xLabel}</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="inline-flex rounded-lg border border-slate-200 px-3 py-2 text-slate-500">
                    {account.xLabel}
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {account.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <h2 className="text-lg font-semibold text-emerald-950">
          {page.commitmentTitle}
        </h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {content.privacyCommitments.map((item) => (
            <li key={item} className="text-sm leading-6 text-emerald-900">
              {item}
            </li>
          ))}
          <li className="text-sm leading-6 text-emerald-900">
            {commentCopy.commitment}
          </li>
        </ul>
      </section>
    </div>
  );
}

type TrustPageKey = "about" | "contact" | "terms";
type TrustPageCopy = Record<
  TrustPageKey,
  {
    eyebrow: string;
    title: string;
    description: string;
    sections: { title: string; body: string }[];
  }
>;

function getTrustPageContent(locale: Locale, page: TrustPageKey) {
  const isSimplified = locale === "zh-cn";
  const isTraditional = locale === "zh-tw";
  const isChinese = isSimplified || isTraditional;

  const zh = {
    about: {
      eyebrow: isTraditional ? "關於我們" : "关于我们",
      title: isTraditional ? "關於 Reasonix" : "关于 Reasonix",
      description: isTraditional
        ? "Reasonix 是一個編輯型資料站，聚焦 DeepSeek-native Reasonix 的啟動方式、下載來源、CLI 錯誤、隱私邊界和公開來源核驗。"
        : "Reasonix 是一个编辑型资料站，聚焦 DeepSeek-native Reasonix 的启动方式、下载来源、CLI 报错、隐私边界和公开来源核验。",
      sections: [
        {
          title: isTraditional ? "我們做什麼" : "我们做什么",
          body: isTraditional
            ? "我們把 DeepSeek 官方文件、Reasonix GitHub、npm 套件資料、release 資訊和公開 issue 整理成可操作的中文與英文指南。每個下載或命令入口都應回到原始來源，而不是停留在二手轉述。"
            : "我们把 DeepSeek 官方文档、Reasonix GitHub、npm 包信息、release 信息和公开 issue 整理成可操作的中文与英文指南。每个下载或命令入口都应回到原始来源，而不是停留在二手转述。",
        },
        {
          title: isTraditional ? "編輯原則" : "编辑原则",
          body: isTraditional
            ? "內容優先回答使用者能否安全啟動、如何核驗版本、哪些命令需要小心、以及哪些資訊可能過期。頁面不代替官方文件、法律建議或本機安全審計。"
            : "内容优先回答用户能否安全启动、如何核验版本、哪些命令需要小心、以及哪些信息可能过期。页面不代替官方文档、法律建议或本机安全审计。",
        },
        {
          title: isTraditional ? "作者與審核" : "作者与审核",
          body: isTraditional
            ? `本網站由 ${SITE.authorName} 維護。文章會標明公開來源，並在 Reasonix、DeepSeek、npm 或 GitHub 來源變更時更新。`
            : `本站由 ${SITE.authorName} 维护。文章会标明公开来源，并在 Reasonix、DeepSeek、npm 或 GitHub 来源变化时更新。`,
        },
        {
          title: isTraditional ? "獨立性" : "独立性",
          body: isTraditional
            ? "本網站不接收使用者的模型服務商 API Key，也不替 Reasonix、DeepSeek、OpenAI、Anthropic 或其他廠商處理帳號、付款、支援工單或授權。外部品牌名稱只用於描述可公開核驗的來源和工具差異。"
            : "本站不接收用户的模型服务商 API Key，也不替 Reasonix、DeepSeek、OpenAI、Anthropic 或其他厂商处理账号、付款、支持工单或授权。外部品牌名称只用于描述可公开核验的来源和工具差异。",
        },
        {
          title: isTraditional ? "更新方式" : "更新方式",
          body: isTraditional
            ? "當 GitHub release、npm dist-tag、DeepSeek 文件或公開 issue 發生變化時，頁面會優先更新可驗證事實，再補充對安裝、安全和工作流的影響。過期數字不應被當成安裝依據。"
            : "当 GitHub release、npm dist-tag、DeepSeek 文档或公开 issue 发生变化时，页面会优先更新可验证事实，再补充对安装、安全和工作流的影响。过期数字不应被当成安装依据。",
        },
      ],
    },
    contact: {
      eyebrow: isTraditional ? "聯絡我們" : "联系我们",
      title: isTraditional ? "聯絡 Reasonix 編輯站" : "联系 Reasonix 编辑站",
      description: isTraditional
        ? "如果你發現版本、來源、命令、隱私或文章內容有誤，請優先使用公開來源連結提交可驗證的更正。"
        : "如果你发现版本、来源、命令、隐私或文章内容有误，请优先使用公开来源链接提交可验证的更正。",
      sections: [
        {
          title: isTraditional ? "內容更正" : "内容更正",
          body: isTraditional
            ? "請附上原始來源 URL、發現日期、受影響頁面和建議修正。涉及下載、API Key 或命令執行的問題，請不要貼出密鑰、token 或完整環境變數。"
            : "请附上原始来源 URL、发现日期、受影响页面和建议修正。涉及下载、API Key 或命令执行的问题，请不要贴出密钥、token 或完整环境变量。",
        },
        {
          title: isTraditional ? "公開聯絡入口" : "公开联系入口",
          body: isTraditional
            ? "你可以透過 Reasonix GitHub、Reasonix X 帳號或 DeepSeek 官方文件連結核驗資訊。站內不要求你提交 provider API Key。"
            : "你可以通过 Reasonix GitHub、Reasonix X 账号或 DeepSeek 官方文档链接核验信息。站内不要求你提交 provider API Key。",
        },
        {
          title: isTraditional ? "回饋範圍" : "反馈范围",
          body: isTraditional
            ? "適合提交的內容包括失效連結、版本資訊過期、命令描述不清、外部來源變更、文章引用不完整、隱私邊界表述不準確和本地化翻譯問題。"
            : "适合提交的内容包括失效链接、版本信息过期、命令描述不清、外部来源变化、文章引用不完整、隐私边界表述不准确和本地化翻译问题。",
        },
        {
          title: isTraditional ? "不要提交什麼" : "不要提交什么",
          body: isTraditional
            ? "不要提交 API Key、token、完整 .env、私有倉庫地址、個人身分資訊或未授權的商業內容。需要展示錯誤時，請只保留最小復現命令、版本號和可公開的錯誤摘要。"
            : "不要提交 API Key、token、完整 .env、私有仓库地址、个人身份信息或未授权的商业内容。需要展示错误时，请只保留最小复现命令、版本号和可公开的错误摘要。",
        },
      ],
    },
    terms: {
      eyebrow: isTraditional ? "服務條款" : "服务条款",
      title: isTraditional ? "Reasonix 服務條款" : "Reasonix 服务条款",
      description: isTraditional
        ? "使用本網站表示你理解它是資料整理和編輯指南，不是 Reasonix、DeepSeek 或其他廠商的官方服務。"
        : "使用本站表示你理解它是资料整理和编辑指南，不是 Reasonix、DeepSeek 或其他厂商的官方服务。",
      sections: [
        {
          title: isTraditional ? "資訊用途" : "信息用途",
          body: isTraditional
            ? "本網站提供公開來源整理、命令核驗清單、錯誤排查和隱私提醒。實際下載、安裝、授權和命令執行由使用者在自己的環境中決定。"
            : "本站提供公开来源整理、命令核验清单、错误排查和隐私提醒。实际下载、安装、授权和命令执行由用户在自己的环境中决定。",
        },
        {
          title: isTraditional ? "外部連結" : "外部链接",
          body: isTraditional
            ? "外部 GitHub、npm、DeepSeek、X 或其他網站由各自所有者控制。點擊外部連結後，請閱讀對方的條款、隱私政策和安全提示。"
            : "外部 GitHub、npm、DeepSeek、X 或其他网站由各自所有者控制。点击外部链接后，请阅读对方的条款、隐私政策和安全提示。",
        },
        {
          title: isTraditional ? "社群內容" : "社区内容",
          body: isTraditional
            ? "社群問題和回覆應只包含可公開的復現資訊。請勿發布 API Key、token、私有倉庫地址、個人資料或侵犯版權的內容。"
            : "社区问题和回复应只包含可公开的复现信息。请勿发布 API Key、token、私有仓库地址、个人资料或侵犯版权的内容。",
        },
        {
          title: isTraditional ? "不保證結果" : "不保证结果",
          body: isTraditional
            ? "Reasonix、DeepSeek API、npm、GitHub release 和本機開發環境可能隨時間變化。本站盡力標示來源和更新日期，但不保證每個命令在你的系統中一定成功。"
            : "Reasonix、DeepSeek API、npm、GitHub release 和本地开发环境可能随时间变化。本站尽力标注来源和更新日期，但不保证每个命令在你的系统中一定成功。",
        },
        {
          title: isTraditional ? "條款更新" : "条款更新",
          body: isTraditional
            ? "如果站點增加廣告、分析、帳號功能或社群能力，相關資料使用、內容審核和使用條款會在提交 AdSense 或公開擴展前更新。"
            : "如果站点增加广告、分析、账号功能或社区能力，相关数据使用、内容审核和使用条款会在提交 AdSense 或公开扩展前更新。",
        },
      ],
    },
  } satisfies TrustPageCopy;

  const en = {
    about: {
      eyebrow: "About Us",
      title: "About Reasonix",
      description:
        "Reasonix is an editorial source guide for DeepSeek-native Reasonix setup, downloads, CLI errors, privacy boundaries, and public-source verification.",
      sections: [
        {
          title: "What this site does",
          body: "The site turns DeepSeek documentation, the Reasonix GitHub repository, npm package data, releases, and public issues into practical setup and verification guides. Download and command links should lead readers back to original sources.",
        },
        {
          title: "Editorial policy",
          body: "Pages focus on whether a reader can start safely, verify a version, understand command risk, and identify stale information. The site does not replace official docs, legal advice, or local security review.",
        },
        {
          title: "Author and review",
          body: `This site is maintained by ${SITE.authorName}. Articles list public sources and are updated when Reasonix, DeepSeek, npm, or GitHub source data changes.`,
        },
        {
          title: "Independence",
          body: "The site does not collect provider API keys and does not operate account, payment, support, or licensing flows for Reasonix, DeepSeek, OpenAI, Anthropic, or other vendors. Brand names are used to describe public sources and tool differences.",
        },
        {
          title: "Update process",
          body: "When GitHub releases, npm dist-tags, DeepSeek docs, or public issues change, pages prioritize verifiable facts first, then explain the impact on setup, security, and workflow decisions. Stale numbers should not be treated as install instructions.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Contact the Reasonix editorial site",
      description:
        "Use public, verifiable source links when reporting corrections about versions, sources, commands, privacy boundaries, or article content.",
      sections: [
        {
          title: "Corrections",
          body: "Include the original source URL, discovery date, affected page, and suggested correction. For download, API key, or command issues, do not include secrets, tokens, or full environment variables.",
        },
        {
          title: "Public contact surfaces",
          body: "You can verify information through the Reasonix GitHub repository, the Reasonix X account, and the DeepSeek documentation links. This site does not ask you to submit provider API keys.",
        },
        {
          title: "Feedback scope",
          body: "Useful reports include broken links, stale versions, unclear commands, changed source pages, incomplete citations, inaccurate privacy boundaries, and localization issues.",
        },
        {
          title: "What not to send",
          body: "Do not send API keys, tokens, complete .env files, private repository URLs, personal identity data, or commercial material you are not allowed to share. For errors, keep only minimal commands, versions, and public summaries.",
        },
      ],
    },
    terms: {
      eyebrow: "Terms of Service",
      title: "Reasonix Terms of Service",
      description:
        "By using this site, you understand that it is an editorial guide and source index, not an official service from Reasonix, DeepSeek, or related vendors.",
      sections: [
        {
          title: "Information use",
          body: "The site provides public-source summaries, command verification checklists, troubleshooting notes, and privacy reminders. Actual downloads, installs, permissions, and command execution are your decision in your own environment.",
        },
        {
          title: "External links",
          body: "External GitHub, npm, DeepSeek, X, or vendor pages are controlled by their owners. After leaving this site, review their terms, privacy policies, and security notices.",
        },
        {
          title: "Community content",
          body: "Community questions and replies should contain only public reproduction details. Do not post API keys, tokens, private repository URLs, personal data, or copyrighted material you do not have permission to share.",
        },
        {
          title: "No guaranteed result",
          body: "Reasonix, the DeepSeek API, npm, GitHub releases, and local development environments can change. The site marks sources and update dates, but it does not guarantee that every command will succeed on your machine.",
        },
        {
          title: "Terms updates",
          body: "If the site adds advertising, analytics, account features, or expanded community capabilities, related data use, content moderation, and usage terms should be updated before AdSense submission or public expansion.",
        },
      ],
    },
  } satisfies TrustPageCopy;

  return isChinese ? zh[page] : en[page];
}

function getTrustChecklist(locale: Locale) {
  if (locale === "zh-cn") {
    return {
      title: "可验证性清单",
      items: [
        "每个安装入口都应回到 DeepSeek 文档、Reasonix GitHub、npm 包或公开 release，避免只给二手下载链接。",
        "涉及版本、stars、forks、npm tag、issue 状态的数字必须带有核验日期，并在来源变化时更新。",
        "涉及命令执行的内容必须提醒用户检查当前目录、权限、环境变量、回滚方式和测试结果。",
        "涉及账号、API Key 或社区发帖的内容必须说明哪些数据留在本机，哪些数据可能进入 Clerk、Supabase 或外部站点。",
      ],
    };
  }

  if (locale === "zh-tw") {
    return {
      title: "可驗證性清單",
      items: [
        "每個安裝入口都應回到 DeepSeek 文件、Reasonix GitHub、npm 套件或公開 release，避免只給二手下載連結。",
        "涉及版本、stars、forks、npm tag、issue 狀態的數字必須帶有核驗日期，並在來源變化時更新。",
        "涉及命令執行的內容必須提醒使用者檢查目前目錄、權限、環境變數、回滾方式和測試結果。",
        "涉及帳號、API Key 或社群發文的內容必須說明哪些資料留在本機，哪些資料可能進入 Clerk、Supabase 或外部站點。",
      ],
    };
  }

  return {
    title: "Verification checklist",
    items: [
      "Every install path should point back to DeepSeek docs, the Reasonix GitHub repository, npm package data, or a public release instead of a secondary download page.",
      "Numbers such as versions, stars, forks, npm tags, and issue status should carry a checked date and be updated when source pages change.",
      "Command-oriented content should remind readers to check the current directory, permissions, environment variables, rollback path, and test results.",
      "Account, API key, and community content should explain what stays local and what may be processed by Clerk, Supabase, or external sites.",
    ],
  };
}

export function TrustPageContent({
  locale,
  page,
}: LocalizedPageProps & { page: TrustPageKey }) {
  const copy = getTrustPageContent(locale, page);
  const checklist = getTrustChecklist(locale);

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          {copy.eyebrow}
        </div>
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {copy.description}
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {copy.sections.map((section) => (
          <article
            key={section.title}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold leading-7 text-slate-950">
              {section.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {section.body}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">
          {checklist.title}
        </h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {checklist.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-7 text-slate-700">
              <CheckCircle2
                className="mt-1 h-4 w-4 shrink-0 text-emerald-800"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <div className="flex flex-wrap gap-3">
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
          >
            GitHub
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={SITE.x}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-950 transition hover:border-emerald-300"
          >
            {SITE.xHandle}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link
            href={localizePath(locale, "/privacy")}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-950 transition hover:border-emerald-300"
          >
            Privacy
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export function CommunityPageContent({
  locale,
  initialResponse,
  initialError,
}: CommunityPageProps) {
  return (
    <CommunityBoard
      locale={locale}
      initialResponse={initialResponse}
      initialError={initialError}
    />
  );
}

export function CommunityNewPageContent({ locale }: LocalizedPageProps) {
  return <CommunityQuestionForm locale={locale} />;
}

export function CommunityQuestionPageContent({
  locale,
  slug,
  initialDetail,
  initialError,
}: CommunityQuestionPageProps) {
  return (
    <CommunityQuestionDetail
      locale={locale}
      slug={slug}
      initialDetail={initialDetail}
      initialError={initialError}
    />
  );
}

export function NotFoundContent({ locale }: LocalizedPageProps) {
  const content = getContent(locale);
  const page = content.pages.notFound;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-medium text-slate-500">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-950">
        {page.title}
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
        {page.description}
      </p>
      <Link
        href={localizePath(locale, "/")}
        className="mt-6 inline-flex rounded-lg bg-emerald-950 px-4 py-3 text-sm font-semibold text-white"
      >
        {page.homeLabel}
      </Link>
    </div>
  );
}

export function LocalizedRoutePage({
  locale,
  path,
}: LocalizedPageProps & { path: string }) {
  const normalizedPath = normalizePath(path);

  if (normalizedPath === "/") {
    return <HomePage locale={locale} />;
  }

  if (normalizedPath === "/articles") {
    return <ArticlesIndexPage locale={locale} />;
  }

  if (normalizedPath.startsWith("/articles/")) {
    return (
      <ArticleDetailPage
        locale={locale}
        slug={normalizedPath.slice("/articles/".length)}
      />
    );
  }

  if (normalizedPath === "/login") {
    return <LoginExplainer locale={locale} />;
  }

  if (normalizedPath === "/community") {
    return <CommunityPageContent locale={locale} />;
  }

  if (normalizedPath === "/community/new") {
    return <CommunityNewPageContent locale={locale} />;
  }

  if (normalizedPath.startsWith("/community/")) {
    return (
      <CommunityQuestionPageContent
        locale={locale}
        slug={normalizedPath.slice("/community/".length)}
      />
    );
  }

  if (normalizedPath === "/faq") {
    return <FaqPageContent locale={locale} />;
  }

  if (normalizedPath === "/about") {
    return <TrustPageContent locale={locale} page="about" />;
  }

  if (normalizedPath === "/contact") {
    return <TrustPageContent locale={locale} page="contact" />;
  }

  if (normalizedPath === "/github") {
    return <GithubPageContent locale={locale} />;
  }

  if (normalizedPath === "/errors") {
    return <ErrorsPageContent locale={locale} />;
  }

  if (normalizedPath === "/deepseek") {
    return <DeepSeekPageContent locale={locale} />;
  }

  if (getSeoLandingPage(locale, normalizedPath)) {
    return <SeoLandingPageContent locale={locale} path={normalizedPath} />;
  }

  if (normalizedPath === "/news") {
    return <NewsPageContent locale={locale} />;
  }

  if (normalizedPath === "/terms") {
    return <TrustPageContent locale={locale} page="terms" />;
  }

  if (normalizedPath === "/privacy") {
    return <PrivacyPageContent locale={locale} />;
  }

  if (normalizedPath === "/privacy-protection") {
    return <PrivacyProtectionPageContent locale={locale} />;
  }

  notFound();
}
