import type { HTMLAttributes } from "react";
import type { NewsCategory } from "@/types/news";

export interface NewsMetaProps extends HTMLAttributes<HTMLDivElement> {
  category?: Pick<NewsCategory, "slug" | "name" | "shortName">;
  publishedAt?: string | number | Date;
  authorName?: string;
  viewCount?: number;
  /** 카테고리 배지 표시 여부. 기본 true */
  showCategory?: boolean;
}
