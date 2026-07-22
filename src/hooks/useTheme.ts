"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { getStorageSnapshot, subscribeStorage, writeStorage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import { useHasMounted } from "@/hooks/useHasMounted";
import type { ResolvedTheme, ThemeMode } from "@/types/personalization";

const LIGHT_MEDIA_QUERY = "(prefers-color-scheme: light)";
const DEFAULT_MODE: ThemeMode = "system";

function subscribeMode(callback: () => void): () => void {
  return subscribeStorage(STORAGE_KEYS.theme, callback);
}

function getModeSnapshot(): ThemeMode {
  return getStorageSnapshot<ThemeMode>(STORAGE_KEYS.theme, DEFAULT_MODE);
}

function getModeServerSnapshot(): ThemeMode {
  return DEFAULT_MODE;
}

function subscribeSystemTheme(callback: () => void): () => void {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }
  const mediaQueryList = window.matchMedia(LIGHT_MEDIA_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getSystemThemeSnapshot(): ResolvedTheme {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "dark";
  }
  return window.matchMedia(LIGHT_MEDIA_QUERY).matches ? "light" : "dark";
}

function getSystemThemeServerSnapshot(): ResolvedTheme {
  return "dark";
}

/**
 * `<html data-theme>`/`color-scheme`에 실제로 반영한다.
 *
 * 최초 진입 시 깜빡임(FOUC)을 없애는 실제 작업은 `src/app/layout.tsx`의
 * 블로킹 인라인 스크립트가 hydration 이전에 이미 수행한다 — 아래
 * `useEffect`는 그 이후(사용자가 토글하거나, 시스템 설정이 바뀌거나, 다른
 * 탭에서 값이 바뀌었을 때) React가 계산한 `resolvedTheme`을 DOM(React가
 * 소유하지 않는 외부 시스템)에 반영하는 정상적인 동기화 effect다 —
 * `setState`를 호출하지 않으므로 "effect 안에서 setState 금지" 규칙과도
 * 무관하다.
 */
function applyResolvedTheme(resolved: ResolvedTheme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", resolved);
  document.documentElement.style.colorScheme = resolved;
}

export interface UseThemeResult {
  /** 사용자가 선택한 환경설정(다크/라이트/시스템 기본값) */
  mode: ThemeMode;
  /** 실제로 화면에 적용되는 테마 */
  resolvedTheme: ResolvedTheme;
  isHydrated: boolean;
  setMode: (mode: ThemeMode) => void;
  /** Header의 아이콘 토글처럼 dark/light만 오가는 2단 토글 (system은 해제된다) */
  toggleResolvedTheme: () => void;
}

/**
 * 다크모드 · 라이트모드 전환 훅 (TASK-011).
 *
 * `mode`(저장된 환경설정)와 시스템 `prefers-color-scheme` 두 외부 저장소를
 * 각각 `useSyncExternalStore`로 구독한 뒤 `resolvedTheme`을 계산한다 —
 * 서버 렌더링과 첫 클라이언트 렌더링이 항상 일치하므로(hydration mismatch
 * 방지) 별도의 "mounted 이후에만 실제 값을 반영" 처리가 필요 없다.
 *
 * - 최초 진입 시 `prefers-color-scheme`을 기본값으로 사용한다(`mode`
 *   미저장 시 `"system"`).
 * - 사용자가 명시적으로 선택하면 `localStorage`에 저장하고 이후 우선
 *   적용한다.
 * - 여러 탭/컴포넌트 간 동기화는 `subscribeStorage`로 처리한다.
 */
export function useTheme(): UseThemeResult {
  const mode = useSyncExternalStore(subscribeMode, getModeSnapshot, getModeServerSnapshot);
  const systemTheme = useSyncExternalStore(
    subscribeSystemTheme,
    getSystemThemeSnapshot,
    getSystemThemeServerSnapshot,
  );
  const isHydrated = useHasMounted();

  const resolvedTheme: ResolvedTheme = mode === "system" ? systemTheme : mode;

  useEffect(() => {
    applyResolvedTheme(resolvedTheme);
  }, [resolvedTheme]);

  const setMode = useCallback((nextMode: ThemeMode) => {
    writeStorage(STORAGE_KEYS.theme, nextMode);
  }, []);

  const toggleResolvedTheme = useCallback(() => {
    setMode(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setMode]);

  return { mode, resolvedTheme, isHydrated, setMode, toggleResolvedTheme };
}
