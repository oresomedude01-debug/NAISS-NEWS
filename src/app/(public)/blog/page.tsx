/**
 * Blog Listing Page — Premium Editorial Layout
 * Card-based grid with category filter sidebar
 * ISR: Revalidate every 5 minutes
 */

import { Metadata } from 'next';
import { getPaginatedPosts, getAllCategories } from '@/lib/fetcher';
import { PostCard } from '@/components/blog/PostCard';
import { PAGINATION } from '@/lib/constants';
import Link from 'next/link';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Filter,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest posts and articles from NAISS',
};

export const revalidate = 300; // 5 minutes

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

async function BlogPage({ searchParams }: BlogPageProps) {
  const { page = '1' } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10));

  const [posts, categories] = await Promise.all([
    getPaginatedPosts(currentPage, PAGINATION.DEFAULT_PAGE_SIZE),
    getAllCategories(),
  ]);

  const totalPages = Math.ceil(posts.total / PAGINATION.DEFAULT_PAGE_SIZE);

  return (
    <div className="pb-20 md:pb-0">
      {/* ═══════ PAGE HEADER ═══════ */}
      <section className="relative overflow-hidden" id="blog-header">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-50/30 dark:from-surface-950 dark:via-surface-950 dark:to-surface-900 pointer-events-none" />
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        <div className="relative container-page py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-surface-900 dark:text-white">
                Blog
              </h1>
              <p className="text-sm text-surface-500">
                Stories, ideas, and insights from the NAISS community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <section className="container-page py-10 md:py-14">
        <div className="grid lg:grid-cols-[1fr_280px] gap-10">
          {/* Posts Grid */}
          <div>
            {posts.items.length > 0 ? (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  {posts.items.map((post) => (
                    <PostCard key={post._id} post={post as any} />
                  ))}
                </div>

                {/* ── Pagination ── */}
                {totalPages > 1 && (
                  <nav className="mt-14 flex items-center justify-center gap-2" id="pagination" aria-label="Pagination">
                    {/* Previous */}
                    {currentPage > 1 ? (
                      <Link
                        href={`/blog?page=${currentPage - 1}`}
                        className="btn-ghost rounded-xl px-3 py-2"
                        id="pagination-prev"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Previous</span>
                      </Link>
                    ) : (
                      <span className="btn-ghost rounded-xl px-3 py-2 opacity-40 cursor-not-allowed">
                        <ChevronLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Previous</span>
                      </span>
                    )}

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }).map((_, i) => {
                        const pageNum = i + 1;
                        if (
                          Math.abs(pageNum - currentPage) <= 2 ||
                          pageNum === 1 ||
                          pageNum === totalPages
                        ) {
                          return (
                            <Link
                              key={pageNum}
                              href={`/blog?page=${pageNum}`}
                              className={`min-w-[40px] h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 ${
                                pageNum === currentPage
                                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                              }`}
                              id={`pagination-${pageNum}`}
                            >
                              {pageNum}
                            </Link>
                          );
                        }
                        if (Math.abs(pageNum - currentPage) === 3) {
                          return (
                            <span key={pageNum} className="min-w-[40px] h-10 flex items-center justify-center text-surface-400 text-sm">
                              ···
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    {/* Next */}
                    {currentPage < totalPages ? (
                      <Link
                        href={`/blog?page=${currentPage + 1}`}
                        className="btn-ghost rounded-xl px-3 py-2"
                        id="pagination-next"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <span className="btn-ghost rounded-xl px-3 py-2 opacity-40 cursor-not-allowed">
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    )}
                  </nav>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-3xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-7 h-7 text-surface-400" />
                </div>
                <p className="text-lg font-display font-semibold text-surface-900 dark:text-white mb-2">
                  No posts yet
                </p>
                <p className="text-sm text-surface-500">
                  Check back soon for new content
                </p>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-6 hidden lg:block">
            {/* Categories Widget */}
            {categories.length > 0 && (
              <div className="card rounded-2xl p-6" id="sidebar-categories">
                <div className="flex items-center gap-2 mb-5">
                  <Filter className="w-4 h-4 text-brand-500" />
                  <h3 className="font-display font-bold text-surface-900 dark:text-white">
                    Categories
                  </h3>
                </div>
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category._id}>
                      <Link
                        href={`/category/${category.slug.current}`}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-all duration-200"
                      >
                        <div className="flex items-center gap-2.5">
                          <Layers className="w-3.5 h-3.5 opacity-50" />
                          {category.title}
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stats Widget */}
            <div className="card rounded-2xl p-6 bg-gradient-to-br from-brand-50 to-accent-50/50 dark:from-brand-950/30 dark:to-accent-950/20 border-brand-200/30 dark:border-brand-800/20" id="sidebar-stats">
              <div className="flex items-center gap-2 mb-5">
                <BarChart3 className="w-4 h-4 text-brand-500" />
                <h3 className="font-display font-bold text-surface-900 dark:text-white">
                  Blog Stats
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-surface-500">Total posts</span>
                  <span className="text-lg font-display font-bold text-surface-900 dark:text-white">
                    {posts.total}
                  </span>
                </div>
                <div className="divider" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-surface-500">Current page</span>
                  <span className="text-sm font-semibold text-surface-700 dark:text-surface-300">
                    {currentPage} of {totalPages}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default BlogPage;
