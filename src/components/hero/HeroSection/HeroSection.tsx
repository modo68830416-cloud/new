import { Suspense } from "react";
import { ArrowDown } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FadeIn } from "@/components/motion/FadeIn";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { FeaturedHeroServer } from "@/components/hero/FeaturedHero";
import { SecondaryNewsGridServer } from "@/components/hero/SecondaryNewsGrid";
import { TrendingPanelServer } from "@/components/hero/TrendingPanel";
import { LiveStatusPanelServer } from "@/components/hero/LiveStatusPanel";
import { MarketWeatherStrip } from "@/components/hero/MarketWeatherStrip";
import { cn } from "@/lib/utils";
import type { HeroSectionProps } from "./HeroSection.types";

/**
 * TASK-012 — Featured/Secondary/Trending은 서비스 계층(`@/lib/news-api`)에서
 * 비동기로 조회되므로, 조회가 끝날 때까지 실제 카드와 같은 자리를 차지하는
 * 스켈레톤을 보여준다(레이아웃 이동 최소화).
 */
function FeaturedHeroSkeleton() {
  return (
    <Card
      padding="none"
      className="flex h-full min-h-[26rem] flex-col justify-end gap-3 overflow-hidden p-6 sm:min-h-[30rem] sm:p-8 lg:min-h-[36rem] lg:p-10"
    >
      <Skeleton className="h-5 w-20 rounded-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </Card>
  );
}

function SecondaryNewsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {Array.from({ length: 6 }, (_, index) => (
        <Card
          key={index}
          padding="none"
          className={cn("flex h-full flex-col overflow-hidden", index >= 2 && "hidden lg:flex")}
        >
          <Skeleton className="aspect-[16/10] w-full rounded-none" />
          <div className="flex flex-col gap-2 p-4">
            <Skeleton className="h-4 w-16 rounded-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        </Card>
      ))}
    </div>
  );
}

function TrendingPanelSkeleton() {
  return (
    <Card className="flex h-full flex-col gap-3">
      <Skeleton className="h-6 w-40" />
      {Array.from({ length: 5 }, (_, index) => (
        <Skeleton key={index} className="h-5 w-full" />
      ))}
    </Card>
  );
}

/** TASK-013 — `LiveStatusPanelServer`의 Suspense fallback */
function LiveStatusPanelSkeleton() {
  return (
    <Card className="flex h-full flex-col gap-5">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-10 w-40" />
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    </Card>
  );
}

/**
 * TASK-006 홈페이지 첫 화면(Above the Fold) — 메인 Hero.
 *
 * 데스크톱 레이아웃: Featured News(8/12) | Trending + Live Status(4/12) 사이드바
 * → Market/Weather 스트립 → Secondary News Grid.
 * 모바일 레이아웃: Featured → Trending → Live Status → Market/Weather →
 * Secondary 순서로 세로 스택된다(동일한 정보를 동일한 순서로 전달).
 *
 * Hero Container/Grid 자체는 순수 레이아웃이며, 실제 모션은 각 하위
 * 컴포넌트(FeaturedHero의 FadeIn, SecondaryNewsGrid의 stagger된 SlideUp,
 * TrendingPanel의 Stagger, HeroBackground의 배경 Glow)에서 담당한다.
 */
export function HeroSection({ className, secondaryGridId = "secondary-news" }: HeroSectionProps) {
  return (
    <section
      aria-label="주요 뉴스와 실시간 현황"
      className={cn("relative overflow-hidden", className)}
    >
      <HeroBackground />

      <div className="container-news relative z-content flex flex-col gap-8 py-8 sm:py-10 lg:gap-10 lg:py-14">
        <FadeIn className="flex flex-wrap items-center justify-between gap-4">
          <p className="type-caption text-text-secondary">
            지금 이 순간, 가장 중요한 소식만 모았습니다.
          </p>
          <LinkButton
            href={`#${secondaryGridId}`}
            variant="outline"
            size="sm"
            rightIcon={<ArrowDown size={14} aria-hidden />}
          >
            주요 뉴스 더 보기
          </LinkButton>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-8">
            <Suspense fallback={<FeaturedHeroSkeleton />}>
              <FeaturedHeroServer />
            </Suspense>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Suspense fallback={<TrendingPanelSkeleton />}>
              <TrendingPanelServer />
            </Suspense>
            <Suspense fallback={<LiveStatusPanelSkeleton />}>
              <LiveStatusPanelServer />
            </Suspense>
          </div>
        </div>

        <FadeIn>
          <MarketWeatherStrip />
        </FadeIn>

        <section aria-labelledby="secondary-news-heading" className="flex flex-col gap-6">
          <div>
            <h2 id="secondary-news-heading" className="type-section-title text-text-primary">
              주요 뉴스
            </h2>
            <p className="type-caption mt-1">지금 가장 많이 읽히는 소식을 모았습니다.</p>
          </div>

          <div id={secondaryGridId} className="scroll-mt-24">
            <Suspense fallback={<SecondaryNewsGridSkeleton />}>
              <SecondaryNewsGridServer />
            </Suspense>
          </div>
        </section>
      </div>
    </section>
  );
}
