/**
 * TASK-009 뉴스 상세 페이지 컴포넌트 모음의 공개 API.
 *
 * 소비하는 쪽(페이지)은 항상 이 배럴을 통해 import한다:
 * `import { ArticleBody, TableOfContents } from "@/components/article";`
 *
 * 카드/리스트/그리드 렌더링은 여기서 새로 만들지 않고 항상
 * `@/components/news`(TASK-007)를 재사용한다.
 */
export { ReadProgressBar, type ReadProgressBarProps } from "./read-progress";
export { TableOfContents, type TableOfContentsProps } from "./table-of-contents";
export { ArticleBody, type ArticleBodyProps } from "./article-body";
export { ArticleMeta, type ArticleMetaProps } from "./article-meta";
export { AuthorCard, type AuthorCardProps } from "./author-card";
export { ShareButtons, type ShareButtonsProps } from "./share-buttons";
export { RelatedNews, type RelatedNewsProps } from "./related-news";
