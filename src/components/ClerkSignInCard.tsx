"use client";

import { UserButton, SignIn, useUser } from "@clerk/nextjs";
import { CheckCircle2 } from "lucide-react";
import { localizePath, type Locale } from "@/lib/i18n";

type ClerkSignInCardProps = {
  locale: Locale;
};

const copyByLocale = {
  en: {
    loading: "Loading account session...",
    signedInTitle: "You are signed in",
    signedInBody: "Clerk is handling your Reasonix site session.",
  },
  "zh-cn": {
    loading: "正在加载账号会话...",
    signedInTitle: "你已登录",
    signedInBody: "Clerk 正在处理你的 Reasonix 站内会话。",
  },
  "zh-tw": {
    loading: "正在載入帳號會話...",
    signedInTitle: "你已登入",
    signedInBody: "Clerk 正在處理你的 Reasonix 站內會話。",
  },
  ru: {
    loading: "Загрузка сессии аккаунта...",
    signedInTitle: "Вы вошли",
    signedInBody: "Clerk обрабатывает вашу сессию сайта Reasonix.",
  },
} satisfies Record<
  Locale,
  {
    loading: string;
    signedInTitle: string;
    signedInBody: string;
  }
>;

export function ClerkSignInCard({ locale }: ClerkSignInCardProps) {
  const { isLoaded, isSignedIn } = useUser();
  const copy = copyByLocale[locale];
  const signInPath = localizePath(locale, "/login");
  const homePath = localizePath(locale, "/");

  if (!isLoaded) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="h-5 w-44 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 h-11 animate-pulse rounded-lg bg-slate-100" />
        <p className="mt-4 text-sm text-slate-500">{copy.loading}</p>
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2
            className="mt-0.5 h-5 w-5 shrink-0 text-emerald-900"
            aria-hidden="true"
          />
          <div>
            <h2 className="text-lg font-semibold text-emerald-950">
              {copy.signedInTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-emerald-900">
              {copy.signedInBody}
            </p>
            <div className="mt-5 inline-flex items-center rounded-lg border border-emerald-200 bg-white px-3 py-2">
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
      <SignIn
        routing="path"
        path={signInPath}
        signUpUrl={signInPath}
        fallbackRedirectUrl={homePath}
        signUpFallbackRedirectUrl={homePath}
        withSignUp
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "w-full border-0 shadow-none",
          },
        }}
      />
    </div>
  );
}
