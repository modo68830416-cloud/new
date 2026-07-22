"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { getStorageSnapshot, subscribeStorage, writeStorage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import { useHasMounted } from "@/hooks/useHasMounted";
import type { FontSizePreference } from "@/types/personalization";

const DEFAULT_FONT_SIZE: FontSizePreference = "default";

function subscribe(callback: () => void): () => void {
  return subscribeStorage(STORAGE_KEYS.fontSize, callback);
}

function getSnapshot(): FontSizePreference {
  return getStorageSnapshot<FontSizePreference>(STORAGE_KEYS.fontSize, DEFAULT_FONT_SIZE);
}

function getServerSnapshot(): FontSizePreference {
  return DEFAULT_FONT_SIZE;
}

/** `<html data-font-size>`에 반영한다 — React가 소유하지 않는 DOM 동기화. */
function applyFontSize(size: FontSizePreference) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-font-size", size);
}

export interface UseFontSizePreferenceResult {
  fontSize: FontSizePreference;
  isHydrated: boolean;
  setFontSize: (size: FontSizePreference) => void;
}

/**
 * 기사 본문 글자 크기 환경설정 훅 (TASK-011 설정 페이지).
 *
 * `<html data-font-size>`에 반영되고, `src/styles/tokens.css`의
 * `--font-scale-reading` 토큰을 통해 기사 본문(`ArticleBody` 등)에만
 * 영향을 준다 — 다른 화면의 타이포그래피 토큰은 그대로 유지된다.
 * 테마와 동일하게 `useSyncExternalStore`로 `localStorage`를 구독해
 * hydration mismatch 없이 초기값을 결정하고, 최초 진입 시 깜빡임은
 * `layout.tsx`의 인라인 스크립트가 미리 처리한다.
 */
export function useFontSizePreference(): UseFontSizePreferenceResult {
  const fontSize = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isHydrated = useHasMounted();

  useEffect(() => {
    applyFontSize(fontSize);
  }, [fontSize]);

  const setFontSize = useCallback((size: FontSizePreference) => {
    writeStorage(STORAGE_KEYS.fontSize, size);
  }, []);

  return { fontSize, isHydrated, setFontSize };
}
