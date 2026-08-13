# Handoff — C-CDA Viewer download page (`/ccda-viewer`)

**To:** Codex
**From:** Claude Code session, 2026-08-12
**Repo:** `/mnt/c/Github/cesarous.github.io` (branch `main`)

---

## 1. What Cesar asked for

Three requirements, given incrementally over one session:

1. **A dedicated page hosting the C-CDA Viewer `.exe` for download.** The project card for
   "C-CDA File Viewer" on `/projects` should navigate to that page instead of to GitHub.
2. **The download should be prominent on the site** — not buried on the projects page.
3. **The page should be SEO'd for the C-CDA Viewer**, specifically to attract people searching
   for a viewer with *unlimited* downloads / no caps.

**The `.exe` does not exist yet.** Cesar is still building it and will supply it later. Everything
must be built so that publishing the binary is a one-file change.

---

## 2. Stack facts you need before touching anything

- **Build tool is Vite**, not CRA, despite `react-scripts` still sitting in `dependencies`.
  `npm run build` → `vite build`, output dir is `build/` (see `package.json:43-51`).
- **`index.html` is at the repo root**, not in `public/` (Vite convention). I never confirmed its
  contents — a shell command to locate it was interrupted. **Verify it before editing head tags.**
- **Routing:** `react-router-dom` v6, `BrowserRouter`, routes declared in `src/index.jsx:23-39`.
  All pages are children of the `<App />` layout route.
- **Hosting:** GitHub Pages *user* site at `https://cesarous.github.io/` (`package.json:3`),
  deployed via `gh-pages -d build`. No `CNAME`, so no custom domain.
- **SPA deep links** work via the `spa-github-pages` 404 trick in `public/404.html` — a direct hit
  on `/ccda-viewer` 404s, redirects to `/?/ccda-viewer`, and root `index.html` unpacks it with
  `history.replaceState`. **This matters for SEO — see §5.**
- **UI kit:** Chakra UI v2 + MUI icons. Fonts via `@fontsource`.

## 3. Repo conventions — non-negotiable

These come from Cesar's standing preferences for this project. Violating them will get the work
rejected:

- **Navigate with `useNavigate()`. Never use `<Link>`.** The established pattern is a real `<a
  href>` with an `onClick` that calls `preventDefault()` and then `navigate(path)`, while letting
  modified clicks (ctrl/cmd/shift/alt, non-left button) fall through to native anchor behavior.
  Copy the implementation in `src/App.jsx:29-56` exactly.
- **Do not run `npm start` / `npm run build` to "verify" your changes** unless Cesar explicitly
  asks. He does not want proactive build runs.
- **If you do run npm, run it from Windows `cmd.exe`, not WSL.** This project is Windows-native
  (the opposite of Cesar's NextArena project).
- Match the surrounding comment density — this codebase has explanatory comments on non-obvious
  decisions, and they are written in prose, not as labels.

---

## 4. What is already done

Three new files, all complete and self-consistent. Nothing else in the repo has been modified yet.

### `src/data/ccdaDownload.js` (new)
Single source of truth for the download. Currently `available: false`, `version/size/released` all
`null`, `href: '/downloads/CCDA-Viewer-Setup.exe'`, `sourceUrl` pointing at
`https://github.com/cesarous/ccda_viewer`. The file's header comment documents the two-step
publish flow. **This is the only file that should need to change when the binary lands.**

### `src/pages/CcdaViewer.jsx` (new)
The page component. Renders:
- hero (eyebrow "Freelance project · Burnes and Libman", `<h1>`, lede paragraph)
- a bordered **download panel** that switches on `ccdaDownload.available`:
  - available → `<a download>` styled as a primary button + meta line (version · size · platform)
  - not available → visually inert `<span>` reading "Windows build coming soon", same footprint so
    the panel does not reflow when it goes live
  - both states show a "View source on GitHub" secondary link
- tech tag chips (reuses `.tech-tag-row` / `.tag-chip`)
- sections: *What it does*, *Why it exists*, *Installing it* (includes the SmartScreen
  unsigned-publisher warning, which is genuinely useful for an unsigned exe), plus a local-parsing
  privacy note
- footer CTA row → `/projects` and `/connect`, using `useNavigate()`

### `src/pages/css/CcdaViewer.css` (new)
Page styles. Deliberately reuses the site's existing type scale (`.project-title`, `.project-body`
from `Projects.css`; `.tag-chip` from `shared.css`) and only adds the download panel, hanging-dash
list, inline code chip, and pull-quote note. Includes a `max-width: 640px` block. Palette matches
the site (`#49494b`, `rgb(125,125,129)`, `#1a1a1a`).

---

## 5. What remains

### 5a. Wire up the route

**`src/index.jsx`** — add inside the `<Route path="/" element={<App />}>` block:
```jsx
<Route path="ccda-viewer" element={<CcdaViewer />} />
```
plus the import. Note the existing catch-all `<Route path="*" element={<Navigate to="/" replace />} />`
must stay *after* it.

Consider also adding an alias route `ccdaviewer` (no hyphen) that redirects to `/ccda-viewer`, since
people type it both ways. If you do, make it a `<Navigate replace>` so you never serve duplicate
content at two URLs.

### 5b. Point the project card at the page

**`src/data/projects.js:19`** — change the C-CDA entry's
`link: 'https://github.com/cesarous/ccda_viewer'` to `link: '/ccda-viewer'`. The GitHub link is
already surfaced on the destination page, so nothing is lost.

**`src/data/projects.js:65-69`** — `featured_projects` currently picks NextArena, IDCP, and Poetics
of Decryption. For requirement #2, add or swap in `paid_projects[2]` (the C-CDA viewer). Keep the
existing "one from each category" comment honest — update it if the composition changes.

### 5c. Make internal project links navigate client-side

**`src/components/ProjectShowcase.jsx:15-24`** currently renders every `project.link` as a plain
`<a href>` and only decides on `target="_blank"` via the `isExternal()` helper at line 4. With an
internal link this causes a **full page reload** — wrong, and it defeats the SPA.

Fix: bring in `useNavigate()` and apply the same anchor + `preventDefault` pattern from
`src/App.jsx:29-56` for the non-external case. Keep the real `href` on the anchor so middle-click,
"open in new tab", and crawlers all still work.

Also consider an optional `linkLabel` field on the project object so the C-CDA card can read
"Download the viewer →" instead of the generic "View project →" — that directly serves requirement
#2. Default it to "View project" so no other card changes.

### 5d. Make it prominent

Highest-value placement, in order:

1. **Home hero CTA.** `src/pages/Home.jsx:54-59` has a button row with "Resume" and "Contact Me"
   using `className="button-with-hover"` and `useNavigate()`. Add a third button navigating to
   `/ccda-viewer`. This is the single most prominent spot on the site.
2. **Featured projects** — covered in §5b.
3. **Sidebar nav** (`src/App.jsx:13-19`). A sixth entry would be maximum prominence, but it puts one
   project on par with About/Experience/Projects. **I did not do this — it's Cesar's call.** Ask him.

Note the honesty tension: until the exe ships, a prominent CTA leads to a "coming soon" state. The
page is explicit about that, so it's defensible, but flag it to Cesar.

### 5e. SEO — the largest remaining chunk

**The problem with the current setup:** this is a client-rendered SPA on GitHub Pages. Every page
shares one `<title>` from root `index.html` until React boots, there is no meta description, no
canonical, no structured data, no sitemap, and deep links bounce through a `404.html → /?/path`
redirect before rendering.

**There is a trap in the existing code.** `src/App.jsx:63-65` sets `document.title` from the
`PAGE_TITLES` map (lines 21-27) in a `useEffect` keyed on `location.pathname`. React runs child
effects *before* parent effects, so if you add a title-setting effect inside `CcdaViewer.jsx`, the
App-level effect will overwrite it on every navigation. **Do not fight this with a hook in the
page.** Instead, widen the existing App-level map:

Replace `PAGE_TITLES` with a `PAGE_META` map keyed on pathname, each entry carrying `title`,
`description`, and `canonical`. Extend the existing effect to also upsert:
- `<meta name="description">`
- `<link rel="canonical">`
- `og:title` / `og:description` / `og:url` / `og:image` / `og:type`
- `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`

Write a small helper that finds-or-creates each tag by selector and sets its content, so navigating
between pages replaces rather than accumulates tags. Canonical base is
`https://cesarous.github.io`. Use `public/CCDA.png` as the OG image (it already exists and is the
project card image) — verify its dimensions are reasonable for a social card.

**Structured data.** Add a `SoftwareApplication` JSON-LD block for the C-CDA page. This is the
schema Google uses for software download results and is the highest-leverage single item here.
Inject it from `CcdaViewer.jsx` in a `useEffect` that appends a `<script type="application/ld+json">`
and removes it on unmount (no conflict with the App-level effect — different tags). Fields:
`name`, `applicationCategory: "MedicalApplication"` (or `"BusinessApplication"`),
`operatingSystem: "Windows 10, Windows 11"`, `downloadUrl`, `softwareVersion`,
`offers: { "@type": "Offer", "price": "0", "priceCurrency": "USD" }`, `description`.
Drive every value from `ccdaDownload` so it can't drift from the visible page.

Consider a second `FAQPage` JSON-LD block if you add the FAQ in §5f — it can win rich results.

**Crawl files.**
- `public/robots.txt` currently allows everything (`Disallow:` with an empty value). Append
  `Sitemap: https://cesarous.github.io/sitemap.xml`.
- Create `public/sitemap.xml` listing `/`, `/about`, `/experience`, `/projects`, `/connect`,
  `/ccda-viewer`. Give `/ccda-viewer` the highest non-root priority.
- Check root `index.html` for a sensible default `<title>`, `<meta name="description">`, and
  `lang="en"`. This is the markup a non-rendering crawler sees first.

**The prerender question — flag this to Cesar, don't decide it alone.**
Googlebot does execute JavaScript, so a well-tagged SPA can rank, and "C-CDA viewer" is a
low-competition long-tail term. But the `404.html` redirect hop is a real handicap and other
crawlers (Bing, LLM crawlers, social unfurlers) mostly don't render JS at all — meaning right now a
shared link previews with the site's generic title.

Two escalation paths if plain tagging isn't enough:
- **Prerender at build time** (`react-snap`, `vite-plugin-prerender`, or a small Puppeteer
  post-build step) to emit real static HTML per route. Best outcome, keeps one React source of
  truth, adds a build dependency.
- **A hand-written static `public/ccda-viewer/index.html`.** Instant, perfect crawlability, no JS
  needed. **But** GitHub Pages would then serve that file for direct hits while in-app client-side
  navigation still renders the React component — two different pages at one URL, which is worse
  than the problem it solves. Only viable if you *remove* the React route entirely and make the
  card link a normal external-style anchor. Don't do this without asking.

My recommendation: ship the meta + JSON-LD + sitemap now, ask Cesar whether to add prerendering.

### 5f. SEO copy — the "unlimited" angle

Requirement #3 was specifically about attracting people looking for **unlimited downloads**. The
context: most online C-CDA/CCD viewers are web tools that cap file count or size, require an
account, or make you upload protected health information to a third-party server. A free local
desktop app beats all of that, and *that* is the search intent to capture.

Suggested keyword targets to work naturally into `<h1>`, the lede, section headings, and the meta
description — do **not** keyword-stuff, the page reads well right now and shouldn't be degraded:
- "C-CDA viewer", "CCDA viewer" (both spellings — people search both)
- "open a CCDA file", "CCDA XML viewer", "view CCD / C-CDA medical records"
- "free", "unlimited", "no file limit", "no upload", "offline", "no signup"

Add a short **"Why not a web-based viewer?"** section contrasting: unlimited files vs. per-file
caps, no upload vs. sending PHI to someone else's server, works offline, no account. This is both
genuinely useful to the reader and exactly the comparison query people type.

Consider a small **FAQ** section ("Is it free?", "Is there a limit on how many files I can open?",
"Do my files get uploaded anywhere?", "Does it work offline?") — good for the `FAQPage` schema and
matches how these queries are phrased.

⚠️ **Claims to confirm with Cesar before publishing — I wrote several of these speculatively:**
- Is it actually **free / unlimited**? The whole SEO angle depends on it.
- Does it **truly parse locally with no network calls**? The page currently asserts "Files are
  parsed locally on your machine. Nothing is uploaded." That's a strong privacy claim about
  medical data. It must be verified against the source, not assumed.
- Are the *What it does* bullets accurate? I extrapolated from the one-line project description
  ("reverse-engineered parser that makes CCDA medical files readable for legal staff at Burnes and
  Libman"). Specifically: the claim that it renders encounters / medications / problems / results /
  notes, and the tech stack chips (`Python`, `XML / C-CDA`, `XSLT`, `Desktop app`, `Windows`) —
  **XSLT in particular is a guess.**
- Is naming the client (**Burnes and Libman**) on a public page OK with them? It's already on the
  projects page, so presumably yes, but a dedicated page is more visible.

### 5g. Shipping the binary

When Cesar provides the exe:
1. `public/downloads/<filename>` — Vite copies `public/` verbatim into `build/`.
2. In `src/data/ccdaDownload.js`: set `available: true` and fill `version`, `size`, `released`,
   and `fileName`/`href` if the filename differs.

⚠️ **Hosting caveat — raise before committing the binary.** GitHub blocks files over 100 MB and
warns above 50 MB, and every version you commit lives in git history forever, permanently bloating
a clone of the portfolio repo. A packaged Python desktop app can easily hit tens of MB.

**Prefer a GitHub Releases asset** on the `ccda_viewer` repo and point `href` at that absolute URL —
the config already handles an absolute URL identically, and you get download counts for free. The
tradeoff is that the `download` attribute has no effect cross-origin, so the browser follows the
link instead of forcing a save; GitHub Releases already serves assets as attachments, so behavior is
fine in practice. Confirm the direction with Cesar.

---

## 6. Verification checklist

Cesar does **not** want proactive build runs, so hand these to him rather than executing them:

- [ ] `/ccda-viewer` renders; the pending-state panel shows and does not look broken
- [ ] The C-CDA card on `/projects` navigates **without a full page reload**
- [ ] Ctrl/cmd-click on that card still opens a new tab
- [ ] Direct hit on `https://cesarous.github.io/ccda-viewer` survives the 404 redirect
- [ ] Browser tab title and meta description change on navigation *to and away from* the page
      (the away case is where a naive implementation leaks stale tags)
- [ ] Only one `<link rel="canonical">` and one `<meta name="description">` exist after several
      navigations — no accumulation
- [ ] JSON-LD validates in Google's Rich Results Test
- [ ] `sitemap.xml` and `robots.txt` are reachable on the deployed site
- [ ] Mobile layout at 375px — the download button goes full-width by design
- [ ] After the exe ships: the download actually downloads, and the filename matches `fileName`

---

## 7. Summary for the next agent

Scaffolding for the page is complete and isolated — three new files, zero existing files touched,
so nothing is half-migrated. The remaining work is **integration** (route, card link, client-side
nav in `ProjectShowcase`, Home CTA) and the **SEO layer**, which is the bulk of it and where the
one real gotcha lives: the parent/child `useEffect` ordering in `App.jsx` means page metadata must
be driven from the App-level map, not from the page component.

Before writing marketing copy, get Cesar's answers on the ⚠️ items in §5f. Several load-bearing
claims on that page are currently my inference, and the privacy claim in particular should not ship
unverified on a page about medical records.
