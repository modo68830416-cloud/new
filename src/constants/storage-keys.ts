/**
 * TASK-011 개인화 기능이 사용하는 `localStorage` 키 모음.
 *
 * 루트 레이아웃의 FOUC 방지 인라인 스크립트(`src/app/layout.tsx`)와
 * `src/hooks/*`가 같은 문자열을 참조해야 하므로 한 곳에 모아둔다.
 */
export const STORAGE_KEYS = {
  bookmarks: "nova-news:bookmarks",
  readingHistory: "nova-news:reading-history",
  theme: "nova-news:theme",
  fontSize: "nova-news:font-size",
} as const;

/** 읽기 기록 최대 보관 개수 — 초과 시 가장 오래된 항목부터 제거한다 */
export const MAX_READING_HISTORY = 50;
