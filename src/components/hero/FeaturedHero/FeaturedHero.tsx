import Image from "next/image";
import { ArrowRight, Share2 } from "lucide-react";
import { Surface } from "@/components/ui/surface";
import { CategoryBadge } from "@/components/ui/category-badge";
import { BreakingBadge } from "@/components/ui/breaking-badge";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { TimeAgo } from "@/components/ui/time-ago";
import { ViewCount } from "@/components/ui/view-count";
import { FadeIn } from "@/components/motion/FadeIn";
import { getFeaturedHeroArticle } from "@/lib/hero-articles";
import { cn } from "@/lib/utils";
import type { FeaturedHeroProps } from "./FeaturedHero.types";

/**
 * Hero의 메인 헤드라인(Featured News).
 *
 * 대표 이미지 · 카테고리 배지 · 제목 · 요약 · 발행 시각 · 조회수 ·
 * 공유 버튼(UI) · 읽기 버튼을 표시한다. TASK-001 mock 데이터를 사용하며,
 * 실제 상세 페이지가 아직 없으므로 읽기/공유 버튼은 UI만 제공한다
 * (기존 Header의 "준비 중" 패턴과 동일하게 `aria-disabled` + `title`로
 * 상태를 알린다).
 */
export function FeaturedHero({ article, className }: FeaturedHeroProps) {
  const featured = article ?? getFeaturedHeroArticle();
  const image = featured.heroImage ?? featured.thumbnail;

  return (
    <FadeIn className={cn("h-full", className)}>
      <Surface
        as="article"
        radius="xl"
        shadow="lg"
        bordered
        className="group relative flex h-full min-h-[26rem] flex-col justify-end overflow-hidden sm:min-h-[30rem] lg:min-h-[36rem]"
      >
        <Image
          src={image.url}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-standard)] group-hover:scale-105"
        />
        <div
          aria-hidden
          className="bg-gradient-image-readability pointer-events-none absolute inset-0"
        />

        <div className="relative z-content flex flex-col gap-4 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={featured.category} />
            {featured.isBreaking && <BreakingBadge level="critical" />}
            {featured.isExclusive && (
              <span className="type-label border-exclusive text-exclusive rounded-full border px-2.5 py-1">
                단독
              </span>
            )}
          </div>

          <h2 className="type-hero-title line-clamp-3 break-keep text-text-primary">
            {featured.title}
          </h2>

          <p className="type-body line-clamp-2 max-w-2xl text-text-secondary sm:line-clamp-3">
            {featured.summary}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {featured.author?.name && (
              <span className="type-caption text-text-secondary">
                {featured.author.name} 기자
              </span>
            )}
            <TimeAgo date={featured.publishedAt} className="text-text-secondary" />
            <ViewCount count={featured.viewCount} className="text-text-secondary" />
          </div>

          <div className="mt-2 flex items-center gap-3">
            <Button
              variant="primary"
              rightIcon={<ArrowRight size={16} aria-hidden />}
              className="shadow-glow"
              aria-disabled="true"
              title="기사 상세 페이지 준비 중"
            >
              기사 읽기
            </Button>
            <IconButton
              label="공유하기 (준비 중)"
              title="공유하기 (준비 중)"
              icon={<Share2 size={18} aria-hidden />}
              variant="secondary"
              aria-disabled="true"
            />
          </div>
        </div>
      </Surface>
    </FadeIn>
  );
}
