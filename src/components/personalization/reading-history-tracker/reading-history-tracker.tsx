"use client";

import { useEffect } from "react";
import { useReadingHistory } from "@/hooks/useReadingHistory";

export interface ReadingHistoryTrackerProps {
  articleId: string;
  slug: string;
}

/**
 * 뉴스 상세 페이지 진입 시 읽기 기록을 자동으로 남기는 보이지 않는
 * 클라이언트 컴포넌트 (TASK-011).
 *
 * 상세 페이지(`src/app/news/[slug]/page.tsx`)는 Server Component이므로
 * 훅을 직접 호출할 수 없다 — 기록 로직만 이 작은 client leaf로 분리해
 * 나머지 페이지는 계속 서버에서 렌더링/정적 생성(`generateStaticParams`)
 * 되도록 한다. 화면에는 아무것도 렌더링하지 않는다.
 */
export function ReadingHistoryTracker({ articleId, slug }: ReadingHistoryTrackerProps) {
  const { recordView } = useReadingHistory();

  useEffect(() => {
    // recordView는 useReadingHistory 내부에서 빈 의존성 배열로 만들어져
    // 참조가 항상 안정적이다 — articleId/slug가 바뀔 때(다른 기사로 이동)만
    // 다시 기록된다.
    recordView({ articleId, slug });
  }, [articleId, slug, recordView]);

  return null;
}
