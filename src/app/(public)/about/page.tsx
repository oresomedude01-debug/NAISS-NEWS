/**
 * About Page
 * Information about NAISS News Platform
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

export const revalidate = 86400; // 24 hours ISR

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about NAISS News Platform and our mission',
  openGraph: {
    title: 'About NAISS News',
    description: 'Discover the story behind NAISS News Platform',
    url: `${SITE_CONFIG.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-brand-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6">
            About NAISS News
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            A modern, cost-optimized news platform built with cutting-edge web technologies
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Our Mission
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              NAISS News Platform is designed to deliver high-quality content with optimal performance
              and minimal infrastructure costs. We combine modern web technologies with intelligent
              caching strategies to provide an exceptional reading experience.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our platform demonstrates best practices in static generation, incremental regeneration,
              and CDN optimization—proving that enterprise-grade performance doesn't require expensive infrastructure.
            </p>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Frontend */}
            <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                🚀 Frontend
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="text-brand-500 mr-3">✓</span>
                  <strong>Next.js 15</strong> with App Router & TypeScript
                </li>
                <li className="flex items-center">
                  <span className="text-brand-500 mr-3">✓</span>
                  <strong>React 19</strong> for dynamic UI components
                </li>
                <li className="flex items-center">
                  <span className="text-brand-500 mr-3">✓</span>
                  <strong>Tailwind CSS 3</strong> for rapid styling
                </li>
                <li className="flex items-center">
                  <span className="text-brand-500 mr-3">✓</span>
                  <strong>Dark mode</strong> with next-themes
                </li>
              </ul>
            </div>

            {/* Backend & CMS */}
            <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                🗄️ Backend & CMS
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="text-brand-500 mr-3">✓</span>
                  <strong>Sanity CMS</strong> for content management
                </li>
                <li className="flex items-center">
                  <span className="text-brand-500 mr-3">✓</span>
                  <strong>GROQ queries</strong> for efficient data fetching
                </li>
                <li className="flex items-center">
                  <span className="text-brand-500 mr-3">✓</span>
                  <strong>CDN-optimized</strong> content delivery
                </li>
                <li className="flex items-center">
                  <span className="text-brand-500 mr-3">✓</span>
                  <strong>ISR & SSG</strong> for cost optimization
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Optimized for performance with static generation and edge caching',
              },
              {
                icon: '💰',
                title: 'Cost Efficient',
                description: 'Runs on Vercel Free tier with minimal API calls and smart revalidation',
              },
              {
                icon: '🌙',
                title: 'Dark Mode',
                description: 'Beautiful dark theme with smooth transitions and accessibility',
              },
              {
                icon: '📱',
                title: 'Responsive Design',
                description: 'Perfect experience on mobile, tablet, and desktop devices',
              },
              {
                icon: '🔍',
                title: 'SEO Optimized',
                description: 'Complete Open Graph, Twitter Cards, and JSON-LD structured data',
              },
              {
                icon: '♿',
                title: 'Accessible',
                description: 'WCAG compliant with proper semantic HTML and ARIA labels',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-xl transition-all"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cost Optimization */}
        <section className="mb-16 p-8 rounded-lg bg-gradient-to-r from-brand-50 to-accent-50 dark:from-gray-800 dark:to-gray-700 border border-brand-200 dark:border-gray-600">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
            🎯 Cost Optimization Strategy
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong className="text-gray-900 dark:text-white">Static Site Generation (SSG)</strong> for
              immutable pages and 404 error page—cached indefinitely at the edge.
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">Incremental Static Regeneration (ISR)</strong> for
              blog posts (1 hour), featured posts (5 min), and categories—enables on-demand updates without
              full rebuilds.
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">Optimized GROQ Queries</strong> with field
              projections reduce bandwidth by ~70% compared to fetching entire documents.
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">CDN-first Strategy</strong> disables
              real-time preview in production, relying on Sanity CDN for cached reads.
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">Minimal API Routes</strong> reduces
              serverless function invocations. Webhook handlers trigger on-demand regeneration only on
              content changes.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Ready to Explore?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold transition"
            >
              Read Articles
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-brand-600 text-brand-600 hover:bg-brand-50 dark:hover:bg-gray-800 font-semibold transition"
            >
              Browse Categories
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
