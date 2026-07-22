import Link from "next/link";
import { Mail } from "lucide-react";
import { PRIMARY_NAVIGATION } from "@/constants/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface FooterProps {
  className?: string;
}

/**
 * 전역 Footer. 사이트명/설명, 카테고리 바로가기, 이용약관·개인정보처리방침
 * (TASK-014에서 `/terms`, `/privacy`로 연결), 문의 이메일, Copyright를
 * 포함한다.
 */
export function Footer({ className }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("border-t border-border-subtle bg-background-secondary", className)}>
      <div className="container-news grid gap-10 py-12 md:grid-cols-[1.2fr_2fr]">
        <div>
          <Link href="/" className="type-card-title inline-flex items-center gap-2 text-text-primary">
            <span className="bg-gradient-brand bg-clip-text font-extrabold text-transparent">
              {siteConfig.siteShortName}
            </span>
            <span className="text-text-secondary">{siteConfig.siteName}</span>
          </Link>
          <p className="type-caption mt-3 max-w-sm text-text-muted">{siteConfig.siteDescription}</p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="type-caption mt-4 inline-flex items-center gap-2 text-text-secondary hover:text-text-primary"
          >
            <Mail size={14} aria-hidden />
            {siteConfig.contactEmail}
          </a>
        </div>

        <nav aria-label="카테고리 바로가기">
          <h2 className="type-label text-text-muted">카테고리</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 xs:grid-cols-3 lg:grid-cols-4">
            {PRIMARY_NAVIGATION.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="type-caption text-text-secondary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border-subtle">
        <div className="container-news flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-caption text-text-muted">
            &copy; {year} {siteConfig.siteName}. All rights reserved.
          </p>
          <ul className="flex items-center gap-4">
            <li>
              <Link
                href="/terms"
                className="type-caption text-text-muted hover:text-text-primary"
              >
                이용약관
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="type-caption text-text-muted hover:text-text-primary"
              >
                개인정보처리방침
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
