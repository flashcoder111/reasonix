import type { Metadata } from "next";
import { SeoLandingPageContent } from "@/components/LocalizedPages";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";

const pagePath = "/deepseek-v4-code";

export function generateMetadata(): Metadata {
  return getRouteMetadata(DEFAULT_LOCALE, pagePath);
}

export default function Page() {
  return <SeoLandingPageContent locale={DEFAULT_LOCALE} path={pagePath} />;
}
