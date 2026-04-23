import { PostListSkeleton } from '@/components/ui/Skeleton';

export default function BlogLoading() {
  return (
    <div className="pb-20 md:pb-0">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-50/30 dark:from-surface-950 dark:via-surface-950 dark:to-surface-900" />
        <div className="relative container-page py-12 md:py-16">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 shimmer rounded-2xl" />
            <div className="space-y-2">
              <div className="h-8 w-24 shimmer rounded-lg" />
              <div className="h-4 w-48 shimmer rounded-lg" />
            </div>
          </div>
        </div>
      </section>
      <section className="container-page py-10">
        <div className="grid lg:grid-cols-[1fr_280px] gap-10">
          <PostListSkeleton count={6} />
          <div className="hidden lg:block space-y-6">
            <div className="card rounded-2xl p-6 space-y-4">
              <div className="h-5 w-28 shimmer rounded-lg" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 shimmer rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
