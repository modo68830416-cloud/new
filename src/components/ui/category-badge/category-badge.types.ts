import type { HTMLAttributes } from "react";
import type { NewsCategory } from "@/types/news";

export type CategoryBadgeSize = "sm" | "md";

export interface CategoryBadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  category: Pick<NewsCategory, "slug" | "name" | "shortName">;
  size?: CategoryBadgeSize;
  /** shortName이 있으면 shortName을 우선 표시 */
  useShortName?: boolean;
}
