import { FEATURED_ARTICLES, MOCK_NEWS } from "@/data/mock-news";
import type { NewsArticle } from "@/types/news";

/**
 * TASK-006 Hero(첫 화면)에서 사용할 대표 기사 1건을 고른다.
 *
 * 속보이면서 대표 기사(Featured)로 지정된 기사를 최우선으로 하고, 없으면
 * 가장 먼저 등록된 Featured 기사, 그마저 없으면 첫 기사를 사용한다.
 */
export function getFeaturedHeroArticle(): NewsArticle {
  return (
    FEATURED_ARTICLES.find((article) => article.isBreaking) ??
    FEATURED_ARTICLES[0] ??
    MOCK_NEWS[0]
  );
}

/**
 * Featured Hero에서 사용한 기사를 제외한 보조 헤드라인 목록을 고른다.
 *
 * Featured 기사 풀을 우선 사용해 카테고리 다양성을 확보하고, 개수가 모자라면
 * 조회수 순으로 나머지 기사를 채운다.
 */
export function getSecondaryHeroArticles(limit = 6): NewsArticle[] {
  const featured = getFeaturedHeroArticle();
  const pool = FEATURED_ARTICLES.filter((article) => article.id !== featured.id);

  if (pool.length >= limit) {
    return pool.slice(0, limit);
  }

  const poolIds = new Set(pool.map((article) => article.id));
  const fallback = [...MOCK_NEWS]
    .filter((article) => article.id !== featured.id && !poolIds.has(article.id))
    .sort((a, b) => b.viewCount - a.viewCount);

  return [...pool, ...fallback].slice(0, limit);
}
