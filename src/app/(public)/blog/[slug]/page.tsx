/**
 * Single Blog Post Page
 * Displays full post content with metadata and related posts
 * ISR: Revalidate every 1 hour
 */

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs, getPaginatedPosts, REVALIDATE_SINGLE_POST } from '@/lib/fetcher';
import { PortableText } from '@/components/blog/PortableText';
import { generatePostMetadata, createArticleSchema } from '@/lib/seo';
import { formatDate, getPostReadingTime } from '@/lib/utils';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const seoMeta = generatePostMetadata(post);

  return {
    title: post.title,
    description: seoMeta.description,
    openGraph: {
      title: post.title,
      description: seoMeta.description,
      images: seoMeta.image ? [{ url: seoMeta.image }] : [],
      type: 'article',
      authors: [post.author.name],
      publishedTime: post.publishedAt,
    },
  };
}

export const revalidate = REVALIDATE_SINGLE_POST;

async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = createArticleSchema(post);
  const readingTime = getPostReadingTime(post.content);

  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-blue-600">
            Blog
          </Link>
          <span>/</span>
          <Link
            href={`/category/${post.category.slug.current}`}
            className="hover:text-blue-600"
          >
            {post.category.title}
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{post.title}</span>
        </div>

        {/* Title & Meta */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-3">
              {post.author.image?.asset?.url && (
                <Image
                  src={post.author.image.asset.url}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  <Link href={`/author/${post.author.slug.current}`} className="hover:text-blue-600">
                    {post.author.name}
                  </Link>
                </p>
                <p className="text-sm flex gap-2">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>•</span>
                  <span>{readingTime}</span>
                </p>
              </div>
            </div>

            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded">
              {post.category.title}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        {post.image?.asset?.url && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.image.asset.url}
              alt={post.image.alt || post.title}
              width={1000}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          {post.content && <PortableText blocks={post.content} />}
        </div>

        {/* Bottom Meta */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Written by</p>
              <Link
                href={`/author/${post.author.slug.current}`}
                className="flex items-center gap-3 hover:text-blue-600"
              >
                {post.author.image?.asset?.url && (
                  <Image
                    src={post.author.image.asset.url}
                    alt={post.author.name}
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold">{post.author.name}</p>
                  {post.author.bio && <p className="text-sm text-gray-600 dark:text-gray-400">{post.author.bio}</p>}
                </div>
              </Link>
            </div>

            {/* Share Buttons */}
            <div className="flex gap-4">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.href : ''
                )}&text=${encodeURIComponent(post.title)}`}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-blue-500 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Share on Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.href : ''
                )}`}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-blue-500 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Share on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">More from {post.category.title}</h2>
          {/* Note: Would fetch related posts here */}
          <p className="text-gray-600 dark:text-gray-400">
            <Link href={`/category/${post.category.slug.current}`} className="text-blue-600 hover:underline">
              View all posts in {post.category.title} →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default PostPage;
