import type { Metadata } from "next";
import { ArticlesIndexPage } from "@/components/LocalizedPages";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";

export function generateMetadata(): Metadata {
  return getRouteMetadata(DEFAULT_LOCALE, "/articles");
}

export default function Page() {
  return <ArticlesIndexPage locale={DEFAULT_LOCALE} />;
}
