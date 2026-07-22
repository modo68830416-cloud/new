import { NewsMeta } from "@/components/ui/news-meta";
import { TimeAgo } from "@/components/ui/time-ago";
import { ViewCount } from "@/components/ui/view-count";
import { TrendingIndicator } from "@/components/ui/trending-indicator";
import type { TrendingKeywordChange } from "@/types/news";
import { VISIBLE_CATEGORIES } from "@/constants/categories";
import { SubSection } from "./section";

const CHANGES: TrendingKeywordChange[] = ["up", "down", "same", "new"];
const now = Date.now();

export function NewsMetaPreview() {
  return (
    <>
      <SubSection title="NewsMeta — 뉴스 카드 메타 정보 조합">
        <div className="flex flex-col gap-3 rounded-md border border-border-default bg-surface p-4">
          <NewsMeta
            category={VISIBLE_CATEGORIES[1]}
            authorName="김도윤 기자"
            publishedAt={now - 5 * 60 * 1000}
            viewCount={12840}
          />
          <NewsMeta
            category={VISIBLE_CATEGORIES[2]}
            publishedAt={now - 3 * 60 * 60 * 1000}
            viewCount={302}
          />
        </div>
      </SubSection>

      <SubSection title="TimeAgo / ViewCount">
        <div className="flex flex-wrap items-center gap-4">
          <TimeAgo date={now - 30 * 1000} />
          <TimeAgo date={now - 45 * 60 * 1000} />
          <TimeAgo date={now - 26 * 60 * 60 * 1000} />
          <ViewCount count={1204} />
          <ViewCount count={98213} />
        </div>
      </SubSection>

      <SubSection title="TrendingIndicator">
        <div className="flex flex-wrap items-center gap-4">
          {CHANGES.map((change) => (
            <div key={change} className="flex items-center gap-2">
              <span className="type-caption">{change}</span>
              <TrendingIndicator change={change} delta={change === "up" || change === "down" ? 3 : undefined} />
            </div>
          ))}
        </div>
      </SubSection>
    </>
  );
}
