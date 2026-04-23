import { PostListSkeleton } from '@/components/ui/Skeleton';

export default function AuthorLoading() {
  return (
    <div className="pb-20 md:pb-0">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-50/30 dark:from-surface-950 dark:via-surface-950 dark:to-surface-900" />
        <div className="relative container-page py-12 md:py-16">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-24 h-24 shimmer rounded-3xl shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-9 w-48 shimmer rounded-xl" />
              <div className="h-4 w-80 shimmer rounded-lg" />
              <div className="h-4 w-64 shimmer rounded-lg" />
            </div>
          </div>
        </div>
      </section>
      <section className="container-page py-10">
        <PostListSkeleton count={6} />
      </section>
    </div>
  );
}
