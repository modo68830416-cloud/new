"use client";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { AutoRefreshToggleProps } from "./auto-refresh.types";

/**
 * 자동 새로고침 ON/OFF UI (task-008.md "Auto Refresh").
 *
 * 실제 polling/WebSocket/SSE는 구현하지 않는다. `onToggle`/`intervalMs`
 * props만 노출해 두어 이후 Task에서 실제 polling 훅으로 그대로 교체할 수
 * 있도록 구조만 준비한다. 상태는 색상(스위치 위치)뿐 아니라 텍스트로도
 * 항상 함께 표시한다.
 */
export function AutoRefreshToggle({
  enabled,
  onToggle,
  intervalMs,
  label = "자동 새로고침",
  disabled = false,
  className,
}: AutoRefreshToggleProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Switch
        checked={enabled}
        onCheckedChange={onToggle}
        disabled={disabled}
        label={`${label} · ${enabled ? "켜짐" : "꺼짐"}`}
      />
      {typeof intervalMs === "number" && (
        <p className="type-metadata pl-0.5 text-text-muted normal-case">
          {enabled
            ? `${Math.round(intervalMs / 1000)}초마다 자동 갱신 (연결 예정)`
            : "자동 갱신이 꺼져 있습니다"}
        </p>
      )}
    </div>
  );
}
