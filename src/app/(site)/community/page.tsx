import type { Metadata } from "next";
import { CommunityPageContent } from "@/components/LocalizedPages";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";

export function generateMetadata(): Metadata {
  return getRouteMetadata(DEFAULT_LOCALE, "/community");
}

export default function Page() {
  return <CommunityPageContent locale={DEFAULT_LOCALE} />;
}
