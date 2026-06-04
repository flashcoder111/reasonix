import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
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
import { ArticleDiscussionLink } from "@/components/ArticleDiscussionLink";
import { CommunityBoard } from "@/components/CommunityBoard";
import { CommunityQuestionDetail } from "@/components/CommunityQuestionDetail";
import { CommunityQuestionForm } from "@/components/CommunityQuestionForm";
import { CopyCommandBlock } from "@/components/CopyCommandBlock";
import { LoginExplainer } from "@/components/LoginExplainer";
import { getArticle, getArticles } from "@/lib/articles";
import { getContent, getSeoLandingPage, SITE } from "@/lib/content";
import { localizePath, normalizePath, type Locale } from "@/lib/i18n";

type LocalizedPageProps = {
  locale: Locale;
};

type ArticlePageProps = LocalizedPageProps & {
  slug: string;
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

function SeoLandingLinks({
  locale,
  eyebrow,
  title,
  description,
  currentPath,
}: LocalizedPageProps & {
  eyebrow: string;
  title: string;
  description: string;
  currentPath?: string;
}) {
  const content = getContent(locale);
  const pages = content.seoLandingPages.filter(
    (page) => page.path !== currentPath,
  );

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-normal text-emerald-800">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {pages.map((page) => (
          <Link
            key={page.path}
            href={localizePath(locale, page.path)}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white"
          >
            <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-900">
              {page.primaryKeyword}
            </span>
            <h3 className="mt-3 text-base font-semibold leading-6 text-slate-950">
              {page.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {page.metaDescription}
            </p>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900">
              {page.eyebrow}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function HomePage({ locale }: LocalizedPageProps) {
  const content = getContent(locale);
  const articles = getArticles(locale);
  const page = content.pages.home;
  const featureIcons = [
    BadgeCheck,
    Terminal,
    ShieldCheck,
    GitBranch,
    GitFork,
    Clock3,
  ] as const;

  return (
    <div className="-mx-4 -my-6 bg-white text-slate-950 sm:-mx-6 lg:-mx-10 lg:-my-10">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pb-12 pt-10 text-center sm:px-6 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
            <BadgeCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{page.eyebrow}</span>
          </div>

          <h1 className="max-w-5xl text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
            Reasonix
          </h1>

          <p className="mt-4 text-lg font-medium leading-8 text-emerald-900 sm:text-2xl">
            {page.title}
          </p>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            {content.site.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {page.primaryCta}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href={localizePath(locale, "/errors")}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
            >
              {page.secondaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid w-full gap-4 text-left lg:grid-cols-[1fr_360px] lg:items-stretch">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Terminal
                  className="h-4 w-4 text-emerald-800"
                  aria-hidden="true"
                />
                {content.quickFacts[2]?.label}
              </div>
              <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm leading-7 text-emerald-200">
                {
                  "cd /path/to/your-project\nnpx reasonix code\n# inside the TUI: /pro, /plan, /skill, /mcp"
                }
              </pre>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {page.terminalNote}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              {content.projectStats.map((stat) => (
                <div key={stat.label} className="rounded-lg bg-slate-50 p-3">
                  <dt className="text-xs text-slate-500">{stat.label}</dt>
                  <dd className="mt-1 text-lg font-semibold text-slate-950">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-xs text-slate-500">{stat.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-normal text-emerald-800">
              {page.sectionsTitle}
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              {content.site.slogan}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              {content.site.contentPrinciplesBody}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {content.featureBlocks.map((feature, index) => {
              const FeatureIcon = featureIcons[index % featureIcons.length];

              return (
                <article
                  key={feature.title}
                  className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100">
                      <FeatureIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-base font-semibold leading-6 text-slate-950">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-5 text-slate-600">
                    {feature.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:pb-16">
        <SeoLandingLinks
          locale={locale}
          eyebrow={page.seoClusterEyebrow}
          title={page.seoClusterTitle}
          description={page.seoClusterDescription}
        />
      </section>

      <section className="border-y border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-normal text-emerald-300">
                {page.articlesTitle}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                {content.pages.articles.title}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-300">
              {content.pages.articles.description}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {articles.slice(0, 4).map((article) => (
              <Link
                key={article.slug}
                href={localizePath(locale, `/articles/${article.slug}`)}
                className="rounded-lg border border-slate-700 bg-slate-900 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-slate-900/80"
              >
                <span className="rounded-md bg-emerald-300 px-2 py-1 text-xs font-semibold text-slate-950">
                  {article.eyebrow}
                </span>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-white">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {article.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
                  {page.articleReadLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="mb-8 flex items-center gap-2 sm:mb-10">
          <Newspaper className="h-5 w-5 text-emerald-800" aria-hidden="true" />
          <h2 className="text-2xl font-semibold text-slate-950">
            {page.latestNewsTitle}
          </h2>
        </div>
        <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white shadow-sm">
          {content.newsItems.slice(0, 3).map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="block p-5 transition hover:bg-slate-50"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                <span>{item.date}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-slate-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.body}
              </p>
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

  return (
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
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
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
  );
}

export function LoginPageContent({ locale }: LocalizedPageProps) {
  return <LoginExplainer locale={locale} />;
}

export function FaqPageContent({ locale }: LocalizedPageProps) {
  const content = getContent(locale);
  const page = content.pages.faq;

  return (
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
  );
}

export function GithubPageContent({ locale }: LocalizedPageProps) {
  const content = getContent(locale);
  const page = content.pages.github;

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

      <section className="grid gap-4 lg:grid-cols-3">
        {content.downloadOptions.map((option) => (
          <article
            key={option.title}
            className="flex flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                {option.tag}
              </span>
              <a
                href={option.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:border-emerald-300 hover:text-emerald-900"
                aria-label={option.title}
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-950">
              {option.title}
            </h2>
            <CopyCommandBlock command={option.command} locale={locale} />
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {option.description}
            </p>
          </article>
        ))}
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
          <a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="block p-5 transition hover:bg-slate-50"
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
          </a>
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

export function CommunityPageContent({ locale }: LocalizedPageProps) {
  return <CommunityBoard locale={locale} />;
}

export function CommunityNewPageContent({ locale }: LocalizedPageProps) {
  return <CommunityQuestionForm locale={locale} />;
}

export function CommunityQuestionPageContent({
  locale,
  slug,
}: ArticlePageProps) {
  return <CommunityQuestionDetail locale={locale} slug={slug} />;
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

  if (normalizedPath === "/privacy") {
    return <PrivacyPageContent locale={locale} />;
  }

  if (normalizedPath === "/privacy-protection") {
    return <PrivacyProtectionPageContent locale={locale} />;
  }

  notFound();
}
