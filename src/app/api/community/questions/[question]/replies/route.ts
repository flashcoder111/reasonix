import { NextResponse } from "next/server";
import {
  getCommunityRequestUser,
  getCommunitySupabase,
  isCommunityDatabaseConfigured,
  mapCommunityReply,
  type CommunityReplyRow,
} from "@/lib/community-server";
import {
  apiError,
  databaseNotConfiguredError,
  readJson,
} from "@/lib/community-api";
import { validateReplyPayload } from "@/lib/community-validation";

type RepliesRouteContext = {
  params: Promise<{
    question: string;
  }>;
};

export async function POST(request: Request, { params }: RepliesRouteContext) {
  const { question } = await params;
  const viewer = await getCommunityRequestUser();

  if (!viewer) {
    return apiError("unauthorized", "Sign in before replying.", 401);
  }

  if (!isCommunityDatabaseConfigured()) {
    return databaseNotConfiguredError();
  }

  const validation = validateReplyPayload(await readJson(request));

  if (!validation.ok) {
    return apiError(
      "validation_error",
      "Request validation failed.",
      422,
      validation.details,
    );
  }

  const supabase = getCommunitySupabase();
  const { data: questionData, error: questionError } = await supabase
    .from("community_questions")
    .select("id")
    .eq("id", question)
    .eq("status", "visible")
    .maybeSingle();

  if (questionError) {
    return apiError("database_error", questionError.message, 500);
  }

  if (!questionData) {
    return apiError("not_found", "Question not found.", 404);
  }

  const { data, error } = await supabase
    .from("community_replies")
    .insert({
      question_id: question,
      body: validation.data.body,
      author_clerk_id: viewer.id,
      author_name: viewer.name,
      author_image_url: viewer.imageUrl,
    })
    .select(
      "id,question_id,body,author_clerk_id,author_name,author_image_url,status,created_at,updated_at",
    )
    .single();

  if (error) {
    return apiError("database_error", error.message, 500);
  }

  return NextResponse.json(
    { data: mapCommunityReply(data as CommunityReplyRow, viewer) },
    { status: 201 },
  );
}
