import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommunityPageContent } from "@/components/LocalizedPages";
import {
  isNonDefaultLocale,
  type NonDefaultLocale,
} from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";
import {
  communityDataErrorToApiError,
  getCommunityQuestionList,
} from "@/lib/community-server";

type LocalizedCommunityPageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: LocalizedCommunityPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isNonDefaultLocale(locale)) {
    return {};
  }

  return getRouteMetadata(locale, "/community");
}

export default async function Page({ params }: LocalizedCommunityPageProps) {
  const { locale } = await params;

  if (!isNonDefaultLocale(locale)) {
    notFound();
  }

  const result = await getCommunityQuestionList();

  return (
    <CommunityPageContent
      locale={locale as NonDefaultLocale}
      initialResponse={result.ok ? result.data : null}
      initialError={result.ok ? null : communityDataErrorToApiError(result.error)}
    />
  );
}
