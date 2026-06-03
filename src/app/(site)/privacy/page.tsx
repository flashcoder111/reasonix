import type { Metadata } from "next";
import { PrivacyPageContent } from "@/components/LocalizedPages";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";

export function generateMetadata(): Metadata {
  return getRouteMetadata(DEFAULT_LOCALE, "/privacy");
}

export default function Page() {
  return <PrivacyPageContent locale={DEFAULT_LOCALE} />;
}
