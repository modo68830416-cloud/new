"use client";

import { Loader2, RotateCw, Wifi, WifiOff } from "lucide-react";
import { Surface } from "@/components/ui/surface";
import { Badge } from "@/components/ui/badge";
import type { BadgeTone } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { TimeAgo } from "@/components/ui/time-ago";
import { cn } from "@/lib/utils";
import { AutoRefreshToggle } from "../auto-refresh/auto-refresh-toggle";
import type { ConnectionStatus, RefreshStatusProps } from "./refresh-status.types";

const CONNECTION_CONFIG: Record<
  ConnectionStatus,
  { label: string; tone: BadgeTone; icon: typeof Wifi }
> = {
  connected: { label: "연결됨", tone: "success", icon: Wifi },
  connecting: { label: "연결 중", tone: "warning", icon: Loader2 },
  disconnected: { label: "연결 끊김", tone: "danger", icon: WifiOff },
};

/**
 * 뉴스 업데이트 상태 표시줄 (task-008.md "Refresh Status").
 *
 * UI만 구현한다 — 실제 API 호출/polling/WebSocket 연결은 하지 않는다.
 * 마지막 갱신 시각과 연결 상태는 `aria-live="polite"` 영역으로 감싸
 * 값이 바뀔 때 스크린 리더에도 전달되도록 한다.
 */
export function RefreshStatus({
  lastRefreshedAt,
  autoRefreshEnabled,
  onToggleAutoRefresh,
  autoRefreshIntervalMs,
  connectionStatus = "connected",
  onManualRefresh,
  isRefreshing = false,
  className,
}: RefreshStatusProps) {
  const connection = CONNECTION_CONFIG[connectionStatus];
  const ConnectionIcon = connection.icon;

  return (
    <Surface
      radius="md"
      bordered
      className={cn("flex flex-wrap items-center justify-between gap-4 p-4", className)}
    >
      <div className="flex flex-wrap items-center gap-3" aria-live="polite" aria-atomic="true">
        <Badge
          tone={connection.tone}
          variant="soft"
          icon={
            <ConnectionIcon
              size={12}
              aria-hidden
              className={connectionStatus === "connecting" ? "animate-spin" : undefined}
            />
          }
        >
          {connection.label}
        </Badge>
        <p className="type-metadata flex items-center gap-1.5 text-text-muted">
          마지막 갱신
          {lastRefreshedAt ? <TimeAgo date={lastRefreshedAt} /> : <span>정보 없음</span>}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <AutoRefreshToggle
          enabled={autoRefreshEnabled}
          onToggle={onToggleAutoRefresh}
          intervalMs={autoRefreshIntervalMs}
        />
        <IconButton
          label="수동 새로고침"
          icon={
            <RotateCw size={16} aria-hidden className={isRefreshing ? "animate-spin" : undefined} />
          }
          onClick={onManualRefresh}
          isLoading={isRefreshing}
          variant="secondary"
          size="sm"
        />
      </div>
    </Surface>
  );
}
