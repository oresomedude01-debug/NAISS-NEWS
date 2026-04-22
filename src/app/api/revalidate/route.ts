/**
 * API Route: ISR Revalidation Webhook
 * Called by Sanity when content changes
 * CRITICAL: Add this webhook URL to Sanity dashboard
 * 
 * Usage: https://your-site.vercel.app/api/revalidate?secret=YOUR_SECRET&slug=blog-post-slug
 */

import { revalidatePath, revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'dev-secret';

export async function POST(request: NextRequest) {
  // Verify secret for security
  const secret = request.nextUrl.searchParams.get('secret');
  
  if (secret !== REVALIDATE_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { type, slug } = await request.json();

    if (!type || !slug) {
      return new Response('Missing type or slug', { status: 400 });
    }

    // Revalidate based on content type
    switch (type) {
      case 'post':
        await revalidatePath(`/blog/${slug}`);
        await revalidatePath('/blog');
        await revalidatePath('/');
        break;
      case 'category':
        await revalidatePath(`/category/${slug}`);
        await revalidatePath('/');
        break;
      default:
        return new Response('Unknown type', { status: 400 });
    }

    return new Response(`Revalidated: ${type}/${slug}`, { status: 200 });
  } catch (error) {
    console.error('Revalidation error:', error);
    return new Response('Revalidation failed', { status: 500 });
  }
}

/**
 * TO SET UP IN SANITY:
 * 
 * 1. Go to Sanity dashboard > Webhooks
 * 2. Create new webhook:
 *    - URL: https://your-site.vercel.app/api/revalidate
 *    - Trigger on: Document mutations
 *    - Include document body: false
 * 
 * 3. In settings, add query to trigger on specific changes:
 *    ```
 *    ((_type == "post" || _type == "category")) && (mutations::delta._type != null)
 *    ```
 * 
 * 4. Set secret in Vercel environment variables as REVALIDATE_SECRET
 */
