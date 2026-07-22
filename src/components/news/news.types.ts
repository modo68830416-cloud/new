import type { ReactNode } from "react";
import type {
  Author,
  BreakingNewsLevel,
  NewsArticle,
  NewsCategory,
  NewsContentType,
  NewsSource,
  TrendingKeywordChange,
} from "@/types/news";

/**
 * TASK-007 뉴스 카드 시스템의 공용 타입 정의.
 *
 * 원칙 (task-007.md 5절):
 * - `any`를 사용하지 않는다.
 * - variant/size 등은 항상 명시적인 union 타입으로 정의한다.
 * - 뉴스 데이터 자체는 `@/types/news`의 `NewsArticle`을 그대로 사용한다.
 *   (별도의 평탄화된 NewsItem 타입을 새로 만들지 않는다 — 이미 `NewsArticle`이
 *   category/source/thumbnail을 포함한 완전한 모델이며, Header/Hero 등
 *   기존 컴포넌트와 동일한 데이터 계약을 공유해야 카드 시스템이 실제로
 *   재사용 가능하다.)
 * - 카드는 mock 데이터를 직접 import하지 않는다 — 항상 props로 데이터를
 *   받는다 (`article`, `articles`, `featured`, `items` 등).
 */

export type {
  Author,
  BreakingNewsLevel,
  NewsArticle,
  NewsCategory,
  NewsContentType,
  NewsSource,
  TrendingKeywordChange,
};

/* -----------------------------------------------------------------------
 * 공용 primitive 타입
 * --------------------------------------------------------------------- */

/** NewsImage가 지원하는 이미지 비율 */
export type NewsImageRatio = "16:9" | "4:3" | "3:2" | "1:1" | "portrait";

/** 이미지 위 텍스트 가독성을 위한 오버레이 강도 */
export type NewsImageOverlay = "none" | "subtle" | "strong";

export interface NewsImageProps {
  /** 없으면 중립적인 fallback surface를 표시한다 (깨진 이미지 아이콘 금지) */
  src?: string;
  alt: string;
  ratio?: NewsImageRatio;
  /** 첫 화면 핵심 이미지에만 true로 전달한다 */
  priority?: boolean;
  sizes?: string;
  overlay?: NewsImageOverlay;
  /** 가장 가까운 `group` 조상(카드 컨테이너)의 hover/focus 시 살짝 확대된다 */
  enableZoom?: boolean;
  blurDataURL?: string;
  className?: string;
  imgClassName?: string;
  /**
   * 이미지 위에 얹을 임의 콘텐츠(뱃지, 캡션, 재생 아이콘 등). 이미지와 같은
   * `relative` 컨테이너 안에 렌더링되므로 `absolute` 클래스로 배치한다.
   */
  overlayContent?: ReactNode;
}

export type NewsTitleLevel = "h2" | "h3" | "h4" | "h5";
export type NewsTitleSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface NewsTitleProps {
  children: ReactNode;
  /** 렌더링할 heading 레벨. 문맥에 맞는 계층을 호출부에서 명시한다 */
  level?: NewsTitleLevel;
  size?: NewsTitleSize;
  /** 1~4줄 제한. 제목 전체를 억지로 한 줄에 넣지 않는다 */
  lineClamp?: 1 | 2 | 3 | 4;
  className?: string;
}

export interface NewsSummaryProps {
  children: ReactNode;
  lineClamp?: 2 | 3;
  /** 모바일에서 숨길지 여부 (작은 카드에서 사용) */
  hideOnMobile?: boolean;
  className?: string;
}

export interface NewsCardMetaProps {
  category?: Pick<NewsCategory, "slug" | "name" | "shortName">;
  showCategory?: boolean;
  sourceName?: string;
  authorName?: string;
  publishedAt?: string;
  updatedAt?: string;
  viewCount?: number;
  commentCount?: number;
  /** 영상 길이 (예: "03:24") */
  duration?: string;
  isLive?: boolean;
  className?: string;
}

export interface NewsSourceLineProps {
  source?: NewsSource;
  author?: Author;
  /** 저자 직책/소개 (오피니언 카드 등에서 사용) */
  authorRole?: string;
  className?: string;
}

export interface NewsCardLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
  /** 카드 자체가 아직 실제 목적지가 없을 때(preview 등) 클릭을 막고 안내한다 */
  disabledReason?: string;
}

export interface NewsShareActionProps {
  /** 준비 중 상태를 알리는 title/aria-disabled 문구 */
  label?: string;
  className?: string;
  onShare?: () => void;
}

/* -----------------------------------------------------------------------
 * 카드 공용 타입
 * --------------------------------------------------------------------- */

export type NewsCardSize = "small" | "medium" | "large";

export interface NewsCardBaseProps {
  article: NewsArticle;
  className?: string;
  /** 첫 화면에 노출되는 카드에만 true로 전달 (next/image priority) */
  priority?: boolean;
}

/* -----------------------------------------------------------------------
 * 리스트 / 그리드 / 섹션 타입
 * --------------------------------------------------------------------- */

export type NewsFeedLayout = "list" | "grid" | "mixed";
export type NewsGridColumns = 2 | 3 | 4;
export type CategorySectionLayout = "featured-grid" | "standard-grid" | "list";

/** 인기 뉴스 리스트/카드에서 사용하는 순위 항목 (기사 + 순위 컨텍스트) */
export interface RankedNewsListItem {
  article: NewsArticle;
  rank: number;
  change?: TrendingKeywordChange;
  delta?: number;
}

export interface NewsAsyncStateProps {
  /** true면 skeleton을 표시한다 */
  isLoading?: boolean;
  /** 문자열(또는 Error)이 있으면 error 상태를 표시한다 */
  error?: string | null;
  onRetry?: () => void;
}

export interface CategorySectionProps {
  title: string;
  category: NewsCategory;
  featured: NewsArticle;
  items: NewsArticle[];
  href: string;
  layout?: CategorySectionLayout;
  /** "list" 레이아웃 등에서 추가로 보여줄 압축 리스트 (선택) */
  compactItems?: NewsArticle[];
  className?: string;
}
