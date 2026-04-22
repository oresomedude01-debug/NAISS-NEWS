/**
 * Category Page — Premium Editorial Design
 * Category header with posts grid and sidebar filter
 * ISR: Revalidate every 5 minutes
 */

import { Metadata } from 'next';
import { getPostsByCategory, getAllCategorySlugs, getAllCategories } from '@/lib/fetcher';
import { PostCard } from '@/components/blog/PostCard';
import { generateCategoryMetadata } from '@/lib/seo';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Layers,
  Hash,
  FileText,
} from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getAllCategories();
  const category = categories.find((c) => c.slug.current === slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  const seoMeta = generateCategoryMetadata(category);

  return {
    title: category.title,
    description: seoMeta.description,
  };
}

export const revalidate = 300; // 5 minutes

async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page = '1' } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10));

  const [posts, allCategories] = await Promise.all([
    getPostsByCategory(slug, currentPage, 10),
    getAllCategories(),
  ]);

  const category = allCategories.find((c) => c.slug.current === slug);

  if (!category) {
    notFound();
  }

  const totalPages = Math.ceil(posts.total / 10);

  return (
    <div className="pb-20 md:pb-0">
      {/* ═══════ CATEGORY HEADER ═══════ */}
      <section className="relative overflow-hidden" id="category-header">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-50/30 dark:from-surface-950 dark:via-surface-950 dark:to-surface-900 pointer-events-none" />
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        <div className="relative container-page py-12 md:py-16">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors mb-6"
            id="category-back"
          >
            <ArrowLeft className="w-4 h-4" />
            All posts
          </Link>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
              <Hash className="w-7 h-7 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-surface-900 dark:text-white">
                {category.title}
              </h1>
              {category.description && (
                <p className="text-surface-500 mt-2 max-w-lg">
                  {category.description}
                </p>
              )}
              <div className="flex items-center gap-2 mt-3 text-sm text-surface-400">
                <FileText className="w-3.5 h-3.5" />
                <span>{posts.total} {posts.total === 1 ? 'post' : 'posts'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CONTENT GRID ═══════ */}
      <section className="container-page py-10 md:py-14">
        <div className="grid lg:grid-cols-[1fr_280px] gap-10">
          {/* Main Content */}
          <div>
            {posts.items.length > 0 ? (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  {posts.items.map((post) => (
                    <PostCard key={post._id} post={post as any} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="mt-14 flex items-center justify-center gap-2" aria-label="Pagination" id="category-pagination">
                    {currentPage > 1 ? (
                      <Link
                        href={`/category/${slug}?page=${currentPage - 1}`}
                        className="btn-ghost rounded-xl px-3 py-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Previous</span>
                      </Link>
                    ) : (
                      <span className="btn-ghost rounded-xl px-3 py-2 opacity-40 cursor-not-allowed">
                        <ChevronLeft className="w-4 h-4" />
                      </span>
                    )}

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
                              href={`/category/${slug}?page=${pageNum}`}
                              className={`min-w-[40px] h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 ${
                                pageNum === currentPage
                                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                              }`}
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

                    {currentPage < totalPages ? (
                      <Link
                        href={`/category/${slug}?page=${currentPage + 1}`}
                        className="btn-ghost rounded-xl px-3 py-2"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <span className="btn-ghost rounded-xl px-3 py-2 opacity-40 cursor-not-allowed">
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    )}
                  </nav>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-3xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-7 h-7 text-surface-400" />
                </div>
                <p className="text-lg font-display font-semibold text-surface-900 dark:text-white mb-2">
                  No posts in this category yet
                </p>
                <p className="text-sm text-surface-500 mb-6">
                  Check back soon for new content
                </p>
                <Link href="/blog" className="btn-primary text-sm">
                  Browse all posts
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 hidden lg:block">
            {allCategories.length > 0 && (
              <div className="card rounded-2xl p-6" id="category-sidebar">
                <h3 className="flex items-center gap-2 font-display font-bold text-surface-900 dark:text-white mb-5">
                  <Layers className="w-4 h-4 text-brand-500" />
                  All Topics
                </h3>
                <ul className="space-y-1">
                  {allCategories.map((cat) => (
                    <li key={cat._id}>
                      <Link
                        href={`/category/${cat.slug.current}`}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                          cat._id === category._id
                            ? 'bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400'
                            : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800/50 hover:text-brand-600 dark:hover:text-brand-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Hash className="w-3.5 h-3.5 opacity-50" />
                          {cat.title}
                        </div>
                        {cat._id === category._id && (
                          <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}

export default CategoryPage;
