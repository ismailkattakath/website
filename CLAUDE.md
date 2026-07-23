# CLAUDE.md

Guidance for Claude Code when working in **`website`** — a JSON-Resume-driven
portfolio site. **Data-first**: one `resume.json` is the single source of truth;
the site, resume builder, and AI cover-letter generator all derive from it.

## Stack

- **Next.js 16** (App Router, **static export** → GitHub Pages) + **React 19** + **TypeScript (strict)** + **Tailwind CSS 4**.
- **AI**: on-device LLM (**Gemma 3-1B-IT via MediaPipe**, `@ismailkattakath/mediapipe-react`) for in-browser generation, plus `@google/genai`.
- **Validation** `zod` · **Tests** Jest + Testing Library (coverage-gated) · **Lint/format** ESLint + Prettier via `husky` pre-commit · **PWA** service worker (`public/sw.js`, `src/lib/pwa`) · optional password protection (`src/lib/utils/encryption.ts`).

## Build / Test / Lint

```bash
npm run dev              # Next dev server (:3000); dev:reload frees the port + clears .next
npm run build            # Static export (out/); postbuild runs next-sitemap
npm test                 # Jest (test:watch / test:coverage); npm test -- <path> for one file
npm run lint             # eslint src   (lint:fix to autofix)
npm run format           # prettier --write .   (format:check to verify)
npm run download-resume-json   # fetch resume.json from the configured Gist (also runs postinstall)
npm run sync-resume-markdown   # regenerate the markdown mirrors of resume.json
npm run deploy           # build + publish out/ to gh-pages
```

## Architecture

1. **Source**: `resume.json` (JSON Resume schema) — fetched from a Gist by `download-resume-json`.
2. **Adapter/lib**: `src/lib/` maps JSON Resume → internal types and holds logic.
3. **App**: `src/app/` renders it.

**Key directories:**
- `src/app/` — App Router routes: `/` (portfolio), `/resume`, `/resume.json` (route handler), `/book`, `/calendar`; colocated `__tests__/`.
- `src/components/` — by concern: `resume/` (builder + forms), `cover-letter/`, `document-builder/`, `sections/`, `auth/`, `layout/`, `seo/`, `ui/`, `providers/`, `onboarding/`.
- `src/lib/` — `ai/` (incl. `ai/on-device/use-on-device-llm.ts`, the MediaPipe/Gemma hook), `exporters/`, `contexts/`, `data/`, `pwa/`, `utils/`.
- `src/config/site.ts` (`SITE_URL`, …) · `src/data/` (resume data + schema) · `src/types/` (shared types).
- Deep dives: [`ARCHITECTURE.md`](ARCHITECTURE.md), [`docs/`](docs/) (FEATURES/DEVELOPMENT/CONFIGURATION), [`QUICKSTART.md`](QUICKSTART.md).

## CI / Deploy

- `.github/workflows/deploy.yml` — on push to `main`: setup → `reusable-build.yml` → `actions/deploy-pages`. Shared steps in `.github/actions/setup-project`.
- Ships a **static export** to **GitHub Pages** (`SITE_URL` in `src/config/site.ts`, sitemap via `next-sitemap.config.js`).

## Conventions

- **Naming**: `PascalCase.tsx` components, `camelCase.ts` utils, `kebab-case.ts` types.
- **Imports**: always the `@/` alias (`import { … } from '@/lib/…'`).
- **Types**: strict TS, avoid `any`; change types → adapter → components in that order.
- **Data**: NEVER edit components for content — edit `resume.json` / `src/data`.
- **Styling**: Tailwind utility classes; avoid custom CSS.
- **Tests**: colocate in `__tests__/`; keep coverage from regressing (project floor ~85%, enforced by Jest). Never bypass husky.
- **Git**: work on feature branches (`feat/`/`fix/`/`docs/`), not `main`. **Hygiene**: troubleshooting logs → `logs/`, temp scripts → `tmp/` (never repo root).
- **Env**: config/secrets in `.env.local` (see `.env.example`); the resume scripts read it via `--env-file`.

## Important notes

- **Recovered project.** Restored from a git bundle after the original `ismail-kattakath` GitHub account was deleted, then de-branded to `ismailkattakath/website`. There is **no git remote yet** — do not add or push one unless explicitly asked.
- **Build blocker**: `@ismailkattakath/mediapipe-react` (on-device-AI dep) must be **republished under the `@ismailkattakath` npm scope** before `npm ci`/`build` succeeds — it was previously the deleted `@ismail-kattakath` scope. Jest mocks: `src/__mocks__/@ismailkattakath/mediapipe-react/`.
- Custom domain (CNAME) was removed during de-branding; `SITE_URL` now points at the Pages default (`ismailkattakath.github.io/website`) — set a real domain before deploying.
