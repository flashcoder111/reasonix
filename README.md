# Reasonix

Reasonix is a Chinese information site for Reasonix, built with Next.js App Router, TypeScript, Tailwind CSS, and lucide-react.

## Pages

- `/` — homepage with Reasonix snapshot, news, downloads, and article links
- `/articles` — deep comparison articles
- `/articles/[slug]` — static article detail pages
- `/login`, `/community`, `/community/new`, `/faq`, `/github`, `/errors`, `/deepseek`, `/news`
- `/about`, `/contact`, `/terms`, `/privacy`, `/privacy-protection` — AdSense trust pages, legal terms, privacy agreement, safeguards, and official account verification

## Local development

```bash
npm run dev
```

Open `http://localhost:3000`.

The production canonical host is `https://www.deepseekreasonix.com`. Keep
`NEXT_PUBLIC_SITE_URL` aligned with that host unless DNS and TLS for the apex
domain are fully configured.

GA4 is enabled through the Google tag in the root layout. The default
measurement ID is `G-TE1DZDDZYC`; set `NEXT_PUBLIC_GA_MEASUREMENT_ID` if the
property changes.

## Community Q&A

The community page is a site-owned Q&A board. Clerk handles the site session, while Supabase Postgres stores public questions and replies.

Apply `supabase/migrations/202606030001_create_community_questions.sql`, then set:

```bash
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
COMMUNITY_ADMIN_CLERK_IDS=
```

If Supabase is not configured, community pages render a safe setup notice instead of accepting posts.

## IndexNow

Daily IndexNow submission runs from `.github/workflows/indexnow.yml` at 08:30 Asia/Shanghai. It reads the live sitemap, selects URLs with recent `lastmod` values, verifies the public key file, and submits the selected URLs to `https://api.indexnow.org/indexnow`.

Set the same key in both places:

```bash
INDEXNOW_KEY=
```

- Vercel project environment: powers `https://www.deepseekreasonix.com/indexnow-key.txt`
- GitHub repository secret: powers the scheduled `npm run indexnow:submit` workflow

Useful manual checks:

```bash
INDEXNOW_KEY=your-key npm run indexnow:submit -- --dry-run
INDEXNOW_KEY=your-key npm run indexnow:submit -- --all
```

## Content sources

- GitHub repo: `https://github.com/esengine/DeepSeek-Reasonix`
- DeepSeek guide: `https://github.com/deepseek-ai/awesome-deepseek-agent/blob/main/docs/reasonix.md`
- npm package: `https://www.npmjs.com/package/reasonix`
- GitHub release: `https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v0.53.0`
- Claude Code docs: `https://docs.anthropic.com/en/docs/claude-code/overview`
- OpenAI Codex: `https://openai.com/codex/`
- OpenCode docs: `https://opencode.ai/docs`
- Official account references: `https://github.com/esengine/DeepSeek-Reasonix`, `https://x.com/DS_reasonix`, `https://github.com/deepseek-ai`, `https://x.com/deepseek_ai`

The content snapshot was checked on `2026-06-02`.

## Deployment note

The Vercel CLI is not installed in this environment. Install it before deployment workflows:

```bash
npm i -g vercel
```

That unlocks commands such as `vercel env pull`, `vercel deploy`, and `vercel logs`.
