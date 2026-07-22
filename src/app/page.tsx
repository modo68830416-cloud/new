import { siteConfig } from "@/config/site";
import { CATEGORIES } from "@/constants/categories";
import { MOCK_NEWS } from "@/data/mock-news";
import { MOCK_BREAKING_NEWS } from "@/data/mock-breaking-news";

export default function Home() {
  const stats = [
    { label: "등록된 뉴스", value: MOCK_NEWS.length },
    { label: "등록된 카테고리", value: CATEGORIES.length },
    { label: "속보 데이터", value: MOCK_BREAKING_NEWS.length },
  ];

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <main className="w-full max-w-2xl">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {siteConfig.siteShortName}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          {siteConfig.siteName}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {siteConfig.siteDescription}
        </p>

        <p className="mt-8 inline-block rounded-full border border-zinc-200 px-4 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
          프로젝트 초기화 완료
        </p>

        <dl className="mt-8 grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-zinc-200 p-4 text-center dark:border-zinc-800"
            >
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">
                {stat.label}
              </dt>
              <dd className="mt-1 text-2xl font-semibold">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
          다음 단계인 task-002부터 메인 화면과 뉴스 UI가 순차적으로 구현됩니다.
        </p>
      </main>
    </div>
  );
}
