"use client";

import { Share2 } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { useToast } from "@/components/ui/toast";
import { useShareArticle } from "@/hooks/useShareArticle";

export interface FeaturedHeroShareButtonProps {
  title: string;
  url: string;
}

/**
 * TASK-014 — `FeaturedHero`의 공유 버튼. `FeaturedHero` 자체는 서버
 * 컴포넌트로 유지하고, 실제 클릭 동작(Web Share API/클립보드 복사)이
 * 필요한 이 버튼만 작은 클라이언트 컴포넌트로 분리한다.
 */
export function FeaturedHeroShareButton({ title, url }: FeaturedHeroShareButtonProps) {
  const { share } = useShareArticle();
  const { showToast } = useToast();

  async function handleShare() {
    const result = await share({ title, url });

    if (result === "cancelled") return;

    if (result === "shared") {
      showToast({ title: "공유했습니다", tone: "success", durationMs: 3000 });
      return;
    }

    if (result === "copied") {
      showToast({
        title: "링크가 복사되었습니다",
        description: "원하는 곳에 붙여넣어 공유하세요.",
        tone: "success",
        durationMs: 3000,
      });
      return;
    }

    showToast({ title: "공유에 실패했습니다", tone: "danger", durationMs: 3000 });
  }

  return (
    <IconButton
      label="공유하기"
      icon={<Share2 size={18} aria-hidden />}
      variant="secondary"
      onClick={handleShare}
    />
  );
}
