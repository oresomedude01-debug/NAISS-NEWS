/**
 * Utility functions for common operations
 */

import { Post } from '@/types';

/**
 * Format date for display
 */
export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
  const d = new Date(date);

  if (format === 'short') {
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date with relative time (e.g., "2 days ago")
 */
export function formatRelativeDate(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return formatDate(date, 'short');
}

/**
 * Read time estimation
 * Assumes average reading speed of 200 words per minute
 */
export function estimateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return `${minutes} min read`;
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + '...';
}

/**
 * Clean and standardize slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Extract reading time from post content (portable text)
 */
export function getPostReadingTime(content: any[]): string {
  if (!content || !Array.isArray(content)) return '< 1 min read';

  const fullText = content
    .filter((block) => block._type === 'block')
    .map((block) => block.text || '')
    .join(' ');

  return estimateReadTime(fullText);
}

/**
 * Check if string is a valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Group posts by month and year
 */
export function groupPostsByDate(posts: Post[]): Map<string, Post[]> {
  const grouped = new Map<string, Post[]>();

  posts.forEach((post) => {
    const date = new Date(post.publishedAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(post);
  });

  return grouped;
}

/**
 * Highlight search terms in text
 */
export function highlightText(text: string, highlights: string[]): string {
  let result = text;
  highlights.forEach((highlight) => {
    const regex = new RegExp(`(${highlight})`, 'gi');
    result = result.replace(regex, '<mark>$1</mark>');
  });
  return result;
}
