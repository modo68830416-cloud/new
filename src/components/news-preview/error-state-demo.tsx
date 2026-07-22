"use client";

import { NewsErrorState } from "@/components/news";

/**
 * `/news-preview`에서 "다시 시도" 버튼 UI를 보여주기 위한 얇은 클라이언트
 * 래퍼. 서버 컴포넌트(`NewsPreviewContent`)는 함수(이벤트 핸들러) props를
 * 클라이언트 컴포넌트로 직접 넘길 수 없으므로, 로컬 핸들러가 필요한 데모만
 * 별도 클라이언트 컴포넌트로 분리한다. 실제 재시도 로직은 구현하지 않는다.
 */
export function ErrorStateDemo() {
  return (
    <NewsErrorState
      onRetry={() => {
        // 이번 Task 범위에서는 실제 fetch 재시도 로직을 구현하지 않는다.
      }}
      homeHref="/"
    />
  );
}
