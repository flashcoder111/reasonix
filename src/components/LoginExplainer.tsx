import { Settings } from "lucide-react";
import { ClerkSignInCard } from "@/components/ClerkSignInCard";
import { clerkAuthEnvVars, isClerkConfigured } from "@/lib/auth";
import { type Locale } from "@/lib/i18n";

type LoginExplainerProps = {
  locale: Locale;
};

const setupCopyByLocale = {
  en: {
    title: "Clerk is not configured yet",
    body: "Add the Clerk keys below to your local or deployment environment, then reload this page.",
    envTitle: "Required environment variables",
  },
  "zh-cn": {
    title: "Clerk 还没有配置",
    body: "把下面的 Clerk key 写入本地或部署环境后，刷新这个页面即可。",
    envTitle: "需要配置的环境变量",
  },
  "zh-tw": {
    title: "Clerk 尚未設定",
    body: "將下面的 Clerk key 寫入本機或部署環境後，重新整理此頁即可。",
    envTitle: "需要設定的環境變數",
  },
  ru: {
    title: "Clerk еще не настроен",
    body: "Добавьте эти Clerk keys в локальное окружение или deployment env, затем обновите страницу.",
    envTitle: "Обязательные environment variables",
  },
} satisfies Record<
  Locale,
  {
    title: string;
    body: string;
    envTitle: string;
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
        </div>
      </div>
    </div>
  );
}

export function LoginExplainer({ locale }: LoginExplainerProps) {
  const hasClerkKeys = isClerkConfigured && Boolean(process.env.CLERK_SECRET_KEY);

  return (
    <div className="mx-auto w-full max-w-md py-8">
      {hasClerkKeys ? (
        <ClerkSignInCard locale={locale} />
      ) : (
        <ClerkSetupNotice locale={locale} />
      )}
    </div>
  );
}
