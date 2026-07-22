import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${siteConfig.siteName} 개인정보처리방침 안내`,
};

/**
 * 개인정보처리방침 페이지 (TASK-014) — `/privacy`.
 * `/terms`와 동일한 이유로 실제 법적 문서를 작성하지 않고, 프로젝트 성격과
 * 현재 개인화 기능(TASK-011)이 `localStorage`에만 데이터를 저장하고 서버로
 * 전송하지 않는다는 점을 정직하게 안내한다.
 */
export default function PrivacyPage() {
  return (
    <div className="container-dashboard flex flex-col gap-6 py-8 lg:py-12">
      <header className="flex flex-col gap-3">
        <h1 className="type-page-title">개인정보처리방침</h1>
      </header>
      <div className="flex max-w-prose flex-col gap-4">
        <p className="type-body text-text-secondary">
          {siteConfig.siteName}은 실제 서비스가 아닌 학습·포트폴리오 목적의 데모
          프로젝트이며, 실제 법적 효력이 있는 개인정보처리방침은 아직 작성되지
          않았습니다.
        </p>
        <p className="type-body text-text-secondary">
          북마크 · 읽기 기록 · 테마 · 글자 크기 등 개인화 설정은 브라우저의
          <code className="type-caption mx-1 rounded-sm bg-surface-elevated px-1.5 py-0.5">
            localStorage
          </code>
          에만 저장되며, 서버로 전송되거나 수집되지 않습니다.
        </p>
      </div>
    </div>
  );
}
