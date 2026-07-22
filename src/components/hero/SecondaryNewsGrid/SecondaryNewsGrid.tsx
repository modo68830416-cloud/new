import Image from "next/image";
import { Card } from "@/components/ui/card";
import { CategoryBadge } from "@/components/ui/category-badge";
import { NewsMeta } from "@/components/ui/news-meta";
import { SlideUp } from "@/components/motion/SlideUp";
import { transitionHover } from "@/animations/transitions";
import { getSecondaryHeroArticles } from "@/lib/hero-articles";
import { cn } from "@/lib/utils";
import type { SecondaryNewsGridProps } from "./SecondaryNewsGrid.types";

/**
 * 카드 크기를 차등 배치하기 위한 열 폭 클래스 (lg:grid-cols-6 기준).
 * 4 + 2 / 3 + 3 / 2 + 4 순서로 배치해 일정한 리듬을 만든다.
 */
const SIZE_CLASSES = [
  "lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-4",
];

/**
 * Hero 아래 보조 헤드라인 4~6개 그리드(Secondary Grid).
 *
 * Card Stagger(순차 등장) + Image Zoom(hover) + Hover Lift 모션을 사용하고,
 * 카드마다 열 폭을 다르게 배치해 시각적 리듬을 만든다.
 */
export function SecondaryNewsGrid({ articles, className }: SecondaryNewsGridProps) {
  const items = articles ?? getSecondaryHeroArticles(6);

  return (
    <div
      className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6", className)}
    >
      {items.map((article, index) => (
        <SlideUp
          key={article.id}
          delay={index * 0.06}
          whileHover={{ y: -4, transition: transitionHover }}
          className={cn("h-full", SIZE_CLASSES[index % SIZE_CLASSES.length])}
        >
          <Card
            padding="none"
            interactive
            className="group flex h-full flex-col overflow-hidden"
          >
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
              <Image
                src={article.thumbnail.url}
                alt={article.thumbnail.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-standard)] group-hover:scale-110"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <CategoryBadge category={article.category} size="sm" />
              <h3 className="type-card-title line-clamp-2 text-text-primary">
                {article.title}
              </h3>
              <NewsMeta
                publishedAt={article.publishedAt}
                viewCount={article.viewCount}
                showCategory={false}
                className="mt-auto pt-1"
              />
            </div>
          </Card>
        </SlideUp>
      ))}
    </div>
  );
}
