"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/FadeIn";
import { SlideUp } from "@/components/motion/SlideUp";
import { ScaleIn } from "@/components/motion/ScaleIn";
import { SubSection } from "@/components/ui-preview/section";

/** Fade / Slide / Scale — "재생" 버튼으로 remount해서 반복 확인할 수 있게 한다. */
export function RevealPreview() {
  const [replayKey, setReplayKey] = useState(0);

  return (
    <SubSection title="Fade / Slide / Scale">
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
          컴포넌트가 뷰포트에 들어올 때(Scroll Reveal) 재생됩니다. 버튼을
          누르면 강제로 다시 재생합니다.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FadeIn key={`fade-${replayKey}`} repeat>
          <Card>
            <CardTitle>FadeIn</CardTitle>
            <CardContent>opacity만 사용하는 fade preset.</CardContent>
          </Card>
        </FadeIn>
        <SlideUp key={`slide-${replayKey}`} repeat delay={0.08}>
          <Card>
            <CardTitle>SlideUp</CardTitle>
            <CardContent>opacity + translateY(16px) slide-up preset.</CardContent>
          </Card>
        </SlideUp>
        <ScaleIn key={`scale-${replayKey}`} repeat delay={0.16}>
          <Card>
            <CardTitle>ScaleIn</CardTitle>
            <CardContent>opacity + scale(0.96 → 1) scale preset.</CardContent>
          </Card>
        </ScaleIn>
      </div>
    </SubSection>
  );
}
