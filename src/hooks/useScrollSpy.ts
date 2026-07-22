"use client";

import { useEffect, useState } from "react";

/**
 * 주어진 id 목록에 해당하는 heading 요소들을 관찰해 현재 스크롤 위치에서
 * 가장 관련 있는(뷰포트 상단에서 가장 가까운) 항목의 id를 반환한다
 * (TASK-009 목차 현재 위치 Highlight).
 *
 * IntersectionObserver를 지원하지 않는 환경에서는 항상 첫 번째 id를
 * 반환한다.
 */
export function useScrollSpy(ids: string[]): string | null {
  // 기본값(관찰 시작 전 / IntersectionObserver 미지원 환경)은 렌더 중에
  // 계산한다 — effect 안에서 동기적으로 setState를 호출하지 않기 위함이다.
  // 실제 활성 항목 갱신은 아래 effect의 observer 콜백(구독)에서만 일어난다.
  const fallbackId = ids[0] ?? null;
  const [activeId, setActiveId] = useState<string | null>(fallbackId);

  useEffect(() => {
    if (ids.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // 상단 고정 헤더 아래(약 96px)부터, 뷰포트 하단 70% 지점까지를
        // "현재 읽고 있는 구간"으로 간주한다.
        rootMargin: "-96px 0px -70% 0px",
        threshold: [0, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
