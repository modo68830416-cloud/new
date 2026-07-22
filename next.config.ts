import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // TASK-006: Hero/News 썸네일이 로컬 SVG 플레이스홀더(public/placeholders/*.svg)라
    // next/image로 최적화하려면 SVG를 허용해야 한다. 외부 사용자 업로드가 아닌
    // 신뢰된 정적 자산이므로 CSP로 스크립트 실행을 차단해 안전하게 허용한다.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
