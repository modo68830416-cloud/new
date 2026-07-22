import { NextResponse, type NextRequest } from "next/server";
import { fetchSearchResults, NewsApiError } from "@/lib/news-api";
import type { SearchFilterState, SearchSortOption } from "@/data/mock-search";
import type { NewsContentType } from "@/types/news";

const SORT_OPTIONS: SearchSortOption[] = ["latest", "popular", "most-viewed", "relevance"];

function parseList(value: string | null): string[] {
  return value ? value.split(",").map((item) => item.trim()).filter(Boolean) : [];
}

/**
 * TASK-013 검색 API — `GET /api/search?q=&category=&contentType=&breaking=&live=&dateFrom=&dateTo=&sort=`
 *
 * `category`/`contentType`은 콤마로 구분된 다중 값을 받는다. mock 데이터
 * (`searchArticles`)를 대상으로 하는 검색이며 실제 검색 엔진은 사용하지
 * 않는다.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") ?? "";
    const sortParam = searchParams.get("sort");
    const sort: SearchSortOption = SORT_OPTIONS.includes(sortParam as SearchSortOption)
      ? (sortParam as SearchSortOption)
      : "latest";

    const filters: SearchFilterState = {
      categorySlugs: parseList(searchParams.get("category")),
      contentTypes: parseList(searchParams.get("contentType")) as NewsContentType[],
      dateFrom: searchParams.get("dateFrom") ?? undefined,
      dateTo: searchParams.get("dateTo") ?? undefined,
      breakingOnly: searchParams.get("breaking") === "true",
      liveOnly: searchParams.get("live") === "true",
    };

    const articles = await fetchSearchResults(query, filters, sort);
    return NextResponse.json({ articles, total: articles.length });
  } catch (error) {
    if (error instanceof NewsApiError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    throw error;
  }
}
