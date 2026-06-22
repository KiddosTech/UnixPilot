# Cloudflare Pages Deployment

This guide explains how to deploy UnixPilot website to Cloudflare Pages.

## Prerequisites

- Cloudflare account (free tier is fine)
- GitHub repository pushed with this code
- `wrangler` CLI (optional, for advanced control)

## Deployment Steps

### Option 1: GitHub Integration (Recommended)

1. **Connect GitHub to Cloudflare Pages:**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com)
   - Click "Connect to Git"
   - Select your GitHub repository `KiddosTech/UnixPilot`
   - Authorize Cloudflare

2. **Configure Build Settings:**
   - Project name: `unixpilot`
   - Production branch: `main`
   - Framework: None
   - Build command: (leave empty)
   - Build output directory: `/` (root)
   
   > **Note:** Static files in the `web/` folder are served at the root via `_redirects` rewrite rules. No build step needed.

3. **Add Environment Variables (Optional):**
   - Skip for now; no environment variables needed

4. **Deploy:**
   - Click "Save and Deploy"
   - Wait for deployment to complete
   - Your site is live at `https://unixpilot.pages.dev`

### Option 2: Wrangler CLI

```bash
# Install wrangler
npm install -g @cloudflare/wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy --project-name=unixpilot
```

## Verification

After deployment, verify:

1. **Website loads:**
   ```bash
   curl https://unixpilot.pages.dev
   ```

2. **Marketplace JSON is accessible:**
   ```bash
   curl https://unixpilot.pages.dev/marketplace.json
   ```

3. **Assets serve correctly:**
   ```bash
   curl https://unixpilot.pages.dev/assets/logo.svg
   ```

## Custom Domain (Optional)

To use `unixpilot.dev` instead of `unixpilot.pages.dev`:

1. Go to Cloudflare Pages project settings
2. Click "Custom Domains"
3. Add your custom domain
4. Update DNS records per Cloudflare instructions

## DNS Records for Custom Domain

If using a custom domain, add these DNS records to your registrar:

```
Type  Name            Content
CNAME unixpilot       unixpilot.pages.dev
```

## Auto-Deploy on Push

Every push to `main` branch automatically redeploys:
- `git push origin main` → Cloudflare deploys within 1–2 minutes

## Troubleshooting

**Marketplace JSON returns 404:**
- Verify `marketplace.json` exists in repo root
- Check Cloudflare Pages build logs for errors

**Website shows 404:**
- Ensure `index.html` exists in repo root
- Check Pages build output directory setting

**Assets not loading:**
- Verify `assets/` folder structure is correct
- Check asset paths in HTML (should be relative: `/assets/logo.svg`)

## Website Architecture

The website uses a **modular JavaScript framework** with ES6 modules:

```
web/
├── index.html              ← HTML entry point
├── styles.css              ← Global styles (extracted from HTML)
├── robots.txt              ← SEO robots configuration
└── js/
    ├── main.js             ← Main initialization (ES6 module)
    ├── clipboard.js        ← Copy-to-clipboard utilities
    └── navigation.js       ← Navigation and scroll utilities
```

**Key features:**
- ✅ Modular ES6 imports (`import`/`export`)
- ✅ Separated concerns (HTML, CSS, JS)
- ✅ Copy-to-clipboard with toast notifications
- ✅ Smooth scroll navigation
- ✅ Keyboard shortcuts (Ctrl+Shift+C to copy)
- ✅ SEO optimized (robots.txt, meta tags)
- ✅ No build step required (pure static assets)

## Files Served on Production

Cloudflare Pages serves these files at `unixpilot.pages.dev/`:

```
unixpilot.pages.dev/
├── index.html              ← Served from web/index.html via _redirects
├── styles.css              ← Served from web/styles.css via _redirects
├── robots.txt              ← Served from web/robots.txt via _redirects
├── marketplace.json        ← Plugin marketplace descriptor (root)
├── js/                     ← JavaScript modules via _redirects
│   ├── main.js
│   ├── clipboard.js
│   └── navigation.js
├── assets/
│   ├── logo.svg
│   └── icon.svg
└── ... (other config files not served)
```

**Routing:** The `_redirects` file transparently rewrites all requests to the `web/` folder — users see clean URLs (`/index.html`, not `/web/index.html`).
