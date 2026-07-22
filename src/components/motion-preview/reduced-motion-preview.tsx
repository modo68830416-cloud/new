"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { durations } from "@/animations/durations";
import { easings } from "@/animations/easings";
import { slideUpVariants, reducedMotionVariants } from "@/animations/variants";
import { SubSection } from "@/components/ui-preview/section";

/**
 * 실제 OS 설정을 바꾸지 않고도 비교할 수 있도록, 오른쪽 패널은 스위치로
 * reduced-motion 상태를 시뮬레이션한다. 왼쪽은 항상 일반 모션을 재생한다.
 */
export function ReducedMotionPreview() {
  const systemPrefersReduced = useReducedMotion();
  const [simulateReduced, setSimulateReduced] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  return (
    <SubSection title="Reduced Motion 비교">
      <p className="type-caption mb-3">
        현재 브라우저/OS의 실제 설정:{" "}
        <strong className="text-text-primary">
          {systemPrefersReduced ? "prefers-reduced-motion: reduce" : "no-preference"}
        </strong>
      </p>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Switch
          label="reduced-motion 시뮬레이션"
          checked={simulateReduced}
          onCheckedChange={(checked) => {
            setSimulateReduced(checked);
            setReplayKey((k) => k + 1);
          }}
        />
        <Button
          size="sm"
          variant="secondary"
          leftIcon={<RotateCcw size={14} />}
          onClick={() => setReplayKey((k) => k + 1)}
        >
          다시 재생
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="type-metadata mb-2 text-text-muted">Normal</p>
          <motion.div
            key={`normal-${replayKey}`}
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: durations.normal, ease: easings.enter }}
          >
            <Card padding="sm">
              <CardTitle className="text-sm">일반 모션</CardTitle>
              <CardContent className="type-caption">
                opacity + translateY(16px), duration-normal.
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <div>
          <p className="type-metadata mb-2 text-text-muted">
            {simulateReduced ? "Reduced (시뮬레이션 켜짐)" : "Reduced — 스위치를 켜보세요"}
          </p>
          <motion.div
            key={`reduced-${replayKey}`}
            variants={simulateReduced ? reducedMotionVariants : slideUpVariants}
            initial="hidden"
            animate="visible"
            transition={{
              duration: simulateReduced ? durations.instant : durations.normal,
              ease: easings.standard,
            }}
          >
            <Card padding="sm">
              <CardTitle className="text-sm">reduced-motion 모션</CardTitle>
              <CardContent className="type-caption">
                {simulateReduced
                  ? "이동 없이 opacity만, duration-instant로 거의 즉시 표시."
                  : "실제로는 이동 없이 즉시 표시됩니다."}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </SubSection>
  );
}
