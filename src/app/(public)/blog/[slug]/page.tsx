import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/fetcher';
import { PortableText } from '@/components/blog/PortableText';
import { PostCard } from '@/components/blog/PostCard';
import { generatePostMetadata, createArticleSchema } from '@/lib/seo';
import { formatDate, getPostReadingTime, slugify } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { PostActions, CopyLinkButton } from '@/components/ui/PostActions';
import { ReadingProgress } from '@/components/ui/ReadingProgress';
import { TableOfContents, TocHeading } from '@/components/ui/TableOfContents';
import { Comments } from '@/components/ui/Comments';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Eye,
  ChevronRight,
} from 'lucide-react';
import { TwitterIcon, LinkedinIcon } from '@/components/ui/SocialIcons';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: 'Post Not Found' };

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

export const revalidate = 3600;

function extractHeadings(content: any[]): TocHeading[] {
  if (!Array.isArray(content)) return [];
  return content
    .filter((b) => b._type === 'block' && ['h2', 'h3'].includes(b.style ?? ''))
    .map((b) => {
      const text = (b.children ?? []).map((c: any) => c.text ?? '').join('');
      return {
        id: slugify(text),
        text,
        level: b.style === 'h2' ? 2 : 3,
      };
    })
    .filter((h) => h.text.length > 0);
}

async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    getPostBySlug(slug),
    getPostBySlug(slug).then((p) =>
      p ? getRelatedPosts(p.category.slug.current, slug, 3) : []
    ),
  ]);

  if (!post) notFound();

  const articleSchema = createArticleSchema(post);
  const readingTime = getPostReadingTime(post.content);
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${slug}`;
  const headings = extractHeadings(post.content);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <ReadingProgress />

      <div className="pb-20 md:pb-0">
        {/* ═══════ BREADCRUMB ═══════ */}
        <div className="container-page pt-6" id="post-breadcrumb">
          <nav className="flex items-center gap-1.5 text-xs text-surface-500 overflow-x-auto scrollbar-none">
            <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors shrink-0">Home</Link>
            <ChevronRight className="w-3 h-3 shrink-0 opacity-40" />
            <Link href="/blog" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors shrink-0">Blog</Link>
            <ChevronRight className="w-3 h-3 shrink-0 opacity-40" />
            <Link href={`/category/${post.category.slug.current}`} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors shrink-0">
              {post.category.title}
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0 opacity-40" />
            <span className="text-surface-900 dark:text-surface-300 truncate">{post.title}</span>
          </nav>
        </div>

        {/* ═══════ ARTICLE HEADER ═══════ */}
        <article className="container-narrow pt-8 md:pt-12" id="post-article">
          <header className="mb-8 md:mb-10">
            <Link
              href={`/category/${post.category.slug.current}`}
              className="badge-brand mb-5 inline-flex hover:bg-brand-200 dark:hover:bg-brand-800/50 transition-colors"
            >
              {post.category.title}
            </Link>

            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-display font-bold text-surface-900 dark:text-white leading-[1.15] mb-6" id="post-title">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg md:text-xl text-surface-500 dark:text-surface-400 leading-relaxed mb-8 max-w-2xl">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-8 border-b border-surface-200 dark:border-surface-800">
              <div className="flex items-center gap-3.5">
                {post.author.image?.asset?.url ? (
                  <Image
                    src={post.author.image.asset.url}
                    alt={`Profile photo of ${post.author.name}`}
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-surface-100 dark:ring-surface-800"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center text-white font-bold">
                    {post.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-surface-900 dark:text-white text-sm">{post.author.name}</p>
                  <div className="flex items-center gap-3 text-xs text-surface-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="w-0.5 h-0.5 bg-current rounded-full" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {readingTime}
                    </span>
                    {post.views && (
                      <>
                        <span className="w-0.5 h-0.5 bg-current rounded-full" />
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views.toLocaleString()} views
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Interactive Quick Actions */}
              <PostActions
                postSlug={slug}
                postUrl={postUrl}
                postTitle={post.title}
              />
            </div>
          </header>

          {/* ═══════ FEATURED IMAGE ═══════ */}
          {post.image?.asset?.url && (
            <div className="mb-10 md:mb-14 -mx-4 sm:mx-0" id="post-image">
              <div className="relative aspect-[16/9] rounded-none sm:rounded-3xl overflow-hidden">
                <Image
                  src={post.image.asset.url}
                  alt={post.image.alt ? `Featured image: ${post.image.alt}` : `Featured image for article: ${post.title}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              {post.image.alt && (
                <p className="text-center text-xs text-surface-400 mt-3 italic px-4">{post.image.alt}</p>
              )}
            </div>
          )}

          {/* ═══════ ARTICLE CONTENT ═══════ */}
          <div className="max-w-[680px] mx-auto" id="post-content">
            {/* Table of Contents */}
            {headings.length >= 2 && <TableOfContents headings={headings} />}

            {post.content && <PortableText blocks={post.content} />}
          </div>

          {/* ═══════ SHARE BAR ═══════ */}
          <div className="max-w-[680px] mx-auto mt-14 pt-8 border-t border-surface-200 dark:border-surface-800" id="post-share">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-surface-400 mb-3">Written by</p>
                <Link href={`/author/${post.author.slug.current}`} className="flex items-center gap-3.5 group">
                  {post.author.image?.asset?.url ? (
                    <Image
                      src={post.author.image.asset.url}
                      alt={`Profile photo of ${post.author.name}`}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-surface-100 dark:ring-surface-800 group-hover:ring-brand-300 dark:group-hover:ring-brand-700 transition-all"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
                      {post.author.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-display font-semibold text-surface-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {post.author.name}
                    </p>
                    {post.author.bio && (
                      <p className="text-xs text-surface-500 mt-0.5 line-clamp-1">{post.author.bio}</p>
                    )}
                  </div>
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-surface-400 mr-2">Share</span>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`}
                  className="w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 flex items-center justify-center transition-all duration-200 hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                >
                  <TwitterIcon className="w-4 h-4 text-surface-500" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                  className="w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 flex items-center justify-center transition-all duration-200 hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4 text-surface-500" />
                </a>
                <CopyLinkButton postUrl={postUrl} />
              </div>
            </div>
          </div>

          {/* ═══════ BACK LINK ═══════ */}
          <div className="max-w-[680px] mx-auto mt-10">
            <Link href="/blog" className="btn-outline rounded-xl text-sm inline-flex" id="back-to-blog">
              <ArrowLeft className="w-4 h-4" />
              Back to all posts
            </Link>
          </div>

          {/* ═══════ COMMENTS ═══════ */}
          <div className="max-w-[680px] mx-auto mt-16 pt-8 border-t border-surface-200 dark:border-surface-800" id="post-comments">
            <h2 className="text-xl font-display font-bold text-surface-900 dark:text-white mb-6">
              Discussion
            </h2>
            <Comments slug={slug} />
          </div>
        </article>

        {/* ═══════ RELATED POSTS ═══════ */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 section-sm relative" id="related-posts">
            <div className="absolute inset-0 bg-gradient-to-b from-surface-50/50 to-transparent dark:from-surface-900/30 dark:to-transparent pointer-events-none" />
            <div className="relative container-page">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-bold text-surface-900 dark:text-white">
                  More from {post.category.title}
                </h2>
                <Link href={`/category/${post.category.slug.current}`} className="btn-ghost text-sm">
                  View all
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((rp) => (
                  <PostCard key={rp._id} post={rp as any} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default PostPage;
