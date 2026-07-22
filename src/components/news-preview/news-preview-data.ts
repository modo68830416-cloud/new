import { BREAKING_ARTICLES, MOCK_NEWS, getArticlesByCategory } from "@/data/mock-news";
import type { NewsArticle, NewsContentType, RankedNewsListItem, TrendingKeywordChange } from "@/components/news";

/**
 * `/news-preview` 전용 mock 데이터 조합.
 *
 * TASK-001 mock 데이터(`@/data/mock-news`)만 사용하며, 카드/리스트/그리드
 * 컴포넌트는 이 파일에서 조합한 데이터를 props로 전달받는다 (컴포넌트
 * 내부에서 mock 데이터를 직접 import하지 않는다는 원칙을 preview 페이지가
 * 지킨다).
 */

function withContentType(
  article: NewsArticle,
  contentType: NewsContentType,
  extra?: Partial<NewsArticle>,
): NewsArticle {
  return { ...article, contentType, ...extra };
}

export const previewFeatured: NewsArticle = MOCK_NEWS[0];
export const previewStandardArticles: NewsArticle[] = MOCK_NEWS.slice(1, 5);
export const previewHorizontalArticles: NewsArticle[] = MOCK_NEWS.slice(5, 10);
export const previewCompactArticles: NewsArticle[] = MOCK_NEWS.slice(10, 18);
export const previewBreakingArticles: NewsArticle[] = BREAKING_ARTICLES.slice(0, 3);

export const previewPhotoArticles: NewsArticle[] = MOCK_NEWS.slice(0, 6).map((article) =>
  withContentType(article, "photo"),
);

const VIDEO_DURATIONS = ["03:24", "01:12", "07:45", "00:58"];
export const previewVideoArticles: NewsArticle[] = MOCK_NEWS.slice(6, 10).map((article, index) =>
  withContentType(article, "video", { duration: VIDEO_DURATIONS[index % VIDEO_DURATIONS.length] }),
);

export const previewOpinionArticles: NewsArticle[] = getArticlesByCategory("opinion").map(
  (article) => withContentType(article, "opinion"),
);

const CHANGE_CYCLE: TrendingKeywordChange[] = ["up", "down", "same", "new"];
export const previewRankedItems: RankedNewsListItem[] = [...MOCK_NEWS]
  .sort((a, b) => b.viewCount - a.viewCount)
  .slice(0, 10)
  .map((article, index) => ({
    article,
    rank: index + 1,
    change: CHANGE_CYCLE[index % CHANGE_CYCLE.length],
    delta: index % 2 === 0 ? index + 1 : undefined,
  }));

export const previewFeedArticles: NewsArticle[] = MOCK_NEWS.slice(18, 27);

/* ---------------------------------------------------------------------
 * 상태 / 엣지 케이스 데모용 기사
 * --------------------------------------------------------------------- */

export const previewNoImageArticle: NewsArticle = {
  ...MOCK_NEWS[0],
  id: "preview-no-image",
  slug: "preview-no-image",
  thumbnail: {
    ...MOCK_NEWS[0].thumbnail,
    url: "",
    alt: "이미지를 불러오지 못한 예시 기사",
  },
};

export const previewLongTitleArticle: NewsArticle = {
  ...MOCK_NEWS[1],
  id: "preview-long-title",
  slug: "preview-long-title",
  title:
    "긴 제목 테스트를 위한 예시 기사 제목입니다 두 줄에서 세 줄까지 자연스럽게 줄바꿈되고 line-clamp 처리되는지 확인하기 위해 반복적으로 길게 늘인 한국어 뉴스 헤드라인 문구를 그대로 사용합니다",
};

export const previewLongSourceArticle: NewsArticle = {
  ...MOCK_NEWS[2],
  id: "preview-long-source",
  slug: "preview-long-source",
  source: { id: "src-preview-long", name: "대한민국 지역 종합 시사 주간 특별 취재본부 뉴스통신사" },
};

export const previewMissingMetaArticle: NewsArticle = {
  ...MOCK_NEWS[3],
  id: "preview-missing-meta",
  slug: "preview-missing-meta",
  author: undefined,
  subtitle: undefined,
  isExclusive: undefined,
  shareCount: undefined,
  updatedAt: undefined,
};
