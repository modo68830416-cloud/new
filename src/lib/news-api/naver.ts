import { getCategoryBySlug } from "@/constants/categories";
import type { NewsArticle, NewsCategory } from "@/types/news";
import { NewsApiError } from "./simulate";

/**
 * 네이버 뉴스 검색 API(https://developers.naver.com/docs/serviceapi/search/news/news.md)
 * 연동. 키워드 검색 기반 API라 "실시간 속보 전체" 같은 개념은 없고, 카테고리별
 * 키워드로 검색해 `sort=date`로 최신순 정렬한 결과를 각 카테고리의 대표 기사로
 * 사용한다.
 *
 * 네이버 오픈 API 이용 정책상 원문을 재가공하지 않고 요약(description)만
 * 보여주고 원문 링크(`originallink`)로 안내해야 하므로, 매핑 결과의
 * `externalUrl`을 소비하는 쪽(FeaturedHero/SecondaryNewsGrid)에서 자체
 * 상세 페이지 대신 원문으로 링크한다.
 */

const NAVER_NEWS_ENDPOINT = "https://openapi.naver.com/v1/search/news.json";

interface NaverNewsItem {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: string;
}

interface NaverNewsResponse {
  items: NaverNewsItem[];
}

/** 홈페이지 Secondary Grid에 다양성을 주기 위한 카테고리별 검색 키워드 */
const CATEGORY_QUERIES: { slug: string; query: string }[] = [
  { slug: "politics", query: "정치" },
  { slug: "economy", query: "경제" },
  { slug: "society", query: "사회" },
  { slug: "world", query: "국제" },
  { slug: "it-science", query: "IT 과학" },
  { slug: "sports", query: "스포츠" },
];

export function isNaverNewsConfigured(): boolean {
  return Boolean(process.env.NAVER_CLIENT_ID && process.env.NAVER_CLIENT_SECRET);
}

const HTML_ENTITIES: Record<string, string> = {
  "&quot;": '"',
  "&apos;": "'",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
};

function cleanText(raw: string): string {
  return raw
    .replace(/<\/?b>/g, "")
    .replace(/&quot;|&apos;|&amp;|&lt;|&gt;/g, (entity) => HTML_ENTITIES[entity] ?? entity)
    .trim();
}

function sourceNameFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "네이버뉴스";
  }
}

function thumbnailFor(categorySlug: string, alt: string) {
  return {
    id: `naver-thumb-${categorySlug}`,
    type: "image" as const,
    url: `/placeholders/category-${categorySlug}.svg`,
    alt,
    width: 800,
    height: 450,
  };
}

function toNewsArticle(item: NaverNewsItem, category: NewsCategory, index: number): NewsArticle {
  const title = cleanText(item.title);
  const externalUrl = item.originallink || item.link;

  return {
    id: `naver-${category.slug}-${index}-${item.link}`,
    slug: `naver-${category.slug}-${index}`,
    title,
    summary: cleanText(item.description),
    content: cleanText(item.description),
    category,
    source: { id: `src-${sourceNameFromUrl(externalUrl)}`, name: sourceNameFromUrl(externalUrl) },
    publishedAt: new Date(item.pubDate).toISOString(),
    thumbnail: thumbnailFor(category.slug, title),
    isBreaking: false,
    isFeatured: false,
    viewCount: 0,
    commentCount: 0,
    tags: [],
    externalUrl,
  };
}

async function searchNaverNews(query: string, display: number): Promise<NaverNewsItem[]> {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new NewsApiError("네이버 뉴스 API 키가 설정되지 않았습니다.");
  }

  const url = `${NAVER_NEWS_ENDPOINT}?query=${encodeURIComponent(query)}&display=${display}&sort=date`;
  const response = await fetch(url, {
    headers: {
      "X-Naver-Client-Id": clientId,
      "X-Naver-Client-Secret": clientSecret,
    },
    // 완전히 실시간은 아니지만 60초마다 새로 가져와 최신 상태를 유지한다.
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new NewsApiError(`네이버 뉴스 API 호출에 실패했습니다. (${response.status})`);
  }

  const data = (await response.json()) as NaverNewsResponse;
  return data.items ?? [];
}

/** 홈페이지 Featured Hero용 대표 기사 1건 (최신 속보 키워드 기준) */
export async function fetchNaverFeaturedArticle(): Promise<NewsArticle> {
  const category = getCategoryBySlug("breaking");
  if (!category) {
    throw new NewsApiError("breaking 카테고리를 찾을 수 없습니다.");
  }

  const items = await searchNaverNews("속보", 1);
  const [item] = items;
  if (!item) {
    throw new NewsApiError("네이버 뉴스 검색 결과가 없습니다.");
  }

  return { ...toNewsArticle(item, category, 0), isFeatured: true, isBreaking: true };
}

/** 홈페이지 Secondary Grid용 카테고리별 최신 기사 목록 */
export async function fetchNaverSecondaryArticles(limit = 6): Promise<NewsArticle[]> {
  const queries = CATEGORY_QUERIES.slice(0, limit);

  const results = await Promise.all(
    queries.map(async ({ slug, query }, index) => {
      const category = getCategoryBySlug(slug);
      if (!category) return null;

      const items = await searchNaverNews(query, 1);
      const [item] = items;
      if (!item) return null;

      return toNewsArticle(item, category, index);
    }),
  );

  const articles = results.filter((article): article is NewsArticle => article !== null);
  if (articles.length === 0) {
    throw new NewsApiError("네이버 뉴스 검색 결과가 없습니다.");
  }

  return articles;
}
