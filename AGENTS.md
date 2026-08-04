# AGENTS.md — cesarous.github.io

Personal portfolio site. Concise instructions loaded for every task.

## Stack

- React 18, Vite (migrated from Create React App in 2026-08 - `react-scripts` is kept only as a devDependency so `npm test`/Jest still works, it no longer builds or serves the app). Plain JS (`.js`/`.jsx`, no TypeScript). Any source file containing JSX must be `.jsx` - Vite's default esbuild transform does not parse JSX in `.js` files.
- Entry point is root `index.html` -> `src/index.jsx` (not `public/index.html` - that's CRA's convention and no longer used).
- Chakra UI for layout primitives (`Box`, `Image`, `Button`, ...), plain CSS files per component/page for everything else.
- `react-router-dom` v6 for routing.
- `react-pro-sidebar` for the nav (desktop sticky sidebar, mobile overlay drawer via `breakPoint`/`toggled`).
- `@mui/icons-material` for icons, `@emailjs/browser`/`emailjs-com` for the contact form.
- Deployed to GitHub Pages via `gh-pages` (`npm run deploy`, still outputs to `build/` per `vite.config.js`'s `build.outDir`). Asset paths are case-sensitive in production even though the local Windows-mounted filesystem is not — verify `public/` filenames match `src` references exactly.

## Commands

```bash
npm start     # vite dev server
npm run build # vite build -> build/
npm test      # react-scripts test (Jest) - untouched by the Vite migration
npm run deploy
```

**Run `npm install`/`npm start`/`npm run build` from Cesar's actual Windows terminal (`cmd.exe`/PowerShell), not from WSL bash.** He works on this repo natively on Windows even though the path is also reachable at `/mnt/c/...` from WSL. An `npm install` run from WSL writes POSIX `.bin` shims and installs Linux-platform optional native deps (esbuild/rollup) - neither works from Windows `cmd.exe`, which then fails with `'vite' is not recognized...`. If you (the agent) are working from a WSL/Linux shell and need to sanity-check that the app compiles, that's fine to do in a throwaway way, but don't leave a WSL-installed `node_modules` behind as the final state - tell Cesar to run `npm install` from Windows if there's any chance the environment got cross-contaminated. This is the opposite convention from his NextArena frontend repo, which *is* run from WSL - don't assume the two work the same way.

## Navigation

- Use `useNavigate()` for programmatic navigation, not the `<Link>` component.
- The nav sidebar (`src/App.js`) drives active-page highlighting off `useLocation().pathname` — keep route paths there in sync with `src/index.js`.

## Global conventions

(Imported from Cesar's general frontend rules — not project-specific unless noted.)

- Never overengineer. Simplest scalable solution wins.
- Never import inside a function body to dodge a circular import (or for any other reason) — all imports go at the top of the file. If two modules genuinely need each other, that's a real architecture problem: move the shared piece to a third module both can import one-directionally, rather than deferring the import to call time.
- Preserve user changes in the dirty worktree; do not normalize unrelated files.
- Match surrounding style. Keep the existing font stack (Gentium Book Plus / Red Hat Mono / Source Code Pro) and the `#49494b` charcoal palette unless a redesign is explicitly requested.
- Buttons: no browser blue focus/glow ring — reset `outline`/`box-shadow` for focus and focus-visible states. Hover should be subtle (background/shadow shift), not blue. Keep buttons minimal.
- **Do not run `npm start` or `npm run build` to verify edits unless explicitly asked.** Read the diff and reason about correctness instead.
- This is a Windows-mounted checkout (`/mnt/c/...`) — files may be CRLF even though this isn't visible in casual reads. Before/after patching a file, `file <path>` it if a diff looks unexpectedly noisy; restore CRLF with `unix2dos <path>` if an edit flattened it to LF. Don't normalize a whole file's line endings as a side effect of a small change.

## Architecture

- `src/index.jsx`: routes. `/` is the landing page; `/about`, `/experience`, `/projects`, `/connect` are standalone pages, each rendered inside `App`'s layout via `<Outlet/>`. Unknown paths redirect to `/`.
- `src/App.jsx`: shared shell — sidebar/nav (desktop sticky, mobile drawer), active-link highlighting, per-page `document.title`.
- `src/pages/`: one file per route. `src/pages/css/`: matching per-page stylesheets.
- `src/components/`: shared pieces (`ServicesList` + its card, `ContactUs` form).
- `src/data/projects.js`: single source of truth for project listings — `Projects.jsx` renders the full lists, `Home.jsx` imports `featured_projects` for its teaser. Don't duplicate project data inline in a page again.
