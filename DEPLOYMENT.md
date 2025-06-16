# Netlify Deployment Guide

## Quick Deploy

1. **Connect Repository to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub/GitLab repository

2. **Build Settings**
   - Build command: `vite build --config vite.config.frontend.ts`
   - Publish directory: `dist`
   - Node version: `20`

3. **Deploy**
   - Netlify will automatically build and deploy your site
   - Your site will be available at `https://[site-name].netlify.app`

## Manual Build (Alternative)

If you prefer to build locally and upload:

```bash
# Run the build script
./build-netlify.sh

# Upload the /dist folder to Netlify
```

## Configuration Files

- `netlify.toml` - Netlify configuration with redirects and headers
- `_redirects` - Client-side routing support
- `vite.config.frontend.ts` - Frontend-only Vite configuration

## Features Ready for Production

- Responsive web development showcase
- Interactive pricing calculator with dual currency support
- Portfolio gallery with project showcases
- Client testimonials section
- Terms & conditions
- WhatsApp integration for client communication
- Optimized asset loading and caching
- SEO-friendly structure

The application is now fully prepared for Netlify deployment as a frontend-only static site.