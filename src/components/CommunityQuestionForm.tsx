"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";
import {
  questionBodyLimits,
  questionTitleLimits,
  type CommunityApiError,
  type CommunityQuestion,
} from "@/lib/community";
import { communityCopy } from "@/lib/community-copy";
import { localeConfig, locales, localizePath, type Locale } from "@/lib/i18n";

type CommunityQuestionFormProps = {
  locale: Locale;
};

type CreateQuestionResponse = {
  data: CommunityQuestion;
};

export function CommunityQuestionForm({ locale }: CommunityQuestionFormProps) {
  const copy = communityCopy[locale];
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedLocale, setSelectedLocale] = useState<Locale>(locale);
  const [error, setError] = useState<CommunityApiError | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitQuestion(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await fetch("/api/community/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        locale: selectedLocale,
      }),
    });
    const payload = await result.json();

    setIsSubmitting(false);

    if (!result.ok) {
      setError(payload as CommunityApiError);
      return;
    }

    const question = (payload as CreateQuestionResponse).data;
    router.push(localizePath(locale, `/community/${question.slug}`));
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href={localizePath(locale, "/community")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 hover:text-emerald-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {copy.backToCommunity}
      </Link>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h1 className="text-2xl font-semibold text-slate-950">
          {copy.newQuestion}
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {copy.signInHint}
        </p>

        <form onSubmit={submitQuestion} className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">
              {copy.questionTitle}
            </span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              minLength={questionTitleLimits.min}
              maxLength={questionTitleLimits.max}
              required
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-emerald-400"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-800">
              {copy.questionBody}
            </span>
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              minLength={questionBodyLimits.min}
              maxLength={questionBodyLimits.max}
              required
              rows={10}
              className="mt-2 w-full resize-y rounded-lg border border-slate-200 px-3 py-3 text-sm leading-6 outline-none transition focus:border-emerald-400"
            />
          </label>

          <fieldset>
            <legend className="text-sm font-semibold text-slate-800">
              {copy.language}
            </legend>
            <div className="mt-2 flex flex-wrap rounded-lg border border-slate-200 bg-slate-50 p-1">
              {locales.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedLocale(item)}
                  className={[
                    "rounded-md px-3 py-1.5 text-xs font-semibold transition",
                    item === selectedLocale
                      ? "bg-emerald-950 text-white"
                      : "text-slate-600 hover:bg-white hover:text-slate-950",
                  ].join(" ")}
                >
                  {localeConfig[item].label}
                </button>
              ))}
            </div>
          </fieldset>

          {error ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              <p className="font-semibold">{error.error.message}</p>
              {error.error.details?.length ? (
                <ul className="mt-2 space-y-1">
                  {error.error.details.map((detail) => (
                    <li key={`${detail.field}-${detail.code}`}>
                      {detail.field}: {detail.message}
                    </li>
                  ))}
                </ul>
              ) : null}
              {error.error.code === "unauthorized" ? (
                <Link
                  href={localizePath(locale, "/login")}
                  className="mt-3 inline-flex rounded-lg bg-amber-900 px-3 py-2 font-semibold text-white"
                >
                  Login
                </Link>
              ) : null}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {copy.publish}
          </button>
        </form>
      </section>
    </div>
  );
}
