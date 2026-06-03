import type { Metadata } from "next";
import { LoginExplainer } from "@/components/LoginExplainer";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";

export function generateMetadata(): Metadata {
  return getRouteMetadata(DEFAULT_LOCALE, "/login");
}

export default function Page() {
  return <LoginExplainer locale={DEFAULT_LOCALE} />;
}

