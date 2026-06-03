import type { Metadata } from "next";
import { PrivacyProtectionPageContent } from "@/components/LocalizedPages";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";

export function generateMetadata(): Metadata {
  return getRouteMetadata(DEFAULT_LOCALE, "/privacy-protection");
}

export default function Page() {
  return <PrivacyProtectionPageContent locale={DEFAULT_LOCALE} />;
}
