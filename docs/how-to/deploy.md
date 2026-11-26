# Deploy to GitHub Pages

`.github/workflows/deploy.yml` builds the static export and publishes `out/` to GitHub Pages.

## When it runs

- on every push to `main`;
- by hand (**Actions → Deploy to GitHub Pages → Run workflow**), to pull the latest Gist
  without a code change;
- on a daily schedule, so Gist-only edits reach the site.

GitHub disables a scheduled workflow after a long stretch without repository activity. If the
site stops updating, check the workflow's state on the **Actions** tab and enable it again.

## First deploy

1. **Settings → Pages → Source: GitHub Actions.**
2. Push to `main`, or run the workflow by hand.

## Résumé data

`npm run download-resume-json` (also run on `npm install`) fetches the résumé from the Gist
named by `RESUME_JSON_GIST`. Without that variable it skips the download, and the tracked
`src/data/resume.json` is used.

## Project page or custom domain

The build has no `basePath`, so it expects to be served from a domain root (a custom domain).

- **Custom domain:** put the domain in `public/CNAME` (copied into `out/`), set it under
  **Settings → Pages → Custom domain**, and point a DNS `CNAME` record at
  `<owner>.github.io`.
- **Project page** (`https://<owner>.github.io/<repo>/`): uncomment `basePath` and
  `assetPrefix` in `next.config.ts`. Without them the page loads but its `/_next/` assets
  resolve against the domain root and fail.

## Other static hosts

`npm run build` writes a static site to `out/`. Any static host can serve that directory.
