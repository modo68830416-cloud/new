export interface DeviceFrameProps {
  label: string;
  width: number;
  height: number;
  /** 화면에 표시할 최대 폭(px). 실제 iframe은 항상 `width`로 렌더링되어 진짜 반응형 CSS가 적용된다 */
  maxWidth?: number;
}

/**
 * 실제 `/` 페이지(= LayoutProvider가 적용된 페이지)를 지정한 디바이스
 * 픽셀 폭의 iframe으로 그대로 로드해 축소 표시한다.
 *
 * 컴포넌트를 복제/흉내 내지 않고 진짜 브라우저 뷰포트 폭으로 렌더링하기
 * 때문에 Tailwind의 반응형(`md:`, `lg:`) 분기가 목업이 아니라 실제로
 * 동작한다 — Header 축소/숨김, Desktop Navigation ↔ 모바일 Drawer 전환을
 * 이 프레임 안에서 직접 스크롤/클릭으로 확인할 수 있다.
 */
export function DeviceFrame({ label, width, height, maxWidth = 420 }: DeviceFrameProps) {
  const scale = Math.min(1, maxWidth / width);
  const displayWidth = Math.round(width * scale);
  const displayHeight = Math.round(height * scale);

  return (
    <figure className="flex flex-col items-center gap-3">
      <div
        className="overflow-hidden rounded-lg border border-border-default bg-surface shadow-md"
        style={{ width: displayWidth, height: displayHeight }}
      >
        <iframe
          src="/"
          title={`${label} 미리보기`}
          style={{
            width,
            height,
            border: 0,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        />
      </div>
      <figcaption className="type-caption text-text-muted">
        {label} · {width}×{height}px
      </figcaption>
    </figure>
  );
}
