import type {
  ArticleContentBlock,
  ArticleHeadingBlock,
  NewsArticle,
} from "@/types/news";

/**
 * 뉴스 상세 페이지(TASK-009) 전용 mock 본문 생성기.
 *
 * 실제 CMS/리치 텍스트 연동이 없으므로, `mock-news.ts`의 기사 필드
 * (summary/content/tags/author 등)를 조합해 구조화된 본문 블록
 * (H2/H3/문단/목록/인용/이미지)을 결정론적으로 만들어낸다 — 같은 기사에
 * 대해 항상 같은 본문을 반환하므로 서버/클라이언트 렌더링 결과가 always
 * 일치하고, 정적 빌드(generateStaticParams) 시에도 안전하다.
 */
function blockId(article: NewsArticle, suffix: string): string {
  return `${article.slug}-${suffix}`;
}

export function buildArticleBody(article: NewsArticle): ArticleContentBlock[] {
  const categoryName = article.category.name;
  const authorName = article.author?.name ?? "취재팀";
  const tagList = article.tags.length > 0 ? article.tags.join(", ") : categoryName;

  const blocks: ArticleContentBlock[] = [
    {
      id: blockId(article, "lead"),
      type: "paragraph",
      text: article.content,
    },
    {
      id: blockId(article, "h2-summary"),
      type: "heading",
      level: 2,
      text: "핵심 내용",
    },
    {
      id: blockId(article, "p-summary"),
      type: "paragraph",
      text: `${article.summary} 관련 부서는 후속 상황을 지속적으로 점검하고 있으며, 추가로 확인되는 사실관계는 순차적으로 반영할 예정이라고 밝혔다.`,
    },
    {
      id: blockId(article, "list-points"),
      type: "list",
      style: "unordered",
      items: [
        `${categoryName} 분야 관련 핵심 쟁점: ${tagList}`,
        `${article.source.name} 등 취재원을 통해 사실관계를 확인했다.`,
        "관계 기관은 추가 발표 일정을 조율 중이라고 전했다.",
      ],
    },
    {
      id: blockId(article, "h2-background"),
      type: "heading",
      level: 2,
      text: "배경과 맥락",
    },
    {
      id: blockId(article, "p-background"),
      type: "paragraph",
      text: `이번 사안은 ${categoryName} 분야에서 최근 이어져 온 흐름과 맞닿아 있다는 분석이 나온다. 전문가들은 단기적 파장뿐 아니라 중장기적인 영향까지 함께 살펴야 한다고 조언한다.`,
    },
    {
      id: blockId(article, "h3-expert"),
      type: "heading",
      level: 3,
      text: "전문가 시각",
    },
    {
      id: blockId(article, "quote"),
      type: "quote",
      text: "속단하기보다는 추가로 확인되는 사실관계를 차분히 지켜볼 필요가 있다.",
      attribution: `${categoryName} 분야 관계자`,
    },
    {
      id: blockId(article, "image"),
      type: "image",
      alt: `${article.title} 관련 이미지`,
      caption: `${article.source.name} 제공 (이미지는 예시이며 실제 CMS와 연동되지 않은 mock 자산입니다)`,
    },
    {
      id: blockId(article, "h2-outlook"),
      type: "heading",
      level: 2,
      text: "앞으로의 전망",
    },
    {
      id: blockId(article, "p-outlook"),
      type: "paragraph",
      text: `${authorName} 기자는 관련 상황을 계속 취재하며 후속 소식이 확인되는 대로 전할 예정이다. 독자들의 제보와 확인 요청은 언제든 환영한다는 입장이다.`,
    },
  ];

  return blocks;
}

/** 본문 블록 중 heading만 골라 TOC(목차) 입력으로 변환한다 */
export function extractHeadings(blocks: ArticleContentBlock[]): ArticleHeadingBlock[] {
  return blocks.filter((block): block is ArticleHeadingBlock => block.type === "heading");
}
