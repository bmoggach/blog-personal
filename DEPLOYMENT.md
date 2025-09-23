# Blog Deployment Guide

## 🚀 Steps to Deploy Your Astro Blog

### Option 1: Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - Choose "Yes" to set up and deploy
   - Select your scope (your account)
   - Link to existing project? No
   - Project name: `blog-bradleymoggach`
   - Directory: `./` (current directory)
   - Override settings? No

3. **Set up custom domain**:
   - Go to your Vercel dashboard
   - Navigate to your blog project
   - Go to Settings → Domains
   - Add `blog.bradleymoggach.com`
   - Follow DNS configuration instructions

### Option 2: Deploy to Netlify

1. **Create a GitHub repository first**:
   ```bash
   # Create a new repo on GitHub manually or using GitHub CLI
   git remote add origin https://github.com/bmoggach/blog-personal.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your blog repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Deploy!

3. **Add custom domain**:
   - Go to Site settings → Domain management
   - Add custom domain: `blog.bradleymoggach.com`

### Option 3: Static Export + CDN

1. **Build the static site**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to any static hosting:
   - AWS S3 + CloudFront
   - Google Cloud Storage + CDN
   - Azure Static Web Apps
   - GitHub Pages

## 🔧 Environment Variables

Currently, your blog doesn't require any environment variables. If you add features that need them later:

1. **For Vercel**: Add in project settings → Environment Variables
2. **For Netlify**: Add in Site settings → Environment variables
3. **For static hosting**: Use build-time variables

## 🌐 DNS Configuration

### For Subdomain (blog.bradleymoggach.com)

Add a CNAME record:
```
Type: CNAME
Name: blog
Value: [your-vercel-url].vercel.app
```

Or for Netlify:
```
Type: CNAME
Name: blog
Value: [your-site].netlify.app
```

## 📝 Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Check that blog posts render properly
- [ ] Test language selector functionality
- [ ] Verify images load
- [ ] Check mobile responsiveness
- [ ] Test all interactive elements
- [ ] Verify SEO meta tags
- [ ] Submit sitemap to Google Search Console

## 🔄 Continuous Deployment

Once connected to GitHub:
- **Vercel**: Automatically deploys on push to main
- **Netlify**: Automatically deploys on push to main
- Both support preview deployments for pull requests

## 📊 Analytics (Optional)

Consider adding:
- Google Analytics 4
- Vercel Analytics
- Plausible Analytics
- Fathom Analytics

## 🚨 Troubleshooting

### Build Failures
- Check Node version compatibility (use Node 18+)
- Ensure all dependencies are installed
- Check for TypeScript errors: `npm run astro check`

### Image Issues
- Images should be in `src/assets/` or `public/`
- Use relative paths for assets in content

### Performance
- Enable compression in hosting settings
- Use image optimization
- Consider edge caching

## 🎯 Quick Deploy to Vercel

Run this single command:
```bash
npx vercel --prod
```

Follow the prompts and your blog will be live in minutes!
