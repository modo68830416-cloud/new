import type { Metadata } from "next";
import { Surface } from "@/components/ui/surface";
import { LiveBadge } from "@/components/ui/live-badge";
import { siteConfig } from "@/config/site";

const YTN_CHANNEL_ID = "UChlgI3UHCOnwUGzWzbJ3H5w";

export const metadata: Metadata = {
  title: "실시간 생중계",
  description: `${siteConfig.siteName}에서 YTN의 24시간 뉴스 생중계를 시청합니다.`,
};

/**
 * 헤더 LIVE 뱃지의 목적지 (`/live`).
 *
 * 자체 방송 인프라가 없으므로 직접 송출하는 대신, YTN 공식 유튜브 채널의
 * 라이브 스트림을 유튜브 공식 임베드 플레이어로 그대로 보여준다.
 * `embed/live_stream?channel=`은 유튜브가 공식 제공하는 URL 형식으로, 그
 * 채널에서 현재 진행 중인 라이브를 자동으로 찾아 재생한다 — 특정
 * videoId를 하드코딩하지 않아도 방송이 바뀌어도 계속 최신 라이브를
 * 가리킨다.
 */
export default function LivePage() {
  return (
    <div className="container-dashboard flex flex-col gap-6 py-8 lg:py-12">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <LiveBadge />
          <h1 className="type-page-title">실시간 생중계</h1>
        </div>
        <p className="type-body max-w-prose text-text-secondary">
          {siteConfig.siteName}은 자체 생중계 채널이 없어, YTN 공식 유튜브
          채널의 24시간 뉴스 생중계를 그대로 연결해 보여드립니다.
        </p>
      </header>

      <Surface radius="xl" shadow="sm" bordered className="overflow-hidden">
        <div className="relative aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/live_stream?channel=${YTN_CHANNEL_ID}&autoplay=0`}
            title="YTN 실시간 뉴스 생중계"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </Surface>

      <p className="type-caption text-text-muted">
        영상 제공:{" "}
        <a
          href="https://www.youtube.com/@ytnnews24"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-text-secondary"
        >
          YTN 공식 유튜브
        </a>
        {" "}· 유튜브 공식 임베드 플레이어를 사용합니다.
      </p>
    </div>
  );
}
