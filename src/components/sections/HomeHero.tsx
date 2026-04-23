'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Eye } from 'lucide-react';
import { Post } from '@/types';
import { formatDate } from '@/lib/utils';

interface HomeHeroProps {
  mainPost: Post;
  sidePosts: Post[];
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function SideCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay: 0.55 + index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href={`/blog/${post.slug.current}`}
        className="group flex items-center gap-3 p-3 rounded-2xl bg-white/[0.07] backdrop-blur-md hover:bg-white/[0.13] border border-white/[0.09] hover:border-white/25 transition-all duration-200"
      >
        <div className="relative w-[68px] h-[68px] rounded-xl overflow-hidden shrink-0">
          {post.image?.asset?.url ? (
            <Image
              src={post.image.asset.url}
              alt={post.title}
              fill
              sizes="68px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-900 to-accent-900" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-400 mb-1">
            {post.category.title}
          </p>
          <p className="text-sm font-semibold text-white/85 line-clamp-2 leading-snug group-hover:text-brand-300 transition-colors duration-200">
            {post.title}
          </p>
          <p className="text-[11px] text-white/35 mt-1">{formatDate(post.publishedAt)}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export function HomeHero({ mainPost, sidePosts }: HomeHeroProps) {
  const imageUrl = mainPost.image?.asset?.url;

  return (
    <section
      className="relative min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-end overflow-hidden"
      id="hero-section"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={mainPost.image?.alt || mainPost.title}
            fill
            priority
            sizes="100vw"
            className="object-cover scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface-950 via-brand-950 to-surface-950" />
        )}

        {/* Layered gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30" />
        {/* Subtle brand colour tint */}
        <div className="absolute inset-0 bg-brand-950/20" />
      </div>

      {/* ── Ambient glow ── */}
      <div className="pointer-events-none absolute top-1/3 left-[10%] w-[480px] h-[480px] bg-brand-600/12 rounded-full blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-[5%] w-[360px] h-[360px] bg-accent-600/10 rounded-full blur-[80px]" />

      {/* ── Content ── */}
      <div className="relative z-10 container-page pb-14 lg:pb-20 pt-20 lg:pt-0">
        <div className="grid lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-end">

          {/* Left — main story */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-[640px]"
          >
            {/* Badges */}
            <motion.div variants={fadeLeft} className="flex items-center flex-wrap gap-2 mb-7">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                Featured Story
              </span>
              <Link
                href={`/category/${mainPost.category.slug.current}`}
                className="px-3 py-1.5 rounded-full bg-white/[0.09] border border-white/15 text-white/65 text-xs font-medium hover:bg-white/15 hover:text-white/90 transition-all duration-200"
              >
                {mainPost.category.title}
              </Link>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="text-[2.4rem] sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-display font-bold text-white leading-[1.07] tracking-tight mb-6"
            >
              {mainPost.title}
            </motion.h1>

            {/* Excerpt */}
            {mainPost.excerpt && (
              <motion.p
                variants={fadeUp}
                className="text-white/60 text-lg leading-relaxed mb-9 line-clamp-2 max-w-[520px]"
              >
                {mainPost.excerpt}
              </motion.p>
            )}

            {/* Meta row */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5">
              {/* Author */}
              <div className="flex items-center gap-2.5">
                {mainPost.author.image?.asset?.url ? (
                  <Image
                    src={mainPost.author.image.asset.url}
                    alt={mainPost.author.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-sm">
                    {mainPost.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-white leading-none">{mainPost.author.name}</p>
                  <p className="text-xs text-white/45 mt-0.5">{formatDate(mainPost.publishedAt)}</p>
                </div>
              </div>

              {mainPost.views && (
                <span className="flex items-center gap-1.5 text-xs text-white/40">
                  <Eye className="w-3.5 h-3.5" />
                  {mainPost.views.toLocaleString()} views
                </span>
              )}

              <div className="h-8 w-px bg-white/15" />

              {/* CTA */}
              <Link
                href={`/blog/${mainPost.slug.current}`}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-surface-900 text-sm font-semibold hover:bg-brand-50 transition-all duration-200 shadow-lg shadow-black/30 hover:shadow-brand-500/20 hover:shadow-xl"
              >
                Read Article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </motion.div>

            {/* Mobile side stories */}
            {sidePosts.length > 0 && (
              <motion.div
                variants={fadeUp}
                className="mt-8 grid gap-3 lg:hidden"
                aria-label="More featured stories"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45 px-0.5">
                  More Stories
                </p>
                {sidePosts.slice(0, 2).map((post, i) => (
                  <SideCard key={post._id} post={post} index={i} />
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right — side stories */}
          {sidePosts.length > 0 && (
            <div className="hidden lg:flex flex-col gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35 mb-1 px-1">
                More Stories
              </p>
              {sidePosts.slice(0, 3).map((post, i) => (
                <SideCard key={post._id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/30 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-7 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>

      {/* ── Post count strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="absolute top-6 right-6 lg:right-8 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/50 text-xs"
      >
        <Clock className="w-3 h-3" />
        <span>Updated daily</span>
      </motion.div>
    </section>
  );
}
