import { NextResponse, type NextRequest } from "next/server";
import { fetchTrendingKeywords, NewsApiError } from "@/lib/news-api";

/** TASK-012 실시간 인기 검색어 API — `GET /api/trending-keywords?limit=` */
export async function GET(request: NextRequest) {
  try {
    const limitParam = request.nextUrl.searchParams.get("limit");
    const limit = limitParam ? Number(limitParam) : undefined;
    const keywords = await fetchTrendingKeywords(limit);
    return NextResponse.json({ keywords });
  } catch (error) {
    if (error instanceof NewsApiError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    throw error;
  }
}
