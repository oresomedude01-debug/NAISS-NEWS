/**
 * Blog Listing Page
 * Shows paginated list of all posts
 * ISR: Revalidate every 5 minutes
 */

import { Metadata } from 'next';
import { getPaginatedPosts, REVALIDATE_POSTS, getAllCategories } from '@/lib/fetcher';
import { PostCard } from '@/components/blog/PostCard';
import { PAGINATION } from '@/lib/constants';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest posts and articles from NAISS',
};

export const revalidate = REVALIDATE_POSTS;

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

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover stories, ideas, and insights from the NAISS community
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {posts.items.length > 0 ? (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  {posts.items.map((post) => (
                    <PostCard key={post._id} post={post as any} />
                  ))}
                </div>

                {/* Pagination */}
                <nav className="mt-12 flex justify-center gap-2">
                  {currentPage > 1 && (
                    <Link
                      href={`/blog?page=${currentPage - 1}`}
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-blue-500 transition"
                    >
                      ← Previous
                    </Link>
                  )}

                  {Array.from({ length: Math.ceil(posts.total / PAGINATION.DEFAULT_PAGE_SIZE) }).map(
                    (_, i) => {
                      const pageNum = i + 1;
                      // Show max 5 page buttons
                      if (
                        Math.abs(pageNum - currentPage) <= 2 ||
                        pageNum === 1 ||
                        pageNum === Math.ceil(posts.total / PAGINATION.DEFAULT_PAGE_SIZE)
                      ) {
                        return (
                          <Link
                            key={pageNum}
                            href={`/blog?page=${pageNum}`}
                            className={`px-4 py-2 rounded-lg transition ${
                              pageNum === currentPage
                                ? 'bg-blue-600 text-white'
                                : 'border border-gray-300 dark:border-gray-700 hover:border-blue-500'
                            }`}
                          >
                            {pageNum}
                          </Link>
                        );
                      }

                      if (Math.abs(pageNum - currentPage) === 3) {
                        return (
                          <span key={pageNum} className="px-2">
                            ...
                          </span>
                        );
                      }

                      return null;
                    }
                  )}

                  {currentPage < Math.ceil(posts.total / PAGINATION.DEFAULT_PAGE_SIZE) && (
                    <Link
                      href={`/blog?page=${currentPage + 1}`}
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-blue-500 transition"
                    >
                      Next →
                    </Link>
                  )}
                </nav>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">No posts found</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories Widget */}
            {categories.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category._id}>
                      <Link
                        href={`/category/${category.slug.current}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stats Widget */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-900">
              <h3 className="font-bold text-lg mb-4">Blog Stats</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">{posts.total}</span> total posts
                </p>
                <p>
                  <span className="font-semibold">{currentPage}</span> of{' '}
                  <span className="font-semibold">{Math.ceil(posts.total / PAGINATION.DEFAULT_PAGE_SIZE)}</span> pages
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
