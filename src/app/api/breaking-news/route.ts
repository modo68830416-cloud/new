import { NextResponse } from "next/server";
import { fetchActiveBreakingNews, NewsApiError } from "@/lib/news-api";

/** TASK-012 속보 목록 API — `GET /api/breaking-news` */
export async function GET() {
  try {
    const items = await fetchActiveBreakingNews();
    return NextResponse.json({ items });
  } catch (error) {
    if (error instanceof NewsApiError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    throw error;
  }
}
