import { isLocale, type Locale } from "@/lib/i18n";

export const communityLocaleFilters = [
  "all",
  "en",
  "zh-cn",
  "zh-tw",
  "ru",
] as const;

export type CommunityLocaleFilter = (typeof communityLocaleFilters)[number];

export type CommunityStatus = "visible" | "hidden" | "deleted";

export type CommunityQuestion = {
  id: string;
  slug: string;
  locale: Locale;
  title: string;
  body: string;
  authorName: string;
  authorImageUrl: string | null;
  status: CommunityStatus;
  replyCount: number;
  lastReplyAt: string | null;
  createdAt: string;
  updatedAt: string;
  canEdit?: boolean;
  canModerate?: boolean;
};

export type CommunityReply = {
  id: string;
  questionId: string;
  body: string;
  authorName: string;
  authorImageUrl: string | null;
  status: CommunityStatus;
  createdAt: string;
  updatedAt: string;
  canEdit?: boolean;
  canModerate?: boolean;
};

export type CommunityViewer = {
  isSignedIn: boolean;
  isAdmin: boolean;
};

export type CommunityQuestionListResponse = {
  data: CommunityQuestion[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    locale: CommunityLocaleFilter;
    query: string;
  };
  viewer: CommunityViewer;
};

export type CommunityQuestionDetailResponse = {
  data: {
    question: CommunityQuestion;
    replies: CommunityReply[];
  };
  viewer: CommunityViewer;
};

export type CommunityApiError = {
  error: {
    code: string;
    message: string;
    details?: { field: string; message: string; code: string }[];
  };
};

export const questionTitleLimits = {
  min: 8,
  max: 160,
} as const;

export const questionBodyLimits = {
  min: 20,
  max: 5000,
} as const;

export const replyBodyLimits = {
  min: 1,
  max: 3000,
} as const;

export function normalizeCommunityLocaleFilter(
  value: string | null | undefined,
  fallback: CommunityLocaleFilter = "all",
): CommunityLocaleFilter {
  if (value === "all") {
    return "all";
  }

  const candidate = value ?? undefined;
  return isLocale(candidate) ? candidate : fallback;
}

export function isCommunityLocaleFilter(
  value: string | null | undefined,
): value is CommunityLocaleFilter {
  return communityLocaleFilters.includes(value as CommunityLocaleFilter);
}

export function getCommunityStatusLabel(status: CommunityStatus) {
  if (status === "hidden") {
    return "Hidden";
  }

  if (status === "deleted") {
    return "Deleted";
  }

  return "Visible";
}
