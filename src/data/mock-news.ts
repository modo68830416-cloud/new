import { getCategoryBySlug } from "@/constants/categories";
import type {
  Author,
  MediaAsset,
  NewsArticle,
  NewsCategory,
  NewsSource,
} from "@/types/news";

const SOURCES: NewsSource[] = [
  { id: "src-globaltoday", name: "글로벌투데이" },
  { id: "src-hanbit", name: "한빛일보" },
  { id: "src-central", name: "센트럴뉴스" },
  { id: "src-weeklyfocus", name: "위클리포커스" },
  { id: "src-korearepo", name: "코리아리포트" },
  { id: "src-lighthouse", name: "라이트하우스뉴스" },
];

const AUTHORS: Author[] = [
  {
    id: "author-kdy",
    name: "김도윤",
    role: "기자",
    bio: "정치·경제 현안을 두루 취재하며 현장 중심의 기사를 씁니다.",
  },
  {
    id: "author-lsj",
    name: "이서준",
    role: "기자",
    bio: "산업·과학 분야를 담당하며 데이터에 기반한 분석 기사를 씁니다.",
  },
  {
    id: "author-pha",
    name: "박하은",
    role: "기자",
    bio: "사회·생활 이슈를 취재하며 독자의 눈높이에 맞춘 기사를 씁니다.",
  },
  {
    id: "author-cjw",
    name: "최지우",
    role: "기자",
    bio: "국제·문화 소식을 전하며 균형 잡힌 시각을 지향합니다.",
  },
  {
    id: "author-jmj",
    name: "정민재",
    role: "기자",
    bio: "사회부에서 정책과 제도 이슈를 심층 취재합니다.",
  },
  {
    id: "author-hsy",
    name: "한소율",
    role: "기자",
    bio: "스포츠·엔터테인먼트 현장을 발로 뛰며 취재합니다.",
  },
];

/**
 * 카테고리별 그라데이션 메쉬 자리표시자(`public/placeholders/category-*.svg`).
 * 실제 기사 이미지가 없는 대신, 카테고리 배지와 같은 브랜드 색상(TASK-002
 * `--color-category-*`)을 사용한 디자인된 배경으로 대체한다 — 이전에는
 * 카테고리와 무관하게 6종 단색 그라데이션을 순환시켰다.
 */
function thumbnailFor(index: number, categorySlug: string, alt: string): MediaAsset {
  return {
    id: `thumb-${categorySlug}-${index}`,
    type: "image",
    url: `/placeholders/category-${categorySlug}.svg`,
    alt,
    width: 800,
    height: 450,
  };
}

const BASE_TIMESTAMP = new Date("2026-07-22T09:00:00+09:00").getTime();

function publishedAtHoursAgo(hours: number): string {
  return new Date(BASE_TIMESTAMP - hours * 60 * 60 * 1000).toISOString();
}

interface ArticleSpec {
  slug: string;
  categorySlug: string;
  title: string;
  subtitle?: string;
  summary: string;
  content: string;
  sourceId: string;
  authorId: string;
  hoursAgo: number;
  isBreaking?: boolean;
  isFeatured?: boolean;
  isExclusive?: boolean;
  viewCount: number;
  commentCount: number;
  shareCount?: number;
  tags: string[];
}

const ARTICLE_SPECS: ArticleSpec[] = [
  // 속보
  {
    slug: "breaking-midnight-blackout",
    categorySlug: "breaking",
    title: "한밤중 대형 정전, 수도권 일부 지역 강타",
    subtitle: "복구 작업 진행 중, 원인 조사 착수",
    summary:
      "가상의 수도권 일부 지역에서 자정 무렵 대규모 정전이 발생해 복구 작업이 진행되고 있다.",
    content:
      "가상의 수도권 일부 지역에서 자정 무렵 대규모 정전이 발생했다. 관계 당국은 새벽부터 복구 작업에 나섰으며 정확한 원인은 조사 중이라고 밝혔다. 주민들은 안내 문자를 통해 상황을 전달받고 있으며, 당국은 이른 시일 내 정상화를 목표로 하고 있다고 설명했다.",
    sourceId: "src-central",
    authorId: "author-kdy",
    hoursAgo: 0.2,
    isBreaking: true,
    isFeatured: true,
    viewCount: 15234,
    commentCount: 412,
    shareCount: 231,
    tags: ["정전", "속보", "수도권"],
  },
  {
    slug: "breaking-emergency-briefing",
    categorySlug: "breaking",
    title: "긴급 회견 예고, 관계자 오늘 오후 입장 발표",
    summary:
      "가상의 정부 관계자가 오늘 오후 긴급 기자회견을 열어 최근 현안에 대한 입장을 밝힐 예정이다.",
    content:
      "가상의 정부 관계자가 오늘 오후 긴급 기자회견을 예고했다. 회견에서는 최근 논란이 된 현안에 대한 공식 입장이 나올 것으로 보인다. 취재진은 회견 시작 전부터 현장에 모여 발표 내용을 기다리고 있다.",
    sourceId: "src-hanbit",
    authorId: "author-lsj",
    hoursAgo: 1.5,
    isBreaking: true,
    viewCount: 9871,
    commentCount: 203,
    tags: ["긴급회견", "속보"],
  },
  {
    slug: "breaking-heavy-rain-warning",
    categorySlug: "breaking",
    title: "폭우주의보 확대, 하천 수위 급상승",
    summary:
      "가상의 중부 지방에 폭우주의보가 확대 발령되며 일부 하천의 수위가 빠르게 오르고 있다.",
    content:
      "가상의 중부 지방 곳곳에 폭우주의보가 확대 발령됐다. 기상 당국은 오늘 밤까지 강한 비가 이어질 것으로 예상한다고 밝혔다. 지자체는 하천 인근 주민들에게 대피 안내를 전달하며 상황을 주시하고 있다.",
    sourceId: "src-weeklyfocus",
    authorId: "author-pha",
    hoursAgo: 3,
    isBreaking: true,
    viewCount: 7654,
    commentCount: 121,
    tags: ["폭우", "속보", "날씨"],
  },
  // 정치
  {
    slug: "politics-budget-dispute",
    categorySlug: "politics",
    title: "가온당, 내년도 예산안 두고 이견 표출",
    summary:
      "가상 정당 가온당이 내년도 예산안 편성 방향을 두고 내부 이견을 드러냈다.",
    content:
      "가상 정당 가온당 내부에서 내년도 예산안 편성 방향을 두고 이견이 표출됐다. 일부 의원은 복지 예산 확대를 주장한 반면 다른 의원들은 재정 건전성을 우선해야 한다고 맞섰다. 당 지도부는 이번 주 내 의견을 조율하겠다고 밝혔다.",
    sourceId: "src-globaltoday",
    authorId: "author-cjw",
    hoursAgo: 5,
    isFeatured: true,
    viewCount: 5320,
    commentCount: 98,
    tags: ["정치", "예산안", "가온당"],
  },
  {
    slug: "politics-new-leader-100days",
    categorySlug: "politics",
    title: "새빛당 대표 취임 100일 기자회견 개최",
    summary:
      "가상 정당 새빛당 대표가 취임 100일을 맞아 그간의 성과와 향후 계획을 밝혔다.",
    content:
      "가상 정당 새빛당 대표가 취임 100일 기자회견을 열고 그간의 성과를 설명했다. 대표는 당 지지율 회복을 최우선 과제로 꼽으며 향후 100일간의 계획을 제시했다. 당 안팎에서는 다양한 평가가 엇갈리고 있다.",
    sourceId: "src-korearepo",
    authorId: "author-jmj",
    hoursAgo: 9,
    viewCount: 4210,
    commentCount: 76,
    tags: ["정치", "새빛당"],
  },
  {
    slug: "politics-election-rule-change",
    categorySlug: "politics",
    title: "지방선거 룰 개편 논의 급물살",
    summary:
      "가상의 지방선거 제도 개편 논의가 여야 협의체를 중심으로 속도를 내고 있다.",
    content:
      "가상의 지방선거 제도 개편을 둘러싼 여야 논의가 급물살을 타고 있다. 협의체는 이번 달 안에 초안을 마련해 공청회를 거칠 계획이라고 밝혔다. 시민단체는 논의 과정의 투명한 공개를 요구하고 나섰다.",
    sourceId: "src-lighthouse",
    authorId: "author-hsy",
    hoursAgo: 14,
    viewCount: 3110,
    commentCount: 54,
    tags: ["정치", "선거제도"],
  },
  // 경제
  {
    slug: "economy-rate-freeze-outlook",
    categorySlug: "economy",
    title: "기준금리 동결 전망 우세, 시장은 촉각",
    summary:
      "가상의 통화당국이 이번 회의에서 기준금리를 동결할 것이라는 전망이 우세하다.",
    content:
      "가상의 통화당국 회의를 앞두고 기준금리 동결 전망이 우세하게 나오고 있다. 시장 참여자들은 물가와 성장률 지표를 종합적으로 살펴보고 있다고 전했다. 전문가들은 하반기 통화정책 방향에 더 주목해야 한다고 조언했다.",
    sourceId: "src-globaltoday",
    authorId: "author-kdy",
    hoursAgo: 2,
    isFeatured: true,
    viewCount: 8890,
    commentCount: 143,
    tags: ["경제", "금리", "통화정책"],
  },
  {
    slug: "economy-export-improve",
    categorySlug: "economy",
    title: "수출 지표 석 달 연속 개선세",
    summary:
      "가상의 월간 수출 지표가 석 달 연속 개선되며 경기 회복 기대감이 커지고 있다.",
    content:
      "가상의 월간 수출 지표가 석 달 연속 개선세를 보였다. 관련 부처는 주요 품목의 해외 수요 회복이 긍정적으로 작용했다고 설명했다. 다만 대외 변수에 따른 불확실성은 여전하다는 평가도 나온다.",
    sourceId: "src-central",
    authorId: "author-lsj",
    hoursAgo: 11,
    viewCount: 4520,
    commentCount: 66,
    tags: ["경제", "수출"],
  },
  {
    slug: "economy-household-debt-slowdown",
    categorySlug: "economy",
    title: "가계부채 증가폭 둔화, 당국 안도",
    summary: "가상의 가계부채 증가폭이 둔화되며 금융당국이 한숨을 돌렸다.",
    content:
      "가상의 가계부채 증가폭이 지난 분기 대비 둔화된 것으로 나타났다. 금융당국은 대출 규제 효과가 서서히 나타나고 있다고 평가했다. 전문가들은 추세를 좀 더 지켜봐야 한다는 신중한 입장을 보였다.",
    sourceId: "src-weeklyfocus",
    authorId: "author-pha",
    hoursAgo: 20,
    viewCount: 2980,
    commentCount: 41,
    tags: ["경제", "가계부채"],
  },
  // 사회
  {
    slug: "society-heatwave-warning",
    categorySlug: "society",
    title: "폭염 속 온열질환 주의보 확대",
    summary:
      "가상의 전국 곳곳에 폭염특보가 확대되며 온열질환 주의보가 함께 내려졌다.",
    content:
      "가상의 전국 곳곳에 폭염특보가 확대 발령됐다. 보건 당국은 온열질환 주의보를 함께 내리고 한낮 야외활동 자제를 당부했다. 지자체는 무더위 쉼터 운영 시간을 연장하기로 했다.",
    sourceId: "src-hanbit",
    authorId: "author-cjw",
    hoursAgo: 4,
    isFeatured: true,
    viewCount: 6210,
    commentCount: 88,
    tags: ["사회", "폭염", "건강"],
  },
  {
    slug: "society-transit-fare-hearing",
    categorySlug: "society",
    title: "대중교통 요금 조정안 공청회 열려",
    summary:
      "가상의 지자체가 대중교통 요금 조정안을 두고 시민 공청회를 개최했다.",
    content:
      "가상의 지자체가 대중교통 요금 조정안에 대한 공청회를 열었다. 참석 시민들은 요금 인상 폭과 시행 시기에 대해 다양한 의견을 제시했다. 지자체는 의견 수렴 결과를 반영해 최종안을 마련할 계획이다.",
    sourceId: "src-korearepo",
    authorId: "author-jmj",
    hoursAgo: 16,
    viewCount: 2410,
    commentCount: 59,
    tags: ["사회", "대중교통"],
  },
  {
    slug: "society-pet-registration-record",
    categorySlug: "society",
    title: "반려동물 등록제 참여율 역대 최고",
    summary: "가상의 반려동물 등록제 참여율이 올해 역대 최고치를 기록했다.",
    content:
      "가상의 반려동물 등록제 참여율이 올해 역대 최고치를 기록한 것으로 나타났다. 담당 기관은 홍보 강화와 등록 절차 간소화가 주효했다고 설명했다. 유기동물 감소 효과로도 이어질지 주목된다.",
    sourceId: "src-lighthouse",
    authorId: "author-hsy",
    hoursAgo: 27,
    viewCount: 1870,
    commentCount: 33,
    tags: ["사회", "반려동물"],
  },
  // 국제
  {
    slug: "world-asean-summit-cooperation",
    categorySlug: "world",
    title: "동남아 정상회의, 경제협력 방안 논의",
    summary:
      "가상의 동남아 지역 정상회의에서 역내 경제협력 강화 방안이 논의됐다.",
    content:
      "가상의 동남아 지역 정상회의가 열려 역내 경제협력 강화 방안이 논의됐다. 참석국 정상들은 공급망 안정과 디지털 전환 협력을 주요 의제로 다뤘다. 차기 회의는 내년 상반기에 열릴 예정이다.",
    sourceId: "src-globaltoday",
    authorId: "author-kdy",
    hoursAgo: 8,
    isFeatured: true,
    viewCount: 3980,
    commentCount: 52,
    tags: ["국제", "정상회의"],
  },
  {
    slug: "world-europe-energy-stability",
    categorySlug: "world",
    title: "유럽 에너지 수급 안정화 조치 발표",
    summary:
      "가상의 유럽 지역 기구가 에너지 수급 안정화를 위한 공동 조치를 발표했다.",
    content:
      "가상의 유럽 지역 기구가 에너지 수급 안정을 위한 공동 조치를 발표했다. 회원국들은 비축분 확대와 에너지원 다변화에 합의했다고 밝혔다. 관계자들은 겨울철 수급 불안 우려를 낮출 수 있을 것으로 기대했다.",
    sourceId: "src-central",
    authorId: "author-lsj",
    hoursAgo: 18,
    viewCount: 2650,
    commentCount: 37,
    tags: ["국제", "에너지"],
  },
  {
    slug: "world-transatlantic-route-expansion",
    categorySlug: "world",
    title: "북미 항공 노선 증편 합의",
    summary: "가상의 항공 당국 간 협의를 통해 북미 노선 증편에 합의했다.",
    content:
      "가상의 항공 당국들이 협의를 거쳐 북미 노선 증편에 합의했다고 발표했다. 이번 합의로 여행 수요 증가에 대응할 수 있을 것으로 전망된다. 관련 항공사들은 내년부터 순차적으로 노선을 늘릴 계획이다.",
    sourceId: "src-weeklyfocus",
    authorId: "author-pha",
    hoursAgo: 30,
    viewCount: 1540,
    commentCount: 22,
    tags: ["국제", "항공"],
  },
  // 산업
  {
    slug: "industry-battery-plant-groundbreaking",
    categorySlug: "industry",
    title: "그린파워, 차세대 배터리 공장 착공",
    summary:
      "가상 기업 그린파워가 차세대 배터리 생산을 위한 신규 공장 착공식을 열었다.",
    content:
      "가상 기업 그린파워가 차세대 배터리 생산을 위한 신규 공장 착공식을 진행했다. 회사 측은 완공 이후 생산능력이 크게 늘어날 것이라고 밝혔다. 지역 경제 활성화에도 기여할 것으로 기대를 모으고 있다.",
    sourceId: "src-hanbit",
    authorId: "author-cjw",
    hoursAgo: 6,
    isFeatured: true,
    viewCount: 4780,
    commentCount: 71,
    tags: ["산업", "배터리", "그린파워"],
  },
  {
    slug: "industry-semiconductor-new-line",
    categorySlug: "industry",
    title: "한울전자, 신규 반도체 라인 가동",
    summary: "가상 기업 한울전자가 신규 반도체 생산 라인 가동을 시작했다.",
    content:
      "가상 기업 한울전자가 신규 반도체 생산 라인 가동을 공식화했다. 회사는 이번 라인 증설로 공급 안정성이 높아질 것으로 기대한다고 밝혔다. 업계에서는 관련 수요 확대에 대응하기 위한 전략으로 분석했다.",
    sourceId: "src-korearepo",
    authorId: "author-jmj",
    hoursAgo: 22,
    viewCount: 3210,
    commentCount: 48,
    tags: ["산업", "반도체"],
  },
  {
    slug: "industry-shipbuilding-order-backlog",
    categorySlug: "industry",
    title: "조선업계 수주 잔량 3년 만에 최대",
    summary: "가상의 조선업계 수주 잔량이 3년 만에 최대치를 기록했다.",
    content:
      "가상의 조선업계 수주 잔량이 3년 만에 최대치를 기록한 것으로 집계됐다. 업계는 친환경 선박 수요 증가가 주요 배경이라고 설명했다. 다만 인력난 해소가 과제로 남아 있다는 지적도 나온다.",
    sourceId: "src-lighthouse",
    authorId: "author-hsy",
    hoursAgo: 33,
    viewCount: 2120,
    commentCount: 29,
    tags: ["산업", "조선업"],
  },
  // IT·과학
  {
    slug: "it-science-ondevice-ai-launch",
    categorySlug: "it-science",
    title: "테크노바, 온디바이스 AI 신제품 공개",
    summary:
      "가상 기업 테크노바가 온디바이스 AI 기능을 탑재한 신제품을 공개했다.",
    content:
      "가상 기업 테크노바가 온디바이스 AI 기능을 탑재한 신제품을 공개했다. 회사 측은 네트워크 연결 없이도 다양한 기능을 처리할 수 있다는 점을 강조했다. 업계에서는 관련 시장 경쟁이 한층 치열해질 것으로 내다봤다.",
    sourceId: "src-globaltoday",
    authorId: "author-kdy",
    hoursAgo: 1,
    isFeatured: true,
    isExclusive: true,
    viewCount: 11230,
    commentCount: 302,
    shareCount: 187,
    tags: ["IT", "AI", "테크노바"],
  },
  {
    slug: "it-science-new-battery-material",
    categorySlug: "it-science",
    title: "국내 연구진, 신소재 배터리 효율 개선",
    summary:
      "가상의 연구진이 신소재를 활용해 배터리 효율을 크게 개선하는 데 성공했다.",
    content:
      "가상의 연구진이 신소재를 활용한 배터리 효율 개선 연구 결과를 발표했다. 연구팀은 기존 대비 에너지 밀도를 높였다고 설명했다. 상용화까지는 추가 검증이 필요하다는 설명도 덧붙였다.",
    sourceId: "src-central",
    authorId: "author-lsj",
    hoursAgo: 13,
    viewCount: 3670,
    commentCount: 61,
    tags: ["과학", "배터리", "연구"],
  },
  {
    slug: "it-science-launch-vehicle-test",
    categorySlug: "it-science",
    title: "우주발사체 시험 발사 성공",
    summary: "가상의 우주발사체 시험 발사가 성공적으로 마무리됐다.",
    content:
      "가상의 우주발사체 시험 발사가 성공적으로 마무리됐다고 관계 기관이 밝혔다. 이번 시험을 통해 주요 비행 데이터를 확보했다고 설명했다. 다음 단계 시험은 하반기 중 진행될 예정이다.",
    sourceId: "src-weeklyfocus",
    authorId: "author-pha",
    hoursAgo: 24,
    viewCount: 5890,
    commentCount: 134,
    tags: ["과학", "우주", "발사체"],
  },
  // 문화
  {
    slug: "culture-young-artists-exhibition",
    categorySlug: "culture",
    title: "지역 미술관, 청년 작가전 개최",
    summary:
      "가상의 지역 미술관이 청년 작가들의 작품을 소개하는 특별전을 열었다.",
    content:
      "가상의 지역 미술관이 청년 작가전을 개최했다. 이번 전시에는 다양한 매체를 활용한 신진 작가들의 작품이 소개된다. 미술관 측은 관람객과의 소통 프로그램도 함께 운영한다고 밝혔다.",
    sourceId: "src-hanbit",
    authorId: "author-cjw",
    hoursAgo: 15,
    viewCount: 1420,
    commentCount: 18,
    tags: ["문화", "전시"],
  },
  {
    slug: "culture-traditional-market-night-festival",
    categorySlug: "culture",
    title: "전통시장 야시장 축제 다시 열려",
    summary: "가상의 전통시장에서 지역 야시장 축제가 다시 문을 열었다.",
    content:
      "가상의 전통시장에서 야시장 축제가 재개됐다. 다양한 먹거리와 공연이 함께 준비돼 방문객들의 발길을 끌고 있다. 상인회는 이번 축제가 지역 상권 활성화에 도움이 되길 기대한다고 전했다.",
    sourceId: "src-korearepo",
    authorId: "author-jmj",
    hoursAgo: 19,
    viewCount: 1980,
    commentCount: 27,
    tags: ["문화", "축제"],
  },
  {
    slug: "culture-classic-literature-exhibition",
    categorySlug: "culture",
    title: "고전문학 특별전, 관람객 몰려",
    summary: "가상의 고전문학 특별전에 관람객들의 관심이 이어지고 있다.",
    content:
      "가상의 고전문학 특별전이 관람객들의 큰 관심 속에 진행되고 있다. 주최 측은 희귀 자료를 다수 공개해 눈길을 끌었다고 설명했다. 전시는 이번 달 말까지 이어질 예정이다.",
    sourceId: "src-lighthouse",
    authorId: "author-hsy",
    hoursAgo: 40,
    viewCount: 1105,
    commentCount: 12,
    tags: ["문화", "전시", "문학"],
  },
  // 연예
  {
    slug: "entertainment-actor-new-film",
    categorySlug: "entertainment",
    title: "배우 강다온, 신작 영화 촬영 돌입",
    summary: "가상 배우 강다온이 새로운 영화 촬영에 본격 돌입했다.",
    content:
      "가상 배우 강다온이 신작 영화 촬영에 돌입했다고 소속사가 밝혔다. 이번 작품에서는 그동안과 다른 새로운 모습을 보여줄 예정이라고 전했다. 영화는 내년 개봉을 목표로 하고 있다.",
    sourceId: "src-globaltoday",
    authorId: "author-kdy",
    hoursAgo: 7,
    isFeatured: true,
    viewCount: 9020,
    commentCount: 215,
    shareCount: 98,
    tags: ["연예", "영화", "강다온"],
  },
  {
    slug: "entertainment-singer-sold-out-concert",
    categorySlug: "entertainment",
    title: "가수 유하린, 단독 콘서트 전석 매진",
    summary:
      "가상 가수 유하린의 단독 콘서트 티켓이 오픈과 동시에 전석 매진됐다.",
    content:
      "가상 가수 유하린의 단독 콘서트 티켓이 예매 오픈과 동시에 전석 매진됐다. 소속사는 추가 공연 편성을 검토 중이라고 밝혔다. 팬들 사이에서는 뜨거운 반응이 이어지고 있다.",
    sourceId: "src-central",
    authorId: "author-lsj",
    hoursAgo: 17,
    viewCount: 7650,
    commentCount: 188,
    tags: ["연예", "콘서트", "유하린"],
  },
  {
    slug: "entertainment-variety-new-season-cast",
    categorySlug: "entertainment",
    title: "예능 새 시즌, 화제의 출연진 공개",
    summary:
      "가상의 인기 예능 프로그램이 새 시즌 출연진을 공개하며 화제를 모았다.",
    content:
      "가상의 인기 예능 프로그램이 새 시즌 출연진 라인업을 공개했다. 제작진은 이번 시즌에 새로운 포맷을 시도한다고 밝혔다. 방송은 다음 달 초 첫 방송을 앞두고 있다.",
    sourceId: "src-weeklyfocus",
    authorId: "author-pha",
    hoursAgo: 28,
    viewCount: 4330,
    commentCount: 96,
    tags: ["연예", "예능"],
  },
  // 스포츠
  {
    slug: "sports-dragons-extra-innings-win",
    categorySlug: "sports",
    title: "서울드래곤즈, 연장 접전 끝에 승리",
    summary: "가상 구단 서울드래곤즈가 연장 접전 끝에 극적인 승리를 거뒀다.",
    content:
      "가상 구단 서울드래곤즈가 연장 승부 끝에 승리를 거뒀다. 마지막 순간 결승타가 터지며 경기장을 뜨겁게 달궜다. 팀은 이번 승리로 순위를 한 계단 끌어올렸다.",
    sourceId: "src-hanbit",
    authorId: "author-cjw",
    hoursAgo: 10,
    isFeatured: true,
    viewCount: 6890,
    commentCount: 154,
    tags: ["스포츠", "야구", "서울드래곤즈"],
  },
  {
    slug: "sports-tigers-rookie-debut",
    categorySlug: "sports",
    title: "부산타이거즈 신인 투수, 데뷔전 호투",
    summary:
      "가상 구단 부산타이거즈의 신인 투수가 데뷔전에서 인상적인 호투를 펼쳤다.",
    content:
      "가상 구단 부산타이거즈의 신인 투수가 데뷔전에서 호투를 펼쳤다. 구단은 신인 선수의 성장 가능성에 큰 기대를 걸고 있다고 밝혔다. 다음 등판 일정도 곧 공개될 예정이다.",
    sourceId: "src-korearepo",
    authorId: "author-jmj",
    hoursAgo: 21,
    viewCount: 3450,
    commentCount: 67,
    tags: ["스포츠", "야구", "부산타이거즈"],
  },
  {
    slug: "sports-national-team-friendly-roster",
    categorySlug: "sports",
    title: "국가대표팀, 친선경기 명단 발표",
    summary:
      "가상의 국가대표팀이 다가오는 친선경기를 위한 소집 명단을 발표했다.",
    content:
      "가상의 국가대표팀이 친선경기를 앞두고 소집 명단을 발표했다. 감독은 이번 명단에 신예 선수들을 다수 포함했다고 설명했다. 경기는 다음 주 중 열릴 예정이다.",
    sourceId: "src-lighthouse",
    authorId: "author-hsy",
    hoursAgo: 36,
    viewCount: 2870,
    commentCount: 45,
    tags: ["스포츠", "축구", "국가대표"],
  },
  // 라이프
  {
    slug: "life-summer-travel-destinations",
    categorySlug: "life",
    title: "여름 휴가철 인기 여행지 순위 발표",
    summary:
      "가상의 여행 플랫폼이 이번 여름 휴가철 인기 여행지 순위를 발표했다.",
    content:
      "가상의 여행 플랫폼이 여름 휴가철 인기 여행지 순위를 공개했다. 근거리 여행지에 대한 선호가 뚜렷하게 나타났다고 설명했다. 업계는 관련 상품 구성을 다양화하고 있다고 전했다.",
    sourceId: "src-globaltoday",
    authorId: "author-kdy",
    hoursAgo: 12,
    viewCount: 3980,
    commentCount: 58,
    tags: ["라이프", "여행"],
  },
  {
    slug: "life-meal-kit-market-growth",
    categorySlug: "life",
    title: "가정 간편식 시장 꾸준한 성장세",
    summary: "가상의 가정 간편식 시장이 꾸준한 성장세를 이어가고 있다.",
    content:
      "가상의 가정 간편식 시장이 꾸준한 성장세를 보이고 있다고 업계가 밝혔다. 1인 가구 증가와 편의성 선호가 주요 배경으로 꼽힌다. 관련 업체들은 신제품 출시를 이어가고 있다.",
    sourceId: "src-central",
    authorId: "author-lsj",
    hoursAgo: 25,
    viewCount: 2140,
    commentCount: 31,
    tags: ["라이프", "식품"],
  },
  {
    slug: "life-home-workout-app-surge",
    categorySlug: "life",
    title: "홈트레이닝 앱 이용자 급증",
    summary: "가상의 홈트레이닝 앱 이용자 수가 최근 빠르게 늘고 있다.",
    content:
      "가상의 홈트레이닝 앱 이용자 수가 최근 큰 폭으로 늘었다. 운영사는 다양한 난이도별 콘텐츠가 인기 요인이라고 설명했다. 관련 업계의 경쟁도 한층 치열해질 전망이다.",
    sourceId: "src-weeklyfocus",
    authorId: "author-pha",
    hoursAgo: 38,
    viewCount: 1760,
    commentCount: 24,
    tags: ["라이프", "운동", "앱"],
  },
  // 오피니언
  {
    slug: "opinion-sustainable-city-policy",
    categorySlug: "opinion",
    title: "[사설] 지속 가능한 도시 정책이 필요하다",
    summary:
      "장기적 관점에서 지속 가능한 도시 정책 마련이 시급하다는 지적이 나온다.",
    content:
      "도시 정책은 단기적 성과보다 장기적 지속 가능성을 중심에 둬야 한다. 인프라 투자와 환경 정책의 균형을 맞추는 논의가 더 필요하다. 시민 사회와의 소통 역시 정책 설계 과정에서 중요한 축이 되어야 한다.",
    sourceId: "src-korearepo",
    authorId: "author-jmj",
    hoursAgo: 23,
    viewCount: 1320,
    commentCount: 42,
    tags: ["오피니언", "사설", "도시정책"],
  },
  {
    slug: "opinion-digital-transition-balance",
    categorySlug: "opinion",
    title: "[칼럼] 디지털 전환 시대의 균형감각",
    summary:
      "디지털 전환이 가속화되는 가운데 균형 잡힌 접근이 필요하다는 칼럼이다.",
    content:
      "디지털 전환은 효율성과 함께 새로운 격차를 만들어낼 수 있다. 기술 도입 속도만큼이나 제도적 보완이 함께 이뤄져야 한다. 균형감각을 잃지 않는 정책 설계가 앞으로의 과제다.",
    sourceId: "src-lighthouse",
    authorId: "author-hsy",
    hoursAgo: 31,
    viewCount: 1080,
    commentCount: 29,
    tags: ["오피니언", "칼럼", "디지털전환"],
  },
  {
    slug: "opinion-youth-employment-long-term",
    categorySlug: "opinion",
    title: "[사설] 청년 고용, 단기 대책을 넘어서야",
    summary:
      "청년 고용 문제 해결을 위해서는 단기 대책을 넘어선 구조적 접근이 필요하다.",
    content:
      "청년 고용 문제는 단기 지원책만으로는 근본적인 해결이 어렵다. 산업 구조 변화에 맞춘 교육과 노동시장 개편이 함께 논의돼야 한다. 지속 가능한 일자리 창출을 위한 사회적 합의가 필요한 시점이다.",
    sourceId: "src-hanbit",
    authorId: "author-cjw",
    hoursAgo: 45,
    viewCount: 950,
    commentCount: 21,
    tags: ["오피니언", "사설", "청년고용"],
  },
];

function resolveCategory(slug: string): NewsCategory {
  const category = getCategoryBySlug(slug);
  if (!category) {
    throw new Error(`알 수 없는 카테고리 slug: ${slug}`);
  }
  return category;
}

function resolveSource(id: string): NewsSource {
  const source = SOURCES.find((item) => item.id === id);
  if (!source) {
    throw new Error(`알 수 없는 뉴스 출처 id: ${id}`);
  }
  return source;
}

function resolveAuthor(id: string): Author {
  const author = AUTHORS.find((item) => item.id === id);
  if (!author) {
    throw new Error(`알 수 없는 작성자 id: ${id}`);
  }
  return author;
}

export const MOCK_NEWS: NewsArticle[] = ARTICLE_SPECS.map((spec, index) => ({
  id: `news-${String(index + 1).padStart(3, "0")}`,
  slug: spec.slug,
  title: spec.title,
  subtitle: spec.subtitle,
  summary: spec.summary,
  content: spec.content,
  category: resolveCategory(spec.categorySlug),
  source: resolveSource(spec.sourceId),
  author: resolveAuthor(spec.authorId),
  publishedAt: publishedAtHoursAgo(spec.hoursAgo),
  thumbnail: thumbnailFor(index, spec.categorySlug, spec.title),
  isBreaking: spec.isBreaking ?? false,
  isFeatured: spec.isFeatured ?? false,
  isExclusive: spec.isExclusive,
  viewCount: spec.viewCount,
  commentCount: spec.commentCount,
  shareCount: spec.shareCount,
  tags: spec.tags,
}));

// AUTHORS 배열의 각 항목은 위 MOCK_NEWS 매핑에서 `resolveAuthor(...)`를 통해
// 참조(reference)로 공유된다 — 여기서 articleCount를 채워 넣으면 이미 만들어진
// 모든 article.author에도 동일하게 반영된다 (TASK-009, Author Card용 mock 통계).
for (const author of AUTHORS) {
  author.articleCount = MOCK_NEWS.filter(
    (article) => article.author?.id === author.id,
  ).length;
}

/** 작성자 목록 (TASK-009 Author Card 등에서 참조용으로 사용) */
export { AUTHORS };

export function getArticlesByCategory(slug: string): NewsArticle[] {
  return MOCK_NEWS.filter((article) => article.category.slug === slug);
}

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return MOCK_NEWS.find((article) => article.slug === slug);
}

export const BREAKING_ARTICLES: NewsArticle[] = MOCK_NEWS.filter(
  (article) => article.isBreaking,
);

export const FEATURED_ARTICLES: NewsArticle[] = MOCK_NEWS.filter(
  (article) => article.isFeatured,
);

function byPublishedAtDesc(a: NewsArticle, b: NewsArticle): number {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

/** 최신순 기사 목록 (TASK-009 카테고리/상세 페이지 공용) */
export function getLatestArticles(limit?: number, articles: NewsArticle[] = MOCK_NEWS): NewsArticle[] {
  const sorted = [...articles].sort(byPublishedAtDesc);
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

/** 조회수순 인기 기사 목록 (TASK-009 카테고리 페이지 인기 뉴스) */
export function getPopularArticles(limit?: number, articles: NewsArticle[] = MOCK_NEWS): NewsArticle[] {
  const sorted = [...articles].sort((a, b) => b.viewCount - a.viewCount);
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

/**
 * 관련 기사 (TASK-009 뉴스 상세 페이지). 같은 카테고리의 최신 기사를
 * 우선하고, 부족하면 전체 최신 기사로 채운다. 기준 기사 자신은 제외한다.
 */
export function getRelatedArticles(article: NewsArticle, limit = 4): NewsArticle[] {
  const sameCategory = getLatestArticles(
    undefined,
    MOCK_NEWS.filter((item) => item.id !== article.id && item.category.slug === article.category.slug),
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const usedIds = new Set([article.id, ...sameCategory.map((item) => item.id)]);
  const fallback = getLatestArticles(
    undefined,
    MOCK_NEWS.filter((item) => !usedIds.has(item.id)),
  );

  return [...sameCategory, ...fallback].slice(0, limit);
}
