"use client";

import { useCallback, useSyncExternalStore } from "react";
import { getStorageSnapshot, readStorage, subscribeStorage, writeStorage } from "@/lib/storage";
import { MAX_READING_HISTORY, STORAGE_KEYS } from "@/constants/storage-keys";
import { useHasMounted } from "@/hooks/useHasMounted";
import type { ReadingHistoryEntry } from "@/types/personalization";

const EMPTY_HISTORY: ReadingHistoryEntry[] = [];

function readHistory(): ReadingHistoryEntry[] {
  return readStorage<ReadingHistoryEntry[]>(STORAGE_KEYS.readingHistory, EMPTY_HISTORY);
}

function subscribe(callback: () => void): () => void {
  return subscribeStorage(STORAGE_KEYS.readingHistory, callback);
}

function getSnapshot(): ReadingHistoryEntry[] {
  return getStorageSnapshot<ReadingHistoryEntry[]>(STORAGE_KEYS.readingHistory, EMPTY_HISTORY);
}

function getServerSnapshot(): ReadingHistoryEntry[] {
  return EMPTY_HISTORY;
}

export interface UseReadingHistoryResult {
  /** 최신순(가장 최근에 본 기사가 먼저) 정렬된 목록 */
  history: ReadingHistoryEntry[];
  count: number;
  isHydrated: boolean;
  /**
   * 기사 조회를 기록한다. 이미 기록이 있으면 맨 앞으로 옮기고
   * 시간을 갱신한다(upsert). `MAX_READING_HISTORY`(기본 50개)를 넘으면
   * 가장 오래된 항목부터 제거한다.
   */
  recordView: (article: { articleId: string; slug: string }) => void;
  removeEntry: (articleId: string) => void;
  clearAll: () => void;
}

/**
 * 읽기 기록(최근 본 뉴스) 상태 훅 (TASK-011).
 *
 * `useBookmarks`와 동일하게 `useSyncExternalStore`로 `localStorage`를
 * 구독한다(SSR/hydration mismatch 방지).
 */
export function useReadingHistory(): UseReadingHistoryResult {
  const history = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isHydrated = useHasMounted();

  const recordView = useCallback((article: { articleId: string; slug: string }) => {
    const next = [
      { articleId: article.articleId, slug: article.slug, viewedAt: new Date().toISOString() },
      ...readHistory().filter((item) => item.articleId !== article.articleId),
    ].slice(0, MAX_READING_HISTORY);
    writeStorage(STORAGE_KEYS.readingHistory, next);
  }, []);

  const removeEntry = useCallback((articleId: string) => {
    const next = readHistory().filter((item) => item.articleId !== articleId);
    writeStorage(STORAGE_KEYS.readingHistory, next);
  }, []);

  const clearAll = useCallback(() => {
    writeStorage(STORAGE_KEYS.readingHistory, []);
  }, []);

  return {
    history,
    count: history.length,
    isHydrated,
    recordView,
    removeEntry,
    clearAll,
  };
}
