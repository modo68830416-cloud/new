import type { Metadata } from "next";
import { HubNav, ReadingHistoryList } from "@/components/personalization";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "읽기 기록",
  description: `${siteConfig.siteName}에서 최근 읽은 뉴스를 확인합니다.`,
  robots: { index: false, follow: false },
};

/**
 * 최근 읽은 뉴스 목록 페이지 (TASK-011) — `/history`.
 */
export default function HistoryPage() {
  return (
    <div className="container-dashboard flex flex-col gap-8 py-8 lg:py-12">
      <HubNav />

      <header className="flex flex-col gap-3">
        <h1 className="type-page-title">읽기 기록</h1>
        <p className="type-body max-w-prose text-text-secondary">
          뉴스 상세 페이지를 열어볼 때마다 자동으로 기록되며, 최근 본 순서대로
          보여줍니다. 최대 50건까지 보관되고 그 이상은 오래된 순으로 사라집니다.
        </p>
      </header>

      <ReadingHistoryList />
    </div>
  );
}
