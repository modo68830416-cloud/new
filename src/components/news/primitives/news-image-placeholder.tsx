/** 실제 기사 사진이 아니라 카테고리 그라데이션 placeholder를 쓰고 있는지 */
export function isPlaceholderThumbnail(url: string): boolean {
  return url.startsWith("/placeholders/");
}

/**
 * 실제 사진을 못 구해 그라데이션 placeholder만 남았을 때, 빈 이미지 영역
 * 대신 기사 제목을 오버레이해서 보여준다. 아래(카드 본문)에 이미 접근성
 * 링크로서의 제목이 있으므로 여기서는 장식용 텍스트로만 취급한다.
 *
 * 서버 컴포넌트에서도 그대로 렌더링할 수 있도록 `NewsImage`(클라이언트
 * 컴포넌트)와 분리된 별도 파일에 둔다.
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
