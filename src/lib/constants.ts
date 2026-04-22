/**
 * Application-wide Constants
 * Centralized configuration for consistency and maintainability
 */

import { SiteConfig, NavLink } from '@/types';

/**
 * Site Configuration
 */
export const SITE_CONFIG: SiteConfig = {
  name: 'NAISS News',
  description: 'Latest news, events, and stories from the NAISS student society',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://naiss-news.vercel.app',
  ogImage: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://naiss-news.vercel.app'}/og-image.png`,
  links: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Categories', href: '/categories' },
    { label: 'About', href: '/about' },
  ],
  social: {
    twitter: 'https://twitter.com/naiss',
    linkedin: 'https://linkedin.com/company/naiss',
    instagram: 'https://instagram.com/naiss',
    email: 'hello@naiss.org',
  },
};

/**
 * Pagination defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
  DEFAULT_PAGE: 1,
};

/**
 * Image configuration
 * Optimized for Sanity CDN usage
 */
export const IMAGE_CONFIG = {
  DEFAULT_QUALITY: 80,
  DEFAULT_WIDTH: 800,
  THUMBNAIL_WIDTH: 300,
  OG_IMAGE_WIDTH: 1200,
  OG_IMAGE_HEIGHT: 630,
};

/**
 * ISR Revalidation times (in seconds)
 * CRITICAL for cost optimization
 */
export const REVALIDATION = {
  FEATURED: 300, // 5 minutes - homepage featured posts change occasionally
  POSTS: 300, // 5 minutes - blog posts
  CATEGORIES: 3600, // 1 hour - categories rarely change
  SINGLE_POST: 3600, // 1 hour - individual posts
  HOMEPAGE: 300, // 5 minutes
};

/**
 * Sorting and filtering options
 */
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'trending', label: 'Trending' },
  { value: 'views', label: 'Most Viewed' },
] as const;

/**
 * Layout spacing constants (Tailwind-friendly)
 */
export const SPACING = {
  CONTAINER_MAX_WIDTH: 'max-w-6xl',
  SECTION_PADDING: 'px-4 py-12 md:py-16 lg:py-20',
  SECTION_MARGIN: 'mb-12 md:mb-16',
};

/**
 * Animation and transition configs
 */
export const ANIMATIONS = {
  FADE_DURATION: 0.3,
  SLIDE_DURATION: 0.4,
  STAGGER_DELAY: 0.1,
} as const;
