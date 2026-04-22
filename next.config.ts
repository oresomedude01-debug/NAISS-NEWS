import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Suppress lockfile warning for Vercel
  outputFileTracingRoot: process.cwd(),

  // Enable React strict mode for development
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      // Sanity CDN
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      // Unsplash (for mock data images)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Optimize for cost: lower quality and reasonable dimensions
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year cache
  },

  // Cache strategy for ISR
  onDemandEntries: {
    maxInactiveAge: 60 * 60, // 1 hour
  },

  // Compression
  compress: true,

  // Powering insights
  productionBrowserSourceMaps: false,

  // Redirects and rewrites for SEO
  async redirects() {
    return [];
  },

  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },

  /**
   * Headers for CDN caching strategy
   * CRITICAL for Vercel free tier optimization
   */
  async headers() {
    return [
      {
        source: '/blog/:slug',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400', // 1 hour revalidate, 1 day stale
          },
        ],
      },
      {
        source: '/blog',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=3600', // 5 min revalidate, 1 hour stale
          },
        ],
      },
      {
        source: '/category/:slug',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=3600',
          },
        ],
      },
      {
        source: '/:path((?!api/.*))*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'sameorigin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
};

export default nextConfig;
