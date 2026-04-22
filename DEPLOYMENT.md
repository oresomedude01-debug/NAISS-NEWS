# Deployment Guide - NAISS News Platform

## 🚀 Deploying to Vercel (Recommended)

Vercel is the official Next.js hosting platform. Free tier is perfect for NAISS with ISR support.

### Prerequisites
- GitHub account with repository pushed
- Vercel account (free) at [vercel.com](https://vercel.com)

### Step 1: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit: NAISS News Platform"
git push origin main
```

### Step 2: Create Vercel Project

**Option A: Via Vercel Dashboard** (Easiest)
1. Go to [vercel.com](https://vercel.com)
2. Sign up / Login with GitHub
3. Click "New Project"
4. Select your GitHub repository
5. Vercel auto-detects Next.js configuration
6. Click "Deploy"

**Option B: Via Vercel CLI**
```bash
npm i -g vercel
vercel
# Follow the prompts
```

### Step 3: Configure Environment Variables

In Vercel Dashboard:
1. Go to Project → Settings → Environment Variables
2. Add each variable:

```
Variable Name: NEXT_PUBLIC_SANITY_PROJECT_ID
Value: [Your Sanity Project ID]
Environments: Production, Preview, Development

Variable Name: NEXT_PUBLIC_SANITY_DATASET
Value: production
Environments: All

Variable Name: NEXT_PUBLIC_SITE_URL
Value: https://your-domain.vercel.app
Environments: Production

Variable Name: REVALIDATE_SECRET
Value: [Generate random string for webhooks]
Environments: All
```

### Step 4: Redeploy

After adding environment variables, redeploy:
```bash
vercel deploy --prod
```

### Step 5: Custom Domain (Optional)

In Vercel Dashboard:
1. Go to Project → Settings → Domains
2. Add custom domain
3. Follow DNS configuration steps
4. Wait 24-48 hours for DNS propagation

---

## 📊 Monitoring Deployment

### Check Build Status
- Vercel Dashboard → Deployments
- Shows real-time build progress
- Click deployment to see logs

### Performance Analytics
1. Go to Project → Analytics
2. Monitor:
   - **Response Time**: Should be <200ms after cache
   - **Status Codes**: 200s for cache hits
   - **Build Function Duration**: ISR requests <500ms

### View Build Logs
```bash
vercel logs [project-name]
```

---

## 🔧 Environment Variables Reference

### Required for Production

| Variable | Example | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `abc123def456` | Sanity project identifier |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Sanity dataset name |
| `NEXT_PUBLIC_SITE_URL` | `https://naiss-news.vercel.app` | Your site's public URL |

### Optional but Recommended

| Variable | Example | Purpose |
|----------|---------|---------|
| `SANITY_API_TOKEN` | `sak2_...` | For preview mode (editors only) |
| `REVALIDATE_SECRET` | Random string | Webhook authentication |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | `G_XXXXXXXXXX` | Analytics tracking |

### How to Get Sanity Credentials

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click your project
3. Go to "API" → "Credentials"
4. Copy "Project ID"

---

## 🎯 Cost Optimization Checklist

- [ ] Enable ISR (done in code automatically)
- [ ] Use Sanity CDN (`useCdn: true` in client)
- [ ] Set up automatic revalidation (300-3600s)
- [ ] Optimize images via Sanity
- [ ] Enable Vercel Analytics
- [ ] Monitor API calls in Sanity dashboard
- [ ] Set cache headers (configured in next.config.ts)

**Expected Monthly Cost: $0 (Free Tier)**

Breakdown:
- Vercel Hosting: $0/month (free tier includes 100GB bandwidth)
- Sanity CMS: $0/month (free tier includes 5 API requests/sec)
- Domain: $10-15/year (optional)

---

## 🔄 Setting Up Webhooks (Instant Updates)

When content changes in Sanity, instantly update your site without waiting 5 minutes.

### 1. Get Your Revalidation Secret

Generate a random string:
```bash
openssl rand -hex 32
# or
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add to Vercel environment variables as `REVALIDATE_SECRET`.

### 2. Create Sanity Webhook

1. Go to [sanity.io/manage](https://sanity.io/manage) → Your Project
2. Go to Settings → Webhooks → Add Webhook
3. Configure:
   - **URL**: `https://your-domain.vercel.app/api/revalidate`
   - **Events**: Select "Create", "Update" for Post & Category
   - **Include Body**: ON

### 3. Test Webhook

In Sanity, update a post → Check Vercel deployment logs → Should see revalidation

---

## 📈 Scaling Beyond Free Tier

If your site grows:

### Option 1: Upgrade Vercel Plan
- **Pro**: $20/month
  - 100GB bandwidth (vs 100GB free)
  - Priority support
  - Advanced analytics

### Option 2: Add Cloudflare CDN
```typescript
// In next.config.ts
// Cloudflare automatically caches based on headers
```

### Option 3: Upgrade Sanity Plan
- **Pro**: $99/month
  - Unlimited API requests
  - Advanced caching
  - Priority support

**For NAISS, free tiers should handle 50K-100K monthly visitors easily.**

---

## 🆘 Troubleshooting Deployment

### Build Fails with "Out of Memory"
```bash
# In Vercel Build Settings, add:
NODE_OPTIONS: --max_old_space_size=4096
```

### Environment Variables Not Loading
1. Redeploy after adding variables
2. Check variable names match code
3. Ensure correct environment selected

### ISR Not Triggering
1. Check `revalidate` value set in page
2. Monitor Vercel logs for ISR requests
3. Verify build successful

### Sanity API Returns 403
1. Check Project ID is correct
2. Verify dataset is public (not private)
3. Check Sanity API rate limits

---

## 🔒 Security Checklist

- [ ] `.env.local` added to `.gitignore`
- [ ] Sensitive tokens not in code
- [ ] Revalidate secret is random & strong
- [ ] Only public Sanity dataset exposed
- [ ] CORS headers configured (in next.config.ts)
- [ ] Rate limiting understood (Sanity free: 5 req/sec)

---

## 📝 Post-Deployment

### 1. Test Site
- [ ] Homepage loads
- [ ] Blog page works
- [ ] Post details visible
- [ ] Categories filter
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] Links not broken

### 2. Performance Check
- [ ] Run Lighthouse audit
- [ ] Check Vercel Analytics
- [ ] Verify images loading
- [ ] Check Core Web Vitals

### 3. Setup Monitoring
- [ ] Get URL notifications for errors
- [ ] Monitor build times
- [ ] Track analytics
- [ ] Set up backup strategy

### 4. Documentation
- [ ] Share deployment URL with team
- [ ] Document credentials (secure)
- [ ] Create admin access list
- [ ] Document update process

---

## 🚀 Zero-Downtime Deployments

Vercel automatically:
- Creates preview deployments for PRs
- Tests before going to production
- Keeps previous version running during deploy
- Instant rollback available

No manual downtime needed!

---

## 📚 Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/learn/basics/deploying-nextjs-app)
- [Sanity Hosting Guide](https://www.sanity.io/docs/deployment)
- [ISR Documentation](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)

---

## 💡 Pro Tips

1. **Preview Deployments**: Every GitHub PR creates a preview URL
2. **Analytics**: Use Vercel Analytics dashboard for traffic insights
3. **Auto-Scaling**: Vercel handles traffic spikes automatically
4. **CDN Edge**: Content served from nearest global edge location
5. **HTTPS**: Automatic SSL/TLS certificates

---

Happy deploying! 🎉

Questions? Check the main [README.md](README.md)
