import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export const SITE = {
  name: "Reasonix Watch",
  title: "Reasonix Watch | Reasonix information hub",
  slogan: "Reasonix news, downloads, Clerk login, errors, and official signals in one place.",
  description:
    "An English-first Reasonix information hub covering DeepSeek official recommendations, GitHub downloads, CLI errors, FAQ, privacy notes, and recent project news.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://reasonix.watch",
  checkedAt: "2026-06-02",
  github: "https://github.com/esengine/DeepSeek-Reasonix",
  officialSite: "https://esengine.github.io/DeepSeek-Reasonix/",
  deepseekGuide:
    "https://github.com/deepseek-ai/awesome-deepseek-agent/blob/main/docs/reasonix.md",
  deepseekApiKeys: "https://platform.deepseek.com/api_keys",
} as const;

export const GISCUS = {
  recommendedRepo: "reasonix-watch-community",
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO || "",
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "",
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "",
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "",
  mapping: "pathname",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom",
  theme: "light",
  lang: "zh-CN",
} as const;

export const communitySteps = [
  {
    title: "使用 GitHub 身份",
    body: "文章评论通过 giscus 调起 GitHub OAuth。你授权的是 GitHub/giscus，不需要给本站创建密码。",
  },
  {
    title: "评论落在 Discussions",
    body: `默认建议独立仓库 ${GISCUS.recommendedRepo} 承载评论，后续审核、置顶和归档都在 GitHub Discussions 内完成。`,
  },
  {
    title: "不要粘贴密钥",
    body: "问题描述可以包含命令、版本和报错摘要，但不要发布 DeepSeek、OpenAI、Anthropic 等 provider 的 API Key。",
  },
] as const;

export const communityRules = [
  "优先讨论 Reasonix 安装、版本、DeepSeek API Key 配置、命令行报错和文章内容补充。",
  "可以贴最小复现命令、Node/npm/go 版本和公开 issue 链接，但不要贴密钥、token、私有仓库地址或完整环境变量。",
  "评论审核、删除、锁定和用户封禁以 GitHub Discussions 的公开记录为准。",
  "v1 不提供站内收藏、私信、通知、个人主页或自建论坛数据库；站内账号会话由 Clerk 承载。",
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
  { label: "DeepSeek official guide", href: SITE.deepseekGuide },
  { label: "npm package", href: "https://www.npmjs.com/package/reasonix" },
  {
    label: "Desktop release",
    href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v0.53.0",
  },
] as const;

const sharedIssueWatch = [
  {
    id: "#2658",
    title: "Messages starting with # are not received by the agent",
    href: "https://github.com/esengine/DeepSeek-Reasonix/issues/2658",
  },
  {
    id: "#2652",
    title: "Terminal button styling issue",
    href: "https://github.com/esengine/DeepSeek-Reasonix/issues/2652",
  },
  {
    id: "#2649",
    title: "Windows Terminal scroll, PageUp/PageDown, and copy-paste issue",
    href: "https://github.com/esengine/DeepSeek-Reasonix/issues/2649",
  },
] as const;

const sharedProjectStats = [
  { label: "GitHub stars", value: "16,099", note: "GitHub API, 2026-06-02" },
  { label: "Forks", value: "954", note: "GitHub API, 2026-06-02" },
  { label: "Open issues", value: "469", note: "GitHub API, 2026-06-02" },
  { label: "Default branch", value: "main-v2", note: "Go rewrite branch" },
] as const;

export const contentByLocale = {
  en: {
    site: {
      title: SITE.title,
      slogan: SITE.slogan,
      description: SITE.description,
      shellSubtitle: "Reasonix information hub",
      contentPrinciplesTitle: "Content boundaries",
      contentPrinciplesBody:
        "Clerk handles site login. Provider API keys stay out of this site and belong in your local Reasonix setup.",
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
    legalLinks: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/privacy-protection", label: "Privacy protection" },
    ],
    privacyCommitments: [
      "Clerk handles the site account session; this site does not collect, store, or proxy API keys for DeepSeek, OpenAI, Anthropic, or other providers.",
      "Download, DeepSeek API-key setup, and official recommendation links point to the project GitHub, npm, or vendor platforms.",
      "The site does not write tracking cookies by default, does not run ad redirects, and does not send visitor input to third-party models.",
      "Command-line snippets are informational only. Review them in your own terminal and project directory before running them.",
    ],
    officialAccounts: [
      {
        name: "Reasonix",
        context: "DeepSeek-native coding agent",
        githubLabel: "esengine/DeepSeek-Reasonix",
        github: SITE.github,
        xLabel: "X not confirmed",
        x: null,
        note: "The currently verified official entry points are the GitHub repository and the DeepSeek agent recommendation page.",
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
      {
        name: "Redux",
        context: "State management article track",
        githubLabel: "reduxjs",
        github: "https://github.com/reduxjs",
        xLabel: "X not confirmed",
        x: null,
        note: "The official GitHub organization is verifiable; a single official X account is not confirmed in the docs.",
      },
      {
        name: "Claude / Anthropic",
        context: "Claude Code article track",
        githubLabel: "anthropics",
        github: "https://github.com/anthropics",
        xLabel: "@AnthropicAI",
        x: "https://x.com/AnthropicAI",
        note: "Claude Code content follows Anthropic product and documentation wording.",
      },
      {
        name: "Codex / OpenAI",
        context: "Codex article track",
        githubLabel: "openai/codex",
        github: "https://github.com/openai/codex",
        xLabel: "@OpenAI",
        x: "https://x.com/OpenAI",
        note: "OpenAI's Codex page and the openai/codex repository can be cross-checked.",
      },
      {
        name: "OpenCode",
        context: "Open-source agent article track",
        githubLabel: "anomalyco/opencode",
        github: "https://github.com/anomalyco/opencode",
        xLabel: "@opencode",
        x: "https://x.com/opencode",
        note: "The OpenCode README links to opencode.ai and the X community entry point.",
      },
    ],
    projectStats: sharedProjectStats,
    quickFacts: [
      {
        label: "Current npm latest",
        value: "reasonix@0.53.2",
        detail:
          "The npm package is still in the 0.x line. The README also says the 1.0 Go binary has not yet been published to npm, so source builds are needed for the newest main-v2 work.",
      },
      {
        label: "Official repository",
        value: "esengine/DeepSeek-Reasonix",
        detail:
          "The GitHub default branch is main-v2, and the project is described as a DeepSeek-native AI coding agent for your terminal.",
      },
      {
        label: "DeepSeek entry",
        value: "npx reasonix code",
        detail:
          "The DeepSeek agent document recommends Node.js 20.10+, a DeepSeek API key, and running npx inside the target project directory.",
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
        tag: "Latest / Go rewrite",
        command:
          "git clone https://github.com/esengine/DeepSeek-Reasonix.git\ncd DeepSeek-Reasonix\ngit switch main-v2\nmake build",
        description:
          "The README marks main-v2 as the active 1.0 Go rewrite branch. Use a source build when you need to verify the newest commits.",
        href: SITE.github,
      },
      {
        title: "Desktop release assets",
        tag: "Desktop package",
        command:
          "open https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v0.53.0",
        description:
          "The latest public desktop release is desktop-v0.53.0, with macOS DMG, Windows, Linux deb/rpm/AppImage, and latest.json assets.",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v0.53.0",
      },
    ],
    loginSteps: [
      {
        title: "Sign in to DeepSeek Platform",
        body: "Open the DeepSeek API Keys page to create or copy an API key. Clerk only handles this site's account session; Reasonix CLI model credentials still come from DeepSeek Platform.",
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
        title: "Use your GitHub identity",
        body: "Article comments load through giscus and GitHub OAuth. You authorize GitHub/giscus; this site does not create a password for you.",
      },
      {
        title: "Comments live in Discussions",
        body: `The recommended default is a separate public repository named ${GISCUS.recommendedRepo}. Moderation, pinning, and archiving stay inside GitHub Discussions.`,
      },
      {
        title: "Do not paste secrets",
        body: "Bug reports can include commands, versions, and error summaries, but should not include DeepSeek, OpenAI, Anthropic, or other provider API keys.",
      },
    ],
    communityRules: [
      "Prioritize Reasonix installation, versions, DeepSeek API key setup, CLI errors, and article corrections.",
      "You may share minimal reproduction commands, Node/npm/go versions, and public issue links, but not secrets, tokens, private repositories, or complete environment variables.",
      "Comment moderation, deletion, locking, and user bans follow the public records of GitHub Discussions.",
      "Version 1 does not provide in-site favorites, private messages, notifications, profiles, or a self-hosted forum database; the site account session is handled by Clerk.",
    ],
    faqs: [
      {
        question: "How is Reasonix different from a generic OpenAI-compatible CLI?",
        answer:
          "Reasonix emphasizes DeepSeek-native behavior, prefix-cache stability, flash-first cost control, and automatic tool-call repair. It is not just another CLI with a model name changed.",
      },
      {
        question: "Should I use npm or build from source now?",
        answer:
          "Use npx reasonix code for first-time testing. Use the GitHub source and main-v2 when you want to follow the 1.0 Go rewrite. The README says 1.0.0 has not been published to npm yet.",
      },
      {
        question: "Does the login page store my API key?",
        answer:
          "No. The login page uses Clerk for a site account session. DeepSeek API keys should stay in your own environment variables or local Reasonix config.",
      },
      {
        question: "Why do the news items mention both 0.53.x and a 1.0 Go rewrite?",
        answer:
          "The public state is split: GitHub main-v2 describes the 1.0 Go rewrite, while npm latest is still 0.53.2 and the desktop release is in the 0.53.0 line.",
      },
      {
        question: "Is Reasonix useful for Chinese-speaking users?",
        answer:
          "Yes, especially for developers already using the DeepSeek API. The open issues also include Chinese-language reports about terminal behavior and message parsing.",
      },
    ],
    errorCommands: [
      {
        problem: "npx reasonix code does not start or resolves the wrong version",
        command: "node -v\nnpm view reasonix version\nnpm cache verify\nnpx reasonix@latest code",
        hint: "DeepSeek recommends Node.js 20.10+. If you want the main-v2 Go rewrite, npm latest may still not be the 1.0 line.",
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
        command: "npx reasonix@latest code\n# Temporary workaround: add a leading space or newline, then watch issue #2658",
        hint: "This was still an open GitHub bug report on 2026-06-02, so it belongs in the error watch area.",
      },
      {
        problem: "Need to confirm DeepSeek API connectivity",
        command:
          "curl -s https://api.deepseek.com | head\n# Then return to Reasonix and run /help or /pro to verify model switching",
        hint: "Network reachability is not the same as successful authentication. Key and Reasonix config still need separate checks.",
      },
    ],
    deepseekOfficialSteps: [
      "Install Node.js 20.10+. Windows users also need Git for Windows.",
      "Create or copy an API key from DeepSeek Platform.",
      "Run npx reasonix code inside the target project directory.",
      "Use DeepSeek-V4-Flash by default; enter /pro or /preset max in the TUI for Pro.",
      "Run /help inside the Reasonix TUI for the full command list.",
    ],
    featureBlocks: [
      {
        title: "DeepSeek-native",
        body: "Built directly around the DeepSeek API and DeepSeek-V4-Flash/Pro workflow, not around a thin translation layer.",
      },
      {
        title: "Cache-first loop",
        body: "The README emphasizes prefix-cache stability for long sessions and lower-cost iteration.",
      },
      {
        title: "CLI and desktop tracks",
        body: "The repository has a terminal coding agent and desktop-v0.53.0 release assets, which serve different user paths.",
      },
      {
        title: "MCP and plugins",
        body: "The main-v2 README describes Reasonix as an MCP client with stdio and Streamable HTTP plugin support.",
      },
      {
        title: "Plan-gated work",
        body: "Plan review keeps risky edits explicit before the agent writes files or runs commands.",
      },
      {
        title: "Replayable sessions",
        body: "Events, stats, replay, history, and checkpoints make long agent runs easier to audit and resume.",
      },
    ],
    newsItems: [
      {
        date: "2026-06-02",
        title: "main-v2 keeps moving with grep, .gitignore, and interruptible bash work",
        body: "GitHub commits on June 2 show native grep, GBK/GB18030 encoding support, and interruptible bash live streamed output changes.",
        href: "https://github.com/esengine/DeepSeek-Reasonix/commits/main-v2",
      },
      {
        date: "2026-06-02",
        title: "Reasonix passes 16k GitHub stars",
        body: "The GitHub API showed 16,099 stars, 954 forks, 469 open issues, and main-v2 as the default branch for esengine/DeepSeek-Reasonix.",
        href: SITE.github,
      },
      {
        date: "2026-06-02",
        title: "npm latest remains 0.53.2 while the 1.0 Go binary is not on npm",
        body: "npm view reasonix reported latest as 0.53.2. The main-v2 README says the 1.0.0+ line will ship a Go binary, but 1.0.0 was not published to npm.",
        href: "https://www.npmjs.com/package/reasonix",
      },
      {
        date: "2026-05-27",
        title: "desktop-v0.53.0 ships multi-platform desktop assets",
        body: "The GitHub desktop-v0.53.0 release includes macOS universal DMG, Windows installer, Linux deb/rpm/AppImage, and latest.json.",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v0.53.0",
      },
      {
        date: "2026-06-02",
        title: "DeepSeek's agent collection continues to list Reasonix",
        body: "The DeepSeek awesome-deepseek-agent Reasonix page lists Node.js 20.10+, a DeepSeek API key, and npx reasonix code as the quick start.",
        href: SITE.deepseekGuide,
      },
    ],
    issueWatch: sharedIssueWatch,
    sourceLinks: sharedSources,
    pages: {
      home: {
        eyebrow: "DeepSeek-native coding agent watch",
        title: "The best top secret agent",
        primaryCta: "View GitHub downloads",
        secondaryCta: "Troubleshoot CLI errors",
        terminalNote:
          "DeepSeek's recommended quick-start path. Follow the GitHub main-v2 branch when you want the Go rewrite.",
        articlesTitle: "Deep-dive articles",
        articleReadLabel: "Read",
        sectionsTitle: "Why Reasonix",
        latestNewsTitle: "Latest news",
      },
      articles: {
        metaTitle: "High-quality articles on Redux, Claude Code, Codex, and OpenCode",
        metaDescription:
          "Reasonix Watch article library covering Redux, Claude Code, OpenAI Codex, and OpenCode positioning, differences, and engineering choices.",
        eyebrow: "High-quality articles",
        title: "Deep comparisons for Redux, Claude Code, Codex, and OpenCode",
        description:
          "These articles separate frontend state management from AI coding agents, making the content durable for search and easier to update as tool signals change.",
        readLabel: "Read article",
      },
      articleDetail: {
        backLabel: "Back to articles",
        takeawaysTitle: "Key takeaways",
        comparisonTitle: "Comparison matrix",
        dimensionLabel: "Dimension",
        sourcesTitle: "Sources",
      },
      login: {
        metaTitle: "Reasonix login with Clerk",
        metaDescription:
          "Sign in to Reasonix Watch with Clerk while keeping DeepSeek API keys local to Reasonix CLI setup.",
        eyebrow: "Clerk authentication",
        title: "Sign in to Reasonix Watch with Clerk",
        description:
          "Use Clerk for the site account session. DeepSeek API keys are still configured separately in your local Reasonix CLI and are not collected by this site.",
        safetyTitle: "Safe default",
        safetyBodyBeforeLink:
          "Do not put a DeepSeek API key into a public repository, screenshot, or bug report. When you need a key, open DeepSeek Platform directly:",
        safetyBodyAfterLink: ".",
        safetyLinkLabel: "API Keys",
      },
      community: {
        metaTitle: "Reasonix community discussion",
        metaDescription:
          "Reasonix Watch community notes: use GitHub/giscus for article comments, keep comment data in a separate GitHub Discussions repository, and avoid storing accounts on this site.",
        eyebrow: "GitHub Discussions community",
        title:
          "Discuss Reasonix installation, errors, and article updates with a GitHub identity",
        description:
          "Version 1 does not create in-site accounts or a forum database. Article pages load GitHub Discussions comments through giscus, while moderation and data stay in the public GitHub repository.",
        discussionsCta: "Open Discussions",
        commentsCta: "View article comments",
        rulesTitle: "Community rules",
        configTitle: "giscus configuration status",
        configBodyBeforeRepo:
          "The recommended setup is a separate public repository named",
        configBodyAfterRepo:
          "with Discussions enabled, the giscus app installed, and a Comments or General category created.",
        statusLabel: "Current status",
        configuredLabel: "Configured",
        pendingLabel: "Pending",
        configuratorLabel: "Open giscus configurator",
      },
      faq: {
        metaTitle: "Reasonix FAQ",
        metaDescription:
          "Reasonix FAQ covering DeepSeek-native behavior, npx versus source builds, API key safety, and the relationship between 0.53.x and the 1.0 Go rewrite.",
        eyebrow: "FAQ",
        title: "Reasonix frequently asked questions",
        description:
          "This page collects the download, version, account, and Chinese-user questions that are easiest to confuse.",
      },
      github: {
        metaTitle: "Reasonix GitHub downloads",
        metaDescription:
          "Reasonix GitHub repository, npx start path, main-v2 source build, and desktop-v0.53.0 multi-platform release links.",
        eyebrow: "GitHub downloads",
        title: "Reasonix download paths: npx, main-v2 source, and desktop release",
        descriptionBeforeLink: "The official repository is",
        descriptionAfterLink:
          ". The public state currently has npm 0.53.x and the main-v2 Go rewrite in parallel.",
        note:
          "If your goal is to run Reasonix immediately, start with npx reasonix code. If your goal is to follow the hottest 1.0 Go rewrite work, clone main-v2.",
      },
      errors: {
        metaTitle: "Reasonix CLI error commands",
        metaDescription:
          "Reasonix CLI troubleshooting for npx, DeepSeek API keys, source builds, Windows Terminal behavior, and GitHub issue tracking.",
        eyebrow: "CLI errors",
        title: "Reasonix command-line troubleshooting checklist",
        description:
          "These commands do not store user secrets. They help check Node/npm, DeepSeek API keys, Go build tooling, and terminal interaction issues.",
        issueWatchTitle: "GitHub issue watch",
      },
      deepseek: {
        metaTitle: "DeepSeek officially recommends Reasonix",
        metaDescription:
          "DeepSeek awesome-deepseek-agent recommends Reasonix with Node.js 20.10+, an API key, npx reasonix code, and /pro.",
        eyebrow: "DeepSeek official signal",
        title: "Reasonix quick-start path in DeepSeek's agent collection",
        description:
          "The DeepSeek awesome-deepseek-agent document describes Reasonix as a DeepSeek-native coding agent running in the terminal and gives the direct launch command.",
        stepsTitle: "Official steps summary",
        guideTitle: "Open the DeepSeek guide",
        guideBody:
          "Read the original Reasonix entry and startup command in awesome-deepseek-agent.",
        apiKeysTitle: "Open DeepSeek API Keys",
        apiKeysBody:
          "Create an API key after signing in to DeepSeek Platform, then return to the Reasonix TUI to finish setup.",
      },
      news: {
        metaTitle: "Reasonix news",
        metaDescription:
          "Reasonix news covering main-v2 commits, GitHub popularity, npm latest, desktop-v0.53.0 release, and DeepSeek official listing.",
        eyebrow: "News",
        title: "Reasonix news brief",
        description:
          "News items prioritize GitHub API data, npm registry state, and DeepSeek official agent documentation.",
      },
      privacy: {
        metaTitle: "Privacy policy",
        metaDescription:
          "Reasonix Watch privacy policy: Clerk handles site login, API keys stay local, and official links still point to original sources.",
        eyebrow: "Privacy policy",
        title: "Clerk handles site login; provider keys stay local",
        description:
          "Reasonix Watch organizes Reasonix downloads, account login, API-key setup notes, error commands, DeepSeek official recommendations, and related articles. It is not an official service from Reasonix, DeepSeek, OpenAI, Anthropic, Redux, or OpenCode.",
        commitmentsTitle: "What we do not collect",
        cards: [
          {
            title: "Account login",
            body: "The site login is handled by Clerk. Do not enter DeepSeek, OpenAI, Anthropic, or other provider credentials into site comments or public forms.",
          },
          {
            title: "External links",
            body: "After clicking GitHub, X, DeepSeek Platform, npm, OpenAI, Anthropic, or other external links, those sites may apply their own privacy policies and cookies.",
          },
          {
            title: "Future changes",
            body: "If analytics, subscriptions, or account-backed features expand later, this page should be updated first with data type, purpose, retention, and opt-out details.",
          },
        ],
        protectionTitle: "Privacy protection entry",
        protectionBody:
          "For a checklist covering downloads, official accounts, command execution, and API key handling, open the Privacy Protection page.",
      },
      privacyProtection: {
        metaTitle: "Privacy protection",
        metaDescription:
          "Reasonix Watch privacy protection guide: verify GitHub and X accounts, avoid committing API keys, and confirm repository sources and command permissions before downloading.",
        eyebrow: "Privacy protection",
        title: "Before using an AI coding agent, verify accounts, keys, and sources",
        description:
          "Reasonix Watch login is handled by Clerk, while provider API keys remain outside the site. This checklist helps reduce impersonation and key-leak risk while moving between Reasonix, DeepSeek, Claude Code, Codex, OpenCode, and related tools.",
        checklistTitle: "Privacy protection checklist",
        accountsTitle: "Official account verification",
        checkedLabel: "checked",
        commitmentTitle: "Site commitments",
        checklist: [
          "Before downloading Reasonix, Codex, OpenCode, or another CLI, verify the GitHub organization, repository name, and release source.",
          "Do not paste DeepSeek, OpenAI, Anthropic, or other provider API keys into public issues, comments, screenshots, or commits.",
          "Use local environment variables, a key manager, or the tool's own config. Check .env files, logs, and shell history before committing.",
          "Before running curl | bash, npx, brew, or npm i -g install commands, confirm that they come from official docs or the official repository README.",
          "Before granting an AI coding agent permissions, inspect the working directory, write access, network access, command approval mode, and rollback strategy.",
          "For X/Twitter accounts, GitHub repositories, mirrors, and desktop installers, cross-check the official site and official repository.",
        ],
      },
      footer: {
        privacyTitle: "Privacy and source boundary",
        privacyBody:
          "Reasonix Watch is an information aggregation site. It does not represent Reasonix, DeepSeek, or related vendors.",
        legalTitle: "Legal and protection",
        accountsTitle: "Official accounts",
      },
      notFound: {
        title: "Page not found",
        description:
          "This Reasonix information site currently exposes overview, articles, login, FAQ, downloads, errors, official recommendations, news, and privacy pages.",
        homeLabel: "Back home",
      },
    },
  },
  "zh-cn": {
    site: {
      title: "Reasonix Watch | DeepSeek Reasonix 资讯站",
      slogan: "把 Reasonix 的下载、Clerk 登录、报错和官方信号放在一屏。",
      description:
        "面向中文开发者的 Reasonix 资讯站，聚合 DeepSeek 官方推荐、GitHub 下载、常见命令行报错、FAQ、隐私说明和近期项目新闻。",
      shellSubtitle: "DeepSeek Reasonix 简体中文资讯",
      contentPrinciplesTitle: "内容原则",
      contentPrinciplesBody:
        "Clerk 承载站内登录；模型服务商 API Key 不进本站，仍保存在本机 Reasonix 配置中。",
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
    legalLinks: [
      { href: "/privacy", label: "隐私协议" },
      { href: "/privacy-protection", label: "保护隐私" },
    ],
    privacyCommitments: [
      "站内账号会话由 Clerk 承载；本站不收集、保存或中转 DeepSeek/OpenAI/Anthropic 等服务的 API Key。",
      "下载、DeepSeek API Key 配置和官方推荐入口仍跳转到项目 GitHub、npm 或厂商官方平台。",
      "本站不默认写入跟踪 Cookie，不接入广告重定向，也不把访问者输入发送给第三方模型。",
      "命令行内容只作为信息展示；用户应在自己的终端和项目目录内审查后执行。",
    ],
    officialAccounts: [
      {
        name: "Reasonix",
        context: "DeepSeek-native coding agent",
        githubLabel: "esengine/DeepSeek-Reasonix",
        github: SITE.github,
        xLabel: "X 未确认",
        x: null,
        note: "当前可确认官方入口是 GitHub 仓库与 DeepSeek agent 推荐页。",
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
      {
        name: "Redux",
        context: "状态管理文章线",
        githubLabel: "reduxjs",
        github: "https://github.com/reduxjs",
        xLabel: "X 未确认",
        x: null,
        note: "Redux 官方仓库组织可确认；未在官方文档中确认统一 X 账号。",
      },
      {
        name: "Claude / Anthropic",
        context: "Claude Code 文章线",
        githubLabel: "anthropics",
        github: "https://github.com/anthropics",
        xLabel: "@AnthropicAI",
        x: "https://x.com/AnthropicAI",
        note: "Claude Code 使用 Anthropic 官方产品与文档口径。",
      },
      {
        name: "Codex / OpenAI",
        context: "Codex 文章线",
        githubLabel: "openai/codex",
        github: "https://github.com/openai/codex",
        xLabel: "@OpenAI",
        x: "https://x.com/OpenAI",
        note: "OpenAI 官方 Codex 页面与 openai/codex 仓库可对应。",
      },
      {
        name: "OpenCode",
        context: "开源 agent 文章线",
        githubLabel: "anomalyco/opencode",
        github: "https://github.com/anomalyco/opencode",
        xLabel: "@opencode",
        x: "https://x.com/opencode",
        note: "OpenCode 仓库 README 链接 opencode.ai 与 X 社区入口。",
      },
    ],
    projectStats: sharedProjectStats,
    quickFacts: [
      {
        label: "当前 npm latest",
        value: "reasonix@0.53.2",
        detail:
          "npm 包当前仍是 0.x；README 同时提示 1.0 Go binary 尚未发布到 npm，追新需要从 main-v2 构建。",
      },
      {
        label: "官方仓库",
        value: "esengine/DeepSeek-Reasonix",
        detail:
          "GitHub 默认分支 main-v2，项目描述为 DeepSeek-native AI coding agent for your terminal。",
      },
      {
        label: "DeepSeek 推荐入口",
        value: "npx reasonix code",
        detail:
          "DeepSeek awesome agent 文档推荐 Node.js 20.10+、DeepSeek API Key、项目目录内运行 npx。",
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
        tag: "追新/Go 重写",
        command:
          "git clone https://github.com/esengine/DeepSeek-Reasonix.git\ncd DeepSeek-Reasonix\ngit switch main-v2\nmake build",
        description:
          "README 标注 main-v2 是 1.0 Go 重写的默认开发分支；如果你要验证最新提交，优先走源码构建。",
        href: SITE.github,
      },
      {
        title: "桌面版 release 资产",
        tag: "桌面安装包",
        command:
          "open https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v0.53.0",
        description:
          "GitHub 最新公开桌面 release 为 desktop-v0.53.0，包含 macOS DMG、Windows、Linux deb/rpm/AppImage 等资产。",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v0.53.0",
      },
    ],
    loginSteps: [
      {
        title: "登录 DeepSeek Platform",
        body: "进入 DeepSeek API Keys 页面创建或复制 API Key。Clerk 只处理本站账号会话；Reasonix CLI 的模型凭证来自 DeepSeek Platform。",
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
        title: "使用 GitHub 身份",
        body: "文章评论通过 giscus 调起 GitHub OAuth。你授权的是 GitHub/giscus，不需要给本站创建密码。",
      },
      {
        title: "评论落在 Discussions",
        body: `默认建议独立仓库 ${GISCUS.recommendedRepo} 承载评论，后续审核、置顶和归档都在 GitHub Discussions 内完成。`,
      },
      {
        title: "不要粘贴密钥",
        body: "问题描述可以包含命令、版本和报错摘要，但不要发布 DeepSeek、OpenAI、Anthropic 等 provider 的 API Key。",
      },
    ],
    communityRules: [
      "优先讨论 Reasonix 安装、版本、DeepSeek API Key 配置、命令行报错和文章内容补充。",
      "可以贴最小复现命令、Node/npm/go 版本和公开 issue 链接，但不要贴密钥、token、私有仓库地址或完整环境变量。",
      "评论审核、删除、锁定和用户封禁以 GitHub Discussions 的公开记录为准。",
      "v1 不提供站内收藏、私信、通知、个人主页或自建论坛数据库；站内账号会话由 Clerk 承载。",
    ],
    faqs: [
      {
        question: "Reasonix 和普通 OpenAI-compatible CLI 有什么不同？",
        answer:
          "Reasonix 的官方介绍强调 DeepSeek-native、prefix-cache stability、flash-first 成本控制和自动 tool-call repair；它不是把别的 CLI 简单换一层模型名。",
      },
      {
        question: "现在应该用 npm 还是源码构建？",
        answer:
          "入门体验用 DeepSeek 推荐的 npx reasonix code；追 main-v2/Go 重写用 GitHub 源码 make build。README 明确提示 1.0.0 尚未发布到 npm。",
      },
      {
        question: "本站的登录页会保存 API Key 吗？",
        answer:
          "不会。登录页使用 Clerk 处理站内账号会话。DeepSeek API Key 应保存在你自己的环境变量或 Reasonix 本地配置中。",
      },
      {
        question: "为什么新闻里同时出现 0.53.x 和 1.0 Go 重写？",
        answer:
          "公开状态确实并行：GitHub main-v2 README 宣告 1.0 Go 重写，npm latest 仍是 0.53.2，桌面 release 也是 0.53.0 系列。",
      },
      {
        question: "Reasonix 适合中文用户吗？",
        answer:
          "适合关注 DeepSeek API 的中文开发者。当前 GitHub issues 中也有中文问题反馈，例如以 # 开头消息、Windows Terminal 滚动和终端按钮样式问题。",
      },
    ],
    errorCommands: [
      {
        problem: "npx reasonix code 拉不起来或版本不对",
        command: "node -v\nnpm view reasonix version\nnpm cache verify\nnpx reasonix@latest code",
        hint: "DeepSeek 推荐 Node.js 20.10+。如果你要的是 main-v2 Go 重写，npm latest 仍可能不是 1.0。",
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
      "安装 Node.js 20.10+；Windows 用户还需要 Git for Windows。",
      "从 DeepSeek Platform 获取 API Key。",
      "进入项目目录运行 npx reasonix code。",
      "默认使用 DeepSeek-V4-Flash；在 TUI 内输入 /pro 或 /preset max 切到 Pro。",
      "需要完整命令帮助时，在 Reasonix TUI 中运行 /help。",
    ],
    featureBlocks: [
      {
        title: "DeepSeek-native",
        body: "直接面向 DeepSeek API 和 DeepSeek-V4-Flash/Pro 工作流，而不是通过翻译层接入。",
      },
      {
        title: "Cache-first loop",
        body: "README 强调围绕 prefix cache 稳定性设计，适合长会话和低成本迭代。",
      },
      {
        title: "CLI + 桌面双线",
        body: "仓库有 terminal coding agent，也有 desktop-v0.53.0 release 资产，适合分不同用户路径呈现。",
      },
      {
        title: "MCP / plugins",
        body: "main-v2 README 说明 Reasonix 可以作为 MCP client，支持 stdio 和 Streamable HTTP 插件。",
      },
      {
        title: "Plan gate",
        body: "在高风险写入前先审查计划，让文件改动、命令执行和回滚边界更清楚。",
      },
      {
        title: "可回放长会话",
        body: "事件、统计、replay、history 和 checkpoint 让长时间 agent 工作更容易审计、排错和恢复。",
      },
    ],
    newsItems: [
      {
        date: "2026-06-02",
        title: "main-v2 持续高频提交，新增 grep 尊重 .gitignore 与 bash 流式中断能力",
        body: "GitHub commits 显示 6 月 2 日连续合入原生 grep、GBK/GB18030 编码支持、interruptible bash live streamed output 等改动。",
        href: "https://github.com/esengine/DeepSeek-Reasonix/commits/main-v2",
      },
      {
        date: "2026-06-02",
        title: "Reasonix GitHub 热度突破 16k stars",
        body: "GitHub API 显示 esengine/DeepSeek-Reasonix 有 16,099 stars、954 forks、469 open issues，默认分支为 main-v2。",
        href: SITE.github,
      },
      {
        date: "2026-06-02",
        title: "npm latest 仍为 0.53.2，1.0 Go binary 尚未上 npm",
        body: "npm view reasonix 显示 latest 为 0.53.2；main-v2 README 同时说明 1.0.0+ 将交付 Go binary，但 1.0.0 还未发布到 npm。",
        href: "https://www.npmjs.com/package/reasonix",
      },
      {
        date: "2026-05-27",
        title: "desktop-v0.53.0 release 发布多平台桌面资产",
        body: "GitHub release desktop-v0.53.0 提供 macOS universal DMG、Windows installer、Linux deb/rpm/AppImage 和 latest.json。",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v0.53.0",
      },
      {
        date: "2026-06-02",
        title: "DeepSeek 官方 agent 集合页继续收录 Reasonix",
        body: "DeepSeek awesome-deepseek-agent 的 Reasonix 页面给出 Node.js 20.10+、DeepSeek API Key、npx reasonix code 的快速启动方式。",
        href: SITE.deepseekGuide,
      },
    ],
    issueWatch: [
      { ...sharedIssueWatch[0], title: "以 # 开头的消息 agent 收不到" },
      { ...sharedIssueWatch[1], title: "终端按钮样式有问题" },
      {
        ...sharedIssueWatch[2],
        title: "Windows Terminal 滚轮/PageUpDown 与复制粘贴问题",
      },
    ],
    sourceLinks: sharedSources,
    pages: {
      home: {
        eyebrow: "DeepSeek-native coding agent watch",
        title: "面向 DeepSeek 的终端编码代理",
        primaryCta: "查看 GitHub 下载",
        secondaryCta: "排查命令行报错",
        terminalNote:
          "DeepSeek 官方推荐的快速启动方式；追 Go 重写则从 GitHub main-v2 构建。",
        articlesTitle: "深度文章",
        articleReadLabel: "阅读",
        sectionsTitle: "为什么是 Reasonix",
        latestNewsTitle: "最新新闻",
      },
      articles: {
        metaTitle: "高质量文章：Redux、Claude Code、Codex、OpenCode 对比",
        metaDescription:
          "Reasonix Watch 的深度文章库，聚焦 Redux、Claude Code、OpenAI Codex、OpenCode 的定位、差异和工程选型。",
        eyebrow: "高质量文章",
        title: "Redux、Claude Code、Codex、OpenCode 深度对比",
        description:
          "这些文章把前端状态管理和 AI 编码代理分层讲清楚，适合做长期可索引内容，也方便后续持续更新最新版本信号。",
        readLabel: "阅读文章",
      },
      articleDetail: {
        backLabel: "返回文章列表",
        takeawaysTitle: "核心结论",
        comparisonTitle: "对比矩阵",
        dimensionLabel: "维度",
        sourcesTitle: "来源",
      },
      login: {
        metaTitle: "Reasonix Clerk 登录",
        metaDescription:
          "使用 Clerk 登录 Reasonix Watch，同时将 DeepSeek API Key 保留在本机 Reasonix CLI 配置中。",
        eyebrow: "Clerk 登录",
        title: "使用 Clerk 登录 Reasonix Watch",
        description:
          "站内账号会话由 Clerk 处理。DeepSeek API Key 仍然在本机 Reasonix CLI 中单独配置，本站不会收集这些模型服务商密钥。",
        safetyTitle: "安全默认值",
        safetyBodyBeforeLink:
          "不要把 DeepSeek API Key 写进公开仓库、截图或报错贴。需要创建 Key 时直接打开 DeepSeek Platform：",
        safetyBodyAfterLink: "。",
        safetyLinkLabel: "API Keys",
      },
      community: {
        metaTitle: "Reasonix 社区讨论",
        metaDescription:
          "Reasonix Watch 社区说明：通过 GitHub/giscus 参与文章评论，评论数据由独立 GitHub Discussions 仓库承载，站内账号会话由 Clerk 处理。",
        eyebrow: "GitHub Discussions 社区",
        title: "用 GitHub 身份讨论 Reasonix 安装、报错和文章补充",
        description:
          "v1 社区功能不做站内账号、不建论坛数据库。文章页通过 giscus 加载 GitHub Discussions 评论，审核和数据留存在公开 GitHub 仓库。",
        discussionsCta: "打开 Discussions",
        commentsCta: "查看文章评论",
        rulesTitle: "社区规则",
        configTitle: "giscus 配置状态",
        configBodyBeforeRepo: "推荐使用独立公开仓库",
        configBodyAfterRepo:
          "承载评论，启用 Discussions、安装 giscus app，并创建 Comments 或 General category。",
        statusLabel: "当前状态",
        configuredLabel: "已配置",
        pendingLabel: "待配置",
        configuratorLabel: "打开 giscus 配置器",
      },
      faq: {
        metaTitle: "Reasonix 解疑 FAQ",
        metaDescription:
          "Reasonix 常见问题：DeepSeek-native、npx 与源码构建、API Key 安全、0.53.x 与 1.0 Go 重写关系。",
        eyebrow: "解疑",
        title: "Reasonix 常见问题",
        description:
          "这里把容易混淆的下载方式、版本状态、账号登录和中文用户问题集中说明。",
      },
      github: {
        metaTitle: "Reasonix GitHub 下载地址",
        metaDescription:
          "Reasonix GitHub 仓库、npx 启动、main-v2 源码构建和 desktop-v0.53.0 多平台安装包入口。",
        eyebrow: "GitHub 下载地址",
        title: "Reasonix 下载路径：npx、main-v2 源码和桌面 release",
        descriptionBeforeLink: "官方仓库地址为",
        descriptionAfterLink: "。当前公开状态是 npm 0.53.x 与 main-v2 Go 重写并行。",
        note:
          "如果你的目标是“能马上跑起来”，优先用 npx reasonix code；如果目标是“跟进最热的 1.0 Go 重写”，优先 clone main-v2。",
      },
      errors: {
        metaTitle: "Reasonix 相关报错命令行",
        metaDescription:
          "Reasonix 常见命令行报错排查：npx、DeepSeek API Key、源码构建、Windows Terminal、GitHub issue 追踪。",
        eyebrow: "相关报错命令行",
        title: "Reasonix 命令行报错排查清单",
        description:
          "这些命令不替用户保存密钥，只帮助确认 Node/npm、DeepSeek API Key、Go 构建链和终端交互问题。",
        issueWatchTitle: "GitHub issue watch",
      },
      deepseek: {
        metaTitle: "DeepSeek 官方推荐 Reasonix",
        metaDescription:
          "DeepSeek awesome-deepseek-agent 推荐 Reasonix 的安装和启动方式：Node.js 20.10+、API Key、npx reasonix code、/pro。",
        eyebrow: "DeepSeek 官方推荐",
        title: "DeepSeek agent 集合页里的 Reasonix 快速启动路线",
        description:
          "DeepSeek awesome-deepseek-agent 文档将 Reasonix 描述为运行在终端里的 DeepSeek-native coding agent，并给出直接启动方式。",
        stepsTitle: "官方步骤摘要",
        guideTitle: "打开 DeepSeek 官方文档",
        guideBody: "查看 awesome-deepseek-agent 中 Reasonix 的原始说明和启动命令。",
        apiKeysTitle: "打开 DeepSeek API Keys",
        apiKeysBody: "登录 DeepSeek Platform 后创建 API Key，再回到 Reasonix TUI 完成配置。",
      },
      news: {
        metaTitle: "Reasonix 新闻",
        metaDescription:
          "Reasonix 最新新闻：main-v2 提交、GitHub 热度、npm latest、desktop-v0.53.0 release 和 DeepSeek 官方收录。",
        eyebrow: "新闻",
        title: "Reasonix 新闻速览",
        description:
          "新闻条目优先来自 GitHub API、npm registry 和 DeepSeek 官方 agent 文档。",
      },
      privacy: {
        metaTitle: "隐私协议",
        metaDescription:
          "Reasonix Watch 隐私协议：Clerk 处理站内登录，API Key 保留在本机，官方入口仍跳转到原始来源。",
        eyebrow: "隐私协议",
        title: "Clerk 处理站内登录，模型服务商密钥仍然留在本机",
        description:
          "Reasonix Watch 面向中文开发者整理 Reasonix 下载、账号登录、API Key 配置说明、报错命令、DeepSeek 官方推荐和相关文章。本站不是 Reasonix、DeepSeek、OpenAI、Anthropic、Redux 或 OpenCode 官方服务。",
        commitmentsTitle: "我们不收集什么",
        cards: [
          {
            title: "账号登录",
            body: "站内登录由 Clerk 处理。不要把 DeepSeek、OpenAI、Anthropic 或其他模型服务商凭证输入到评论区或公开表单。",
          },
          {
            title: "外部链接",
            body: "点击 GitHub、X、DeepSeek Platform、npm、OpenAI、Anthropic 等外链后，对方站点可能使用自己的隐私政策和 Cookie 设置。",
          },
          {
            title: "后续变更",
            body: "如果未来扩展统计、订阅或账号相关功能，应先更新本页，明确数据类型、用途、保存周期和退出方式。",
          },
        ],
        protectionTitle: "隐私保护入口",
        protectionBody:
          "想按工具下载、官方账号、命令执行和 API Key 管理逐项检查，可以查看“保护隐私”页面。",
      },
      privacyProtection: {
        metaTitle: "保护隐私",
        metaDescription:
          "Reasonix Watch 保护隐私指南：核验官方 GitHub 与 X 账号，避免提交 API Key，下载前确认仓库来源和命令权限。",
        eyebrow: "保护隐私",
        title: "下载和使用 AI coding agent 前，先把账号、密钥和来源核验清楚",
        description:
          "Reasonix Watch 的站内登录由 Clerk 处理，模型服务商 API Key 不进入本站。下面的清单用于帮助你在 Reasonix、DeepSeek、Claude Code、Codex、OpenCode 等工具之间跳转时，降低误点仿冒账号和泄露密钥的风险。",
        checklistTitle: "保护隐私清单",
        accountsTitle: "官方账号核验",
        checkedLabel: "checked",
        commitmentTitle: "本站承诺",
        checklist: [
          "下载 Reasonix、Codex、OpenCode 等 CLI 前，先核验 GitHub 组织名、仓库名和 release 来源。",
          "不要把 DeepSeek、OpenAI、Anthropic 或其他 provider 的 API Key 粘贴到公开 issue、文章评论、截图或提交记录里。",
          "在本地使用环境变量、密钥管理器或工具自己的配置文件；提交代码前检查 .env、日志和 shell history。",
          "执行 curl | bash、npx、brew、npm i -g 等安装命令前，先确认命令来自官方文档或官方仓库 README。",
          "给 AI coding agent 授权前，先看清工作目录、文件写入权限、网络权限、命令审批模式和可回滚策略。",
          "遇到 X/Twitter、GitHub、下载镜像或桌面安装包时，以官方站点和官方仓库互相交叉验证。",
        ],
      },
      footer: {
        privacyTitle: "隐私与来源边界",
        privacyBody:
          "Reasonix Watch 是中文资讯聚合站，不代表 Reasonix、DeepSeek 或相关厂商官方。",
        legalTitle: "法律与保护",
        accountsTitle: "官方账号",
      },
      notFound: {
        title: "页面不存在",
        description:
          "这个 Reasonix 资讯站目前只开放首页、文章、登录、解疑、下载、报错、官方推荐、新闻和隐私几个板块。",
        homeLabel: "回到首页",
      },
    },
  },
  "zh-tw": {
    site: {
      title: "Reasonix Watch | DeepSeek Reasonix 資訊站",
      slogan: "把 Reasonix 的下載、Clerk 登入、報錯和官方訊號放在同一處。",
      description:
        "面向繁體中文讀者的 Reasonix 資訊站，整理 DeepSeek 官方推薦、GitHub 下載、常見命令列報錯、FAQ、隱私說明和近期專案新聞。",
      shellSubtitle: "DeepSeek Reasonix 繁體中文資訊",
      contentPrinciplesTitle: "內容原則",
      contentPrinciplesBody:
        "Clerk 承載站內登入；模型服務商 API Key 不進本站，仍保存在本機 Reasonix 設定中。",
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
    legalLinks: [
      { href: "/privacy", label: "隱私協議" },
      { href: "/privacy-protection", label: "保護隱私" },
    ],
    privacyCommitments: [
      "站內帳號會話由 Clerk 承載；本站不收集、保存或中轉 DeepSeek/OpenAI/Anthropic 等服務的 API Key。",
      "下載、DeepSeek API Key 設定和官方推薦入口仍跳轉到專案 GitHub、npm 或廠商官方平台。",
      "本站不預設寫入追蹤 Cookie，不接入廣告重定向，也不把訪客輸入傳送給第三方模型。",
      "命令列內容只作資訊展示；使用者應在自己的終端機和專案目錄內審查後執行。",
    ],
    officialAccounts: [
      {
        name: "Reasonix",
        context: "DeepSeek-native coding agent",
        githubLabel: "esengine/DeepSeek-Reasonix",
        github: SITE.github,
        xLabel: "X 未確認",
        x: null,
        note: "目前可確認的官方入口是 GitHub 倉庫與 DeepSeek agent 推薦頁。",
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
      {
        name: "Redux",
        context: "狀態管理文章線",
        githubLabel: "reduxjs",
        github: "https://github.com/reduxjs",
        xLabel: "X 未確認",
        x: null,
        note: "Redux 官方倉庫組織可確認；官方文件未確認單一 X 帳號。",
      },
      {
        name: "Claude / Anthropic",
        context: "Claude Code 文章線",
        githubLabel: "anthropics",
        github: "https://github.com/anthropics",
        xLabel: "@AnthropicAI",
        x: "https://x.com/AnthropicAI",
        note: "Claude Code 內容使用 Anthropic 官方產品與文件口徑。",
      },
      {
        name: "Codex / OpenAI",
        context: "Codex 文章線",
        githubLabel: "openai/codex",
        github: "https://github.com/openai/codex",
        xLabel: "@OpenAI",
        x: "https://x.com/OpenAI",
        note: "OpenAI 官方 Codex 頁面與 openai/codex 倉庫可互相對應。",
      },
      {
        name: "OpenCode",
        context: "開源 agent 文章線",
        githubLabel: "anomalyco/opencode",
        github: "https://github.com/anomalyco/opencode",
        xLabel: "@opencode",
        x: "https://x.com/opencode",
        note: "OpenCode 倉庫 README 連結 opencode.ai 與 X 社群入口。",
      },
    ],
    projectStats: sharedProjectStats,
    quickFacts: [
      {
        label: "目前 npm latest",
        value: "reasonix@0.53.2",
        detail:
          "npm 套件目前仍是 0.x；README 同時提示 1.0 Go binary 尚未發布到 npm，追新需要從 main-v2 建置。",
      },
      {
        label: "官方倉庫",
        value: "esengine/DeepSeek-Reasonix",
        detail:
          "GitHub 預設分支為 main-v2，專案描述為 DeepSeek-native AI coding agent for your terminal。",
      },
      {
        label: "DeepSeek 推薦入口",
        value: "npx reasonix code",
        detail:
          "DeepSeek awesome agent 文件推薦 Node.js 20.10+、DeepSeek API Key，並在專案目錄內執行 npx。",
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
        tag: "追新/Go 重寫",
        command:
          "git clone https://github.com/esengine/DeepSeek-Reasonix.git\ncd DeepSeek-Reasonix\ngit switch main-v2\nmake build",
        description:
          "README 標註 main-v2 是 1.0 Go 重寫的預設開發分支；要驗證最新提交時，優先走原始碼建置。",
        href: SITE.github,
      },
      {
        title: "桌面版 release 資產",
        tag: "桌面安裝包",
        command:
          "open https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v0.53.0",
        description:
          "GitHub 最新公開桌面 release 為 desktop-v0.53.0，包含 macOS DMG、Windows、Linux deb/rpm/AppImage 等資產。",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v0.53.0",
      },
    ],
    loginSteps: [
      {
        title: "登入 DeepSeek Platform",
        body: "進入 DeepSeek API Keys 頁面建立或複製 API Key。Clerk 只處理本站帳號會話；Reasonix CLI 的模型憑證來自 DeepSeek Platform。",
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
        title: "使用 GitHub 身分",
        body: "文章評論透過 giscus 調起 GitHub OAuth。你授權的是 GitHub/giscus，不需要替本站建立密碼。",
      },
      {
        title: "評論落在 Discussions",
        body: `預設建議用獨立公開倉庫 ${GISCUS.recommendedRepo} 承載評論，後續審核、置頂和歸檔都在 GitHub Discussions 內完成。`,
      },
      {
        title: "不要貼上密鑰",
        body: "問題描述可以包含命令、版本和報錯摘要，但不要發布 DeepSeek、OpenAI、Anthropic 等 provider 的 API Key。",
      },
    ],
    communityRules: [
      "優先討論 Reasonix 安裝、版本、DeepSeek API Key 設定、命令列報錯和文章內容補充。",
      "可以貼最小重現命令、Node/npm/go 版本和公開 issue 連結，但不要貼密鑰、token、私有倉庫地址或完整環境變數。",
      "評論審核、刪除、鎖定和使用者封禁以 GitHub Discussions 的公開記錄為準。",
      "v1 不提供站內收藏、私訊、通知、個人主頁或自建論壇資料庫；站內帳號會話由 Clerk 承載。",
    ],
    faqs: [
      {
        question: "Reasonix 和一般 OpenAI-compatible CLI 有何不同？",
        answer:
          "Reasonix 官方介紹強調 DeepSeek-native、prefix-cache stability、flash-first 成本控制和自動 tool-call repair；它不是單純換模型名稱的 CLI。",
      },
      {
        question: "現在應該用 npm 還是原始碼建置？",
        answer:
          "入門體驗用 DeepSeek 推薦的 npx reasonix code；追 main-v2/Go 重寫用 GitHub 原始碼 make build。README 明確提示 1.0.0 尚未發布到 npm。",
      },
      {
        question: "本站的登入頁會保存 API Key 嗎？",
        answer:
          "不會。登入頁使用 Clerk 處理站內帳號會話。DeepSeek API Key 應保存在你自己的環境變數或 Reasonix 本機設定中。",
      },
      {
        question: "為什麼新聞同時出現 0.53.x 和 1.0 Go 重寫？",
        answer:
          "公開狀態確實並行：GitHub main-v2 README 宣告 1.0 Go 重寫，npm latest 仍是 0.53.2，桌面 release 也是 0.53.0 系列。",
      },
      {
        question: "Reasonix 適合繁體中文使用者嗎？",
        answer:
          "適合關注 DeepSeek API 的中文開發者。GitHub issues 中也有中文問題回報，例如 # 開頭訊息、Windows Terminal 捲動和終端按鈕樣式問題。",
      },
    ],
    errorCommands: [
      {
        problem: "npx reasonix code 無法啟動或版本不對",
        command: "node -v\nnpm view reasonix version\nnpm cache verify\nnpx reasonix@latest code",
        hint: "DeepSeek 推薦 Node.js 20.10+。若你要的是 main-v2 Go 重寫，npm latest 可能仍不是 1.0。",
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
      "安裝 Node.js 20.10+；Windows 使用者還需要 Git for Windows。",
      "從 DeepSeek Platform 取得 API Key。",
      "進入專案目錄執行 npx reasonix code。",
      "預設使用 DeepSeek-V4-Flash；在 TUI 內輸入 /pro 或 /preset max 切到 Pro。",
      "需要完整命令說明時，在 Reasonix TUI 中執行 /help。",
    ],
    featureBlocks: [
      {
        title: "DeepSeek-native",
        body: "直接面向 DeepSeek API 和 DeepSeek-V4-Flash/Pro 工作流，而不是透過翻譯層接入。",
      },
      {
        title: "Cache-first loop",
        body: "README 強調圍繞 prefix cache 穩定性設計，適合長會話和低成本迭代。",
      },
      {
        title: "CLI + 桌面雙線",
        body: "倉庫有 terminal coding agent，也有 desktop-v0.53.0 release 資產，適合不同使用者路徑。",
      },
      {
        title: "MCP / plugins",
        body: "main-v2 README 說明 Reasonix 可作為 MCP client，支援 stdio 和 Streamable HTTP 外掛。",
      },
      {
        title: "Plan gate",
        body: "在高風險寫入前先審查計畫，讓檔案改動、命令執行和回滾邊界更清楚。",
      },
      {
        title: "可回放長會話",
        body: "事件、統計、replay、history 和 checkpoint 讓長時間 agent 工作更容易審計、排錯和恢復。",
      },
    ],
    newsItems: [
      {
        date: "2026-06-02",
        title: "main-v2 持續高頻提交，新增 grep 尊重 .gitignore 與 bash 串流中斷能力",
        body: "GitHub commits 顯示 6 月 2 日連續合入原生 grep、GBK/GB18030 編碼支援、interruptible bash live streamed output 等改動。",
        href: "https://github.com/esengine/DeepSeek-Reasonix/commits/main-v2",
      },
      {
        date: "2026-06-02",
        title: "Reasonix GitHub 熱度突破 16k stars",
        body: "GitHub API 顯示 esengine/DeepSeek-Reasonix 有 16,099 stars、954 forks、469 open issues，預設分支為 main-v2。",
        href: SITE.github,
      },
      {
        date: "2026-06-02",
        title: "npm latest 仍為 0.53.2，1.0 Go binary 尚未上 npm",
        body: "npm view reasonix 顯示 latest 為 0.53.2；main-v2 README 同時說明 1.0.0+ 將交付 Go binary，但 1.0.0 還未發布到 npm。",
        href: "https://www.npmjs.com/package/reasonix",
      },
      {
        date: "2026-05-27",
        title: "desktop-v0.53.0 release 發布多平台桌面資產",
        body: "GitHub release desktop-v0.53.0 提供 macOS universal DMG、Windows installer、Linux deb/rpm/AppImage 和 latest.json。",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v0.53.0",
      },
      {
        date: "2026-06-02",
        title: "DeepSeek 官方 agent 集合頁繼續收錄 Reasonix",
        body: "DeepSeek awesome-deepseek-agent 的 Reasonix 頁面給出 Node.js 20.10+、DeepSeek API Key、npx reasonix code 的快速啟動方式。",
        href: SITE.deepseekGuide,
      },
    ],
    issueWatch: [
      { ...sharedIssueWatch[0], title: "以 # 開頭的訊息 agent 收不到" },
      { ...sharedIssueWatch[1], title: "終端按鈕樣式有問題" },
      {
        ...sharedIssueWatch[2],
        title: "Windows Terminal 捲輪/PageUpDown 與複製貼上問題",
      },
    ],
    sourceLinks: sharedSources,
    pages: {
      home: {
        eyebrow: "DeepSeek-native coding agent watch",
        title: "面向 DeepSeek 的終端機編碼代理",
        primaryCta: "查看 GitHub 下載",
        secondaryCta: "排查命令列報錯",
        terminalNote:
          "DeepSeek 官方推薦的快速啟動方式；追 Go 重寫則從 GitHub main-v2 建置。",
        articlesTitle: "深度文章",
        articleReadLabel: "閱讀",
        sectionsTitle: "為什麼是 Reasonix",
        latestNewsTitle: "最新新聞",
      },
      articles: {
        metaTitle: "高品質文章：Redux、Claude Code、Codex、OpenCode 對比",
        metaDescription:
          "Reasonix Watch 的深度文章庫，聚焦 Redux、Claude Code、OpenAI Codex、OpenCode 的定位、差異和工程選型。",
        eyebrow: "高品質文章",
        title: "Redux、Claude Code、Codex、OpenCode 深度對比",
        description:
          "這些文章把前端狀態管理和 AI 編碼代理分層講清楚，適合做長期可索引內容，也方便後續持續更新最新版本訊號。",
        readLabel: "閱讀文章",
      },
      articleDetail: {
        backLabel: "返回文章列表",
        takeawaysTitle: "核心結論",
        comparisonTitle: "對比矩陣",
        dimensionLabel: "維度",
        sourcesTitle: "來源",
      },
      login: {
        metaTitle: "Reasonix Clerk 登入",
        metaDescription:
          "使用 Clerk 登入 Reasonix Watch，同時將 DeepSeek API Key 保留在本機 Reasonix CLI 設定中。",
        eyebrow: "Clerk 登入",
        title: "使用 Clerk 登入 Reasonix Watch",
        description:
          "站內帳號會話由 Clerk 處理。DeepSeek API Key 仍然在本機 Reasonix CLI 中單獨設定，本站不會收集這些模型服務商密鑰。",
        safetyTitle: "安全預設值",
        safetyBodyBeforeLink:
          "不要把 DeepSeek API Key 寫進公開倉庫、截圖或報錯貼。需要建立 Key 時直接開啟 DeepSeek Platform：",
        safetyBodyAfterLink: "。",
        safetyLinkLabel: "API Keys",
      },
      community: {
        metaTitle: "Reasonix 社群討論",
        metaDescription:
          "Reasonix Watch 社群說明：透過 GitHub/giscus 參與文章評論，評論資料由獨立 GitHub Discussions 倉庫承載，站內帳號會話由 Clerk 處理。",
        eyebrow: "GitHub Discussions 社群",
        title: "用 GitHub 身分討論 Reasonix 安裝、報錯和文章補充",
        description:
          "v1 社群功能不做站內帳號、不建論壇資料庫。文章頁透過 giscus 載入 GitHub Discussions 評論，審核和資料留存在公開 GitHub 倉庫。",
        discussionsCta: "開啟 Discussions",
        commentsCta: "查看文章評論",
        rulesTitle: "社群規則",
        configTitle: "giscus 配置狀態",
        configBodyBeforeRepo: "推薦使用獨立公開倉庫",
        configBodyAfterRepo:
          "承載評論，啟用 Discussions、安裝 giscus app，並建立 Comments 或 General category。",
        statusLabel: "目前狀態",
        configuredLabel: "已配置",
        pendingLabel: "待配置",
        configuratorLabel: "開啟 giscus 配置器",
      },
      faq: {
        metaTitle: "Reasonix 解疑 FAQ",
        metaDescription:
          "Reasonix 常見問題：DeepSeek-native、npx 與原始碼建置、API Key 安全、0.53.x 與 1.0 Go 重寫關係。",
        eyebrow: "解疑",
        title: "Reasonix 常見問題",
        description:
          "這裡集中說明容易混淆的下載方式、版本狀態、帳號登入和中文使用者問題。",
      },
      github: {
        metaTitle: "Reasonix GitHub 下載地址",
        metaDescription:
          "Reasonix GitHub 倉庫、npx 啟動、main-v2 原始碼建置和 desktop-v0.53.0 多平台安裝包入口。",
        eyebrow: "GitHub 下載地址",
        title: "Reasonix 下載路徑：npx、main-v2 原始碼和桌面 release",
        descriptionBeforeLink: "官方倉庫地址為",
        descriptionAfterLink: "。目前公開狀態是 npm 0.53.x 與 main-v2 Go 重寫並行。",
        note:
          "如果你的目標是「能馬上跑起來」，優先用 npx reasonix code；如果目標是「跟進最熱的 1.0 Go 重寫」，優先 clone main-v2。",
      },
      errors: {
        metaTitle: "Reasonix 相關報錯命令列",
        metaDescription:
          "Reasonix 常見命令列報錯排查：npx、DeepSeek API Key、原始碼建置、Windows Terminal、GitHub issue 追蹤。",
        eyebrow: "相關報錯命令列",
        title: "Reasonix 命令列報錯排查清單",
        description:
          "這些命令不替使用者保存密鑰，只協助確認 Node/npm、DeepSeek API Key、Go 建置鏈和終端互動問題。",
        issueWatchTitle: "GitHub issue watch",
      },
      deepseek: {
        metaTitle: "DeepSeek 官方推薦 Reasonix",
        metaDescription:
          "DeepSeek awesome-deepseek-agent 推薦 Reasonix 的安裝和啟動方式：Node.js 20.10+、API Key、npx reasonix code、/pro。",
        eyebrow: "DeepSeek 官方推薦",
        title: "DeepSeek agent 集合頁裡的 Reasonix 快速啟動路線",
        description:
          "DeepSeek awesome-deepseek-agent 文件將 Reasonix 描述為運行在終端機裡的 DeepSeek-native coding agent，並給出直接啟動方式。",
        stepsTitle: "官方步驟摘要",
        guideTitle: "開啟 DeepSeek 官方文件",
        guideBody: "查看 awesome-deepseek-agent 中 Reasonix 的原始說明和啟動命令。",
        apiKeysTitle: "開啟 DeepSeek API Keys",
        apiKeysBody: "登入 DeepSeek Platform 後建立 API Key，再回到 Reasonix TUI 完成設定。",
      },
      news: {
        metaTitle: "Reasonix 新聞",
        metaDescription:
          "Reasonix 最新新聞：main-v2 提交、GitHub 熱度、npm latest、desktop-v0.53.0 release 和 DeepSeek 官方收錄。",
        eyebrow: "新聞",
        title: "Reasonix 新聞速覽",
        description:
          "新聞條目優先來自 GitHub API、npm registry 和 DeepSeek 官方 agent 文件。",
      },
      privacy: {
        metaTitle: "隱私協議",
        metaDescription:
          "Reasonix Watch 隱私協議：Clerk 處理站內登入，API Key 保留在本機，官方入口仍跳轉到原始來源。",
        eyebrow: "隱私協議",
        title: "Clerk 處理站內登入，模型服務商密鑰仍然留在本機",
        description:
          "Reasonix Watch 面向繁體中文開發者整理 Reasonix 下載、帳號登入、API Key 設定說明、報錯命令、DeepSeek 官方推薦和相關文章。本站不是 Reasonix、DeepSeek、OpenAI、Anthropic、Redux 或 OpenCode 官方服務。",
        commitmentsTitle: "我們不收集什麼",
        cards: [
          {
            title: "帳號登入",
            body: "站內登入由 Clerk 處理。不要把 DeepSeek、OpenAI、Anthropic 或其他模型服務商憑證輸入到留言區或公開表單。",
          },
          {
            title: "外部連結",
            body: "點擊 GitHub、X、DeepSeek Platform、npm、OpenAI、Anthropic 等外鏈後，對方站點可能使用自己的隱私政策和 Cookie 設定。",
          },
          {
            title: "後續變更",
            body: "如果未來擴展統計、訂閱或帳號相關功能，應先更新本頁，明確資料類型、用途、保存週期和退出方式。",
          },
        ],
        protectionTitle: "隱私保護入口",
        protectionBody:
          "想按工具下載、官方帳號、命令執行和 API Key 管理逐項檢查，可以查看「保護隱私」頁面。",
      },
      privacyProtection: {
        metaTitle: "保護隱私",
        metaDescription:
          "Reasonix Watch 保護隱私指南：核驗官方 GitHub 與 X 帳號，避免提交 API Key，下載前確認倉庫來源和命令權限。",
        eyebrow: "保護隱私",
        title: "下載和使用 AI coding agent 前，先把帳號、密鑰和來源核驗清楚",
        description:
          "Reasonix Watch 的站內登入由 Clerk 處理，模型服務商 API Key 不進入本站。下面的清單用於協助你在 Reasonix、DeepSeek、Claude Code、Codex、OpenCode 等工具之間跳轉時，降低誤點仿冒帳號和洩露密鑰的風險。",
        checklistTitle: "保護隱私清單",
        accountsTitle: "官方帳號核驗",
        checkedLabel: "checked",
        commitmentTitle: "本站承諾",
        checklist: [
          "下載 Reasonix、Codex、OpenCode 等 CLI 前，先核驗 GitHub 組織名、倉庫名和 release 來源。",
          "不要把 DeepSeek、OpenAI、Anthropic 或其他 provider 的 API Key 貼到公開 issue、文章評論、截圖或提交記錄裡。",
          "在本機使用環境變數、密鑰管理器或工具自己的設定檔；提交程式碼前檢查 .env、日誌和 shell history。",
          "執行 curl | bash、npx、brew、npm i -g 等安裝命令前，先確認命令來自官方文件或官方倉庫 README。",
          "給 AI coding agent 授權前，先看清工作目錄、文件寫入權限、網路權限、命令審批模式和可回滾策略。",
          "遇到 X/Twitter、GitHub、下載鏡像或桌面安裝包時，以官方站點和官方倉庫互相交叉驗證。",
        ],
      },
      footer: {
        privacyTitle: "隱私與來源邊界",
        privacyBody:
          "Reasonix Watch 是繁體中文資訊聚合站，不代表 Reasonix、DeepSeek 或相關廠商官方。",
        legalTitle: "法律與保護",
        accountsTitle: "官方帳號",
      },
      notFound: {
        title: "頁面不存在",
        description:
          "這個 Reasonix 資訊站目前只開放首頁、文章、登入、解疑、下載、報錯、官方推薦、新聞和隱私幾個板塊。",
        homeLabel: "回到首頁",
      },
    },
  },
  ru: {
    site: {
      title: "Reasonix Watch | Информационный сайт Reasonix",
      slogan:
        "Новости Reasonix, загрузки, Clerk login, ошибки CLI и официальные сигналы в одном месте.",
      description:
        "Русскоязычный информационный сайт о Reasonix: рекомендации DeepSeek, загрузки GitHub, типовые ошибки CLI, FAQ, приватность и новости проекта.",
      shellSubtitle: "Информационный сайт Reasonix",
      contentPrinciplesTitle: "Границы контента",
      contentPrinciplesBody:
        "Clerk обрабатывает вход на сайт. Provider API keys остаются вне сайта и хранятся в локальной настройке Reasonix.",
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
    legalLinks: [
      { href: "/privacy", label: "Политика приватности" },
      { href: "/privacy-protection", label: "Защита приватности" },
    ],
    privacyCommitments: [
      "Clerk обрабатывает сессию аккаунта сайта; этот сайт не собирает, не хранит и не проксирует API-ключи DeepSeek, OpenAI, Anthropic или других провайдеров.",
      "Ссылки на загрузку, настройку DeepSeek API key и официальные рекомендации ведут к GitHub проекта, npm или платформам поставщиков.",
      "Сайт по умолчанию не записывает tracking cookies, не использует рекламные редиректы и не отправляет пользовательский ввод сторонним моделям.",
      "Фрагменты командной строки даны только как справка. Проверяйте их в своем терминале и каталоге проекта перед запуском.",
    ],
    officialAccounts: [
      {
        name: "Reasonix",
        context: "DeepSeek-native coding agent",
        githubLabel: "esengine/DeepSeek-Reasonix",
        github: SITE.github,
        xLabel: "X не подтвержден",
        x: null,
        note: "Подтвержденные точки входа: репозиторий GitHub и страница рекомендации DeepSeek agent.",
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
      {
        name: "Redux",
        context: "Линия статей о state management",
        githubLabel: "reduxjs",
        github: "https://github.com/reduxjs",
        xLabel: "X не подтвержден",
        x: null,
        note: "Официальная GitHub-организация подтверждается; единый X-аккаунт в документации не подтвержден.",
      },
      {
        name: "Claude / Anthropic",
        context: "Линия статей о Claude Code",
        githubLabel: "anthropics",
        github: "https://github.com/anthropics",
        xLabel: "@AnthropicAI",
        x: "https://x.com/AnthropicAI",
        note: "Материалы о Claude Code следуют формулировкам продуктов и документации Anthropic.",
      },
      {
        name: "Codex / OpenAI",
        context: "Линия статей о Codex",
        githubLabel: "openai/codex",
        github: "https://github.com/openai/codex",
        xLabel: "@OpenAI",
        x: "https://x.com/OpenAI",
        note: "Страница Codex от OpenAI и репозиторий openai/codex позволяют сверять источники.",
      },
      {
        name: "OpenCode",
        context: "Линия статей об open-source agent",
        githubLabel: "anomalyco/opencode",
        github: "https://github.com/anomalyco/opencode",
        xLabel: "@opencode",
        x: "https://x.com/opencode",
        note: "README OpenCode ссылается на opencode.ai и вход в X-сообщество.",
      },
    ],
    projectStats: sharedProjectStats,
    quickFacts: [
      {
        label: "Текущий npm latest",
        value: "reasonix@0.53.2",
        detail:
          "Пакет npm все еще находится в ветке 0.x. README также говорит, что Go binary 1.0 пока не опубликован в npm, поэтому для свежего main-v2 нужен source build.",
      },
      {
        label: "Официальный репозиторий",
        value: "esengine/DeepSeek-Reasonix",
        detail:
          "В GitHub ветка по умолчанию - main-v2, а проект описан как DeepSeek-native AI coding agent for your terminal.",
      },
      {
        label: "Вход от DeepSeek",
        value: "npx reasonix code",
        detail:
          "Документ DeepSeek agent рекомендует Node.js 20.10+, API-ключ DeepSeek и запуск npx внутри каталога проекта.",
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
        tag: "Свежая Go-ветка",
        command:
          "git clone https://github.com/esengine/DeepSeek-Reasonix.git\ncd DeepSeek-Reasonix\ngit switch main-v2\nmake build",
        description:
          "README помечает main-v2 как активную ветку Go rewrite 1.0. Используйте сборку из исходников, если нужно проверить последние коммиты.",
        href: SITE.github,
      },
      {
        title: "Desktop release assets",
        tag: "Desktop пакет",
        command:
          "open https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v0.53.0",
        description:
          "Последний публичный desktop release - desktop-v0.53.0 с macOS DMG, Windows, Linux deb/rpm/AppImage и latest.json.",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v0.53.0",
      },
    ],
    loginSteps: [
      {
        title: "Войдите в DeepSeek Platform",
        body: "Откройте страницу DeepSeek API Keys, чтобы создать или скопировать ключ. Clerk обрабатывает только сессию сайта; модельные credentials для Reasonix CLI приходят из DeepSeek Platform.",
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
        title: "Используйте GitHub identity",
        body: "Комментарии к статьям загружаются через giscus и GitHub OAuth. Вы авторизуете GitHub/giscus; этот сайт не создает для вас пароль.",
      },
      {
        title: "Комментарии хранятся в Discussions",
        body: `Рекомендуемый вариант - отдельный публичный репозиторий ${GISCUS.recommendedRepo}. Moderation, pinning и archiving остаются внутри GitHub Discussions.`,
      },
      {
        title: "Не публикуйте секреты",
        body: "В описании проблемы можно указывать commands, versions и error summaries, но нельзя публиковать API keys DeepSeek, OpenAI, Anthropic или других providers.",
      },
    ],
    communityRules: [
      "В первую очередь обсуждайте установку Reasonix, версии, настройку DeepSeek API key, ошибки CLI и дополнения к статьям.",
      "Можно делиться minimal reproduction commands, версиями Node/npm/go и public issue links, но нельзя публиковать secrets, tokens, private repositories или полные environment variables.",
      "Moderation, deletion, locking и user bans следуют публичным записям GitHub Discussions.",
      "Версия 1 не предоставляет in-site favorites, private messages, notifications, profiles или self-hosted forum database; сессия сайта обрабатывается Clerk.",
    ],
    faqs: [
      {
        question: "Чем Reasonix отличается от обычного OpenAI-compatible CLI?",
        answer:
          "Reasonix делает акцент на DeepSeek-native поведении, стабильности prefix cache, flash-first контроле стоимости и automatic tool-call repair. Это не просто CLI с замененным именем модели.",
      },
      {
        question: "Сейчас лучше использовать npm или сборку из исходников?",
        answer:
          "Для первого теста используйте npx reasonix code. Для main-v2 и Go rewrite используйте исходники GitHub и make build. README говорит, что 1.0.0 еще не опубликован в npm.",
      },
      {
        question: "Страница входа сохраняет мой API-ключ?",
        answer:
          "Нет. Страница входа использует Clerk для сессии аккаунта сайта. DeepSeek API key должен оставаться в ваших переменных окружения или локальном конфиге Reasonix.",
      },
      {
        question: "Почему в новостях есть и 0.53.x, и Go rewrite 1.0?",
        answer:
          "Публичное состояние разделено: GitHub main-v2 описывает Go rewrite 1.0, npm latest все еще 0.53.2, а desktop release остается в линии 0.53.0.",
      },
      {
        question: "Полезен ли Reasonix русскоязычным пользователям?",
        answer:
          "Да, если вы уже используете DeepSeek API. Этот раздел дает русские пояснения к установке, ключам, ошибкам CLI и официальным источникам.",
      },
    ],
    errorCommands: [
      {
        problem: "npx reasonix code не стартует или берет не ту версию",
        command: "node -v\nnpm view reasonix version\nnpm cache verify\nnpx reasonix@latest code",
        hint: "DeepSeek рекомендует Node.js 20.10+. Если вам нужен main-v2 Go rewrite, npm latest может все еще не быть веткой 1.0.",
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
        command: "npx reasonix@latest code\n# Workaround: add a leading space or newline, then watch issue #2658",
        hint: "Этот GitHub bug report оставался открытым 2026-06-02, поэтому он вынесен в error watch.",
      },
      {
        problem: "Нужно проверить доступность DeepSeek API",
        command:
          "curl -s https://api.deepseek.com | head\n# Then return to Reasonix and run /help or /pro to verify model switching",
        hint: "Сетевая доступность не равна успешной авторизации. Ключ и конфиг Reasonix нужно проверять отдельно.",
      },
    ],
    deepseekOfficialSteps: [
      "Установите Node.js 20.10+. Пользователям Windows также нужен Git for Windows.",
      "Создайте или скопируйте API-ключ в DeepSeek Platform.",
      "Запустите npx reasonix code внутри каталога целевого проекта.",
      "По умолчанию используется DeepSeek-V4-Flash; введите /pro или /preset max в TUI для Pro.",
      "Для полного списка команд выполните /help внутри Reasonix TUI.",
    ],
    featureBlocks: [
      {
        title: "DeepSeek-native",
        body: "Построен вокруг DeepSeek API и workflow DeepSeek-V4-Flash/Pro, а не вокруг тонкого слоя перевода.",
      },
      {
        title: "Cache-first loop",
        body: "README подчеркивает prefix-cache stability для длинных сессий и более дешевой итерации.",
      },
      {
        title: "CLI и desktop",
        body: "В репозитории есть terminal coding agent и desktop-v0.53.0 release assets для разных пользовательских сценариев.",
      },
      {
        title: "MCP / plugins",
        body: "README main-v2 описывает Reasonix как MCP client с поддержкой stdio и Streamable HTTP plugins.",
      },
      {
        title: "Plan gate",
        body: "Проверка плана перед рискованными изменениями делает file edits, commands и rollback boundaries явными.",
      },
      {
        title: "Replayable sessions",
        body: "Events, stats, replay, history и checkpoints упрощают аудит, диагностику и восстановление длинных agent runs.",
      },
    ],
    newsItems: [
      {
        date: "2026-06-02",
        title: "main-v2 активно развивается: grep, .gitignore и прерываемый bash stream",
        body: "Коммиты GitHub от 2 июня показывают native grep, поддержку GBK/GB18030 и interruptible bash live streamed output.",
        href: "https://github.com/esengine/DeepSeek-Reasonix/commits/main-v2",
      },
      {
        date: "2026-06-02",
        title: "Reasonix прошел 16k stars на GitHub",
        body: "GitHub API показал 16,099 stars, 954 forks, 469 open issues и main-v2 как default branch для esengine/DeepSeek-Reasonix.",
        href: SITE.github,
      },
      {
        date: "2026-06-02",
        title: "npm latest остается 0.53.2, а Go binary 1.0 еще не опубликован в npm",
        body: "npm view reasonix вернул latest 0.53.2. README main-v2 говорит, что линейка 1.0.0+ будет поставлять Go binary, но 1.0.0 еще не опубликован.",
        href: "https://www.npmjs.com/package/reasonix",
      },
      {
        date: "2026-05-27",
        title: "desktop-v0.53.0 выпустил desktop assets для нескольких платформ",
        body: "GitHub release desktop-v0.53.0 содержит macOS universal DMG, Windows installer, Linux deb/rpm/AppImage и latest.json.",
        href: "https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v0.53.0",
      },
      {
        date: "2026-06-02",
        title: "Коллекция DeepSeek agent продолжает включать Reasonix",
        body: "Страница Reasonix в awesome-deepseek-agent перечисляет Node.js 20.10+, DeepSeek API key и npx reasonix code как быстрый старт.",
        href: SITE.deepseekGuide,
      },
    ],
    issueWatch: sharedIssueWatch,
    sourceLinks: sharedSources,
    pages: {
      home: {
        eyebrow: "DeepSeek-native coding agent watch",
        title: "Терминальный coding agent для DeepSeek",
        primaryCta: "Открыть GitHub загрузки",
        secondaryCta: "Разобрать ошибки CLI",
        terminalNote:
          "Рекомендованный DeepSeek быстрый старт. Для Go rewrite следите за веткой GitHub main-v2.",
        articlesTitle: "Глубокие статьи",
        articleReadLabel: "Читать",
        sectionsTitle: "Почему Reasonix",
        latestNewsTitle: "Последние новости",
      },
      articles: {
        metaTitle: "Статьи о Redux, Claude Code, Codex и OpenCode",
        metaDescription:
          "Библиотека статей Reasonix Watch о позиционировании Redux, Claude Code, OpenAI Codex и OpenCode, их различиях и инженерном выборе.",
        eyebrow: "Качественные статьи",
        title: "Глубокие сравнения Redux, Claude Code, Codex и OpenCode",
        description:
          "Статьи отделяют state management внутри фронтенда от AI coding agents, чтобы контент оставался полезным для поиска и обновлений.",
        readLabel: "Читать статью",
      },
      articleDetail: {
        backLabel: "Назад к статьям",
        takeawaysTitle: "Ключевые выводы",
        comparisonTitle: "Матрица сравнения",
        dimensionLabel: "Критерий",
        sourcesTitle: "Источники",
      },
      login: {
        metaTitle: "Reasonix login with Clerk",
        metaDescription:
          "Войдите в Reasonix Watch через Clerk, сохраняя DeepSeek API key в локальной настройке Reasonix CLI.",
        eyebrow: "Clerk authentication",
        title: "Вход в Reasonix Watch через Clerk",
        description:
          "Используйте Clerk для сессии аккаунта сайта. DeepSeek API keys по-прежнему настраиваются отдельно в локальном Reasonix CLI и не собираются этим сайтом.",
        safetyTitle: "Безопасный режим по умолчанию",
        safetyBodyBeforeLink:
          "Не помещайте DeepSeek API key в публичный репозиторий, скриншот или bug report. Чтобы создать ключ, откройте DeepSeek Platform напрямую:",
        safetyBodyAfterLink: ".",
        safetyLinkLabel: "API Keys",
      },
      community: {
        metaTitle: "Reasonix community discussion",
        metaDescription:
          "Сообщество Reasonix Watch: комментарии через GitHub/giscus, данные комментариев в отдельном GitHub Discussions repository, а сессия сайта обрабатывается Clerk.",
        eyebrow: "GitHub Discussions community",
        title:
          "Обсуждайте установку Reasonix, ошибки и дополнения к статьям через GitHub identity",
        description:
          "Версия 1 не создает аккаунты внутри сайта и не строит forum database. Article pages загружают GitHub Discussions comments через giscus, а moderation и data остаются в публичном GitHub repository.",
        discussionsCta: "Открыть Discussions",
        commentsCta: "Смотреть комментарии к статьям",
        rulesTitle: "Правила сообщества",
        configTitle: "Статус настройки giscus",
        configBodyBeforeRepo:
          "Рекомендуется отдельный public repository с именем",
        configBodyAfterRepo:
          "с включенными Discussions, установленным giscus app и созданной category Comments или General.",
        statusLabel: "Текущий статус",
        configuredLabel: "Настроено",
        pendingLabel: "Ожидает настройки",
        configuratorLabel: "Открыть giscus configurator",
      },
      faq: {
        metaTitle: "Reasonix FAQ",
        metaDescription:
          "FAQ Reasonix о DeepSeek-native подходе, npx и source build, безопасности API key, 0.53.x и Go rewrite 1.0.",
        eyebrow: "FAQ",
        title: "Частые вопросы о Reasonix",
        description:
          "Здесь собраны вопросы о способах загрузки, версиях, входе, ключах и путях использования для русскоязычных читателей.",
      },
      github: {
        metaTitle: "Reasonix GitHub загрузки",
        metaDescription:
          "GitHub репозиторий Reasonix, запуск через npx, source build main-v2 и multi-platform desktop-v0.53.0 release.",
        eyebrow: "GitHub загрузки",
        title: "Как получить Reasonix: npx, main-v2 source и desktop release",
        descriptionBeforeLink: "Официальный репозиторий:",
        descriptionAfterLink:
          ". Публичное состояние сейчас разделено между npm 0.53.x и Go rewrite в main-v2.",
        note:
          "Если нужно быстро запустить Reasonix, начните с npx reasonix code. Если нужно следить за Go rewrite 1.0, клонируйте main-v2.",
      },
      errors: {
        metaTitle: "Reasonix: команды для ошибок CLI",
        metaDescription:
          "Troubleshooting Reasonix CLI для npx, DeepSeek API keys, source build, Windows Terminal и GitHub issues.",
        eyebrow: "Ошибки CLI",
        title: "Checklist для диагностики командной строки Reasonix",
        description:
          "Эти команды не сохраняют секреты. Они помогают проверить Node/npm, DeepSeek API key, Go toolchain и проблемы терминального взаимодействия.",
        issueWatchTitle: "GitHub issue watch",
      },
      deepseek: {
        metaTitle: "DeepSeek официально рекомендует Reasonix",
        metaDescription:
          "DeepSeek awesome-deepseek-agent рекомендует Reasonix: Node.js 20.10+, API key, npx reasonix code и /pro.",
        eyebrow: "Официальный сигнал DeepSeek",
        title: "Быстрый старт Reasonix в коллекции DeepSeek agent",
        description:
          "Документ DeepSeek awesome-deepseek-agent описывает Reasonix как DeepSeek-native coding agent в терминале и дает прямую команду запуска.",
        stepsTitle: "Краткое резюме официальных шагов",
        guideTitle: "Открыть гайд DeepSeek",
        guideBody:
          "Посмотреть оригинальное описание Reasonix и команду запуска в awesome-deepseek-agent.",
        apiKeysTitle: "Открыть DeepSeek API Keys",
        apiKeysBody:
          "Создайте API key после входа в DeepSeek Platform, затем вернитесь в Reasonix TUI для завершения настройки.",
      },
      news: {
        metaTitle: "Новости Reasonix",
        metaDescription:
          "Новости Reasonix: commits main-v2, GitHub popularity, npm latest, desktop-v0.53.0 release и официальный листинг DeepSeek.",
        eyebrow: "Новости",
        title: "Краткие новости Reasonix",
        description:
          "Новости опираются на GitHub API, npm registry и официальную документацию DeepSeek agent.",
      },
      privacy: {
        metaTitle: "Политика приватности",
        metaDescription:
          "Политика приватности Reasonix Watch: Clerk обрабатывает вход на сайт, API keys остаются локально, а официальные ссылки ведут к первоисточникам.",
        eyebrow: "Политика приватности",
        title: "Clerk обрабатывает вход на сайт; provider keys остаются локально",
        description:
          "Reasonix Watch собирает сведения о загрузке Reasonix, аккаунтном входе, настройке API key, командах для ошибок, официальных рекомендациях DeepSeek и связанных статьях. Это не официальный сервис Reasonix, DeepSeek, OpenAI, Anthropic, Redux или OpenCode.",
        commitmentsTitle: "Что мы не собираем",
        cards: [
          {
            title: "Вход в аккаунт",
            body: "Вход на сайт обрабатывается Clerk. Не вводите credentials DeepSeek, OpenAI, Anthropic или других providers в комментарии или публичные формы.",
          },
          {
            title: "Внешние ссылки",
            body: "После перехода на GitHub, X, DeepSeek Platform, npm, OpenAI, Anthropic и другие внешние сайты там могут действовать собственные политики приватности и cookies.",
          },
          {
            title: "Будущие изменения",
            body: "Если позже расширятся analytics, subscriptions или account-backed features, эту страницу нужно обновить с типами данных, целями, сроками хранения и opt-out.",
          },
        ],
        protectionTitle: "Раздел защиты приватности",
        protectionBody:
          "Для checklist по загрузкам, официальным аккаунтам, выполнению команд и API keys откройте страницу Privacy Protection.",
      },
      privacyProtection: {
        metaTitle: "Защита приватности",
        metaDescription:
          "Гайд Reasonix Watch по защите приватности: проверяйте GitHub и X accounts, не коммитьте API keys и проверяйте источники репозиториев и permissions перед загрузкой.",
        eyebrow: "Защита приватности",
        title: "Перед использованием AI coding agent проверьте аккаунты, ключи и источники",
        description:
          "Reasonix Watch login обрабатывается Clerk, а provider API keys остаются вне сайта. Этот checklist помогает снизить риск фальшивых аккаунтов и утечки ключей при переходах между Reasonix, DeepSeek, Claude Code, Codex, OpenCode и связанными инструментами.",
        checklistTitle: "Checklist защиты приватности",
        accountsTitle: "Проверка официальных аккаунтов",
        checkedLabel: "checked",
        commitmentTitle: "Обязательства сайта",
        checklist: [
          "Перед загрузкой Reasonix, Codex, OpenCode или другого CLI проверьте GitHub organization, repository name и release source.",
          "Не вставляйте DeepSeek, OpenAI, Anthropic или другие provider API keys в публичные issues, comments, screenshots или commits.",
          "Используйте локальные environment variables, key manager или конфиг самого инструмента. Проверяйте .env, logs и shell history перед commit.",
          "Перед запуском curl | bash, npx, brew или npm i -g убедитесь, что команда пришла из official docs или README официального репозитория.",
          "Перед выдачей AI coding agent permissions проверьте working directory, write access, network access, command approval mode и rollback strategy.",
          "Для X/Twitter, GitHub, mirrors и desktop installers сверяйте официальный сайт и официальный репозиторий.",
        ],
      },
      footer: {
        privacyTitle: "Приватность и границы источников",
        privacyBody:
          "Reasonix Watch - информационный агрегатор. Он не представляет Reasonix, DeepSeek или связанных поставщиков.",
        legalTitle: "Право и защита",
        accountsTitle: "Официальные аккаунты",
      },
      notFound: {
        title: "Страница не найдена",
        description:
          "На этом сайте Reasonix сейчас доступны обзор, статьи, вход, FAQ, загрузки, ошибки, официальные рекомендации, новости и страницы приватности.",
        homeLabel: "На главную",
      },
    },
  },
} satisfies Record<Locale, LocalizedContent>;

export function getContent(locale: Locale = DEFAULT_LOCALE): LocalizedContent {
  return contentByLocale[locale];
}

export const navItems = contentByLocale[DEFAULT_LOCALE].navItems;
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
export const newsItems = contentByLocale[DEFAULT_LOCALE].newsItems;
export const issueWatch = contentByLocale[DEFAULT_LOCALE].issueWatch;
export const sourceLinks = contentByLocale[DEFAULT_LOCALE].sourceLinks;
