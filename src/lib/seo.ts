/**
 * SEO & Metadata Utilities
 * Generates Open Graph, Twitter Card, and structured data
 */

import { Post, Category, SeoMetadata } from '@/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://naiss-news.vercel.app';
const SITE_NAME = 'NAISS News';
const SITE_DESCRIPTION = 'Latest news and stories from the NAISS student society';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Generate SEO metadata for a post
 */
export function generatePostMetadata(post: Post): SeoMetadata {
  const description = post.seo?.metaDescription || post.excerpt;
  const url = `${SITE_URL}/blog/${post.slug.current}`;
  const image = post.seo?.ogImage?.asset?.url || post.image?.asset?.url || DEFAULT_OG_IMAGE;

  return {
    title: post.title,
    description,
    image,
    url,
    ogType: 'article',
    author: post.author?.name,
    publishedDate: post.publishedAt,
    modifiedDate: post.updatedAt,
    keywords: post.seo?.keywords,
  };
}

/**
 * Generate SEO metadata for a category page
 */
export function generateCategoryMetadata(category: Category): SeoMetadata {
  const url = `${SITE_URL}/category/${category.slug.current}`;

  return {
    title: `${category.title} - ${SITE_NAME}`,
    description: category.description || `Read latest posts in ${category.title}`,
    url,
    image: DEFAULT_OG_IMAGE,
  };
}

/**
 * Generate SEO metadata for a listing page
 */
export function generateListingMetadata(title: string, description: string): SeoMetadata {
  return {
    title: `${title} - ${SITE_NAME}`,
    description,
    image: DEFAULT_OG_IMAGE,
  };
}

/**
 * Create JSON-LD schema for articles
 * Used for rich snippets in search results
 */
export function createArticleSchema(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    image: post.image?.asset?.url || DEFAULT_OG_IMAGE,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name,
      url: `${SITE_URL}/author/${post.author?.slug.current}`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}

/**
 * Create JSON-LD schema for organization
 * Used on homepage
 */
export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      'https://twitter.com/naiss',
      'https://linkedin.com/company/naiss',
    ],
  };
}

/**
 * Generate Open Graph meta tags object
 */
export function generateOGMetaTags(metadata: SeoMetadata) {
  return {
    'og:title': metadata.title,
    'og:description': metadata.description,
    'og:image': metadata.image,
    'og:url': metadata.url || SITE_URL,
    'og:type': metadata.ogType || 'website',
    'og:site_name': SITE_NAME,
  };
}

/**
 * Generate Twitter Card meta tags object
 */
export function generateTwitterMetaTags(metadata: SeoMetadata) {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': metadata.title,
    'twitter:description': metadata.description,
    'twitter:image': metadata.image,
    'twitter:site': '@naiss',
    'twitter:creator': metadata.author ? `@${metadata.author.toLowerCase()}` : '@naiss',
  };
}

/**
 * Format URL for canonical links
 */
export function getCanonicalUrl(path: string): string {
  return `${SITE_URL}${path}`.replace(/\/$/, '') || SITE_URL;
}
