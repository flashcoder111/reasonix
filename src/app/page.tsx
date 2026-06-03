import type { Metadata } from "next";
import { HomePage } from "@/components/LocalizedPages";
import { SiteShell } from "@/components/SiteShell";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";

export function generateMetadata(): Metadata {
  return getRouteMetadata(DEFAULT_LOCALE, "/");
}

export default function Page() {
  return (
    <SiteShell>
      <HomePage locale={DEFAULT_LOCALE} />
    </SiteShell>
  );
}
