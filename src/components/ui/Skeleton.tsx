/**
 * Loading Skeleton Components
 * Improves perceived performance with skeleton screens
 */

export function PostCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden shadow-sm animate-pulse dark:border-gray-800">
      <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded dark:bg-gray-700" />
        <div className="h-4 bg-gray-200 rounded w-5/6 dark:bg-gray-700" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-700" />
          <div className="h-3 bg-gray-200 rounded w-4/5 dark:bg-gray-700" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-8 w-8 bg-gray-200 rounded-full dark:bg-gray-700" />
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-1/2 dark:bg-gray-700" />
            <div className="h-2 bg-gray-200 rounded w-2/3 mt-1 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PostListSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-video bg-gray-200 rounded-lg dark:bg-gray-700" />
      <div className="mt-6 space-y-3">
        <div className="h-10 bg-gray-200 rounded w-3/4 dark:bg-gray-700" />
        <div className="h-4 bg-gray-200 rounded dark:bg-gray-700" />
        <div className="h-4 bg-gray-200 rounded w-5/6 dark:bg-gray-700" />
      </div>
    </div>
  );
}
