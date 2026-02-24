# 🚀 Deployment Guide: Khizar Rao Portfolio

This project is optimized for high-performance deployment on **Vercel** (recommended) or **Netlify**. Follow these steps to get your site live in minutes.

---

## 1. Prepare for Deployment
Ensure your latest changes are saved and the project builds successfully.

### Build Test
Run this command to verify there are no errors:
```bash
npm run build
```

---

## 2. Push to GitHub (Required for Vercel/Netlify)
Cloud platforms deploy directly from your repository to enable "Push to Deploy" (automatic updates).

1. **Initialize Git** (if not already done):
   ```bash
   git init
   ```
2. **Add Files**:
   ```bash
   git add .
   ```
3. **Commit**:
   ```bash
   git commit -m "feat: initial portfolio release"
   ```
4. **Create a GitHub Repo** and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

---

## 3. Deploy to Vercel (Recommended)
Vercel is the creator of Next.js and provides the best performance and easiest setup.

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **"Add New"** > **"Project"**.
3. Import your GitHub repository.
4. **Settings**:
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Click **"Deploy"**.

Your site will be live at `your-repo-name.vercel.app`.

---

## 4. Deploy to Netlify
Great alternative with excellent free-tier features.

1. Go to [netlify.com](https://app.netlify.com/start) and sign in.
2. Click **"Add new site"** > **"Import an existing project"**.
3. Select **GitHub** and authorize your repo.
4. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click **"Deploy site"**.

---

## 5. Static Export (Optional)
If you want to host on **GitHub Pages** or a static-only provider:

1. Open `next.config.ts` and update it:
   ```typescript
   const nextConfig = {
     output: 'export', // Add this line
     images: { unoptimized: true } // Required for static export
   };
   ```
2. Run `npm run build`.
3. Your static files will be in the **`out/`** folder.
4. Upload the contents of `out/` to any static host.

---

## 📄 Final Checklist
- [ ] Replace placeholder PDFs in `/public/assets/` with your actual CV/Resume.
- [ ] Verify your Formspree ID is correctly set in `src/components/Contact.tsx`.
- [ ] Update your LinkedIn and GitHub URLs in the same file.

**Need help?** Contact Khizar at [khizarraoworks@gmail.com](mailto:khizarraoworks@gmail.com)
