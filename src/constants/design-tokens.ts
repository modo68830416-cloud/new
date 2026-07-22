/**
 * TASK-002 디자인 토큰 상수.
 *
 * `/design-system` 미리보기 페이지와 향후 컴포넌트가 반복 렌더링(map)할 때
 * 사용할 목록형 상수다. 실제 색상 값은 담지 않고 `src/styles/tokens.css`의
 * CSS 변수 이름만 참조한다.
 */

export type ColorTokenGroup =
  | "background"
  | "surface"
  | "text"
  | "border"
  | "accent"
  | "status"
  | "chart";

export interface ColorSwatchToken {
  id: string;
  label: string;
  cssVar: string;
  group: ColorTokenGroup;
  description: string;
}

export const CORE_COLOR_TOKENS: ColorSwatchToken[] = [
  {
    id: "background",
    label: "background",
    cssVar: "--color-background",
    group: "background",
    description: "페이지 최하단 배경. 매우 어두운 블루 블랙.",
  },
  {
    id: "background-secondary",
    label: "background-secondary",
    cssVar: "--color-background-secondary",
    group: "background",
    description: "블랙에 가까운 네이비. 섹션 구분용 보조 배경.",
  },
  {
    id: "surface",
    label: "surface",
    cssVar: "--color-surface",
    group: "surface",
    description: "카드, 패널의 기본 표면.",
  },
  {
    id: "surface-elevated",
    label: "surface-elevated",
    cssVar: "--color-surface-elevated",
    group: "surface",
    description: "한 단계 밝은 패널. 드롭다운, 팝오버 등에 사용.",
  },
  {
    id: "surface-overlay",
    label: "surface-overlay",
    cssVar: "--color-surface-overlay",
    group: "surface",
    description: "모달/오버레이 표면.",
  },
  {
    id: "text-primary",
    label: "text-primary",
    cssVar: "--color-text-primary",
    group: "text",
    description: "거의 흰색. 본문 제목 등 주요 텍스트.",
  },
  {
    id: "text-secondary",
    label: "text-secondary",
    cssVar: "--color-text-secondary",
    group: "text",
    description: "차가운 회색. 보조 텍스트.",
  },
  {
    id: "text-muted",
    label: "text-muted",
    cssVar: "--color-text-muted",
    group: "text",
    description: "중간 회색. 메타데이터, 캡션.",
  },
  {
    id: "border-subtle",
    label: "border-subtle",
    cssVar: "--color-border-subtle",
    group: "border",
    description: "낮은 투명도의 흰색 테두리.",
  },
  {
    id: "border-default",
    label: "border-default",
    cssVar: "--color-border-default",
    group: "border",
    description: "기본 테두리.",
  },
  {
    id: "border-strong",
    label: "border-strong",
    cssVar: "--color-border-strong",
    group: "border",
    description: "높은 투명도의 흰색 테두리. 강조 구분선.",
  },
  {
    id: "accent-primary",
    label: "accent-primary",
    cssVar: "--color-accent-primary",
    group: "accent",
    description: "전기적인 블루/시안. 핵심 포인트 컬러.",
  },
  {
    id: "accent-secondary",
    label: "accent-secondary",
    cssVar: "--color-accent-secondary",
    group: "accent",
    description: "보라·마젠타. 제한적으로만 사용.",
  },
  {
    id: "breaking",
    label: "breaking",
    cssVar: "--color-breaking",
    group: "status",
    description: "선명한 뉴스 레드. 속보 전용.",
  },
  {
    id: "urgent",
    label: "urgent",
    cssVar: "--color-urgent",
    group: "status",
    description: "주황에 가까운 경고색.",
  },
  {
    id: "critical",
    label: "critical",
    cssVar: "--color-critical",
    group: "status",
    description: "강한 적색. 최고 단계 경고.",
  },
  {
    id: "live",
    label: "live",
    cssVar: "--color-live",
    group: "status",
    description: "실시간 상태 표시용 레드.",
  },
  {
    id: "verified",
    label: "verified",
    cssVar: "--color-verified",
    group: "status",
    description: "신뢰 상태 표시용 블루.",
  },
  {
    id: "exclusive",
    label: "exclusive",
    cssVar: "--color-exclusive",
    group: "status",
    description: "독점 기사 표시용 보라색.",
  },
  {
    id: "success",
    label: "success",
    cssVar: "--color-success",
    group: "status",
    description: "긍정/상승 상태.",
  },
  {
    id: "warning",
    label: "warning",
    cssVar: "--color-warning",
    group: "status",
    description: "경고 상태.",
  },
  {
    id: "info",
    label: "info",
    cssVar: "--color-info",
    group: "status",
    description: "정보성 상태.",
  },
];

export const CHART_COLOR_TOKENS: ColorSwatchToken[] = [
  {
    id: "chart-1",
    label: "chart-1",
    cssVar: "--color-chart-1",
    group: "chart",
    description: "차트 시리즈 1",
  },
  {
    id: "chart-2",
    label: "chart-2",
    cssVar: "--color-chart-2",
    group: "chart",
    description: "차트 시리즈 2",
  },
  {
    id: "chart-3",
    label: "chart-3",
    cssVar: "--color-chart-3",
    group: "chart",
    description: "차트 시리즈 3",
  },
  {
    id: "chart-4",
    label: "chart-4",
    cssVar: "--color-chart-4",
    group: "chart",
    description: "차트 시리즈 4",
  },
  {
    id: "chart-5",
    label: "chart-5",
    cssVar: "--color-chart-5",
    group: "chart",
    description: "차트 시리즈 5",
  },
  {
    id: "chart-6",
    label: "chart-6",
    cssVar: "--color-chart-6",
    group: "chart",
    description: "차트 시리즈 6",
  },
];

export interface SpacingToken {
  id: string;
  label: string;
  cssVar: string;
}

export const SPACING_SCALE: SpacingToken[] = [
  { id: "space-0", label: "space-0", cssVar: "--space-0" },
  { id: "space-1", label: "space-1", cssVar: "--space-1" },
  { id: "space-2", label: "space-2", cssVar: "--space-2" },
  { id: "space-3", label: "space-3", cssVar: "--space-3" },
  { id: "space-4", label: "space-4", cssVar: "--space-4" },
  { id: "space-5", label: "space-5", cssVar: "--space-5" },
  { id: "space-6", label: "space-6", cssVar: "--space-6" },
  { id: "space-8", label: "space-8", cssVar: "--space-8" },
  { id: "space-10", label: "space-10", cssVar: "--space-10" },
  { id: "space-12", label: "space-12", cssVar: "--space-12" },
  { id: "space-16", label: "space-16", cssVar: "--space-16" },
  { id: "space-20", label: "space-20", cssVar: "--space-20" },
  { id: "space-24", label: "space-24", cssVar: "--space-24" },
  { id: "space-32", label: "space-32", cssVar: "--space-32" },
];

export interface TypographyToken {
  id: string;
  label: string;
  /** globals.css utilities.css 에 정의된 type-* 유틸리티 클래스 이름 */
  className: string;
  sampleText: string;
  description: string;
}

export const TYPOGRAPHY_SCALE: TypographyToken[] = [
  {
    id: "display",
    label: "Display",
    className: "type-display",
    sampleText: "NOVA NEWS",
    description: "가장 큰 브랜드/특집 타이틀. 페이지당 극히 제한적으로 사용.",
  },
  {
    id: "hero-title",
    label: "Hero title",
    className: "type-hero-title",
    sampleText: "실시간 속보가 지금 도착했습니다",
    description: "메인 히어로 영역의 대표 타이틀.",
  },
  {
    id: "page-title",
    label: "Page title",
    className: "type-page-title",
    sampleText: "오늘의 주요 뉴스",
    description: "카테고리/섹션 페이지 최상단 타이틀.",
  },
  {
    id: "section-title",
    label: "Section title",
    className: "type-section-title",
    sampleText: "지금 가장 많이 보는 뉴스",
    description: "메인 화면 내 개별 섹션 타이틀.",
  },
  {
    id: "article-title",
    label: "Article title",
    className: "type-article-title",
    sampleText: "속보: 실시간 뉴스 플랫폼 디자인 시스템 공개",
    description: "기사 상세/카드에서 사용하는 기사 제목.",
  },
  {
    id: "card-title",
    label: "Card title",
    className: "type-card-title",
    sampleText: "카드형 뉴스 제목 예시",
    description: "작은 카드, 리스트 아이템 제목.",
  },
  {
    id: "body",
    label: "Body",
    className: "type-body",
    sampleText:
      "본문 텍스트는 편안한 줄 높이와 충분한 대비로 긴 기사도 피로하지 않게 읽을 수 있도록 설계했습니다.",
    description: "기사 본문, 설명 텍스트.",
  },
  {
    id: "caption",
    label: "Caption",
    className: "type-caption",
    sampleText: "사진 설명 또는 부연 텍스트",
    description: "이미지 캡션, 보조 설명.",
  },
  {
    id: "metadata",
    label: "Metadata",
    className: "type-metadata",
    sampleText: "정치 · 3분 전 · 조회 1,204",
    description: "카테고리, 작성 시간, 조회수 등 메타 정보.",
  },
  {
    id: "label",
    label: "Label",
    className: "type-label",
    sampleText: "BREAKING",
    description: "배지, 태그처럼 짧고 강한 라벨.",
  },
  {
    id: "breaking-ticker",
    label: "Breaking ticker",
    className: "type-breaking-ticker",
    sampleText: "속보 | 전국 실시간 속보 티커 예시 문구입니다",
    description: "속보 티커 전용. 과도한 자간 없이 높은 가독성 유지.",
  },
  {
    id: "data-number",
    label: "Data number",
    className: "type-data-number",
    sampleText: "128,492",
    description: "조회수, 시세 등 tabular 숫자.",
  },
];
