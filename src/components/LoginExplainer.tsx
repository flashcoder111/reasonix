import { KeyRound, LogIn, Settings, ShieldCheck } from "lucide-react";
import { ClerkSignInCard } from "@/components/ClerkSignInCard";
import { clerkAuthEnvVars, isClerkConfigured } from "@/lib/auth";
import { getContent, SITE } from "@/lib/content";
import { type Locale } from "@/lib/i18n";

type LoginExplainerProps = {
  locale: Locale;
};

const setupCopyByLocale = {
  en: {
    title: "Clerk is not configured yet",
    body: "Add the Clerk keys below to your local or deployment environment, then reload this page to show the hosted Clerk sign-in flow.",
    envTitle: "Required environment variables",
    dashboardLabel: "Open Clerk Dashboard",
    cliTitle: "CLI credentials stay separate",
    cliBody:
      "Reasonix CLI still uses your DeepSeek API key locally. Do not paste provider API keys into this account page.",
    apiKeyCaption:
      "Clerk authenticates the site account. API keys stay local.",
  },
  "zh-cn": {
    title: "Clerk 还没有配置",
    body: "把下面的 Clerk key 写入本地或部署环境后，刷新这个页面即可显示 Clerk 托管登录流程。",
    envTitle: "需要配置的环境变量",
    dashboardLabel: "打开 Clerk Dashboard",
    cliTitle: "CLI 凭证仍然分开",
    cliBody:
      "Reasonix CLI 仍然在本机使用你的 DeepSeek API Key。不要把模型服务商 API Key 粘贴到这个账号页面。",
    apiKeyCaption: "Clerk 只认证站内账号。API Key 仍然保存在本机。",
  },
  "zh-tw": {
    title: "Clerk 尚未設定",
    body: "將下面的 Clerk key 寫入本機或部署環境後，重新整理此頁即可顯示 Clerk 託管登入流程。",
    envTitle: "需要設定的環境變數",
    dashboardLabel: "開啟 Clerk Dashboard",
    cliTitle: "CLI 憑證仍然分開",
    cliBody:
      "Reasonix CLI 仍然在本機使用你的 DeepSeek API Key。不要把模型服務商 API Key 貼到這個帳號頁面。",
    apiKeyCaption: "Clerk 只認證站內帳號。API Key 仍然保存在本機。",
  },
  ru: {
    title: "Clerk еще не настроен",
    body: "Добавьте эти Clerk keys в локальное окружение или deployment env, затем обновите страницу, чтобы показать hosted Clerk sign-in flow.",
    envTitle: "Обязательные environment variables",
    dashboardLabel: "Открыть Clerk Dashboard",
    cliTitle: "CLI credentials остаются отдельно",
    cliBody:
      "Reasonix CLI по-прежнему использует ваш DeepSeek API key локально. Не вставляйте provider API keys на страницу аккаунта.",
    apiKeyCaption:
      "Clerk authenticates аккаунт сайта. API keys остаются локально.",
  },
} satisfies Record<
  Locale,
  {
    title: string;
    body: string;
    envTitle: string;
    dashboardLabel: string;
    cliTitle: string;
    cliBody: string;
    apiKeyCaption: string;
  }
>;

function ClerkSetupNotice({ locale }: LoginExplainerProps) {
  const copy = setupCopyByLocale[locale];

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
      <div className="flex items-start gap-3">
        <Settings
          className="mt-0.5 h-5 w-5 shrink-0 text-amber-800"
          aria-hidden="true"
        />
        <div>
          <h2 className="text-lg font-semibold text-amber-950">
            {copy.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-amber-900">{copy.body}</p>
          <div className="mt-5 rounded-lg border border-amber-200 bg-white/70 p-4">
            <h3 className="text-sm font-semibold text-amber-950">
              {copy.envTitle}
            </h3>
            <ul className="mt-3 space-y-2 text-sm font-medium text-amber-900">
              {clerkAuthEnvVars.map((name) => (
                <li key={name}>
                  <code>{name}</code>
                </li>
              ))}
            </ul>
          </div>
          <a
            href="https://dashboard.clerk.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-amber-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800"
          >
            {copy.dashboardLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

export function LoginExplainer({ locale }: LoginExplainerProps) {
  const content = getContent(locale);
  const page = content.pages.login;
  const setupCopy = setupCopyByLocale[locale];
  const hasClerkKeys = isClerkConfigured && Boolean(process.env.CLERK_SECRET_KEY);

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
          <LogIn className="h-4 w-4" aria-hidden="true" />
          {page.eyebrow}
        </div>
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {page.description}
        </p>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          {hasClerkKeys ? (
            <ClerkSignInCard locale={locale} />
          ) : (
            <ClerkSetupNotice locale={locale} />
          )}

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-emerald-900"
                aria-hidden="true"
              />
              <div>
                <h2 className="font-semibold text-emerald-950">
                  {setupCopy.cliTitle}
                </h2>
                <p className="mt-2 text-sm leading-6 text-emerald-900">
                  {setupCopy.cliBody}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-950 text-white">
              <KeyRound className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-slate-950">
                Reasonix / DeepSeek API Key
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {setupCopy.apiKeyCaption}
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {content.loginSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-950 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <h3 className="text-base font-semibold text-slate-950">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {step.body}
                </p>
                <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs leading-5 text-emerald-200">
                  {step.command}
                </pre>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-5">
        <div className="flex items-start gap-3">
          <KeyRound className="mt-0.5 h-5 w-5 shrink-0 text-amber-800" />
          <div>
            <h2 className="font-semibold text-amber-950">
              {page.safetyTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-amber-900">
              {page.safetyBodyBeforeLink}
              <a
                href={SITE.deepseekApiKeys}
                target="_blank"
                rel="noreferrer"
                className="ml-1 font-semibold underline underline-offset-4"
              >
                {page.safetyLinkLabel}
              </a>
              {page.safetyBodyAfterLink}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
