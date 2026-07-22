export type ConnectionStatus = "connected" | "connecting" | "disconnected";

export interface RefreshStatusProps {
  /** 마지막 갱신 시각 (ISO 문자열 등). 없으면 "정보 없음"으로 표시 */
  lastRefreshedAt?: string;
  autoRefreshEnabled: boolean;
  onToggleAutoRefresh?: (enabled: boolean) => void;
  /** 향후 실제 polling 간격(ms)에 연결할 값. AutoRefreshToggle로 그대로 전달한다 */
  autoRefreshIntervalMs?: number;
  connectionStatus?: ConnectionStatus;
  /** 수동 새로고침 버튼 클릭 시 호출된다 (mock, 실제 API 호출 없음) */
  onManualRefresh?: () => void;
  isRefreshing?: boolean;
  className?: string;
}
