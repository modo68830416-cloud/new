/**
 * TASK-012 뉴스 API 서비스 계층의 지연 · 에러 시뮬레이션 설정.
 *
 * 실제 API로 교체되기 전까지, mock 데이터 조회를 실제 네트워크 호출처럼
 * 체감할 수 있도록 개발 환경에서만 인위적인 지연을 추가한다. 프로덕션
 * 빌드/런타임에서는 지연이 없다 — 빌드 시간에 영향을 주지 않기 위함이다.
 */
export const newsApiConfig = {
  /** 개발 환경에서 각 호출에 추가하는 인위적 지연(ms) */
  simulatedLatencyMs: process.env.NODE_ENV === "development" ? 250 : 0,
  /**
   * 낮은 확률의 실패를 흉내내 에러 처리 경로를 확인하기 위한 옵트인 플래그.
   * 기본값은 비활성 — CI/빌드가 우연히 실패하지 않도록 한다.
   */
  simulateErrors: process.env.NEWS_API_SIMULATE_ERRORS === "true",
  /** simulateErrors가 true일 때 실패할 확률(0~1) */
  errorRate: 0.1,
} as const;
