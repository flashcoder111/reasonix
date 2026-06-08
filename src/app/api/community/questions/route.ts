import { NextResponse } from "next/server";
import {
  communityQuestionSelect,
  createQuestionSlug,
  getCommunityQuestionList,
  getCommunityRequestUser,
  getCommunitySupabase,
  isCommunityDatabaseConfigured,
  mapCommunityQuestion,
  normalizeCommunityPage,
  normalizeCommunitySearch,
  normalizeCommunityStatus,
  type CommunityQuestionRow,
} from "@/lib/community-server";
import {
  apiError,
  databaseNotConfiguredError,
  readJson,
} from "@/lib/community-api";
import { validateQuestionPayload } from "@/lib/community-validation";
import { normalizeCommunityLocaleFilter } from "@/lib/community";

export async function GET(request: Request) {
  const viewer = await getCommunityRequestUser();
  const url = new URL(request.url);
  const page = normalizeCommunityPage(url.searchParams.get("page"));
  const status = normalizeCommunityStatus(url.searchParams.get("status"));
  const locale = normalizeCommunityLocaleFilter(url.searchParams.get("locale"));
  const query = normalizeCommunitySearch(url.searchParams.get("q"));

  const result = await getCommunityQuestionList({
    page,
    status,
    locale,
    query,
    viewer,
  });

  if (!result.ok) {
    return apiError(
      result.error.code,
      result.error.message,
      result.error.status,
    );
  }

  return NextResponse.json(result.data);
}

export async function POST(request: Request) {
  const viewer = await getCommunityRequestUser();

  if (!viewer) {
    return apiError("unauthorized", "Sign in before creating a question.", 401);
  }

  if (!isCommunityDatabaseConfigured()) {
    return databaseNotConfiguredError();
  }

  const validation = validateQuestionPayload(await readJson(request));

  if (!validation.ok) {
    return apiError(
      "validation_error",
      "Request validation failed.",
      422,
      validation.details,
    );
  }

  const supabase = getCommunitySupabase();
  const { title, body, locale } = validation.data;
  const { data, error } = await supabase
    .from("community_questions")
    .insert({
      title,
      body,
      locale,
      slug: createQuestionSlug(title),
      author_clerk_id: viewer.id,
      author_name: viewer.name,
      author_image_url: viewer.imageUrl,
    })
    .select(communityQuestionSelect)
    .single();

  if (error) {
    return apiError("database_error", error.message, 500);
  }

  const question = mapCommunityQuestion(data as CommunityQuestionRow, viewer);

  return NextResponse.json({ data: question }, { status: 201 });
}
