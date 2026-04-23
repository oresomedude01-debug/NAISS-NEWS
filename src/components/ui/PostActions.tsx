'use client';

import { useState, useEffect } from 'react';
import { Bookmark, Heart, Share2, Link as LinkIcon, Check } from 'lucide-react';

interface PostActionsProps {
  postSlug: string;
  postUrl: string;
  postTitle: string;
}

export function PostActions({ postSlug, postUrl, postTitle }: PostActionsProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const bookmarks: string[] = JSON.parse(localStorage.getItem('naiss-bookmarks') || '[]');
    const likes: string[] = JSON.parse(localStorage.getItem('naiss-likes') || '[]');
    setBookmarked(bookmarks.includes(postSlug));
    setLiked(likes.includes(postSlug));
  }, [postSlug]);

  const toggleBookmark = () => {
    const bookmarks: string[] = JSON.parse(localStorage.getItem('naiss-bookmarks') || '[]');
    const next = bookmarked
      ? bookmarks.filter((s) => s !== postSlug)
      : [...bookmarks, postSlug];
    localStorage.setItem('naiss-bookmarks', JSON.stringify(next));
    setBookmarked(!bookmarked);
  };

  const toggleLike = () => {
    const likes: string[] = JSON.parse(localStorage.getItem('naiss-likes') || '[]');
    const next = liked
      ? likes.filter((s) => s !== postSlug)
      : [...likes, postSlug];
    localStorage.setItem('naiss-likes', JSON.stringify(next));
    setLiked(!liked);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: postTitle, url: postUrl }).catch(() => null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleBookmark}
        className={`btn-ghost p-2.5 rounded-xl transition-all ${bookmarked ? 'text-brand-600 dark:text-brand-400' : ''}`}
        aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this post'}
        title={bookmarked ? 'Remove bookmark' : 'Bookmark this post'}
      >
        <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
      </button>
      <button
        onClick={toggleLike}
        className={`btn-ghost p-2.5 rounded-xl transition-all ${liked ? 'text-red-500' : ''}`}
        aria-label={liked ? 'Unlike this post' : 'Like this post'}
        title={liked ? 'Unlike this post' : 'Like this post'}
      >
        <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
      </button>
      <button
        onClick={handleShare}
        className="btn-ghost p-2.5 rounded-xl"
        aria-label="Share this post"
        title="Share this post"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export function CopyLinkButton({ postUrl }: { postUrl: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
    } catch {
      const el = document.createElement('textarea');
      el.value = postUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyLink}
      className="w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 flex items-center justify-center transition-all duration-200 hover:scale-105"
      aria-label={copied ? 'Link copied!' : 'Copy link'}
      title={copied ? 'Copied to clipboard!' : 'Copy link'}
    >
      {copied ? (
        <Check className="w-4 h-4 text-accent-500" />
      ) : (
        <LinkIcon className="w-4 h-4 text-surface-500" />
      )}
    </button>
  );
}
