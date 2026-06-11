export const dynamic = "force-dynamic";

function getIndexNowKey(): string | null {
  const key = process.env.INDEXNOW_KEY?.trim();
  return key || null;
}

export function GET(): Response {
  const key = getIndexNowKey();

  if (!key) {
    return new Response("IndexNow key is not configured.\n", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  }

  return new Response(`${key}\n`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=300, must-revalidate",
    },
  });
}
