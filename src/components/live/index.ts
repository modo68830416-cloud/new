/**
 * TASK-008 실시간 속보 센터 / 트렌드 허브 UI의 공개 API 모음.
 *
 * 소비하는 쪽(페이지)은 항상 이 배럴을 통해 import한다:
 * `import { BreakingCenter, TrendingHub } from "@/components/live";`
 *
 * 모든 컴포넌트는 mock 데이터를 직접 import하지 않고 props로 전달받는다.
 * 실제 API/WebSocket/SSE/polling은 구현하지 않으며, `AutoRefreshToggle`
 * 등은 이후 Task에서 실시간 연결로 그대로 교체할 수 있도록 콜백/간격
 * props만 노출한다.
 */

export { BreakingCenter } from "./breaking-center";
export type { BreakingCenterItem, BreakingCenterProps } from "./breaking-center";

export { LiveTimeline } from "./live-timeline";
export type {
  LiveTimelineEntry,
  LiveTimelineProps,
  LiveTimelineStatus,
} from "./live-timeline";

export { TrendingHub } from "./trending-hub";
export type { TrendingHubProps, TrendingHubTab, TrendingHubTabId } from "./trending-hub";

export { KeywordPanel } from "./keyword-panel";
export type { KeywordPanelProps } from "./keyword-panel";

export { RefreshStatus } from "./refresh-status";
export type { ConnectionStatus, RefreshStatusProps } from "./refresh-status";

export { UpdateBanner } from "./update-banner";
export type { UpdateBannerProps } from "./update-banner";

export { AutoRefreshToggle } from "./auto-refresh";
export type { AutoRefreshToggleProps } from "./auto-refresh";
