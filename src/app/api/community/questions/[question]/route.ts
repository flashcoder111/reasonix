import { NextResponse } from "next/server";
import {
  getCommunityRequestUser,
  getCommunitySupabase,
  isCommunityDatabaseConfigured,
  mapCommunityQuestion,
  mapCommunityReply,
  type CommunityQuestionRow,
  type CommunityReplyRow,
} from "@/lib/community-server";
import {
  apiError,
  databaseNotConfiguredError,
  readJson,
} from "@/lib/community-api";
import { validateQuestionPatchPayload } from "@/lib/community-validation";
import type { CommunityQuestionDetailResponse } from "@/lib/community";

type QuestionRouteContext = {
  params: Promise<{
    question: string;
  }>;
};

const questionSelect =
  "id,slug,locale,title,body,author_clerk_id,author_name,author_image_url,status,reply_count,last_reply_at,created_at,updated_at";

export async function GET(_request: Request, { params }: QuestionRouteContext) {
  const { question } = await params;
  const viewer = await getCommunityRequestUser();

  if (!isCommunityDatabaseConfigured()) {
    return databaseNotConfiguredError();
  }

  const supabase = getCommunitySupabase();
  let questionQuery = supabase
    .from("community_questions")
    .select(questionSelect)
    .eq("slug", question);

  if (!viewer?.isAdmin) {
    questionQuery = questionQuery.eq("status", "visible");
  }

  const { data: questionData, error: questionError } =
    await questionQuery.maybeSingle();

  if (questionError) {
    return apiError("database_error", questionError.message, 500);
  }

  if (!questionData) {
    return apiError("not_found", "Question not found.", 404);
  }

  let repliesQuery = supabase
    .from("community_replies")
    .select(
      "id,question_id,body,author_clerk_id,author_name,author_image_url,status,created_at,updated_at",
    )
    .eq("question_id", (questionData as CommunityQuestionRow).id)
    .order("created_at", { ascending: true });

  if (!viewer?.isAdmin) {
    repliesQuery = repliesQuery.eq("status", "visible");
  }

  const { data: repliesData, error: repliesError } = await repliesQuery;

  if (repliesError) {
    return apiError("database_error", repliesError.message, 500);
  }

  return NextResponse.json({
    data: {
      question: mapCommunityQuestion(
        questionData as CommunityQuestionRow,
        viewer,
      ),
      replies: ((repliesData || []) as CommunityReplyRow[]).map((reply) =>
        mapCommunityReply(reply, viewer),
      ),
    },
    viewer: {
      isSignedIn: Boolean(viewer),
      isAdmin: Boolean(viewer?.isAdmin),
    },
  } satisfies CommunityQuestionDetailResponse);
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
    .select(questionSelect)
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
    .select(questionSelect)
    .single();

  if (error) {
    return apiError("database_error", error.message, 500);
  }

  return NextResponse.json({
    data: mapCommunityQuestion(data as CommunityQuestionRow, viewer),
  });
}
