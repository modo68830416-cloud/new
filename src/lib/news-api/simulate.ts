import { newsApiConfig } from "@/config/news-api";

/** 서비스 계층에서 실제 API 실패를 흉내낼 때 던지는 에러 타입 */
export class NewsApiError extends Error {
  constructor(message = "뉴스 데이터를 불러오지 못했습니다.") {
    super(message);
    this.name = "NewsApiError";
  }
}

/**
 * 실제 네트워크 호출을 흉내낸다 — 개발 환경에서는 짧은 지연을 추가하고,
 * `NEWS_API_SIMULATE_ERRORS=true`일 때만 낮은 확률로 실패한다.
 *
 * 모든 `src/lib/news-api/*` 조회 함수는 실제 데이터를 반환하기 전에 이
 * 함수를 거쳐, 향후 실제 API/DB 호출로 교체돼도 호출부(페이지/컴포넌트)의
 * 비동기 처리 방식은 바뀌지 않도록 한다.
 */
export async function simulateNetwork(): Promise<void> {
  if (newsApiConfig.simulatedLatencyMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, newsApiConfig.simulatedLatencyMs));
  }

  if (newsApiConfig.simulateErrors && Math.random() < newsApiConfig.errorRate) {
    throw new NewsApiError();
  }
}
