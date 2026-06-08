import { NextResponse } from "next/server";
import {
  communityQuestionSelect,
  getCommunityQuestionDetail,
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
import { validateQuestionPatchPayload } from "@/lib/community-validation";

type QuestionRouteContext = {
  params: Promise<{
    question: string;
  }>;
};

export async function GET(_request: Request, { params }: QuestionRouteContext) {
  const { question } = await params;
  const viewer = await getCommunityRequestUser();
  const result = await getCommunityQuestionDetail(question, viewer);

  if (!result.ok) {
    return apiError(
      result.error.code,
      result.error.message,
      result.error.status,
    );
  }

  return NextResponse.json(result.data);
}

export async function PATCH(request: Request, { params }: QuestionRouteContext) {
  const { question } = await params;
  const viewer = await getCommunityRequestUser();

  if (!viewer) {
    return apiError("unauthorized", "Sign in before editing a question.", 401);
  }

  if (!isCommunityDatabaseConfigured()) {
    return databaseNotConfiguredError();
  }

  const validation = validateQuestionPatchPayload(await readJson(request));

  if (!validation.ok) {
    return apiError(
      "validation_error",
      "Request validation failed.",
      422,
      validation.details,
    );
  }

  const supabase = getCommunitySupabase();
  const { data: existing, error: existingError } = await supabase
    .from("community_questions")
    .select(communityQuestionSelect)
    .eq("id", question)
    .maybeSingle();

  if (existingError) {
    return apiError("database_error", existingError.message, 500);
  }

  if (!existing) {
    return apiError("not_found", "Question not found.", 404);
  }

  const row = existing as CommunityQuestionRow;
  const isOwner = row.author_clerk_id === viewer.id;
  const isAdmin = viewer.isAdmin;
  const { action, title, body, locale } = validation.data;

  if ((action === "hide" || action === "restore") && !isAdmin) {
    return apiError("forbidden", "Only community admins can moderate questions.", 403);
  }

  if (action === "delete" && !isOwner && !isAdmin) {
    return apiError("forbidden", "Only the author or an admin can delete this question.", 403);
  }

  if ((title || body || locale) && !isOwner && !isAdmin) {
    return apiError("forbidden", "Only the author or an admin can edit this question.", 403);
  }

  const patch: Record<string, string | null> = {};

  if (title) {
    patch.title = title;
  }

  if (body) {
    patch.body = body;
  }

  if (locale) {
    patch.locale = locale;
  }

  if (action === "hide") {
    patch.status = "hidden";
    patch.hidden_at = new Date().toISOString();
  }

  if (action === "restore") {
    patch.status = "visible";
    patch.hidden_at = null;
    patch.deleted_at = null;
  }

  if (action === "delete") {
    patch.status = "deleted";
    patch.deleted_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("community_questions")
    .update(patch)
    .eq("id", question)
    .select(communityQuestionSelect)
    .single();

  if (error) {
    return apiError("database_error", error.message, 500);
  }

  return NextResponse.json({
    data: mapCommunityQuestion(data as CommunityQuestionRow, viewer),
  });
}
