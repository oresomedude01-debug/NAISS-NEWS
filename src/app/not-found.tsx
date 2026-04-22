/**
 * Premium 404 — Not Found Page
 * Creative, branded 404 with helpful navigation
 */

import Link from 'next/link';
import { Home, Search, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pb-20 md:pb-0" id="not-found-page">
      <div className="text-center max-w-lg">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <span className="text-[8rem] md:text-[10rem] font-display font-black text-surface-100 dark:text-surface-900 select-none leading-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center shadow-elevated animate-float">
              <Search className="w-9 h-9 text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-display font-bold text-surface-900 dark:text-white mb-3">
          Page not found
        </h1>
        <p className="text-surface-500 mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="btn-primary px-6 py-3 rounded-2xl"
            id="not-found-home"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/blog"
            className="btn-outline px-6 py-3 rounded-2xl"
            id="not-found-blog"
          >
            <BookOpen className="w-4 h-4" />
            Browse Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
