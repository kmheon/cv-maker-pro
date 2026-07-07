# CV Maker Pro — Roadmap & Feature Backlog

Companion to `BUILD_DOCUMENTATION.md`. This is a prioritized backlog written so a developer or an AI coding assistant can pick any single item and implement it without needing the rest of this document explained first — each item names the exact files involved.

Whenever you ship something from this list: move it to "Shipped", add an entry to `src/version.js` (`CHANGELOG` + bump `APP_VERSION`), and update `BUILD_DOCUMENTATION.md` if it changes the architecture, data model, or API.

---

## How to Prioritize

Rough order of what unlocks the most value per effort, if you don't already have your own priorities:

1. **Accounts / authentication** (§1) — almost everything else about "online CV" gets meaningfully better once users can log in.
2. **Real database** (§2) — needed before any real traffic; low effort if done early.
3. **Better PDF export / print styles** (§4) — highest-visibility quality issue for a resume tool.
4. **Real ad SDK integration** (§6) — needed before this can actually make money from the premium-unlock flow.
5. Everything else, roughly in the order listed.

---

## 1. Accounts & Authentication

**Why:** currently "ownership" of a published CV is just an `editToken` in one browser's `localStorage`. Losing that browser/clearing storage = losing the ability to update or even find your published CV again. Real accounts fix this and open the door to "my CVs" dashboards, multiple resumes per user, etc.

**Suggested approach:**
- Add an `auth` module to `server/`: email+password (bcrypt) or magic-link email sign-in — either avoids needing OAuth app registrations to get started.
- New table/collection `users(id, email, password_hash, created_at)`.
- `cvs` records gain a `user_id` column (nullable, for backward compatibility with anonymous published CVs).
- New endpoints: `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`.
- Session via signed httpOnly cookie (`cookie-session` or `express-session`) — simplest to add to the existing Express app.
- Frontend: new `AuthModal` (mirrors `PublishModal.jsx`'s structure), a `GET /api/cv/mine` endpoint + a "My CVs" screen listing all of a user's published CVs (replacing the current single-CV-per-browser assumption in `PublishModal.jsx`).
- **Do this before or alongside §2** — schema changes are easier to make together.

---

## 2. Real Database (replace flat JSON files)

**Why:** `server/data/*.json` (see `BUILD_DOCUMENTATION.md` §7.4) doesn't scale past light personal use — no concurrent-write safety, no querying, no backups beyond copying files.

**Suggested approach:**
- Pick Postgres (via `pg` + something light like `postgres.js`, or an ORM like Prisma/Drizzle) or, for the absolute lowest-effort upgrade, SQLite (`better-sqlite3`) if you want to stay single-file/serverless-friendly.
- Only `server/index.js`'s four route handlers need their file I/O swapped for DB calls — request/response shapes stay identical, so the frontend needs zero changes.
- Schema suggestion is already in `BUILD_DOCUMENTATION.md` §7.4.
- Add a `scripts/migrate.js` (or use your ORM's migration tool) rather than hand-editing the DB.

---

## 3. Multiple CVs Per User

**Depends on:** §1 (accounts).

- `cvs` table gains a user-facing `title` field ("Marketing Resume", "Tech Resume", etc.).
- New "My CVs" page in the frontend: list, duplicate, delete, rename.
- `PublishModal.jsx` needs to become "save as new" vs "update this one" instead of the current single-slot `localStorage['cv-maker-published']` assumption.

---

## 4. Better PDF Export

**Files:** `src/utils/exportPdf.js`

Current implementation: single `html2canvas` screenshot of `#cv-preview` dropped into one continuous image in a `jspdf` doc. Known weak spots:
- Long resumes don't paginate — content can get visually cut across what should be page breaks.
- No print-specific styling — the on-screen layout is used as-is for the "page."

**Suggested approach:**
- Add CSS `@media print` rules (or a dedicated print-mode class toggled during export) to each template for sensible page-break behavior (`break-inside: avoid` on cards/sections).
- Slice the `html2canvas` output into multiple A4-height segments before adding pages to the `jspdf` doc (common pattern: render at high scale, then loop `pdf.addPage()` while copying image slices).
- Consider offering a "Letter vs A4" size toggle in the export button.

---

## 5. Custom Domains / Vanity Slugs for Published CVs

**Files:** `server/index.js`, `src/shared/PublishModal.jsx`

Currently links are `/cv/<12-char-hex>`. Nicer: let users choose a slug (`/cv/alex-johnson`) if available.
- Add a `slug` column (unique), fall back to the random id if the user doesn't set one or it's taken.
- `PublishModal.jsx` gets an optional text input with an availability check (`GET /api/cv/check-slug/:slug`).

---

## 6. Real Ad Network Integration

**Files:** `src/shared/AdUnlockModal.jsx` (read the comment block at the top first — it already documents this exact task)

Currently the "watch an ad to unlock" flow is fully functional but simulated (a 15-second timer). To go live:
- Pick an ad network with a web rewarded-ad product (Google Ad Manager rewarded web ads, or a mediation SDK).
- Replace the `setInterval` countdown in `AdUnlockModal.jsx`'s effect with a call to that SDK's "show rewarded ad" method.
- Only call `onComplete()` from the SDK's reward-confirmed callback — never optimistically.
- Consider server-side reward verification (server-to-server callback) if the ad network supports it, so unlock state could eventually live server-side instead of just in `localStorage['cv-maker-unlocked-templates']` (`src/context/usePremiumUnlock.js`) — otherwise a user clearing browser storage loses their unlocked templates.

---

## 7. AI-Powered Resume Import (upgrade from heuristic parsing)

**Files:** `server/lib/parseResume.js`, `server/index.js` (`/api/parse-resume` route)

Current parser (`BUILD_DOCUMENTATION.md` §7.3) is regex/keyword-based — works reasonably on simple, traditional resume layouts, struggles with multi-column designs, unconventional section names, or scanned/image PDFs.

**Suggested approach:**
- Keep the existing extraction step (`pdf-parse` / `mammoth` → raw text) as-is.
- Replace or augment `parseResumeText()` with a call to an LLM (e.g. the Anthropic API) given the extracted text, prompted to return the exact `cvData` shape as JSON (see the shape in `BUILD_DOCUMENTATION.md` §5). This handles unusual layouts far better than regexes.
- Fall back to the existing heuristic parser if no API key is configured, so the feature still works out of the box without requiring an API key — keep both code paths.
- For scanned/image-only PDFs, add an OCR step (e.g. `tesseract.js`) before text extraction, only triggered when `pdf-parse` returns near-empty text.

---

## 8. AI-Powered Content Suggestions

**New feature**, no existing file to anchor to — would likely live as a new panel/button inside `src/editor/EditorPanel.jsx`, calling a new `/api/ai/*` route.

Ideas:
- "Improve this summary" / "Improve this bullet point" buttons next to relevant text fields, calling an LLM to rewrite for clarity/impact.
- "Suggest skills based on my experience" — analyze `cvData.experience` and propose additions to `cvData.skills`.
- Keep these as explicit opt-in buttons (never auto-rewrite silently), and always let the user preview/accept/reject before applying, consistent with how resume import already surfaces a "please review" prompt rather than silently overwriting.

---

## 9. Template System Improvements

**Files:** `src/templates/*`

- **More templates.** Follow the checklist below — the registry (`src/templates/index.js`) and shared components (`src/shared/*`) already make this close to copy-paste.
- **Live template switching without data loss** already works (all templates read the same `cvData` shape) — worth adding a quick "compare templates side-by-side" preview mode if users ask for it.
- **Wire up `skill.color`** (currently unused, see `BUILD_DOCUMENTATION.md` §9.5) — e.g. tint each skill's progress bar / icon background by its `color` field instead of every template hardcoding one accent color.
- **Custom color themes per template** — let users pick an accent color instead of each template having one fixed palette.

### Checklist for adding a new template
1. `src/templates/YourTemplate/index.jsx` — accept exactly `{ cvData, darkMode, setDarkMode }`, destructure every `cvData` field with a safe default (see any existing template for the pattern), render `exportPdf('cv-preview')` on its own download button, and its own dark-mode toggle button.
2. Add a thumbnail under `public/templates/`.
3. Register it in `src/templates/index.js` (set `premium: true` if it should be ad-gated).
4. Done — it appears automatically in `EditorPanel.jsx`'s template picker.

---

## 10. Editor UX Improvements

- **Drag-to-reorder** for experience/education/skills/languages/references lists (currently add/remove only, order is add-order). `dnd-kit` or `@hello-pangea/dnd` are common low-effort additions.
- **Undo/redo** for the editor form.
- **Inline validation** (e.g. email format, required-field indicators) in `EditorPanel.jsx`.
- **Autosave indicator** ("Saved" / "Saving…") — the autosave itself already works (writes to `localStorage` on every `cvData` change in `App.jsx`), just no user-visible feedback currently.

---

## 11. Analytics for Published CVs (optional, mind privacy)

**Depends on:** §1/§2 for a sensible place to store counts.

- View counter on published CVs, visible to the owner (not the public).
- If added, disclose it in `PublishModal.jsx`'s copy so it's not a surprise to whoever's link is being shared, and avoid tracking individual visitors (aggregate counts only) unless you add a real privacy policy to match.

---

## Shipped (for reference — don't re-implement)

- ✅ Live editor with autosave (`localStorage`)
- ✅ 4 templates, 2 free + 2 premium with ad-based unlock (v1.1.0)
- ✅ Dark mode (persisted, single source of truth via `ThemeContext`)
- ✅ PDF export (single-page, see §4 above for the upgrade)
- ✅ JSON export/import (with safe-merge against malformed files)
- ✅ Base64 photo upload (persists across reloads)
- ✅ Heuristic PDF/DOCX resume import (see §7 above for the AI upgrade)
- ✅ Publish-online sharing via `/cv/:id` links, backed by a flat-file Express server
- ✅ "What's New" changelog modal
