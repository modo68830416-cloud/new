"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PageTransition } from "@/components/motion/PageTransition";
import { SubSection } from "@/components/ui-preview/section";

const TABS = ["A", "B", "C"] as const;

/**
 * 실제 라우트 이동 없이 `PageTransition`의 전환 구조를 재현하기 위한 데모.
 * `transitionKey`를 탭 상태로 넘겨 App Router의 `usePathname()` 변화를
 * 흉내낸다.
 */
export function PageTransitionPreview() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("A");

  return (
    <SubSection title="Page Transition">
      <p className="type-caption mb-4">
        App Router의 `template.tsx`에서 `{"{children}"}`을 감싸 재사용할 수
        있는 구조입니다. 아래는 실제 라우트 대신 탭 전환으로 재현한 데모입니다.
      </p>
      <div className="mb-4 flex gap-2">
        {TABS.map((t) => (
          <Button
            key={t}
            size="sm"
            variant={tab === t ? "primary" : "secondary"}
            onClick={() => setTab(t)}
          >
            페이지 {t}
          </Button>
        ))}
      </div>
      <div className="overflow-hidden rounded-md border border-border-default bg-surface p-4">
        <PageTransition transitionKey={tab}>
          <Card padding="sm">
            <CardTitle>페이지 {tab}</CardTitle>
            <CardContent className="type-caption">
              fade + 8px 수직 이동 전환 (duration-normal / ease-standard).
            </CardContent>
          </Card>
        </PageTransition>
      </div>
    </SubSection>
  );
}
