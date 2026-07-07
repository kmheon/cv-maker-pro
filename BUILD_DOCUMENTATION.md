# CV Maker Pro — Build & Architecture Documentation

**Version documented:** 1.1.0
**Last updated:** 2026-07-08
**Purpose of this document:** a complete technical reference for developers (human or AI) picking up this codebase — what exists, how it's wired together, the exact data shapes in use, and the conventions to follow when extending it. Pair this with `ROADMAP.md` for what to build next.

---

## 1. What This Project Is

A resume/CV builder with:
- a **React + Vite frontend** (live editor + multiple resume templates + PDF export),
- a small **Express backend** for publishing resumes online and parsing uploaded resumes (PDF/DOCX) into structured data.

The frontend can run entirely standalone (localStorage only — editor, templates, dark mode, PDF export, JSON import/export all work with zero backend). The backend is only required for two features: **"Publish Online"** and **"Import Old CV (PDF/DOCX)"**.

---

## 2. Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend framework | React 19 | function components + hooks only, no class components |
| Build tool | Vite 8 (Rolldown-based) | `npm run dev` / `npm run build` |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite` plugin) | utility classes only, no CSS modules |
| PDF export | `html2canvas` + `jspdf` | see `src/utils/exportPdf.js` |
| Backend | Express (Node, CommonJS) | `server/index.js` |
| Resume parsing | `pdf-parse` (PDF), `mammoth` (DOCX) | text extraction only, then custom heuristics |
| File uploads | `multer` (memory storage) | |
| Storage (published CVs) | flat JSON files on disk | `server/data/*.json` — see §7 for upgrade path |
| Data persistence (editor) | browser `localStorage` | no accounts, no login system anywhere |
| Routing | none (no react-router) | a single manual path check in `main.jsx` for `/cv/:id` |

**Deliberate non-choices**, so future contributors don't "fix" these accidentally:
- No React Router — there's exactly one public route (`/cv/:id`), handled with a regex in `main.jsx`. Adding more than 2–3 routes is the trigger to introduce a router.
- No global state library (Redux/Zustand) — state lives in `App.jsx` and is threaded down via props. Fine at current size; reconsider if prop-drilling gets painful.
- No database — see §7.4 for why and how to change it.
- No user accounts/auth — "ownership" of a published CV is just knowing its `editToken` in `localStorage`. See §9.2 for implications.

---

## 3. Repository Layout

```
cv_maker_pro_app/
├── index.html                  Vite entry HTML
├── vite.config.js              Vite config incl. dev proxy for /api -> :4000
├── package.json                Frontend deps + scripts
├── eslint.config.js            ESLint flat config (React hooks + refresh rules)
├── README.md                   Quick-start / setup instructions
│
├── public/                     Static assets served as-is
│   ├── favicon.svg, icons.svg
│   └── templates/               Thumbnail images used by the template picker
│       ├── modern-glass.jpg
│       ├── minimal-classic.svg
│       ├── executive-elite.svg
│       └── creative-gradient.svg
│
├── src/
│   ├── main.jsx                 Entry point + the one manual route check
│   ├── App.jsx                  Editor app shell (dark mode, edit toggle, What's New)
│   ├── PublicCvView.jsx         Read-only viewer rendered at /cv/:id
│   ├── version.js                APP_VERSION + CHANGELOG (edit this every release)
│   ├── index.css / App.css       Global styles (Tailwind entry + minor resets)
│   │
│   ├── context/
│   │   ├── ThemeContext.jsx        Dark mode state, persisted to localStorage
│   │   └── usePremiumUnlock.js     Tracks which premium templates are ad-unlocked
│   │
│   ├── data/
│   │   └── cvData.js               Default/sample CV data (shape = the data model, §5)
│   │
│   ├── editor/
│   │   └── EditorPanel.jsx         The big live-editing form. See §6.3.
│   │
│   ├── templates/                  One folder per resume template
│   │   ├── index.js                  Template REGISTRY (add new templates here)
│   │   ├── ModernGlass/index.jsx      Free — dark glassmorphism sidebar layout
│   │   ├── MinimalClassic/index.jsx   Free — single column, light
│   │   ├── ExecutiveElite/index.jsx   Premium — two-column dark sidebar, amber accent
│   │   └── CreativeGradient/index.jsx Premium — colorful single page
│   │
│   ├── layouts/                    Structural pieces used by ModernGlass specifically
│   │   ├── MainLayout.jsx, Sidebar.jsx, HeroSection.jsx
│   │
│   ├── sections/                  Section renderers used by ModernGlass specifically
│   │   ├── SkillsSection.jsx, LanguageSection.jsx, SocialSection.jsx
│   │   ├── ExperienceSection.jsx, EducationSection.jsx
│   │
│   ├── cards/                     Small presentational atoms
│   │   ├── InfoCard.jsx, VendorChip.jsx
│   │
│   ├── shared/                    Reusable UI primitives + app-wide modals
│   │   ├── Tag.jsx, GlassCard.jsx, ProgressBar.jsx, SectionTitle.jsx
│   │   ├── WhatsNewModal.jsx         Changelog modal + useWhatsNew() hook
│   │   ├── AdUnlockModal.jsx         Simulated rewarded-ad unlock flow
│   │   └── PublishModal.jsx          "Publish Online" / "Update Published CV" flow
│   │
│   ├── styles/
│   │   ├── theme.js, tokens.js       Shared style constants (colors, etc.)
│   │
│   └── utils/
│       ├── exportPdf.js              html2canvas + jsPDF export logic
│       └── api.js                    fetch wrappers for all backend calls
│
└── server/
    ├── package.json               Backend deps (express, cors, multer, pdf-parse, mammoth)
    ├── index.js                   All API routes + serves dist/ in production
    ├── lib/parseResume.js          Heuristic PDF/DOCX text -> structured CV data parser
    └── data/                      Published CVs stored as <id>.json here (gitignored)
```

---

## 4. Data Flow / Architecture

### 4.1 The editor app (default route, no backend needed)

```
localStorage ⇄ App.jsx (cvData, selectedTemplate, darkMode state)
                 │
                 ├──> EditorPanel.jsx  (form UI, mutates cvData via setCvData)
                 │
                 └──> templates[selectedTemplate].component
                          (renders cvData as an actual resume, id="cv-preview")
                                │
                                └──> utils/exportPdf.js (screenshots #cv-preview -> PDF)
```

- `cvData` starts from `localStorage.getItem('cv-data')`, falling back to `src/data/cvData.js`'s default sample, and is written back to `localStorage` on every change (see the `useEffect` in `App.jsx`).
- `selectedTemplate` is a string key into the `templates` registry (`src/templates/index.js`), also persisted.
- `darkMode` lives in `ThemeContext` (see §6.1), persisted separately.
- The resume itself is always rendered inside a container with `id="cv-preview"` — **this id is a hard contract**. `exportPdf('cv-preview')` and the ad-hoc PDF button in every template all depend on this id existing exactly once in the DOM. If you ever render two templates on screen at once (e.g. a side-by-side preview feature), give the export target a unique, explicit id and pass it through instead of hardcoding `'cv-preview'`.

### 4.2 Publishing flow (needs backend)

```
EditorPanel "Publish Online" button
   → PublishModal.jsx
       → utils/api.js: publishCv({cvData, selectedTemplate, darkMode})
           → POST /api/cv  (server/index.js)
               → writes server/data/<id>.json
               → returns { id, editToken }
       → editToken + id saved to localStorage key 'cv-maker-published'
       → shows shareable link: `${origin}/cv/${id}`

Clicking "Publish Online" again (same browser):
       → utils/api.js: updatePublishedCv(id, editToken, {...})
           → PUT /api/cv/:id  with header  x-edit-token: <editToken>
               → verifies token matches, overwrites the same file
```

```
Visitor opens /cv/:id
   → main.jsx regex matches, renders <PublicCvView id={id} /> instead of <App />
       → utils/api.js: fetchPublishedCv(id)
           → GET /api/cv/:id  (server strips editToken before responding)
       → renders templates[selectedTemplate].component in read-only mode
         (local darkMode state only — visitor toggling dark mode doesn't
         write back to the server)
```

### 4.3 Resume import flow (needs backend)

```
EditorPanel "Import Old CV" file input (accept=".pdf,.docx")
   → utils/api.js: parseResumeFile(file)   [multipart/form-data]
       → POST /api/parse-resume  (server/index.js)
           → pdf-parse (.pdf) or mammoth (.docx) extracts raw text
           → server/lib/parseResume.js: parseResumeText(text)
               → regex/heuristics -> partial { personal, skills, experience,
                 education, certifications, languages } object
                 (only includes keys it actually found something for)
           → returns { parsedData }
   → EditorPanel merges parsedData into cvData (shallow per top-level key,
     personal merged one level deeper) and shows a "please review" alert
```

---

## 5. The CV Data Model

This is the single shape used everywhere: `src/data/cvData.js` (defaults), every template component, `EditorPanel.jsx` (the form), and `server/lib/parseResume.js` (the output it tries to produce). **If you add a field, update all four.**

```js
{
  personal: {
    photo: '',                 // '' or a base64 data: URL (uploads are converted
                                // to base64 in EditorPanel so they survive reloads
                                // — never store blob: URLs here, they don't persist)
    photoPositionX: 50,        // 0-100, used as CSS object-position X%
    photoPositionY: 50,        // 0-100, used as CSS object-position Y%
    name: 'Alex Johnson',
    title: 'Senior Network Engineer',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: 'New York, USA',
    socials: [
      {
        platform: 'LinkedIn',        // one of: LinkedIn, GitHub, Twitter/X,
                                      // Website, Custom (see EditorPanel dropdown)
        customPlatform: '',          // only present/used when platform === 'Custom'
        url: 'linkedin.com/in/alexjohnson', // no protocol prefix; templates
                                             // prepend "https://" when linking
      },
    ],
    summary: 'Experienced infrastructure and networking specialist…',
  },

  vendors: ['Cisco', 'MikroTik', 'Fortinet', 'VMware', 'Hikvision'],
  // Plain array of strings, shown as a "Vendor Stack" of chips.

  skills: [
    {
      name: 'Network Infrastructure',
      level: 95,              // 0-100, drives a progress bar
      description: 'Enterprise routing, switching & VLAN architecture.',
      icon: '🌐',              // any string (emoji in practice)
      color: 'blue',           // NOTE: defined but not actually consumed by any
                                // current template — safe to wire up or remove
    },
  ],

  experience: [
    {
      role: 'Senior Network Engineer',
      company: 'TechCore Solutions',
      duration: '2021 – Present',   // free text, not a structured date
      description: 'Managing enterprise infrastructure…',
      tags: ['Cisco', 'Cloud', 'Security'],  // array of strings, rendered as chips
    },
  ],

  education: [
    {
      degree: 'BSc in Computer Science',
      institute: 'State University',
      duration: '2016 – 2020',       // free text
      result: '3.8 / 4.0 GPA',        // optional, free text
    },
  ],

  certifications: [
    { title: 'Cisco Certified Network Associate (CCNA)' },
  ],

  references: [
    {
      name: 'Michael Smith',
      company: 'TechCore Solutions',
      phone: '+1 (555) 555-8899',   // optional
      email: 'michael@example.com', // optional
    },
  ],

  languages: [
    {
      name: 'English',
      level: 95,                     // 0-100, drives a progress bar
      levelLabel: 'Professional',    // free text shown next to the bar
    },
  ],
}
```

**Field-naming gotchas fixed in v1.1.0** — worth knowing so they don't regress: languages use `level` (not `progress`); the photo is stored as base64 (not a `blob:` object URL).

---

## 6. Component Reference

### 6.1 `context/ThemeContext.jsx`
Exports `ThemeProvider` (wraps the editor app in `main.jsx`) and `useTheme()`. Single source of truth for `darkMode`; persisted to `localStorage['cv-theme']`. `App.jsx` reads/writes dark mode exclusively through this — don't reintroduce a separate `useState` for it.

### 6.2 `context/usePremiumUnlock.js`
`usePremiumUnlock()` returns `{ unlockedIds, isUnlocked(id), unlock(id) }`, backed by `localStorage['cv-maker-unlocked-templates']` (array of template id strings). Purely client-side — there is no server-side concept of "who unlocked what."

### 6.3 `editor/EditorPanel.jsx`
The largest file in the project — one long form covering every section of `cvData`, plus:
- Template picker grid (reads `templateList` from `templates/index.js`; routes premium clicks through `AdUnlockModal`)
- Action buttons: Export PDF, Publish Online, Import Old CV, Export JSON, Import JSON
- Photo upload/crop/remove controls

Props: `{ cvData, setCvData, darkMode, selectedTemplate, setSelectedTemplate }`. It mutates `cvData` by always spreading-and-replacing (`setCvData({ ...cvData, ... })`) — follow that same immutable-update pattern when adding new fields, React state updates depend on it.

### 6.4 `templates/index.js` — the registry
```js
{
  <templateId>: {
    id: '<templateId>',
    name: 'Display Name',
    component: YourComponent,          // (props below)
    thumbnail: '/templates/xyz.svg',   // path under public/
    description: 'One-line description',
    category: 'Modern' | 'Classic' | 'Executive' | 'Creative' | ...,
    accent: 'blue' | 'amber' | 'purple' | ...,  // cosmetic hint, not enforced
    premium: false,                    // true => gated behind AdUnlockModal
    darkSupported: true,               // cosmetic flag shown in the picker
    featured: false,                   // cosmetic flag shown in the picker
  },
}
```
Every template component receives exactly `{ cvData, darkMode, setDarkMode }` and is responsible for its own full-page layout, its own dark-mode button, and calling `exportPdf('cv-preview')` from its own download button. Copy an existing template as the starting point for a new one — see `ROADMAP.md` §"Adding a template" for the checklist.

### 6.5 `shared/WhatsNewModal.jsx`
Exports `WhatsNewModal` (the modal UI) and `useWhatsNew()` (returns `{ open, close, openManually }`). Compares `localStorage['cv-maker-last-seen-version']` against `APP_VERSION` from `src/version.js` to decide whether to auto-open on load.

### 6.6 `shared/AdUnlockModal.jsx`
Simulated rewarded-ad (15s countdown, can't dismiss with reward until it finishes). **Has an explicit, commented integration point** for wiring in a real ad SDK — read the comment block at the top of the file before touching this. Do not call `onComplete()` until a real SDK confirms the reward in production.

### 6.7 `shared/PublishModal.jsx`
Handles both "first publish" (`POST /api/cv`) and "update my published CV" (`PUT /api/cv/:id`), based on whether `localStorage['cv-maker-published']` already has a record. Shows the shareable link with a copy button once done.

### 6.8 `utils/exportPdf.js`
Takes a DOM element id, screenshots it with `html2canvas`, and lays the image into a `jspdf` document, triggering a download. If you need multi-page PDF support (currently single continuous image — very tall resumes may render oddly across page breaks), this is the file to extend — see `ROADMAP.md`.

### 6.9 `utils/api.js`
All backend calls in one place: `publishCv`, `updatePublishedCv`, `fetchPublishedCv`, `parseResumeFile`. Uses relative paths (`/api/...`) so it works both via the Vite dev proxy and in production when Express serves the built frontend itself. **Don't hardcode `http://localhost:4000` anywhere in frontend code** — it'll break in production.

---

## 7. Backend Reference (`server/`)

### 7.1 Endpoints

| Method | Path | Auth | Body | Response |
|---|---|---|---|---|
| `POST` | `/api/cv` | none | `{ cvData, selectedTemplate, darkMode }` | `{ id, editToken }` |
| `GET` | `/api/cv/:id` | none | — | `{ id, cvData, selectedTemplate, darkMode, createdAt, updatedAt }` (no `editToken`) |
| `PUT` | `/api/cv/:id` | header `x-edit-token` | `{ cvData?, selectedTemplate?, darkMode? }` | `{ id, updatedAt }` |
| `POST` | `/api/parse-resume` | none | `multipart/form-data`, field `file` (.pdf or .docx) | `{ parsedData }` |

All other (non-`/api`) routes fall through to `dist/index.html` **only if `dist/` exists** (i.e. only in a built/production run) — see the bottom of `server/index.js`.

### 7.2 IDs and tokens
- `id`: `crypto.randomBytes(6).toString('hex')` → 12 hex chars. Validated with `/^[a-f0-9]+$/` before ever touching the filesystem (path-traversal guard in `cvFilePath()`).
- `editToken`: `crypto.randomBytes(24).toString('hex')`, returned once on creation, never returned by `GET`. Whoever holds it can `PUT`. There is no way to recover a lost token (no accounts) — see §9.2.

### 7.3 `server/lib/parseResume.js` — heuristic parser
Pure functions, no I/O, easily unit-testable in isolation (no `express`/`multer`/`pdf-parse` imports in this file — those only happen in `index.js`). Key pieces:
- `SECTION_HEADERS`: keyword lists used to detect section boundaries (`experience`, `education`, `skills`, etc.) — **extend this object first** if imports are missing a section your test resumes use different header wording for.
- `extractDuration` / `isPureDateLine`: the trickiest part — separates "Role at Company" header lines from a following "2020 - Present" line so they merge into one entry instead of two. If experience/education entries come out split or merged wrong, this is where to look.
- `parseSkillsBlock` / `parseLanguagesBlock` / `parseCertificationsBlock`: simple comma/bullet splitting.
- Everything returns only the keys it actually found something for (`undefined` keys are stripped) — the frontend merge in `EditorPanel.jsx` relies on this to avoid clobbering fields the user already filled in with empty guesses.

### 7.4 Storage — current state and upgrade path
Published CVs are single JSON files under `server/data/<id>.json`. This was a deliberate choice to avoid adding a database dependency for a first version. **To move to a real database:**
1. Replace the `fs.readFileSync`/`writeFileSync` calls in the four route handlers in `server/index.js` with your DB client's equivalent calls.
2. Keep the exact same request/response shapes (§7.1) — the frontend (`utils/api.js`) doesn't need to change at all.
3. Suggested schema (SQL-ish): `cvs(id TEXT PRIMARY KEY, edit_token TEXT, cv_data JSONB, selected_template TEXT, dark_mode BOOLEAN, created_at TIMESTAMP, updated_at TIMESTAMP)`.

---

## 8. Local Development

Two processes, two terminals:

```bash
# backend
cd server && npm install && npm run dev     # http://localhost:4000

# frontend (separate terminal, from project root)
npm install && npm run dev                   # http://localhost:5173, proxies /api
```

Frontend-only work (no publish/import features needed) can skip the backend entirely — those two buttons will just error out gracefully if there's nothing at `:4000`.

## 9. Known Limitations (be aware before "fixing" these as bugs)

1. **No accounts / no auth** — anyone with an `editToken` (i.e., the browser that published it) can update a CV. There's no password, email verification, or recovery flow. Fine for a "quick share" tool; not fine if you're expecting users to trust it with sensitive data long-term.
2. **Resume parsing is heuristic, not AI** — it will misparse unusual resume layouts (multi-column PDFs, heavily designed templates, scanned/image-only PDFs with no selectable text). This is by design (documented in the README and surfaced to users via an alert) — it is not a bug to be "fixed" so much as a feature to potentially upgrade (see `ROADMAP.md`).
3. **Single-page PDF export** — `exportPdf.js` renders the whole preview as one tall image dropped into a PDF. Very long resumes may not paginate cleanly.
4. **No image resume import** — only PDFs with selectable text and DOCX are supported; scanned/photographed resumes aren't handled (would need OCR).
5. **`skill.color` field is unused** — present in the data model and sample data, not consumed by any current template's rendering logic.

---

## 10. Conventions for Contributors (Human or AI)

- **Always spread-and-replace state**: `setCvData({ ...cvData, field: newValue })`, never mutate `cvData` directly.
- **Every template must accept exactly `{ cvData, darkMode, setDarkMode }`** and be fully self-contained (own dark mode button, own PDF download button, own layout). Don't make templates depend on being wrapped by anything else.
- **`id="cv-preview"` must exist exactly once** wherever a template is rendered for export/interaction to work.
- **New data model fields**: update `src/data/cvData.js` (default value), every template that should display it, `EditorPanel.jsx` (form control), and `server/lib/parseResume.js` (if it's something resume text could plausibly contain).
- **New backend routes**: keep them under `/api/*` — the catch-all static-file fallback in `server/index.js` explicitly excludes `/api` paths, and the Vite dev proxy only forwards `/api/*`.
- **Don't hardcode `localhost:4000`** anywhere in `src/` — always go through `src/utils/api.js`.
- **Run these before committing** (all work offline, no network needed):
  ```bash
  npx eslint src
  ```
  There are two known, accepted ESLint notices (both `react-refresh/only-export-components`, in `ThemeContext.jsx` and `WhatsNewModal.jsx`) — they're a stylistic HMR-granularity note for co-locating a hook with a component, not a bug, and are fine to leave.
