export interface UpdateBannerProps {
  /** 새로 발생한 속보/업데이트 건수 */
  count: number;
  /** "새로고침" 버튼 클릭 시 호출된다 (mock, 실제 데이터 재요청 없음) */
  onRefresh?: () => void;
  /**
   * 배너 표시 여부를 강제로 지정한다. 생략하면 `count > 0`일 때만
   * 표시한다.
   */
  visible?: boolean;
  className?: string;
}
