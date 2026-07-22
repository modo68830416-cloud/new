import { Fragment } from "react";
import { NewsImage } from "@/components/news";
import { cn } from "@/lib/utils";
import type { ArticleContentBlock } from "@/types/news";

export interface ArticleBodyProps {
  blocks: ArticleContentBlock[];
  className?: string;
}

/**
 * 기사 본문 렌더러 (TASK-009).
 *
 * H2/H3/문단/목록/인용/이미지 placeholder를 지원한다. 실제 CMS 연동이
 * 없으므로 `blocks`는 항상 mock 데이터(`buildArticleBody`)에서 온다.
 * heading에는 목차(TOC)가 앵커로 사용하는 `id`를 그대로 부여하고,
 * `scroll-mt-*`로 상단 고정 헤더/Read Progress Bar에 가리지 않도록 한다.
 */
export function ArticleBody({ blocks, className }: ArticleBodyProps) {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {blocks.map((block) => (
        <Fragment key={block.id}>
          {block.type === "heading" && block.level === 2 && (
            <h2 id={block.id} className="type-section-title scroll-mt-28 break-keep">
              {block.text}
            </h2>
          )}
          {block.type === "heading" && block.level === 3 && (
            <h3 id={block.id} className="type-card-title scroll-mt-28 break-keep">
              {block.text}
            </h3>
          )}
          {block.type === "paragraph" && (
            <p id={block.id} className="type-body break-keep text-text-secondary">
              {block.text}
            </p>
          )}
          {block.type === "list" &&
            (block.style === "ordered" ? (
              <ol id={block.id} className="type-body list-decimal flex flex-col gap-1.5 pl-6 text-text-secondary">
                {block.items.map((item) => (
                  <li key={item} className="break-keep">
                    {item}
                  </li>
                ))}
              </ol>
            ) : (
              <ul id={block.id} className="type-body list-disc flex flex-col gap-1.5 pl-6 text-text-secondary">
                {block.items.map((item) => (
                  <li key={item} className="break-keep">
                    {item}
                  </li>
                ))}
              </ul>
            ))}
          {block.type === "quote" && (
            <blockquote
              id={block.id}
              className="type-body break-keep border-l-4 border-accent-primary bg-surface py-3 pl-5 pr-4 italic text-text-primary"
            >
              <p>&ldquo;{block.text}&rdquo;</p>
              {block.attribution && (
                <cite className="type-caption mt-2 block not-italic text-text-muted">
                  — {block.attribution}
                </cite>
              )}
            </blockquote>
          )}
          {block.type === "image" && (
            <figure id={block.id} className="flex flex-col gap-2">
              <NewsImage src={block.src} alt={block.alt} ratio="16:9" className="rounded-md" />
              {block.caption && (
                <figcaption className="type-caption text-text-muted">{block.caption}</figcaption>
              )}
            </figure>
          )}
        </Fragment>
      ))}
    </div>
  );
}
