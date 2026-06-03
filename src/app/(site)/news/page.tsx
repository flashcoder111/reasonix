import type { Metadata } from "next";
import { NewsPageContent } from "@/components/LocalizedPages";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";

export function generateMetadata(): Metadata {
  return getRouteMetadata(DEFAULT_LOCALE, "/news");
}

export default function Page() {
  return <NewsPageContent locale={DEFAULT_LOCALE} />;
}
