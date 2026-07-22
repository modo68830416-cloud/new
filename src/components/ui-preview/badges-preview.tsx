import { Badge } from "@/components/ui/badge";
import { BreakingBadge } from "@/components/ui/breaking-badge";
import { LiveBadge } from "@/components/ui/live-badge";
import { CategoryBadge } from "@/components/ui/category-badge";
import { Divider } from "@/components/ui/divider";
import type { BadgeTone } from "@/components/ui/badge";
import type { BreakingNewsLevel } from "@/types/news";
import { VISIBLE_CATEGORIES } from "@/constants/categories";
import { SubSection } from "./section";

const TONES: BadgeTone[] = ["neutral", "accent", "success", "warning", "danger", "info"];
const BREAKING_LEVELS: BreakingNewsLevel[] = ["normal", "urgent", "critical"];

export function BadgesPreview() {
  return (
    <>
      <SubSection title="Badge — tone (soft)">
        <div className="flex flex-wrap gap-2">
          {TONES.map((tone) => (
            <Badge key={tone} tone={tone}>
              {tone}
            </Badge>
          ))}
        </div>
      </SubSection>

      <SubSection title="Badge — variant">
        <div className="flex flex-wrap gap-2">
          <Badge tone="accent" variant="solid">
            solid
          </Badge>
          <Badge tone="accent" variant="soft">
            soft
          </Badge>
          <Badge tone="accent" variant="outline">
            outline
          </Badge>
        </div>
      </SubSection>

      <SubSection title="BreakingBadge — 속보 단계">
        <div className="flex flex-wrap gap-3">
          {BREAKING_LEVELS.map((level) => (
            <BreakingBadge key={level} level={level} />
          ))}
        </div>
      </SubSection>

      <SubSection title="LiveBadge">
        <div className="flex flex-wrap gap-3">
          <LiveBadge />
          <LiveBadge label="진행중" />
        </div>
      </SubSection>

      <SubSection title="CategoryBadge">
        <div className="flex flex-wrap gap-2">
          {VISIBLE_CATEGORIES.map((category) => (
            <CategoryBadge key={category.slug} category={category} />
          ))}
        </div>
      </SubSection>

      <SubSection title="Divider">
        <div className="flex flex-col gap-6">
          <Divider />
          <Divider label="또는" />
          <div className="flex h-10 items-center gap-4">
            <span className="type-caption">왼쪽</span>
            <Divider orientation="vertical" />
            <span className="type-caption">오른쪽</span>
          </div>
        </div>
      </SubSection>
    </>
  );
}
