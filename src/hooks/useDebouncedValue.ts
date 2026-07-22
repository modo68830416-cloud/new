"use client";

import { useEffect, useState } from "react";

/**
 * 값이 바뀐 뒤 `delay`ms 동안 추가 변경이 없을 때만 반영되는 debounce 훅.
 *
 * TASK-010 검색 자동완성은 실제 API를 호출하지 않고 mock 데이터를 즉시
 * 필터링하지만, 추후 실제 검색 API를 연동할 때 그대로 재사용할 수 있도록
 * debounce 구조를 미리 준비해 둔다.
 */
export function useDebouncedValue<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
