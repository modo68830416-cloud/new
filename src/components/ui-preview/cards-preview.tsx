import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Surface } from "@/components/ui/surface";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/ui/category-badge";
import { NewsMeta } from "@/components/ui/news-meta";
import { MOCK_NEWS } from "@/data/mock-news";
import { SubSection } from "./section";

const sampleArticles = MOCK_NEWS.slice(0, 3);

export function CardsPreview() {
  return (
    <>
      <SubSection title="Card — 기본 / interactive / highlighted">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>기본 카드</CardTitle>
            </CardHeader>
            <CardContent>패딩/라운드/그림자가 토큰으로 조합된 기본 카드입니다.</CardContent>
          </Card>
          <Card interactive>
            <CardHeader>
              <CardTitle>interactive 카드</CardTitle>
            </CardHeader>
            <CardContent>마우스를 올리면 표면 색과 테두리가 바뀝니다.</CardContent>
          </Card>
          <Card highlighted>
            <CardHeader>
              <CardTitle>highlighted 카드</CardTitle>
            </CardHeader>
            <CardContent>accent 테두리로 강조된 카드입니다.</CardContent>
            <CardFooter>
              <Button size="sm">확인</Button>
            </CardFooter>
          </Card>
        </div>
      </SubSection>

      <SubSection title="Card — 뉴스 카드 조합 예시">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {sampleArticles.map((article) => (
            <Card key={article.id} interactive padding="sm">
              <div className="mb-3 flex items-center justify-between">
                <CategoryBadge category={article.category} size="sm" />
              </div>
              <p className="type-card-title mb-2 line-clamp-2">{article.title}</p>
              <p className="type-caption mb-3 line-clamp-2">{article.summary}</p>
              <NewsMeta publishedAt={article.publishedAt} viewCount={article.viewCount} showCategory={false} />
            </Card>
          ))}
        </div>
      </SubSection>

      <SubSection title="Surface — level">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Surface level="base" className="p-4 text-center">
            <p className="type-caption">base</p>
          </Surface>
          <Surface level="raised" className="p-4 text-center">
            <p className="type-caption">raised</p>
          </Surface>
          <Surface level="elevated" className="p-4 text-center">
            <p className="type-caption">elevated</p>
          </Surface>
          <Surface level="overlay" className="p-4 text-center">
            <p className="type-caption">overlay</p>
          </Surface>
        </div>
      </SubSection>
    </>
  );
}
