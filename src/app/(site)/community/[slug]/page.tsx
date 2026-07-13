import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommunityQuestionPageContent } from "@/components/LocalizedPages";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import {
  getCommunityQuestionRouteMetadata,
  getNoindexRouteMetadata,
  isCanonicalCommunityQuestionLocale,
} from "@/lib/routes";
import {
  communityDataErrorToApiError,
  getCommunityQuestionDetail,
  getCommunityRequestUser,
} from "@/lib/community-server";

type CommunityQuestionPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: CommunityQuestionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getCommunityQuestionDetail(slug);

  if (!result.ok) {
    return getNoindexRouteMetadata();
  }

  if (!isCanonicalCommunityQuestionLocale(DEFAULT_LOCALE, result.data.data.question)) {
    return getNoindexRouteMetadata();
  }

  return getCommunityQuestionRouteMetadata(
    DEFAULT_LOCALE,
    result.data.data.question,
  );
}

export default async function Page({ params }: CommunityQuestionPageProps) {
  const { slug } = await params;
  const viewer = await getCommunityRequestUser();
  const result = await getCommunityQuestionDetail(slug, viewer);

  if (!result.ok && result.error.code === "not_found") {
    notFound();
  }

  return (
    <CommunityQuestionPageContent
      locale={DEFAULT_LOCALE}
      slug={slug}
      initialDetail={result.ok ? result.data : null}
      initialError={result.ok ? null : communityDataErrorToApiError(result.error)}
    />
  );
}
