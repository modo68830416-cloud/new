import { NextResponse, type NextRequest } from "next/server";
import { fetchAutocompleteSuggestions, NewsApiError } from "@/lib/news-api";

/**
 * TASK-015 자동완성 API — `GET /api/search/suggestions?q=&limitPerGroup=`.
 *
 * 기사 / 카테고리 / 태그 / 추천 검색어 그룹을 반환한다. mock 데이터
 * (`getAutocompleteSuggestions`)를 대상으로 하며 실제 검색 엔진은 사용하지
 * 않는다. "최근 검색어"는 사용자 로컬(`localStorage`) 전용이라 이 API에는
 * 포함하지 않는다.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") ?? "";
    const limitPerGroupParam = searchParams.get("limitPerGroup");
    const limitPerGroup = limitPerGroupParam ? Number(limitPerGroupParam) : undefined;

    const groups = await fetchAutocompleteSuggestions(query, limitPerGroup);
    return NextResponse.json({ groups });
  } catch (error) {
    if (error instanceof NewsApiError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    throw error;
  }
}
