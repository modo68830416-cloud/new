import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";
import type { NewsSourceLineProps } from "../news.types";

function getInitial(name: string): string {
  return name.trim().slice(0, 1) || "?";
}

/**
 * 필자/언론사 표시 primitive (TASK-007 6.4, 7.8).
 *
 * 필자 사진이 있으면 보여주고, 없으면 이니셜 fallback을 사용한다
 * (인물 카드처럼 과도하게 꾸미지 않는다). 언론사만 있는 경우에는 아바타
 * 없이 텍스트만 표시한다. 긴 이름은 말줄임 처리한다.
 */
export function NewsSourceLine({
  source,
  author,
  authorRole,
  className,
}: NewsSourceLineProps) {
  if (!source && !author) return null;

  const name = author?.name ?? source?.name ?? "";
  const role = authorRole ?? author?.role;

  return (
    <div className={cn("flex min-w-0 items-center gap-2.5", className)}>
      {author && (
        <Surface
          level="elevated"
          radius="none"
          bordered
          className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full"
          aria-hidden
        >
          {author.profileImage ? (
            // eslint-disable-next-line @next/next/no-img-element -- 40px 아바타는 next/image 최적화 대상이 아닌 장식 요소
            <img
              src={author.profileImage}
              alt=""
              className="size-full object-cover"
            />
          ) : (
            <span className="type-label text-text-secondary">{getInitial(name)}</span>
          )}
        </Surface>
      )}
      <div className="min-w-0">
        <p className="type-caption truncate font-semibold text-text-primary">{name}</p>
        {(role || (author && source)) && (
          <p className="type-metadata truncate normal-case">
            {role}
            {role && author && source ? " · " : ""}
            {author && source ? source.name : null}
          </p>
        )}
      </div>
    </div>
  );
}
