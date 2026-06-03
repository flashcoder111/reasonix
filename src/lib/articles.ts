import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export type ArticleSource = {
  label: string;
  href: string;
};

export type ArticleSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type ArticleComparisonRow = {
  dimension: string;
  redux: string;
  claude: string;
  codex: string;
  opencode: string;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  date: string;
  readTime: string;
  tags: string[];
  summary: string;
  takeaways: string[];
  comparison?: ArticleComparisonRow[];
  sections: ArticleSection[];
  sources: ArticleSource[];
};

export const articleSources = {
  reduxGettingStarted: {
    label: "Redux: Getting Started",
    href: "https://redux.js.org/introduction/getting-started",
  },
  reduxToolkit: {
    label: "Redux Toolkit overview",
    href: "https://redux.js.org/redux-toolkit/overview/",
  },
  claudeCodeOverview: {
    label: "Claude Code overview",
    href: "https://docs.anthropic.com/en/docs/claude-code/overview",
  },
  claudeCodeProduct: {
    label: "Claude Code product page",
    href: "https://www.anthropic.com/product/claude-code",
  },
  codexProduct: {
    label: "OpenAI Codex",
    href: "https://openai.com/codex/",
  },
  codexCliHelp: {
    label: "OpenAI Codex CLI getting started",
    href: "https://help.openai.com/en/articles/11096431",
  },
  codexGa: {
    label: "Codex generally available",
    href: "https://openai.com/index/codex-now-generally-available/",
  },
  opencodeDocs: {
    label: "OpenCode docs",
    href: "https://opencode.ai/docs",
  },
  opencodeGithub: {
    label: "OpenCode GitHub",
    href: "https://github.com/anomalyco/opencode",
  },
} satisfies Record<string, ArticleSource>;

const baseTags = {
  comparison: ["Redux", "Claude Code", "Codex", "OpenCode"],
  agents: ["Claude Code", "Codex", "OpenCode", "AI Agent"],
  redux: ["Redux Toolkit", "React", "State Management", "AI Agent"],
  teams: ["Codex", "Claude Code", "Team Workflow"],
  opencode: ["OpenCode", "Claude Code", "Codex", "Open Source"],
} as const;

const enComparisonRows: ArticleComparisonRow[] = [
  {
    dimension: "Core role",
    redux:
      "A predictable state management library inside frontend applications.",
    claude:
      "Anthropic's coding agent for terminal, IDE, cloud, and automation workflows.",
    codex:
      "OpenAI's coding agent system across CLI, IDE, app, cloud tasks, and sandboxed execution.",
    opencode:
      "An open-source terminal coding agent with configurable providers, rules, and local workflow control.",
  },
  {
    dimension: "Entry point",
    redux:
      "Installed as an npm library and integrated into React or another view layer, usually through Redux Toolkit.",
    claude:
      "Claude Code CLI, IDE integrations, cloud tasks, and automation contexts.",
    codex:
      "Codex CLI, app, IDE, cloud tasks, SDK, and multi-agent coordination surfaces.",
    opencode:
      "Install script, npm, Homebrew, Windows/WSL, Docker, and binary releases.",
  },
  {
    dimension: "Security boundary",
    redux:
      "Runs inside your application process; security depends on the app architecture.",
    claude:
      "Requires account, project permission, tool-call, MCP, and team policy review.",
    codex:
      "Uses approval modes, sandboxing, worktrees, and configurable command permissions.",
    opencode:
      "Users bring provider keys and configure permissions, tools, MCP, and project rules.",
  },
  {
    dimension: "Best content angle",
    redux:
      "Tutorials, migrations, frontend architecture, React state layers, and RTK Query.",
    claude:
      "Claude Code usage, MCP, long-running tasks, prompts, and review workflows.",
    codex:
      "Codex CLI/app, approval modes, parallel agents, account access, and team governance.",
    opencode:
      "Open-source agent workflows, provider choice, AGENTS.md, TUI, and permissions.",
  },
];

const zhCnComparisonRows: ArticleComparisonRow[] = [
  {
    dimension: "核心定位",
    redux:
      "前端应用的可预测状态管理库，解决全局状态、变更追踪和测试一致性。",
    claude:
      "Anthropic 的终端/IDE/云端编码代理，适合委派实现、重构、解释和多步工程任务。",
    codex:
      "OpenAI 的编码代理体系，覆盖 CLI、IDE、云端和桌面 app，强调多代理与安全沙箱。",
    opencode:
      "开源终端编码代理，可连接多家模型供应商，强调可配置、AGENTS.md 和本地工作流。",
  },
  {
    dimension: "使用入口",
    redux: "npm 包与 React/任意视图库集成，推荐从 Redux Toolkit 开始。",
    claude: "Claude Code CLI、IDE、网页/云端和自动化场景。",
    codex: "Codex CLI、Codex app、IDE、云端任务和 SDK。",
    opencode: "安装脚本、npm、Homebrew、Windows/WSL、Docker、二进制 release。",
  },
  {
    dimension: "数据与权限",
    redux: "只在你的应用进程中管理状态；安全边界由应用架构决定。",
    claude: "需要关注 Anthropic 账户、项目权限、工具调用和团队安全策略。",
    codex: "有审批模式、沙箱、工作树和可配置的命令权限，适合多人并行工程。",
    opencode: "用户自配 provider key，支持权限、工具、MCP、规则和项目初始化。",
  },
  {
    dimension: "适合写什么内容",
    redux: "教程、迁移、架构边界、React 状态层设计、RTK Query。",
    claude: "Claude Code 使用、团队协作、MCP、长任务、提示与代码审查流程。",
    codex: "Codex CLI/app、并行代理、审批模式、ChatGPT 账号接入和工程团队场景。",
    opencode: "开源替代、模型供应商选择、AGENTS.md、CLI/TUI、权限与本地工作流。",
  },
];

const zhTwComparisonRows: ArticleComparisonRow[] = [
  {
    dimension: "核心定位",
    redux:
      "前端應用的可預測狀態管理庫，解決全域狀態、變更追蹤和測試一致性。",
    claude:
      "Anthropic 的終端機/IDE/雲端編碼代理，適合委派實作、重構、解釋和多步工程任務。",
    codex:
      "OpenAI 的編碼代理體系，覆蓋 CLI、IDE、雲端和桌面 app，強調多代理與安全沙箱。",
    opencode:
      "開源終端機編碼代理，可連接多家模型供應商，強調可配置、AGENTS.md 和本機工作流。",
  },
  {
    dimension: "使用入口",
    redux: "npm 套件與 React/任意視圖庫整合，推薦從 Redux Toolkit 開始。",
    claude: "Claude Code CLI、IDE、網頁/雲端和自動化場景。",
    codex: "Codex CLI、Codex app、IDE、雲端任務和 SDK。",
    opencode: "安裝腳本、npm、Homebrew、Windows/WSL、Docker、二進位 release。",
  },
  {
    dimension: "資料與權限",
    redux: "只在你的應用程式程序中管理狀態；安全邊界由應用架構決定。",
    claude: "需要關注 Anthropic 帳戶、專案權限、工具呼叫和團隊安全策略。",
    codex: "有審批模式、沙箱、工作樹和可配置的命令權限，適合多人並行工程。",
    opencode: "使用者自配 provider key，支援權限、工具、MCP、規則和專案初始化。",
  },
  {
    dimension: "適合寫什麼內容",
    redux: "教學、遷移、架構邊界、React 狀態層設計、RTK Query。",
    claude: "Claude Code 使用、團隊協作、MCP、長任務、提示與程式碼審查流程。",
    codex: "Codex CLI/app、並行代理、審批模式、ChatGPT 帳號接入和工程團隊場景。",
    opencode: "開源替代、模型供應商選擇、AGENTS.md、CLI/TUI、權限與本機工作流。",
  },
];

const ruComparisonRows: ArticleComparisonRow[] = [
  {
    dimension: "Роль",
    redux:
      "Библиотека предсказуемого управления состоянием внутри frontend-приложения.",
    claude:
      "Coding agent Anthropic для терминала, IDE, облака и автоматизации.",
    codex:
      "Система coding agents OpenAI для CLI, IDE, app, cloud tasks и sandboxed выполнения.",
    opencode:
      "Open-source terminal coding agent с настраиваемыми провайдерами, правилами и локальным workflow.",
  },
  {
    dimension: "Точка входа",
    redux:
      "npm-библиотека, обычно через Redux Toolkit, интегрируемая с React или другим UI layer.",
    claude: "Claude Code CLI, IDE, cloud tasks и automation contexts.",
    codex: "Codex CLI, app, IDE, cloud tasks, SDK и multi-agent coordination.",
    opencode:
      "Install script, npm, Homebrew, Windows/WSL, Docker и binary releases.",
  },
  {
    dimension: "Граница безопасности",
    redux:
      "Работает внутри процесса приложения; граница безопасности зависит от архитектуры приложения.",
    claude:
      "Нужны проверки account, project permissions, tool calls, MCP и team policy.",
    codex:
      "Использует approval modes, sandboxing, worktrees и configurable command permissions.",
    opencode:
      "Пользователь приносит provider keys и настраивает permissions, tools, MCP и project rules.",
  },
  {
    dimension: "Лучший угол статьи",
    redux:
      "Tutorials, migrations, frontend architecture, React state layer и RTK Query.",
    claude:
      "Claude Code usage, MCP, long-running tasks, prompts и review workflow.",
    codex:
      "Codex CLI/app, approval modes, parallel agents, account access и team governance.",
    opencode:
      "Open-source workflow, provider choice, AGENTS.md, TUI и permissions.",
  },
];

const enArticles: Article[] = [
  {
    slug: "redux-claude-codex-opencode-comparison",
    title:
      "Redux, Claude Code, Codex, and OpenCode solve different classes of problems",
    description:
      "A layered comparison of Redux, Claude Code, Codex, and OpenCode across engineering role, workflow, permissions, and content strategy.",
    eyebrow: "Core comparison",
    date: "2026-06-02",
    readTime: "9 min",
    tags: [...baseTags.comparison],
    summary:
      "The easiest mistake is to put Redux and AI coding agents into the same category. Redux is an application state layer. Claude Code, Codex, and OpenCode are engineering execution layers. The useful comparison starts by separating those layers.",
    takeaways: [
      "Redux is an application architecture component; Claude Code, Codex, and OpenCode are engineering execution tools.",
      "Redux content should focus on stable tutorials and migration guides; agent content should track versions, permissions, security, and workflows.",
      "Codex and Claude Code are closer to platform-backed agents, while OpenCode is more open, configurable, and provider-neutral.",
      "A Reasonix information site should make the state-management versus coding-agent boundary explicit instead of writing clickbait comparisons.",
    ],
    comparison: enComparisonRows,
    sections: [
      {
        heading: "Separate the layers first",
        body: [
          "Redux manages predictable and maintainable global state inside a JavaScript application. It makes state transitions explicit and testable, but it does not read your repository or execute development tasks.",
          "Claude Code, Codex, and OpenCode do the opposite kind of work. They read code, plan changes, edit files, run commands, and help developers delegate engineering tasks to models.",
        ],
        bullets: [
          "Asking whether Redux is better than Codex is a category error.",
          "Asking whether Codex can help migrate legacy Redux code to Redux Toolkit is a useful question.",
          "Asking whether OpenCode or Claude Code better matches a local multi-provider workflow is also comparable.",
        ],
      },
      {
        heading: "How an information site should cover these keywords",
        body: [
          "For SEO and readability, split the content into two tracks: Redux as frontend architecture, and Claude Code, Codex, and OpenCode as AI coding agents. The comparison article should set the boundary, while later articles go deeper into each tool.",
          "This keeps search intent clean. Redux searchers usually want state management, RTK, React integration, and migration help. Codex or Claude Code searchers usually want installation, permissions, pricing, CLI, IDE, and team workflow details.",
        ],
      },
      {
        heading: "Practical conclusion",
        body: [
          "The strongest combination is not a four-way choice. Keep Redux in the application architecture layer and use Codex, Claude Code, or OpenCode as execution helpers for migration, review, testing, and maintenance.",
          "For developers, the article should explain when a platform agent is useful, when an open-source agent is a better fit, and when the task only needs a clean Redux Toolkit guide.",
        ],
      },
    ],
    sources: [
      articleSources.reduxGettingStarted,
      articleSources.reduxToolkit,
      articleSources.claudeCodeOverview,
      articleSources.codexProduct,
      articleSources.opencodeDocs,
    ],
  },
  {
    slug: "claude-code-vs-codex-vs-opencode",
    title: "Claude Code vs Codex vs OpenCode: choosing among AI coding agents",
    description:
      "A practical comparison of Claude Code, OpenAI Codex, and OpenCode for entry points, permissions, security, model choice, and team fit.",
    eyebrow: "AI coding agents",
    date: "2026-06-02",
    readTime: "10 min",
    tags: [...baseTags.agents],
    summary:
      "All three tools can enter a repository and perform engineering work, but their product philosophy differs. Claude Code is tied to the Anthropic ecosystem, Codex to OpenAI's multi-surface agent workflow, and OpenCode to open, configurable, provider-neutral terminal work.",
    takeaways: [
      "Choose Claude Code naturally when the team already works in the Claude ecosystem.",
      "Choose Codex when OpenAI account access, parallel agents, worktrees, and team governance matter.",
      "Choose OpenCode when open source, provider choice, AGENTS.md, and local workflow control are central.",
      "For teams, governance usually matters as much as single-task model quality.",
    ],
    sections: [
      {
        heading: "Claude Code: Anthropic ecosystem and mature coding UX",
        body: [
          "Claude Code is Anthropic's agentic coding tool. It works through terminal, IDE, cloud, and automation surfaces, making it a natural entry point for teams already using Claude.",
          "Strong use cases include reading large codebases, explaining complex modules, performing focused refactors, writing migration plans, and connecting MCP tools.",
        ],
      },
      {
        heading: "Codex: OpenAI account system and multi-agent workflow",
        body: [
          "Codex is more than a CLI. OpenAI positions it across editor, terminal, cloud, app, and SDK surfaces, with sandboxing and approval modes that matter for real teams.",
          "When writing about Codex, split the topics into CLI onboarding, approval modes, Codex app, team parallelization, and workflow governance instead of treating it as one command.",
        ],
      },
      {
        heading: "OpenCode: open source, providers, and configuration",
        body: [
          "OpenCode is an open-source AI coding agent usable from a terminal interface, desktop app, or IDE extension. It expects users to configure their own provider keys.",
          "That makes it attractive for teams that care about model choice, local control, inspectable code, AGENTS.md rules, MCP, and permission design.",
        ],
      },
    ],
    sources: [
      articleSources.claudeCodeOverview,
      articleSources.claudeCodeProduct,
      articleSources.codexProduct,
      articleSources.codexCliHelp,
      articleSources.opencodeDocs,
    ],
  },
  {
    slug: "redux-toolkit-in-ai-agent-era",
    title: "Do we still need Redux in the AI coding agent era?",
    description:
      "Why Redux Toolkit still matters for complex frontend state even when Claude Code, Codex, and OpenCode can generate and migrate code.",
    eyebrow: "Redux focus",
    date: "2026-06-02",
    readTime: "8 min",
    tags: [...baseTags.redux],
    summary:
      "AI coding agents can write reducers, migrate slices, and generate tests, but they do not replace the application state model. Redux Toolkit still helps make complex state explicit, testable, and reviewable.",
    takeaways: [
      "Redux Toolkit is the recommended modern Redux path for new projects and legacy migration.",
      "AI agents reduce migration cost, but they do not replace architecture judgment.",
      "Shared state, auditability, replayable debugging, and cross-page consistency remain Redux strengths.",
      "Better content asks when Redux is unnecessary, not whether Redux is dead.",
    ],
    sections: [
      {
        heading: "Redux solves state consistency, not code generation",
        body: [
          "Redux is about predictable and maintainable global state. That value does not disappear because agents can generate code.",
          "Agents can help migrate reducers, write selectors, and add tests. They still need the developer to define state boundaries, ownership, and failure modes.",
        ],
      },
      {
        heading: "Why Redux Toolkit is the modern default",
        body: [
          "Redux Toolkit reduces action-type boilerplate, immutable update complexity, and store setup work. Modern Redux content should start there rather than recreating old switch-reducer tutorials.",
          "Useful topics include configureStore, createSlice, RTK Query, middleware, selectors, and migration plans.",
        ],
      },
      {
        heading: "How agents help migration",
        body: [
          "A practical flow is read-only analysis first, then slice-by-slice migration, selector tests, UI regression checks, and a final review that downgrades unnecessary global state to local state.",
          "Codex, Claude Code, and OpenCode can all help, but the approval and review loop should stay explicit.",
        ],
      },
    ],
    sources: [
      articleSources.reduxGettingStarted,
      articleSources.reduxToolkit,
      articleSources.claudeCodeOverview,
      articleSources.codexCliHelp,
      articleSources.opencodeDocs,
    ],
  },
  {
    slug: "codex-vs-claude-code-for-engineering-teams",
    title: "Codex vs Claude Code: what engineering teams should compare",
    description:
      "A team-oriented comparison of OpenAI Codex and Anthropic Claude Code across entry points, approvals, safety, parallel agents, and maintenance.",
    eyebrow: "Team selection",
    date: "2026-06-02",
    readTime: "9 min",
    tags: [...baseTags.teams],
    summary:
      "Teams should not decide based on one impressive task. The real comparison is about permissions, reviewability, accounts, parallel work, repository isolation, rollback, and internal standardization.",
    takeaways: [
      "Codex spans app, CLI, IDE, cloud, SDK, and multi-agent coordination.",
      "Claude Code is strong when a team already standardizes on Anthropic and Claude workflows.",
      "Security baselines should come before model benchmarks.",
      "Compare tools on real work: bugfixes, refactors, migrations, tests, and documentation.",
    ],
    sections: [
      {
        heading: "Compare the entry points, not just the CLI",
        body: [
          "Codex and Claude Code both extend beyond a single terminal command. A team needs to know how diffs are reviewed, how PR flow is connected, how work is isolated, and how multiple tasks can run safely.",
          "The install command is the least interesting part of the decision once the tool can read and write a production repository.",
        ],
      },
      {
        heading: "Compare security before output quality",
        body: [
          "Coding agents can execute commands and edit files, so they enter a high-permission part of the engineering system. Approval modes, sandboxing, network access, secret handling, and rollback strategy must be explicit.",
          "A stronger model can create a larger risk surface if the permission model is unclear.",
        ],
      },
      {
        heading: "Use real engineering tasks",
        body: [
          "Prepare a test set with bugfixes, refactors, test coverage, documentation updates, dependency upgrades, and architecture analysis. Track elapsed time, human interventions, failure causes, test results, and review comments.",
          "The right answer may be specialization rather than a single winner.",
        ],
      },
    ],
    sources: [
      articleSources.codexProduct,
      articleSources.codexGa,
      articleSources.codexCliHelp,
      articleSources.claudeCodeOverview,
      articleSources.claudeCodeProduct,
    ],
  },
  {
    slug: "opencode-open-source-agent-vs-closed-agents",
    title: "OpenCode versus closed coding agents: what open source changes",
    description:
      "OpenCode compared with Claude Code and Codex across source openness, provider configuration, AGENTS.md, MCP, permissions, and team control.",
    eyebrow: "OpenCode focus",
    date: "2026-06-02",
    readTime: "8 min",
    tags: [...baseTags.opencode],
    summary:
      "OpenCode's value is not that it is always stronger than closed agents. Its value is that it gives teams more control over model providers, config, project rules, MCP, permissions, and local terminal workflow.",
    takeaways: [
      "OpenCode supports terminal, desktop app, and IDE extension paths.",
      "Users configure LLM provider keys, which fits multi-provider strategies.",
      "AGENTS.md, rules, tools, permissions, and MCP are the most important deep-content keywords.",
      "Closed agents fit platform integration; OpenCode fits openness and configurability.",
    ],
    sections: [
      {
        heading: "The core positioning",
        body: [
          "OpenCode is documented as an open-source AI coding agent usable from terminal, desktop, or IDE. It is not a single vendor's exclusive model client.",
          "That makes it useful when cost, privacy, context length, regional availability, and provider switching are part of the decision.",
        ],
      },
      {
        heading: "Why AGENTS.md matters",
        body: [
          "OpenCode encourages project rules through files such as AGENTS.md. That turns team conventions into instructions an agent can read every time.",
          "Strong articles should cover rules, MCP, dangerous command permissions, and plan-before-build workflows instead of only repeating install commands.",
        ],
      },
      {
        heading: "The real difference from Codex and Claude Code",
        body: [
          "Claude Code and Codex are stronger on vendor-backed platform integration. OpenCode is stronger on transparency, provider choice, and local configuration.",
          "The best fit depends on whether the team prioritizes central accounts and auditability or open tooling and model flexibility.",
        ],
      },
    ],
    sources: [
      articleSources.opencodeDocs,
      articleSources.opencodeGithub,
      articleSources.claudeCodeOverview,
      articleSources.codexProduct,
    ],
  },
];

const zhCnArticles: Article[] = [
  {
    ...enArticles[0],
    title: "Redux、Claude Code、Codex、OpenCode 对比：它们解决的不是同一类问题",
    description:
      "从工程层级、使用场景、权限边界和内容策略角度对比 Redux、Claude Code、Codex 与 OpenCode。",
    eyebrow: "核心对比",
    summary:
      "把 Redux 和 AI 编码代理放在一张表里时，最容易犯的错是把“应用内部状态层”和“帮助你改代码的代理层”混为一谈。正确的对比方式是先分层，再比较谁在什么边界内产生价值。",
    takeaways: [
      "Redux 是应用架构组件；Claude Code、Codex、OpenCode 是工程执行工具。",
      "Redux 适合写成稳定教程和迁移指南；三个代理适合写成版本敏感的使用、权限、安全和工作流内容。",
      "Codex 和 Claude Code 更像闭源平台级代理；OpenCode 更适合开源、多 provider、可配置路线。",
      "对 Reasonix Watch 这类资讯站来说，文章应明确“状态管理”和“编码代理”的边界，避免标题党式横评。",
    ],
    comparison: zhCnComparisonRows,
    sections: [
      {
        heading: "先分清层级：Redux 在应用里，代理在开发流程里",
        body: [
          "Redux 是 JavaScript 应用的状态管理工具。它强调 predictable、maintainable global state，也就是让状态变更可追踪、可测试、可复现。",
          "Claude Code、Codex 和 OpenCode 则是编码代理。它们读取仓库、理解任务、提出计划、修改文件、运行命令或测试，解决的是“人如何委派工程任务给模型”。",
        ],
        bullets: [
          "问“Redux 和 Codex 哪个更好”没有意义。",
          "问“Codex 能不能帮助我迁移 Redux legacy code 到 Redux Toolkit”才有意义。",
          "问“OpenCode 和 Claude Code 哪个更适合本地、多 provider、开源约束”才是可比较问题。",
        ],
      },
      {
        heading: "内容站应该如何写这组关键词",
        body: [
          "如果目标是 SEO 和可读性，建议把它们拆成两条内容线：Redux 作为前端架构线，Claude Code、Codex、OpenCode 作为 AI 编码代理线。",
          "这样做的好处是搜索意图更清楚。搜 Redux 的人通常在找状态管理、RTK、React 集成；搜 Codex 或 Claude Code 的人通常在找安装、权限、模型、定价、CLI、IDE 和团队工作流。",
        ],
      },
      {
        heading: "结论：把代理当成 Redux 迁移和维护的执行层",
        body: [
          "最实用的组合不是四选一，而是把 Redux 放在应用架构里，把 Claude Code、Codex 或 OpenCode 放在工程执行流程里。",
          "对中文开发者来说，文章应该把“怎么选工具”和“怎么落到命令行”写清楚：什么时候用官方闭源代理，什么时候用开源代理，什么时候根本不需要代理。",
        ],
      },
    ],
  },
  {
    ...enArticles[1],
    title: "Claude Code vs Codex vs OpenCode：三类 AI 编码代理怎么选",
    description:
      "面向中文开发者的 Claude Code、OpenAI Codex、OpenCode 对比：入口、权限、安全、模型选择和团队适配。",
    eyebrow: "AI 编码代理",
    summary:
      "Claude Code、Codex 和 OpenCode 都能进入仓库执行工程任务，但产品哲学不同：Claude Code 偏 Anthropic 生态，Codex 偏 OpenAI 多入口和多代理编排，OpenCode 偏开放、终端原生、多 provider。",
    takeaways: [
      "偏 Anthropic 模型与 Claude 工作区时，Claude Code 是自然入口。",
      "偏 OpenAI/ChatGPT 账号、并行代理、工作树和团队治理时，Codex 更贴近平台级工作流。",
      "偏开源、多模型供应商、AGENTS.md 和可自定义终端体验时，OpenCode 更灵活。",
      "企业落地不要只看模型效果，还要看权限、日志、沙箱、账号体系和能否审计。",
    ],
    sections: [
      {
        heading: "Claude Code：强在 Anthropic 生态和成熟编码体验",
        body: [
          "Claude Code 的官方定位是 Anthropic 的 agentic coding tool，主要生活在终端里，也延展到 IDE、云端和自动化场景。",
          "适合场景包括阅读大型代码库、解释复杂模块、局部重构、生成迁移计划、接入 MCP 工具，或建立团队内部工作流规范。",
        ],
      },
      {
        heading: "Codex：强在 OpenAI 账号体系和多代理工作流",
        body: [
          "Codex 现在不只是一个 CLI。OpenAI 官方口径里，Codex 覆盖终端、IDE、云端和桌面 app，并强调审批、安全沙箱和并行代理。",
          "如果内容站要写 Codex，建议拆成 CLI 入门、审批模式、Codex app、团队并行代理和工作流治理几个主题。",
        ],
      },
      {
        heading: "OpenCode：强在开源、多 provider 和可配置",
        body: [
          "OpenCode 官方文档把它描述为 open source AI coding agent，可用终端界面、桌面 app 或 IDE 扩展。",
          "如果读者关心本地化、开源可检查、供应商切换或不想被单一模型生态绑定，OpenCode 是值得单独写深度文章的工具。",
        ],
      },
    ],
  },
  {
    ...enArticles[2],
    title: "AI 编码代理时代还需要 Redux 吗？Redux Toolkit 的真实价值",
    description:
      "解释为什么 Claude Code、Codex、OpenCode 变强后，Redux Toolkit 仍然是复杂前端应用的重要状态管理选择。",
    eyebrow: "Redux 专题",
    summary:
      "AI 编码代理能帮你写 reducer、迁移 slice、生成测试，但它不会替代应用内部的状态模型。Redux Toolkit 的价值仍然在于把复杂状态变化变得显式、可测试、可审查。",
    takeaways: [
      "Redux Toolkit 是 Redux 官方推荐写法，适合新项目和 legacy Redux 迁移。",
      "AI 代理能降低 Redux 迁移成本，但不能替代架构判断。",
      "复杂协作、审计、跨页面共享状态和可回放调试仍然是 Redux 的强项。",
      "文章应避免“Redux 已死”这种泛化结论，改写成“什么时候不需要 Redux”。",
    ],
    sections: [
      {
        heading: "Redux 解决的是状态一致性，不是代码生成",
        body: [
          "Redux 官方介绍把它定义为 predictable and maintainable global state management。这个定位在 AI 代理时代没有过时。",
          "Claude Code、Codex、OpenCode 可以帮你生成样板、迁移旧 reducer、补测试、解释状态流，但不能替你定义状态边界。",
        ],
      },
      {
        heading: "Redux Toolkit 为什么是默认推荐",
        body: [
          "Redux Toolkit 是 Redux 官方推荐的 batteries-included 工具集，目标是减少手写 action type、immutable update 和 store setup 的复杂度。",
          "如果要写 Redux 高质量文章，建议围绕 configureStore、createSlice、RTK Query、middleware、selector、迁移策略展开。",
        ],
      },
      {
        heading: "AI 代理如何帮助 Redux 迁移",
        body: [
          "实用流程是：先让代理只读分析旧 Redux 代码，输出 slice 划分和风险清单；再逐个模块迁移到 Redux Toolkit；每个模块补 selector 测试和 UI 回归测试。",
          "这个流程适合 Codex 或 Claude Code 的审批模式，也适合 OpenCode 在 AGENTS.md 中固化规则。",
        ],
      },
    ],
  },
  {
    ...enArticles[3],
    title: "Codex vs Claude Code：工程团队应该比较哪些维度",
    description:
      "对比 OpenAI Codex 与 Anthropic Claude Code 在团队工程中的入口、审批、安全、并行代理和长期维护差异。",
    eyebrow: "团队选型",
    summary:
      "Codex 和 Claude Code 都是强编码代理，团队不应该只用一次任务完成度下结论。更关键的比较维度是权限、审计、账号、并行工作、仓库隔离、失败回滚和组织内标准化。",
    takeaways: [
      "Codex 的官方重点已经扩展到 app、CLI、IDE、云端、SDK 和多代理编排。",
      "Claude Code 的优势在 Anthropic 生态、终端体验和 Claude 模型工作流。",
      "团队选型要先定义不可接受风险，再比较输出质量。",
      "最好用同一批真实任务做 A/B：bugfix、重构、迁移、测试补齐、文档更新。",
    ],
    sections: [
      {
        heading: "比较入口：CLI 只是其中一个入口",
        body: [
          "Codex 和 Claude Code 都不再只是一个安装命令。团队更需要关心 diff 如何审查、能否接入 PR 流程、是否能隔离工作树和是否能并行跑多个任务。",
          "一旦代理能读写生产仓库，安装命令就是最不重要的部分。",
        ],
      },
      {
        heading: "比较安全：权限模式比模型名更重要",
        body: [
          "代理能读写仓库、执行命令，这意味着它进入工程系统的高权限区域。审批模式、沙箱、网络访问、密钥处理和回滚策略必须明确。",
          "如果权限模型不清楚，模型能力越强，风险越难控。",
        ],
      },
      {
        heading: "比较产出：用真实工程任务，而不是 demo",
        body: [
          "建议准备 bugfix、复杂重构、测试补齐、文档更新、依赖升级和架构分析任务，并记录耗时、人工介入次数、失败原因、测试结果和审查意见。",
          "最后的答案也可能不是二选一，而是让不同工具承担不同类型的工程任务。",
        ],
      },
    ],
  },
  {
    ...enArticles[4],
    title: "OpenCode 与闭源编码代理对比：开源、多模型和本地工作流的价值",
    description:
      "分析 OpenCode 相比 Claude Code、Codex 的差异：开源、provider 配置、AGENTS.md、MCP、权限和团队可控性。",
    eyebrow: "OpenCode 专题",
    summary:
      "OpenCode 的核心优势不是“比闭源代理一定更强”，而是它给了团队更多可控变量：模型供应商、安装方式、配置文件、MCP、AGENTS.md、权限和终端工作流。",
    takeaways: [
      "OpenCode 官方文档明确支持终端、桌面 app 和 IDE extension。",
      "它要求用户配置 LLM provider API key，天然适合多模型或自有供应商策略。",
      "AGENTS.md、规则、工具、权限和 MCP 是 OpenCode 深度内容的关键关键词。",
      "闭源代理更适合追求平台整合；OpenCode 更适合追求开放和可配置。",
    ],
    sections: [
      {
        heading: "OpenCode 的核心定位",
        body: [
          "OpenCode 官方文档把它定义为 open source AI coding agent，并说明它可以作为 terminal-based interface、desktop app 或 IDE extension 使用。",
          "这使它特别适合多模型策略：团队可以根据成本、上下文长度、隐私、代码能力和地区可用性选择不同 provider。",
        ],
      },
      {
        heading: "为什么 AGENTS.md 很重要",
        body: [
          "OpenCode 文档建议在项目初始化后生成并提交 AGENTS.md。这个文件让代理理解项目结构和编码模式。",
          "高质量文章不要只写安装命令，更应该写如何设计 AGENTS.md、如何配置 MCP、如何设置危险命令权限，以及如何先 Plan 再 Build。",
        ],
      },
      {
        heading: "和 Codex、Claude Code 的真实差异",
        body: [
          "Claude Code 和 Codex 的优势是平台集成和官方模型路径；OpenCode 的优势是透明、可配置、多 provider 和开源社区路线。",
          "如果团队需要统一企业账号和集中审计，可能更偏 Codex 或 Claude Code；如果需要自选模型和仓库内规则，OpenCode 更合适。",
        ],
      },
    ],
  },
];

const zhTwArticles: Article[] = [
  {
    ...zhCnArticles[0],
    title: "Redux、Claude Code、Codex、OpenCode 對比：它們解決的不是同一類問題",
    description:
      "從工程層級、使用場景、權限邊界和內容策略角度對比 Redux、Claude Code、Codex 與 OpenCode。",
    eyebrow: "核心對比",
    summary:
      "把 Redux 和 AI 編碼代理放在同一張表時，最容易犯的錯是把「應用內部狀態層」和「幫你改程式碼的代理層」混為一談。正確的對比方式是先分層，再比較誰在什麼邊界內產生價值。",
    takeaways: [
      "Redux 是應用架構元件；Claude Code、Codex、OpenCode 是工程執行工具。",
      "Redux 適合寫成穩定教學和遷移指南；三個代理適合寫成版本敏感的使用、權限、安全和工作流內容。",
      "Codex 和 Claude Code 更像閉源平台級代理；OpenCode 更適合開源、多 provider、可配置路線。",
      "對 Reasonix Watch 這類資訊站來說，文章應明確「狀態管理」和「編碼代理」的邊界，避免標題黨式橫評。",
    ],
    comparison: zhTwComparisonRows,
    sections: [
      {
        heading: "先分清層級：Redux 在應用裡，代理在開發流程裡",
        body: [
          "Redux 是 JavaScript 應用的狀態管理工具。它強調 predictable、maintainable global state，也就是讓狀態變更可追蹤、可測試、可重現。",
          "Claude Code、Codex 和 OpenCode 則是編碼代理。它們讀取倉庫、理解任務、提出計畫、修改檔案、執行命令或測試，解決的是「人如何把工程任務委派給模型」。",
        ],
        bullets: [
          "問「Redux 和 Codex 哪個更好」沒有意義。",
          "問「Codex 能不能幫我把 Redux legacy code 遷移到 Redux Toolkit」才有意義。",
          "問「OpenCode 和 Claude Code 哪個更適合本機、多 provider、開源約束」才是可比較問題。",
        ],
      },
      {
        heading: "資訊站應該如何寫這組關鍵詞",
        body: [
          "如果目標是 SEO 和可讀性，建議把它們拆成兩條內容線：Redux 作為前端架構線，Claude Code、Codex、OpenCode 作為 AI 編碼代理線。",
          "這樣做的好處是搜尋意圖更清楚。搜 Redux 的人通常在找狀態管理、RTK、React 整合；搜 Codex 或 Claude Code 的人通常在找安裝、權限、模型、定價、CLI、IDE 和團隊工作流。",
        ],
      },
      {
        heading: "結論：把代理當成 Redux 遷移和維護的執行層",
        body: [
          "最實用的組合不是四選一，而是把 Redux 放在應用架構裡，把 Claude Code、Codex 或 OpenCode 放在工程執行流程裡。",
          "對中文開發者來說，文章應該把「怎麼選工具」和「怎麼落到命令列」寫清楚。",
        ],
      },
    ],
  },
  {
    ...zhCnArticles[1],
    title: "Claude Code vs Codex vs OpenCode：三類 AI 編碼代理怎麼選",
    description:
      "面向繁體中文開發者的 Claude Code、OpenAI Codex、OpenCode 對比：入口、權限、安全、模型選擇和團隊適配。",
    eyebrow: "AI 編碼代理",
    summary:
      "Claude Code、Codex 和 OpenCode 都能進入倉庫執行工程任務，但產品哲學不同：Claude Code 偏 Anthropic 生態，Codex 偏 OpenAI 多入口和多代理編排，OpenCode 偏開放、終端機原生、多 provider。",
    takeaways: [
      "偏 Anthropic 模型與 Claude 工作區時，Claude Code 是自然入口。",
      "偏 OpenAI/ChatGPT 帳號、並行代理、工作樹和團隊治理時，Codex 更貼近平台級工作流。",
      "偏開源、多模型供應商、AGENTS.md 和可自定義終端機體驗時，OpenCode 更靈活。",
      "企業落地不要只看模型效果，還要看權限、日誌、沙箱、帳號體系和能否審計。",
    ],
    sections: [
      {
        heading: "Claude Code：強在 Anthropic 生態和成熟編碼體驗",
        body: [
          "Claude Code 的官方定位是 Anthropic 的 agentic coding tool，主要生活在終端機裡，也延展到 IDE、雲端和自動化場景。",
          "適合場景包括閱讀大型程式碼庫、解釋複雜模組、局部重構、生成遷移計畫、接入 MCP 工具，或建立團隊內部工作流規範。",
        ],
      },
      {
        heading: "Codex：強在 OpenAI 帳號體系和多代理工作流",
        body: [
          "Codex 現在不只是一個 CLI。OpenAI 官方口徑裡，Codex 覆蓋終端機、IDE、雲端和桌面 app，並強調審批、安全沙箱和並行代理。",
          "如果資訊站要寫 Codex，建議拆成 CLI 入門、審批模式、Codex app、團隊並行代理和工作流治理幾個主題。",
        ],
      },
      {
        heading: "OpenCode：強在開源、多 provider 和可配置",
        body: [
          "OpenCode 官方文件把它描述為 open source AI coding agent，可用終端機介面、桌面 app 或 IDE 擴充套件。",
          "如果讀者關心本地化、開源可檢查、供應商切換或不想被單一模型生態綁定，OpenCode 是值得單獨寫深度文章的工具。",
        ],
      },
    ],
  },
  {
    ...zhCnArticles[2],
    title: "AI 編碼代理時代還需要 Redux 嗎？Redux Toolkit 的真實價值",
    description:
      "解釋為什麼 Claude Code、Codex、OpenCode 變強後，Redux Toolkit 仍然是複雜前端應用的重要狀態管理選擇。",
    eyebrow: "Redux 專題",
    summary:
      "AI 編碼代理能幫你寫 reducer、遷移 slice、生成測試，但它不會替代應用內部的狀態模型。Redux Toolkit 的價值仍然在於把複雜狀態變化變得顯式、可測試、可審查。",
    takeaways: [
      "Redux Toolkit 是 Redux 官方推薦寫法，適合新專案和 legacy Redux 遷移。",
      "AI 代理能降低 Redux 遷移成本，但不能替代架構判斷。",
      "複雜協作、審計、跨頁共享狀態和可回放除錯仍然是 Redux 的強項。",
      "文章應避免「Redux 已死」這種泛化結論，改寫成「什麼時候不需要 Redux」。",
    ],
    sections: [
      {
        heading: "Redux 解決的是狀態一致性，不是程式碼生成",
        body: [
          "Redux 官方介紹把它定義為 predictable and maintainable global state management。這個定位在 AI 代理時代沒有過時。",
          "Claude Code、Codex、OpenCode 可以幫你生成樣板、遷移舊 reducer、補測試、解釋狀態流，但不能替你定義狀態邊界。",
        ],
      },
      {
        heading: "Redux Toolkit 為什麼是預設推薦",
        body: [
          "Redux Toolkit 是 Redux 官方推薦的 batteries-included 工具集，目標是減少手寫 action type、immutable update 和 store setup 的複雜度。",
          "如果要寫 Redux 高品質文章，建議圍繞 configureStore、createSlice、RTK Query、middleware、selector、遷移策略展開。",
        ],
      },
      {
        heading: "AI 代理如何協助 Redux 遷移",
        body: [
          "實用流程是：先讓代理只讀分析舊 Redux 程式碼，輸出 slice 劃分和風險清單；再逐個模組遷移到 Redux Toolkit；每個模組補 selector 測試和 UI 回歸測試。",
          "這個流程適合 Codex 或 Claude Code 的審批模式，也適合 OpenCode 在 AGENTS.md 中固化規則。",
        ],
      },
    ],
  },
  {
    ...zhCnArticles[3],
    title: "Codex vs Claude Code：工程團隊應該比較哪些維度",
    description:
      "對比 OpenAI Codex 與 Anthropic Claude Code 在團隊工程中的入口、審批、安全、並行代理和長期維護差異。",
    eyebrow: "團隊選型",
    summary:
      "Codex 和 Claude Code 都是強編碼代理，團隊不應該只用一次任務完成度下結論。更關鍵的比較維度是權限、審計、帳號、並行工作、倉庫隔離、失敗回滾和組織內標準化。",
    takeaways: [
      "Codex 的官方重點已經擴展到 app、CLI、IDE、雲端、SDK 和多代理編排。",
      "Claude Code 的優勢在 Anthropic 生態、終端機體驗和 Claude 模型工作流。",
      "團隊選型要先定義不可接受風險，再比較輸出品質。",
      "最好用同一批真實任務做 A/B：bugfix、重構、遷移、測試補齊、文件更新。",
    ],
    sections: [
      {
        heading: "比較入口：CLI 只是其中一個入口",
        body: [
          "Codex 和 Claude Code 都不再只是一個安裝命令。團隊更需要關心 diff 如何審查、能否接入 PR 流程、是否能隔離工作樹和是否能並行跑多個任務。",
          "一旦代理能讀寫生產倉庫，安裝命令就是最不重要的部分。",
        ],
      },
      {
        heading: "比較安全：權限模式比模型名更重要",
        body: [
          "代理能讀寫倉庫、執行命令，這意味著它進入工程系統的高權限區域。審批模式、沙箱、網路存取、密鑰處理和回滾策略必須明確。",
          "如果權限模型不清楚，模型能力越強，風險越難控。",
        ],
      },
      {
        heading: "比較產出：用真實工程任務，而不是 demo",
        body: [
          "建議準備 bugfix、複雜重構、測試補齊、文件更新、依賴升級和架構分析任務，並記錄耗時、人工介入次數、失敗原因、測試結果和審查意見。",
          "最後的答案也可能不是二選一，而是讓不同工具承擔不同類型的工程任務。",
        ],
      },
    ],
  },
  {
    ...zhCnArticles[4],
    title: "OpenCode 與閉源編碼代理對比：開源、多模型和本機工作流的價值",
    description:
      "分析 OpenCode 相比 Claude Code、Codex 的差異：開源、provider 配置、AGENTS.md、MCP、權限和團隊可控性。",
    eyebrow: "OpenCode 專題",
    summary:
      "OpenCode 的核心優勢不是「比閉源代理一定更強」，而是它給了團隊更多可控變數：模型供應商、安裝方式、配置檔、MCP、AGENTS.md、權限和終端機工作流。",
    takeaways: [
      "OpenCode 官方文件明確支援終端機、桌面 app 和 IDE extension。",
      "它要求使用者配置 LLM provider API key，天然適合多模型或自有供應商策略。",
      "AGENTS.md、規則、工具、權限和 MCP 是 OpenCode 深度內容的關鍵詞。",
      "閉源代理更適合追求平台整合；OpenCode 更適合追求開放和可配置。",
    ],
    sections: [
      {
        heading: "OpenCode 的核心定位",
        body: [
          "OpenCode 官方文件把它定義為 open source AI coding agent，並說明它可以作為 terminal-based interface、desktop app 或 IDE extension 使用。",
          "這使它特別適合多模型策略：團隊可以根據成本、上下文長度、隱私、程式碼能力和地區可用性選擇不同 provider。",
        ],
      },
      {
        heading: "為什麼 AGENTS.md 很重要",
        body: [
          "OpenCode 文件建議在專案初始化後生成並提交 AGENTS.md。這個檔案讓代理理解專案結構和編碼模式。",
          "高品質文章不要只寫安裝命令，更應該寫如何設計 AGENTS.md、如何配置 MCP、如何設定危險命令權限，以及如何先 Plan 再 Build。",
        ],
      },
      {
        heading: "和 Codex、Claude Code 的真實差異",
        body: [
          "Claude Code 和 Codex 的優勢是平台整合和官方模型路徑；OpenCode 的優勢是透明、可配置、多 provider 和開源社群路線。",
          "如果團隊需要統一企業帳號和集中審計，可能更偏 Codex 或 Claude Code；如果需要自選模型和倉庫內規則，OpenCode 更合適。",
        ],
      },
    ],
  },
];

const ruArticles: Article[] = [
  {
    ...enArticles[0],
    title:
      "Redux, Claude Code, Codex и OpenCode решают разные классы задач",
    description:
      "Сравнение Redux, Claude Code, Codex и OpenCode по инженерному уровню, workflow, permissions и стратегии контента.",
    eyebrow: "Базовое сравнение",
    summary:
      "Главная ошибка - относить Redux и AI coding agents к одной категории. Redux является слоем состояния приложения, а Claude Code, Codex и OpenCode являются слоями инженерного выполнения.",
    takeaways: [
      "Redux - компонент архитектуры приложения; Claude Code, Codex и OpenCode - инструменты выполнения инженерных задач.",
      "Контент о Redux должен быть стабильным: tutorials и migration guides. Контент об agents должен отслеживать versions, permissions, security и workflow.",
      "Codex и Claude Code ближе к платформенным закрытым agents; OpenCode больше подходит для open-source, multi-provider и configurable workflow.",
      "Информационный сайт должен ясно отделять state management от coding agents.",
    ],
    comparison: ruComparisonRows,
    sections: [
      {
        heading: "Сначала разделите уровни",
        body: [
          "Redux управляет predictable и maintainable global state внутри JavaScript-приложения. Он делает изменения состояния явными и тестируемыми, но не выполняет задачи разработки.",
          "Claude Code, Codex и OpenCode читают код, планируют изменения, редактируют файлы, запускают команды и помогают делегировать engineering tasks моделям.",
        ],
        bullets: [
          "Вопрос «Redux или Codex лучше» является ошибкой категории.",
          "Вопрос «может ли Codex помочь мигрировать legacy Redux на Redux Toolkit» уже полезен.",
          "Вопрос «OpenCode или Claude Code лучше для локального multi-provider workflow» тоже сравним.",
        ],
      },
      {
        heading: "Как информационному сайту писать эти keywords",
        body: [
          "Для SEO и читабельности разделите контент на две линии: Redux как frontend architecture и Claude Code, Codex, OpenCode как AI coding agents.",
          "Так search intent остается чистым. Пользователи Redux обычно ищут state management, RTK, React integration и migration help. Пользователи Codex или Claude Code чаще ищут install, permissions, pricing, CLI, IDE и team workflow.",
        ],
      },
      {
        heading: "Практический вывод",
        body: [
          "Самая сильная комбинация - не выбор одного из четырех. Оставьте Redux в слое архитектуры приложения, а Codex, Claude Code или OpenCode используйте как execution layer для миграции, review, tests и maintenance.",
          "Статья должна объяснять, когда нужен platform agent, когда лучше open-source agent, а когда достаточно хорошего Redux Toolkit guide.",
        ],
      },
    ],
  },
  {
    ...enArticles[1],
    title: "Claude Code vs Codex vs OpenCode: как выбрать AI coding agent",
    description:
      "Практическое сравнение Claude Code, OpenAI Codex и OpenCode по entry points, permissions, security, model choice и team fit.",
    eyebrow: "AI coding agents",
    summary:
      "Все три инструмента могут работать с репозиторием, но философия различается: Claude Code связан с экосистемой Anthropic, Codex - с multi-surface workflow OpenAI, OpenCode - с открытым и configurable terminal workflow.",
    takeaways: [
      "Claude Code естественен, если команда уже работает в экосистеме Claude.",
      "Codex подходит, когда важны OpenAI account access, parallel agents, worktrees и team governance.",
      "OpenCode подходит, когда важны open source, provider choice, AGENTS.md и local workflow control.",
      "Для команд governance обычно так же важен, как качество результата на одной задаче.",
    ],
    sections: [
      {
        heading: "Claude Code: экосистема Anthropic и зрелый coding UX",
        body: [
          "Claude Code - agentic coding tool Anthropic. Он работает через terminal, IDE, cloud и automation surfaces.",
          "Сильные сценарии: чтение больших codebases, объяснение сложных модулей, точечный refactor, migration plans и подключение MCP tools.",
        ],
      },
      {
        heading: "Codex: account system OpenAI и multi-agent workflow",
        body: [
          "Codex уже больше, чем CLI. OpenAI позиционирует его через editor, terminal, cloud, app и SDK, с sandboxing и approval modes.",
          "Пишите о Codex как о наборе workflow: CLI onboarding, approval modes, Codex app, team parallelization и governance.",
        ],
      },
      {
        heading: "OpenCode: open source, providers и configuration",
        body: [
          "OpenCode - open-source AI coding agent для terminal interface, desktop app или IDE extension. Пользователь сам настраивает provider keys.",
          "Это полезно для команд, которым важны model choice, local control, inspectable code, AGENTS.md rules, MCP и permissions.",
        ],
      },
    ],
  },
  {
    ...enArticles[2],
    title: "Нужен ли Redux в эпоху AI coding agents?",
    description:
      "Почему Redux Toolkit остается важным для сложного frontend state даже когда Claude Code, Codex и OpenCode умеют генерировать и мигрировать код.",
    eyebrow: "Redux",
    summary:
      "AI coding agents могут писать reducers, мигрировать slices и генерировать tests, но они не заменяют state model приложения. Redux Toolkit делает сложное состояние явным, тестируемым и reviewable.",
    takeaways: [
      "Redux Toolkit - современный рекомендуемый путь Redux для новых проектов и legacy migration.",
      "AI agents снижают стоимость миграции, но не заменяют архитектурное решение.",
      "Shared state, auditability, replayable debugging и cross-page consistency остаются сильными сторонами Redux.",
      "Лучший вопрос - когда Redux не нужен, а не умер ли Redux.",
    ],
    sections: [
      {
        heading: "Redux решает consistency состояния, а не code generation",
        body: [
          "Redux нужен для predictable и maintainable global state. Эта ценность не исчезает из-за способности agents генерировать код.",
          "Agents помогают мигрировать reducers, писать selectors и добавлять tests, но разработчик все равно определяет state boundaries и ownership.",
        ],
      },
      {
        heading: "Почему Redux Toolkit является modern default",
        body: [
          "Redux Toolkit уменьшает boilerplate action types, immutable updates и store setup. Современный контент Redux должен начинаться именно с него.",
          "Полезные темы: configureStore, createSlice, RTK Query, middleware, selectors и migration plans.",
        ],
      },
      {
        heading: "Как agents помогают миграции",
        body: [
          "Практический flow: read-only analysis, затем migration slice-by-slice, selector tests, UI regression checks и финальный review ненужного global state.",
          "Codex, Claude Code и OpenCode могут помочь, но approval и review loop должны оставаться явными.",
        ],
      },
    ],
  },
  {
    ...enArticles[3],
    title: "Codex vs Claude Code: что сравнивать engineering teams",
    description:
      "Сравнение OpenAI Codex и Anthropic Claude Code для команд: entry points, approvals, safety, parallel agents и maintenance.",
    eyebrow: "Team selection",
    summary:
      "Команды не должны выбирать по одной впечатляющей задаче. Реальное сравнение - permissions, reviewability, accounts, parallel work, repository isolation, rollback и internal standards.",
    takeaways: [
      "Codex охватывает app, CLI, IDE, cloud, SDK и multi-agent coordination.",
      "Claude Code силен там, где команда уже стандартизирована на Anthropic и Claude workflow.",
      "Security baseline должен идти до model benchmarks.",
      "Сравнивайте на реальных задачах: bugfixes, refactors, migrations, tests и docs.",
    ],
    sections: [
      {
        heading: "Сравнивайте entry points, а не только CLI",
        body: [
          "Codex и Claude Code выходят за рамки одной terminal command. Команде важно, как reviewятся diffs, как подключается PR flow, как изолируется work и как безопасно запускать несколько задач.",
          "Install command перестает быть главным, когда инструмент может читать и писать production repository.",
        ],
      },
      {
        heading: "Сравнивайте security до output quality",
        body: [
          "Coding agents могут выполнять команды и редактировать файлы. Поэтому approval modes, sandboxing, network access, secret handling и rollback strategy должны быть явными.",
          "Сильная модель увеличивает risk surface, если permission model неясна.",
        ],
      },
      {
        heading: "Используйте реальные engineering tasks",
        body: [
          "Подготовьте набор задач: bugfixes, refactors, test coverage, docs, dependency upgrades и architecture analysis. Фиксируйте elapsed time, human interventions, failures, tests и review comments.",
          "Правильный ответ может быть специализацией инструментов, а не одним победителем.",
        ],
      },
    ],
  },
  {
    ...enArticles[4],
    title: "OpenCode против закрытых coding agents: что меняет open source",
    description:
      "Сравнение OpenCode с Claude Code и Codex по source openness, provider configuration, AGENTS.md, MCP, permissions и team control.",
    eyebrow: "OpenCode",
    summary:
      "Ценность OpenCode не в том, что он всегда сильнее закрытых agents. Ценность в контроле над model providers, config, project rules, MCP, permissions и local terminal workflow.",
    takeaways: [
      "OpenCode поддерживает terminal, desktop app и IDE extension.",
      "Пользователь настраивает LLM provider keys, что удобно для multi-provider strategies.",
      "AGENTS.md, rules, tools, permissions и MCP - ключевые deep-content keywords.",
      "Closed agents подходят для platform integration; OpenCode - для openness и configurability.",
    ],
    sections: [
      {
        heading: "Core positioning",
        body: [
          "OpenCode документирован как open-source AI coding agent для terminal, desktop или IDE. Это не эксклюзивный client одной model vendor.",
          "Он полезен, когда в выборе участвуют cost, privacy, context length, regional availability и provider switching.",
        ],
      },
      {
        heading: "Почему AGENTS.md важен",
        body: [
          "OpenCode поощряет project rules через файлы вроде AGENTS.md. Так team conventions становятся инструкциями, которые agent читает каждый раз.",
          "Сильные статьи должны раскрывать rules, MCP, dangerous command permissions и plan-before-build workflows, а не только install commands.",
        ],
      },
      {
        heading: "Реальная разница с Codex и Claude Code",
        body: [
          "Claude Code и Codex сильнее в vendor-backed platform integration. OpenCode сильнее в transparency, provider choice и local configuration.",
          "Выбор зависит от того, что важнее: central accounts и auditability или open tooling и model flexibility.",
        ],
      },
    ],
  },
];

export const articlesByLocale = {
  en: enArticles,
  "zh-cn": zhCnArticles,
  "zh-tw": zhTwArticles,
  ru: ruArticles,
} satisfies Record<Locale, Article[]>;

export function getArticles(locale: Locale = DEFAULT_LOCALE): Article[] {
  return articlesByLocale[locale];
}

export function getArticle(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Article | undefined {
  return getArticles(locale).find((article) => article.slug === slug);
}

export const articles = getArticles(DEFAULT_LOCALE);
export const articleRoutes = articles.map((article) => `/articles/${article.slug}`);
