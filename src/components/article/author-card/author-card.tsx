import { Card } from "@/components/ui/card";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";
import type { Author } from "@/types/news";

export interface AuthorCardProps {
  author: Author;
  className?: string;
}

function getInitial(name: string): string {
  return name.trim().slice(0, 1) || "?";
}

/**
 * 작성자 정보 카드 (TASK-009) — 이름, 소개, 작성 기사 수(Mock).
 * `NewsSourceLine`(TASK-007)보다 넓은 정보(bio, 기사 수)를 보여줘야 해서
 * 별도 컴포넌트로 두되, 아바타 fallback 패턴은 동일하게 재사용한다.
 */
export function AuthorCard({ author, className }: AuthorCardProps) {
  return (
    <Card padding="lg" className={cn("flex items-start gap-4", className)}>
      <Surface
        level="elevated"
        radius="none"
        bordered
        aria-hidden
        className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full"
      >
        {author.profileImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- 56px 아바타는 next/image 최적화 대상이 아닌 장식 요소
          <img src={author.profileImage} alt="" className="size-full object-cover" />
        ) : (
          <span className="type-card-title text-text-secondary">{getInitial(author.name)}</span>
        )}
      </Surface>
      <div className="flex min-w-0 flex-col gap-1.5">
        <p className="type-caption text-text-muted">작성자</p>
        <p className="type-card-title text-text-primary">
          {author.name}
          {author.role && (
            <span className="type-caption ml-2 font-normal text-text-muted">{author.role}</span>
          )}
        </p>
        {author.bio && <p className="type-body text-text-secondary">{author.bio}</p>}
        {typeof author.articleCount === "number" && (
          <p className="type-metadata text-text-muted">
            누적 작성 기사 <span className="type-data-number">{author.articleCount.toLocaleString("ko-KR")}</span>건
          </p>
        )}
      </div>
    </Card>
  );
}
