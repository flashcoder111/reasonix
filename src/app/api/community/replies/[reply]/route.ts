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
import { validateReplyPatchPayload } from "@/lib/community-validation";

type ReplyRouteContext = {
  params: Promise<{
    reply: string;
  }>;
};

const replySelect =
  "id,question_id,body,author_clerk_id,author_name,author_image_url,status,created_at,updated_at";

export async function PATCH(request: Request, { params }: ReplyRouteContext) {
  const { reply } = await params;
  const viewer = await getCommunityRequestUser();

  if (!viewer) {
    return apiError("unauthorized", "Sign in before editing a reply.", 401);
  }

  if (!isCommunityDatabaseConfigured()) {
    return databaseNotConfiguredError();
  }

  const validation = validateReplyPatchPayload(await readJson(request));

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
    .from("community_replies")
    .select(replySelect)
    .eq("id", reply)
    .maybeSingle();

  if (existingError) {
    return apiError("database_error", existingError.message, 500);
  }

  if (!existing) {
    return apiError("not_found", "Reply not found.", 404);
  }

  const row = existing as CommunityReplyRow;
  const isOwner = row.author_clerk_id === viewer.id;
  const isAdmin = viewer.isAdmin;
  const { action, body } = validation.data;

  if ((action === "hide" || action === "restore") && !isAdmin) {
    return apiError("forbidden", "Only community admins can moderate replies.", 403);
  }

  if (action === "delete" && !isOwner && !isAdmin) {
    return apiError("forbidden", "Only the author or an admin can delete this reply.", 403);
  }

  if (body && !isOwner && !isAdmin) {
    return apiError("forbidden", "Only the author or an admin can edit this reply.", 403);
  }

  const patch: Record<string, string | null> = {};

  if (body) {
    patch.body = body;
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
    .from("community_replies")
    .update(patch)
    .eq("id", reply)
    .select(replySelect)
    .single();

  if (error) {
    return apiError("database_error", error.message, 500);
  }

  return NextResponse.json({
    data: mapCommunityReply(data as CommunityReplyRow, viewer),
  });
}
