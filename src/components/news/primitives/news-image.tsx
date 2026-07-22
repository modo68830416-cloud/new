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
  return (
    <div
      className={cn(
        "relative w-full shrink-0 overflow-hidden",
        RATIO_CLASSES[ratio],
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          placeholder={blurDataURL ? "blur" : undefined}
          blurDataURL={blurDataURL}
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
      {overlay !== "none" && src && (
        <div
          aria-hidden
          className={cn("pointer-events-none absolute inset-0", OVERLAY_CLASSES[overlay])}
        />
      )}
      {overlayContent}
    </div>
  );
}
