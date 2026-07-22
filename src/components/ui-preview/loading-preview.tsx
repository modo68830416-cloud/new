import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Button } from "@/components/ui/button";
import { SubSection } from "./section";

export function LoadingPreview() {
  return (
    <>
      <SubSection title="Skeleton — 뉴스 카드 로딩 예시">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md border border-border-default bg-surface p-4">
              <Skeleton height={140} className="mb-3" />
              <Skeleton height={14} className="mb-2" />
              <Skeleton height={14} width="70%" />
            </div>
          ))}
        </div>
      </SubSection>

      <SubSection title="Skeleton — circle">
        <div className="flex items-center gap-3">
          <Skeleton circle width={40} height={40} />
          <div className="flex-1">
            <Skeleton height={12} width="50%" className="mb-2" />
            <Skeleton height={12} width="30%" />
          </div>
        </div>
      </SubSection>

      <SubSection title="Spinner">
        <div className="flex items-center gap-6">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </SubSection>

      <SubSection title="EmptyState">
        <EmptyState
          icon={<Search size={32} />}
          title="검색 결과가 없습니다"
          description="다른 검색어로 다시 시도해 보세요."
          action={<Button size="sm" variant="secondary">필터 초기화</Button>}
        />
      </SubSection>

      <SubSection title="ErrorState">
        <ErrorState
          title="뉴스를 불러오지 못했습니다"
          description="네트워크 연결을 확인한 뒤 다시 시도해 주세요."
          action={<Button size="sm" variant="danger">다시 시도</Button>}
        />
      </SubSection>
    </>
  );
}
