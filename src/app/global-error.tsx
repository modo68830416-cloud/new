"use client";

import { useEffect } from "react";
import "@/styles/globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 py-16 text-center">
          <h1 className="text-2xl font-semibold">심각한 오류가 발생했습니다</h1>
          <p className="text-sm text-zinc-500">
            애플리케이션에 문제가 발생했습니다. 다시 시도해 주세요.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-2 rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
