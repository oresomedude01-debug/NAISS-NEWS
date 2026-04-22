/**
 * Homepage
 * Features: Hero, featured posts, latest posts, categories
 * ISR: Revalidate every 5 minutes
 */

import Link from 'next/link';
import { Metadata } from 'next';
import { getFeaturedPosts, getAllCategories, getPaginatedPosts, REVALIDATE_FEATURED } from '@/lib/fetcher';
import { PostCard } from '@/components/blog/PostCard';
import { SITE_CONFIG, SPACING } from '@/lib/constants';

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
};

// ISR: Revalidate every 5 minutes
export const revalidate = REVALIDATE_FEATURED;

async function Homepage() {
  // Fetch data in parallel for better performance
  const [featuredPosts, categories, paginatedPosts] = await Promise.all([
    getFeaturedPosts(),
    getAllCategories(),
    getPaginatedPosts(1, 6),
  ]);

  return (
    <div>
      {/* Hero Section */}
      {featuredPosts.length > 0 && (
        <section className={SPACING.SECTION_PADDING}>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Large featured post */}
              <div className="md:col-span-2">
                <PostCard post={featuredPosts[0]} variant="large" />
              </div>

              {/* Side featured posts */}
              <div className="space-y-4">
                {featuredPosts.slice(1, 3).map((post) => (
                  <PostCard key={post._id} post={post} variant="compact" />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Explore Topics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/category/${category.slug.current}`}
                  className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition text-center hover:shadow-lg"
                >
                  <h3 className="font-semibold mb-1">{category.title}</h3>
                  {category.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts Section */}
      {paginatedPosts.items.length > 0 && (
        <section className={SPACING.SECTION_PADDING}>
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Latest Posts</h2>
              <Link
                href="/blog"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                View All →
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.items.map((post) => (
                <PostCard key={post._id} post={post as any} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Get the latest news and insights from NAISS delivered to your inbox.
          </p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
