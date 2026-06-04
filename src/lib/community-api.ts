import { NextResponse } from "next/server";
import type { CommunityApiError } from "@/lib/community";

type ErrorDetail = NonNullable<CommunityApiError["error"]["details"]>[number];

export function apiError(
  code: string,
  message: string,
  status: number,
  details?: ErrorDetail[],
) {
  return NextResponse.json(
    {
      error: {
        code,
        message,
        ...(details?.length ? { details } : {}),
      },
    } satisfies CommunityApiError,
    { status },
  );
}

export function databaseNotConfiguredError() {
  return apiError(
    "database_not_configured",
    "Community database is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    503,
  );
}

export async function readJson(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
