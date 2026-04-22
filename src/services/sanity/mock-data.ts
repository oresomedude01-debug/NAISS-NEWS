/**
 * Mock data for development and fallback
 * Ensures the app works even without Sanity connected
 * Remove or disable in production after Sanity setup
 */

import { Post, Category, Author } from '@/types';

export const mockAuthors: Author[] = [
  {
    _id: '1',
    name: 'Sarah Johnson',
    slug: { current: 'sarah-johnson' },
    bio: 'Tech journalist and NAISS contributor',
    image: {
      asset: {
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        metadata: { dimensions: { width: 400, height: 400 } },
      },
    },
  },
  {
    _id: '2',
    name: 'Ahmed Hassan',
    slug: { current: 'ahmed-hassan' },
    bio: 'Student society lead and tech enthusiast',
    image: {
      asset: {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        metadata: { dimensions: { width: 400, height: 400 } },
      },
    },
  },
];

export const mockCategories: Category[] = [
  {
    _id: '1',
    title: 'Technology',
    slug: { current: 'technology' },
    description: 'Latest tech trends and updates',
  },
  {
    _id: '2',
    title: 'Events',
    slug: { current: 'events' },
    description: 'NAISS events and announcements',
  },
  {
    _id: '3',
    title: 'Tutorials',
    slug: { current: 'tutorials' },
    description: 'How-to guides and tutorials',
  },
];

export const mockPosts: Post[] = [
  {
    _id: '1',
    title: 'Getting Started with Next.js 15: A Complete Guide',
    slug: { current: 'getting-started-nextjs-15' },
    excerpt:
      'Learn the fundamentals of Next.js 15 and build blazingly fast web applications with the App Router.',
    content: [
      {
        _type: 'block',
        _key: 'key1',
        text: 'Next.js 15 brings significant improvements in performance and developer experience. In this comprehensive guide, we\'ll explore the latest features including enhanced App Router functionality, improved image optimization, and better caching strategies.',
        style: 'normal',
      },
    ],
    image: {
      asset: {
        url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
        metadata: { dimensions: { width: 800, height: 400 } },
      },
      alt: 'Next.js code',
    },
    author: mockAuthors[0],
    category: mockCategories[0],
    publishedAt: new Date('2026-04-20').toISOString(),
    updatedAt: new Date('2026-04-20').toISOString(),
    featured: true,
    status: 'published',
    views: 1250,
    seo: {
      metaDescription: 'Complete guide to Next.js 15 with App Router and performance optimization techniques.',
      keywords: ['nextjs', 'react', 'web development'],
    },
  },
  {
    _id: '2',
    title: 'Cost-Optimized Static Site Generation with Vercel',
    slug: { current: 'cost-optimized-ssg-vercel' },
    excerpt:
      'Discover how to leverage ISR and SSG to reduce serverless function costs while maintaining dynamic content.',
    content: [
      {
        _type: 'block',
        _key: 'key2',
        text: 'Static Site Generation (SSG) is one of the most cost-effective ways to deploy web applications. By combining SSG with Incremental Static Regeneration (ISR), you can serve dynamic content without relying on expensive serverless functions.',
        style: 'normal',
      },
    ],
    image: {
      asset: {
        url: 'https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=800&h=400&fit=crop',
        metadata: { dimensions: { width: 800, height: 400 } },
      },
      alt: 'Vercel deployment dashboard',
    },
    author: mockAuthors[1],
    category: mockCategories[0],
    publishedAt: new Date('2026-04-19').toISOString(),
    updatedAt: new Date('2026-04-19').toISOString(),
    featured: true,
    status: 'published',
    views: 892,
    seo: {
      metaDescription: 'Learn how to optimize costs with SSG and ISR on Vercel.',
      keywords: ['vercel', 'static generation', 'cost optimization'],
    },
  },
  {
    _id: '3',
    title: 'NAISS Spring Tech Meetup - April 25',
    slug: { current: 'naiss-spring-tech-meetup' },
    excerpt:
      'Join us for our biggest tech meetup of the season! Learn from industry experts and network with fellow developers.',
    content: [
      {
        _type: 'block',
        _key: 'key3',
        text: 'The Spring Tech Meetup is back! This year we\'re hosting discussions on modern web development, cloud architecture, and student-led tech initiatives. Whether you\'re a beginner or an experienced developer, there\'s something for everyone.',
        style: 'normal',
      },
    ],
    image: {
      asset: {
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
        metadata: { dimensions: { width: 800, height: 400 } },
      },
      alt: 'Tech meetup event',
    },
    author: mockAuthors[1],
    category: mockCategories[1],
    publishedAt: new Date('2026-04-18').toISOString(),
    featured: false,
    status: 'published',
    views: 456,
    seo: {
      metaDescription: 'NAISS Spring Tech Meetup - April 25. Learn from experts and network with developers.',
      keywords: ['naiss', 'meetup', 'events'],
    },
  },
];
