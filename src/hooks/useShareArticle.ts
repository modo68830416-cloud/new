"use client";

export type ShareResult = "shared" | "copied" | "cancelled" | "failed";

export interface ShareArticleInput {
  title: string;
  text?: string;
  url: string;
}

/**
 * TASK-014 — 기사 공유 훅. `navigator.share`(Web Share API)를 지원하는
 * 환경(대부분의 모바일 브라우저)에서는 네이티브 공유 시트를 띄우고, 미지원
 * 환경에서는 `navigator.clipboard`로 링크를 복사한다.
 *
 * 사용자가 공유 시트를 취소한 경우(`AbortError`)는 실패로 취급하지 않고
 * `"cancelled"`를 반환해, 호출부가 에러 Toast를 띄우지 않도록 한다.
 */
export function useShareArticle() {
  async function share({ title, text, url }: ShareArticleInput): Promise<ShareResult> {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
        return "shared";
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return "cancelled";
        }
        // Web Share API 실패 시 클립보드 복사로 폴백한다.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      return "copied";
    } catch {
      return "failed";
    }
  }

  return { share };
}
