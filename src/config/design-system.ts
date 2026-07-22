import type { BreakingNewsLevel } from "@/types/news";
import { VISIBLE_CATEGORIES } from "@/constants/categories";

/**
 * TASK-002 디자인 시스템 설정 파일.
 *
 * 실제 색상 값(HEX 등)은 여기서 다루지 않는다. 모든 값은
 * `src/styles/tokens.css`에 선언된 CSS 변수 이름(`cssVar`)과, 필요한 경우
 * `@theme inline`으로 생성된 Tailwind 유틸리티 클래스 이름(`className`)만
 * 참조한다. 실제 렌더링은 컴포넌트에서 `var(--token)` 또는 매핑된 유틸리티
 * 클래스를 사용해 수행한다.
 */

export type ColorMode = "dark" | "light";

export interface CategoryColorToken {
  /** src/constants/categories.ts의 NewsCategory.slug 와 동일 */
  slug: string;
  /** 사람이 읽을 수 있는 카테고리명 */
  label: string;
  /** tokens.css에 선언된 CSS 변수 이름 */
  cssVar: string;
  /** @theme inline으로 생성되는 Tailwind 배경색 유틸리티 클래스 이름 */
  className: string;
}

export interface BreakingLevelStyle {
  level: BreakingNewsLevel;
  /** 배지에 표시할 한국어 라벨 (색상 없이도 구분 가능해야 함) */
  label: string;
  description: string;
  /** 배경/강조 색상 변수 */
  colorVar: string;
  /** 테두리 색상 변수 */
  borderVar: string;
  /** 텍스트 색상 변수 (배경 위에서 대비를 보장) */
  textVar: string;
  /** critical 단계에서만 사용하는 제한적인 pulse 여부 */
  pulse: boolean;
  /** lucide-react 아이콘 이름 (색상 독립적 구분용) */
  icon: "Radio" | "AlertTriangle" | "Siren";
}

export interface ContainerWidths {
  /** 전체 뉴스 데스크톱 레이아웃 */
  news: string;
  /** 기사 읽기 영역 */
  article: string;
  /** 데이터 대시보드 영역 */
  dashboard: string;
  /** 모바일 좌우 패딩 */
  mobilePadding: string;
}

export interface BreakpointToken {
  id: string;
  label: string;
  minWidthPx: number;
  /** Tailwind variant 접두어 (예: "", "xs", "sm"...) */
  tailwindPrefix: string;
  usage: string;
}

export interface RadiusToken {
  id: string;
  label: string;
  cssVar: string;
  usage: string;
}

export interface ShadowToken {
  id: string;
  label: string;
  cssVar: string;
  usage: string;
}

export interface MotionDurationToken {
  id: string;
  label: string;
  ms: number;
  cssVar: string;
  usage: string;
}

export interface MotionEasingToken {
  id: string;
  label: string;
  cssVar: string;
  usage: string;
}

export interface ZIndexToken {
  id: string;
  label: string;
  cssVar: string;
  value: number;
  usage: string;
}

export interface DesignSystemConfig {
  themeName: string;
  colorMode: ColorMode;
  categoryColors: CategoryColorToken[];
  breakingLevelStyles: BreakingLevelStyle[];
  containerWidths: ContainerWidths;
  breakpoints: BreakpointToken[];
  radii: RadiusToken[];
  shadows: ShadowToken[];
  motionDurations: MotionDurationToken[];
  motionEasings: MotionEasingToken[];
  zIndexScale: ZIndexToken[];
}

const categoryColors: CategoryColorToken[] = VISIBLE_CATEGORIES.map(
  (category) => ({
    slug: category.slug,
    label: category.name,
    cssVar: `--color-category-${category.slug}`,
    className: `bg-category-${category.slug}`,
  }),
);

const breakingLevelStyles: BreakingLevelStyle[] = [
  {
    level: "normal",
    label: "속보",
    description: "기본 속보 레드. 굵은 텍스트와 스피커 아이콘으로 구분한다.",
    colorVar: "--color-breaking",
    borderVar: "--color-border-breaking",
    textVar: "--color-text-inverse",
    pulse: false,
    icon: "Radio",
  },
  {
    level: "urgent",
    label: "긴급",
    description:
      "레드 + 오렌지 강조. 아이콘과 라벨 텍스트를 함께 사용해 normal과 구분한다.",
    colorVar: "--color-urgent",
    borderVar: "--color-breaking",
    textVar: "--color-text-inverse",
    pulse: false,
    icon: "AlertTriangle",
  },
  {
    level: "critical",
    label: "긴급 속보",
    description:
      "강한 레드 + 높은 대비 + 제한적인 pulse. 가장 중요한 단계에만 사용한다.",
    colorVar: "--color-critical",
    borderVar: "--color-critical",
    textVar: "--color-text-inverse",
    pulse: true,
    icon: "Siren",
  },
];

const containerWidths: ContainerWidths = {
  news: "--container-news",
  article: "--container-article",
  dashboard: "--container-dashboard",
  mobilePadding: "--container-padding-mobile",
};

const breakpoints: BreakpointToken[] = [
  {
    id: "mobile",
    label: "Mobile",
    minWidthPx: 0,
    tailwindPrefix: "",
    usage: "기본(모바일 우선) 스타일. 375px 안팎 기준으로 설계한다.",
  },
  {
    id: "large-mobile",
    label: "Large mobile",
    minWidthPx: 430,
    tailwindPrefix: "xs",
    usage: "대형 폰(430px 전후). 커스텀 브레이크포인트로 추가했다.",
  },
  {
    id: "tablet",
    label: "Tablet",
    minWidthPx: 768,
    tailwindPrefix: "md",
    usage: "태블릿 세로/2단 레이아웃 전환.",
  },
  {
    id: "laptop",
    label: "Laptop",
    minWidthPx: 1024,
    tailwindPrefix: "lg",
    usage: "12열 그리드가 본격적으로 활성화되는 지점.",
  },
  {
    id: "desktop",
    label: "Desktop",
    minWidthPx: 1280,
    tailwindPrefix: "xl",
    usage: "메인 기사 + 사이드바 등 비대칭 배치 기준.",
  },
  {
    id: "wide-desktop",
    label: "Wide desktop",
    minWidthPx: 1536,
    tailwindPrefix: "2xl",
    usage: "와이드 데이터 대시보드, 넓은 여백 확보.",
  },
];

const radii: RadiusToken[] = [
  {
    id: "none",
    label: "radius-none",
    cssVar: "--radius-none",
    usage: "속보 티커, 데이터 테이블처럼 각진 느낌이 필요한 영역",
  },
  {
    id: "xs",
    label: "radius-xs",
    cssVar: "--radius-xs",
    usage: "작은 포커스 아웃라인, 인풋 보조 요소",
  },
  {
    id: "sm",
    label: "radius-sm",
    cssVar: "--radius-sm",
    usage: "배지, 작은 버튼",
  },
  {
    id: "md",
    label: "radius-md",
    cssVar: "--radius-md",
    usage: "일반 뉴스 카드, 패널 (기본값)",
  },
  {
    id: "lg",
    label: "radius-lg",
    cssVar: "--radius-lg",
    usage: "강조 카드, 모달 표면",
  },
  {
    id: "xl",
    label: "radius-xl",
    cssVar: "--radius-xl",
    usage: "대형 히어로 영역 (제한적으로 사용)",
  },
  {
    id: "full",
    label: "radius-full",
    cssVar: "--radius-full",
    usage: "pill 배지, 상태 점, 아바타",
  },
];

const shadows: ShadowToken[] = [
  {
    id: "none",
    label: "shadow-none",
    cssVar: "--shadow-none",
    usage: "평평한 표면, 그림자가 필요 없는 영역",
  },
  {
    id: "xs",
    label: "shadow-xs",
    cssVar: "--shadow-xs",
    usage: "미세한 구분이 필요한 낮은 요소",
  },
  {
    id: "sm",
    label: "shadow-sm",
    cssVar: "--shadow-sm",
    usage: "기본 카드",
  },
  {
    id: "md",
    label: "shadow-md",
    cssVar: "--shadow-md",
    usage: "떠 있는 패널, 드롭다운",
  },
  {
    id: "lg",
    label: "shadow-lg",
    cssVar: "--shadow-lg",
    usage: "모달, 대형 오버레이",
  },
  {
    id: "glow",
    label: "shadow-glow",
    cssVar: "--shadow-glow",
    usage: "핵심 CTA, 실시간 상태 표시 (제한적으로 사용)",
  },
  {
    id: "breaking",
    label: "shadow-breaking",
    cssVar: "--shadow-breaking",
    usage: "속보 강조 (제한적으로 사용)",
  },
];

const motionDurations: MotionDurationToken[] = [
  {
    id: "instant",
    label: "duration-instant",
    ms: 100,
    cssVar: "--duration-instant",
    usage: "즉각적인 상태 변화 (체크, 토글)",
  },
  {
    id: "fast",
    label: "duration-fast",
    ms: 160,
    cssVar: "--duration-fast",
    usage: "hover, 버튼 반응",
  },
  {
    id: "normal",
    label: "duration-normal",
    ms: 260,
    cssVar: "--duration-normal",
    usage: "패널 열기/닫기, 일반 전환",
  },
  {
    id: "slow",
    label: "duration-slow",
    ms: 480,
    cssVar: "--duration-slow",
    usage: "레이아웃 전환, 큰 요소 이동",
  },
  {
    id: "dramatic",
    label: "duration-dramatic",
    ms: 850,
    cssVar: "--duration-dramatic",
    usage: "히어로 진입 등 드문 강조 모션",
  },
];

const motionEasings: MotionEasingToken[] = [
  {
    id: "standard",
    label: "ease-standard",
    cssVar: "--ease-standard",
    usage: "일반적인 상태 전환",
  },
  {
    id: "enter",
    label: "ease-enter",
    cssVar: "--ease-enter",
    usage: "요소가 화면에 나타날 때",
  },
  {
    id: "exit",
    label: "ease-exit",
    cssVar: "--ease-exit",
    usage: "요소가 사라질 때",
  },
  {
    id: "emphasis",
    label: "ease-emphasis",
    cssVar: "--ease-emphasis",
    usage: "속보, 강조가 필요한 전환",
  },
  {
    id: "spring",
    label: "ease-spring",
    cssVar: "--ease-spring",
    usage: "가벼운 탄성이 필요한 소규모 인터랙션",
  },
];

const zIndexScale: ZIndexToken[] = [
  {
    id: "base",
    label: "z-base",
    cssVar: "--z-base",
    value: 0,
    usage: "일반 문서 흐름",
  },
  {
    id: "content",
    label: "z-content",
    cssVar: "--z-content",
    value: 10,
    usage: "카드 위 배지 등 콘텐츠 내부 레이어",
  },
  {
    id: "sticky",
    label: "z-sticky",
    cssVar: "--z-sticky",
    value: 20,
    usage: "스크롤 시 고정되는 요소",
  },
  {
    id: "header",
    label: "z-header",
    cssVar: "--z-header",
    value: 30,
    usage: "상단 헤더/내비게이션",
  },
  {
    id: "dropdown",
    label: "z-dropdown",
    cssVar: "--z-dropdown",
    value: 40,
    usage: "드롭다운, 팝오버",
  },
  {
    id: "overlay",
    label: "z-overlay",
    cssVar: "--z-overlay",
    value: 50,
    usage: "배경 스크림, 드로어",
  },
  {
    id: "modal",
    label: "z-modal",
    cssVar: "--z-modal",
    value: 60,
    usage: "모달 다이얼로그",
  },
  {
    id: "toast",
    label: "z-toast",
    cssVar: "--z-toast",
    value: 70,
    usage: "토스트 알림",
  },
  {
    id: "critical-alert",
    label: "z-critical-alert",
    cssVar: "--z-critical-alert",
    value: 80,
    usage: "critical 속보 전체 화면 경고 (최상위)",
  },
];

export const designSystemConfig: DesignSystemConfig = {
  themeName: "NOVA NEWS Dark Terminal",
  colorMode: "dark",
  categoryColors,
  breakingLevelStyles,
  containerWidths,
  breakpoints,
  radii,
  shadows,
  motionDurations,
  motionEasings,
  zIndexScale,
};
