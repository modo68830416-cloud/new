export interface LiveStatusPanelProps {
  /** 오늘 등록된 기사 수. 생략 시 mock 데이터 전체 개수를 사용한다 */
  todayArticleCount?: number;
  /** 진행 중인 속보 수. 생략 시 mock 데이터에서 계산한다 */
  breakingCount?: number;
  /** 최근 업데이트 시각(ISO 문자열). 생략 시 mock 데이터에서 계산한다 */
  lastUpdatedAt?: string;
  className?: string;
}
