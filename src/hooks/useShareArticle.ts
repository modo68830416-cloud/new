"use client";

import { useToast } from "@/components/ui/toast";

export type ShareResult = "shared" | "copied" | "cancelled" | "failed";

export interface ShareArticleInput {
  title: string;
  text?: string;
  url: string;
}

async function performShare({ title, text, url }: ShareArticleInput): Promise<ShareResult> {
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

/**
 * TASK-014 — 기사 공유 훅. `navigator.share`(Web Share API)를 지원하는
 * 환경(대부분의 모바일 브라우저)에서는 네이티브 공유 시트를 띄우고, 미지원
 * 환경에서는 `navigator.clipboard`로 링크를 복사한다.
 *
 * 사용자가 공유 시트를 취소한 경우(`AbortError`)는 실패로 취급하지 않고
 * `"cancelled"`를 반환하며 Toast도 띄우지 않는다.
 *
 * TASK-016 — 결과에 따른 Toast 안내를 훅 내부에서 처리한다. `FeaturedHero`
 * 뿐 아니라 뉴스 카드 공유 버튼(`NewsShareButton`)도 이 훅 하나만 호출하면
 * 되도록, "성공/복사됨/실패" Toast 분기를 호출부마다 반복하지 않는다.
 */
export function useShareArticle() {
  const { showToast } = useToast();

  async function share(input: ShareArticleInput): Promise<ShareResult> {
    const result = await performShare(input);

    switch (result) {
      case "shared":
        showToast({ title: "공유했습니다", tone: "success", durationMs: 3000 });
        break;
      case "copied":
        showToast({
          title: "링크가 복사되었습니다",
          description: "원하는 곳에 붙여넣어 공유하세요.",
          tone: "success",
          durationMs: 3000,
        });
        break;
      case "failed":
        showToast({ title: "공유에 실패했습니다", tone: "danger", durationMs: 3000 });
        break;
      case "cancelled":
        break;
    }

    return result;
  }

  return { share };
}
