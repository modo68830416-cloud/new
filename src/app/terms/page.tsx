import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "이용약관",
  description: `${siteConfig.siteName} 이용약관 안내`,
};

/**
 * 이용약관 페이지 (TASK-014) — `/terms`.
 *
 * `${siteConfig.siteName}`은 실습/데모용 프로젝트이므로 실제 법적 효력이
 * 있는 이용약관 문서를 작성하지 않는다. Footer의 "이용약관" 링크가
 * `aria-disabled` 앵커(실제로는 키보드로 활성화되는 불일치 상태)로 남아있던
 * 것을 고치기 위해, 이 프로젝트의 성격을 정직하게 안내하는 실제 페이지로
 * 연결한다.
 */
export default function TermsPage() {
  return (
    <div className="container-dashboard flex flex-col gap-6 py-8 lg:py-12">
      <header className="flex flex-col gap-3">
        <h1 className="type-page-title">이용약관</h1>
      </header>
      <div className="max-w-prose">
        <p className="type-body text-text-secondary">
          {siteConfig.siteName}은 실제 서비스가 아닌 학습·포트폴리오 목적의 데모
          프로젝트입니다. 이 페이지의 뉴스, 언론사, 인물은 모두 가상이며, 실제
          법적 효력이 있는 이용약관은 아직 작성되지 않았습니다.
        </p>
      </div>
    </div>
  );
}
