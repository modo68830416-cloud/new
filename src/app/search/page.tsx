import type { Metadata } from "next";
import { SearchPageContent } from "@/components/search";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "뉴스 검색",
  description: `${siteConfig.siteName}에서 기사, 카테고리, 태그를 검색합니다.`,
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

/**
 * 글로벌 검색 페이지 (TASK-010) — `/search`, `/search?q=...`.
 * 실제 검색 API 없이 mock 데이터(`@/data/mock-search`)만 사용한다.
 */
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  return <SearchPageContent initialQuery={q ?? ""} />;
}
