import "server-only";

import { currentUser } from "@clerk/nextjs/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  normalizeCommunityLocaleFilter,
  type CommunityApiError,
  type CommunityLocaleFilter,
  type CommunityQuestion,
  type CommunityQuestionDetailResponse,
  type CommunityQuestionListResponse,
  type CommunityReply,
} from "@/lib/community";
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

export const communityQuestionsPerPage = 12;

export const communityQuestionSelect =
  "id,slug,locale,title,body,author_clerk_id,author_name,author_image_url,status,reply_count,last_reply_at,created_at,updated_at";

export const communityReplySelect =
  "id,question_id,body,author_clerk_id,author_name,author_image_url,status,created_at,updated_at";

export type CommunityDataError = CommunityApiError["error"] & {
  status: number;
};

type CommunityDataResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: CommunityDataError };

export type CommunitySitemapQuestion = {
  slug: string;
  locale: Locale;
  updatedAt: string;
  createdAt: string;
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

function communityDataError(
  code: string,
  message: string,
  status: number,
): CommunityDataResult<never> {
  return {
    ok: false,
    error: {
      code,
      message,
      status,
    },
  };
}

export function communityDataErrorToApiError(
  error: CommunityDataError,
): CommunityApiError {
  return {
    error: {
      code: error.code,
      message: error.message,
      ...(error.details?.length ? { details: error.details } : {}),
    },
  };
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

export function normalizeCommunityPage(value: string | number | null | undefined) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

export function normalizeCommunitySearch(value: string | null | undefined) {
  return (value || "")
    .replace(/[%,(){}]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

export function normalizeCommunityStatus(value: string | null | undefined) {
  return value === "hidden" || value === "all" ? value : "visible";
}

export async function getCommunityQuestionList({
  page = 1,
  status = "visible",
  locale = "all",
  query = "",
  viewer = null,
}: {
  page?: number;
  status?: "visible" | "hidden" | "all";
  locale?: CommunityLocaleFilter;
  query?: string;
  viewer?: CommunityRequestUser | null;
} = {}): Promise<CommunityDataResult<CommunityQuestionListResponse>> {
  if (!isCommunityDatabaseConfigured()) {
    return communityDataError(
      "database_not_configured",
      "Community database is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      503,
    );
  }

  const normalizedPage = normalizeCommunityPage(page);
  const normalizedStatus = normalizeCommunityStatus(status);
  const normalizedLocale = normalizeCommunityLocaleFilter(locale);
  const normalizedQuery = normalizeCommunitySearch(query);
  const from = (normalizedPage - 1) * communityQuestionsPerPage;
  const to = from + communityQuestionsPerPage - 1;
  const supabase = getCommunitySupabase();
  let requestQuery = supabase
    .from("community_questions")
    .select(communityQuestionSelect, { count: "exact" })
    .range(from, to)
    .order("last_reply_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (!viewer?.isAdmin || normalizedStatus === "visible") {
    requestQuery = requestQuery.eq("status", "visible");
  } else if (normalizedStatus === "hidden") {
    requestQuery = requestQuery.eq("status", "hidden");
  }

  if (normalizedLocale !== "all") {
    requestQuery = requestQuery.eq("locale", normalizedLocale);
  }

  if (normalizedQuery) {
    requestQuery = requestQuery.or(
      `title.ilike.%${normalizedQuery}%,body.ilike.%${normalizedQuery}%`,
    );
  }

  const { data, count, error } = await requestQuery;

  if (error) {
    return communityDataError("database_error", error.message, 500);
  }

  const rows = (data || []) as CommunityQuestionRow[];

  return {
    ok: true,
    data: {
      data: rows.map((row) => mapCommunityQuestion(row, viewer)),
      meta: {
        page: normalizedPage,
        perPage: communityQuestionsPerPage,
        total: count || 0,
        totalPages: Math.max(
          1,
          Math.ceil((count || 0) / communityQuestionsPerPage),
        ),
        locale: normalizedLocale,
        query: normalizedQuery,
      },
      viewer: {
        isSignedIn: Boolean(viewer),
        isAdmin: Boolean(viewer?.isAdmin),
      },
    },
  };
}

export async function getCommunityQuestionDetail(
  question: string,
  viewer: CommunityRequestUser | null = null,
): Promise<CommunityDataResult<CommunityQuestionDetailResponse>> {
  if (!isCommunityDatabaseConfigured()) {
    return communityDataError(
      "database_not_configured",
      "Community database is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      503,
    );
  }

  const supabase = getCommunitySupabase();
  let questionQuery = supabase
    .from("community_questions")
    .select(communityQuestionSelect)
    .eq("slug", question);

  if (!viewer?.isAdmin) {
    questionQuery = questionQuery.eq("status", "visible");
  }

  const { data: questionData, error: questionError } =
    await questionQuery.maybeSingle();

  if (questionError) {
    return communityDataError("database_error", questionError.message, 500);
  }

  if (!questionData) {
    return communityDataError("not_found", "Question not found.", 404);
  }

  let repliesQuery = supabase
    .from("community_replies")
    .select(communityReplySelect)
    .eq("question_id", (questionData as CommunityQuestionRow).id)
    .order("created_at", { ascending: true });

  if (!viewer?.isAdmin) {
    repliesQuery = repliesQuery.eq("status", "visible");
  }

  const { data: repliesData, error: repliesError } = await repliesQuery;

  if (repliesError) {
    return communityDataError("database_error", repliesError.message, 500);
  }

  return {
    ok: true,
    data: {
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
    },
  };
}

export async function getVisibleCommunityQuestionsForSitemap(): Promise<
  CommunitySitemapQuestion[]
> {
  if (!isCommunityDatabaseConfigured()) {
    return [];
  }

  const supabase = getCommunitySupabase();
  const { data, error } = await supabase
    .from("community_questions")
    .select("slug,locale,body,reply_count,created_at,updated_at")
    .eq("status", "visible")
    .order("updated_at", { ascending: false });

  if (error) {
    return [];
  }

  return (data || [])
    .filter((row) => {
      const body = String(row.body || "").replace(/\s+/g, " ").trim();
      const replyCount = Number(row.reply_count || 0);

      return body.length >= 80 || replyCount > 0;
    })
    .map((row) => ({
      slug: String(row.slug),
      locale: row.locale as Locale,
      createdAt: String(row.created_at),
      updatedAt: String(row.updated_at),
    }));
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
