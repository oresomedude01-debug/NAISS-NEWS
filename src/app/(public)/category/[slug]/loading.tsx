import { PostListSkeleton } from '@/components/ui/Skeleton';

export default function CategoryLoading() {
  return (
    <div className="pb-20 md:pb-0">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-50/30 dark:from-surface-950 dark:via-surface-950 dark:to-surface-900" />
        <div className="relative container-page py-12 md:py-16">
          <div className="h-4 w-20 shimmer rounded-full mb-6" />
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 shimmer rounded-2xl" />
            <div className="space-y-2">
              <div className="h-8 w-40 shimmer rounded-xl" />
              <div className="h-4 w-64 shimmer rounded-lg" />
            </div>
          </div>
        </div>
      </section>
      <section className="container-page py-10">
        <div className="grid lg:grid-cols-[1fr_280px] gap-10">
          <PostListSkeleton count={4} />
        </div>
      </section>
    </div>
  );
}
