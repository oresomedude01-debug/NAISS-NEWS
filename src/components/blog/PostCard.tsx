/**
 * Post Card Component
 * Reusable card for displaying post previews
 */

import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types';
import { formatDate, truncateText } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'large' | 'compact';
}

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  const { title, slug, excerpt, image, author, publishedAt, category } = post;
  const imageUrl = image?.asset?.url;

  if (variant === 'large') {
    return (
      <article className="group rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow dark:border-gray-800">
        <Link href={`/blog/${slug.current}`}>
          <div className="relative overflow-hidden">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={image?.alt || title}
                width={800}
                height={400}
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <div className="absolute top-3 left-3">
              <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                {category.title}
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{excerpt}</p>
            <div className="flex items-center gap-3">
              {author.image?.asset?.url && (
                <Image
                  src={author.image.asset.url}
                  alt={author.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div className="text-sm">
                <p className="font-medium">{author.name}</p>
                <p className="text-gray-500 dark:text-gray-400">{formatDate(publishedAt)}</p>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="py-4 border-b border-gray-200 dark:border-gray-800 last:border-0">
        <Link href={`/blog/${slug.current}`} className="group">
          <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors mb-1 line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {formatDate(publishedAt)} in {category.title}
          </p>
        </Link>
      </article>
    );
  }

  return (
    <article className="group rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow dark:border-gray-800">
      <Link href={`/blog/${slug.current}`}>
        <div className="relative overflow-hidden">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={image?.alt || title}
              width={400}
              height={250}
              className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>
        <div className="p-4">
          <div className="mb-2">
            <span className="inline-block text-xs font-medium text-blue-600 dark:text-blue-400">
              {category.title}
            </span>
          </div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {excerpt}
          </p>
          <div className="flex items-center gap-2 text-xs">
            {author.image?.asset?.url && (
              <Image
                src={author.image.asset.url}
                alt={author.name}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <span className="text-gray-500 dark:text-gray-400">{author.name}</span>
            <span className="text-gray-500 dark:text-gray-400">•</span>
            <span className="text-gray-500 dark:text-gray-400">{formatDate(publishedAt)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
