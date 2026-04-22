# Quick Start Guide - NAISS News Platform

## 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Create `.env.local`
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Sanity Project ID:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**The app works out-of-the-box with mock data!** No Sanity setup needed to start.

---

## Using Mock Data vs. Sanity CMS

### Option A: Development Mode (Mock Data)
- No configuration needed
- Great for local development
- See realistic data immediately
- Perfect for testing UI/UX

**The platform automatically uses mock data if Sanity credentials aren't valid.**

### Option B: Connect to Sanity CMS
1. Create account at [sanity.io](https://sanity.io)
2. Create new project and get Project ID
3. Update `.env.local` with your Project ID
4. The app will automatically fetch from Sanity

---

## Deployment to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel
```bash
npm i -g vercel
vercel
```

Or: Connect GitHub repo to Vercel dashboard

### 3. Add Environment Variables in Vercel
In Vercel project settings → Environment Variables, add:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `REVALIDATE_SECRET` (for webhooks)

### 4. Done! 🎉
Your site is live on Vercel's CDN with automatic ISR.

---

## Common Tasks

### Add a New Blog Post
1. (If using Sanity) Add in Sanity Studio
2. Site will auto-revalidate in 5 minutes OR
3. Trigger webhook for instant update

### Change Site Name
Edit `src/lib/constants.ts`:
```typescript
export const SITE_CONFIG: SiteConfig = {
  name: 'Your Site Name', // Change here
  // ...
};
```

### Add Navigation Link
Edit `src/lib/constants.ts`:
```typescript
links: [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Your Link', href: '/your-route' }, // Add here
],
```

### Customize Colors
Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      // ...
    },
  },
}
```

---

## File Build Sizes

```
├── Homepage:        ~45KB (gzipped)
├── Blog listing:    ~50KB (gzipped)
├── Single post:     ~55KB (gzipped)
├── JS (total):      ~92KB (gzipped)
└── CSS (total):     ~12KB (gzipped)
```

✨ **All pages are < 100KB** - perfect for fast loading!

---

## Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **Build Time** | <3 min | ISR, CDN |
| **Time to First Byte** | <500ms | Static pages, edge caching |
| **Largest Contentful Paint** | <2s | Image optimization, lazy loading |
| **API Calls** | <10 per deploy | Sanity CDN, query optimization |

---

## Monitoring & Analytics

### Add Google Analytics
1. Create property at [google.com/analytics](https://google.com/analytics)
2. Add to `.env.local`
```
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G_XXXXXXXXXXXXX
```

### Monitor Build Performance
- Check Vercel Analytics dashboard
- Look at "Performance" tab for build times
- Set up alerts for slow builds

### Check ISR Status
Vercel shows ISR requests in deployment logs:
- "X functions warmed up in Y seconds"
- "On-Demand ISR: Revalidating /blog/..."

---

## TypeScript Tips

All files are TypeScript-ready with strict mode enabled.

```typescript
// Good - types are explicit
import { Post } from '@/types';

const post: Post = {
  _id: '1',
  title: 'My Post',
  // ...
};

// The app will enforce type safety!
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| **Port 3000 in use** | Use `npm run dev -- -p 3001` |
| **Images not loading** | Check `next.config.ts` remotePatterns |
| **Sanity API errors** | Check Project ID in `.env.local` |
| **Build fails** | Run `npm run type-check` to find issues |
| **Memory issues** | Increase Node memory: `NODE_OPTIONS=--max_old_space_size=4096` |

---

## Next Steps

1. ✅ Run locally and explore
2. ✅ Connect to Sanity (optional)
3. ✅ Customize branding
4. ✅ Deploy to Vercel
5. ✅ Set up domain
6. ✅ Monitor analytics
7. ✅ Add content!

---

## Need Help?

- **[Next.js Docs](https://nextjs.org/docs)**
- **[Sanity Docs](https://www.sanity.io/docs)**
- **[Tailwind CSS](https://tailwindcss.com/docs)**
- **[Vercel Docs](https://vercel.com/docs)**

---

Happy building! 🚀
