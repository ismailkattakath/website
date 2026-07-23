# CLAUDE.md

Guidance for Claude Code when working in **`website`** — a JSON-Resume-driven
portfolio site. **Data-first**: one `resume.json` is the single source of truth;
the site, resume builder, and AI cover-letter generator all derive from it.

## Stack

- **Next.js 16** (App Router, **static export** → GitHub Pages) + **React 19** + **TypeScript (strict)** + **Tailwind CSS 4**.
- **AI**: cloud generation via `@google/genai`. An on-device LLM path (Gemma 3-1B via MediaPipe) exists but its wrapper package was lost with the deleted account, so it is currently a **local no-op stub** (`src/lib/vendor/mediapipe-react/`) — on-device AI is **inert** and callers fall back to the cloud path. See "Important notes".
- **Validation** `zod` · **Tests** Jest + Testing Library (coverage-gated) · **Lint/format** ESLint + Prettier via `husky` pre-commit · **PWA** service worker (`public/sw.js`, `src/lib/pwa`) · optional password protection (`src/lib/utils/encryption.ts`).

## Build / Test / Lint

```bash
npm install              # regenerates node_modules; postinstall runs download-resume-json (no-op now — see below)
npm run dev              # Next dev server (:3000); dev:reload frees the port + clears .next
npm run build            # Static export (out/); postbuild runs next-sitemap
npm test                 # Jest (test:watch / test:coverage); npm test -- <path> for one file
npm run lint             # eslint src   (lint:fix to autofix)
npm run format           # prettier --write .   (format:check to verify)
npm run deploy           # build + publish out/ to gh-pages (no remote configured yet)
```

## Architecture

1. **Source**: `resume.json` (JSON Resume schema) — now **committed in `src/data/resume.json`** (the original source Gist was deleted). `download-resume-json` can still refresh it _if_ `RESUME_JSON_GIST` is set, but by default it's a no-op and the committed file is authoritative.
2. **Adapter/lib**: `src/lib/resume-adapter.ts` statically imports `@/data/resume.json` and maps JSON Resume → internal types (imported by ~15 modules, so the file MUST exist to build).
3. **App**: `src/app/` renders it.

**Key directories:**

- `src/app/` — App Router routes: `/` (portfolio), `/resume`, `/resume.json` (route handler), `/book`, `/calendar`; colocated `__tests__/`.
- `src/components/` — by concern: `resume/` (builder + forms), `cover-letter/`, `document-builder/`, `sections/`, `auth/`, `layout/`, `seo/`, `ui/`, `providers/`, `onboarding/`.
- `src/lib/` — `ai/` (incl. `ai/on-device/use-on-device-llm.ts`), `vendor/mediapipe-react/` (the local stub), `exporters/`, `contexts/`, `data/`, `pwa/`, `utils/`.
- `src/config/site.ts` (`SITE_URL`, …) · `src/data/` (resume data + schema) · `src/types/` (shared types).
- Deep dives: [`ARCHITECTURE.md`](ARCHITECTURE.md), [`docs/`](docs/) (FEATURES/DEVELOPMENT/CONFIGURATION), [`QUICKSTART.md`](QUICKSTART.md).

## CI / Deploy

- `.github/workflows/deploy.yml` — on push to `main`: setup → `reusable-build.yml` → `actions/deploy-pages`. Shared steps in `.github/actions/setup-project`.
- Ships a **static export** to **GitHub Pages** (`SITE_URL` in `src/config/site.ts`, sitemap via `next-sitemap.config.js`).

## Conventions

- **Naming**: `PascalCase.tsx` components, `camelCase.ts` utils, `kebab-case.ts` types.
- **Imports**: always the `@/` alias (`import { … } from '@/lib/…'`).
- **Types**: strict TS, avoid `any`; change types → adapter → components in that order.
- **Data**: NEVER edit components for content — edit `src/data/resume.json`.
- **Styling**: Tailwind utility classes; avoid custom CSS.
- **Tests**: colocate in `__tests__/`; keep coverage from regressing (project floor ~85%, enforced by Jest). Never bypass husky.
- **Git**: work on feature branches (`feat/`/`fix/`/`docs/`), not `main`. **Hygiene**: troubleshooting logs → `logs/`, temp scripts → `tmp/` (never repo root).
- **Env**: config in `.env.local` (see `.env.example`).

## Important notes (recovered project)

Restored from a git bundle after the original `ismail-kattakath` GitHub account was deleted, then de-branded to `ismailkattakath/website`. **There is no git remote yet — do not add or push one unless explicitly asked.** The project **builds** (`npm install && npm run build` → static export in `out/`). Two recovery decisions to be aware of:

- **`resume.json` restored + committed.** The source Gist (`89b610…`) died with the account; the real resume data was recovered from backup and committed to `src/data/resume.json` (un-ignored). If you ever move back to a Gist, set `RESUME_JSON_GIST`.
- **`@ismailkattakath/mediapipe-react` removed → local no-op stub.** The on-device-AI package was lost (unpublished from npm, no recoverable source, GitHub gone). It's replaced by `src/lib/vendor/mediapipe-react/{index.tsx,genai.ts}`: `MediaPipeProvider` is a passthrough and `useLlm()` reports "unavailable". To truly re-enable on-device AI, rebuild/republish that wrapper (the Gemma model file survives in Dropbox) and repoint the imports back.
- **Domain**: CNAME removed during de-branding; `SITE_URL` points at the Pages default (`ismailkattakath.github.io/website`) — set a real domain before deploying.
