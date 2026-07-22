"use client";

import { useState } from "react";
import { ArrowRight, Bell, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { LinkButton } from "@/components/ui/link-button";
import type { ButtonVariant } from "@/components/ui/button";
import { SubSection } from "./section";

const VARIANTS: ButtonVariant[] = ["primary", "secondary", "outline", "ghost", "danger"];

export function ButtonsPreview() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <SubSection title="Button — variant">
        <div className="flex flex-wrap gap-3">
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </SubSection>

      <SubSection title="Button — size">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </SubSection>

      <SubSection title="Button — 아이콘 / 상태">
        <div className="flex flex-wrap items-center gap-3">
          <Button leftIcon={<Bell size={16} />}>알림 구독</Button>
          <Button rightIcon={<ArrowRight size={16} />} variant="secondary">
            더 보기
          </Button>
          <Button isLoading={loading} onClick={() => setLoading((v) => !v)}>
            {loading ? "저장 중..." : "클릭해서 로딩 토글"}
          </Button>
          <Button disabled>비활성화</Button>
          <Button fullWidth variant="outline" className="max-w-xs">
            fullWidth
          </Button>
        </div>
      </SubSection>

      <SubSection title="IconButton">
        <div className="flex flex-wrap items-center gap-3">
          <IconButton label="북마크" icon={<Bookmark size={16} />} size="sm" />
          <IconButton label="공유" icon={<Share2 size={16} />} variant="outline" />
          <IconButton label="알림" icon={<Bell size={16} />} variant="ghost" size="lg" />
          <IconButton label="비활성" icon={<Bookmark size={16} />} disabled />
        </div>
      </SubSection>

      <SubSection title="LinkButton (내비게이션 전용)">
        <div className="flex flex-wrap items-center gap-3">
          <LinkButton href="/design-system">디자인 시스템 보기</LinkButton>
          <LinkButton href="/" variant="secondary">
            홈으로
          </LinkButton>
          <LinkButton href="/" variant="ghost" disabled>
            비활성 링크
          </LinkButton>
        </div>
      </SubSection>
    </>
  );
}
