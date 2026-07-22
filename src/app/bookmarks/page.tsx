import type { Metadata } from "next";
import { HubNav, BookmarkList } from "@/components/personalization";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "북마크",
  description: `${siteConfig.siteName}에서 저장한 뉴스를 한 곳에서 확인합니다.`,
  robots: { index: false, follow: false },
};

/**
 * 저장한 뉴스 목록 페이지 (TASK-011) — `/bookmarks`.
 * 로그인 없이 이 브라우저에만 저장되는 북마크이므로 검색 노출은 막는다.
 */
export default function BookmarksPage() {
  return (
    <div className="container-dashboard flex flex-col gap-8 py-8 lg:py-12">
      <HubNav />

      <header className="flex flex-col gap-3">
        <h1 className="type-page-title">북마크</h1>
        <p className="type-body max-w-prose text-text-secondary">
          저장한 뉴스는 이 브라우저에만 보관되며, 다른 기기와 동기화되지 않습니다.
        </p>
      </header>

      <BookmarkList />
    </div>
  );
}
