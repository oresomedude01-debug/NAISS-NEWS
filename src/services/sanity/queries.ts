/**
 * GROQ Query Definitions
 * Optimized queries that fetch ONLY required fields
 * This significantly reduces payload size and improves performance
 */

import groq from 'groq';

/**
 * Lean author projection - used in post listings
 * Includes: essential info only
 */
export const AUTHOR_LEAN = groq`
  {
    _id,
    name,
    "slug": slug.current,
    "image": image.asset->url
  }
`;

/**
 * Full author projection - used on author pages
 * Includes: complete author profile
 */
export const AUTHOR_FULL = groq`
  {
    _id,
    name,
    "slug": slug.current,
    "image": image.asset->url,
    bio,
    email,
    "socialLinks": {
      "twitter": socialLinks.twitter,
      "linkedin": socialLinks.linkedin,
      "website": socialLinks.website
    }
  }
`;

/**
 * Category projection
 * Used in all post queries
 */
export const CATEGORY = groq`
  {
    _id,
    title,
    "slug": slug.current,
    description,
    color
  }
`;

/**
 * Post excerpt (for listings)
 * CRITICAL: Minimal fields to reduce payload
 */
export const POST_EXCERPT = groq`
  {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "image": image.asset->{
      url,
      "metadata": metadata { dimensions }
    },
    "author": author->${AUTHOR_LEAN},
    "category": category->${CATEGORY},
    publishedAt,
    featured,
    status
  }
`;

/**
 * Full post (for single post page)
 * Includes content and SEO metadata
 */
export const POST_FULL = groq`
  {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    "image": image.asset->{
      url,
      "metadata": metadata { dimensions },
      alt
    },
    "author": author->${AUTHOR_FULL},
    "category": category->${CATEGORY},
    publishedAt,
    updatedAt,
    featured,
    "seo": {
      "metaDescription": seo.metaDescription,
      "keywords": seo.keywords,
      "ogImage": seo.ogImage.asset->url
    }
  }
`;

/**
 * QUERY: Get featured posts (for homepage)
 * Limit: 5 items
 */
export const FEATURED_POSTS_QUERY = groq`
  *[_type == "post" && featured == true && status == "published"] | order(publishedAt desc)[0...5]
  ${POST_EXCERPT}
`;

/**
 * QUERY: Get latest posts with pagination
 * Used: Blog listing page
 */
export const POSTS_PAGINATED_QUERY = groq`
  {
    "items": *[_type == "post" && status == "published"] 
      | order(publishedAt desc)[($offset)...($offset + $limit)]
      ${POST_EXCERPT},
    "total": count(*[_type == "post" && status == "published"])
  }
`;

/**
 * QUERY: Get posts by category
 * Used: Category pages
 */
export const POSTS_BY_CATEGORY_QUERY = groq`
  {
    "items": *[_type == "post" && category->slug.current == $slug && status == "published"]
      | order(publishedAt desc)[($offset)...($offset + $limit)]
      ${POST_EXCERPT},
    "total": count(*[_type == "post" && category->slug.current == $slug && status == "published"])
  }
`;

/**
 * QUERY: Get single post by slug
 * Used: Individual post pages
 */
export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug && status == "published"][0]
  ${POST_FULL}
`;

/**
 * QUERY: Get all post slugs (for ISR)
 * CRITICAL: Used for both generateStaticParams and ISR
 */
export const ALL_POST_SLUGS_QUERY = groq`
  *[_type == "post" && status == "published"] { "slug": slug.current }
`;

/**
 * QUERY: Get all category slugs (for ISR)
 */
export const ALL_CATEGORY_SLUGS_QUERY = groq`
  *[_type == "category"] { "slug": slug.current }
`;

/**
 * QUERY: Get single category with posts
 */
export const CATEGORY_WITH_POSTS_QUERY = groq`
  *[_type == "category" && slug.current == $slug][0] {
    ...,
    "slug": slug.current,
    "posts": *[_type == "post" && category._ref == ^._id && status == "published"]
      | order(publishedAt desc)[0...10]
      ${POST_EXCERPT}
  }
`;

/**
 * QUERY: Get posts by author
 */
export const POSTS_BY_AUTHOR_QUERY = groq`
  {
    "items": *[_type == "post" && author->slug.current == $slug && status == "published"]
      | order(publishedAt desc)[($offset)...($offset + $limit)]
      ${POST_EXCERPT},
    "total": count(*[_type == "post" && author->slug.current == $slug && status == "published"]),
    "author": *[_type == "author" && slug.current == $slug][0]${AUTHOR_FULL}
  }
`;

/**
 * QUERY: Search posts (lightweight client-side friendly)
 * Used for client-side or minimal API searching
 */
export const SEARCH_POSTS_QUERY = groq`
  *[_type == "post" && status == "published" && (title match $term || excerpt match $term)]
  | order(publishedAt desc)
  ${POST_EXCERPT}
`;

/**
 * QUERY: Get all categories
 */
export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc)
  ${CATEGORY}
`;

/**
 * QUERY: Related posts (same category, excluding current post)
 */
export const RELATED_POSTS_QUERY = groq`
  *[_type == "post" && category->slug.current == $categorySlug && slug.current != $excludeSlug && status == "published"]
  | order(publishedAt desc)[0...$limit]
  ${POST_EXCERPT}
`;
