"use client";

import { Share2 } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { useShareArticle } from "@/hooks/useShareArticle";

export interface FeaturedHeroShareButtonProps {
  title: string;
  url: string;
}

/**
 * TASK-014 — `FeaturedHero`의 공유 버튼. `FeaturedHero` 자체는 서버
 * 컴포넌트로 유지하고, 실제 클릭 동작(Web Share API/클립보드 복사)이
 * 필요한 이 버튼만 작은 클라이언트 컴포넌트로 분리한다.
 *
 * TASK-016 — 결과별 Toast 안내는 `useShareArticle` 내부로 옮겨졌다.
 */
export function FeaturedHeroShareButton({ title, url }: FeaturedHeroShareButtonProps) {
  const { share } = useShareArticle();

  return (
    <IconButton
      label="공유하기"
      icon={<Share2 size={18} aria-hidden />}
      variant="secondary"
      onClick={() => share({ title, url })}
    />
  );
}
