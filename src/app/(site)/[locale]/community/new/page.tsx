import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommunityNewPageContent } from "@/components/LocalizedPages";
import {
  isNonDefaultLocale,
  type NonDefaultLocale,
} from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";

type LocalizedCommunityNewPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalizedCommunityNewPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isNonDefaultLocale(locale)) {
    return {};
  }

  return getRouteMetadata(locale, "/community/new");
}

export default async function Page({ params }: LocalizedCommunityNewPageProps) {
  const { locale } = await params;

  if (!isNonDefaultLocale(locale)) {
    notFound();
  }

  return <CommunityNewPageContent locale={locale as NonDefaultLocale} />;
}
