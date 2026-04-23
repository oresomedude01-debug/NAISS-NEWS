import { NextResponse } from 'next/server';
import { getPaginatedPosts } from '@/lib/fetcher';
import { SITE_CONFIG } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { items: posts } = await getPaginatedPosts(1, 50);
  const siteUrl = SITE_CONFIG.url;

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug.current}`;
      const pubDate = new Date(post.publishedAt).toUTCString();
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author><![CDATA[${post.author.name}]]></author>
      <category><![CDATA[${post.category.title}]]></category>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${SITE_CONFIG.name}]]></title>
    <link>${siteUrl}</link>
    <description><![CDATA[${SITE_CONFIG.description}]]></description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
