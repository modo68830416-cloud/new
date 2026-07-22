"use client";

import { useEffect, useState } from "react";

/**
 * 문서 안의 특정 요소(`targetId`)를 기준으로 "읽기 진행률"(0~100)을
 * 계산한다 (TASK-009 Read Progress). 요소의 시작점에서 스크롤이 시작해
 * 끝(하단)에 도달하면 100이 되도록 계산한다.
 *
 * DOM id로 대상을 찾기 때문에 부모가 서버 컴포넌트여도(ref를 넘길 수 없어도)
 * 그대로 사용할 수 있다.
 */
export function useScrollProgress(targetId: string): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const target = document.getElementById(targetId);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = target.offsetHeight;
      const viewportHeight = window.innerHeight;

      if (elementHeight <= 0) {
        setProgress(0);
        return;
      }

      // 요소 상단이 뷰포트 하단에 걸릴 때 0%, 요소 하단이 뷰포트 하단에
      // 걸릴 때 100%가 되도록 계산한다 (표준적인 "읽기 진행률" 공식).
      const scrolledPastStart = window.scrollY + viewportHeight - elementTop;
      const ratio = scrolledPastStart / elementHeight;
      const clamped = Math.min(1, Math.max(0, ratio));

      setProgress(Math.round(clamped * 100));
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [targetId]);

  return progress;
}
