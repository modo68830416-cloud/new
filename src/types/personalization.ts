/**
 * TASK-011 개인화(북마크 · 읽기 기록 · 테마 · 글자 크기) 데이터 모델.
 *
 * 모든 값은 브라우저 `localStorage`에만 저장되는 클라이언트 전용 상태다
 * (서버 동기화 없음). 실제 계정 시스템이 도입되면 이 타입들을 그대로
 * 서버 스키마와 매핑하기 쉽도록 `articleId`/`slug`를 함께 보관한다.
 */

/** 저장한 뉴스 1건 (task-011.md "북마크" 절) */
export interface BookmarkEntry {
  articleId: string;
  slug: string;
  savedAt: string;
}

/** 읽은 뉴스 1건 (task-011.md "읽기 기록" 절) */
export interface ReadingHistoryEntry {
  articleId: string;
  slug: string;
  viewedAt: string;
}

/** 사용자가 명시적으로 선택(또는 미선택=system)한 테마 환경설정 */
export type ThemeMode = "dark" | "light" | "system";

/** `mode`가 실제로 적용된 결과 — `<html data-theme>`에 반영되는 값 */
export type ResolvedTheme = "dark" | "light";

/** 기사 본문 글자 크기 환경설정 (task-011.md "설정 페이지" 절) */
export type FontSizePreference = "small" | "default" | "large";
