"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function getInitialPreference(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia(QUERY).matches;
}

/**
 * 사용자의 `prefers-reduced-motion` 설정을 구독한다.
 *
 * `true`일 때는 (명세에 따라) 다음을 적용해야 한다.
 * - 페이지 전환 최소화
 * - Pulse 제거
 * - Scroll Reveal 제거
 * - Hover Animation 축소
 *
 * 전역 CSS(`globals.css`)에서도 `@media (prefers-reduced-motion: reduce)`로
 * transition/animation duration을 0에 가깝게 강제하지만, Framer Motion처럼
 * CSS transition을 사용하지 않는 JS 애니메이션은 이 값을 직접 확인해서
 * 스스로 축소해야 한다.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(getInitialPreference);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQueryList = window.matchMedia(QUERY);
    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches);

    // 초기값은 useState의 lazy initializer(getInitialPreference)가 이미
    // 설정하므로, 여기서는 이후 변경사항만 구독한다.
    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}
