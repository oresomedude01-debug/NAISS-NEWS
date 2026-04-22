/**
 * Homepage — Premium Editorial Design
 * Hero section, trending, categories, latest posts
 * ISR: Revalidate every 5 minutes
 */

import Link from 'next/link';
import { Metadata } from 'next';
import { getFeaturedPosts, getAllCategories, getPaginatedPosts } from '@/lib/fetcher';
import { PostCard } from '@/components/blog/PostCard';
import { SITE_CONFIG } from '@/lib/constants';
import {
  TrendingUp,
  ArrowRight,
  Sparkles,
  BookOpen,
  Users,
  Zap,
  Layers,
  Globe,
  Code,
  Calendar,
} from 'lucide-react';

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — Student News & Insights`,
  description: SITE_CONFIG.description,
};

export const revalidate = 300; // 5 minutes

// Category icon mapping
const categoryIcons: Record<string, React.ReactNode> = {
  technology: <Code className="w-5 h-5" />,
  events: <Calendar className="w-5 h-5" />,
  tutorials: <BookOpen className="w-5 h-5" />,
  community: <Users className="w-5 h-5" />,
  news: <Globe className="w-5 h-5" />,
};

// Category gradient mapping
const categoryGradients: Record<string, string> = {
  technology: 'from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20',
  events: 'from-rose-500/10 to-pink-500/10 dark:from-rose-500/20 dark:to-pink-500/20',
  tutorials: 'from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20',
  community: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20',
  news: 'from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20',
};

const categoryIconColors: Record<string, string> = {
  technology: 'text-blue-600 dark:text-blue-400',
  events: 'text-rose-600 dark:text-rose-400',
  tutorials: 'text-amber-600 dark:text-amber-400',
  community: 'text-emerald-600 dark:text-emerald-400',
  news: 'text-violet-600 dark:text-violet-400',
};

async function Homepage() {
  const [featuredPosts, categories, paginatedPosts] = await Promise.all([
    getFeaturedPosts(),
    getAllCategories(),
    getPaginatedPosts(1, 6),
  ]);

  return (
    <div className="pb-20 md:pb-0">
      {/* ═══════ HERO SECTION ═══════ */}
      {featuredPosts.length > 0 && (
        <section className="section-sm" id="hero-section">
          <div className="container-page">
            {/* Section header */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-2 badge-brand">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
              {/* Main featured post */}
              <div className="lg:col-span-3">
                <PostCard post={featuredPosts[0]} variant="featured" priority />
              </div>

              {/* Side posts */}
              <div className="lg:col-span-2 space-y-4">
                {featuredPosts.slice(1, 4).map((post) => (
                  <PostCard key={post._id} post={post} variant="horizontal" />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════ CATEGORIES SECTION ═══════ */}
      {categories.length > 0 && (
        <section className="section-sm relative" id="categories-section">
          {/* Subtle background */}
          <div className="absolute inset-0 bg-gradient-to-b from-surface-50/50 to-transparent dark:from-surface-900/30 dark:to-transparent pointer-events-none" />

          <div className="relative container-page">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-surface-900 dark:text-white">
                  Explore Topics
                </h2>
                <p className="text-sm text-surface-500 mt-1">
                  Dive into the subjects that matter to you
                </p>
              </div>
              <Link
                href="/categories"
                className="btn-ghost text-sm hidden sm:flex"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {categories.map((category) => {
                const slug = category.slug.current;
                const gradient = categoryGradients[slug] || 'from-surface-100 to-surface-50 dark:from-surface-800 dark:to-surface-850';
                const iconColor = categoryIconColors[slug] || 'text-surface-500';
                const icon = categoryIcons[slug] || <Layers className="w-5 h-5" />;

                return (
                  <Link
                    key={category._id}
                    href={`/category/${slug}`}
                    className={`group relative rounded-2xl p-5 text-center bg-gradient-to-br ${gradient} border border-surface-200/50 dark:border-surface-800/50 hover:border-brand-300/50 dark:hover:border-brand-700/30 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1`}
                    id={`category-${slug}`}
                  >
                    <div className={`w-10 h-10 rounded-2xl mx-auto mb-3 flex items-center justify-center bg-white/80 dark:bg-surface-800/80 shadow-sm ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
                      {icon}
                    </div>
                    <h3 className="font-display font-semibold text-sm text-surface-900 dark:text-white">
                      {category.title}
                    </h3>
                    {category.description && (
                      <p className="text-2xs text-surface-500 mt-1 line-clamp-1">
                        {category.description}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════ LATEST POSTS ═══════ */}
      {paginatedPosts.items.length > 0 && (
        <section className="section-sm" id="latest-posts-section">
          <div className="container-page">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-surface-900 dark:text-white">
                    Latest Posts
                  </h2>
                  <p className="text-sm text-surface-500">
                    Fresh stories from the community
                  </p>
                </div>
              </div>
              <Link
                href="/blog"
                className="btn-outline text-sm"
                id="view-all-posts"
              >
                View all
                <ArrowRight className="w-4 h-4" />
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

      {/* ═══════ TRENDING SECTION ═══════ */}
      {featuredPosts.length > 1 && (
        <section className="section-sm" id="trending-section">
          <div className="container-page">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-surface-900 dark:text-white">
                  Trending Now
                </h2>
                <p className="text-sm text-surface-500">
                  Most popular this week
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => (
                <div key={post._id} className="relative">
                  {/* Trending number */}
                  <div className="absolute -top-3 -left-2 z-10 w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-md">
                    <span className="text-xs font-bold text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Homepage;
