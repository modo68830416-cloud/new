"use client";

import { useEffect } from "react";

export default function Error({
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
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold">오류가 발생했습니다</h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        페이지를 표시하는 중 문제가 발생했습니다. 다시 시도해 주세요.
      </p>
      {process.env.NODE_ENV === "development" && (
        <pre className="mt-2 max-w-full overflow-x-auto rounded-md bg-zinc-100 p-4 text-left text-xs text-red-600 dark:bg-zinc-900 dark:text-red-400">
          {error.message}
        </pre>
      )}
      <button
        type="button"
        onClick={() => reset()}
        className="mt-2 rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        다시 시도
      </button>
    </div>
  );
}
