import Link from "next/link";
import Image from "next/image";
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
import { GiscusComments } from "@/components/GiscusComments";
import { LoginExplainer } from "@/components/LoginExplainer";
import { getArticle, getArticles } from "@/lib/articles";
import { GISCUS, getContent, SITE } from "@/lib/content";
import { localizePath, normalizePath, type Locale } from "@/lib/i18n";

type LocalizedPageProps = {
  locale: Locale;
};

type ArticlePageProps = LocalizedPageProps & {
  slug: string;
};

const giscusEnvVars = [
  "NEXT_PUBLIC_GISCUS_REPO",
  "NEXT_PUBLIC_GISCUS_REPO_ID",
  "NEXT_PUBLIC_GISCUS_CATEGORY",
  "NEXT_PUBLIC_GISCUS_CATEGORY_ID",
] as const;

function getCommentPrivacyCopy(locale: Locale) {
  if (locale === "zh-cn") {
    return {
      commitment:
        "文章评论由 GitHub/giscus OAuth 与 GitHub Discussions 承载；本站不保存评论账号资料或评论正文。",
      cardTitle: "评论数据",
      cardBody:
        "文章评论由 GitHub Discussions 保存和审核。本站只嵌入 giscus 评论组件，不自建用户表、评论表、私信或通知系统。",
      checklist:
        "使用文章评论时，确认你是在 GitHub/giscus OAuth 流程中授权，不要把 GitHub 密码或任何 API Key 输入到本站页面。",
    };
  }

  if (locale === "zh-tw") {
    return {
      commitment:
        "文章留言由 GitHub/giscus OAuth 與 GitHub Discussions 承載；本站不保存留言帳號資料或留言正文。",
      cardTitle: "留言資料",
      cardBody:
        "文章留言由 GitHub Discussions 保存和審核。本站只嵌入 giscus 留言元件，不自建使用者表、留言表、私訊或通知系統。",
      checklist:
        "使用文章留言時，確認你是在 GitHub/giscus OAuth 流程中授權，不要把 GitHub 密碼或任何 API Key 輸入到本站頁面。",
    };
  }

  if (locale === "ru") {
    return {
      commitment:
        "Комментарии к статьям обслуживаются GitHub/giscus OAuth и GitHub Discussions; сайт не хранит аккаунты комментариев или их текст.",
      cardTitle: "Данные комментариев",
      cardBody:
        "Комментарии сохраняются и модерируются в GitHub Discussions. Сайт только встраивает giscus и не ведет собственные таблицы пользователей, комментариев, сообщений или уведомлений.",
      checklist:
        "При комментировании проверяйте, что авторизация идет через GitHub/giscus OAuth, и не вводите пароль GitHub или API keys на этом сайте.",
    };
  }

  return {
    commitment:
      "Article comments are carried by GitHub/giscus OAuth and GitHub Discussions; this site does not store comment account data or comment bodies.",
    cardTitle: "Comment data",
    cardBody:
      "Article comments are stored and moderated in GitHub Discussions. This site only embeds giscus and does not run its own user table, comment table, private messages, or notifications.",
    checklist:
      "When using article comments, confirm that authorization happens through GitHub/giscus OAuth, and do not enter GitHub passwords or API keys on this site.",
  };
}

export function HomePage({ locale }: LocalizedPageProps) {
  const content = getContent(locale);
  const articles = getArticles(locale);
  const page = content.pages.home;

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            {page.eyebrow}
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {content.site.slogan}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={localizePath(locale, "/github")}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
            >
              {page.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={localizePath(locale, "/errors")}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
            >
              {page.secondaryCta}
              <Terminal className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <Image
              src="/reasonix-logo.svg"
              alt="Reasonix Watch logo"
              width={220}
              height={55}
              className="h-12 w-auto"
              priority
            />
            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
              main-v2
            </span>
          </div>
          <div className="mt-5 rounded-lg bg-slate-950 p-4 text-sm text-slate-100">
            <p className="font-mono text-emerald-300">$ npx reasonix code</p>
            <p className="mt-3 text-slate-300">{page.terminalNote}</p>
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-3">
            {content.projectStats.map((stat) => (
              <div key={stat.label} className="rounded-lg bg-slate-50 p-3">
                <dt className="text-xs text-slate-500">{stat.label}</dt>
                <dd className="mt-1 text-lg font-semibold text-slate-950">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {content.quickFacts.map((fact) => (
          <article
            key={fact.label}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">{fact.label}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              {fact.value}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {fact.detail}
            </p>
          </article>
        ))}
      </section>

      <section>
        <div className="mb-5 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-emerald-800" aria-hidden="true" />
          <h2 className="text-2xl font-semibold text-slate-950">
            {page.articlesTitle}
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {articles.slice(0, 4).map((article) => (
            <Link
              key={article.slug}
              href={localizePath(locale, `/articles/${article.slug}`)}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300"
            >
              <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-900">
                {article.eyebrow}
              </span>
              <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-950">
                {article.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {article.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900">
                {page.articleReadLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-emerald-800" aria-hidden="true" />
          <h2 className="text-2xl font-semibold text-slate-950">
            {page.sectionsTitle}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {content.downloadOptions.map((option) => (
            <a
              key={option.title}
              href={option.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300"
            >
              <span className="rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-900">
                {option.tag}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-950">
                {option.title}
              </h3>
              <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs leading-5 text-emerald-200">
                {option.command}
              </pre>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {option.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center gap-2">
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

      <section className="grid gap-4 md:grid-cols-4">
        {content.featureBlocks.map((feature) => (
          <article
            key={feature.title}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-base font-semibold text-slate-950">
              {feature.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {feature.body}
            </p>
          </article>
        ))}
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
                  <th className="px-4 py-3 font-semibold">Redux</th>
                  <th className="px-4 py-3 font-semibold">Claude Code</th>
                  <th className="px-4 py-3 font-semibold">Codex</th>
                  <th className="px-4 py-3 font-semibold">OpenCode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {article.comparison.map((row) => (
                  <tr key={row.dimension} className="align-top">
                    <th className="px-4 py-4 font-semibold text-slate-900">
                      {row.dimension}
                    </th>
                    <td className="px-4 py-4 leading-6 text-slate-600">
                      {row.redux}
                    </td>
                    <td className="px-4 py-4 leading-6 text-slate-600">
                      {row.claude}
                    </td>
                    <td className="px-4 py-4 leading-6 text-slate-600">
                      {row.codex}
                    </td>
                    <td className="px-4 py-4 leading-6 text-slate-600">
                      {row.opencode}
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

      <GiscusComments />
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
          <a
            key={option.title}
            href={option.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                {option.tag}
              </span>
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-950">
              {option.title}
            </h2>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-5 text-emerald-200">
              {option.command}
            </pre>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {option.description}
            </p>
          </a>
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
  const content = getContent(locale);
  const page = content.pages.community;
  const isGiscusConfigured = [
    GISCUS.repo,
    GISCUS.repoId,
    GISCUS.category,
    GISCUS.categoryId,
  ].every(Boolean);
  const discussionsHref = GISCUS.repo
    ? `https://github.com/${GISCUS.repo}/discussions`
    : null;

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
          {page.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {discussionsHref ? (
            <a
              href={discussionsHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
            >
              {page.discussionsCta}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : null}
          <Link
            href={localizePath(locale, "/articles")}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
          >
            {page.commentsCta}
            <GitBranch className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {content.communitySteps.map((step) => (
          <article
            key={step.title}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-950">
              {step.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{step.body}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            {page.rulesTitle}
          </h2>
          <ul className="mt-5 space-y-3">
            {content.communityRules.map((rule) => (
              <li key={rule} className="flex gap-3">
                <ShieldCheck
                  className="mt-1 h-5 w-5 shrink-0 text-emerald-800"
                  aria-hidden="true"
                />
                <span className="text-sm leading-7 text-slate-700">
                  {rule}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-xl font-semibold text-amber-950">
            {page.configTitle}
          </h2>
          <p className="mt-3 text-sm leading-6 text-amber-900">
            {page.configBodyBeforeRepo}{" "}
            <span className="font-semibold">{GISCUS.recommendedRepo}</span>{" "}
            {page.configBodyAfterRepo}
          </p>
          <div className="mt-5 rounded-lg bg-white/75 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-slate-950">
                {page.statusLabel}
              </span>
              <span
                className={[
                  "rounded-md px-2 py-1 text-xs font-semibold",
                  isGiscusConfigured
                    ? "bg-emerald-100 text-emerald-900"
                    : "bg-slate-100 text-slate-600",
                ].join(" ")}
              >
                {isGiscusConfigured ? page.configuredLabel : page.pendingLabel}
              </span>
            </div>
            <ul className="mt-4 space-y-2">
              {giscusEnvVars.map((name) => (
                <li
                  key={name}
                  className="rounded-md bg-slate-950 px-3 py-2 font-mono text-xs text-emerald-200"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <a
            href="https://giscus.app/"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-amber-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800"
          >
            {page.configuratorLabel}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
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
