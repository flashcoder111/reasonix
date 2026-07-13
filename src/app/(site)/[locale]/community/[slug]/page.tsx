import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommunityQuestionPageContent } from "@/components/LocalizedPages";
import {
  isNonDefaultLocale,
  type NonDefaultLocale,
} from "@/lib/i18n";
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

type LocalizedCommunityQuestionPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: LocalizedCommunityQuestionPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isNonDefaultLocale(locale)) {
    return {};
  }

  const result = await getCommunityQuestionDetail(slug);

  if (!result.ok) {
    return getNoindexRouteMetadata();
  }

  if (!isCanonicalCommunityQuestionLocale(locale, result.data.data.question)) {
    return getNoindexRouteMetadata();
  }

  return getCommunityQuestionRouteMetadata(locale, result.data.data.question);
}

export default async function Page({
  params,
}: LocalizedCommunityQuestionPageProps) {
  const { locale, slug } = await params;

  if (!isNonDefaultLocale(locale)) {
    notFound();
  }

  const viewer = await getCommunityRequestUser();
  const result = await getCommunityQuestionDetail(slug, viewer);

  if (!result.ok && result.error.code === "not_found") {
    notFound();
  }

  return (
    <CommunityQuestionPageContent
      locale={locale as NonDefaultLocale}
      slug={slug}
      initialDetail={result.ok ? result.data : null}
      initialError={result.ok ? null : communityDataErrorToApiError(result.error)}
    />
  );
}
