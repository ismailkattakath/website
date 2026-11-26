# Password protection

The editor pages are public by default. Setting `NEXT_PUBLIC_EDIT_PASSWORD_HASH` (a bcrypt
hash from `scripts/generate-password-hash.mjs`) at build time turns protection on; see
[`src/config/password.ts`](../../src/config/password.ts) and
[CONFIGURATION.md](../CONFIGURATION.md#3-password-protection-optional).

## What it protects against

The check runs in the browser, against a hash compiled into the static build. That deters
casual access to the editor. It is **not** access control: anyone can read the built files.
Do not put anything private in `resume.json`, and use server-side authentication when an
editor must really be private.
