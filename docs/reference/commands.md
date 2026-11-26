# Commands

Every command is an npm script in [`package.json`](../../package.json); that file is the
source of truth.

| Command                                                | What it does                                                                       |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `npm run dev`                                          | development server on `http://localhost:3000`                                      |
| `npm run build`                                        | static export to `out/`, then the sitemap (`postbuild`)                            |
| `npm test`                                             | Jest; `npm run test:watch` and `npm run test:coverage` for watch mode and coverage |
| `npm run lint`                                         | ESLint over `src/`                                                                 |
| `npm run format:check`                                 | Prettier check (`npm run format` to fix)                                           |
| `npm run download-resume-json`                         | fetch the résumé from `RESUME_JSON_GIST` into `src/data/resume.json`               |
| `node scripts/generate-password-hash.mjs "<password>"` | bcrypt hash for `NEXT_PUBLIC_EDIT_PASSWORD_HASH`                                   |

Run one test suite with `npm test -- --testPathPatterns="<pattern>"`.
