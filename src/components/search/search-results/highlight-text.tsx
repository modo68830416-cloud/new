import { cn } from "@/lib/utils";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export interface HighlightTextProps {
  text: string;
  /** 강조할 검색어. 비어 있으면 원문 그대로 렌더링한다 */
  query?: string;
  className?: string;
}

/**
 * 검색어와 일치하는 부분을 `<mark>`로 강조한다 (TASK-010 검색 결과 하이라이트).
 * 대소문자를 구분하지 않고 매칭하며, 정규식 특수문자는 이스케이프한다.
 */
export function HighlightText({ text, query, className }: HighlightTextProps) {
  const trimmed = query?.trim();
  if (!trimmed) return <>{text}</>;

  const parts = text.split(new RegExp(`(${escapeRegExp(trimmed)})`, "gi"));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === trimmed.toLowerCase() ? (
          <mark
            key={index}
            className={cn("rounded-xs bg-accent-primary/25 px-0.5 text-inherit", className)}
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}
