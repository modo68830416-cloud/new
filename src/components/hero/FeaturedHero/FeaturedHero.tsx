import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Surface } from "@/components/ui/surface";
import { CategoryBadge } from "@/components/ui/category-badge";
import { BreakingBadge } from "@/components/ui/breaking-badge";
import { LinkButton } from "@/components/ui/link-button";
import { TimeAgo } from "@/components/ui/time-ago";
import { ViewCount } from "@/components/ui/view-count";
import { FadeIn } from "@/components/motion/FadeIn";
import { getFeaturedHeroArticle } from "@/lib/hero-articles";
import { siteConfig } from "@/config/site";
import { NewsCardLink } from "@/components/news";
import { cn } from "@/lib/utils";
import { FeaturedHeroShareButton } from "./FeaturedHeroShareButton";
import type { FeaturedHeroProps } from "./FeaturedHero.types";

/**
 * Hero의 메인 헤드라인(Featured News).
 *
 * 대표 이미지 · 카테고리 배지 · 제목 · 요약 · 발행 시각 · 조회수 ·
 * 공유 버튼 · 읽기 버튼을 표시한다. TASK-001 mock 데이터를 사용한다.
 *
 * "기사 읽기"/공유 버튼은 TASK-006에서는 상세 페이지가 없어 UI만 제공하는
 * placeholder였지만, TASK-009에서 `/news/[slug]` 상세 페이지가 생기고
 * TASK-014에서 실제로 연결했다. 제목 자체도 다른 뉴스 카드(TASK-007
 * `NewsCardLink`)와 동일한 stretched link 패턴으로 카드 전체를 클릭 영역으로
 * 만든다 — 버튼만 연결하고 제목 텍스트는 그대로 방치돼 있던 것을 뒤늦게
 * 고쳤다. `Surface`가 이미 `position: relative`를 갖고 있어 stretched link가
 * 카드 전체(이미지 포함)에 걸린다.
 */
export function FeaturedHero({ article, className }: FeaturedHeroProps) {
  const featured = article ?? getFeaturedHeroArticle();
  const image = featured.heroImage ?? featured.thumbnail;
  const href = featured.externalUrl ?? `/news/${featured.slug}`;

  return (
    <FadeIn className={cn("h-full", className)}>
      <Surface
        as="article"
        radius="xl"
        shadow="lg"
        bordered
        className="group relative flex h-full min-h-[26rem] flex-col justify-end overflow-hidden focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--color-border-focus)] sm:min-h-[30rem] lg:min-h-[36rem]"
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
            <NewsCardLink href={href}>{featured.title}</NewsCardLink>
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
            {!featured.externalUrl && (
              <ViewCount count={featured.viewCount} className="text-text-secondary" />
            )}
          </div>

          <div className="relative z-sticky mt-2 flex items-center gap-3">
            <LinkButton
              href={href}
              variant="primary"
              rightIcon={<ArrowRight size={16} aria-hidden />}
              className="shadow-glow"
              {...(featured.externalUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              기사 읽기
            </LinkButton>
            <FeaturedHeroShareButton
              title={featured.title}
              url={featured.externalUrl ?? `${siteConfig.siteUrl}/news/${featured.slug}`}
            />
          </div>
        </div>
      </Surface>
    </FadeIn>
  );
}
