import type { Metadata } from "next";
import { ArticleDetailPage } from "@/components/LocalizedPages";
import { getArticles } from "@/lib/articles";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getRouteMetadata } from "@/lib/routes";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getArticles(DEFAULT_LOCALE).map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  return getRouteMetadata(DEFAULT_LOCALE, `/articles/${slug}`);
}

export default async function Page({ params }: ArticlePageProps) {
  const { slug } = await params;
  return <ArticleDetailPage locale={DEFAULT_LOCALE} slug={slug} />;
}
