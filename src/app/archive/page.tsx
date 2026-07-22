import type { Metadata } from "next";
import { ArchiveCalendar } from "@/components/search";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "뉴스 아카이브",
  description: `${siteConfig.siteName}의 지난 뉴스를 연도·월·날짜별로 탐색합니다.`,
};

/**
 * 아카이브 페이지 (TASK-010) — `/archive`.
 * 연도/월/달력/날짜 선택 UI만 제공하며 실제 날짜별 기사 데이터 연동은
 * 하지 않는다(`ArchiveCalendar` 참고).
 */
export default function ArchivePage() {
  return (
    <div className="container-dashboard flex flex-col gap-8 py-8 lg:py-12">
      <header className="flex flex-col gap-3">
        <h1 className="type-page-title">뉴스 아카이브</h1>
        <p className="type-body max-w-prose text-text-secondary">
          연도, 월, 날짜를 선택해 지난 뉴스를 탐색할 수 있는 화면입니다. 현재는 UI만
          제공하며, 날짜별 실제 기사 데이터 연동은 이후 진행됩니다.
        </p>
      </header>

      <div className="max-w-md">
        <ArchiveCalendar />
      </div>
    </div>
  );
}
