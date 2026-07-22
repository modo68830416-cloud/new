import { NextResponse } from "next/server";
import { getArticleBySlug, getRelatedArticles } from "@/data/mock-news";
import { simulateNetwork, NewsApiError } from "@/lib/news-api";

/**
 * TASK-012 뉴스 상세 API — `GET /api/articles/:slug`.
 *
 * 기사가 없으면 404, 있으면 기사와 관련 기사 목록을 함께 반환한다.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await simulateNetwork();

    const { slug } = await params;
    const article = getArticleBySlug(slug);
    if (!article) {
      return NextResponse.json({ error: "기사를 찾을 수 없습니다." }, { status: 404 });
    }

    const related = getRelatedArticles(article);
    return NextResponse.json({ article, related });
  } catch (error) {
    if (error instanceof NewsApiError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    throw error;
  }
}
