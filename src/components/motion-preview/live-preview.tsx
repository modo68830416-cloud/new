"use client";

import { useState } from "react";
import { BreakingBadge } from "@/components/ui/breaking-badge";
import { Switch } from "@/components/ui/switch";
import { LiveDot } from "@/components/motion/LiveDot";
import { BreakingPulse } from "@/components/motion/BreakingPulse";
import { SubSection } from "@/components/ui-preview/section";

export function LivePreview() {
  const [pulseActive, setPulseActive] = useState(true);

  return (
    <>
      <SubSection title="Live Dot">
        <div className="flex items-center gap-3 rounded-md border border-border-default bg-surface px-4 py-3">
          <LiveDot />
          <span className="type-label text-live">실시간 진행 중</span>
        </div>
      </SubSection>

      <SubSection title="Breaking Pulse / Critical Alert">
        <div className="mb-4">
          <Switch
            label="pulse 켜기"
            checked={pulseActive}
            onCheckedChange={setPulseActive}
          />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <BreakingPulse active={pulseActive}>
            <BreakingBadge level="critical" />
          </BreakingPulse>
          <BreakingPulse active={pulseActive} className="rounded-md">
            <div className="rounded-md border border-critical bg-critical/10 px-4 py-3">
              <p className="type-label text-critical">긴급 속보</p>
              <p className="type-caption mt-1">
                가장 중요한 단계에만 제한적으로 사용하는 pulse.
              </p>
            </div>
          </BreakingPulse>
        </div>
      </SubSection>
    </>
  );
}
