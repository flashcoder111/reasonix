import type { Metadata } from "next";
import { FaqPageContent } from "@/components/LocalizedPages";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";

export function generateMetadata(): Metadata {
  return getRouteMetadata(DEFAULT_LOCALE, "/faq");
}

export default function Page() {
  return <FaqPageContent locale={DEFAULT_LOCALE} />;
}
