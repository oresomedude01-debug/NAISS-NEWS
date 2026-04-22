/**
 * Category Page
 * Displays posts for a specific category with filtering
 * ISR: Revalidate every 5 minutes
 */

import { Metadata } from 'next';
import { getPostsByCategory, getAllCategorySlugs, getAllCategories, REVALIDATE_POSTS } from '@/lib/fetcher';
import { PostCard } from '@/components/blog/PostCard';
import { generateCategoryMetadata } from '@/lib/seo';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

// Generate static paths for all categories
export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each category
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

export const revalidate = REVALIDATE_POSTS;

async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page = '1' } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10));

  const [posts, allCategories] = await Promise.all([
    getPostsByCategory(slug, currentPage, 10),
    getAllCategories(),
  ]);

  const category = allCategories.find((c) => c.slug.current === slug);

  if (!category || !posts.items.length) {
    notFound();
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
              ← Back to Blog
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.title}</h1>
          {category.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400">{category.description}</p>
          )}
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Showing {posts.items.length} of {posts.total} posts
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
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                {posts.total > 10 && (
                  <nav className="mt-12 flex justify-center gap-2">
                    {currentPage > 1 && (
                      <Link
                        href={`/category/${slug}?page=${currentPage - 1}`}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-blue-500 transition"
                      >
                        ← Previous
                      </Link>
                    )}

                    {currentPage < Math.ceil(posts.total / 10) && (
                      <Link
                        href={`/category/${slug}?page=${currentPage + 1}`}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-blue-500 transition"
                      >
                        Next →
                      </Link>
                    )}
                  </nav>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No posts in this category yet
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories Widget */}
            {allCategories.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="font-bold text-lg mb-4">All Categories</h3>
                <ul className="space-y-2">
                  {allCategories.map((cat) => (
                    <li key={cat._id}>
                      <Link
                        href={`/category/${cat.slug.current}`}
                        className={`block p-2 rounded transition ${
                          cat._id === category._id
                            ? 'bg-blue-600 text-white'
                            : 'text-blue-600 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                        }`}
                      >
                        {cat.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
