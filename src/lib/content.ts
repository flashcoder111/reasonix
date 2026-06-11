import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const normalizedSiteUrl =
  configuredSiteUrl && configuredSiteUrl !== "https://deepseekreasonix.com"
    ? configuredSiteUrl.replace(/\/$/, "")
    : "https://www.deepseekreasonix.com";

export const SITE = {
  name: "Reasonix",
  title: "DeepSeek Reasonix | DeepSeek coding agent and V4 code guide",
  slogan: "Reasonix is DeepSeek's dedicated agent.",
  description:
    "Use this Reasonix guide to verify DeepSeek coding agent setup, DeepSeek code workflows, DeepSeek V4 agent choices, GitHub downloads, CLI errors, and privacy boundaries before running commands.",
  url: normalizedSiteUrl,
  checkedAt: "2026-06-11",
  authorName: "Reasonix editorial desk",
  authorUrl: `${normalizedSiteUrl}/about`,
  ogImage: `${normalizedSiteUrl}/reasonix-logo.svg`,
  github: "https://github.com/esengine/DeepSeek-Reasonix",
  xHandle: "@DS_reasonix",
  x: "https://x.com/DS_reasonix",
  officialSite: "https://esengine.github.io/DeepSeek-Reasonix/",
  cliReference:
    "https://github.com/esengine/DeepSeek-Reasonix/blob/main/docs/CLI-REFERENCE.md",
  deepseekGuide:
    "https://api-docs.deepseek.com/quick_start/agent_integrations/reasonix",
  deepseekV4Release: "https://api-docs.deepseek.com/news/news260424",
  deepseekApiKeys: "https://platform.deepseek.com/api_keys",
} as const;

export const communitySteps = [
  {
    title: "使用 Clerk 账号",
    body: "社区发帖和回复沿用 Reasonix 的 Clerk 页面会话，DeepSeek API Key 仍然只保存在你自己的本地配置中。",
  },
  {
    title: "问题进入 Supabase",
    body: "问题和回复存入 Supabase Postgres，公开列表只显示可见内容，管理员可以隐藏或恢复不合适的条目。",
  },
  {
    title: "不要粘贴密钥",
    body: "问题描述可以包含命令、版本和报错摘要，但不要发布 DeepSeek、OpenAI、Anthropic 等 provider 的 API Key。",
  },
] as const;

export const communityRules = [
  "优先讨论 Reasonix 安装、版本、DeepSeek API Key 配置、命令行报错和文章内容补充。",
  "可以贴最小复现命令、Node/npm/go 版本和公开 issue 链接，但不要贴密钥、token、私有仓库地址或完整环境变量。",
  "作者可以编辑或删除自己的内容，管理员可以隐藏或恢复问题和回复。",
  "v1 不提供点赞、收藏、私信、通知、个人主页或全文搜索。",
] as const;

type IconName =
  | "layout"
  | "book"
  | "login"
  | "community"
  | "help"
  | "github"
  | "terminal"
  | "badge"
  | "newspaper";

type NavItem = {
  href: string;
  label: string;
  icon: IconName;
  eyebrow: string;
};

export const seoLandingPagePaths = [
  "/deepseek-coding-agent",
  "/deepseek-code",
  "/deepseek-v4-agent",
  "/deepseek-v4-code",
] as const;

export type SeoLandingPagePath = (typeof seoLandingPagePaths)[number];

export type SeoLandingPage = {
  path: SeoLandingPagePath;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  definitionTitle: string;
  definition: string;
  factTitle: string;
  facts: readonly string[];
  stepsTitle: string;
  steps: readonly string[];
  modelTitle: string;
  modelBody: string;
  commandTitle: string;
  command: string;
  faqTitle: string;
  faqs: readonly { question: string; answer: string }[];
  relatedTitle: string;
  ctaTitle: string;
  ctaBody: string;
  ctaLabel: string;
};

type LocalizedContent = {
  site: {
    title: string;
    slogan: string;
    description: string;
    shellSubtitle: string;
    contentPrinciplesTitle: string;
    contentPrinciplesBody: string;
    lastCheckedLabel: string;
    deepseekButtonLabel: string;
  };
  metadataKeywords: readonly string[];
  navItems: readonly NavItem[];
  commandReference: {
    title: string;
    sourceLabel: string;
    sourceHref: string;
    items: readonly { command: string; label: string }[];
  };
  legalLinks: readonly { href: string; label: string }[];
  privacyCommitments: readonly string[];
  officialAccounts: readonly {
    name: string;
    context: string;
    githubLabel: string;
    github: string;
    xLabel: string;
    x: string | null;
    note: string;
  }[];
  projectStats: readonly { label: string; value: string; note: string }[];
  quickFacts: readonly { label: string; value: string; detail: string }[];
  downloadOptions: readonly {
    title: string;
    tag: string;
    command: string;
    description: string;
    href: string;
  }[];
  loginSteps: readonly { title: string; body: string; command: string }[];
  communitySteps: readonly { title: string; body: string }[];
  communityRules: readonly string[];
  faqs: readonly { question: string; answer: string }[];
  errorCommands: readonly { problem: string; command: string; hint: string }[];
  deepseekOfficialSteps: readonly string[];
  featureBlocks: readonly { title: string; body: string }[];
  seoLandingPages: readonly SeoLandingPage[];
  newsItems: readonly { date: string; title: string; body: string; href: string }[];
  issueWatch: readonly { id: string; title: string; href: string }[];
  sourceLinks: readonly { label: string; href: string }[];
  pages: {
    home: {
      eyebrow: string;
      title: string;
      primaryCta: string;
      secondaryCta: string;
      terminalNote: string;
      articlesTitle: string;
      articleReadLabel: string;
      sectionsTitle: string;
      seoClusterEyebrow: string;
      seoClusterTitle: string;
      seoClusterDescription: string;
      latestNewsTitle: string;
    };
    articles: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      description: string;
      readLabel: string;
    };
    articleDetail: {
      backLabel: string;
      takeawaysTitle: string;
      comparisonTitle: string;
      dimensionLabel: string;
      reasonixLabel: string;
      genericAgentLabel: string;
      platformAgentLabel: string;
      openSourceAgentLabel: string;
      sourcesTitle: string;
    };
    login: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      description: string;
      safetyTitle: string;
      safetyBodyBeforeLink: string;
      safetyBodyAfterLink: string;
      safetyLinkLabel: string;
    };
    community: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      description: string;
      discussionsCta: string;
      commentsCta: string;
      rulesTitle: string;
      configTitle: string;
      configBodyBeforeRepo: string;
      configBodyAfterRepo: string;
      statusLabel: string;
      configuredLabel: string;
      pendingLabel: string;
      configuratorLabel: string;
    };
    faq: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      description: string;
    };
    github: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      descriptionBeforeLink: string;
      descriptionAfterLink: string;
      note: string;
    };
    errors: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      description: string;
      issueWatchTitle: string;
    };
    deepseek: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      description: string;
      stepsTitle: string;
      guideTitle: string;
      guideBody: string;
      apiKeysTitle: string;
      apiKeysBody: string;
    };
    news: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      description: string;
    };
    privacy: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      description: string;
      commitmentsTitle: string;
      cards: readonly { title: string; body: string }[];
      protectionTitle: string;
      protectionBody: string;
    };
    privacyProtection: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      description: string;
      checklistTitle: string;
      accountsTitle: string;
      checkedLabel: string;
      commitmentTitle: string;
      checklist: readonly string[];
    };
    footer: {
      privacyTitle: string;
      privacyBody: string;
      legalTitle: string;
      accountsTitle: string;
    };
    notFound: {
      title: string;
      description: string;
      homeLabel: string;
    };
  };
};

const sharedSources = [
  { label: "GitHub repo", href: SITE.github },
  {
    label: "GitHub commits",
    href: "https://github.com/esengine/DeepSeek-Reasonix/commits/main-v2",
  },
  {
    label: "CLI release",
    href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v1.4.0",
  },
  {
    label: "Desktop release",
    href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.5.0",
  },
  { label: "DeepSeek official guide", href: SITE.deepseekGuide },
  { label: "DeepSeek V4 release", href: SITE.deepseekV4Release },
  { label: "npm package", href: "https://www.npmjs.com/package/reasonix" },
] as const;

const sharedIssueWatch = [
  {
    id: "#3896",
    title: "YOLO mode switching is broken in a fresh June 10 bug report",
    href: "https://github.com/esengine/DeepSeek-Reasonix/issues/3896",
  },
  {
    id: "#3883",
    title: "Saved allow rules still mis-handle Bash syntax and prefix matching",
    href: "https://github.com/esengine/DeepSeek-Reasonix/issues/3883",
  },
  {
    id: "#3877",
    title: "Desktop slash-command text localization is still open after the v1.5.0 line",
    href: "https://github.com/esengine/DeepSeek-Reasonix/issues/3877",
  },
] as const;

const sharedProjectStats = [
  { label: "GitHub stars", value: "20.9k", note: "GitHub repo page, 2026-06-11" },
  { label: "Forks", value: "1.2k", note: "GitHub repo page, 2026-06-11" },
  {
    label: "Open items",
    value: "340",
    note: "286 issues + 54 pull requests on GitHub repo page, 2026-06-11",
  },
  { label: "Default branch", value: "main-v2", note: "Go 1.0 branch" },
] as const;

export const seoLandingPagesByLocale = {
  en: [
    {
      path: "/deepseek-coding-agent",
      metaTitle: "DeepSeek coding agent: run Reasonix from the terminal",
      metaDescription:
        "DeepSeek coding agent guide for Reasonix, the DeepSeek-native terminal agent that starts with npx reasonix code and uses DeepSeek V4 Flash or Pro.",
      eyebrow: "DeepSeek coding agent",
      title: "DeepSeek coding agent: the Reasonix terminal path",
      description:
        "A DeepSeek coding agent should connect the model API, local project files, commands, and reviewable workflow. Reasonix is the direct terminal path documented by DeepSeek.",
      primaryKeyword: "deepseek coding agent",
      secondaryKeywords: [
        "DeepSeek agent",
        "DeepSeek AI coding agent",
        "Reasonix coding agent",
        "DeepSeek terminal agent",
      ],
      definitionTitle: "What this keyword means",
      definition:
        "People searching for a DeepSeek coding agent usually want more than a chat model. They want a local tool that can run from a project directory, read code, execute commands, and keep provider keys out of public pages.",
      factTitle: "Official facts to anchor the page",
      facts: [
        "DeepSeek API docs describe Reasonix as a DeepSeek-native coding agent that runs in the terminal.",
        "The documented startup command is npx reasonix code from the target project directory.",
        "Reasonix uses DeepSeek-V4-Flash by default and lets users switch to DeepSeek-V4-Pro with /pro or /preset max.",
      ],
      stepsTitle: "How to start",
      steps: [
        "Install the current Node.js version required by the reasonix npm package.",
        "Create a DeepSeek Platform API key and keep it in local setup only.",
        "Open the project directory where Reasonix should read files and run npx reasonix code.",
        "Use /help first, then /pro only when the next coding turn needs stronger reasoning.",
      ],
      modelTitle: "Why Reasonix fits this search",
      modelBody:
        "Reasonix is not positioned as a generic model wrapper. The useful distinction is its DeepSeek-native loop: cache-first operation, flash-first cost control, automatic tool-call repair, and a local terminal workflow.",
      commandTitle: "Reasonix command",
      command: "cd /path/to/my-project\nnpx reasonix code\n# inside TUI: /help, /pro, /preset max",
      faqTitle: "DeepSeek coding agent FAQ",
      faqs: [
        {
          question: "Is Reasonix a DeepSeek coding agent?",
          answer:
            "Yes. DeepSeek's API documentation describes Reasonix as a DeepSeek-native coding agent that runs in the terminal.",
        },
        {
          question: "Does this page store my DeepSeek API key?",
          answer:
            "No. The site explains the workflow; the API key belongs in your local Reasonix setup or DeepSeek Platform flow.",
        },
        {
          question: "Why not use a generic CLI?",
          answer:
            "A generic CLI can call models, but Reasonix is framed around DeepSeek's API behavior, V4 Flash/Pro switching, and long terminal sessions.",
        },
      ],
      relatedTitle: "Related DeepSeek code pages",
      ctaTitle: "Start from the official Reasonix path",
      ctaBody:
        "Use the DeepSeek guide for the official integration notes, then return here for source checks, CLI errors, and privacy boundaries.",
      ctaLabel: "Open DeepSeek guide",
    },
    {
      path: "/deepseek-code",
      metaTitle: "DeepSeek code: use npx reasonix code for local coding work",
      metaDescription:
        "DeepSeek code guide for developers who want to code with DeepSeek through Reasonix, DeepSeek V4, API keys, and a local terminal workflow.",
      eyebrow: "DeepSeek code",
      title: "DeepSeek code: how to turn DeepSeek into a local coding workflow",
      description:
        "The shortest DeepSeek code path is not a benchmark page. It is a project directory, a DeepSeek API key, and the Reasonix command that starts the terminal agent.",
      primaryKeyword: "deepseek code",
      secondaryKeywords: [
        "code with DeepSeek",
        "DeepSeek CLI",
        "npx reasonix code",
        "DeepSeek code agent",
      ],
      definitionTitle: "What readers are trying to do",
      definition:
        "Searches for DeepSeek code usually mean one of two things: writing code with a DeepSeek model, or finding the command that starts a DeepSeek-powered coding tool. This page answers both and routes the reader to Reasonix.",
      factTitle: "Official facts to anchor the page",
      facts: [
        "DeepSeek documents Reasonix under agent integrations, not as a general article or browser-only assistant.",
        "The documented command is npx reasonix code after entering the target project directory.",
        "The Reasonix path keeps DeepSeek API keys in local setup rather than collecting them on the site.",
      ],
      stepsTitle: "DeepSeek code workflow",
      steps: [
        "Confirm the package requirements with npm view reasonix engines and npm view reasonix dist-tags.",
        "Create a DeepSeek API key from DeepSeek Platform.",
        "Run npx reasonix code inside the repository you want the agent to inspect.",
        "Ask for a plan or repository explanation before letting the agent edit files.",
      ],
      modelTitle: "DeepSeek code versus one-off prompts",
      modelBody:
        "A one-off prompt can draft code, but Reasonix is useful when DeepSeek needs project context, command output, source files, and a reviewable terminal history.",
      commandTitle: "DeepSeek code command",
      command: "node -v\nnpm view reasonix dist-tags\ncd /path/to/my-project\nnpx reasonix code",
      faqTitle: "DeepSeek code FAQ",
      faqs: [
        {
          question: "What command should I run to code with DeepSeek?",
          answer:
            "For the Reasonix path, enter your project directory and run npx reasonix code.",
        },
        {
          question: "Do I need a global install?",
          answer:
            "No. The first-run path can use npx. Install globally only when you want a reusable local command.",
        },
        {
          question: "Where does the API key belong?",
          answer:
            "Use DeepSeek Platform and the local Reasonix setup flow. Do not paste provider keys into community posts, screenshots, or public repositories.",
        },
      ],
      relatedTitle: "Related DeepSeek agent pages",
      ctaTitle: "Use DeepSeek from the project directory",
      ctaBody:
        "Reasonix works best when it starts inside the repository where code context, command output, and review boundaries matter.",
      ctaLabel: "Open DeepSeek guide",
    },
    {
      path: "/deepseek-v4-agent",
      metaTitle: "DeepSeek V4 agent: Reasonix with V4 Flash and V4 Pro",
      metaDescription:
        "DeepSeekv4 agent guide covering DeepSeek V4 Flash, DeepSeek V4 Pro, Reasonix, 1M context, and the /pro or /preset max workflow.",
      eyebrow: "DeepSeek V4 agent",
      title: "DeepSeek V4 agent: how Reasonix uses Flash and Pro",
      description:
        "DeepSeek V4 agent searches need a clear model story: Flash for cost-efficient iteration, Pro for stronger reasoning, and Reasonix as the terminal agent path.",
      primaryKeyword: "deepseekv4 agent",
      secondaryKeywords: [
        "DeepSeek V4 agent",
        "DeepSeek V4 coding agent",
        "DeepSeek V4 Pro agent",
        "DeepSeek V4 Flash agent",
      ],
      definitionTitle: "What a DeepSeek V4 agent is",
      definition:
        "A DeepSeek V4 agent is a workflow that uses DeepSeek V4 models to plan, inspect files, call tools, and complete coding tasks. Reasonix gives that workflow a terminal interface.",
      factTitle: "Official facts to anchor the page",
      facts: [
        "DeepSeek V4 Preview introduced DeepSeek-V4-Pro and DeepSeek-V4-Flash with 1M context across official services.",
        "DeepSeek documents Reasonix as using DeepSeek-V4-Flash by default for cost-efficient iteration.",
        "Reasonix users can arm DeepSeek-V4-Pro with /pro for the next turn or use /preset max for the whole session.",
      ],
      stepsTitle: "Agent setup path",
      steps: [
        "Start with DeepSeek-V4-Flash for routine repository inspection, setup, and small fixes.",
        "Switch to /pro when the next step needs stronger planning, debugging, or architectural reasoning.",
        "Use /preset max only when the whole session needs Pro-level reasoning.",
        "Keep the API key local and document command approvals before broad code edits.",
      ],
      modelTitle: "Flash and Pro decision rule",
      modelBody:
        "Use Flash when speed and cost matter across many turns. Use Pro when the agent needs deeper reasoning for design, debugging, migration, or high-risk code changes.",
      commandTitle: "DeepSeek V4 agent command",
      command: "cd /path/to/my-project\nnpx reasonix code\n# default: DeepSeek-V4-Flash\n/pro\n/preset max",
      faqTitle: "DeepSeek V4 agent FAQ",
      faqs: [
        {
          question: "What is the default model path in Reasonix?",
          answer:
            "DeepSeek's Reasonix docs state that Reasonix uses DeepSeek-V4-Flash by default.",
        },
        {
          question: "How do I use DeepSeek-V4-Pro?",
          answer:
            "Inside the Reasonix TUI, use /pro for the next turn or /preset max for the full session.",
        },
        {
          question: "Should every agent task use Pro?",
          answer:
            "No. Flash is the better default for cost-efficient iteration; Pro should be reserved for harder reasoning tasks.",
        },
      ],
      relatedTitle: "Related DeepSeek V4 pages",
      ctaTitle: "Turn DeepSeek V4 into a local coding session",
      ctaBody:
        "Open the official Reasonix integration notes, then use the V4 pages here to choose Flash or Pro deliberately.",
      ctaLabel: "Open DeepSeek guide",
    },
    {
      path: "/deepseek-v4-code",
      metaTitle: "DeepSeek V4 code: coding with V4 Flash, V4 Pro, and Reasonix",
      metaDescription:
        "DeepSeekv4 code guide for coding with DeepSeek V4 Flash, DeepSeek V4 Pro, model IDs, API keys, and the Reasonix terminal command.",
      eyebrow: "DeepSeek V4 code",
      title: "DeepSeek V4 code: use V4 models for local coding work",
      description:
        "DeepSeek V4 code pages should connect the official model IDs to a practical coding workflow: API key, model choice, local project directory, and Reasonix.",
      primaryKeyword: "DeepSeekv4 code",
      secondaryKeywords: [
        "DeepSeek V4 code",
        "DeepSeek V4 coding",
        "DeepSeek V4 API coding",
        "DeepSeek V4 CLI",
      ],
      definitionTitle: "What DeepSeek V4 code means",
      definition:
        "For developers, DeepSeek V4 code means using V4 Flash or V4 Pro to inspect repositories, reason over code, and run tool-backed edits from a controlled local session.",
      factTitle: "Official facts to anchor the page",
      facts: [
        "DeepSeek V4 API model IDs include deepseek-v4-pro and deepseek-v4-flash.",
        "DeepSeek V4 supports OpenAI ChatCompletions and Anthropic APIs according to the V4 release note.",
        "Reasonix maps the DeepSeek V4 path to npx reasonix code and local project execution.",
      ],
      stepsTitle: "Code with DeepSeek V4",
      steps: [
        "Choose Flash for faster iteration or Pro for deeper reasoning.",
        "Create the API key in DeepSeek Platform and keep it out of public forms.",
        "Run Reasonix in the repository where file context is needed.",
        "Review plans, commands, and diffs before accepting broad edits.",
      ],
      modelTitle: "Model IDs and local control",
      modelBody:
        "The model IDs matter for API integrations, but users searching for DeepSeek V4 code usually need a workflow. Reasonix provides the CLI path while keeping key handling and command approval local.",
      commandTitle: "DeepSeek V4 code command",
      command: "cd /path/to/my-project\nnpx reasonix code\n# DeepSeek V4 model controls inside TUI:\n/pro\n/preset max",
      faqTitle: "DeepSeek V4 code FAQ",
      faqs: [
        {
          question: "Which DeepSeek V4 model names matter?",
          answer:
            "The V4 release names deepseek-v4-pro and deepseek-v4-flash as API model IDs.",
        },
        {
          question: "Can I use DeepSeek V4 through a CLI?",
          answer:
            "Yes. Reasonix is the DeepSeek-native terminal path documented for coding-agent work.",
        },
        {
          question: "Should the site collect my API key?",
          answer:
            "No. Use DeepSeek Platform and your local Reasonix configuration. Public pages should never collect or display provider keys.",
        },
      ],
      relatedTitle: "Related DeepSeek V4 agent pages",
      ctaTitle: "Move from model IDs to a coding workflow",
      ctaBody:
        "Use the official V4 release for model facts and the Reasonix guide for the terminal coding path.",
      ctaLabel: "Open DeepSeek guide",
    },
  ],
  "zh-cn": [
    {
      path: "/deepseek-coding-agent",
      metaTitle: "DeepSeek coding agent：用 Reasonix 从终端启动",
      metaDescription:
        "DeepSeek coding agent 长尾页：解释 Reasonix、DeepSeek V4 Flash/Pro、npx reasonix code、本地 API Key 和终端 coding agent 路径。",
      eyebrow: "DeepSeek coding agent",
      title: "DeepSeek coding agent：Reasonix 的终端路径",
      description:
        "搜索 DeepSeek coding agent 的用户通常想要一个能在项目目录里读代码、跑命令、保留上下文的本地 agent。Reasonix 正好是 DeepSeek 文档里的终端入口。",
      primaryKeyword: "deepseek coding agent",
      secondaryKeywords: [
        "DeepSeek agent",
        "DeepSeek AI coding agent",
        "Reasonix coding agent",
        "DeepSeek 终端 agent",
      ],
      definitionTitle: "这个关键词对应什么需求",
      definition:
        "它不是单纯问模型写一段代码，而是想把 DeepSeek 接到本地工程流程里：读文件、执行命令、保留历史，同时不把 API Key 暴露到网页或公开帖子。",
      factTitle: "官方事实锚点",
      facts: [
        "DeepSeek API 文档把 Reasonix 描述为运行在终端里的 DeepSeek-native coding agent。",
        "官方启动方式是在目标项目目录内运行 npx reasonix code。",
        "Reasonix 默认使用 DeepSeek-V4-Flash，需要更强推理时可用 /pro 或 /preset max 切到 DeepSeek-V4-Pro。",
      ],
      stepsTitle: "如何开始",
      steps: [
        "先检查 reasonix npm 包当前需要的 Node.js 版本。",
        "在 DeepSeek Platform 创建 API Key，并只保存在本机配置里。",
        "进入需要 Reasonix 读取的项目目录，运行 npx reasonix code。",
        "首次进入 TUI 先用 /help，再根据任务难度决定是否使用 /pro。",
      ],
      modelTitle: "为什么这个词可以落到 Reasonix",
      modelBody:
        "Reasonix 不是普通模型套壳。它的差异是 DeepSeek-native loop：cache-first、Flash 默认控成本、工具调用修复，以及可复盘的本地终端工作流。",
      commandTitle: "Reasonix 启动命令",
      command: "cd /path/to/my-project\nnpx reasonix code\n# TUI 内：/help、/pro、/preset max",
      faqTitle: "DeepSeek coding agent 常见问题",
      faqs: [
        {
          question: "Reasonix 算 DeepSeek coding agent 吗？",
          answer:
            "算。DeepSeek API 文档明确把 Reasonix 描述为运行在终端里的 DeepSeek-native coding agent。",
        },
        {
          question: "这个网站会保存 DeepSeek API Key 吗？",
          answer:
            "不会。网站只解释流程；API Key 应通过 DeepSeek Platform 和本机 Reasonix 配置处理。",
        },
        {
          question: "为什么不用普通 CLI？",
          answer:
            "普通 CLI 可以调用模型，但 Reasonix 的叙事重点是 DeepSeek V4 Flash/Pro、缓存友好长会话和本地工程任务。",
        },
      ],
      relatedTitle: "相关 DeepSeek code 页面",
      ctaTitle: "从官方 Reasonix 路径开始",
      ctaBody:
        "先打开 DeepSeek 官方集成说明，再回到本站查看下载来源、CLI 报错和隐私边界。",
      ctaLabel: "打开 DeepSeek 官方文档",
    },
    {
      path: "/deepseek-code",
      metaTitle: "DeepSeek code：用 npx reasonix code 写代码",
      metaDescription:
        "DeepSeek code 长尾页：面向想用 DeepSeek 写代码的开发者，说明 Reasonix、DeepSeek CLI、API Key 和 npx reasonix code。",
      eyebrow: "DeepSeek code",
      title: "DeepSeek code：把 DeepSeek 接进本地编码流程",
      description:
        "DeepSeek code 的实际落点不是泛泛聊天，而是项目目录、DeepSeek API Key，以及启动 Reasonix 终端 agent 的命令。",
      primaryKeyword: "deepseek code",
      secondaryKeywords: [
        "code with DeepSeek",
        "DeepSeek CLI",
        "npx reasonix code",
        "DeepSeek code agent",
      ],
      definitionTitle: "用户真正想做什么",
      definition:
        "搜索 DeepSeek code 可能是想用 DeepSeek 写代码，也可能是在找能启动 DeepSeek 编码工具的命令。本页把这两个意图都导向 Reasonix。",
      factTitle: "官方事实锚点",
      facts: [
        "Reasonix 位于 DeepSeek 文档的 agent integrations 中。",
        "官方命令是在目标项目目录运行 npx reasonix code。",
        "Reasonix 的 DeepSeek API Key 不应进入公开表单、社区帖或截图。",
      ],
      stepsTitle: "DeepSeek code 工作流",
      steps: [
        "先用 npm view reasonix engines 和 npm view reasonix dist-tags 检查当前包信息。",
        "从 DeepSeek Platform 创建 API Key。",
        "进入目标仓库目录，运行 npx reasonix code。",
        "让 agent 先解释仓库或写计划，再批准具体文件修改。",
      ],
      modelTitle: "和一次性 prompt 的区别",
      modelBody:
        "一次性 prompt 可以生成代码片段；Reasonix 更适合需要项目上下文、命令输出、文件读取和可审核历史的 DeepSeek coding work。",
      commandTitle: "DeepSeek code 命令",
      command: "node -v\nnpm view reasonix dist-tags\ncd /path/to/my-project\nnpx reasonix code",
      faqTitle: "DeepSeek code 常见问题",
      faqs: [
        {
          question: "用 DeepSeek 写代码应该运行什么命令？",
          answer: "Reasonix 路径是进入项目目录后运行 npx reasonix code。",
        },
        {
          question: "需要全局安装吗？",
          answer: "首次体验不需要，用 npx 即可；长期复用命令时再考虑 npm i -g reasonix。",
        },
        {
          question: "API Key 放在哪里？",
          answer:
            "使用 DeepSeek Platform 和本机 Reasonix 配置，不要粘贴到社区、截图或公开仓库中。",
        },
      ],
      relatedTitle: "相关 DeepSeek agent 页面",
      ctaTitle: "从项目目录使用 DeepSeek",
      ctaBody:
        "Reasonix 最适合从真实仓库启动，让代码上下文、命令输出和审批边界都留在本地。",
      ctaLabel: "打开 DeepSeek 官方文档",
    },
    {
      path: "/deepseek-v4-agent",
      metaTitle: "DeepSeek V4 agent：Reasonix 使用 V4 Flash 和 V4 Pro",
      metaDescription:
        "DeepSeekv4 agent 长尾页：解释 DeepSeek V4 Flash、DeepSeek V4 Pro、1M context、Reasonix、/pro 和 /preset max。",
      eyebrow: "DeepSeek V4 agent",
      title: "DeepSeek V4 agent：Reasonix 如何使用 Flash 和 Pro",
      description:
        "DeepSeek V4 agent 的页面需要讲清模型选择：Flash 适合低成本迭代，Pro 适合更强推理，Reasonix 则是终端 agent 路径。",
      primaryKeyword: "deepseekv4 agent",
      secondaryKeywords: [
        "DeepSeek V4 agent",
        "DeepSeek V4 coding agent",
        "DeepSeek V4 Pro agent",
        "DeepSeek V4 Flash agent",
      ],
      definitionTitle: "什么是 DeepSeek V4 agent",
      definition:
        "DeepSeek V4 agent 是用 DeepSeek V4 模型完成计划、读文件、调用工具和代码任务的工作流；Reasonix 把这个流程放进终端。",
      factTitle: "官方事实锚点",
      facts: [
        "DeepSeek V4 Preview 发布了 DeepSeek-V4-Pro 和 DeepSeek-V4-Flash，并强调 1M context。",
        "DeepSeek 的 Reasonix 文档写明 Reasonix 默认使用 DeepSeek-V4-Flash。",
        "Reasonix 用户可用 /pro 为下一轮启用 DeepSeek-V4-Pro，或用 /preset max 让整场会话走 Pro。",
      ],
      stepsTitle: "Agent 配置路径",
      steps: [
        "日常仓库理解、小改动和配置排查先用 DeepSeek-V4-Flash。",
        "需要复杂调试、架构判断或迁移计划时，用 /pro。",
        "整场会话都需要强推理时再用 /preset max。",
        "API Key 保持本地，命令和写入权限在执行前确认。",
      ],
      modelTitle: "Flash 与 Pro 的选择规则",
      modelBody:
        "多轮迭代优先 Flash，因为速度和成本更稳；高风险设计、调试、迁移和复杂代码推理再切 Pro。",
      commandTitle: "DeepSeek V4 agent 命令",
      command: "cd /path/to/my-project\nnpx reasonix code\n# 默认：DeepSeek-V4-Flash\n/pro\n/preset max",
      faqTitle: "DeepSeek V4 agent 常见问题",
      faqs: [
        {
          question: "Reasonix 默认用什么模型？",
          answer: "DeepSeek 的 Reasonix 文档写明默认使用 DeepSeek-V4-Flash。",
        },
        {
          question: "怎么使用 DeepSeek-V4-Pro？",
          answer: "在 Reasonix TUI 中输入 /pro 作用于下一轮，或用 /preset max 作用于整场会话。",
        },
        {
          question: "所有 agent 任务都应该用 Pro 吗？",
          answer: "不需要。Flash 更适合默认迭代，Pro 应留给更难的推理任务。",
        },
      ],
      relatedTitle: "相关 DeepSeek V4 页面",
      ctaTitle: "把 DeepSeek V4 变成本地编码会话",
      ctaBody:
        "先看官方 Reasonix 集成说明，再根据本站的 V4 页面决定什么时候用 Flash 或 Pro。",
      ctaLabel: "打开 DeepSeek 官方文档",
    },
    {
      path: "/deepseek-v4-code",
      metaTitle: "DeepSeek V4 code：用 V4 Flash、V4 Pro 和 Reasonix 写代码",
      metaDescription:
        "DeepSeekv4 code 长尾页：说明 DeepSeek V4 Flash、DeepSeek V4 Pro、model IDs、API Key、Reasonix CLI 和本地编码流程。",
      eyebrow: "DeepSeek V4 code",
      title: "DeepSeek V4 code：用 V4 模型做本地 coding work",
      description:
        "DeepSeek V4 code 页面应把官方 model id 和真实编码流程连起来：API Key、模型选择、项目目录和 Reasonix。",
      primaryKeyword: "DeepSeekv4 code",
      secondaryKeywords: [
        "DeepSeek V4 code",
        "DeepSeek V4 coding",
        "DeepSeek V4 API coding",
        "DeepSeek V4 CLI",
      ],
      definitionTitle: "DeepSeek V4 code 是什么",
      definition:
        "对开发者来说，它意味着用 V4 Flash 或 V4 Pro 理解仓库、分析代码、调用工具，并在可控本地会话里推进修改。",
      factTitle: "官方事实锚点",
      facts: [
        "DeepSeek V4 API model id 包括 deepseek-v4-pro 和 deepseek-v4-flash。",
        "DeepSeek V4 发布说明写明支持 OpenAI ChatCompletions 与 Anthropic APIs。",
        "Reasonix 把这条 V4 使用路径落到 npx reasonix code 和本地项目执行。",
      ],
      stepsTitle: "用 DeepSeek V4 写代码",
      steps: [
        "普通迭代优先 Flash，复杂推理再切 Pro。",
        "在 DeepSeek Platform 创建 API Key，并避免暴露到公开页面。",
        "在需要文件上下文的仓库里运行 Reasonix。",
        "接受大范围修改前先审查计划、命令和 diff。",
      ],
      modelTitle: "Model IDs 与本地控制",
      modelBody:
        "model id 对 API 集成很重要，但搜索 DeepSeek V4 code 的用户更需要一条工作流。Reasonix 提供 CLI 路径，并把 key 与审批留在本地。",
      commandTitle: "DeepSeek V4 code 命令",
      command: "cd /path/to/my-project\nnpx reasonix code\n# TUI 内 DeepSeek V4 控制：\n/pro\n/preset max",
      faqTitle: "DeepSeek V4 code 常见问题",
      faqs: [
        {
          question: "DeepSeek V4 相关 model name 是什么？",
          answer: "V4 发布说明列出了 deepseek-v4-pro 和 deepseek-v4-flash。",
        },
        {
          question: "可以通过 CLI 用 DeepSeek V4 写代码吗？",
          answer: "可以。Reasonix 是 DeepSeek 文档里的 DeepSeek-native 终端 coding agent 路径。",
        },
        {
          question: "本站应该收集 API Key 吗？",
          answer: "不应该。API Key 只应通过 DeepSeek Platform 和本机 Reasonix 配置处理。",
        },
      ],
      relatedTitle: "相关 DeepSeek V4 agent 页面",
      ctaTitle: "从 model id 走向编码工作流",
      ctaBody:
        "用官方 V4 发布页确认模型事实，用 Reasonix 官方文档确认终端 coding 路径。",
      ctaLabel: "打开 DeepSeek 官方文档",
    },
  ],
  "zh-tw": [
    {
      path: "/deepseek-coding-agent",
      metaTitle: "DeepSeek coding agent：用 Reasonix 從終端機啟動",
      metaDescription:
        "DeepSeek coding agent 長尾頁：解釋 Reasonix、DeepSeek V4 Flash/Pro、npx reasonix code、本機 API Key 和終端 coding agent 路徑。",
      eyebrow: "DeepSeek coding agent",
      title: "DeepSeek coding agent：Reasonix 的終端機路徑",
      description:
        "搜尋 DeepSeek coding agent 的使用者通常想要一個能在專案目錄裡讀程式碼、跑命令、保留上下文的本機 agent。Reasonix 正是 DeepSeek 文件中的終端機入口。",
      primaryKeyword: "deepseek coding agent",
      secondaryKeywords: [
        "DeepSeek agent",
        "DeepSeek AI coding agent",
        "Reasonix coding agent",
        "DeepSeek 終端 agent",
      ],
      definitionTitle: "這個關鍵字對應什麼需求",
      definition:
        "它不是單純問模型寫一段程式碼，而是想把 DeepSeek 接到本機工程流程裡：讀檔案、執行命令、保留歷史，同時不把 API Key 暴露到網頁或公開貼文。",
      factTitle: "官方事實錨點",
      facts: [
        "DeepSeek API 文件把 Reasonix 描述為運行在終端機裡的 DeepSeek-native coding agent。",
        "官方啟動方式是在目標專案目錄內執行 npx reasonix code。",
        "Reasonix 預設使用 DeepSeek-V4-Flash，需要更強推理時可用 /pro 或 /preset max 切到 DeepSeek-V4-Pro。",
      ],
      stepsTitle: "如何開始",
      steps: [
        "先檢查 reasonix npm package 目前需要的 Node.js 版本。",
        "在 DeepSeek Platform 建立 API Key，並只保存在本機設定裡。",
        "進入需要 Reasonix 讀取的專案目錄，執行 npx reasonix code。",
        "首次進入 TUI 先用 /help，再依任務難度決定是否使用 /pro。",
      ],
      modelTitle: "為什麼這個詞可以落到 Reasonix",
      modelBody:
        "Reasonix 不是普通模型外殼。它的差異是 DeepSeek-native loop：cache-first、Flash 預設控成本、工具呼叫修復，以及可回看的本機終端工作流。",
      commandTitle: "Reasonix 啟動命令",
      command: "cd /path/to/my-project\nnpx reasonix code\n# TUI 內：/help、/pro、/preset max",
      faqTitle: "DeepSeek coding agent 常見問題",
      faqs: [
        {
          question: "Reasonix 算 DeepSeek coding agent 嗎？",
          answer:
            "算。DeepSeek API 文件明確把 Reasonix 描述為運行在終端機裡的 DeepSeek-native coding agent。",
        },
        {
          question: "這個網站會保存 DeepSeek API Key 嗎？",
          answer:
            "不會。網站只解釋流程；API Key 應透過 DeepSeek Platform 和本機 Reasonix 設定處理。",
        },
        {
          question: "為什麼不用普通 CLI？",
          answer:
            "普通 CLI 可以呼叫模型，但 Reasonix 的敘事重點是 DeepSeek V4 Flash/Pro、快取友好長會話和本機工程任務。",
        },
      ],
      relatedTitle: "相關 DeepSeek code 頁面",
      ctaTitle: "從官方 Reasonix 路徑開始",
      ctaBody:
        "先開啟 DeepSeek 官方整合說明，再回到本站查看下載來源、CLI 報錯和隱私邊界。",
      ctaLabel: "開啟 DeepSeek 官方文件",
    },
    {
      path: "/deepseek-code",
      metaTitle: "DeepSeek code：用 npx reasonix code 寫程式碼",
      metaDescription:
        "DeepSeek code 長尾頁：面向想用 DeepSeek 寫程式碼的開發者，說明 Reasonix、DeepSeek CLI、API Key 和 npx reasonix code。",
      eyebrow: "DeepSeek code",
      title: "DeepSeek code：把 DeepSeek 接進本機編碼流程",
      description:
        "DeepSeek code 的實際落點不是泛泛聊天，而是專案目錄、DeepSeek API Key，以及啟動 Reasonix 終端 agent 的命令。",
      primaryKeyword: "deepseek code",
      secondaryKeywords: [
        "code with DeepSeek",
        "DeepSeek CLI",
        "npx reasonix code",
        "DeepSeek code agent",
      ],
      definitionTitle: "使用者真正想做什麼",
      definition:
        "搜尋 DeepSeek code 可能是想用 DeepSeek 寫程式碼，也可能是在找能啟動 DeepSeek 編碼工具的命令。本頁把這兩個意圖都導向 Reasonix。",
      factTitle: "官方事實錨點",
      facts: [
        "Reasonix 位於 DeepSeek 文件的 agent integrations 中。",
        "官方命令是在目標專案目錄執行 npx reasonix code。",
        "Reasonix 的 DeepSeek API Key 不應進入公開表單、社群貼文或截圖。",
      ],
      stepsTitle: "DeepSeek code 工作流",
      steps: [
        "先用 npm view reasonix engines 和 npm view reasonix dist-tags 檢查目前 package 資訊。",
        "從 DeepSeek Platform 建立 API Key。",
        "進入目標 repository 目錄，執行 npx reasonix code。",
        "讓 agent 先解釋 repository 或寫計畫，再批准具體檔案修改。",
      ],
      modelTitle: "和一次性 prompt 的差異",
      modelBody:
        "一次性 prompt 可以產生程式碼片段；Reasonix 更適合需要專案上下文、命令輸出、檔案讀取和可審核歷史的 DeepSeek coding work。",
      commandTitle: "DeepSeek code 命令",
      command: "node -v\nnpm view reasonix dist-tags\ncd /path/to/my-project\nnpx reasonix code",
      faqTitle: "DeepSeek code 常見問題",
      faqs: [
        {
          question: "用 DeepSeek 寫程式碼應該執行什麼命令？",
          answer: "Reasonix 路徑是進入專案目錄後執行 npx reasonix code。",
        },
        {
          question: "需要全域安裝嗎？",
          answer: "首次體驗不需要，用 npx 即可；長期重複使用命令時再考慮 npm i -g reasonix。",
        },
        {
          question: "API Key 放在哪裡？",
          answer:
            "使用 DeepSeek Platform 和本機 Reasonix 設定，不要貼到社群、截圖或公開 repository 中。",
        },
      ],
      relatedTitle: "相關 DeepSeek agent 頁面",
      ctaTitle: "從專案目錄使用 DeepSeek",
      ctaBody:
        "Reasonix 最適合從真實 repository 啟動，讓程式碼上下文、命令輸出和審批邊界都留在本機。",
      ctaLabel: "開啟 DeepSeek 官方文件",
    },
    {
      path: "/deepseek-v4-agent",
      metaTitle: "DeepSeek V4 agent：Reasonix 使用 V4 Flash 和 V4 Pro",
      metaDescription:
        "DeepSeekv4 agent 長尾頁：解釋 DeepSeek V4 Flash、DeepSeek V4 Pro、1M context、Reasonix、/pro 和 /preset max。",
      eyebrow: "DeepSeek V4 agent",
      title: "DeepSeek V4 agent：Reasonix 如何使用 Flash 和 Pro",
      description:
        "DeepSeek V4 agent 的頁面需要講清模型選擇：Flash 適合低成本迭代，Pro 適合更強推理，Reasonix 則是終端 agent 路徑。",
      primaryKeyword: "deepseekv4 agent",
      secondaryKeywords: [
        "DeepSeek V4 agent",
        "DeepSeek V4 coding agent",
        "DeepSeek V4 Pro agent",
        "DeepSeek V4 Flash agent",
      ],
      definitionTitle: "什麼是 DeepSeek V4 agent",
      definition:
        "DeepSeek V4 agent 是用 DeepSeek V4 模型完成計畫、讀檔案、呼叫工具和程式碼任務的工作流；Reasonix 把這個流程放進終端機。",
      factTitle: "官方事實錨點",
      facts: [
        "DeepSeek V4 Preview 發布了 DeepSeek-V4-Pro 和 DeepSeek-V4-Flash，並強調 1M context。",
        "DeepSeek 的 Reasonix 文件寫明 Reasonix 預設使用 DeepSeek-V4-Flash。",
        "Reasonix 使用者可用 /pro 為下一輪啟用 DeepSeek-V4-Pro，或用 /preset max 讓整場會話走 Pro。",
      ],
      stepsTitle: "Agent 設定路徑",
      steps: [
        "日常 repository 理解、小改動和設定排查先用 DeepSeek-V4-Flash。",
        "需要複雜除錯、架構判斷或遷移計畫時，用 /pro。",
        "整場會話都需要強推理時再用 /preset max。",
        "API Key 保持本機，命令和寫入權限在執行前確認。",
      ],
      modelTitle: "Flash 與 Pro 的選擇規則",
      modelBody:
        "多輪迭代優先 Flash，因為速度和成本更穩；高風險設計、除錯、遷移和複雜程式碼推理再切 Pro。",
      commandTitle: "DeepSeek V4 agent 命令",
      command: "cd /path/to/my-project\nnpx reasonix code\n# 預設：DeepSeek-V4-Flash\n/pro\n/preset max",
      faqTitle: "DeepSeek V4 agent 常見問題",
      faqs: [
        {
          question: "Reasonix 預設用什麼模型？",
          answer: "DeepSeek 的 Reasonix 文件寫明預設使用 DeepSeek-V4-Flash。",
        },
        {
          question: "怎麼使用 DeepSeek-V4-Pro？",
          answer: "在 Reasonix TUI 中輸入 /pro 作用於下一輪，或用 /preset max 作用於整場會話。",
        },
        {
          question: "所有 agent 任務都應該用 Pro 嗎？",
          answer: "不需要。Flash 更適合預設迭代，Pro 應留給更難的推理任務。",
        },
      ],
      relatedTitle: "相關 DeepSeek V4 頁面",
      ctaTitle: "把 DeepSeek V4 變成本機編碼會話",
      ctaBody:
        "先看官方 Reasonix 整合說明，再依據本站的 V4 頁面決定什麼時候用 Flash 或 Pro。",
      ctaLabel: "開啟 DeepSeek 官方文件",
    },
    {
      path: "/deepseek-v4-code",
      metaTitle: "DeepSeek V4 code：用 V4 Flash、V4 Pro 和 Reasonix 寫程式碼",
      metaDescription:
        "DeepSeekv4 code 長尾頁：說明 DeepSeek V4 Flash、DeepSeek V4 Pro、model IDs、API Key、Reasonix CLI 和本機編碼流程。",
      eyebrow: "DeepSeek V4 code",
      title: "DeepSeek V4 code：用 V4 模型做本機 coding work",
      description:
        "DeepSeek V4 code 頁面應把官方 model id 和真實編碼流程連起來：API Key、模型選擇、專案目錄和 Reasonix。",
      primaryKeyword: "DeepSeekv4 code",
      secondaryKeywords: [
        "DeepSeek V4 code",
        "DeepSeek V4 coding",
        "DeepSeek V4 API coding",
        "DeepSeek V4 CLI",
      ],
      definitionTitle: "DeepSeek V4 code 是什麼",
      definition:
        "對開發者來說，它意味著用 V4 Flash 或 V4 Pro 理解 repository、分析程式碼、呼叫工具，並在可控本機會話裡推進修改。",
      factTitle: "官方事實錨點",
      facts: [
        "DeepSeek V4 API model id 包括 deepseek-v4-pro 和 deepseek-v4-flash。",
        "DeepSeek V4 發布說明寫明支援 OpenAI ChatCompletions 與 Anthropic APIs。",
        "Reasonix 把這條 V4 使用路徑落到 npx reasonix code 和本機專案執行。",
      ],
      stepsTitle: "用 DeepSeek V4 寫程式碼",
      steps: [
        "普通迭代優先 Flash，複雜推理再切 Pro。",
        "在 DeepSeek Platform 建立 API Key，並避免暴露到公開頁面。",
        "在需要檔案上下文的 repository 裡執行 Reasonix。",
        "接受大範圍修改前先審查計畫、命令和 diff。",
      ],
      modelTitle: "Model IDs 與本機控制",
      modelBody:
        "model id 對 API 整合很重要，但搜尋 DeepSeek V4 code 的使用者更需要一條工作流。Reasonix 提供 CLI 路徑，並把 key 與審批留在本機。",
      commandTitle: "DeepSeek V4 code 命令",
      command: "cd /path/to/my-project\nnpx reasonix code\n# TUI 內 DeepSeek V4 控制：\n/pro\n/preset max",
      faqTitle: "DeepSeek V4 code 常見問題",
      faqs: [
        {
          question: "DeepSeek V4 相關 model name 是什麼？",
          answer: "V4 發布說明列出了 deepseek-v4-pro 和 deepseek-v4-flash。",
        },
        {
          question: "可以透過 CLI 用 DeepSeek V4 寫程式碼嗎？",
          answer: "可以。Reasonix 是 DeepSeek 文件裡的 DeepSeek-native 終端 coding agent 路徑。",
        },
        {
          question: "本站應該收集 API Key 嗎？",
          answer: "不應該。API Key 只應透過 DeepSeek Platform 和本機 Reasonix 設定處理。",
        },
      ],
      relatedTitle: "相關 DeepSeek V4 agent 頁面",
      ctaTitle: "從 model id 走向編碼工作流",
      ctaBody:
        "用官方 V4 發布頁確認模型事實，用 Reasonix 官方文件確認終端 coding 路徑。",
      ctaLabel: "開啟 DeepSeek 官方文件",
    },
  ],
  ru: [
    {
      path: "/deepseek-coding-agent",
      metaTitle: "DeepSeek coding agent: Reasonix terminal workflow",
      metaDescription:
        "DeepSeek coding agent guide for Reasonix, DeepSeek V4 Flash/Pro, npx reasonix code, local API keys, and terminal coding work.",
      eyebrow: "DeepSeek coding agent",
      title: "DeepSeek coding agent: terminal path through Reasonix",
      description:
        "A DeepSeek coding agent should connect model reasoning with local files, commands, and reviewable workflow. Reasonix is the terminal path documented by DeepSeek.",
      primaryKeyword: "deepseek coding agent",
      secondaryKeywords: [
        "DeepSeek agent",
        "DeepSeek AI coding agent",
        "Reasonix coding agent",
        "DeepSeek terminal agent",
      ],
      definitionTitle: "What the keyword means",
      definition:
        "Users searching for this term want more than code snippets. They want DeepSeek inside a local engineering flow with file access, commands, project history, and API keys kept outside public pages.",
      factTitle: "Official facts",
      facts: [
        "DeepSeek API docs describe Reasonix as a DeepSeek-native coding agent that runs in the terminal.",
        "The official startup command is npx reasonix code inside the target project directory.",
        "Reasonix defaults to DeepSeek-V4-Flash and can switch to DeepSeek-V4-Pro with /pro or /preset max.",
      ],
      stepsTitle: "How to start",
      steps: [
        "Check the current Node.js requirement for the reasonix npm package.",
        "Create a DeepSeek Platform API key and keep it local.",
        "Enter the project directory and run npx reasonix code.",
        "Use /help first, then use /pro only when the task needs stronger reasoning.",
      ],
      modelTitle: "Why Reasonix fits this query",
      modelBody:
        "Reasonix is not just a generic wrapper. It emphasizes DeepSeek-native cache behavior, Flash-first cost control, tool-call repair, and a local terminal workflow.",
      commandTitle: "Reasonix command",
      command: "cd /path/to/my-project\nnpx reasonix code\n# inside TUI: /help, /pro, /preset max",
      faqTitle: "DeepSeek coding agent FAQ",
      faqs: [
        {
          question: "Is Reasonix a DeepSeek coding agent?",
          answer:
            "Yes. DeepSeek API docs describe Reasonix as a DeepSeek-native terminal coding agent.",
        },
        {
          question: "Does the site store my DeepSeek API key?",
          answer:
            "No. The site explains the workflow; keys belong in DeepSeek Platform and local Reasonix setup.",
        },
        {
          question: "Why not use a generic CLI?",
          answer:
            "Generic CLIs can call models, but Reasonix is focused on DeepSeek V4 Flash/Pro, long sessions, and local coding work.",
        },
      ],
      relatedTitle: "Related DeepSeek code pages",
      ctaTitle: "Start from the official Reasonix path",
      ctaBody:
        "Use the DeepSeek guide for official integration notes, then return here for downloads, CLI errors, and privacy boundaries.",
      ctaLabel: "Open DeepSeek guide",
    },
    {
      path: "/deepseek-code",
      metaTitle: "DeepSeek code: use npx reasonix code locally",
      metaDescription:
        "DeepSeek code guide for developers using Reasonix, DeepSeek CLI workflow, API keys, and npx reasonix code inside a project directory.",
      eyebrow: "DeepSeek code",
      title: "DeepSeek code: connect DeepSeek to a local coding workflow",
      description:
        "The practical DeepSeek code path is a project directory, a DeepSeek API key, and the Reasonix command that starts the terminal agent.",
      primaryKeyword: "deepseek code",
      secondaryKeywords: [
        "code with DeepSeek",
        "DeepSeek CLI",
        "npx reasonix code",
        "DeepSeek code agent",
      ],
      definitionTitle: "What users are trying to do",
      definition:
        "DeepSeek code can mean writing code with a DeepSeek model or finding the command that starts a DeepSeek coding tool. This page connects both intents to Reasonix.",
      factTitle: "Official facts",
      facts: [
        "Reasonix appears in the DeepSeek API docs under agent integrations.",
        "The documented command is npx reasonix code from the target project directory.",
        "DeepSeek API keys should stay in local setup rather than public forms or screenshots.",
      ],
      stepsTitle: "DeepSeek code workflow",
      steps: [
        "Check npm view reasonix engines and npm view reasonix dist-tags.",
        "Create a DeepSeek API key from DeepSeek Platform.",
        "Enter the repository and run npx reasonix code.",
        "Ask for a plan before accepting file edits.",
      ],
      modelTitle: "Beyond one-off prompts",
      modelBody:
        "One-off prompts can draft snippets. Reasonix is better for repository context, command output, file inspection, and auditable terminal history.",
      commandTitle: "DeepSeek code command",
      command: "node -v\nnpm view reasonix dist-tags\ncd /path/to/my-project\nnpx reasonix code",
      faqTitle: "DeepSeek code FAQ",
      faqs: [
        {
          question: "What command starts DeepSeek coding work?",
          answer: "For Reasonix, enter the project directory and run npx reasonix code.",
        },
        {
          question: "Do I need a global install?",
          answer: "No. Use npx first; install globally only for a reusable command.",
        },
        {
          question: "Where should the API key live?",
          answer:
            "Use DeepSeek Platform and local Reasonix setup. Do not post provider keys publicly.",
        },
      ],
      relatedTitle: "Related DeepSeek agent pages",
      ctaTitle: "Use DeepSeek from the project directory",
      ctaBody:
        "Reasonix works best when file context, command output, and approval boundaries stay local.",
      ctaLabel: "Open DeepSeek guide",
    },
    {
      path: "/deepseek-v4-agent",
      metaTitle: "DeepSeek V4 agent: Reasonix with V4 Flash and Pro",
      metaDescription:
        "DeepSeekv4 agent guide for DeepSeek V4 Flash, DeepSeek V4 Pro, 1M context, Reasonix, /pro, and /preset max.",
      eyebrow: "DeepSeek V4 agent",
      title: "DeepSeek V4 agent: how Reasonix uses Flash and Pro",
      description:
        "A DeepSeek V4 agent page needs a clear model rule: Flash for cost-efficient iteration, Pro for stronger reasoning, and Reasonix as the terminal path.",
      primaryKeyword: "deepseekv4 agent",
      secondaryKeywords: [
        "DeepSeek V4 agent",
        "DeepSeek V4 coding agent",
        "DeepSeek V4 Pro agent",
        "DeepSeek V4 Flash agent",
      ],
      definitionTitle: "What a DeepSeek V4 agent is",
      definition:
        "A DeepSeek V4 agent uses V4 models to plan, read files, call tools, and complete code tasks. Reasonix brings that workflow to the terminal.",
      factTitle: "Official facts",
      facts: [
        "DeepSeek V4 Preview introduced DeepSeek-V4-Pro and DeepSeek-V4-Flash with 1M context.",
        "DeepSeek Reasonix docs state that Reasonix uses DeepSeek-V4-Flash by default.",
        "Reasonix can switch to DeepSeek-V4-Pro with /pro for one turn or /preset max for the session.",
      ],
      stepsTitle: "Agent setup path",
      steps: [
        "Use DeepSeek-V4-Flash for routine repository understanding and small fixes.",
        "Use /pro for difficult debugging, architecture, or migration planning.",
        "Use /preset max only when the whole session needs Pro.",
        "Keep API keys local and confirm command permissions before edits.",
      ],
      modelTitle: "Flash versus Pro",
      modelBody:
        "Flash is the default for speed and cost across many turns. Pro should be reserved for harder reasoning and high-risk code changes.",
      commandTitle: "DeepSeek V4 agent command",
      command: "cd /path/to/my-project\nnpx reasonix code\n# default: DeepSeek-V4-Flash\n/pro\n/preset max",
      faqTitle: "DeepSeek V4 agent FAQ",
      faqs: [
        {
          question: "What model does Reasonix use by default?",
          answer: "The DeepSeek Reasonix docs state that the default is DeepSeek-V4-Flash.",
        },
        {
          question: "How do I use DeepSeek-V4-Pro?",
          answer: "Use /pro for the next turn or /preset max for the full session.",
        },
        {
          question: "Should every task use Pro?",
          answer: "No. Flash is the better default; Pro is for harder reasoning work.",
        },
      ],
      relatedTitle: "Related DeepSeek V4 pages",
      ctaTitle: "Turn DeepSeek V4 into a local coding session",
      ctaBody:
        "Use official Reasonix notes for setup, then choose Flash or Pro deliberately.",
      ctaLabel: "Open DeepSeek guide",
    },
    {
      path: "/deepseek-v4-code",
      metaTitle: "DeepSeek V4 code: coding with V4 Flash, Pro, and Reasonix",
      metaDescription:
        "DeepSeekv4 code guide for V4 Flash, V4 Pro, model IDs, API keys, Reasonix CLI, and local coding workflow.",
      eyebrow: "DeepSeek V4 code",
      title: "DeepSeek V4 code: use V4 models for local coding work",
      description:
        "DeepSeek V4 code should connect model IDs to a practical workflow: API key, model choice, project directory, and Reasonix.",
      primaryKeyword: "DeepSeekv4 code",
      secondaryKeywords: [
        "DeepSeek V4 code",
        "DeepSeek V4 coding",
        "DeepSeek V4 API coding",
        "DeepSeek V4 CLI",
      ],
      definitionTitle: "What DeepSeek V4 code means",
      definition:
        "For developers, it means using V4 Flash or V4 Pro to understand repositories, analyze code, call tools, and make controlled local changes.",
      factTitle: "Official facts",
      facts: [
        "DeepSeek V4 API model IDs include deepseek-v4-pro and deepseek-v4-flash.",
        "The V4 release says the API supports OpenAI ChatCompletions and Anthropic APIs.",
        "Reasonix maps this V4 path to npx reasonix code and local project execution.",
      ],
      stepsTitle: "Code with DeepSeek V4",
      steps: [
        "Choose Flash for normal iteration and Pro for deeper reasoning.",
        "Create a DeepSeek Platform API key and keep it private.",
        "Run Reasonix inside the repository where file context is needed.",
        "Review plans, commands, and diffs before broad edits.",
      ],
      modelTitle: "Model IDs and local control",
      modelBody:
        "Model IDs matter for APIs, but users searching for DeepSeek V4 code usually need workflow. Reasonix provides the CLI path and keeps keys and approvals local.",
      commandTitle: "DeepSeek V4 code command",
      command: "cd /path/to/my-project\nnpx reasonix code\n# DeepSeek V4 controls inside TUI:\n/pro\n/preset max",
      faqTitle: "DeepSeek V4 code FAQ",
      faqs: [
        {
          question: "Which DeepSeek V4 model names matter?",
          answer: "The V4 release names deepseek-v4-pro and deepseek-v4-flash.",
        },
        {
          question: "Can I use DeepSeek V4 through a CLI?",
          answer: "Yes. Reasonix is the DeepSeek-native terminal path for coding-agent work.",
        },
        {
          question: "Should this site collect API keys?",
          answer: "No. Use DeepSeek Platform and local Reasonix configuration.",
        },
      ],
      relatedTitle: "Related DeepSeek V4 agent pages",
      ctaTitle: "Move from model IDs to workflow",
      ctaBody:
        "Use the V4 release for model facts and the Reasonix guide for the terminal coding path.",
      ctaLabel: "Open DeepSeek guide",
    },
  ],
} satisfies Record<Locale, readonly SeoLandingPage[]>;

export const contentByLocale = {
  en: {
    site: {
      title: SITE.title,
      slogan: SITE.slogan,
      description: SITE.description,
      shellSubtitle: "Reasonix setup guide",
      contentPrinciplesTitle: "Keep keys local",
      contentPrinciplesBody:
        "For developers already using Claude Code, Codex, OpenCode, Cursor, or Copilot, Reasonix focuses on direct DeepSeek usage, lower-cost long sessions, local project control, plugin extension, and reviewable execution.",
      lastCheckedLabel: "Last checked",
      deepseekButtonLabel: "DeepSeek guide",
    },
    metadataKeywords: [
      "Reasonix",
      "DeepSeek Reasonix",
      "Reasonix download",
      "Reasonix errors",
      "DeepSeek official recommendation",
      "npx reasonix code",
      "DeepSeek coding agent",
      "deepseek coding agent",
      "deepseek code",
      "DeepSeek V4 agent",
      "DeepSeek V4 code",
      "deepseekv4 agent",
      "DeepSeekv4 code",
    ],
    navItems: [
      { href: "/", label: "Overview", icon: "layout", eyebrow: "Start" },
      { href: "/articles", label: "Articles", icon: "book", eyebrow: "Compare" },
      { href: "/login", label: "Login", icon: "login", eyebrow: "Clerk" },
      { href: "/community", label: "Community", icon: "community", eyebrow: "Discuss" },
      { href: "/faq", label: "FAQ", icon: "help", eyebrow: "Answers" },
      { href: "/github", label: "GitHub downloads", icon: "github", eyebrow: "Download" },
      { href: "/errors", label: "CLI errors", icon: "terminal", eyebrow: "Troubleshoot" },
      { href: "/deepseek", label: "DeepSeek official", icon: "badge", eyebrow: "Signal" },
      { href: "/news", label: "News", icon: "newspaper", eyebrow: "Updates" },
    ],
    commandReference: {
      title: "TUI commands",
      sourceLabel: "CLI ref",
      sourceHref: SITE.cliReference,
      items: [
        { command: "/help", label: "Open the inline command reference." },
        { command: "/skills", label: "List installed skills and open the picker." },
        { command: "/skill new <name>", label: "Scaffold a project skill." },
        { command: "/memory list", label: "Review pinned project memory." },
        { command: "/mcp", label: "Open the MCP hub." },
        { command: "/status", label: "Check model, context, and session state." },
        { command: "/plan on", label: "Use read-only planning before edits." },
        { command: "/doctor", label: "Run API, config, hook, and project checks." },
      ],
    },
    legalLinks: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/privacy-protection", label: "Privacy protection" },
    ],
    privacyCommitments: [
      "Your site account session is handled by Clerk; provider API keys for DeepSeek, OpenAI, Anthropic, or others stay outside Reasonix.",
      "Use the linked GitHub, npm, DeepSeek Platform, and vendor pages as the source of truth for downloads and API-key setup.",
      "You are not asked to accept tracking cookies, ad redirects, or third-party model submission on this site by default.",
      "Review every command-line snippet in your own terminal and project directory before running it.",
    ],
    officialAccounts: [
      {
        name: "Reasonix",
        context: "DeepSeek-native coding agent",
        githubLabel: "esengine/DeepSeek-Reasonix",
        github: SITE.github,
        xLabel: SITE.xHandle,
        x: SITE.x,
        note: "Reasonix announcements are published from this X account; continue to verify downloads through GitHub, npm, and the DeepSeek agent recommendation page.",
      },
      {
        name: "DeepSeek",
        context: "Recommendation source for Reasonix",
        githubLabel: "deepseek-ai",
        github: "https://github.com/deepseek-ai",
        xLabel: "@deepseek_ai",
        x: "https://x.com/deepseek_ai",
        note: "DeepSeek links to its X account from the official site and maintains the deepseek-ai GitHub organization.",
      },
    ],
    projectStats: sharedProjectStats,
    quickFacts: [
      {
        label: "Current npm tags",
        value: "latest 0.53.2 / next 1.1.0",
        detail:
          "As checked on 2026-06-04, npm latest is 0.53.2 and npm next is 1.1.0. Re-check npm dist-tags before choosing an install path.",
      },
      {
        label: "Official repository",
        value: "esengine/DeepSeek-Reasonix",
        detail:
          "The GitHub default branch is main-v2, and the project is described as a DeepSeek-native AI coding agent for your terminal.",
      },
      {
        label: "Reasonix entry",
        value: "npx reasonix code",
        detail:
          "Reasonix starts from the target project directory with a DeepSeek API key. Check the current npm package engines before first run.",
      },
    ],
    downloadOptions: [
      {
        title: "Start from the DeepSeek guide",
        tag: "New users",
        command: "cd /path/to/my-project\nnpx reasonix code",
        description:
          "No global install is required. The first run opens the local setup flow, which is the shortest path for trying the DeepSeek-V4-Flash default mode.",
        href: SITE.deepseekGuide,
      },
      {
        title: "Clone main-v2 from GitHub",
        tag: "Source build",
        command:
          "git clone https://github.com/esengine/DeepSeek-Reasonix.git\ncd DeepSeek-Reasonix\ngit switch main-v2\nmake build",
        description:
          "main-v2 is the default Go 1.0 development branch. Use a source build when you need to inspect, patch, or verify the newest commits.",
        href: SITE.github,
      },
      {
        title: "Desktop release assets",
        tag: "Desktop package",
        command:
          "open https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.5.0",
        description:
          "The latest public desktop release is desktop-v1.5.0, adding a Linux .deb package plus new approval, YOLO, and desktop layout fixes in the June 10 release line.",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.5.0",
      },
    ],
    loginSteps: [
      {
        title: "Sign in to DeepSeek Platform",
        body: "Open the DeepSeek API Keys page to create or copy the model API key used by Reasonix. Keep that key out of public posts, screenshots, and repositories.",
        command: "open https://platform.deepseek.com/api_keys",
      },
      {
        title: "Start Reasonix inside your project",
        body: "DeepSeek recommends running npx from the target project directory so Reasonix can read the workspace and build local project memory.",
        command: "cd /path/to/my-project\nnpx reasonix code",
      },
      {
        title: "Switch to Pro in the TUI",
        body: "The default path uses DeepSeek-V4-Flash for cost control. For stronger reasoning, use /pro or /preset max inside the TUI.",
        command: "/pro\n/preset max\n/help",
      },
    ],
    communitySteps: [
      {
        title: "Use your Clerk session",
        body: "Community posting and replies use the Reasonix Clerk site session. DeepSeek API keys remain in your local setup.",
      },
      {
        title: "Questions live in Supabase",
        body: "Questions and replies are stored in Supabase Postgres. Public pages only show visible content, while admins can hide or restore entries.",
      },
      {
        title: "Do not paste secrets",
        body: "Bug reports can include commands, versions, and error summaries, but should not include DeepSeek, OpenAI, Anthropic, or other provider API keys.",
      },
    ],
    communityRules: [
      "Prioritize Reasonix installation, versions, DeepSeek API key setup, CLI errors, and article corrections.",
      "You may share minimal reproduction commands, Node/npm/go versions, and public issue links, but not secrets, tokens, private repositories, or complete environment variables.",
      "Authors can edit or delete their own content; admins can hide or restore questions and replies.",
      "Version 1 does not include likes, favorites, private messages, notifications, profiles, or full-text search.",
    ],
    faqs: [
      {
        question: "How is Reasonix different from a generic OpenAI-compatible CLI?",
        answer:
          "Reasonix emphasizes DeepSeek-native behavior, prefix-cache stability, flash-first cost control, and automatic tool-call repair. It is not just another CLI with a model name changed.",
      },
      {
        question: "Where should I run npx reasonix code for the first time?",
        answer:
          "Run it inside the project directory you want Reasonix to read and edit. That keeps file context, command output, and project memory tied to the correct repository.",
      },
      {
        question: "What should I check before the first run?",
        answer:
          "Check node -v, npm -v, npm view reasonix engines, and npm view reasonix dist-tags. The npm package currently declares Node >=22, so prefer live package metadata when older guides disagree.",
      },
      {
        question: "Should I use npx, global npm install, or build from source?",
        answer:
          "Use npx reasonix code for first-time testing, npm i -g reasonix when you want a reusable local command, and a main-v2 source build only when you need to inspect, patch, or verify current commits.",
      },
      {
        question: "Why are npm latest and npm next different?",
        answer:
          "As of 2026-06-04, npm latest is 0.53.2 and npm next is 1.1.0. Unpinned npm and npx commands use latest by default; use an explicit tag only when you intentionally want that line.",
      },
      {
        question: "Does the login page store my API key?",
        answer:
          "No. The login page uses Clerk for a site account session. DeepSeek API keys should stay in your own environment variables or local Reasonix config.",
      },
      {
        question: "Where should my DeepSeek API key live?",
        answer:
          "Keep it in the local Reasonix setup, your shell environment, or a local secret manager. Do not paste provider keys into community posts, screenshots, public issues, or repository commits.",
      },
      {
        question: "What if npx reasonix code starts the wrong version?",
        answer:
          "Run npm view reasonix dist-tags, verify npm cache, and pin reasonix@latest or reasonix@next only when you mean that tag. If a global install shadows npx, check your PATH and npm global bin directory.",
      },
      {
        question: "What if the reasonix command is not found?",
        answer:
          "Use npx reasonix code without a global install, or reinstall the global package and confirm that npm's global bin directory is on PATH. Also confirm you are in the intended project directory.",
      },
      {
        question: "When should I use /help, /pro, or /preset max?",
        answer:
          "Start with /help to inspect available commands. Use /pro for a single stronger reasoning turn, and /preset max when a whole session needs the stronger model setting.",
      },
      {
        question: "What projects are a good fit for Reasonix?",
        answer:
          "Reasonix is most useful in local code repositories where a DeepSeek-native agent can read files, run commands, and keep a long working context. It is less useful for short one-off prompts that do not need project state.",
      },
      {
        question: "What details should I include in a support question?",
        answer:
          "Include the command, operating system, node -v, npm -v, selected npm tag, and a short error summary. Remove API keys, tokens, private repository URLs, and full environment dumps before posting.",
      },
    ],
    errorCommands: [
      {
        problem: "npx reasonix code does not start or resolves the wrong version",
        command:
          "node -v\nnpm view reasonix engines\nnpm view reasonix dist-tags\nnpm cache verify\nnpx reasonix@latest code",
        hint: "Use live npm metadata for the current Node requirement and package tags. Clear npm cache or pin the intended tag if npx resolves an unexpected package.",
      },
      {
        problem: "DeepSeek API key is missing or credentials expired",
        command: "open https://platform.deepseek.com/api_keys\nprintenv DEEPSEEK_API_KEY\nnpx reasonix code",
        hint: "Confirm that a DeepSeek Platform API key exists first. Do not commit keys to public repositories.",
      },
      {
        problem: "Source build cannot find make or Go",
        command: "go version\nmake --version\ngit switch main-v2\nmake build",
        hint: "main-v2 is the Go rewrite branch, so source builds require a Go toolchain and make.",
      },
      {
        problem: "Terminal scrolling, selection, or paste behaves incorrectly",
        command:
          "echo $TERM\nprintf '\\e[?1000h'\n# Windows users should also review Git for Windows and Windows Terminal settings",
        hint: "GitHub issue #2649 tracks Windows Terminal scrolling, PageUp/PageDown, and selection-copy behavior.",
      },
      {
        problem: "Messages beginning with # are not received by the agent",
        command: "npx reasonix@latest code\n# Temporary workaround: add a leading space or newline, then follow issue #2658",
        hint: "This was still an open GitHub bug report on 2026-06-02, so it belongs in the error tracking area.",
      },
      {
        problem: "Need to confirm DeepSeek API connectivity",
        command:
          "curl -s https://api.deepseek.com | head\n# Then return to Reasonix and run /help or /pro to verify model switching",
        hint: "Network reachability is not the same as successful authentication. Key and Reasonix config still need separate checks.",
      },
    ],
    deepseekOfficialSteps: [
      "Check the current Node requirement with npm view reasonix engines; Windows users also need Git for Windows.",
      "Create or copy an API key from DeepSeek Platform.",
      "Run npx reasonix code inside the target project directory.",
      "Use DeepSeek-V4-Flash by default; enter /pro or /preset max in the TUI for Pro.",
      "Run /help inside the Reasonix TUI for the full command list.",
    ],
    featureBlocks: [
      {
        title: "Direct DeepSeek path, not a wrapper",
        body: "Compared with generic OpenAI-compatible tools, Reasonix is designed around the DeepSeek path: low-cost iteration by default, with stronger reasoning when the task needs it.",
      },
      {
        title: "Lower-cost long sessions",
        body: "Compared with agents that spend heavily on repeated context, Reasonix is better suited to sustained debugging, refactors, and multi-hour work.",
      },
      {
        title: "Terminal and desktop entry points",
        body: "Compared with tools tied to an IDE or web app, Reasonix can start in the project terminal and also offers a desktop client.",
      },
      {
        title: "Plan gates for code edits",
        body: "Compared with agents that edit immediately, Reasonix can show the plan first, then confirm risky changes, commands, and write boundaries.",
      },
      {
        title: "MCP, Skills, and Memory",
        body: "Compared with fixed-function agents, Reasonix can connect external tools and preserve project-specific skills and memory.",
      },
      {
        title: "Reviewable run history",
        body: "Compared with one-shot chats, branches, checkpoints, and command history make debugging, handoff, and resuming easier.",
      },
    ],
    seoLandingPages: seoLandingPagesByLocale.en,
    newsItems: [
      {
        date: "2026-06-10",
        title: "Reasonix Desktop v1.5.0 adds Linux .deb packaging and new approval-mode fixes",
        body: "GitHub releases mark Reasonix Desktop v1.5.0 as the latest release on June 10, adding a Linux .deb package while also fixing pending todo signoff, YOLO ask-tool behavior, and desktop approval-rule layout breakage in the same release line.",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.5.0",
      },
      {
        date: "2026-06-04",
        title: "Reasonix CLI npm tags split latest and next",
        body: "npm view reasonix dist-tags reports latest as 0.53.2 and next as 1.1.0. Check tags before choosing npx, global npm install, or source build.",
        href: "https://www.npmjs.com/package/reasonix",
      },
      {
        date: "2026-06-07",
        title: "desktop-v1.3.0 becomes the latest public desktop release",
        body: "GitHub marked Reasonix Desktop v1.3.0 as the latest release on June 7, bundling the same release-line changes as v1.3.0, including desktop notifications, TUI composer growth fixes, workspace builtin assembly fixes, and legacy session import repair.",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.3.0",
      },
      {
        date: "2026-06-02",
        title: "Reasonix main-v2 CLI adds grep, .gitignore, and interruptible bash",
        body: "Reasonix main-v2 GitHub commits on June 2 show native grep, GBK/GB18030 encoding support, and interruptible bash live streamed output changes.",
        href: "https://github.com/esengine/DeepSeek-Reasonix/commits/main-v2",
      },
      {
        date: "2026-06-02",
        title: "DeepSeek API docs continue to list Reasonix",
        body: "The DeepSeek API docs include the DeepSeek API key and npx reasonix code startup path. Verify the current Node engine from the npm package before running it.",
        href: SITE.deepseekGuide,
      },
    ],
    issueWatch: sharedIssueWatch,
    sourceLinks: sharedSources,
    pages: {
      home: {
        eyebrow: "DeepSeek-native coding agent guide",
        title: "Start the DeepSeek-focused coding agent from your terminal",
        primaryCta: "View GitHub downloads",
        secondaryCta: "Troubleshoot CLI errors",
        terminalNote:
          "Reasonix quick-start path. Follow the GitHub main-v2 branch when you want the Go rewrite.",
        articlesTitle: "Deep-dive articles",
        articleReadLabel: "Read",
        sectionsTitle: "Product overview",
        seoClusterEyebrow: "DeepSeek long-tail guides",
        seoClusterTitle: "DeepSeek coding agent and V4 code pages",
        seoClusterDescription:
          "These focused pages answer DeepSeek coding-agent, DeepSeek code, DeepSeek V4 agent, and DeepSeek V4 code searches before routing readers back to Reasonix.",
        latestNewsTitle: "Latest Reasonix AI coding agent news",
      },
      articles: {
        metaTitle:
          "Reasonix guides: getting started, cache architecture, Claude, Codex, and AI CLI comparisons",
        metaDescription:
          "Reasonix article library covering setup, DeepSeek prefix-cache architecture, Reasonix versus Claude Code and Codex, and Reasonix versus generic AI CLI tools.",
        eyebrow: "High-quality articles",
        title: "Reasonix guides, cache architecture, and agent comparisons",
        description:
          "Start with the official DeepSeek path, then read how Reasonix keeps cache-friendly long sessions and where it differs from Claude Code, Codex, and generic AI CLI tools.",
        readLabel: "Read article",
      },
      articleDetail: {
        backLabel: "Back to articles",
        takeawaysTitle: "Key takeaways",
        comparisonTitle: "Comparison matrix",
        dimensionLabel: "Dimension",
        reasonixLabel: "Reasonix",
        genericAgentLabel: "Generic CLI",
        platformAgentLabel: "Platform agent",
        openSourceAgentLabel: "Open-source agent",
        sourcesTitle: "Sources",
      },
      login: {
        metaTitle: "Reasonix login with Clerk",
        metaDescription: "Sign in to Reasonix with Clerk.",
        eyebrow: "Clerk authentication",
        title: "Sign in to Reasonix with Clerk",
        description: "Use Clerk for the Reasonix site session.",
        safetyTitle: "Clerk authentication",
        safetyBodyBeforeLink: "Clerk handles the Reasonix site account:",
        safetyBodyAfterLink: ".",
        safetyLinkLabel: "Clerk",
      },
      community: {
        metaTitle: "Reasonix community discussion",
        metaDescription:
          "Reasonix Q&A community for public questions, replies, Clerk sessions, Supabase storage, and provider-key safety.",
        eyebrow: "Reasonix Q&A community",
        title: "Ask Reasonix installation, CLI error, and article questions",
        description:
          "Post and reply with the Reasonix Clerk session. Questions and replies are stored in Supabase Postgres, while provider API keys stay outside public forms.",
        discussionsCta: "New question",
        commentsCta: "View questions",
        rulesTitle: "Community rules",
        configTitle: "Community database status",
        configBodyBeforeRepo: "Apply the Supabase migration and configure",
        configBodyAfterRepo:
          "before enabling live posting in production.",
        statusLabel: "Current status",
        configuredLabel: "Configured",
        pendingLabel: "Pending",
        configuratorLabel: "Open community",
      },
      faq: {
        metaTitle: "Reasonix FAQ",
        metaDescription:
          "Reasonix FAQ covering first run setup, npx, npm latest and next tags, source builds, CLI errors, Clerk login, and API key safety.",
        eyebrow: "FAQ",
        title: "Reasonix frequently asked questions",
        description:
          "Use this page to separate download paths, version status, account login, and Chinese-user setup questions that are easy to confuse.",
      },
      github: {
        metaTitle: "Reasonix GitHub downloads",
        metaDescription:
          "Reasonix GitHub repository, npx start path, npm latest and next tags, main-v2 source build, and desktop-v1.5.0 release links.",
        eyebrow: "GitHub downloads",
        title: "Reasonix download paths: npx, main-v2 source, and desktop release",
        descriptionBeforeLink: "The official repository is",
        descriptionAfterLink:
          ". Check npm dist-tags before deciding between the default latest package, the next tag, and a main-v2 source build.",
        note:
          "If your goal is to run Reasonix immediately, start with npx reasonix code. If your goal is a reusable install, use npm i -g reasonix. Clone main-v2 when you need source-level verification.",
      },
      errors: {
        metaTitle: "Reasonix CLI error commands",
        metaDescription:
          "Reasonix CLI troubleshooting for npx, DeepSeek API keys, source builds, Windows Terminal behavior, and GitHub issue tracking.",
        eyebrow: "CLI errors",
        title: "Reasonix command-line troubleshooting checklist",
        description:
          "Use these commands to check Node/npm, DeepSeek API keys, Go build tooling, and terminal interaction issues without exposing secrets.",
        issueWatchTitle: "GitHub issue tracker",
      },
      deepseek: {
        metaTitle: "DeepSeek officially recommends Reasonix",
        metaDescription:
          "DeepSeek API docs recommend Reasonix with an API key, npx reasonix code, and /pro; verify the current Node engine from npm before running it.",
        eyebrow: "DeepSeek official signal",
        title: "Reasonix quick-start path in the DeepSeek API docs",
        description:
          "The DeepSeek API docs describe Reasonix as a DeepSeek-native coding agent running in the terminal and give the direct launch command.",
        stepsTitle: "Official steps summary",
        guideTitle: "Open the DeepSeek guide",
        guideBody:
          "Read the original Reasonix setup notes and startup command in the DeepSeek API docs.",
        apiKeysTitle: "Open DeepSeek API Keys",
        apiKeysBody:
          "Create an API key after signing in to DeepSeek Platform, then return to the Reasonix TUI to finish setup.",
      },
      news: {
        metaTitle: "Reasonix news",
        metaDescription:
          "Reasonix news covering main-v2 commits, GitHub popularity, npm latest, desktop-v1.5.0 release, and DeepSeek official listing.",
        eyebrow: "News",
        title: "Reasonix news brief",
        description:
          "News items prioritize GitHub API data, npm registry state, and DeepSeek official agent documentation.",
      },
      privacy: {
        metaTitle: "Privacy policy",
        metaDescription:
          "Reasonix privacy policy: Clerk handles site login, API keys stay local, and official links still point to original sources.",
        eyebrow: "Privacy policy",
        title: "Keep provider keys local while using Reasonix",
        description:
          "Use Reasonix to find Reasonix downloads, account-login notes, API-key setup guidance, error commands, DeepSeek official recommendations, and related articles. It is not an official service from Reasonix, DeepSeek, OpenAI, Anthropic, or OpenCode.",
        commitmentsTitle: "What stays outside this site",
        cards: [
          {
            title: "Account login",
            body: "Use Clerk for the site login only. Do not enter DeepSeek, OpenAI, Anthropic, or other provider credentials into community posts or public forms.",
          },
          {
            title: "External links",
            body: "After clicking GitHub, X, DeepSeek Platform, npm, OpenAI, Anthropic, or other external links, those sites may apply their own privacy policies and cookies.",
          },
          {
            title: "Future changes",
            body: "If analytics, subscriptions, or account-backed features expand later, check this page first for data type, purpose, retention, and opt-out details.",
          },
        ],
        protectionTitle: "Privacy protection entry",
        protectionBody:
          "For a checklist covering downloads, official accounts, command execution, and API key handling, open the Privacy Protection page.",
      },
      privacyProtection: {
        metaTitle: "Privacy protection",
        metaDescription:
          "Reasonix privacy protection guide: verify GitHub and X accounts, avoid committing API keys, and confirm repository sources and command permissions before downloading.",
        eyebrow: "Privacy protection",
        title: "Before using an AI coding agent, verify accounts, keys, and sources",
        description:
          "Use Clerk only for Reasonix login while keeping provider API keys outside the site. This checklist helps you reduce impersonation and key-leak risk while moving between Reasonix, DeepSeek, Claude Code, Codex, OpenCode, and related tools.",
        checklistTitle: "Privacy protection checklist",
        accountsTitle: "Official account verification",
        checkedLabel: "checked",
        commitmentTitle: "Your safety boundary",
        checklist: [
          "Before downloading Reasonix, Codex, OpenCode, or another CLI, verify the GitHub organization, repository name, and release source.",
          "Do not paste DeepSeek, OpenAI, Anthropic, or other provider API keys into public issues, community posts, screenshots, or commits.",
          "Use local environment variables, a key manager, or the tool's own config. Check .env files, logs, and shell history before committing.",
          "Before running curl | bash, npx, brew, or npm i -g install commands, confirm that they come from official docs or the official repository README.",
          "Before granting an AI coding agent permissions, inspect the working directory, write access, network access, command approval mode, and rollback strategy.",
          "For X/Twitter accounts, GitHub repositories, mirrors, and desktop installers, cross-check the official site and official repository.",
        ],
      },
      footer: {
        privacyTitle: "Privacy and source boundary",
        privacyBody:
          "Use Reasonix as a source guide. It does not represent Reasonix, DeepSeek, or related vendors.",
        legalTitle: "Legal and protection",
        accountsTitle: "Official accounts",
      },
      notFound: {
        title: "Page not found",
        description:
          "You can currently open overview, articles, login, FAQ, downloads, errors, official recommendations, news, and privacy pages.",
        homeLabel: "Back home",
      },
    },
  },
  "zh-cn": {
    site: {
      title: "Reasonix | DeepSeek Reasonix 资讯站",
      slogan: "Reasonix 是 DeepSeek 专属 agent。",
      description:
        "帮助你在运行命令前核对 DeepSeek 官方推荐、GitHub 下载、常见命令行报错、FAQ、隐私说明和近期项目新闻。",
      shellSubtitle: "DeepSeek Reasonix 简体中文资讯",
      contentPrinciplesTitle: "密钥留在本机",
      contentPrinciplesBody:
        "面向已经在用 Claude Code、Codex、OpenCode、Cursor 或 Copilot 的开发者，Reasonix 把重点放在 DeepSeek 直连、低成本长会话、本地项目控制、插件扩展和可审核执行。",
      lastCheckedLabel: "最后核验",
      deepseekButtonLabel: "DeepSeek 推荐",
    },
    metadataKeywords: [
      "Reasonix",
      "DeepSeek Reasonix",
      "Reasonix 下载",
      "Reasonix 报错",
      "DeepSeek 官方推荐",
      "npx reasonix code",
      "DeepSeek coding agent",
      "deepseek coding agent",
      "deepseek code",
      "DeepSeek V4 agent",
      "DeepSeek V4 code",
      "deepseekv4 agent",
      "DeepSeekv4 code",
    ],
    navItems: [
      { href: "/", label: "主要板块", icon: "layout", eyebrow: "Overview" },
      { href: "/articles", label: "文章", icon: "book", eyebrow: "Compare" },
      { href: "/login", label: "登录", icon: "login", eyebrow: "Clerk" },
      { href: "/community", label: "社区", icon: "community", eyebrow: "Discuss" },
      { href: "/faq", label: "解疑", icon: "help", eyebrow: "FAQ" },
      { href: "/github", label: "GitHub 下载地址", icon: "github", eyebrow: "Download" },
      { href: "/errors", label: "相关报错命令行", icon: "terminal", eyebrow: "CLI" },
      { href: "/deepseek", label: "DeepSeek 官方推荐", icon: "badge", eyebrow: "Official" },
      { href: "/news", label: "新闻", icon: "newspaper", eyebrow: "News" },
    ],
    commandReference: {
      title: "操作指令表",
      sourceLabel: "官方参考",
      sourceHref: SITE.cliReference,
      items: [
        { command: "/help", label: "查看 TUI 内完整命令说明。" },
        { command: "/skills", label: "列出已安装 skills 并打开选择器。" },
        { command: "/skill new <name>", label: "为当前项目创建 skill 模板。" },
        { command: "/memory list", label: "查看固定的项目记忆。" },
        { command: "/mcp", label: "打开 MCP hub。" },
        { command: "/status", label: "检查模型、上下文和会话状态。" },
        { command: "/plan on", label: "编辑前进入只读规划模式。" },
        { command: "/doctor", label: "检查 API、配置、hooks 和项目状态。" },
      ],
    },
    legalLinks: [
      { href: "/about", label: "关于我们" },
      { href: "/contact", label: "联系我们" },
      { href: "/terms", label: "服务条款" },
      { href: "/privacy", label: "隐私协议" },
      { href: "/privacy-protection", label: "保护隐私" },
    ],
    privacyCommitments: [
      "你的页面会话由 Clerk 承载；DeepSeek/OpenAI/Anthropic 等模型服务商 API Key 不进入 Reasonix。",
      "下载、DeepSeek API Key 配置和官方推荐入口应以项目 GitHub、npm 或厂商官方平台为准。",
      "你默认不会被要求接受跟踪 Cookie、广告重定向或把输入发送给第三方模型。",
      "执行命令前，先在自己的终端和项目目录内审查命令含义。",
    ],
    officialAccounts: [
      {
        name: "Reasonix",
        context: "DeepSeek-native coding agent",
        githubLabel: "esengine/DeepSeek-Reasonix",
        github: SITE.github,
        xLabel: SITE.xHandle,
        x: SITE.x,
        note: "Reasonix 公告从该 X 账号发布；下载和运行前仍以 GitHub、npm 与 DeepSeek agent 推荐页交叉核验。",
      },
      {
        name: "DeepSeek",
        context: "Reasonix 推荐来源",
        githubLabel: "deepseek-ai",
        github: "https://github.com/deepseek-ai",
        xLabel: "@deepseek_ai",
        x: "https://x.com/deepseek_ai",
        note: "DeepSeek 官网首页链接到 X 公告，GitHub 组织页链接 deepseek.com。",
      },
    ],
    projectStats: sharedProjectStats,
    quickFacts: [
      {
        label: "当前 npm tags",
        value: "latest 0.53.2 / next 1.1.0",
        detail:
          "按 2026-06-04 查询，npm latest 是 0.53.2，npm next 是 1.1.0。安装前先重新检查 npm dist-tags。",
      },
      {
        label: "官方仓库",
        value: "esengine/DeepSeek-Reasonix",
        detail:
          "GitHub 默认分支 main-v2，项目描述为 DeepSeek-native AI coding agent for your terminal。",
      },
      {
        label: "Reasonix 启动入口",
        value: "npx reasonix code",
        detail:
          "Reasonix 应在目标项目目录内启动，并使用 DeepSeek API Key。首次运行前先查看当前 npm 包声明的 Node 要求。",
      },
    ],
    downloadOptions: [
      {
        title: "按 DeepSeek 官方推荐启动",
        tag: "推荐给新用户",
        command: "cd /path/to/my-project\nnpx reasonix code",
        description:
          "不需要全局安装，首次运行会进入配置向导。适合想先体验 DeepSeek-V4-Flash 默认模式的开发者。",
        href: SITE.deepseekGuide,
      },
      {
        title: "从 GitHub 克隆 main-v2",
        tag: "源码构建",
        command:
          "git clone https://github.com/esengine/DeepSeek-Reasonix.git\ncd DeepSeek-Reasonix\ngit switch main-v2\nmake build",
        description:
          "main-v2 是 Go 1.0 默认开发分支；当你需要审计、修改或验证最新提交时，再走源码构建。",
        href: SITE.github,
      },
      {
        title: "桌面版 release 资产",
        tag: "桌面安装包",
        command:
          "open https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.5.0",
        description:
          "GitHub 最新公开桌面 release 为 desktop-v1.5.0，新增 Linux .deb 安装包，并带出审批模式、YOLO 和桌面布局修复。",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.5.0",
      },
    ],
    loginSteps: [
      {
        title: "登录 DeepSeek Platform",
        body: "进入 DeepSeek API Keys 页面创建或复制 Reasonix 使用的模型 API Key。不要把 Key 放进公开帖子、截图或仓库。",
        command: "open https://platform.deepseek.com/api_keys",
      },
      {
        title: "在项目目录启动 Reasonix",
        body: "DeepSeek 官方推荐在目标项目目录内运行 npx，这样 Reasonix 可以读取当前工作区并生成项目记忆。",
        command: "cd /path/to/my-project\nnpx reasonix code",
      },
      {
        title: "在 TUI 内切换 Pro",
        body: "默认走 DeepSeek-V4-Flash 以控制成本；需要更强推理时，在 TUI 里输入 /pro 或 /preset max。",
        command: "/pro\n/preset max\n/help",
      },
    ],
    communitySteps: [
      {
        title: "使用 Clerk 账号",
        body: "社区发帖和回复沿用 Reasonix 的 Clerk 页面会话。DeepSeek API Key 仍然只保存在你自己的本地配置中。",
      },
      {
        title: "问题进入 Supabase",
        body: "问题和回复存入 Supabase Postgres。公开页面只展示可见内容，管理员可以隐藏或恢复条目。",
      },
      {
        title: "不要粘贴密钥",
        body: "问题描述可以包含命令、版本和报错摘要，但不要发布 DeepSeek、OpenAI、Anthropic 等 provider 的 API Key。",
      },
    ],
    communityRules: [
      "优先讨论 Reasonix 安装、版本、DeepSeek API Key 配置、命令行报错和文章内容补充。",
      "可以贴最小复现命令、Node/npm/go 版本和公开 issue 链接，但不要贴密钥、token、私有仓库地址或完整环境变量。",
      "作者可以编辑或删除自己的内容，管理员可以隐藏或恢复问题和回复。",
      "v1 不做点赞、收藏、私信、通知、个人主页或全文搜索。",
    ],
    faqs: [
      {
        question: "Reasonix 和普通 OpenAI-compatible CLI 有什么不同？",
        answer:
          "Reasonix 的官方介绍强调 DeepSeek-native、prefix-cache stability、flash-first 成本控制和自动 tool-call repair；它不是把别的 CLI 简单换一层模型名。",
      },
      {
        question: "第一次应该在哪个目录运行 npx reasonix code？",
        answer:
          "在你希望 Reasonix 读取和修改的项目目录里运行。这样文件上下文、命令输出和项目记忆都会绑定到正确仓库。",
      },
      {
        question: "首次运行前应该检查哪些版本？",
        answer:
          "先检查 node -v、npm -v、npm view reasonix engines 和 npm view reasonix dist-tags。当前 npm 包声明 Node >=22；如果旧教程不一致，优先看实时包信息。",
      },
      {
        question: "现在应该用 npx、全局 npm 安装还是源码构建？",
        answer:
          "入门体验用 npx reasonix code；需要长期复用命令时再用 npm i -g reasonix；只有在需要审计、修改或验证最新提交时，才从 main-v2 源码构建。",
      },
      {
        question: "为什么 npm latest 和 npm next 不一样？",
        answer:
          "按 2026-06-04 查询，npm latest 是 0.53.2，npm next 是 1.1.0。未指定版本的 npm 和 npx 默认走 latest；只有明确想试 next 线时才指定 tag。",
      },
      {
        question: "登录页会保存你的 API Key 吗？",
        answer:
          "不会。登录页使用 Clerk 处理站内账号会话。DeepSeek API Key 应保存在你自己的环境变量或 Reasonix 本地配置中。",
      },
      {
        question: "DeepSeek API Key 应该放在哪里？",
        answer:
          "放在本机 Reasonix 配置、shell 环境变量或本地密钥管理工具里。不要贴到社区帖子、截图、公开 issue 或仓库提交中。",
      },
      {
        question: "npx reasonix code 拉不起来或版本不对怎么办？",
        answer:
          "先运行 npm view reasonix dist-tags，检查 npm cache，并只在明确需要时指定 reasonix@latest 或 reasonix@next。如果全局安装覆盖了 npx，再检查 PATH 和 npm 全局 bin 目录。",
      },
      {
        question: "提示 reasonix command not found 怎么办？",
        answer:
          "优先用 npx reasonix code，不需要全局安装。若使用全局安装，重新安装后确认 npm 全局 bin 目录已加入 PATH，并确认当前位于目标项目目录。",
      },
      {
        question: "/help、/pro、/preset max 分别什么时候用？",
        answer:
          "先用 /help 查看当前 TUI 命令；需要下一轮更强推理时用 /pro；整个会话都需要更强模型配置时再用 /preset max。",
      },
      {
        question: "Reasonix 适合什么类型的项目？",
        answer:
          "它更适合本地代码仓库：需要读取文件、运行命令、持续保留上下文的 DeepSeek-native 开发任务。只是一次性短问答时，普通聊天或轻量 CLI 就够了。",
      },
      {
        question: "发支持问题时应该提供哪些信息？",
        answer:
          "提供执行命令、操作系统、node -v、npm -v、使用的 npm tag 和简短报错摘要。发布前删除 API Key、token、私有仓库地址和完整环境变量。",
      },
    ],
    errorCommands: [
      {
        problem: "npx reasonix code 拉不起来或版本不对",
        command:
          "node -v\nnpm view reasonix engines\nnpm view reasonix dist-tags\nnpm cache verify\nnpx reasonix@latest code",
        hint: "以实时 npm metadata 判断当前 Node 要求和 package tag。如果 npx 拉到非预期包，先清 npm cache 或显式指定目标 tag。",
      },
      {
        problem: "没有 DeepSeek API Key 或登录凭证失效",
        command: "open https://platform.deepseek.com/api_keys\nprintenv DEEPSEEK_API_KEY\nnpx reasonix code",
        hint: "先确认 DeepSeek Platform API Key 是否存在；不要把 Key 写进公开仓库。",
      },
      {
        problem: "源码构建提示 make/go 找不到",
        command: "go version\nmake --version\ngit switch main-v2\nmake build",
        hint: "main-v2 是 Go 重写分支，源码构建需要 Go toolchain 和 make。",
      },
      {
        problem: "终端交互、滚动或复制粘贴异常",
        command:
          "echo $TERM\nprintf '\\e[?1000h'\n# Windows 用户优先确认 Git for Windows 与 Windows Terminal 设置",
        hint: "GitHub issue #2649 正在跟踪 Windows Terminal 滚动/PageUpDown/选择复制相关问题。",
      },
      {
        problem: "以 # 开头的消息没有被 agent 收到",
        command: "npx reasonix@latest code\n# 临时规避：消息前加空格或换行，再观察 issue #2658",
        hint: "这是 2026-06-02 仍在打开的 GitHub bug 反馈，适合在新闻/报错区持续跟踪。",
      },
      {
        problem: "需要确认 DeepSeek API 连通性",
        command:
          "curl -s https://api.deepseek.com | head\n# 再回到 Reasonix 内运行 /help 或 /pro 验证模型切换",
        hint: "网络连通不等于鉴权成功；鉴权问题仍要回到 API Key 和 Reasonix 配置检查。",
      },
    ],
    deepseekOfficialSteps: [
      "先用 npm view reasonix engines 检查当前 Node 要求；Windows 用户还需要 Git for Windows。",
      "从 DeepSeek Platform 获取 API Key。",
      "进入项目目录运行 npx reasonix code。",
      "默认使用 DeepSeek-V4-Flash；在 TUI 内输入 /pro 或 /preset max 切到 Pro。",
      "需要完整命令帮助时，在 Reasonix TUI 中运行 /help。",
    ],
    featureBlocks: [
      {
        title: "DeepSeek 直连，不套壳",
        body: "相比通用 OpenAI-compatible 工具，Reasonix 围绕 DeepSeek 使用路径设计，默认低成本迭代，需要时再切到更强推理。",
      },
      {
        title: "长会话成本更可控",
        body: "相比每轮重新消耗大量上下文的 agent，Reasonix 更适合持续调试、重构和多小时任务。",
      },
      {
        title: "终端和桌面双入口",
        body: "相比只绑定 IDE 或网页的工具，Reasonix 可从项目终端启动，也可使用桌面客户端。",
      },
      {
        title: "计划门控更适合改代码",
        body: "相比直接自动改文件的 agent，Reasonix 先给出计划，再确认高风险修改、命令和写入边界。",
      },
      {
        title: "MCP、Skills、Memory 扩展",
        body: "相比功能固定的 agent，Reasonix 可接外部工具，也能沉淀项目技能和记忆。",
      },
      {
        title: "运行过程可回看",
        body: "相比一次性对话，历史、分支、检查点和命令过程更适合排错、复盘和接力。",
      },
    ],
    seoLandingPages: seoLandingPagesByLocale["zh-cn"],
    newsItems: [
      {
        date: "2026-06-10",
        title: "Reasonix Desktop v1.5.0 上线，新增 Linux .deb 包和审批模式修复",
        body: "GitHub releases 在 6 月 10 日把 Reasonix Desktop v1.5.0 标记为最新 release；这一发布线新增 Linux .deb 安装包，并同步修复待办 signoff、YOLO ask-tool 行为和桌面审批规则按钮布局问题。",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.5.0",
      },
      {
        date: "2026-06-04",
        title: "Reasonix CLI npm tags 区分 latest 与 next",
        body: "npm view reasonix dist-tags 显示 latest 为 0.53.2，next 为 1.1.0。选择 npx、全局 npm 安装或源码构建前，先确认 tag。",
        href: "https://www.npmjs.com/package/reasonix",
      },
      {
        date: "2026-06-07",
        title: "desktop-v1.3.0 成为最新公开桌面版 release",
        body: "GitHub 在 6 月 7 日把 Reasonix Desktop v1.3.0 标记为最新 release；该发布线同时带出桌面通知、TUI 输入区自适应增长、workspace builtin 组装修复，以及 legacy session 导入修复。",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.3.0",
      },
      {
        date: "2026-06-02",
        title: "Reasonix main-v2 CLI 新增 grep、.gitignore 与 bash 流式中断能力",
        body: "Reasonix main-v2 的 GitHub commits 显示 6 月 2 日连续合入原生 grep、GBK/GB18030 编码支持、interruptible bash live streamed output 等改动。",
        href: "https://github.com/esengine/DeepSeek-Reasonix/commits/main-v2",
      },
      {
        date: "2026-06-02",
        title: "DeepSeek API 文档继续收录 Reasonix",
        body: "DeepSeek API 文档的 Reasonix 页面包含 DeepSeek API Key 和 npx reasonix code 启动路径；运行前应再用 npm 包信息确认当前 Node engine。",
        href: SITE.deepseekGuide,
      },
    ],
    issueWatch: [
      {
        ...sharedIssueWatch[0],
        title: "6 月 10 日新的公开 bug 显示 YOLO 模式切换仍可能失效",
      },
      {
        ...sharedIssueWatch[1],
        title: "已保存的允许规则对 Bash 语法和前缀匹配仍有公开问题",
      },
      {
        ...sharedIssueWatch[2],
        title: "desktop-v1.5.0 之后，slash command 文本本地化问题仍在公开列表中",
      },
    ],
    sourceLinks: sharedSources,
    pages: {
      home: {
        eyebrow: "DeepSeek-native coding agent guide",
        title: "从终端启动面向 DeepSeek 的 coding agent",
        primaryCta: "查看 GitHub 下载",
        secondaryCta: "排查命令行报错",
        terminalNote:
          "Reasonix 快速启动方式；追 Go 重写则从 GitHub main-v2 构建。",
        articlesTitle: "深度文章",
        articleReadLabel: "阅读",
        sectionsTitle: "产品介绍",
        seoClusterEyebrow: "DeepSeek 长尾页面",
        seoClusterTitle: "DeepSeek coding agent 与 V4 code 入口",
        seoClusterDescription:
          "这些页面专门承接 DeepSeek coding agent、DeepSeek code、DeepSeek V4 agent 和 DeepSeek V4 code 搜索，再把读者导回 Reasonix。",
        latestNewsTitle: "Reasonix AI coding agent 最新新闻",
      },
      articles: {
        metaTitle: "Reasonix 文章：上手、缓存架构、Claude/Codex 和通用 AI CLI 对比",
        metaDescription:
          "Reasonix 文章库：如何上手、DeepSeek prefix cache 架构、Reasonix vs Claude Code vs Codex，以及 Reasonix vs 通用 AI CLI。",
        eyebrow: "高质量文章",
        title: "Reasonix 上手、缓存机制和 agent 对比",
        description:
          "先按 DeepSeek 官方路径跑通 Reasonix，再理解它的 cache-first loop，并对比 Claude Code、Codex 和通用 AI CLI。",
        readLabel: "阅读文章",
      },
      articleDetail: {
        backLabel: "返回文章列表",
        takeawaysTitle: "核心结论",
        comparisonTitle: "对比矩阵",
        dimensionLabel: "维度",
        reasonixLabel: "Reasonix",
        genericAgentLabel: "通用 CLI",
        platformAgentLabel: "平台级 agent",
        openSourceAgentLabel: "开源本地 agent",
        sourcesTitle: "来源",
      },
      login: {
        metaTitle: "Reasonix Clerk 登录",
        metaDescription: "使用 Clerk 登录 Reasonix。",
        eyebrow: "Clerk 登录",
        title: "使用 Clerk 登录 Reasonix",
        description: "通过 Clerk 处理 Reasonix 页面会话。",
        safetyTitle: "Clerk 登录",
        safetyBodyBeforeLink: "Clerk 处理 Reasonix 站内账号：",
        safetyBodyAfterLink: "。",
        safetyLinkLabel: "Clerk",
      },
      community: {
        metaTitle: "Reasonix 社区讨论",
        metaDescription:
          "Reasonix 问答社区：公开浏览问题，用 Clerk 登录发帖和回复，并通过 Supabase 保存社区内容。",
        eyebrow: "Reasonix 问答社区",
        title: "发布 Reasonix 安装、命令行报错和文章补充问题",
        description:
          "发帖和回复使用 Reasonix 的 Clerk 页面会话，问题与回复存入 Supabase Postgres。请不要在公开表单中发布模型服务商密钥。",
        discussionsCta: "发布问题",
        commentsCta: "查看问题",
        rulesTitle: "社区规则",
        configTitle: "社区数据库状态",
        configBodyBeforeRepo: "上线前请先应用 Supabase migration 并配置",
        configBodyAfterRepo:
          "以启用真实发帖和回复。",
        statusLabel: "当前状态",
        configuredLabel: "已配置",
        pendingLabel: "待配置",
        configuratorLabel: "打开社区",
      },
      faq: {
        metaTitle: "Reasonix 解疑 FAQ",
        metaDescription:
          "Reasonix 常见问题：首次运行、npx、npm latest 与 next、源码构建、CLI 报错、Clerk 登录和 API Key 安全。",
        eyebrow: "解疑",
        title: "Reasonix 常见问题",
        description:
          "你可以在这里区分下载方式、版本状态、账号登录和中文用户常见问题。",
      },
      github: {
        metaTitle: "Reasonix GitHub 下载地址",
        metaDescription:
          "Reasonix GitHub 仓库、npx 启动、npm latest 与 next、main-v2 源码构建和 desktop-v1.5.0 安装包入口。",
        eyebrow: "GitHub 下载地址",
        title: "Reasonix 下载路径：npx、main-v2 源码和桌面 release",
        descriptionBeforeLink: "官方仓库地址为",
        descriptionAfterLink: "。选择默认 latest 包、next tag 或 main-v2 源码构建前，请先检查 npm dist-tags。",
        note:
          "如果你的目标是“能马上跑起来”，优先用 npx reasonix code；如果要长期安装，用 npm i -g reasonix；需要源码级验证时再 clone main-v2。",
      },
      errors: {
        metaTitle: "Reasonix 相关报错命令行",
        metaDescription:
          "Reasonix 常见命令行报错排查：npx、DeepSeek API Key、源码构建、Windows Terminal、GitHub issue 追踪。",
        eyebrow: "相关报错命令行",
        title: "Reasonix 命令行报错排查清单",
        description:
          "你可以用这些命令检查 Node/npm、DeepSeek API Key、Go 构建链和终端交互问题，同时避免暴露密钥。",
        issueWatchTitle: "GitHub issue tracker",
      },
      deepseek: {
        metaTitle: "DeepSeek 官方推荐 Reasonix",
        metaDescription:
          "DeepSeek API 文档推荐 Reasonix 的启动方式：API Key、npx reasonix code 和 /pro；运行前请用 npm 确认当前 Node engine。",
        eyebrow: "DeepSeek 官方推荐",
        title: "DeepSeek API 文档里的 Reasonix 快速启动路线",
        description:
          "DeepSeek API 文档将 Reasonix 描述为运行在终端里的 DeepSeek-native coding agent，并给出直接启动方式。",
        stepsTitle: "官方步骤摘要",
        guideTitle: "打开 DeepSeek 官方文档",
        guideBody: "查看 DeepSeek API 文档中 Reasonix 的原始说明和启动命令。",
        apiKeysTitle: "打开 DeepSeek API Keys",
        apiKeysBody: "登录 DeepSeek Platform 后创建 API Key，再回到 Reasonix TUI 完成配置。",
      },
      news: {
        metaTitle: "Reasonix 新闻",
        metaDescription:
          "Reasonix 最新新闻：main-v2 提交、GitHub 热度、npm latest、desktop-v1.5.0 release 和 DeepSeek 官方收录。",
        eyebrow: "新闻",
        title: "Reasonix 新闻速览",
        description:
          "新闻条目优先来自 GitHub API、npm registry 和 DeepSeek 官方 API 文档。",
      },
      privacy: {
        metaTitle: "隐私协议",
        metaDescription:
          "Reasonix 隐私协议：Clerk 处理站内登录，API Key 保留在本机，官方入口仍跳转到原始来源。",
        eyebrow: "隐私协议",
        title: "使用 Reasonix 时，把模型服务商密钥留在本机",
        description:
          "你可以用 Reasonix 查找 Reasonix 下载、账号登录、API Key 配置说明、报错命令、DeepSeek 官方推荐和相关文章。它不是 Reasonix、DeepSeek、OpenAI、Anthropic 或 OpenCode 官方服务。",
        commitmentsTitle: "哪些内容留在你手里",
        cards: [
          {
            title: "账号登录",
            body: "你只用 Clerk 处理页面登录。不要把 DeepSeek、OpenAI、Anthropic 或其他模型服务商凭证输入到社区帖子或公开表单。",
          },
          {
            title: "外部链接",
            body: "点击 GitHub、X、DeepSeek Platform、npm、OpenAI、Anthropic 等外链后，对方站点可能使用自己的隐私政策和 Cookie 设置。",
          },
          {
            title: "后续变更",
            body: "如果未来扩展统计、订阅或账号相关功能，你应先在这里看到数据类型、用途、保存周期和退出方式。",
          },
        ],
        protectionTitle: "隐私保护入口",
        protectionBody:
          "想按工具下载、官方账号、命令执行和 API Key 管理逐项检查，可以查看“保护隐私”页面。",
      },
      privacyProtection: {
        metaTitle: "保护隐私",
        metaDescription:
          "Reasonix 保护隐私指南：核验官方 GitHub 与 X 账号，避免提交 API Key，下载前确认仓库来源和命令权限。",
        eyebrow: "保护隐私",
        title: "下载和使用 AI coding agent 前，先把账号、密钥和来源核验清楚",
        description:
          "你只用 Clerk 处理 Reasonix 页面登录，模型服务商 API Key 不进入页面。下面的清单帮助你在 Reasonix、DeepSeek、Claude Code、Codex、OpenCode 等工具之间跳转时，降低误点仿冒账号和泄露密钥的风险。",
        checklistTitle: "保护隐私清单",
        accountsTitle: "官方账号核验",
        checkedLabel: "checked",
        commitmentTitle: "你的安全边界",
        checklist: [
          "下载 Reasonix、Codex、OpenCode 等 CLI 前，先核验 GitHub 组织名、仓库名和 release 来源。",
          "不要把 DeepSeek、OpenAI、Anthropic 或其他 provider 的 API Key 粘贴到公开 issue、社区帖子、截图或提交记录里。",
          "在本地使用环境变量、密钥管理器或工具自己的配置文件；提交代码前检查 .env、日志和 shell history。",
          "执行 curl | bash、npx、brew、npm i -g 等安装命令前，先确认命令来自官方文档或官方仓库 README。",
          "给 AI coding agent 授权前，先看清工作目录、文件写入权限、网络权限、命令审批模式和可回滚策略。",
          "遇到 X/Twitter、GitHub、下载镜像或桌面安装包时，以官方站点和官方仓库互相交叉验证。",
        ],
      },
      footer: {
        privacyTitle: "隐私与来源边界",
        privacyBody:
          "你可以把 Reasonix 当作中文来源索引；它不代表 Reasonix、DeepSeek 或相关厂商官方。",
        legalTitle: "法律与保护",
        accountsTitle: "官方账号",
      },
      notFound: {
        title: "页面不存在",
        description:
          "你目前可以打开首页、文章、登录、解疑、下载、报错、官方推荐、新闻和隐私几个板块。",
        homeLabel: "回到首页",
      },
    },
  },
  "zh-tw": {
    site: {
      title: "Reasonix | DeepSeek Reasonix 資訊站",
      slogan: "Reasonix 是 DeepSeek 專屬 agent。",
      description:
        "幫助你在執行命令前核對 DeepSeek 官方推薦、GitHub 下載、常見命令列報錯、FAQ、隱私說明和近期專案新聞。",
      shellSubtitle: "DeepSeek Reasonix 繁體中文資訊",
      contentPrinciplesTitle: "密鑰留在本機",
      contentPrinciplesBody:
        "面向已經在用 Claude Code、Codex、OpenCode、Cursor 或 Copilot 的開發者，Reasonix 把重點放在 DeepSeek 直連、低成本長會話、本機專案控制、外掛擴展和可審核執行。",
      lastCheckedLabel: "最後核驗",
      deepseekButtonLabel: "DeepSeek 推薦",
    },
    metadataKeywords: [
      "Reasonix",
      "DeepSeek Reasonix",
      "Reasonix 下載",
      "Reasonix 報錯",
      "DeepSeek 官方推薦",
      "npx reasonix code",
      "DeepSeek coding agent",
      "deepseek coding agent",
      "deepseek code",
      "DeepSeek V4 agent",
      "DeepSeek V4 code",
      "deepseekv4 agent",
      "DeepSeekv4 code",
    ],
    navItems: [
      { href: "/", label: "主要板塊", icon: "layout", eyebrow: "Overview" },
      { href: "/articles", label: "文章", icon: "book", eyebrow: "Compare" },
      { href: "/login", label: "登入", icon: "login", eyebrow: "Clerk" },
      { href: "/community", label: "社群", icon: "community", eyebrow: "Discuss" },
      { href: "/faq", label: "解疑", icon: "help", eyebrow: "FAQ" },
      { href: "/github", label: "GitHub 下載地址", icon: "github", eyebrow: "Download" },
      { href: "/errors", label: "相關報錯命令列", icon: "terminal", eyebrow: "CLI" },
      { href: "/deepseek", label: "DeepSeek 官方推薦", icon: "badge", eyebrow: "Official" },
      { href: "/news", label: "新聞", icon: "newspaper", eyebrow: "News" },
    ],
    commandReference: {
      title: "操作指令表",
      sourceLabel: "官方參考",
      sourceHref: SITE.cliReference,
      items: [
        { command: "/help", label: "查看 TUI 內完整命令說明。" },
        { command: "/skills", label: "列出已安裝 skills 並開啟選擇器。" },
        { command: "/skill new <name>", label: "為目前專案建立 skill 模板。" },
        { command: "/memory list", label: "查看固定的專案記憶。" },
        { command: "/mcp", label: "開啟 MCP hub。" },
        { command: "/status", label: "檢查模型、上下文和會話狀態。" },
        { command: "/plan on", label: "編輯前進入唯讀規劃模式。" },
        { command: "/doctor", label: "檢查 API、設定、hooks 和專案狀態。" },
      ],
    },
    legalLinks: [
      { href: "/about", label: "關於我們" },
      { href: "/contact", label: "聯絡我們" },
      { href: "/terms", label: "服務條款" },
      { href: "/privacy", label: "隱私協議" },
      { href: "/privacy-protection", label: "保護隱私" },
    ],
    privacyCommitments: [
      "你的頁面會話由 Clerk 承載；DeepSeek/OpenAI/Anthropic 等模型服務商 API Key 不進入 Reasonix。",
      "下載、DeepSeek API Key 設定和官方推薦入口應以專案 GitHub、npm 或廠商官方平台為準。",
      "你預設不會被要求接受追蹤 Cookie、廣告重定向或把輸入傳送給第三方模型。",
      "執行命令前，先在自己的終端機和專案目錄內審查命令含義。",
    ],
    officialAccounts: [
      {
        name: "Reasonix",
        context: "DeepSeek-native coding agent",
        githubLabel: "esengine/DeepSeek-Reasonix",
        github: SITE.github,
        xLabel: SITE.xHandle,
        x: SITE.x,
        note: "Reasonix 公告從該 X 帳號發布；下載和執行前仍以 GitHub、npm 與 DeepSeek agent 推薦頁交叉核驗。",
      },
      {
        name: "DeepSeek",
        context: "Reasonix 推薦來源",
        githubLabel: "deepseek-ai",
        github: "https://github.com/deepseek-ai",
        xLabel: "@deepseek_ai",
        x: "https://x.com/deepseek_ai",
        note: "DeepSeek 官網首頁連結到 X 公告，GitHub 組織頁連結 deepseek.com。",
      },
    ],
    projectStats: sharedProjectStats,
    quickFacts: [
      {
        label: "目前 npm tags",
        value: "latest 0.53.2 / next 1.1.0",
        detail:
          "按 2026-06-04 查詢，npm latest 是 0.53.2，npm next 是 1.1.0。安裝前先重新檢查 npm dist-tags。",
      },
      {
        label: "官方倉庫",
        value: "esengine/DeepSeek-Reasonix",
        detail:
          "GitHub 預設分支為 main-v2，專案描述為 DeepSeek-native AI coding agent for your terminal。",
      },
      {
        label: "Reasonix 啟動入口",
        value: "npx reasonix code",
        detail:
          "Reasonix 應在目標專案目錄內啟動，並使用 DeepSeek API Key。首次執行前先查看目前 npm package 宣告的 Node 要求。",
      },
    ],
    downloadOptions: [
      {
        title: "依 DeepSeek 官方推薦啟動",
        tag: "推薦給新使用者",
        command: "cd /path/to/my-project\nnpx reasonix code",
        description:
          "不需要全域安裝，首次執行會進入設定流程。適合先體驗 DeepSeek-V4-Flash 預設模式。",
        href: SITE.deepseekGuide,
      },
      {
        title: "從 GitHub clone main-v2",
        tag: "原始碼建置",
        command:
          "git clone https://github.com/esengine/DeepSeek-Reasonix.git\ncd DeepSeek-Reasonix\ngit switch main-v2\nmake build",
        description:
          "main-v2 是 Go 1.0 預設開發分支；當你需要審計、修改或驗證最新提交時，再走原始碼建置。",
        href: SITE.github,
      },
      {
        title: "桌面版 release 資產",
        tag: "桌面安裝包",
        command:
          "open https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.5.0",
        description:
          "GitHub 最新公開桌面 release 為 desktop-v1.5.0，新增 Linux .deb 安裝包，並帶出審批模式、YOLO 和桌面版面修復。",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.5.0",
      },
    ],
    loginSteps: [
      {
        title: "登入 DeepSeek Platform",
        body: "進入 DeepSeek API Keys 頁面建立或複製 Reasonix 使用的模型 API Key。不要把 Key 放進公開貼文、截圖或 repo。",
        command: "open https://platform.deepseek.com/api_keys",
      },
      {
        title: "在專案目錄啟動 Reasonix",
        body: "DeepSeek 官方推薦在目標專案目錄內執行 npx，讓 Reasonix 讀取目前工作區並生成專案記憶。",
        command: "cd /path/to/my-project\nnpx reasonix code",
      },
      {
        title: "在 TUI 內切換 Pro",
        body: "預設走 DeepSeek-V4-Flash 以控制成本；需要更強推理時，在 TUI 輸入 /pro 或 /preset max。",
        command: "/pro\n/preset max\n/help",
      },
    ],
    communitySteps: [
      {
        title: "使用 Clerk 帳號",
        body: "社群發文和回覆沿用 Reasonix 的 Clerk 頁面會話。DeepSeek API Key 仍然只保存在你自己的本機設定中。",
      },
      {
        title: "問題進入 Supabase",
        body: "問題和回覆存入 Supabase Postgres。公開頁面只展示可見內容，管理員可以隱藏或恢復條目。",
      },
      {
        title: "不要貼上密鑰",
        body: "問題描述可以包含命令、版本和報錯摘要，但不要發布 DeepSeek、OpenAI、Anthropic 等 provider 的 API Key。",
      },
    ],
    communityRules: [
      "優先討論 Reasonix 安裝、版本、DeepSeek API Key 設定、命令列報錯和文章內容補充。",
      "可以貼最小重現命令、Node/npm/go 版本和公開 issue 連結，但不要貼密鑰、token、私有倉庫地址或完整環境變數。",
      "作者可以編輯或刪除自己的內容，管理員可以隱藏或恢復問題和回覆。",
      "v1 不做讚、收藏、私訊、通知、個人主頁或全文搜尋。",
    ],
    faqs: [
      {
        question: "Reasonix 和一般 OpenAI-compatible CLI 有何不同？",
        answer:
          "Reasonix 官方介紹強調 DeepSeek-native、prefix-cache stability、flash-first 成本控制和自動 tool-call repair；它不是單純換模型名稱的 CLI。",
      },
      {
        question: "第一次應該在哪個目錄執行 npx reasonix code？",
        answer:
          "在你希望 Reasonix 讀取和修改的專案目錄裡執行。這樣檔案上下文、命令輸出和專案記憶都會綁定到正確 repository。",
      },
      {
        question: "首次執行前應該檢查哪些版本？",
        answer:
          "先檢查 node -v、npm -v、npm view reasonix engines 和 npm view reasonix dist-tags。目前 npm package 宣告 Node >=22；如果舊教學不一致，優先看即時 package 資訊。",
      },
      {
        question: "現在應該用 npx、全域 npm 安裝還是原始碼建置？",
        answer:
          "入門體驗用 npx reasonix code；需要長期重複使用命令時再用 npm i -g reasonix；只有需要審計、修改或驗證最新提交時，才從 main-v2 原始碼建置。",
      },
      {
        question: "為什麼 npm latest 和 npm next 不一樣？",
        answer:
          "按 2026-06-04 查詢，npm latest 是 0.53.2，npm next 是 1.1.0。未指定版本的 npm 和 npx 預設走 latest；只有明確想試 next 線時才指定 tag。",
      },
      {
        question: "登入頁會保存你的 API Key 嗎？",
        answer:
          "不會。登入頁使用 Clerk 處理站內帳號會話。DeepSeek API Key 應保存在你自己的環境變數或 Reasonix 本機設定中。",
      },
      {
        question: "DeepSeek API Key 應該放在哪裡？",
        answer:
          "放在本機 Reasonix 設定、shell 環境變數或本機密鑰管理工具裡。不要貼到社群貼文、截圖、公開 issue 或 repo commit 中。",
      },
      {
        question: "npx reasonix code 無法啟動或版本不對怎麼辦？",
        answer:
          "先執行 npm view reasonix dist-tags，檢查 npm cache，並只在明確需要時指定 reasonix@latest 或 reasonix@next。如果全域安裝覆蓋了 npx，再檢查 PATH 和 npm global bin 目錄。",
      },
      {
        question: "提示 reasonix command not found 怎麼辦？",
        answer:
          "優先用 npx reasonix code，不需要全域安裝。若使用全域安裝，重新安裝後確認 npm global bin 目錄已加入 PATH，並確認目前位於目標專案目錄。",
      },
      {
        question: "/help、/pro、/preset max 分別什麼時候用？",
        answer:
          "先用 /help 查看目前 TUI 命令；需要下一輪更強推理時用 /pro；整個會話都需要更強模型設定時再用 /preset max。",
      },
      {
        question: "Reasonix 適合什麼類型的專案？",
        answer:
          "它更適合本機程式碼 repository：需要讀取檔案、執行命令、持續保留上下文的 DeepSeek-native 開發任務。只是一次性短問答時，普通聊天或輕量 CLI 就夠了。",
      },
      {
        question: "發支持問題時應該提供哪些資訊？",
        answer:
          "提供執行命令、作業系統、node -v、npm -v、使用的 npm tag 和簡短錯誤摘要。發布前刪除 API Key、token、私有 repo 地址和完整環境變數。",
      },
    ],
    errorCommands: [
      {
        problem: "npx reasonix code 無法啟動或版本不對",
        command:
          "node -v\nnpm view reasonix engines\nnpm view reasonix dist-tags\nnpm cache verify\nnpx reasonix@latest code",
        hint: "以即時 npm metadata 判斷目前 Node 要求和 package tag。如果 npx 拉到非預期 package，先清 npm cache 或明確指定目標 tag。",
      },
      {
        problem: "沒有 DeepSeek API Key 或登入憑證失效",
        command: "open https://platform.deepseek.com/api_keys\nprintenv DEEPSEEK_API_KEY\nnpx reasonix code",
        hint: "先確認 DeepSeek Platform API Key 是否存在；不要把 Key 寫入公開倉庫。",
      },
      {
        problem: "原始碼建置提示 make/go 找不到",
        command: "go version\nmake --version\ngit switch main-v2\nmake build",
        hint: "main-v2 是 Go 重寫分支，原始碼建置需要 Go toolchain 和 make。",
      },
      {
        problem: "終端互動、捲動或複製貼上異常",
        command:
          "echo $TERM\nprintf '\\e[?1000h'\n# Windows 使用者優先確認 Git for Windows 與 Windows Terminal 設定",
        hint: "GitHub issue #2649 正在追蹤 Windows Terminal 捲動、PageUp/PageDown 與選取複製問題。",
      },
      {
        problem: "以 # 開頭的訊息沒有被 agent 收到",
        command: "npx reasonix@latest code\n# 暫時規避：訊息前加空格或換行，再觀察 issue #2658",
        hint: "這是 2026-06-02 仍開啟的 GitHub bug 回報，適合在新聞/報錯區持續追蹤。",
      },
      {
        problem: "需要確認 DeepSeek API 連通性",
        command:
          "curl -s https://api.deepseek.com | head\n# 再回到 Reasonix 內執行 /help 或 /pro 驗證模型切換",
        hint: "網路連通不等於鑑權成功；鑑權問題仍要回到 API Key 和 Reasonix 設定檢查。",
      },
    ],
    deepseekOfficialSteps: [
      "先用 npm view reasonix engines 檢查目前 Node 要求；Windows 使用者還需要 Git for Windows。",
      "從 DeepSeek Platform 取得 API Key。",
      "進入專案目錄執行 npx reasonix code。",
      "預設使用 DeepSeek-V4-Flash；在 TUI 內輸入 /pro 或 /preset max 切到 Pro。",
      "需要完整命令說明時，在 Reasonix TUI 中執行 /help。",
    ],
    featureBlocks: [
      {
        title: "DeepSeek 直連，不套殼",
        body: "相比通用 OpenAI-compatible 工具，Reasonix 圍繞 DeepSeek 使用路徑設計，預設低成本迭代，需要時再切到更強推理。",
      },
      {
        title: "長會話成本更可控",
        body: "相比每輪重新消耗大量上下文的 agent，Reasonix 更適合持續除錯、重構和多小時任務。",
      },
      {
        title: "終端和桌面雙入口",
        body: "相比只綁定 IDE 或網頁的工具，Reasonix 可從專案終端啟動，也可使用桌面客戶端。",
      },
      {
        title: "計畫門控更適合改程式碼",
        body: "相比直接自動改檔案的 agent，Reasonix 先給出計畫，再確認高風險修改、命令和寫入邊界。",
      },
      {
        title: "MCP、Skills、Memory 擴展",
        body: "相比功能固定的 agent，Reasonix 可接外部工具，也能沉澱專案技能和記憶。",
      },
      {
        title: "運行過程可回看",
        body: "相比一次性對話，歷史、分支、檢查點和命令過程更適合排錯、復盤和接力。",
      },
    ],
    seoLandingPages: seoLandingPagesByLocale["zh-tw"],
    newsItems: [
      {
        date: "2026-06-10",
        title: "Reasonix Desktop v1.5.0 上線，新增 Linux .deb 套件與審批模式修復",
        body: "GitHub releases 在 6 月 10 日將 Reasonix Desktop v1.5.0 標記為最新 release；這條發布線新增 Linux .deb 安裝包，並同步修復待辦 signoff、YOLO ask-tool 行為與桌面審批規則按鈕版面問題。",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.5.0",
      },
      {
        date: "2026-06-04",
        title: "Reasonix CLI npm tags 區分 latest 與 next",
        body: "npm view reasonix dist-tags 顯示 latest 為 0.53.2，next 為 1.1.0。選擇 npx、全域 npm 安裝或原始碼建置前，先確認 tag。",
        href: "https://www.npmjs.com/package/reasonix",
      },
      {
        date: "2026-06-07",
        title: "desktop-v1.3.0 成為最新公開桌面版 release",
        body: "GitHub 在 6 月 7 日把 Reasonix Desktop v1.3.0 標記為最新 release；該發布線同時帶出桌面通知、TUI 輸入區自適應增長、workspace builtin 組裝修復，以及 legacy session 匯入修復。",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.3.0",
      },
      {
        date: "2026-06-02",
        title: "Reasonix main-v2 CLI 新增 grep、.gitignore 與 bash 串流中斷能力",
        body: "Reasonix main-v2 的 GitHub commits 顯示 6 月 2 日連續合入原生 grep、GBK/GB18030 編碼支援、interruptible bash live streamed output 等改動。",
        href: "https://github.com/esengine/DeepSeek-Reasonix/commits/main-v2",
      },
      {
        date: "2026-06-02",
        title: "DeepSeek API 文件繼續收錄 Reasonix",
        body: "DeepSeek API 文件的 Reasonix 頁面包含 DeepSeek API Key 和 npx reasonix code 啟動路徑；執行前應再用 npm package 資訊確認目前 Node engine。",
        href: SITE.deepseekGuide,
      },
    ],
    issueWatch: [
      {
        ...sharedIssueWatch[0],
        title: "6 月 10 日新的公開 bug 顯示 YOLO 模式切換仍可能失效",
      },
      {
        ...sharedIssueWatch[1],
        title: "已儲存的允許規則對 Bash 語法和前綴匹配仍有公開問題",
      },
      {
        ...sharedIssueWatch[2],
        title: "desktop-v1.5.0 之後，slash command 文字在地化問題仍在公開清單中",
      },
    ],
    sourceLinks: sharedSources,
    pages: {
      home: {
        eyebrow: "DeepSeek-native coding agent guide",
        title: "從終端機啟動面向 DeepSeek 的 coding agent",
        primaryCta: "查看 GitHub 下載",
        secondaryCta: "排查命令列報錯",
        terminalNote:
          "Reasonix 快速啟動方式；追 Go 重寫則從 GitHub main-v2 建置。",
        articlesTitle: "深度文章",
        articleReadLabel: "閱讀",
        sectionsTitle: "產品介紹",
        seoClusterEyebrow: "DeepSeek 長尾頁面",
        seoClusterTitle: "DeepSeek coding agent 與 V4 code 入口",
        seoClusterDescription:
          "這些頁面專門承接 DeepSeek coding agent、DeepSeek code、DeepSeek V4 agent 和 DeepSeek V4 code 搜尋，再把讀者導回 Reasonix。",
        latestNewsTitle: "Reasonix AI coding agent 最新新聞",
      },
      articles: {
        metaTitle: "Reasonix 文章：上手、快取架構、Claude/Codex 和通用 AI CLI 對比",
        metaDescription:
          "Reasonix 文章庫：如何上手、DeepSeek prefix cache 架構、Reasonix vs Claude Code vs Codex，以及 Reasonix vs 通用 AI CLI。",
        eyebrow: "高品質文章",
        title: "Reasonix 上手、快取機制和 agent 對比",
        description:
          "先按 DeepSeek 官方路徑跑通 Reasonix，再理解它的 cache-first loop，並對比 Claude Code、Codex 和通用 AI CLI。",
        readLabel: "閱讀文章",
      },
      articleDetail: {
        backLabel: "返回文章列表",
        takeawaysTitle: "核心結論",
        comparisonTitle: "對比矩陣",
        dimensionLabel: "維度",
        reasonixLabel: "Reasonix",
        genericAgentLabel: "通用 CLI",
        platformAgentLabel: "平台級 agent",
        openSourceAgentLabel: "開源本機 agent",
        sourcesTitle: "來源",
      },
      login: {
        metaTitle: "Reasonix Clerk 登入",
        metaDescription: "使用 Clerk 登入 Reasonix。",
        eyebrow: "Clerk 登入",
        title: "使用 Clerk 登入 Reasonix",
        description: "透過 Clerk 處理 Reasonix 頁面會話。",
        safetyTitle: "Clerk 登入",
        safetyBodyBeforeLink: "Clerk 處理 Reasonix 站內帳號：",
        safetyBodyAfterLink: "。",
        safetyLinkLabel: "Clerk",
      },
      community: {
        metaTitle: "Reasonix 社群討論",
        metaDescription:
          "Reasonix 問答社群：公開瀏覽問題，用 Clerk 登入發文和回覆，並透過 Supabase 保存社群內容。",
        eyebrow: "Reasonix 問答社群",
        title: "發布 Reasonix 安裝、命令列報錯和文章補充問題",
        description:
          "發文和回覆使用 Reasonix 的 Clerk 頁面會話，問題與回覆存入 Supabase Postgres。請不要在公開表單中發布模型服務商密鑰。",
        discussionsCta: "發布問題",
        commentsCta: "查看問題",
        rulesTitle: "社群規則",
        configTitle: "社群資料庫狀態",
        configBodyBeforeRepo: "上線前請先套用 Supabase migration 並配置",
        configBodyAfterRepo:
          "以啟用真實發文和回覆。",
        statusLabel: "目前狀態",
        configuredLabel: "已配置",
        pendingLabel: "待配置",
        configuratorLabel: "開啟社群",
      },
      faq: {
        metaTitle: "Reasonix 解疑 FAQ",
        metaDescription:
          "Reasonix 常見問題：首次執行、npx、npm latest 與 next、原始碼建置、CLI 報錯、Clerk 登入和 API Key 安全。",
        eyebrow: "解疑",
        title: "Reasonix 常見問題",
        description:
          "你可以在這裡區分下載方式、版本狀態、帳號登入和中文使用者常見問題。",
      },
      github: {
        metaTitle: "Reasonix GitHub 下載地址",
        metaDescription:
          "Reasonix GitHub 倉庫、npx 啟動、npm latest 與 next、main-v2 原始碼建置和 desktop-v1.5.0 安裝包入口。",
        eyebrow: "GitHub 下載地址",
        title: "Reasonix 下載路徑：npx、main-v2 原始碼和桌面 release",
        descriptionBeforeLink: "官方倉庫地址為",
        descriptionAfterLink: "。選擇預設 latest package、next tag 或 main-v2 原始碼建置前，請先檢查 npm dist-tags。",
        note:
          "如果你的目標是「能馬上跑起來」，優先用 npx reasonix code；如果要長期安裝，用 npm i -g reasonix；需要原始碼級驗證時再 clone main-v2。",
      },
      errors: {
        metaTitle: "Reasonix 相關報錯命令列",
        metaDescription:
          "Reasonix 常見命令列報錯排查：npx、DeepSeek API Key、原始碼建置、Windows Terminal、GitHub issue 追蹤。",
        eyebrow: "相關報錯命令列",
        title: "Reasonix 命令列報錯排查清單",
        description:
          "你可以用這些命令檢查 Node/npm、DeepSeek API Key、Go 建置鏈和終端互動問題，同時避免暴露密鑰。",
        issueWatchTitle: "GitHub issue tracker",
      },
      deepseek: {
        metaTitle: "DeepSeek 官方推薦 Reasonix",
        metaDescription:
          "DeepSeek API 文件推薦 Reasonix 的啟動方式：API Key、npx reasonix code 和 /pro；執行前請用 npm 確認目前 Node engine。",
        eyebrow: "DeepSeek 官方推薦",
        title: "DeepSeek API 文件裡的 Reasonix 快速啟動路線",
        description:
          "DeepSeek API 文件將 Reasonix 描述為運行在終端機裡的 DeepSeek-native coding agent，並給出直接啟動方式。",
        stepsTitle: "官方步驟摘要",
        guideTitle: "開啟 DeepSeek 官方文件",
        guideBody: "查看 DeepSeek API 文件中 Reasonix 的原始說明和啟動命令。",
        apiKeysTitle: "開啟 DeepSeek API Keys",
        apiKeysBody: "登入 DeepSeek Platform 後建立 API Key，再回到 Reasonix TUI 完成設定。",
      },
      news: {
        metaTitle: "Reasonix 新聞",
        metaDescription:
          "Reasonix 最新新聞：main-v2 提交、GitHub 熱度、npm latest、desktop-v1.5.0 release 和 DeepSeek 官方收錄。",
        eyebrow: "新聞",
        title: "Reasonix 新聞速覽",
        description:
          "新聞條目優先來自 GitHub API、npm registry 和 DeepSeek 官方 API 文件。",
      },
      privacy: {
        metaTitle: "隱私協議",
        metaDescription:
          "Reasonix 隱私協議：Clerk 處理站內登入，API Key 保留在本機，官方入口仍跳轉到原始來源。",
        eyebrow: "隱私協議",
        title: "使用 Reasonix 時，把模型服務商密鑰留在本機",
        description:
          "你可以用 Reasonix 查找 Reasonix 下載、帳號登入、API Key 設定說明、報錯命令、DeepSeek 官方推薦和相關文章。它不是 Reasonix、DeepSeek、OpenAI、Anthropic 或 OpenCode 官方服務。",
        commitmentsTitle: "哪些內容留在你手裡",
        cards: [
          {
            title: "帳號登入",
            body: "你只用 Clerk 處理頁面登入。不要把 DeepSeek、OpenAI、Anthropic 或其他模型服務商憑證輸入到社群貼文或公開表單。",
          },
          {
            title: "外部連結",
            body: "點擊 GitHub、X、DeepSeek Platform、npm、OpenAI、Anthropic 等外鏈後，對方站點可能使用自己的隱私政策和 Cookie 設定。",
          },
          {
            title: "後續變更",
            body: "如果未來擴展統計、訂閱或帳號相關功能，你應先在這裡看到資料類型、用途、保存週期和退出方式。",
          },
        ],
        protectionTitle: "隱私保護入口",
        protectionBody:
          "想按工具下載、官方帳號、命令執行和 API Key 管理逐項檢查，可以查看「保護隱私」頁面。",
      },
      privacyProtection: {
        metaTitle: "保護隱私",
        metaDescription:
          "Reasonix 保護隱私指南：核驗官方 GitHub 與 X 帳號，避免提交 API Key，下載前確認倉庫來源和命令權限。",
        eyebrow: "保護隱私",
        title: "下載和使用 AI coding agent 前，先把帳號、密鑰和來源核驗清楚",
        description:
          "你只用 Clerk 處理 Reasonix 頁面登入，模型服務商 API Key 不進入頁面。下面的清單協助你在 Reasonix、DeepSeek、Claude Code、Codex、OpenCode 等工具之間跳轉時，降低誤點仿冒帳號和洩露密鑰的風險。",
        checklistTitle: "保護隱私清單",
        accountsTitle: "官方帳號核驗",
        checkedLabel: "checked",
        commitmentTitle: "你的安全邊界",
        checklist: [
          "下載 Reasonix、Codex、OpenCode 等 CLI 前，先核驗 GitHub 組織名、倉庫名和 release 來源。",
          "不要把 DeepSeek、OpenAI、Anthropic 或其他 provider 的 API Key 貼到公開 issue、社群貼文、截圖或提交記錄裡。",
          "在本機使用環境變數、密鑰管理器或工具自己的設定檔；提交程式碼前檢查 .env、日誌和 shell history。",
          "執行 curl | bash、npx、brew、npm i -g 等安裝命令前，先確認命令來自官方文件或官方倉庫 README。",
          "給 AI coding agent 授權前，先看清工作目錄、文件寫入權限、網路權限、命令審批模式和可回滾策略。",
          "遇到 X/Twitter、GitHub、下載鏡像或桌面安裝包時，以官方站點和官方倉庫互相交叉驗證。",
        ],
      },
      footer: {
        privacyTitle: "隱私與來源邊界",
        privacyBody:
          "你可以把 Reasonix 當作繁體中文來源索引；它不代表 Reasonix、DeepSeek 或相關廠商官方。",
        legalTitle: "法律與保護",
        accountsTitle: "官方帳號",
      },
      notFound: {
        title: "頁面不存在",
        description:
          "你目前可以開啟首頁、文章、登入、解疑、下載、報錯、官方推薦、新聞和隱私幾個板塊。",
        homeLabel: "回到首頁",
      },
    },
  },
  ru: {
    site: {
      title: "Reasonix | Информационный сайт Reasonix",
      slogan: "Reasonix - не еще один coding agent.",
      description:
        "Перед запуском команд проверьте рекомендации DeepSeek, загрузки GitHub, типовые ошибки CLI, FAQ, приватность и новости проекта.",
      shellSubtitle: "Информационный сайт Reasonix",
      contentPrinciplesTitle: "Ключи остаются локально",
      contentPrinciplesBody:
        "Для разработчиков, которые уже используют Claude Code, Codex, OpenCode, Cursor или Copilot, Reasonix делает акцент на прямом DeepSeek path, более дешевых длинных сессиях, local project control, plugin extension и reviewable execution.",
      lastCheckedLabel: "Проверено",
      deepseekButtonLabel: "Гайд DeepSeek",
    },
    metadataKeywords: [
      "Reasonix",
      "DeepSeek Reasonix",
      "скачать Reasonix",
      "ошибки Reasonix",
      "официальная рекомендация DeepSeek",
      "npx reasonix code",
      "DeepSeek coding agent",
      "deepseek coding agent",
      "deepseek code",
      "DeepSeek V4 agent",
      "DeepSeek V4 code",
      "deepseekv4 agent",
      "DeepSeekv4 code",
    ],
    navItems: [
      { href: "/", label: "Обзор", icon: "layout", eyebrow: "Start" },
      { href: "/articles", label: "Статьи", icon: "book", eyebrow: "Compare" },
      { href: "/login", label: "Вход", icon: "login", eyebrow: "Clerk" },
      { href: "/community", label: "Сообщество", icon: "community", eyebrow: "Discuss" },
      { href: "/faq", label: "FAQ", icon: "help", eyebrow: "Answers" },
      { href: "/github", label: "GitHub загрузки", icon: "github", eyebrow: "Download" },
      { href: "/errors", label: "Ошибки CLI", icon: "terminal", eyebrow: "Fix" },
      { href: "/deepseek", label: "DeepSeek", icon: "badge", eyebrow: "Signal" },
      { href: "/news", label: "Новости", icon: "newspaper", eyebrow: "Updates" },
    ],
    commandReference: {
      title: "Команды TUI",
      sourceLabel: "CLI ref",
      sourceHref: SITE.cliReference,
      items: [
        { command: "/help", label: "Открыть встроенную справку команд." },
        { command: "/skills", label: "Показать installed skills и picker." },
        { command: "/skill new <name>", label: "Создать шаблон project skill." },
        { command: "/memory list", label: "Просмотреть pinned project memory." },
        { command: "/mcp", label: "Открыть MCP hub." },
        { command: "/status", label: "Проверить model, context и session state." },
        { command: "/plan on", label: "Включить read-only plan перед edits." },
        { command: "/doctor", label: "Проверить API, config, hooks и project." },
      ],
    },
    legalLinks: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Политика приватности" },
      { href: "/privacy-protection", label: "Защита приватности" },
    ],
    privacyCommitments: [
      "Ваша сессия страницы обрабатывается Clerk; API-ключи DeepSeek, OpenAI, Anthropic и других providers не входят в Reasonix.",
      "Для загрузок, настройки DeepSeek API key и официальных рекомендаций проверяйте GitHub проекта, npm и платформы providers.",
      "По умолчанию вас не просят принимать tracking cookies, ad redirects или отправлять ввод сторонним моделям.",
      "Перед запуском проверяйте каждый command snippet в своем терминале и каталоге проекта.",
    ],
    officialAccounts: [
      {
        name: "Reasonix",
        context: "DeepSeek-native coding agent",
        githubLabel: "esengine/DeepSeek-Reasonix",
        github: SITE.github,
        xLabel: SITE.xHandle,
        x: SITE.x,
        note: "Объявления Reasonix публикуются из этого аккаунта X; перед загрузкой сверяйте GitHub, npm и страницу рекомендации DeepSeek agent.",
      },
      {
        name: "DeepSeek",
        context: "Источник рекомендации Reasonix",
        githubLabel: "deepseek-ai",
        github: "https://github.com/deepseek-ai",
        xLabel: "@deepseek_ai",
        x: "https://x.com/deepseek_ai",
        note: "Официальный сайт DeepSeek ссылается на X, а GitHub-организация связана с deepseek.com.",
      },
    ],
    projectStats: sharedProjectStats,
    quickFacts: [
      {
        label: "Текущие npm tags",
        value: "latest 0.53.2 / next 1.1.0",
        detail:
          "На 2026-06-04 npm latest равен 0.53.2, а npm next равен 1.1.0. Перед установкой заново проверяйте npm dist-tags.",
      },
      {
        label: "Официальный репозиторий",
        value: "esengine/DeepSeek-Reasonix",
        detail:
          "В GitHub ветка по умолчанию - main-v2, а проект описан как DeepSeek-native AI coding agent for your terminal.",
      },
      {
        label: "Запуск Reasonix",
        value: "npx reasonix code",
        detail:
          "Запускайте Reasonix внутри целевого каталога проекта с API-ключом DeepSeek. Перед первым запуском проверьте текущие engines npm package.",
      },
    ],
    downloadOptions: [
      {
        title: "Запуск по гайду DeepSeek",
        tag: "Для новых пользователей",
        command: "cd /path/to/my-project\nnpx reasonix code",
        description:
          "Глобальная установка не нужна. Первый запуск открывает локальную настройку и подходит для быстрого теста режима DeepSeek-V4-Flash.",
        href: SITE.deepseekGuide,
      },
      {
        title: "Клонировать main-v2 с GitHub",
        tag: "Source build",
        command:
          "git clone https://github.com/esengine/DeepSeek-Reasonix.git\ncd DeepSeek-Reasonix\ngit switch main-v2\nmake build",
        description:
          "main-v2 является веткой разработки Go 1.0. Source build нужен, когда вы хотите проверить, изменить или верифицировать самые свежие коммиты.",
        href: SITE.github,
      },
      {
        title: "Desktop release assets",
        tag: "Desktop пакет",
        command:
          "open https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.5.0",
        description:
          "Последний публичный desktop release - desktop-v1.5.0: добавлен Linux .deb пакет и включены fixes для approvals, YOLO и desktop layout.",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.5.0",
      },
    ],
    loginSteps: [
      {
        title: "Войдите в DeepSeek Platform",
        body: "Откройте страницу DeepSeek API Keys, чтобы создать или скопировать model API key для Reasonix. Не публикуйте ключи в posts, screenshots или repositories.",
        command: "open https://platform.deepseek.com/api_keys",
      },
      {
        title: "Запустите Reasonix в каталоге проекта",
        body: "DeepSeek рекомендует запускать npx внутри целевого проекта, чтобы Reasonix мог прочитать workspace и создать локальную память проекта.",
        command: "cd /path/to/my-project\nnpx reasonix code",
      },
      {
        title: "Переключите Pro в TUI",
        body: "По умолчанию используется DeepSeek-V4-Flash для контроля стоимости. Для более сильного reasoning используйте /pro или /preset max внутри TUI.",
        command: "/pro\n/preset max\n/help",
      },
    ],
    communitySteps: [
      {
        title: "Используйте Clerk session",
        body: "Community posts и replies используют Reasonix Clerk site session. DeepSeek API keys остаются в вашей local setup.",
      },
      {
        title: "Questions хранятся в Supabase",
        body: "Questions и replies сохраняются в Supabase Postgres. Public pages показывают только visible content, admins могут hide или restore entries.",
      },
      {
        title: "Не публикуйте секреты",
        body: "В описании проблемы можно указывать commands, versions и error summaries, но нельзя публиковать API keys DeepSeek, OpenAI, Anthropic или других providers.",
      },
    ],
    communityRules: [
      "В первую очередь обсуждайте установку Reasonix, версии, настройку DeepSeek API key, ошибки CLI и дополнения к статьям.",
      "Можно делиться minimal reproduction commands, версиями Node/npm/go и public issue links, но нельзя публиковать secrets, tokens, private repositories или полные environment variables.",
      "Authors can edit or delete their own content; admins can hide or restore questions and replies.",
      "Version 1 does not include likes, favorites, private messages, notifications, profiles, or full-text search.",
    ],
    faqs: [
      {
        question: "Чем Reasonix отличается от обычного OpenAI-compatible CLI?",
        answer:
          "Reasonix делает акцент на DeepSeek-native поведении, стабильности prefix cache, flash-first контроле стоимости и automatic tool-call repair. Это не просто CLI с замененным именем модели.",
      },
      {
        question: "Где впервые запускать npx reasonix code?",
        answer:
          "Запускайте команду в каталоге проекта, который Reasonix должен читать и менять. Так file context, command output и project memory относятся к правильному repository.",
      },
      {
        question: "Что проверить перед первым запуском?",
        answer:
          "Проверьте node -v, npm -v, npm view reasonix engines и npm view reasonix dist-tags. Сейчас npm package объявляет Node >=22; если старые guides расходятся, доверяйте live package metadata.",
      },
      {
        question: "Выбрать npx, global npm install или source build?",
        answer:
          "Для первого теста используйте npx reasonix code. Для повторного локального command можно поставить npm i -g reasonix. Source build из main-v2 нужен только для аудита, патча или проверки свежих коммитов.",
      },
      {
        question: "Почему npm latest и npm next отличаются?",
        answer:
          "На 2026-06-04 npm latest равен 0.53.2, а npm next равен 1.1.0. Непривязанные npm и npx команды берут latest; указывайте tag явно только когда действительно нужна эта линия.",
      },
      {
        question: "Страница входа сохраняет мой API-ключ?",
        answer:
          "Нет. Страница входа использует Clerk для сессии аккаунта сайта. DeepSeek API key должен оставаться в ваших переменных окружения или локальном конфиге Reasonix.",
      },
      {
        question: "Где должен храниться DeepSeek API key?",
        answer:
          "Храните его в локальной настройке Reasonix, shell environment или локальном secret manager. Не публикуйте provider keys в community posts, screenshots, public issues или commits.",
      },
      {
        question: "Что делать, если npx reasonix code запускает не ту версию?",
        answer:
          "Запустите npm view reasonix dist-tags, проверьте npm cache и указывайте reasonix@latest или reasonix@next только намеренно. Если global install перекрывает npx, проверьте PATH и npm global bin directory.",
      },
      {
        question: "Что делать с ошибкой reasonix command not found?",
        answer:
          "Сначала используйте npx reasonix code без global install. Если нужен global install, переустановите пакет и убедитесь, что npm global bin directory находится в PATH.",
      },
      {
        question: "Когда использовать /help, /pro и /preset max?",
        answer:
          "Начните с /help, чтобы увидеть команды TUI. Используйте /pro для одного более сильного reasoning turn, а /preset max - когда вся сессия требует более сильной настройки модели.",
      },
      {
        question: "Для каких проектов Reasonix подходит лучше всего?",
        answer:
          "Reasonix лучше всего подходит для локальных code repositories, где DeepSeek-native agent должен читать файлы, запускать commands и сохранять длинный рабочий context. Для коротких одноразовых prompts это часто избыточно.",
      },
      {
        question: "Что указывать в support question?",
        answer:
          "Укажите command, OS, node -v, npm -v, выбранный npm tag и короткое error summary. Перед публикацией удалите API keys, tokens, private repository URLs и полные environment dumps.",
      },
    ],
    errorCommands: [
      {
        problem: "npx reasonix code не стартует или берет не ту версию",
        command:
          "node -v\nnpm view reasonix engines\nnpm view reasonix dist-tags\nnpm cache verify\nnpx reasonix@latest code",
        hint: "Используйте live npm metadata для текущего Node requirement и package tags. Очистите npm cache или укажите нужный tag, если npx берет неожиданный пакет.",
      },
      {
        problem: "Нет DeepSeek API Key или учетные данные истекли",
        command: "open https://platform.deepseek.com/api_keys\nprintenv DEEPSEEK_API_KEY\nnpx reasonix code",
        hint: "Сначала проверьте, что ключ DeepSeek Platform существует. Не коммитьте ключи в публичные репозитории.",
      },
      {
        problem: "Source build не находит make или Go",
        command: "go version\nmake --version\ngit switch main-v2\nmake build",
        hint: "main-v2 - это Go rewrite branch, поэтому для сборки из исходников нужны Go toolchain и make.",
      },
      {
        problem: "Прокрутка, выделение или paste в терминале работают неверно",
        command:
          "echo $TERM\nprintf '\\e[?1000h'\n# Windows users should also review Git for Windows and Windows Terminal settings",
        hint: "GitHub issue #2649 отслеживает scrolling, PageUp/PageDown и selection-copy в Windows Terminal.",
      },
      {
        problem: "Сообщения, начинающиеся с #, не доходят до agent",
        command: "npx reasonix@latest code\n# Workaround: add a leading space or newline, then follow issue #2658",
        hint: "Этот GitHub bug report оставался открытым 2026-06-02, поэтому он вынесен в error tracker.",
      },
      {
        problem: "Нужно проверить доступность DeepSeek API",
        command:
          "curl -s https://api.deepseek.com | head\n# Then return to Reasonix and run /help or /pro to verify model switching",
        hint: "Сетевая доступность не равна успешной авторизации. Ключ и конфиг Reasonix нужно проверять отдельно.",
      },
    ],
    deepseekOfficialSteps: [
      "Проверьте текущий Node requirement через npm view reasonix engines; пользователям Windows также нужен Git for Windows.",
      "Создайте или скопируйте API-ключ в DeepSeek Platform.",
      "Запустите npx reasonix code внутри каталога целевого проекта.",
      "По умолчанию используется DeepSeek-V4-Flash; введите /pro или /preset max в TUI для Pro.",
      "Для полного списка команд выполните /help внутри Reasonix TUI.",
    ],
    featureBlocks: [
      {
        title: "Прямой DeepSeek path, не wrapper",
        body: "По сравнению с generic OpenAI-compatible tools, Reasonix спроектирован вокруг DeepSeek path: low-cost iteration by default и stronger reasoning when needed.",
      },
      {
        title: "Длинные сессии дешевле контролировать",
        body: "По сравнению с agents, которые заново тратят большой context на каждом turn, Reasonix лучше подходит для sustained debugging, refactors и multi-hour work.",
      },
      {
        title: "Terminal и desktop входы",
        body: "По сравнению с tools, привязанными к IDE или web app, Reasonix запускается из project terminal и также предлагает desktop client.",
      },
      {
        title: "Plan gate для code edits",
        body: "По сравнению с agents, которые сразу редактируют файлы, Reasonix сначала показывает plan, затем подтверждает risky changes, commands и write boundaries.",
      },
      {
        title: "MCP, Skills и Memory",
        body: "По сравнению с fixed-function agents, Reasonix может подключать external tools и сохранять project-specific skills и memory.",
      },
      {
        title: "Reviewable run history",
        body: "По сравнению с one-shot chats, history, branches, checkpoints и command process лучше подходят для debugging, handoff и resume.",
      },
    ],
    seoLandingPages: seoLandingPagesByLocale.ru,
    newsItems: [
      {
        date: "2026-06-10",
        title: "Reasonix Desktop v1.5.0 вышел с Linux .deb пакетом и fixes для approval mode",
        body: "GitHub releases помечают Reasonix Desktop v1.5.0 как latest release от 10 июня: добавлен Linux .deb пакет, а в той же release line исправлены pending todo signoff, поведение YOLO ask-tool и поломка layout кнопок approval rules.",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.5.0",
      },
      {
        date: "2026-06-04",
        title: "Reasonix CLI npm tags разделяют latest и next",
        body: "npm view reasonix dist-tags показывает latest 0.53.2 и next 1.1.0. Проверьте tags перед выбором npx, global npm install или source build.",
        href: "https://www.npmjs.com/package/reasonix",
      },
      {
        date: "2026-06-07",
        title: "desktop-v1.3.0 стал последним публичным desktop release",
        body: "GitHub пометил Reasonix Desktop v1.3.0 как latest release 7 июня; эта release line включает desktop notifications, рост TUI composer под переносы строк, fixes для workspace builtin assembly и repair для импорта legacy sessions.",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.3.0",
      },
      {
        date: "2026-06-02",
        title: "Reasonix main-v2 CLI добавляет grep, .gitignore и interruptible bash",
        body: "Коммиты Reasonix main-v2 на GitHub от 2 июня показывают native grep, поддержку GBK/GB18030 и interruptible bash live streamed output.",
        href: "https://github.com/esengine/DeepSeek-Reasonix/commits/main-v2",
      },
      {
        date: "2026-06-02",
        title: "Коллекция DeepSeek agent продолжает включать Reasonix",
        body: "DeepSeek API docs включают DeepSeek API key и запуск через npx reasonix code. Перед запуском проверьте текущий Node engine в npm package.",
        href: SITE.deepseekGuide,
      },
    ],
    issueWatch: [
      {
        ...sharedIssueWatch[0],
        title: "Новый open bug от 10 июня показывает сбой переключения YOLO mode",
      },
      {
        ...sharedIssueWatch[1],
        title: "Сохраненные allow rules по-прежнему плохо работают с Bash syntax и prefix matching",
      },
      {
        ...sharedIssueWatch[2],
        title: "После линии desktop-v1.5.0 проблема локализации slash commands остается открытой",
      },
    ],
    sourceLinks: sharedSources,
    pages: {
      home: {
        eyebrow: "DeepSeek-native coding agent guide",
        title: "Запускайте DeepSeek-native coding work из терминала",
        primaryCta: "Открыть GitHub загрузки",
        secondaryCta: "Разобрать ошибки CLI",
        terminalNote:
          "Быстрый старт Reasonix. Для Go rewrite следите за веткой GitHub main-v2.",
        articlesTitle: "Глубокие статьи",
        articleReadLabel: "Читать",
        sectionsTitle: "Обзор продукта",
        seoClusterEyebrow: "DeepSeek long-tail pages",
        seoClusterTitle: "DeepSeek coding agent and V4 code entries",
        seoClusterDescription:
          "These pages answer DeepSeek coding agent, DeepSeek code, DeepSeek V4 agent, and DeepSeek V4 code searches before routing readers back to Reasonix.",
        latestNewsTitle: "Последние новости Reasonix AI coding agent",
      },
      articles: {
        metaTitle: "Статьи о Reasonix и типах coding agents",
        metaDescription:
          "Библиотека статей Reasonix о позиционировании Reasonix, DeepSeek-native setup, product advantages, типах coding agents и engineering workflow.",
        eyebrow: "Качественные статьи",
        title: "Reasonix guides, cache architecture, and agent comparisons",
        description:
          "Start with the official DeepSeek path, then compare Reasonix cache-first architecture with Claude Code, Codex, and generic AI CLI workflows.",
        readLabel: "Читать статью",
      },
      articleDetail: {
        backLabel: "Назад к статьям",
        takeawaysTitle: "Ключевые выводы",
        comparisonTitle: "Матрица сравнения",
        dimensionLabel: "Критерий",
        reasonixLabel: "Reasonix",
        genericAgentLabel: "Generic CLI",
        platformAgentLabel: "Platform agent",
        openSourceAgentLabel: "Open-source agent",
        sourcesTitle: "Источники",
      },
      login: {
        metaTitle: "Reasonix login with Clerk",
        metaDescription: "Войдите в Reasonix через Clerk.",
        eyebrow: "Clerk authentication",
        title: "Sign in to Reasonix with Clerk",
        description: "Use Clerk for the Reasonix site session.",
        safetyTitle: "Clerk authentication",
        safetyBodyBeforeLink: "Clerk handles the Reasonix site account:",
        safetyBodyAfterLink: ".",
        safetyLinkLabel: "Clerk",
      },
      community: {
        metaTitle: "Reasonix community discussion",
        metaDescription:
          "Reasonix Q&A community для public questions, replies, Clerk sessions, Supabase storage и provider-key safety.",
        eyebrow: "Reasonix Q&A community",
        title: "Задавайте вопросы по Reasonix installation, CLI errors и articles",
        description:
          "Post and reply through the Reasonix Clerk session. Questions and replies are stored in Supabase Postgres; provider API keys stay outside public forms.",
        discussionsCta: "New question",
        commentsCta: "View questions",
        rulesTitle: "Правила сообщества",
        configTitle: "Community database status",
        configBodyBeforeRepo: "Apply the Supabase migration and configure",
        configBodyAfterRepo:
          "before enabling live posting in production.",
        statusLabel: "Текущий статус",
        configuredLabel: "Настроено",
        pendingLabel: "Ожидает настройки",
        configuratorLabel: "Open community",
      },
      faq: {
        metaTitle: "Reasonix FAQ",
        metaDescription:
          "FAQ Reasonix о первом запуске, npx, npm latest и next tags, source build, CLI errors, Clerk login и безопасности API key.",
        eyebrow: "FAQ",
        title: "Частые вопросы о Reasonix",
        description:
          "Используйте эту страницу, чтобы разделить способы загрузки, версии, вход, ключи и сценарии использования для русскоязычных читателей.",
      },
      github: {
        metaTitle: "Reasonix GitHub загрузки",
        metaDescription:
          "GitHub репозиторий Reasonix, запуск через npx, npm latest и next tags, source build main-v2 и desktop-v1.5.0 release.",
        eyebrow: "GitHub загрузки",
        title: "Как получить Reasonix: npx, main-v2 source и desktop release",
        descriptionBeforeLink: "Официальный репозиторий:",
        descriptionAfterLink:
          ". Проверьте npm dist-tags перед выбором default latest package, next tag или source build main-v2.",
        note:
          "Если нужно быстро запустить Reasonix, начните с npx reasonix code. Для постоянной установки используйте npm i -g reasonix. Клонируйте main-v2 для source-level проверки.",
      },
      errors: {
        metaTitle: "Reasonix: команды для ошибок CLI",
        metaDescription:
          "Troubleshooting Reasonix CLI для npx, DeepSeek API keys, source build, Windows Terminal и GitHub issues.",
        eyebrow: "Ошибки CLI",
        title: "Checklist для диагностики командной строки Reasonix",
        description:
          "Используйте эти команды, чтобы проверить Node/npm, DeepSeek API key, Go toolchain и проблемы терминала без раскрытия секретов.",
        issueWatchTitle: "GitHub issue tracker",
      },
      deepseek: {
        metaTitle: "DeepSeek официально рекомендует Reasonix",
        metaDescription:
          "DeepSeek API docs рекомендуют Reasonix: API key, npx reasonix code и /pro; перед запуском проверьте текущий Node engine через npm.",
        eyebrow: "Официальный сигнал DeepSeek",
        title: "Быстрый старт Reasonix в коллекции DeepSeek agent",
        description:
          "DeepSeek API docs описывают Reasonix как DeepSeek-native coding agent в терминале и дают прямую команду запуска.",
        stepsTitle: "Краткое резюме официальных шагов",
        guideTitle: "Открыть гайд DeepSeek",
        guideBody:
          "Посмотреть оригинальные notes Reasonix и команду запуска в DeepSeek API docs.",
        apiKeysTitle: "Открыть DeepSeek API Keys",
        apiKeysBody:
          "Создайте API key после входа в DeepSeek Platform, затем вернитесь в Reasonix TUI для завершения настройки.",
      },
      news: {
        metaTitle: "Новости Reasonix",
        metaDescription:
          "Новости Reasonix: commits main-v2, GitHub popularity, npm latest, desktop-v1.5.0 release и официальный листинг DeepSeek.",
        eyebrow: "Новости",
        title: "Краткие новости Reasonix",
        description:
          "Новости опираются на GitHub API, npm registry и официальную документацию DeepSeek agent.",
      },
      privacy: {
        metaTitle: "Политика приватности",
        metaDescription:
          "Политика приватности Reasonix: Clerk обрабатывает вход на сайт, API keys остаются локально, а официальные ссылки ведут к первоисточникам.",
        eyebrow: "Политика приватности",
        title: "Держите provider keys локально при использовании Reasonix",
        description:
          "Используйте Reasonix, чтобы найти загрузки Reasonix, notes по входу, настройку API key, команды для ошибок, официальные рекомендации DeepSeek и связанные статьи. Это не официальный сервис Reasonix, DeepSeek, OpenAI, Anthropic или OpenCode.",
        commitmentsTitle: "Что остается вне сайта",
        cards: [
          {
            title: "Вход в аккаунт",
            body: "Используйте Clerk только для входа на страницу. Не вводите credentials DeepSeek, OpenAI, Anthropic или других providers в комментарии или публичные формы.",
          },
          {
            title: "Внешние ссылки",
            body: "После перехода на GitHub, X, DeepSeek Platform, npm, OpenAI, Anthropic и другие внешние сайты там могут действовать собственные политики приватности и cookies.",
          },
          {
            title: "Будущие изменения",
            body: "Если позже расширятся analytics, subscriptions или account-backed features, сначала проверьте здесь типы данных, цели, сроки хранения и opt-out.",
          },
        ],
        protectionTitle: "Раздел защиты приватности",
        protectionBody:
          "Для checklist по загрузкам, официальным аккаунтам, выполнению команд и API keys откройте страницу Privacy Protection.",
      },
      privacyProtection: {
        metaTitle: "Защита приватности",
        metaDescription:
          "Гайд Reasonix по защите приватности: проверяйте GitHub и X accounts, не коммитьте API keys и проверяйте источники репозиториев и permissions перед загрузкой.",
        eyebrow: "Защита приватности",
        title: "Перед использованием AI coding agent проверьте аккаунты, ключи и источники",
        description:
          "Используйте Clerk только для Reasonix login, а provider API keys оставляйте вне сайта. Этот checklist помогает снизить риск фальшивых аккаунтов и утечки ключей при переходах между Reasonix, DeepSeek, Claude Code, Codex, OpenCode и связанными инструментами.",
        checklistTitle: "Checklist защиты приватности",
        accountsTitle: "Проверка официальных аккаунтов",
        checkedLabel: "checked",
        commitmentTitle: "Ваша граница безопасности",
        checklist: [
          "Перед загрузкой Reasonix, Codex, OpenCode или другого CLI проверьте GitHub organization, repository name и release source.",
          "Не вставляйте DeepSeek, OpenAI, Anthropic или другие provider API keys в публичные issues, community posts, screenshots или commits.",
          "Используйте локальные environment variables, key manager или конфиг самого инструмента. Проверяйте .env, logs и shell history перед commit.",
          "Перед запуском curl | bash, npx, brew или npm i -g убедитесь, что команда пришла из official docs или README официального репозитория.",
          "Перед выдачей AI coding agent permissions проверьте working directory, write access, network access, command approval mode и rollback strategy.",
          "Для X/Twitter, GitHub, mirrors и desktop installers сверяйте официальный сайт и официальный репозиторий.",
        ],
      },
      footer: {
        privacyTitle: "Приватность и границы источников",
        privacyBody:
          "Используйте Reasonix как guide по источникам. Он не представляет Reasonix, DeepSeek или связанных поставщиков.",
        legalTitle: "Право и защита",
        accountsTitle: "Официальные аккаунты",
      },
      notFound: {
        title: "Страница не найдена",
        description:
          "Сейчас вы можете открыть обзор, статьи, вход, FAQ, загрузки, ошибки, официальные рекомендации, новости и страницы приватности.",
        homeLabel: "На главную",
      },
    },
  },
} satisfies Record<Locale, LocalizedContent>;

export function getContent(locale: Locale = DEFAULT_LOCALE): LocalizedContent {
  return contentByLocale[locale];
}

export function getSeoLandingPage(
  locale: Locale = DEFAULT_LOCALE,
  path: string,
): SeoLandingPage | undefined {
  return contentByLocale[locale].seoLandingPages.find(
    (page) => page.path === path,
  );
}

export const navItems = contentByLocale[DEFAULT_LOCALE].navItems;
export const commandReference =
  contentByLocale[DEFAULT_LOCALE].commandReference;
export const legalLinks = contentByLocale[DEFAULT_LOCALE].legalLinks;
export const privacyCommitments =
  contentByLocale[DEFAULT_LOCALE].privacyCommitments;
export const officialAccounts = contentByLocale[DEFAULT_LOCALE].officialAccounts;
export const projectStats = contentByLocale[DEFAULT_LOCALE].projectStats;
export const quickFacts = contentByLocale[DEFAULT_LOCALE].quickFacts;
export const downloadOptions = contentByLocale[DEFAULT_LOCALE].downloadOptions;
export const loginSteps = contentByLocale[DEFAULT_LOCALE].loginSteps;
export const faqs = contentByLocale[DEFAULT_LOCALE].faqs;
export const errorCommands = contentByLocale[DEFAULT_LOCALE].errorCommands;
export const deepseekOfficialSteps =
  contentByLocale[DEFAULT_LOCALE].deepseekOfficialSteps;
export const featureBlocks = contentByLocale[DEFAULT_LOCALE].featureBlocks;
export const seoLandingPages =
  contentByLocale[DEFAULT_LOCALE].seoLandingPages;
export const newsItems = contentByLocale[DEFAULT_LOCALE].newsItems;
export const issueWatch = contentByLocale[DEFAULT_LOCALE].issueWatch;
export const sourceLinks = contentByLocale[DEFAULT_LOCALE].sourceLinks;
