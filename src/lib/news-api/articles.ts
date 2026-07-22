import { cache } from "react";
import {
  getArticleBySlug,
  getArticlesByCategory,
  getLatestArticles,
  getPopularArticles,
  getRelatedArticles,
  MOCK_NEWS,
} from "@/data/mock-news";
import { getArticlesByTagSlug } from "@/data/mock-search";
import { getFeaturedHeroArticle, getSecondaryHeroArticles } from "@/lib/hero-articles";
import { simulateNetwork } from "./simulate";
import type { NewsArticle } from "@/types/news";

/**
 * TASK-012 뉴스 API 서비스 계층 — `src/data/mock-news.ts` 등의 동기 함수를
 * 비동기 인터페이스로 감싼다. 실제 API/DB로 교체할 때는 이 파일의 내부
 * 구현만 바꾸면 되고, 호출부(페이지/컴포넌트)는 변경할 필요가 없다.
 *
 * 같은 요청 안에서 동일한 인자로 반복 호출되는 것을 막기 위해 `cache()`로
 * 감싼다(React 서버 컴포넌트 요청 스코프 메모이제이션).
 */

export const fetchLatestArticles = cache(async function fetchLatestArticles(
  limit?: number,
  articles: NewsArticle[] = MOCK_NEWS,
): Promise<NewsArticle[]> {
  await simulateNetwork();
  return getLatestArticles(limit, articles);
});

export const fetchPopularArticles = cache(async function fetchPopularArticles(
  limit?: number,
  articles: NewsArticle[] = MOCK_NEWS,
): Promise<NewsArticle[]> {
  await simulateNetwork();
  return getPopularArticles(limit, articles);
});

export const fetchArticlesByCategory = cache(async function fetchArticlesByCategory(
  slug: string,
): Promise<NewsArticle[]> {
  await simulateNetwork();
  return getArticlesByCategory(slug);
});

export const fetchArticleBySlug = cache(async function fetchArticleBySlug(
  slug: string,
): Promise<NewsArticle | undefined> {
  await simulateNetwork();
  return getArticleBySlug(slug);
});

export const fetchRelatedArticles = cache(async function fetchRelatedArticles(
  article: NewsArticle,
  limit = 4,
): Promise<NewsArticle[]> {
  await simulateNetwork();
  return getRelatedArticles(article, limit);
});

export const fetchArticlesByTagSlug = cache(async function fetchArticlesByTagSlug(
  slug: string,
): Promise<NewsArticle[]> {
  await simulateNetwork();
  return getArticlesByTagSlug(slug);
});

export const fetchFeaturedHeroArticle = cache(async function fetchFeaturedHeroArticle(): Promise<NewsArticle> {
  await simulateNetwork();
  return getFeaturedHeroArticle();
});

export const fetchSecondaryHeroArticles = cache(async function fetchSecondaryHeroArticles(
  limit = 6,
): Promise<NewsArticle[]> {
  await simulateNetwork();
  return getSecondaryHeroArticles(limit);
});
