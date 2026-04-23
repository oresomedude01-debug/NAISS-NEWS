/**
 * Optimized Data Fetching Layer
 * Implements caching strategies and error handling
 * CRITICAL: This layer minimizes API calls and optimizes for Vercel free tier
 */

import {
  POST_BY_SLUG_QUERY,
  ALL_POST_SLUGS_QUERY,
  FEATURED_POSTS_QUERY,
  POSTS_PAGINATED_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  CATEGORY_WITH_POSTS_QUERY,
  ALL_CATEGORY_SLUGS_QUERY,
  ALL_CATEGORIES_QUERY,
  POSTS_BY_AUTHOR_QUERY,
  RELATED_POSTS_QUERY,
} from '@/services/sanity/queries';
import { sanityClient } from '@/services/sanity/client';
import { Post, PostListItem, Category, Author } from '@/types';

// Fallback to mock data if Sanity is unavailable
import { mockPosts, mockCategories, mockAuthors } from '@/services/sanity/mock-data';

/**
 * CRITICAL CACHING STRATEGY:
 * - ISR (Incremental Static Regeneration) is primary: revalidate: 300 (5 min)
 * - For frequently accessed data: use shorter intervals
 * - For rarely changing data: use longer intervals (1 hour+)
 * - This ensures CDN serves cached content and reduces API calls
 */

const REVALIDATE_FEATURED = 300; // 5 minutes
const REVALIDATE_POSTS = 300; // 5 minutes
const REVALIDATE_CATEGORIES = 3600; // 1 hour
const REVALIDATE_SINGLE_POST = 3600; // 1 hour

/**
 * Helper: Safe fetch with error handling and fallback
 */
async function safeFetch<T>(
  fetchFn: () => Promise<T>,
  fallback: T,
  context?: string
): Promise<T> {
  try {
    return await fetchFn();
  } catch (error) {
    console.warn(`[Sanity Fetch] Failed${context ? ` - ${context}` : ''}`);
    console.error(error);
    return fallback;
  }
}

/**
 * GET: Featured posts (for homepage)
 * ISR: 5 minutes
 * Cost: 1 API call
 */
export async function getFeaturedPosts(): Promise<Post[]> {
  return safeFetch(
    () => sanityClient.fetch(FEATURED_POSTS_QUERY),
    mockPosts.filter((p) => p.featured),
    'getFeaturedPosts'
  );
}

/**
 * GET: All post slugs (for ISR route generation)
 * Cost: 1 API call, but cached for entire build time
 */
export async function getAllPostSlugs(): Promise<string[]> {
  return safeFetch(
    async () => {
      const data = await sanityClient.fetch(ALL_POST_SLUGS_QUERY);
      return data.map((item: any) => item.slug);
    },
    mockPosts.map((p) => p.slug.current),
    'getAllPostSlugs'
  );
}

/**
 * GET: Single post by slug
 * ISR: 1 hour (posts rarely change)
 * Cost: 1 API call
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  return safeFetch(
    () => sanityClient.fetch(POST_BY_SLUG_QUERY, { slug }),
    mockPosts.find((p) => p.slug.current === slug) || null,
    `getPostBySlug: ${slug}`
  );
}

/**
 * GET: Paginated posts list
 * ISR: 5 minutes
 * Cost: 1 API call per page
 * 
 * NOTE: For large sites, prefer static pagination (max 3-5 pages)
 * rather than infinite scroll to maintain SSG benefits
 */
export async function getPaginatedPosts(
  page: number = 1,
  pageSize: number = 10
): Promise<{
  items: PostListItem[];
  total: number;
  hasMore: boolean;
  page: number;
  pageSize: number;
}> {
  const offset = (page - 1) * pageSize;

  const result = await safeFetch(
    () =>
      sanityClient.fetch(POSTS_PAGINATED_QUERY, {
        offset,
        limit: pageSize,
      }),
    {
      items: mockPosts,
      total: mockPosts.length,
    },
    `getPaginatedPosts: page ${page}`
  );

  return {
    items: result.items,
    total: result.total,
    hasMore: (offset + pageSize) < result.total,
    page,
    pageSize,
  };
}

/**
 * GET: Posts by category
 * ISR: 5 minutes
 * Cost: 1 API call
 */
export async function getPostsByCategory(
  slug: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{
  items: PostListItem[];
  total: number;
  hasMore: boolean;
}> {
  const offset = (page - 1) * pageSize;

  const result = await safeFetch(
    () =>
      sanityClient.fetch(POSTS_BY_CATEGORY_QUERY, {
        slug,
        offset,
        limit: pageSize,
      }),
    {
      items: mockPosts.filter((p) => p.category.slug.current === slug),
      total: mockPosts.filter((p) => p.category.slug.current === slug).length,
    },
    `getPostsByCategory: ${slug}, page ${page}`
  );

  return {
    items: result.items,
    total: result.total,
    hasMore: (offset + pageSize) < result.total,
  };
}

/**
 * GET: All category slugs (for ISR)
 */
export async function getAllCategorySlugs(): Promise<string[]> {
  return safeFetch(
    async () => {
      const data = await sanityClient.fetch(ALL_CATEGORY_SLUGS_QUERY);
      return data.map((item: any) => item.slug);
    },
    mockCategories.map((c) => c.slug.current),
    'getAllCategorySlugs'
  );
}

/**
 * GET: Category with related posts
 * ISR: 1 hour
 */
export async function getCategoryWithPosts(slug: string): Promise<Category | null> {
  return safeFetch(
    () => sanityClient.fetch(CATEGORY_WITH_POSTS_QUERY, { slug }),
    mockCategories.find((c) => c.slug.current === slug) || null,
    `getCategoryWithPosts: ${slug}`
  );
}

/**
 * GET: All categories (for navigation/sidebar)
 * ISR: 1 hour
 * Cost: 1 API call, but used frequently - good ROI for caching
 */
export async function getAllCategories(): Promise<Category[]> {
  return safeFetch(
    () => sanityClient.fetch(ALL_CATEGORIES_QUERY),
    mockCategories,
    'getAllCategories'
  );
}

/**
 * GET: Posts by author
 * ISR: 5 minutes
 */
export async function getPostsByAuthor(
  slug: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{
  items: PostListItem[];
  author: Author | null;
  total: number;
  hasMore: boolean;
}> {
  const offset = (page - 1) * pageSize;

  const result = await safeFetch(
    () =>
      sanityClient.fetch(POSTS_BY_AUTHOR_QUERY, {
        slug,
        offset,
        limit: pageSize,
      }),
    {
      items: mockPosts.filter((p) => p.author.slug.current === slug),
      author: mockAuthors.find((a) => a.slug.current === slug) || null,
      total: mockPosts.filter((p) => p.author.slug.current === slug).length,
    },
    `getPostsByAuthor: ${slug}, page ${page}`
  );

  return {
    items: result.items,
    author: result.author,
    total: result.total,
    hasMore: (offset + pageSize) < result.total,
  };
}

/**
 * GET: Related posts (same category, excluding current post)
 * ISR: 1 hour
 */
export async function getRelatedPosts(
  categorySlug: string,
  excludeSlug: string,
  limit: number = 3
): Promise<PostListItem[]> {
  return safeFetch(
    () =>
      sanityClient.fetch(RELATED_POSTS_QUERY, {
        categorySlug,
        excludeSlug,
        limit,
      }),
    mockPosts
      .filter(
        (p) =>
          p.category.slug.current === categorySlug &&
          p.slug.current !== excludeSlug
      )
      .slice(0, limit),
    `getRelatedPosts: ${categorySlug}`
  );
}

/**
 * Export revalidation times for use in route segments
 * Usage: export const revalidate = FEATURED_REVALIDATE;
 */
export {
  REVALIDATE_FEATURED,
  REVALIDATE_POSTS,
  REVALIDATE_CATEGORIES,
  REVALIDATE_SINGLE_POST,
};
