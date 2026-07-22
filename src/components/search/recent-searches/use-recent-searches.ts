"use client";

import { useCallback, useState } from "react";

const STORAGE_KEY = "nova-news:recent-searches";
const MAX_ITEMS = 8;

function readStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function writeStorage(items: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage를 사용할 수 없는 환경(프라이빗 모드 등)에서는 조용히 무시한다.
  }
}

export interface UseRecentSearchesResult {
  items: string[];
  addSearch: (term: string) => void;
  removeSearch: (term: string) => void;
  clearAll: () => void;
}

/**
 * 최근 검색어 (TASK-010). 실제 서버 API 없이 브라우저 `localStorage`에만
 * 저장되는 mock 상태다 — "실제 검색 API를 구현하지 않는다"는 제약과
 * 별개로, 사용자의 기기 로컬에만 남는 UI 편의 기능이다.
 */
export function useRecentSearches(): UseRecentSearchesResult {
  // lazy initializer — 서버에서는 항상 빈 배열이고, 클라이언트에서는
  // 마운트 시점에 한 번만 localStorage를 읽는다(useReducedMotion과 동일한
  // 패턴). effect 안에서 곧바로 setState 하지 않는다.
  const [items, setItems] = useState<string[]>(readStorage);

  const addSearch = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setItems((prev) => {
      const next = [trimmed, ...prev.filter((item) => item !== trimmed)].slice(0, MAX_ITEMS);
      writeStorage(next);
      return next;
    });
  }, []);

  const removeSearch = useCallback((term: string) => {
    setItems((prev) => {
      const next = prev.filter((item) => item !== term);
      writeStorage(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
    writeStorage([]);
  }, []);

  return { items, addSearch, removeSearch, clearAll };
}
