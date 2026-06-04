import { DEFAULT_LOCALE, locales, type Locale } from "@/lib/i18n";

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
  reasonix: string;
  generic: string;
  platform: string;
  openSource: string;
};

export type ArticleComparisonLabels = {
  reasonix: string;
  generic: string;
  platform: string;
  openSource: string;
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
  comparisonLabels?: ArticleComparisonLabels;
  sections: ArticleSection[];
  sources: ArticleSource[];
};

export const articleSources = {
  reasonixGithub: {
    label: "Reasonix GitHub",
    href: "https://github.com/esengine/DeepSeek-Reasonix",
  },
  reasonixCommits: {
    label: "Reasonix main-v2 commits",
    href: "https://github.com/esengine/DeepSeek-Reasonix/commits/main-v2",
  },
  reasonixNpm: {
    label: "reasonix on npm",
    href: "https://www.npmjs.com/package/reasonix",
  },
  reasonixDeepSeekGuide: {
    label: "DeepSeek Reasonix integration guide",
    href: "https://api-docs.deepseek.com/quick_start/agent_integrations/reasonix",
  },
  deepSeekContextCache: {
    label: "DeepSeek Context Caching guide",
    href: "https://api-docs.deepseek.com/guides/kv_cache",
  },
  reasonixReleases: {
    label: "Reasonix GitHub releases",
    href: "https://github.com/esengine/DeepSeek-Reasonix/releases",
  },
  claudeCodeOverview: {
    label: "Claude Code overview",
    href: "https://code.claude.com/docs/en/overview",
  },
  claudeCodePermissions: {
    label: "Claude Code permissions",
    href: "https://code.claude.com/docs/en/permissions",
  },
  codexProduct: {
    label: "OpenAI Codex product page",
    href: "https://openai.com/codex/",
  },
  codexCliGettingStarted: {
    label: "Codex CLI getting started",
    href: "https://help.openai.com/en/articles/11096431",
  },
  wechatReasonixDeepDive: {
    label: "WeChat reference: Reasonix deep dive",
    href: "https://mp.weixin.qq.com/s/-sJx62sDD5uLSQJvfpJuAg",
  },
  wechatReasonixCache: {
    label: "WeChat reference: cache-first Reasonix",
    href: "https://mp.weixin.qq.com/s/1dliPFP0FChW4BTFWHW86g",
  },
} satisfies Record<string, ArticleSource>;

const reasonixSources = [
  articleSources.reasonixDeepSeekGuide,
  articleSources.deepSeekContextCache,
  articleSources.reasonixGithub,
  articleSources.reasonixNpm,
  articleSources.reasonixReleases,
];

const sourceWatchSources = [
  articleSources.reasonixGithub,
  articleSources.reasonixCommits,
  articleSources.reasonixNpm,
  articleSources.reasonixDeepSeekGuide,
  articleSources.deepSeekContextCache,
];

const referenceArticleSources = [
  articleSources.wechatReasonixDeepDive,
  articleSources.wechatReasonixCache,
];

const claudeCodexSources = [
  articleSources.reasonixDeepSeekGuide,
  articleSources.deepSeekContextCache,
  articleSources.reasonixGithub,
  articleSources.claudeCodeOverview,
  articleSources.claudeCodePermissions,
  articleSources.codexProduct,
  articleSources.codexCliGettingStarted,
];

const baseTags = {
  comparison: ["Reasonix", "DeepSeek", "AI coding agent", "Comparison"],
  workflow: ["Reasonix", "CLI", "Local workflow", "DeepSeek"],
  advantage: ["Reasonix", "DeepSeek-native", "TUI", "API Key"],
  cache: ["Reasonix", "Prefix cache", "DeepSeek", "Architecture"],
  headToHead: ["Reasonix", "Claude Code", "Codex", "Coding agent"],
  teams: ["Reasonix", "Team workflow", "Permissions", "Security"],
  openSource: ["Reasonix", "Open source", "Provider choice", "Local agent"],
} as const;

const enClaudeCodexRows: ArticleComparisonRow[] = [
  {
    dimension: "Best fit",
    reasonix:
      "DeepSeek-first local coding sessions where prefix-cache stability, terminal workflow, and low-friction API-key setup are the point.",
    generic:
      "Claude-native engineering work across terminal, IDE, web, mobile handoff, permissions, MCP, and organization policy.",
    platform:
      "OpenAI-backed local and cloud coding work across CLI, IDE, app, ChatGPT, worktrees, and sandboxed task execution.",
    openSource:
      "Quick terminal access to one or more models when the tool is mostly a provider wrapper plus file and shell helpers.",
  },
  {
    dimension: "Architecture bias",
    reasonix:
      "Cache-first loop: keep the prompt prefix stable, append work history, compact rarely, and avoid model switching inside one shared prompt.",
    generic:
      "General agentic coding system: broad tool surface, permissions, MCP, subagents, and workflow integrations around Claude.",
    platform:
      "Harness and app-server model: multiple surfaces share an agent loop, with local clients and cloud-delegated tasks.",
    openSource:
      "Usually optimizes installation speed and provider compatibility before deep backend-specific caching behavior.",
  },
  {
    dimension: "Model/provider story",
    reasonix:
      "DeepSeek-native by design, so the article should explain DeepSeek API behavior instead of presenting Reasonix as a generic shell.",
    generic:
      "Claude is the primary model path, with Claude Code features and policy controls built around Anthropic's stack.",
    platform:
      "Codex uses OpenAI coding models and ChatGPT/OpenAI identity or API flows depending on the surface.",
    openSource:
      "Provider choice can be broad, but the tradeoff is less backend-specific optimization.",
  },
  {
    dimension: "What to inspect first",
    reasonix:
      "`npx reasonix code`, local config, cache-hit usage fields, permissions, MCP config, replay logs, and compaction behavior.",
    generic:
      "Install/login path, tool permissions, MCP server trust, project settings, and team policy.",
    platform:
      "Authentication, approval mode, sandbox/network settings, worktree or cloud environment, and PR/review flow.",
    openSource:
      "How keys are stored, which commands can run, how edits are approved, and whether project rules are respected.",
  },
];

const zhCnClaudeCodexRows: ArticleComparisonRow[] = [
  {
    dimension: "最适合的场景",
    reasonix:
      "DeepSeek 优先的本地编码长会话，重点是 prefix cache 稳定、终端工作流和低门槛 API Key 上手。",
    generic:
      "Claude 原生工程任务，覆盖终端、IDE、Web、移动端接力、权限、MCP 和组织策略。",
    platform:
      "OpenAI 体系下的本地与云端编码任务，覆盖 CLI、IDE、App、ChatGPT、worktree 和沙箱任务。",
    openSource:
      "快速把一个或多个模型接进终端，工具更多是 provider 外壳加文件和 shell 辅助。",
  },
  {
    dimension: "架构偏向",
    reasonix:
      "Cache-first loop：稳定 prompt 前缀，只追加历史，低频压缩，并避免在同一共享 prompt 内频繁换模型。",
    generic:
      "通用 agentic coding system：围绕 Claude 做工具、权限、MCP、subagent 和工作流集成。",
    platform:
      "Harness / app-server 路线：多个入口复用同一 agent loop，同时支持本地客户端和云端任务。",
    openSource:
      "通常先优化安装速度和 provider 兼容性，不一定围绕某个后端的缓存机制深度设计。",
  },
  {
    dimension: "模型与 provider",
    reasonix:
      "Reasonix 是 DeepSeek-native，所以文章要解释 DeepSeek API 行为，而不是把它写成普通套壳。",
    generic:
      "Claude 是主路径，Claude Code 的功能和策略控制围绕 Anthropic 体系展开。",
    platform:
      "Codex 使用 OpenAI 编码模型，不同入口走 ChatGPT/OpenAI 身份或 API 流程。",
    openSource:
      "provider 选择更宽，但代价是很难对单一后端做足够深的缓存优化。",
  },
  {
    dimension: "先检查什么",
    reasonix:
      "`npx reasonix code`、本地配置、cache-hit usage 字段、权限、MCP 配置、replay 日志和压缩行为。",
    generic:
      "安装/登录、工具权限、MCP server 信任、项目设置和团队策略。",
    platform:
      "认证、审批模式、沙箱/网络设置、worktree 或云端环境，以及 PR/审查流。",
    openSource:
      "Key 如何保存、哪些命令能跑、编辑如何批准、项目规则是否真的生效。",
  },
];

const enArticles: Article[] = [
  {
    slug: "reasonix-chinese-developer-onboarding",
    title: "How to start Reasonix: the official DeepSeek terminal path",
    description:
      "A practical Reasonix onboarding guide covering Node.js, the DeepSeek API key, npx startup, local configuration, and when to verify npm, releases, or source.",
    eyebrow: "How to start",
    date: "2026-06-03",
    readTime: "8 min",
    tags: ["Reasonix", "DeepSeek", "API Key", "CLI"],
    summary:
      "Start Reasonix from the project directory, not from an abstract agent comparison. The useful first path is Node.js 20.10+, a DeepSeek Platform API key, `npx reasonix code`, then the TUI commands that make the session usable.",
    takeaways: [
      "The official DeepSeek integration path is simple: install Node.js, get a DeepSeek API key, enter the target project, and run `npx reasonix code`.",
      "The key is a provider credential, not a site login. Keep it out of screenshots, comments, public issues, and repository commits.",
      "Once the TUI opens, `/help`, `/pro`, and `/preset max` are the first commands worth knowing.",
      "For global installs, release downloads, or source builds, verify the current npm and GitHub sources directly instead of copying version tables from third-party posts.",
    ],
    sections: [
      {
        heading: "Run the first session from a real project",
        body: [
          "Reasonix should be introduced as a working terminal agent, so the article should begin with the command sequence a reader can actually run.",
          "Install Node.js 20.10+. On Windows, install Git for Windows. Then open the repository where Reasonix should read and edit files, and run `npx reasonix code` from that directory.",
        ],
        bullets: [
          "DeepSeek Platform: create or copy the API key.",
          "Project directory: run `npx reasonix code` where file context should come from.",
          "First TUI session: use `/help` to inspect commands before starting a long task.",
        ],
      },
      {
        heading: "Keep the API key local and boring",
        body: [
          "The DeepSeek key belongs to the model provider. It is not the same thing as a community account, a site login, or a discussion identity.",
          "DeepSeek's Reasonix guide says the first run prompts for the key and persists it to local Reasonix config. The article should keep that boundary explicit: the credential stays in local setup, not in public support threads.",
        ],
      },
      {
        heading: "After the TUI opens",
        body: [
          "The first session should not immediately become a huge autonomous task. Start by asking Reasonix to explain the repository, inspect a small file, or draft a plan for a narrow change.",
          "For model control, use `/pro` to arm DeepSeek-V4-Pro for the next turn, or `/preset max` when a whole session needs the stronger model. That keeps the onboarding article concrete without turning it into a benchmark post.",
        ],
      },
      {
        heading: "When to use npm, releases, or source",
        body: [
          "`npx reasonix code` is the clean first-run path because it matches the official DeepSeek guide and requires no global install.",
          "If the reader wants a permanent command, a downloaded binary, or a source build, the article should send them to the live npm package, GitHub releases, and repository README. Do not copy stale version numbers or star counts from reference articles.",
        ],
      },
    ],
    sources: reasonixSources,
  },
  {
    slug: "reasonix-prefix-cache-hit-mechanism",
    title: "Reasonix prefix-cache mechanism: why the loop is the product",
    description:
      "A source-backed explanation of Reasonix's cache-first loop, DeepSeek context caching, append-only history, low-frequency compaction, and cache-hit observability.",
    eyebrow: "Cache mechanism",
    date: "2026-06-03",
    readTime: "9 min",
    tags: [...baseTags.cache],
    summary:
      "Reasonix is easiest to understand if you start from DeepSeek's context cache. The product does not merely call a model from the terminal; it tries to keep the prompt prefix stable so long sessions can keep reusing cached input.",
    takeaways: [
      "DeepSeek context caching rewards requests that fully reuse previously persisted prefixes.",
      "Reasonix turns that API behavior into an agent-loop constraint: keep stable parts stable, append history, and avoid needless prompt rewrites.",
      "Two-model collaboration should use separate cache-stable sessions instead of switching models inside one shared prompt.",
      "Compaction is a deliberate reset point, not a cleanup step that should happen every turn.",
    ],
    sections: [
      {
        heading: "The constraint is prefix reuse",
        body: [
          "DeepSeek's context cache is built around overlapping prefixes. When later requests fully match a persisted prefix unit, the matched portion can count as a cache hit.",
          "That means an agent cannot treat prompt construction as cosmetic. Reordering messages, injecting unstable metadata, or rewriting the old transcript can destroy the byte-level prefix that the cache depends on.",
        ],
        bullets: [
          "Stable system and tool definitions matter.",
          "Append-only history is friendlier to cache reuse than rewritten history.",
          "Temporary scratch should not pollute the persisted prompt path.",
        ],
      },
      {
        heading: "Reasonix makes cache behavior an architecture rule",
        body: [
          "The useful architecture story is the three-zone loop from the reference articles: immutable prefix, append-only log, and volatile scratch. Treat it as an explanatory model, not as a place to copy their version or GitHub statistics.",
          "The immutable prefix carries stable instructions and tool shape. The log grows forward with assistant and tool results. Scratch is the short-lived planning and reasoning space that should not constantly rewrite earlier turns.",
        ],
        bullets: [
          "Immutable prefix: fixed instructions and tool contract.",
          "Append-only log: prior work grows in order instead of being rearranged.",
          "Volatile scratch: temporary state is reset or distilled before it changes the long-term prompt.",
        ],
      },
      {
        heading: "Compaction is the rare reset point",
        body: [
          "Long sessions eventually need context management. Reasonix's spec frames compaction as a low-frequency event near the context limit: summarize older middle history, keep recent turns, and continue from a new compacted state.",
          "That is the right way to write the mechanism. The system has one intentional cache-reset point, then goes back to prepend-stable, append-forward behavior between resets.",
        ],
      },
      {
        heading: "What users can measure",
        body: [
          "DeepSeek exposes cache status through usage fields such as `prompt_cache_hit_tokens` and `prompt_cache_miss_tokens`. A serious Reasonix article should tell readers to watch those fields instead of promising one universal hit rate.",
          "The product claim is not that every session always hits the same number. The stronger claim is architectural: Reasonix is built so cache hits have a real chance to survive long coding loops.",
        ],
      },
    ],
    sources: [...reasonixSources, ...referenceArticleSources],
  },
  {
    slug: "reasonix-vs-claude-code-codex",
    title: "Reasonix vs Claude Code vs Codex: compare the operating loop",
    description:
      "A practical comparison of Reasonix, Claude Code, Codex, and generic AI CLI tools through setup, cache behavior, permissions, provider strategy, and long-running work.",
    eyebrow: "Head-to-head",
    date: "2026-06-03",
    readTime: "10 min",
    tags: [...baseTags.headToHead],
    summary:
      "This comparison is not a scoreboard. Reasonix, Claude Code, and Codex are built around different operating assumptions: DeepSeek cache economics, Claude-native workflow, and OpenAI multi-surface agent orchestration.",
    takeaways: [
      "Choose Reasonix when the core requirement is a DeepSeek-native local coding loop that respects prefix-cache economics.",
      "Choose Claude Code when the team wants Claude-native tools, permissions, MCP, and Anthropic-managed workflow surfaces.",
      "Choose Codex when the team wants OpenAI coding models across CLI, IDE, app, ChatGPT, cloud tasks, sandboxing, and parallel work.",
      "Use a generic AI CLI only when model access is enough and backend-specific agent design is not the deciding factor.",
    ],
    comparison: enClaudeCodexRows,
    comparisonLabels: {
      reasonix: "Reasonix",
      generic: "Claude Code",
      platform: "Codex",
      openSource: "Generic AI CLI",
    },
    sections: [
      {
        heading: "Do not compare screenshots. Compare loops.",
        body: [
          "The wrong article asks which tool looks more impressive in a demo. The useful article asks what loop the tool is optimized for.",
          "Reasonix starts from DeepSeek's cache behavior. Claude Code starts from Claude as an agentic coding system. Codex spans local and cloud coding surfaces around OpenAI models, worktrees, approval modes, and sandboxing.",
        ],
      },
      {
        heading: "Reasonix has the narrowest and clearest lane",
        body: [
          "Reasonix is specialized. That is the point. It should be explained as a DeepSeek-native terminal agent, not as a universal replacement for every coding platform.",
          "Its strongest lane is long local work where cache stability, local configuration, tool-call repair, MCP, sandbox policy, replay, and compaction behavior are more important than a broad account platform.",
        ],
      },
      {
        heading: "Where Claude Code and Codex are stronger",
        body: [
          "Claude Code has the advantage when an organization has already standardized on Claude and wants the broader Anthropic workflow: terminal work, permissions, MCP, administrative controls, and scheduled or delegated tasks.",
          "Codex has the advantage when a team wants OpenAI's multi-surface coding stack: CLI, IDE, app, ChatGPT-side tasks, sandboxed execution, worktrees, and cloud delegation.",
        ],
      },
      {
        heading: "Decision rule",
        body: [
          "If the key question is 'how do I run a DeepSeek-first coding agent cheaply and steadily in my terminal?', Reasonix is the article subject.",
          "If the key question is account governance, cross-surface delegation, or enterprise workflow, Claude Code and Codex become the more natural comparison points. That framing keeps Reasonix credible instead of pretending one tool should win every category.",
        ],
      },
    ],
    sources: claudeCodexSources,
  },
  {
    slug: "reasonix-local-agent-vs-generic-ai-cli",
    title: "Reasonix vs generic AI CLI: why DeepSeek-native design matters",
    description:
      "How Reasonix differs from generic model-wrapper CLIs in architecture, cache handling, key setup, repair behavior, MCP, sandboxing, replay, and long-session control.",
    eyebrow: "Generic CLI comparison",
    date: "2026-06-03",
    readTime: "8 min",
    tags: [...baseTags.workflow],
    summary:
      "A generic AI CLI can be useful, but it usually starts from provider access. Reasonix should be explained from backend behavior: DeepSeek context caching, cache-first loop design, tool-call repair, local permissions, MCP, and replay.",
    takeaways: [
      "Generic AI CLI tools usually optimize for quick model access and provider switching.",
      "Reasonix optimizes for a specific backend behavior: DeepSeek prefix-cache reuse in long terminal sessions.",
      "The comparison should test architecture and failure handling, not only install commands.",
      "Generic tools are still fine for small prompts, but Reasonix is the stronger story when long-running DeepSeek work is the goal.",
    ],
    sections: [
      {
        heading: "Generic CLI: model access first",
        body: [
          "Most generic AI CLIs start with a model name, a provider key, and a prompt. That is useful when the job is simple: ask a question, generate a snippet, or run a short local edit.",
          "The limitation is that provider compatibility is not the same as provider optimization. A wrapper can call DeepSeek without shaping its agent loop around DeepSeek's cache rules.",
        ],
      },
      {
        heading: "Reasonix: backend behavior first",
        body: [
          "Reasonix is more interesting because it makes DeepSeek's API behavior part of the product design. The cache-first loop, flash-first default, Pro escalation, tool-call repair, MCP support, sandbox policy, and replay logs all belong in the article.",
          "That is the architecture angle from the reference posts worth keeping. Version tables and GitHub statistics should be left out; the mechanism is what matters.",
        ],
      },
      {
        heading: "What the comparison should test",
        body: [
          "A practical comparison should ask what survives real engineering work: a long refactor, repeated file reads, tool failures, command approvals, context growth, and a later audit of what happened.",
          "Reasonix has concrete surfaces for those questions. A generic CLI may still succeed, but the article should make it prove the same things instead of treating all terminal agents as equal.",
        ],
        bullets: [
          "Does the prompt prefix stay stable enough for cache reuse?",
          "Are tool-call failures repaired or surfaced as raw model errors?",
          "Are permissions, MCP, sandboxing, and replay visible to the user?",
          "Can the session compact without losing the story of the work?",
        ],
      },
      {
        heading: "When generic is enough",
        body: [
          "Use a generic AI CLI when the work is short, provider choice is the main requirement, or the user wants one lightweight command for many models.",
          "Use Reasonix when the reader is explicitly choosing a DeepSeek-native coding loop and cares about cache economics, long sessions, local configuration, and terminal reliability.",
        ],
      },
    ],
    sources: [...reasonixSources, ...referenceArticleSources],
  },
  {
    slug: "reasonix-team-workflow-comparison",
    title: "Reasonix for teams: compare workflow, permissions, and maintenance",
    description:
      "How engineering teams should evaluate Reasonix against broader platform-agent workflows without losing the Reasonix product focus.",
    eyebrow: "Team workflow",
    date: "2026-06-03",
    readTime: "8 min",
    tags: [...baseTags.teams],
    summary:
      "Teams should not decide from one impressive demo. A Reasonix article should compare local setup, key handling, repository access, reviewability, upgrade path, and fallback strategy.",
    takeaways: [
      "Reasonix fits teams that want a local DeepSeek-native CLI/TUI path before adding heavier platform governance.",
      "Security baselines should come before model benchmarks.",
      "Team articles should compare real work: bugfixes, refactors, migrations, tests, and documentation.",
      "The right answer may be specialization, with Reasonix owning DeepSeek-native local workflows.",
    ],
    sections: [
      {
        heading: "Start from the Reasonix workflow",
        body: [
          "For a team, the first question is whether Reasonix can run safely in the target project directory with clear API-key handling and predictable command execution.",
          "That is more relevant to the Reasonix site than a headline battle between other products.",
        ],
      },
      {
        heading: "Compare security before output quality",
        body: [
          "Coding agents can execute commands and edit files, so they enter a high-permission part of the engineering system. Approval flow, network access, secret handling, and rollback strategy must be explicit.",
          "Reasonix content should translate those concerns into local CLI checks: which directory, which key, which source, which release, and which commands.",
        ],
      },
      {
        heading: "Use real engineering tasks",
        body: [
          "Prepare tasks such as bugfixes, refactors, test coverage, documentation updates, dependency upgrades, and architecture analysis. Track elapsed time, human interventions, failure causes, test results, and review comments.",
          "Then explain where Reasonix is the best fit and where a heavier platform-agent workflow may be more appropriate.",
        ],
      },
    ],
    sources: reasonixSources,
  },
  {
    slug: "reasonix-open-source-agent-comparison",
    title: "Reasonix and open-source local agents: source trust versus provider flexibility",
    description:
      "A Reasonix-centered comparison with open-source local-agent workflows, focused on source inspection, provider choice, rules, and local control.",
    eyebrow: "Open local agents",
    date: "2026-06-03",
    readTime: "8 min",
    tags: [...baseTags.openSource],
    summary:
      "Open-source local agents matter because they show what developers value: inspectable source, provider choice, project rules, extensions, permissions, and local terminal control. Reasonix should be compared against those needs from its own DeepSeek-native position.",
    takeaways: [
      "Reasonix should lead with DeepSeek-native setup and official source verification.",
      "Open-source local-agent comparisons should focus on source trust and configuration, not brand rivalry.",
      "Provider flexibility is valuable, but Reasonix's value is a focused DeepSeek workflow.",
      "Strong content should explain when to choose Reasonix and when to choose a more configurable local agent type.",
    ],
    sections: [
      {
        heading: "What open local agents change",
        body: [
          "Open local agents give developers more control over source review, provider selection, project rules, tool permissions, and extension surfaces.",
          "That is a useful comparison category because it helps readers understand the tradeoff between a focused Reasonix path and a more configurable agent stack.",
        ],
      },
      {
        heading: "Reasonix still has a clearer first path",
        body: [
          "Reasonix has a direct DeepSeek quick start, npm package, release assets, and source repository. Those are concrete sources a new user can verify live.",
          "For a Reasonix site, the open-source comparison should bring readers back to these source and setup decisions.",
        ],
      },
      {
        heading: "The article angle",
        body: [
          "Frame the comparison as source trust versus provider flexibility. Reasonix wins when the reader wants a focused DeepSeek-native route; a broader open local agent wins when provider choice is the primary requirement.",
          "This keeps the page aligned with Reasonix while still answering the reader's selection question.",
        ],
      },
    ],
    sources: sourceWatchSources,
  },
];

const zhCnArticles: Article[] = [
  {
    ...enArticles[0],
    title: "中文开发者如何上手 Reasonix：从 DeepSeek 官方路径跑起来",
    description:
      "面向中文开发者的 Reasonix 上手指南：Node.js、DeepSeek API Key、npx 启动、本地配置、TUI 命令和安装来源核验。",
    eyebrow: "中文上手",
    tags: ["Reasonix", "DeepSeek", "中文开发者", "CLI"],
    summary:
      "第一篇文章不要先讲版本和热度，先让读者真的跑起来：安装 Node.js，准备 DeepSeek API Key，进入项目目录，运行 `npx reasonix code`，再用 `/help`、`/pro`、`/preset max` 理解 TUI。",
    takeaways: [
      "第一次体验优先按 DeepSeek 官方文档：Node.js 20.10+、DeepSeek Platform API Key、项目目录内运行 `npx reasonix code`。",
      "DeepSeek API Key 是模型服务密钥，不是本站账号；不要贴到评论、截图、issue 或仓库提交里。",
      "TUI 打开后先用 `/help` 看命令，用 `/pro` 或 `/preset max` 控制更强模型的使用方式。",
      "如果要全局安装、下载 release 或源码构建，去 npm、GitHub release 和 README 核验当前状态，不引用参考文章里的版本表和 GitHub 数据。",
    ],
    sections: [
      {
        heading: "先按官方入口跑通",
        body: [
          "最稳妥的第一步不是找第三方教程，而是按 DeepSeek API 文档走：安装 Node.js 20.10+，Windows 用户安装 Git for Windows，进入目标项目目录，然后运行 `npx reasonix code`。",
          "这条路径不需要先做全局安装，适合验证 Reasonix 能否读取当前工作区、进入 TUI，并完成一个很小的真实工程任务。",
        ],
        bullets: [
          "DeepSeek Platform：创建或复制模型 API Key。",
          "项目目录：在需要 Reasonix 读取的仓库内运行 `npx reasonix code`。",
          "第一次任务：让它解释仓库、查看一个文件，或为一个小改动写计划。",
        ],
      },
      {
        heading: "API Key 到底放在哪里",
        body: [
          "模型 API Key 来自 DeepSeek Platform，不来自本站账号，也不应该出现在评论、截图、公开 issue 或仓库提交里。",
          "DeepSeek 官方文档写的是首次运行内置向导会询问 Key，并保存到本地 Reasonix 配置。文章应该把这个边界讲清楚：站内登录、社区身份和模型 API Key 是三件事。",
        ],
      },
      {
        heading: "什么时候再看 npm、release 和源码",
        body: [
          "`npx reasonix code` 适合首次体验，因为它直接对应 DeepSeek 官方快速开始。长期使用、下载二进制包或从源码构建，都应该回到实时 npm、GitHub release 和 README 核验。",
          "这篇文章不复制参考文里的版本号、stars、forks 或下载量。它只保留能指导上手的事实：在哪个目录运行、Key 怎么处理、TUI 打开后先做什么。",
        ],
      },
    ],
  },
  {
    ...enArticles[1],
    title: "Reasonix 独特缓存命中机制：为什么它说自己为 DeepSeek 而生",
    description:
      "解释 Reasonix 的 cache-first loop、DeepSeek prefix cache、append-only 日志、低频压缩、工具调用修复和 cache hit 观测方式。",
    eyebrow: "缓存机制",
    summary:
      "参考文章最值得保留的不是版本号和 GitHub 数据，而是技术架构：DeepSeek 的缓存规则要求 prefix 稳定，Reasonix 把这个限制变成 agent loop 的第一约束。",
    takeaways: [
      "DeepSeek 上下文缓存依赖已经持久化并且完整匹配的 prefix。",
      "Reasonix 的写法应该围绕 immutable prefix、append-only log、volatile scratch 这三个区域展开。",
      "低频 compaction 是少数主动改变 prefix 的时刻，不应该写成每轮都重排上下文。",
      "缓存命中应看 `prompt_cache_hit_tokens` / `prompt_cache_miss_tokens`，不要承诺所有场景固定命中率。",
    ],
    sections: [
      {
        heading: "DeepSeek 缓存真正要求什么",
        body: [
          "DeepSeek 的 Context Caching 不是普通浏览器缓存。后续请求只有完整复用已经持久化的 prefix 单元，才可能命中缓存。",
          "所以 Reasonix 的文章不能只说“省钱”。它要解释为什么 system prompt、tool specs、历史消息顺序、临时计划状态都会影响 prefix 是否稳定。",
        ],
        bullets: [
          "稳定 prefix：系统提示和工具定义不要每轮乱变。",
          "只追加日志：历史按顺序增长，避免重排和改写。",
          "临时 scratch：每轮计划或思考不要直接污染长期 prompt。",
        ],
      },
      {
        heading: "Cache-First Loop 怎么写",
        body: [
          "可以借鉴参考文里的三段式架构：Immutable Prefix、Append-Only Log、Volatile Scratch。它很适合向读者解释 Reasonix 为什么不是普通套壳 CLI。",
          "但不要把参考文里的版本表、stars 或下载量搬进正文。这里要讲的是机制：prefix 一旦稳定，就尽量让后续会话沿着它继续增长。",
        ],
        bullets: [
          "Immutable Prefix：固定指令、工具形状和少量稳定上下文。",
          "Append-Only Log：assistant 和 tool 结果按时间追加。",
          "Volatile Scratch：临时计划被重置或蒸馏后才进入长期上下文。",
        ],
      },
      {
        heading: "低频压缩，而不是每轮重写",
        body: [
          "长任务一定会遇到上下文窗口问题。Reasonix 的正确叙述是低频 compaction：接近上下文限制时，把较早的中段历史压缩成摘要，保留近期回合，再继续工作。",
          "这意味着 compaction 是一个明确的 cache reset point。它应该少发生、可解释、可复盘，而不是每一轮都改写前文。",
        ],
      },
      {
        heading: "命中率要看 usage 字段",
        body: [
          "DeepSeek API 会在 usage 里给出 `prompt_cache_hit_tokens` 和 `prompt_cache_miss_tokens`。文章可以教用户看这两个字段，而不是写一个适用于所有场景的固定百分比。",
          "这比喊口号更可信：Reasonix 的竞争力不是某个永久不变的数字，而是它把 cache hit 当成架构约束来设计。",
        ],
      },
    ],
  },
  {
    ...enArticles[2],
    title: "Reasonix vs Claude Code vs Codex：比较的是运行循环，不是截图",
    description:
      "从上手路径、缓存机制、权限、provider 策略和长任务形态，对比 Reasonix、Claude Code、Codex 与通用 AI CLI。",
    eyebrow: "三方对比",
    summary:
      "这篇文章不写成产品排行榜。Reasonix、Claude Code 和 Codex 的差异在于运行循环：DeepSeek 缓存经济性、Claude-native 工程系统、OpenAI 多入口 agent orchestration。",
    takeaways: [
      "如果核心需求是 DeepSeek-native 本地长会话和 prefix cache 稳定性，Reasonix 是主角。",
      "如果团队已经围绕 Claude Code 的终端、权限、MCP 和组织策略工作，Claude Code 更自然。",
      "如果团队需要 OpenAI 体系的 CLI、IDE、App、ChatGPT、云端任务、worktree 和沙箱能力，Codex 更自然。",
      "通用 AI CLI 适合快速接模型，但不一定具备针对 DeepSeek cache 的深度设计。",
    ],
    comparison: zhCnClaudeCodexRows,
    comparisonLabels: {
      reasonix: "Reasonix",
      generic: "Claude Code",
      platform: "Codex",
      openSource: "通用 AI CLI",
    },
    sections: [
      {
        heading: "先比较运行循环",
        body: [
          "错误写法是比较谁的界面更像“高级 AI 工具”。正确写法是比较它们把一次工程任务拆成什么循环。",
          "Reasonix 从 DeepSeek 缓存行为出发；Claude Code 从 Claude-native agent workflow 出发；Codex 从 OpenAI 多入口、本地和云端任务编排出发。",
        ],
      },
      {
        heading: "Reasonix 的窄优势",
        body: [
          "Reasonix 的优势不是“什么都做”。它的优势是聚焦：DeepSeek-native、终端本地工作、cache-first loop、tool-call repair、MCP、sandbox、replay 和低频压缩。",
          "如果读者的问题是“我想让 DeepSeek coding agent 长时间跑在项目目录里，尽量保持缓存命中和成本稳定”，Reasonix 才是最该展开的对象。",
        ],
      },
      {
        heading: "Claude Code 和 Codex 强在哪里",
        body: [
          "Claude Code 更适合已经使用 Claude 生态的团队：终端协作、权限控制、MCP、组织策略和委派任务是它的主要叙事。",
          "Codex 更适合 OpenAI 体系里的多入口工作：CLI、IDE、App、ChatGPT 任务、沙箱、worktree 和云端并行任务是它的主要叙事。",
        ],
      },
      {
        heading: "选型结论",
        body: [
          "要写 Reasonix，就不要假装它在所有维度都赢。它赢在 DeepSeek 后端深度适配、本地长会话和缓存友好的 agent loop。",
          "如果读者更关心企业治理、跨入口委派、云端并行任务或统一账号体系，那 Claude Code 和 Codex 是更自然的参照物。",
        ],
      },
    ],
  },
  {
    ...enArticles[3],
    title: "Reasonix 对比通用 AI CLI：为什么 DeepSeek-native 设计更重要",
    description:
      "说明 Reasonix 相比普通模型套壳 CLI，在缓存架构、工具修复、MCP、权限、沙箱、replay 和长任务控制上的差异。",
    eyebrow: "通用 CLI 对比",
    summary:
      "通用 AI CLI 可以快速接入模型，但通常先解决“能不能调用模型”。Reasonix 更应该从 DeepSeek 后端行为解释：prefix cache、cache-first loop、工具调用修复、本地权限、MCP 和 replay。",
    takeaways: [
      "通用 AI CLI 通常优先解决 provider 切换和 prompt 执行。",
      "Reasonix 的文章应该优先讲 DeepSeek cache 行为和长会话架构。",
      "对比应测试真实工程失败点：工具调用坏掉、权限审批、上下文增长、复盘日志。",
      "短任务用通用 CLI 没问题；DeepSeek-native 长任务才是 Reasonix 的强叙事。",
    ],
    sections: [
      {
        heading: "通用 CLI 先解决模型访问",
        body: [
          "普通 AI CLI 往往从模型名、provider key 和 prompt 开始。它们适合快速问答、生成片段、做小范围编辑，也适合需要频繁切换 provider 的用户。",
          "但 provider 兼容不等于 provider 深度优化。一个工具能调用 DeepSeek，不代表它的上下文组织、工具调用和长任务策略都围绕 DeepSeek cache 设计。",
        ],
      },
      {
        heading: "Reasonix 先解释后端行为",
        body: [
          "Reasonix 的重点是后端行为：cache-first loop、Flash-first、Pro 升级、Tool-Call Repair、MCP、sandbox 和 replay 都要进入文章结构。",
          "参考文章的技术架构可以保留，版本数据和 GitHub 数据不要保留。真正有价值的是解释为什么它不是普通模型外壳。",
        ],
      },
      {
        heading: "对比要用真实工程问题",
        body: [
          "真正的差异会出现在长任务里：反复读文件、工具调用失败、命令需要审批、上下文越来越长、最后还要复盘过程。",
          "Reasonix 的文章应该要求通用 CLI 在这些问题上给出答案，而不是默认所有 terminal agent 都一样。",
        ],
        bullets: [
          "prefix 是否稳定到足以争取 cache hit？",
          "工具调用坏掉时有没有 repair pipeline？",
          "MCP、权限、sandbox 和 replay 是否对用户可见？",
          "上下文压缩后还能不能解释任务来龙去脉？",
        ],
      },
      {
        heading: "什么时候通用 CLI 足够",
        body: [
          "如果任务很短、provider 自由度最重要、用户只想用一个轻量命令问模型，通用 AI CLI 完全够用。",
          "如果目标是围绕 DeepSeek 做本地长会话编码，并且关心缓存经济性、稳定循环和终端可复盘性，Reasonix 才值得单独写成一条内容线。",
        ],
      },
    ],
  },
  {
    ...enArticles[4],
    title: "团队使用 Reasonix：应该比较工作流、权限和维护成本",
    description:
      "面向团队解释如何评估 Reasonix：本地配置、API Key、仓库访问、审查、升级路径和失败回退。",
    eyebrow: "团队流程",
    summary:
      "团队不要用一次惊艳 demo 做决定。Reasonix 文章应该比较本地上手、密钥处理、仓库访问、审查方式、升级路径和失败回退。",
    takeaways: [
      "Reasonix 适合先落地本地 DeepSeek-native CLI/TUI，再决定是否需要更重的平台治理。",
      "安全基线应该先于模型效果比较。",
      "团队文章要比较真实任务：bugfix、重构、迁移、测试和文档。",
      "最终答案可能是工具分工，让 Reasonix 负责 DeepSeek-native 本地工作流。",
    ],
    sections: [
      {
        heading: "先从 Reasonix 工作流开始",
        body: [
          "团队首先要判断 Reasonix 能否在目标项目目录里安全运行，API Key 处理是否清楚，命令执行是否可预期。",
          "这比把标题写成其它产品互相比更符合 Reasonix 站点。",
        ],
      },
      {
        heading: "先比较安全，再比较产出",
        body: [
          "coding agent 能执行命令、修改文件，所以它进入了工程系统的高权限区域。审批流程、网络访问、密钥处理和回滚策略必须明确。",
          "Reasonix 内容应把这些问题翻译成本地 CLI 检查项：哪个目录、哪个 key、哪个来源、哪个 release、哪些命令。",
        ],
      },
      {
        heading: "用真实工程任务比较",
        body: [
          "准备 bugfix、重构、测试补齐、文档更新、依赖升级和架构分析任务，记录耗时、人工介入、失败原因、测试结果和审查意见。",
          "再说明 Reasonix 适合哪类任务，哪些场景需要更重的平台级 agent workflow。",
        ],
      },
    ],
  },
  {
    ...enArticles[5],
    title: "Reasonix 与开源本地 agent：源码可信和 provider 自由度怎么取舍",
    description:
      "以 Reasonix 为中心，对比开源本地 agent workflow 中的源码检查、provider 选择、规则、插件和本地控制。",
    eyebrow: "开源本地 agent",
    summary:
      "开源本地 agent 有价值，因为它代表了开发者关心的源码可检查、provider 选择、项目规则、扩展、权限和本地终端控制。Reasonix 应从 DeepSeek-native 定位出发和这些需求对照。",
    takeaways: [
      "Reasonix 应先讲 DeepSeek-native setup 和官方来源核验。",
      "开源本地 agent 对比应聚焦源码可信和配置，而不是品牌对打。",
      "provider 自由度有价值，但 Reasonix 的价值是聚焦 DeepSeek 工作流。",
      "好文章要讲清什么时候选 Reasonix，什么时候选更可配置的本地 agent 类型。",
    ],
    sections: [
      {
        heading: "开源本地 agent 改变了什么",
        body: [
          "开源本地 agent 给开发者更多源码审查、provider 选择、项目规则、工具权限和扩展面控制。",
          "这是有意义的类型对比，因为它能帮读者理解聚焦 Reasonix 路线和更可配置 agent stack 之间的取舍。",
        ],
      },
      {
        heading: "Reasonix 的第一路径更清楚",
        body: [
          "Reasonix 有直接的 DeepSeek 快速启动、npm 包、release 资产和源码仓库。这些都是新用户可以实时核验的具体来源。",
          "对 Reasonix 站点来说，开源对比最终也应该回到这些来源和上手决策。",
        ],
      },
      {
        heading: "文章角度",
        body: [
          "把对比写成源码可信和 provider 自由度的取舍：读者想要聚焦 DeepSeek-native 路线时选 Reasonix，首要需求是多 provider 和高度配置时再考虑更宽的开源本地 agent。",
          "这样页面既回答选型问题，也不会偏离 Reasonix。",
        ],
      },
    ],
  },
];

const zhTwArticles: Article[] = [
  {
    ...zhCnArticles[0],
    title: "中文開發者如何上手 Reasonix：從 DeepSeek 官方路徑跑起來",
    description:
      "面向繁體中文開發者的 Reasonix 上手指南：Node.js、DeepSeek API Key、npx 啟動、本機設定、TUI 命令和安裝來源核驗。",
    eyebrow: "中文上手",
    tags: ["Reasonix", "DeepSeek", "中文開發者", "CLI"],
  },
  {
    ...zhCnArticles[1],
    title: "Reasonix 獨特快取命中機制：為什麼它說自己為 DeepSeek 而生",
    description:
      "解釋 Reasonix 的 cache-first loop、DeepSeek prefix cache、append-only 日誌、低頻壓縮、工具呼叫修復和 cache hit 觀測方式。",
  },
  {
    ...zhCnArticles[2],
    title: "Reasonix vs Claude Code vs Codex：比較的是運行循環，不是截圖",
    description:
      "從上手路徑、快取機制、權限、provider 策略和長任務形態，對比 Reasonix、Claude Code、Codex 與通用 AI CLI。",
  },
  {
    ...zhCnArticles[3],
    title: "Reasonix 對比通用 AI CLI：為什麼 DeepSeek-native 設計更重要",
    description:
      "說明 Reasonix 相比普通模型套殼 CLI，在快取架構、工具修復、MCP、權限、sandbox、replay 和長任務控制上的差異。",
  },
  {
    ...zhCnArticles[4],
    title: "團隊使用 Reasonix：應該比較工作流、權限和維護成本",
    description:
      "面向團隊解釋如何評估 Reasonix：本機設定、API Key、repo 存取、審查、升級路徑和失敗回退。",
  },
  {
    ...zhCnArticles[5],
    title: "Reasonix 與開源本機 agent：原始碼可信和 provider 自由度怎麼取捨",
    description:
      "以 Reasonix 為中心，對比開源本機 agent workflow 中的原始碼檢查、provider 選擇、規則、插件和本機控制。",
  },
];

const ruArticles: Article[] = [
  {
    ...enArticles[0],
    title:
      "Как начать с Reasonix: официальный DeepSeek terminal path",
    description:
      "Практический Reasonix onboarding: Node.js, DeepSeek API key, npx startup, local config, TUI commands и source verification.",
    eyebrow: "Reasonix onboarding",
    summary:
      "Начните Reasonix из реального project directory: Node.js, DeepSeek Platform API key, `npx reasonix code`, затем базовые TUI commands. Version tables и GitHub stats из reference posts не нужны.",
    takeaways: [
      "DeepSeek quick start требует Node.js 20.10+, DeepSeek Platform API key и `npx reasonix code` внутри target project directory.",
      "Provider API key должен оставаться в local setup, а не в screenshots, comments, public issues или commits.",
      "После запуска TUI сначала проверьте `/help`, `/pro` и `/preset max`.",
      "Для global install, release download или source build проверяйте live npm, releases и README напрямую.",
    ],
  },
  {
    ...enArticles[1],
    title: "Reasonix prefix-cache mechanism: почему loop является продуктом",
    description:
      "Reasonix cache-first loop, DeepSeek prefix cache, append-only history, low-frequency compaction и cache-hit observability.",
    eyebrow: "Cache mechanism",
    summary:
      "Полезная часть reference articles - architecture: DeepSeek cache rewards stable prefixes, and Reasonix turns that into an agent-loop constraint.",
    takeaways: [
      "DeepSeek context caching rewards full reuse of persisted prefixes.",
      "Reasonix should be explained through immutable prefix, append-only log, and volatile scratch.",
      "Compaction is a rare reset point, not an every-turn rewrite.",
      "Use `prompt_cache_hit_tokens` and `prompt_cache_miss_tokens` instead of promising one fixed hit rate.",
    ],
  },
  {
    ...enArticles[2],
    title:
      "Reasonix vs Claude Code vs Codex: сравнивайте operating loop",
    description:
      "Reasonix, Claude Code, Codex и generic AI CLI через setup, cache behavior, permissions, provider strategy и long-running work.",
  },
  {
    ...enArticles[3],
    title:
      "Reasonix vs generic AI CLI: почему DeepSeek-native design важен",
    description:
      "Чем Reasonix отличается от model-wrapper CLIs по architecture, cache handling, repair behavior, MCP, sandboxing, replay и long-session control.",
  },
  {
    ...enArticles[4],
    title:
      "Reasonix для команд: сравнивайте workflow, permissions и maintenance",
    description:
      "Как engineering teams оценивать Reasonix без ухода от Reasonix product focus.",
  },
  {
    ...enArticles[5],
    title:
      "Reasonix и open-source local agents: source trust против provider flexibility",
    description:
      "Reasonix-centered сравнение с open-source local-agent workflows: source inspection, provider choice, rules и local control.",
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

export function getArticleRoutes(locale: Locale = DEFAULT_LOCALE): string[] {
  return getArticles(locale).map((article) => `/articles/${article.slug}`);
}

export function getLocalesForArticle(slug: string): Locale[] {
  return locales.filter((locale) => Boolean(getArticle(slug, locale)));
}

export const articles = getArticles(DEFAULT_LOCALE);
export const articleRoutes = getArticleRoutes(DEFAULT_LOCALE);
