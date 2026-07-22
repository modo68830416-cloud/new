"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { getButtonClassNames } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
}

interface ShareTarget {
  id: string;
  label: string;
  glyph: string;
  href: string;
}

/**
 * 공유 버튼 UI (TASK-009) — Facebook / X / LinkedIn / 링크 복사.
 *
 * Facebook·X·LinkedIn은 각 서비스의 공식 공유 인텐트 URL로 연결되는
 * 일반 링크(`target="_blank"`)이며 별도 JS 없이도 동작한다. 이 저장소의
 * lucide-react 버전에는 브랜드 로고 아이콘이 포함돼 있지 않아, 기존
 * `NewsSourceLine`의 이니셜 아바타 패턴과 동일하게 글자 기반 배지로
 * 대체한다. 링크 복사만 `navigator.clipboard`를 사용하는 최소한의
 * 클라이언트 동작이다 — 실패해도 페이지 동작에는 영향이 없다.
 */
export function ShareButtons({ title, url, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const targets: ShareTarget[] = [
    {
      id: "facebook",
      label: "Facebook에 공유",
      glyph: "f",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      id: "x",
      label: "X(트위터)에 공유",
      glyph: "X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      id: "linkedin",
      label: "LinkedIn에 공유",
      glyph: "in",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
      return;
    }
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div role="group" aria-label="공유하기" className={cn("flex flex-wrap items-center gap-2", className)}>
      {targets.map((target) => (
        <a
          key={target.id}
          href={target.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={target.label}
          title={target.label}
          className={cn(
            getButtonClassNames({ variant: "secondary", size: "sm" }),
            "size-9 rounded-full px-0",
          )}
        >
          <span aria-hidden className="type-caption font-bold">
            {target.glyph}
          </span>
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopyLink}
        aria-label={copied ? "링크가 복사되었습니다" : "링크 복사"}
        title={copied ? "복사됨" : "링크 복사"}
        className={cn(getButtonClassNames({ variant: copied ? "primary" : "secondary", size: "sm" }))}
      >
        {copied ? <Check size={16} aria-hidden /> : <Link2 size={16} aria-hidden />}
        {copied ? "복사됨" : "링크 복사"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "링크가 클립보드에 복사되었습니다" : ""}
      </span>
    </div>
  );
}
