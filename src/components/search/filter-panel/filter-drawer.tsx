"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Drawer } from "@/components/ui/drawer";
import { isSearchFilterActive } from "@/data/mock-search";
import { FilterPanelContent, type FilterPanelContentProps } from "./filter-panel-content";

export interface FilterDrawerProps extends FilterPanelContentProps {
  title?: string;
}

/**
 * Filter Panel — 모바일 드로어 (TASK-010).
 * 데스크톱에서는 대신 `FilterPanel`(사이드바)을 사용한다. TASK-003
 * `Drawer`를 그대로 재사용하며(포커스 트랩/ESC/스크롤 잠금 포함), 트리거
 * 버튼은 활성 필터가 있으면 뱃지로 표시한다.
 */
export function FilterDrawer({ title = "필터", ...contentProps }: FilterDrawerProps) {
  const [open, setOpen] = useState(false);
  const hasActiveFilters = isSearchFilterActive(contentProps.filters);

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      title={title}
      description="카테고리, 콘텐츠 유형, 날짜, 정렬을 조정합니다."
      side="bottom"
      trigger={
        <Button variant="secondary" size="sm" className="lg:hidden">
          <SlidersHorizontal size={16} aria-hidden />
          필터
          {hasActiveFilters && (
            <Badge tone="accent" size="sm" className="ml-1">
              적용됨
            </Badge>
          )}
        </Button>
      }
    >
      <FilterPanelContent {...contentProps} />
    </Drawer>
  );
}
