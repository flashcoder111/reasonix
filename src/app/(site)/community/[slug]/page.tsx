import type { Metadata } from "next";
import { CommunityQuestionPageContent } from "@/components/LocalizedPages";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";

type CommunityQuestionPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CommunityQuestionPageProps): Promise<Metadata> {
  const { slug } = await params;
  return getRouteMetadata(DEFAULT_LOCALE, `/community/${slug}`);
}

export default async function Page({ params }: CommunityQuestionPageProps) {
  const { slug } = await params;
  return <CommunityQuestionPageContent locale={DEFAULT_LOCALE} slug={slug} />;
}
