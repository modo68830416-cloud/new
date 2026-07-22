import { getArticleBySlug } from "@/data/mock-news";
import type { BreakingNewsItem } from "@/types/news";

const BASE_TIMESTAMP = new Date("2026-07-22T09:00:00+09:00").getTime();

function minutesAgo(minutes: number): string {
  return new Date(BASE_TIMESTAMP - minutes * 60 * 1000).toISOString();
}

export const MOCK_BREAKING_NEWS: BreakingNewsItem[] = [
  {
    id: "breaking-001",
    articleId: getArticleBySlug("breaking-midnight-blackout")?.id,
    title: "한밤중 대형 정전, 수도권 일부 지역 강타",
    timestamp: minutesAgo(12),
    level: "critical",
    isActive: true,
  },
  {
    id: "breaking-002",
    articleId: getArticleBySlug("breaking-emergency-briefing")?.id,
    title: "긴급 회견 예고, 관계자 오늘 오후 입장 발표",
    timestamp: minutesAgo(90),
    level: "urgent",
    isActive: true,
  },
  {
    id: "breaking-003",
    articleId: getArticleBySlug("breaking-heavy-rain-warning")?.id,
    title: "폭우주의보 확대, 하천 수위 급상승",
    timestamp: minutesAgo(180),
    level: "urgent",
    isActive: true,
  },
  {
    id: "breaking-004",
    title: "가상의 열차 지연 발생, 일부 노선 서행 운행",
    timestamp: minutesAgo(45),
    level: "normal",
    isActive: true,
  },
  {
    id: "breaking-005",
    title: "가상의 증시 개장 직후 변동성 확대",
    timestamp: minutesAgo(240),
    level: "normal",
    isActive: true,
  },
  {
    id: "breaking-006",
    title: "가상의 대형 화재 초기 진화 완료",
    timestamp: minutesAgo(600),
    level: "critical",
    isActive: false,
  },
];
