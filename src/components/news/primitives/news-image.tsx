"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";
import type { NewsImageOverlay, NewsImageProps, NewsImageRatio } from "../news.types";

const RATIO_CLASSES: Record<NewsImageRatio, string> = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "3:2": "aspect-[3/2]",
  "1:1": "aspect-square",
  portrait: "aspect-[3/4]",
};

const OVERLAY_CLASSES: Record<NewsImageOverlay, string> = {
  none: "",
  subtle: "bg-gradient-image-readability opacity-60",
  strong: "bg-gradient-image-readability",
};

const DEFAULT_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

/** 실제 기사 사진이 아니라 카테고리 그라데이션 placeholder를 쓰고 있는지 */
export function isPlaceholderThumbnail(url: string): boolean {
  return url.startsWith("/placeholders/");
}

/**
 * 실제 사진을 못 구해 그라데이션 placeholder만 남았을 때, 빈 이미지 영역
 * 대신 기사 제목을 오버레이해서 보여준다. 아래(카드 본문)에 이미 접근성
 * 링크로서의 제목이 있으므로 여기서는 장식용 텍스트로만 취급한다.
 */
export function PlaceholderTitleOverlay({ title }: { title: string }) {
  return (
    <div
      aria-hidden
      className="bg-gradient-image-readability pointer-events-none absolute inset-0 flex items-end p-3"
    >
      <p className="type-card-title line-clamp-3 text-white">{title}</p>
    </div>
  );
}

/**
 * 뉴스 카드 전반에서 재사용하는 이미지 primitive (TASK-007 6.1).
 *
 * - `next/image` `fill` 기반, 고정 종횡비 wrapper로 layout shift를 방지한다.
 * - `src`가 없으면 깨진 이미지 아이콘 대신 디자인 시스템 톤의 fallback surface를
 *   보여준다.
 * - `enableZoom`은 가장 가까운 `group` 조상(카드 컨테이너)의 hover/focus에
 *   반응한다 — 이 컴포넌트 자체는 hover 상태를 갖지 않는다 (터치 기기에서
 *   hover에만 의존하지 않기 위함이기도 하다).
 */
export function NewsImage({
  src,
  alt,
  ratio = "16:9",
  priority = false,
  sizes = DEFAULT_SIZES,
  overlay = "none",
  enableZoom = false,
  blurDataURL,
  className,
  imgClassName,
  overlayContent,
}: NewsImageProps) {
  const [loadFailed, setLoadFailed] = useState(false);
  const showImage = Boolean(src) && !loadFailed;

  return (
    <div
      className={cn(
        "relative w-full shrink-0 overflow-hidden",
        RATIO_CLASSES[ratio],
        className,
      )}
    >
      {showImage ? (
        <Image
          src={src as string}
          alt={alt}
          fill
          unoptimized={(src as string).startsWith("http")}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          placeholder={blurDataURL ? "blur" : undefined}
          blurDataURL={blurDataURL}
          onError={() => setLoadFailed(true)}
          className={cn(
            "object-cover",
            enableZoom &&
              "transition-transform duration-[var(--duration-slow)] ease-[var(--ease-standard)] group-hover:scale-105 group-focus-within:scale-105",
            imgClassName,
          )}
        />
      ) : (
        <Surface
          level="elevated"
          radius="none"
          bordered={false}
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex items-center justify-center"
        >
          <ImageOff
            size={28}
            className="text-text-muted"
            aria-hidden
            strokeWidth={1.5}
          />
        </Surface>
      )}
      {overlay !== "none" && showImage && (
        <div
          aria-hidden
          className={cn("pointer-events-none absolute inset-0", OVERLAY_CLASSES[overlay])}
        />
      )}
      {overlayContent}
    </div>
  );
}
