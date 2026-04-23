import { CategoryCardSkeleton } from '@/components/ui/Skeleton';

export default function CategoriesLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-brand-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <div className="h-10 w-48 shimmer rounded-xl mx-auto" />
          <div className="h-5 w-96 shimmer rounded-lg mx-auto" />
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
