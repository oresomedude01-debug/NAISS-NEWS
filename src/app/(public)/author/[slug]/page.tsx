import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostsByAuthor } from '@/lib/fetcher';
import { PostCard } from '@/components/blog/PostCard';
import { TwitterIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import { ArrowLeft, Globe, Mail, FileText } from 'lucide-react';

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { author } = await getPostsByAuthor(slug, 1, 1);
  if (!author) return { title: 'Author Not Found' };
  return {
    title: author.name,
    description: author.bio ?? `Posts by ${author.name}`,
  };
}

export const revalidate = 300;

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const { items: posts, author, total } = await getPostsByAuthor(slug, 1, 12);

  if (!author) notFound();

  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-50/30 dark:from-surface-950 dark:via-surface-950 dark:to-surface-900 pointer-events-none" />
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        <div className="relative container-page py-12 md:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {author.image?.asset?.url ? (
              <Image
                src={author.image.asset.url}
                alt={author.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-white dark:ring-surface-800 shadow-elevated shrink-0"
              />
            ) : (
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center text-white text-3xl font-bold shrink-0">
                {author.name.charAt(0)}
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-surface-900 dark:text-white mb-2">
                {author.name}
              </h1>
              {author.bio && (
                <p className="text-surface-500 dark:text-surface-400 max-w-xl mb-4">
                  {author.bio}
                </p>
              )}
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-sm text-surface-400">
                  <FileText className="w-3.5 h-3.5" />
                  {total} {total === 1 ? 'post' : 'posts'}
                </span>
                {author.socialLinks?.twitter && (
                  <a
                    href={author.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors"
                    aria-label="Twitter"
                  >
                    <TwitterIcon className="w-4 h-4 text-surface-500" />
                  </a>
                )}
                {author.socialLinks?.linkedin && (
                  <a
                    href={author.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4 text-surface-500" />
                  </a>
                )}
                {author.socialLinks?.website && (
                  <a
                    href={author.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors"
                    aria-label="Website"
                  >
                    <Globe className="w-4 h-4 text-surface-500" />
                  </a>
                )}
                {author.email && (
                  <a
                    href={`mailto:${author.email}`}
                    className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4 text-surface-500" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="container-page py-10 md:py-14">
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post as any} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg font-display font-semibold text-surface-900 dark:text-white mb-2">
              No posts yet
            </p>
            <p className="text-sm text-surface-500">
              {author.name} hasn&apos;t published any posts yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
