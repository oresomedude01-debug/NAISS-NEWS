/**
 * Premium Loading Skeletons
 * Shimmer effect with subtle gradient animation
 */

export function PostCardSkeleton() {
  return (
    <div className="card rounded-2xl overflow-hidden">
      <div className="aspect-[16/10] shimmer rounded-t-2xl" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 shimmer rounded-full" />
        <div className="space-y-2">
          <div className="h-5 shimmer rounded-lg" />
          <div className="h-5 w-4/5 shimmer rounded-lg" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3 shimmer rounded-lg" />
          <div className="h-3 w-3/4 shimmer rounded-lg" />
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-surface-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 shimmer rounded-full" />
            <div className="h-3 w-20 shimmer rounded-full" />
          </div>
          <div className="h-3 w-14 shimmer rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function PostListSkeleton({ count = 6 }: { count?: number }) {
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
    <div className="rounded-3xl overflow-hidden">
      <div className="aspect-[16/9] md:aspect-[2.2/1] shimmer rounded-3xl relative">
        <div className="absolute bottom-8 left-8 right-8 space-y-4">
          <div className="h-5 w-24 shimmer rounded-full" />
          <div className="h-10 w-3/4 shimmer rounded-xl" />
          <div className="h-4 w-1/2 shimmer rounded-lg" />
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 shimmer rounded-full" />
            <div className="h-3 w-24 shimmer rounded-full" />
            <div className="h-3 w-20 shimmer rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HorizontalCardSkeleton() {
  return (
    <div className="card rounded-2xl overflow-hidden flex">
      <div className="w-32 sm:w-40 shrink-0 shimmer" />
      <div className="flex-1 p-4 space-y-2">
        <div className="h-2.5 w-16 shimmer rounded-full" />
        <div className="h-4 shimmer rounded-lg" />
        <div className="h-4 w-2/3 shimmer rounded-lg" />
        <div className="h-2.5 w-24 shimmer rounded-full mt-1" />
      </div>
    </div>
  );
}

export function CompactPostSkeleton() {
  return (
    <div className="flex items-start gap-4 py-4">
      <div className="w-20 h-20 shrink-0 shimmer rounded-xl" />
      <div className="flex-1 space-y-2">
        <div className="h-2.5 w-16 shimmer rounded-full" />
        <div className="h-4 shimmer rounded-lg" />
        <div className="h-4 w-3/4 shimmer rounded-lg" />
        <div className="h-2.5 w-20 shimmer rounded-full" />
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="card rounded-2xl p-6 text-center space-y-3">
      <div className="w-12 h-12 shimmer rounded-2xl mx-auto" />
      <div className="h-4 w-20 shimmer rounded-lg mx-auto" />
      <div className="h-3 w-32 shimmer rounded-full mx-auto" />
    </div>
  );
}
