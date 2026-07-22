"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * 서버 렌더링에서는 항상 `false`, 클라이언트에서 hydration이 끝난
 * 뒤에는 `true`를 반환한다 (TASK-011).
 *
 * `useBookmarks`/`useReadingHistory`/`useTheme`/`useFontSizePreference`가
 * "localStorage 값을 실제로 반영했는지"(`isHydrated`)를 나타낼 때
 * 공통으로 쓴다. `useEffect` + `setState`로 직접 구현하면 React 19의
 * `react-hooks/set-state-in-effect` 규칙에 걸리므로(effect 안에서 곧바로
 * setState 금지), 대신 `useSyncExternalStore`의 서버/클라이언트 스냅샷이
 * 다르다는 성질만 이용한다 — 구독할 실제 외부 이벤트가 없으므로
 * `subscribe`는 아무 것도 하지 않는 no-op이다.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(noopSubscribe, getClientSnapshot, getServerSnapshot);
}
