# NAISS News Platform - Production-Ready Documentation

## 🚀 Overview

A **cost-optimized, scalable news/blog platform** built with Next.js, TypeScript, and Sanity CMS. Designed specifically for the NAISS student society with limited budgets but scalability needs.

### Key Features
- ✅ Static Site Generation (SSG) + Incremental Static Regeneration (ISR)
- ✅ SEO-optimized with JSON-LD, Open Graph, Twitter Cards
- ✅ Dark mode support with next-themes
- ✅ Mobile-first responsive design with Tailwind CSS
- ✅ Sanity CMS integration with optimized queries
- ✅ Minimal serverless function usage
- ✅ CDN-friendly caching headers
- ✅ Mock data fallback for development
- ✅ Loading skeletons for better UX
- ✅ TypeScript for type safety

---

## 📁 Project Structure

```
src/
├── app/                      # Next.js 15 App Router
│   ├── (public)/            # Public pages (homepage, blog)
│   │   ├── page.tsx         # Homepage
│   │   ├── blog/
│   │   │   ├── page.tsx     # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx # Single blog post
│   │   └── category/
│   │       └── [slug]/      # Category pages
│   ├── (dashboard)/         # Admin/editor pages (future)
│   ├── (auth)/              # Authentication pages (future)
│   ├── api/                 # API routes (minimal)
│   ├── layout.tsx           # Root layout
│   ├── not-found.tsx        # 404 page
│   └── error.tsx            # Error boundary
│
├── components/
│   ├── ui/                  # Reusable UI components
│   │   └── Skeleton.tsx     # Loading skeletons
│   ├── layout/              # Layout components
│   │   ├── Navbar.tsx       # Navigation
│   │   └── Footer.tsx       # Footer
│   └── blog/                # Blog-specific components
│       ├── PostCard.tsx     # Post card variants
│       └── PortableText.tsx # Rich text renderer
│
├── lib/
│   ├── fetcher.ts           # Optimized data fetching
│   ├── seo.ts               # SEO utilities
│   ├── utils.ts             # Helper functions
│   └── constants.ts         # Configuration constants
│
├── services/
│   └── sanity/
│       ├── client.ts        # Sanity client setup
│       ├── queries.ts       # GROQ queries (optimized)
│       └── mock-data.ts     # Fallback data
│
├── types/
│   └── index.ts             # TypeScript definitions
│
└── styles/
    └── globals.css          # Global styles

public/                        # Static assets
```

---

## ⚡ Cost Optimization Strategy

### 1. **Static Site Generation (SSG)**
- Homepage, blog listing, categories all SSG
- Deployed to Vercel CDN instantly
- Zero runtime cost for these pages

### 2. **Incremental Static Regeneration (ISR)**
```typescript
// Revalidate every 5 minutes for homepage
export const revalidate = REVALIDATE_FEATURED;

// Revalidate every 1 hour for individual posts
export const revalidate = REVALIDATE_SINGLE_POST;
```

### 3. **Optimized Sanity Queries**
- **Lean projections**: Only fetch required fields
- **CDN enabled**: `useCdn: true` in client config
- **Published documents only**: Reduces bandwidth
- **Parallel fetching**: Reduces round trips

**Example:**
```typescript
// ❌ BAD: Fetches everything including unused fields
*[_type == "post"]
  { title, slug, content, author, metadata, ... }

// ✅ GOOD: Only fetches needed fields
*[_type == "post"]
  { title, slug, excerpt, author { name, image }, publishedAt }
```

### 4. **Image Optimization**
- Use Sanity's CDN for images (not Vercel Image Optimization)
- Set `useCdn: true` on Sanity client
- Avoid heavy next/image transforms

### 5. **Minimal API Routes**
- Only use API routes when absolutely necessary
- Prefer static/ISR over dynamic rendering
- No heavy database queries on serverless

### 6. **CDN Caching Headers**
```typescript
// 1-hour revalidation, 1-day stale-while-revalidate
Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400
```

---

## 🔧 Setup Instructions

### 1. **Clone & Install**
```bash
cd NAISS-NEWS
npm install
```

### 2. **Create `.env.local`**
```bash
cp .env.local.example .env.local
```

### 3. **Configure Sanity**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 4. **Development**
```bash
npm run dev
# Open http://localhost:3000
```

### 5. **Build & Deploy**
```bash
npm run build
npm run start
```

---

## 🛠️ How to Use Sanity CMS

### Option 1: Create New Sanity Project
```bash
# Go to https://sanity.io/manage
# Create new project
# Copy Project ID to .env.local
```

### Option 2: Use Built-in Mock Data
The app includes mock data (`mock-data.ts`) for development. If Sanity isn't configured, the app automatically falls back to mock data.

---

## 📱 Pages & Routes

### Public Pages
| Route | Type | Revalidate | Purpose |
|-------|------|-----------|---------|
| `/` | SSG + ISR | 5 min | Homepage with featured posts |
| `/blog` | SSG + ISR | 5 min | Blog listing with pagination |
| `/blog/[slug]` | SSG + ISR | 1 hour | Single post page |
| `/category/[slug]` | SSG + ISR | 5 min | Posts filtered by category |
| `/404` | Static | Never | Not found page |

### Future Routes
- `/dashboard` - Editor dashboard
- `/auth/login` - Authentication
- `/api/preview` - Preview mode API

---

## 🎨 Customization

### Change Site Config
Edit [lib/constants.ts](src/lib/constants.ts):
```typescript
export const SITE_CONFIG: SiteConfig = {
  name: 'NAISS News',
  description: '...',
  url: 'https://naiss-news.vercel.app',
  // ... more config
};
```

### Modify Styling
- Colors: Edit `theme` in [tailwind.config.ts](tailwind.config.ts)
- CSS: Add custom styles to [styles/globals.css](src/styles/globals.css)
- Components: Modify React components in `src/components/`

### Add New Content Type
1. Create schema in Sanity
2. Add types to [types/index.ts](src/types/index.ts)
3. Add GROQ query to [services/sanity/queries.ts](src/services/sanity/queries.ts)
4. Create fetcher function in [lib/fetcher.ts](src/lib/fetcher.ts)
5. Use fetcher in your page/component

---

## 🚀 Deployment

### Deploy to Vercel (Recommended for Free Tier)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# - NEXT_PUBLIC_SANITY_PROJECT_ID
# - NEXT_PUBLIC_SANITY_DATASET
# - SANITY_API_TOKEN (optional)
```

### Environment at Vercel
1. Go to Project Settings
2. Go to Environment Variables
3. Add all variables from `.env.local.example`

---

## 📊 Performance Metrics

### Lighthouse Targets
- **Performance**: >90
- **Accessibility**: >95
- **Best Practices**: >95
- **SEO**: >95

### Cost Optimization Metrics
- **Build time**: <3 minutes on Vercel
- **Bundle size**: <100KB (gzipped)
- **API calls per deploy**: <10 (cached with ISR)
- **Serverless duration**: <1s (only for ISR)

---

## 🔐 Security & Best Practices

### ✅ Implemented
- Strict CSP headers (in next.config.ts)
- TypeScript strict mode
- Environment variable validation
- CORS-friendly setup
- Preview token support (for editors)

### 📋 Checklist for Production
- [ ] Update `SITE_CONFIG` with real domain
- [ ] Set up Sanity webhook for instant ISR
- [ ] Enable CDN in Sanity settings
- [ ] Configure DNS for custom domain
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit
- [ ] Set up automated backups
- [ ] Configure git hooks for pre-commit checks

---

## 🐛 Common Issues & Solutions

### Issue: "Sanity API call failed"
**Solution**: App falls back to mock data automatically. Check:
1. `.env.local` has correct project ID
2. Sanity project is active
3. Dataset exists and is public

### Issue: Images not loading
**Solution**: Ensure image URLs are from:
- Sanity CDN (`cdn.sanity.io`)
- Or added to `remotePatterns` in `next.config.ts`

### Issue: ISR not triggering
**Solution**: 
1. Check `revalidate` value is set
2. Rebuild includes ISR routes
3. Vercel logs show revalidation attempts

---

## 🎯 Next Steps & Future Enhancements

### Phase 2: Admin Dashboard
- [ ] Editor interface for managing posts
- [ ] Sanity Studio integration
- [ ] Draft preview with ISR

### Phase 3: Advanced Features
- [ ] Comments system
- [ ] Newsletter signup (Mailchimp/Substack)
- [ ] Search functionality
- [ ] User authentication
- [ ] Bookmarks/favorites
- [ ] Social sharing analytics

### Phase 4: Optimization
- [ ] Edge caching (Cloudflare)
- [ ] Advanced analytics
- [ ] Email notifications
- [ ] Webhooks for instant updates

---

## 📚 Key Technologies

| Technology | Purpose | Why |
|-----------|---------|-----|
| **Next.js 15** | Framework | ISR, SSG, optimal performance |
| **TypeScript** | Language | Type safety, better DX |
| **Sanity** | CMS | Headless, flexible, cost-effective |
| **Tailwind CSS** | Styling | Utility-first, small bundle |
| **next-themes** | Dark mode | Lightweight, persistence |
| **Vercel** | Hosting | ISR support, free tier |

---

## 🤝 Contributing

### Local Development
```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run lint       # Run ESLint
npm run type-check # Check TypeScript
```

### Code Style
- Use TypeScript for all code
- Follow existing component patterns
- Add comments for complex logic
- Test on mobile before committing

---

## 📄 License

© 2026 NAISS Student Society. All rights reserved.

---

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Contact: hello@naiss.org

---

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)