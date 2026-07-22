import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SuggestionOption } from "@/data/mock-search";

export interface SuggestionOptionRowProps {
  option: SuggestionOption;
  isActive: boolean;
  onSelect: (option: SuggestionOption) => void;
  /** 라벨 앞에 표시할 아이콘 (장식용) */
  icon?: ReactNode;
  /** 라벨 뒤에 표시할 보조 콘텐츠 (예: 인기 검색어 순위 변동) */
  trailing?: ReactNode;
  className?: string;
}

/**
 * SearchBox 콤보박스의 단일 옵션 행 (TASK-010).
 *
 * `role="option"` — 실제 DOM 포커스는 항상 콤보박스 입력창(input)에 남아
 * 있고, 이 요소는 `aria-activedescendant`로만 강조된다(ARIA 콤보박스 패턴).
 * 마우스 클릭은 `onMouseDown`에서 `preventDefault`로 처리해 입력창이 blur
 * 되기 전에 선택이 먼저 반영되도록 한다.
 */
export function SuggestionOptionRow({
  option,
  isActive,
  onSelect,
  icon,
  trailing,
  className,
}: SuggestionOptionRowProps) {
  return (
    <div
      id={option.id}
      role="option"
      aria-selected={isActive}
      onMouseDown={(event) => {
        event.preventDefault();
        onSelect(option);
      }}
      className={cn(
        "type-body flex cursor-pointer items-center gap-2.5 rounded-sm px-3 py-2 text-text-primary",
        isActive ? "bg-surface-overlay" : "hover:bg-surface-elevated",
        className,
      )}
    >
      {icon && (
        <span className="inline-flex shrink-0 text-text-muted" aria-hidden>
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1 truncate">{option.label}</span>
      {trailing}
      {!trailing && option.meta && (
        <span className="type-caption shrink-0 text-text-muted">{option.meta}</span>
      )}
    </div>
  );
}
