export default function Loading() {
  return (
    <div
      className="flex flex-1 items-center justify-center px-6 py-16"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        불러오는 중입니다...
      </p>
    </div>
  );
}
