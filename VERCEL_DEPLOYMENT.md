# Vercel Deployment Guide

## Overview

This NAISS News Platform is optimized for deployment on **Vercel** with GitHub integration. The app uses Next.js 15 with ISR (Incremental Static Regeneration) to minimize costs while maintaining dynamic content.

## Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository** - Push this code to your GitHub account
3. **Sanity Project** (optional) - For CMS integration. The app works with mock data if Sanity isn't configured.

---

## Step 1: Push to GitHub

1. Create a new GitHub repository for this project
2. Push the code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: NAISS News Platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/NAISS-NEWS.git
   git push -u origin main
   ```

---

## Step 2: Connect Vercel to GitHub

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub repository (oresomedude01-debug/NAISS-NEWS)
4. Vercel will auto-detect this is a Next.js project
5. Click **"Import"**

---

## Step 3: Configure Environment Variables

In the Vercel project settings, add these environment variables:

### Required (for Sanity CMS)
- **`NEXT_PUBLIC_SANITY_PROJECT_ID`**
  - Get from: https://sanity.io/manage → YourProject → API
  - Format: lowercase alphanumeric + dashes (e.g., `abc123xyz`)
  - **Note:** App runs with mock data if not configured

- **`NEXT_PUBLIC_SANITY_DATASET`**
  - Value: `production`

- **`NEXT_PUBLIC_SANITY_API_VERSION`**
  - Value: `2024-01-01`

- **`NEXT_PUBLIC_SITE_URL`**
  - Value: Your production domain (e.g., `https://naiss-news.vercel.app`)

### Optional (for Sanity live preview)
- **`SANITY_API_TOKEN`**
  - Only needed if you want draft preview mode
  - Get from: Sanity → API → Tokens

### For GitHub Actions Deployment
If using automated deployment via GitHub Actions, add these secrets to your GitHub repo:
- **`VERCEL_TOKEN`** - Get from Vercel account settings
- **`VERCEL_ORG_ID`** - Your Vercel org ID
- **`VERCEL_PROJECT_ID`** - Your Vercel project ID

---

## Step 4: Deploy

### Option A: Automatic Deployment (Recommended)

Vercel will automatically:
- ✅ Deploy on every push to `main` branch
- ✅ Create preview deployments for pull requests
- ✅ Rebuild on-demand when Sanity content changes (via webhook)

**To enable Sanity webhook:**
1. In Vercel project settings, copy the **Deployment URL**
2. Go to Sanity studio → Settings → API → Webhooks
3. Add: `https://your-deployment.vercel.app/api/revalidate`
4. Events: Select "When documents are published or unpublished"
5. Secret: Create a random string and use for `SANITY_WEBHOOK_SECRET` in Vercel

### Option B: Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

---

## Deployment Checklist

- [ ] GitHub repository created and code pushed
- [ ] Vercel account created
- [ ] Repository imported to Vercel
- [ ] Environment variables configured
- [ ] First deployment successful
- [ ] Test all pages load correctly:
  - [ ] Homepage: `/`
  - [ ] Blog listing: `/blog`
  - [ ] Single post: `/blog/[slug]`
  - [ ] Categories: `/categories` & `/category/[slug]`
  - [ ] About: `/about`
  - [ ] 404 page: `/nonexistent`
- [ ] Dark mode toggle works
- [ ] Images load from CDN

---

## Architecture on Vercel

### Caching Strategy

| Page | Strategy | Revalidation |
|------|----------|--------------|
| Static Pages (404) | SSG | Infinite (edge cache) |
| Homepage | ISR | 5 minutes |
| Blog Listing | ISR | 5 minutes |
| Single Post | ISR | 1 hour |
| Categories | ISR | 1 hour |

### Cost Optimization

- **0 API calls** on cache hits (CDN serves content)
- **1 API call** per revalidation interval
- **0 serverless function costs** on static/ISR pages
- **Minimal function costs** on webhook revalidation only

### Performance Metrics

Expected on Vercel Free Tier:
- **Lighthouse** → 90+ Performance
- **First Contentful Paint** → < 1.5s
- **Time to Interactive** → < 3s
- **Cumulative Layout Shift** → < 0.1

---

## Troubleshooting

### Build Fails with "Cannot find module '@sanity/...'

**Solution:** Delete `package-lock.json` in parent directory:
```bash
rm ../package-lock.json
vercel deploy
```

### 500 Errors on Pages

**Likely Cause:** Invalid Sanity credentials

**Solution:**
1. Check `NEXT_PUBLIC_SANITY_PROJECT_ID` format (lowercase + dashes only)
2. Verify dataset exists in Sanity
3. App will fallback to mock data if Sanity unavailable

### Deployment Stuck or Timeout

**Solution:**
1. Increase Vercel function timeout:
   ```json
   // In vercel.json
   "functions": {
     "api/**/*.ts": {
       "maxDuration": 60
     }
   }
   ```
2. Check GitHub Actions logs for build errors

---

## Custom Domain Setup

1. In Vercel dashboard → Project Settings → Domains
2. Add your custom domain (e.g., `naiss-news.com`)
3. Update your domain registrar's DNS to point to Vercel:
   - **Type:** `CNAME`
   - **Name:** `www` (or `@` for root)
   - **Value:** `cname.vercel.sh`

---

## Monitoring & Analytics

Vercel provides:
- ✅ Real-time logs in dashboard
- ✅ Build performance metrics
- ✅ Function execution times
- ✅ Bandwidth usage

Monitor at [vercel.com/dashboard](https://vercel.com/dashboard)

---

## Advanced: Custom Build Script

To customize the build in Vercel, edit `.vercelignore`:

```
*.test.ts
.env.local
node_modules
.git
```

---

## Support

For deployment issues:
- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Sanity Deployment:** https://www.sanity.io/docs/deployment

