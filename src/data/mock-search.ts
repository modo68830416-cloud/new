import { VISIBLE_CATEGORIES } from "@/constants/categories";
import { MOCK_NEWS } from "./mock-news";
import { MOCK_TRENDING_KEYWORDS } from "./mock-trending-keywords";
import type { NewsArticle, NewsContentType, TrendingKeywordChange } from "@/types/news";

/**
 * TASK-010 검색/필터/태그/아카이브 mock 데이터 계층.
 *
 * 실제 검색 엔진(Elasticsearch/OpenSearch 등)이나 API 없이, `MOCK_NEWS`를
 * 대상으로 하는 순수 함수(문자열 포함 매칭 + 정렬)만으로 검색을 흉내낸다.
 * 태그는 `NewsArticle.tags: string[]`를 그대로 사용하며 별도의 태그 엔티티
 * 타입을 새로 추가하지 않는다 — 태그 문자열 자체를 `/tag/[slug]`의 slug로
 * 사용한다.
 */

/* -----------------------------------------------------------------------
 * 정렬 / 필터 상태 타입
 * --------------------------------------------------------------------- */

export type SearchSortOption = "latest" | "popular" | "most-viewed" | "relevance";

export const SEARCH_SORT_OPTIONS: { value: SearchSortOption; label: string }[] = [
  { value: "latest", label: "최신순" },
  { value: "popular", label: "인기순" },
  { value: "most-viewed", label: "조회순" },
  { value: "relevance", label: "관련도순" },
];

/** 필터 패널에서 다룰 콘텐츠 유형 (전체 NewsContentType 중 실제로 노출할 것만) */
export const SEARCH_CONTENT_TYPES: { value: NewsContentType; label: string }[] = [
  { value: "article", label: "일반 기사" },
  { value: "breaking", label: "속보" },
  { value: "photo", label: "포토" },
  { value: "video", label: "영상" },
  { value: "opinion", label: "오피니언" },
  { value: "live", label: "라이브" },
];

export interface SearchFilterState {
  categorySlugs: string[];
  contentTypes: NewsContentType[];
  dateFrom?: string;
  dateTo?: string;
  breakingOnly: boolean;
  liveOnly: boolean;
}

export const DEFAULT_SEARCH_FILTERS: SearchFilterState = {
  categorySlugs: [],
  contentTypes: [],
  dateFrom: undefined,
  dateTo: undefined,
  breakingOnly: false,
  liveOnly: false,
};

export function isSearchFilterActive(filters: SearchFilterState): boolean {
  return (
    filters.categorySlugs.length > 0 ||
    filters.contentTypes.length > 0 ||
    Boolean(filters.dateFrom) ||
    Boolean(filters.dateTo) ||
    filters.breakingOnly ||
    filters.liveOnly
  );
}

/* -----------------------------------------------------------------------
 * 자동완성 / 검색어 옵션 공용 타입
 * --------------------------------------------------------------------- */

export type SuggestionType =
  | "recent"
  | "popular"
  | "article"
  | "category"
  | "tag"
  | "keyword";

/** SearchBox 콤보박스가 다루는 단일 옵션(자동완성/최근 검색어/인기 검색어 공용) */
export interface SuggestionOption {
  id: string;
  type: SuggestionType;
  label: string;
  href: string;
  meta?: string;
  rank?: number;
  change?: TrendingKeywordChange;
}

export interface SuggestionGroup {
  type: SuggestionType;
  title: string;
  options: SuggestionOption[];
}

/* -----------------------------------------------------------------------
 * 태그
 * --------------------------------------------------------------------- */

export interface TagSummary {
  tag: string;
  /** `/tag/[slug]`의 slug — 별도 인코딩 없이 태그 문자열 그대로 사용한다 */
  slug: string;
  count: number;
}

/** 전체 기사에서 등장하는 고유 태그 목록(등장 빈도 내림차순) */
export function getAllTags(): TagSummary[] {
  const counts = new Map<string, number>();
  for (const article of MOCK_NEWS) {
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, slug: tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "ko"));
}

/** 인기 태그 상위 N개 (필터 패널의 빠른 태그 선택 등에서 사용) */
export function getPopularTags(limit = 12): TagSummary[] {
  return getAllTags().slice(0, limit);
}

export function getTagBySlug(slug: string): TagSummary | undefined {
  const decoded = safeDecode(slug);
  return getAllTags().find((item) => item.tag === decoded);
}

/** 태그 slug(=태그 문자열)로 해당 태그가 달린 기사 목록을 최신순으로 반환한다 */
export function getArticlesByTagSlug(slug: string): NewsArticle[] {
  const decoded = safeDecode(slug);
  return [...MOCK_NEWS]
    .filter((article) => article.tags.includes(decoded))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/* -----------------------------------------------------------------------
 * 검색어 매칭 / 필터 / 정렬
 * --------------------------------------------------------------------- */

function normalize(text: string): string {
  return text.trim().toLowerCase();
}

export function matchesQuery(article: NewsArticle, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;
  return (
    normalize(article.title).includes(q) ||
    normalize(article.summary).includes(q) ||
    normalize(article.category.name).includes(q) ||
    normalize(article.source.name).includes(q) ||
    article.tags.some((tag) => normalize(tag).includes(q))
  );
}

export function applySearchFilters(
  articles: NewsArticle[],
  filters: SearchFilterState,
): NewsArticle[] {
  return articles.filter((article) => {
    if (
      filters.categorySlugs.length > 0 &&
      !filters.categorySlugs.includes(article.category.slug)
    ) {
      return false;
    }

    if (filters.contentTypes.length > 0) {
      const type: NewsContentType = article.contentType ?? "article";
      if (!filters.contentTypes.includes(type)) return false;
    }

    if (filters.breakingOnly && !article.isBreaking) return false;
    if (filters.liveOnly && !article.isLive) return false;

    const publishedAt = new Date(article.publishedAt).getTime();

    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom).getTime();
      if (!Number.isNaN(from) && publishedAt < from) return false;
    }

    if (filters.dateTo) {
      const to = new Date(filters.dateTo);
      to.setHours(23, 59, 59, 999);
      if (!Number.isNaN(to.getTime()) && publishedAt > to.getTime()) return false;
    }

    return true;
  });
}

function relevanceScore(article: NewsArticle, query: string): number {
  const q = normalize(query);
  if (!q) return 0;
  let score = 0;
  if (normalize(article.title).includes(q)) score += 5;
  if (article.tags.some((tag) => normalize(tag).includes(q))) score += 3;
  if (normalize(article.summary).includes(q)) score += 2;
  if (normalize(article.category.name).includes(q)) score += 1;
  return score;
}

export function sortSearchResults(
  articles: NewsArticle[],
  sort: SearchSortOption,
  query = "",
): NewsArticle[] {
  const list = [...articles];
  switch (sort) {
    case "most-viewed":
      return list.sort((a, b) => b.viewCount - a.viewCount);
    case "popular":
      return list.sort(
        (a, b) => b.viewCount + b.commentCount * 5 - (a.viewCount + a.commentCount * 5),
      );
    case "relevance":
      return list.sort((a, b) => {
        const diff = relevanceScore(b, query) - relevanceScore(a, query);
        if (diff !== 0) return diff;
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
    case "latest":
    default:
      return list.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
  }
}

/** 검색어 + 필터 + 정렬을 한 번에 적용한 최종 검색 결과 */
export function searchArticles(
  query: string,
  filters: SearchFilterState = DEFAULT_SEARCH_FILTERS,
  sort: SearchSortOption = "latest",
): NewsArticle[] {
  const matched = MOCK_NEWS.filter((article) => matchesQuery(article, query));
  const filtered = applySearchFilters(matched, filters);
  return sortSearchResults(filtered, sort, query);
}

/* -----------------------------------------------------------------------
 * 자동완성 / 인기 검색어
 * --------------------------------------------------------------------- */

/** 인기 검색어 — 트렌딩 키워드를 순위 기준으로 사용한다 */
export function getPopularSearchKeywords(limit?: number) {
  const sorted = [...MOCK_TRENDING_KEYWORDS].sort((a, b) => a.rank - b.rank);
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

/**
 * 검색어 기반 자동완성 그룹(Mock). 기사 / 카테고리 / 태그 / 추천 검색어
 * 4개 그룹 중 결과가 있는 그룹만 반환한다.
 */
export function getAutocompleteSuggestions(query: string, limitPerGroup = 5): SuggestionGroup[] {
  const q = normalize(query);
  if (!q) return [];

  const articleOptions: SuggestionOption[] = MOCK_NEWS.filter((article) =>
    normalize(article.title).includes(q),
  )
    .slice(0, limitPerGroup)
    .map((article) => ({
      id: `option-article-${article.id}`,
      type: "article",
      label: article.title,
      meta: article.category.name,
      href: `/news/${article.slug}`,
    }));

  const categoryOptions: SuggestionOption[] = VISIBLE_CATEGORIES.filter(
    (category) => normalize(category.name).includes(q) || normalize(category.slug).includes(q),
  )
    .slice(0, limitPerGroup)
    .map((category) => ({
      id: `option-category-${category.slug}`,
      type: "category",
      label: category.name,
      meta: "카테고리",
      href: `/category/${category.slug}`,
    }));

  const tagOptions: SuggestionOption[] = getAllTags()
    .filter((tag) => normalize(tag.tag).includes(q))
    .slice(0, limitPerGroup)
    .map((tag) => ({
      id: `option-tag-${tag.slug}`,
      type: "tag",
      label: `#${tag.tag}`,
      meta: `${tag.count}건`,
      href: `/tag/${encodeURIComponent(tag.slug)}`,
    }));

  const keywordOptions: SuggestionOption[] = MOCK_TRENDING_KEYWORDS.filter((keyword) =>
    normalize(keyword.keyword).includes(q),
  )
    .slice(0, limitPerGroup)
    .map((keyword) => ({
      id: `option-keyword-${keyword.id}`,
      type: "keyword",
      label: keyword.keyword,
      meta: "추천 검색어",
      href: `/search?q=${encodeURIComponent(keyword.keyword)}`,
      rank: keyword.rank,
      change: keyword.change,
    }));

  const groups: SuggestionGroup[] = [
    { type: "article", title: "기사", options: articleOptions },
    { type: "category", title: "카테고리", options: categoryOptions },
    { type: "tag", title: "태그", options: tagOptions },
    { type: "keyword", title: "추천 검색어", options: keywordOptions },
  ];

  return groups.filter((group) => group.options.length > 0);
}
