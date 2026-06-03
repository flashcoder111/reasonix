import type { Metadata } from "next";
import { ErrorsPageContent } from "@/components/LocalizedPages";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";

export function generateMetadata(): Metadata {
  return getRouteMetadata(DEFAULT_LOCALE, "/errors");
}

export default function Page() {
  return <ErrorsPageContent locale={DEFAULT_LOCALE} />;
}
