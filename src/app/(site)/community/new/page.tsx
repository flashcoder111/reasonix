import type { Metadata } from "next";
import { CommunityNewPageContent } from "@/components/LocalizedPages";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";

export function generateMetadata(): Metadata {
  return getRouteMetadata(DEFAULT_LOCALE, "/community/new");
}

export default function Page() {
  return <CommunityNewPageContent locale={DEFAULT_LOCALE} />;
}
