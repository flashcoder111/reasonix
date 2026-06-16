"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { localizePath, type Locale } from "@/lib/i18n";

export type ArticleCarouselItem = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  date: string;
  readTime: string;
};

type ArticleCarouselProps = {
  locale: Locale;
  articles: ReadonlyArray<ArticleCarouselItem>;
  readLabel: string;
};

function getControlLabels(locale: Locale) {
  if (locale === "zh-cn") {
    return {
      previous: "上一篇深度文章",
      next: "下一篇深度文章",
      list: "深度文章轮播",
    };
  }

  if (locale === "zh-tw") {
    return {
      previous: "上一篇深度文章",
      next: "下一篇深度文章",
      list: "深度文章輪播",
    };
  }

  if (locale === "ru") {
    return {
      previous: "Previous deep-dive article",
      next: "Next deep-dive article",
      list: "Deep-dive article carousel",
    };
  }

  return {
    previous: "Previous deep-dive article",
    next: "Next deep-dive article",
    list: "Deep-dive article carousel",
  };
}

export function ArticleCarousel({
  locale,
  articles,
  readLabel,
}: ArticleCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const labels = getControlLabels(locale);

  const scroll = useCallback((direction: -1 | 1) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const firstCard = viewport.querySelector<HTMLElement>(
      "[data-article-card]",
    );
    const step = firstCard ? firstCard.offsetWidth + 24 : viewport.clientWidth;

    viewport.scrollBy({
      left: direction * step,
      behavior: "smooth",
    });
  }, []);

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {articles.length > 1 ? (
        <div className="mb-4 flex justify-end gap-2">
          <button
            type="button"
            data-testid="article-carousel-prev"
            aria-label={labels.previous}
            onClick={() => scroll(-1)}
            className="rx-glass inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-white/70 hover:text-sky-800"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            data-testid="article-carousel-next"
            aria-label={labels.next}
            onClick={() => scroll(1)}
            className="rx-glass inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-white/70 hover:text-sky-800"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      <div
        ref={viewportRef}
        data-testid="article-carousel"
        aria-label={labels.list}
        className="article-carousel-scroll -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 pt-1 sm:-mx-6 sm:gap-6 sm:px-6"
      >
        {articles.map((article, index) => (
          <Link
            key={article.slug}
            href={localizePath(locale, `/articles/${article.slug}`)}
            data-article-card
            className="rx-glass-strong group flex min-h-[19rem] w-[min(88vw,33rem)] shrink-0 snap-start flex-col justify-between rounded-[1.75rem] p-6 transition hover:-translate-y-1 hover:bg-white/70 sm:min-h-[21rem] sm:w-[31rem] sm:p-7 lg:w-[33rem]"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-semibold uppercase tracking-normal text-slate-400">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span aria-hidden="true">/</span>
                <span className="text-sky-700">{article.eyebrow}</span>
              </div>
              <h3 className="article-carousel-title mt-7 text-xl font-semibold leading-tight text-slate-950 sm:text-2xl">
                {article.title}
              </h3>
              <p className="article-carousel-description mt-5 text-sm leading-7 text-slate-600">
                {article.description}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {article.date}
                <span aria-hidden="true">/</span>
                {article.readTime}
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-800">
                {readLabel}
                <ArrowRight
                  className="h-4 w-4 transition group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
