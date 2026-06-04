import { NextResponse } from "next/server";
import {
  normalizeCommunityLocaleFilter,
  type CommunityQuestionListResponse,
} from "@/lib/community";
import {
  createQuestionSlug,
  getCommunityRequestUser,
  getCommunitySupabase,
  isCommunityDatabaseConfigured,
  mapCommunityQuestion,
  type CommunityQuestionRow,
} from "@/lib/community-server";
import {
  apiError,
  databaseNotConfiguredError,
  readJson,
} from "@/lib/community-api";
import { validateQuestionPayload } from "@/lib/community-validation";

const perPage = 12;

function normalizePage(value: string | null) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function normalizeSearch(value: string | null) {
  return (value || "")
    .replace(/[%,(){}]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function normalizeStatus(value: string | null) {
  return value === "hidden" || value === "all" ? value : "visible";
}

export async function GET(request: Request) {
  const viewer = await getCommunityRequestUser();
  const url = new URL(request.url);
  const page = normalizePage(url.searchParams.get("page"));
  const status = normalizeStatus(url.searchParams.get("status"));
  const locale = normalizeCommunityLocaleFilter(url.searchParams.get("locale"));
  const query = normalizeSearch(url.searchParams.get("q"));

  if (!isCommunityDatabaseConfigured()) {
    return databaseNotConfiguredError();
  }

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  const supabase = getCommunitySupabase();
  let requestQuery = supabase
    .from("community_questions")
    .select(
      "id,slug,locale,title,body,author_clerk_id,author_name,author_image_url,status,reply_count,last_reply_at,created_at,updated_at",
      { count: "exact" },
    )
    .range(from, to)
    .order("last_reply_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (!viewer?.isAdmin || status === "visible") {
    requestQuery = requestQuery.eq("status", "visible");
  } else if (status === "hidden") {
    requestQuery = requestQuery.eq("status", "hidden");
  }

  if (locale !== "all") {
    requestQuery = requestQuery.eq("locale", locale);
  }

  if (query) {
    requestQuery = requestQuery.or(`title.ilike.%${query}%,body.ilike.%${query}%`);
  }

  const { data, count, error } = await requestQuery;

  if (error) {
    return apiError("database_error", error.message, 500);
  }

  const rows = (data || []) as CommunityQuestionRow[];

  return NextResponse.json({
    data: rows.map((row) => mapCommunityQuestion(row, viewer)),
    meta: {
      page,
      perPage,
      total: count || 0,
      totalPages: Math.max(1, Math.ceil((count || 0) / perPage)),
      locale,
      query,
    },
    viewer: {
      isSignedIn: Boolean(viewer),
      isAdmin: Boolean(viewer?.isAdmin),
    },
  } satisfies CommunityQuestionListResponse);
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
    .select(
      "id,slug,locale,title,body,author_clerk_id,author_name,author_image_url,status,reply_count,last_reply_at,created_at,updated_at",
    )
    .single();

  if (error) {
    return apiError("database_error", error.message, 500);
  }

  const question = mapCommunityQuestion(data as CommunityQuestionRow, viewer);

  return NextResponse.json({ data: question }, { status: 201 });
}
