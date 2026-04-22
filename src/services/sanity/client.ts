/**
 * Sanity CMS Client Configuration
 * Optimized for performance and cost efficiency
 */

import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

/**
 * Main Sanity client instance
 * Use for public queries that can be cached
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // CRITICAL: Always use CDN for caching and cost reduction
  perspective: 'published', // Only fetch published documents
});

/**
 * Preview client (for draft content)
 * Use sparingly - only for authenticated users (editors/admins)
 */
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Preview must bypass CDN
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_TOKEN, // Required for preview
});

/**
 * Determine which client to use based on preview mode
 */
export const getClient = (preview?: boolean) => {
  return preview ? previewClient : sanityClient;
};

export type SanityClient = typeof sanityClient;
