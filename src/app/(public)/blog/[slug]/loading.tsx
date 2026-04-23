export default function PostLoading() {
  return (
    <div className="pb-20 md:pb-0">
      <div className="container-page pt-6">
        <div className="h-4 w-64 shimmer rounded-full" />
      </div>

      <article className="container-narrow pt-8 md:pt-12">
        <div className="space-y-4 mb-8">
          <div className="h-5 w-24 shimmer rounded-full" />
          <div className="h-10 shimmer rounded-xl" />
          <div className="h-10 w-4/5 shimmer rounded-xl" />
          <div className="h-6 w-2/3 shimmer rounded-lg" />

          <div className="flex items-center justify-between pt-6 border-t border-surface-200 dark:border-surface-800">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 shimmer rounded-full" />
              <div className="space-y-2">
                <div className="h-4 w-28 shimmer rounded-lg" />
                <div className="h-3 w-40 shimmer rounded-lg" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-10 h-10 shimmer rounded-xl" />
              <div className="w-10 h-10 shimmer rounded-xl" />
              <div className="w-10 h-10 shimmer rounded-xl" />
            </div>
          </div>
        </div>

        <div className="aspect-[16/9] shimmer rounded-3xl mb-10" />

        <div className="max-w-[680px] mx-auto space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 shimmer rounded-lg" />
              <div className={`h-4 shimmer rounded-lg ${i % 3 === 0 ? 'w-4/5' : i % 3 === 1 ? 'w-full' : 'w-3/4'}`} />
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
