"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit3,
  MessageSquare,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import {
  questionBodyLimits,
  questionTitleLimits,
  replyBodyLimits,
  type CommunityApiError,
  type CommunityQuestion,
  type CommunityQuestionDetailResponse,
  type CommunityReply,
} from "@/lib/community";
import { communityCopy, formatCommunityDate } from "@/lib/community-copy";
import { localeConfig, locales, localizePath, type Locale } from "@/lib/i18n";

type CommunityQuestionDetailProps = {
  locale: Locale;
  slug: string;
};

export function CommunityQuestionDetail({
  locale,
  slug,
}: CommunityQuestionDetailProps) {
  const copy = communityCopy[locale];
  const router = useRouter();
  const [detail, setDetail] =
    useState<CommunityQuestionDetailResponse | null>(null);
  const [error, setError] = useState<CommunityApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadQuestion() {
    const result = await fetch(`/api/community/questions/${slug}`);
    const payload = await result.json();
    setIsLoading(false);

    if (!result.ok) {
      setError(payload as CommunityApiError);
      setDetail(null);
      return;
    }

    setDetail(payload as CommunityQuestionDetailResponse);
    setError(null);
  }

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/community/questions/${slug}`, {
      signal: controller.signal,
    })
      .then(async (result) => {
        const payload = await result.json();
        setIsLoading(false);

        if (!result.ok) {
          setError(payload as CommunityApiError);
          setDetail(null);
          return;
        }

        setDetail(payload as CommunityQuestionDetailResponse);
        setError(null);
      })
      .catch((fetchError: unknown) => {
        if (
          fetchError instanceof DOMException &&
          fetchError.name === "AbortError"
        ) {
          return;
        }

        setIsLoading(false);
        setError({
          error: {
            code: "network_error",
            message: "Unable to load community question.",
          },
        });
      });

    return () => controller.abort();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
        {copy.loading}
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          href={localizePath(locale, "/community")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 hover:text-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {copy.backToCommunity}
        </Link>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
          <h1 className="text-xl font-semibold text-amber-950">
            {error?.error.code === "database_not_configured"
              ? copy.databaseMissingTitle
              : copy.notFoundTitle}
          </h1>
          <p className="mt-2 text-sm leading-6 text-amber-900">
            {error?.error.code === "database_not_configured"
              ? copy.databaseMissingBody
              : copy.notFoundBody}
          </p>
        </div>
      </div>
    );
  }

  async function refreshAfterMutation() {
    await loadQuestion();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href={localizePath(locale, "/community")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 hover:text-emerald-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {copy.backToCommunity}
      </Link>

      <QuestionCard
        locale={locale}
        question={detail.data.question}
        onChanged={refreshAfterMutation}
        onDeleted={() => router.push(localizePath(locale, "/community"))}
      />

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-emerald-800" />
          <h2 className="text-xl font-semibold text-slate-950">
            {detail.data.replies.length} {copy.replies}
          </h2>
        </div>

        <div className="mt-5 space-y-4">
          {detail.data.replies.length ? (
            detail.data.replies.map((reply) => (
              <ReplyCard
                key={reply.id}
                locale={locale}
                reply={reply}
                onChanged={refreshAfterMutation}
              />
            ))
          ) : (
            <p className="text-sm leading-6 text-slate-500">{copy.noReplies}</p>
          )}
        </div>

        <ReplyForm
          locale={locale}
          questionId={detail.data.question.id}
          onCreated={refreshAfterMutation}
        />
      </section>
    </div>
  );
}

function QuestionCard({
  locale,
  question,
  onChanged,
  onDeleted,
}: {
  locale: Locale;
  question: CommunityQuestion;
  onChanged: () => Promise<void>;
  onDeleted: () => void;
}) {
  const copy = communityCopy[locale];
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(question.title);
  const [body, setBody] = useState(question.body);
  const [selectedLocale, setSelectedLocale] = useState<Locale>(question.locale);
  const [error, setError] = useState<CommunityApiError | null>(null);

  async function patchQuestion(payload: Record<string, unknown>) {
    setError(null);
    const result = await fetch(`/api/community/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const responsePayload = await result.json();

    if (!result.ok) {
      setError(responsePayload as CommunityApiError);
      return;
    }

    if (payload.action === "delete") {
      onDeleted();
      return;
    }

    setIsEditing(false);
    await onChanged();
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
        <span className="rounded-md bg-emerald-50 px-2 py-1 text-emerald-900">
          {localeConfig[question.locale].label}
        </span>
        {question.status !== "visible" ? (
          <span className="rounded-md bg-amber-100 px-2 py-1 text-amber-900">
            {question.status}
          </span>
        ) : null}
        <span>
          {copy.askedBy} {question.authorName}
        </span>
        <span>{formatCommunityDate(locale, question.createdAt)}</span>
      </div>

      {isEditing ? (
        <div className="mt-5 space-y-4">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            minLength={questionTitleLimits.min}
            maxLength={questionTitleLimits.max}
            className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-emerald-400"
          />
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            minLength={questionBodyLimits.min}
            maxLength={questionBodyLimits.max}
            rows={8}
            className="w-full resize-y rounded-lg border border-slate-200 px-3 py-3 text-sm leading-6 outline-none transition focus:border-emerald-400"
          />
          <div className="flex flex-wrap rounded-lg border border-slate-200 bg-slate-50 p-1">
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
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                void patchQuestion({
                  title,
                  body,
                  locale: selectedLocale,
                })
              }
              className="rounded-lg bg-emerald-950 px-3 py-2 text-sm font-semibold text-white"
            >
              {copy.save}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
            >
              {copy.cancel}
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
            {question.title}
          </h1>
          <p className="mt-4 whitespace-pre-wrap text-base leading-8 text-slate-700">
            {question.body}
          </p>
        </>
      )}

      {error ? (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          {error.error.message}
        </p>
      ) : null}

      {question.canEdit || question.canModerate ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {question.canEdit ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
            >
              <Edit3 className="h-4 w-4" aria-hidden="true" />
              {copy.edit}
            </button>
          ) : null}
          {question.canModerate && question.status === "visible" ? (
            <button
              type="button"
              onClick={() => void patchQuestion({ action: "hide" })}
              className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {copy.hide}
            </button>
          ) : null}
          {question.canModerate && question.status !== "visible" ? (
            <button
              type="button"
              onClick={() => void patchQuestion({ action: "restore" })}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {copy.restore}
            </button>
          ) : null}
          {question.canEdit || question.canModerate ? (
            <button
              type="button"
              onClick={() => void patchQuestion({ action: "delete" })}
              className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-900"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              {copy.delete}
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function ReplyCard({
  locale,
  reply,
  onChanged,
}: {
  locale: Locale;
  reply: CommunityReply;
  onChanged: () => Promise<void>;
}) {
  const copy = communityCopy[locale];
  const [isEditing, setIsEditing] = useState(false);
  const [body, setBody] = useState(reply.body);
  const [error, setError] = useState<CommunityApiError | null>(null);

  async function patchReply(payload: Record<string, unknown>) {
    setError(null);
    const result = await fetch(`/api/community/replies/${reply.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const responsePayload = await result.json();

    if (!result.ok) {
      setError(responsePayload as CommunityApiError);
      return;
    }

    setIsEditing(false);
    await onChanged();
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
        {reply.status !== "visible" ? (
          <span className="rounded-md bg-amber-100 px-2 py-1 text-amber-900">
            {reply.status}
          </span>
        ) : null}
        <span>{reply.authorName}</span>
        <span>{formatCommunityDate(locale, reply.createdAt)}</span>
      </div>

      {isEditing ? (
        <div className="mt-3 space-y-3">
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            minLength={replyBodyLimits.min}
            maxLength={replyBodyLimits.max}
            rows={5}
            className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm leading-6 outline-none transition focus:border-emerald-400"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void patchReply({ body })}
              className="rounded-lg bg-emerald-950 px-3 py-2 text-sm font-semibold text-white"
            >
              {copy.save}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
            >
              {copy.cancel}
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
          {reply.body}
        </p>
      )}

      {error ? (
        <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          {error.error.message}
        </p>
      ) : null}

      {reply.canEdit || reply.canModerate ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {reply.canEdit ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
            >
              <Edit3 className="h-4 w-4" aria-hidden="true" />
              {copy.edit}
            </button>
          ) : null}
          {reply.canModerate && reply.status === "visible" ? (
            <button
              type="button"
              onClick={() => void patchReply({ action: "hide" })}
              className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900"
            >
              {copy.hide}
            </button>
          ) : null}
          {reply.canModerate && reply.status !== "visible" ? (
            <button
              type="button"
              onClick={() => void patchReply({ action: "restore" })}
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900"
            >
              {copy.restore}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => void patchReply({ action: "delete" })}
            className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-900"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            {copy.delete}
          </button>
        </div>
      ) : null}
    </article>
  );
}

function ReplyForm({
  locale,
  questionId,
  onCreated,
}: {
  locale: Locale;
  questionId: string;
  onCreated: () => Promise<void>;
}) {
  const copy = communityCopy[locale];
  const [body, setBody] = useState("");
  const [error, setError] = useState<CommunityApiError | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitReply(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await fetch(`/api/community/questions/${questionId}/replies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body }),
    });
    const payload = await result.json();
    setIsSubmitting(false);

    if (!result.ok) {
      setError(payload as CommunityApiError);
      return;
    }

    setBody("");
    await onCreated();
  }

  return (
    <form onSubmit={submitReply} className="mt-6 border-t border-slate-200 pt-5">
      <label className="block">
        <span className="text-sm font-semibold text-slate-800">
          {copy.reply}
        </span>
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          minLength={replyBodyLimits.min}
          maxLength={replyBodyLimits.max}
          required
          rows={5}
          placeholder={copy.replyPlaceholder}
          className="mt-2 w-full resize-y rounded-lg border border-slate-200 px-3 py-3 text-sm leading-6 outline-none transition focus:border-emerald-400"
        />
      </label>
      {error ? (
        <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          {error.error.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-3 rounded-lg bg-emerald-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {copy.postReply}
      </button>
    </form>
  );
}
