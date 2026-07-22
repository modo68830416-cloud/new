import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { designSystemConfig } from "@/config/design-system";
import { cn } from "@/lib/utils";
import { CategoryNewsGrid } from "../grids/category-news-grid";
import { NewsCardGrid } from "../grids/news-card-grid";
import { CompactNewsList } from "../lists/compact-news-list";
import { LatestNewsList } from "../lists/latest-news-list";
import type { CategorySectionProps } from "../news.types";

/**
 * 메인페이지 안에서 카테고리별 기사 묶음을 보여주는 재사용 섹션
 * (task-007.md 10절). 카테고리 페이지 전체를 대체하지 않는다.
 */
export function CategorySection({
  title,
  category,
  featured,
  items,
  href,
  layout = "featured-grid",
  compactItems,
  className,
}: CategorySectionProps) {
  const colorToken = designSystemConfig.categoryColors.find(
    (item) => item.slug === category.slug,
  );
  const headingId = `category-section-${category.slug}-title`;

  return (
    <section className={cn("flex flex-col gap-4", className)} aria-labelledby={headingId}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="size-2.5 shrink-0 rounded-full"
            style={colorToken ? { backgroundColor: `var(${colorToken.cssVar})` } : undefined}
          />
          <h2 id={headingId} className="type-section-title">
            {title}
          </h2>
        </div>
        <LinkButton
          href={href}
          variant="ghost"
          size="sm"
          rightIcon={<ArrowRight size={14} aria-hidden />}
        >
          더 보기
        </LinkButton>
      </div>

      {layout === "featured-grid" && <CategoryNewsGrid featured={featured} items={items} />}
      {layout === "standard-grid" && (
        <NewsCardGrid articles={[featured, ...items]} columns={4} cardSize="medium" />
      )}
      {layout === "list" && <LatestNewsList articles={[featured, ...items]} />}

      {compactItems && compactItems.length > 0 && (
        <CompactNewsList articles={compactItems} className="mt-2" />
      )}
    </section>
  );
}
