"use client";

import { ToastProvider } from "@/components/ui/toast";
import { Section } from "./section";
import { ButtonsPreview } from "./buttons-preview";
import { BadgesPreview } from "./badges-preview";
import { NewsMetaPreview } from "./news-meta-preview";
import { InputsPreview } from "./inputs-preview";
import { CardsPreview } from "./cards-preview";
import { LoadingPreview } from "./loading-preview";
import { OverlaysPreview } from "./overlays-preview";

/**
 * TASK-003 UI 컴포넌트 라이브러리 미리보기 (개발용 전용 페이지).
 * 실제 뉴스 데이터/헤더/푸터 없이 컴포넌트 자체만 검수한다.
 */
export function UiPreviewContent() {
  return (
    <ToastProvider>
      <div className="container-dashboard py-12">
        <header className="mb-12">
          <p className="type-metadata mb-3 text-accent-primary">
            Development Only · TASK-003
          </p>
          <h1 className="type-hero-title break-url">UI 컴포넌트 미리보기</h1>
          <p className="type-body mt-4 max-w-prose text-text-secondary">
            TASK-002 디자인 토큰만을 사용해 구현한 공통 UI 컴포넌트 라이브러리
            검수용 페이지다. Hover / Focus / Disabled 상태는 직접 마우스와
            키보드(Tab)로 확인할 수 있다.
          </p>
        </header>

        <Section id="buttons" title="1. 버튼" description="Button, IconButton, LinkButton.">
          <ButtonsPreview />
        </Section>

        <Section
          id="badges"
          title="2. 배지"
          description="Badge, BreakingBadge, LiveBadge, CategoryBadge, Divider."
        >
          <BadgesPreview />
        </Section>

        <Section
          id="news-meta"
          title="3. 뉴스 메타 정보"
          description="NewsMeta, TimeAgo, ViewCount, TrendingIndicator."
        >
          <NewsMetaPreview />
        </Section>

        <Section id="cards" title="4. 카드 & 표면" description="Card, Surface.">
          <CardsPreview />
        </Section>

        <Section
          id="inputs"
          title="5. 입력 요소"
          description="Input, SearchInput, Textarea, Select, Checkbox, Switch."
        >
          <InputsPreview />
        </Section>

        <Section
          id="loading"
          title="6. 로딩 & 상태"
          description="Skeleton, Spinner, EmptyState, ErrorState."
        >
          <LoadingPreview />
        </Section>

        <Section
          id="overlays"
          title="7. 오버레이"
          description="Toast, Modal, Drawer, Tooltip, Dropdown."
        >
          <OverlaysPreview />
        </Section>
      </div>
    </ToastProvider>
  );
}
