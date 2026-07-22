import { cn } from "@/lib/utils";
import { FilterPanelContent, type FilterPanelContentProps } from "./filter-panel-content";

export interface FilterPanelProps extends FilterPanelContentProps {
  title?: string;
}

/**
 * Filter Panel — 데스크톱 사이드바 (TASK-010).
 * 모바일에서는 대신 `FilterDrawer`(TASK-003 `Drawer` 재사용)를 사용한다.
 */
export function FilterPanel({ title = "필터", className, ...contentProps }: FilterPanelProps) {
  return (
    <aside aria-label={title} className={cn("hidden w-full max-w-[16rem] shrink-0 lg:block", className)}>
      <div className="sticky top-24 flex flex-col gap-6 rounded-md border border-border-default bg-surface p-5">
        <h2 className="type-card-title">{title}</h2>
        <FilterPanelContent {...contentProps} />
      </div>
    </aside>
  );
}
