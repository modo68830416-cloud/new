import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { BREAKING_NEWS_CACHE_TAG } from "@/lib/news-api/breaking-news";
import { TRENDING_KEYWORDS_CACHE_TAG } from "@/lib/news-api/trending";

const VALID_TAGS = [BREAKING_NEWS_CACHE_TAG, TRENDING_KEYWORDS_CACHE_TAG] as const;
type ValidTag = (typeof VALID_TAGS)[number];

/** 헤더에 시크릿이 없을 때 사용하는 개발용 기본값 — 프로덕션에서는 반드시 환경변수로 지정한다 */
const DEV_FALLBACK_SECRET = "dev-only-revalidate-secret";

/**
 * TASK-013 캐시 무효화 API — `POST /api/revalidate`.
 *
 * 요청 바디 `{ "tag": "breaking-news" | "trending-keywords" }`와 헤더
 * `x-revalidate-secret`을 받는다. 실제 이벤트(속보 발행, 배치 갱신)가 이
 * 엔드포인트를 호출하는 파이프라인은 이번 Task 범위 밖이며, 엔드포인트
 * 자체만 제공한다.
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");
  const expected = process.env.REVALIDATE_SECRET ?? DEV_FALLBACK_SECRET;
  if (secret !== expected) {
    return NextResponse.json({ error: "인증에 실패했습니다." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const tag = body?.tag as ValidTag | undefined;
  if (!tag || !VALID_TAGS.includes(tag)) {
    return NextResponse.json(
      { error: `tag는 ${VALID_TAGS.join(", ")} 중 하나여야 합니다.` },
      { status: 400 },
    );
  }

  // 외부에서 호출하는 즉시 무효화 용도이므로 `{ expire: 0 }`으로 즉시 만료시킨다
  // (staleness를 허용하는 `revalidateTag(tag, "max")`가 아니라).
  revalidateTag(tag, { expire: 0 });
  return NextResponse.json({ revalidated: true, tag });
}
