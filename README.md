# Reasonix Watch

Reasonix Watch is a Chinese information site for Reasonix, built with Next.js App Router, TypeScript, Tailwind CSS, and lucide-react.

## Pages

- `/` — homepage with Reasonix snapshot, news, downloads, and article links
- `/articles` — deep comparison articles
- `/articles/[slug]` — static article detail pages
- `/login`, `/community`, `/faq`, `/github`, `/errors`, `/deepseek`, `/news`
- `/privacy`, `/privacy-protection` — privacy agreement, privacy safeguards, and official account verification

## Local development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Community comments

Article comments are powered by giscus and GitHub Discussions. The recommended setup is a separate public Discussions repository such as `reasonix-watch-community`.

Set these public environment variables when the giscus repository is ready:

```bash
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
```

If they are empty, article pages show a safe "comments coming soon" placeholder.

## Content sources

- GitHub repo: `https://github.com/esengine/DeepSeek-Reasonix`
- DeepSeek guide: `https://github.com/deepseek-ai/awesome-deepseek-agent/blob/main/docs/reasonix.md`
- npm package: `https://www.npmjs.com/package/reasonix`
- GitHub release: `https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v0.53.0`
- Redux docs: `https://redux.js.org/`
- Claude Code docs: `https://docs.anthropic.com/en/docs/claude-code/overview`
- OpenAI Codex: `https://openai.com/codex/`
- OpenCode docs: `https://opencode.ai/docs`
- Official account references: `https://github.com/deepseek-ai`, `https://x.com/deepseek_ai`, `https://github.com/reduxjs`, `https://github.com/anthropics`, `https://x.com/AnthropicAI`, `https://github.com/openai/codex`, `https://x.com/OpenAI`, `https://github.com/anomalyco/opencode`, `https://x.com/opencode`

The content snapshot was checked on `2026-06-02`.

## Deployment note

The Vercel CLI is not installed in this environment. Install it before deployment workflows:

```bash
npm i -g vercel
```

That unlocks commands such as `vercel env pull`, `vercel deploy`, and `vercel logs`.
