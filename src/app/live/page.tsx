import type { Metadata } from "next";
import { Surface } from "@/components/ui/surface";
import { LiveBadge } from "@/components/ui/live-badge";
import { siteConfig } from "@/config/site";

const YTN_CHANNEL_URL = "https://www.youtube.com/@ytnnews24";
const YTN_CHANNEL_ID = "UChlgI3UHCOnwUGzWzbJ3H5w";
const VIDEO_ID_PATTERN = /"videoId":"([a-zA-Z0-9_-]{11})"/;

export const metadata: Metadata = {
  title: "실시간 생중계",
  description: `${siteConfig.siteName}에서 YTN의 24시간 뉴스 생중계를 시청합니다.`,
};

/**
 * YTN 채널의 "현재 방송 중인" 영상 ID를 알아낸다.
 *
 * `embed/live_stream?channel=`(videoId 없이 채널만 지정하는 공식 임베드
 * URL)로 시도해봤지만 이 채널에서는 재생이 거부됐다 — 유튜브의
 * "채널 단위 라이브 임베드"는 채널이 별도로 켜둔 기능(구독자 1,000명
 * 이상 + "Embed Live Streams" 옵션)이 있어야만 동작하는데, YTN이 이걸
 * 켜두지 않은 것으로 보인다. 반면 실제 videoId로 직접 임베드하는 건
 * oEmbed로 재생 가능함을 확인했으므로, `/live` 리다이렉트 페이지에서
 * 현재 videoId를 읽어와 그 ID로 직접 임베드한다.
 */
async function resolveLiveVideoId(): Promise<string | null> {
  try {
    const response = await fetch(`${YTN_CHANNEL_URL}/live`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;

    const html = await response.text();
    return html.match(VIDEO_ID_PATTERN)?.[1] ?? null;
  } catch {
    return null;
  }
}

export default async function LivePage() {
  const liveVideoId = await resolveLiveVideoId();
  const embedSrc = liveVideoId
    ? `https://www.youtube.com/embed/${liveVideoId}?autoplay=0`
    : `https://www.youtube.com/embed/live_stream?channel=${YTN_CHANNEL_ID}&autoplay=0`;

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
            src={embedSrc}
            title="YTN 실시간 뉴스 생중계"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            // referrerPolicy 없이는 유튜브가 리퍼러를 못 받아 "Error 153:
            // Video player configuration error"(embedder.identity.missing.referrer)로
            // 재생을 거부한다 — 명시적으로 지정해야 한다.
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </Surface>

      <p className="type-caption text-text-muted">
        영상 제공:{" "}
        <a
          href={`${YTN_CHANNEL_URL}/live`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-text-secondary"
        >
          YTN 공식 유튜브
        </a>
        {" "}· 화면이 재생되지 않으면 위 링크로 유튜브에서 직접 시청할 수
        있습니다.
      </p>
    </div>
  );
}
