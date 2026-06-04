import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { communityCopy } from "@/lib/community-copy";
import { localizePath, type Locale } from "@/lib/i18n";

type ArticleDiscussionLinkProps = {
  locale: Locale;
};

export function ArticleDiscussionLink({ locale }: ArticleDiscussionLinkProps) {
  const copy = communityCopy[locale];

  return (
    <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-sm font-medium text-emerald-900">
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            {copy.eyebrow}
          </div>
          <h2 className="mt-4 text-xl font-semibold text-emerald-950">
            {copy.articleDiscussionTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-900">
            {copy.articleDiscussionBody}
          </p>
        </div>
        <Link
          href={localizePath(locale, "/community")}
          className="inline-flex w-fit items-center rounded-lg bg-emerald-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
        >
          {copy.articleDiscussionCta}
        </Link>
      </div>
    </section>
  );
}
