import type { Metadata } from "next";
import { GithubPageContent } from "@/components/LocalizedPages";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";

export function generateMetadata(): Metadata {
  return getRouteMetadata(DEFAULT_LOCALE, "/github");
}

export default function Page() {
  return <GithubPageContent locale={DEFAULT_LOCALE} />;
}
