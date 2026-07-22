import type { Metadata } from "next";
import { HubNav, SettingsPanel } from "@/components/personalization";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "설정",
  description: `${siteConfig.siteName} 테마, 글자 크기, 저장된 데이터를 관리합니다.`,
  robots: { index: false, follow: false },
};

/**
 * 개인화 설정 페이지 (TASK-011) — `/settings`.
 * 실제 계정/알림/언어 설정은 이번 Task 범위가 아니다.
 */
export default function SettingsPage() {
  return (
    <div className="container-dashboard flex flex-col gap-8 py-8 lg:py-12">
      <HubNav />

      <header className="flex flex-col gap-3">
        <h1 className="type-page-title">설정</h1>
        <p className="type-body max-w-prose text-text-secondary">
          테마, 기사 본문 글자 크기, 저장된 데이터를 관리할 수 있습니다.
        </p>
      </header>

      <SettingsPanel />
    </div>
  );
}
