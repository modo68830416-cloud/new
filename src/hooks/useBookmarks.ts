"use client";

import { useCallback, useSyncExternalStore } from "react";
import { getStorageSnapshot, readStorage, subscribeStorage, writeStorage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import { useHasMounted } from "@/hooks/useHasMounted";
import type { BookmarkEntry } from "@/types/personalization";

const EMPTY_BOOKMARKS: BookmarkEntry[] = [];

function readBookmarks(): BookmarkEntry[] {
  return readStorage<BookmarkEntry[]>(STORAGE_KEYS.bookmarks, EMPTY_BOOKMARKS);
}

function subscribe(callback: () => void): () => void {
  return subscribeStorage(STORAGE_KEYS.bookmarks, callback);
}

function getSnapshot(): BookmarkEntry[] {
  return getStorageSnapshot<BookmarkEntry[]>(STORAGE_KEYS.bookmarks, EMPTY_BOOKMARKS);
}

function getServerSnapshot(): BookmarkEntry[] {
  return EMPTY_BOOKMARKS;
}

export interface UseBookmarksResult {
  bookmarks: BookmarkEntry[];
  count: number;
  /**
   * 클라이언트에서 `localStorage`를 실제로 반영했는지 여부.
   * 서버 렌더링/최초 hydration 시점에는 항상 `false`(빈 배열과 동일)이므로,
   * 이 값으로 "아직 판단할 수 없음"과 "실제로 저장된 게 없음"을 구분할 수
   * 있다.
   */
  isHydrated: boolean;
  isBookmarked: (articleId: string) => boolean;
  /** 북마크를 토글하고, 토글 이후의 상태(true=저장됨)를 반환한다 */
  toggleBookmark: (article: { articleId: string; slug: string }) => boolean;
  addBookmark: (article: { articleId: string; slug: string }) => void;
  removeBookmark: (articleId: string) => void;
  clearAll: () => void;
}

/**
 * 북마크(저장한 뉴스) 상태 훅 (TASK-011).
 *
 * `useSyncExternalStore`로 `localStorage`(외부 저장소)를 구독한다 —
 * 서버 렌더링에서는 항상 빈 배열(`getServerSnapshot`)을 반환해 hydration
 * mismatch가 발생하지 않고, 클라이언트에서는 실제 값을 동기적으로 읽어온
 * 뒤 변경 이벤트를 구독한다(`src/lib/storage.ts`). 같은 탭 안의 다른
 * 컴포넌트(카드의 북마크 버튼, `/bookmarks` 목록, 설정 페이지의 개수 표시)가
 * 북마크를 바꾸면 이 훅도 함께 갱신된다.
 */
export function useBookmarks(): UseBookmarksResult {
  const bookmarks = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isHydrated = useHasMounted();

  const isBookmarked = useCallback(
    (articleId: string) => bookmarks.some((item) => item.articleId === articleId),
    [bookmarks],
  );

  const addBookmark = useCallback((article: { articleId: string; slug: string }) => {
    const next = [
      { articleId: article.articleId, slug: article.slug, savedAt: new Date().toISOString() },
      ...readBookmarks().filter((item) => item.articleId !== article.articleId),
    ];
    writeStorage(STORAGE_KEYS.bookmarks, next);
  }, []);

  const removeBookmark = useCallback((articleId: string) => {
    const next = readBookmarks().filter((item) => item.articleId !== articleId);
    writeStorage(STORAGE_KEYS.bookmarks, next);
  }, []);

  const toggleBookmark = useCallback(
    (article: { articleId: string; slug: string }) => {
      const current = readBookmarks();
      const alreadySaved = current.some((item) => item.articleId === article.articleId);
      if (alreadySaved) {
        removeBookmark(article.articleId);
        return false;
      }
      addBookmark(article);
      return true;
    },
    [addBookmark, removeBookmark],
  );

  const clearAll = useCallback(() => {
    writeStorage(STORAGE_KEYS.bookmarks, []);
  }, []);

  return {
    bookmarks,
    count: bookmarks.length,
    isHydrated,
    isBookmarked,
    toggleBookmark,
    addBookmark,
    removeBookmark,
    clearAll,
  };
}
