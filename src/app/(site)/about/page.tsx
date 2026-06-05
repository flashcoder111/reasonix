import type { Metadata } from "next";
import { TrustPageContent } from "@/components/LocalizedPages";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";

export function generateMetadata(): Metadata {
  return getRouteMetadata(DEFAULT_LOCALE, "/about");
}

export default function Page() {
  return <TrustPageContent locale={DEFAULT_LOCALE} page="about" />;
}
