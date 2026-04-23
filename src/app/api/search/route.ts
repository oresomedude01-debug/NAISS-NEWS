import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/services/sanity/client';
import { SEARCH_POSTS_QUERY } from '@/services/sanity/queries';
import { mockPosts } from '@/services/sanity/mock-data';

export async function GET(req: NextRequest) {
  const q = new URL(req.url).searchParams.get('q')?.trim() ?? '';

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await sanityClient.fetch(SEARCH_POSTS_QUERY, { term: `${q}*` });
    return NextResponse.json({ results: results.slice(0, 6) });
  } catch {
    const lower = q.toLowerCase();
    const results = mockPosts
      .filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.excerpt.toLowerCase().includes(lower)
      )
      .slice(0, 6);
    return NextResponse.json({ results });
  }
}
