"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  DatabaseZap,
  MessageSquare,
  Search,
} from "lucide-react";
import {
  type CommunityApiError,
  type CommunityQuestionListResponse,
} from "@/lib/community";
import { communityCopy, formatCommunityDate } from "@/lib/community-copy";
import { localeConfig, localizePath, type Locale } from "@/lib/i18n";

type CommunityBoardProps = {
  locale: Locale;
};

type StatusFilter = "visible" | "hidden" | "all";

const statusFilters: StatusFilter[] = ["visible", "hidden", "all"];

export function CommunityBoard({ locale }: CommunityBoardProps) {
  const copy = communityCopy[locale];
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("visible");
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [response, setResponse] =
    useState<CommunityQuestionListResponse | null>(null);
  const [error, setError] = useState<CommunityApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useMemo(() => {
    const search = new URLSearchParams({
      page: String(page),
    });

    if (query) {
      search.set("q", query);
    }

    if (statusFilter !== "visible") {
      search.set("status", statusFilter);
    }

    return search;
  }, [page, query, statusFilter]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/community/questions?${params.toString()}`, {
      signal: controller.signal,
    })
      .then(async (result) => {
        const payload = await result.json();

        if (!result.ok) {
          setError(payload as CommunityApiError);
          setResponse(null);
          return;
        }

        setResponse(payload as CommunityQuestionListResponse);
        setError(null);
      })
      .catch((fetchError: unknown) => {
        if (
          fetchError instanceof DOMException &&
          fetchError.name === "AbortError"
        ) {
          return;
        }

        setError({
          error: {
            code: "network_error",
            message: "Unable to load community questions.",
          },
        });
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [params]);

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = queryInput.trim();

    if (nextQuery !== query || page !== 1) {
      setIsLoading(true);
    }

    setPage(1);
    setQuery(nextQuery);
  }

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          {copy.eyebrow}
        </div>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              {copy.description}
            </p>
          </div>
          <Link
            href={localizePath(locale, "/community/new")}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
          >
            {copy.newQuestion}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <form
          onSubmit={submitSearch}
          className="flex flex-col gap-3 md:flex-row md:items-center"
        >
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">{copy.searchPlaceholder}</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              value={queryInput}
              onChange={(event) => setQueryInput(event.target.value)}
              placeholder={copy.searchPlaceholder}
              className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-400"
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            {copy.searchButton}
          </button>
        </form>

        {response?.viewer.isAdmin ? (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap rounded-lg border border-slate-200 bg-slate-50 p-1">
              {statusFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    if (item !== statusFilter) {
                      setIsLoading(true);
                    }
                    setStatusFilter(item);
                    setPage(1);
                  }}
                  className={[
                    "rounded-md px-3 py-1.5 text-xs font-semibold transition",
                    item === statusFilter
                      ? "bg-slate-950 text-white"
                      : "text-slate-600 hover:bg-white hover:text-slate-950",
                  ].join(" ")}
                >
                  {item === "visible"
                    ? copy.visible
                    : item === "hidden"
                      ? copy.hidden
                      : copy.allStatuses}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <section>
        {isLoading ? (
          <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            {copy.loading}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
            <div className="flex gap-3">
              <DatabaseZap
                className="mt-0.5 h-5 w-5 shrink-0 text-amber-800"
                aria-hidden="true"
              />
              <div>
                <h2 className="text-lg font-semibold text-amber-950">
                  {error.error.code === "database_not_configured"
                    ? copy.databaseMissingTitle
                    : error.error.message}
                </h2>
                <p className="mt-2 text-sm leading-6 text-amber-900">
                  {error.error.code === "database_not_configured"
                    ? copy.databaseMissingBody
                    : copy.signInHint}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {!isLoading && !error && response?.data.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
              {copy.emptyTitle}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {copy.emptyBody}
            </p>
          </div>
        ) : null}

        {response?.data.length ? (
          <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white shadow-sm">
            {response.data.map((question) => (
              <Link
                key={question.id}
                href={localizePath(locale, `/community/${question.slug}`)}
                className="block p-5 transition hover:bg-slate-50"
              >
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
                <h2 className="mt-3 text-xl font-semibold text-slate-950">
                  {question.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                  {question.body}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900">
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  {question.replyCount} {copy.replies}
                </div>
              </Link>
            ))}
          </div>
        ) : null}

        {response && response.meta.totalPages > 1 ? (
          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              onMouseDown={() => setIsLoading(true)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>
            <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
              {response.meta.page} / {response.meta.totalPages}
            </span>
            <button
              type="button"
              disabled={page >= response.meta.totalPages}
              onClick={() =>
                setPage((current) =>
                  Math.min(response.meta.totalPages, current + 1),
                )
              }
              onMouseDown={() => setIsLoading(true)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
