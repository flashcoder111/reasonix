import type { Metadata } from "next";
import { CommunityPageContent } from "@/components/LocalizedPages";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";
import {
  communityDataErrorToApiError,
  getCommunityQuestionList,
} from "@/lib/community-server";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return getRouteMetadata(DEFAULT_LOCALE, "/community");
}

export default async function Page() {
  const result = await getCommunityQuestionList();

  return (
    <CommunityPageContent
      locale={DEFAULT_LOCALE}
      initialResponse={result.ok ? result.data : null}
      initialError={result.ok ? null : communityDataErrorToApiError(result.error)}
    />
  );
}
