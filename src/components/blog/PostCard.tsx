/**
 * Premium Post Card Component
 * Card-based layout with hover elevation, image zoom, and subtle animations
 * Variants: featured (hero), default (grid), compact (sidebar)
 */

import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types';
import { formatDate, formatRelativeDate } from '@/lib/utils';
import { Clock, Eye, ArrowUpRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
  variant?: 'featured' | 'default' | 'compact' | 'horizontal';
  priority?: boolean;
}

export function PostCard({ post, variant = 'default', priority = false }: PostCardProps) {
  const { title, slug, excerpt, image, author, publishedAt, category, views } = post;
  const imageUrl = image?.asset?.url;

  // ── FEATURED (Hero) Card ──
  if (variant === 'featured') {
    return (
      <article className="group relative overflow-hidden rounded-3xl" id={`post-featured-${slug.current}`}>
        <Link href={`/blog/${slug.current}`} className="block">
          {/* Image */}
          <div className="relative aspect-[16/9] md:aspect-[2.2/1] overflow-hidden rounded-3xl">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={image?.alt || title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-100 to-accent-100 dark:from-brand-950 dark:to-accent-950" />
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Content on image */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <div className="max-w-2xl">
                <span className="badge-brand mb-3">
                  {category.title}
                </span>
                <h2 className="text-2xl md:text-4xl lg:text-display-lg font-display font-bold text-white mb-3 leading-tight">
                  {title}
                </h2>
                <p className="text-white/80 text-sm md:text-base mb-5 line-clamp-2 max-w-xl">
                  {excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2.5">
                    {author.image?.asset?.url ? (
                      <Image
                        src={author.image.asset.url}
                        alt={author.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-white/30"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">
                        {author.name.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm font-medium text-white/90">
                      {author.name}
                    </span>
                  </div>
                  <span className="w-1 h-1 bg-white/40 rounded-full" />
                  <span className="text-sm text-white/60">
                    {formatDate(publishedAt)}
                  </span>
                  {views && (
                    <>
                      <span className="w-1 h-1 bg-white/40 rounded-full" />
                      <span className="text-sm text-white/60 flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> {views.toLocaleString()}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // ── HORIZONTAL Card ──
  if (variant === 'horizontal') {
    return (
      <article className="group card-interactive rounded-2xl overflow-hidden" id={`post-h-${slug.current}`}>
        <Link href={`/blog/${slug.current}`} className="flex flex-row gap-0">
          {/* Image */}
          <div className="relative w-32 sm:w-40 md:w-48 shrink-0 overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={image?.alt || title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="200px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-950 dark:to-accent-950" />
            )}
          </div>
          {/* Content */}
          <div className="flex-1 p-4 md:p-5 flex flex-col justify-center min-h-[120px]">
            <span className="text-2xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-1.5">
              {category.title}
            </span>
            <h3 className="text-base font-display font-bold text-surface-900 dark:text-white mb-1.5 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-surface-500 dark:text-surface-500">
              <span>{author.name}</span>
              <span className="w-0.5 h-0.5 bg-current rounded-full" />
              <span>{formatRelativeDate(publishedAt)}</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // ── COMPACT Card ──
  if (variant === 'compact') {
    return (
      <article className="group py-4 first:pt-0 last:pb-0" id={`post-compact-${slug.current}`}>
        <Link href={`/blog/${slug.current}`} className="flex items-start gap-4">
          {imageUrl && (
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
              <Image
                src={imageUrl}
                alt={image?.alt || title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="80px"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <span className="text-2xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {category.title}
            </span>
            <h3 className="text-sm font-display font-bold text-surface-900 dark:text-white mt-1 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {title}
            </h3>
            <p className="text-xs text-surface-500 mt-1.5">
              {formatRelativeDate(publishedAt)}
            </p>
          </div>
        </Link>
      </article>
    );
  }

  // ── DEFAULT (Grid) Card ──
  return (
    <article className="group card-interactive rounded-2xl overflow-hidden flex flex-col" id={`post-${slug.current}`}>
      <Link href={`/blog/${slug.current}`} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={image?.alt || title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-950 dark:to-accent-950" />
          )}
          {/* Category badge on image */}
          <div className="absolute top-3 left-3">
            <span className="badge-brand backdrop-blur-sm bg-brand-100/90 dark:bg-brand-900/80">
              {category.title}
            </span>
          </div>
          {/* Hover arrow */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-surface-900/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
            <ArrowUpRight className="w-4 h-4 text-surface-700 dark:text-surface-300" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-lg font-display font-bold text-surface-900 dark:text-white mb-2 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-surface-500 dark:text-surface-400 mb-4 line-clamp-2 flex-1">
            {excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-surface-100 dark:border-surface-800/50">
            <div className="flex items-center gap-2.5">
              {author.image?.asset?.url ? (
                <Image
                  src={author.image.asset.url}
                  alt={author.name}
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full object-cover"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center text-white text-2xs font-bold">
                  {author.name.charAt(0)}
                </div>
              )}
              <span className="text-xs font-medium text-surface-600 dark:text-surface-400">
                {author.name}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-surface-400">
              <Clock className="w-3 h-3" />
              <span>{formatRelativeDate(publishedAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
