"use client";

import { useCallback, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { MOCK_TRENDING_KEYWORDS } from "@/data/mock-trending-keywords";
import { Section, SubSection } from "@/components/ui-preview/section";
import { Button } from "@/components/ui/button";
import {
  BreakingCenter,
  KeywordPanel,
  LiveTimeline,
  RefreshStatus,
  TrendingHub,
  UpdateBanner,
  type ConnectionStatus,
} from "@/components/live";
import { ReducedMotionStatus } from "@/components/news-preview/reduced-motion-status";
import {
  liveBreakingCenterItems,
  liveTimelineEntries,
  liveTimelineExtraEntries,
  liveTrendingHubTabs,
} from "./live-preview-data";

const CHECKLIST = [
  "Breaking Center — BreakingNewsCard 재사용, 중요도 색상 구분, Live Badge, 업데이트 시각, 최신순 정렬, Skeleton/Empty/Error",
  "Live Timeline — 시간/제목/카테고리/상태 아이콘, 새 항목 추가 애니메이션, Reduced Motion 대응",
  "Trending Hub — 인기 Top10 / 많이 본 기사 / 많이 공유된 기사(UI만) / 급상승 기사 탭, RankedNewsList 재사용",
  "Keyword Panel — 상승/하락/신규/순위 변화, 색상만으로 표현하지 않음(아이콘 + 텍스트)",
  "Refresh Status — 마지막 갱신 시각, 자동 갱신 여부, 연결 상태, 수동 새로고침 버튼(UI만)",
  "Update Banner — 새로운 속보 N건 안내 + 새로고침 액션(mock)",
  "Auto Refresh — ON/OFF UI, onToggle/intervalMs만 노출(실제 polling 없음)",
  "반응형 — Desktop 2열(Breaking Center + Trending Hub), Tablet 1~2열, Mobile 세로 스택",
  "접근성 — aria-live=\"polite\" 영역, 키보드 탭 탐색(←/→/Home/End), focus-visible",
  "실제 뉴스 API·WebSocket·SSE·Polling·DB·로그인은 구현하지 않음 — 모든 데이터는 mock",
];

/**
 * TASK-008 실시간 속보 센터 / 트렌드 허브 개발용 미리보기 페이지.
 *
 * mock 데이터(`@/data/mock-news`, `@/data/mock-breaking-news`,
 * `@/data/mock-trending-keywords`)만 사용한다. 자동 새로고침/연결 상태/
 * 배너 카운트는 이 페이지가 로컬 state로만 시뮬레이션하며, 실제 API 호출은
 * 하지 않는다.
 */
export function LivePreviewContent() {
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connected");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState(() => new Date().toISOString());
  const [bannerCount, setBannerCount] = useState(3);
  const [timelineEntries, setTimelineEntries] = useState(liveTimelineEntries);
  const [nextExtraIndex, setNextExtraIndex] = useState(0);

  const handleManualRefresh = useCallback(() => {
    setIsRefreshing(true);
    window.setTimeout(() => {
      setLastRefreshedAt(new Date().toISOString());
      setIsRefreshing(false);
    }, 800);
  }, []);

  const handleBannerRefresh = useCallback(() => {
    setBannerCount(0);
    setLastRefreshedAt(new Date().toISOString());
  }, []);

  const handleAddTimelineEntry = useCallback(() => {
    const extra = liveTimelineExtraEntries[nextExtraIndex % liveTimelineExtraEntries.length];
    setTimelineEntries((prev) => [
      { ...extra, id: `${extra.id}-${Date.now()}`, timestamp: new Date().toISOString() },
      ...prev,
    ]);
    setNextExtraIndex((prev) => prev + 1);
  }, [nextExtraIndex]);

  return (
    <div className="container-dashboard py-12">
      <header className="mb-12">
        <p className="type-metadata mb-3 text-accent-primary">Development Only · TASK-008</p>
        <h1 className="type-page-title break-url">실시간 속보 센터 &amp; 트렌드 허브 미리보기</h1>
        <p className="type-body mt-4 max-w-prose text-text-secondary">
          속보 센터, 라이브 타임라인, 트렌드 허브, 실시간 검색어, 새로고침 상태 UI를 검수하는
          내부용 페이지다. 모든 데이터는 mock이며 실제 API·WebSocket·SSE·polling은 연결하지
          않는다.
        </p>
      </header>

      <Section
        id="status"
        title="1. 업데이트 상태 (Refresh Status / Update Banner / Auto Refresh)"
        description="실제 API 호출 없이 UI 상태만 시뮬레이션한다. 연결 상태 버튼은 개발 확인용이다."
      >
        <div className="flex flex-col gap-4">
          <UpdateBanner count={bannerCount} onRefresh={handleBannerRefresh} />
          <RefreshStatus
            lastRefreshedAt={lastRefreshedAt}
            autoRefreshEnabled={autoRefreshEnabled}
            onToggleAutoRefresh={setAutoRefreshEnabled}
            autoRefreshIntervalMs={30000}
            connectionStatus={connectionStatus}
            onManualRefresh={handleManualRefresh}
            isRefreshing={isRefreshing}
          />
          <div className="flex flex-wrap items-center gap-2">
            <p className="type-metadata text-text-muted">연결 상태 데모:</p>
            {(["connected", "connecting", "disconnected"] as const).map((status) => (
              <Button
                key={status}
                variant={status === connectionStatus ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setConnectionStatus(status)}
              >
                {status}
              </Button>
            ))}
            <Button variant="ghost" size="sm" onClick={() => setBannerCount((count) => count + 1)}>
              속보 배너 +1
            </Button>
          </div>
        </div>
      </Section>

      <Section
        id="breaking-trending"
        title="2. 속보 센터 + 트렌드 허브"
        description="Desktop에서는 2열, Tablet 이하에서는 1열로 쌓인다."
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <BreakingCenter items={liveBreakingCenterItems} />
          <TrendingHub tabs={liveTrendingHubTabs} />
        </div>
      </Section>

      <Section
        id="timeline-keyword"
        title="3. 라이브 타임라인 + 실시간 검색어"
        description="타임라인 상단 버튼으로 새 항목을 추가하면 등장 애니메이션(reduced-motion 대응)을 확인할 수 있다."
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Button variant="secondary" size="sm" className="self-start" onClick={handleAddTimelineEntry}>
              새 업데이트 추가 (데모)
            </Button>
            <LiveTimeline entries={timelineEntries} />
          </div>
          <KeywordPanel keywords={MOCK_TRENDING_KEYWORDS} updatedAt={lastRefreshedAt} />
        </div>
      </Section>

      <Section
        id="states"
        title="4. 로딩 / 빈 상태 / 오류"
        description="각 컴포넌트에 isLoading/error/빈 배열을 전달했을 때의 상태를 확인한다."
      >
        <SubSection title="Loading">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BreakingCenter items={[]} isLoading />
            <TrendingHub tabs={liveTrendingHubTabs} isLoading />
            <LiveTimeline entries={[]} isLoading />
            <KeywordPanel keywords={[]} isLoading />
          </div>
        </SubSection>

        <SubSection title="Empty">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BreakingCenter items={[]} />
            <TrendingHub tabs={[{ id: "popular", label: "인기 뉴스 Top10", items: [] }]} />
            <LiveTimeline entries={[]} />
            <KeywordPanel keywords={[]} />
          </div>
        </SubSection>

        <SubSection title="Error">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BreakingCenter items={[]} error="속보를 불러오지 못했습니다." onRetry={() => {}} />
            <TrendingHub
              tabs={liveTrendingHubTabs}
              error="트렌드 정보를 불러오지 못했습니다."
              onRetry={() => {}}
            />
            <LiveTimeline entries={[]} error="업데이트 내역을 불러오지 못했습니다." onRetry={() => {}} />
            <KeywordPanel keywords={[]} error="실시간 검색어를 불러오지 못했습니다." onRetry={() => {}} />
          </div>
        </SubSection>
      </Section>

      <Section
        id="reduced-motion"
        title="5. Reduced Motion"
        description="OS/브라우저에서 '동작 줄이기'를 켜면 타임라인의 새 항목 layout 애니메이션과 배너 등장 모션이 즉시 전환으로 축소된다."
      >
        <ReducedMotionStatus />
      </Section>

      <Section id="checklist" title="6. 완료 조건 체크리스트">
        <div className="rounded-md border border-border-default bg-surface p-6">
          <ul className="flex flex-col gap-3">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-text-secondary">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" aria-hidden />
                <span className="type-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}
