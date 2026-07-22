export interface AutoRefreshToggleProps {
  /** 현재 자동 새로고침 활성화 여부 (제어 컴포넌트) */
  enabled: boolean;
  /**
   * 상태가 바뀔 때 호출된다. 이번 Task에서는 상위(RefreshStatus/preview
   * 페이지)가 상태만 들고 있고, 실제 polling 시작/중단은 연결하지 않는다.
   */
  onToggle?: (enabled: boolean) => void;
  /**
   * 향후 실제 polling 간격(ms)으로 사용할 값. 표시 용도로만 쓰고, 이번
   * Task에서는 `setInterval` 등을 실행하지 않는다 — 나중에
   * `useAutoRefresh({ enabled, intervalMs, onTick })` 같은 훅으로 그대로
   * 연결할 수 있도록 값만 전달받는 구조로 설계했다.
   */
  intervalMs?: number;
  label?: string;
  disabled?: boolean;
  className?: string;
}
