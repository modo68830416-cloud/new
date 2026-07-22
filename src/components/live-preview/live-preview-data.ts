import { MOCK_NEWS } from "@/data/mock-news";
import { MOCK_BREAKING_NEWS } from "@/data/mock-breaking-news";
import type { RankedNewsListItem } from "@/components/news";
import type { BreakingCenterItem, LiveTimelineEntry, TrendingHubTab } from "@/components/live";

/**
 * `/live-preview` 전용 mock 데이터 조합 (task-008.md).
 *
 * `@/data/mock-news`, `@/data/mock-breaking-news`만 사용하며, `src/components/live/*`
 * 컴포넌트는 이 파일이 조합한 데이터를 props로 전달받는다 (컴포넌트 내부에서
 * mock 데이터를 직접 import하지 않는다는 TASK-007 원칙을 그대로 따른다).
 */

/* ---------------------------------------------------------------------
 * Breaking Center
 * ------------------------------------------------------------------- */

export const liveBreakingCenterItems: BreakingCenterItem[] = MOCK_BREAKING_NEWS.filter(
  (item) => item.isActive && item.articleId,
)
  .map((item): BreakingCenterItem | null => {
    const article = MOCK_NEWS.find((candidate) => candidate.id === item.articleId);
    if (!article) return null;
    return {
      article: { ...article, updatedAt: item.timestamp, isLive: item.level !== "normal" },
      level: item.level,
      locationLabel: item.level === "critical" ? "수도권" : undefined,
    };
  })
  .filter((item): item is BreakingCenterItem => item !== null);

/* ---------------------------------------------------------------------
 * Live Timeline
 * ------------------------------------------------------------------- */

const TIMELINE_STATUS_CYCLE: LiveTimelineEntry["status"][] = ["new", "updated", "resolved"];

export const liveTimelineEntries: LiveTimelineEntry[] = MOCK_BREAKING_NEWS.map((item, index) => {
  const article = item.articleId ? MOCK_NEWS.find((a) => a.id === item.articleId) : undefined;
  return {
    id: item.id,
    timestamp: item.timestamp,
    title: item.title,
    category: article?.category ?? MOCK_NEWS[index % MOCK_NEWS.length].category,
    status: item.isActive ? TIMELINE_STATUS_CYCLE[index % 2] : "resolved",
    href: article ? `/news/${article.slug}` : undefined,
  };
});

/** LiveTimeline "새 항목 추가" 데모용 예비 항목 풀 (preview 페이지에서 하나씩 추가) */
export const liveTimelineExtraEntries: LiveTimelineEntry[] = [
  {
    id: "timeline-extra-01",
    timestamp: new Date().toISOString(),
    title: "가상의 태풍 예상 경로 갱신, 남해안 강풍 주의보 확대",
    category: MOCK_NEWS[0].category,
    status: "new",
  },
  {
    id: "timeline-extra-02",
    timestamp: new Date().toISOString(),
    title: "가상의 정부 합동 브리핑, 30분 뒤 재개 예정",
    category: MOCK_NEWS[1].category,
    status: "updated",
  },
  {
    id: "timeline-extra-03",
    timestamp: new Date().toISOString(),
    title: "가상의 열차 서행 운행 해제, 정상 운행 재개",
    category: MOCK_NEWS[2].category,
    status: "resolved",
  },
];

/* ---------------------------------------------------------------------
 * Trending Hub
 * ------------------------------------------------------------------- */

function toRankedItems(articles: typeof MOCK_NEWS): RankedNewsListItem[] {
  return articles.slice(0, 10).map((article, index) => ({ article, rank: index + 1 }));
}

const popularArticles = [...MOCK_NEWS].sort(
  (a, b) => b.viewCount + b.commentCount * 5 - (a.viewCount + a.commentCount * 5),
);

const mostViewedArticles = [...MOCK_NEWS].sort((a, b) => b.viewCount - a.viewCount);

const mostSharedArticles = [...MOCK_NEWS].sort(
  (a, b) => (b.shareCount ?? 0) - (a.shareCount ?? 0),
);

const rapidlyRisingArticles = [...MOCK_NEWS]
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  .slice(0, 10);

export const liveTrendingHubTabs: TrendingHubTab[] = [
  { id: "popular", label: "인기 뉴스 Top10", items: toRankedItems(popularArticles) },
  { id: "most-viewed", label: "많이 본 기사", items: toRankedItems(mostViewedArticles) },
  { id: "most-shared", label: "많이 공유된 기사", items: toRankedItems(mostSharedArticles) },
  {
    id: "rapidly-rising",
    label: "급상승 기사",
    items: rapidlyRisingArticles.map((article, index) => ({
      article,
      rank: index + 1,
      change: "up" as const,
      delta: 10 - index,
    })),
  },
];
