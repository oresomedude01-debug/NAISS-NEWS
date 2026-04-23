'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { MessageSquare } from 'lucide-react';

interface CommentsProps {
  slug: string;
}

const REPO = process.env.NEXT_PUBLIC_GISCUS_REPO || '';
const REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '';
const CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'General';
const CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '';

export function Comments({ slug }: CommentsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!ref.current || !REPO || !REPO_ID) return;

    ref.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', REPO);
    script.setAttribute('data-repo-id', REPO_ID);
    script.setAttribute('data-category', CATEGORY);
    script.setAttribute('data-category-id', CATEGORY_ID);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', resolvedTheme === 'dark' ? 'dark' : 'light');
    script.setAttribute('data-lang', 'en');

    ref.current.appendChild(script);
  }, [slug, resolvedTheme]);

  if (!REPO || !REPO_ID) {
    return (
      <div className="rounded-2xl border border-dashed border-surface-300 dark:border-surface-700 p-8 text-center">
        <MessageSquare className="w-8 h-8 text-surface-300 dark:text-surface-600 mx-auto mb-3" />
        <p className="text-sm text-surface-500 font-medium">Comments coming soon</p>
        <p className="text-xs text-surface-400 mt-1">
          Configure <code className="font-mono bg-surface-100 dark:bg-surface-800 px-1 rounded">NEXT_PUBLIC_GISCUS_*</code> env vars to enable Giscus.
        </p>
      </div>
    );
  }

  return <div ref={ref} />;
}
