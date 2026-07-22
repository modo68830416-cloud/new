import { NextResponse, type NextRequest } from "next/server";
import { MOCK_NEWS, getLatestArticles, getPopularArticles } from "@/data/mock-news";
import { simulateNetwork, NewsApiError } from "@/lib/news-api";
import type { NewsArticle, NewsContentType } from "@/types/news";

/**
 * TASK-012 뉴스 목록 API.
 *
 * `GET /api/articles?category=&tag=&contentType=&breaking=&featured=&sort=latest|popular&limit=`
 *
 * mock 데이터(`MOCK_NEWS`)를 대상으로 하는 필터/정렬이며 실제 검색 엔진이나
 * 외부 API는 사용하지 않는다. 서버 컴포넌트는 이 라우트를 직접 fetch하지
 * 않고 `src/lib/news-api`의 서비스 함수를 호출한다 — 이 라우트는 외부에
 * 노출 가능한 REST API 형태를 보여주기 위한 것이다.
 */
export async function GET(request: NextRequest) {
  try {
    await simulateNetwork();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const contentType = searchParams.get("contentType") as NewsContentType | null;
    const breakingOnly = searchParams.get("breaking") === "true";
    const featuredOnly = searchParams.get("featured") === "true";
    const sort = searchParams.get("sort") === "popular" ? "popular" : "latest";
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Number(limitParam) : undefined;

    let articles: NewsArticle[] = MOCK_NEWS;

    if (category) {
      articles = articles.filter((article) => article.category.slug === category);
    }
    if (tag) {
      articles = articles.filter((article) => article.tags.includes(tag));
    }
    if (contentType) {
      articles = articles.filter((article) => (article.contentType ?? "article") === contentType);
    }
    if (breakingOnly) {
      articles = articles.filter((article) => article.isBreaking);
    }
    if (featuredOnly) {
      articles = articles.filter((article) => article.isFeatured);
    }

    const sorted =
      sort === "popular" ? getPopularArticles(limit, articles) : getLatestArticles(limit, articles);

    return NextResponse.json({ articles: sorted, total: sorted.length });
  } catch (error) {
    if (error instanceof NewsApiError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    throw error;
  }
}
