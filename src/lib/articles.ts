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
  codexCliDocs: {
    label: "Codex CLI docs",
    href: "https://developers.openai.com/codex/cli",
  },
  cursorDocs: {
    label: "Cursor docs",
    href: "https://cursor.com/docs",
  },
  cursorProduct: {
    label: "Cursor product page",
    href: "https://cursor.com/product",
  },
  githubCopilotDocs: {
    label: "GitHub Copilot docs",
    href: "https://docs.github.com/copilot",
  },
  githubCopilotCloudAgent: {
    label: "GitHub Copilot cloud agent",
    href: "https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent",
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
    title: "Reasonix vs Claude Code: DeepSeek-native agent workflow comparison",
    description:
      "A practical Reasonix vs Claude Code comparison that also uses Codex and generic AI CLI tools as secondary context for setup, cache behavior, permissions, provider strategy, and long-running work.",
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
  {
    slug: "reasonix-github-repository",
    title: "Reasonix GitHub repository: what to verify before you clone or download",
    description:
      "A practical guide to the Reasonix GitHub repository covering the official repo, default branch, releases, commits, issues, npm package, and the safest checks before you trust a setup guide.",
    eyebrow: "GitHub repository",
    date: "2026-06-09",
    readTime: "8 min",
    tags: ["Reasonix", "GitHub repository", "DeepSeek", "Source verification"],
    summary:
      "The useful answer is not just the repository URL. Readers searching for the Reasonix GitHub repository usually need to know which branch is active, where releases live, how npm and GitHub relate, and what to verify before running commands.",
    takeaways: [
      "The official Reasonix repository is `esengine/DeepSeek-Reasonix` on GitHub.",
      "The current default development branch is `main-v2`, so clone and branch guidance should point there when source inspection matters.",
      "Readers should verify the repository page, releases, commit stream, issues, and npm package together instead of trusting copied version tables.",
      "The shortest DeepSeek-backed entry path is still `npx reasonix code`, but repository checks matter before source builds, release downloads, and issue triage.",
    ],
    sections: [
      {
        heading: "Start with the official repository surfaces",
        body: [
          "The core keyword intent is navigational plus trust-checking. A useful article should immediately point readers to the official Reasonix GitHub repository, then explain what each surface answers.",
          "The repository page answers identity and popularity, releases answer downloadable milestones, commits answer current development movement, issues answer known failures, and npm answers package-install reality.",
        ],
        bullets: [
          "Repository: confirm `esengine/DeepSeek-Reasonix` is the source you are reading.",
          "Default branch: verify whether `main-v2` is still the active development branch before cloning for source work.",
          "Releases: use GitHub releases for tagged desktop and CLI milestones.",
          "npm: check the live package before assuming `npx` or global install behavior.",
        ],
      },
      {
        heading: "What to check before you clone",
        body: [
          "Cloning the repository makes sense when you want to inspect source, verify the current branch structure, read docs, or build locally. It is not required for the first-run DeepSeek path.",
          "For a first session, DeepSeek's official guide still points users to `npx reasonix code` from the target project directory. The repository becomes more important when the user wants releases, issue context, or source-level validation.",
        ],
        bullets: [
          "Quick start: `cd /path/to/my-project && npx reasonix code`.",
          "Source check: `git clone https://github.com/esengine/DeepSeek-Reasonix.git` then inspect branches and docs.",
          "Build path: switch to `main-v2` only after confirming it is still the relevant branch for source work.",
        ],
      },
      {
        heading: "Decision path for common repository questions",
        body: [
          "If the reader wants the safest install path, send them to the DeepSeek guide and npm package first. If they want to audit code or investigate a bug, send them to commits and issues. If they want packaged downloads, send them to releases.",
          "That decision path prevents a weak article that treats every repository visit as the same task. The keyword is useful only when the page explains where to go next.",
        ],
        bullets: [
          "Need the official command? Check the DeepSeek guide and npm package.",
          "Need desktop or tagged binaries? Check GitHub releases.",
          "Need to verify active development? Check `main-v2` commits.",
          "Need to understand a bug or limitation? Check open GitHub issues before copying third-party fixes.",
        ],
      },
      {
        heading: "What not to trust",
        body: [
          "Do not trust screenshots, reposted version tables, or articles that copy old star counts and then guess installation behavior. Those details drift quickly.",
          "A better Reasonix article keeps claims conservative: repository identity, branch direction, official quick start, release locations, and links to the live sources.",
        ],
      },
    ],
    sources: [
      articleSources.reasonixGithub,
      articleSources.reasonixCommits,
      articleSources.reasonixReleases,
      articleSources.reasonixNpm,
      articleSources.reasonixDeepSeekGuide,
    ],
  },
  {
    slug: "reasonix-vs-claude-code",
    title: "Reasonix vs Claude Code: how to choose the better coding loop",
    description:
      "A focused Reasonix vs Claude Code comparison covering DeepSeek-first work, cache behavior, permissions, MCP, setup path, and the decision rule for local coding sessions.",
    eyebrow: "Claude Code comparison",
    date: "2026-06-09",
    readTime: "9 min",
    tags: ["Reasonix", "Claude Code", "DeepSeek", "Comparison"],
    summary:
      "This keyword works when the article is narrower than a three-way benchmark. Reasonix and Claude Code are not substitutes in every scenario: one is a DeepSeek-native terminal loop, the other is a Claude-native coding workflow with broader Anthropic platform assumptions.",
    takeaways: [
      "Choose Reasonix when the job is explicitly DeepSeek-first and the reader cares about prefix-cache stability, local terminal control, and `npx reasonix code` as the primary path.",
      "Choose Claude Code when the team is already standardized on Claude and wants Anthropic-centric permissions, MCP usage, and workflow management.",
      "The right comparison is about operating loops, not whichever demo looked faster once.",
      "A serious article should compare setup, approval boundaries, model strategy, long-session behavior, and what to verify before giving the tool repository access.",
    ],
    sections: [
      {
        heading: "Start with the model and workflow assumption",
        body: [
          "Reasonix starts from DeepSeek as the native backend and explains how to run a coding agent inside the terminal with local project context. Claude Code starts from Claude as the default engineering stack and builds workflow features around that assumption.",
          "That is why a focused two-way comparison is useful. It answers a different question than the broader Reasonix vs Claude Code vs Codex article.",
        ],
      },
      {
        heading: "When Reasonix is the better fit",
        body: [
          "Reasonix is the stronger fit when the reader already wants a DeepSeek coding loop and needs a practical path: local API key setup, `npx reasonix code`, cache-aware long sessions, tool-call repair, MCP support, replay, and terminal-first control.",
          "The product argument is not that Reasonix wins every enterprise workflow. The argument is that it stays closer to DeepSeek-specific behavior, especially around prefix-cache-friendly sessions and Flash versus Pro decisions.",
        ],
        bullets: [
          "Use Reasonix when the model choice is already DeepSeek.",
          "Use Reasonix when cache behavior and steady local terminal work matter more than cross-surface platform features.",
          "Use Reasonix when the reader wants to verify GitHub, npm, releases, and DeepSeek docs directly before trusting a guide.",
        ],
      },
      {
        heading: "When Claude Code is the better fit",
        body: [
          "Claude Code is the better fit when the team is aligned around Claude and wants the broader Anthropic workflow: permissions policy, MCP server usage, administrative controls, and Claude-native engineering habits.",
          "That does not make it the default answer for a DeepSeek-first query. It means the article should admit where Claude Code is naturally stronger instead of pretending the tools share the same center of gravity.",
        ],
        bullets: [
          "Use Claude Code when Claude is the organizational default.",
          "Use Claude Code when team policy and Anthropic workflow integration outweigh DeepSeek-native optimization.",
          "Use Claude Code when the reader is comparing governance and tool surface, not just terminal startup.",
        ],
      },
      {
        heading: "A practical decision checklist",
        body: [
          "Readers need a simple decision path before they hand repository access to any coding agent. The comparison should ask what model the team is committed to, where keys live, how command approval works, and whether long-session behavior matters.",
          "That checklist is more useful than a feature-count table because it keeps the page anchored to actual engineering risk.",
        ],
        bullets: [
          "Backend question: DeepSeek-first or Claude-first?",
          "Startup question: `npx reasonix code` in the target repo, or Claude Code's own install/login path?",
          "Approval question: what commands, edits, and MCP tools should be allowed?",
          "Session question: do you need DeepSeek cache-aware long loops or broader Claude-native workflow controls?",
        ],
      },
    ],
    sources: [
      articleSources.reasonixDeepSeekGuide,
      articleSources.deepSeekContextCache,
      articleSources.reasonixGithub,
      articleSources.claudeCodeOverview,
      articleSources.claudeCodePermissions,
    ],
  },
  {
    slug: "reasonix-vs-codex",
    title: "Reasonix vs Codex: DeepSeek-native loop or OpenAI coding agent?",
    description:
      "A focused Reasonix vs Codex comparison for developers choosing between a DeepSeek-native local terminal workflow and OpenAI's Codex app, CLI, IDE, cloud, and multi-agent surfaces.",
    eyebrow: "Codex comparison",
    date: "2026-06-16",
    readTime: "9 min",
    tags: ["Reasonix", "Codex", "DeepSeek", "Comparison"],
    summary:
      "Reasonix vs Codex is not a generic model benchmark. Reasonix is best explained as a DeepSeek-native local coding loop, while Codex is an OpenAI coding agent that spans app, CLI, IDE, cloud work, worktrees, skills, and team workflows.",
    takeaways: [
      "Choose Reasonix when the core requirement is a DeepSeek-first terminal session with local project control and cache-aware long work.",
      "Choose Codex when the team wants OpenAI coding models across app, CLI, IDE, cloud delegation, worktrees, and parallel agent workflows.",
      "Compare operating loops before comparing screenshots: local DeepSeek economics versus OpenAI's broader agent platform.",
      "A credible article should admit that Codex is stronger when multi-surface delegation and OpenAI account workflows are the deciding factor.",
    ],
    sections: [
      {
        heading: "Start with the backend assumption",
        body: [
          "Reasonix starts from a DeepSeek-native assumption: run a coding agent from the target repository, keep local setup explicit, and shape long sessions around DeepSeek cache behavior.",
          "Codex starts from an OpenAI assumption: use an OpenAI coding agent across the Codex app, CLI, IDE, cloud environments, worktrees, skills, and background workflows. That is a different product center, not just a different model name.",
        ],
      },
      {
        heading: "When Reasonix is the better fit",
        body: [
          "Reasonix is the better fit when the reader already wants DeepSeek, wants a terminal-first loop, and cares about cache-friendly long sessions more than a broad account platform.",
          "The practical path stays concrete: verify the Reasonix source, prepare the DeepSeek key locally, run `npx reasonix code` from the project directory, then watch how planning, tool calls, replay, and compaction behave over time.",
        ],
        bullets: [
          "Use Reasonix when DeepSeek is the chosen backend.",
          "Use Reasonix when local terminal control matters more than cloud delegation.",
          "Use Reasonix when long-session cost and prefix-cache behavior are part of the decision.",
        ],
      },
      {
        heading: "When Codex is the better fit",
        body: [
          "Codex is the better fit when the team wants OpenAI's coding stack across multiple surfaces: a dedicated app, terminal CLI, IDE extension, cloud tasks, worktrees, skills, and parallel agent work.",
          "That makes Codex a more natural choice for teams already organized around ChatGPT/OpenAI identity, cloud delegation, and broad agent workflows. A Reasonix page should say that plainly instead of pretending every coding-agent decision is won in the terminal.",
        ],
        bullets: [
          "Use Codex when OpenAI models and account workflows are already the team standard.",
          "Use Codex when cloud tasks, worktrees, app review, and IDE handoff matter.",
          "Use Codex when the job is multi-agent orchestration rather than a focused DeepSeek terminal loop.",
        ],
      },
      {
        heading: "Decision checklist",
        body: [
          "Before choosing either tool, compare how the work will actually run: where credentials live, whether edits happen locally or in cloud workspaces, how commands are approved, and how the final diff is reviewed.",
          "That checklist keeps the Reasonix vs Codex keyword useful. It routes DeepSeek-first local work toward Reasonix and routes OpenAI platform work toward Codex.",
        ],
        bullets: [
          "Backend: DeepSeek-first or OpenAI-first?",
          "Surface: terminal-only, or app plus IDE plus cloud?",
          "Review: local replay and command history, or cloud worktrees and pull-request workflows?",
          "Scale: one focused local session, or several delegated agent tasks in parallel?",
        ],
      },
    ],
    sources: [
      articleSources.reasonixDeepSeekGuide,
      articleSources.deepSeekContextCache,
      articleSources.reasonixGithub,
      articleSources.codexProduct,
      articleSources.codexCliDocs,
    ],
  },
  {
    slug: "reasonix-vs-cursor",
    title: "Reasonix vs Cursor: terminal DeepSeek workflow or agentic editor?",
    description:
      "A focused Reasonix vs Cursor comparison covering DeepSeek-native terminal work, Cursor's agentic editor and cloud surfaces, codebase context, rules, MCP, review, and team workflows.",
    eyebrow: "Cursor comparison",
    date: "2026-06-16",
    readTime: "9 min",
    tags: ["Reasonix", "Cursor", "DeepSeek", "Comparison"],
    summary:
      "Reasonix vs Cursor is a workflow choice. Reasonix centers a DeepSeek-native local terminal loop, while Cursor centers an agentic editor and workspace experience across desktop, CLI, cloud agents, review, rules, and codebase context.",
    takeaways: [
      "Choose Reasonix when the main job is DeepSeek-first local coding from the project terminal.",
      "Choose Cursor when the editor experience, codebase indexing, rules, review, and cross-surface agent workspace are the center of the workflow.",
      "Reasonix should not be framed as a full Cursor replacement; it has a narrower DeepSeek-native lane.",
      "The useful comparison is terminal loop versus agentic editor, not a feature-count fight.",
    ],
    sections: [
      {
        heading: "Compare the work surface",
        body: [
          "Reasonix starts inside the project terminal. The site should explain how a DeepSeek-backed coding loop reads local context, proposes work, runs commands, handles tool calls, and keeps the session reviewable.",
          "Cursor starts from a different surface: an AI coding editor and agent workspace. Its strongest story is not only chat output, but how agents work with codebase context, rules, terminal commands, review, CLI, cloud agents, and team workflows.",
        ],
      },
      {
        heading: "When Reasonix is the better fit",
        body: [
          "Reasonix is the better fit when the reader wants a focused DeepSeek path and does not need the whole coding environment to move into a new editor.",
          "That matters for developers who already have an editor setup but want a DeepSeek-native terminal agent for long debugging, refactors, source verification, and cache-aware iteration.",
        ],
        bullets: [
          "Use Reasonix when DeepSeek backend behavior is part of the buying decision.",
          "Use Reasonix when the project terminal is the natural control point.",
          "Use Reasonix when source verification, local key handling, and session replay matter more than editor replacement.",
        ],
      },
      {
        heading: "When Cursor is the better fit",
        body: [
          "Cursor is the better fit when the reader wants the editor itself to be the agent workspace. Its value comes from codebase understanding, agent planning and building, terminal access, rules, review, cloud agents, and multiple surfaces around the same development environment.",
          "For teams already standardized on Cursor, Reasonix should be presented as a narrower DeepSeek-native route, not as a claim that the full editor workflow should be replaced.",
        ],
        bullets: [
          "Use Cursor when codebase indexing and editor-native workflows are essential.",
          "Use Cursor when agents, review, CLI, cloud work, and rules should live in one workspace.",
          "Use Cursor when the team wants a shared AI editor standard rather than a terminal-specific DeepSeek tool.",
        ],
      },
      {
        heading: "Decision checklist",
        body: [
          "The right comparison asks where the developer wants to spend the day: in an existing editor plus a DeepSeek terminal agent, or inside an agentic editor built around codebase context and review.",
          "That framing keeps the page credible. Reasonix owns the DeepSeek terminal loop; Cursor owns a broader editor-centered workflow.",
        ],
        bullets: [
          "Surface: terminal loop or editor workspace?",
          "Backend: DeepSeek-first or model/tool choice inside Cursor?",
          "Context: explicit local session state or editor-level codebase indexing?",
          "Team fit: lightweight focused CLI path or shared AI editor workflow?",
        ],
      },
    ],
    sources: [
      articleSources.reasonixDeepSeekGuide,
      articleSources.deepSeekContextCache,
      articleSources.reasonixGithub,
      articleSources.cursorDocs,
      articleSources.cursorProduct,
    ],
  },
  {
    slug: "reasonix-vs-github-copilot",
    title: "Reasonix vs GitHub Copilot: DeepSeek terminal loop or Copilot coding agent?",
    description:
      "A focused Reasonix vs GitHub Copilot comparison covering DeepSeek-native local sessions, IDE assistance, Copilot cloud agent, GitHub pull-request workflows, MCP, and team governance.",
    eyebrow: "GitHub Copilot comparison",
    date: "2026-06-16",
    readTime: "9 min",
    tags: ["Reasonix", "GitHub Copilot", "DeepSeek", "Comparison"],
    summary:
      "Reasonix vs GitHub Copilot should separate two intents: Reasonix is a DeepSeek-native local terminal loop, while GitHub Copilot spans IDE assistance, GitHub-hosted cloud agent work, pull requests, custom agents, MCP, and organization controls.",
    takeaways: [
      "Choose Reasonix when the reader wants DeepSeek-first coding from the local project terminal.",
      "Choose GitHub Copilot when the team wants IDE help, GitHub issue-to-branch work, pull-request review, cloud agent sessions, and GitHub-native governance.",
      "Do not confuse GitHub Copilot with generic Microsoft Copilot; this page targets coding-agent search intent.",
      "The strongest comparison is local DeepSeek terminal work versus GitHub-centered development workflow.",
    ],
    sections: [
      {
        heading: "Name the right Copilot",
        body: [
          "For this keyword, the relevant Microsoft-backed tool is GitHub Copilot, not Microsoft 365 Copilot. The intent is coding assistance and coding-agent workflow, not office-document generation.",
          "That matters because GitHub Copilot now covers more than autocomplete: documentation, IDE workflows, cloud agent sessions, custom agents, MCP, pull-request review, and organization policy all belong in the comparison.",
        ],
      },
      {
        heading: "When Reasonix is the better fit",
        body: [
          "Reasonix is the better fit when the searcher is explicitly looking for a DeepSeek-native coding path and wants the work to start from the local repository terminal.",
          "The page should route that reader toward official source checks, local DeepSeek key setup, `npx reasonix code`, and careful review of commands, edits, replay, cache behavior, and long-session compaction.",
        ],
        bullets: [
          "Use Reasonix when DeepSeek is the desired model backend.",
          "Use Reasonix when the workflow should stay local and terminal-first.",
          "Use Reasonix when cache-aware long sessions matter more than GitHub-native automation.",
        ],
      },
      {
        heading: "When GitHub Copilot is the better fit",
        body: [
          "GitHub Copilot is the better fit when the team wants assistance directly inside IDEs and GitHub workflows, especially where issues, branches, pull requests, review, repository policy, and organization access already live in GitHub.",
          "Copilot cloud agent is also a different shape of workflow: it can work on repository tasks in a GitHub-hosted environment, create a branch, and leave changes for review. That is stronger for GitHub-native delegation than for a DeepSeek-specific local loop.",
        ],
        bullets: [
          "Use GitHub Copilot when IDE assistance and GitHub pull-request flow are the priority.",
          "Use GitHub Copilot when cloud agent sessions should work from issues, branches, or GitHub prompts.",
          "Use GitHub Copilot when organization policy and GitHub-native governance decide the tool choice.",
        ],
      },
      {
        heading: "Decision checklist",
        body: [
          "A serious comparison should ask whether the job should happen beside the developer in a local terminal or inside the GitHub development system.",
          "That avoids a weak article that treats Copilot as only autocomplete. It also keeps Reasonix honest: Reasonix has the clearer DeepSeek-native terminal lane, while GitHub Copilot has the broader GitHub workflow lane.",
        ],
        bullets: [
          "Backend: DeepSeek-first or GitHub/OpenAI/Microsoft Copilot stack?",
          "Surface: local terminal session or IDE plus GitHub cloud agent?",
          "Review: Reasonix replay and local diff, or GitHub branch and pull-request review?",
          "Governance: local source/key checks or GitHub organization controls?",
        ],
      },
    ],
    sources: [
      articleSources.reasonixDeepSeekGuide,
      articleSources.deepSeekContextCache,
      articleSources.reasonixGithub,
      articleSources.githubCopilotDocs,
      articleSources.githubCopilotCloudAgent,
    ],
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
    title: "Reasonix vs Claude Code：DeepSeek-native agent workflow 对比",
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
  {
    ...enArticles[6],
    title: "Reasonix GitHub repository：克隆或下载前先核验什么",
    description:
      "面向 `reasonix github repository` 搜索意图的实用文章：解释官方仓库、默认分支、releases、commits、issues、npm 包，以及下载或源码检查前该核验哪些点。",
    eyebrow: "GitHub 仓库",
    tags: ["Reasonix", "GitHub 仓库", "DeepSeek", "来源核验"],
    summary:
      "这个关键词不能只回答仓库链接。用户通常还想知道默认分支是什么、GitHub 与 npm 是什么关系、下载去哪看、源码核验时先看哪几个页面。",
    takeaways: [
      "Reasonix 官方 GitHub 仓库是 `esengine/DeepSeek-Reasonix`。",
      "当前默认开发分支是 `main-v2`，所以涉及源码检查时要先确认分支方向。",
      "要把 repo、releases、commits、issues 和 npm 包一起看，而不是只看别人复制的版本表。",
      "首次 DeepSeek 路径仍然是 `npx reasonix code`，但仓库核验对源码构建、release 下载和 bug 排查很重要。",
    ],
    sections: [
      {
        heading: "先看官方仓库的几个入口",
        body: [
          "`reasonix github repository` 的真实需求通常是导航加信任判断。文章开头就应该给出官方仓库，然后解释每个入口分别回答什么问题。",
          "repo 页面看身份和整体状态，releases 看可下载里程碑，commits 看当前开发活动，issues 看已知问题，npm 看安装现实。",
        ],
        bullets: [
          "Repository：确认你看的就是 `esengine/DeepSeek-Reasonix`。",
          "Default branch：源码工作前先确认 `main-v2` 仍是当前开发分支。",
          "Releases：桌面版和带 tag 的里程碑以 GitHub releases 为准。",
          "npm：`npx` 和全局安装行为先看 live package，不看二手文章。",
        ],
      },
      {
        heading: "什么时候需要 clone",
        body: [
          "想看源码、确认分支结构、读 docs、或者本地构建时，clone 才真正必要。第一次跑通 DeepSeek 路径并不要求先 clone。",
          "对首次使用者来说，DeepSeek 官方文档仍然是从目标项目目录执行 `npx reasonix code`。只有在你要做源码核验、release 判断或 issue 排查时，GitHub 仓库才是第一入口。",
        ],
        bullets: [
          "快速开始：`cd /path/to/my-project && npx reasonix code`。",
          "源码核验：`git clone https://github.com/esengine/DeepSeek-Reasonix.git` 后再看分支和 docs。",
          "构建路径：只有确认 `main-v2` 仍相关时，才继续切分支和本地 build。",
        ],
      },
      {
        heading: "仓库问题的判断路径",
        body: [
          "用户如果只是想安全安装，应优先去 DeepSeek 官方文档和 npm；想看源码或追 bug，再去 commits 和 issues；想拿桌面包或 tagged 版本，再去 releases。",
          "这条路径能把关键词真正写出价值，而不是把所有 GitHub 访问都写成同一种需求。",
        ],
        bullets: [
          "想确认官方命令：看 DeepSeek guide 和 npm package。",
          "想下载桌面包或 tagged 二进制：看 GitHub releases。",
          "想确认开发是否活跃：看 `main-v2` commits。",
          "想判断 bug 或限制是否已知：先看 open issues，再决定是否信第三方修复。",
        ],
      },
      {
        heading: "哪些信息不要信",
        body: [
          "不要信截图、转述版本表，或者只抄旧 star 数再猜安装行为的文章。这些信息漂移很快。",
          "更稳妥的写法是只保留保守事实：仓库身份、分支方向、官方 quick start、release 位置，以及 live source 链接。",
        ],
      },
    ],
  },
  {
    ...enArticles[7],
    title: "Reasonix vs Claude Code：怎么选更适合的 coding loop",
    description:
      "面向 `reasonix vs claude code` 的聚焦对比：解释 DeepSeek-first 工作流、缓存行为、权限、MCP、上手路径，以及本地编码会话的选型规则。",
    eyebrow: "Claude Code 对比",
    tags: ["Reasonix", "Claude Code", "DeepSeek", "对比"],
    summary:
      "这个关键词不该继续写成三方排行榜。Reasonix 和 Claude Code 的核心差异，是一个围绕 DeepSeek-native terminal loop，另一个围绕 Claude-native engineering workflow。",
    takeaways: [
      "如果任务明确是 DeepSeek-first，并且关心 prefix cache 稳定、本地终端控制和 `npx reasonix code`，优先看 Reasonix。",
      "如果团队已经标准化到 Claude，并且更看重 Anthropic 体系的权限、MCP 和工作流治理，Claude Code 更自然。",
      "真正要比较的是 operating loop，不是哪次 demo 看起来更快。",
      "靠谱文章应比较上手路径、审批边界、模型策略、长会话行为，以及把仓库权限交给 agent 之前该验证什么。",
    ],
    sections: [
      {
        heading: "先看模型和工作流前提",
        body: [
          "Reasonix 默认从 DeepSeek-native backend 出发，讲的是如何在终端里带着本地项目上下文跑 coding agent。Claude Code 则从 Claude 作为默认工程栈出发，再把工作流能力搭在这层前提上。",
          "所以这个两方对比是有价值的，它回答的是比三方对比更窄、更实用的问题。",
        ],
      },
      {
        heading: "什么时候 Reasonix 更合适",
        body: [
          "如果读者已经确定要走 DeepSeek coding loop，并且需要本地 API Key、`npx reasonix code`、cache-aware 长会话、tool-call repair、MCP、replay 和终端优先控制，Reasonix 更合适。",
          "Reasonix 的论点不是“企业工作流全部都赢”，而是它更贴近 DeepSeek 的具体行为，尤其是 prefix cache 友好的长会话和 Flash / Pro 的切换逻辑。",
        ],
        bullets: [
          "模型已经选定 DeepSeek。",
          "你更在意缓存行为和稳定的本地终端工作，而不是多入口平台能力。",
          "你希望先直接核验 GitHub、npm、releases 和 DeepSeek 官方文档，再信任何教程。",
        ],
      },
      {
        heading: "什么时候 Claude Code 更合适",
        body: [
          "如果团队已经围绕 Claude 组织工程流程，并且更看重 Anthropic 体系下的权限策略、MCP server 使用、管理能力和 Claude-native 工作方式，Claude Code 更自然。",
          "这不代表它自动成为 DeepSeek-first 搜索的默认答案，而是说明文章必须承认 Claude Code 在这些方向上确实更强。",
        ],
        bullets: [
          "组织默认就是 Claude。",
          "团队更关心治理、权限和 Anthropic workflow integration。",
          "读者在比较的是治理面和工具面，而不只是终端怎么启动。",
        ],
      },
      {
        heading: "一个实用判断清单",
        body: [
          "把仓库权限交给任何 coding agent 之前，都应该先走一遍简短判断：模型前提是什么、密钥放在哪里、命令审批怎么做、长会话到底重要不重要。",
          "这比纯功能堆表更有用，因为它直接对应工程风险。",
        ],
        bullets: [
          "Backend：DeepSeek-first 还是 Claude-first？",
          "Startup：是在目标仓库运行 `npx reasonix code`，还是走 Claude Code 自己的安装/登录路径？",
          "Approval：哪些命令、改动和 MCP 工具允许执行？",
          "Session：你更需要 DeepSeek cache-aware 长循环，还是更广的 Claude-native workflow controls？",
        ],
      },
    ],
  },
  {
    ...enArticles[8],
    title: "Reasonix vs Codex：DeepSeek-native loop 还是 OpenAI coding agent？",
    description:
      "面向 `reasonix vs codex` 的聚焦对比：解释 Reasonix 的 DeepSeek-native 本地终端工作流，以及 Codex 的 App、CLI、IDE、云端、多 agent 和 OpenAI 体系能力。",
    eyebrow: "Codex 对比",
    tags: ["Reasonix", "Codex", "DeepSeek", "对比"],
    summary:
      "Reasonix vs Codex 不该写成普通模型跑分。Reasonix 更适合解释为 DeepSeek-native 本地 coding loop；Codex 则是 OpenAI 体系里的 coding agent，覆盖 app、CLI、IDE、云端 worktree、skills 和团队流程。",
    takeaways: [
      "如果核心需求是 DeepSeek-first、本地终端控制和 cache-aware 长会话，优先看 Reasonix。",
      "如果团队需要 OpenAI 编码模型、Codex app、CLI、IDE、云端委派、worktree 和并行 agent 工作流，Codex 更自然。",
      "先比较 operating loop，再比较界面截图：本地 DeepSeek 经济性和 OpenAI 平台能力不是同一个问题。",
      "靠谱页面应该承认 Codex 在多入口委派、OpenAI 账号体系和团队 agent workflow 上更强。",
    ],
    sections: [
      {
        heading: "先看后端前提",
        body: [
          "Reasonix 从 DeepSeek-native 前提出发：在目标仓库里启动 coding agent，明确本地配置，并围绕 DeepSeek cache 行为组织长会话。",
          "Codex 从 OpenAI 前提出发：通过 Codex app、CLI、IDE、云端环境、worktree、skills 和后台流程使用 OpenAI coding agent。这不是换一个模型名，而是产品重心不同。",
        ],
      },
      {
        heading: "什么时候 Reasonix 更合适",
        body: [
          "如果读者已经想用 DeepSeek，并且更在意 terminal-first loop、cache-friendly 长会话，而不是更宽的账号平台，Reasonix 更合适。",
          "实际路径应该写得具体：核验 Reasonix 来源，本地准备 DeepSeek key，在项目目录运行 `npx reasonix code`，再观察 planning、tool call、replay 和 compaction 在长任务里的表现。",
        ],
        bullets: [
          "DeepSeek 已经是选定后端时，用 Reasonix。",
          "本地终端控制比云端委派更重要时，用 Reasonix。",
          "长会话成本和 prefix cache 行为是选型因素时，用 Reasonix。",
        ],
      },
      {
        heading: "什么时候 Codex 更合适",
        body: [
          "如果团队要的是 OpenAI coding stack 的多入口能力，Codex 更自然：app、terminal CLI、IDE extension、云端任务、worktree、skills 和并行 agent 工作都在它的叙事里。",
          "已经围绕 ChatGPT/OpenAI 身份、云端委派和更宽 agent workflow 组织工作的团队，选择 Codex 更顺。Reasonix 页面应该直接承认这一点，而不是假装所有 coding-agent 选择都在终端里决胜。",
        ],
        bullets: [
          "OpenAI 模型和账号流程已经是团队标准时，用 Codex。",
          "云端任务、worktree、app review 和 IDE handoff 很重要时，用 Codex。",
          "任务是多 agent 编排，而不是聚焦 DeepSeek 终端循环时，用 Codex。",
        ],
      },
      {
        heading: "判断清单",
        body: [
          "选择前先比较工作怎么实际运行：credential 放在哪里，改动发生在本地还是云端 workspace，命令如何审批，最终 diff 怎么 review。",
          "这样 `reasonix vs codex` 才有价值：DeepSeek-first 本地工作导向 Reasonix，OpenAI 平台型工作导向 Codex。",
        ],
        bullets: [
          "Backend：DeepSeek-first 还是 OpenAI-first？",
          "Surface：只要终端，还是 app + IDE + cloud？",
          "Review：本地 replay 和命令历史，还是云端 worktree 和 PR 流程？",
          "Scale：一个聚焦本地会话，还是多个并行委派 agent 任务？",
        ],
      },
    ],
  },
  {
    ...enArticles[9],
    title: "Reasonix vs Cursor：终端 DeepSeek 工作流还是 agentic editor？",
    description:
      "面向 `reasonix vs cursor` 的聚焦对比：覆盖 DeepSeek-native 终端工作、Cursor 的 agentic editor / cloud surfaces、代码库上下文、rules、MCP、review 和团队流程。",
    eyebrow: "Cursor 对比",
    tags: ["Reasonix", "Cursor", "DeepSeek", "对比"],
    summary:
      "Reasonix vs Cursor 是工作流选择。Reasonix 以 DeepSeek-native 本地终端循环为中心；Cursor 以 agentic editor 和 workspace 为中心，覆盖 desktop、CLI、cloud agents、review、rules 和代码库上下文。",
    takeaways: [
      "如果主要任务是在项目终端里做 DeepSeek-first 本地编码，优先看 Reasonix。",
      "如果 editor experience、codebase indexing、rules、review 和跨入口 agent workspace 是核心，Cursor 更自然。",
      "不要把 Reasonix 写成完整 Cursor 替代品；它更适合占据窄而清楚的 DeepSeek-native 路线。",
      "有用的对比是 terminal loop 和 agentic editor 的差异，而不是功能数量对打。",
    ],
    sections: [
      {
        heading: "先比较工作界面",
        body: [
          "Reasonix 从项目终端开始。页面应该解释 DeepSeek-backed coding loop 如何读取本地上下文、提出计划、执行命令、处理 tool call，并保持会话可复盘。",
          "Cursor 从另一个界面开始：AI coding editor 和 agent workspace。它的强项不只是 chat output，而是 agent 如何结合代码库上下文、rules、terminal commands、review、CLI、cloud agents 和团队流程工作。",
        ],
      },
      {
        heading: "什么时候 Reasonix 更合适",
        body: [
          "如果读者想要的是聚焦 DeepSeek 的路径，并且不希望整个编码环境迁到新 editor，Reasonix 更合适。",
          "这适合已经有固定编辑器配置、但想要一个 DeepSeek-native terminal agent 来做长时间 debug、refactor、来源核验和 cache-aware iteration 的开发者。",
        ],
        bullets: [
          "DeepSeek 后端行为是选型重点时，用 Reasonix。",
          "项目终端是自然控制点时，用 Reasonix。",
          "来源核验、本地 key 处理和 session replay 比 editor replacement 更重要时，用 Reasonix。",
        ],
      },
      {
        heading: "什么时候 Cursor 更合适",
        body: [
          "如果读者希望 editor 本身就是 agent workspace，Cursor 更合适。它的价值来自代码库理解、agent planning/building、terminal access、rules、review、cloud agents，以及围绕同一个开发环境的多入口能力。",
          "对于已经标准化到 Cursor 的团队，Reasonix 应该被描述成更窄的 DeepSeek-native 路线，而不是声称要替代完整 editor workflow。",
        ],
        bullets: [
          "代码库索引和 editor-native workflow 是核心时，用 Cursor。",
          "agent、review、CLI、cloud work 和 rules 需要在一个 workspace 里时，用 Cursor。",
          "团队想要统一 AI editor 标准，而不是终端特定 DeepSeek 工具时，用 Cursor。",
        ],
      },
      {
        heading: "判断清单",
        body: [
          "正确的问题是：开发者一天主要待在哪里？现有编辑器加 DeepSeek terminal agent，还是进入以代码库上下文和 review 为中心的 agentic editor？",
          "这个框架更可信：Reasonix 负责 DeepSeek terminal loop，Cursor 负责更宽的 editor-centered workflow。",
        ],
        bullets: [
          "Surface：terminal loop 还是 editor workspace？",
          "Backend：DeepSeek-first，还是 Cursor 里的模型/工具选择？",
          "Context：显式本地会话状态，还是 editor-level codebase indexing？",
          "Team fit：轻量聚焦 CLI 路线，还是共享 AI editor workflow？",
        ],
      },
    ],
  },
  {
    ...enArticles[10],
    title: "Reasonix vs GitHub Copilot：DeepSeek 终端循环还是 Copilot coding agent？",
    description:
      "面向 `reasonix vs github copilot` 的聚焦对比：覆盖 DeepSeek-native 本地会话、IDE 辅助、Copilot cloud agent、GitHub PR 流程、MCP 和团队治理。",
    eyebrow: "GitHub Copilot 对比",
    tags: ["Reasonix", "GitHub Copilot", "DeepSeek", "对比"],
    summary:
      "Reasonix vs GitHub Copilot 要区分两个搜索意图：Reasonix 是 DeepSeek-native 本地终端循环；GitHub Copilot 覆盖 IDE 辅助、GitHub-hosted cloud agent、pull request、custom agents、MCP 和组织控制。",
    takeaways: [
      "如果读者想从本地项目终端启动 DeepSeek-first coding，优先看 Reasonix。",
      "如果团队需要 IDE help、GitHub issue-to-branch、PR review、cloud agent sessions 和 GitHub-native governance，GitHub Copilot 更自然。",
      "不要把 GitHub Copilot 混成泛化的 Microsoft Copilot；这个页面吃的是 coding-agent 搜索意图。",
      "最强对比是本地 DeepSeek 终端工作 vs GitHub-centered development workflow。",
    ],
    sections: [
      {
        heading: "先说清楚是哪一个 Copilot",
        body: [
          "这个关键词里相关的微软系工具是 GitHub Copilot，不是 Microsoft 365 Copilot。搜索意图是 coding assistance 和 coding-agent workflow，不是办公文档生成。",
          "这点很重要，因为 GitHub Copilot 已经不只是 autocomplete：documentation、IDE workflows、cloud agent sessions、custom agents、MCP、pull-request review 和 organization policy 都应该进入对比。",
        ],
      },
      {
        heading: "什么时候 Reasonix 更合适",
        body: [
          "如果搜索者明确要找 DeepSeek-native coding path，并且希望从本地仓库终端启动工作，Reasonix 更合适。",
          "页面应该把这个读者导向官方来源核验、本地 DeepSeek key setup、`npx reasonix code`，以及对命令、编辑、replay、cache behavior 和长会话 compaction 的审查。",
        ],
        bullets: [
          "希望模型后端是 DeepSeek 时，用 Reasonix。",
          "工作流要保持 local 和 terminal-first 时，用 Reasonix。",
          "cache-aware 长会话比 GitHub-native automation 更重要时，用 Reasonix。",
        ],
      },
      {
        heading: "什么时候 GitHub Copilot 更合适",
        body: [
          "如果团队希望辅助直接进入 IDE 和 GitHub 工作流，尤其是 issues、branches、pull requests、review、repository policy 和组织权限本来就在 GitHub 里，GitHub Copilot 更合适。",
          "Copilot cloud agent 也是另一种工作形态：它可以在 GitHub-hosted environment 里处理仓库任务、创建 branch，并留下改动供 review。这对 GitHub-native delegation 更强，但不是 DeepSeek-specific local loop。",
        ],
        bullets: [
          "IDE assistance 和 GitHub PR flow 是重点时，用 GitHub Copilot。",
          "cloud agent sessions 需要从 issue、branch 或 GitHub prompt 启动时，用 GitHub Copilot。",
          "组织策略和 GitHub-native governance 决定工具选型时，用 GitHub Copilot。",
        ],
      },
      {
        heading: "判断清单",
        body: [
          "严肃对比应该问：任务应该在开发者旁边的本地终端发生，还是在 GitHub 开发系统里发生？",
          "这能避免把 Copilot 弱化成只有 autocomplete，也能让 Reasonix 保持诚实：Reasonix 的 DeepSeek-native terminal lane 更清楚，GitHub Copilot 的 GitHub workflow lane 更宽。",
        ],
        bullets: [
          "Backend：DeepSeek-first，还是 GitHub/OpenAI/Microsoft Copilot stack？",
          "Surface：本地终端会话，还是 IDE + GitHub cloud agent？",
          "Review：Reasonix replay 和本地 diff，还是 GitHub branch 和 PR review？",
          "Governance：本地来源/key 核验，还是 GitHub organization controls？",
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
    title: "Reasonix vs Claude Code：DeepSeek-native agent workflow 對比",
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
  {
    ...zhCnArticles[6],
    title: "Reasonix GitHub repository：clone 或下載前先核驗什麼",
    description:
      "面向 `reasonix github repository` 搜尋意圖的實用文章：解釋官方 repo、預設分支、releases、commits、issues、npm package，以及下載或原始碼檢查前該核驗哪些點。",
  },
  {
    ...zhCnArticles[7],
    title: "Reasonix vs Claude Code：怎麼選更適合的 coding loop",
    description:
      "面向 `reasonix vs claude code` 的聚焦對比：解釋 DeepSeek-first 工作流、快取行為、權限、MCP、上手路徑，以及本機編碼會話的選型規則。",
  },
  {
    ...zhCnArticles[8],
    title: "Reasonix vs Codex：DeepSeek-native loop 還是 OpenAI coding agent？",
    description:
      "面向 `reasonix vs codex` 的聚焦對比：解釋 Reasonix 的 DeepSeek-native 本機終端工作流，以及 Codex 的 App、CLI、IDE、雲端、多 agent 和 OpenAI 體系能力。",
  },
  {
    ...zhCnArticles[9],
    title: "Reasonix vs Cursor：終端 DeepSeek 工作流還是 agentic editor？",
    description:
      "面向 `reasonix vs cursor` 的聚焦對比：覆蓋 DeepSeek-native 終端工作、Cursor 的 agentic editor / cloud surfaces、程式碼庫上下文、rules、MCP、review 和團隊流程。",
  },
  {
    ...zhCnArticles[10],
    title:
      "Reasonix vs GitHub Copilot：DeepSeek 終端循環還是 Copilot coding agent？",
    description:
      "面向 `reasonix vs github copilot` 的聚焦對比：覆蓋 DeepSeek-native 本機會話、IDE 輔助、Copilot cloud agent、GitHub PR 流程、MCP 和團隊治理。",
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
      "Reasonix vs Claude Code: DeepSeek-native agent workflow comparison",
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
  {
    ...enArticles[6],
    title:
      "Reasonix GitHub repository: что проверить перед clone или download",
    description:
      "Практический гид по keyword `reasonix github repository`: официальный repo, default branch, releases, commits, issues, npm package и проверки перед source build или download.",
  },
  {
    ...enArticles[7],
    title:
      "Reasonix vs Claude Code: как выбрать более подходящий coding loop",
    description:
      "Сфокусированное сравнение Reasonix и Claude Code: DeepSeek-first workflow, cache behavior, permissions, MCP, setup path и rule выбора для local coding sessions.",
  },
  {
    ...enArticles[8],
    title:
      "Reasonix vs Codex: DeepSeek-native loop или OpenAI coding agent?",
    description:
      "Сфокусированное сравнение Reasonix и Codex: DeepSeek-native local terminal workflow против Codex app, CLI, IDE, cloud, multi-agent и OpenAI workflow surfaces.",
  },
  {
    ...enArticles[9],
    title:
      "Reasonix vs Cursor: terminal DeepSeek workflow или agentic editor?",
    description:
      "Сравнение Reasonix и Cursor: DeepSeek-native terminal work, Cursor agentic editor, cloud surfaces, codebase context, rules, MCP, review и team workflows.",
  },
  {
    ...enArticles[10],
    title:
      "Reasonix vs GitHub Copilot: DeepSeek terminal loop или Copilot coding agent?",
    description:
      "Сравнение Reasonix и GitHub Copilot: DeepSeek-native local sessions, IDE assistance, Copilot cloud agent, GitHub pull-request workflows, MCP и team governance.",
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
