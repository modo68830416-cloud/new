export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export interface SiteConfig {
  siteName: string;
  siteShortName: string;
  siteDescription: string;
  siteUrl: string;
  defaultLocale: string;
  defaultTheme: "light" | "dark" | "system";
  defaultOgImage: string;
  contactEmail: string;
  socialLinks: SocialLink[];
}

export const siteConfig: SiteConfig = {
  siteName: "NOVA NEWS",
  siteShortName: "NOVA",
  siteDescription:
    "실시간 속보와 국내외 주요 뉴스를 빠르게 전달하는 종합 뉴스 플랫폼",
  siteUrl: "https://example.com",
  defaultLocale: "ko-KR",
  defaultTheme: "system",
  defaultOgImage: "/images/og-default.png",
  contactEmail: "contact@example.com",
  socialLinks: [],
};
