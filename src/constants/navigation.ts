import { VISIBLE_CATEGORIES } from "@/constants/categories";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export const PRIMARY_NAVIGATION: NavigationItem[] = VISIBLE_CATEGORIES.map(
  (category) => ({
    id: category.id,
    label: category.shortName ?? category.name,
    href: `/category/${category.slug}`,
  }),
);
