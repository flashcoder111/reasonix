import "server-only";

import { currentUser } from "@clerk/nextjs/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { CommunityQuestion, CommunityReply } from "@/lib/community";
import type { Locale } from "@/lib/i18n";

type CommunityQuestionRow = {
  id: string;
  slug: string;
  locale: Locale;
  title: string;
  body: string;
  author_clerk_id: string;
  author_name: string;
  author_image_url: string | null;
  status: "visible" | "hidden" | "deleted";
  reply_count: number;
  last_reply_at: string | null;
  created_at: string;
  updated_at: string;
};

type CommunityReplyRow = {
  id: string;
  question_id: string;
  body: string;
  author_clerk_id: string;
  author_name: string;
  author_image_url: string | null;
  status: "visible" | "hidden" | "deleted";
  created_at: string;
  updated_at: string;
};

export type CommunityRequestUser = {
  id: string;
  name: string;
  imageUrl: string | null;
  isAdmin: boolean;
};

let cachedSupabase: SupabaseClient | null = null;

export function isCommunityDatabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export function getCommunitySupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Community database is not configured.");
  }

  if (!cachedSupabase) {
    cachedSupabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return cachedSupabase;
}

export function getCommunityAdminIds() {
  return new Set(
    (process.env.COMMUNITY_ADMIN_CLERK_IDS || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),
  );
}

export function isCommunityAdmin(userId: string) {
  return getCommunityAdminIds().has(userId);
}

export async function getCommunityRequestUser(): Promise<CommunityRequestUser | null> {
  const hasClerkServerKeys = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
  );

  if (!hasClerkServerKeys) {
    return null;
  }

  const user = await currentUser();

  if (!user) {
    return null;
  }

  const name =
    user.fullName ||
    user.username ||
    user.primaryEmailAddress?.emailAddress ||
    "Reasonix user";

  return {
    id: user.id,
    name,
    imageUrl: user.imageUrl || null,
    isAdmin: isCommunityAdmin(user.id),
  };
}

export function mapCommunityQuestion(
  row: CommunityQuestionRow,
  viewer: CommunityRequestUser | null,
): CommunityQuestion {
  const canEdit = Boolean(viewer && row.author_clerk_id === viewer.id);
  const canModerate = Boolean(viewer?.isAdmin);

  return {
    id: row.id,
    slug: row.slug,
    locale: row.locale,
    title: row.title,
    body: row.body,
    authorName: row.author_name,
    authorImageUrl: row.author_image_url,
    status: row.status,
    replyCount: row.reply_count,
    lastReplyAt: row.last_reply_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    canEdit,
    canModerate,
  };
}

export function mapCommunityReply(
  row: CommunityReplyRow,
  viewer: CommunityRequestUser | null,
): CommunityReply {
  const canEdit = Boolean(viewer && row.author_clerk_id === viewer.id);
  const canModerate = Boolean(viewer?.isAdmin);

  return {
    id: row.id,
    questionId: row.question_id,
    body: row.body,
    authorName: row.author_name,
    authorImageUrl: row.author_image_url,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    canEdit,
    canModerate,
  };
}

export function createQuestionSlug(title: string) {
  const normalized = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
  const base = normalized || "question";

  return `${base}-${crypto.randomUUID().slice(0, 8)}`;
}

export type { CommunityQuestionRow, CommunityReplyRow };
