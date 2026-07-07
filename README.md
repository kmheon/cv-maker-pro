# CV Maker Pro

A React + Vite resume/CV builder with live editing, multiple templates (including premium ones), dark mode, PDF export, JSON import/export, resume auto-import, and online publishing — backed by a small Express server.

## Features

- **Live editor panel** — edit every section of your resume with the preview updating instantly.
- **Four templates** — 2 free (Modern Glass, Minimal Classic) and 2 premium (Executive Elite, Creative Gradient). Premium templates unlock for free after watching a short ad — no payment required.
- **Import an old resume** — upload a PDF or DOCX and the app extracts your name, contact info, summary, skills, experience, education, certifications, and languages automatically (best-effort — always review before publishing).
- **Publish online** — get a shareable, read-only link to your CV (`/cv/:id`) that anyone can open, no account needed. Publishing again updates the same link.
- **Dark / light mode** — toggle from the preview; remembered across visits.
- **Photo upload**, **PDF export**, **JSON export/import** (safe against malformed files), and **autosave** to `localStorage`.
- **"What's New" panel** — a changelog modal (🔔 button) so returning users see what changed after you ship an update.

## Project Structure

```
src/                   Frontend (React + Vite)
  App.jsx               Editor app shell
  PublicCvView.jsx       Read-only public CV viewer (/cv/:id)
  main.jsx               Entry point + tiny path-based router
  version.js              APP_VERSION + CHANGELOG (edit this when you ship updates)
  context/                ThemeContext, premium-unlock tracking
  editor/EditorPanel.jsx   The live editing form
  templates/              Resume templates + registry (add new ones here)
  layouts/, sections/, cards/, shared/   UI building blocks
  utils/api.js             Calls to the backend
  utils/exportPdf.js       html2canvas + jsPDF export

server/                 Backend (Express)
  index.js                API routes + serves the built frontend in production
  lib/parseResume.js       Heuristic PDF/DOCX resume-to-JSON parser
  data/                   Published CVs are stored here as JSON files (gitignored)
```

## Running Locally (development)

You need two terminals — one for the frontend, one for the backend.

```bash
# Terminal 1: backend
cd server
npm install
npm run dev          # starts on http://localhost:4000

# Terminal 2: frontend
npm install
npm run dev           # starts on http://localhost:5173, proxies /api to the backend
```

Open `http://localhost:5173`.

> `npm install` needs internet access the first time, to download dependencies including a platform-specific native bundler binary for Vite.

## Deploying to a Real Host

This app is two small pieces that can run on the same server:

```bash
# 1. Build the frontend
npm install
npm run build          # outputs to dist/

# 2. Start the backend — it serves both the API and the built frontend
cd server
npm install
npm start               # or: PORT=4000 npm start
```

Then point your domain / reverse proxy (e.g. Nginx) at the server's port. Both the editor and shared `/cv/:id` links will work from that same origin.

### Notes on the current backend

- **Storage:** published CVs are saved as individual JSON files under `server/data/`. This is intentionally simple and dependency-free. For real production traffic at scale, swap this for a proper database (Postgres, SQLite, etc.) — the API surface (`POST/GET/PUT /api/cv`) stays the same, only `server/index.js`'s file read/write calls need to change.
- **Editing a published CV:** when you publish, the browser remembers an `editToken` in `localStorage`. Publishing again from the same browser updates the same link instead of creating a new one. There's currently no user login system — anyone who has the edit token (i.e., the original browser) can update it.
- **Ad unlock:** the "watch an ad to unlock" flow is fully working end-to-end but uses a *simulated* timed ad (see `src/shared/AdUnlockModal.jsx`) since no real ad network is wired in. There's a clearly marked integration point in that file for plugging in a real rewarded-ad SDK (e.g. Google AdMob / Ad Manager rewarded units, or a mediation network) later — swap the simulated countdown for the SDK's actual "reward earned" callback.
- **Resume import:** parsing is heuristic (regex + keyword-based section detection), not AI-based. It gets common resume layouts right most of the time but isn't perfect — the app always tells the user to review the result.

## Shipping Future Updates

1. Make your changes.
2. Bump `APP_VERSION` in `src/version.js` and add a new entry to `CHANGELOG` describing what changed.
3. Deploy as above.

Returning users will automatically see the "What's New" modal once, and can reopen it anytime from the 🔔 button.

## Adding a New Template

1. Create `src/templates/YourTemplate/index.jsx` accepting `{ cvData, darkMode, setDarkMode }` props.
2. Add a thumbnail image under `public/templates/`.
3. Register it in `src/templates/index.js` (set `premium: true` if it should be ad-gated).

It appears automatically in the template picker.
