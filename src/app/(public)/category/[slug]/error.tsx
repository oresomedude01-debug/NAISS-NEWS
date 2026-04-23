'use client';

import Link from 'next/link';
import { RefreshCw, ArrowLeft } from 'lucide-react';

export default function CategoryError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center container-page py-20">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-3xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-6">
          <RefreshCw className="w-7 h-7 text-red-500" />
        </div>
        <h1 className="text-2xl font-display font-bold text-surface-900 dark:text-white mb-3">
          Couldn&apos;t load this category
        </h1>
        <p className="text-surface-500 mb-8">Something went wrong. Please try again.</p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={reset} className="btn-primary rounded-xl">
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
          <Link href="/categories" className="btn-outline rounded-xl">
            <ArrowLeft className="w-4 h-4" />
            All categories
          </Link>
        </div>
      </div>
    </div>
  );
}
