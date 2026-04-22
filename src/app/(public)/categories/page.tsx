/**
 * Categories Page
 * Displays all available categories with post counts
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCategories } from '@/lib/fetcher';
import { SITE_CONFIG } from '@/lib/constants';
import { generateMetadata as generateSeoMetadata } from '@/lib/seo';

export const revalidate = 3600; // 1 hour ISR

export const metadata: Metadata = {
  title: 'All Categories',
  description: 'Browse all categories on NAISS News Platform',
  openGraph: {
    title: 'All Categories | NAISS News',
    description: 'Explore all content categories on NAISS',
    url: `${SITE_CONFIG.url}/categories`,
  },
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-brand-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            All Categories
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore content across all categories. Click any category to view related posts.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const categorySlug = typeof category.slug === 'string' ? category.slug : category.slug.current;
              return (
                <Link
                  key={categorySlug}
                  href={`/category/${categorySlug}`}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-accent-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300" />
                  <div className="relative h-full p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-xl transition-all duration-300">
                    {/* Category Icon/Color */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 mb-4 opacity-80 group-hover:opacity-100 transition" />

                    {/* Category Name */}
                    <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">
                      {category.title || category.name}
                    </h3>

                    {/* Category Description */}
                    {category.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {category.description}
                      </p>
                    )}

                    {/* Post Count */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        View Category
                      </span>
                      <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📂</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Categories Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Categories will appear once content is added.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold transition"
            >
              View All Posts →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
