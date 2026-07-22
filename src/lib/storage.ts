/**
 * SSR-safe `localStorage` wrapper (TASK-011).
 *
 * 모든 개인화 훅(`useBookmarks`, `useReadingHistory`, `useTheme` 등)은
 * `window.localStorage`에 직접 접근하지 않고 이 모듈을 거친다.
 *
 * 안전 장치:
 * - `typeof window === "undefined"`(서버 렌더링, 빌드 타임)에서는 항상
 *   fallback 값을 반환하거나 아무 동작도 하지 않는다.
 * - `localStorage`가 존재하더라도 프라이빗 모드, 저장 공간 초과, 브라우저
 *   정책 등으로 `getItem`/`setItem`이 던질 수 있으므로 항상 `try/catch`로
 *   감싼다.
 * - 저장된 JSON이 손상되었거나 예상 타입이 아니어도 `JSON.parse`가 예외를
 *   던지지 않도록 방어하고, 실패 시 fallback을 반환한다.
 *
 * 동일 탭 안에서 여러 컴포넌트(카드의 북마크 버튼, `/bookmarks` 목록,
 * 설정 페이지 등)가 같은 키를 동시에 구독할 수 있도록, 값이 바뀔 때마다
 * `CustomEvent`를 전역에 발행한다 (네이티브 `storage` 이벤트는 같은 탭
 * 안에서는 발생하지 않는다).
 */

const isBrowser = typeof window !== "undefined";

/** 같은 탭 내부의 다른 컴포넌트/훅에게 저장소 변경을 알리는 이벤트 이름 */
export const STORAGE_EVENT_NAME = "nova-news:storage-change";

interface StorageChangeDetail {
  key: string;
}

/**
 * `useSyncExternalStore`의 `getSnapshot`으로 쓰기 위한 캐시 (`getStorageSnapshot`
 * 참고) — 값이 바뀌지 않았다면 매 렌더링마다 같은 참조를 반환해야 하는
 * `useSyncExternalStore`의 요구사항을 만족시키기 위함이다. 실제 값이
 * 저장될 때(`writeStorage`/`removeStorage`)나 변경 이벤트를 받을 때만
 * 무효화된다.
 */
const snapshotCache = new Map<string, unknown>();

function invalidateSnapshot(key: string) {
  snapshotCache.delete(key);
}

function notifyChange(key: string) {
  invalidateSnapshot(key);
  if (!isBrowser) return;
  window.dispatchEvent(
    new CustomEvent<StorageChangeDetail>(STORAGE_EVENT_NAME, { detail: { key } }),
  );
}

/** 저장된 값을 읽는다. 키가 없거나 파싱에 실패하면 `fallback`을 반환한다. */
export function readStorage<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)`의
 * `getSnapshot`으로 사용하는 캐시된 읽기. 서버(SSR)에서는 항상 `fallback`을
 * 반환하고, 클라이언트에서는 값이 실제로 바뀔 때까지 같은 참조를 유지한다.
 */
export function getStorageSnapshot<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  if (!snapshotCache.has(key)) {
    snapshotCache.set(key, readStorage(key, fallback));
  }
  return snapshotCache.get(key) as T;
}

/** 값을 저장한다. 실패해도(프라이빗 모드 등) 조용히 무시한다. */
export function writeStorage<T>(key: string, value: T): void {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    notifyChange(key);
  } catch {
    // localStorage를 사용할 수 없는 환경에서는 조용히 무시한다.
  }
}

/** 키를 제거한다. */
export function removeStorage(key: string): void {
  if (!isBrowser) return;
  try {
    window.localStorage.removeItem(key);
    notifyChange(key);
  } catch {
    // no-op
  }
}

/**
 * 특정 키가 (이 탭 안에서, 또는 다른 탭에서) 변경될 때마다 `callback`을
 * 호출한다. 구독 해제 함수를 반환한다. `useSyncExternalStore`의
 * `subscribe` 인자로 그대로 전달할 수 있다.
 */
export function subscribeStorage(key: string, callback: () => void): () => void {
  if (!isBrowser) return () => {};

  function handleCustomEvent(event: Event) {
    const detail = (event as CustomEvent<StorageChangeDetail>).detail;
    if (!detail || detail.key === key) {
      invalidateSnapshot(key);
      callback();
    }
  }

  function handleNativeStorageEvent(event: StorageEvent) {
    if (event.key === null || event.key === key) {
      invalidateSnapshot(key);
      callback();
    }
  }

  window.addEventListener(STORAGE_EVENT_NAME, handleCustomEvent);
  window.addEventListener("storage", handleNativeStorageEvent);

  return () => {
    window.removeEventListener(STORAGE_EVENT_NAME, handleCustomEvent);
    window.removeEventListener("storage", handleNativeStorageEvent);
  };
}
