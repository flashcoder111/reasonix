import type { Metadata } from "next";
import { DeepSeekPageContent } from "@/components/LocalizedPages";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";

export function generateMetadata(): Metadata {
  return getRouteMetadata(DEFAULT_LOCALE, "/deepseek");
}

export default function Page() {
  return <DeepSeekPageContent locale={DEFAULT_LOCALE} />;
}
