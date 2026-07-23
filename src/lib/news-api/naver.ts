import { getCategoryBySlug } from "@/constants/categories";
import type { BreakingNewsItem, BreakingNewsLevel, NewsArticle, NewsCategory } from "@/types/news";
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

/**
 * 카테고리 slug → 네이버 뉴스 검색 키워드. 카테고리 페이지(`/category/[slug]`)
 * 전체와 홈페이지 Secondary Grid가 공유한다.
 */
const CATEGORY_QUERY_MAP: Record<string, string> = {
  breaking: "속보",
  politics: "정치",
  economy: "경제",
  society: "사회",
  world: "국제",
  industry: "산업",
  "it-science": "IT 과학",
  culture: "문화",
  entertainment: "연예",
  sports: "스포츠",
  life: "생활",
  opinion: "칼럼",
};

/** 홈페이지 Secondary Grid에 다양성을 주기 위한 카테고리별 검색 키워드 */
const CATEGORY_QUERIES: { slug: string; query: string }[] = [
  { slug: "politics", query: CATEGORY_QUERY_MAP.politics },
  { slug: "economy", query: CATEGORY_QUERY_MAP.economy },
  { slug: "society", query: CATEGORY_QUERY_MAP.society },
  { slug: "world", query: CATEGORY_QUERY_MAP.world },
  { slug: "it-science", query: CATEGORY_QUERY_MAP["it-science"] },
  { slug: "sports", query: CATEGORY_QUERY_MAP.sports },
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

function placeholderThumbnail(categorySlug: string, alt: string) {
  return {
    id: `naver-thumb-${categorySlug}`,
    type: "image" as const,
    url: `/placeholders/category-${categorySlug}.svg`,
    alt,
    width: 800,
    height: 450,
  };
}

const META_TAG_PATTERN = /<meta\b[^>]*>/gi;
const OG_IMAGE_NAME_PATTERN =
  /(?:property|name)\s*=\s*["'](?:og:image(?::secure_url|:url)?|twitter:image(?::src)?)["']/i;
const CONTENT_ATTR_PATTERN = /content\s*=\s*["']([^"']+)["']/i;

/**
 * 기사 사진이 아니라 언론사가 모든 기사에 공통으로 박아두는 기본
 * 로고/공유용 이미지로 보이면 걸러낸다 (예: 매일경제의
 * `facebook_mknews.jpg`처럼 사이트 전체에서 재사용되는 고정 파일명).
 * 이런 이미지는 실제로는 "기사 사진 없음"과 같으므로, 후보 기사 여러 건 중
 * 진짜 사진이 있는 다음 후보로 넘어가게 한다.
 */
const GENERIC_IMAGE_PATTERN =
  /facebook_|default[._-]|no[_-]?image|noimage|og[_-]?default|share[_-]?default|snslogo|sns[_-]?default|logo/i;

function isGenericSiteImage(imageUrl: string): boolean {
  try {
    const { pathname } = new URL(imageUrl);
    const filename = pathname.split("/").pop() ?? "";
    return GENERIC_IMAGE_PATTERN.test(filename);
  } catch {
    return false;
  }
}

/**
 * HTML 문자열에서 og:image(또는 twitter:image) 메타 태그의 content를 찾는다.
 *
 * `<meta property="og:image" content="...">`와 `<meta content="..."
 * property="og:image">`처럼 속성 순서가 사이트마다 달라서, 정규식 하나로
 * "property 다음에 content"를 가정하면 절반 가까이 놓친다 — 태그 단위로
 * 쪼갠 뒤 두 속성을 순서 무관하게 각각 찾는다.
 */
function extractOgImage(html: string): string | undefined {
  const metaTags = html.match(META_TAG_PATTERN) ?? [];
  for (const tag of metaTags) {
    if (!OG_IMAGE_NAME_PATTERN.test(tag)) continue;
    const contentMatch = tag.match(CONTENT_ATTR_PATTERN);
    if (contentMatch && !isGenericSiteImage(contentMatch[1])) return contentMatch[1];
  }
  return undefined;
}

/**
 * 원문 기사 페이지에서 Open Graph 이미지를 추출한다.
 *
 * 네이버 뉴스 검색 API 자체는 썸네일 URL을 제공하지 않아서(제목·요약·링크만
 * 옴), 카드 미리보기에 실제 기사 사진이 뜨게 하려면 원문 HTML의
 * `og:image`를 직접 가져와야 한다. 느리거나 차단하는 사이트 때문에 홈페이지
 * 전체가 지연되지 않도록 짧은 타임아웃을 두고, 실패하면 조용히 undefined를
 * 반환해 카테고리 그라데이션 placeholder로 자연스럽게 폴백한다.
 */
async function fetchOgImage(pageUrl: string): Promise<string | undefined> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(pageUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) return undefined;

    // og:image는 보통 <head> 안에 있으므로 전체를 다 받지 않고 앞부분만 읽는다.
    const reader = response.body?.getReader();
    if (!reader) return undefined;

    const decoder = new TextDecoder();
    let html = "";
    while (html.length < 150_000) {
      const { done, value } = await reader.read();
      if (done) break;
      html += decoder.decode(value, { stream: true });

      if (/<\/head>/i.test(html)) break;

      const match = extractOgImage(html);
      if (match) {
        reader.cancel().catch(() => {});
        return new URL(match, pageUrl).toString();
      }
    }
    reader.cancel().catch(() => {});

    const finalMatch = extractOgImage(html);
    return finalMatch ? new URL(finalMatch, pageUrl).toString() : undefined;
  } catch {
    return undefined;
  } finally {
    clearTimeout(timeout);
  }
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
    thumbnail: placeholderThumbnail(category.slug, title),
    isBreaking: false,
    isFeatured: false,
    viewCount: 0,
    commentCount: 0,
    tags: [],
    externalUrl,
  };
}

/** 가능하면 원문 og:image로, 실패하면 카테고리 placeholder를 그대로 둔다 */
async function withOgImage(article: NewsArticle): Promise<NewsArticle> {
  const ogImageUrl = await fetchOgImage(article.externalUrl!);
  if (!ogImageUrl) return article;

  return {
    ...article,
    thumbnail: { ...article.thumbnail, url: ogImageUrl },
  };
}

/**
 * 후보 기사 여러 건 중 og:image를 실제로 구할 수 있는 첫 번째를 고른다.
 *
 * 검색 결과 1건만 보면 그 사이트가 하필 og:image가 없을 때 대표 자리(특히
 * Featured Hero)가 그라데이션 placeholder로만 채워지는 일이 잦았다. 후보를
 * 여러 개(`display`) 받아 각각 og:image 유무를 병렬로 확인하고, 이미지가
 * 있는 첫 기사를 우선 채택한다 — 모두 실패하면 그냥 1번째 기사를
 * placeholder로 사용한다.
 */
async function pickArticleWithImage(
  items: NaverNewsItem[],
  category: NewsCategory,
  index: number,
): Promise<NewsArticle> {
  const candidates = await Promise.all(
    items.map((item) => withOgImage(toNewsArticle(item, category, index))),
  );

  return (
    candidates.find((candidate) => candidate.thumbnail.url.startsWith("http")) ?? candidates[0]
  );
}

async function searchNaverNews(
  query: string,
  display: number,
  sort: "date" | "sim" = "date",
): Promise<NaverNewsItem[]> {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new NewsApiError("네이버 뉴스 API 키가 설정되지 않았습니다.");
  }

  const url = `${NAVER_NEWS_ENDPOINT}?query=${encodeURIComponent(query)}&display=${display}&sort=${sort}`;
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

  const items = await searchNaverNews("속보", 5);
  if (items.length === 0) {
    throw new NewsApiError("네이버 뉴스 검색 결과가 없습니다.");
  }

  const article = await pickArticleWithImage(items, category, 0);
  return { ...article, isFeatured: true, isBreaking: true };
}

/** 홈페이지 Secondary Grid용 카테고리별 최신 기사 목록 */
export async function fetchNaverSecondaryArticles(limit = 6): Promise<NewsArticle[]> {
  const queries = CATEGORY_QUERIES.slice(0, limit);

  const results = await Promise.all(
    queries.map(async ({ slug, query }, index) => {
      const category = getCategoryBySlug(slug);
      if (!category) return null;

      const items = await searchNaverNews(query, 4);
      if (items.length === 0) return null;

      return pickArticleWithImage(items, category, index);
    }),
  );

  const articles = results.filter((article): article is NewsArticle => article !== null);
  if (articles.length === 0) {
    throw new NewsApiError("네이버 뉴스 검색 결과가 없습니다.");
  }

  return articles;
}

/**
 * 헤더 아래 속보 티커(`BreakingTicker`)용 항목.
 *
 * 이전에는 mock 데이터를 쓰면서 클릭 자체가 연결돼 있지 않았다 — 이제 실제
 * "속보" 검색 결과의 원문 링크(`externalUrl`)를 그대로 달아서 클릭하면
 * 원문 기사로 이동하게 한다.
 */
export async function fetchNaverBreakingTicker(limit = 8): Promise<BreakingNewsItem[]> {
  const items = await searchNaverNews("속보", limit);
  if (items.length === 0) {
    throw new NewsApiError("네이버 뉴스 검색 결과가 없습니다.");
  }

  return items.map((item, index) => {
    const level: BreakingNewsLevel = index === 0 ? "critical" : index < 3 ? "urgent" : "normal";
    return {
      id: `naver-breaking-${index}-${item.link}`,
      title: cleanText(item.title),
      timestamp: new Date(item.pubDate).toISOString(),
      level,
      isActive: true,
      externalUrl: item.originallink || item.link,
    };
  });
}

/**
 * 검색 페이지(`/search?q=`)와 실시간 인기 검색어 클릭이 실제 기사로
 * 이어지도록, 검색어를 네이버 뉴스 검색 API에 그대로 넘겨 실제 결과를
 * 가져온다. 네이버는 카테고리 개념이 없는 키워드 검색이라 결과 카테고리는
 * 임의로 "사회"로 채운다(배지 표시용일 뿐 실제 분류 의미는 없음).
 */
export async function fetchNaverSearchResults(query: string, display = 10): Promise<NewsArticle[]> {
  const category = getCategoryBySlug("society");
  if (!category) {
    throw new NewsApiError("society 카테고리를 찾을 수 없습니다.");
  }

  const items = await searchNaverNews(query, display, "sim");
  if (items.length === 0) return [];

  return Promise.all(items.map((item, index) => withOgImage(toNewsArticle(item, category, index))));
}

/**
 * 카테고리 페이지(`/category/[slug]`)용 기사 목록.
 *
 * 이전에는 이 페이지 전체가 mock 전용이라 상단 내비게이션의 카테고리
 * 탭(예: "속보")을 누르면 홈페이지의 실제 뉴스와 무관한 가상의 mock
 * 기사만 나왔다 — 같은 방식으로 실제 검색 결과를 채운다.
 */
export async function fetchNaverArticlesByCategory(
  slug: string,
  limit = 16,
): Promise<NewsArticle[]> {
  const category = getCategoryBySlug(slug);
  const query = CATEGORY_QUERY_MAP[slug];
  if (!category || !query) {
    throw new NewsApiError(`지원하지 않는 카테고리입니다: ${slug}`);
  }

  const items = await searchNaverNews(query, limit, "date");
  if (items.length === 0) return [];

  return Promise.all(items.map((item, index) => withOgImage(toNewsArticle(item, category, index))));
}
