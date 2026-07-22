"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Stagger } from "@/components/motion/Stagger";
import { SubSection } from "@/components/ui-preview/section";

const ITEMS = ["실시간 속보", "정치", "경제", "IT·과학"];

export function StaggerPreview() {
  const [replayKey, setReplayKey] = useState(0);

  return (
    <SubSection title="Stagger">
      <div className="mb-4 flex items-center gap-3">
        <Button
          size="sm"
          variant="secondary"
          leftIcon={<RotateCcw size={14} />}
          onClick={() => setReplayKey((k) => k + 1)}
        >
          다시 재생
        </Button>
        <p className="type-caption">
          자식 요소가 순서대로 시차를 두고 나타납니다 (staggerChildren).
        </p>
      </div>
      <Stagger
        key={replayKey}
        repeat
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {ITEMS.map((item) => (
          <Card key={item} padding="sm">
            <CardTitle className="text-sm">{item}</CardTitle>
            <CardContent className="type-caption">뉴스 카드 예시</CardContent>
          </Card>
        ))}
      </Stagger>
    </SubSection>
  );
}
