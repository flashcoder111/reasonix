import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedRoutePage } from "@/components/LocalizedPages";
import {
  isNonDefaultLocale,
  nonDefaultLocales,
  normalizePath,
  pathToSegments,
  segmentsToPath,
  type NonDefaultLocale,
} from "@/lib/i18n";
import { getAllPagePaths, getRouteMetadata } from "@/lib/routes";

type LocalizedCatchAllProps = {
  params: Promise<{
    locale: string;
    path?: string[];
  }>;
};

export const dynamicParams = true;

function getPagePath(path?: string[]) {
  const pagePath = segmentsToPath(path);
  const normalizedPath = normalizePath(pagePath);

  return normalizedPath.startsWith("/login/") ? "/login" : normalizedPath;
}

export function generateStaticParams() {
  return nonDefaultLocales.flatMap((locale) =>
    getAllPagePaths(locale).map((path) => ({
      locale,
      path: pathToSegments(path),
    })),
  );
}

export async function generateMetadata({
  params,
}: LocalizedCatchAllProps): Promise<Metadata> {
  const { locale, path } = await params;

  if (!isNonDefaultLocale(locale)) {
    return {};
  }

  return getRouteMetadata(locale, getPagePath(path));
}

export default async function Page({ params }: LocalizedCatchAllProps) {
  const { locale, path } = await params;

  if (!isNonDefaultLocale(locale)) {
    notFound();
  }

  return (
    <LocalizedRoutePage
      locale={locale as NonDefaultLocale}
      path={getPagePath(path)}
    />
  );
}
